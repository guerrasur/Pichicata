/* PICHICATA — pack A4: Plano Astral Bajo. 13 eventos. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "as_pasillo_infinito", categoria: "trip", tramo: [3, 4], peso: 11, unlock: "A4",
  requiere: { stats: { efecto: { min: 40 } } },
  slots: { escenario: { tags: ["astral"] }, complicacion: { tags: ["astral", "trip"] } },
  ascii: "puerta",
  variantes: [
    { texto: [
      "Es el pasillo de tu casa de la infancia pero más largo, y las puertas están todas del mismo lado.",
      "Sabés cuántas puertas había. Ahora hay más.",
      "{^complicacion}."
    ]},
    { texto: [
      "Caminás y el pasillo se extiende exactamente a la velocidad a la que caminás, lo cual es una broma vieja del universo.",
      "Detrás de una de las puertas se escucha la tele de un domingo de 1994.",
      "Podés abrirla. Podés seguir. Podés darte vuelta, aunque darse vuelta acá no es lo que era."
    ]}
  ],
  opciones: [
    { label: "Abrir la puerta con la tele.", efectos: { conciencia: 25, karma: 8, paranoia: 18, aguante: -10 },
      resultado: ["Está todo. Está exacto. Está tu vieja de espaldas y no te das vuelta a mirarla porque sabés cómo funciona esto.",
                  "Abrís y hay una habitación de tres metros por tres con una tele encendida y nadie. Lloras parado en la puerta."] },
    { label: "Seguir caminando hasta el final.", pericia: "conciencia", efectos: { conciencia: 20, paranoia: 20, aguante: -15 },
      resultado: ["No hay final. Eso era la enseñanza y era gratis y la pagaste con dos horas.",
                  "Después de mucho caminar el pasillo desemboca en el mismo lugar donde arrancaste, y ahí entendés algo grande."] },
    { label: "Sentarte en el piso del pasillo y esperar.", efectos: { conciencia: 22, paranoia: -12 }, medita: true,
      resultado: ["Te sentás en las baldosas. El pasillo, sin nadie que lo camine, deja de crecer. Lección aprendida.",
                  "Esperás. Se acorta. Los espacios astrales responden a la quietud, no a la voluntad."] },
    { label: "Gritar para que alguien te escuche.", efectos: { paranoia: 28, conciencia: 12, aguante: -12 },
      resultado: ["Gritás y el grito vuelve cuatro veces con distintas voces y una es la tuya de nene.",
                  "Nadie contesta. En un lugar así, nadie contestar es la peor respuesta disponible."] }
  ]
},

{
  id: "as_supermercado_vacio", categoria: "trip", tramo: [3, 4], peso: 10, unlock: "A4",
  slots: { escenario: { tags: ["astral"] }, complicacion: { tags: ["astral", "misterio"] } },
  variantes: [
    { texto: [
      "Un supermercado enorme, iluminado, con la música puesta, y nadie.",
      "Todas las góndolas tienen el mismo producto y el producto no tiene nombre ni etiqueta.",
      "{^complicacion}."
    ]},
    { texto: [
      "Las cajas están abiertas. Los carritos están alineados. Hay ofertas anunciadas por altavoz para nadie.",
      "Levantás un producto de la góndola y pesa exactamente lo que esperabas que pesara, lo cual es lo más raro de todo.",
      "En el fondo, la puerta de los empleados está entreabierta."
    ]}
  ],
  opciones: [
    { label: "Entrar por la puerta de los empleados.", pericia: "aguante", efectos: { conciencia: 25, paranoia: 22, aguante: -10 },
      resultado: ["Del otro lado hay un depósito y en el depósito hay una silla y en la silla hay alguien que te estaba esperando de espaldas.",
                  "Es un pasillo de servicio que da a otro supermercado idéntico. Cerrás la puerta con mucho cuidado."] },
    { label: "Llenar un carrito y pasar por caja.", efectos: { conciencia: 18, karma: 5, paranoia: 15 },
      resultado: ["Llenás el carro, pasás por caja, no hay nadie, y aun así esperás tu turno cuatro minutos. Eso dice todo sobre vos.",
                  "Pasás por caja y el lector pita solo. El ticket sale en blanco y te lo guardás."] },
    { label: "Comer algo de la góndola.", efectos: { aguante: 12, conciencia: 15, paranoia: 18 },
      resultado: ["No tiene gusto a nada y te llena igual. Vas a pensar en esto cada vez que comas por un tiempo.",
                  "Tiene gusto a algo que comiste a los siete años. Te sentás en el piso del pasillo cuatro."] },
    { label: "Salir por donde entraste.", efectos: { conciencia: 12, paranoia: -12, efecto: -12 },
      resultado: ["Volvés sobre tus pasos y las puertas automáticas te abren y afuera está todo igual y es de día.",
                  "Salir era una opción. No siempre es una opción. Aprovechaste."] }
  ]
},

{
  id: "as_playa_negra", categoria: "trip", tramo: [3, 4], peso: 10, unlock: "A4",
  slots: { escenario: { tags: ["astral", "naturaleza"] }, personaje: { tags: ["astral", "misterio", "animal"] } },
  variantes: [
    { texto: [
      "Una playa de arena negra donde el mar no hace ruido. La espuma queda quieta cuando llega, como pintada.",
      "Hay huellas y no son tuyas y van hacia el agua y no vuelven.",
      "{personaje.nombre} está sentado al borde, mirando el horizonte que no tiene nada."
    ]},
    { texto: [
      "El agua no moja. Le metés la mano y sale seca, y eso te tranquiliza y te horroriza en el mismo gesto.",
      "El silencio del mar es lo más difícil de sostener: falta un sonido que el cuerpo espera desde antes de nacer.",
      "{personaje.desc}, a veinte metros, no se da vuelta."
    ]}
  ],
  opciones: [
    { label: "Meterte al agua.", pericia: "aguante", efectos: { conciencia: 28, paranoia: 20, aguante: -15 },
      resultado: ["Caminás hacia adentro. No te tapa nunca. Después de mucho caminar te das vuelta y la orilla está a dos metros.",
                  "Entrás y no pasa nada y esa nada es enorme. Volvés seco y distinto."] },
    { label: "Sentarte al lado de {personaje.nombre}.", efectos: { conciencia: 22, karma: 12, paranoia: -12 },
      resultado: ["Se sientan juntos sin hablar mucho tiempo. En algún momento dice una frase de seis palabras que te resuelve un problema de años.",
                  "No se da vuelta ni una vez. Pero cuando te vas, dice «gracias». Y no sabés por qué."] },
    { label: "Seguir las huellas.", pericia: "conciencia", efectos: { conciencia: 20, paranoia: 25, aguante: -12 },
      resultado: ["Las seguís hasta el agua. En la orilla hay un par de zapatillas prolijamente acomodadas y son de tu talle.",
                  "Las huellas se pierden. Cuando te das vuelta, tus propias huellas también se están borrando."] },
    { label: "Gritarle al mar.", efectos: { conciencia: 16, karma: 5, paranoia: 12, aguante: -8 },
      resultado: ["Gritás todo. El mar se lo come sin devolver nada, que es exactamente lo que necesitabas de un mar.",
                  "Gritás cuatro minutos. Al terminar te sentás y tenés hambre, y tener hambre después de eso es una buena señal."] }
  ]
},

{
  id: "as_cocina_de_tu_vieja", categoria: "trip", tramo: [3, 4], peso: 11, unlock: "A4",
  slots: { escenario: { tags: ["astral", "interior"] }, personaje: { tags: ["astral", "familia", "cuidadora"] }, complicacion: { tags: ["astral", "trip"] } },
  variantes: [
    { texto: [
      "Es la cocina de tu vieja, exacta, incluso el imán del delivery de 2011.",
      "Está todo bien salvo que la ventana da a un lugar que no es el patio.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay olor a puchero. Está la radio prendida en la AM. Está el repasador colgado del mismo gancho.",
      "En la mesa hay dos tazas servidas y una es la tuya, la de la franja azul.",
      "{personaje.nombre} está de espaldas, en la pileta, lavando algo."
    ]}
  ],
  opciones: [
    { label: "Sentarte y tomar el mate/café que está servido.", efectos: { conciencia: 25, karma: 15, paranoia: -15, aguante: 12 },
      resultado: ["Te sentás y tomás. Está a la temperatura correcta. No hablás. Es de las mejores cosas que te pasaron.",
                  "Tomás en silencio y en algún momento te apoya una mano en el hombro al pasar y ya está, ya alcanzó."] },
    { label: "Hablarle.", pericia: "karma", efectos: { conciencia: 22, karma: 18, paranoia: 15 },
      resultado: ["Le decís lo que nunca le dijiste. No se da vuelta. Sigue lavando. Pero contesta, y contesta bien.",
                  "Hablás cuatro minutos seguidos. Cuando terminás, dice: «ya sé, m'hijo». Y sigue con los platos."] },
    { label: "Mirar por la ventana.", pericia: "conciencia", efectos: { conciencia: 20, paranoia: 28 },
      resultado: ["Mirás. No es el patio. No es nada que puedas describir. Cerrás la cortina y te sentás de nuevo.",
                  "Del otro lado hay una ciudad que no existe, de noche, con las luces prendidas. Te quedás mirando demasiado."] },
    { label: "Irte de la cocina antes de romper algo.", efectos: { conciencia: 14, paranoia: -12, karma: 5, efecto: -15 },
      resultado: ["Sabés cómo termina esto si te quedás. Te vas. Es maduro y duele.",
                  "Salís por la puerta de la cocina y caés de nuevo en el mundo, sentado, con la boca seca."] }
  ]
},

{
  id: "as_sala_de_espera", categoria: "trip", tramo: [3, 4], peso: 10, unlock: "A4",
  slots: { escenario: { tags: ["astral"] }, personaje: { tags: ["ego", "astral"] } },
  ascii: "guardia",
  variantes: [
    { texto: [
      "Una sala de espera sin puertas donde todos tienen tu cara.",
      "Hay revistas de 1997 y están todas en blanco. Hay un número en la pared y el número no avanza.",
      "Uno de ellos, sentado enfrente, te hace un gesto: «vos sos el que sigue»."
    ]},
    { texto: [
      "Catorce personas esperando y las catorce sos vos en distintos momentos del día y de la vida.",
      "Nadie habla. Todos saben cómo funciona.",
      "El de la esquina, el más viejo, te mira con una lástima que no vas a poder olvidar."
    ]}
  ],
  opciones: [
    { label: "Esperar tu turno como corresponde.", efectos: { conciencia: 22, paranoia: 12, aguante: -8 },
      resultado: ["Esperás. Mucho. Cuando te llaman, la puerta que se abre no estaba antes, y del otro lado hay un consultorio vacío con una silla.",
                  "Esperás hasta que no queda nadie más. Entonces entendés que el turno era la espera."] },
    { label: "Hablar con el más viejo.", efectos: { conciencia: 25, karma: 10, paranoia: 15 },
      resultado: ["Te dice dos cosas. La primera es un consejo práctico sobre tu espalda. La segunda te reordena la run entera.",
                  "«No hagas lo que hice», dice, y te da un detalle exacto que no podés ignorar."] },
    { label: "Buscar la salida.", efectos: { conciencia: 15, paranoia: 22, aguante: -10 },
      resultado: ["No hay puertas. Caminás el perímetro dos veces contando pasos. Los números no cierran.",
                  "En la tercera vuelta aparece una puerta donde antes había pared. La habías generado con la insistencia."] },
    { label: "Sentarte a leer una revista en blanco.", efectos: { conciencia: 18, paranoia: -12 },
      resultado: ["La lees igual. En la página cuatro hay algo escrito y es tu letra y es de hoy.",
                  "Pasás las páginas en blanco cuarenta minutos y la ansiedad se te va del cuerpo. Funciona."] }
  ]
},

{
  id: "as_dique_seco", categoria: "trip", tramo: [3, 4], peso: 9, unlock: "A4",
  slots: { escenario: { tags: ["trip", "naturaleza", "remoto", "astral"] }, complicacion: { tags: ["astral", "misterio"] } },
  variantes: [
    { texto: [
      "El lecho del dique está seco y se ve el pueblo que taparon cuando lo llenaron.",
      "Las paredes siguen ahí. Hay una iglesia sin techo y una calle con cordón.",
      "{^complicacion}."
    ]},
    { texto: [
      "Caminás por una calle que estuvo cuarenta años abajo del agua.",
      "Hay barro seco, rajado, y en el barro hay objetos: una cuchara, un zapato, un marco de puerta.",
      "Lo que sea que le pasó a este lugar le pasó despacio y con aviso."
    ]}
  ],
  opciones: [
    { label: "Entrar a la iglesia sin techo.", pericia: "aguante", efectos: { conciencia: 24, karma: 10, paranoia: 15 },
      resultado: ["Adentro hay bancos de cemento y el cielo. Te sentás en uno. No rezás. Igual pasa algo.",
                  "Hay una hornacina vacía donde estuvo un santo cuarenta años. Le dejás {objeto} adentro."] },
    { label: "Levantar un objeto del barro y llevártelo.", pericia: "aguante", efectos: { conciencia: 15, karma: -8, paranoia: 18 }, daReliquia: true,
      resultado: ["Te llevás algo que no es tuyo de un lugar que no es de nadie. Esa ecuación no cierra y lo vas a sentir.",
                  "Lo limpias con la manga. Es más viejo que vos y ahora es tuyo."] },
    { label: "Quedarte hasta que caiga el sol.", efectos: { conciencia: 20, aguante: -15, paranoia: -12 }, medita: true,
      resultado: ["El atardecer sobre un pueblo ahogado. No hay una imagen mejor disponible en esta run.",
                  "Se hace de noche y el pueblo hace ruidos de pueblo. No corrés. Te quedás."] },
    { label: "Irte rápido.", efectos: { conciencia: 8, paranoia: -18, aguante: 5 },
      resultado: ["Subís la barranca sin mirar atrás. Fue prudente. Vas a volver en sueños de todos modos.",
                  "Te vas. En el auto o en el bondi de vuelta, no podés hablar por veinte minutos."] }
  ]
},

{
  id: "as_animal_habla", categoria: "trip", tramo: [3, 4], peso: 10, unlock: "A4",
  slots: { escenario: {}, personaje: { tags: ["animal"] } },
  ascii: "jaguar",
  variantes: [
    { texto: [
      "El animal te dice una cosa. Breve, correcta y muy incómoda.",
      "No mueve la boca. No hace falta. En {escenario} las reglas están suspendidas por reforma.",
      "Después se queda esperando, porque hizo una pregunta y no un comentario."
    ]},
    { texto: [
      "{personaje.desc}. Te mira desde un metro y medio con una atención que ningún humano te dio nunca.",
      "Lo que dice tiene once palabras y cuatro de ellas son tu nombre completo.",
      "Está esperando una respuesta y no tiene apuro."
    ]}
  ],
  opciones: [
    { label: "Contestarle la verdad.", efectos: { conciencia: 28, karma: 15, paranoia: 12 },
      resultado: ["Contestás en voz alta, solo, en un lugar donde alguien te podría escuchar. No te importa. Era la respuesta.",
                  "Decís la verdad y el animal parpadea una vez y se va. El trámite estaba cumplido."] },
    { label: "Preguntarle quién es.", efectos: { conciencia: 20, paranoia: 22 },
      resultado: ["«Vos sabés», dice. Es la peor respuesta y la única disponible.",
                  "No contesta. Vuelve a hacer la misma pregunta, igual, con el mismo tono. Van a estar acá un rato."] },
    { label: "No contestar y sostenerle la mirada.", efectos: { conciencia: 22, paranoia: 18, aguante: -8 },
      resultado: ["Cuatro minutos de mirada. Gana él. Los animales siempre ganan esto.",
                  "Sostenés. En algún momento el que baja la vista es el animal, y eso te asusta más."] },
    { label: "Irte.", efectos: { conciencia: 8, paranoia: 25, karma: -8 },
      resultado: ["Te vas. La pregunta te sigue caminando dos pasos atrás por el resto de la run.",
                  "Das media vuelta. Escuchás que repite la pregunta a tus espaldas, más bajo."] }
  ]
},

{
  id: "as_reloj_412", categoria: "trip", tramo: [3, 4], peso: 9, unlock: "A4",
  slots: { escenario: {}, complicacion: { tags: ["trip", "astral"] } },
  ascii: "reloj",
  variantes: [
    { texto: [
      "Son las 4:12. Hace un rato eran las 4:12. Mirás el celular, el reloj de la pared y un reloj pulsera, y los tres dicen 4:12.",
      "En {escenario} nada más está mal. Solo eso.",
      "{^complicacion}."
    ]},
    { texto: [
      "El minutero no avanza y vos sí, y esa diferencia empieza a ser un problema práctico.",
      "Contás sesenta segundos en voz alta mirando el reloj. Al terminar sigue en 4:12.",
      "Alguien más en la habitación también lo notó y decidió no mencionarlo."
    ]}
  ],
  opciones: [
    { label: "Aprovechar el tiempo detenido.", efectos: { conciencia: 25, paranoia: 15 }, medita: true,
      resultado: ["Si el tiempo no corre, no hay apuro. Te sentás y meditás lo que en cualquier otra circunstancia sería una hora.",
                  "Usás el tiempo roto para pensar una cosa entera de principio a fin. Nunca lo habías hecho."] },
    { label: "Romper el reloj.", pericia: "aguante", efectos: { paranoia: 22, conciencia: 12, karma: -8 },
      resultado: ["Lo tirás al piso. La hora sigue siendo 4:12 en todos los otros dispositivos. Rompiste un reloj inocente.",
                  "El vidrio se raja y el minutero avanza un minuto. 4:13. Y ahí se queda."] },
    { label: "Preguntarle la hora a alguien.", efectos: { conciencia: 15, paranoia: 18, karma: 3 },
      resultado: ["«Cuatro y doce», te contesta, sin mirar nada. Le agradecés y te alejás despacio.",
                  "«Y yo qué sé», te dice, y esa respuesta te devuelve al mundo por dos minutos."] },
    { label: "Salir a buscar un lugar donde el tiempo funcione.", efectos: { conciencia: 18, aguante: -12, paranoia: -12, efecto: -15 },
      resultado: ["Caminás hasta una estación de servicio. El reloj de la caja dice 6:40. Volviste. Compras un café.",
                  "Cuarenta cuadras hasta encontrar un reloj que ande. Cuando lo encontrás te apoyás en una pared y respirás."] }
  ]
},

{
  id: "as_tu_propio_velorio", categoria: "trip", tramo: [4], peso: 10, unlock: "A4",
  slots: { escenario: { tags: ["astral", "interior"] }, personaje: { tags: ["familia", "social"] } },
  ascii: "tumba",
  variantes: [
    { texto: [
      "Es tu velorio y está bastante bien organizado, hay que reconocerlo.",
      "Vinieron menos de los que esperabas y más de los que merecías, y las dos cosas duelen distinto.",
      "{personaje.nombre} está en un rincón diciendo algo sobre vos que no es lo que dice en público."
    ]},
    { texto: [
      "Hay café en vasitos y un cartel con tu nombre mal escrito.",
      "Nadie te ve. Podés escuchar todo, que es la peor de las superpotencias.",
      "En la fila de las condolencias hay alguien que no debería estar y está."
    ]}
  ],
  opciones: [
    { label: "Escuchar todo lo que dicen de vos.", pericia: "conciencia", efectos: { conciencia: 28, karma: 5, paranoia: 20, aguante: -10 },
      resultado: ["Escuchás dos horas. Cuatro cosas te destruyen y una te salva. La que te salva la dice el que menos esperabas.",
                  "Aparecen dos personas que no sabías que te querían. Eso solo justifica todo el evento."] },
    { label: "Ir a escuchar al que está en el rincón.", efectos: { conciencia: 22, karma: -8, paranoia: 22 },
      resultado: ["Lo que dice es cierto y es horrible y lo dice sin maldad, y eso es lo que no vas a poder acomodar.",
                  "Está llorando y diciendo cosas malas de vos al mismo tiempo, y ahí entendés a la gente."] },
    { label: "Buscar al que no debería estar.", efectos: { conciencia: 25, karma: 12, paranoia: 15 },
      resultado: ["Vino. Después de todo lo que pasó, vino. Te sentás al lado y no podés hacer nada más que estar.",
                  "Está en la última fila y se va antes del final, sin firmar el libro. Te sacude más que cualquier discurso."] },
    { label: "Irte del velorio.", efectos: { conciencia: 18, paranoia: -15, karma: 8 },
      resultado: ["Decidís no mirar más. Es tu velorio y te vas antes, que es un derecho.",
                  "Salís a la vereda. Es de tarde. Hay pibes jugando a la pelota y ese sonido te trae de vuelta."] }
  ]
},

{
  id: "as_mina_boca", categoria: "trip", tramo: [3, 4], peso: 9, unlock: "A4",
  slots: { escenario: { tags: ["trip", "remoto", "naturaleza"] }, complicacion: { tags: ["misterio", "astral"] } },
  variantes: [
    { texto: [
      "De la boca de la mina sale un aire fresco que no debería estar fresco.",
      "Adentro está oscuro de una manera que la palabra oscuro no cubre.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay una vía de vagoneta oxidada que entra y no se ve dónde termina.",
      "Tirás una piedra y no escuchás cuándo cae, y eso no es normal en ninguna geología conocida.",
      "El aire que sale huele levemente a pan."
    ]}
  ],
  opciones: [
    { label: "Entrar veinte metros y volver.", pericia: "aguante", efectos: { conciencia: 20, paranoia: 20, aguante: -10 },
      resultado: ["Veinte metros contados. A los dieciocho escuchás una respiración que no es tuya. Volvés caminando, no corriendo, y eso te salva.",
                  "Entrás, contás, volvés. Cumplís el plan exactamente. Vas a soñar con los dos metros que no caminaste."] },
    { label: "Entrar hasta donde llegue el coraje.", efectos: { conciencia: 28, paranoia: 30, aguante: -18 },
      riesgo: { prob: 0.4, efectos: { aguante: -20, paranoia: 20 }, resultado: ["Te pasás. Tardás dos horas en volver y en algún momento perdés la referencia de la salida. La encontrás. Casi."] },
      resultado: ["Llegás lejos. Lo que hay al fondo es una cámara con las paredes lisas y no fue hecha con herramientas.",
                  "Caminás hasta que la linterna del celu se apaga. Vuelves con las manos, tocando la pared. Salís cambiado."] },
    { label: "Quedarte en la boca, sentado, escuchando.", efectos: { conciencia: 22, paranoia: 12 }, medita: true,
      resultado: ["Una hora sentado escuchando la montaña respirar. No hace falta entrar a ningún lado. Nunca hizo falta.",
                  "Escuchás. Hay un ritmo. Te acomodás a ese ritmo y sale el sol."] },
    { label: "Dejar una ofrenda y no entrar.", efectos: { conciencia: 16, karma: 15, paranoia: -12 },
      resultado: ["Dejás {objeto} en una piedra plana a la entrada. A la mañana no está. Hay muchas explicaciones y elegís la buena.",
                  "Dejás algo y te vas. Es la relación correcta con un lugar así."] }
  ]
},

{
  id: "as_todos_tu_cara", categoria: "combate", tramo: [4], peso: 10, unlock: "A4",
  slots: { escenario: { tags: ["astral"] }, personaje: { tags: ["ego", "astral"] }, complicacion: { tags: ["astral", "trip"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "Son ocho y todos son vos y ninguno está de acuerdo con los otros siete.",
      "Discuten sobre vos en tercera persona con un nivel de detalle que da miedo.",
      "{^complicacion}."
    ]},
    { texto: [
      "El vos de los diecinueve, el de los treinta, el de la semana pasada, y cinco más que no reconocés.",
      "Uno de ellos está claramente peor que todos y los otros lo están señalando.",
      "Te piden que arbitres. Sos, técnicamente, el menos calificado."
    ]}
  ],
  opciones: [
    { label: "Ponerte del lado del que está peor.", efectos: { conciencia: 28, karma: 20, paranoia: 12, aguante: -10 },
      resultado: ["Te sentás al lado del peor de todos y los otros siete se callan. Ahí se termina la discusión y empieza otra cosa.",
                  "Lo defendés sin argumentos. Es lo único que había que hacer y nadie más lo iba a hacer."] },
    { label: "Darles la razón a todos y disolver la asamblea.", efectos: { conciencia: 22, karma: 8, paranoia: -12 },
      resultado: ["«Tienen razón todos», decís, y con eso se van desarmando de a uno, sin drama.",
                  "No hay síntesis. Hay ocho verdades. Aceptarlo los apaga."] },
    { label: "Elegir uno y quedarte con ese.", efectos: { conciencia: 15, karma: -12, paranoia: 20 },
      resultado: ["Elegís el que te conviene y los otros siete no se van: se quedan en el fondo, mirando, por el resto de la run.",
                  "Elegís al de los diecinueve. Es un error clásico y muy caro."] },
    { label: "Irte de la habitación y dejarlos discutiendo.", efectos: { conciencia: 18, paranoia: 15, aguante: 8 },
      resultado: ["Cerrás la puerta. Se los escucha discutir de fondo por un rato largo y después se apagan.",
                  "Te vas. Es la primera vez que dejás una discusión sobre vos mismo sin participar. Es un logro enorme."] }
  ]
},

{
  id: "as_luz_propia", categoria: "trip", tramo: [3, 4], peso: 9, unlock: "A4",
  slots: { escenario: { tags: ["ritual", "astral", "naturaleza"] }, personaje: { tags: ["autentico", "cuidadora", "social"] } },
  ascii: "loto",
  variantes: [
    { texto: [
      "Una persona del grupo emite una luz tenue que nadie más registra.",
      "No es una metáfora en este momento. Es una luz, mínima, en el borde del cuerpo.",
      "Es {personaje.nombre}, que está lavando algo o comiendo algo, sin ninguna solemnidad."
    ]},
    { texto: [
      "Lo ves y no lo podés dejar de ver: {personaje.nombre} tiene un contorno de luz de un milímetro y medio.",
      "Nadie más lo comenta. Miras alrededor buscando confirmación y no hay.",
      "{personaje.desc}. Sigue haciendo lo suyo."
    ]}
  ],
  opciones: [
    { label: "Decírselo.", efectos: { conciencia: 20, karma: 10, paranoia: 15 },
      resultado: ["Se ríe. «Estás muy dado vuelta», dice, con cariño. Pero después, más bajo: «no le digas a nadie».",
                  "«Ya sé», dice, y sigue lavando. Y con eso te desarma el resto del tramo."] },
    { label: "Quedarte mirando en silencio.", pericia: "conciencia", efectos: { conciencia: 25, paranoia: 12 },
      resultado: ["Mirás cuarenta minutos. La luz no cambia. Vos sí.",
                  "No decís nada. Lo miras hacer cosas comunes con luz alrededor. Es la mejor cosa que viste."] },
    { label: "Preguntarle a otro si ve lo mismo.", efectos: { conciencia: 12, paranoia: 22 },
      resultado: ["«¿Qué?», te dice, y te mira las pupilas. Eso zanja el tema y no lo zanja.",
                  "Nadie ve nada. Volvés a mirar y sigue ahí. Ahora tenés un problema de dos frentes."] },
    { label: "Pedirle que te enseñe.", pericia: "karma", efectos: { conciencia: 22, karma: 15, aguante: -8 },
      resultado: ["«No hay nada que enseñar», dice. «Ayudame con esto.» Y te pasa un balde. Y esa es la enseñanza.",
                  "Te pone a trabajar al lado suyo cuatro horas. En la hora tres entendés."] }
  ]
}

]);
