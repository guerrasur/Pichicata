/* PICHICATA — pack A2: El Retiro Mal Organizado. 13 eventos. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "rt_dieta_previa", categoria: "dialogo", tramo: [1, 2], peso: 10, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["guru", "ritual"] }, complicacion: { tags: ["cuerpo", "social"] } },
  variantes: [
    { texto: [
      "«Tres días de dieta», había dicho {personaje.nombre}. Sin sal, sin carne, sin alcohol, sin sexo.",
      "En la ronda de {escenario} pregunta quién la cumplió. Levantan la mano once de once, lo cual es estadísticamente imposible.",
      "{^complicacion}."
    ]},
    { texto: [
      "El protocolo llegó por WhatsApp, en un audio de nueve minutos, hace cuatro días.",
      "Vos escuchaste los primeros dos minutos.",
      "{personaje.nombre} pasa lista de restricciones y en la tercera te empezás a preocupar."
    ]}
  ],
  opciones: [
    { label: "Admitir que no cumpliste nada.", efectos: { karma: 12, conciencia: 14, paranoia: -10 },
      resultado: ["Levantás la mano y decís la verdad. Se ríe medio retiro de alivio. Otros tres admiten después de vos.",
                  "«Comí milanesa anteayer», confesás. {^personaje.nombre} suspira. «Bueno. Al menos uno es honesto.»"] },
    { label: "Mentir como todos.", pericia: "karma", efectos: { karma: -8, paranoia: 12, conciencia: 3 }, flags: { set: ["mintio_dieta"] },
      resultado: ["Levantás la mano con los demás. Es un pacto colectivo de silencio y funciona hasta que algo salga mal.",
                  "Mentís sin esfuerzo, que es lo que te tiene que preocupar."] },
    { label: "Preguntar para qué sirve la dieta.", efectos: { conciencia: 12, karma: 3, paranoia: 5 },
      resultado: ["La explicación tiene una parte razonable, una parte inventada y una parte que suena a que la inventó otro.",
                  "«Es para limpiar el cuerpo», dice. Insistís. La segunda explicación contradice la primera."] },
    { label: "Delatar al que sabés que comió asado.", pericia: "karma", efectos: { karma: -15, conciencia: 5, paranoia: 15 },
      resultado: ["Lo delatás y se arma un clima que va a durar todo el fin de semana. Ganaste nada.",
                  "«Él comió chorizo», decís. Once cabezas giran. Es un momento muy malo y lo generaste vos."] }
  ]
},

{
  id: "rt_no_pega", categoria: "trip", tramo: [2], peso: 11, unlock: "A2",
  requiere: { flags: { any: ["tomo_aya"] } },
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["guru", "ritual"] }, complicacion: { tags: ["social", "misterio"] } },
  ascii: "cuenco",
  variantes: [
    { texto: [
      "Pasaron dos horas y no pasa nada. Nada de nada.",
      "Alrededor tuyo, en {escenario}, hay diez personas atravesando cosas enormes y vos estás pensando en una factura de luz.",
      "{^complicacion}."
    ]},
    { texto: [
      "A vos no te pegó. Es peor de lo que suena.",
      "Estás lúcido en una habitación de gente que no lo está, lo cual te transforma en el único testigo sobrio de una escena difícil de mirar.",
      "{personaje.nombre} te ve la cara y se acerca. «¿Nada?» Nada."
    ]}
  ],
  opciones: [
    { label: "Pedir otra toma.", efectos: { efecto: 45, conciencia: 12, aguante: -15, paranoia: 10 },
      riesgo: { prob: 0.4, efectos: { efecto: 20, aguante: -15, paranoia: 20 }, resultado: ["La segunda pega con la primera y se juntan. Cuatro horas de un lugar del que no hay tarjeta postal."] },
      resultado: ["Segunda toma. A los cuarenta minutos entendés que la primera había estado haciendo algo, en silencio.",
                  "Tomás de nuevo. Esta vez sí. Y sí de más."] },
    { label: "Aceptar que hoy no era, y cuidar a los demás.", efectos: { conciencia: 20, karma: 22, aguante: -12, paranoia: -12 },
      resultado: ["Pasás cuatro horas trayendo agua, sosteniendo cabezas y limpiando. Es el trabajo espiritual más real de todo el retiro.",
                  "Te convertís en enfermero de la ronda. Nadie se va a acordar mañana. Vos sí."] },
    { label: "Fingir que te está pegando.", pericia: "karma", efectos: { karma: -12, conciencia: -5, paranoia: 18 },
      resultado: ["Actuás un trance durante tres horas. Es agotador, es humillante y nadie te descubre, lo cual es lo peor.",
                  "Te sacudís, gemís, lloras a pedido. Sos bueno actuando y eso te deja pensando cosas incómodas."] },
    { label: "Salir a caminar y volver a la madrugada.", efectos: { conciencia: 14, aguante: -8, paranoia: -10 },
      resultado: ["Caminás dos horas afuera. A las cuatro y media, solo, sin nada en el cuerpo, se te acomoda algo por su cuenta.",
                  "Te vas y volvés. Nadie notó tu ausencia, y eso también es una enseñanza del retiro."] }
  ]
},

{
  id: "rt_grito_ajeno", categoria: "combate", tramo: [2], peso: 10, unlock: "A2",
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["social", "joven"] }, personaje2: { tags: ["guru", "cuidadora"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} empieza a gritar en {escenario} y no es un grito de trance: es un grito de miedo.",
      "{personaje2.nombre} intenta contenerlo con una técnica que claramente está improvisando.",
      "Hay diez personas dadas vuelta y una situación que se está saliendo de cauce."
    ]},
    { texto: [
      "El grito viene del fondo y dura once segundos y después arranca otro.",
      "Nadie sabe qué hacer porque nadie preparó esto, porque nadie prepara nada.",
      "{personaje.desc}, en el piso, contra la pared, mirando un punto."
    ]}
  ],
  opciones: [
    { label: "Ir y quedarte al lado sin hacer nada.", efectos: { conciencia: 22, karma: 20, aguante: -10, paranoia: 8 },
      resultado: ["Te sentás al lado y no hacés nada. A los veinte minutos se calma agarrándote la muñeca. Era eso.",
                  "No hablás, no toques, no expliqués. Solo estás. Es el manual completo y lo escribiste ahora."] },
    { label: "Tomar el mando y ordenar la escena.", pericia: "conciencia", efectos: { conciencia: 15, karma: 15, paranoia: 12, aguante: -12 },
      resultado: ["Pedís espacio, agua y luz baja. Funciona. {^personaje2.nombre} te lo va a agradecer sin admitir que lo necesitaba.",
                  "Organizás a cuatro personas en veinte segundos. Se resuelve. Después te tiembla la mano."] },
    { label: "Quedarte en tu lugar y no intervenir.", efectos: { conciencia: 5, karma: -8, paranoia: 18 },
      resultado: ["No te movés. Se resuelve sin vos, más lento y peor. Vas a revisar esta decisión bastante.",
                  "Te quedás. Cerrás los ojos. Los gritos entran igual."] },
    { label: "Llamar a una ambulancia.", efectos: { conciencia: 14, karma: 12, paranoia: 20 }, flags: { set: ["llamo_ambulancia"] },
      resultado: ["Llamás. Llega en cuarenta minutos y no hacía falta, pero podría haber hecho falta. {^personaje2.nombre} te va a odiar y estuvo bien.",
                  "El retiro se termina para todos cuando aparece la luz azul en el portón. Salvaste algo que quizás no estaba en peligro."] }
  ]
},

{
  id: "rt_ceremonia_cara", categoria: "comercio", tramo: [2], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["chanta", "guru", "comercio"] } },
  variantes: [
    { texto: [
      "Hay un segundo nivel de retiro y cuesta cuatro veces más.",
      "{personaje.nombre} te lo cuenta en {escenario} en voz baja, como un secreto, que es la técnica de venta más vieja del mundo.",
      "«El grupo chico es otra cosa», dice. Y probablemente sea cierto, y ese es el problema."
    ]},
    { texto: [
      "«Vos ya estás para el intensivo», te dice {personaje.nombre}, y te muestra un precio en el celular en vez de decirlo.",
      "El número es un mes de alquiler.",
      "«Se paga en tres, si querés.» Siempre se paga en tres."
    ]}
  ],
  opciones: [
    { label: "Pagar el intensivo.", efectos: { mangos: -1500, conciencia: 20, karma: -5, paranoia: 8 }, flags: { set: ["pago_intensivo"] },
      resultado: ["Pagás una fortuna y es, honestamente, mucho mejor. La estafa a veces incluye el producto.",
                  "Tres cuotas. Grupo de cuatro personas. Es otra cosa. Te da rabia que sea otra cosa."] },
    { label: "Decirle que no tenés la plata.", pericia: "karma", efectos: { conciencia: 10, karma: 8, paranoia: -5 },
      resultado: ["Se lo decís sin vergüenza. Cambia de tema y te trata igual, lo cual lo hace un poco menos chanta de lo que pensabas.",
                  "«Bueno, cuando puedas», dice, y anota tu número, que es peor que insistir."] },
    { label: "Pedirle una beca.", efectos: { conciencia: 12, karma: 5, paranoia: 8 },
      riesgo: { prob: 0.5, efectos: { karma: -5, paranoia: 10 }, resultado: ["«No manejamos becas», dice, y en cuatro palabras te aclara todo el modelo de negocio."] },
      resultado: ["Te la da, a cambio de que ayudes en la cocina y la logística. Es el mejor trato del viaje.",
                  "Acepta a medias: mitad de precio si traés a dos. Ahora sos parte de la cadena."] },
    { label: "Ofrecerle organizar el próximo a cambio de entrar gratis.", pericia: "karma", efectos: { mangos: 200, karma: -10, conciencia: 15 }, flags: { set: ["socio_del_chanta"] },
      resultado: ["Le proponés un intercambio y acepta en cuatro segundos, lo que revela cuánto necesitaba a alguien que organice.",
                  "Cerrás trato. Ahora estás del otro lado del mostrador y todavía no sabés qué significa eso."] }
  ]
},

{
  id: "rt_confesion_ronda", categoria: "dialogo", tramo: [2, 3], peso: 10, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["social"] }, complicacion: { tags: ["emocional", "social"] } },
  variantes: [
    { texto: [
      "En la ronda de cierre, en {escenario}, {personaje.nombre} confiesa algo que nadie pidió que confesara.",
      "Es grande. Es de las cosas que cambian cómo mirás a una persona para siempre.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Yo tengo que decir una cosa», arranca {personaje.nombre}, y once personas se acomodan en las sillas.",
      "Lo que sigue son cuatro minutos difíciles de escuchar y necesarios de escuchar.",
      "Cuando termina, mira al piso y espera. Alguien tiene que hablar."
    ]}
  ],
  opciones: [
    { label: "Ser el primero en hablar y agradecerle.", efectos: { conciencia: 20, karma: 20, paranoia: -12 },
      resultado: ["Decís cuatro palabras y alcanzan. Se rompe el hielo y después hablan todos. Hiciste lo más difícil.",
                  "«Gracias por decirlo», decís, y esa frase le cambia la noche a alguien."] },
    { label: "Confesar algo propio del mismo tamaño.", pericia: "karma", efectos: { conciencia: 22, karma: 15, paranoia: 15 },
      resultado: ["Contás lo tuyo. Te sale peor de lo que esperabas y mejor de lo que temías. Alguien te agarra la mano.",
                  "Se te quiebra la voz dos veces. Nadie mira el reloj."] },
    { label: "Quedarte callado.", efectos: { conciencia: 8, karma: -5, paranoia: 12 },
      resultado: ["El silencio dura demasiado y lo rompe otro. Vas a pensar en el momento en que no hablaste.",
                  "No decís nada. Después, afuera, se lo decís a solas, que es la mitad del gesto y no es poco."] },
    { label: "Cortar el clima con una salida rápida.", efectos: { karma: -12, paranoia: 10, conciencia: 3 },
      resultado: ["Metés un chiste y se salva el momento incómodo y se pierde el momento importante. Fue tu decisión.",
                  "«Bueno, ¿comemos?» dices. Once personas exhalan y una se queda mirando el piso."] }
  ]
},

{
  id: "rt_baño_unico", categoria: "descanso", tramo: [2], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "precario"] }, personaje: { tags: ["social"] }, complicacion: { tags: ["cuerpo", "precario"] } },
  variantes: [
    { texto: [
      "Un baño. Catorce personas. Una sustancia con efectos gastrointestinales documentados.",
      "En {escenario} se formó una fila que no es una fila: es un sistema de turnos negociado en tiempo real.",
      "{^complicacion}."
    ]},
    { texto: [
      "La puerta del baño lleva veinte minutos cerrada y adentro hay alguien que no contesta.",
      "Detrás tuyo hay cuatro personas con la misma urgencia y una solidaridad que se está agotando.",
      "{personaje.nombre} propone «ir al fondo, atrás del limonero». Nadie lo descarta."
    ]}
  ],
  opciones: [
    { label: "Ir atrás del limonero.", efectos: { aguante: 8, conciencia: 12, karma: 5, paranoia: -8 },
      resultado: ["El limonero. Cuatro personas a distintas alturas del jardín, en silencio, mirando cada uno su propio horizonte. Es un cuadro.",
                  "Volvés a lo básico de una manera literal. Hay algo purificador y hay algo humillante y son la misma cosa."] },
    { label: "Golpear la puerta y preguntar si está bien.", pericia: "aguante", efectos: { karma: 15, conciencia: 12, paranoia: 8 },
      resultado: ["No contesta. Insistís. A la tercera contesta con una voz muy chiquita. Entrás y ayudás. Hiciste bien.",
                  "«¿Estás bien?» Silencio. «¿Estás bien?» «No.» Y ahí empieza lo importante."] },
    { label: "Aguantar y esperar tu turno con dignidad.", pericia: "aguante", efectos: { aguante: -12, conciencia: 10, paranoia: 12 },
      resultado: ["Cuarenta minutos de disciplina. Ganás algo abstracto y perdés algo muy concreto.",
                  "Aguantás. Es un ejercicio espiritual válido y nadie te lo va a reconocer."] },
    { label: "Organizar el sistema de turnos.", pericia: "conciencia", efectos: { karma: 18, conciencia: 14, aguante: -5 },
      resultado: ["Anotás nombres en un papel y lo pegás en la puerta con cinta. Catorce personas te obedecen agradecidas.",
                  "Con una lista y dos reglas resolvés el problema más urgente del retiro. La burocracia también salva."] }
  ]
},

{
  id: "rt_maestro_dormido", categoria: "dialogo", tramo: [2], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["guru"] }, complicacion: { tags: ["social", "absurdo"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} se durmió. En el medio de la ceremonia, sentado, con la espalda recta.",
      "Nueve personas creen que está en un trance profundo. Vos escuchaste el ronquido.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay una diferencia técnica entre el samadhi y la siesta y la diferencia se escucha.",
      "En {escenario}, {personaje.nombre} lleva cuarenta minutos «sosteniendo el espacio» con la boca abierta.",
      "Alguien tiene que decidir qué se hace con esto."
    ]}
  ],
  opciones: [
    { label: "Dejarlo dormir y sostener la ronda vos.", efectos: { conciencia: 20, karma: 15, aguante: -10 }, flags: { set: ["sostuvo_ronda"] },
      resultado: ["Tomás el lugar sin anunciarlo. Cantás, pasás agua, marcás los tiempos. Nueve personas no se enteran de nada. Es tu mejor hora.",
                  "Sostenés dos horas. Cuando se despierta, dice «bien» y se atribuye todo. No te importa."] },
    { label: "Despertarlo con disimulo.", efectos: { karma: 8, conciencia: 8, paranoia: 5 },
      resultado: ["Le tocás la rodilla. Se despierta de golpe y dice «exacto» a nadie. Se recupera con una habilidad de años.",
                  "Un carraspeo fuerte alcanza. Nadie se dio cuenta. Le acabás de salvar el negocio."] },
    { label: "Decir en voz alta que está dormido.", efectos: { conciencia: 12, karma: -12, paranoia: 15 },
      resultado: ["«Está dormido», anunciás. Se desarma todo en tres segundos. Tenías razón y arruinaste algo que le servía a nueve personas.",
                  "Se despierta con el escándalo. Te va a mirar distinto el resto del retiro."] },
    { label: "Dormirte también.", efectos: { aguante: 20, conciencia: 8, karma: 5, efecto: -15 },
      resultado: ["Te dormís sentado, derecho, con la espalda impecable. Once personas creen que hay dos maestros en trance.",
                  "Dos horas de sueño en posición de loto. Es la única iluminación disponible y la aprovechás."] }
  ]
},

{
  id: "rt_ícaro_propio", categoria: "trip", tramo: [2, 3], peso: 9, unlock: "A2",
  requiere: { stats: { efecto: { min: 35 } } },
  slots: { escenario: { tags: ["ritual"] }, complicacion: { tags: ["ritual", "trip", "astral"] } },
  ascii: "tambor",
  variantes: [
    { texto: [
      "Te sale una canción. No la conocés. No la escuchaste nunca. Está entera, con letra.",
      "En {escenario} nadie te está mirando y eso es una oportunidad o una trampa.",
      "{^complicacion}."
    ]},
    { texto: [
      "Empieza como un zumbido en el pecho y a los dos minutos tiene melodía y a los cuatro tiene palabras en un idioma que no es un idioma.",
      "Sabés perfectamente que si abrís la boca, sale.",
      "También sabés que once personas te van a escuchar."
    ]}
  ],
  opciones: [
    { label: "Cantar fuerte.", pericia: "conciencia", efectos: { conciencia: 24, karma: 12, paranoia: 15, aguante: -8 },
      resultado: ["Cantás nueve minutos. Se te suman tres. Cuando termina nadie aplaude, que es la mejor respuesta posible.",
                  "Sale entera y sale bien. Al día siguiente no la vas a poder reconstruir y eso está bien."] },
    { label: "Cantarla bajito solo para vos.", pericia: "conciencia", efectos: { conciencia: 18, paranoia: -12 },
      resultado: ["La cantás en un susurro, para adentro. Nadie la escucha. No pierde nada por eso.",
                  "Se te queda una parte. Vas a tararearla en un colectivo en tres meses y se te van a llenar los ojos."] },
    { label: "Tragártela.", efectos: { conciencia: 5, paranoia: 20, karma: -5 },
      resultado: ["Cerrás la boca y aguantás. Se va. Se va del todo. Vas a pensar en esto muchas veces.",
                  "La vergüenza gana por dos a cero. Es una derrota vieja y conocida."] },
    { label: "Grabarla con el celular.", pericia: "karma", efectos: { conciencia: 10, karma: -5, paranoia: 10 },
      resultado: ["Grabás cuarenta segundos. Mañana los vas a escuchar y va a ser un tipo desafinado gimiendo. Y aun así los vas a guardar.",
                  "El audio queda. El audio nunca es lo que pasó."] }
  ]
},

{
  id: "rt_rufina_sabe", categoria: "dialogo", tramo: [2, 3], peso: 10, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "naturaleza", "remoto"] }, personaje: { tags: ["autentico", "guru"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, no vende nada, no explica nada, y no te mira como te mira el resto.",
      "Está sentada en un banquito en {escenario} pelando algo, y el retiro entero le pasa por al lado sin verla.",
      "Cuando te ve, deja de pelar."
    ]},
    { texto: [
      "Hay una diferencia entre los que hablan del asunto y los que están en el asunto, y la diferencia se nota en dos segundos.",
      "{personaje.desc}.",
      "«Vos estás buscando en el lugar equivocado», te dice. Y no lo dice con superioridad: lo dice como quien te avisa que se te cayó algo."
    ]}
  ],
  opciones: [
    { label: "Preguntarle cuál es el lugar correcto.", efectos: { conciencia: 22, karma: 10, paranoia: -12 },
      resultado: ["«En tu casa», dice. Y vuelve a pelar. Cuatro palabras que valen todo lo que pagaste y más.",
                  "No contesta con palabras. Te señala el suelo con la pera. Tardás dos días en entenderlo."] },
    { label: "Quedarte a ayudarla en silencio.", efectos: { conciencia: 25, karma: 20, aguante: -8, paranoia: -18 },
      resultado: ["Dos horas pelando en silencio al lado de ella. No pasa nada. Pasa todo. No te va a poder explicar esto a nadie.",
                  "Te pasa el cuchillo sin decir nada. Trabajan hasta que se hace de noche."] },
    { label: "Contarle todo tu proceso.", pericia: "karma", efectos: { conciencia: 12, karma: 5, paranoia: 8 },
      resultado: ["Hablás catorce minutos. Cuando terminás dice «mmm». Ese «mmm» es un diagnóstico completo y no es bueno.",
                  "Te escucha entero. «Mucha palabra», dice al final. Y no hay forma de discutirlo."] },
    { label: "Ofrecerle plata por una sesión privada.", pericia: "karma", efectos: { mangos: -300, karma: -15, conciencia: 5, paranoia: 12 },
      resultado: ["Se ríe por primera y única vez. No te acepta la plata. Te trata mejor después, extrañamente.",
                  "«Yo no hago eso», dice, y se levanta y se va. Perdiste algo que estaba servido."] }
  ]
},

{
  id: "rt_cierre_abrazos", categoria: "descanso", tramo: [2, 3], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["social"] }, complicacion: { tags: ["emocional", "social"] } },
  variantes: [
    { texto: [
      "Ronda de cierre en {escenario}. Todos se abrazan con todos y hay que abrazar a los catorce, incluso a los tres que no te caen bien.",
      "El abrazo con {personaje.nombre} dura más de lo previsto y no por decisión tuya.",
      "{^complicacion}."
    ]},
    { texto: [
      "Se terminó. Cuarenta y ocho horas y ahora hay que despedirse de gente que viste vomitar.",
      "Hay una intimidad tramposa en esto y también hay una intimidad real, y no se distinguen.",
      "{personaje.nombre} te pide el teléfono con una sinceridad difícil de esquivar."
    ]}
  ],
  opciones: [
    { label: "Dar el teléfono y sostener el vínculo.", efectos: { karma: 15, conciencia: 12, paranoia: -10 }, flags: { set: ["contacto_retiro"] },
      resultado: ["Se lo das. Se van a escribir cuatro veces y en la tercera vas a agradecer haberlo dado.",
                  "Intercambian números. Uno de los dos va a escribir primero y va a ser él."] },
    { label: "Dar un número equivocado.", efectos: { karma: -15, paranoia: 10, conciencia: 3 },
      resultado: ["Le das un dígito cambiado. Sonríe y guarda. Es una cobardía barata y funciona.",
                  "Miente el número con una fluidez que hace pensar que ya lo hiciste antes."] },
    { label: "Abrazar en serio a los catorce.", efectos: { karma: 22, conciencia: 18, aguante: -10, paranoia: -18 },
      resultado: ["Catorce abrazos de verdad, uno por uno, mirando a la cara. Salís vaciado y liviano.",
                  "En el noveno abrazo te largás a llorar y ya no podés parar y nadie se molesta."] },
    { label: "Irte antes del cierre.", efectos: { karma: -10, conciencia: 8, paranoia: 12, aguante: 8 },
      resultado: ["Te vas mientras arman la ronda. Es la salida limpia y es una deuda.",
                  "Agarrás el bolso y te vas sin avisar. En el bondi de vuelta te sentís bien y mal en el mismo asiento."] }
  ]
},

{
  id: "rt_alguien_no_vuelve", categoria: "combate", tramo: [2, 3], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "naturaleza", "remoto"] }, personaje: { tags: ["social", "joven"] }, complicacion: { tags: ["misterio", "social"] } },
  variantes: [
    { texto: [
      "Falta uno. {^personaje.nombre} se levantó en la madrugada y no volvió, y ya son las once de la mañana.",
      "Su bolso está. Sus zapatillas están. Su celular está, con 4% de batería, arriba de {objeto}.",
      "{^complicacion}."
    ]},
    { texto: [
      "«¿Alguien vio a {personaje.nombre}?» La pregunta circula tres veces antes de que alguien se ponga serio.",
      "Alrededor de {escenario} hay campo, monte o calle, según el caso, y en todos los casos hay demasiado espacio.",
      "Se organiza una búsqueda con la eficiencia habitual del retiro, o sea con ninguna."
    ]}
  ],
  opciones: [
    { label: "Salir a buscarlo vos.", efectos: { aguante: -18, karma: 20, conciencia: 18, paranoia: 12 },
      resultado: ["Cuatro horas de búsqueda. Lo encontrás sentado en una zanja a dos kilómetros, entero, mirando el pasto. No dice nada en el camino de vuelta.",
                  "Lo encontrás vos y nadie más. Se abraza a tu brazo y caminan sin hablar cuarenta minutos."] },
    { label: "Insistir en llamar a la policía.", efectos: { karma: 12, conciencia: 12, paranoia: 22 }, flags: { set: ["llamo_policia"] },
      resultado: ["Llamás contra la opinión de todos. Aparece a las dos horas por su cuenta. Igual hiciste lo correcto y nadie te lo va a decir.",
                  "El retiro se termina cuando llega el patrullero. Te van a culpar por eso durante años."] },
    { label: "Quedarte a cuidar el campamento.", efectos: { karma: 8, conciencia: 10, aguante: 5, paranoia: 8 },
      resultado: ["Alguien tenía que quedarse. Fuiste vos. Es el rol menos heroico y era necesario.",
                  "Ordenás las cosas, hacés café, y esperás cuatro horas mirando el camino."] },
    { label: "Sugerir que se fue por su cuenta y no hacer nada.", efectos: { karma: -18, conciencia: 3, paranoia: 15 },
      resultado: ["«Se habrá ido», decís. Es cómodo y podría ser cierto. Aparece a la tarde y eso no te absuelve.",
                  "Convencés a tres personas de no buscar. Tres horas después te vas a sentir muy mal por eso."] }
  ]
},

{
  id: "rt_dinero_desaparece", categoria: "comercio", tramo: [2, 3], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["chanta", "guru"] } },
  variantes: [
    { texto: [
      "La plata del retiro estaba en una caja de zapatos y la caja de zapatos ya no está donde estaba.",
      "{personaje.nombre} lo anuncia con una calma que no coincide con el monto.",
      "Nadie sabe cuánto había, lo cual es la parte interesante del problema."
    ]},
    { texto: [
      "Se juntó plata para la comida, para el flete y para «el aporte al linaje».",
      "El aporte al linaje era el ochenta por ciento del total y nadie preguntó qué linaje.",
      "Ahora {personaje.nombre} explica que hubo «un imprevisto» y usa la palabra «imprevisto» cuatro veces en dos minutos."
    ]}
  ],
  opciones: [
    { label: "Exigir las cuentas delante de todos.", efectos: { conciencia: 18, karma: 8, paranoia: 15 },
      riesgo: { prob: 0.4, efectos: { karma: -8, paranoia: 15 }, resultado: ["Se hace un escándalo de cuarenta minutos y no aparece ninguna cuenta. El retiro se parte en dos y vos quedás como el que rompió todo."] },
      resultado: ["Pedís las cuentas y las tiene que dar. Faltan cuarenta mil pesos y el número queda flotando en la habitación para siempre.",
                  "Insistís tres veces. A la tercera aparece un cuaderno y el cuaderno es demoledor."] },
    { label: "Poner plata para cubrir el faltante.", requiere: { stats: { mangos: { min: 600 } } }, requisitoTexto: "$600",
      efectos: { mangos: -600, karma: 15, conciencia: 10 },
      resultado: ["Ponés de tu bolsillo para que la comida siga. Nadie te lo va a devolver y todos van a comer.",
                  "Cubrís el agujero. {^personaje.nombre} te agradece y ese agradecimiento es una confesión."] },
    { label: "Aprovechar el caos y recuperar lo tuyo.", efectos: { mangos: 400, karma: -12, paranoia: 12 },
      resultado: ["Sacás del sobre de la comida lo que habías puesto. Es justicia privada y es un robo, dependiendo de quién cuente.",
                  "Recuperás lo tuyo y un poco más. El «un poco más» es lo que te va a molestar."] },
    { label: "Dejarlo pasar y comer menos.", efectos: { aguante: -12, karma: 8, conciencia: 12, paranoia: -8 },
      resultado: ["No decís nada. Se come arroz dos días. Aprendés algo sobre la plata que no se aprende teniéndola.",
                  "Lo dejás pasar y se disuelve. Todos hacen como que no pasó, que es la técnica nacional."] }
  ]
},

{
  id: "rt_pareja_ronda", categoria: "dialogo", tramo: [2, 3], peso: 9, unlock: "A2",
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["social"] }, personaje2: { tags: ["social", "joven"] }, complicacion: { tags: ["conflicto", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} y {personaje2.nombre} vinieron juntos y se están separando en tiempo real, en público, en {escenario}.",
      "La ceremonia les mostró algo a los dos y no era lo mismo.",
      "{^complicacion}."
    ]},
    { texto: [
      "Vinieron a «reconectar». En la ceremonia, uno de los dos dijo en voz alta algo que era para decir en privado.",
      "Ahora hay catorce testigos de un matrimonio de nueve años cayéndose por una escalera.",
      "Los dos te miran a vos, por algún motivo, buscando arbitraje."
    ]}
  ],
  opciones: [
    { label: "Sacarlos de la ronda y dejarlos hablar solos.", pericia: "aguante", efectos: { karma: 18, conciencia: 15, aguante: -8 },
      resultado: ["Los llevás a un patio y te vas. Hablan tres horas. No vas a saber cómo terminó y no es tu asunto.",
                  "«Vayan afuera», decís. Es la intervención más útil y la menos memorable."] },
    { label: "Darles tu opinión sincera.", efectos: { conciencia: 12, karma: -8, paranoia: 12 },
      riesgo: { prob: 0.5, efectos: { karma: -12, paranoia: 15 }, resultado: ["Los dos se enojan con vos y hacen las paces entre ellos. Fue un mecanismo y vos fuiste la pieza sacrificable."] },
      resultado: ["Decís lo que ves. Uno de los dos te lo va a agradecer en dos años.",
                  "Tu opinión es correcta y no era el momento. Las dos cosas juntas."] },
    { label: "No meterte en absoluto.", efectos: { conciencia: 8, paranoia: 5 },
      resultado: ["Miras el piso con una concentración notable. Es cobarde y es sabio y en este caso son sinónimos.",
                  "No decís nada. Se resuelve o no se resuelve sin tu participación, como corresponde."] },
    { label: "Usar la situación para hablar de lo tuyo.", efectos: { conciencia: 14, karma: -10, paranoia: 8 },
      resultado: ["Aprovechás para contar tu propia separación. Es narcisismo con formato de empatía y funciona a medias.",
                  "Hablás de tu ex durante seis minutos. La pareja te escucha. Es un giro insólito y no ayuda a nadie salvo a vos."] }
  ]
}

]);
