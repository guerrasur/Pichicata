/* PICHICATA — finales, evento del Ascenso, muertes y epitafios. */

window.PICHI = window.PICHI || {};

/* ---------- el evento final del Tramo 4 ---------- */

PICHI.EVENTO_ASCENSO = {
  id: "ev_ascenso", categoria: "final", tramo: [4], peso: 100, unlock: null,
  /* Este evento se muestra una sola vez por run, así que su pool se agota antes
     que el de cualquier otro: es el único lugar donde la repetición se notaba
     con el contenido base. De ahí las 5 redacciones y el filtro amplio. */
  slots: { personaje: { tags: ["guru", "ego", "autentico", "veterano"] }, complicacion: { tags: ["astral", "misterio", "melancolia"] } },
  ascii: "escalera",
  variantes: [
    { texto: [
      "No hay escenario. Hay una escalera de material que no es material y una fila de tres personas, y las tres sos vos en distintos momentos del día.",
      "{personaje.nombre} está sentado abajo, fumando, y te dice que subas nomás, que él ya subió y que «está sobrevalorado».",
      "Hay un último cuenco. Hay un último mango en el bolsillo. Hay una última chance de darte media vuelta."
    ]},
    { texto: [
      "Se terminó el camino y el camino termina en una escalera común, de material, con el revoque a la vista.",
      "Arriba no se ve nada porque no hay nada que ver: hay que subir para que aparezca.",
      "{personaje.nombre} te alcanza {objeto} y dice: «llevalo o no lo lleves, pero decidilo vos»."
    ]},
    { texto: [
      "Cuatro tramos, todos los eventos, todas las decisiones, y esto: nueve escalones y una decisión.",
      "No hay música. No hay ceremonia. No hay nadie filmando.",
      "«{frase}», dice {personaje.nombre}, y se ríe de su propia frase, y eso es lo más iluminado que dijo en todo el viaje."
    ]},
    { texto: [
      "La escalera está a la vuelta de una esquina cualquiera y no tiene nada de particular, y eso es lo que la vuelve insoportable.",
      "Nueve escalones de material, con el revoque a la vista y una mancha de humedad en el tercero.",
      "{^complicacion}. {^personaje.nombre} no dice nada: está sentado en el primer escalón, corriéndose para dejarte pasar."
    ]},
    { texto: [
      "No hay portal, no hay luz, no hay coro. Hay una escalera y una hora del día.",
      "{^personaje.desc}. Fuma sentado abajo y no te mira subir a nadie, porque ya vio subir a varios.",
      "{^complicacion}, y todavía tenés el cuenco en la mano y un mango en el bolsillo."
    ]}
  ],
  opciones: [
    { label: "Subir limpio: tirar el cuenco y subir.", finalizar: true, resultado: [] },
    { label: "Subir con el cuenco en la mano.", finalizar: true, efectos: { efecto: 60 }, resultado: [] },
    { label: "Bajar y quedarte con los pibes.", requiere: { flags: { none: [] } }, unlock: "D4", finalizar: true, forzarFinal: "bodhisattva", resultado: [] },
    { label: "Subir, mirar, volver y cobrar entrada.", unlock: "D3", finalizar: true, forzarFinal: "chanta", resultado: [] }
  ]
};

/* ---------- finales ---------- */
/* Se evalúan en orden: el primero que cumple, gana. */

PICHI.FINALES = [
  {
    id: "vacio", nombre: "EL VACÍO", tipo: "victoria", ascii: "vacio", ka: 120,
    unlock: "D5",
    cond: function (s) { return s.tramo >= 5 && s.stats.conciencia >= 108 && !s.flags.guru_chanta_final; },
    texto: [
      "No hay nada más y eso, por fin, no es una tragedia.",
      "No te disolvés en una luz. No hay linaje, no hay maestro, no hay certificado. Hay un martes y un cuerpo y una cantidad limitada de días, y ninguna de esas tres cosas te asusta.",
      "Lo último que hacés en el juego es lavar una taza.",
      "No se lo contás a nadie. Nunca."
    ]
  },
  {
    id: "bodhisattva", nombre: "BODHISATTVA LUMPEN", tipo: "victoria", ascii: "loto", ka: 100,
    unlock: "D4",
    cond: function (s) { return s.stats.conciencia >= 108 && s.stats.karma >= 60 && s.stats.mangos <= 0; },
    texto: [
      "Llegás arriba, mirás, y das media vuelta.",
      "No es que no puedas disolverte: es que abajo hay gente y todavía no aprendieron a cuidar el fuego.",
      "Te sentás en el cordón de la esquina con dos pibes y una botella y te quedás.",
      "Vas a morir pobre, en un barrio, y va a ir mucha gente al velorio."
    ]
  },
  {
    id: "chanta", nombre: "GURÚ CHANTA", tipo: "victoria", ascii: "billete", ka: 90,
    unlock: "D3",
    cond: function (s) { return s.stats.conciencia >= 108 && (s.stats.karma <= -30 || s.flags.guru_chanta_final || s.flags.socio_del_chanta); },
    texto: [
      "Te iluminás. Es cierto, pasó, no lo podés negar ni siquiera vos.",
      "Y en el camino de bajada, mientras se te acomodaba todo, hiciste los números.",
      "Nueve meses después tenés un galpón en Barracas con telas de colores, catorce alumnos, seña del cincuenta por ciento y un cuaderno Gloria con los ingresos.",
      "Lo peor es esto: a algunos de ellos les hacés bien."
    ]
  },
  {
    id: "quimica", nombre: "ILUMINACIÓN QUÍMICA", tipo: "victoria", ascii: "disolucion", ka: 80,
    cond: function (s) { return s.stats.conciencia >= 108 && s.stats.efecto >= 55; },
    texto: [
      "Subís con el cuenco en la mano y llegás. Llegás de verdad, esto no es una metáfora.",
      "Se abre todo, se acomoda todo, entendés absolutamente todo durante cuarenta segundos o cuarenta años, no hay forma de medirlo desde adentro.",
      "El problema es que no vas a poder reconstruir nada de esto mañana.",
      "Te queda una certeza sin contenido: que estuviste ahí. Y con eso vas a vivir el resto de tu vida, buscando la puerta que ya abriste."
    ]
  },
  {
    id: "limpia", nombre: "ILUMINACIÓN LIMPIA", tipo: "victoria", ascii: "disolucion", ka: 110,
    cond: function (s) { return s.stats.conciencia >= 108 && s.stats.karma >= 40 && s.stats.efecto <= 15; },
    texto: [
      "Tirás el cuenco antes de subir y el cuenco hace un ruido de cerámica contra el piso y ese es el último ruido del juego.",
      "Subís sin nada. Ni sustancia, ni maestro, ni excusa, ni relato.",
      "Arriba no hay nada esperándote, y eso era la buena noticia todo el tiempo.",
      "Nadie te ve más. No porque hayas trascendido: porque dejaste de necesitar que te vieran."
    ]
  },
  {
    id: "iluminado_raro", nombre: "ILUMINACIÓN INCÓMODA", tipo: "victoria", ascii: "loto", ka: 70,
    cond: function (s) { return s.stats.conciencia >= 108; },
    texto: [
      "Llegás. Contra todo pronóstico y con un karma discutible, llegás.",
      "La iluminación no chequea antecedentes. Eso es una falla del sistema y vos sos la prueba.",
      "Se te acomoda todo y no te lo merecés y lo tenés igual.",
      "Vas a pasar los próximos años tratando de entender por qué te tocó a vos."
    ]
  },
  {
    id: "rueda", nombre: "LA RUEDA", tipo: "neutro", ascii: "loto", ka: 40,
    cond: function (s) { return true; },
    texto: [
      "Sobreviviste el viaje entero y no te iluminaste, que es lo que le pasa al noventa y nueve por ciento.",
      "Volvés en un colectivo, con la ropa sucia, con dos anécdotas y con una cosa chiquita adentro que no sabés nombrar todavía.",
      "En tres meses vas a ver un cartel que dice RETIRO DE LUZ Y SANACIÓN y se te va a mover algo.",
      "La rueda gira. Vos también. El karma que juntaste queda."
    ]
  }
];

/* ---------- muertes ---------- */

PICHI.MUERTES = {
  aguante: {
    nombre: "EL CUERPO DIJO BASTA",
    ascii: "tumba",
    texto: [
      "No fue una revelación ni un castigo cósmico. Fue el cuerpo, que llevaba la cuenta.",
      "Catorce horas sin comer, treinta y dos sin dormir, y un corazón que no firmó nada de esto.",
      "Se apaga en un baño químico, en una vereda o en un pasillo, según el caso, y en los tres casos solo."
    ]
  },
  efecto: {
    nombre: "SOBREDOSIS DE SABIDURÍA",
    ascii: "jeringa",
    texto: [
      "Llegaste más lejos que nadie y llegaste de una manera que no admite regreso.",
      "Los últimos cuarenta segundos son, honestamente, hermosos. Eso no arregla nada.",
      "Alguien va a decir en el velorio que «estaba buscando algo». Estabas."
    ]
  },
  paranoia: {
    nombre: "BROTE",
    ascii: "cabeza",
    texto: [
      "No te morís. Es peor: te internan.",
      "Sala 4, cuarenta y ocho horas de observación que se convierten en once días.",
      "Hay una ventana con reja que da a un patio con un árbol, y ese árbol va a ser tu único maestro por un tiempo."
    ]
  },
  conciencia: {
    nombre: "VEGETAL ASTRAL",
    ascii: "vacio",
    texto: [
      "No se apagó el cuerpo. Se apagó lo otro.",
      "Quedás con la mirada fija en un ventilador de techo que hace clic cada vuelta y media.",
      "Comés, dormís, respondés preguntas simples. Nadie sabe si estás. Vos tampoco."
    ]
  },
  mangos: {
    nombre: "TE VINIERON A COBRAR",
    ascii: "cadena",
    texto: [
      "La deuda es la forma más pura del karma: no perdona, no olvida y no acepta explicaciones espirituales.",
      "Vinieron. Fue rápido. No hubo insultos, que es la parte que más impresiona.",
      "El cuaderno Gloria queda con tu nombre y una línea al lado."
    ]
  }
};

/* ---------- epitafios (línea final de cada muerte) ---------- */

PICHI.EPITAFIOS = [
  { t: "Buscó afuera. Encontró el afuera.", unlock: null },
  { t: "Pagó la seña completa.", unlock: null },
  { t: "Nunca le pegó del todo.", unlock: null },
  { t: "Confió en un tipo de Lanús.", unlock: null },
  { t: "Se le fue la mano con el desapego.", unlock: null },
  { t: "Le faltaban dos cuentas a la mala.", unlock: null },
  { t: "Murió con el aura sucia.", unlock: null },
  { t: "Descansa en el módulo 3.", unlock: null },
  { t: "El karma no perdona, factura.", unlock: null },
  { t: "No leyó el protocolo completo.", unlock: null },
  { t: "Se olvidó de comer.", unlock: null },
  { t: "El cuenco era de Villa Celina.", unlock: null },
  { t: "Miró cuando no había que mirar.", unlock: null },
  { t: "Se lo llevó el remolino.", unlock: null },
  { t: "Firmó sin leer.", unlock: null },
  { t: "Le dijeron que era suave.", unlock: null },

  { t: "Volvió al kiosco a las siete.", unlock: "E7" },
  { t: "Todavía debía cuatro mil.", unlock: "E7" },
  { t: "Nunca supo la hora.", unlock: "E7" },
  { t: "Se quedó a mirar el remolino.", unlock: "E7" },
  { t: "El perro lo esperó tres cuadras.", unlock: "E7" },
  { t: "Perdió una zapatilla en el proceso.", unlock: "E7" },
  { t: "Bajó los once escalones dos veces.", unlock: "E7" },
  { t: "Prometió que no lo hacía más.", unlock: "E7" },
  { t: "Le sostuvieron el pelo. No alcanzó.", unlock: "E7" },
  { t: "Cantó los ícaros desafinado.", unlock: "E7" },
  { t: "Se lo tragó el sótano.", unlock: "E7" },
  { t: "Levantó la mano en la ronda de la dieta.", unlock: "E7" },
  { t: "El colectivo lo dejó en la cabecera.", unlock: "E7" },
  { t: "Discutió con la señora del tercero.", unlock: "E7" },
  { t: "El reloj marcaba 4:12.", unlock: "E7" },
  { t: "Nadie del retiro fue al velorio.", unlock: "E7" },
  { t: "Se metió en la pileta sin sacar la rana.", unlock: "E7" },
  { t: "Le creyó al traductor.", unlock: "E7" },
  { t: "Dejó el guiso para después.", unlock: "E7" },
  { t: "Se lo contó a demasiada gente.", unlock: "E7" },
  { t: "Su ego lo sobrevivió.", unlock: "E7" },
  { t: "El galpón sigue funcionando.", unlock: "E7" },
  { t: "Nunca devolvió la llamada.", unlock: "E7" },
  { t: "Iba a empezar el lunes.", unlock: "E7" },
  { t: "Tenía razón y nadie lo escuchó.", unlock: "E7" },
  { t: "Se fue sin pagar la última vuelta.", unlock: "E7" },
  { t: "Confundió el samadhi con la siesta.", unlock: "E7" },
  { t: "Aún se le debe una respuesta.", unlock: "E7" }
];

PICHI.epitafio = function () {
  var pool = [];
  for (var i = 0; i < PICHI.EPITAFIOS.length; i++) {
    if (PICHI.tieneUnlock(PICHI.EPITAFIOS[i].unlock)) pool.push(PICHI.EPITAFIOS[i].t);
  }
  return PICHI.pick(pool);
};
