/* PICHICATA — árbol de desbloqueos permanentes.
   Moneda: KA (Karma Acumulado). Se gana al terminar cualquier run.
   Los desbloqueos EXPANDEN el pool: nunca reemplazan contenido. */

window.PICHI = window.PICHI || {};

PICHI.RAMAS = [
  { id: "A", nombre: "EL POOL", desc: "Más eventos y más piezas en el sorteo. Lo que hace que no se repita nada." },
  { id: "B", nombre: "ENCARNACIONES", desc: "Con qué personaje arrancás la run." },
  { id: "C", nombre: "RELIQUIAS", desc: "Objetos que pueden aparecer en runs futuras." },
  { id: "D", nombre: "RUTAS Y FINALES", desc: "Zonas nuevas del viaje y finales alternativos." },
  { id: "E", nombre: "MATERIA SUTIL", desc: "Cosmética, temas y ASCII. Barato, para los sobrantes." }
];

PICHI.UNLOCKS = [
  // ---- RAMA A: el pool ----
  { id: "A1", rama: "A", nombre: "Circuito Conurbano", costo: 60, req: [], desc: "+13 eventos urbanos y lumpen, +7 escenarios del oeste." },
  { id: "A2", rama: "A", nombre: "El Retiro Mal Organizado", costo: 90, req: ["A1"], desc: "+13 eventos de ceremonia, ayahuasca y logística fallida." },
  { id: "A3", rama: "A", nombre: "After de After", costo: 120, req: ["A1"], desc: "+13 eventos de trasnoche, química y decisiones a las 6am." },
  { id: "A4", rama: "A", nombre: "Plano Astral Bajo", costo: 160, req: ["A2"], desc: "+13 eventos de trip profundo, +5 escenarios astrales." },
  { id: "A5", rama: "A", nombre: "Fauna Espiritual", costo: 140, req: [], desc: "+14 personajes nuevos para todos los eventos existentes." },
  { id: "A6", rama: "A", nombre: "Escenarios Remotos", costo: 130, req: [], desc: "+12 escenarios: sierras, ruta, monte, salar, Delta." },
  { id: "A7", rama: "A", nombre: "Complicaciones Cósmicas", costo: 110, req: [], desc: "+14 complicaciones raras que se cruzan con cualquier evento." },
  { id: "A8", rama: "A", nombre: "La Comisaría", costo: 150, req: ["A3"], desc: "+11 eventos de policía, legales y consecuencias." },
  { id: "A9", rama: "A", nombre: "Cumbre del Ego", costo: 200, req: ["A4"], desc: "+11 eventos de confrontación astral y combate interno." },

  // ---- RAMA B: personajes jugables ----
  { id: "B1", rama: "B", nombre: "El Fumón Sereno", costo: 80, req: [], desc: "Jugable. Arranca con Efecto y paz. La paranoia le sube más lento." },
  { id: "B2", rama: "B", nombre: "La Tarotista Endeudada", costo: 150, req: [], desc: "Jugable. Empieza en rojo pero ve el efecto de una opción por evento." },
  { id: "B3", rama: "B", nombre: "El Pibe del Kiosco", costo: 180, req: ["A1"], desc: "Jugable. Plata de sobra, karma en contra, todo más barato." },
  { id: "B4", rama: "B", nombre: "El Ex-Monje Alcohólico", costo: 240, req: [], desc: "Jugable. Cuerpo de fierro, conciencia de piedra, vino infinito." },
  { id: "B5", rama: "B", nombre: "La Doctora en Filosofía", costo: 300, req: ["A4"], desc: "Jugable. Arranca leída. Ignora la paranoia hasta 50." },
  { id: "B6", rama: "B", nombre: "El Perro que Meditó", costo: 450, req: ["A9"], desc: "Jugable. No habla. Los diálogos se resuelven solos. Karma santo." },

  // ---- RAMA C: reliquias ----
  { id: "C1", rama: "C", nombre: "Mala de Semillas", costo: 70, req: [], desc: "Reliquia: -3 Paranoia por turno." },
  { id: "C4", rama: "C", nombre: "Encendedor Que Nunca Falla", costo: 60, req: [], desc: "Reliquia: destraba opciones con fuego. Y nunca falla." },
  { id: "C3", rama: "C", nombre: "Termo Consagrado", costo: 90, req: [], desc: "Reliquia: descansar rinde 50% más Aguante." },
  { id: "C2", rama: "C", nombre: "Ampolla de Naloxona Bendecida", costo: 110, req: [], desc: "Reliquia: cancela una muerte por Efecto (una vez por run)." },
  { id: "C5", rama: "C", nombre: "Cuenco Rajado", costo: 130, req: [], desc: "Reliquia: meditar da +3 Conciencia extra." },
  { id: "C6", rama: "C", nombre: "Libreta del Gurú Muerto", costo: 170, req: [], desc: "Reliquia: ves los efectos de cada opción antes de elegir." },
  { id: "C7", rama: "C", nombre: "Billete de 2 Pesos Doblado", costo: 200, req: [], desc: "Reliquia: +15% de KA al terminar la run." },
  { id: "C8", rama: "C", nombre: "Tercer Ojo Legañoso", costo: 260, req: ["C6"], desc: "Reliquia: una vez por run, rechazás un evento y sale otro." },

  // ---- RAMA D: rutas y finales ----
  { id: "D1", rama: "D", nombre: "La Ruta del Norte", costo: 180, req: ["A6"], desc: "Tramo 2 alternativo: monte, sierras, gente que sí sabe." },
  { id: "D2", rama: "D", nombre: "El Sótano", costo: 220, req: ["A3"], desc: "Tramo 3 alternativo: after subterráneo sin ventanas ni horario." },
  { id: "D3", rama: "D", nombre: "Final: Gurú Chanta", costo: 200, req: [], desc: "Habilita el final de karma negativo. Iluminarse y facturar." },
  { id: "D4", rama: "D", nombre: "Final: Bodhisattva Lumpen", costo: 280, req: [], desc: "Habilita el final de karma alto y bolsillos vacíos." },
  { id: "D5", rama: "D", nombre: "Tramo 5: El Vacío", costo: 500, req: ["D3", "D4"], desc: "Post-victoria: 11 eventos más y un final secreto." },

  // ---- RAMA E: cosmético ----
  { id: "E2", rama: "E", nombre: "Tema: Fósforo Verde", costo: 30, req: [], desc: "Terminal de los 80. Verde sobre negro." },
  { id: "E3", rama: "E", nombre: "Tema: Ámbar de Bar", costo: 30, req: [], desc: "Ámbar tabaco. Para runs melancólicas." },
  { id: "E6", rama: "E", nombre: "Marco de Bordes ASCII", costo: 35, req: [], desc: "La UI se enmarca en cajas de caracteres." },
  { id: "E1", rama: "E", nombre: "Portadas ASCII Extendidas", costo: 40, req: [], desc: "+27 ilustraciones para eventos que hoy salen pelados." },
  { id: "E7", rama: "E", nombre: "Epitafios Extendidos", costo: 45, req: [], desc: "+30 lápidas distintas para tus muertes." },
  { id: "E4", rama: "E", nombre: "Tema: Blanco Ceremonial", costo: 50, req: [], desc: "Fondo claro. Para los que se creen sanados." },
  { id: "E5", rama: "E", nombre: "Distorsión de Trip Avanzada", costo: 70, req: [], desc: "Con Efecto alto el texto se deforma bastante más." }
];

PICHI.UNLOCK_BY_ID = {};
(function () {
  for (var i = 0; i < PICHI.UNLOCKS.length; i++) PICHI.UNLOCK_BY_ID[PICHI.UNLOCKS[i].id] = PICHI.UNLOCKS[i];
})();

PICHI.unlockComprable = function (id) {
  var u = PICHI.UNLOCK_BY_ID[id];
  if (!u) return false;
  if (PICHI.tieneUnlock(id)) return false;
  for (var i = 0; i < u.req.length; i++) if (!PICHI.tieneUnlock(u.req[i])) return false;
  return PICHI.meta.ka >= u.costo;
};

PICHI.reqCumplidos = function (id) {
  var u = PICHI.UNLOCK_BY_ID[id];
  if (!u) return false;
  for (var i = 0; i < u.req.length; i++) if (!PICHI.tieneUnlock(u.req[i])) return false;
  return true;
};

PICHI.comprarUnlock = function (id) {
  if (!PICHI.unlockComprable(id)) return false;
  var u = PICHI.UNLOCK_BY_ID[id];
  PICHI.meta.ka -= u.costo;
  PICHI.meta.unlocks.push(id);
  PICHI.saveMeta();
  return true;
};
