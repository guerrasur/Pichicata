#!/usr/bin/env node
/* PICHICATA — suite de pruebas. Sin dependencias.
     node test/run.js           corrida normal
     node test/run.js --rapido  menos runs simuladas (para iterar)
   Sale con código 1 si algo falla. */

const { cargar, desbloquearTodo, jugarRun, ESTRATEGIAS, ARCHIVOS, EXCLUIDOS, archivosDeIndex } = require("./harness");

const RAPIDO = process.argv.includes("--rapido");
const RUNS_POR_ESTRATEGIA = RAPIDO ? 10 : 50;

let fallos = 0;
const grupos = [];

function grupo(nombre, fn) {
  grupos.push({ nombre, fn });
}

function ok(msg) { console.log("   \x1b[32m✓\x1b[0m " + msg); }
function mal(msg) { console.log("   \x1b[31m✗ " + msg + "\x1b[0m"); fallos++; }
function info(msg) { console.log("     \x1b[2m" + msg + "\x1b[0m"); }

function afirmar(cond, msgOk, msgMal) {
  if (cond) ok(msgOk); else mal(msgMal || msgOk);
  return cond;
}

/* ============================================================ */

grupo("carga y sincronización con index.html", () => {
  const P = cargar();

  const enIndex = archivosDeIndex();
  const faltanEnIndex = ARCHIVOS.filter(f => !enIndex.includes(f));
  const faltanEnTest = enIndex.filter(f => !ARCHIVOS.includes(f) && !EXCLUIDOS.includes(f));
  afirmar(faltanEnIndex.length === 0,
    "todos los archivos del arnés están en index.html",
    "index.html no carga: " + faltanEnIndex.join(", "));
  afirmar(faltanEnTest.length === 0,
    "el arnés carga todos los archivos de index.html",
    "el arnés no carga: " + faltanEnTest.join(", ") + " (agregalos a ARCHIVOS en harness.js)");

  afirmar(P.EVENTS.length >= 150, `${P.EVENTS.length} eventos base cargados`,
    `solo ${P.EVENTS.length} eventos base (se esperaban 150+)`);

  const porUnlock = {};
  for (const e of P.EVENTS) {
    const k = e.unlock || "base";
    porUnlock[k] = (porUnlock[k] || 0) + 1;
  }
  info("por desbloqueo: " + JSON.stringify(porUnlock));
  info(`piezas: ${P.ESCENARIOS.length} escenarios · ${P.PERSONAJES.length} personajes · ` +
    `${P.COMPLICACIONES.length} complicaciones · ${P.OBJETOS_MENCION.length} objetos · ${P.FRASES_GURU.length} frases`);
  info(`${Object.keys(P.ASCII).length} ilustraciones · ${P.FINALES.length} finales · ` +
    `${P.EPITAFIOS.length} epitafios · ${P.UNLOCKS.length} desbloqueos · ${P.LOGROS.length} logros`);

  afirmar(porUnlock.base >= 50, `${porUnlock.base} eventos disponibles en la primera run`,
    `solo ${porUnlock.base} eventos sin desbloquear: la run 1 va a repetir`);
});

grupo("estructura de los eventos", () => {
  const P = cargar();
  const CATEGORIAS = ["dialogo", "trip", "combate", "descanso", "comercio", "ruta", "ritual", "final"];
  const STATS = P.STATS.map(s => s.id);
  const vistos = new Set();
  let errores = 0;

  const todos = P.EVENTS.concat([P.EVENTO_ASCENSO]);
  for (const e of todos) {
    const err = m => { mal(`${e.id}: ${m}`); errores++; };

    if (vistos.has(e.id)) err("id duplicado");
    vistos.add(e.id);
    if (!e.tramo || !e.tramo.length) err("sin tramo");
    if (!CATEGORIAS.includes(e.categoria)) err(`categoría desconocida "${e.categoria}"`);
    if (e.ascii && !P.ASCII[e.ascii]) err(`ascii inexistente "${e.ascii}"`);
    if (e.unlock && !P.UNLOCK_BY_ID[e.unlock]) err(`unlock inexistente "${e.unlock}"`);
    if (!e.variantes || !e.variantes.length) err("sin variantes de texto");
    (e.variantes || []).forEach((v, i) => {
      if (!v.texto || !v.texto.length) err(`variante ${i} sin párrafos`);
    });
    if (!e.opciones || !e.opciones.length) err("sin opciones");

    (e.opciones || []).forEach(o => {
      if (!o.label) err("opción sin label");
      if (o.tirada) {
        if (!o.exito || !o.fallo) err(`tirada sin exito/fallo: "${o.label}"`);
        if (!STATS.includes(o.tirada.stat)) err(`tirada con stat inexistente "${o.tirada.stat}"`);
      }
      for (const k of Object.keys(o.efectos || {})) {
        if (!STATS.includes(k)) err(`efecto sobre stat inexistente "${k}"`);
      }
      if (o.riesgo && (typeof o.riesgo.prob !== "number" || o.riesgo.prob <= 0 || o.riesgo.prob > 1)) {
        err(`riesgo con probabilidad inválida en "${o.label}"`);
      }
      if (o.unlock && !P.UNLOCK_BY_ID[o.unlock]) err(`opción con unlock inexistente "${o.unlock}"`);
    });
  }

  if (!errores) ok(`${todos.length} eventos con estructura válida`);

  // referencias cruzadas del meta
  let refs = 0;
  for (const u of P.UNLOCKS) {
    for (const r of u.req) if (!P.UNLOCK_BY_ID[r]) { mal(`unlock ${u.id} requiere "${r}", que no existe`); refs++; }
  }
  for (const p of P.PERSONAJES_JUGABLES) {
    if (p.unlock && !P.UNLOCK_BY_ID[p.unlock]) { mal(`personaje ${p.id} pide unlock inexistente`); refs++; }
  }
  for (const r of P.RELIQUIAS) {
    if (!P.UNLOCK_BY_ID[r.id]) { mal(`reliquia ${r.id} no tiene entrada en el árbol`); refs++; }
  }
  for (const f of P.FINALES) {
    if (f.unlock && !P.UNLOCK_BY_ID[f.unlock]) { mal(`final ${f.id} pide unlock inexistente`); refs++; }
    if (f.ascii && !P.ASCII[f.ascii]) { mal(`final ${f.id} pide ascii inexistente`); refs++; }
  }
  for (const k of Object.keys(P.MUERTES)) {
    const m = P.MUERTES[k];
    if (m.ascii && !P.ASCII[m.ascii]) { mal(`muerte ${k} pide ascii inexistente`); refs++; }
  }
  if (!refs) ok("todas las referencias del meta (unlocks, reliquias, finales, ascii) resuelven");
});

grupo("placeholders y slots", () => {
  const P = cargar();
  const CONOCIDOS = new Set(["escenario", "escenario.detalle", "personaje", "personaje.nombre",
    "personaje.mote", "personaje.desc", "personaje.actitud", "personaje2", "personaje2.nombre",
    "personaje2.mote", "personaje2.desc", "complicacion", "objeto", "frase"]);
  const CON_SLOT = ["escenario", "personaje", "personaje2", "complicacion"];

  const desconocidos = new Set();
  const sinSlot = new Set();
  const sinCapitalizar = new Set();

  const escanear = (txt, e) => {
    if (!txt) return;
    for (const m of String(txt).match(/\{\^?[^}]+\}/g) || []) {
      const clave = m.replace(/^\{\^?/, "").replace(/\}$/, "");
      if (!CONOCIDOS.has(clave)) desconocidos.add(`${m} en ${e.id}`);
      const raiz = clave.split(".")[0];
      if (CON_SLOT.includes(raiz) && !(e.slots && e.slots[raiz])) {
        sinSlot.add(`${e.id} usa {${raiz}} sin declarar el slot`);
      }
    }
    // placeholder que arranca oración sin la marca de mayúscula
    for (const m of String(txt).match(/[.!?»]\s+\{(?!\^)[a-z][^}]*\}/g) || []) {
      sinCapitalizar.add(`${e.id}: "${m.trim()}" debería ser {^…}`);
    }
  };

  for (const e of P.EVENTS.concat([P.EVENTO_ASCENSO])) {
    e.variantes.forEach(v => v.texto.forEach(t => escanear(t, e)));
    e.opciones.forEach(o => {
      escanear(o.label, e);
      (o.resultado || []).forEach(t => escanear(t, e));
      if (o.riesgo) (o.riesgo.resultado || []).forEach(t => escanear(t, e));
      if (o.exito) (o.exito.resultado || []).forEach(t => escanear(t, e));
      if (o.fallo) (o.fallo.resultado || []).forEach(t => escanear(t, e));
    });
  }

  afirmar(desconocidos.size === 0, "todos los placeholders existen",
    "placeholders desconocidos:\n       " + [...desconocidos].join("\n       "));
  afirmar(sinSlot.size === 0, "todos los placeholders tienen su slot declarado",
    "slots faltantes:\n       " + [...sinSlot].join("\n       "));
  afirmar(sinCapitalizar.size === 0, "los placeholders a principio de oración usan {^…}",
    "faltan mayúsculas:\n       " + [...sinCapitalizar].join("\n       "));
});

grupo("coherencia de las piezas", () => {
  const P = cargar();
  desbloquearTodo(P);

  const coincide = (p, filtro) => {
    if (!filtro) return true;
    const t = p.tags || [];
    if (filtro.tags && filtro.tags.length && !filtro.tags.some(x => t.includes(x))) return false;
    if (filtro.notTags && filtro.notTags.some(x => t.includes(x))) return false;
    return true;
  };
  const candidatos = (tabla, filtro) => {
    const disp = tabla.filter(p => P.tieneUnlock(p.unlock));
    const estrictos = disp.filter(p => coincide(p, filtro));
    return estrictos.length ? estrictos : disp;   // el motor relaja el filtro si no hay nadie
  };

  /* 1. las piezas del plano astral no deben aparecer en eventos mundanos.
     Un evento declara que juega en el plano astral con `astral: true`; los packs
     as_/eg_/vc_ lo son por definición. */
  const esAstral = e => e.astral === true || /^(as_|eg_|vc_)/.test(e.id) ||
    ["ev_ego_astral", "ev_iluminacion_falsa"].includes(e.id);
  const soloAstral = P.PERSONAJES.filter(p => (p.tags || []).every(t => t === "ego" || t === "astral"));
  const fugas = [];
  for (const e of P.EVENTS) {
    if (esAstral(e)) continue;
    for (const slot of ["personaje", "personaje2"]) {
      const f = e.slots && e.slots[slot];
      if (!f) continue;
      const malos = candidatos(P.PERSONAJES, f).filter(p => soloAstral.includes(p));
      if (malos.length) fugas.push(`${e.id}.${slot} ← ${malos.map(p => p.id).join(", ")}`);
    }
  }
  afirmar(fugas.length === 0,
    `los ${soloAstral.length} personajes del plano astral no se filtran a eventos mundanos`,
    "fuga de personajes astrales:\n       " + fugas.join("\n       "));

  // 2. ningún slot debe quedarse sin candidatos temáticos (el motor relaja y desafina el tono)
  const relajados = [];
  for (const e of P.EVENTS) {
    for (const [slot, tabla] of [["escenario", P.ESCENARIOS], ["personaje", P.PERSONAJES],
      ["personaje2", P.PERSONAJES], ["complicacion", P.COMPLICACIONES]]) {
      const f = e.slots && e.slots[slot];
      if (!f || !f.tags) continue;
      const estrictos = tabla.filter(p => P.tieneUnlock(p.unlock) && coincide(p, f));
      if (estrictos.length < 3) relajados.push(`${e.id}.${slot}: ${estrictos.length} candidato(s)`);
    }
  }
  afirmar(relajados.length === 0, "todos los slots con tags tienen 3+ candidatos temáticos",
    "slots con pool insuficiente (el motor va a relajar el filtro):\n       " + relajados.join("\n       "));
});

grupo("espacio de combinaciones por evento", () => {
  const P = cargar();
  const coincide = (p, f) => {
    if (!f) return true;
    const t = p.tags || [];
    if (f.tags && f.tags.length && !f.tags.some(x => t.includes(x))) return false;
    if (f.notTags && f.notTags.some(x => t.includes(x))) return false;
    return true;
  };
  const cuenta = (tabla, f) => {
    const disp = tabla.filter(p => P.tieneUnlock(p.unlock));
    const est = disp.filter(p => coincide(p, f));
    return (est.length || disp.length);
  };
  const espacio = e => {
    const s = e.slots || {};
    let n = e.variantes.length;
    if (s.escenario) n *= cuenta(P.ESCENARIOS, s.escenario);
    if (s.personaje) n *= cuenta(P.PERSONAJES, s.personaje);
    if (s.personaje2) n *= cuenta(P.PERSONAJES, s.personaje2);
    if (s.complicacion) n *= cuenta(P.COMPLICACIONES, s.complicacion);
    return n;
  };

  const medir = etiqueta => {
    const filas = P.EVENTS.map(e => ({ id: e.id, n: espacio(e) })).sort((a, b) => a.n - b.n);
    const mediana = filas[Math.floor(filas.length / 2)].n;
    info(`${etiqueta}: mediana ${mediana} · mínimo ${filas[0].n} (${filas[0].id}) · máximo ${filas[filas.length - 1].n}`);
    return filas;
  };

  medir("solo contenido base");
  desbloquearTodo(P);
  const filas = medir("todo desbloqueado");

  const pobres = filas.filter(r => r.n < 20);
  afirmar(pobres.length === 0, "ningún evento tiene menos de 20 textos posibles",
    "eventos con pool muy chico (agregá variantes o piezas):\n       " +
    pobres.map(r => `${r.n} → ${r.id}`).join("\n       "));

  const d = P.diagnostico();
  info(`total registrable: ≈${d.combinaciones.toLocaleString("es-AR")} combinaciones`);
});

grupo("simulación de runs", () => {
  const P = cargar();
  desbloquearTodo(P);

  const finales = {};
  const muertes = {};
  let total = 0, victorias = 0, turnos = 0, ka = 0;

  for (const [nombre, est] of Object.entries(ESTRATEGIAS)) {
    for (let i = 0; i < RUNS_POR_ESTRATEGIA; i++) {
      let r;
      try {
        r = jugarRun(P, est);
      } catch (e) {
        mal(`estrategia "${nombre}", run ${i + 1}: ${e.message}`);
        return;
      }
      total++;
      turnos += r.turno - 1;
      ka += r.resumen.total;
      finales[r.fin.nombre] = (finales[r.fin.nombre] || 0) + 1;
      if (r.fin.tipo === "victoria") victorias++;
      if (r.fin.tipo === "muerte") muertes[r.fin.causa] = (muertes[r.fin.causa] || 0) + 1;
      if (r.resumen.total <= 0) mal(`run sin KA: ${nombre} #${i + 1}`);
    }
  }

  ok(`${total} runs completas con ${Object.keys(ESTRATEGIAS).length} estrategias, sin excepciones`);
  info(`turnos promedio ${(turnos / total).toFixed(1)} · KA promedio ${(ka / total).toFixed(0)} · victorias ${victorias}`);
  info("finales: " + JSON.stringify(finales));
  info("muertes: " + JSON.stringify(muertes));

  afirmar(turnos / total >= 8 && turnos / total <= 30,
    `duración media razonable (${(turnos / total).toFixed(1)} turnos)`,
    `duración media fuera de rango: ${(turnos / total).toFixed(1)} turnos`);
  afirmar(victorias > 0, "se puede ganar", "ninguna run ganó: revisá el gate de Conciencia");
  afirmar(victorias < total, "se puede perder", "todas las runs ganaron: no hay tensión");
});

grupo("las cinco muertes son alcanzables", () => {
  const P = cargar();
  desbloquearTodo(P);

  /* Cada muerte tiene un estilo de juego que la busca. Cortamos en cuanto
     aparece: si algo se vuelve inalcanzable, el presupuesto se agota y falla. */
  const objetivos = [
    { causa: "aguante", estrategia: "kamikaze", como: "reventarse el cuerpo" },
    { causa: "efecto", estrategia: "quemado", como: "vivir arriba" },
    { causa: "paranoia", estrategia: "quemado", como: "quemarse la cabeza" },
    // el Ex-Monje arranca con Conciencia 5: es la encarnación que puede apagarse
    { causa: "conciencia", estrategia: "vegetal", personaje: "monje", como: "apagarse con el Ex-Monje" },
    { causa: "mangos", estrategia: "primera", como: "gastar lo que no tiene" }
  ];
  const PRESUPUESTO = RAPIDO ? 60 : 200;

  for (const o of objetivos) {
    P.meta.personaje = o.personaje || "base";
    let runs = 0, encontrada = false;
    while (runs < PRESUPUESTO && !encontrada) {
      runs++;
      const r = jugarRun(P, ESTRATEGIAS[o.estrategia]);
      if (r.fin.tipo === "muerte" && r.fin.causa === o.causa) encontrada = true;
    }
    afirmar(encontrada,
      `${P.MUERTES[o.causa].nombre} — alcanzable ${o.como} (${runs} run${runs > 1 ? "s" : ""})`,
      `${P.MUERTES[o.causa].nombre} nunca ocurrió en ${PRESUPUESTO} runs de "${o.estrategia}"` +
      (o.personaje ? ` con ${o.personaje}` : "") + ": es contenido inalcanzable");
  }
  P.meta.personaje = "base";

  // la Naloxona tiene que servir de verdad, si no son 110 KA tirados
  let salvadas = 0, muertesEfecto = 0;
  for (let i = 0; i < (RAPIDO ? 30 : 120); i++) {
    const r = jugarRun(P, ESTRATEGIAS.quemado, {
      antesDeElegir: p => { if (!p.run.reliquias.includes("C2")) p.run.reliquias.push("C2"); }
    });
    if (r.naloxonaUsada) salvadas++;
    if (r.fin.tipo === "muerte" && r.fin.causa === "efecto") muertesEfecto++;
  }
  afirmar(salvadas > 0, `la Ampolla de Naloxona se activa y salva runs (${salvadas} veces)`,
    "la Naloxona nunca se activó: la reliquia no hace nada");
  info(`con Naloxona: ${salvadas} rescates, ${muertesEfecto} sobredosis igual`);
});

grupo("no repetición de contenido", () => {
  const RUNS = RAPIDO ? 15 : 60;

  /* Se mide en los dos extremos. El jugador NUEVO es el caso peor —tiene solo el
     pool base— y es justo el que decide si el juego engancha o se abandona. */
  const medir = (etiqueta, desbloquear, techo) => {
    const P = cargar();
    if (desbloquear) desbloquearTodo(P);
    for (let i = 0; i < RUNS; i++) jugarRun(P, ESTRATEGIAS.azar);

    const mostrados = Object.values(P.seen.eventCount).reduce((a, b) => a + b, 0);
    const unicos = Object.keys(P.seen.combos).length;
    const pct = ((mostrados - unicos) / mostrados) * 100;
    const conteos = Object.values(P.seen.eventCount);
    const max = Math.max(...conteos), min = Math.min(...conteos);

    info(`${etiqueta}: ${P.diagnostico().eventos} eventos disponibles · ${mostrados} mostrados · ` +
      `${unicos} únicos · el más visto salió ${max} veces`);
    afirmar(pct <= techo, `${etiqueta} — repetición ${pct.toFixed(1)}% (techo ${techo}%)`,
      `${etiqueta} — demasiada repetición: ${pct.toFixed(1)}% en ${RUNS} runs`);
    return { P, mostrados, max, min };
  };

  medir("jugador nuevo (solo pool base)", false, 1.5);
  const { P, mostrados, max, min } = medir("todo desbloqueado", true, 1);

  afirmar(max - min <= mostrados / 20,
    "el pool rota parejo (nadie se repite antes de que salgan los demás)",
    `rotación desbalanceada: alguien salió ${max} veces y otro ${min}`);

  // purgar la memoria de textos no debe tocar el meta
  const kaAntes = P.meta.ka;
  const unlocksAntes = P.meta.unlocks.length;
  P.purgarMemoriaEventos();
  afirmar(P.seen.comboCount === 0 && P.meta.ka === kaAntes && P.meta.unlocks.length === unlocksAntes,
    "purgar la memoria de textos no toca el KA ni los desbloqueos",
    "purgar la memoria dañó el meta-progreso");
  afirmar(Object.keys(P.seen.eventCount).length > 0,
    "purgar conserva el contador de rotación del pool",
    "purgar borró eventCount: el pool va a repetir eventos base");
});

grupo("meta-progreso", () => {
  const P = cargar();

  // el árbol entero tiene que ser alcanzable
  P.meta.ka = 999999;
  let comprados = 0, pases = 0, antes;
  do {
    antes = comprados;
    pases++;
    for (const u of P.UNLOCKS) if (P.comprar(u.id)) comprados++;
  } while (comprados > antes && pases < 10);
  afirmar(comprados === P.UNLOCKS.length,
    `los ${P.UNLOCKS.length} desbloqueos son alcanzables (en ${pases} pases)`,
    `${P.UNLOCKS.length - comprados} desbloqueos inalcanzables: revisá los requisitos`);
  info("costo total del árbol: " + P.UNLOCKS.reduce((a, u) => a + u.costo, 0) + " KA");

  // no se puede comprar sin plata
  const P2 = cargar();
  P2.meta.ka = 0;
  afirmar(!P2.comprar("A1"), "no se puede comprar sin KA", "se compró un desbloqueo con 0 KA");
  P2.meta.ka = 60;
  afirmar(P2.comprar("A1") && P2.meta.ka === 0, "comprar descuenta el costo exacto",
    "el descuento de KA no cierra");
  afirmar(!P2.comprar("A1"), "no se puede comprar dos veces lo mismo",
    "se compró dos veces el mismo desbloqueo");
  P2.meta.ka = 90;
  afirmar(P2.comprar("A2"), "los requisitos cumplidos habilitan la compra");
  const P3 = cargar();
  P3.meta.ka = 500;
  afirmar(!P3.comprar("A2"), "no se puede saltear un requisito",
    "se compró A2 sin tener A1");

  // cada personaje jugable tiene que poder terminar una run
  const P4 = cargar();
  desbloquearTodo(P4);
  let todosOk = true;
  for (const pj of P4.PERSONAJES_JUGABLES) {
    P4.meta.personaje = pj.id;
    try {
      for (let i = 0; i < (RAPIDO ? 3 : 8); i++) jugarRun(P4, ESTRATEGIAS.azar);
    } catch (e) {
      mal(`${pj.nombre}: ${e.message}`);
      todosOk = false;
    }
  }
  if (todosOk) ok(`las ${P4.PERSONAJES_JUGABLES.length} encarnaciones completan runs sin romperse`);
});

grupo("finales alcanzables", () => {
  const P = cargar();
  desbloquearTodo(P);

  // forzamos perfiles de stats en cada turno para llegar a cada final
  const perfiles = [
    { nombre: "limpio y santo", stats: { conciencia: 108, karma: 90, efecto: 0, mangos: 500, aguante: 90, paranoia: 0 } },
    { nombre: "químico", stats: { conciencia: 108, karma: 20, efecto: 70, mangos: 500, aguante: 90, paranoia: 0 } },
    { nombre: "podrido", stats: { conciencia: 108, karma: -60, efecto: 20, mangos: 800, aguante: 90, paranoia: 0 } },
    { nombre: "santo y pobre", stats: { conciencia: 108, karma: 80, efecto: 0, mangos: -50, aguante: 90, paranoia: 0 } },
    // iluminado con karma y efecto en la franja intermedia: no cae en ningún final "puro"
    { nombre: "iluminado incómodo", stats: { conciencia: 108, karma: 10, efecto: 30, mangos: 400, aguante: 90, paranoia: 0 } },
    { nombre: "tibio", stats: { conciencia: 50, karma: 0, efecto: 10, mangos: 300, aguante: 90, paranoia: 0 } }
  ];

  const alcanzados = new Set();
  for (const perfil of perfiles) {
    for (let i = 0; i < (RAPIDO ? 20 : 60); i++) {
      const r = jugarRun(P, ESTRATEGIAS.azar, {
        antesDeElegir: p => { Object.assign(p.run.stats, perfil.stats); }
      });
      if (r.fin && r.fin.nombre) alcanzados.add(r.fin.nombre);
      if (r.puenteFinal) alcanzados.add(r.puenteFinal.nombre);
    }
  }

  const esperados = P.FINALES.map(f => f.nombre);
  const faltan = esperados.filter(n => !alcanzados.has(n));
  info("alcanzados: " + [...alcanzados].join(" · "));
  afirmar(faltan.length === 0, `los ${esperados.length} finales son alcanzables`,
    "finales inalcanzables: " + faltan.join(", "));
});

grupo("persistencia", () => {
  const P = cargar();
  P.meta.ka = 500;
  P.meta.unlocks.push("A1");
  P.saveMeta();

  P.nuevaRun();
  const stats = JSON.stringify(P.run.stats);
  const turno = P.run.turno;

  // simular cerrar la pestaña
  P.run = null;
  afirmar(P.hayRunGuardada(), "la run en curso queda guardada", "se perdió la run al cerrar");
  P.reanudar();
  afirmar(JSON.stringify(P.run.stats) === stats && P.run.turno === turno,
    "reanudar restaura stats y turno exactos", "reanudar perdió estado");

  // morir borra la run pero no el meta
  P.run.stats.aguante = 1;
  jugarRun(P, ESTRATEGIAS.kamikaze);
  const meta = P.Save.read(P.KEYS.meta, {});
  afirmar(meta.ka >= 500, "el KA sobrevive a la muerte", "morir borró el KA");
  afirmar(meta.unlocks.includes("A1"), "los desbloqueos sobreviven a la muerte",
    "morir borró los desbloqueos");
  afirmar(P.Save.read(P.KEYS.run, null) === null || P.run.fase === "fin",
    "la run muerta no queda como run en curso");

  // borrar todo limpia de verdad
  P.borrarTodo();
  afirmar(P.meta.ka === 0 && P.meta.unlocks.length === 0 && P.seen.comboCount === 0,
    "borrar todo resetea meta y memoria", "borrar todo dejó residuos");

  // un save corrupto no debe romper el juego
  const P5 = cargar();
  P5.Save.write(P5.KEYS.meta, "{ esto no es json");
  const recargado = P5.Save.read(P5.KEYS.meta, P5.DEFAULT_META);
  afirmar(recargado && recargado.ka === 0, "un save corrupto cae al default sin explotar",
    "un save corrupto rompe la carga");
});

/* ============================================================ */

console.log("\n\x1b[1mPICHICATA — suite de pruebas\x1b[0m" + (RAPIDO ? " \x1b[2m(modo rápido)\x1b[0m" : ""));

for (const g of grupos) {
  console.log("\n\x1b[1m" + g.nombre + "\x1b[0m");
  try {
    g.fn();
  } catch (e) {
    mal("excepción no esperada: " + e.message);
    if (process.env.DEBUG) console.log(e.stack);
  }
}

console.log("");
if (fallos) {
  console.log(`\x1b[31m\x1b[1m${fallos} problema(s).\x1b[0m\n`);
  process.exit(1);
}
console.log("\x1b[32m\x1b[1mTodo en orden.\x1b[0m\n");
