/* PICHICATA — eventos base, parte 2/2. Mismo esquema que events-core.js. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "ev_ronda_presentacion", categoria: "dialogo", tramo: [1, 2], peso: 11, unlock: null,
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["social"] }, personaje2: { tags: ["chanta", "guru"] } },
  variantes: [
    { texto: [
      "Ronda de presentación en {escenario}. Cada uno dice su nombre y «qué vino a buscar».",
      "{personaje.nombre} habla catorce minutos. {^personaje2.nombre} no lo corta porque el reloj no es problema suyo.",
      "Te va a tocar en cuatro personas y todavía no sabés qué decir."
    ]},
    { texto: [
      "«Nombre y una palabra», pide {personaje2.nombre}. Nadie respeta la parte de la palabra.",
      "En {escenario} se escucha por primera vez el término «proceso», que va a ser usado ciento doce veces en las próximas horas.",
      "{personaje.desc}, y cuando le toca dice algo tan sincero que incomoda a todos."
    ]}
  ],
  opciones: [
    { label: "Decir la verdad cruda.", efectos: { conciencia: 14, karma: 8, paranoia: 10 },
      resultado: ["Dices exactamente por qué estás acá, sin adornos. Se hace un silencio de cuatro segundos que vale más que la ceremonia.",
                  "Lo decís y te tiembla la voz en la mitad. Alguien del fondo asiente fuerte."] },
    { label: "Inventar algo que suene profundo.", efectos: { conciencia: 3, karma: -6 }, flags: { set: ["arranco_mintiendo"] },
      resultado: ["Armás una frase con las palabras «proceso», «desapego» y «linaje». {^personaje2.nombre} te felicita. Eso te tiene que asustar.",
                  "Suena tan bien que te lo crees vos también por diez minutos."] },
    { label: "Pasar el turno.", efectos: { conciencia: 6, paranoia: 12, karma: -3 },
      resultado: ["«Paso», dices. No es aceptable pero nadie tiene la energía para insistir.",
                  "Te quedás callado. La ronda sigue. Vas a pensar en esto a las cuatro de la mañana."] },
    { label: "Hacer un chiste.", efectos: { karma: 8, conciencia: 5, paranoia: -8 },
      riesgo: { prob: 0.4, efectos: { karma: -8, paranoia: 10 }, resultado: ["El chiste no entra. Hay una risa sola y es la peor de todas: la de {personaje2.nombre}, por obligación profesional."] },
      resultado: ["Se ríen ocho de once. Te compraste un lugar en el grupo por el resto del retiro.",
                  "Buen chiste, momento equivocado, resultado excelente."] }
  ]
},

{
  id: "ev_ceremonia_interrumpida", categoria: "combate", tramo: [2], peso: 10, unlock: null,
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["lumpen", "quimico"] }, personaje2: { tags: ["guru"] }, complicacion: { tags: ["social", "conflicto"] } },
  variantes: [
    { texto: [
      "En el momento más silencioso de la ceremonia, {personaje.nombre} saca {objeto} y arruina el clima con precisión quirúrgica.",
      "{personaje2.nombre} lo mira desde el otro lado del círculo con una furia que no puede expresar sin romper el personaje.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay algo que no corresponde y todos lo saben. Lo que no corresponde lo trajo {personaje.nombre} en la riñonera.",
      "«Es para acompañar», explica, y once personas dadas vuelta procesan la frase a distintas velocidades.",
      "{personaje2.nombre} se levanta. Se sienta. Se vuelve a levantar."
    ]}
  ],
  opciones: [
    { label: "Ponerte del lado del guía y pararlo.", efectos: { karma: 10, conciencia: 8, paranoia: 8 }, flags: { set: ["defensor_del_orden"] },
      resultado: ["Le decís que la guarde. Lo hace, sorprendido. {^personaje2.nombre} te va a tratar distinto de acá en adelante.",
                  "Te paras y decís «loco, no». Y funciona, lo cual es lo más raro de la noche."] },
    { label: "Aceptar lo que ofrece.", efectos: { efecto: 35, conciencia: 8, karma: -10, paranoia: 12 }, flags: { set: ["mezclo_todo"] },
      riesgo: { prob: 0.4, efectos: { aguante: -18, paranoia: 20 }, resultado: ["Mezclar era mala idea, técnicamente y espiritualmente. Los siguientes noventa minutos son de una calidad muy inferior."] },
      resultado: ["Mezclás. Sos consciente de que estás mezclando. Esa consciencia no sirve para nada.",
                  "Aceptás y se abre una puerta que no era la de la ceremonia."] },
    { label: "Salir de la ronda y esperar afuera.", efectos: { conciencia: 10, paranoia: -8, karma: 3 },
      resultado: ["Te vas afuera veinte minutos. Cuando volvés está todo resuelto de una forma que nadie te va a explicar.",
                  "Desde afuera se escuchan gritos y después silencio. No preguntás."] },
    { label: "Filmar el escándalo.", efectos: { karma: -12, paranoia: 15, mangos: 200 },
      resultado: ["Cincuenta segundos de material impagable. Vas a hacer algo con esto y no va a ser bueno.",
                  "Lo grabás todo. Alguien te ve grabando. Eso queda anotado."] }
  ]
},

{
  id: "ev_cana_en_festival", categoria: "combate", tramo: [1, 2, 3], peso: 11, unlock: null,
  slots: { escenario: { tags: ["publico", "urbano", "conurbano", "naturaleza"] }, personaje: { tags: ["social", "quimico"] } },
  ascii: "policia",
  variantes: [
    { texto: [
      "Dos uniformados en {escenario}. Uno mastica chicle, el otro te mira las pupilas como si fuera un trabajo que le gusta.",
      "Tenés encima lo que tenés encima.",
      "{personaje.nombre} ya se fue caminando rápido sin mirar atrás, y eso lo van a notar."
    ]},
    { texto: [
      "«Documentos.» Una sola palabra y {escenario} se convierte en otro lugar.",
      "El más joven te revisa el bolso con una prolijidad que no se aprende en cuatro meses.",
      "El otro no te mira a vos: te mira las manos."
    ]}
  ],
  opciones: [
    { label: "Coimear.", requiere: { stats: { mangos: { min: 300 } } }, requisitoTexto: "$300",
      efectos: { mangos: -300, karma: -10, paranoia: -20 },
      resultado: ["Doblás los billetes con el documento en el medio, como se hace. Ni lo cuentan. «Circulando.»",
                  "Sale por trescientos. Diez años atrás salía por menos y eso también es inflación."] },
    { label: "Recitar tus derechos.", tirada: { stat: "paranoia", dificultad: 45, invertido: true },
      exito: { efectos: { conciencia: 12, karma: 5, paranoia: 8 }, resultado: ["Los recitás claro, firme, sin temblar. Se miran entre ellos y te dejan ir. Funcionó, y no funciona casi nunca."] },
      fallo: { efectos: { aguante: -15, paranoia: 25, mangos: -200 }, resultado: ["Se te traba la lengua en la palabra «arbitrario» y a partir de ahí es cuesta abajo. Terminás en el móvil dos horas."] },
      resultado: [] },
    { label: "Correr.", tirada: { stat: "aguante", dificultad: 55 },
      exito: { efectos: { aguante: -15, paranoia: 20, conciencia: 5 }, resultado: ["Once cuadras. Te salvás y descubrís que todavía tenés cuerpo, lo cual es una revelación por vía policial."] },
      fallo: { efectos: { aguante: -30, paranoia: 30, mangos: -300 }, resultado: ["Te agarran en la esquina. Correr y que te agarren es peor que no correr, y lo sabías cuando arrancaste."] },
      resultado: [] },
    { label: "Decirles que sos un maestro espiritual y bendecirlos.", efectos: { paranoia: 10 },
      riesgo: { prob: 0.8, efectos: { aguante: -20, paranoia: 25, mangos: -250, karma: -5 }, resultado: ["No sale bien. Sale exactamente como se esperaba que saliera. Anotalo en la libreta de las malas ideas."] },
      resultado: ["Contra toda la evidencia disponible, funciona. Uno de los dos se emociona. Te deja ir y te pide que le reces por la madre.",
                  "Les pones la mano en la frente. El mundo se detiene. Y después, increíblemente, te dejan ir."] }
  ]
},

{
  id: "ev_perro_sigue", categoria: "descanso", tramo: [1, 2, 3], peso: 9, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["animal"] } },
  ascii: "perro",
  variantes: [
    { texto: [
      "Un perro marrón te empieza a seguir en {escenario}. Sin collar, sin apuro, sin pedir nada.",
      "Camina exactamente dos pasos atrás tuyo. Cuando te parás, se para.",
      "En algún momento entendés que no te está siguiendo: te está acompañando, que es otra cosa."
    ]},
    { texto: [
      "{personaje.desc}. Aparece en {escenario} y se sienta enfrente tuyo con la seriedad de un funcionario.",
      "No mueve la cola. Te mira.",
      "Es, sin discusión, la presencia más lúcida del tramo."
    ]}
  ],
  opciones: [
    { label: "Compartir lo que tengas para comer.", efectos: { aguante: -5, karma: 20, conciencia: 12, paranoia: -12 },
      resultado: ["Le das la mitad. Come rápido y después se sienta al lado, hombro con pata, y se queda dos horas.",
                  "Compartís pan. Es la única transacción limpia de toda la run."] },
    { label: "Dejarlo y seguir.", efectos: { karma: -5, paranoia: 5 },
      resultado: ["Te sigue tres cuadras y en la cuarta decide que no. Los perros deciden y no explican.",
                  "Se queda parado en la esquina mirándote ir. Te vas a acordar de esa imagen."] },
    { label: "Hablarle en serio, contarle todo.", efectos: { conciencia: 16, karma: 10, paranoia: -18 },
      resultado: ["Veinte minutos hablándole a un perro en una vereda. La mejor terapia disponible y no cobra.",
                  "Escucha con las orejas paradas. En un momento apoya la cabeza en tu rodilla y ahí se te rompe algo bueno."] },
    { label: "Adoptarlo mentalmente y ponerle nombre.", efectos: { karma: 12, conciencia: 8, aguante: -3 }, flags: { set: ["tiene_perro"] },
      resultado: ["Le pones un nombre en voz alta. Ahora existe un vínculo y los vínculos tienen consecuencias.",
                  "Lo bautizás. Él no se enteró pero vos sí, y eso ya es suficiente para que cuente."] }
  ]
},

{
  id: "ev_astrologa_carta", categoria: "comercio", tramo: [1, 2], peso: 9, unlock: null,
  slots: { escenario: { tags: ["interior", "social"] }, personaje: { tags: ["guru", "comercio"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, te lee la carta natal en {escenario} con la pantalla del celular girada para que no veas.",
      "Acierta tres cosas que son ciertas de cualquiera y una que no.",
      "La que no es la que te queda toda la noche."
    ]},
    { texto: [
      "«¿Hora exacta de nacimiento?» No la sabés. Nadie la sabe. Se resuelve con una estimación y aun así el resultado va a ser categórico.",
      "{personaje.desc}. Habla veinte minutos sin respirar en {escenario}.",
      "«Tenés Saturno haciendo algo», resume."
    ]}
  ],
  opciones: [
    { label: "Pagar la lectura completa.", efectos: { mangos: -350, conciencia: 8, paranoia: 10 },
      resultado: ["Cuarenta minutos y un audio de veinte que vas a escuchar cuatro veces. Dos cosas te van a servir.",
                  "Pagás y te vas con una explicación de tu vida. Es falsa y es útil, que es una combinación frecuente."] },
    { label: "Pedirle que te diga solo lo malo.", efectos: { conciencia: 16, paranoia: 18, mangos: -200 },
      resultado: ["Se lo pedís y te lo da entero. No debiste pedirlo. Tenías razón en pedirlo.",
                  "«¿Seguro?» «Seguro.» Y ahí arranca y no para por doce minutos."] },
    { label: "Discutirle la metodología.", efectos: { conciencia: 10, karma: -6, paranoia: 5 },
      resultado: ["Le explicás lo de la precesión de los equinoccios. Te explica que eso es «astronomía, no astrología». Empate técnico.",
                  "No se enoja. Te dice «típico de tu ascendente» y con eso te gana la discusión y la guerra."] },
    { label: "Leerle la carta a ella.", efectos: { conciencia: 14, karma: 10, mangos: 150 },
      resultado: ["Le inventás una lectura completa. Se emociona. Te paga. El mercado espiritual es un ouróboros.",
                  "«Nadie me lee nunca a mí», dice, y se sienta como una nena. Le mentís bonito y le hace bien."] }
  ]
},

{
  id: "ev_nino_indigo", categoria: "dialogo", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["chanta", "trip"] }, complicacion: { tags: ["social", "absurdo", "conflicto"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, te explica en {escenario} que él no necesita la ceremonia porque «ya viene despierto de fábrica».",
      "Tiene treinta y cuatro años y una madre que le dijo a los seis que era especial.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Yo veo auras desde los cuatro», dice {personaje.nombre}, y te describe la tuya con un lujo de detalle preocupante.",
      "La descripción es desfavorable.",
      "Nadie en {escenario} lo contradice porque contradecirlo cuesta cuarenta minutos."
    ]}
  ],
  opciones: [
    { label: "Preguntarle de qué vive.", efectos: { conciencia: 15, karma: -5, paranoia: 5 },
      resultado: ["Silencio. «De la energía», dice al final. Es decir: de la madre. Los dos lo saben.",
                  "Cambia de tema con una habilidad que revela años de práctica en cambiar ese tema."] },
    { label: "Creerle y pedirle una lectura de aura.", efectos: { conciencia: 4, karma: 5, mangos: -150, paranoia: 8 },
      resultado: ["Te describe el aura durante veinte minutos. En el minuto quince dice algo que te pega y no sabés por qué.",
                  "Es todo mentira salvo una parte, y la parte cierta la dijo sin darse cuenta."] },
    { label: "Contarle una verdad sobre él mismo.", efectos: { conciencia: 18, karma: -8, paranoia: 10 },
      riesgo: { prob: 0.4, efectos: { karma: -10 }, resultado: ["Se quiebra. Llora. Ahora tenés que hacerte cargo de un hombre de treinta y cuatro años llorando y era tu culpa."] },
      resultado: ["Se lo decís suave. Se queda callado el resto de la noche y a la mañana te agradece con los ojos.",
                  "Le decís lo que nadie le dijo. Reacciona mejor de lo esperado, lo cual habla bien de él."] },
    { label: "Dejarlo hablar y usar el tiempo para meditar.", efectos: { conciencia: 12, paranoia: -10 }, medita: true,
      resultado: ["Cuarenta minutos de monólogo ajeno como fondo sonoro. Es un mantra imperfecto pero funciona.",
                  "Asentís cada tanto y estás en otra parte. Es una técnica milenaria."] }
  ]
},

{
  id: "ev_pileta_verde", categoria: "trip", tramo: [2], peso: 9, unlock: null,
  slots: { escenario: { tags: ["precario", "ritual", "conurbano"] }, personaje: { tags: ["social", "quimico"] } },
  ascii: "pileta",
  variantes: [
    { texto: [
      "Hay una pileta en {escenario} y el agua es verde de un verde que tiene profundidad conceptual.",
      "{personaje.nombre} está metido hasta el pecho y sostiene que «el agua limpia el campo energético».",
      "Hay una rana muerta flotando a un metro cincuenta de su cabeza."
    ]},
    { texto: [
      "«Bañarse purifica», anuncia {personaje.nombre}, en {escenario}, a las seis de la mañana, señalando un agua que no está purificando nada.",
      "Cuatro personas ya se metieron. Dos de ellas están notablemente más felices.",
      "El olor es discutible. La felicidad de las dos personas no."
    ]}
  ],
  opciones: [
    { label: "Meterte.", efectos: { aguante: -12, conciencia: 16, karma: 8, paranoia: -18, efecto: -10 },
      riesgo: { prob: 0.35, efectos: { aguante: -15 }, resultado: ["Dos días después vas a tener una infección en el oído que te va a acompañar el resto del viaje. Valió igual."] },
      resultado: ["El agua está helada y sucia y en cuanto entrás te reís por primera vez en catorce horas.",
                  "Te metés vestido. Nadie entiende por qué vestido. Vos tampoco. Fue lo mejor del retiro."] },
    { label: "Mirar desde el borde.", efectos: { conciencia: 6, paranoia: 5 },
      resultado: ["Te quedás en el borde con los pies adentro, que es la metáfora completa de tu vida y encima gratis.",
                  "No te metés. Vas a pensar en esto en el momento de la muerte."] },
    { label: "Explicarle el riesgo sanitario.", efectos: { conciencia: 5, karma: -8, paranoia: 8 },
      resultado: ["Das una charla de dos minutos sobre bacterias. Cuatro personas felices te miran con lástima desde el agua.",
                  "«Vos sos el que piensa demasiado», te dice alguien, y no está equivocado."] },
    { label: "Sacar la rana y darle un entierro.", efectos: { karma: 22, conciencia: 14, aguante: -5 },
      resultado: ["La sacás con una pala de plástico y la enterrás abajo de un limonero. Cinco personas se te suman en silencio. Es la mejor ceremonia del retiro y no la organizó nadie.",
                  "Le hacés un pozo. Alguien dice unas palabras. Todos lloran un poco, por la rana y por lo otro."] }
  ]
},

{
  id: "ev_asado_sin_carne", categoria: "descanso", tramo: [1, 2], peso: 9, unlock: null,
  slots: { escenario: { tags: ["social", "conurbano", "precario"] }, personaje: { tags: ["social", "lumpen"] }, complicacion: { tags: ["precario", "social"] } },
  ascii: "parrilla",
  variantes: [
    { texto: [
      "Hay parrilla, hay fuego, hay siete personas y no hay carne en {escenario}.",
      "Nadie lo menciona durante la primera hora, que es la parte más argentina de todo el evento.",
      "{^complicacion}."
    ]},
    { texto: [
      "El fuego está impecable. {^personaje.nombre} lo hizo con una técnica heredada y lo cuida como a un hijo.",
      "El problema es lo que va arriba, que es una cuestión que nadie resolvió y ya son las nueve.",
      "«Alguien va a traer», dice {personaje.nombre}. No especifica quién."
    ]}
  ],
  opciones: [
    { label: "Poner plata y salir a comprar.", requiere: { stats: { mangos: { min: 400 } } }, requisitoTexto: "$400",
      efectos: { mangos: -400, aguante: 22, karma: 20, conciencia: 8 },
      resultado: ["Volvés con tres kilos y sos un héroe durante cuatro horas. Es la forma más barata de ser querido.",
                  "Pagás todo. Nadie te lo devuelve. Nadie te lo iba a devolver y lo sabías al salir."] },
    { label: "Quedarte con el fuego y esperar.", efectos: { aguante: -8, conciencia: 12, karma: 5, paranoia: -10 },
      resultado: ["Dos horas mirando brasas con siete personas y nada arriba de la parrilla. Es lo más cerca del zen que llega este país.",
                  "No llega la carne. A las once alguien trae fideos. Es una noche perfecta por otras razones."] },
    { label: "Preguntar en voz alta quién iba a traer la carne.", efectos: { karma: -8, conciencia: 8, paranoia: 12 },
      resultado: ["Preguntás. Se hace un silencio de nueve segundos. Rompiste un pacto y ahora todos tienen que mirarse.",
                  "La pregunta desata una discusión de veinte minutos que revela cuatro conflictos anteriores al asado."] },
    { label: "Fumar al lado del fuego y no decir nada.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 20, conciencia: 8, karma: 8, aguante: -5 },
      resultado: ["Armás y convidás. La carne pasa a ser un tema secundario en once minutos.",
                  "El faso resuelve el problema del asado por sustitución de necesidades. Es una solución antigua."] }
  ]
},

{
  id: "ev_gato_circulo", categoria: "trip", tramo: [2, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior"] }, personaje: { tags: ["animal"] }, complicacion: { tags: ["misterio", "astral"] } },
  ascii: "gato",
  variantes: [
    { texto: [
      "El gato negro entra en {escenario} y se sienta exactamente en el centro del círculo.",
      "No lo alimenta nadie y está gordo. Nadie hace ese cálculo en voz alta.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay un gato. Estuvo todo el tiempo. Aparece en las fotos de retiros de hace seis años, según alguien.",
      "Se acomoda en el medio, bosteza, y mira a {personaje.nombre} de un modo que le corta el discurso.",
      "El silencio que produce el gato es mejor que el silencio que produce la guía."
    ]}
  ],
  opciones: [
    { label: "Aceptar que el gato dirige la ceremonia.", efectos: { conciencia: 18, paranoia: 8, karma: 8 },
      resultado: ["Todos se acomodan alrededor del gato sin decidirlo. La ceremonia mejora un cuarenta por ciento.",
                  "El gato se acuesta y once personas se acuestan. No hubo instrucción. Hubo obediencia."] },
    { label: "Sacarlo del círculo.", efectos: { karma: -12, paranoia: 15, conciencia: 5 },
      resultado: ["Lo levantás. Te clava una mirada de tres segundos que vas a recordar en el lecho de muerte. Después vuelve.",
                  "Lo sacás. Vuelve por otro lado. Lo sacás de nuevo. Vuelve. Perdiste."] },
    { label: "Seguir al gato cuando se va.", efectos: { conciencia: 20, paranoia: 12, aguante: -8 },
      resultado: ["Lo seguís por un pasillo, un patio y una puerta. Te lleva a un lugar del predio que no sabías que existía.",
                  "Camina cuarenta metros y se sienta a mirar una pared. Vos también mirás la pared. Pasan cosas."] },
    { label: "Darle de comer.", efectos: { karma: 15, conciencia: 8, aguante: -3 },
      resultado: ["Le das de lo tuyo. Come sin agradecer, con dignidad completa. Aprendés algo sobre recibir.",
                  "Acepta la comida y después te ignora durante ocho horas. Es una lección de vínculos."] }
  ]
},

{
  id: "ev_traductor_falso", categoria: "dialogo", tramo: [2], peso: 8, unlock: null,
  slots: { escenario: { tags: ["ritual"] }, personaje: { tags: ["chanta", "social"] }, personaje2: { tags: ["guru"] } },
  variantes: [
    { texto: [
      "El maestro habla en portugués. {^personaje.nombre} traduce.",
      "{personaje.nombre} no sabe portugués. Lo descubrís cuando el maestro dice una frase de cuatro palabras y la traducción dura cuarenta segundos.",
      "Nadie más lo nota, o nadie más quiere ser el que lo nota."
    ]},
    { texto: [
      "«Ele diz que...» arranca {personaje.nombre} en {escenario}, y a partir de ahí improvisa con una confianza admirable.",
      "El maestro asiente porque no entiende castellano. Es un sistema cerrado y perfecto.",
      "Lo que se está diciendo, en el neto, no lo dijo nadie."
    ]}
  ],
  opciones: [
    { label: "Exponerlo delante de todos.", efectos: { conciencia: 16, karma: -8, paranoia: 12 }, flags: { set: ["expuso_traductor"] },
      resultado: ["Decís tres palabras en portugués y el sistema se cae en dos segundos. El maestro te mira con alivio.",
                  "Se hace un escándalo hermoso. El retiro se divide en dos bandos por el resto del fin de semana."] },
    { label: "Dejarlo seguir porque lo que inventa es mejor.", efectos: { conciencia: 12, karma: 3, paranoia: 5 },
      resultado: ["Lo que improvisa es genuinamente bueno. Descubrís que el mensaje no necesitaba al mensajero.",
                  "Callás y disfrutás. Es una obra de teatro y la entrada ya está paga."] },
    { label: "Hablar directo con el maestro en portuñol.", efectos: { conciencia: 20, karma: 10, aguante: -5 },
      resultado: ["Cuarenta minutos de portuñol atroz y una conversación de las mejores de tu vida. La barrera del idioma era el único filtro honesto.",
                  "Te entiende un sesenta por ciento y ese sesenta por ciento es todo lo que necesitabas."] },
    { label: "Ofrecerte como traductor y cobrar.", efectos: { mangos: 400, karma: -10, conciencia: 8 },
      resultado: ["Le arrebatás el puesto y el ingreso. Traducís bien. Ahora sos parte de la estructura y eso tiene un costo.",
                  "Negociás una comisión. Sos oficialmente parte del negocio y encima lo hacés mejor."] }
  ]
},

{
  id: "ev_carpa_ronquidos", categoria: "descanso", tramo: [2], peso: 9, unlock: null,
  slots: { escenario: { tags: ["ritual", "naturaleza", "precario"] }, personaje: { tags: ["social"] }, complicacion: { tags: ["ruido", "social"] } },
  variantes: [
    { texto: [
      "Te asignaron la carpa de los que roncan en {escenario}, y son cuatro, y están sincronizados.",
      "No es un ronquido: es una obra coral con movimientos.",
      "{^complicacion}."
    ]},
    { texto: [
      "Tres y veinte de la mañana. La lona respira con el viento y adentro hay un ruido que no se puede describir sin exagerar, así que hay que exagerar.",
      "{personaje.nombre} está a treinta centímetros de tu cabeza produciendo un sonido que en otro contexto sería un diagnóstico.",
      "Tenés que resolver esto o no vas a dormir."
    ]}
  ],
  opciones: [
    { label: "Aguantar y practicar la aceptación.", efectos: { aguante: 8, conciencia: 16, paranoia: 8 },
      resultado: ["Cuatro horas de aceptación forzada. Es el ejercicio espiritual más duro y más efectivo del retiro.",
                  "En algún momento el ronquido se vuelve mantra. No hay una técnica: hay agotamiento."] },
    { label: "Salir a dormir afuera.", efectos: { aguante: 12, paranoia: -10, conciencia: 8 },
      riesgo: { prob: 0.35, efectos: { aguante: -15 }, resultado: ["Baja la temperatura ocho grados a las cinco y te despertás con la ropa mojada de rocío y una tos que va a durar dos tramos."] },
      resultado: ["Afuera hay estrellas y frío y silencio. Elegís bien.",
                  "Dormís cuatro horas mirando el cielo y es lo mejor del fin de semana."] },
    { label: "Despertarlo.", efectos: { aguante: 5, karma: -8, paranoia: 8 },
      resultado: ["Se despierta, te mira, se da vuelta, y arranca de nuevo en cuarenta segundos con más volumen. Represalia inconsciente.",
                  "«Perdón», dice, y a los dos minutos empieza otra vez. No es culpa suya y no importa."] },
    { label: "Ir a buscar algo para dormir.", requiere: { stats: { mangos: { min: 100 } } }, requisitoTexto: "$100",
      efectos: { mangos: -100, efecto: 20, aguante: 15, paranoia: -8 },
      resultado: ["Alguien tiene algo. Siempre alguien tiene algo. Dormís nueve horas y te perdés la meditación del amanecer.",
                  "Media pastilla de origen incierto y una noche entera de servicio. Se paga después."] }
  ]
},

{
  id: "ev_amanecer_azotea", categoria: "descanso", tramo: [3, 4], peso: 10, unlock: null,
  slots: { escenario: { tags: ["noche", "urbano", "trip"] }, personaje: { tags: ["social", "quimico", "joven"] } },
  ascii: "vias",
  variantes: [
    { texto: [
      "Amanece en {escenario}. Ya no es noche y todavía no es día y ese estado no tiene nombre.",
      "{personaje.nombre} está al lado tuyo sin hablar, que es lo mejor que puede hacer una persona a esta hora.",
      "Abajo empieza a pasar gente que va a trabajar. Los dos mundos se cruzan tres minutos y se separan."
    ]},
    { texto: [
      "El cielo hace eso que hace. Vos estás despierto desde hace veintidós horas y por eso lo ves bien.",
      "{^escenario}: {escenario.detalle}.",
      "Pasa un tren. Después otro. Entre los dos trenes hay un silencio de una calidad que no se consigue de otra forma."
    ]}
  ],
  opciones: [
    { label: "Quedarte hasta que salga el sol entero.", efectos: { conciencia: 20, aguante: -10, paranoia: -20, efecto: -20 },
      resultado: ["Se te acomoda algo mirando eso. No es la sustancia: es haber estado despierto lo suficiente para verlo.",
                  "Cuarenta minutos de amanecer completo. Es lo que viniste a buscar y no estaba en el programa."] },
    { label: "Irte a dormir antes del sol.", efectos: { aguante: 20, conciencia: 5, efecto: -25 },
      resultado: ["Cerrás la persiana justo cuando aclara, que es una forma de negociar con el día.",
                  "Dormís hasta las cuatro de la tarde. Fue una decisión sanitaria y no espiritual, y también sirve."] },
    { label: "Ponerte a hablar de todo con {personaje.nombre}.", efectos: { conciencia: 18, karma: 15, aguante: -12, paranoia: -12 },
      resultado: ["Dos horas y media de las buenas. Se dicen cosas que no se pueden decir con luz de día.",
                  "Se cuentan la vida entera. Mañana van a estar un poco incómodos y va a valer la pena."] },
    { label: "Prometer en voz alta que cambiás tu vida.", efectos: { conciencia: 12, karma: 5, paranoia: 5 }, flags: { set: ["promesa_amanecer"] },
      resultado: ["Lo dices fuerte, con el sol saliendo, como en una película. Vas a cumplir tres días.",
                  "«Desde mañana», anunciás. El «desde mañana» del amanecer tiene una tasa de cumplimiento del once por ciento."] }
  ]
},

{
  id: "ev_señora_palo", categoria: "combate", tramo: [1, 3], peso: 8, unlock: null,
  slots: { escenario: { tags: ["interior", "urbano"] }, personaje: { tags: ["testigo", "social"] }, complicacion: { tags: ["ruido", "social"] } },
  variantes: [
    { texto: [
      "Empiezan los golpes en el techo. Tres, pausa, tres. Es un código y todos lo entienden.",
      "{personaje.nombre}, {personaje.mote}, no duerme desde que se jubiló y lo convirtió en una vocación.",
      "{^complicacion}."
    ]},
    { texto: [
      "El timbre suena once veces seguidas en {escenario}. Once. Contadas.",
      "Del otro lado de la puerta hay {personaje.desc}, en camisón, con una autoridad moral impecable.",
      "«Son las cuatro y media», anuncia, como si eso fuera un argumento. Y lo es."
    ]}
  ],
  opciones: [
    { label: "Bajar la música y disculparte.", efectos: { karma: 12, paranoia: -10, conciencia: 8 },
      resultado: ["Te disculpás en serio, sin ironía. Se desarma. Termina contándote de su marido durante veinte minutos.",
                  "Bajás todo. Pide perdón ella por haber golpeado. Se abraza el barrio."] },
    { label: "Invitarla a entrar.", efectos: { karma: 20, conciencia: 18, paranoia: -15, aguante: -5 },
      riesgo: { prob: 0.3, efectos: { paranoia: 15, karma: -5 }, resultado: ["Entra. Se queda cuatro horas. Toma de todo. A las nueve de la mañana está mejor que ustedes y no se quiere ir."] },
      resultado: ["Increíblemente, entra. Increíblemente, es lo mejor que pasó en la noche.",
                  "Dice que no y se queda charlando en la puerta cuarenta minutos, lo cual es decir que sí."] },
    { label: "Ignorarla.", efectos: { karma: -12, paranoia: 18 },
      resultado: ["Sigue golpeando cuarenta minutos con una resistencia física admirable. A las cinco llama a la policía.",
                  "No abrís. Los golpes paran a las cinco y diez. El silencio que sigue es peor que los golpes."] },
    { label: "Discutirle de igual a igual.", efectos: { karma: -8, paranoia: 12, conciencia: 5 },
      riesgo: { prob: 0.5, efectos: { paranoia: 20, aguante: -8 }, resultado: ["Te gana la discusión con dos frases porque tiene setenta y ocho años de práctica y vos tenés cuatro horas de sueño."] },
      resultado: ["Discuten ocho minutos. Empate. Los dos quedan con respeto mutuo y ninguno lo admite.",
                  "Le contestás y se pone peor y después mejor y termina en un empate diplomático."] }
  ]
},

{
  id: "ev_bondi_ultimo", categoria: "trip", tramo: [1, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["transito", "noche"] }, personaje: { tags: ["social", "lumpen", "transito"] }, complicacion: { tags: ["ruido", "trip", "social"] } },
  ascii: "colectivo",
  variantes: [
    { texto: [
      "El último servicio. Cuatro pasajeros, dos de los cuales están hablando solos, y uno de esos dos sos vos.",
      "En {escenario} el piso está mojado y nadie sabe de qué.",
      "{^complicacion}."
    ]},
    { texto: [
      "El colectivo va vacío y va rápido, como van los colectivos cuando ya nadie los controla.",
      "{personaje.desc}, sentado adelante, canta bajito.",
      "Cada frenada te reorganiza el cuerpo y cada arranque te reorganiza el alma."
    ]}
  ],
  opciones: [
    { label: "Mirar por la ventanilla treinta cuadras.", efectos: { conciencia: 16, paranoia: -12, efecto: -12 },
      resultado: ["Treinta cuadras de ciudad vacía. La ciudad de noche te explica cosas que de día se guarda.",
                  "Se te pasa el viaje sin darte cuenta y llegás mejor de lo que subiste."] },
    { label: "Ponerte a hablar con {personaje.nombre}.", efectos: { conciencia: 14, karma: 12, paranoia: -8 },
      resultado: ["Cuarenta minutos con un desconocido en un colectivo vacío. La forma más pura de conversación disponible.",
                  "Te cuenta su vida en veinte cuadras. Te bajás antes del final y te va a quedar la duda."] },
    { label: "Dormirte y pasarte de parada.", efectos: { aguante: 12, conciencia: 5, paranoia: 8, mangos: -200 },
      resultado: ["Te despertás en la cabecera, en un barrio que no conocés, a las cuatro y diez. Ahora hay que resolver esto.",
                  "Doce cuadras de más. El chofer te avisa con una amabilidad que no esperabas."] },
    { label: "Bajarte antes en un lugar al azar.", efectos: { conciencia: 12, paranoia: 12, aguante: -8 }, flags: { set: ["desvio"] },
      resultado: ["Timbrás sin motivo y te bajás en una esquina que no elegiste. A veces así arrancan las cosas.",
                  "Te bajás en el medio de nada. El colectivo se va y ahí entendés lo que hiciste."] }
  ]
},

{
  id: "ev_espejo_bano", categoria: "trip", tramo: [2, 3], peso: 10, unlock: null,
  requiere: { stats: { efecto: { min: 30 } } },
  slots: { escenario: { tags: ["interior", "quimico", "urbano"] }, complicacion: { tags: ["trip", "astral", "cuerpo"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "El baño de {escenario}. La luz es blanca y no perdona.",
      "Te mirás al espejo un poco más de lo aconsejable y el reflejo hace algo mínimo, imposible de probar.",
      "{^complicacion}."
    ]},
    { texto: [
      "Entrás al baño a mojarte la cara y te quedás nueve minutos mirándote, que es cuatro veces el límite seguro.",
      "La cara se te descompone en partes: hay una nariz, hay dos ojos, hay una boca. Ninguna se conoce entre sí.",
      "Alguien golpea la puerta y no sabés desde cuándo."
    ]}
  ],
  opciones: [
    { label: "Sostener la mirada hasta el final.", efectos: { conciencia: 22, paranoia: 20, aguante: -8 },
      resultado: ["Aguantás. En algún momento el reflejo deja de ser tuyo y después vuelve a serlo, y en ese ir y venir aprendés algo caro.",
                  "Cuatro minutos de espejo. Salís peor y más lejos, que es la moneda de este juego."] },
    { label: "Mojarte la cara y salir.", efectos: { paranoia: -12, conciencia: 6, efecto: -8 },
      resultado: ["Agua fría, cuatro respiraciones, y afuera. Manejo de crisis nivel profesional.",
                  "Te lavás la cara y no te volvés a mirar. Es la decisión correcta y la sabés tomar."] },
    { label: "Hablarle al reflejo.", efectos: { conciencia: 18, paranoia: 25 },
      riesgo: { prob: 0.4, efectos: { paranoia: 20, conciencia: 5 }, resultado: ["Te contesta. Con tu voz, medio segundo tarde. Vas a evitar los espejos por lo que queda de la run."] },
      resultado: ["Le decís cuatro cosas. No contesta pero anota.",
                  "Te pedís perdón a vos mismo en voz alta en un baño ajeno. Es ridículo y es un avance."] },
    { label: "Taparlo con una toalla.", efectos: { paranoia: -18, conciencia: 8, karma: -3 },
      resultado: ["Colgás una toalla sobre el espejo. Práctico, decisivo, cobarde en el mejor sentido.",
                  "Lo tapás. Al día siguiente alguien va a preguntar quién hizo esto y nadie va a responder."] }
  ]
},

{
  id: "ev_promesa_incumplida", categoria: "dialogo", tramo: [2, 3, 4], peso: 9, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["familia", "social", "cuidadora"] } },
  variantes: [
    { texto: [
      "Se te viene encima el recuerdo de la promesa. La hiciste hace once días y era específica.",
      "En {escenario} no hay nadie que te la pueda reclamar, y eso la hace peor.",
      "{personaje.nombre} confió y eso queda en algún registro que no manejás vos."
    ]},
    { texto: [
      "«Prometeme una cosa», te dijo {personaje.nombre}. Y prometiste. Y estás justo haciendo lo contrario.",
      "El cálculo es simple: podés seguir o podés parar.",
      "Nadie se va a enterar de cuál de las dos elegís, salvo vos, que es el único testigo que no se puede sobornar."
    ]}
  ],
  opciones: [
    { label: "Parar acá. Cumplir.", efectos: { conciencia: 20, karma: 20, efecto: -25, paranoia: -12, aguante: 8 }, flags: { set: ["cumplio_promesa"] },
      resultado: ["Parás. Es aburrido y es enorme. No hay aplausos porque no hay público.",
                  "Dejás lo que estabas haciendo y te sentás. Nadie entiende nada. Es la mejor decisión del viaje."] },
    { label: "Seguir y prometerte compensarlo después.", efectos: { karma: -12, conciencia: 5, paranoia: 12 },
      resultado: ["El «después» es la moneda con la que se paga la culpa y no cotiza en ningún mercado.",
                  "Seguís. Armás un plan de compensación bastante elaborado que no vas a ejecutar."] },
    { label: "Llamar y confesar.", efectos: { karma: 15, conciencia: 15, paranoia: -18 },
      riesgo: { prob: 0.35, efectos: { karma: -5, conciencia: 8, paranoia: 12 }, resultado: ["Te corta. No grita, no discute: corta. Eso va a doler más que cualquier pelea."] },
      resultado: ["Confesás todo. Te escucha. «Bueno», dice. «Gracias por decirme.» Y algo se reordena.",
                  "Lo decís y del otro lado hay silencio y después una risa cansada. «Ya sabía», dice."] },
    { label: "Convencerte de que la promesa era injusta.", efectos: { karma: -15, conciencia: -5, paranoia: 8 },
      resultado: ["Construís un argumento sólido en cuatro minutos. Sos muy bueno en esto y eso es exactamente el problema.",
                  "Reescribís la promesa hasta que te da la razón. Es un talento y es una condena."] }
  ]
},

{
  id: "ev_venta_alma", categoria: "comercio", tramo: [2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["urbano", "interior", "social"] }, personaje: { tags: ["chanta", "comercio"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} te propone un negocio en {escenario} y el negocio sos vos.",
      "«Vos tenés cara de confiable», dice. «Con eso ya está la mitad.»",
      "La propuesta es concreta, es rentable y es una porquería, tres cosas que suelen viajar juntas."
    ]},
    { texto: [
      "«Te lo explico en dos minutos», dice {personaje.nombre}, y tarda veinte, y en el minuto ocho entendés que es una estafa y en el minuto quince entendés que funciona.",
      "Hay una planilla. Hay proyecciones. Hay una lista de contactos.",
      "«Vos ponés la cara y el discurso», resume. «Yo pongo el resto.»"
    ]}
  ],
  opciones: [
    { label: "Aceptar y facturar.", efectos: { mangos: 1200, karma: -25, conciencia: 12, paranoia: 12 }, flags: { set: ["socio_del_chanta"] },
      resultado: ["Aceptás. En dos semanas tenés más plata que en dos años. La conciencia sube porque entender el mecanismo también es entender algo.",
                  "Se dan la mano. Hay una claridad en la corrupción que la búsqueda espiritual nunca te dio."] },
    { label: "Rechazar y decirle lo que pensás.", efectos: { karma: 18, conciencia: 12, mangos: 0 },
      resultado: ["Le decís no y le decís por qué. Se ríe. «Vas a volver», dice. Y hay una posibilidad no nula de que tenga razón.",
                  "Rechazás con dignidad. Te sentís bien nueve minutos y después te acordás de cuánta plata era."] },
    { label: "Pedirle una parte más grande.", efectos: { mangos: 700, karma: -18, conciencia: 15, paranoia: 15 },
      riesgo: { prob: 0.4, efectos: { mangos: -300, karma: -8, paranoia: 15 }, resultado: ["Negociás mal, se ofende, y el negocio se cae. Ahora tenés un enemigo con contactos y ninguna ganancia."] },
      resultado: ["Negociás fuerte. Te respeta más y te quiere menos, que es el intercambio estándar.",
                  "Sacás mejor tajada. Descubrís que sos bueno en esto y eso te preocupa correctamente."] },
    { label: "Robarle la lista de contactos.", efectos: { mangos: 500, karma: -22, paranoia: 25 }, flags: { set: ["traicion"] },
      resultado: ["Le sacás una foto a la planilla mientras va al baño. Ahora tenés el negocio sin el socio y un problema para más adelante.",
                  "Te llevás la lista. Va a haber consecuencias y no van a llegar hoy."] }
  ]
},

{
  id: "ev_bajon_quimico", categoria: "trip", tramo: [2, 3, 4], peso: 11, unlock: null,
  requiere: { stats: { efecto: { min: 55 } } },
  slots: { escenario: {}, complicacion: { tags: ["cuerpo", "quimico", "trip"] } },
  ascii: "cabeza",
  variantes: [
    { texto: [
      "Toca fondo de golpe. No hay transición: hay un antes y un después separados por cuatro segundos.",
      "En {escenario} todo lo que era gracioso pasa a ser insoportable en el mismo orden.",
      "{^complicacion}."
    ]},
    { texto: [
      "El cuerpo dice basta con una claridad administrativa. Te tiembla la mandíbula y tenés frío en los pies.",
      "{^escenario}: {escenario.detalle}. Y ese detalle, ahora, es amenazante.",
      "Hay que hacer algo y todas las opciones son malas."
    ]}
  ],
  opciones: [
    { label: "Pedir ayuda a alguien.", efectos: { aguante: 12, efecto: -25, paranoia: -18, karma: 8, conciencia: 10 },
      resultado: ["Pedís ayuda. Alguien te trae agua y se queda. La humildad tiene una eficacia farmacológica sorprendente.",
                  "«Estoy mal», dices en voz alta. Es la frase más difícil y la más útil."] },
    { label: "Aguantarlo solo en un rincón.", efectos: { aguante: -18, efecto: -20, paranoia: 20, conciencia: 12 },
      resultado: ["Cuarenta minutos en un rincón mirando un punto fijo. Sale. Sale mal pero sale.",
                  "Nadie se enteró. Estás orgulloso de eso y no deberías."] },
    { label: "Tomar más para tapar el bajón.", efectos: { efecto: 30, aguante: -18, paranoia: 20, conciencia: -5 },
      riesgo: { prob: 0.45, efectos: { efecto: 15, aguante: -18 }, resultado: ["El remedio es la enfermedad. Se dijo mil veces y se sigue haciendo. Los próximos noventa minutos son de emergencia."] },
      resultado: ["Tapás el bajón con un techo de chapa. Funciona una hora y después se llueve todo.",
                  "Más. La escalera tiene un solo sentido y vos ya la conocés."] },
    { label: "Comer algo y tomar agua.", efectos: { aguante: 18, efecto: -20, paranoia: -12, conciencia: 5 },
      resultado: ["Un sándwich y medio litro de agua resuelven el ochenta por ciento de todas las crisis místicas registradas.",
                  "Comés despacio. A los quince minutos el mundo vuelve a tener bordes."] }
  ]
},

{
  id: "ev_regalo_extraño", categoria: "comercio", tramo: [1, 2, 3], peso: 8, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["misterio", "veterano", "cuidadora", "animal"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} te da algo sin explicación en {escenario}.",
      "Es {objeto}. Te lo pone en la mano, cierra tus dedos alrededor, y se va.",
      "No hay contexto. No hay recibo. No hay forma de devolverlo."
    ]},
    { texto: [
      "«Esto es para vos», dice {personaje.nombre}, y no aclara nada más.",
      "Lo que te da es {objeto}, que no tiene ningún valor evidente.",
      "Cuando levantás la vista para preguntar, ya no está."
    ]}
  ],
  opciones: [
    { label: "Guardarlo y no preguntar.", efectos: { conciencia: 12, karma: 8, paranoia: 5 }, daReliquia: true,
      resultado: ["Lo guardás en el bolsillo interno. Va a pesar más de lo que pesa por el resto del viaje.",
                  "No preguntás. Los regalos que no se explican son los únicos que sirven."] },
    { label: "Perseguirlo para devolverlo.", efectos: { aguante: -8, conciencia: 8, karma: 5 },
      resultado: ["No lo encontrás. Nadie lo vio. Nadie sabe de quién hablás. Bueno.",
                  "Lo alcanzás y no te lo acepta. «Ya es tuyo», dice, molesto. Y se va de nuevo."] },
    { label: "Tirarlo.", efectos: { karma: -10, paranoia: 12, conciencia: 3 },
      resultado: ["Lo tirás en un tacho. Cuatro cuadras después vas a volver a buscarlo y no va a estar.",
                  "Lo dejás en un banco. Te vas mirando para atrás dos veces."] },
    { label: "Venderlo.", efectos: { mangos: 250, karma: -12, conciencia: 3 },
      resultado: ["Le sacás doscientos cincuenta a un tipo en una feria. Es más de lo que valía y menos de lo que costaba.",
                  "Lo vendés rápido y bien. La transacción es impecable y te deja un gusto raro."] }
  ]
},

{
  id: "ev_desierto_social", categoria: "descanso", tramo: [3, 4], peso: 9, unlock: null,
  requiere: { stats: { paranoia: { min: 45 } } },
  slots: { escenario: {}, complicacion: { tags: ["social", "melancolia", "paranoia"] } },
  variantes: [
    { texto: [
      "Te quedaste solo y no fue de golpe: fue en cuatro etapas y todas las viste venir.",
      "En {escenario} no hay nadie que te conozca de antes de hoy.",
      "{^complicacion}."
    ]},
    { texto: [
      "Repasás la lista de gente a la que podrías llamar ahora. La lista tiene tres nombres y a dos les debés algo.",
      "{^escenario}: {escenario.detalle}. Es un buen lugar para estar solo, si hay que estar solo.",
      "El tercer nombre te da más miedo que los dos primeros."
    ]}
  ],
  opciones: [
    { label: "Aceptar la soledad y sentarte con ella.", efectos: { conciencia: 20, paranoia: -20, aguante: 5 },
      resultado: ["Una hora sentado con la propia compañía sin buscar salida. Es el ejercicio más difícil del catálogo.",
                  "No llamás a nadie. No es orgullo: es que por primera vez no hace falta."] },
    { label: "Llamar al tercer nombre.", efectos: { karma: 12, conciencia: 12, paranoia: -25 },
      riesgo: { prob: 0.4, efectos: { paranoia: 18, karma: -5 }, resultado: ["No atiende. Ni la primera ni la segunda vez. Y la segunda vez ya era demasiado."] },
      resultado: ["Atiende al cuarto tono. «Uh, vos», dice, y hay alegría real en ese «uh, vos».",
                  "Hablan cincuenta minutos como si no hubieran pasado tres años. A veces pasa."] },
    { label: "Buscar gente cualquiera para no estar solo.", efectos: { karma: -5, paranoia: -10, aguante: -8, efecto: 15 },
      resultado: ["Encontrás gente en once minutos porque siempre hay gente. Ninguno te conoce y ninguno te va a recordar.",
                  "Compañía instantánea, de esa que se disuelve en agua. Sirve para esta noche."] },
    { label: "Escribir todo en un cuaderno.", efectos: { conciencia: 18, paranoia: -15, karma: 5 },
      resultado: ["Once páginas en una hora y media. La mitad es autocompasión y la otra mitad es la mejor cosa que escribiste.",
                  "Escribís hasta que te duele la mano. Después leés y hay dos frases que sirven."] }
  ]
},

{
  id: "ev_dilema_del_bolso", categoria: "combate", tramo: [2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["ritual", "interior", "social"] }, personaje: { tags: ["social"] }, personaje2: { tags: ["lumpen", "joven"] } },
  variantes: [
    { texto: [
      "Falta plata de un bolso en {escenario} y ya se dijo en voz alta, que es el punto de no retorno.",
      "{personaje.nombre} está buscando culpables con un método que no es un método.",
      "Vos viste algo. Viste una cosa chica y ambigua, y ahora tenés que decidir qué hacer con eso."
    ]},
    { texto: [
      "«Acá hay alguien que se llevó algo», anuncia {personaje.nombre}, y once personas se convierten en once sospechosos.",
      "{personaje2.desc} es el que menos aguanta la mirada de todos, y eso no prueba nada y va a alcanzar.",
      "Se está armando una injusticia en tiempo real y es rápida."
    ]}
  ],
  opciones: [
    { label: "Decir lo que viste.", efectos: { karma: 5, conciencia: 15, paranoia: 12 },
      riesgo: { prob: 0.4, efectos: { karma: -15, conciencia: 5 }, resultado: ["Lo que viste era otra cosa. Acusaste a alguien inocente delante de once personas y no hay forma de desdecirlo."] },
      resultado: ["Lo decís con todas las salvedades. Se resuelve rápido y bien. Alguien devuelve la plata y nadie lo humilla.",
                  "Hablás. Es incómodo, es correcto, y funciona."] },
    { label: "Defender al sospechoso sin pruebas.", efectos: { karma: 18, conciencia: 12, paranoia: 15 },
      resultado: ["Te pones adelante sin tener nada. Es un acto de fe y sale bien: aparece la plata en otro bolsillo.",
                  "«No fue él», decís, y no podés probarlo, y con eso la cacería se frena. Alguien tenía que hacerlo."] },
    { label: "Callarte y mirar el piso.", efectos: { karma: -12, conciencia: 5, paranoia: 15 },
      resultado: ["Te callás. Se lo llevan al pibe a un cuarto. No vas a saber qué pasó ahí y vas a suponer.",
                  "Silencio. El silencio en estos casos es una firma."] },
    { label: "Poner la plata de tu bolsillo y cerrar el tema.", requiere: { stats: { mangos: { min: 500 } } }, requisitoTexto: "$500",
      efectos: { mangos: -500, karma: 20, conciencia: 18, paranoia: -12 },
      resultado: ["«Apareció», decís, poniendo tu propia plata sobre la mesa. Nadie te cree y todos te agradecen.",
                  "Comprás la paz del grupo con quinientos pesos. Es la compra más eficiente del viaje."] }
  ]
},

{
  id: "ev_iluminacion_falsa", categoria: "trip", tramo: [3, 4], peso: 10, unlock: null,
  requiere: { stats: { conciencia: { min: 45 } } },
  slots: { escenario: {}, complicacion: { tags: ["trip", "astral", "misterio"] } },
  ascii: "estrella",
  variantes: [
    { texto: [
      "Pasa. Pasa de verdad. En {escenario}, sin aviso, se te acomoda todo y entendés absolutamente todo.",
      "Dura cuarenta segundos y en esos cuarenta segundos sos una persona completa.",
      "{^complicacion}, y en el segundo cuarenta y uno empieza a irse."
    ]},
    { texto: [
      "Se abre. No hay otra forma de decirlo sin sonar como un folleto de retiro: se abre.",
      "El problema no es que se abra. El problema es lo que hacés en los tres minutos siguientes.",
      "Ya empezás a narrártelo internamente, y narrarlo es empezar a perderlo."
    ]}
  ],
  opciones: [
    { label: "No hacer nada. Dejarlo pasar.", efectos: { conciencia: 25, paranoia: -18, karma: 8 },
      resultado: ["No lo agarrás. No lo contás. No lo posteás. Se va y deja algo, porque lo que no se agarra deja.",
                  "Te quedás quieto hasta que se va solo. Es lo más difícil que hiciste en toda la run."] },
    { label: "Intentar retenerlo.", efectos: { conciencia: 8, paranoia: 20, aguante: -10 },
      resultado: ["Lo agarrás con las dos manos y se te deshace, exactamente como estaba previsto en todos los manuales que no leíste.",
                  "Forzás. Se va más rápido y se lleva un poco de lo que había antes."] },
    { label: "Ir a contárselo a alguien inmediatamente.", efectos: { conciencia: 6, karma: 5, paranoia: 12 },
      resultado: ["Se lo contás a tres personas en veinte minutos. Con cada relato se hace más chico y más falso.",
                  "En el segundo relato ya estás exagerando. En el tercero es una anécdota."] },
    { label: "Escribir una sola frase y guardarla.", efectos: { conciencia: 20, karma: 5, paranoia: -10 },
      resultado: ["Escribís siete palabras en un papel. Mañana no las vas a entender y pasado mañana sí.",
                  "Una frase. Nada más. Es la decisión de un profesional y no sos un profesional, y aun así."] }
  ]
},

{
  id: "ev_ofrecen_guiar", categoria: "ruta", tramo: [3, 4], peso: 9, unlock: null,
  requiere: { stats: { conciencia: { min: 55 } } },
  slots: { escenario: { tags: ["ritual", "social"] }, personaje: { tags: ["guru", "chanta", "social"] } },
  variantes: [
    { texto: [
      "{personaje.nombre} te lleva aparte en {escenario} y te dice que tenés «algo».",
      "La propuesta es que empieces a guiar. Que hables adelante. Que cobres.",
      "Lo dice como una oportunidad y también es una prueba, y no aclara cuál de las dos pesa más."
    ]},
    { texto: [
      "«La gente te escucha», dice {personaje.nombre}. «Yo lo veo. Vos tenés lo que hay que tener.»",
      "Después habla de porcentajes.",
      "En {escenario}, la frase «vos tenés lo que hay que tener» está cotizando muy alto y muy barato al mismo tiempo."
    ]}
  ],
  opciones: [
    { label: "Aceptar y guiar en serio, sin cobrar.", efectos: { conciencia: 22, karma: 20, mangos: -200, aguante: -10 }, flags: { set: ["guia_honesto"] },
      resultado: ["Guiás una ronda de once personas sin cobrar un peso. Es agotador y es la primera cosa que hiciste bien en años.",
                  "Aceptás la parte del trabajo y rechazás la de la caja. {^personaje.nombre} no lo entiende y te respeta igual."] },
    { label: "Aceptar y cobrar bien.", efectos: { conciencia: 15, karma: -20, mangos: 900 }, flags: { set: ["socio_del_chanta", "guia_chanta"] },
      resultado: ["Cobrás como cobra él. Sos bueno en esto, alarmantemente bueno, y esa es la información nueva.",
                  "Primera ronda propia: nueve personas, doscientos cada uno. Sale redondo y algo se cierra mal para siempre."] },
    { label: "Rechazar y seguir buscando.", efectos: { conciencia: 18, karma: 10, paranoia: -8 }, flags: { set: ["camino_propio"] },
      resultado: ["«Todavía no», decís, y esa es la respuesta más difícil porque no cierra ninguna puerta y no abre ninguna.",
                  "Le decís que no estás. Se sorprende de verdad. «Vos sos el primero que dice eso.»"] },
    { label: "Preguntarle por qué te elige a vos.", efectos: { conciencia: 15, karma: 5, paranoia: 8 },
      resultado: ["«Porque te falta plata y te sobran ganas», dice, con una honestidad brutal. Es un diagnóstico correcto.",
                  "«Porque estás roto en el lugar justo», contesta. Y esa frase te va a acompañar mucho tiempo."] }
  ]
},

{
  id: "ev_frio_madrugada", categoria: "descanso", tramo: [1, 2, 3], peso: 9, unlock: null,
  requiere: { stats: { aguante: { max: 50 } } },
  slots: { escenario: {}, personaje: { tags: ["social", "cuidadora", "lumpen"] } },
  variantes: [
    { texto: [
      "Bajó la temperatura de golpe y nadie trajo abrigo porque era verano a las siete de la tarde.",
      "En {escenario} el frío entra por las rodillas y sube.",
      "{personaje.nombre} tiene una manta y una decisión que tomar."
    ]},
    { texto: [
      "Cinco y cuarenta de la mañana, la hora más fría del planeta, y vos sin campera.",
      "El cuerpo empieza a temblar con un ritmo propio que no podés detener con la voluntad.",
      "{personaje.desc} se acerca con {objeto} en la mano."
    ]}
  ],
  opciones: [
    { label: "Aceptar la manta y agradecer.", efectos: { aguante: 20, karma: 8, paranoia: -12, conciencia: 8 },
      resultado: ["Te tapa. No dice nada. La manta tiene dibujos de autitos y no te importa nada en absoluto.",
                  "Aceptás. Es la primera vez en el viaje que recibís algo sin sospechar."] },
    { label: "Rechazarla para que la use otro.", efectos: { aguante: -12, karma: 20, conciencia: 15 },
      resultado: ["Señalás a alguien que está peor. Se la lleva. Vos pasás frío cuatro horas y sabés exactamente por qué.",
                  "«Dásela a él», decís. Es un lujo caro y te lo podés dar por una vez."] },
    { label: "Compartirla.", efectos: { aguante: 12, karma: 15, conciencia: 12, paranoia: -15 },
      resultado: ["Dos personas, una manta, cuatro horas. Se resuelve la termodinámica y otra cosa más.",
                  "Comparten en silencio. Al amanecer no hace falta decir nada y no se dice nada."] },
    { label: "Moverte para generar calor.", efectos: { aguante: -8, conciencia: 10, efecto: -15, paranoia: -8 },
      resultado: ["Caminás en círculos cuarenta minutos como un preso. Funciona parcialmente y te despeja del todo.",
                  "Saltás en el lugar. Es ridículo, es efectivo, y alguien se te suma."] }
  ]
},

{
  id: "ev_pibe_pregunta", categoria: "dialogo", tramo: [1, 2, 3], peso: 9, unlock: null,
  slots: { escenario: { tags: ["publico", "urbano", "conurbano", "social"] }, personaje: { tags: ["inocente", "joven"] } },
  variantes: [
    { texto: [
      "{personaje.desc}. Se te acerca en {escenario} y te hace una pregunta.",
      "La pregunta es simple, de seis palabras, y no tenés respuesta.",
      "Espera. Los chicos esperan de verdad, sin resolver el silencio por vos."
    ]},
    { texto: [
      "«¿Vos por qué estás triste?», te pregunta {personaje.nombre}, con la pelota abajo del brazo.",
      "En {escenario} no había nadie más que pudiera hacer esa pregunta.",
      "Y encima la hizo bien: no dijo «¿estás triste?». Dijo «por qué»."
    ]}
  ],
  opciones: [
    { label: "Contestarle la verdad, en simple.", efectos: { conciencia: 20, karma: 15, paranoia: -12 },
      resultado: ["Le explicás tu vida en cuatro frases cortas. Es el mejor resumen que hiciste nunca y te lo saca un pibe de nueve años.",
                  "Le decís la verdad. Dice «ah» y patea la pelota. Cerró el tema mejor que cualquier terapeuta."] },
    { label: "Contestarle con una frase mística.", efectos: { conciencia: 3, karma: -8 },
      resultado: ["Le decís algo sobre el karma. Te mira dos segundos y se va. Perdiste una oportunidad histórica.",
                  "«El sufrimiento es maestro», le dices. «Ah», dice él, con una piedad enorme."] },
    { label: "Jugar a la pelota y no contestar.", efectos: { aguante: -12, karma: 18, conciencia: 15, paranoia: -20, efecto: -15 },
      resultado: ["Cuarenta minutos de pelota. No contestaste nada y contestaste todo.",
                  "Perdés cinco a dos. Es la mejor terapia del catálogo y es gratis."] },
    { label: "Preguntarle vos a él.", efectos: { conciencia: 16, karma: 10 },
      resultado: ["Le preguntás qué quiere ser cuando sea grande. La respuesta te desarma por lo concreta.",
                  "«¿Y vos qué buscás?», le preguntás. «La pelota», dice. Fin del retiro. Ya está. Es eso."] }
  ]
},

{
  id: "ev_ultima_moneda", categoria: "comercio", tramo: [2, 3, 4], peso: 9, unlock: null,
  requiere: { stats: { mangos: { max: 150 } } },
  slots: { escenario: { tags: ["urbano", "comercio", "transito"] }, personaje: { tags: ["comercio", "lumpen", "cuidadora"] } },
  ascii: "billete",
  variantes: [
    { texto: [
      "Te queda lo que te queda y no alcanza para las dos cosas.",
      "En {escenario} hay que elegir entre el bondi de vuelta y comer.",
      "{personaje.nombre} espera que decidas porque hay una fila atrás."
    ]},
    { texto: [
      "Contás la plata tres veces por si aparece más. No aparece más.",
      "{^escenario}: {escenario.detalle}. Y vos con el bolsillo dando el último aviso.",
      "«¿Llevás o no llevás?», pregunta {personaje.nombre}, sin maldad."
    ]}
  ],
  opciones: [
    { label: "Comer y volver caminando.", efectos: { mangos: -120, aguante: 5, conciencia: 12, karma: 5 },
      resultado: ["Comés y caminás cincuenta cuadras. En la cuadra treinta pasa algo bueno en la cabeza.",
                  "Elegís el cuerpo. Tres horas de caminata y una lucidez que no se compra."] },
    { label: "Guardar la plata y aguantar el hambre.", efectos: { aguante: -15, conciencia: 8, paranoia: 8 },
      resultado: ["No comés. Llegás. La decisión correcta no siempre se siente correcta.",
                  "Aguantás. En el bondi, con el estómago vacío, todo se ve un poco más nítido y peor."] },
    { label: "Pedir.", efectos: { karma: 5, conciencia: 15, paranoia: 12, mangos: 200 },
      riesgo: { prob: 0.4, efectos: { karma: -5, paranoia: 15, conciencia: 5 }, resultado: ["Pedís y te dicen que no cuatro veces seguidas. La quinta persona ni te mira. Aprendés algo sobre la ciudad."] },
      resultado: ["Pedís y te dan. Te dan más de lo que pediste. Vas a pensar en esto mucho tiempo.",
                  "La tercera persona te da doscientos y una palmada. La humildad cotiza mejor de lo que pensabas."] },
    { label: "Ofrecer un servicio espiritual por plata.", efectos: { mangos: 300, karma: -10, conciencia: 8 },
      resultado: ["Le lees la mano a tres personas en una esquina. Dos se emocionan. Cobrás cien cada una. Funciona.",
                  "Improvisás una limpieza energética en la vereda. Es un delito menor y una comedia mayor."] }
  ]
},

{
  id: "ev_carta_a_nadie", categoria: "descanso", tramo: [3, 4], peso: 8, unlock: null,
  slots: { escenario: {}, personaje: { tags: ["familia", "duelo", "social"] } },
  variantes: [
    { texto: [
      "Encontrás un lápiz y un papel en {escenario}, y eso alcanza para meterse en problemas.",
      "Le escribís a {personaje.nombre}, que no lo va a leer nunca, por distintos motivos según el caso.",
      "Empezás con «no sé si esto te va a llegar», que es como empiezan todas."
    ]},
    { texto: [
      "Hay que decirle algo a alguien y ese alguien no está disponible.",
      "En {escenario}, con {objeto} de apoyo, escribís cuatro renglones y tachás tres.",
      "El que queda es el que importaba."
    ]}
  ],
  opciones: [
    { label: "Escribir todo y quemarla.", efectos: { conciencia: 20, karma: 12, paranoia: -20 },
      requiere: { flags: { none: [] } },
      resultado: ["Cuatro carillas y un encendedor. El humo se lleva menos de lo que prometen los manuales y algo se lleva.",
                  "Arde rápido. Te quedás mirando las cenizas más tiempo del razonable y sale bien."] },
    { label: "Escribirla y guardarla.", efectos: { conciencia: 15, paranoia: -10, karma: 5 },
      resultado: ["La doblás en cuatro y la guardás. Vas a encontrarla en dos años en un bolsillo y te vas a sentar en el piso.",
                  "Guardada. Existe. Eso ya cambia algo."] },
    { label: "Escribirla y mandarla de verdad.", efectos: { conciencia: 12, karma: 15, paranoia: 15 },
      riesgo: { prob: 0.45, efectos: { paranoia: 20, karma: -5 }, resultado: ["La manda y no contesta. El silencio después de mandar una carta así es un objeto sólido que te vas a llevar puesto."] },
      resultado: ["La mandás. Contesta a las cuatro horas con tres palabras que valen más que las cuatro carillas.",
                  "La mandás y te arrepentís nueve minutos y después no."] },
    { label: "No escribir nada y quedarte con el lápiz.", efectos: { conciencia: 5, paranoia: 10 },
      resultado: ["Te guardás el lápiz. Es un gesto muy elocuente sobre cómo venís manejando las cosas.",
                  "Miras el papel en blanco once minutos y lo dejás en blanco. También es una decisión."] }
  ]
}

]);
