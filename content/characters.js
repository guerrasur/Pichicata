/* PICHICATA — personajes jugables. El primero está disponible siempre. */

window.PICHI = window.PICHI || {};

PICHI.PERSONAJES_JUGABLES = [
  {
    id: "base",
    nombre: "EL BUSCADOR VENIDO A MENOS",
    unlock: null,
    desc: "Cuarenta y dos años, dos divorcios espirituales, un trabajo que dejaste por una intuición.",
    stats: { conciencia: 12, karma: 0, aguante: 70, mangos: 500, efecto: 0, paranoia: 5 },
    pasiva: null,
    pasivaTexto: "Ninguna ventaja. Ninguna excusa."
  },
  {
    id: "fumon",
    nombre: "EL FUMÓN SERENO",
    unlock: "B1",
    desc: "Treinta y seis. Nunca gritó. Nunca corrió. Nunca terminó nada.",
    stats: { conciencia: 10, karma: 10, aguante: 60, mangos: 300, efecto: 25, paranoia: 0 },
    pasiva: "fumon",
    pasivaTexto: "La Paranoia sube 40% menos. +1 Conciencia por turno mientras Efecto ≥ 20."
  },
  {
    id: "tarotista",
    nombre: "LA TAROTISTA ENDEUDADA",
    unlock: "B2",
    desc: "Cincuenta y uno. Le acertó a todo el mundo menos a ella misma.",
    stats: { conciencia: 25, karma: 5, aguante: 55, mangos: -100, efecto: 0, paranoia: 15 },
    pasiva: "tarot",
    pasivaTexto: "Ves de antemano el efecto de una opción al azar en cada evento."
  },
  {
    id: "kiosquero",
    nombre: "EL PIBE DEL KIOSCO",
    unlock: "B3",
    desc: "Veinticuatro. Vino porque una clienta le dijo que tenía el aura sucia.",
    stats: { conciencia: 8, karma: -20, aguante: 80, mangos: 1200, efecto: 0, paranoia: 10 },
    pasiva: "kiosquero",
    pasivaTexto: "Todo lo que se paga cuesta 40% menos. El Karma sube 30% más lento."
  },
  {
    id: "monje",
    nombre: "EL EX-MONJE ALCOHÓLICO",
    unlock: "B4",
    desc: "Sesenta y ocho. Doce años en un monasterio, veintidós en un bar de Chacarita.",
    stats: { conciencia: 5, karma: 25, aguante: 95, mangos: 150, efecto: 15, paranoia: 0 },
    pasiva: "monje",
    pasivaTexto: "Vino infinito: podés tomar en cualquier evento (+Efecto, +Aguante, -Conciencia)."
  },
  {
    id: "doctora",
    nombre: "LA DOCTORA EN FILOSOFÍA",
    unlock: "B5",
    desc: "Cuarenta y siete. Escribió doscientas páginas sobre el vacío y no lo tocó nunca.",
    stats: { conciencia: 40, karma: 0, aguante: 45, mangos: 700, efecto: 0, paranoia: 0 },
    pasiva: "doctora",
    pasivaTexto: "Inmune a los efectos de Paranoia por debajo de 50. El Aguante baja 20% más rápido."
  },
  {
    id: "perro",
    nombre: "EL PERRO QUE MEDITÓ",
    unlock: "B6",
    desc: "Edad desconocida. Marrón. Sin collar. Estuvo sentado once horas frente a una puerta.",
    stats: { conciencia: 20, karma: 50, aguante: 85, mangos: 0, efecto: 0, paranoia: 0 },
    pasiva: "perro",
    pasivaTexto: "No hablás. Las opciones de diálogo se resuelven al azar. No podés usar plata."
  }
];

PICHI.personajeJugable = function (id) {
  for (var i = 0; i < PICHI.PERSONAJES_JUGABLES.length; i++) {
    if (PICHI.PERSONAJES_JUGABLES[i].id === id) return PICHI.PERSONAJES_JUGABLES[i];
  }
  return PICHI.PERSONAJES_JUGABLES[0];
};

/* ---------- reliquias ---------- */

PICHI.RELIQUIAS = [
  { id: "C1", nombre: "Mala de Semillas", ascii: "mala", desc: "-3 Paranoia por turno.", encuentro: "Te la regala una vieja en un colectivo sin decir una palabra." },
  { id: "C2", nombre: "Ampolla de Naloxona Bendecida", ascii: "ampolla", desc: "Cancela una muerte por Efecto (1 por run).", encuentro: "Estaba en el botiquín del retiro, envuelta en un paño con un mantra escrito en birome." },
  { id: "C3", nombre: "Termo Consagrado", ascii: "termo", desc: "Descansar rinde +50% de Aguante.", encuentro: "Abollado, con la tapa atada con alambre. Mantiene el calor doce horas, cosa que es imposible." },
  { id: "C4", nombre: "Encendedor Que Nunca Falla", ascii: null, desc: "Destraba opciones con fuego. Nunca falla.", encuentro: "Rosa, transparente, sin gas visible. Prende igual." },
  { id: "C5", nombre: "Cuenco Rajado", ascii: "cuenco", desc: "Meditar da +3 Conciencia extra.", encuentro: "Tiene una rajadura de arriba abajo y suena mejor que los sanos." },
  { id: "C6", nombre: "Libreta del Gurú Muerto", ascii: "libreta", desc: "Ves los efectos de cada opción antes de elegir.", encuentro: "Cuarenta hojas de anotaciones y una lista de deudores en la última página." },
  { id: "C7", nombre: "Billete de 2 Pesos Doblado", ascii: null, desc: "+15% de KA al terminar la run.", encuentro: "Doblado en ocho, de una moneda que ya no existe. Vale por otra cosa." },
  { id: "C8", nombre: "Tercer Ojo Legañoso", ascii: "ojo", desc: "Una vez por run: rechazás el evento y sale otro.", encuentro: "No lo encontrás. Se te abre. Y como todo ojo recién abierto, lagañea." }
];

PICHI.reliquia = function (id) {
  for (var i = 0; i < PICHI.RELIQUIAS.length; i++) if (PICHI.RELIQUIAS[i].id === id) return PICHI.RELIQUIAS[i];
  return null;
};

/* ---------- logros (dan KA extra al final de la run) ---------- */

PICHI.LOGROS = [
  { id: "log_primera_muerte", nombre: "Bienvenido a la rueda", ka: 10, desc: "Morir por primera vez." },
  { id: "log_tramo3", nombre: "Llegaste lejos", ka: 20, desc: "Alcanzar el Tramo 3." },
  { id: "log_victoria", nombre: "Iluminado", ka: 50, desc: "Terminar una run con victoria." },
  { id: "log_karma_santo", nombre: "Karma santo", ka: 25, desc: "Terminar con Karma ≥ 80." },
  { id: "log_karma_podrido", nombre: "Karma podrido", ka: 25, desc: "Terminar con Karma ≤ -80." },
  { id: "log_limpio", nombre: "Abstemio militante", ka: 30, desc: "Terminar una run con Efecto 0 todo el tiempo." },
  { id: "log_maquina", nombre: "Máquina de guerra", ka: 30, desc: "Terminar con Efecto ≥ 90 sin morir." },
  { id: "log_fundido", nombre: "Fundido pero entero", ka: 20, desc: "Terminar con Mangos negativos y vivo." },
  { id: "log_millonario", nombre: "Empresario del alma", ka: 25, desc: "Superar los 3000 Mangos en una run." },
  { id: "log_paranoico", nombre: "Al borde", ka: 20, desc: "Sobrevivir un turno con Paranoia ≥ 95." },
  { id: "log_veinte_turnos", nombre: "Aguantador", ka: 25, desc: "Sobrevivir 20 turnos en una sola run." },
  { id: "log_todas_reliquias", nombre: "Coleccionista", ka: 40, desc: "Cargar 3 reliquias en la misma run." },
  { id: "log_diez_runs", nombre: "Reincidente", ka: 30, desc: "Jugar 10 runs." },
  { id: "log_pool_grande", nombre: "Bibliotecario del under", ka: 50, desc: "Tener 100 eventos o más desbloqueados." }
];
