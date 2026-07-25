/* PICHICATA — pack A3: After de After. 13 eventos. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "af_persiana_baja", categoria: "trip", tramo: [3], peso: 11, unlock: "A3",
  slots: { escenario: { tags: ["interior", "noche", "quimico"] }, personaje: { tags: ["quimico", "social"] }, complicacion: { tags: ["quimico", "trip"] } },
  variantes: [
    { texto: [
      "Son las once y cuarenta de la mañana y las persianas están bajas por decisión colectiva y unánime.",
      "En {escenario} quedan seis personas y ninguna quiere ser la primera en decir la hora.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay una rendija de luz de un centímetro en la persiana y esa rendija es el enemigo.",
      "{personaje.nombre} le pegó una toalla con cinta de embalar hace dos horas, en un acto de ingeniería desesperada.",
      "Igual entra. La luz siempre entra."
    ]}
  ],
  opciones: [
    { label: "Levantar la persiana.", pericia: "aguante", efectos: { conciencia: 18, efecto: -20, paranoia: 15, aguante: -8 },
      resultado: ["La levantás de golpe. Seis personas gritan como vampiros. Se termina el after en cuatro minutos. Sos un héroe odiado.",
                  "Entra el mediodía entero. Nadie te lo va a perdonar y todos te lo deben."] },
    { label: "Seguir como si fuera de noche.", pericia: "conciencia", efectos: { efecto: 25, aguante: -20, paranoia: 18, conciencia: 5 },
      resultado: ["Dos horas más de noche artificial. El cuerpo lleva la cuenta aunque vos no.",
                  "Alguien pone otra vez el tema de doce minutos. Es el tercer loop y nadie protesta."] },
    { label: "Irte sin decir nada.", efectos: { aguante: 15, efecto: -25, paranoia: -12, conciencia: 10 },
      resultado: ["Agarrás la campera y saludás con la mano. Afuera hay sol y un kiosco abierto y eso es una civilización entera.",
                  "Salís y te compras un jugo de naranja. Es el momento más lúcido del tramo."] },
    { label: "Cocinar algo para todos.", efectos: { aguante: 12, karma: 20, conciencia: 15, efecto: -12 },
      resultado: ["Encontrás huevos y pan. Haces revuelto para seis. Se hace un silencio de gratitud animal.",
                  "El olor a comida caliente reordena la habitación mejor que cualquier discurso."] }
  ]
},

{
  id: "af_alguien_no_esta_bien", categoria: "combate", tramo: [3], peso: 11, unlock: "A3",
  slots: { escenario: { tags: ["interior", "noche", "quimico"] }, personaje: { tags: ["joven", "quimico"] } },
  ascii: "cabeza",
  variantes: [
    { texto: [
      "{personaje.nombre} no está bien. No está «raro»: no está bien, que es otra categoría.",
      "Está sentado en el piso del baño de {escenario} con la puerta abierta y no contesta cuando le hablás.",
      "El resto sigue en la otra habitación y la música tapa todo."
    ]},
    { texto: [
      "Le pasa algo en la respiración y en el color de la cara.",
      "Hay seis personas en {escenario} y cuatro están convencidas de que «ya se le va a pasar».",
      "Vos sos el que está más cerca."
    ]}
  ],
  opciones: [
    { label: "Llamar a una ambulancia sin discutirlo con nadie.", efectos: { karma: 25, conciencia: 20, paranoia: 20 }, flags: { set: ["llamo_ambulancia"] },
      resultado: ["Llamás. Dás la dirección clara y decís exactamente qué tomó, sin filtro. Se resuelve. Hiciste lo único que había que hacer.",
                  "Llegan en veinte minutos. No hay policía, no hay causa, no hay nada. Solo un pibe que está mejor."] },
    { label: "Quedarte con él, hidratarlo y monitorearlo.", efectos: { karma: 20, conciencia: 18, aguante: -15, paranoia: 12 },
      resultado: ["Dos horas al lado suyo con una botella de agua, hablándole, tomándole el pulso mal pero tomándoselo. A las siete abre los ojos y te reconoce.",
                  "No te movés de ahí. Es lo mejor que hiciste en la run y no va a figurar en ningún resumen."] },
    { label: "Avisarle al que trajo la sustancia.", efectos: { karma: 8, conciencia: 10, paranoia: 15 },
      riesgo: { prob: 0.4, efectos: { karma: -8, paranoia: 18 }, resultado: ["El que trajo la sustancia ya no está en el departamento y no contesta. Ahora sos vos y nadie más."] },
      resultado: ["Aparece, sabe qué es y sabe qué hacer. Contra todo pronóstico, el dealer es el más responsable de la habitación.",
                  "«Es de la buena, no le pasa nada», dice. Después le mira la cara y cambia de opinión y ayuda."] },
    { label: "Convencerte de que ya se le va a pasar.", pericia: "karma", efectos: { karma: -25, conciencia: -8, paranoia: 25 },
      resultado: ["Volvés a la otra habitación. Te quedás mirando la puerta del baño toda la noche. Se le pasa. Podría no haberse pasado.",
                  "«Ya está grande», decís. Es la frase con la que se cierran las peores historias."] }
  ]
},

{
  id: "af_dueño_del_depto", categoria: "dialogo", tramo: [3], peso: 9, unlock: "A3",
  slots: { escenario: { tags: ["interior", "urbano"] }, personaje: { tags: ["social", "testigo"] }, complicacion: { tags: ["social", "conflicto"] } },
  variantes: [
    { texto: [
      "El dueño del departamento no sabía que había un after en su departamento.",
      "Vuelve de un viaje a las nueve de la mañana y abre la puerta de {escenario} con la llave y con una valija.",
      "{^complicacion}."
    ]},
    { texto: [
      "«¿Quiénes son ustedes?» es una pregunta razonable y nadie tiene una respuesta razonable.",
      "{personaje.desc}, en la puerta, procesando la escena a una velocidad admirable.",
      "El que lo invitó a todo el mundo no está en el departamento desde las cinco."
    ]}
  ],
  opciones: [
    { label: "Asumir la responsabilidad y ofrecerte a limpiar todo.", efectos: { karma: 20, conciencia: 15, aguante: -18, paranoia: -10 },
      resultado: ["Te quedás tres horas limpiando solo. El tipo termina haciéndote un café. La reparación es un arte antiguo.",
                  "«Yo me hago cargo», decís, y es mentira porque no fue tu culpa, y por eso mismo vale."] },
    { label: "Pagarle los daños.", requiere: { stats: { mangos: { min: 800 } } }, requisitoTexto: "$800",
      efectos: { mangos: -800, karma: 12, paranoia: -12 },
      resultado: ["Le das ochocientos y se calma. La plata resuelve cosas que la espiritualidad no toca.",
                  "Cuenta los billetes, mira la mancha de la alfombra, y dice «bueno». Se cerró."] },
    { label: "Irte por la escalera mientras discuten.", efectos: { karma: -15, paranoia: 18, aguante: -5 },
      resultado: ["Te escabullís mientras el escándalo está en su mejor momento. Once pisos por escalera y un peso en el estómago.",
                  "Nadie te ve salir. Te vas a acordar de las caras de los que quedaron."] },
    { label: "Explicarle que fue una ceremonia espiritual.", efectos: { conciencia: 8, karma: -8, paranoia: 12 },
      riesgo: { prob: 0.7, efectos: { paranoia: 20, mangos: -400 }, resultado: ["No compra el argumento. Nadie compraría el argumento. Llama a la policía mientras hablás."] },
      resultado: ["Increíblemente, se engancha. Termina sentado en el piso escuchando el relato completo y pidiendo un turno para el próximo.",
                  "Se ríe tan fuerte que se le pasa el enojo. «Ustedes están mal de la cabeza», dice, y pone la pava."] }
  ]
},

{
  id: "af_texto_grupal", categoria: "dialogo", tramo: [3], peso: 9, unlock: "A3",
  slots: { escenario: { tags: ["interior", "noche"] }, personaje: { tags: ["social", "quimico"] }, complicacion: { tags: ["vigilancia", "social"] } },
  variantes: [
    { texto: [
      "A las seis de la mañana alguien propone escribirle a los grupos de WhatsApp «lo que se está entendiendo acá».",
      "Se redacta un mensaje colectivo de cuatro párrafos en {escenario} y se lee en voz alta dos veces.",
      "{^complicacion}."
    ]},
    { texto: [
      "El mensaje dice cosas verdaderas de una manera que mañana va a ser catastrófica.",
      "{personaje.nombre} tiene el dedo sobre el botón de enviar y está esperando consenso.",
      "Hay cuatro grupos seleccionados. Uno es el del trabajo."
    ]}
  ],
  opciones: [
    { label: "Frenarlo.", efectos: { karma: 15, conciencia: 15, paranoia: -8 },
      resultado: ["Le sacás el teléfono de la mano. En doce horas, cinco personas te van a agradecer sin entender bien qué evitaste.",
                  "«Guardalo en notas», proponés. Es la mejor idea de la madrugada."] },
    { label: "Enviarlo.", efectos: { karma: -8, conciencia: 10, paranoia: 25 },
      resultado: ["Se envía a cuatro grupos. Va a haber consecuencias laborales, familiares y románticas, en ese orden.",
                  "Enviado. A las once de la mañana el celular empieza a vibrar y no para."] },
    { label: "Escribir tu propio mensaje a una sola persona.", efectos: { karma: 5, conciencia: 12, paranoia: 15 },
      riesgo: { prob: 0.45, efectos: { paranoia: 20, karma: -8 }, resultado: ["Le escribiste a la persona a la que no había que escribirle. Los primeros dos mensajes eran hermosos y el séptimo no."] },
      resultado: ["Le escribís cuatro renglones honestos a una sola persona. A la tarde te contesta algo bueno.",
                  "Un mensaje, corto, a la persona correcta. Es el único uso legítimo de un teléfono a esa hora."] },
    { label: "Apagar todos los teléfonos de la casa.", efectos: { karma: 18, conciencia: 18, paranoia: -18 },
      resultado: ["Juntás seis celulares en un cajón y lo cerrás. Nadie protesta demasiado. Salvaste seis reputaciones.",
                  "«Se apagan todos», anunciás, y por algún motivo te obedecen. La autoridad a veces está disponible."] }
  ]
},

{
  id: "af_musica_loop", categoria: "trip", tramo: [3], peso: 9, unlock: "A3",
  slots: { escenario: { tags: ["interior", "noche"] }, personaje: { tags: ["musico", "quimico", "social"] }, complicacion: { tags: ["ruido", "trip"] } },
  variantes: [
    { texto: [
      "Hay un tema de doce minutos que ya se puso cuatro veces y nadie tiene autoridad para cambiarlo.",
      "En {escenario} el loop se convirtió en la estructura del tiempo.",
      "{^complicacion}."
    ]},
    { texto: [
      "{personaje.nombre} tiene el control de la música y lo ejerce con un criterio que solo él entiende.",
      "El tema se repite y en la cuarta repetición empieza a significar otra cosa, y en la sexta significa demasiado.",
      "Alguien dice «cambiala» y nadie lo apoya, porque cambiarla ahora sería una traición."
    ]}
  ],
  opciones: [
    { label: "Rendirte al loop.", efectos: { conciencia: 16, efecto: 12, paranoia: -12, aguante: -8 },
      resultado: ["A la séptima vuelta se te abre algo. El loop era el mantra y tardaste ochenta y cuatro minutos en darte cuenta.",
                  "Dejás de contar las repeticiones y ahí empieza a funcionar."] },
    { label: "Cambiar la música por algo tranquilo.", efectos: { conciencia: 12, karma: 8, paranoia: -15 },
      riesgo: { prob: 0.35, efectos: { karma: -10, paranoia: 12 }, resultado: ["Cambiás y se rompe algo colectivo. Tres personas se van del departamento en diez minutos."] },
      resultado: ["Pones algo suave. La habitación baja dos cambios y respira. Alguien te dice «gracias» desde un sillón.",
                  "El cambio de música cambia la noche. Es una palanca enorme y estaba ahí."] },
    { label: "Apagar la música del todo.", efectos: { conciencia: 20, paranoia: 12, karma: -5 },
      resultado: ["Silencio total. Once segundos de silencio en un after son insoportables y después son un regalo.",
                  "Lo apagás. Nadie habla durante un minuto. Después se empieza a hablar en serio."] },
    { label: "Poner una cumbia.", efectos: { karma: 15, conciencia: 8, efecto: 8, aguante: -10, paranoia: -18 },
      resultado: ["Cumbia a las siete de la mañana. Se levantan cuatro personas del piso. Es una resurrección documentada.",
                  "Es la decisión más discutible y la más efectiva. Se baila cuarenta minutos."] }
  ]
},

{
  id: "af_confesion_6am", categoria: "dialogo", tramo: [3], peso: 10, unlock: "A3",
  slots: { escenario: { tags: ["interior", "noche"] }, personaje: { tags: ["social", "quimico"] } },
  variantes: [
    { texto: [
      "A las seis de la mañana, en la cocina de {escenario}, {personaje.nombre} te cuenta algo que no le contó a nadie.",
      "Es de las cosas que después generan vergüenza en el que las cuenta.",
      "Vos tenés que decidir qué hacés con eso mañana."
    ]},
    { texto: [
      "La cocina a las seis de la mañana es un confesionario y no hay forma de evitarlo.",
      "{personaje.desc}. Habla veinte minutos sin parar y sin mirarte.",
      "Cuando termina dice: «no le digas a nadie». Y ahí empieza tu problema."
    ]}
  ],
  opciones: [
    { label: "Guardar el secreto para siempre.", efectos: { karma: 20, conciencia: 15, paranoia: 8 }, flags: { set: ["guarda_secreto"] },
      resultado: ["No se lo contás a nadie. Nunca. Ni cuando conviene. Eso es una forma de amistad que no tiene nombre.",
                  "Te lo llevás. Pesa. Es tu parte del trato."] },
    { label: "Contarle algo propio del mismo tamaño.", pericia: "karma", efectos: { karma: 15, conciencia: 20, paranoia: 12 },
      resultado: ["Le devolvés el gesto con algo tuyo. Ahora los dos están en el mismo barco y el barco flota.",
                  "Intercambian secretos a las seis y veinte de la mañana. Eso los va a unir o los va a separar y no hay tercera opción."] },
    { label: "Decirle que está muy dado vuelta y que lo hablen mañana.", pericia: "karma", efectos: { karma: 12, conciencia: 12, paranoia: -8 },
      resultado: ["«Mañana lo hablamos», decís, y le hacés un favor enorme. Mañana no lo va a hablar y va a estar aliviado.",
                  "Lo frenás con cariño. Es la respuesta responsable y a nadie le gusta ser el responsable."] },
    { label: "Escucharlo y no decir nada de vos.", pericia: "conciencia", efectos: { karma: 8, conciencia: 10, paranoia: 5 },
      resultado: ["Escuchás cuarenta minutos sin dar nada a cambio. Es asimétrico y a él le sirve igual.",
                  "Tu silencio lo deja expuesto. Mañana no te va a poder mirar."] }
  ]
},

{
  id: "af_ultima_raya", categoria: "comercio", tramo: [3], peso: 10, unlock: "A3",
  requiere: { stats: { efecto: { min: 30 } } },
  slots: { escenario: { tags: ["interior", "quimico", "noche"] }, personaje: { tags: ["quimico", "comercio", "social"] } },
  ascii: "billete",
  variantes: [
    { texto: [
      "Queda una y hay tres personas mirándola.",
      "{personaje.nombre} la armó y no aclaró para quién es, lo cual es una forma de generar un problema.",
      "En {escenario} el tema de conversación pasa a ser, sin que nadie lo diga, esa línea."
    ]},
    { texto: [
      "Se terminó y hay que decidir si se consigue más a las siete de la mañana, lo cual es técnicamente posible y espiritualmente ruinoso.",
      "{personaje.desc} ya está tecleando.",
      "«Sale mil quinientos el envío», informa. Nadie se ríe."
    ]}
  ],
  opciones: [
    { label: "Dejarla y decir que ya está.", efectos: { conciencia: 18, karma: 12, efecto: -18, aguante: 8 },
      resultado: ["«Yo ya está», decís. Es la frase más difícil de esa habitación y la dijiste primero.",
                  "La dejás. Dos personas te siguen. Se terminó el after por contagio de sensatez."] },
    { label: "Tomarla vos.", efectos: { efecto: 25, aguante: -12, paranoia: 15, karma: -5 },
      resultado: ["La tomás sin preguntar. Se genera un silencio de tres segundos que va a durar más que la sustancia.",
                  "Nadie dice nada y todos anotan."] },
    { label: "Dividirla en tres.", efectos: { efecto: 12, karma: 15, conciencia: 8, paranoia: -8 },
      resultado: ["La partís en tres partes iguales con una tarjeta. La diplomacia también se ejerce con las manos.",
                  "Tres partes. Todos contentos. Es una solución de estadista."] },
    { label: "Pedir más y pagarlo vos.", requiere: { stats: { mangos: { min: 1500 } } }, requisitoTexto: "$1500",
      pericia: "karma", efectos: { mangos: -1500, efecto: 35, aguante: -20, paranoia: 20, karma: -10 },
      resultado: ["Pagás el envío completo y sos el héroe de la habitación durante cuarenta minutos y el idiota de tu propia historia durante dos días.",
                  "Llega a las siete y veinte. Alguien aplaude. Es el aplauso más triste que escuchaste."] }
  ]
},

{
  id: "af_sotano_sin_ventanas", categoria: "trip", tramo: [3], peso: 10, unlock: "A3",
  slots: { escenario: { tags: ["interior", "quimico"] }, personaje: { tags: ["quimico", "social", "turbio"] }, complicacion: { tags: ["trip", "quimico", "misterio"] } },
  variantes: [
    { texto: [
      "Se baja por una escalera de hierro y no hay ventanas, y eso cambia la naturaleza del tiempo.",
      "Adentro puede ser cualquier hora. Es siempre la misma hora.",
      "{^complicacion}."
    ]},
    { texto: [
      "El sótano tiene una lamparita, un sillón de dos cuerpos, cuatro personas y ningún reloj.",
      "{personaje.nombre} dice que está acá desde el jueves. Es martes.",
      "Nadie corrige a nadie porque nadie está seguro de nada."
    ]}
  ],
  opciones: [
    { label: "Subir y salir a la calle.", pericia: "aguante", efectos: { conciencia: 16, efecto: -25, aguante: 12, paranoia: -12 },
      resultado: ["Subís los once escalones y afuera es de día. Te tenés que apoyar en la pared. Volviste.",
                  "La luz te pega como un diagnóstico. Pero volviste, y eso es todo lo que se pedía."] },
    { label: "Quedarte «un rato más».", efectos: { efecto: 25, aguante: -20, paranoia: 20, conciencia: 8 },
      resultado: ["El «rato más» dura seis horas. Es la unidad de medida del sótano.",
                  "No sabés cuánto pasó. Nadie sabe. El sótano gana siempre."] },
    { label: "Preguntar qué día es y no aceptar respuestas evasivas.", efectos: { conciencia: 20, paranoia: 18, efecto: -8 },
      resultado: ["Insistís hasta que alguien prende un teléfono. Es martes a las cuatro de la tarde. Se hace un silencio muy grande.",
                  "El dato objetivo entra en el sótano como una piedra en un vidrio."] },
    { label: "Sacar a alguien del sótano con vos.", pericia: "aguante", efectos: { karma: 25, conciencia: 18, aguante: -12, paranoia: -12 },
      resultado: ["Convencés a uno. Suben juntos. Es la mejor cosa que hiciste en el tramo y va a llorar en la vereda.",
                  "Lo agarrás del brazo y lo sacás. Se resiste dos escalones y después no."] }
  ]
},

{
  id: "af_taxi_amanecer", categoria: "ruta", tramo: [3], peso: 9, unlock: "A3",
  slots: { escenario: { tags: ["urbano", "noche", "transito"] }, personaje: { tags: ["transito", "social"] } },
  variantes: [
    { texto: [
      "Paras un taxi en {escenario} a las siete y diez de la mañana con la pupila del tamaño de una moneda.",
      "{personaje.nombre} te mira por el espejo tres veces en la primera cuadra.",
      "«¿A dónde?» es una pregunta que en este momento requiere una decisión muy grande."
    ]},
    { texto: [
      "El taxi está limpio y huele a pino artificial y vos no estás a la altura de ese auto.",
      "{personaje.desc}. Pone la radio en un volumen de consideración.",
      "«Vengo de laburar», dice. Vos también, en un sentido muy amplio."
    ]}
  ],
  opciones: [
    { label: "Ir a tu casa.", efectos: { mangos: -600, aguante: 20, efecto: -25, paranoia: -15, conciencia: 8 },
      resultado: ["Seiscientos pesos y una ducha. Es la mejor compra del tramo.",
                  "Llegás, te bañás y dormís nueve horas. Nada más pasa hoy y está perfecto."] },
    { label: "Ir a la casa de alguien.", efectos: { mangos: -500, karma: 5, paranoia: 12, conciencia: 10 },
      riesgo: { prob: 0.5, efectos: { paranoia: 20, karma: -10 }, resultado: ["No te abren. Te quedás cuarenta minutos en un palier ajeno tomando decisiones que después no vas a poder explicar."] },
      resultado: ["Te abren y te hacen un café y no te preguntan nada. La amistad tiene formas administrativas.",
                  "Te dejan dormir en un sillón. A las tres de la tarde te despierta un olor a comida."] },
    { label: "Decirle que maneje sin rumbo y hablar.", pericia: "karma", efectos: { mangos: -900, conciencia: 20, karma: 12, paranoia: -18 },
      resultado: ["Cuarenta minutos dando vueltas por la ciudad hablando con un taxista sobre la muerte. Novecientos pesos bien gastados.",
                  "«Vos estás buscando algo», te dice en un semáforo. Sí. «Y bueno», dice. Y arranca."] },
    { label: "Bajarte a las tres cuadras y caminar.", efectos: { mangos: -150, aguante: -10, conciencia: 14, efecto: -15 },
      resultado: ["Caminás cuarenta cuadras con el sol de frente. Duele y sirve.",
                  "Te bajás porque no soportabas estar quieto. Caminar era la respuesta."] }
  ]
},

{
  id: "af_espejo_ascensor", categoria: "trip", tramo: [3], peso: 9, unlock: "A3",
  requiere: { stats: { efecto: { min: 40 } } },
  slots: { escenario: { tags: ["interior", "urbano"] }, complicacion: { tags: ["trip", "astral", "cuerpo"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "El ascensor de {escenario} tiene espejo en las cuatro paredes, lo cual es una decisión arquitectónica hostil.",
      "Son ocho pisos. Ocho pisos son mucho tiempo.",
      "{^complicacion}."
    ]},
    { texto: [
      "Se traba entre el cuarto y el quinto. Hay luz. Hay señal. No hay nada de qué preocuparse objetivamente.",
      "Subjetivamente hay cuatro copias tuyas y ninguna te tranquiliza.",
      "El botón de emergencia está a treinta centímetros y usarlo implica hablar con alguien."
    ]}
  ],
  opciones: [
    { label: "Apretar el botón y hablar con el portero.", efectos: { paranoia: -20, conciencia: 10, karma: 5 },
      resultado: ["Contesta un tipo tranquilo que te habla cuatro minutos mientras lo arregla. Es un santo con guardapolvo.",
                  "«Ya va, quedate tranquilo», dice una voz. Y con eso alcanza."] },
    { label: "Cerrar los ojos y contar.", efectos: { conciencia: 16, paranoia: -12, aguante: -5 },
      resultado: ["Contás hasta trescientos con los ojos cerrados. Arranca solo en el doscientos ochenta.",
                  "No mirás los espejos. Es una técnica de supervivencia y funciona."] },
    { label: "Mirarte fijo hasta que pase algo.", efectos: { conciencia: 22, paranoia: 25 },
      riesgo: { prob: 0.4, efectos: { paranoia: 20 }, resultado: ["Pasa algo. No lo vas a poder contar sin que suene a exageración y no fue una exageración."] },
      resultado: ["Cuatro minutos de espejo múltiple. Salís del ascensor con una información nueva sobre vos y no es agradable.",
                  "Se te ordena la cara en un momento y se te desordena en el siguiente. Aguantás. Aprendés."] },
    { label: "Golpear la puerta y gritar.", pericia: "aguante", efectos: { paranoia: 20, aguante: -10, karma: -5 },
      resultado: ["Gritás dos minutos. Baja un vecino en pijama, molesto y eficaz. Se arregla en cuarenta segundos.",
                  "El pánico funciona, mal, y funciona."] }
  ]
},

{
  id: "af_desayuno_bar", categoria: "descanso", tramo: [3, 4], peso: 10, unlock: "A3",
  slots: { escenario: { tags: ["social", "urbano", "dia"] }, personaje: { tags: ["social", "veterano", "quimico"] }, complicacion: { tags: ["social", "melancolia"] } },
  variantes: [
    { texto: [
      "Un bar de {escenario} a las ocho y media de la mañana. Café con leche y tres medialunas para dos personas que no durmieron.",
      "Alrededor, gente que va a trabajar. La mesa de ustedes es un país aparte con sus propias leyes.",
      "{^complicacion}."
    ]},
    { texto: [
      "El mozo los mira y sabe exactamente qué está pasando y no dice nada, porque los mozos son la última reserva moral.",
      "{personaje.nombre} tiene las manos alrededor de la taza como si fuera una estufa.",
      "«Qué lindo el café», dice, y lo dice en serio, y es lo más profundo que se dijo en catorce horas."
    ]}
  ],
  opciones: [
    { label: "Comer todo y hablar de cosas normales.", efectos: { aguante: 22, conciencia: 12, efecto: -25, paranoia: -18, mangos: -350 },
      resultado: ["Hablan del clima, del alquiler, de una serie. La normalidad es una tecnología de reingreso a la atmósfera.",
                  "Dos cafés con leche y una charla sobre nada. Es exactamente la medicina correcta."] },
    { label: "Hacer un balance en voz alta de lo que pasó.", efectos: { conciencia: 20, karma: 8, paranoia: 8, mangos: -350, aguante: 12 },
      resultado: ["Repasan las últimas dieciocho horas y aparecen dos cosas importantes y cuatro vergüenzas. Sirve.",
                  "«¿Qué fue eso?», preguntás. Se pasan cuarenta minutos armando la respuesta."] },
    { label: "Prometer que no lo hacen más.", efectos: { conciencia: 10, karma: 8, paranoia: -12, mangos: -350 }, flags: { set: ["promesa_amanecer"] },
      resultado: ["Lo prometen los dos, con la mano en el corazón, riéndose. La tasa histórica de cumplimiento es baja y la intención es real.",
                  "«Nunca más», dicen a la vez. Se ríen. Se abrazan. Va a volver a pasar."] },
    { label: "Quedarte solo y no hablar con nadie.", efectos: { conciencia: 16, paranoia: -12, aguante: 15, mangos: -200 },
      resultado: ["Te sentás solo con un café y el diario del bar. Cuarenta minutos de silencio comprado. Es lo que necesitabas.",
                  "Mirás por la ventana a la gente que va a trabajar. No hay envidia ni desprecio. Solo mirás. Eso ya es un avance."] }
  ]
},

{
  id: "af_kiosco_7am", categoria: "comercio", tramo: [3], peso: 9, unlock: "A3",
  slots: { escenario: { tags: ["comercio", "urbano"] }, personaje: { tags: ["comercio", "testigo"] } },
  ascii: "ventanita",
  variantes: [
    { texto: [
      "El kiosco de {escenario} a las siete de la mañana es una institución médica.",
      "{personaje.nombre} atiende con la cara de haber visto pasar cuatrocientos como vos.",
      "No juzga. Cobra."
    ]},
    { texto: [
      "Hay una fila de tres personas a las siete de la mañana y las tres compran lo mismo: agua, cigarrillos y algo dulce.",
      "{personaje.desc}. Te pone las tres cosas sobre el mostrador antes de que hables.",
      "«Mil doscientos», dice."
    ]}
  ],
  opciones: [
    { label: "Comprar agua y algo dulce.", efectos: { mangos: -400, aguante: 18, efecto: -20, paranoia: -10 },
      resultado: ["Medio litro de agua y un alfajor. La recuperación empieza con logística, no con filosofía.",
                  "Tomás el agua de un saque en la vereda. Es lo mejor que probaste en tu vida."] },
    { label: "Comprar cigarrillos y nada más.", efectos: { mangos: -600, aguante: -10, paranoia: -8, conciencia: 3 },
      resultado: ["Fumás dos seguidos en la esquina. Es una mala decisión que se siente como una buena decisión.",
                  "El primero de la mañana te marea. Lo fumás igual, entero."] },
    { label: "Preguntarle cómo hace para estar bien a esta hora.", efectos: { conciencia: 16, karma: 8 },
      resultado: ["«Duermo de noche», dice, sin ironía, y con eso te hace pedazos.",
                  "Se ríe. «Yo abrí a las seis, m'hijo. Vos todavía no cerraste.»"] },
    { label: "Fiarte.", requiere: { stats: { mangos: { max: 100 } } }, requisitoTexto: "sin plata",
      efectos: { aguante: 12, karma: -5, paranoia: 8 }, flags: { set: ["deuda_kiosco"] },
      resultado: ["Te fía el agua y el alfajor sin que se lo pidas dos veces. Anota en un cuaderno. Vas a volver a pagar y él lo sabe.",
                  "«Después me lo traés», dice. Esa frase es una de las cosas más decentes del país."] }
  ]
}

]);
