/* PICHICATA — meta-progreso: cálculo de KA, logros y tienda de desbloqueos. */

window.PICHI = window.PICHI || {};

PICHI.calcularKA = function () {
  var r = PICHI.run, s = r.stats;
  var d = [];
  var total = 0;

  function suma(label, v) { v = Math.round(v); if (v) { d.push({ label: label, ka: v }); total += v; } }

  suma("turnos sobrevividos (" + (r.turno - 1) + ")", (r.turno - 1) * 2);
  suma("tramo alcanzado (" + r.tramo + ")", r.tramo * 15);
  suma("conciencia final (" + s.conciencia + ")", Math.max(0, s.conciencia) / 2);
  suma("karma extremo (" + s.karma + ")", Math.abs(s.karma) / 4);

  if (r.fin && r.fin.tipo === "victoria") suma("victoria", 40 + (r.fin.kaBonus || 0));
  if (r.fin && r.fin.tipo === "neutro") suma("cerraste el círculo", r.fin.kaBonus || 0);

  if (r.fin && r.fin.id && PICHI.meta.endings.indexOf(r.fin.id) === -1) suma("final nuevo descubierto", 25);

  // si cruzaste el puente al Vacío, el final del Tramo IV igual se cobra y se registra
  if (r.puenteFinal) {
    suma("antes de seguir: " + r.puenteFinal.nombre, 40 + r.puenteFinal.ka);
    if (PICHI.meta.endings.indexOf(r.puenteFinal.id) === -1) suma("final nuevo descubierto", 25);
  }

  var logros = PICHI.evaluarLogros();
  for (var i = 0; i < logros.length; i++) suma("logro: " + logros[i].nombre, logros[i].ka);

  var mult = 1;
  if (PICHI.tieneReliquiaEnRun("C7")) { mult += 0.15; d.push({ label: "Billete de 2 Pesos Doblado (+15%)", ka: null }); }
  total = Math.round(total * mult);

  return { total: total, detalle: d, logros: logros, multiplicador: mult };
};

PICHI.evaluarLogros = function () {
  var r = PICHI.run, s = r.stats, m = r.marcas;
  var nuevos = [];

  function gano(id) {
    if (PICHI.meta.achievements.indexOf(id) !== -1) return;
    for (var i = 0; i < PICHI.LOGROS.length; i++) if (PICHI.LOGROS[i].id === id) nuevos.push(PICHI.LOGROS[i]);
  }

  if (r.fin && r.fin.tipo === "muerte") gano("log_primera_muerte");
  if (r.tramo >= 3) gano("log_tramo3");
  if (r.fin && r.fin.tipo === "victoria") gano("log_victoria");
  if (s.karma >= 80) gano("log_karma_santo");
  if (s.karma <= -80) gano("log_karma_podrido");
  if (m.efectoSiempreCero && r.turno > 8) gano("log_limpio");
  if (s.efecto >= 90 && (!r.fin || r.fin.tipo !== "muerte")) gano("log_maquina");
  if (s.mangos < 0 && (!r.fin || r.fin.tipo !== "muerte")) gano("log_fundido");
  if (m.maxMangos >= 3000) gano("log_millonario");
  if (m.paranoiaAlta) gano("log_paranoico");
  if (r.turno - 1 >= 20) gano("log_veinte_turnos");
  if (r.reliquias.length >= 3) gano("log_todas_reliquias");
  if (PICHI.meta.runs + 1 >= 10) gano("log_diez_runs");
  if (PICHI.diagnostico().eventos >= 100) gano("log_pool_grande");

  return nuevos;
};

/* Cierra la run: guarda KA, logros, finales y records. Devuelve el resumen. */
PICHI.cerrarYPuntuar = function () {
  var calc = PICHI.calcularKA();
  var r = PICHI.run, s = r.stats, i;

  PICHI.meta.ka += calc.total;
  PICHI.meta.kaTotalHistorico += calc.total;
  PICHI.meta.runs++;

  if (r.fin && r.fin.tipo === "victoria") PICHI.meta.victorias++;
  if (r.fin && r.fin.tipo === "muerte") {
    PICHI.meta.muertes[r.fin.causa] = (PICHI.meta.muertes[r.fin.causa] || 0) + 1;
  }
  if (r.fin && r.fin.id && PICHI.meta.endings.indexOf(r.fin.id) === -1) PICHI.meta.endings.push(r.fin.id);
  if (r.puenteFinal && PICHI.meta.endings.indexOf(r.puenteFinal.id) === -1) PICHI.meta.endings.push(r.puenteFinal.id);
  for (i = 0; i < calc.logros.length; i++) {
    if (PICHI.meta.achievements.indexOf(calc.logros[i].id) === -1) PICHI.meta.achievements.push(calc.logros[i].id);
  }

  var rec = PICHI.meta.record;
  if (s.conciencia > rec.conciencia) rec.conciencia = s.conciencia;
  if (r.tramo > rec.tramo) rec.tramo = r.tramo;
  if (r.turno - 1 > rec.turnos) rec.turnos = r.turno - 1;
  if (calc.total > rec.ka) rec.ka = calc.total;

  PICHI.meta.ultimaRun = {
    personaje: r.personaje,
    turnos: r.turno - 1,
    tramo: r.tramo,
    fin: r.fin ? r.fin.nombre : "—",
    tipo: r.fin ? r.fin.tipo : "—",
    ka: calc.total,
    stats: JSON.parse(JSON.stringify(s))
  };

  PICHI.saveMeta();
  return calc;
};

/* ================= tienda ================= */

PICHI.estadoUnlock = function (id) {
  if (PICHI.tieneUnlock(id)) return "comprado";
  if (!PICHI.reqCumplidos(id)) return "bloqueado";
  var u = PICHI.UNLOCK_BY_ID[id];
  return PICHI.meta.ka >= u.costo ? "disponible" : "caro";
};

PICHI.comprar = function (id) {
  if (!PICHI.comprarUnlock(id)) return false;
  // los temas se aplican solos al comprarlos
  var temas = { E2: "fosforo", E3: "ambar", E4: "ceremonial" };
  if (temas[id]) { PICHI.meta.tema = temas[id]; PICHI.saveMeta(); }
  return true;
};

PICHI.temasDisponibles = function () {
  var out = [{ id: "base", nombre: "Terminal (base)" }];
  if (PICHI.tieneUnlock("E2")) out.push({ id: "fosforo", nombre: "Fósforo Verde" });
  if (PICHI.tieneUnlock("E3")) out.push({ id: "ambar", nombre: "Ámbar de Bar" });
  if (PICHI.tieneUnlock("E4")) out.push({ id: "ceremonial", nombre: "Blanco Ceremonial" });
  return out;
};

PICHI.personajesDisponibles = function () {
  var out = [];
  for (var i = 0; i < PICHI.PERSONAJES_JUGABLES.length; i++) {
    var p = PICHI.PERSONAJES_JUGABLES[i];
    if (PICHI.tieneUnlock(p.unlock)) out.push(p);
  }
  return out;
};

/* Purga la memoria de combinaciones leídas SIN tocar el meta-progreso. */
PICHI.purgarMemoriaEventos = function () {
  PICHI.seen.combos = {};
  PICHI.seen.variantsUsed = {};
  PICHI.seen.comboCount = 0;
  // eventCount se conserva: es el que garantiza rotación del pool
  PICHI.saveSeen();
};

/* Borra TODO (botón de pánico). */
PICHI.borrarTodo = function () {
  PICHI.Save.drop(PICHI.KEYS.meta);
  PICHI.Save.drop(PICHI.KEYS.seen);
  PICHI.Save.drop(PICHI.KEYS.run);
  PICHI.meta = JSON.parse(JSON.stringify(PICHI.DEFAULT_META));
  PICHI.seen = JSON.parse(JSON.stringify(PICHI.DEFAULT_SEEN));
  PICHI.run = null;
};
