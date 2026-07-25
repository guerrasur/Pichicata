/* PICHICATA — loop de la run: tramos, turnos, efectos, muertes y finales. */

window.PICHI = window.PICHI || {};

PICHI.TRAMOS = [
  { n: 1, nombre: "I — EL BARRIO", turnos: 6, ritmo: ["dialogo", "comercio", "trip", "dialogo", "descanso", "ruta"] },
  { n: 2, nombre: "II — EL RETIRO", turnos: 6, ritmo: ["ritual", "dialogo", "trip", "descanso", "combate", "trip"] },
  { n: 3, nombre: "III — LA CAÍDA", turnos: 6, ritmo: ["trip", "combate", "dialogo", "descanso", "trip", "ruta"] },
  { n: 4, nombre: "IV — EL ASCENSO", turnos: 4, ritmo: ["combate", "trip", "combate", "descanso"] },
  { n: 5, nombre: "V — EL VACÍO", turnos: 6, ritmo: ["trip", "dialogo", "descanso", "combate", "trip", "ruta"] }
];

PICHI.GATE_TRAMO_4 = 85;   // Conciencia mínima para acceder al Ascenso
PICHI.META_CONCIENCIA = 108;

PICHI.tramoDef = function (n) {
  for (var i = 0; i < PICHI.TRAMOS.length; i++) if (PICHI.TRAMOS[i].n === n) return PICHI.TRAMOS[i];
  return PICHI.TRAMOS[0];
};

PICHI.nombreTramo = function (n) {
  var d = PICHI.tramoDef(n);
  if (n === 2 && PICHI.run && PICHI.run.via === "norte") return "II — LA RUTA DEL NORTE";
  if (n === 3 && PICHI.run && PICHI.run.via3 === "sotano") return "III — EL SÓTANO";
  return d.nombre;
};

/* ================= el elenco de la run ================= */

/* Tres personas que van a volver a aparecer. Se sortea una de cada franja para
   que el viaje tenga un chanta, alguien de la calle y alguien que te cuida, en
   vez de tres versiones de lo mismo. Se excluyen las piezas del plano astral:
   esas aparecen cuando aparecen y no son "gente del viaje". */
PICHI.FRANJAS_ELENCO = [
  ["guru", "chanta", "ritual"],
  ["lumpen", "social", "joven", "comercio", "quimico", "musico"],
  ["cuidadora", "familia", "veterano", "testigo", "autentico", "animal"]
];

PICHI.armarElenco = function () {
  var disponibles = PICHI.piezasDisponibles(PICHI.PERSONAJES);
  var elenco = [], i, j;

  for (i = 0; i < PICHI.FRANJAS_ELENCO.length; i++) {
    var franja = PICHI.FRANJAS_ELENCO[i], cands = [];
    for (j = 0; j < disponibles.length; j++) {
      var p = disponibles[j], tags = p.tags || [];
      if (elenco.indexOf(p.id) !== -1) continue;
      /* Fuera cualquier pieza del plano astral, no solo las exclusivas: un
         jaguar que te acompaña todo el viaje por el conurbano no es un elenco,
         es un error. El perro de la calle sí, que es otra cosa. */
      if (!tags.length || tags.indexOf("astral") !== -1 || tags.indexOf("ego") !== -1) continue;
      for (k = 0; k < franja.length; k++) if (tags.indexOf(franja[k]) !== -1) { cands.push(p); break; }
    }
    if (cands.length) elenco.push(PICHI.pick(cands).id);
  }
  return elenco;
};

PICHI.elencoDeLaRun = function () {
  var out = [], i;
  if (!PICHI.run || !PICHI.run.elenco) return out;
  for (i = 0; i < PICHI.run.elenco.length; i++) {
    var id = PICHI.run.elenco[i];
    for (var j = 0; j < PICHI.PERSONAJES.length; j++) {
      if (PICHI.PERSONAJES[j].id === id) {
        out.push({ pieza: PICHI.PERSONAJES[j], encuentros: (PICHI.run.encuentros || {})[id] || 0 });
        break;
      }
    }
  }
  return out;
};

/* ================= arranque ================= */

PICHI.nuevaRun = function () {
  var pj = PICHI.personajeJugable(PICHI.meta.personaje);
  PICHI.rng.set((Date.now() ^ (Math.random() * 0xffffffff)) >>> 0);

  var stats = {};
  for (var k in pj.stats) stats[k] = pj.stats[k];

  PICHI.run = {
    version: 1,
    personaje: pj.id,
    pasiva: pj.pasiva,
    turno: 1,
    tramo: 1,
    turnoEnTramo: 1,
    stats: stats,
    flags: {},
    vistosEnRun: {},
    piezasUsadas: {},
    reliquias: [],
    naloxonaUsada: false,
    ojoUsado: false,
    via: (PICHI.tieneUnlock("D1") && PICHI.chance(0.5)) ? "norte" : "clasico",
    via3: (PICHI.tieneUnlock("D2") && PICHI.chance(0.5)) ? "sotano" : "clasico",
    elenco: [],
    encuentros: {},
    evento: null,
    fase: "evento",
    resolucion: null,
    fin: null,
    marcas: { maxConciencia: stats.conciencia, maxMangos: stats.mangos, efectoSiempreCero: stats.efecto === 0, paranoiaAlta: false, decisiones: 0 }
  };

  // el elenco tiene que existir antes del primer evento
  PICHI.run.elenco = PICHI.armarElenco();

  // el encendedor arranca la run con material
  if (PICHI.tieneUnlock("C4")) { PICHI.run.reliquias.push("C4"); PICHI.run.flags.tiene_faso = true; }
  // el monje tiene vino propio
  if (pj.pasiva === "monje") PICHI.run.flags.vino_infinito = true;

  // 30% de arrancar con una reliquia desbloqueada
  var pool = PICHI.reliquiasDisponibles();
  if (pool.length && PICHI.chance(0.3)) PICHI.darReliquia();

  PICHI.saveRun();
  PICHI.siguienteEvento();
};

PICHI.reliquiasDisponibles = function () {
  var out = [];
  for (var i = 0; i < PICHI.RELIQUIAS.length; i++) {
    var r = PICHI.RELIQUIAS[i];
    if (PICHI.tieneUnlock(r.id) && PICHI.run.reliquias.indexOf(r.id) === -1) out.push(r);
  }
  return out;
};

PICHI.tieneReliquiaEnRun = function (id) {
  return !!(PICHI.run && PICHI.run.reliquias.indexOf(id) !== -1);
};

PICHI.darReliquia = function () {
  var pool = PICHI.reliquiasDisponibles();
  if (!pool.length) return null;
  var r = PICHI.pick(pool);
  PICHI.run.reliquias.push(r.id);
  if (r.id === "C4") PICHI.run.flags.tiene_faso = true;
  return r;
};

/* ================= selección de evento ================= */

PICHI.ctxActual = function (categoria) {
  return {
    tramo: PICHI.run.tramo,
    stats: PICHI.run.stats,
    flags: PICHI.run.flags,
    vistosEnRun: PICHI.run.vistosEnRun,
    piezasUsadas: PICHI.run.piezasUsadas,
    categoria: categoria || null
  };
};

function categoriaDelTurno() {
  var def = PICHI.tramoDef(PICHI.run.tramo);
  var idx = (PICHI.run.turnoEnTramo - 1) % def.ritmo.length;
  var cat = def.ritmo[idx];
  // un poco de jitter para que no sea una plantilla rígida
  if (PICHI.chance(0.25)) {
    var todas = ["dialogo", "trip", "combate", "descanso", "comercio", "ruta", "ritual"];
    cat = PICHI.pick(todas);
  }
  // nunca dos veces la misma categoría seguida (salvo diálogo)
  if (PICHI.run.ultimaCategoria === cat && cat !== "dialogo") {
    var alt = ["dialogo", "trip", "combate", "descanso", "comercio", "ruta", "ritual"];
    for (var i = 0; i < 6; i++) { var c = PICHI.pick(alt); if (c !== cat) { cat = c; break; } }
  }
  return cat;
}

PICHI.siguienteEvento = function () {
  var def = PICHI.tramoDef(PICHI.run.tramo);

  // ¿toca el evento final del tramo?
  if ((PICHI.run.tramo === 4 || PICHI.run.tramo === 5) && PICHI.run.turnoEnTramo > def.turnos) {
    PICHI.run.evento = PICHI.armarFinal();
    PICHI.run.fase = "evento";
    PICHI.saveRun();
    PICHI.UI.render();
    return;
  }

  var cat = categoriaDelTurno();
  var ctx = PICHI.ctxActual(cat);
  var ev = PICHI.elegirEvento(ctx);
  if (!ev) { // pool vacío para este tramo: probamos sin categoría
    ctx = PICHI.ctxActual(null);
    ev = PICHI.elegirEvento(ctx);
  }
  if (!ev) { PICHI.terminarRun(null); return; }

  PICHI.run.ultimaCategoria = ev.categoria;
  PICHI.run.vistosEnRun[ev.id] = 1;
  PICHI.run.evento = PICHI.armarEvento(ev, ctx);
  PICHI.run.evento.opciones = PICHI.decorarOpciones(PICHI.run.evento);
  PICHI.run.fase = "evento";
  PICHI.saveRun();
  PICHI.UI.render();
};

PICHI.armarFinal = function () {
  var ctx = PICHI.ctxActual(null);
  var ev = PICHI.armarEvento(PICHI.EVENTO_ASCENSO, ctx);
  ev.esFinal = true;
  ev.opciones = PICHI.decorarOpciones(ev);
  return ev;
};

/* Añade la opción del monje, el spoiler del tarot y el de la Libreta. */
PICHI.decorarOpciones = function (evento) {
  var ops = evento.opciones.slice();

  if (PICHI.run.flags.vino_infinito && !evento.esFinal) {
    ops.push({
      ref: {
        id: "vino", label: "Tomar del litro que traés siempre.",
        efectos: { efecto: 18, aguante: 8, conciencia: -4, paranoia: -10 },
        resultado: ["Tomás del litro. Nunca se termina y eso hace treinta años que es un problema.",
                    "Dos tragos largos. El mundo se acomoda un poco y se aleja un poco."]
      },
      label: "Tomar del litro que traés siempre.", disponible: true, motivo: null
    });
  }

  var verTodos = PICHI.tieneReliquiaEnRun("C6");
  var idxSpoiler = (PICHI.run.pasiva === "tarot" && ops.length) ? PICHI.rndInt(ops.length) : -1;

  for (var i = 0; i < ops.length; i++) {
    ops[i].spoiler = (verTodos || i === idxSpoiler) ? PICHI.resumenEfectos(ops[i].ref) : null;
    // el dado SIEMPRE se muestra antes de elegir: el riesgo es información, no sorpresa
    ops[i].dado = ops[i].disponible === false ? null : PICHI.pronosticoDeOpcion(ops[i].ref);
  }
  return ops;
};

PICHI.resumenEfectos = function (op) {
  var partes = [], e = op.efectos || {};
  var nombres = { conciencia: "CON", karma: "KAR", aguante: "AGU", mangos: "$", efecto: "EFE", paranoia: "PAR" };
  for (var k in nombres) {
    if (typeof e[k] === "number" && e[k] !== 0) partes.push(nombres[k] + (e[k] > 0 ? "+" : "") + e[k]);
  }
  if (op.tirada) partes.push("tirada de " + op.tirada.stat.toUpperCase());
  if (op.riesgo) partes.push("riesgo " + Math.round(op.riesgo.prob * 100) + "%");
  if (op.daReliquia) partes.push("objeto");
  return partes.length ? partes.join(" · ") : "sin efecto directo";
};

/* ================= aplicación de efectos ================= */

function aplicarDelta(deltas, id, valor) {
  if (!valor) return;
  deltas[id] = (deltas[id] || 0) + valor;
}

/* Modula un efecto según personaje y reliquias. */
function modular(id, valor, opRef) {
  var p = PICHI.run.pasiva;
  if (id === "paranoia" && valor > 0 && p === "fumon") valor = Math.round(valor * 0.6);
  if (id === "karma" && valor > 0 && p === "kiosquero") valor = Math.round(valor * 0.7);
  if (id === "mangos" && valor < 0 && p === "kiosquero") valor = Math.round(valor * 0.6);
  if (id === "mangos" && p === "perro") valor = 0;
  if (id === "aguante" && valor > 0 && PICHI.tieneReliquiaEnRun("C3")) valor = Math.round(valor * 1.5);
  if (id === "conciencia" && valor > 0 && opRef && opRef.medita && PICHI.tieneReliquiaEnRun("C5")) valor += 3;
  return valor;
}

/* Con qué se defiende cada tipo de situación cuando el contenido no lo dice. */
PICHI.STAT_POR_CATEGORIA = {
  combate: "aguante",
  dialogo: "karma",
  comercio: "karma",
  trip: "conciencia",
  ritual: "conciencia",
  descanso: "aguante",
  ruta: "aguante",
  final: "conciencia"
};

/* ¿Esta opción se juega con dado, y con qué stat contra qué dificultad?
   Unifica las tres formas: pericia (ejecución), riesgo (complicación) y tirada
   (dos ramas narrativas). Devuelve null si la opción es determinística. */
PICHI.dadoDeOpcion = function (op) {
  if (!op) return null;

  if (op.tirada) {
    var t = op.tirada;
    // `invertido` significaba "conviene tener el stat BAJO" (ej: Efecto)
    return {
      tipo: "tirada",
      stat: t.stat,
      dificultad: t.dificultad,
      invertido: !!t.invertido
    };
  }

  if (op.pericia) {
    return { tipo: "pericia", stat: op.pericia, dificultad: op.cd || 50, invertido: false };
  }

  /* Los riesgos venían como una probabilidad fija y oculta. Se convierten en una
     tirada visible sin tocar el contenido: la probabilidad se traduce a una
     dificultad y el stat se deduce de la categoría del evento, porque regatear
     no se defiende con el cuerpo y una pelea no se defiende con labia. */
  if (op.riesgo) {
    var cat = (PICHI.run && PICHI.run.evento) ? PICHI.run.evento.categoria : null;
    var stat = op.riesgo.stat || PICHI.STAT_POR_CATEGORIA[cat] || "aguante";
    // prob de que salga MAL. 0.5 -> dificultad = tu stat (moneda al aire)
    var dif = 50 + Math.round((op.riesgo.prob - 0.5) * 60);
    return { tipo: "riesgo", stat: stat, dificultad: dif, invertido: false };
  }

  return null;
};

/* Valor efectivo del stat para la tirada, respetando `invertido`. */
function valorParaDado(spec, stats) {
  var v = stats[spec.stat];
  if (typeof v !== "number") v = 50;
  if (spec.invertido) {
    // con Efecto alto tirás peor: el valor se invierte sobre su propio rango
    var def = null;
    for (var i = 0; i < PICHI.STATS.length; i++) if (PICHI.STATS[i].id === spec.stat) def = PICHI.STATS[i];
    var max = def ? def.max : 100, min = def ? def.min : 0;
    v = max - (v - min);
  }
  return v;
}

PICHI.pronosticoDeOpcion = function (op) {
  var spec = PICHI.dadoDeOpcion(op);
  if (!spec) return null;
  var v = valorParaDado(spec, PICHI.run.stats);
  return {
    spec: spec,
    etiqueta: PICHI.Dados.pronostico(spec.stat, v, spec.dificultad),
    mod: PICHI.Dados.modificador(spec.stat, v, spec.dificultad)
  };
};

/* La ventaja viene de las reliquias y del personaje. */
function ventajaDelDado(spec) {
  var v = 0;
  if (PICHI.tieneReliquiaEnRun("C6")) v += 1;                       // la Libreta te deja leer la situación
  if (spec.stat === "paranoia" && PICHI.run.pasiva === "doctora") v += 1;
  if (PICHI.run.stats.efecto >= 70 && spec.stat !== "conciencia") v -= 1;   // muy dado vuelta, peor pulso
  return Math.max(-1, Math.min(1, v));
}

PICHI.elegirOpcion = function (indice) {
  if (PICHI.run.fase !== "evento") return;
  var opt = PICHI.run.evento.opciones[indice];
  if (!opt || !opt.disponible) return;

  // el perro no habla: los diálogos se resuelven al azar
  if (PICHI.run.pasiva === "perro" && PICHI.run.evento.categoria === "dialogo") {
    var libres = [];
    for (var j = 0; j < PICHI.run.evento.opciones.length; j++) if (PICHI.run.evento.opciones[j].disponible) libres.push(j);
    indice = PICHI.pick(libres);
    opt = PICHI.run.evento.opciones[indice];
  }

  var op = opt.ref;
  var piezas = PICHI.run.evento.piezas;
  var deltas = {};
  var textos = [];
  var notas = [];

  // 1. efectos base
  var k;
  if (op.efectos) for (k in op.efectos) aplicarDelta(deltas, k, modular(k, op.efectos[k], op));

  // 2. hint de la complicación (sesgo suave del evento)
  if (PICHI.run.evento.hint) for (k in PICHI.run.evento.hint) aplicarDelta(deltas, k, modular(k, PICHI.run.evento.hint[k], op));

  // 3. texto base de resolución
  var base = PICHI.resolverTexto(op.resultado, piezas);
  if (base) textos.push(base);

  /* 4. EL DADO. Una sola tirada por decisión: se muestra, se aplica y se narra.
        Según el tipo, la misma tirada significa cosas distintas:
          tirada  -> elige entre dos ramas narrativas escritas
          riesgo  -> fallar hace aparecer la complicación
          pericia -> escala los efectos de la propia acción */
  var tirada = null;
  var spec = PICHI.dadoDeOpcion(op);
  if (spec) {
    var valor = valorParaDado(spec, PICHI.run.stats);
    tirada = PICHI.Dados.tirar(spec.stat, valor, spec.dificultad, ventajaDelDado(spec));
    tirada.tipo = spec.tipo;

    if (spec.tipo === "tirada") {
      var rama = tirada.exito ? op.exito : op.fallo;
      if (rama) {
        var efR = rama.efectos || {};
        // el crítico y la pifia amplifican la rama que tocó
        if (tirada.grado === "critico" || tirada.grado === "pifia") {
          efR = PICHI.Dados.aplicarEscala(efR, tirada.grado);
        }
        for (k in efR) aplicarDelta(deltas, k, modular(k, efR[k], op));
        var t = PICHI.resolverTexto(rama.resultado, piezas);
        if (t) textos.push(t);
        if (rama.flags) aplicarFlags(rama.flags);
      }
      if (tirada.grado === "critico" || tirada.grado === "pifia") {
        textos.push(PICHI.textoDado(tirada.grado, PICHI.run.evento.categoria));
      }
    } else if (spec.tipo === "riesgo") {
      if (!tirada.exito) {
        var efRi = op.riesgo.efectos || {};
        if (tirada.grado === "pifia") efRi = PICHI.Dados.aplicarEscala(efRi, "pifia");
        for (k in efRi) aplicarDelta(deltas, k, modular(k, efRi[k], op));
        var tr = PICHI.resolverTexto(op.riesgo.resultado, piezas);
        if (tr) textos.push(tr);
        if (op.riesgo.flags) aplicarFlags(op.riesgo.flags);
      } else if (tirada.grado === "critico") {
        textos.push(PICHI.textoDado("critico", PICHI.run.evento.categoria));
        // en un crítico, lo bueno de la acción rinde más
        for (k in (op.efectos || {})) {
          var extra = PICHI.Dados.esBueno(k, op.efectos[k]) ? Math.round(op.efectos[k] * 0.5) : 0;
          if (extra) aplicarDelta(deltas, k, modular(k, extra, op));
        }
      }
    } else if (spec.tipo === "pericia") {
      /* Los efectos base ya se aplicaron en el paso 1. Acá se corrige la
         diferencia entre lo aplicado y lo que corresponde según cómo salió. */
      var escalados = PICHI.Dados.aplicarEscala(op.efectos || {}, tirada.grado);
      for (k in escalados) {
        var diferencia = escalados[k] - (op.efectos[k] || 0);
        if (diferencia) aplicarDelta(deltas, k, modular(k, diferencia, op));
      }
      if (tirada.grado !== "exito") {
        textos.push(PICHI.textoDado(tirada.grado, PICHI.run.evento.categoria));
      }
    }

    notas.push(PICHI.Dados.nombreGrado(tirada.grado) + " · " + PICHI.Dados.etiqueta(tirada));
    PICHI.run.marcas.tiradas = (PICHI.run.marcas.tiradas || 0) + 1;
    if (tirada.grado === "critico") PICHI.run.marcas.criticos = (PICHI.run.marcas.criticos || 0) + 1;
    if (tirada.grado === "pifia") PICHI.run.marcas.pifias = (PICHI.run.marcas.pifias || 0) + 1;
  }

  // 6. flags
  if (op.flags) aplicarFlags(op.flags);

  // 7. reliquia
  var reliquia = null;
  if (op.daReliquia) {
    reliquia = PICHI.darReliquia();
    if (reliquia) textos.push("Te queda algo en el bolsillo: " + reliquia.nombre + ". " + reliquia.encuentro);
  }

  PICHI.run.marcas.decisiones++;
  PICHI.aplicarStats(deltas);

  /* El pico queda registrado en aplicarStats. Se chequea en continuar(), donde
     el metabolismo ya bajó el Efecto: la sobredosis se juega con la dosis que
     te metiste, no con lo que te queda después de metabolizarla. */

  // 8. final forzado / final del juego
  if (op.finalizar || PICHI.run.evento.esFinal) {
    PICHI.terminarRun(op.forzarFinal || null);
    return;
  }

  PICHI.run.resolucion = {
    textos: textos, deltas: deltas, notas: notas, tirada: tirada,
    reliquia: reliquia ? reliquia.nombre : null, label: opt.label
  };
  PICHI.run.fase = "resolucion";
  PICHI.saveRun();
  PICHI.UI.render();
};

function aplicarFlags(f) {
  var i;
  if (f.set) for (i = 0; i < f.set.length; i++) PICHI.run.flags[f.set[i]] = true;
  if (f.clear) for (i = 0; i < f.clear.length; i++) delete PICHI.run.flags[f.clear[i]];
}

PICHI.aplicarStats = function (deltas) {
  var s = PICHI.run.stats;
  for (var k in deltas) {
    if (typeof s[k] !== "number") continue;
    var crudo = s[k] + deltas[k];
    /* El Efecto se muestra topado en 100, pero la sobredosis se juega con la
       dosis CRUDA: meterse 38 encima de 85 son 123, no 100. Sin esto, como las
       opciones de dosis grande están gateadas por Efecto bajo, el tope de 100
       nunca se cruza y la muerte por Efecto (y toda la Ampolla de Naloxona)
       queda como contenido inalcanzable. */
    if (k === "efecto" && crudo > (PICHI.run.efectoCrudo || 0)) PICHI.run.efectoCrudo = crudo;
    s[k] = PICHI.clampStat(k, crudo);
  }
  var m = PICHI.run.marcas;
  if (s.conciencia > m.maxConciencia) m.maxConciencia = s.conciencia;
  if (s.mangos > m.maxMangos) m.maxMangos = s.mangos;
  if (s.efecto > 0) m.efectoSiempreCero = false;
  if (s.paranoia >= 95) m.paranoiaAlta = true;
};

/* ================= metabolismo y avance de turno ================= */

PICHI.continuar = function () {
  if (PICHI.run.fase !== "resolucion") return;

  var deltas = {};
  var s = PICHI.run.stats;

  /* Metabolismo saturable: cuanto más cargado estás, más lento limpia el cuerpo.
     Con un drenaje plano de 10-15 por turno era imposible SOSTENER Efecto alto
     —siempre volvías a la zona paranoica— y la sobredosis quedaba fuera de
     alcance por aritmética, no por decisión del jugador. */
  aplicarDelta(deltas, "efecto", s.efecto >= 70 ? -(4 + PICHI.rndInt(4)) : -(10 + PICHI.rndInt(6)));
  aplicarDelta(deltas, "aguante", PICHI.run.pasiva === "doctora" ? -3 : -2);
  /* La curva del Efecto tiene tres zonas y cada una te cobra distinto:
       0-10   limpio: la cabeza se acomoda sola
       40-84  la zona paranoica: acá es donde se brota la gente
       85+    más allá de la paranoia: ya no pensás, el que paga es el cuerpo
     Sin la tercera zona la Paranoia saturaba a 100 antes de que el Efecto
     pudiera sostenerse, y el Brote le ganaba siempre la carrera a la
     sobredosis: dos muertes compitiendo y una imposible. */
  if (s.efecto >= 85) {
    aplicarDelta(deltas, "paranoia", -3);
    aplicarDelta(deltas, "aguante", -8);
  } else if (s.efecto >= 70) aplicarDelta(deltas, "paranoia", 4);
  else if (s.efecto >= 40) aplicarDelta(deltas, "paranoia", 2);
  else if (s.efecto <= 10) aplicarDelta(deltas, "paranoia", -2);
  if (PICHI.tieneReliquiaEnRun("C1")) aplicarDelta(deltas, "paranoia", -3);
  if (PICHI.run.pasiva === "fumon" && s.efecto >= 20) aplicarDelta(deltas, "conciencia", 1);

  PICHI.aplicarStats(deltas);
  PICHI.run.metabolismo = deltas;

  /* Sostener Efecto altísimo también mata, no solo el pico de una dosis.
     Es la muerte característica del que se la pasa arriba: dos turnos en rojo
     y el cuerpo no vuelve. Sin esto la sobredosis dependía de clavar 100 justo
     en un turno, que pasaba en menos del 1% de las runs. */
  if (PICHI.run.stats.efecto >= 90) PICHI.run.turnosEnRojo = (PICHI.run.turnosEnRojo || 0) + 1;
  else PICHI.run.turnosEnRojo = 0;

  // muerte
  var causa = PICHI.chequearMuerte();
  if (causa) { PICHI.morir(causa); return; }

  // avanzar
  PICHI.run.turno++;
  PICHI.run.turnoEnTramo++;
  var def = PICHI.tramoDef(PICHI.run.tramo);

  if (PICHI.run.turnoEnTramo > def.turnos && PICHI.run.tramo <= 3) {
    // fin de tramo 1/2/3
    if (PICHI.run.tramo === 3) {
      if (s.conciencia >= PICHI.GATE_TRAMO_4) { PICHI.run.tramo = 4; PICHI.run.turnoEnTramo = 1; }
      else { PICHI.terminarRun("rueda"); return; }
    } else {
      PICHI.run.tramo++;
      PICHI.run.turnoEnTramo = 1;
    }
  }

  PICHI.run.resolucion = null;
  PICHI.run.efectoCrudo = PICHI.run.stats.efecto;   // el pico no se arrastra al turno siguiente
  PICHI.siguienteEvento();
};

PICHI.chequearMuerte = function () {
  var s = PICHI.run.stats;
  var pico = Math.max(s.efecto, PICHI.run.efectoCrudo || 0);
  if (s.aguante <= 0) return "aguante";
  if (pico >= 100 || (PICHI.run.turnosEnRojo || 0) >= 2) {
    if (PICHI.tieneReliquiaEnRun("C2") && !PICHI.run.naloxonaUsada) {
      PICHI.run.naloxonaUsada = true;
      s.efecto = 60; PICHI.run.efectoCrudo = 60; PICHI.run.turnosEnRojo = 0;
      s.aguante = PICHI.clampStat("aguante", s.aguante - 20);
      PICHI.run.milagro = "La Ampolla de Naloxona Bendecida. Alguien te la clavó en el muslo sin preguntar. Volvés con una deuda y con vida.";
      if (s.aguante <= 0) return "aguante";
      return null;
    }
    return "efecto";
  }
  if (s.paranoia >= 100) return "paranoia";
  if (s.conciencia <= 0) return "conciencia";
  if (s.mangos <= -300) return "mangos";
  return null;
};

/* ================= final de la run ================= */

PICHI.morir = function (causa) {
  var m = PICHI.MUERTES[causa];
  PICHI.run.fin = {
    tipo: "muerte",
    causa: causa,
    nombre: m.nombre,
    ascii: m.ascii,
    texto: m.texto,
    epitafio: PICHI.epitafio()
  };
  PICHI.cerrarRun();
};

PICHI.terminarRun = function (forzado) {
  var s = PICHI.run.stats;
  var estado = { tramo: PICHI.run.tramo, stats: s, flags: PICHI.run.flags };
  var elegido = null, i;

  if (forzado) {
    for (i = 0; i < PICHI.FINALES.length; i++) if (PICHI.FINALES[i].id === forzado) elegido = PICHI.FINALES[i];
    if (elegido && !PICHI.tieneUnlock(elegido.unlock)) elegido = null;
  }
  if (!elegido) {
    for (i = 0; i < PICHI.FINALES.length; i++) {
      var f = PICHI.FINALES[i];
      if (!PICHI.tieneUnlock(f.unlock)) continue;
      if (f.cond(estado)) { elegido = f; break; }
    }
  }
  if (!elegido) elegido = PICHI.FINALES[PICHI.FINALES.length - 1];

  PICHI.run.fin = {
    tipo: elegido.tipo,
    id: elegido.id,
    nombre: elegido.nombre,
    ascii: elegido.ascii,
    texto: elegido.texto,
    kaBonus: elegido.ka || 0
  };

  // si desbloqueaste El Vacío y ganaste en el tramo 4, seguís al tramo 5.
  // El final del tramo 4 igual queda registrado (y paga su KA): no se pierde por seguir.
  if (elegido.tipo === "victoria" && PICHI.run.tramo === 4 && PICHI.tieneUnlock("D5") && elegido.id !== "vacio") {
    PICHI.run.tramo = 5;
    PICHI.run.turnoEnTramo = 1;
    PICHI.run.fin = null;
    PICHI.run.resolucion = null;
    PICHI.run.puenteVacio = elegido.nombre;
    PICHI.run.puenteFinal = { id: elegido.id, nombre: elegido.nombre, ka: elegido.ka || 0 };
    PICHI.siguienteEvento();
    return;
  }

  PICHI.cerrarRun();
};

PICHI.cerrarRun = function () {
  var resumen = PICHI.cerrarYPuntuar();   // meta.js
  PICHI.run.fase = "fin";
  PICHI.run.resumen = resumen;
  PICHI.Save.drop(PICHI.KEYS.run);        // la run muere; meta y seen quedan
  PICHI.UI.render();
};

/* ================= tercer ojo (rechazar evento) ================= */

PICHI.rechazarEvento = function () {
  if (!PICHI.tieneReliquiaEnRun("C8") || PICHI.run.ojoUsado) return;
  if (PICHI.run.fase !== "evento" || PICHI.run.evento.esFinal) return;
  PICHI.run.ojoUsado = true;
  PICHI.siguienteEvento();
};

/* ================= reanudar ================= */

PICHI.reanudar = function () {
  var r = PICHI.Save.read(PICHI.KEYS.run, null);
  if (!r || !r.stats) return false;
  PICHI.run = r;
  if (r.fase === "evento" && (!r.evento || !r.evento.opciones)) { PICHI.siguienteEvento(); return true; }
  PICHI.UI.render();
  return true;
};

PICHI.hayRunGuardada = function () {
  var r = PICHI.Save.read(PICHI.KEYS.run, null);
  return !!(r && r.stats && r.fase !== "fin");
};
