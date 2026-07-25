/* PICHICATA — eventos base, parte 1/2. Disponibles desde la primera run.
   Esquema de un evento:
     id, categoria, tramo[], peso, unlock, requiere{stats,flags,personaje}
     slots{escenario,personaje,personaje2,complicacion} -> filtros por tags
     ascii, variantes[{texto:[parrafos]}], opciones[]
   Esquema de una opción:
     label, requiere, requisitoTexto, efectos{}, flags{set,clear}, resultado[]
     riesgo{prob,efectos,resultado} | tirada{stat,dificultad,exito{},fallo{}}
     daReliquia, fin, forzar */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

/* ---------------- TRAMO 1: EL BARRIO ---------------- */

{
  id: "ev_bienvenida_retiro", categoria: "dialogo", tramo: [1], peso: 14, unlock: null,
  slots: { escenario: { tags: ["ritual", "precario"] }, personaje: { tags: ["guru"] }, complicacion: { tags: ["social", "precario"] } },
  ascii: "bandera",
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, te recibe en {escenario} con un abrazo que dura ocho segundos más de lo necesario. Te dice que ya sabía que ibas a venir, que lo soñó.",
      "Después te pide los mangos por adelantado. En efectivo. Aclara que la transferencia «corta el flujo».",
      "Atrás, {complicacion}."
    ]},
    { texto: [
      "Llegás a {escenario} con la dirección escrita en la mano. {^personaje.desc}: ese es {personaje.nombre}, y te habla como si ya se hubieran conocido en otra vida y en esa vida vos le debieras plata.",
      "«{frase}», te dice, y estira la mano. No para saludar.",
      "{^complicacion}, pero nadie parece darle importancia."
    ]},
    { texto: [
      "Hay siete personas sentadas en ronda en {escenario} y ninguna se anima a hablar primero. {^personaje.nombre} entra último y ese es su método.",
      "Cobra ahí mismo, de pie, contando los billetes con el pulgar mojado.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Pagar completo y confiar.", efectos: { mangos: -250, conciencia: 6, karma: 5 }, flags: { set: ["pago_completo"] },
      resultado: ["Pagás. Algo se te acomoda en el pecho, y no sabés si es fe o resignación bien administrada.",
                  "Te da un recibo escrito en un pedazo de servilleta. Lo guardás como si fuera importante."] },
    { label: "Regatear invocando tu situación económica.", efectos: { mangos: -120, karma: -4, paranoia: 8 },
      riesgo: { prob: 0.35, efectos: { aguante: -10 }, resultado: ["Te acepta el precio y te asigna la carpa de los que roncan. Es una represalia y las dos partes lo saben."] },
      resultado: ["Le contás una versión de tu vida un veinte por ciento más trágica que la real. Funciona.",
                  "Baja el precio sin discutir, lo que te deja pensando cuánto le sobraba."] },
    { label: "«Voy al baño» y quedarte sin pagar.", efectos: { karma: -12, paranoia: 10 }, flags: { set: ["garca_del_guru"] },
      resultado: ["Nadie te frena. Nadie te mira. Eso es peor que si te frenaran.",
                  "Entrás sin pagar y te sentás en la ronda con una tranquilidad que después te va a costar."] },
    { label: "Mirarlo a los ojos y decirle que sabés que es un chanta.", requiere: { stats: { conciencia: { min: 25 } } }, requisitoTexto: "Conciencia 25",
      efectos: { conciencia: 12, karma: -6 }, flags: { set: ["guru_te_respeta"] },
      resultado: ["Se ríe con una carcajada real, la primera del día. «Obvio que soy un chanta, gordo. Igual sentate.»",
                  "No se ofende. Te palmea el hombro. «Al menos uno que mira.» Y te sienta adelante."] }
  ]
},

{
  id: "ev_kiosco_ventanita", categoria: "comercio", tramo: [1, 2, 3], peso: 12, unlock: null,
  slots: { escenario: { tags: ["comercio", "urbano"] }, personaje: { tags: ["comercio"] } },
  ascii: "ventanita",
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, atiende desde una ventanita de treinta por treinta en {escenario}. {^personaje.desc}.",
      "Tiene de todo, y «de todo» incluye tres cosas que no reconocés.",
      "Los precios los inventa mirándote los zapatos."
    ]},
    { texto: [
      "En {escenario} hay una reja, una ranura, y atrás {personaje.nombre}.",
      "No pregunta qué querés. Pone cuatro cosas sobre la bandeja giratoria y espera.",
      "Una de las cuatro cosas se mueve un poco."
    ]}
  ],
  opciones: [
    { label: "Comprar prensado para el viaje.", efectos: { mangos: -80, efecto: 5 }, flags: { set: ["tiene_faso"] },
      resultado: ["Verde, apretado, con más semillas que promesas. Sirve.",
                  "«Es de lo bueno», dice, y las dos partes saben que no."] },
    { label: "Pedirle «lo que haya» y confiar.", efectos: { mangos: -200, paranoia: 10 }, daReliquia: true,
      resultado: ["Te pasa un paquetito de papel de diario doblado con una prolijidad que asusta.",
                  "Lo que te da no tiene nombre comercial. Tiene un apodo, y el apodo es un chiste interno."] },
    { label: "Venderle algo tuyo.", efectos: { mangos: 150, conciencia: -5 },
      resultado: ["Se queda con lo tuyo por la mitad de lo que vale y los dos hacen como que fue un favor.",
                  "«Te lo guardo», dice, y no te lo va a guardar."] },
    { label: "Pedir fiado.", requiere: { stats: { karma: { min: 20 } } }, requisitoTexto: "Karma 20",
      efectos: { paranoia: 6 }, flags: { set: ["deuda_kiosco"] },
      resultado: ["Anota tu nombre en un cuaderno Gloria con una letra que no vas a poder discutir después.",
                  "«Fiado va», dice. Y agrega: «Yo me acuerdo de todo.»"] }
  ]
},

{
  id: "ev_seminario_zoom", categoria: "dialogo", tramo: [1], peso: 10, unlock: null,
  slots: { personaje: { tags: ["chanta"] }, complicacion: { tags: ["social", "personal", "ruido"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, da un seminario de desapego por videollamada. Cuesta lo que cuesta un asado para ocho.",
      "Tiene el micrófono de un podcast y una biblioteca de fondo con dos libros repetidos.",
      "A los cuarenta minutos vende el módulo 2."
    ]},
    { texto: [
      "Son ciento veinte personas en la llamada y ciento diecinueve tienen la cámara apagada. La que está prendida es {personaje.nombre}.",
      "«{frase}», dice, y hace una pausa larga para que alguien lo escriba.",
      "Mientras habla, {complicacion}."
    ]}
  ],
  opciones: [
    { label: "Comprar el módulo 2.", efectos: { mangos: -400, conciencia: 8, karma: -5 },
      resultado: ["El módulo 2 son cuatro PDFs y un grupo de WhatsApp. Aprendés algo igual, por accidente.",
                  "Pagás en tres cuotas. En la tercera ya no te acordás de qué compraste."] },
    { label: "Hacer una pregunta que lo deje en offside.", efectos: { conciencia: 15, karma: 5 }, flags: { set: ["enemigo_de_coach"] },
      resultado: ["Se queda seis segundos en silencio, mira a un costado, y dice «buenísima pregunta, la vemos en el módulo 3».",
                  "Te silencia el micrófono. La sala lo nota. Vos ganaste algo."] },
    { label: "Cerrar la compu y salir a caminar.", efectos: { conciencia: 6, aguante: 10, paranoia: -5 },
      resultado: ["Caminás once cuadras sin rumbo y en la novena entendés algo que él no iba a decir nunca.",
                  "Afuera hay aire y no cuesta nada. Es un dato."] }
  ]
},

{
  id: "ev_esquina_pibes", categoria: "dialogo", tramo: [1, 2], peso: 11, unlock: null,
  slots: { escenario: { tags: ["urbano", "social", "conurbano"] }, personaje: { tags: ["lumpen", "joven"] }, complicacion: { tags: ["social", "ruido"] } },
  variantes: [
    { texto: [
      "En {escenario} hay tres pibes con una botella y {personaje.nombre}, que es el que habla.",
      "Te preguntan a dónde vas con esa cara. Se los contás. No se ríen, lo cual te descoloca.",
      "Uno dice que su tía hizo un retiro de esos y volvió peor. Otro dice que volvió mejor. Discuten entre ellos como si vos no estuvieras."
    ]},
    { texto: [
      "{personaje.desc}. Te cruza en {escenario} y te dice «eh, maestro» sin ninguna ironía, y eso es lo que más te desarma.",
      "Te ofrece de la botella. Es una prueba y no es una prueba.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Tomar de la botella y quedarte un rato.", efectos: { efecto: 15, aguante: -6, karma: 10, conciencia: 6 },
      resultado: ["Te quedás cuarenta minutos y te enterás de tres historias que valen más que cualquier módulo 2.",
                  "Tomás, tosés, se ríen, y en esa risa hay más comunión que en todo el retiro."] },
    { label: "Explicarles lo que estás buscando.", efectos: { conciencia: 8, paranoia: 4 },
      riesgo: { prob: 0.3, efectos: { karma: -5, conciencia: -3 }, resultado: ["A mitad de la explicación te escuchás y te das cuenta de que estás repitiendo a {personaje.nombre} textual. Los pibes también se dan cuenta."] },
      resultado: ["Los escucha uno y medio. El medio hace la mejor pregunta del día.",
                  "Hablás cuatro minutos. Al final uno dice «ah, o sea, estás mal». Sí. Eso."] },
    { label: "Seguir caminando sin frenar.", efectos: { paranoia: 6, karma: -3 },
      resultado: ["Pasás de largo mirando el piso y sentís las tres miradas en la nuca durante media cuadra.",
                  "No te dicen nada. Y no decirte nada es un comentario completo."] },
    { label: "Convidarles vos.", requiere: { stats: { mangos: { min: 100 } } }, requisitoTexto: "$100",
      efectos: { mangos: -100, karma: 15, conciencia: 5, aguante: -3 },
      resultado: ["Volvés del kiosco con dos litros y te ganás una amistad de tres horas, que es la duración correcta de una amistad.",
                  "Pagás la vuelta. Nadie te lo va a devolver y no era la idea."] }
  ]
},

{
  id: "ev_feria_reliquias", categoria: "comercio", tramo: [1, 2], peso: 9, unlock: null,
  slots: { escenario: { tags: ["comercio", "social"] }, personaje: { tags: ["comercio", "chanta"] } },
  variantes: [
    { texto: [
      "En {escenario}, {personaje.nombre} vende sobre una manta: cuarzos, estampitas, un cuenco, {objeto}.",
      "Cada cosa tiene una historia y todas las historias empiezan en el Tíbet.",
      "El cuenco dice «hecho en Villa Celina» abajo, y {personaje.nombre} lo apoya de forma tal que no se vea."
    ]},
    { texto: [
      "Manta en el piso, {escenario}, y {personaje.desc} atendiendo.",
      "«Esto perteneció a un lama», dice de un objeto que claramente perteneció a una abuela de Floresta.",
      "Igual hay una cosa, entre todas, que te llama de un modo que no podés justificar."
    ]}
  ],
  opciones: [
    { label: "Comprar la cosa que te llama, sin preguntar el precio.", efectos: { mangos: -300, conciencia: 5 }, daReliquia: true,
      resultado: ["Te cobra un número redondo inventado en el momento. Igual te lo llevás, y algo en el bolsillo pesa distinto.",
                  "«Buena elección», dice, y por una vez no está mintiendo."] },
    { label: "Regatear todo el puesto hasta dejarlo en nada.", efectos: { mangos: -80, karma: -8, conciencia: 3 },
      resultado: ["Veinte minutos de negociación por objetos que no valen nada. Ganás. Es una victoria vacía y por eso mismo instructiva.",
                  "Termina vendiéndote tres cosas por el precio de una y odiándote de un modo sereno."] },
    { label: "Preguntarle en serio si cree en lo que vende.", efectos: { conciencia: 12, karma: 4 },
      resultado: ["Se queda callado un rato largo. «Creo en que la gente necesita agarrarse de algo», dice. Es la frase más honesta del tramo.",
                  "«¿Y vos crees en tu trabajo?», te contesta. Touché doble."] },
    { label: "No comprar nada e irte.", efectos: { conciencia: 2, mangos: 0 },
      resultado: ["Te vas con la plata intacta y una sensación leve de haber esquivado algo o de haberte perdido algo. Las dos.",
                  "«Volvé», te dice. Y lo dice como si lo supiera."] }
  ]
},

{
  id: "ev_hermano_llama", categoria: "dialogo", tramo: [1, 2, 3], peso: 8, unlock: null,
  slots: { personaje: { tags: ["familia", "social"] }, complicacion: { tags: ["personal", "social"] } },
  ascii: "telefono",
  variantes: [
    { texto: [
      "Suena el teléfono. Es {personaje.nombre}.",
      "No llama nunca. Cuando llama es porque pasó algo o porque no pasó nada y eso ya es algo.",
      "Mirás la pantalla ocho segundos, que es exactamente lo que tarda en cortarse."
    ]},
    { texto: [
      "{personaje.nombre} te escribe: «¿estás bien?». Nada más. Sin signos de apertura, como manda la costumbre.",
      "Tenés tres respuestas posibles y ninguna es verdad.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Atender y contarle todo.", efectos: { karma: 12, conciencia: 10, paranoia: -12, aguante: 5 },
      resultado: ["Hablan cuarenta minutos. No entiende nada de lo que le contás y te escucha igual, que es de lo que se trata.",
                  "Al final te dice «cuidate, boludo» y te dura tres días."] },
    { label: "Atender y mentirle que estás bien.", efectos: { karma: -6, paranoia: 8, conciencia: 3 },
      resultado: ["«Todo bien, todo bien.» Lo dijiste tan rápido que quedó claro. Los dos hacen como que no.",
                  "Corta primero. Eso nunca pasó antes."] },
    { label: "No atender.", efectos: { paranoia: 14, karma: -8 },
      resultado: ["Se corta. No vuelve a llamar. Vas a pensar en esto en el peor momento posible de la noche.",
                  "Dejás que suene hasta el final, mirándolo, como si fuera un examen."] },
    { label: "Atender y pedirle plata.", efectos: { mangos: 800, karma: -20, conciencia: -4, paranoia: 10 },
      resultado: ["Te la manda en cuatro minutos y sin preguntar. Eso es lo que te va a doler.",
                  "«¿Cuánto necesitás?» Ni un reproche. Preferirías el reproche."] }
  ]
},

{
  id: "ev_primer_faso", categoria: "trip", tramo: [1, 2], peso: 12, unlock: null,
  slots: { escenario: { tags: ["urbano", "publico", "noche", "conurbano"] }, personaje: { tags: ["quimico", "lumpen", "social"] } },
  ascii: "porro",
  variantes: [
    { texto: [
      "{personaje.nombre} arma en {escenario} con una lentitud litúrgica. Veinte minutos para armar uno.",
      "Dice que la técnica importa. Nadie lo contradice porque nadie tiene otra cosa que hacer.",
      "Cuando por fin prende, la primera pitada la ofrece al aire, «para los que no están»."
    ]},
    { texto: [
      "Circula en {escenario}. {^personaje.desc}.",
      "Te llega en la cuarta vuelta, cuando ya es más ceniza que promesa.",
      "«Es suave», te avisa {personaje.nombre}, y eso, estadísticamente, siempre es mentira."
    ]}
  ],
  opciones: [
    { label: "Fumar y quedarte callado mirando el cielo.", efectos: { efecto: 22, conciencia: 8, paranoia: 4, aguante: -3 },
      resultado: ["Veinte minutos de silencio muy bien invertidos. En algún momento entendés algo sobre tu viejo y se te va.",
                  "El cielo no hace nada especial y aun así te parece suficiente."] },
    { label: "Fumar y hablar sin parar.", efectos: { efecto: 22, conciencia: 4, paranoia: 12, karma: 5 },
      resultado: ["Hablás veinticinco minutos de un tema y al final ni vos sabés cuál era. Igual todos asienten.",
                  "Contás una teoría completa sobre el tiempo. Mañana no vas a poder reconstruirla."] },
    { label: "Pasar de largo.", efectos: { conciencia: 4, paranoia: -4 },
      resultado: ["«Todo bien», dice {personaje.nombre}, y sigue la ronda. Nadie insiste, lo cual es una forma de respeto.",
                  "Decís que no y te sentís, por dos segundos, un adulto. Después se pasa."] },
    { label: "Fumar el doble para ponerte a tono con el grupo.", requiere: { stats: { aguante: { min: 40 } } }, requisitoTexto: "Aguante 40",
      efectos: { efecto: 40, conciencia: 10, aguante: -12, paranoia: 15 },
      riesgo: { prob: 0.4, efectos: { paranoia: 20, aguante: -10 }, resultado: ["Te agarra un bajón de presión y te tenés que sentar en el cordón con la cabeza entre las rodillas mientras los demás siguen hablando de energía."] },
      resultado: ["Te ponés a tono y te pasás de tono en la misma maniobra.",
                  "Fumás como si fuera una competencia. Nadie compite. Ganás igual, en un sentido triste."] }
  ]
},

{
  id: "ev_monja_guiso", categoria: "descanso", tramo: [1, 2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["urbano", "social", "conurbano"] }, personaje: { tags: ["cuidadora"] } },
  ascii: "guiso",
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, reparte de una olla en {escenario}. Hay fila y la fila es silenciosa.",
      "Sirve sin mirar a nadie a los ojos, no por desprecio: por eficiencia y por decencia.",
      "«Comé», te dice. No dice nada más en toda la noche."
    ]},
    { texto: [
      "Hay una olla en {escenario} y una cola de once personas. {^personaje.desc}.",
      "No hay charla espiritual, no hay mantra, no hay plata. Hay guiso.",
      "Te das cuenta, mientras masticás, de que esto es lo único auténticamente sagrado que viste en todo el día."
    ]}
  ],
  opciones: [
    { label: "Comer, agradecer, irte.", efectos: { aguante: 22, karma: 8, conciencia: 6, paranoia: -8 },
      resultado: ["Dos platos. El cuerpo te lo devuelve con una gratitud que la mente nunca tuvo.",
                  "Comés parado, rápido, y es la mejor comida del mes."] },
    { label: "Quedarte a lavar los platos.", efectos: { aguante: 12, karma: 20, conciencia: 12 },
      resultado: ["Hora y media de agua fría y ninguna revelación. Al terminar estás mejor que después de cualquier ceremonia.",
                  "{personaje.nombre} no te agradece. Te pasa el repasador. Eso es un ascenso."] },
    { label: "Preguntarle cuál es su técnica espiritual.", efectos: { conciencia: 10, karma: 3 },
      resultado: ["«Hago guiso los jueves», dice, y se da vuelta. Vas a pensar en esa respuesta durante años.",
                  "Te mira como se mira a un perro que ladra a un poste. «Comé, m'hijo.»"] },
    { label: "Pedir para llevar y no compartir.", efectos: { aguante: 25, karma: -12, mangos: 0 },
      resultado: ["Te llenás un tupper. Atrás quedan dos personas sin plato. Ellos no dicen nada, vos tampoco.",
                  "Guardás para después. El «después» es una forma elegante del egoísmo."] }
  ]
},

{
  id: "ev_encargado_edificio", categoria: "dialogo", tramo: [1, 2], peso: 8, unlock: null,
  slots: { escenario: { tags: ["urbano", "interior"] }, personaje: { tags: ["testigo", "social"] }, complicacion: { tags: ["social", "ruido", "vigilancia"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, te intercepta en {escenario} con el trapo al hombro.",
      "No pregunta a dónde vas. Dice: «¿al 4°B?» Y ya está todo dicho.",
      "{^complicacion}."
    ]},
    { texto: [
      "En {escenario} está {personaje.desc}, apoyado en el marco, con la paciencia de quien cobra por hora.",
      "«Otro», dice. No aclara otro qué.",
      "Después agrega, sin que se lo pidas: «el mes pasado se llevaron a uno en ambulancia»."
    ]}
  ],
  opciones: [
    { label: "Coimearlo para que no diga nada.", efectos: { mangos: -200, karma: -8, paranoia: -10 },
      resultado: ["Se guarda el billete sin mirarlo. «Yo no vi nada nunca», dice, y es cierto: es su oficio.",
                  "Acepta y te abre el ascensor con un gesto de mayordomo."] },
    { label: "Preguntarle qué vio.", efectos: { conciencia: 12, paranoia: 12 },
      resultado: ["Te cuenta cuatro cosas en tres minutos y las cuatro te sacan las ganas de subir.",
                  "«Mirá, yo no me meto», dice, y después se mete durante ocho minutos."] },
    { label: "Ignorarlo y subir.", efectos: { paranoia: 8, karma: -3 },
      resultado: ["Subís. Él se queda abajo, y en algún momento de la noche va a decidir si llama a alguien.",
                  "No insiste. Los encargados nunca insisten. Anotan."] },
    { label: "Invitarlo a subir.", efectos: { karma: 10, conciencia: 8, paranoia: -6 }, flags: { set: ["encargado_amigo"] },
      resultado: ["Se ríe fuerte por primera vez. No sube. Pero desde ahora te saluda, y eso vale más de lo que parece.",
                  "«¿Yo? Estoy de servicio.» Pero se queda charlando veinte minutos en la puerta."] }
  ]
},

{
  id: "ev_dormir_donde_sea", categoria: "descanso", tramo: [1, 2, 3], peso: 13, unlock: null,
  slots: { escenario: {}, complicacion: {} },
  variantes: [
    { texto: [
      "Encontrás un lugar plano en {escenario}. Eso lo convierte, técnicamente, en una cama.",
      "{^complicacion}.",
      "Cerrás los ojos. El cuerpo te agradece con una honestidad que la mente nunca tuvo."
    ]},
    { texto: [
      "{^escenario}: {escenario.detalle}. Y vos con dieciocho horas encima.",
      "Te acomodás con {objeto} de almohada, lo cual es una decisión que solo se toma una vez en la vida y después se repite siempre.",
      "{^complicacion}, pero ya no importa."
    ]},
    { texto: [
      "Se te cierran los ojos de una manera que no se negocia.",
      "En {escenario} el piso está tibio en una zona de un metro por dos y esa zona es tuya ahora.",
      "Lo último que escuchás es a alguien explicando el karma en la habitación de al lado."
    ]}
  ],
  opciones: [
    { label: "Dormir de una.", efectos: { aguante: 25, paranoia: -15, efecto: -20 },
      resultado: ["Cinco horas sin sueños. Un lujo.",
                  "Te despertás con la marca de {objeto} en la cara y una lucidez casi ofensiva."] },
    { label: "Meditar en vez de dormir.", efectos: { conciencia: 10, aguante: 8, paranoia: -8 }, medita: true,
      resultado: ["Cuarenta minutos sentado. Los primeros treinta y cinco son un infierno de listas de tareas. Los últimos cinco no.",
                  "No pasa nada extraordinario y por primera vez eso te parece suficiente."] },
    { label: "Quedarte despierto pensando en tu vieja.", efectos: { conciencia: 14, aguante: -8, karma: 5 },
      resultado: ["Tres horas de techo. No resolvés nada. Entendés dos cosas.",
                  "Lloras un poco, con eficiencia, y después dormís mejor de lo que hubieras dormido."] }
  ]
},

{
  id: "ev_remisero_filosofo", categoria: "dialogo", tramo: [1, 2, 3], peso: 9, unlock: null,
  slots: { personaje: { tags: ["transito", "social"] }, complicacion: { tags: ["social", "ruido", "personal"] } },
  ascii: "micro",
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, maneja con la radio AM en un volumen que no permite el silencio ni la conversación, solo el comentario.",
      "A los cuatro minutos te explica el origen de todos los males del país. A los nueve, el origen de todos los males del universo.",
      "Las dos explicaciones son la misma y hay que reconocerle la coherencia."
    ]},
    { texto: [
      "Te subís y {personaje.nombre} arranca sin preguntar la dirección, como si supiera.",
      "«Vos vas al retiro ese», dice. «Ya llevé a tres.» Pausa. «Volvieron dos.»",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Darle charla y escuchar todo.", efectos: { conciencia: 10, karma: 8, paranoia: -6 },
      resultado: ["Cuarenta minutos de teoría unificada del todo dicha por un tipo que trabaja catorce horas. Hay más filosofía acá que en el módulo 2.",
                  "Te baja con una frase que te va a durar toda la run: «yo no busco nada, m'hijo, yo llevo gente»."] },
    { label: "Ponerte los auriculares.", efectos: { paranoia: 4, conciencia: 2 },
      resultado: ["Se calla en el minuto seis y no vuelve a hablar. El silencio en el auto pesa cuarenta kilos.",
                  "Escuchás tu propia música y te pierdes algo. Nunca vas a saber qué."] },
    { label: "Contarle lo que estás buscando.", efectos: { conciencia: 8, karma: 5, paranoia: 5 },
      riesgo: { prob: 0.35, efectos: { conciencia: -5 }, resultado: ["Te escucha entero y después dice: «o sea, estás al horno». Y tiene razón, y lo dijo en cinco palabras."] },
      resultado: ["Le cuesta un poco entenderlo pero lo intenta con una buena voluntad que te desarma.",
                  "«Ah, mirá», dice, y te da un consejo práctico que no pediste y que sirve."] },
    { label: "Pedirle que te lleve a otra parte.", efectos: { mangos: -250, conciencia: 5, paranoia: -8 }, flags: { set: ["desvio"] },
      resultado: ["Cambia de rumbo sin preguntar. La libertad cuesta doscientos cincuenta pesos y llega tarde.",
                  "«Como quiera», dice. Y en ese «como quiera» hay un juicio completo."] }
  ]
},

{
  id: "ev_vino_cordon", categoria: "descanso", tramo: [1, 2, 3], peso: 12, unlock: null,
  slots: { escenario: { tags: ["urbano", "conurbano", "publico"] }, personaje: { tags: ["lumpen", "social", "veterano"] }, complicacion: {} },
  ascii: "botella",
  variantes: [
    { texto: [
      "Un litro compartido en el cordón de {escenario} con {personaje.nombre}, que te está contando el peor año de su vida como si fuera una anécdota graciosa.",
      "Y por momentos lo es.",
      "{^complicacion}."
    ]},
    { texto: [
      "{personaje.desc}. Se sienta al lado tuyo en {escenario} sin pedir permiso, que es la forma correcta.",
      "Destapa. Toma. Te pasa. El protocolo es antiguo y no requiere explicación.",
      "«Yo antes tenía una casa», dice, y no aclara nada más durante veinte minutos."
    ]}
  ],
  opciones: [
    { label: "Tomar a la par.", efectos: { efecto: 20, aguante: -10, karma: 12, conciencia: 8 },
      resultado: ["Se hacen las tres de la mañana. Escuchar es un sacramento y nadie lo factura.",
                  "El litro se termina y aparece otro de un lugar que no viste."] },
    { label: "Escuchar sin tomar.", efectos: { conciencia: 14, karma: 15, aguante: -3 },
      resultado: ["No tomás y no lo aclarás, que es la única forma de no tomar sin ofender.",
                  "Escuchás dos horas. Al final te agradece, y te agradece por lo que no hiciste."] },
    { label: "Contar tu propia miseria y ganarle.", efectos: { conciencia: 5, karma: -6, efecto: 12 },
      resultado: ["Le ganás. Se queda callado. Ganar esta discusión es la derrota más completa disponible.",
                  "«Ah, bueno», dice. Y se levanta y se va con la botella."] },
    { label: "Ofrecerle plata.", requiere: { stats: { mangos: { min: 200 } } }, requisitoTexto: "$200",
      efectos: { mangos: -200, karma: 5, conciencia: -4 },
      resultado: ["La agarra y se ofende al mismo tiempo, dos cosas que no sabías que podían pasar juntas.",
                  "«No te pedí nada», dice, y la guarda igual. Los dos quedan un poco peor."] }
  ]
},

{
  id: "ev_paranoia_temprana", categoria: "trip", tramo: [1, 2, 3], peso: 10, unlock: null,
  requiere: { stats: { paranoia: { min: 30 } } },
  slots: { escenario: {}, complicacion: { tags: ["paranoia", "social", "vigilancia", "trip"] } },
  variantes: [
    { texto: [
      "En {escenario} algo cambió y no podés señalar qué.",
      "{^complicacion}.",
      "Repasás mentalmente las últimas dos horas buscando el momento exacto en que dijiste algo mal. Encontrás cuatro candidatos."
    ]},
    { texto: [
      "No pasó nada. Eso es justamente lo que te tiene mal.",
      "En {escenario} todos siguen igual. Vos ya no.",
      "{^complicacion}, y esta vez lo tomás como confirmación."
    ]}
  ],
  opciones: [
    { label: "Respirar. Contar hasta diez. Contar otra vez.", efectos: { paranoia: -20, conciencia: 8, aguante: -3 },
      resultado: ["Funciona. No del todo, no para siempre, pero funciona.",
                  "A la tercera vuelta de diez el cuerpo baja un cambio. Sigue estando raro, pero es un raro habitable."] },
    { label: "Preguntarle directamente a alguien si está todo bien.", efectos: { paranoia: -10, karma: 4, conciencia: 5 },
      riesgo: { prob: 0.4, efectos: { paranoia: 18 }, resultado: ["«Sí, ¿por?» El «¿por?» te destruye durante cuarenta minutos."] },
      resultado: ["Te dicen que sí y les crees, y esa es la parte difícil.",
                  "«Estás raro vos», te contestan, y hay cariño en eso."] },
    { label: "Irte de ahí sin avisar.", efectos: { paranoia: 10, karma: -6, aguante: -6, conciencia: 3 },
      resultado: ["Caminás rápido diez cuadras. La paranoia te sigue a la misma velocidad porque es tuya.",
                  "Salís. Afuera está peor, pero es un peor tuyo."] },
    { label: "Fumar para bajarla.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 20, paranoia: 15, conciencia: 4 },
      resultado: ["Grave error metodológico. Ahora es la misma paranoia pero con subtítulos.",
                  "La bajás dos minutos y la subís cuarenta. Se sabía."] }
  ]
},

/* ---------------- TRAMO 2: EL RETIRO ---------------- */

{
  id: "ev_toma_ayahuasca", categoria: "trip", tramo: [2, 3], peso: 14, unlock: null,
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["guru", "ritual"] }, complicacion: { tags: ["ritual", "social", "misterio"] } },
  ascii: "cuenco",
  variantes: [
    { texto: [
      "El cuenco pasa de mano en mano en {escenario}. Huele a barro hervido con óxido.",
      "{personaje.nombre} canta algo en un idioma que claramente está inventando en tiempo real.",
      "Te toca. La toma es más grande de lo que negociaste. {^complicacion}, pero nadie parece registrarlo."
    ]},
    { texto: [
      "Once personas en ronda en {escenario}. Un balde por persona, que es el detalle que más dice del asunto.",
      "{personaje.nombre} sirve con un cucharón de cocina y una solemnidad que no le corresponde al cucharón.",
      "«El que vomita, sana», anuncia, cubriéndose."
    ]},
    { texto: [
      "El frasco es un frasco de mermelada. El contenido no es mermelada.",
      "{personaje.desc}: {personaje.nombre} lo agita, lo mira contra la luz, asiente, como si eso significara algo.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Tomar la toma completa.", efectos: { efecto: 38, conciencia: 10, aguante: -12, paranoia: 8 }, flags: { set: ["tomo_aya"] },
      resultado: ["Baja como aceite tibio con gusto a tierra. Los primeros veinte minutos no pasa nada y esos son los peores.",
                  "Tomás todo de un saque. {^personaje.nombre} levanta las cejas, que es su forma de decir «uh»."] },
    { label: "Tomar media y guardar el resto.", efectos: { efecto: 18, conciencia: 4, aguante: -5 }, flags: { set: ["tomo_aya"] },
      resultado: ["Media toma. Prudencia. La prudencia también es una forma de miedo pero paga mejor.",
                  "Dejás la mitad. {^personaje.nombre} lo anota mentalmente y te lo va a decir más tarde."] },
    { label: "Fingir que tomás.", efectos: { karma: -8, paranoia: 15, conciencia: 2 }, flags: { set: ["mintio_en_ceremonia"] },
      resultado: ["Te lo llevás a la boca y no tragás. Después escupís en {objeto}. Nadie te ve. Vos te ves.",
                  "Simulás. Durante las siguientes cuatro horas actuás de persona en un trance, lo cual es agotador."] },
    { label: "Tomar y pedir otra.", requiere: { stats: { efecto: { max: 25 }, aguante: { min: 45 } } }, requisitoTexto: "Efecto ≤25 y Aguante 45",
      efectos: { efecto: 55, conciencia: 18, aguante: -20, paranoia: 12 }, flags: { set: ["tomo_aya", "doble_toma"] },
      riesgo: { prob: 0.4, efectos: { aguante: -12, paranoia: 15 }, resultado: ["Purga sin final. Cuatro horas de balde. Te perdés lo que sea que haya pasado en la ronda y todos te miran distinto después."] },
      resultado: ["Extendés el vaso. Hay un silencio en la ronda. {^personaje.nombre} sirve igual, porque no va a discutir en público.",
                  "Doble. La segunda no la sentís bajar, y eso es información."] }
  ]
},

{
  id: "ev_purga", categoria: "trip", tramo: [2, 3], peso: 12, unlock: null,
  requiere: { stats: { efecto: { min: 25 } } },
  slots: { escenario: { tags: ["ritual", "interior", "naturaleza"] }, personaje: { tags: ["cuidadora", "social", "ritual"] } },
  ascii: "balde",
  variantes: [
    { texto: [
      "Empieza en el estómago y sube como una opinión.",
      "{personaje.nombre} te sostiene el pelo con una ternura que no te dio nadie desde 2014.",
      "Sale todo. Literal y no."
    ]},
    { texto: [
      "El balde. El balde era para esto. Ahora entendés el balde.",
      "En {escenario} hay otras cuatro personas en la misma tarea y hay algo profundamente democrático en eso.",
      "{personaje.nombre} pasa con un trapo y no dice nada, que es exactamente lo correcto."
    ]}
  ],
  opciones: [
    { label: "Entregarte.", efectos: { aguante: -15, conciencia: 20, efecto: -25, karma: 10 },
      resultado: ["Te entregás y sale, y con eso sale una cosa vieja que no sabías que estabas cargando.",
                  "Veinte minutos horribles y después una limpieza que no se compra."] },
    { label: "Aguantarla por vergüenza.", efectos: { aguante: -25, conciencia: 2, paranoia: 15, efecto: -5 },
      resultado: ["La aguantás. Ganás la dignidad y perdés el resto. Mal negocio.",
                  "Te la tragás tres veces. La cuarta te gana y encima con público."] },
    { label: "Culpar a la comida.", efectos: { karma: -10, paranoia: 5, conciencia: -3, efecto: -15 },
      resultado: ["«Fue el guiso», anunciás, a nadie, con la boca todavía sucia. Nadie te contesta y no hace falta.",
                  "Le echás la culpa al arroz. El arroz no se defiende. Todos saben."] },
    { label: "Pedirle a {personaje.nombre} que se quede.", efectos: { aguante: -10, conciencia: 12, karma: 12, paranoia: -12, efecto: -20 },
      resultado: ["Se queda. No dice nada durante cuarenta minutos y esos cuarenta minutos son el retiro entero.",
                  "«Dale, respirá», te dice cada tanto. Es la mejor guía espiritual del país y cobra cero."] }
  ]
},

{
  id: "ev_ícaro_desafinado", categoria: "dialogo", tramo: [2], peso: 10, unlock: null,
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["ritual", "musico", "guru"] }, complicacion: { tags: ["ruido", "social", "ritual"] } },
  ascii: "guitarra",
  variantes: [
    { texto: [
      "{personaje.nombre} canta los ícaros en {escenario} con una voz que es objetivamente hermosa.",
      "El problema aparece entre canción y canción, cuando habla.",
      "En cuatro minutos menciona: los reptilianos, el flúor, y una teoría sobre su ex."
    ]},
    { texto: [
      "La voz de {personaje.nombre} sostiene la ronda entera. Once personas dadas vuelta y una voz. Funciona.",
      "Después de la tercera canción cambia de tema y empieza a hablar de dinero.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Entregarte a la música e ignorar lo que dice entre temas.", efectos: { conciencia: 14, paranoia: -10, efecto: 5 },
      resultado: ["Separás la obra del artista con una destreza que te sorprende. La música te lleva a un lugar real.",
                  "Cerrás los ojos en el momento justo, cada vez. Es una técnica y la dominás rápido."] },
    { label: "Discutirle la teoría del flúor.", efectos: { conciencia: 6, karma: -5, paranoia: 10 }, flags: { set: ["discutio_en_ronda"] },
      resultado: ["Se corta el clima para once personas. Tenés razón. Fue carísimo tener razón.",
                  "Deja de cantar. Nadie te lo va a perdonar y no del todo sin motivo."] },
    { label: "Pedirle que cante una sola canción, la que ella quiera, sin hablar.", efectos: { conciencia: 18, karma: 10 },
      resultado: ["Se queda pensando. Elige una que no es un ícaro: es una canción de cuna. Se caga a llorar medio retiro.",
                  "Canta doce minutos seguidos sin decir una palabra entre medio. Es lo mejor de la noche."] },
    { label: "Salir a fumar.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 18, conciencia: 3, paranoia: 5 },
      resultado: ["Afuera se escucha mejor, con la distancia justa. La distancia justa arregla muchas cosas.",
                  "Fumás en la puerta y desde ahí el retiro parece una obra de teatro que casi funciona."] }
  ]
},

{
  id: "ev_guru_desenmascarado", categoria: "ruta", tramo: [2, 3], peso: 11, unlock: null,
  slots: { escenario: { tags: ["urbano", "conurbano", "transito"] }, personaje: { tags: ["guru", "chanta"] } },
  variantes: [
    { texto: [
      "Lo ves de casualidad en {escenario}. {^personaje.nombre} está en un Ford Ka, comiendo milanesa con la mano y hablando por teléfono de plata.",
      "Dice, textual: «no, gordo, a estos les cantás cualquiera y te lo compran».",
      "Todavía tiene la túnica puesta."
    ]},
    { texto: [
      "{personaje.nombre} sin público es otra persona. Lo descubrís en {escenario}, a treinta metros, sin que te vea.",
      "Fuma como fuma alguien que fuma mucho. Se rasca. Escupe. Se ríe de algo en el teléfono.",
      "Es la primera vez que lo ves ser humano y te da más impresión que cuando era santo."
    ]}
  ],
  opciones: [
    { label: "Filmarlo y escrachar el retiro.", efectos: { karma: -15, conciencia: 25, paranoia: 12 }, flags: { set: ["retiro_quemado"] },
      resultado: ["Cuarenta segundos de video que le van a arruinar el año. Te sentís poderoso y sucio en proporciones iguales.",
                  "Subís el video. Doce mil vistas en dos horas. Cuatro personas te agradecen, dos te amenazan."] },
    { label: "Sentarte a comer milanesa con él.", efectos: { karma: -25, mangos: 400, conciencia: 20, aguante: 8 }, flags: { set: ["socio_del_chanta"] },
      resultado: ["Compartís la milanesa y en cuarenta minutos te explica el negocio completo, sin vergüenza, con orgullo profesional.",
                  "«Vos tenés cara de confiable», te dice. «Yo tengo el discurso. Pensalo.»"] },
    { label: "Irte sin decir nada y seguir el camino solo.", efectos: { conciencia: 18, karma: 10, paranoia: -5 }, flags: { set: ["camino_propio"] },
      resultado: ["Das media vuelta antes de que te vea. Desde acá en adelante el viaje es tuyo, con todo lo malo que eso implica.",
                  "No dices nada nunca. Es la decisión más adulta de la run y no te la va a aplaudir nadie."] },
    { label: "Convencerte de que es una prueba del maestro.", efectos: { conciencia: -10, paranoia: 20, karma: 3 },
      resultado: ["Construís, en tiempo real, una explicación completa de por qué esto en realidad es una enseñanza. La fe es un músculo raro.",
                  "«Me está mostrando el ego», decidís. Y con eso te condenás dos tramos más."] }
  ]
},

{
  id: "ev_hongos_plaza", categoria: "trip", tramo: [1, 2], peso: 12, unlock: null,
  slots: { escenario: { tags: ["publico", "naturaleza", "urbano"] }, personaje: { tags: ["quimico", "joven", "social"] }, personaje2: { tags: ["inocente", "joven", "animal"] } },
  ascii: "hongo",
  variantes: [
    { texto: [
      "Los hongos eran de {personaje.nombre} y {personaje.nombre} no está muy claro respecto de la dosis.",
      "Cuarenta minutos después el pasto de {escenario} está respirando, y respira mejor que vos.",
      "Se te acerca {personaje2.nombre} y te pregunta la hora. Es la pregunta más difícil que te hicieron en tu vida."
    ]},
    { texto: [
      "«Comé dos y esperá», dijo {personaje.nombre} hace una hora y media. Comiste cuatro y no esperaste nada.",
      "En {escenario} las líneas rectas dejaron de existir de forma progresiva y educada.",
      "Ahora está {personaje2.desc} enfrente tuyo, esperando algo de vos."
    ]}
  ],
  opciones: [
    { label: "Decir la verdad: que el tiempo no existe.", efectos: { conciencia: 12, paranoia: 10, karma: -5 },
      resultado: ["Lo dices con total convicción. {^personaje2.nombre} se va caminando rápido, y hacés bien en no seguirlo.",
                  "Das una explicación de once minutos sobre la simultaneidad. No era la pregunta."] },
    { label: "Hacer un esfuerzo heroico y mirar el celular.", efectos: { conciencia: 18, aguante: -6, paranoia: -5 },
      resultado: ["Te toma cuarenta segundos leer cuatro números. Lo lográs. Es el logro más grande de la semana.",
                  "«Cinco y veinte», dices, temblando. Volviste al mundo por dos segundos y volviste por otro."] },
    { label: "Quedarte tres horas jugando a la pelota.", efectos: { karma: 20, conciencia: 14, aguante: -25, efecto: -30 },
      resultado: ["Tres horas. Sudás todo. En el minuto noventa se te va el viaje y queda solo el juego, que era el viaje.",
                  "Perdés cinco a dos contra un chico de nueve años y es la derrota más limpia de tu vida."] },
    { label: "Comer más.", requiere: { stats: { efecto: { max: 60 } } }, requisitoTexto: "Efecto ≤60",
      efectos: { efecto: 35, conciencia: 8, paranoia: 20 },
      riesgo: { prob: 0.45, efectos: { paranoia: 20, aguante: -12 }, resultado: ["Los últimos dos te ponen en un lugar del que no hay souvenir. Te sentás contra un árbol cuatro horas."] },
      resultado: ["El resto de la bolsita. Es una decisión de la que no vas a poder hablar sin bajar la voz.",
                  "Masticás sin registrar el gusto, que ya es un mal signo."] }
  ]
},

{
  id: "ev_masaje_expolicia", categoria: "dialogo", tramo: [2], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior"] }, personaje: { tags: ["cuerpo", "turbio", "social"] } },
  ascii: "mano",
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, hace «desbloqueo corporal» en una camilla en {escenario}.",
      "Tiene manos enormes y una técnica indiscutiblemente eficaz.",
      "A los diez minutos empieza a contarte de su trabajo anterior y te queda muy claro dónde aprendió a encontrar puntos de presión."
    ]},
    { texto: [
      "«Boca abajo», dice {personaje.nombre}, y hay algo en el tono que no se discute.",
      "El masaje es el mejor de tu vida. La conversación es la peor.",
      "En el minuto quince te pregunta si «alguna vez sentiste que el cuerpo se acuerda de cosas». Sí. Justo ahora."
    ]}
  ],
  opciones: [
    { label: "Aguantar y dejarte trabajar.", efectos: { aguante: 22, conciencia: 8, paranoia: 10 },
      resultado: ["Sale un nudo de la espalda que tenías desde 2016. Costó, moralmente.",
                  "Te destraba la cadera y te tapona el alma. Empate."] },
    { label: "Preguntarle en serio por su trabajo anterior.", efectos: { conciencia: 15, paranoia: 15, karma: 3 },
      resultado: ["Te cuenta dos cosas. La segunda te va a acompañar mucho tiempo. No la pediste.",
                  "«Hice cosas», dice, y después se queda callado quince minutos trabajando la escápula."] },
    { label: "Cortar el masaje e irte.", efectos: { aguante: 5, paranoia: -5, karma: -3 },
      resultado: ["Te levantás a mitad de camino. No se ofende, lo cual es peor.",
                  "«Cuando quieras», dice. Y lo dice como si tuviera todo el tiempo del mundo."] }
  ]
},

{
  id: "ev_influencer_silencio", categoria: "dialogo", tramo: [2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["ritual", "naturaleza", "interior"] }, personaje: { tags: ["chanta", "joven", "social"] }, complicacion: { tags: ["vigilancia", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, pide silencio en {escenario} para poder grabar el silencio.",
      "Instala el aro de luz. Prueba tres encuadres. Repite la primera frase seis veces hasta que le sale espontánea.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay un trípode en el medio del círculo. El trípode es de {personaje.nombre}.",
      "«Chicos, es para compartir la energía», explica, con la cámara ya grabando.",
      "Nadie se anima a decir nada porque nadie quiere salir en el video diciendo algo."
    ]}
  ],
  opciones: [
    { label: "Pedirle que apague la cámara.", efectos: { conciencia: 12, karma: 10, paranoia: 5 },
      riesgo: { prob: 0.35, efectos: { karma: -5, paranoia: 12 }, resultado: ["Lo dice en el video: «acá un compañero que todavía tiene resistencias». Ahora sos un personaje de su contenido."] },
      resultado: ["La apaga con un suspiro largo y educativo. Once personas te lo agradecen con los ojos.",
                  "«Uy, perdón, sí, tenés razón», dice, tan rápido que da lástima."] },
    { label: "Salir en el video y aprovechar.", efectos: { karma: -8, mangos: 300, conciencia: 4, paranoia: 8 },
      resultado: ["Hablás dos minutos a cámara. Te sale bien. Te sale demasiado bien y eso te va a dar vergüenza mañana.",
                  "Te etiqueta. Te siguen ochenta personas. Tres te escriben para ofrecerte un negocio."] },
    { label: "Sentarte de espaldas al trípode y meditar en serio.", efectos: { conciencia: 16, paranoia: -8 }, medita: true,
      resultado: ["Cuarenta minutos de espalda a la cámara. Es una declaración de principios y además funciona.",
                  "Ignorás el circo. El circo sigue igual sin vos, que es la lección."] },
    { label: "Robarle el aro de luz.", efectos: { karma: -18, mangos: 250, paranoia: 20 }, flags: { set: ["ladron_de_luz"] },
      resultado: ["Se lo llevás abajo de la campera. Nadie lo nota hasta la mañana. Vas a escuchar el escándalo de lejos.",
                  "Lo vendés a la vuelta por doscientos cincuenta. La ironía te cuesta karma pero paga el bondi."] }
  ]
},

{
  id: "ev_ruso_cocina", categoria: "descanso", tramo: [2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["interior", "ritual"] }, personaje: { tags: ["cascarrabias", "cuidadora"] } },
  variantes: [
    { texto: [
      "En la cocina de {escenario}, {personaje.nombre} hace de comer para veinte y odia a los veinte.",
      "«Sentate ahí y no toques nada», te dice, y te sirve el mejor plato de comida del país.",
      "Mientras comés te explica exactamente qué tiene de mal cada persona del retiro. No se equivoca en ninguna."
    ]},
    { texto: [
      "Hay olor a cebolla en {escenario} y ese olor es más terapéutico que todo lo demás junto.",
      "{personaje.desc}. No te mira. Cocina.",
      "«¿Vos también viniste a buscarte?», pregunta, sin sacar la vista de la sartén. «Mirá que acá no está.»"
    ]}
  ],
  opciones: [
    { label: "Comer y escuchar sus diagnósticos.", efectos: { aguante: 20, conciencia: 12, paranoia: 5 },
      resultado: ["Cuarenta minutos de análisis brutal y certero de once personas. Aprendés más que en la ceremonia.",
                  "Comés dos platos y una descripción exacta de tus propios defectos. El postre es duro."] },
    { label: "Ofrecerte a ayudar.", efectos: { aguante: 8, karma: 18, conciencia: 10 },
      resultado: ["Te pone a pelar papas. Dos horas. No hablan. Es lo más cerca que estuviste de meditar de verdad.",
                  "«Cortá más fino», es la única corrección que recibís en todo el retiro que sirve para algo."] },
    { label: "Preguntarle por qué sigue trabajando acá si desprecia todo.", efectos: { conciencia: 18, karma: 5 },
      resultado: ["Deja la sartén. Se da vuelta. «Porque alguien tiene que darles de comer», dice. Fin de la clase.",
                  "«Porque pagan», dice primero. Y después, más bajo: «y porque si no cocino yo, comen cualquier cosa»."] },
    { label: "Chorearle comida para después.", efectos: { aguante: 12, karma: -10 },
      resultado: ["Te llenás los bolsillos de pan. Lo ve por el reflejo del vidrio y no dice nada, lo que es su forma de darte una segunda oportunidad.",
                  "Guardás dos milanesas en una bolsa. Van a estar frías y te van a salvar más adelante."] }
  ]
},

{
  id: "ev_viuda_pregunta", categoria: "dialogo", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior", "naturaleza"] }, personaje: { tags: ["duelo", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, no vino a iluminarse. Vino a una conversación de cinco minutos con alguien que se murió.",
      "Te lo cuenta en {escenario} sin dramatismo, como se cuenta un trámite pendiente.",
      "«¿Vos crees que se puede?», pregunta. Y te está preguntando en serio."
    ]},
    { texto: [
      "Hay una foto impresa en papel común, ya despegándose, apoyada contra {objeto}.",
      "{personaje.nombre} la acomoda tres veces en dos minutos.",
      "«Cuarenta y un años», dice. «Y no le pregunté una cosa.»"
    ]}
  ],
  opciones: [
    { label: "Decirle que sí, que se puede.", efectos: { karma: 8, conciencia: 5, paranoia: 5 },
      resultado: ["Le mentís con la mejor intención del mundo. Se le afloja la cara. Vas a cargar con esto un rato.",
                  "«Sí», dices. Y quizás sea verdad, y eso es lo que más te inquieta."] },
    { label: "Decirle que no sabés.", efectos: { conciencia: 15, karma: 12 },
      resultado: ["«No sé», dices, y es lo más generoso que dijiste en todo el día. Te lo agradece sin agradecerte.",
                  "Se queda callada. Después dice: «bueno. Al menos vos no me vendés nada»."] },
    { label: "Sentarte a escuchar la historia completa.", efectos: { conciencia: 20, karma: 20, aguante: -8, paranoia: -10 },
      resultado: ["Dos horas y media. Cuarenta y un años en dos horas y media. Salís distinto y no por la planta.",
                  "Te cuenta todo. Al final dice: «ya está, ya se lo conté a alguien». Eso era. Nunca fue el muerto."] },
    { label: "Ofrecerte a canalizarlo vos.", requiere: { stats: { efecto: { min: 40 } } }, requisitoTexto: "Efecto 40",
      efectos: { karma: -20, conciencia: -5, mangos: 500, paranoia: 15 }, flags: { set: ["falso_medium"] },
      resultado: ["Improvisás un mensaje del más allá. Le sale a pedir. Te paga. Es lo peor que hiciste en el viaje y no es lo peor que vas a hacer.",
                  "Inventás una frase que él nunca dijo. Ella la va a repetir el resto de su vida."] }
  ]
},

{
  id: "ev_cadete_delivery", categoria: "dialogo", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior"] }, personaje: { tags: ["transito", "lumpen"] }, complicacion: { tags: ["social", "absurdo"] } },
  variantes: [
    { texto: [
      "En el medio de la ceremonia, en {escenario}, entra {personaje.nombre} con una mochila térmica.",
      "Alguien pidió delivery. Nadie admite haber pedido delivery.",
      "{personaje.nombre} espera en la puerta con una calma zen absoluta, y es el ser más iluminado del recinto."
    ]},
    { texto: [
      "Golpean. Once personas dadas vuelta miran la puerta como si fuera un portal, y en cierto sentido lo es.",
      "Es {personaje.desc}. Tiene tres pedidos más y ninguna urgencia.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Hacerte cargo del pedido y pagarlo.", efectos: { mangos: -350, aguante: 15, karma: 10, conciencia: 5 },
      resultado: ["Pagás una pizza que no pediste y la compartís con nueve personas dadas vuelta. Es una comunión.",
                  "Nunca averiguás quién la pidió. Se come igual."] },
    { label: "Invitarlo a sentarse en la ronda.", efectos: { karma: 15, conciencia: 18 },
      resultado: ["Se sienta diez minutos. Dice tres cosas. Las tres son mejores que todo lo que dijo el guía.",
                  "«Yo hago esto ocho horas por día», dice. «Ya no pienso en nada.» El retiro entero se queda mudo."] },
    { label: "Aprovechar el caos para robar el pedido.", efectos: { aguante: 12, karma: -15, paranoia: 12 },
      resultado: ["Te llevás la caja al fondo y comés solo, en el baño, como un animal ilustrado.",
                  "Nadie sabe dónde está la comida. Vos sí. Es un secreto miserable."] },
    { label: "Pedirle que te lleve.", requiere: { stats: { paranoia: { min: 50 } } }, requisitoTexto: "Paranoia 50",
      efectos: { paranoia: -25, conciencia: 8, aguante: -5, karma: -5 }, flags: { set: ["se_fue_temprano"] },
      resultado: ["Te subís atrás de la moto sin casco y sin explicación. A los veinte minutos estás en una avenida y respirás.",
                  "«¿Adónde?» «A cualquier lado.» «Ah», dice, y arranca. Los grandes no preguntan dos veces."] }
  ]
},

{
  id: "ev_mantra_equivocado", categoria: "trip", tramo: [2, 3], peso: 11, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior"] }, personaje: { tags: ["guru", "ritual"] } },
  ascii: "loto",
  variantes: [
    { texto: [
      "Repetís el mantra ocho mil veces. A la vez cinco mil te das cuenta de que lo estás diciendo mal.",
      "{personaje.nombre} confirma que sí, que lo estabas diciendo mal, y que lo que estuviste invocando durante tres horas es «más o menos lo contrario».",
      "Pregunta, con genuina curiosidad, si notás algo raro en {escenario}."
    ]},
    { texto: [
      "Tres horas de sílabas. La lengua se te durmió y la cabeza se te fue a otra parte y volvió sin avisar.",
      "«¿Vos qué estás diciendo?», te pregunta {personaje.nombre}, y se le va el color de la cara mientras lo pregunta.",
      "«Bueno», dice. «Pará. Pará un segundo.»"
    ]}
  ],
  opciones: [
    { label: "Mirar alrededor.", efectos: { paranoia: 25, conciencia: 15 }, flags: { set: ["invoco_algo"] },
      resultado: ["Mirás. Hay algo en el rincón que no estaba y que no se va cuando pestañeás.",
                  "Girás la cabeza despacio. La habitación está igual. Igual pero con una cosa de más."] },
    { label: "No mirar. Nunca.", efectos: { conciencia: 10, paranoia: 8 }, flags: { set: ["no_miro"] },
      resultado: ["Cerrás los ojos y los mantenés cerrados cuarenta minutos. Escuchás perfectamente que hay algo.",
                  "Decidís no mirar y sostenés esa decisión el resto de la run. Es tu logro más grande."] },
    { label: "Seguir repitiéndolo mal, a propósito.", efectos: { karma: -20, conciencia: 30, paranoia: 20, efecto: 10 },
      resultado: ["Seguís. {^personaje.nombre} se levanta y se va de la habitación, que es toda la información que necesitabas.",
                  "Lo repetís más fuerte. Nadie te acompaña. La ronda se disuelve en once minutos."] },
    { label: "Pedirle que te enseñe a decirlo bien.", efectos: { conciencia: 12, karma: 8, aguante: -5 },
      resultado: ["Cuarenta minutos de corrección fonética con un tipo que tampoco sabe. Salís peor pero acompañado.",
                  "Te lo corrige tres veces y las tres versiones son distintas. Lo notás y no lo decís."] }
  ]
},

{
  id: "ev_gemelas_contradiccion", categoria: "trip", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior", "naturaleza"] }, personaje: { tags: ["trip", "ritual", "social"] }, complicacion: { tags: ["misterio", "astral", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} habla en plural aunque esté sola, y a veces se contesta.",
      "Canaliza a una entidad en {escenario}. La entidad tiene opiniones muy específicas sobre tu situación laboral.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Él dice que ya sabés», te informa {personaje.nombre}, con los ojos cerrados y la voz una octava más baja.",
      "Después abre los ojos, vuelve a su voz normal, y pregunta si querés agua.",
      "El cambio es tan limpio que no sabés a cuál de las dos creerle."
    ]}
  ],
  opciones: [
    { label: "Preguntarle a la entidad algo que solo vos sepas.", efectos: { conciencia: 12, paranoia: 15 },
      riesgo: { prob: 0.3, efectos: { paranoia: 25, conciencia: 8 }, resultado: ["Contesta bien. Contesta exacto. Hay una explicación racional y no se te ocurre ninguna en este momento."] },
      resultado: ["Falla por poco, de un modo que igual te deja pensando toda la noche.",
                  "Contesta con una generalidad perfecta. Es una profesional."] },
    { label: "Creerle todo y pedir instrucciones.", efectos: { conciencia: 6, karma: 3, paranoia: 10, mangos: -200 },
      resultado: ["Te da siete instrucciones. Vas a cumplir dos, y de las dos una te va a servir.",
                  "«Tenés que perdonar a alguien», dice. Es siempre lo mismo y siempre funciona."] },
    { label: "Decirle que se está inventando todo.", efectos: { conciencia: 10, karma: -8, paranoia: 8 },
      resultado: ["Se ríe. «Y vos también», te contesta. Se hace un silencio de esos que valen más que la charla.",
                  "No se defiende. Se pone triste. Eso es peor que si se hubiera defendido."] }
  ]
},

/* ---------------- TRAMO 3: LA CAÍDA / EL AFTER ---------------- */

{
  id: "ev_ego_astral", categoria: "combate", tramo: [3, 4], peso: 13, unlock: null,
  slots: { escenario: { tags: ["astral", "interior", "trip"] }, personaje: { tags: ["ego", "astral"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "Se te para enfrente. Sos vos, pero con la ropa que usabas a los diecinueve y una seguridad que nunca tuviste.",
      "Te empieza a enumerar, en orden cronológico y con fechas, cada cosa que dijiste para caer bien.",
      "No grita. Es peor: tiene razón."
    ]},
    { texto: [
      "En {escenario} aparece {personaje.nombre} y no hay ninguna duda sobre quién es.",
      "«Vos no viniste a iluminarte», te dice. «Viniste a tener una anécdota.»",
      "Y con eso te desarma todo el tramo anterior en once palabras."
    ]},
    { texto: [
      "Primero es un reflejo. Después el reflejo se adelanta medio segundo. Después se adelanta entero.",
      "Se sienta cómodo, cruza las piernas como vos no las cruzás, y empieza a hablar de tu hermano.",
      "Vas a tener que hacer algo con esto."
    ]}
  ],
  opciones: [
    { label: "Pelearlo.", tirada: { stat: "aguante", dificultad: 55 },
      exito: { efectos: { conciencia: 22, aguante: -12, karma: 5 }, resultado: ["Le ganás. No sabés cómo se gana algo así pero pasó, y te quedás con la respiración cortada y un silencio nuevo adentro.",
                  "Lo agarrás del cuello y se deshace como humo. Era eso: había que animarse."] },
      fallo: { efectos: { aguante: -28, paranoia: 22, conciencia: 5 }, resultado: ["Te gana. Te gana fácil, porque te conoce. Quedás en el piso escuchando tu propia voz enumerando cosas.",
                  "Perdés y encima con estilo, que es lo que más duele."] },
      resultado: [] },
    { label: "Abrazarlo.", efectos: { conciencia: 25, karma: 15, aguante: -10, paranoia: -10 },
      resultado: ["Se queda quieto. No sabe qué hacer con esto porque nadie se lo hizo nunca. Se te deshace en los brazos y llorás como un pelotudo, con provecho.",
                  "Lo abrazás. Dice «pará» dos veces y a la tercera se calla."] },
    { label: "Ofrecerle un porro.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 20, conciencia: 6, paranoia: 8 }, flags: { set: ["ego_pendiente"] },
      resultado: ["Fuman en silencio. No se resuelve nada. Se va diciendo «seguimos después», y va a cumplir.",
                  "Acepta. Se sientan como dos conocidos incómodos. En algún momento se levanta y se va sin despedirse."] },
    { label: "Darle la razón y proponerle sociedad.", requiere: { stats: { karma: { max: -20 } } }, requisitoTexto: "Karma ≤ -20",
      efectos: { karma: -20, mangos: 600, conciencia: 15, paranoia: 10 }, flags: { set: ["socio_del_ego"] },
      resultado: ["«Tenés razón en todo», le decís. «Trabajemos juntos.» Y por primera vez se queda sin texto.",
                  "Se ríe con genuina admiración. «Vos vas a llegar lejos», dice. Y da miedo porque es un elogio."] }
  ]
},

{
  id: "ev_after_de_after", categoria: "trip", tramo: [3], peso: 12, unlock: null,
  slots: { escenario: { tags: ["interior", "noche", "quimico", "urbano"] }, personaje: { tags: ["quimico", "social"] }, complicacion: { tags: ["quimico", "trip", "social"] } },
  variantes: [
    { texto: [
      "Son las nueve y veinte de la mañana en {escenario} y las persianas están bajas por decisión colectiva.",
      "Quedan seis personas, cuatro conversaciones y ninguna coincide.",
      "{personaje.nombre} está explicando su plan de vida por tercera vez con variantes."
    ]},
    { texto: [
      "El after del after es un lugar y también un estado jurídico.",
      "En {escenario} alguien puso un tema de doce minutos y nadie tiene la autoridad para cambiarlo.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Seguir.", efectos: { efecto: 30, aguante: -20, conciencia: 5, paranoia: 15 },
      resultado: ["Seguís. Es la decisión más fácil y la más caras de todas.",
                  "Dos horas más. En algún momento se hace mediodía y eso no se puede tapar con una persiana."] },
    { label: "Irte a la mierda a dormir.", efectos: { aguante: 20, efecto: -25, paranoia: -12, conciencia: 8 },
      resultado: ["Te levantás sin despedirte. Afuera hay sol y eso es una agresión, pero una agresión honesta.",
                  "Salís y el aire de la calle te pega como un cachetazo bueno."] },
    { label: "Ponerte a hablar en serio con {personaje.nombre}.", efectos: { conciencia: 18, karma: 12, efecto: 10, aguante: -12 },
      resultado: ["Cuarenta minutos de verdad pura a las diez de la mañana. Nada de esto se va a recordar bien y todo va a quedar.",
                  "Se cae la careta de los dos al mismo tiempo. Es incómodo y necesario."] },
    { label: "Preguntar si queda algo.", requiere: { stats: { mangos: { min: 150 } } }, requisitoTexto: "$150",
      efectos: { mangos: -150, efecto: 35, paranoia: 20, aguante: -12 },
      riesgo: { prob: 0.35, efectos: { efecto: 20, paranoia: 15 }, resultado: ["Lo que te venden no es lo que te dijeron. Te enterás a los veinte minutos, por vía experimental."] },
      resultado: ["Queda. Siempre queda. Ese es el problema estructural del after.",
                  "«Un toque», dice alguien, y ese «un toque» tiene el peso de una hora y media."] }
  ]
},

{
  id: "ev_llamada_perdida", categoria: "dialogo", tramo: [3, 4], peso: 9, unlock: null,
  requiere: { stats: { paranoia: { min: 40 } } },
  slots: { escenario: {}, complicacion: { tags: ["personal", "paranoia", "social"] } },
  ascii: "celular",
  variantes: [
    { texto: [
      "Catorce llamadas perdidas. Cuatro números distintos. Uno es de un teléfono fijo, y eso en 2025 es una amenaza.",
      "En {escenario}, con 4% de batería, tenés que elegir a quién le devolvés el llamado.",
      "{^complicacion}."
    ]},
    { texto: [
      "El celular se prende, muestra las notificaciones, y se apaga de nuevo. Alcanzás a leer tres palabras.",
      "Las tres palabras eran suficientes.",
      "En {escenario} no hay cargador y hay que decidir con lo que se tiene."
    ]}
  ],
  opciones: [
    { label: "Devolver el llamado.", efectos: { paranoia: -25, conciencia: 10, karma: 10 },
      riesgo: { prob: 0.4, efectos: { paranoia: 15, aguante: -8, conciencia: 5 }, resultado: ["Era una mala noticia. De las que se venían. Escuchás dos minutos y se te corta el teléfono en el peor momento."] },
      resultado: ["Era menos grave de lo que armaste en la cabeza. Es siempre menos grave. Nunca aprendés.",
                  "Atiende alguien que no esperabas y la conversación va a lugares mejores de lo previsto."] },
    { label: "Apagar el teléfono y tirarlo en el fondo del bolso.", efectos: { paranoia: 18, karma: -8, conciencia: 5 },
      resultado: ["Lo apagás. La paz dura once minutos y después el silencio del bolso empieza a hacer ruido.",
                  "Fuera de servicio. Sos, por un rato, inalcanzable y también inencontrable."] },
    { label: "Mandar un mensaje que diga «después te llamo».", efectos: { paranoia: -8, karma: -3, conciencia: 3 },
      resultado: ["Cinco palabras y el gasto del 1% de batería. Compraste tiempo con moneda ajena.",
                  "Lo mandás. Contestan «ok» en dos segundos y ese «ok» tiene doce capas."] }
  ]
},

{
  id: "ev_guardia_madrugada", categoria: "descanso", tramo: [3, 4], peso: 10, unlock: null,
  requiere: { stats: { aguante: { max: 40 } } },
  slots: { escenario: { tags: ["cuerpo", "interior", "urbano"] }, personaje: { tags: ["cuidadora", "cuerpo"] } },
  ascii: "guardia",
  variantes: [
    { texto: [
      "Terminás en {escenario} con un número en la mano y una explicación que no vas a poder dar.",
      "{personaje.nombre}, {personaje.mote}, te toma la presión y no hace comentarios, lo cual es un acto de misericordia.",
      "«¿Consumiste algo?», pregunta, con la lapicera lista y cero juicio en la voz."
    ]},
    { texto: [
      "El tubo fluorescente. La silla de plástico. El turno 47. La certeza absoluta de haber llegado a un lugar.",
      "{personaje.desc}. Pasa cada veinte minutos y cada vez que pasa te mira un segundo más.",
      "En la cuarta pasada se sienta al lado tuyo sin decir nada."
    ]}
  ],
  opciones: [
    { label: "Decir la verdad completa.", efectos: { aguante: 25, conciencia: 15, karma: 10, paranoia: -18, efecto: -30 },
      resultado: ["Se lo contás todo, con nombres y cantidades. Te trata mejor que cualquiera en toda la run.",
                  "«Bueno», dice, y anota. «Gracias por decirme.» Y te pone suero."] },
    { label: "Mentir por vergüenza.", efectos: { aguante: 8, karma: -8, paranoia: 12 },
      riesgo: { prob: 0.45, efectos: { aguante: -18, paranoia: 15 }, resultado: ["Te dan algo que reacciona mal con lo que no dijiste. Cuarenta minutos muy malos que eran evitables."] },
      resultado: ["«Nada, un mareo.» Asiente y anota otra cosa. Los dos saben.",
                  "Mentís mal, con lujo de detalles, y eso es peor que mentir mal sin detalles."] },
    { label: "Irte antes de que te llamen.", efectos: { aguante: -12, paranoia: 15, conciencia: 5 },
      resultado: ["Te levantás en el turno 44. Nadie te frena. Afuera hace frío y es la mejor decisión de la peor lista.",
                  "Salís caminando y a la media cuadra tenés que apoyarte en una pared. Pero salís."] },
    { label: "Pedirle que te hable de cualquier cosa.", efectos: { aguante: 15, conciencia: 18, karma: 12, paranoia: -20 },
      resultado: ["Te cuenta del turno noche, de su hija, de un tipo que entró hace dos años. Es la mejor conversación de tu vida y dura once minutos.",
                  "Habla y habla y vos escuchás y en algún momento se te acomoda el pulso solo."] }
  ]
},

{
  id: "ev_don_elio", categoria: "dialogo", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "naturaleza", "interior"] }, personaje: { tags: ["veterano", "guru"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, mira todo desde una silla en {escenario} y no participa de nada.",
      "«En el 74 esto era otra cosa», dice, sin que nadie le pregunte.",
      "Y después, mucho más bajo: «era peor, ojo. Pero era otra cosa.»"
    ]},
    { texto: [
      "Setenta y nueve años y una tranquilidad que no se puede fingir.",
      "{personaje.nombre} está sentado en {escenario} tomando mate solo, viendo pasar el circo.",
      "Cuando te sentás al lado, te ofrece el mate sin mirarte."
    ]}
  ],
  opciones: [
    { label: "Preguntarle qué aprendió en cincuenta años.", efectos: { conciencia: 22, karma: 8, aguante: -3 },
      resultado: ["«A esperar», dice. Y no agrega nada más durante veinte minutos, demostrándolo.",
                  "Tarda mucho en contestar. La respuesta son cuatro palabras y te dura toda la run."] },
    { label: "Contarle lo que te está pasando.", efectos: { conciencia: 14, karma: 10, paranoia: -15 },
      resultado: ["Escucha entero, sin interrumpir, sin consejo. Al final dice «sí». Solo eso. Alcanza.",
                  "Te deja hablar veinte minutos y después te llena el mate. Es un método."] },
    { label: "Preguntarle si esto sirve para algo.", efectos: { conciencia: 12, paranoia: 8 },
      resultado: ["«¿Esto? No», dice. «Vos sí, tal vez.» Y sigue con el mate.",
                  "«Sirve para pasar el tiempo hasta que se te acomode algo solo», dice. Es un manual completo."] },
    { label: "Ofrecerle de lo que tenés.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 15, karma: 12, conciencia: 15, aguante: -5 },
      resultado: ["Acepta con una naturalidad de sesenta años de práctica. Fuman en silencio viendo la ronda desde afuera.",
                  "«Hace veinte años que no», dice, y agarra. Se ríe solo un rato largo."] }
  ]
},

{
  id: "ev_contador_numeros", categoria: "dialogo", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior"] }, personaje: { tags: ["esceptico", "turbio", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, hizo los números del retiro y no puede parar de decirlos.",
      "«Once personas por doscientos cincuenta mil, menos el alquiler del galpón, menos la comida...» y sigue.",
      "El resultado es un número que te arruina la noche y no podés dejar de escucharlo."
    ]},
    { texto: [
      "En {escenario} hay un tipo con una libreta que no está anotando revelaciones.",
      "Está anotando ingresos. {^personaje.desc}.",
      "«Mirá», te dice, y te muestra la hoja. La hoja es demoledora."
    ]}
  ],
  opciones: [
    { label: "Mirar los números.", efectos: { conciencia: 15, karma: -5, paranoia: 12 },
      resultado: ["Los ves. Son peores de lo que imaginabas y son públicos si alguien se molesta en mirar. Nadie se molesta.",
                  "Cuatro columnas y un total. El total es un insulto redondeado hacia arriba."] },
    { label: "Decirle que se relaje, que no todo es plata.", efectos: { conciencia: 6, karma: 5, paranoia: -5 },
      resultado: ["«Todo es plata», te contesta. «Lo demás es marketing.» Y guarda la libreta con violencia.",
                  "Te mira con una lástima profunda. «Vos pagaste el completo, ¿no?»"] },
    { label: "Proponerle montar uno propio.", efectos: { karma: -20, mangos: 700, conciencia: 10 }, flags: { set: ["socio_del_contador"] },
      resultado: ["En cuarenta minutos tienen un plan de negocios completo escrito en una servilleta. Es el momento más lúcido y más turbio del retiro.",
                  "«Vos ponés la cara, yo pongo los números», dice. Se dan la mano. Algo se rompió y algo se ganó."] },
    { label: "Preguntarle qué hace realmente acá.", efectos: { conciencia: 18, karma: 8 },
      resultado: ["Se queda callado. «Mi mujer me obligó», dice al final. «Y estoy peor que cuando llegué.» Es honesto y da pena.",
                  "«Estoy con licencia psiquiátrica», dice. «Los números son lo único que me ordena la cabeza.» Ah."] }
  ]
},

{
  id: "ev_lavadero_madrugada", categoria: "descanso", tramo: [1, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["interior", "noche", "ritual"] }, complicacion: { tags: ["social", "trip", "misterio"] } },
  variantes: [
    { texto: [
      "Terminás en {escenario} a las cuatro y media de la mañana sin ropa para lavar.",
      "El zumbido de los tambores hace de mantra y no cobra nada, que es más de lo que se puede decir de otros mantras.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay una silla de plástico, luz blanca, y ocho máquinas girando sin dueño visible.",
      "Te sentás. Es cálido. Es el lugar más seguro en el que estuviste en catorce horas.",
      "En el reflejo del vidrio se te ve peor de lo que te sentís, o mejor, no queda claro."
    ]}
  ],
  opciones: [
    { label: "Quedarte a mirar girar la ropa.", efectos: { conciencia: 14, paranoia: -18, aguante: 10, efecto: -15 },
      resultado: ["Cuarenta minutos de tambor girando. Es lo más parecido a la meditación que vas a lograr en toda la run.",
                  "No pensás en nada. Nada de nada. Es gratis y es histórico."] },
    { label: "Dormir en la silla de plástico.", efectos: { aguante: 18, paranoia: -10, efecto: -20, karma: -3 },
      resultado: ["Dos horas con la cabeza contra el vidrio. Te despierta el encargado con una amabilidad inesperada.",
                  "Dormís mal y sirve igual. El cuerpo no es exigente cuando está así."] },
    { label: "Lavar la ropa que tenés puesta.", efectos: { aguante: 8, conciencia: 10, mangos: -100, karma: 3 },
      resultado: ["Te quedás en calzoncillos en un lavadero a las cinco de la mañana. Es la escena más honesta del viaje.",
                  "Cuarenta minutos esperando en ropa interior. Nadie entra. Si entraran, tampoco pasaría nada."] }
  ]
},

{
  id: "ev_deuda_cobra", categoria: "combate", tramo: [2, 3, 4], peso: 10, unlock: null,
  requiere: { stats: { mangos: { max: 0 } } },
  slots: { escenario: { tags: ["urbano", "conurbano"] }, personaje: { tags: ["lumpen", "comercio", "turbio"] } },
  ascii: "cadena",
  variantes: [
    { texto: [
      "{personaje.nombre} te está esperando en {escenario} y no está apoyado en la pared por casualidad.",
      "No levanta la voz. Los que cobran de verdad nunca levantan la voz.",
      "«Che», dice. Con eso alcanza."
    ]},
    { texto: [
      "Hay una cuenta abierta y hay alguien que la lleva. Los dos hechos se juntan en {escenario}.",
      "{personaje.desc}. Te sonríe, y la sonrisa es un ítem del procedimiento.",
      "«Ni te pregunto si la tenés», dice. «Te pregunto cuándo.»"
    ]}
  ],
  opciones: [
    { label: "Pagar lo que puedas.", efectos: { mangos: -400, paranoia: -15, karma: 5 },
      resultado: ["Le das todo lo que tenés en el bolsillo. Lo cuenta. Dice «bueno» y se va. El «bueno» es un aplazo, no un perdón.",
                  "Pagás una parte. Anota el resto en la cabeza, que es donde se anota en serio."] },
    { label: "Pedir más tiempo.", tirada: { stat: "karma", dificultad: 10 },
      exito: { efectos: { paranoia: 8, karma: -3 }, resultado: ["Te da dos semanas. Te lo da porque le caes bien, y caer bien es un activo que nunca supiste administrar."] },
      fallo: { efectos: { aguante: -20, paranoia: 25, conciencia: 5 }, resultado: ["No hay más tiempo. Lo que sigue es breve, técnico y sin insultos. Te queda un dolor en las costillas y una fecha exacta."] },
      resultado: [] },
    { label: "Ofrecerle un servicio espiritual a cambio.", efectos: { conciencia: 12, karma: -8, paranoia: 10 },
      riesgo: { prob: 0.5, efectos: { aguante: -15, paranoia: 20 }, resultado: ["Se ríe cuatro segundos y después deja de reírse de golpe, que es la parte fea."] },
      resultado: ["Increíblemente, acepta. Le tenés que leer las cartas a la madre el domingo. Es una deuda peor pero es una deuda nueva.",
                  "«¿Me vas a limpiar el aura?», dice. Y después: «dale, probá.» Y funciona algo."] },
    { label: "Correr.", tirada: { stat: "aguante", dificultad: 50 },
      exito: { efectos: { aguante: -15, paranoia: 20, karma: -5 }, resultado: ["Corrés seis cuadras y te salvás por hoy. El problema con correr es que la deuda no se cansa."] },
      fallo: { efectos: { aguante: -30, mangos: -200, paranoia: 25 }, resultado: ["Te alcanza en la segunda cuadra porque corre todos los días y vos no. Lo que sigue es rápido."] },
      resultado: [] }
  ]
},

{
  id: "ev_meditar_serio", categoria: "descanso", tramo: [1, 2, 3, 4], peso: 12, unlock: null,
  slots: { escenario: {}, complicacion: {} },
  ascii: "loto",
  variantes: [
    { texto: [
      "Te sentás derecho en {escenario} y decidís, con una solemnidad que da un poco de vergüenza, meditar en serio.",
      "Los primeros cuatro minutos son una lista de tareas. Los siguientes seis son una discusión que tuviste en 2019.",
      "En el minuto once pasa algo distinto."
    ]},
    { texto: [
      "Nadie te ve. Eso es lo que hace que valga.",
      "{^escenario}: {escenario.detalle}. Y vos ahí, sentado, sin público, haciendo lo único que nadie te enseñó bien.",
      "{^complicacion}, y la incorporás. Es lo que hay."
    ]},
    { texto: [
      "Cerrás los ojos sin ceremonia. Sin cuenco, sin guía, sin recibo.",
      "Al principio te duele la espalda de una manera muy elocuente.",
      "Después la espalda se calla y aparece el otro ruido, el de adentro, que es el que viniste a escuchar."
    ]}
  ],
  opciones: [
    { label: "Quedarte hasta que se acomode.", efectos: { conciencia: 16, paranoia: -15, aguante: -5, efecto: -10 }, medita: true,
      resultado: ["Cuarenta minutos. No hay luces, no hay entidades, no hay nada. Y algo se corrió de lugar igual.",
                  "En un momento dejás de estar esperando que pase algo, y ahí pasa."] },
    { label: "Cortar a los cinco minutos.", efectos: { conciencia: 4, paranoia: -4 },
      resultado: ["Cinco minutos. Es poco y es más que ayer.",
                  "Te levantás con las piernas dormidas y una humildad nueva."] },
    { label: "Meditar pidiendo algo concreto.", efectos: { conciencia: 8, karma: -5, paranoia: 5 },
      resultado: ["Meditás con una lista de pedidos, lo cual técnicamente es rezar con otro nombre y menos honestidad.",
                  "Pedís cuatro cosas. Ninguna llega. Una empieza a llegar tres tramos después."] },
    { label: "Meditar con Efecto alto y ver qué pasa.", requiere: { stats: { efecto: { min: 45 } } }, requisitoTexto: "Efecto 45",
      efectos: { conciencia: 24, paranoia: 15, efecto: -10, aguante: -8 }, medita: true,
      riesgo: { prob: 0.35, efectos: { paranoia: 25, conciencia: 5 }, resultado: ["Te vas demasiado lejos y el camino de vuelta no está señalizado. Tardás dos horas en volver a la habitación donde estás sentado."] },
      resultado: ["Con el químico adentro la meditación es un tobogán en vez de una escalera. Llegás más rápido y con menos control.",
                  "Se abre. Se abre de una manera que después no vas a poder replicar sobrio, y eso es una trampa."] }
  ]
}

]);
