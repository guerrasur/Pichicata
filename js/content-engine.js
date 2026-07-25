/* PICHICATA — motor de contenido.
   Responsabilidades:
     1. registrar eventos base que llegan de content/events-*.js
     2. filtrar el pool por tramo / stats / flags / desbloqueos
     3. elegir el evento MENOS visto (agota el pool antes de repetir)
     4. sortear piezas para los slots evitando firmas ya leídas
     5. ensamblar el texto final y registrar la firma en PICHI.seen */

window.PICHI = window.PICHI || {};

PICHI.EVENTS = [];
PICHI.EVENTS_BY_ID = {};

PICHI.addEvents = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var ev = arr[i];
    if (PICHI.EVENTS_BY_ID[ev.id]) continue; // no duplicar si un archivo se carga dos veces
    PICHI.EVENTS.push(ev);
    PICHI.EVENTS_BY_ID[ev.id] = ev;
  }
};

/* ================= piezas ================= */

PICHI.piezasDisponibles = function (tabla) {
  var out = [];
  for (var i = 0; i < tabla.length; i++) if (PICHI.tieneUnlock(tabla[i].unlock)) out.push(tabla[i]);
  return out;
};

function matchTags(pieza, filtro) {
  if (!filtro) return true;
  var tags = pieza.tags || [];
  if (filtro.tags && filtro.tags.length) {
    var hit = false;
    for (var i = 0; i < filtro.tags.length; i++) if (tags.indexOf(filtro.tags[i]) !== -1) { hit = true; break; }
    if (!hit) return false;
  }
  if (filtro.notTags && filtro.notTags.length) {
    for (var j = 0; j < filtro.notTags.length; j++) if (tags.indexOf(filtro.notTags[j]) !== -1) return false;
  }
  return true;
}

// Candidatos para un slot: primero los que cumplen los tags; si no hay ninguno,
// se relaja el filtro (mejor un escenario poco temático que un evento roto).
function candidatosSlot(tabla, filtro) {
  var disp = PICHI.piezasDisponibles(tabla);
  var estrictos = [];
  for (var i = 0; i < disp.length; i++) if (matchTags(disp[i], filtro)) estrictos.push(disp[i]);
  return estrictos.length ? estrictos : disp;
}

// Sortea una pieza priorizando las que no se usaron todavía en esta run.
function sortearPieza(cands, usadasRun) {
  if (!cands.length) return null;
  var frescas = [];
  for (var i = 0; i < cands.length; i++) if (!usadasRun[cands[i].id]) frescas.push(cands[i]);
  var fuente = frescas.length ? frescas : cands;
  return fuente[PICHI.rndInt(fuente.length)];
}

/* ================= gating ================= */

function cumpleStats(req, stats) {
  if (!req) return true;
  for (var k in req) {
    var r = req[k], v = stats[k];
    if (typeof v !== "number") continue;
    if (typeof r.min === "number" && v < r.min) return false;
    if (typeof r.max === "number" && v > r.max) return false;
  }
  return true;
}

function cumpleFlags(req, flags) {
  if (!req) return true;
  var i;
  if (req.all) for (i = 0; i < req.all.length; i++) if (!flags[req.all[i]]) return false;
  if (req.any) {
    var hit = false;
    for (i = 0; i < req.any.length; i++) if (flags[req.any[i]]) { hit = true; break; }
    if (!hit) return false;
  }
  if (req.none) for (i = 0; i < req.none.length; i++) if (flags[req.none[i]]) return false;
  return true;
}

PICHI.eventoElegible = function (ev, ctx) {
  if (!PICHI.tieneUnlock(ev.unlock)) return false;
  if (ev.tramo && ev.tramo.indexOf(ctx.tramo) === -1) return false;
  if (ev.categoria === "final") return false; // los finales se piden a mano
  var req = ev.requiere || {};
  if (!PICHI.tieneUnlock(req.unlock)) return false;
  if (!cumpleStats(req.stats, ctx.stats)) return false;
  if (!cumpleFlags(req.flags, ctx.flags)) return false;
  if (req.personaje && req.personaje !== PICHI.meta.personaje) return false;
  return true;
};

PICHI.opcionDisponible = function (op, ctx) {
  if (!PICHI.tieneUnlock(op.unlock)) return false;
  if (op.requiere) {
    if (!cumpleStats(op.requiere.stats, ctx.stats)) return false;
    if (!cumpleFlags(op.requiere.flags, ctx.flags)) return false;
    if (op.requiere.reliquia && !PICHI.tieneReliquiaEnRun(op.requiere.reliquia)) return false;
  }
  return true;
};

/* ================= elección del evento ================= */

/* Recorre el pool elegible, se queda con los que tienen el eventCount más bajo
   (así ningún evento repite hasta que salieron todos) y ahí sortea por peso. */
PICHI.elegirEvento = function (ctx) {
  var pool = [], i;
  for (i = 0; i < PICHI.EVENTS.length; i++) if (PICHI.eventoElegible(PICHI.EVENTS[i], ctx)) pool.push(PICHI.EVENTS[i]);
  if (!pool.length) return null;

  // preferencia de categoría (ritmo del tramo)
  var cands = pool;
  if (ctx.categoria) {
    var cats = [].concat(ctx.categoria);
    var porCat = [];
    for (i = 0; i < pool.length; i++) if (cats.indexOf(pool[i].categoria) !== -1) porCat.push(pool[i]);
    if (porCat.length) cands = porCat;
  }

  // nunca dos veces el mismo evento dentro de la misma run
  var frescos = [];
  for (i = 0; i < cands.length; i++) if (!ctx.vistosEnRun[cands[i].id]) frescos.push(cands[i]);
  if (frescos.length) cands = frescos;
  else {
    // se agotó la categoría en esta run: probá con todo el pool antes de repetir
    frescos = [];
    for (i = 0; i < pool.length; i++) if (!ctx.vistosEnRun[pool[i].id]) frescos.push(pool[i]);
    if (frescos.length) cands = frescos;
  }

  // el menos visto históricamente manda
  var minCount = Infinity;
  for (i = 0; i < cands.length; i++) {
    var c = PICHI.seen.eventCount[cands[i].id] || 0;
    if (c < minCount) minCount = c;
  }
  var menosVistos = [];
  for (i = 0; i < cands.length; i++) if ((PICHI.seen.eventCount[cands[i].id] || 0) === minCount) menosVistos.push(cands[i]);

  // sorteo ponderado
  var total = 0;
  for (i = 0; i < menosVistos.length; i++) total += (menosVistos[i].peso || 10);
  var r = PICHI.rnd() * total;
  for (i = 0; i < menosVistos.length; i++) {
    r -= (menosVistos[i].peso || 10);
    if (r <= 0) return menosVistos[i];
  }
  return menosVistos[menosVistos.length - 1];
};

/* ================= firmas y memoria ================= */

function firmaDe(evId, varIdx, piezas) {
  return [evId, varIdx,
    piezas.escenario ? piezas.escenario.id : "-",
    piezas.personaje ? piezas.personaje.id : "-",
    piezas.personaje2 ? piezas.personaje2.id : "-",
    piezas.complicacion ? piezas.complicacion.id : "-"].join("|");
}

// Borra la memoria de combinaciones SOLO de este evento (reset de pool, no de historial).
PICHI.purgarEvento = function (evId) {
  var pref = evId + "|", borradas = 0;
  for (var k in PICHI.seen.combos) {
    if (k.indexOf(pref) === 0) { delete PICHI.seen.combos[k]; borradas++; }
  }
  PICHI.seen.comboCount = Math.max(0, PICHI.seen.comboCount - borradas);
  delete PICHI.seen.variantsUsed[evId];
};

// Si la memoria global crece demasiado, purgamos el evento con más firmas guardadas.
function podarSiHaceFalta() {
  if (PICHI.seen.comboCount < 5000) return;
  var conteo = {}, k, id, mayor = null;
  for (k in PICHI.seen.combos) {
    id = k.slice(0, k.indexOf("|"));
    conteo[id] = (conteo[id] || 0) + 1;
  }
  for (id in conteo) if (!mayor || conteo[id] > conteo[mayor]) mayor = id;
  if (mayor) PICHI.purgarEvento(mayor);
}

function elegirVariante(ev) {
  var n = ev.variantes.length;
  if (n === 1) return 0;
  var usadas = PICHI.seen.variantsUsed[ev.id] || [];
  var libres = [];
  for (var i = 0; i < n; i++) if (usadas.indexOf(i) === -1) libres.push(i);
  if (!libres.length) { // todas leídas: reiniciamos solo las variantes de este evento
    delete PICHI.seen.variantsUsed[ev.id];
    for (i = 0; i < n; i++) libres.push(i);
  }
  return libres[PICHI.rndInt(libres.length)];
}

/* ================= ensamblado ================= */

function sortearPiezas(ev, ctx) {
  var slots = ev.slots || {};
  var piezas = {};
  if (slots.escenario) piezas.escenario = sortearPieza(candidatosSlot(PICHI.ESCENARIOS, slots.escenario), ctx.piezasUsadas);
  if (slots.personaje) piezas.personaje = sortearPieza(candidatosSlot(PICHI.PERSONAJES, slots.personaje), ctx.piezasUsadas);
  if (slots.personaje2) {
    var cands = candidatosSlot(PICHI.PERSONAJES, slots.personaje2);
    if (piezas.personaje) {
      var sinRepe = [];
      for (var i = 0; i < cands.length; i++) if (cands[i].id !== piezas.personaje.id) sinRepe.push(cands[i]);
      if (sinRepe.length) cands = sinRepe;
    }
    piezas.personaje2 = sortearPieza(cands, ctx.piezasUsadas);
  }
  if (slots.complicacion) piezas.complicacion = sortearPieza(candidatosSlot(PICHI.COMPLICACIONES, slots.complicacion), ctx.piezasUsadas);
  piezas.objeto = sortearPieza(candidatosSlot(PICHI.OBJETOS_MENCION, slots.objeto || null), ctx.piezasUsadas);
  piezas.frase = PICHI.pick(PICHI.FRASES_GURU);
  return piezas;
}

function mayus(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

PICHI.renderTexto = function (str, piezas) {
  if (!str) return "";
  var esc = piezas.escenario, per = piezas.personaje, p2 = piezas.personaje2, cmp = piezas.complicacion;
  var map = {
    "{escenario}": esc ? esc.nombre : "algún lado",
    "{escenario.detalle}": esc ? esc.detalle : "no hay mucho para describir",
    "{personaje}": per ? per.nombre : "alguien",
    "{personaje.nombre}": per ? per.nombre : "alguien",
    "{personaje.mote}": per ? per.mote : "que no se presentó",
    "{personaje.desc}": per ? per.desc : "una persona difícil de describir",
    "{personaje.actitud}": per ? (per.actitud ? PICHI.pick(per.actitud) : "raro") : "raro",
    "{personaje2}": p2 ? p2.nombre : "otro",
    "{personaje2.nombre}": p2 ? p2.nombre : "otro",
    "{personaje2.mote}": p2 ? p2.mote : "que tampoco se presentó",
    "{personaje2.desc}": p2 ? p2.desc : "alguien más",
    "{complicacion}": cmp ? cmp.texto : "algo no cierra del todo",
    "{objeto}": piezas.objeto ? piezas.objeto.texto : "algo que no vale nada",
    "{frase}": piezas.frase || "todo es todo"
  };
  var out = str;
  for (var k in map) {
    while (out.indexOf(k) !== -1) out = out.replace(k, map[k]);
    var K = "{^" + k.slice(1); // {^escenario} = misma pieza con mayúscula inicial
    while (out.indexOf(K) !== -1) out = out.replace(K, mayus(map[k]));
  }
  return out;
};

/* Devuelve un evento LISTO para mostrar. ctx = { tramo, stats, flags, vistosEnRun, piezasUsadas, categoria } */
PICHI.armarEvento = function (ev, ctx) {
  var varIdx = elegirVariante(ev);
  var piezas = sortearPiezas(ev, ctx);
  var firma = firmaDe(ev.id, varIdx, piezas);

  // hasta 24 reintentos buscando una combinación que nunca se leyó.
  // Cada reintento re-sortea las piezas y, cada tantos, también la redacción:
  // así el espacio de búsqueda es piezas × variantes y no solo piezas.
  var intentos = 0;
  while (PICHI.seen.combos[firma] && intentos < 24) {
    piezas = sortearPiezas(ev, ctx);
    if (intentos % 4 === 3 && ev.variantes.length > 1) varIdx = PICHI.rndInt(ev.variantes.length);
    firma = firmaDe(ev.id, varIdx, piezas);
    intentos++;
  }
  if (PICHI.seen.combos[firma]) {
    // este evento agotó sus combinaciones: reset del pool de ESTE evento nada más
    PICHI.purgarEvento(ev.id);
    varIdx = elegirVariante(ev);
    firma = firmaDe(ev.id, varIdx, piezas);
  }

  PICHI.seen.combos[firma] = 1;
  PICHI.seen.comboCount++;
  PICHI.seen.eventCount[ev.id] = (PICHI.seen.eventCount[ev.id] || 0) + 1;
  var usadas = PICHI.seen.variantsUsed[ev.id] || [];
  if (usadas.indexOf(varIdx) === -1) usadas.push(varIdx);
  PICHI.seen.variantsUsed[ev.id] = usadas;
  podarSiHaceFalta();
  PICHI.saveSeen();

  // marcar piezas usadas en la run
  for (var kk in piezas) if (piezas[kk] && piezas[kk].id) ctx.piezasUsadas[piezas[kk].id] = 1;

  var variante = ev.variantes[varIdx];
  var parrafos = [];
  for (var i = 0; i < variante.texto.length; i++) parrafos.push(mayus(PICHI.renderTexto(variante.texto[i], piezas)));

  var opciones = [];
  for (i = 0; i < ev.opciones.length; i++) {
    var op = ev.opciones[i];
    opciones.push({
      ref: op,
      label: PICHI.renderTexto(op.label, piezas),
      disponible: PICHI.opcionDisponible(op, ctx),
      motivo: op.requisitoTexto || null
    });
  }

  return {
    id: ev.id,
    categoria: ev.categoria,
    titulo: variante.titulo ? PICHI.renderTexto(variante.titulo, piezas) : (ev.titulo ? PICHI.renderTexto(ev.titulo, piezas) : null),
    ascii: ev.ascii || null,
    parrafos: parrafos,
    opciones: opciones,
    piezas: piezas,
    firma: firma,
    hint: piezas.complicacion ? piezas.complicacion.hint : null
  };
};

/* Texto de resolución de una opción (también con variantes). */
PICHI.resolverTexto = function (arr, piezas) {
  if (!arr || !arr.length) return "";
  var t = arr.length === 1 ? arr[0] : PICHI.pick(arr);
  return mayus(PICHI.renderTexto(t, piezas));
};

/* Diagnóstico: cuánto contenido hay disponible ahora mismo. */
PICHI.diagnostico = function () {
  var evs = 0, i;
  for (i = 0; i < PICHI.EVENTS.length; i++) if (PICHI.tieneUnlock(PICHI.EVENTS[i].unlock)) evs++;
  var esc = PICHI.piezasDisponibles(PICHI.ESCENARIOS).length;
  var per = PICHI.piezasDisponibles(PICHI.PERSONAJES).length;
  var cmp = PICHI.piezasDisponibles(PICHI.COMPLICACIONES).length;
  return {
    eventos: evs,
    eventosTotales: PICHI.EVENTS.length,
    escenarios: esc,
    personajes: per,
    complicaciones: cmp,
    combinaciones: evs * Math.max(1, esc) * Math.max(1, per) * Math.max(1, cmp),
    leidas: PICHI.seen.comboCount
  };
};
