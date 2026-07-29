/* PICHICATA — el mundo de la run: dónde estás y qué hora es.

   El problema que resuelve: medido, el escenario cambiaba en el 100% de las
   transiciones entre turnos. Una run era un pueblo de la pampa, después un
   colectivo a las tres de la mañana, después el patio de tu infancia, después un
   salón de fiestas en Villa Crespo. No era una historia, era una teletranspor-
   tación con buena prosa.

   Ahora la run tiene un LUGAR que persiste varios turnos y una HORA que solo
   avanza. Cambiar de lugar es un hecho narrado, no un salto invisible. */

window.PICHI = window.PICHI || {};

/* Las horas del viaje. Solo avanzan: no se vuelve a la tarde después de la
   madrugada sin pasar por la mañana. */
PICHI.HORAS = [
  { id: "mañana", nombre: "la mañana", de: "de la mañana", luz: "dia" },
  { id: "mediodia", nombre: "el mediodía", de: "del mediodía", luz: "dia" },
  { id: "tarde", nombre: "la tarde", de: "de la tarde", luz: "dia" },
  { id: "atardecer", nombre: "el atardecer", de: "de la tardecita", luz: "ambigua" },
  { id: "noche", nombre: "la noche", de: "de la noche", luz: "noche" },
  { id: "madrugada", nombre: "la madrugada", de: "de la madrugada", luz: "noche" }
];

PICHI.horaActual = function () {
  var i = (PICHI.run && typeof PICHI.run.hora === "number") ? PICHI.run.hora : 2;
  return PICHI.HORAS[i % PICHI.HORAS.length];
};

/* ¿Este escenario puede existir a esta hora? Un salar a las dos de la tarde no
   funciona a las cuatro de la mañana, y un after tampoco al mediodía. */
PICHI.escenarioVaConLaHora = function (esc, horaIdx) {
  var tags = esc.tags || [];
  var luz = PICHI.HORAS[horaIdx % PICHI.HORAS.length].luz;
  if (luz === "ambigua") return true;
  if (tags.indexOf("dia") !== -1 && luz === "noche") return false;
  if (tags.indexOf("noche") !== -1 && luz === "dia") return false;
  return true;
};

/* El tiempo avanza solo, y más rápido si dormís. */
PICHI.avanzarHora = function (categoria, medito) {
  if (!PICHI.run) return;
  var pasos = 0;
  if (categoria === "descanso") pasos = medito ? 1 : 1 + PICHI.rndInt(2);
  else if (PICHI.chance(0.35)) pasos = 1;
  if (!pasos) return;
  var antes = PICHI.run.hora;
  PICHI.run.hora = (PICHI.run.hora + pasos) % PICHI.HORAS.length;
  if (PICHI.run.hora < antes) PICHI.run.dia = (PICHI.run.dia || 1) + 1;
};

/* ---------- la geografía ---------- */

/* No hay mapa, pero sí hay distancias. Sin esto una run podía ser Barracas,
   después el monte chaqueño, después Villa Crespo, en tres turnos seguidos: el
   lugar persistía pero el itinerario seguía siendo imposible. */
PICHI.regionDe = function (esc) {
  var t = (esc && esc.tags) || [];
  if (t.indexOf("astral") !== -1) return "astral";
  if (t.indexOf("remoto") !== -1 || t.indexOf("naturaleza") !== -1) return "lejos";
  if (t.indexOf("conurbano") !== -1) return "conurbano";
  if (t.indexOf("urbano") !== -1) return "capital";
  return "cualquiera";   // interiores sin geografía: sirven de bisagra
};

/* Qué se puede alcanzar desde dónde sin que el viaje sea el evento. De capital
   al monte no se va entre dos escenas; al conurbano sí. */
PICHI.REGIONES_VECINAS = {
  capital: ["capital", "conurbano", "cualquiera"],
  conurbano: ["conurbano", "capital", "lejos", "cualquiera"],
  lejos: ["lejos", "conurbano", "cualquiera"],
  cualquiera: ["capital", "conurbano", "lejos", "cualquiera"],
  astral: ["capital", "conurbano", "lejos", "cualquiera"]
};

PICHI.seLlegaDesde = function (desde, hacia) {
  var a = PICHI.regionDe(desde), b = PICHI.regionDe(hacia);
  return PICHI.REGIONES_VECINAS[a].indexOf(b) !== -1;
};

/* ---------- el lugar ---------- */

PICHI.lugarActual = function () {
  if (!PICHI.run || !PICHI.run.lugar) return null;
  for (var i = 0; i < PICHI.ESCENARIOS.length; i++) {
    if (PICHI.ESCENARIOS[i].id === PICHI.run.lugar) return PICHI.ESCENARIOS[i];
  }
  return null;
};

/* Un escenario del plano astral no es un lugar del mundo: no se queda como
   lugar de la run ni se puede llegar caminando. */
PICHI.esAstral = function (esc) {
  return !!esc && (esc.tags || []).indexOf("astral") !== -1;
};

/* Líneas de traslado. Se muestran cuando el lugar cambia de verdad, para que
   el salto sea un hecho del relato y no un corte de montaje. */
PICHI.TRASLADOS = {
  generico: [
    "Te movés. Veinte minutos de nada y ya es otro lugar.",
    "El viaje hasta acá no tiene nada digno de contarse, y eso también es parte.",
    "Cambio de lugar. El cuerpo tarda unas cuadras en llegar del todo.",
    "Caminás lo que hay que caminar y llegás a otra parte."
  ],
  aNoche: [
    "Se hizo de noche en el camino y no lo viste pasar.",
    "Cuando llegás ya está oscuro, y el lugar de día era otro lugar."
  ],
  aDia: [
    "Amanece en el traslado. La luz cambia todo lo que estabas pensando.",
    "Llegás con el día encima, que es una forma de empezar de nuevo sin haber terminado nada."
  ],
  lejos: [
    "Son varios kilómetros y los hacés en silencio.",
    "El traslado es largo. Te da tiempo de arrepentirte dos veces y de no volver ninguna.",
    "Ruta, después camino de tierra, después nada. Llegar tarda lo que tiene que tardar."
  ],
  aConurbano: [
    "Un tren y dos combis. Se cruza el Riachuelo y el aire cambia de peso.",
    "Salís de la ciudad sin darte cuenta: primero se caen los edificios, después las veredas."
  ],
  aCapital: [
    "Volvés para adentro. La ciudad te recibe como recibe a todos, sin mirarte.",
    "Una hora de colectivo hasta que aparecen los semáforos otra vez."
  ],
  interior: [
    "Se entra, y adentro el ruido de la calle se apaga de golpe.",
    "Cruzás una puerta y del otro lado el aire está usado."
  ]
};

PICHI.textoTraslado = function (desde, hacia, horaAntes, horaDespues) {
  var pool = PICHI.TRASLADOS.generico;
  var luzAntes = PICHI.HORAS[horaAntes % PICHI.HORAS.length].luz;
  var luzDespues = PICHI.HORAS[horaDespues % PICHI.HORAS.length].luz;

  /* La distancia manda sobre la luz: cruzar media provincia se cuenta como
     cruzar media provincia aunque además se haya hecho de noche. */
  var regA = PICHI.regionDe(desde), regB = PICHI.regionDe(hacia);
  if (regA !== regB && regB === "lejos") pool = PICHI.TRASLADOS.lejos;
  else if (regA !== regB && regB === "conurbano" && regA === "capital") pool = PICHI.TRASLADOS.aConurbano;
  else if (regA !== regB && regB === "capital" && regA !== "cualquiera") pool = PICHI.TRASLADOS.aCapital;
  else if (luzAntes !== "noche" && luzDespues === "noche") pool = PICHI.TRASLADOS.aNoche;
  else if (luzAntes === "noche" && luzDespues === "dia") pool = PICHI.TRASLADOS.aDia;
  else if (hacia && (hacia.tags || []).indexOf("interior") !== -1 &&
    desde && (desde.tags || []).indexOf("interior") === -1) pool = PICHI.TRASLADOS.interior;

  return PICHI.pick(pool);
};

/* Se llama al elegir el escenario de un evento: decide si te quedás donde estás
   o te movés, y deja registrado el traslado para que la UI lo cuente. */
PICHI.fijarLugar = function (esc) {
  if (!PICHI.run || !esc) return null;
  if (PICHI.esAstral(esc)) return null;            // el plano astral no es un lugar
  if (PICHI.run.lugar === esc.id) {
    PICHI.run.turnosEnLugar = (PICHI.run.turnosEnLugar || 0) + 1;
    return null;
  }
  var desde = PICHI.lugarActual();
  var horaAntes = PICHI.run.hora;
  PICHI.run.lugar = esc.id;
  PICHI.run.turnosEnLugar = 1;
  PICHI.run.lugaresVisitados = (PICHI.run.lugaresVisitados || 0) + 1;
  if (!desde) return null;                          // el primer lugar no es un traslado
  return PICHI.textoTraslado(desde, esc, horaAntes, PICHI.run.hora);
};
