/* PICHICATA — packs de ruta:
     D1 (La Ruta del Norte, 6)  -> tramo 2 alternativo
     D2 (El Sótano, 6)          -> tramo 3 alternativo
     D5 (Tramo 5: El Vacío, 11) -> post-victoria */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

/* ================= D1: LA RUTA DEL NORTE ================= */

{
  id: "nr_camion_ruta", categoria: "ruta", tramo: [1, 2], peso: 11, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "transito"] }, personaje: { tags: ["transito", "veterano", "social"] } },
  variantes: [
    { texto: [
      "Te levanta un camión en {escenario} y el viaje es de seiscientos kilómetros.",
      "{personaje.desc}. Maneja con una mano y toma mate con la otra y las dos cosas le salen mejor que a vos con dos manos.",
      "«Yo llevo gente cuando me pinta», aclara. «Hoy me pintó.»"
    ]},
    { texto: [
      "La ruta a las cinco de la mañana es un pasillo con dos paredes de nada.",
      "{personaje.nombre} pone la radio en una AM que se pierde y vuelve cada veinte kilómetros.",
      "«¿Vos vas a lo del retiro?» Sabe. Todos saben. En el norte no hay secretos, hay distancias."
    ]}
  ],
  opciones: [
    { label: "Hablar los seiscientos kilómetros.", efectos: { conciencia: 22, karma: 15, aguante: -10, paranoia: -18 },
      resultado: ["Nueve horas de conversación. Te cuenta cuatro historias que valen un libro y una que no debería haberte contado.",
                  "Llegan al amanecer del día siguiente. Te baja en un cruce y te dice «cuidate». Le crees."] },
    { label: "Dormir todo el viaje.", efectos: { aguante: 25, efecto: -25, conciencia: 5, paranoia: -12 },
      resultado: ["Nueve horas de sueño en una cabina que se mueve. Llegás nuevo.",
                  "Te despierta el ruido del freno de motor bajando una cuesta. Estás en otro país y es el mismo."] },
    { label: "Convidarle algo.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 12, karma: 12, conciencia: 12, paranoia: 8 },
      riesgo: { prob: 0.35, efectos: { karma: -12, paranoia: 20 }, resultado: ["«Yo estoy laburando», te dice, seco. El resto del viaje es en silencio y son seiscientos kilómetros de silencio."] },
      resultado: ["Acepta para más adelante, en la parada, y ahí se ríen dos horas en una estación de servicio.",
                  "«Guardalo», dice, «después». Y el «después» llega y es bueno."] },
    { label: "Bajarte antes, en el medio de la nada.", efectos: { conciencia: 18, aguante: -18, paranoia: 15 }, flags: { set: ["desvio"] },
      resultado: ["Le pedís que pare en un lugar donde no hay nada. Te mira raro y para. Te quedás parado en la banquina viendo cómo se va.",
                  "Te bajás porque algo te dijo que era acá. A veces ese algo tiene razón."] }
  ]
},

{
  id: "nr_monte_noche", categoria: "trip", tramo: [2], peso: 11, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "naturaleza", "ritual"] }, personaje: { tags: ["autentico", "guru"] }, complicacion: { tags: ["naturaleza", "misterio", "astral"] } },
  ascii: "monte",
  variantes: [
    { texto: [
      "En el monte, de noche, los bichos hacen un ruido tan parejo que después de un rato es silencio.",
      "{personaje.nombre} no prendió fuego ni puso música ni dijo nada en cuarenta minutos.",
      "{^complicacion}."
    ]},
    { texto: [
      "No hay luz eléctrica en ninguna dirección disponible y eso cambia el tamaño del cielo.",
      "La ceremonia acá no tiene telas de colores ni cuencos de Villa Celina. Tiene tierra y un banquito.",
      "{personaje.desc}. Espera que estés listo y no te apura."
    ]}
  ],
  opciones: [
    { label: "Entregarte sin resistencia.", efectos: { efecto: 35, conciencia: 25, aguante: -15, paranoia: -12 }, flags: { set: ["tomo_aya", "norte"] },
      resultado: ["Es completamente distinto y no sabés explicar por qué. Hay menos espectáculo y más de lo otro.",
                  "Cuatro horas sin espectáculo. Cuando termina, {personaje.nombre} te da agua y se acuesta a dormir. Eso es todo."] },
    { label: "Pedirle que te explique primero.", efectos: { conciencia: 15, karma: 5, paranoia: 8 },
      resultado: ["«Después te explico», dice. Y después no explica nada, porque no hacía falta.",
                  "Te contesta tres preguntas con una frase cada una. Las tres respuestas son inútiles hasta la mañana."] },
    { label: "Quedarte despierto cuidando el fuego.", efectos: { conciencia: 22, karma: 20, aguante: -18, paranoia: -18 },
      resultado: ["Ocho horas de fuego. No te dormís. Cuando amanece, {personaje.nombre} te mira el fuego y asiente. Aprobaste algo.",
                  "Cuidar el fuego toda la noche es la ceremonia entera y nadie te lo va a decir."] },
    { label: "Volverte al pueblo.", efectos: { conciencia: 5, aguante: 10, paranoia: -15, karma: -8 },
      resultado: ["Caminás dos horas hasta el pueblo con la linterna del celular. Fue prudente y fue una lástima.",
                  "Te vas. En el pueblo dormís en una pensión y a las cuatro te despertás sabiendo que te perdiste algo."] }
  ]
},

{
  id: "nr_salar_mediodia", categoria: "trip", tramo: [2], peso: 10, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "trip", "naturaleza"] }, complicacion: { tags: ["trip", "cuerpo", "clima"] } },
  ascii: "salar",
  variantes: [
    { texto: [
      "El salar a las dos de la tarde. No hay sombra en ninguna dirección disponible.",
      "El blanco es tan total que dejás de ver bordes, y sin bordes el cerebro empieza a inventar.",
      "{^complicacion}."
    ]},
    { texto: [
      "Caminás y no sabés si avanzás, porque no hay ningún punto de referencia.",
      "Se te secan los labios en once minutos y la lengua en veinte.",
      "Y aun así es el lugar más hermoso en el que estuviste."
    ]}
  ],
  opciones: [
    { label: "Caminar hacia el centro y quedarte una hora.", efectos: { conciencia: 30, aguante: -25, paranoia: 15 },
      riesgo: { prob: 0.4, efectos: { aguante: -18, paranoia: 15 }, resultado: ["Insolación. Cuando volvés no ves bien por cuarenta minutos y vomitás dos veces. Valió."] },
      resultado: ["Una hora en el centro de la nada blanca. Es lo más cerca de la disolución que llegaste sin sustancias.",
                  "No hay nada. Nada de nada. Y ahí, por fin, no hay nada de vos tampoco."] },
    { label: "Acostarte y cerrar los ojos.", efectos: { conciencia: 25, aguante: -15, paranoia: -20 }, medita: true,
      resultado: ["El sol sobre los párpados hace un rojo que es una habitación. Te quedás en esa habitación cuarenta minutos.",
                  "Boca arriba en la sal. El silencio de arriba y el crujido de abajo. No falta nada."] },
    { label: "Volver a la sombra rápido.", efectos: { aguante: 12, conciencia: 10, paranoia: -8 },
      resultado: ["Volvés a la camioneta y tomás medio litro de agua. Fue la decisión correcta y la menos memorable.",
                  "Cuarenta minutos alcanzan. Los sabios saben cuándo volver."] },
    { label: "Sacarte las zapatillas y caminar descalzo.", efectos: { conciencia: 22, aguante: -18, karma: 8 },
      resultado: ["La sal corta. Caminás doscientos metros y te quedan las plantas ardiendo dos días. Y valió cada metro.",
                  "Descalzo sobre el salar. Es una idea muy mala y una experiencia muy buena."] }
  ]
},

{
  id: "nr_pueblo_doce", categoria: "dialogo", tramo: [2], peso: 10, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "social"] }, personaje: { tags: ["veterano", "social", "autentico"] }, complicacion: { tags: ["social", "melancolia"] } },
  variantes: [
    { texto: [
      "Doce habitantes censados y el almacén abre cuando el dueño se acuerda.",
      "Hoy se acordó. {^personaje.desc}, atendiendo desde una silla.",
      "{^complicacion}."
    ]},
    { texto: [
      "En {escenario} sos noticia. Sos la noticia del mes.",
      "{personaje.nombre} te pregunta de dónde venís y después le va a contar a los otros once.",
      "«Acá no viene nadie», dice, sin queja, como un dato meteorológico."
    ]}
  ],
  opciones: [
    { label: "Quedarte a charlar toda la tarde.", efectos: { conciencia: 22, karma: 18, aguante: -8, paranoia: -20 },
      resultado: ["Cuatro horas. Aparecen tres de los doce. Te cuentan la historia del pueblo, que es la historia de un tren que dejó de pasar.",
                  "Te invitan a comer. No podés decir que no y no querés decir que no."] },
    { label: "Preguntarle si acá se puede vivir.", efectos: { conciencia: 20, karma: 8 },
      resultado: ["«Se puede», dice. «Lo difícil es querer.» Y con eso te resuelve una pregunta de tres años.",
                  "«Vos no», dice, sin maldad, mirándote los zapatos. Y tiene razón."] },
    { label: "Comprar provisiones y seguir.", efectos: { mangos: -300, aguante: 15, conciencia: 8 },
      resultado: ["Comprás lo que hay, que es lo que hay. Te cobra menos de lo que corresponde.",
                  "Salís con una bolsa de nylon y cuatro cosas y la sensación de haber pasado de largo por algo."] },
    { label: "Ofrecerte a hacer un trabajo a cambio de comida.", efectos: { aguante: -12, karma: 22, conciencia: 18, mangos: 0 },
      resultado: ["Arreglás un alambrado cuatro horas. Comés como no comías desde hace meses. Duermen en un galpón limpio.",
                  "«Hay algo para hacer», dice, y hay. El trabajo también es una ceremonia."] }
  ]
},

{
  id: "nr_termas_clandestinas", categoria: "descanso", tramo: [2], peso: 10, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "cuerpo", "naturaleza"] }, personaje: { tags: ["social", "lumpen", "veterano"] } },
  variantes: [
    { texto: [
      "Se entra por un alambrado cortado y el agua sale a cuarenta y dos grados y huele a fósforo.",
      "Hay cuatro personas metidas y ninguna pagó nada nunca.",
      "{personaje.nombre} te hace lugar corriéndose diez centímetros, que es toda la ceremonia de bienvenida que hace falta."
    ]},
    { texto: [
      "El vapor a la madrugada y el olor a azufre y el cielo entero arriba.",
      "En {escenario} el agua te suelta cosas del cuerpo que no sabías que estaban ahí.",
      "«Media hora y salís», te avisa {personaje.desc}. «Más de media hora te desmayás.»"
    ]}
  ],
  opciones: [
    { label: "Media hora exacta y salir.", efectos: { aguante: 30, paranoia: -25, conciencia: 15, efecto: -25 },
      resultado: ["Media hora clavada. Salís nuevo, literalmente: se te fueron catorce horas de mala vida en treinta minutos.",
                  "Cumplís la instrucción. Los que saben, saben. Salís entero y liviano."] },
    { label: "Quedarte más de la cuenta.", efectos: { aguante: -18, conciencia: 20, paranoia: -20, efecto: -25 },
      riesgo: { prob: 0.5, efectos: { aguante: -20 }, resultado: ["Te desmayás. Te sacan entre dos. Volvés en el pasto, mirando el cielo, con cuatro personas encima."] },
      resultado: ["Cuarenta y cinco minutos. Salís mareado y con una lucidez rarísima que dura dos horas.",
                  "Te pasás y lo sentís y no te importa. El agua te tiene."] },
    { label: "Charlar con los que están.", efectos: { aguante: 20, karma: 15, conciencia: 15, paranoia: -18 },
      resultado: ["Cuatro desconocidos desnudos en el agua a las cinco de la mañana hablando de la vida. Es la mejor ronda del viaje.",
                  "Se cuentan cosas que no se cuentan vestidos. El agua caliente es un solvente social."] },
    { label: "Meditar en el agua.", efectos: { aguante: 22, conciencia: 25, paranoia: -20, efecto: -20 }, medita: true,
      resultado: ["Cuarenta grados, cero peso, cielo entero. Es la mejor condición material para meditar que vas a tener nunca.",
                  "Con el agua sosteniéndote no hay dolor de espalda ni pierna dormida. No queda nada entre vos y el asunto."] }
  ]
},

{
  id: "nr_capilla_sin_techo", categoria: "ritual", tramo: [2, 3], peso: 10, unlock: "D1",
  slots: { escenario: { tags: ["remoto", "ritual"] }, complicacion: { tags: ["misterio", "melancolia"] } },
  ascii: "cruz",
  variantes: [
    { texto: [
      "Una capilla sin techo en el medio del campo. Las palomas hicieron nido en el lugar del santo.",
      "Hay cuatro bancos de cemento y un piso de baldosas rotas y arriba está el cielo entero.",
      "{^complicacion}."
    ]},
    { texto: [
      "La puerta no tiene puerta. Entrás y no hay nada arriba, lo cual la convierte en la mejor iglesia que viste.",
      "En una pared hay nombres tallados y fechas y la más nueva es de 1987.",
      "Alguien dejó flores hace poco. Las flores están frescas y no hay ninguna casa en cuatro kilómetros."
    ]}
  ],
  opciones: [
    { label: "Sentarte en un banco y quedarte.", efectos: { conciencia: 25, karma: 12, paranoia: -20 }, medita: true,
      resultado: ["Una hora sentado en un banco de cemento bajo el cielo abierto. No rezás, no meditás, no hacés nada. Es perfecto.",
                  "Se hace la tarde. Entra luz naranja por donde debería estar el techo. No te vas a olvidar de esto."] },
    { label: "Dejar una ofrenda en el lugar del santo.", efectos: { conciencia: 20, karma: 20, paranoia: -12 },
      resultado: ["Ponés {objeto} en la hornacina vacía, al lado del nido. Las palomas no se van. Aprueban.",
                  "Dejás algo tuyo. Es la primera cosa que das sin esperar nada en toda la run."] },
    { label: "Leer todos los nombres tallados.", efectos: { conciencia: 22, karma: 8, paranoia: 12 },
      resultado: ["Cuarenta y siete nombres. Los leés todos en voz alta, uno por uno, porque alguien tiene que hacerlo.",
                  "Entre los nombres hay uno igual al tuyo, con una fecha de 1953. Te sentás un rato."] },
    { label: "Dormir ahí.", efectos: { aguante: 20, conciencia: 18, paranoia: -18, efecto: -20 },
      riesgo: { prob: 0.3, efectos: { aguante: -15 }, resultado: ["Llueve a las tres de la mañana. Es una capilla sin techo. Fue previsible."] },
      resultado: ["Dormís en el piso de la capilla con la campera de almohada y las estrellas de techo. Ocho horas.",
                  "Te despertás con el sol y con cuatro palomas mirándote. Es el mejor despertar de la run."] }
  ]
},

/* ================= D2: EL SÓTANO ================= */

{
  id: "st_escalera_hierro", categoria: "ruta", tramo: [3], peso: 11, unlock: "D2",
  slots: { escenario: { tags: ["interior", "quimico"] }, personaje: { tags: ["quimico", "turbio", "social"] } },
  variantes: [
    { texto: [
      "Se baja por una escalera de hierro y en el cuarto escalón ya no hay señal de celular.",
      "{personaje.nombre} baja adelante y no explica nada porque explicar arruina el sótano.",
      "Desde abajo sube un ruido de bajo y un olor a humedad y a menta."
    ]},
    { texto: [
      "«Es acá», dice {personaje.desc}, señalando una puerta de metal en un pasillo de servicio.",
      "Detrás hay once escalones y después no hay ventanas por el resto de la historia.",
      "«¿Bajás o no bajás?» Es la única pregunta del evento."
    ]}
  ],
  opciones: [
    { label: "Bajar.", efectos: { conciencia: 12, efecto: 20, paranoia: 15, aguante: -10 }, flags: { set: ["en_sotano"] },
      resultado: ["Bajás. Los once escalones son un pasaje y del otro lado el tiempo funciona distinto y más lento.",
                  "Abajo hay dieciocho personas y ninguna sabe qué hora es. Te integrás en cuatro minutos."] },
    { label: "Bajar y poner una alarma en el celular.", efectos: { conciencia: 20, efecto: 18, paranoia: 8 }, flags: { set: ["en_sotano", "tiene_alarma"] },
      resultado: ["Bajás con una alarma para dentro de tres horas. Es la maniobra más inteligente de la run.",
                  "Programás la salida antes de entrar. Eso te va a salvar de un tramo entero."] },
    { label: "No bajar.", efectos: { conciencia: 15, aguante: 12, paranoia: -15, karma: -5 },
      resultado: ["Das media vuelta en el tercer escalón. {^personaje.nombre} no insiste. Nunca insisten.",
                  "No bajás. Vas a pensar en qué había abajo por un tiempo y va a ser mejor que si hubieras bajado."] },
    { label: "Bajar solo a buscar a alguien y sacarlo.", efectos: { conciencia: 20, karma: 22, aguante: -15, efecto: 12, paranoia: 12 }, flags: { set: ["en_sotano", "mision_rescate"] },
      resultado: ["Bajás con un objetivo. Tener un objetivo en un sótano es lo único que te protege.",
                  "Vas a buscar a alguien. Lo encontrás en cuarenta minutos y tardás dos horas en convencerlo."] }
  ]
},

{
  id: "st_sin_horario", categoria: "trip", tramo: [3], peso: 11, unlock: "D2",
  requiere: { flags: { any: ["en_sotano"] } },
  slots: { escenario: { tags: ["interior", "quimico"] }, complicacion: { tags: ["trip", "quimico", "astral"] } },
  variantes: [
    { texto: [
      "No hay ventanas, no hay relojes, y los celulares se descargaron todos a la misma hora, lo cual es sospechoso.",
      "Puede ser cualquier momento. Es siempre el mismo momento.",
      "{^complicacion}."
    ]},
    { texto: [
      "Alguien dice «recién bajamos» y alguien dice «llevamos catorce horas» y las dos afirmaciones tienen defensores.",
      "El sótano no tiene ritmo circadiano. El sótano tiene un loop.",
      "Vos tenés que decidir qué hacés con esa información."
    ]}
  ],
  opciones: [
    { label: "Subir a mirar si es de día.", efectos: { conciencia: 22, efecto: -18, paranoia: -12, aguante: 8 },
      resultado: ["Subís los once escalones. Es martes a las cuatro de la tarde. Volvés a bajar solo para avisarles y no te creen.",
                  "Afuera hay sol. Te sentás en el cordón veinte minutos y decidís no volver a bajar."] },
    { label: "Preguntar hasta que alguien te dé un dato duro.", efectos: { conciencia: 18, paranoia: 18 },
      resultado: ["Al cuarto interrogado alguien prende un teléfono con 2%. El dato entra al sótano como una piedra.",
                  "Nadie sabe. Nadie sabe de verdad. Eso ya es una respuesta y no es buena."] },
    { label: "Dejar de preguntar y quedarte.", efectos: { efecto: 25, aguante: -22, paranoia: 20, conciencia: 8 },
      resultado: ["Aceptás el sótano. Es cómodo. Es peligrosamente cómodo. Perdés la cuenta y con la cuenta se pierde otra cosa.",
                  "Te entregás al loop. Va a haber que pagarlo y no hoy."] },
    { label: "Organizar una salida colectiva.", efectos: { karma: 25, conciencia: 22, aguante: -15, efecto: -15 },
      resultado: ["Convencés a cinco personas de subir a comer algo. Cinco personas ven el sol. Sos un organizador de excursiones al mundo.",
                  "«Vamos a desayunar», propones, y por algún milagro te siguen tres."] }
  ]
},

{
  id: "st_dueño_del_sotano", categoria: "dialogo", tramo: [3], peso: 10, unlock: "D2",
  requiere: { flags: { any: ["en_sotano"] } },
  slots: { personaje: { tags: ["turbio", "comercio", "veterano"] }, escenario: { tags: ["interior", "urbano", "quimico"] }, complicacion: { tags: ["social", "vigilancia", "ruido"] } },
  variantes: [
    { texto: [
      "Arriba del sótano hay un lugar que funciona de fachada y ese lugar es {escenario}.",
      "El dueño de las dos cosas es {personaje.nombre}: {personaje.desc}. Cobra a la salida, nunca a la entrada.",
      "{^complicacion}, y él lo registra sin mover la cara."
    ]},
    { texto: [
      "El sótano tiene un dueño y el dueño no baila.",
      "{personaje.desc}. Está sentado en una silla al lado de la puerta y cobra a la salida, no a la entrada.",
      "«A la salida arreglamos», dijo, y eso genera una deuda de monto indeterminado."
    ]},
    { texto: [
      "«Yo acá no vendo nada», aclara {personaje.nombre}. «Yo alquilo el espacio.»",
      "Es una distinción legal importante y la tiene muy estudiada.",
      "Cada tanto sube a la calle a mirar y baja y hace un gesto y todos entienden."
    ]}
  ],
  opciones: [
    { label: "Arreglar el monto ahora, por adelantado.", efectos: { mangos: -600, paranoia: -18, conciencia: 15 },
      resultado: ["Preguntás cuánto y lo pagás de una. Se sorprende. «Vos volvés», dice, y es un cumplido y una amenaza.",
                  "Pagás por adelantado y con eso te sacás la única cadena real del sótano."] },
    { label: "Preguntarle cómo llegó a esto.", efectos: { conciencia: 22, karma: 10, paranoia: 8 },
      resultado: ["Te cuenta veinte minutos. Fue músico. Después fue otra cosa. Después fue esto. No hay tragedia: hay una deriva.",
                  "«Yo antes tenía una sala de ensayo», dice. Y ahí está todo el evento."] },
    { label: "Ofrecerle trabajar para él.", efectos: { mangos: 600, karma: -18, conciencia: 12, paranoia: 15 }, flags: { set: ["trabaja_sotano"] },
      resultado: ["Te toma para atender la puerta. Cobrás en efectivo al final de la noche. Ahora sos parte de la estructura.",
                  "«Necesito uno que no tome», dice, mirándote fijo. «¿Ese sos vos?» Y decís que sí."] },
    { label: "Irte sin arreglar nada.", efectos: { mangos: 0, karma: -12, paranoia: 25 }, flags: { set: ["deuda_sotano"] },
      resultado: ["Subís los once escalones sin pasar por la silla. Nadie te frena. Eso no significa que no haya consecuencias.",
                  "Te vas debiendo. El sótano tiene memoria y tiene puerta y la puerta sigue estando ahí mañana."] }
  ]
},

{
  id: "st_baño_del_sotano", categoria: "trip", tramo: [3], peso: 10, unlock: "D2",
  requiere: { flags: { any: ["en_sotano"] } },
  slots: { complicacion: { tags: ["cuerpo", "quimico", "trip"] }, personaje: { tags: ["quimico", "social", "turbio"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "El baño está ocupado por {personaje.nombre}, {personaje.mote}, que abre la puerta igual porque acá eso no importa.",
      "«Pasá, pasá», dice, y se corre veinte centímetros que no alcanzan.",
      "{^complicacion}."
    ]},
    { texto: [
      "El baño del sótano tiene una lamparita de veinte watts y un espejo rajado en diagonal.",
      "La rajadura te divide la cara en dos y las dos mitades no coinciden del todo.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay cola para el baño y la cola no es solo para el baño, y eso lo entienden todos y no se dice.",
      "Cuando entrás, hay dos personas adentro y una es la que te invitó.",
      "«Pasá», te dicen. Es una invitación de dos capas."
    ]}
  ],
  opciones: [
    { label: "Entrar, mojarte la cara, salir.", efectos: { paranoia: -12, conciencia: 12, efecto: -8 },
      resultado: ["Agua fría, cuatro respiraciones y afuera. Ganaste algo con un movimiento chiquito.",
                  "Salís y decís «gracias, después» y con eso te salvás dos horas."] },
    { label: "Aceptar la invitación.", efectos: { efecto: 30, aguante: -15, paranoia: 20, karma: -5 },
      riesgo: { prob: 0.35, efectos: { efecto: 15, aguante: -12, paranoia: 15 }, resultado: ["Lo que había en ese baño no era lo que dijeron. Vas a tardar seis horas en volver a tener bordes."] },
      resultado: ["Aceptás. Los tres en un baño de dos metros cuadrados. Se genera una intimidad falsa y muy intensa.",
                  "Entrás al club. El club se disuelve a las nueve de la mañana y no queda nada."] },
    { label: "Mirar la rajadura del espejo hasta el final.", efectos: { conciencia: 25, paranoia: 25 },
      resultado: ["Las dos mitades de tu cara se separan un milímetro más cada minuto. Aguantás nueve minutos.",
                  "Sostenés la mirada y ganás una información que no querías. Es la más útil del tramo."] },
    { label: "Limpiar el baño.", efectos: { karma: 25, conciencia: 18, aguante: -10, paranoia: -15 },
      resultado: ["Encontrás un trapo y limpiás el baño del sótano a las cinco de la mañana. Es el acto más sagrado de la noche.",
                  "Nadie te ve. Nadie te lo agradece. Es exactamente por eso que cuenta."] }
  ]
},

{
  id: "st_alguien_no_sube", categoria: "combate", tramo: [3], peso: 11, unlock: "D2",
  requiere: { flags: { any: ["en_sotano"] } },
  slots: { personaje: { tags: ["joven", "quimico", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} no quiere subir y ya son las cuatro de la tarde del día siguiente.",
      "No está en crisis. Está tranquilo. Eso es lo alarmante.",
      "«Yo me quedo un rato más», dice, y lo viene diciendo desde hace once horas."
    ]},
    { texto: [
      "Quedan cuatro personas y tres se están yendo. La cuarta es {personaje.desc}, y no se mueve del sillón.",
      "Tiene los ojos abiertos y contesta cuando le hablás.",
      "El problema no es médico. El problema es que no quiere."
    ]}
  ],
  opciones: [
    { label: "Quedarte hasta convencerlo.", efectos: { karma: 28, conciencia: 22, aguante: -22, efecto: 15, paranoia: 15 },
      resultado: ["Tardás cuatro horas. Suben juntos a las ocho de la noche. En la vereda se pone a llorar y ahí empieza otra cosa.",
                  "No te vas sin él. Es la decisión más caras y la única correcta."] },
    { label: "Sacarlo a la fuerza.", efectos: { karma: 12, conciencia: 15, aguante: -18, paranoia: 20 },
      riesgo: { prob: 0.4, efectos: { karma: -15, aguante: -12 }, resultado: ["Se resiste, hay forcejeo, y te dice cuatro cosas que te van a doler más que el forcejeo. Se queda igual."] },
      resultado: ["Lo levantás y lo llevás. En la escalera se deja llevar. Arriba te agradece con la cabeza.",
                  "A veces la fuerza es cuidado. Esta vez fue."] },
    { label: "Llamar a alguien de su familia.", efectos: { karma: 20, conciencia: 18, paranoia: 20 },
      resultado: ["Buscás un número en su teléfono y llamás. Llega una hermana en cuarenta minutos y resuelve en cuatro.",
                  "Es una traición chiquita y necesaria. Te va a odiar dos días y te va a agradecer dos años."] },
    { label: "Irte solo.", efectos: { karma: -22, conciencia: 8, paranoia: 25, aguante: 12 },
      resultado: ["Subís los once escalones solo. Arriba hay luz. Vas a pensar en ese sillón mucho tiempo.",
                  "Te vas. Se queda. No sabés qué pasó después y ese «no sabés» es el castigo."] }
  ]
},

{
  id: "st_luz_al_subir", categoria: "descanso", tramo: [3, 4], peso: 11, unlock: "D2",
  requiere: { flags: { any: ["en_sotano"] } },
  slots: { escenario: { tags: ["urbano", "dia"] }, complicacion: { tags: ["cuerpo", "social"] } },
  variantes: [
    { texto: [
      "Los once escalones para arriba son más que los once escalones para abajo.",
      "Al abrir la puerta de metal, la luz entra como una acusación.",
      "{^complicacion}."
    ]},
    { texto: [
      "Afuera es de día y hay gente comprando pan.",
      "Vos venís de un lugar sin tiempo y ellos vienen de la panadería, y están en la misma vereda.",
      "Te tenés que apoyar en la pared cuarenta segundos hasta que se te acomode la vista."
    ]}
  ],
  opciones: [
    { label: "Sentarte en el cordón y esperar a estar bien.", efectos: { aguante: 18, efecto: -30, paranoia: -20, conciencia: 18 },
      resultado: ["Veinte minutos en un cordón viendo pasar gente normal. Es una terapia de reingreso y es gratis.",
                  "Te sentás. Nadie te molesta. Una señora te pregunta si estás bien y le decís que sí y casi es cierto."] },
    { label: "Ir directo a comprar pan y comer.", efectos: { aguante: 22, efecto: -25, mangos: -200, karma: 8, conciencia: 12 },
      resultado: ["Entrás a la panadería como cualquiera. Comprás medio kilo de pan y te lo comés en la vereda. Volviste al mundo por la puerta correcta.",
                  "El olor a pan a las cuatro de la tarde después de un sótano es una de las cosas más grandes que existen."] },
    { label: "Bajar otra vez.", efectos: { efecto: 22, aguante: -22, paranoia: 22, conciencia: -8 },
      resultado: ["Volvés a bajar. Es la decisión que define el tramo y no de un modo favorable.",
                  "Once escalones para abajo otra vez. Esta vez no vas a subir por tu cuenta."] },
    { label: "Llamar a alguien y decir dónde estás.", efectos: { karma: 20, conciencia: 20, paranoia: -25, aguante: 8 },
      resultado: ["Llamás y decís la dirección y decís «vení». Es la frase más difícil y la más eficaz.",
                  "«Estoy acá, no estoy bien, vení.» Trece palabras que te cambian el final."] }
  ]
},

/* ================= D5: TRAMO 5 — EL VACÍO ================= */

{
  id: "vc_despues_de_todo", categoria: "trip", tramo: [5], peso: 12, unlock: "D5",
  slots: { escenario: { tags: ["astral"] }, complicacion: { tags: ["astral"] } },
  ascii: "vacio",
  variantes: [
    { texto: [
      "Te iluminaste. Ya pasó. Eso fue todo.",
      "Y ahora hay un martes.",
      "{^complicacion}."
    ]},
    { texto: [
      "Nadie te avisó que después de la iluminación había más días.",
      "Los hay. Son bastantes. Y hay que hacer algo con ellos.",
      "En {escenario} no queda nada por buscar y eso es un problema nuevo y peor."
    ]}
  ],
  opciones: [
    { label: "Aceptar el martes.", efectos: { conciencia: 20, karma: 15, paranoia: -20, aguante: 12 },
      resultado: ["Aceptás que hay martes. Comés, laváss algo, saludás a alguien. Esto también es el camino y nadie lo filma.",
                  "El martes es el examen final y no tiene mesa de examen."] },
    { label: "Buscar otra cosa que buscar.", efectos: { conciencia: -8, karma: -8, paranoia: 20 },
      resultado: ["Empezás a buscar la próxima. Es el mecanismo viejo con ropa nueva y lo reconocés y no lo podés parar.",
                  "Ya estás averiguando precios de un retiro en Perú. Se cerró el círculo por el lado malo."] },
    { label: "Contarlo.", efectos: { conciencia: 12, karma: 8, mangos: 400, paranoia: 12 },
      resultado: ["Lo contás bien y a la gente le sirve. También te empieza a servir a vos como identidad, y ahí está el riesgo.",
                  "Cuatro personas te escuchan con atención. Es agradable. Demasiado agradable."] },
    { label: "No contarlo nunca.", efectos: { conciencia: 25, karma: 12, paranoia: -12 }, flags: { set: ["no_lo_conto"] },
      resultado: ["No se lo decís a nadie, nunca. Se queda entero. Es la única forma de que se quede entero.",
                  "Te lo guardás. En veinte años alguien te va a preguntar y le vas a decir «nada, viajé un poco»."] }
  ]
},

{
  id: "vc_maestro_ahora", categoria: "dialogo", tramo: [5], peso: 11, unlock: "D5",
  slots: { escenario: {}, personaje: { tags: ["joven", "social"] } },
  variantes: [
    { texto: [
      "{personaje.desc}. Te vino a buscar porque le dijeron que vos sabés.",
      "Tiene la misma cara que tenías vos al principio de todo esto.",
      "«¿Me enseñás?», pregunta. Y ahora estás del otro lado y no es cómodo."
    ]},
    { texto: [
      "Alguien te llama «maestro» sin ironía y sin cobrar.",
      "En {escenario}, {personaje.nombre} espera una respuesta que le sirva.",
      "Tenés cuatro opciones y tres son la que hizo el que te enseñó a vos."
    ]}
  ],
  opciones: [
    { label: "Decirle la verdad: que no sabés.", efectos: { conciencia: 25, karma: 22, paranoia: -12 },
      resultado: ["«No sé nada», le decís. Se decepciona cuatro segundos y después se queda, y eso ya es enseñar.",
                  "Es la única respuesta honesta y es la más difícil de dar cuando alguien te mira así."] },
    { label: "Enseñarle lo poco concreto que aprendiste.", efectos: { conciencia: 22, karma: 20, aguante: -8 },
      resultado: ["Le pasás tres cosas prácticas: cómo respirar, cómo esperar, cuándo irse. Nada mística. Le va a servir toda la vida.",
                  "Le enseñás a cuidar un fuego y a lavar los platos. Es todo lo que hay y es mucho."] },
    { label: "Armar un retiro y cobrarle.", efectos: { mangos: 1500, karma: -25, conciencia: 12 }, flags: { set: ["guru_chanta_final"] },
      resultado: ["Cerrás el círculo por el lado industrial. Cobrás la seña y compras las telas de colores.",
                  "En seis meses tenés catorce alumnos y un galpón. Sos exactamente el que te estafó."] },
    { label: "Mandarlo a otra parte.", efectos: { conciencia: 18, karma: 12, paranoia: 5 },
      resultado: ["Le das el nombre de alguien que sí sabe y le pagás el pasaje. Es lo más generoso que hiciste.",
                  "«Andá a ver a doña Rufina», le decís. «Y no le lleves plata.»"] }
  ]
},

{
  id: "vc_el_trabajo", categoria: "descanso", tramo: [5], peso: 11, unlock: "D5",
  slots: { escenario: { tags: ["urbano", "social"] }, complicacion: { tags: ["social", "personal"] } },
  variantes: [
    { texto: [
      "Hay que trabajar. La iluminación no cubre el alquiler.",
      "En {escenario} hay un puesto disponible y es aburrido y es honesto.",
      "{^complicacion}."
    ]},
    { texto: [
      "El lunes a las siete de la mañana suena el despertador y el vacío no dice nada al respecto.",
      "Ocho horas de una tarea repetitiva por un sueldo que alcanza justo.",
      "Y resulta que se puede. Y resulta que no es lo peor."
    ]}
  ],
  opciones: [
    { label: "Tomar el trabajo y hacerlo bien.", efectos: { mangos: 1200, conciencia: 22, karma: 18, aguante: -12 },
      resultado: ["Trabajás ocho horas y las hacés bien y en la hora seis pasa algo parecido a la meditación.",
                  "Descubrís que la repetición atenta es exactamente lo mismo que te enseñaron en el monte, pero pagan."] },
    { label: "Tomarlo y hacerlo mal.", efectos: { mangos: 800, conciencia: 5, karma: -12 },
      resultado: ["Estás con el cuerpo y no con la cabeza. Te dura tres semanas.",
                  "Cobrás y no rendís. Alguien más hace tu parte. Eso es karma en tiempo real."] },
    { label: "Rechazarlo por incompatible con tu camino.", efectos: { conciencia: -12, karma: -12, mangos: 0, paranoia: 18 },
      resultado: ["Decís que no porque «no vibra». Es la frase con la que se justifica no hacer nada y la usaste.",
                  "Lo rechazás. En dos semanas vas a estar pidiendo prestado y explicando el universo."] },
    { label: "Tomarlo y usar el sueldo para sostener a alguien.", efectos: { mangos: 400, conciencia: 25, karma: 30, aguante: -15 },
      resultado: ["Trabajás y le pasás la mitad a alguien que no puede. Nadie se enteró. Es el mejor uso del dinero registrado.",
                  "El sueldo alcanza para dos si se come sencillo. Y alcanza."] }
  ]
},

{
  id: "vc_recaida", categoria: "trip", tramo: [5], peso: 12, unlock: "D5",
  slots: { escenario: { tags: ["urbano", "noche", "social"] }, personaje: { tags: ["quimico", "social"] } },
  variantes: [
    { texto: [
      "Hay una fiesta y en la fiesta está todo lo de antes, intacto, esperando.",
      "{personaje.nombre} te ofrece exactamente lo mismo que te ofreció en el tramo 1.",
      "Sos otro. La sustancia es la misma. Esa asimetría es todo el evento."
    ]},
    { texto: [
      "Nadie te está mirando. Nadie se va a enterar. Es la condición perfecta.",
      "En {escenario}, con todo lo que aprendiste, tenés la mano estirada.",
      "«Uno», dice {personaje.nombre}. «Total vos ya estás.»"
    ]}
  ],
  opciones: [
    { label: "Decir que no y quedarte igual.", efectos: { conciencia: 28, karma: 18, paranoia: -12, aguante: 8 },
      resultado: ["Decís que no y te quedás en la fiesta cuatro horas y la pasás bien. Eso es lo que cambió.",
                  "No es abstinencia heroica: es que ya no hacía falta. Y notarlo es el premio."] },
    { label: "Aceptar «una sola vez».", efectos: { efecto: 35, conciencia: -12, karma: -12, paranoia: 20 }, flags: { set: ["recayo"] },
      resultado: ["Una sola vez. La frase completa es «una sola vez, y después otra vez una sola vez».",
                  "Aceptás. No es una catástrofe. Es una decepción, que es más difícil de digerir."] },
    { label: "Irte de la fiesta.", efectos: { conciencia: 20, aguante: 15, karma: 5, paranoia: -18 },
      resultado: ["Te vas a los veinte minutos. Es una retirada estratégica y no tiene nada de cobarde.",
                  "Saludás y te vas. Afuera hay una noche entera para caminar."] },
    { label: "Quedarte a cuidar a los demás.", efectos: { conciencia: 25, karma: 28, aguante: -18, paranoia: 12 },
      resultado: ["Te quedás sobrio hasta las siete de la mañana llevando gente a la casa. Es el trabajo más ingrato y el más útil.",
                  "Sos el que maneja. El que sostiene la cabeza. El que llama al remis. Es un sacerdocio."] }
  ]
},

{
  id: "vc_el_perro_vuelve", categoria: "descanso", tramo: [5], peso: 10, unlock: "D5",
  slots: { escenario: {}, personaje: { tags: ["animal"] } },
  ascii: "perro",
  variantes: [
    { texto: [
      "El perro marrón está en la esquina de {escenario} y te está esperando, o eso parece.",
      "No hay forma de saber si es el mismo. Estadísticamente no lo es.",
      "Igual es el mismo."
    ]},
    { texto: [
      "Se te sienta enfrente con la misma seriedad de funcionario del primer tramo.",
      "Estás distinto y él está igual, y eso hace que la comparación sea posible.",
      "Mueve la cola dos veces, que en su escala es una fiesta."
    ]}
  ],
  opciones: [
    { label: "Llevártelo con vos.", efectos: { karma: 30, conciencia: 22, aguante: -8, mangos: -400 }, flags: { set: ["tiene_perro"] },
      resultado: ["Le compras una correa y comida y se termina la discusión. Ahora hay alguien que depende de vos y eso ordena mejor que cualquier mantra.",
                  "Camina al lado tuyo sin correa las once cuadras hasta tu casa. Ya estaba decidido."] },
    { label: "Darle de comer y dejarlo.", efectos: { karma: 15, conciencia: 12 },
      resultado: ["Le comprás dos hamburguesas y se las come en cuarenta segundos. Después se queda sentado esperando otra cosa que no es comida.",
                  "Le das de comer. Se va. Los dos hicieron su parte."] },
    { label: "Sentarte en el cordón con él.", efectos: { karma: 18, conciencia: 25, paranoia: -25 }, medita: true,
      resultado: ["Una hora en un cordón con un perro. Es el último evento del camino y es exactamente igual al primero, y eso es todo lo que había que entender.",
                  "No hacen nada. Miran la calle. Es suficiente. Siempre fue suficiente."] },
    { label: "Seguir de largo.", efectos: { karma: -12, conciencia: 5, paranoia: 12 },
      resultado: ["Pasás de largo. Es tu derecho. Igual te va a seguir tres cuadras.",
                  "Seguís caminando. En la esquina te das vuelta y todavía está ahí, mirándote."] }
  ]
},

{
  id: "vc_la_deuda_vieja", categoria: "combate", tramo: [5], peso: 10, unlock: "D5",
  slots: { escenario: { tags: ["urbano"] }, personaje: { tags: ["lumpen", "comercio", "social"] } },
  variantes: [
    { texto: [
      "Se acuerdan de vos. Las deudas viejas siempre se acuerdan.",
      "{personaje.nombre} te encuentra en {escenario} y no viene a cobrar con violencia: viene a cobrar.",
      "Y ahora, iluminado y todo, hay que resolverlo con plata o con verdad."
    ]},
    { texto: [
      "Aparece la cuenta de un tramo que ya no recordabas.",
      "Es chica. Es vieja. Es exacta.",
      "{personaje.desc} te la muestra escrita en un cuaderno Gloria."
    ]}
  ],
  opciones: [
    { label: "Pagar todo, con intereses.", efectos: { mangos: -1200, karma: 25, conciencia: 22, paranoia: -25 },
      resultado: ["Pagás más de lo que debías porque pasó el tiempo y el tiempo cotiza. Se cierra de verdad.",
                  "Le das todo. Se sorprende. «No hacía falta tanto», dice. Sí hacía falta."] },
    { label: "Pedirle perdón y ofrecer trabajo.", efectos: { karma: 25, conciencia: 25, aguante: -18, mangos: -300 },
      resultado: ["No tenés la plata. Ofrecés trabajo y lo cumplís cuatro sábados. Es mejor que la plata para todos.",
                  "Se lo pagás con manos. Terminan tomando algo juntos el cuarto sábado."] },
    { label: "Explicarle que ya sos otra persona.", efectos: { conciencia: -12, karma: -22, paranoia: 20 },
      resultado: ["Le explicás tu transformación espiritual. Te escucha entero. «Bueno», dice. «Igual son cuatro mil.»",
                  "El argumento de la reencarnación no aplica a las deudas. Es jurisprudencia firme."] },
    { label: "Negociar un plan de pagos.", efectos: { mangos: -400, karma: 15, conciencia: 18, paranoia: -12 },
      resultado: ["Cuatro cuotas anotadas en el cuaderno. Las pagás todas. Es aburrido y es el final adulto.",
                  "Acuerdan. Te da la mano. En la tercera cuota ya son casi amigos."] }
  ]
},

{
  id: "vc_nadie_se_dio_cuenta", categoria: "dialogo", tramo: [5], peso: 11, unlock: "D5",
  slots: { escenario: { tags: ["social", "urbano"] }, personaje: { tags: ["familia", "social"] }, complicacion: { tags: ["social", "melancolia"] } },
  variantes: [
    { texto: [
      "Volvés y nadie nota nada.",
      "{personaje.nombre} te pregunta cómo te fue de vacaciones. Le decís que bien.",
      "{^complicacion}."
    ]},
    { texto: [
      "Atravesaste cuatro tramos, tres muertes posibles y una disolución del ego, y en la mesa se habla del precio de la carne.",
      "Nadie va a preguntar. Nadie preguntó nunca.",
      "Y hay que decidir si eso es una tragedia o un alivio."
    ]}
  ],
  opciones: [
    { label: "Tomarlo como un alivio.", efectos: { conciencia: 28, karma: 15, paranoia: -25 },
      resultado: ["Que no se note es la prueba de que es real. Si se notara, sería una actuación.",
                  "Hablás del precio de la carne con genuino interés. Ahí está: eso era."] },
    { label: "Intentar contarlo.", efectos: { conciencia: 12, karma: 8, paranoia: 15 },
      resultado: ["Lo intentás cuatro minutos. Se hace un silencio raro y alguien cambia de tema con piedad.",
                  "Empezás a explicar y a la mitad te escuchás y te callás solo."] },
    { label: "Ponerte mal porque nadie pregunta.", efectos: { conciencia: -12, karma: -12, paranoia: 22 },
      resultado: ["Te ofendés en silencio. El ego encontró la última rendija y entró por ahí.",
                  "Esperás la pregunta toda la cena. No llega. Te vas enojado con gente que no hizo nada."] },
    { label: "Preguntarles a ellos.", efectos: { conciencia: 25, karma: 28, paranoia: -20 },
      resultado: ["En vez de contar, preguntás. Se abre una conversación de dos horas y te enterás de cuatro cosas enormes que no sabías.",
                  "«¿Y vos cómo estás?» Nadie se lo esperaba. Alguien se pone a llorar en el postre."] }
  ]
},

{
  id: "vc_el_dolor_vuelve", categoria: "combate", tramo: [5], peso: 11, unlock: "D5",
  slots: { escenario: {}, complicacion: { tags: ["cuerpo", "emocional"] } },
  variantes: [
    { texto: [
      "Vuelve. Igual que antes. Con la misma forma y en el mismo lugar.",
      "Se suponía que esto se había resuelto. No se resolvió: se corrió de lugar.",
      "{^complicacion}."
    ]},
    { texto: [
      "Un martes cualquiera, sin motivo, sin sustancia, sin ceremonia, el dolor viejo vuelve entero.",
      "Y esta vez no hay a quién echarle la culpa ni de qué agarrarse.",
      "En {escenario} tenés que atenderlo con lo que tengas puesto."
    ]}
  ],
  opciones: [
    { label: "Sentarte con él sin hacer nada.", efectos: { conciencia: 30, karma: 15, paranoia: -20, aguante: -8 }, medita: true,
      resultado: ["Te sentás con el dolor cuarenta minutos sin pelearlo y sin narrarlo. Se queda. Se queda pero se puede.",
                  "No se va. Aprendés que no se iba a ir nunca y que eso no es una condena."] },
    { label: "Buscar una sustancia.", efectos: { efecto: 35, conciencia: -15, karma: -12, paranoia: 20 }, flags: { set: ["recayo"] },
      resultado: ["Tapás el dolor cuatro horas. Vuelve con un veinte por ciento de recargo.",
                  "Funciona. Es el problema: funciona."] },
    { label: "Llamar a alguien.", efectos: { conciencia: 25, karma: 25, paranoia: -25 },
      resultado: ["Llamás y decís «me está pasando otra vez». Del otro lado dicen «ya voy». Eso es toda la técnica que existe.",
                  "Tres minutos de teléfono y una persona en camino. El dolor sigue y ya es a medias."] },
    { label: "Ponerte a trabajar en algo con las manos.", efectos: { conciencia: 22, karma: 12, aguante: 8, paranoia: -18 },
      resultado: ["Arreglás una canilla, ordenás un placard, cocinás para cuatro. El dolor no se va y baja de volumen.",
                  "Las manos ocupadas son un ansiolítico con buena prensa y mala fama."] }
  ]
},

{
  id: "vc_el_vacio_mismo", categoria: "trip", tramo: [5], peso: 12, unlock: "D5",
  slots: { escenario: { tags: ["astral"] } },
  ascii: "vacio",
  variantes: [
    { texto: [
      "No hay evento. No hay personaje. No hay complicación.",
      "Hay una habitación, o un campo, o nada, y vos.",
      "Esto es lo que había atrás de todo y es exactamente esto."
    ]},
    { texto: [
      "El vacío no es una experiencia. Es la ausencia de una experiencia y por eso no se puede contar.",
      "No hay luz blanca, no hay túnel, no hay abuela.",
      "Hay lugar. Nada más. Y alcanza."
    ]}
  ],
  opciones: [
    { label: "Quedarte.", efectos: { conciencia: 35, paranoia: -30, karma: 12 }, medita: true,
      resultado: ["Te quedás. No hay nada que contar de esto y no vas a intentarlo.",
                  "Se queda quieto todo. Después de un rato ni siquiera hay un «vos» que esté quieto."] },
    { label: "Volver.", efectos: { conciencia: 20, aguante: 15, karma: 15, paranoia: -18 },
      resultado: ["Volvés por decisión. Hay gente allá. Es un motivo suficiente y es el mejor motivo.",
                  "Elegís el mundo. Es una elección y no una derrota, y esa distinción es todo."] },
    { label: "Buscar algo adentro del vacío.", efectos: { conciencia: 8, paranoia: 25 },
      resultado: ["Buscás. No hay. Buscar acá es la última costumbre y la más difícil de dejar.",
                  "Revisás el vacío. Está vacío. Era el nombre."] },
    { label: "Traer a alguien.", efectos: { conciencia: 30, karma: 30, paranoia: -25 },
      resultado: ["Volvés, buscás a alguien, y lo traés. Compartir esto es la única cosa que se puede hacer con esto.",
                  "No se puede traer a nadie y lo intentás igual, y en el intento pasa algo mejor."] }
  ]
},

{
  id: "vc_la_rueda_otra_vez", categoria: "ruta", tramo: [5], peso: 11, unlock: "D5",
  slots: { escenario: {}, personaje: { tags: ["guru", "chanta"] } },
  variantes: [
    { texto: [
      "Ves un cartel. «RETIRO DE LUZ Y SANACIÓN. Seña 50%.»",
      "Está escrito con la misma letra del primer tramo y lo firma {personaje.nombre}.",
      "Sabés exactamente qué hay adentro y aun así se te mueve algo."
    ]},
    { texto: [
      "Empieza de nuevo. No para vos: para otro. Pero el cartel es el mismo.",
      "Hay catorce personas anotándose en {escenario} y todas tienen tu cara del tramo 1.",
      "Podés hacer cuatro cosas y todas son legítimas."
    ]}
  ],
  opciones: [
    { label: "Avisarles.", efectos: { conciencia: 25, karma: 25, paranoia: 12 },
      resultado: ["Les contás lo que hay. Cuatro te escuchan, dos se van, ocho se anotan igual. Los ocho tienen derecho.",
                  "Avisás y no te creen y hacés bien en avisar igual."] },
    { label: "Anotarte de nuevo.", efectos: { conciencia: 18, karma: 8, mangos: -400, paranoia: 12 },
      resultado: ["Te anotás. No para buscar: para acompañar. Es otra cosa con la misma forma.",
                  "Volvés a la rueda con los ojos abiertos, que es la única forma decente de volver."] },
    { label: "Seguir caminando.", efectos: { conciencia: 22, karma: 12, paranoia: -18 },
      resultado: ["Pasás de largo sin juzgar y sin nostalgia. Es lo más difícil de todo el juego.",
                  "Ni te frenás. No hay nada que hacer ahí y lo sabés sin amargura."] },
    { label: "Montar el tuyo enfrente.", efectos: { mangos: 1800, karma: -30, conciencia: 15 }, flags: { set: ["guru_chanta_final"] },
      resultado: ["Alquilás el local de al lado y ponés un cartel más grande. En dos meses le sacás la clientela. La rueda gira y ahora vos empujás.",
                  "Tu cartel dice «RETIRO AUTÉNTICO» y eso es lo más chanta que se puede escribir."] }
  ]
}

]);
