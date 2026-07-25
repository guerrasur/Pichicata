/* PICHICATA — pack A8: La Comisaría. 11 eventos. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "pl_sala_4", categoria: "combate", tramo: [2, 3], peso: 10, unlock: "A8",
  slots: { personaje: { tags: ["lumpen", "social", "turbio"] }, complicacion: { tags: ["social", "vigilancia"] }, escenario: {} },
  ascii: "cana2",
  variantes: [
    { texto: [
      "Te levantaron en {escenario} y de ahí a la sala 4, que es un banco de material y un tubo fluorescente.",
      "{personaje.desc}: {personaje.nombre} está sentado al lado tuyo y lleva más horas que vos.",
      "{^complicacion}."
    ]},
    { texto: [
      "La sala de espera de la comisaría tiene un banco de material, un tubo fluorescente y una ventana con reja que da a un patio interno.",
      "{personaje.nombre} está sentado al lado tuyo desde hace dos horas y ya se contaron la vida.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Sentate ahí y esperá» es todo lo que te dijeron y eso fue a las cuatro y veinte de la mañana.",
      "Son las siete. Nadie te informó de qué te acusan, si te acusan de algo.",
      "{personaje.desc}. Sabe cómo funciona esto y te lo explica en voz baja."
    ]}
  ],
  opciones: [
    { label: "Esperar en silencio sin firmar nada.", efectos: { conciencia: 18, paranoia: 12, aguante: -12 },
      resultado: ["Cuatro horas de banco. No firmás nada. A las once te dejan ir sin explicación, que es la forma en que termina el ochenta por ciento de estas historias.",
                  "Aguantás y no firmás. {^personaje.nombre} te dijo que no firmes y {personaje.nombre} tenía razón."] },
    { label: "Firmar lo que te pongan para salir rápido.", efectos: { paranoia: -12, karma: -8, conciencia: 5 }, flags: { set: ["firmo_acta"] },
      resultado: ["Firmás sin leer y salís en cuarenta minutos. Vas a recibir una carta en cuatro meses y va a ser un problema.",
                  "Salís rápido. La velocidad tuvo un precio y todavía no llegó la factura."] },
    { label: "Pedir un llamado.", efectos: { conciencia: 12, karma: 8, paranoia: -10 },
      riesgo: { prob: 0.4, efectos: { paranoia: 18 }, resultado: ["«Después», te dicen. Y el «después» dura tres horas más."] },
      resultado: ["Te dejan llamar. Del otro lado alguien atiende y empieza a moverse. Eso cambia todo.",
                  "Llamás y no atiende nadie, y esa es la información más dura de la noche."] },
    { label: "Ayudar a {personaje.nombre} con su trámite.", efectos: { karma: 20, conciencia: 15, paranoia: -8 },
      resultado: ["Le explicás qué tiene que pedir y cómo. Sale antes que vos y te deja un número de teléfono en un papel.",
                  "Le llenás el formulario porque no lee bien. Es la mejor cosa que va a pasar en esa sala hoy."] }
  ]
},

{
  id: "pl_requisa_bolso", categoria: "combate", tramo: [1, 2, 3], peso: 10, unlock: "A8",
  slots: { escenario: { tags: ["urbano", "transito", "conurbano"] }, complicacion: { tags: ["policial", "vigilancia"] } },
  ascii: "policia",
  variantes: [
    { texto: [
      "«Abrí el bolso.» En {escenario}, sin motivo declarado, a la vista de todos.",
      "En el bolso hay ropa, {objeto}, y una cosa que preferirías que no estuviera.",
      "{^complicacion}."
    ]},
    { texto: [
      "Te apartan de la fila. Sos vos y nadie más de los cuarenta que estaban esperando.",
      "El criterio de selección es evidente para todos y no se menciona.",
      "«Es rutina», dicen. Nunca es rutina cuando es rutina."
    ]}
  ],
  opciones: [
    { label: "Abrir y colaborar en todo.", efectos: { paranoia: 15, conciencia: 8 },
      riesgo: { prob: 0.45, efectos: { mangos: -400, aguante: -12, paranoia: 20 }, resultado: ["Encuentran lo que había. A partir de ahí es un procedimiento y los procedimientos son largos y caros."] },
      resultado: ["Abrís todo, das explicaciones simples, y en cuatro minutos estás caminando de nuevo.",
                  "Revisan y no encuentran nada interesante. Te devuelven el bolso sin cerrarlo, que es su forma de saludar."] },
    { label: "Pedir que quede constancia y que haya testigos.", efectos: { conciencia: 18, karma: 10, paranoia: 12 },
      resultado: ["Pedís nombre, placa y testigo. Cambia el clima entero. Se apuran y se van.",
                  "Dos personas de la fila se acercan a mirar. Eso alcanza. La requisa termina en un minuto."] },
    { label: "Negarte.", efectos: { paranoia: 25, karma: 5, conciencia: 12 },
      riesgo: { prob: 0.6, efectos: { aguante: -18, paranoia: 20 }, resultado: ["La negativa se resuelve por otras vías. Terminás en el móvil y el bolso lo abren igual."] },
      resultado: ["Te negás con calma y con derecho. No insisten, porque no querían el trabajo.",
                  "«Sin orden no», decís. Se miran. Te dejan ir. Pasa una vez cada diez."] },
    { label: "Deshacerte de lo que tenés antes de que abran.", tirada: { stat: "efecto", dificultad: 60, invertido: true },
      exito: { efectos: { paranoia: 15, conciencia: 10 }, resultado: ["Lo tirás abajo de un auto con un movimiento de la muñeca. Nadie lo vio. Abren el bolso y está limpio."] },
      fallo: { efectos: { mangos: -500, aguante: -15, paranoia: 30 }, resultado: ["Con el Efecto que tenés, el movimiento sale torpe y evidente. Fue peor que no haber hecho nada."] },
      resultado: [] }
  ]
},

{
  id: "pl_coima_negociada", categoria: "comercio", tramo: [1, 2, 3], peso: 9, unlock: "A8",
  slots: { escenario: { tags: ["urbano", "conurbano", "noche"] }, complicacion: { tags: ["policial"] } },
  variantes: [
    { texto: [
      "No dicen la palabra. Nadie dice nunca la palabra.",
      "Se dice: «esto se puede arreglar», y después hay un silencio con una expectativa muy clara.",
      "{^complicacion}."
    ]},
    { texto: [
      "El monto se comunica por gestos y por aproximaciones: «con dos mil lo dejamos así».",
      "En {escenario} no hay cámaras y las dos partes lo verificaron antes de empezar.",
      "El tiempo corre en contra de los dos, lo cual es la única ventaja que tenés."
    ]}
  ],
  opciones: [
    { label: "Pagar rápido y sin discutir.", requiere: { stats: { mangos: { min: 500 } } }, requisitoTexto: "$500",
      efectos: { mangos: -500, karma: -10, paranoia: -18 },
      resultado: ["Pagás. Termina en noventa segundos. Es un impuesto y lo pagaste.",
                  "Ni cuentan el dinero. Eso significa que fue suficiente y un poco más."] },
    { label: "Negociar el monto.", tirada: { stat: "karma", dificultad: -10 },
      exito: { efectos: { mangos: -250, karma: -8, paranoia: -8, conciencia: 8 }, resultado: ["Lo bajás a la mitad hablando tranquilo y sin faltar el respeto. Es un arte y lo tenés."] },
      fallo: { efectos: { mangos: -700, paranoia: 20, aguante: -8 }, resultado: ["Negociar salió más caro que pagar. Aprendiste algo sobre el mercado."] },
      resultado: [] },
    { label: "Decir que no tenés nada.", efectos: { paranoia: 20, conciencia: 10 },
      riesgo: { prob: 0.5, efectos: { aguante: -15, paranoia: 20 }, resultado: ["Verifican que no tenés nada revisándote de una manera que no vas a querer describir."] },
      resultado: ["Les mostrás los bolsillos vacíos. Se aburren y te dejan ir. La pobreza a veces es un escudo.",
                  "«No tengo», decís, y es verdad, y la verdad se nota. Te dejan ir."] },
    { label: "Grabar todo con el celular en el bolsillo.", efectos: { conciencia: 20, karma: 10, paranoia: 22 }, flags: { set: ["tiene_grabacion"] },
      riesgo: { prob: 0.4, efectos: { mangos: -600, aguante: -18, paranoia: 25 }, resultado: ["Ven el celular. Lo que sigue incluye la desaparición del archivo y otras cosas."] },
      resultado: ["Grabás cuatro minutos de audio impecable. No vas a hacer nada con eso y lo vas a guardar igual.",
                  "El audio queda. Es una carta que no vas a jugar nunca y te da una calma rara tenerla."] }
  ]
},

{
  id: "pl_abogado_gratis", categoria: "dialogo", tramo: [3], peso: 9, unlock: "A8",
  slots: { personaje: { tags: ["social", "esceptico", "turbio"] }, personaje2: { tags: ["guru", "chanta", "cuidadora", "lumpen"] }, complicacion: { tags: ["social", "personal"] } },
  variantes: [
    { texto: [
      "«Me manda {personaje2.nombre}», dice el abogado que no pediste, y con eso se explica todo y nada.",
      "{personaje.desc}. Abre una carpeta que ya tiene papeles con tu nombre.",
      "{^complicacion}."
    ]},
    { texto: [
      "Aparece un abogado que no pediste y que dice que lo mandó «un amigo tuyo».",
      "{personaje.desc}. Tiene una carpeta con tu nombre escrito en fibrón.",
      "«Yo te saco en dos horas», dice. «Después hablamos de lo otro.»"
    ]},
    { texto: [
      "«¿Vos tenés abogado?» «No.» «Ahora sí.»",
      "{personaje.nombre} se sienta enfrente y abre una carpeta que ya tiene papeles.",
      "En ningún momento aclara quién le paga."
    ]}
  ],
  opciones: [
    { label: "Aceptar y no preguntar nada.", efectos: { paranoia: -20, conciencia: 8, karma: -8 }, flags: { set: ["debe_favor"] },
      resultado: ["Te saca en una hora cuarenta. Ahora le debés algo a alguien que no conocés, que es una forma moderna del karma.",
                  "Funciona. Salís. En dos tramos alguien va a mencionar «el favorcito»."] },
    { label: "Preguntar quién lo manda.", efectos: { conciencia: 18, paranoia: 12 },
      resultado: ["Te lo dice. Es alguien del retiro y la razón es más generosa y más turbia de lo que imaginabas.",
                  "«Un amigo», repite. Insistís. «Un amigo», repite. Fin."] },
    { label: "Rechazarlo y pedir defensor oficial.", efectos: { conciencia: 15, karma: 12, paranoia: 15, aguante: -12 },
      resultado: ["El defensor oficial llega a las seis horas, está agotado, y es excelente. Salís limpio y sin deber nada.",
                  "Tardás el triple y salís sin hipoteca moral. Fue la decisión correcta y fue larga."] },
    { label: "Contratarlo pagando vos.", requiere: { stats: { mangos: { min: 1200 } } }, requisitoTexto: "$1200",
      efectos: { mangos: -1200, paranoia: -20, conciencia: 10, karma: 5 },
      resultado: ["Pagás vos y con eso te sacás la deuda de encima antes de que exista. Es caro y es limpio.",
                  "«Prefiero pagarte yo», decís. Levanta las cejas. «Está bien», dice. Y te respeta más."] }
  ]
},

{
  id: "pl_comisario_espiritual", categoria: "dialogo", tramo: [2, 3], peso: 9, unlock: "A8",
  slots: { personaje: { tags: ["turbio", "veterano"] }, complicacion: { tags: ["social", "absurdo"] }, personaje2: { tags: ["guru", "chanta", "autentico"] } },
  variantes: [
    { texto: [
      "«¿Vos conocés a {personaje2.nombre}?», te pregunta el comisario, y no es una pregunta de la causa.",
      "{personaje.desc}. Cierra la puerta de la oficina y se sienta en el borde del escritorio.",
      "«Yo hace años que quiero ir a uno de esos. ¿Es como dicen?»"
    ]},
    { texto: [
      "El comisario te hace pasar a su oficina y no es para tomarte declaración.",
      "Tiene una biblioteca con cuatro libros de autoayuda y un cuarzo sobre el escritorio.",
      "«A mí me interesa el tema», dice. «¿Vos hiciste ayahuasca?»"
    ]},
    { texto: [
      "{personaje.desc}. Cierra la puerta y baja la voz.",
      "«Yo no le digo esto a nadie», arranca, y te cuenta un sueño que tuvo hace once años.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Escucharlo en serio y contestarle bien.", efectos: { conciencia: 20, karma: 12, paranoia: -20 },
      resultado: ["Hablan cuarenta minutos de cosas reales. Te deja ir y te da la mano. La ambigüedad de este momento te va a acompañar.",
                  "Le contestás con lo mejor que tenés. Se emociona. Te firma la salida sin cargos."] },
    { label: "Aprovechar y venderle un servicio.", efectos: { mangos: 800, karma: -18, conciencia: 10, paranoia: -12 },
      resultado: ["Le vendés cuatro sesiones. Paga por adelantado. Es el cliente más incómodo de tu carrera espiritual.",
                  "Cerrás una venta en una comisaría. Salís libre y con plata y con un problema para el futuro."] },
    { label: "Decirle que lo que hace de día no cierra con lo que busca de noche.", efectos: { conciencia: 22, karma: 15, paranoia: 20 },
      riesgo: { prob: 0.45, efectos: { aguante: -15, paranoia: 25 }, resultado: ["Se le va la cara. La conversación se termina y la noche se hace mucho más larga."] },
      resultado: ["Se queda callado un rato largo. «Ya sé», dice. Y te firma la salida. Ganaste algo y no sabés qué.",
                  "Se lo decís sin agresión. Asiente despacio. «Es complicado», dice. Es la conversación más honesta del tramo."] },
    { label: "Fingir ser un maestro para zafar.", efectos: { conciencia: -5, karma: -15, paranoia: 15 },
      resultado: ["Improvisás un linaje y dos maestros inventados. Se lo come entero. Salís libre y sucio.",
                  "Te sale tan bien que te ofrece un lugar en un curso. Ahora estás en un compromiso."] }
  ]
},

{
  id: "pl_denuncia_retiro", categoria: "ruta", tramo: [2, 3], peso: 9, unlock: "A8",
  slots: { personaje: { tags: ["guru", "chanta"] }, personaje2: { tags: ["social", "joven"] } },
  variantes: [
    { texto: [
      "Hay una denuncia contra el retiro y no la hizo un vecino: la hizo alguien de adentro.",
      "{personaje2.nombre} fue y contó todo, y contó bien, y contó cosas que vos también viste.",
      "Ahora te llaman a declarar y {personaje.nombre} te está mirando desde el pasillo."
    ]},
    { texto: [
      "Te citan como testigo. No como imputado. Todavía.",
      "Lo que digas va a definir si {personaje.nombre} sigue haciendo esto o no.",
      "Y también va a definir otras cosas más chicas y más tuyas."
    ]}
  ],
  opciones: [
    { label: "Declarar todo lo que viste.", efectos: { conciencia: 22, karma: 15, paranoia: 20 }, flags: { set: ["declaro_contra"] },
      resultado: ["Declarás cuatro horas con detalle. Se cierra el retiro. {^personaje.nombre} no te va a perdonar y no te importa.",
                  "Contás todo, incluso las partes que te dejan mal a vos. El acta es demoledora."] },
    { label: "Declarar solo lo estrictamente necesario.", efectos: { conciencia: 12, karma: 5, paranoia: 12 },
      resultado: ["Contestás lo que preguntan y nada más. Es legalmente correcto y moralmente tibio.",
                  "Cuatro respuestas de sí y no. Sales rápido y con un peso en el bolsillo interno."] },
    { label: "Encubrirlo.", efectos: { conciencia: 5, karma: -22, paranoia: 22, mangos: 600 }, flags: { set: ["encubrio"] },
      resultado: ["Mentís bajo declaración. {^personaje.nombre} te lo agradece con plata en la puerta de la comisaría, lo cual convierte todo en algo peor.",
                  "Lo cubrís. En dos meses va a haber otra denuncia y esta vez con una internación."] },
    { label: "Acompañar a {personaje2.nombre} y no declarar contra nadie.", efectos: { karma: 20, conciencia: 18, paranoia: 8 },
      resultado: ["Vas con él, te quedás afuera esperándolo cuatro horas, y lo llevás a comer después. No declarás nada. Es suficiente.",
                  "Elegís estar al lado del que se animó. No hace falta hablar para tomar partido."] }
  ]
},

{
  id: "pl_festival_razzia", categoria: "combate", tramo: [2, 3], peso: 10, unlock: "A8",
  slots: { escenario: { tags: ["publico", "naturaleza", "urbano"] }, personaje: { tags: ["joven", "quimico", "social"] } },
  variantes: [
    { texto: [
      "Cortan la música y prenden las luces del predio de golpe, que es la señal universal.",
      "Cuatro mil personas y una salida. La aritmética es hostil.",
      "{personaje.nombre} te agarra del brazo y dice «por acá»."
    ]},
    { texto: [
      "El operativo entra por el sector de los baños químicos y avanza en línea.",
      "En {escenario} la gente se distribuye siguiendo una lógica de fluidos.",
      "Tenés diez segundos para decidir y estás con Efecto encima."
    ]}
  ],
  opciones: [
    { label: "Seguir a {personaje.nombre}.", tirada: { stat: "aguante", dificultad: 45 },
      exito: { efectos: { aguante: -12, paranoia: 15, karma: 8, conciencia: 10 }, resultado: ["Conoce un hueco en el alambrado. Salen los dos. Afuera se ríen con esa risa de adrenalina que no es alegría."] },
      fallo: { efectos: { aguante: -22, paranoia: 25, mangos: -300 }, resultado: ["El hueco ya no existía. Los agarran a los dos y pasan cinco horas sentados en el piso de un galpón."] },
      resultado: [] },
    { label: "Quedarte quieto y hacerte el sobrio.", tirada: { stat: "efecto", dificultad: 45, invertido: true },
      exito: { efectos: { paranoia: 18, conciencia: 12 }, resultado: ["Te paras derecho, hablás lento, contestás corto. Pasan de largo. La actuación de tu vida."] },
      fallo: { efectos: { aguante: -15, paranoia: 28, mangos: -400 }, resultado: ["Con ese Efecto no había forma. Te miran las pupilas dos segundos y ya está."] },
      resultado: [] },
    { label: "Ir a buscar a los que están peor y sacarlos.", efectos: { karma: 25, conciencia: 20, aguante: -20, paranoia: 20 },
      resultado: ["Vas contra la corriente y sacás a dos que no podían caminar. Te podrían haber agarrado. No te agarraron.",
                  "Cargás a uno cuarenta metros. Es lo mejor que hiciste y no lo va a saber nadie que importe."] },
    { label: "Tirar todo lo que tengas y caminar tranquilo hacia la salida.", efectos: { paranoia: 12, conciencia: 15, efecto: -15 },
      resultado: ["Te deshacés de todo en cuatro segundos y caminás como un jubilado. Funciona perfecto.",
                  "Salís limpio, sin nada y sin problemas. La pérdida material fue la mejor inversión."] }
  ]
},

{
  id: "pl_multa_absurda", categoria: "comercio", tramo: [1, 2, 3], peso: 8, unlock: "A8",
  slots: { escenario: { tags: ["urbano", "publico", "conurbano"] }, complicacion: { tags: ["absurdo", "policial"] } },
  variantes: [
    { texto: [
      "Te labran un acta por una infracción que no sabías que existía.",
      "La lees tres veces. Dice algo sobre «alteración del orden en espacio público mediante actividad ritual no autorizada».",
      "{^complicacion}."
    ]},
    { texto: [
      "El monto de la multa es exactamente lo que te queda en el bolsillo, lo cual es una coincidencia notable.",
      "En {escenario}, con el acta en la mano, tenés que decidir qué clase de persona sos.",
      "El que la labró ya se fue."
    ]}
  ],
  opciones: [
    { label: "Pagarla.", requiere: { stats: { mangos: { min: 400 } } }, requisitoTexto: "$400",
      efectos: { mangos: -400, karma: 5, paranoia: -12, conciencia: 5 },
      resultado: ["Pagás en el banco al día siguiente con una cola de cuarenta minutos. La ciudadanía es esto.",
                  "Pagás. Es plata que no tenías y un problema que no vuelve."] },
    { label: "Apelarla.", efectos: { conciencia: 18, aguante: -12, paranoia: 8 },
      resultado: ["Escribís un descargo de dos carillas que es, honestamente, muy bueno. Te la anulan a los cuatro meses.",
                  "Vas a la oficina tres veces. La tercera te atiende una señora que te la anula por lástima y por criterio."] },
    { label: "Romperla y olvidarte.", efectos: { karma: -8, paranoia: 15, conciencia: 3 },
      resultado: ["La rompés en cuatro. Va a aparecer en un trámite en dos años, agrandada.",
                  "La tirás en un tacho. La ciudad tiene memoria y no te la va a perdonar."] },
    { label: "Guardarla como recuerdo.", efectos: { conciencia: 12, karma: 5, paranoia: 8 },
      resultado: ["La guardás en el bolsillo interno. «Actividad ritual no autorizada» va a ser el título de algo algún día.",
                  "La plegás en cuatro y la conservás. Es lo más gracioso que te pasó en la run."] }
  ]
},

{
  id: "pl_vecino_denuncia", categoria: "dialogo", tramo: [1, 3], peso: 8, unlock: "A8",
  slots: { escenario: { tags: ["urbano", "interior"] }, personaje: { tags: ["testigo", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} llamó a la policía y lo dice de frente, en el pasillo, sin culpa.",
      "«Yo trabajo a las seis», dice, y ese es todo su argumento y es un argumento completo.",
      "Están los dos parados en el palier de {escenario} a las cuatro de la mañana."
    ]},
    { texto: [
      "«Fui yo», dice {personaje.desc}, cuando le preguntás.",
      "No se disculpa. Explica.",
      "Y la explicación es, cuando la escuchás con atención, razonable de punta a punta."
    ]}
  ],
  opciones: [
    { label: "Darle la razón y pedirle perdón.", efectos: { karma: 20, conciencia: 18, paranoia: -18 },
      resultado: ["«Tenés razón», decís. Se desarma. Termina invitándote un café y contándote de su turno.",
                  "Le pedís perdón en serio y funciona en serio. La próxima vez no va a llamar."] },
    { label: "Discutirle.", efectos: { karma: -12, paranoia: 18, conciencia: 5 },
      resultado: ["Discuten diez minutos en el palier. Se despiertan dos vecinos más. Perdés por goleada.",
                  "Le decís cuatro cosas. Cierra la puerta en la mitad de la quinta."] },
    { label: "Proponerle un acuerdo.", efectos: { karma: 15, conciencia: 15, paranoia: -12 }, flags: { set: ["pacto_vecinal"] },
      resultado: ["Acuerdan un horario límite. Lo cumplís. Es la primera negociación exitosa de tu vida adulta.",
                  "«Hasta las dos», propone. «Hasta las dos», aceptás. Se dan la mano en un palier a las cuatro."] },
    { label: "Invitarlo a que suba.", efectos: { karma: 15, conciencia: 12, paranoia: -8, aguante: -5 },
      riesgo: { prob: 0.4, efectos: { karma: -8, paranoia: 15 }, resultado: ["Sube, se queda hasta las nueve, y a las nueve está peor que todos y hay que llevarlo a su departamento."] },
      resultado: ["Dice que no y se ríe. Pero la próxima vez que hay ruido, golpea la puerta en vez de llamar.",
                  "Sube diez minutos «solo a mirar» y se queda dos horas."] }
  ]
},

{
  id: "pl_salida_madrugada", categoria: "descanso", tramo: [3, 4], peso: 9, unlock: "A8",
  slots: { escenario: { tags: ["urbano", "noche"] }, personaje: { tags: ["familia", "social", "cuidadora"] } },
  variantes: [
    { texto: [
      "Salís de la comisaría a las seis y cuarenta de la mañana con los cordones en el bolsillo.",
      "Afuera, en la vereda de {escenario}, está {personaje.nombre} esperando desde las cuatro.",
      "No dice nada. Te da un abrigo."
    ]},
    { texto: [
      "La puerta se abre y afuera hay una ciudad que arrancó su día sin vos.",
      "{personaje.desc}. Vino. No sabés cómo se enteró.",
      "«Vamos», dice. Y arrancan a caminar."
    ]}
  ],
  opciones: [
    { label: "Agradecer y contarle todo.", efectos: { karma: 20, conciencia: 20, paranoia: -25, aguante: 12 },
      resultado: ["Le contás todo mientras caminan. Escucha. Al final dice «bueno, ya está». Y ya está.",
                  "Hablás cuarenta cuadras. No te reprocha nada. Eso te rompe más que un reproche."] },
    { label: "No hablar y solo caminar al lado.", efectos: { karma: 15, conciencia: 16, paranoia: -20, aguante: 10 },
      resultado: ["Caminan treinta cuadras en silencio y llegan a un lugar donde hay café. Se dice todo sin decir nada.",
                  "El silencio compartido a las siete de la mañana es una tecnología de reparación."] },
    { label: "Enojarte porque vino.", efectos: { karma: -18, paranoia: 12, conciencia: 5 },
      resultado: ["Le decís que no hacía falta, con un tono que no correspondía. Se queda callado. Va a venir la próxima igual.",
                  "«¿Quién te dijo que vengas?» Es la peor frase disponible y la elegiste."] },
    { label: "Prometerle algo concreto.", efectos: { karma: 15, conciencia: 15, paranoia: -12 }, flags: { set: ["promesa_concreta"] },
      resultado: ["Le prometés una sola cosa, chica y verificable. Eso vale más que un discurso.",
                  "«El lunes voy», decís. Y anotalo, porque el juego se va a acordar."] }
  ]
},

{
  id: "pl_expediente_futuro", categoria: "ruta", tramo: [3, 4], peso: 8, unlock: "A8",
  requiere: { flags: { any: ["firmo_acta", "llamo_policia", "encubrio", "tiene_grabacion"] } },
  slots: { personaje: { tags: ["esceptico", "social", "turbio"] }, escenario: {}, complicacion: { tags: ["personal", "social", "policial"] } },
  variantes: [
    { texto: [
      "Te encuentran en {escenario} con un sobre y una fotocopia.",
      "{personaje.nombre} no vino a discutir: vino a informar. {^personaje.desc}.",
      "{^complicacion}, y el sobre sigue ahí arriba de la mesa."
    ]},
    { texto: [
      "Aparece una consecuencia de algo que firmaste, dijiste o guardaste hace dos tramos.",
      "{personaje.nombre} te lo trae en un sobre y te lo explica en dos minutos.",
      "No es una catástrofe. Es una cosa que ahora existe y no se puede desexistir."
    ]},
    { texto: [
      "«Vos firmaste esto», dice {personaje.nombre}, y te muestra una fotocopia con tu letra.",
      "La letra es tuya. La firma es tuya. La noche de la firma es un borrón.",
      "Ahora hay que resolverlo y hay tres formas y ninguna es gratis."
    ]}
  ],
  opciones: [
    { label: "Enfrentarlo de una y resolverlo.", efectos: { mangos: -700, conciencia: 20, karma: 15, paranoia: -20 },
      resultado: ["Gastás plata y dos días de trámite y lo cerrás. Es la forma adulta y es aburrida y funciona.",
                  "Lo resolvés. Se cierra. Dormís mejor esa noche que en todo el viaje."] },
    { label: "Ignorarlo.", efectos: { paranoia: 25, karma: -8, conciencia: 5 },
      resultado: ["Lo guardás en un cajón. Va a volver más grande y en peor momento.",
                  "No hacés nada. La ansiedad de fondo sube un escalón permanente."] },
    { label: "Usarlo a tu favor.", efectos: { mangos: 800, karma: -20, conciencia: 15, paranoia: 18 },
      riesgo: { prob: 0.4, efectos: { mangos: -600, paranoia: 25 }, resultado: ["El movimiento sale mal. Ahora hay dos expedientes y uno es peor."] },
      resultado: ["Le das vuelta al asunto y sacás una ventaja. Sos bueno en esto y eso es una noticia mixta.",
                  "Convertís el problema en una palanca. Funciona. Te deja un gusto conocido."] },
    { label: "Contarle todo a alguien que te quiera.", efectos: { karma: 15, conciencia: 18, paranoia: -25 },
      resultado: ["Se lo contás entero. No se soluciona nada legalmente y se soluciona casi todo lo demás.",
                  "Compartir el peso lo divide de verdad. Es física básica y nadie la aplica."] }
  ]
}

]);
