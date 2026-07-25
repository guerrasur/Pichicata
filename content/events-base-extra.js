/* PICHICATA — eventos base, parte 3/3.
   Este archivo existe por una medición: en 80 runs de un jugador nuevo,
   ev_ego_astral salía 49 veces. El pool base tenía 2 eventos de categoría
   "ruta" y 6 de "combate", y el Tramo IV estaba casi vacío, así que el ritmo
   del tramo caía siempre en los mismos. Todo lo de acá llena esos huecos.

   Todos con 3 redacciones: es el estándar para contenido nuevo. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

/* ==================== RUTA (bisagras narrativas) ==================== */

{
  id: "ev_cruce_de_caminos", categoria: "ruta", tramo: [1, 2], peso: 11, unlock: null,
  slots: { escenario: { tags: ["transito", "urbano", "conurbano"] }, personaje: { tags: ["social", "transito", "veterano"] }, complicacion: { tags: ["personal", "social"] } },
  variantes: [
    { texto: [
      "Hay dos maneras de seguir desde {escenario} y las dos llegan.",
      "Una es la que te dijeron. La otra la sugiere {personaje.nombre}, {personaje.mote}, que no tiene ningún interés en el asunto y por eso mismo conviene escucharlo.",
      "{^complicacion}, y eso te apura la decisión más de lo que te gustaría."
    ]},
    { texto: [
      "«Si vas por ahí llegás a las nueve. Si vas por el otro lado llegás mañana, pero llegás distinto.»",
      "{^personaje.desc}. Lo dice sin dramatismo, como quien informa el clima.",
      "En {escenario} no hay carteles y no hay señal para chequear nada."
    ]},
    { texto: [
      "Te das cuenta, parado en {escenario}, de que nadie sabe dónde estás y de que eso es una posibilidad y no un problema.",
      "Podés seguir el plan. Podés no seguirlo. Las dos cosas son legítimas y una sola es cómoda.",
      "{personaje.nombre} espera al lado tuyo sin apurarte, lo cual es peor que si te apurara."
    ]}
  ],
  opciones: [
    { label: "Seguir el plan.", pericia: "conciencia", efectos: { conciencia: 6, aguante: 5, paranoia: -8 },
      resultado: ["Llegás a horario y entero. Nadie escribe canciones sobre esto y funciona igual.",
                  "El camino conocido cumple lo que promete, que es exactamente lo que promete y nada más."] },
    { label: "Ir por donde dice {personaje.nombre}.", efectos: { conciencia: 16, aguante: -12, paranoia: 8 }, flags: { set: ["desvio"] },
      riesgo: { prob: 0.3, efectos: { aguante: -10, mangos: -150 }, resultado: ["El camino largo era largo por un motivo. Cuatro horas de más y una ampolla en el talón izquierdo."] },
      resultado: ["El desvío te muestra tres cosas que el plan no incluía. Una de las tres te va a servir dentro de dos tramos.",
                  "Llegás tarde, sucio, y con algo que no tenías al salir."] },
    { label: "Quedarte donde estás y no decidir nada.", efectos: { conciencia: 12, aguante: -5, paranoia: 12 },
      resultado: ["Te sentás en el cordón cuarenta minutos. La decisión se toma sola por vencimiento, que es como se toman la mayoría.",
                  "No elegís. Se hace de noche. Ahora hay una sola opción y no la elegiste vos."] },
    { label: "Preguntarle por qué te lo dice.", efectos: { conciencia: 18, karma: 8 },
      resultado: ["«Porque a mí nadie me lo dijo», contesta. Y con eso queda claro todo lo que hacía falta.",
                  "Se encoge de hombros. «Vos hacé lo que quieras.» Pero ya te lo dijo, y eso no se puede desdecir."] }
  ]
},

{
  id: "ev_carta_de_ruta", categoria: "ruta", tramo: [2, 3], peso: 10, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["guru", "chanta", "autentico"] }, complicacion: { tags: ["misterio", "social"] } },
  ascii: "libreta",
  variantes: [
    { texto: [
      "{personaje.nombre} te da una dirección escrita en un papel y te pide que no la abras hasta llegar a {escenario}.",
      "Ya llegaste. El papel está en el bolsillo desde hace cuatro horas y pesa más que el bolso.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay una dirección anotada con letra ajena y una instrucción: «no le digas a nadie».",
      "{^personaje.desc}. Te la dio sin explicación y sin pedirte nada a cambio, que es lo que más desconfianza genera.",
      "En {escenario}, con el papel abierto en la mano, tenés que decidir si esto es una oportunidad o una trampa."
    ]},
    { texto: [
      "El papel dice una calle, una altura y una hora. Nada más.",
      "La hora es dentro de cuarenta minutos y la calle está a treinta.",
      "{personaje.nombre} no está para que le preguntes nada: {personaje.nombre} desapareció hace dos tramos."
    ]}
  ],
  opciones: [
    { label: "Ir.", efectos: { conciencia: 20, paranoia: 15, aguante: -10 }, flags: { set: ["siguio_la_carta"] },
      riesgo: { prob: 0.3, efectos: { mangos: -300, paranoia: 20 }, resultado: ["La dirección era un local cerrado con una cadena. Cuarenta minutos parado en la puerta y un viaje pagado al vacío."] },
      resultado: ["Vas. Lo que hay ahí no es lo que esperabas y es mejor.",
                  "Toca el timbre alguien que te estaba esperando de verdad. No te lo van a explicar nunca."] },
    { label: "No ir y guardar el papel.", efectos: { conciencia: 8, paranoia: 12, aguante: 5 },
      resultado: ["Te lo guardás en el bolsillo interno. Vas a encontrarlo en dos meses y te vas a quedar mirándolo.",
                  "No vas. La curiosidad no se apaga: se archiva."] },
    { label: "Tirarlo sin leerlo.", pericia: "aguante", efectos: { conciencia: 5, paranoia: -12, karma: -5 },
      resultado: ["Lo rompés en cuatro sin abrirlo. Es una forma de libertad y también de cobardía.",
                  "Al tacho. Once minutos después estás con la cabeza en otra parte, que era el objetivo."] },
    { label: "Mostrarle el papel a alguien y preguntar qué es.", efectos: { conciencia: 14, karma: 5, paranoia: 8 },
      resultado: ["Se lo mostrás a la primera persona confiable que encontrás. Cambia de cara. «Uh», dice. Y no aclara.",
                  "«Yo no iría», te dicen. Y no explican por qué, que es lo que lo hace terrible."] }
  ]
},

{
  id: "ev_te_quieren_de_vuelta", categoria: "ruta", tramo: [3], peso: 11, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["familia", "social", "cuidadora"] } },
  ascii: "telefono",
  variantes: [
    { texto: [
      "{personaje.nombre} te ubica en {escenario} y no vino a discutir: vino a llevarte.",
      "Tiene el auto en doble fila y la puerta del acompañante abierta.",
      "No dice «te lo dije». Eso es lo que hace que sea difícil."
    ]},
    { texto: [
      "«Vamos a casa.» Tres palabras y un auto en marcha.",
      "{^personaje.desc}. Hizo doscientos kilómetros para decirte eso.",
      "Detrás de vos está el resto del viaje, que ahora, de golpe, parece una idea de otra persona."
    ]},
    { texto: [
      "Lo peor no es que te vengan a buscar. Lo peor es querer subir.",
      "En {escenario}, con la puerta abierta y el motor prendido, medís lo que te queda de camino y lo que te queda de cuerpo.",
      "{personaje.nombre} espera. Va a esperar el tiempo que haga falta y eso es lo que más pesa."
    ]}
  ],
  opciones: [
    { label: "Subir al auto.", pericia: "aguante", efectos: { aguante: 30, karma: 15, paranoia: -25, conciencia: -12 }, flags: { set: ["se_volvio"] },
      resultado: ["Subís. Dormís nueve horas en tu cama. El viaje se termina acá y no está mal que se termine acá.",
                  "Cerrás la puerta y en la primera cuadra te largás a llorar de alivio, que es un alivio que va a doler después."] },
    { label: "Decirle que no y explicarle por qué.", pericia: "karma", efectos: { conciencia: 22, karma: 12, aguante: -8, paranoia: 8 }, flags: { set: ["camino_propio"] },
      resultado: ["Le explicás cuatro minutos. Entiende un veinte por ciento y te deja ir igual, que es la forma más pura de querer a alguien.",
                  "«Bueno», dice, y te da plata para el bondi de vuelta por si acaso. La guardás sin usar."] },
    { label: "Decirle que no sin explicar nada.", pericia: "karma", efectos: { conciencia: 12, karma: -12, paranoia: 12 },
      resultado: ["Das media vuelta y caminás. El auto se queda ahí con la puerta abierta un rato largo.",
                  "«No», decís, y nada más. Vas a tener que arreglar esto y no va a ser hoy."] },
    { label: "Pedirle que se quede con vos un rato.", requiere: { stats: { karma: { min: 20 } } }, requisitoTexto: "Karma 20",
      pericia: "karma", efectos: { conciencia: 25, karma: 20, aguante: 15, paranoia: -20 },
      resultado: ["Se queda. Caminan cuatro horas sin rumbo y le contás todo, la parte fea incluida. Al final se va sola y vos seguís, y los dos están mejor.",
                  "Apaga el motor. Se sientan en el cordón. Es la mejor hora del viaje."] }
  ]
},

{
  id: "ev_dos_puertas", categoria: "ruta", tramo: [3, 4], peso: 11, unlock: null,
  slots: { escenario: { tags: ["interior", "ritual", "astral"] }, complicacion: { tags: ["misterio", "trip", "astral"] } },
  ascii: "puerta",
  variantes: [
    { texto: [
      "Hay dos puertas en {escenario} y nadie las custodia, que es lo que las hace difíciles.",
      "Por una se escucha gente. Por la otra no se escucha nada.",
      "{^complicacion}."
    ]},
    { texto: [
      "Una puerta da a lo que ya conocés. La otra no da a nada que puedas nombrar, y eso no la vuelve mejor.",
      "No hay guía, no hay cartel, no hay ceremonia. Hay dos manijas a la misma altura.",
      "Lo único cierto es que la que no elijas se va a cerrar."
    ]},
    { texto: [
      "El pasillo termina en dos puertas iguales y en una decisión que no admite consulta.",
      "Del lado de la izquierda hay olor a comida. Del lado de la derecha hay una corriente de aire fresco.",
      "{^complicacion}, y no te ayuda a decidir en absoluto."
    ]}
  ],
  opciones: [
    { label: "La puerta con gente.", efectos: { conciencia: 12, karma: 12, aguante: 12, paranoia: -15 },
      resultado: ["Del otro lado hay doce personas comiendo y te hacen lugar sin preguntarte nada. No es la iluminación. Es mejor por un rato.",
                  "Elegís la compañía. Es una elección buena y vas a preguntarte qué había del otro lado toda la vida."] },
    { label: "La puerta silenciosa.", efectos: { conciencia: 25, paranoia: 18, aguante: -10 },
      riesgo: { prob: 0.3, efectos: { paranoia: 20, conciencia: 8 }, resultado: ["Del otro lado hay exactamente nada, y estar en nada durante cuarenta minutos es más largo de lo que suena."] },
      resultado: ["Del otro lado hay un cuarto vacío con una silla. Te sentás. Pasa lo que tenía que pasar.",
                  "Silencio de verdad, del que no se compra. Salís distinto y sin poder contarlo."] },
    { label: "No elegir ninguna y volver por donde viniste.", efectos: { conciencia: 10, paranoia: 12, aguante: 5 },
      resultado: ["Das media vuelta. El pasillo de vuelta es más corto que el de ida, cosa que decidís no analizar.",
                  "Volvés. Nadie te lo reprocha. Vos sí, más tarde."] },
    { label: "Abrir las dos al mismo tiempo.", requiere: { stats: { efecto: { min: 40 } } }, requisitoTexto: "Efecto 40",
      pericia: "aguante", efectos: { conciencia: 20, paranoia: 25, efecto: 8, aguante: -12 },
      resultado: ["Con una mano en cada manija tirás las dos a la vez. Lo que pasa después no se puede ordenar en frases.",
                  "Las dos a la vez. Es una idea muy mala y produce el recuerdo más nítido de la run."] }
  ]
},

{
  id: "ev_ultimo_tramo_solo", categoria: "ruta", tramo: [4], peso: 12, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["social", "guru", "familia"] } },
  variantes: [
    { texto: [
      "De acá en adelante no hay nadie. {^personaje.nombre} llegó hasta {escenario} y ahí se planta.",
      "«Yo hasta acá», dice. No es abandono: es el límite de lo que puede acompañarte.",
      "Se saludan de un modo raro, como dos personas que no van a volver a verse y no lo dicen."
    ]},
    { texto: [
      "El último tramo se camina solo y eso no es una metáfora del retiro: es la logística del lugar.",
      "{^personaje.desc}. Te da agua, te mira la cara, asiente.",
      "«Andá», dice. Es la única instrucción que recibiste en todo el viaje que sirve para algo."
    ]},
    { texto: [
      "Están los dos parados en {escenario} y hay que decir algo antes de separarse.",
      "Ninguno de los dos es bueno para esto.",
      "Lo que se diga acá va a ser lo último que se diga."
    ]}
  ],
  opciones: [
    { label: "Agradecerle de verdad y seguir.", efectos: { conciencia: 22, karma: 20, paranoia: -15 },
      resultado: ["Le decís lo que le tenías que decir, completo, sin abreviar. Se le pone la cara rara. Seguís caminando y no mirás atrás.",
                  "Cuatro frases honestas y un abrazo largo. Después el camino, que ahora es tuyo entero."] },
    { label: "Pedirle que te acompañe un tramo más.", efectos: { conciencia: 8, karma: 5, aguante: 8, paranoia: -12 },
      riesgo: { prob: 0.4, efectos: { conciencia: -8, karma: -8 }, resultado: ["Acepta y no debería haber aceptado. Los últimos dos kilómetros son incómodos para los dos y le arruinás la despedida."] },
      resultado: ["Acepta media hora más. Es media hora robada y las dos partes saben que está robada, y vale.",
                  "«Un poco», dice. Caminan doscientos metros y ahí sí se separan, mejor."] },
    { label: "Irte sin decir nada.", efectos: { conciencia: 14, karma: -10, paranoia: 10 },
      resultado: ["Arrancás a caminar sin despedirte. Es lo más fácil y va a ser lo que más te vuelva.",
                  "No decís nada. A los cien metros te das vuelta y ya no está."] },
    { label: "Preguntarle qué hay arriba.", efectos: { conciencia: 20, paranoia: 8 },
      resultado: ["«No sé», dice. «Yo nunca subí.» Y entonces entendés lo que estuvo haciendo todo este tiempo.",
                  "«Lo mismo que abajo», contesta. «Pero desde más lejos.» Y se ríe de su propia frase."] }
  ]
},

{
  id: "ev_atajo_dudoso", categoria: "ruta", tramo: [1, 3], peso: 10, unlock: null,
  slots: { escenario: { tags: ["urbano", "conurbano", "transito", "precario"] }, personaje: { tags: ["lumpen", "joven", "transito"] }, complicacion: { tags: ["policial", "vigilancia", "ruido"] } },
  variantes: [
    { texto: [
      "Hay un atajo por atrás de {escenario} que ahorra cuarenta minutos y agrega cuatro problemas posibles.",
      "{personaje.nombre} lo usa todos los días y te lo ofrece con la naturalidad del que nunca le pasó nada.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Por acá se corta», dice {personaje.desc}, señalando un pasillo entre dos paredes que no figura en ningún mapa.",
      "El pasillo tiene ochenta metros y en el medio no hay luz.",
      "Los cuarenta minutos que ahorrás son reales. Los otros riesgos también."
    ]},
    { texto: [
      "El camino largo es seguro y son cuarenta minutos. El corto son ocho y no se sabe.",
      "Es el tipo de cálculo que uno hace mal cuando está cansado, y estás cansado.",
      "{personaje.nombre} ya arrancó a caminar para el lado corto sin esperar tu respuesta."
    ]}
  ],
  opciones: [
    { label: "Ir por el atajo.", tirada: { stat: "karma", dificultad: -20 },
      exito: { efectos: { aguante: 8, conciencia: 10, paranoia: 8 }, resultado: ["Ocho minutos y del otro lado. No pasó nada. La mayoría de las veces no pasa nada, y ese es justamente el problema del cálculo."] },
      fallo: { efectos: { aguante: -18, mangos: -350, paranoia: 25 }, resultado: ["En el medio del pasillo, donde no hay luz, pasa lo que puede pasar en un pasillo sin luz. Es breve y te deja sentado contra una pared haciendo inventario."] },
      resultado: [] },
    { label: "Ir por el camino largo.", efectos: { aguante: -10, conciencia: 8, paranoia: -10 },
      resultado: ["Cuarenta minutos de más y llegás. {^personaje.nombre} te está esperando del otro lado desde hace media hora, sin reproche.",
                  "El camino largo es aburrido, que es su virtud principal."] },
    { label: "Ir por el atajo pero acompañado.", efectos: { aguante: 5, karma: 10, conciencia: 12, paranoia: 5 },
      riesgo: { prob: 0.2, efectos: { aguante: -10, paranoia: 15 }, resultado: ["Pasa algo igual, pero al haber dos se resuelve en treinta segundos y sin pérdidas materiales."] },
      resultado: ["Pedís que vayan juntos. Se ríe pero acepta. Los ochenta metros se hacen en cuarenta segundos y hablando.",
                  "Ir de dos cambia la aritmética del pasillo por completo."] },
    { label: "Quedarte de este lado y no cruzar.", efectos: { conciencia: 12, aguante: 5, paranoia: -8, karma: -5 },
      resultado: ["No cruzás. Te quedás sentado en un umbral hasta que aclara. Es la decisión de un cobarde con criterio.",
                  "Decidís que hoy no. Mañana vas a cruzar por el largo y va a estar bien."] }
  ]
},

/* ==================== COMBATE ==================== */

{
  id: "ev_pelea_de_ronda", categoria: "combate", tramo: [2, 3], peso: 11, unlock: null,
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["chanta", "guru", "esceptico"] }, personaje2: { tags: ["social", "joven"] }, complicacion: { tags: ["conflicto", "social"] } },
  variantes: [
    { texto: [
      "Se agarran {personaje.nombre} y {personaje2.nombre} en el medio de {escenario} y no es una discusión filosófica.",
      "Empezó por un lugar en el círculo y en cuatro frases ya es por otra cosa de hace años.",
      "{^complicacion}."
    ]},
    { texto: [
      "Los dos están de pie y los demás sentados, que es la geometría exacta del problema.",
      "{^personaje.desc}, señalando con el dedo a treinta centímetros de una cara.",
      "Falta muy poco. Alguien tiene que hacer algo y todos miran para otro lado."
    ]},
    { texto: [
      "El grito viene de la cocina y después el ruido de algo de metal contra el piso.",
      "Cuando llegás a {escenario} están separados por dos personas y siguen hablándose por encima de los hombros.",
      "El clima del retiro se acaba de terminar y todavía faltan dos días."
    ]}
  ],
  opciones: [
    { label: "Meterte en el medio, físicamente.", tirada: { stat: "aguante", dificultad: 50 },
      exito: { efectos: { karma: 18, conciencia: 15, aguante: -12 }, resultado: ["Te pones en el medio y aguantás el empujón. Se cortó. Los dos te van a agradecer separado y ninguno delante del otro."] },
      fallo: { efectos: { aguante: -22, karma: 5, paranoia: 15 }, resultado: ["Te llevás el golpe que era para el otro. Se cortó igual, pero por lástima, y te queda el pómulo hinchado dos tramos."] },
      resultado: [] },
    { label: "Hablarles fuerte desde afuera.", efectos: { conciencia: 12, karma: 10, paranoia: 8 },
      riesgo: { prob: 0.35, efectos: { karma: -8, paranoia: 12 }, resultado: ["Los dos se dan vuelta y te contestan a vos. Ahora la pelea es de tres y una parte es tuya."] },
      resultado: ["Cuatro palabras en voz alta y un nombre. Alcanza. La autoridad a veces está disponible y hay que agarrarla.",
                  "«¡Che!» Se frenan los dos. Ni vos entendés por qué funcionó."] },
    { label: "Sacar a {personaje2.nombre} de ahí.", pericia: "aguante", efectos: { karma: 15, conciencia: 12, aguante: -8 },
      resultado: ["Lo agarrás del brazo y lo llevás afuera. Se resiste dos pasos y después no. Afuera se pone a llorar y ahí empieza la parte útil.",
                  "Elegís al que estaba perdiendo. Es una elección y la asumís."] },
    { label: "Quedarte sentado en tu lugar.", efectos: { conciencia: 6, karma: -10, paranoia: 15 },
      resultado: ["No te movés. Se resuelve solo, peor y más tarde. Vas a repasar este momento.",
                  "Miras el piso con concentración profesional. La cobardía también es una técnica de meditación."] }
  ]
},

{
  id: "ev_te_quieren_robar", categoria: "combate", tramo: [1, 2, 3], peso: 11, unlock: null,
  slots: { escenario: { tags: ["urbano", "conurbano", "noche", "transito"] }, personaje: { tags: ["lumpen", "joven"] } },
  variantes: [
    { texto: [
      "Pasa rápido, como pasan estas cosas: una mano en el bolsillo y {objeto} que ya no está.",
      "{personaje.nombre} está a cuatro metros y camina sin apurarse, que es la parte más insultante.",
      "Tenés dos segundos para decidir si esto se convierte en algo."
    ]},
    { texto: [
      "En {escenario}, sin ninguna violencia y con una habilidad admirable, te vacían el bolsillo.",
      "Te das cuenta once segundos después, que es exactamente el tiempo que necesitaban.",
      "{^personaje.desc}, doblando la esquina."
    ]},
    { texto: [
      "No es un asalto. Es un descuido tuyo aprovechado por otro, y la diferencia importa poco ahora.",
      "Lo que se llevaron no vale nada y era tuyo.",
      "{personaje.nombre} te mira desde la otra vereda esperando a ver qué clase de persona sos."
    ]}
  ],
  opciones: [
    { label: "Correrlo.", tirada: { stat: "aguante", dificultad: 55 },
      exito: { efectos: { aguante: -15, paranoia: 12, conciencia: 8 }, resultado: ["Lo alcanzás en la esquina. Suelta todo sin discutir y se va caminando. Ganás y no se siente como ganar."] },
      fallo: { efectos: { aguante: -25, paranoia: 20, mangos: -200 }, resultado: ["Cuatro cuadras y no lo ves más. Te quedás doblado en dos, con las manos en las rodillas, en un barrio que no conocés."] },
      resultado: [] },
    { label: "Dejarlo ir.", efectos: { conciencia: 14, karma: 8, paranoia: -8 },
      resultado: ["Lo dejás. Es una pérdida chica y una libertad grande, y solo una de las dos se nota hoy.",
                  "No hacés nada. En dos cuadras ya no te importa, y eso es información sobre lo que perdiste."] },
    { label: "Gritarle que se lo puede quedar.", efectos: { conciencia: 18, karma: 15, paranoia: 5 },
      riesgo: { prob: 0.3, efectos: { karma: -5, paranoia: 12 }, resultado: ["Se da vuelta, te mira, y vuelve. No para devolverte nada: para preguntarte qué te pasa. La conversación es incomodísima."] },
      resultado: ["«¡Quedátelo!», gritás. Se para en seco y se da vuelta. No sabe qué hacer con esto y vos tampoco.",
                  "Lo grita y suena a locura y es lo más sano que hiciste hoy."] },
    { label: "Pedirle que te devuelva solo una cosa.", efectos: { conciencia: 20, karma: 12, paranoia: 8 },
      riesgo: { prob: 0.4, efectos: { paranoia: 15, karma: -3 }, resultado: ["No contesta y sigue caminando. Le pediste algo a alguien que no te debía nada."] },
      resultado: ["Le explicás que una de esas cosas no vale plata y sí otra cosa. Te la devuelve sin decir palabra y se lleva el resto. Fue un trato.",
                  "Se para. Escucha. Vuelve, te deja una cosa en la mano, y se va. Nunca vas a poder explicar esto bien."] }
  ]
},

{
  id: "ev_confrontar_al_guru", categoria: "combate", tramo: [3, 4], peso: 11, unlock: null,
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["guru", "chanta"] }, complicacion: { tags: ["social", "conflicto", "vigilancia"] } },
  variantes: [
    { texto: [
      "Se termina la paciencia y se termina en público, delante de once personas, en {escenario}.",
      "{personaje.nombre} está diciendo algo que ya le escuchaste decir tres veces con distintas palabras y el mismo precio.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay un momento en que la única opción digna es decirlo en voz alta, y ese momento es ahora o no es nunca.",
      "{^personaje.desc}. No se lo espera: nadie le levanta la voz a esta altura del retiro.",
      "Once personas dejan de respirar al mismo tiempo."
    ]},
    { texto: [
      "«¿Puedo decir una cosa?» Todavía estás a tiempo de que sea una pregunta inofensiva.",
      "{personaje.nombre} te da permiso con la mano, generoso, seguro.",
      "Lo que digas ahora define el resto del viaje."
    ]}
  ],
  opciones: [
    { label: "Decirlo todo, con nombres y montos.", efectos: { conciencia: 25, karma: 8, paranoia: 20 }, flags: { set: ["retiro_quemado"] },
      resultado: ["Hablás cuatro minutos sin que te tiemble la voz. Cuando terminás hay un silencio y después empieza a hablar otro, y después otro. Se cayó todo.",
                  "Lo decís completo. Dos personas se levantan y se van del retiro. Una te da la mano."] },
    { label: "Decirlo en privado después.", efectos: { conciencia: 16, karma: 12, paranoia: 8 },
      resultado: ["Esperás y se lo decís a solas. Escucha, no admite nada, y a la mañana el desayuno es distinto para los dos.",
                  "En privado es menos glorioso y más efectivo: cambia dos cosas concretas del retiro."] },
    { label: "Hacer una pregunta que lo deje en evidencia sin acusarlo.", efectos: { conciencia: 22, karma: 12, paranoia: 12 },
      riesgo: { prob: 0.35, efectos: { conciencia: -5, paranoia: 15 }, resultado: ["Te la devuelve con una respuesta tan bien armada que once personas quedan convencidas y vos también, por veinte minutos."] },
      resultado: ["Una sola pregunta, corta y precisa. No la puede contestar. El silencio hace el trabajo mejor que cualquier acusación.",
                  "Pregunta quirúrgica. Cambia de tema y todos notan que cambió de tema."] },
    { label: "Tragártelo.", efectos: { conciencia: 5, karma: -8, paranoia: 20 },
      resultado: ["Decís «nada, nada» y te sentás. Se te queda adentro y se te va a quedar adentro un tiempo largo.",
                  "«Olvidate», decís. La palabra «olvidate» acá significa exactamente lo contrario."] }
  ]
},

{
  id: "ev_cuerpo_dice_basta", categoria: "combate", tramo: [3, 4], peso: 11, unlock: null,
  requiere: { stats: { aguante: { max: 45 } } },
  slots: { escenario: {}, complicacion: { tags: ["cuerpo", "quimico"] } },
  ascii: "mano",
  variantes: [
    { texto: [
      "Se te va el cuerpo. No es cansancio: es una negociación que estás perdiendo.",
      "En {escenario} tenés que sentarte y sentarte no es una opción que hayas elegido.",
      "{^complicacion}."
    ]},
    { texto: [
      "Las manos te tiemblan de una manera nueva, con un ritmo propio que no responde a la voluntad.",
      "Hacés la cuenta: horas sin dormir, horas sin comer, lo que te metiste. La cuenta no cierra a favor.",
      "El cuerpo lleva registro y hoy vino a mostrarte la planilla."
    ]},
    { texto: [
      "Te agachás a atarte una zapatilla y al levantarte se te va la vista tres segundos completos.",
      "Tres segundos es mucho. Tres segundos es un aviso escrito con letra grande.",
      "{^complicacion}, y esta vez no lo podés atribuir a otra cosa."
    ]}
  ],
  opciones: [
    { label: "Parar todo. Comer, tomar agua, dormir.", efectos: { aguante: 30, efecto: -30, paranoia: -20, conciencia: 10 },
      resultado: ["Cortás el viaje cuatro horas y le das al cuerpo lo que pide. Es lo menos épico y lo más inteligente.",
                  "Un sándwich, un litro de agua y tres horas de sueño. El cuerpo perdona rápido cuando se le hace caso."] },
    { label: "Aguantar un poco más.", efectos: { aguante: -15, conciencia: 12, paranoia: 15 },
      riesgo: { prob: 0.45, efectos: { aguante: -15, paranoia: 15 }, resultado: ["El «poco más» dura dos horas y se paga con seis. En algún momento te apoyás en una pared y no te acordás de cómo llegaste ahí."] },
      resultado: ["Aguantás. Llegás a donde querías llegar y llegás roto, y las dos cosas cuentan.",
                  "Te empujás dos turnos más. El cuerpo cobra intereses."] },
    { label: "Pedir ayuda.", pericia: "karma", efectos: { aguante: 22, karma: 15, conciencia: 15, paranoia: -20 },
      resultado: ["Decís «no doy más» en voz alta, a alguien. Aparece agua, aparece comida, aparece un lugar donde acostarse. Es así de simple y cuesta muchísimo.",
                  "Pedís y te dan. La lección del tramo entero estaba acá."] },
    { label: "Taparlo con algo.", requiere: { stats: { mangos: { min: 200 } } }, requisitoTexto: "$200",
      efectos: { mangos: -200, aguante: 10, efecto: 25, paranoia: 15, conciencia: -5 },
      resultado: ["Algo que te ponga en pie. Funciona una hora y media y después te deja peor que antes, que es el contrato que firmaste.",
                  "Comprás dos horas de cuerpo prestado. Se devuelven con recargo."] }
  ]
},

{
  id: "ev_discusion_metafisica", categoria: "combate", tramo: [1, 2, 3], peso: 10, unlock: null,
  slots: { escenario: { tags: ["social", "ritual", "interior"] }, personaje: { tags: ["esceptico", "chanta", "guru", "social"] }, complicacion: { tags: ["social", "ruido"] } },
  variantes: [
    { texto: [
      "La discusión arranca por una tontería y a los seis minutos es sobre si existe el alma.",
      "{personaje.nombre} tiene una posición y la defiende con una energía desproporcionada para las diez de la noche.",
      "{^complicacion}."
    ]},
    { texto: [
      "«A ver, explicame», dice {personaje.desc}, y ese «explicame» no busca ninguna explicación.",
      "Están en {escenario} y hay público, que es lo que convierte una charla en una pelea.",
      "Tenés razón en dos de los tres puntos y él tiene razón en el que importa."
    ]},
    { texto: [
      "Es la cuarta vez esta semana que se discute exactamente esto, con las mismas personas y las mismas frases.",
      "El ritual de la discusión es más estable que cualquier ceremonia del retiro.",
      "{personaje.nombre} te mira esperando tu línea del guion."
    ]}
  ],
  opciones: [
    { label: "Ganar la discusión.", efectos: { conciencia: 8, karma: -10, paranoia: 12 },
      resultado: ["Le ganás con dos datos y una analogía. Se calla. Ganaste y el clima de la habitación es peor. Sumá eso al puntaje.",
                  "Victoria total en once minutos. Nadie te felicita."] },
    { label: "Concederle el punto aunque tengas razón.", efectos: { conciencia: 20, karma: 15, paranoia: -12 },
      resultado: ["«Puede ser», decís, y lo decís de verdad. Se desarma la discusión y aparece una charla, que era lo que se necesitaba.",
                  "Cedés a propósito. Cuatro personas notan lo que hiciste y una te lo va a decir dos días después."] },
    { label: "Cambiar de tema con un chiste.", efectos: { karma: 10, conciencia: 5, paranoia: -8 },
      riesgo: { prob: 0.35, efectos: { karma: -8, paranoia: 10 }, resultado: ["El chiste sale mal y ahora el tema es el chiste. Empeoraste una discusión que ya era mala."] },
      resultado: ["Un chiste al momento justo desactiva la mitad de las guerras del mundo. Esta también.",
                  "Se ríen cinco de siete. Los otros dos siguen discutiendo solos y se aburren."] },
    { label: "Levantarte e irte en la mitad.", pericia: "aguante", efectos: { conciencia: 14, karma: -5, paranoia: 8 },
      resultado: ["Te levantás sin explicar y salís. Escuchás que sigue hablando solo tres frases más antes de darse cuenta.",
                  "Irse es una respuesta y es la que menos se usa."] }
  ]
},

/* ==================== COMERCIO ==================== */

{
  id: "ev_vender_lo_ultimo", categoria: "comercio", tramo: [2, 3], peso: 11, unlock: null,
  requiere: { stats: { mangos: { max: 250 } } },
  slots: { escenario: { tags: ["comercio", "urbano", "conurbano"] }, personaje: { tags: ["comercio", "lumpen"] } },
  variantes: [
    { texto: [
      "Queda una sola cosa vendible y es la que no querías vender.",
      "{personaje.nombre} la mira desde la ventanita de {escenario}, la da vuelta, la vuelve a mirar.",
      "Dice un número. El número es una ofensa y es lo que hay."
    ]},
    { texto: [
      "Se te terminó todo menos {objeto}, que no vale plata pero vale.",
      "{^personaje.desc}. Sabe perfectamente en qué situación estás y no lo usa en tu contra, lo cual habla bien de él.",
      "«Te doy poco», avisa antes de que preguntes."
    ]},
    { texto: [
      "El cálculo es simple y horrible: lo que te queda no alcanza para lo que falta.",
      "En el bolsillo hay una cosa que no es plata y podría serlo.",
      "{personaje.nombre} espera. No apura. Los que compran barato nunca apuran."
    ]}
  ],
  opciones: [
    { label: "Venderla.", pericia: "karma", efectos: { mangos: 350, conciencia: 8, karma: -3 },
      resultado: ["La vendés por menos de lo que vale y más de lo que esperabas. Los dos números conviven.",
                  "Sale de tu bolsillo y entra la plata y por cuatro segundos te sentís liviano. Después no."] },
    { label: "No venderla y arreglarte con lo que tenés.", efectos: { conciencia: 18, karma: 10, aguante: -12 },
      resultado: ["Te la guardás. Vas a pasar hambre y vas a tener la cosa, y en algún momento del tramo siguiente eso va a resultar la decisión correcta.",
                  "«No, dejá», decís. Caminás quince cuadras con el estómago vacío y el bolsillo lleno de algo que no se come."] },
    { label: "Pedirle que te la guarde y te preste.", pericia: "karma", efectos: { mangos: 250, karma: -5, paranoia: 10 }, flags: { set: ["deuda_kiosco"] },
      resultado: ["Empeño con otro nombre. Te presta contra la cosa y anota una fecha. La fecha existe.",
                  "«Te la guardo», dice, y los dos saben que no la vas a poder rescatar."] },
    { label: "Regalársela.", efectos: { karma: 25, conciencia: 20, mangos: 0 },
      riesgo: { prob: 0.4, efectos: { mangos: 200, karma: 5 }, resultado: ["No la acepta de regalo. Te pone plata en la mano igual, más de lo que había ofrecido, y cierra la ventanita antes de que puedas discutir."] },
      resultado: ["Se la das y te vas. No entiende nada. Es la transacción más rara de su semana y la más limpia de tu run.",
                  "«Quedátela», decís. Y caminás. Sin plata, sin la cosa, y con algo más."] }
  ]
},

{
  id: "ev_curso_relampago", categoria: "comercio", tramo: [1, 2], peso: 10, unlock: null,
  slots: { escenario: { tags: ["social", "urbano", "ritual"] }, personaje: { tags: ["chanta", "comercio", "guru"] }, complicacion: { tags: ["social", "absurdo"] } },
  variantes: [
    { texto: [
      "«Certificación internacional en un fin de semana.» Está impreso en una hoja A4 pegada con cinta en {escenario}.",
      "{personaje.nombre} explica que el certificado «habilita a trabajar», sin especificar dónde ni en qué.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay un curso de dos días que te convierte en algo. El algo no está muy claro pero viene con diploma.",
      "{^personaje.desc}. Tiene una carpeta con testimonios impresos y una lapicera para que firmes.",
      "El precio está escrito a mano y se ve que fue corregido dos veces."
    ]},
    { texto: [
      "«En cuarenta horas vos ya estás dando sesiones y cobrando.»",
      "La frase es una promesa, una amenaza y un modelo de negocio, todo junto.",
      "En {escenario} hay nueve personas anotadas y ocho tienen la misma cara que tenías vos en el tramo 1."
    ]}
  ],
  opciones: [
    { label: "Anotarte y hacer el curso completo.", efectos: { mangos: -800, conciencia: 14, karma: -8 }, flags: { set: ["certificado"] },
      resultado: ["Dos días, cuarenta horas nominales, veintiséis reales. Aprendés tres cosas útiles y una manera de hablar que da resultados.",
                  "Te dan el diploma en una carpeta de plástico. Lo vas a usar y va a funcionar, y eso es lo inquietante."] },
    { label: "Anotarte y no ir.", efectos: { mangos: -800, karma: -5, conciencia: 3 },
      resultado: ["Pagás y no vas. Es la manera más caras de decir que no.",
                  "El domingo a la mañana te quedás en la cama sabiendo cuánto cuesta esa cama."] },
    { label: "Ofrecerte a dar vos una parte del curso.", pericia: "karma", efectos: { mangos: 500, karma: -15, conciencia: 16 }, flags: { set: ["socio_del_chanta"] },
      resultado: ["Le propones dar el módulo de meditación. Acepta en veinte segundos, lo que dice todo sobre el nivel de exigencia.",
                  "Das cuatro horas de clase sobre algo que no sabés y sale bien. Ese «sale bien» es un problema para más adelante."] },
    { label: "Preguntar qué organismo certifica.", efectos: { conciencia: 16, karma: 5, paranoia: 5 },
      resultado: ["Da el nombre de una asociación. Buscás el nombre. La asociación es él, con otro nombre, registrada en 2019.",
                  "«Es internacional», repite tres veces sin nombrar ningún país. Fin de la investigación."] }
  ]
},

{
  id: "ev_prestamo_del_grupo", categoria: "comercio", tramo: [2, 3], peso: 10, unlock: null,
  slots: { escenario: { tags: ["social", "ritual"] }, personaje: { tags: ["social", "cuidadora", "esceptico"] }, complicacion: { tags: ["social", "conflicto"] } },
  variantes: [
    { texto: [
      "Se junta plata entre todos para una cosa del grupo y falta una parte.",
      "{personaje.nombre} pasa la lista y en la lista está tu nombre con un renglón vacío al lado.",
      "{^complicacion}."
    ]},
    { texto: [
      "«El que puede pone, el que no puede no pone, y nadie mira quién puso.»",
      "Todos miran quién puso. Es una ley física.",
      "{^personaje.desc}, sosteniendo un sobre abierto en {escenario}."
    ]},
    { texto: [
      "Hay un sobre dando vueltas y un monto sugerido que nadie fijó y todos conocen.",
      "Vos tenés exactamente ese monto y lo necesitás para otra cosa.",
      "El sobre llega a tus manos y hay diez personas en la habitación haciendo cualquier otra cosa con mucha dedicación."
    ]}
  ],
  opciones: [
    { label: "Poner de más para cubrir a otros.", requiere: { stats: { mangos: { min: 600 } } }, requisitoTexto: "$600",
      efectos: { mangos: -600, karma: 22, conciencia: 15 },
      resultado: ["Ponés el doble y no lo aclarás. Dos personas se dan cuenta y una te lo va a devolver en tres meses.",
                  "Cubrís lo que falta. Nadie sabe que fuiste vos, que es la única forma de que cuente."] },
    { label: "Poner lo justo.", efectos: { mangos: -300, karma: 5, conciencia: 5 },
      resultado: ["Ponés lo que corresponde y sigue el sobre. Es lo correcto y no es una historia.",
                  "El monto sugerido, exacto. Nadie te va a recordar por esto y está bien."] },
    { label: "No poner y decirlo en voz alta.", efectos: { karma: 12, conciencia: 18, paranoia: 8 },
      resultado: ["«No tengo», decís, fuerte, sin vergüenza. Se hace un silencio de dos segundos y después otros dos dicen lo mismo. Les abriste la puerta.",
                  "Lo decís de frente. {^personaje.nombre} asiente y sigue con el sobre. Fue un no problema."] },
    { label: "No poner y hacer como que pusiste.", efectos: { karma: -18, paranoia: 18, conciencia: 3 },
      resultado: ["Metés la mano en el sobre y la sacás. Nadie lo ve. Vos lo ves y te va a durar más que la plata.",
                  "El gesto es perfecto y el sobre no engorda. Alguien va a hacer la cuenta más tarde."] }
  ]
},

{
  id: "ev_reliquia_en_venta", categoria: "comercio", tramo: [2, 3, 4], peso: 10, unlock: null,
  slots: { escenario: { tags: ["comercio", "ritual", "social"] }, personaje: { tags: ["comercio", "chanta", "veterano"] } },
  ascii: "mala",
  variantes: [
    { texto: [
      "{personaje.nombre} tiene una cosa envuelta en un trapo y la desenvuelve como se desenvuelve algo importante.",
      "Puede ser lo que dice que es. Estadísticamente no lo es. Pero puede.",
      "El precio es alto y eso, en este rubro, es parte del argumento."
    ]},
    { texto: [
      "En {escenario}, sobre un trapo, hay un objeto que no encaja con nada de lo que hay alrededor.",
      "{^personaje.desc}. No lo promociona. Lo pone y espera, que es una técnica muy superior.",
      "«Vos sabés lo que es», dice. Y no sabés, y por eso funciona."
    ]},
    { texto: [
      "Lo tocás y hay algo. Puede ser sugestión, puede ser la temperatura, puede ser el cansancio.",
      "«No se lo muestro a todos», dice {personaje.nombre}, que probablemente se lo muestra a todos.",
      "Aun así, hay algo."
    ]}
  ],
  opciones: [
    { label: "Comprarlo al precio que pide.", requiere: { stats: { mangos: { min: 700 } } }, requisitoTexto: "$700",
      efectos: { mangos: -700, conciencia: 12 }, daReliquia: true,
      resultado: ["Pagás sin regatear, que es la única manera de comprar algo así sin arruinarlo.",
                  "Te lo envuelve en el mismo trapo y te lo da con las dos manos. El gesto vale parte del precio."] },
    { label: "Regatear.", efectos: { mangos: -350, conciencia: 5, karma: -8 }, daReliquia: true,
      riesgo: { prob: 0.35, efectos: { conciencia: -5 }, resultado: ["Baja el precio a la mitad y mientras lo baja se le va la solemnidad de la cara. Lo que compraste es otra cosa, más chica."] },
      resultado: ["Lo bajás a la mitad y te lo llevás. Ganaste plata y perdiste algo del asunto.",
                  "Negocias bien. El objeto es el mismo y ya no es el mismo."] },
    { label: "Preguntarle de dónde salió.", efectos: { conciencia: 20, karma: 5 },
      resultado: ["Cuenta una historia de cuatro minutos que es demasiado específica para ser inventada y demasiado redonda para ser cierta.",
                  "«De una casa que se remató», dice, y ahí se le va toda la mística y queda algo mejor: la verdad."] },
    { label: "No comprarlo pero pedirle tenerlo un rato.", efectos: { conciencia: 18, karma: 10, paranoia: 8 },
      resultado: ["Te lo deja en la mano cuatro minutos y no dice nada. Se lo devolvés. No compraste y algo pasó igual.",
                  "«Tomá», dice, y te lo presta. Es lo más generoso que viste en el rubro."] }
  ]
},

{
  id: "ev_changa_de_paso", categoria: "comercio", tramo: [1, 2, 3], peso: 11, unlock: null,
  requiere: { stats: { mangos: { max: 400 } } },
  slots: { escenario: { tags: ["urbano", "conurbano", "social", "comercio"] }, personaje: { tags: ["social", "cascarrabias", "comercio", "veterano"] } },
  variantes: [
    { texto: [
      "«¿Sabés cargar bolsas?» No es una pregunta filosófica y por eso es un alivio.",
      "{personaje.nombre} necesita dos horas de manos en {escenario} y paga en efectivo al terminar.",
      "No pregunta nada de tu vida, lo cual después de todo este viaje se siente como un regalo."
    ]},
    { texto: [
      "Hay laburo de dos horas y hay que decidir si tenés dos horas.",
      "{^personaje.desc}. Señala una pila de cosas y una camioneta y con eso está explicado el trabajo entero.",
      "«Termina cuando termina», aclara, que es la única cláusula del contrato."
    ]},
    { texto: [
      "El mundo material aparece de golpe en el medio del viaje espiritual y lo hace con la forma de una changa.",
      "Son dos horas, es plata, y es en {escenario}.",
      "{personaje.nombre} no tiene ninguna curiosidad sobre tu proceso y eso lo vuelve, hoy, la mejor compañía disponible."
    ]}
  ],
  opciones: [
    { label: "Aceptar y hacerlo bien.", efectos: { mangos: 600, aguante: -18, karma: 12, conciencia: 15 },
      resultado: ["Dos horas de cuerpo y nada de cabeza. Salís con plata, con la espalda rota y con la mente más limpia que en todo el retiro.",
                  "Te paga y te dice «cuando quieras». Eso vale más que la plata y las dos cosas te las llevás."] },
    { label: "Aceptar y hacerlo a medias.", efectos: { mangos: 400, aguante: -10, karma: -12 },
      resultado: ["Rendís lo mínimo. Te paga igual y no te dice «cuando quieras». La diferencia se nota en cuatro palabras.",
                  "Terminás rápido y mal. Alguien va a tener que rehacer una parte."] },
    { label: "Pedir el pago por adelantado.", efectos: { conciencia: 8, karma: -8, paranoia: 8 },
      riesgo: { prob: 0.5, efectos: { mangos: 0, karma: -5 }, resultado: ["«Así no trabajo», dice, y se busca a otro en cuatro minutos. Perdiste dos horas de plata por desconfiar primero."] },
      resultado: ["Acepta la mitad adelantada. Trabajan igual y algo quedó raro entre los dos todo el tiempo.",
                  "Te lo da sin discutir y por eso mismo te sentís mal por haberlo pedido."] },
    { label: "Decir que no, que estás en otra cosa.", efectos: { conciencia: -8, karma: -5, aguante: 5 },
      resultado: ["«Estoy en un proceso», decís. Te mira dos segundos y busca a otro. El proceso no paga el bondi.",
                  "Rechazás trabajo teniendo cuatrocientos pesos. Vas a repasar esta decisión con hambre."] }
  ]
},

/* ==================== TRAMO IV: descanso y trip ==================== */

{
  id: "ev_antes_de_subir", categoria: "descanso", tramo: [4], peso: 12, unlock: null,
  slots: { escenario: {}, complicacion: { tags: ["astral", "misterio", "melancolia"] } },
  ascii: "loto",
  variantes: [
    { texto: [
      "Falta poco y hay un momento de nada: ni evento, ni prueba, ni maestro.",
      "Te sentás en {escenario} y por primera vez en todo el viaje no hay que decidir nada urgente.",
      "{^complicacion}."
    ]},
    { texto: [
      "El último descanso antes del último tramo. Nadie te lo anuncia como tal y lo sabés igual.",
      "Tenés el cuerpo que tenés, la cabeza que tenés y las horas que quedan.",
      "Lo que hagas con estos cuarenta minutos se nota arriba."
    ]},
    { texto: [
      "Se hace una pausa larga. En {escenario} no pasa nada durante mucho rato y eso es un evento en sí mismo.",
      "Repasás el viaje entero y te sale una lista corta de cosas que valieron.",
      "La lista es más corta de lo que esperabas y las cosas que están en ella son mejores de lo que esperabas."
    ]}
  ],
  opciones: [
    { label: "Dormir todo lo que puedas.", efectos: { aguante: 32, efecto: -30, paranoia: -20, conciencia: 8 },
      resultado: ["Cuatro horas de sueño real. Es la mejor inversión disponible y la menos mística.",
                  "Te despertás con la cabeza limpia por primera vez en tres tramos."] },
    { label: "Meditar sin esperar nada.", pericia: "conciencia", efectos: { conciencia: 26, paranoia: -18, aguante: 8 }, medita: true,
      resultado: ["Cuarenta minutos sin pedir nada. Ahí se acomoda lo que faltaba acomodar.",
                  "No pasa nada y por eso funciona. Recién ahora entendés la diferencia."] },
    { label: "Repasar todo lo que hiciste en el viaje.", efectos: { conciencia: 20, karma: 10, paranoia: 8 },
      resultado: ["Repasás lo bueno y lo otro. Lo otro es más y pesa menos de lo que pensabas.",
                  "Hacés inventario honesto. Hay dos cosas de las que no vas a poder hablar nunca y una de la que sí."] },
    { label: "Tomar algo para llegar más liviano.", requiere: { flags: { any: ["tiene_faso", "vino_infinito"] } }, requisitoTexto: "tener algo",
      efectos: { efecto: 25, aguante: 10, conciencia: 8, paranoia: -12 },
      resultado: ["Uno tranquilo, mirando el horizonte, sin ceremonia. No es la mejor decisión y es una decisión honesta.",
                  "Te lo tomás despacio. Vas a subir con esto encima y vas a saber por qué."] }
  ]
},

{
  id: "ev_ultima_vision", categoria: "trip", tramo: [4], peso: 12, unlock: null, astral: true,
  slots: { escenario: {}, personaje: { tags: ["ego", "astral", "familia", "animal"] }, complicacion: { tags: ["astral", "trip"] } },
  ascii: "estrella",
  variantes: [
    { texto: [
      "Aparece una última cosa antes del final y no viene a examinarte: viene a despedirse.",
      "Es {personaje.nombre}. {^personaje.desc}.",
      "{^complicacion}."
    ]},
    { texto: [
      "No es una prueba. Ya no hay pruebas. Es una visita.",
      "En {escenario}, sin ninguna solemnidad, se sienta al lado tuyo {personaje.nombre} y no dice nada durante un rato largo.",
      "Cuando habla, dice una sola cosa, y es corta."
    ]},
    { texto: [
      "Lo último que vas a ver antes de subir se te aparece sin aviso y con una claridad absoluta.",
      "{personaje.nombre} está ahí como estuvo siempre, solo que ahora lo ves.",
      "Tenés unos minutos y después no."
    ]}
  ],
  opciones: [
    { label: "Escuchar y no contestar.", pericia: "conciencia", efectos: { conciencia: 25, karma: 12, paranoia: -15 },
      resultado: ["Escuchás la frase entera y te la guardás sin devolver nada. Era para eso.",
                  "No contestás. Asiente y se va. Quedó dicho lo que había que decir."] },
    { label: "Despedirte bien.", efectos: { conciencia: 22, karma: 22, paranoia: -20, aguante: -5 },
      resultado: ["Te despedís con todas las palabras que hacían falta. Cuesta y se puede.",
                  "Una despedida completa, sin abreviar. Es lo último que hacés antes de subir y es lo mejor que hiciste."] },
    { label: "Pedirle que suba con vos.", pericia: "karma", efectos: { conciencia: 15, karma: 8, paranoia: 12 },
      resultado: ["«No puedo», dice, sin drama. Y en ese «no puedo» hay una información enorme sobre lo que sigue.",
                  "Se ríe. «Yo ya estuve.» Y no aclara si estuvo arriba o abajo."] },
    { label: "Preguntarle si esto es real.", efectos: { conciencia: 18, paranoia: 15 },
      resultado: ["«¿Y qué diferencia hace?» No es una evasiva. Es la respuesta y te va a llevar años.",
                  "«Tan real como vos», contesta, que es tranquilizador y no lo es."] }
  ]
},

{
  id: "ev_gente_que_sube", categoria: "descanso", tramo: [4], peso: 11, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["social", "joven", "veterano"] }, personaje2: { tags: ["social", "duelo", "familia"] } },
  variantes: [
    { texto: [
      "No sos el único. Hay otros dos y también llegaron hasta acá.",
      "{personaje.nombre} y {personaje2.nombre}, sentados en {escenario}, esperando lo mismo que vos.",
      "Nadie habla de lo que viene. Se habla de otras cosas, que es lo correcto."
    ]},
    { texto: [
      "Hay una cola. Es corta —tres personas— y es una cola.",
      "{^personaje.desc}. Está adelante tuyo y le tiembla un poco la pierna.",
      "Atrás está {personaje2.nombre}, que llegó hace media hora y todavía no dijo una palabra."
    ]},
    { texto: [
      "Se comparte lo último que queda: media botella de agua y dos galletitas para tres.",
      "En {escenario}, con lo que falta, esto es un banquete y todos lo entienden así.",
      "Nadie pregunta a nadie cómo llegó hasta acá."
    ]}
  ],
  opciones: [
    { label: "Cederles el lugar y subir último.", efectos: { karma: 25, conciencia: 20, aguante: -8, paranoia: -12 },
      resultado: ["Los dejás pasar. Esperás cuarenta minutos más y esos cuarenta minutos te acomodan algo que no se acomodaba con nada.",
                  "Subís último. Es una elección y va a pesar en lo que pase arriba."] },
    { label: "Compartir lo que te queda.", efectos: { karma: 20, conciencia: 16, aguante: -5, paranoia: -15 },
      resultado: ["Se reparte todo en tres partes desiguales y nadie mide. Es la última comida del viaje y es buena.",
                  "Media botella entre tres. Alcanza. Siempre alcanzó."] },
    { label: "Hablar de cualquier cosa con ellos.", efectos: { conciencia: 18, karma: 15, paranoia: -18 },
      resultado: ["Cuarenta minutos hablando de fútbol, de precios y de un perro. Es la mejor conversación del tramo justamente por eso.",
                  "No se habla del asunto. Se habla de todo lo demás. Suben los tres mejor de lo que estaban."] },
    { label: "Aislarte y concentrarte en lo tuyo.", efectos: { conciencia: 20, paranoia: 8, karma: -10 }, medita: true,
      resultado: ["Te apartás veinte metros y te sentás solo. Funciona, y desde donde estás los escuchás reírse.",
                  "Elegís la concentración. Es defendible y te vas a acordar de las risas."] }
  ]
}

]);
