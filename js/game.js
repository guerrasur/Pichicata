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
    evento: null,
    fase: "evento",
    resolucion: null,
    fin: null,
    marcas: { maxConciencia: stats.conciencia, maxMangos: stats.mangos, efectoSiempreCero: stats.efecto === 0, paranoiaAlta: false, decisiones: 0 }
  };

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

function tiradaProb(t, stats) {
  var v = stats[t.stat];
  var d = (typeof t.dificultad === "number") ? t.dificultad : 50;
  var p = t.invertido ? 0.5 + (d - v) / 100 : 0.5 + (v - d) / 100;
  return Math.max(0.12, Math.min(0.9, p));
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

  // 4. tirada
  if (op.tirada) {
    var p = tiradaProb(op.tirada, PICHI.run.stats);
    var exito = PICHI.chance(p);
    var rama = exito ? op.exito : op.fallo;
    notas.push((exito ? "✓" : "✗") + " tirada de " + op.tirada.stat + " (" + Math.round(p * 100) + "%)");
    if (rama) {
      if (rama.efectos) for (k in rama.efectos) aplicarDelta(deltas, k, modular(k, rama.efectos[k], op));
      var t = PICHI.resolverTexto(rama.resultado, piezas);
      if (t) textos.push(t);
      if (rama.flags) aplicarFlags(rama.flags);
    }
  }

  // 5. riesgo
  if (op.riesgo && PICHI.chance(op.riesgo.prob)) {
    notas.push("✗ salió el riesgo (" + Math.round(op.riesgo.prob * 100) + "%)");
    if (op.riesgo.efectos) for (k in op.riesgo.efectos) aplicarDelta(deltas, k, modular(k, op.riesgo.efectos[k], op));
    var tr = PICHI.resolverTexto(op.riesgo.resultado, piezas);
    if (tr) textos.push(tr);
    if (op.riesgo.flags) aplicarFlags(op.riesgo.flags);
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

  // 8. final forzado / final del juego
  if (op.finalizar || PICHI.run.evento.esFinal) {
    PICHI.terminarRun(op.forzarFinal || null);
    return;
  }

  PICHI.run.resolucion = { textos: textos, deltas: deltas, notas: notas, reliquia: reliquia ? reliquia.nombre : null, label: opt.label };
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
    s[k] = PICHI.clampStat(k, s[k] + deltas[k]);
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

  // metabolismo
  aplicarDelta(deltas, "efecto", -(10 + PICHI.rndInt(6)));
  aplicarDelta(deltas, "aguante", PICHI.run.pasiva === "doctora" ? -3 : -2);
  if (s.efecto >= 70) aplicarDelta(deltas, "paranoia", 4);
  else if (s.efecto >= 40) aplicarDelta(deltas, "paranoia", 2);
  else if (s.efecto <= 10) aplicarDelta(deltas, "paranoia", -2);   // estar limpio baja la cabeza
  if (PICHI.tieneReliquiaEnRun("C1")) aplicarDelta(deltas, "paranoia", -3);
  if (PICHI.run.pasiva === "fumon" && s.efecto >= 20) aplicarDelta(deltas, "conciencia", 1);

  PICHI.aplicarStats(deltas);
  PICHI.run.metabolismo = deltas;

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
  PICHI.siguienteEvento();
};

PICHI.chequearMuerte = function () {
  var s = PICHI.run.stats;
  if (s.aguante <= 0) return "aguante";
  if (s.efecto >= 100) {
    if (PICHI.tieneReliquiaEnRun("C2") && !PICHI.run.naloxonaUsada) {
      PICHI.run.naloxonaUsada = true;
      s.efecto = 60; s.aguante = PICHI.clampStat("aguante", s.aguante - 20);
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
