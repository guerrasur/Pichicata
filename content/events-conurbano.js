/* PICHICATA — pack A1: Circuito Conurbano. 13 eventos. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "cn_taller_ceremonia", categoria: "ritual", tramo: [1, 2], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "ritual"] }, personaje: { tags: ["conurbano", "guru", "chanta"] }, complicacion: { tags: ["precario", "ritual"] } },
  ascii: "altar",
  variantes: [
    { texto: [
      "La ceremonia es en {escenario}, entre un compresor y un almanaque de 2011.",
      "{personaje.nombre}, {personaje.mote}, armó el altar sobre un banco de trabajo y quedó, hay que decirlo, impecable.",
      "{^complicacion}."
    ]},
    { texto: [
      "Hay olor a grasa de motor y a sahumerio, y las dos cosas se llevan mejor de lo esperado.",
      "{personaje.desc} recibe a nueve personas en {escenario} con una lista impresa y una birome atada al portapapeles.",
      "«Acá se hace todo prolijo», avisa. Y contra todo pronóstico, es cierto."
    ]}
  ],
  opciones: [
    { label: "Entregarte al lugar sin ironía.", efectos: { conciencia: 16, karma: 10, paranoia: -10 },
      resultado: ["Dejás de mirar el compresor y empezás a mirar lo que pasa. Ahí arranca de verdad.",
                  "El galpón desaparece a los veinte minutos. Queda la ronda. Funciona."] },
    { label: "Comentar en voz alta lo precario del lugar.", efectos: { conciencia: 5, karma: -10, paranoia: 8 },
      resultado: ["Se te ríe uno solo. {^personaje.nombre} te escucha y no dice nada, y eso te va a costar más adelante.",
                  "Hacés el chiste. Nadie lo acompaña. El precario acá no es un chiste: es la condición."] },
    { label: "Ayudar a terminar de armar el altar.", efectos: { karma: 15, conciencia: 12, aguante: -5 },
      resultado: ["Cargás cuatro cajones y acomodás velas cuarenta minutos. Nadie más ayudó. {^personaje.nombre} te lo va a devolver.",
                  "Terminan juntos. Antes de empezar ya te pasó algo."] },
    { label: "Preguntar dónde está el baño y qué se hace con el balde.", efectos: { conciencia: 8, paranoia: -8, aguante: 5 },
      resultado: ["Preguntás la única pregunta práctica de la noche. Cuatro personas te agradecen con la mirada.",
                  "«Buen dato», dice alguien. La logística también es espiritual."] }
  ]
},

{
  id: "cn_club_barrio_charla", categoria: "dialogo", tramo: [1, 2], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "social"] }, personaje: { tags: ["conurbano", "veterano", "social", "chanta"] }, complicacion: { tags: ["social", "ruido"] } },
  variantes: [
    { texto: [
      "La charla es en el buffet de {escenario}, entre una foto de un equipo de 1978 y una heladera de Quilmes.",
      "Vinieron catorce personas y nueve son del club y vinieron por el aire acondicionado.",
      "{personaje.nombre} habla igual, con la misma convicción que si fueran cuatrocientos."
    ]},
    { texto: [
      "Hay pizza fría en una mesa de plástico y una pantalla con un PowerPoint de doce diapositivas.",
      "{personaje.desc}. Explica el «despertar» con un puntero láser sobre una imagen de internet.",
      "{^complicacion}."
    ]}
  ],
  opciones: [
    { label: "Quedarte hasta el final y hacer preguntas.", efectos: { conciencia: 14, karma: 8, aguante: -5 },
      resultado: ["Hacés tres preguntas. Las tres lo mejoran. Al final te agradece de verdad, sin cámara.",
                  "Sos el único que participa. Se armó una conversación buena entre catorce desconocidos."] },
    { label: "Ponerte a charlar con los del club en la barra.", efectos: { conciencia: 12, karma: 15, efecto: 12, aguante: -6 },
      resultado: ["Dos horas en la barra. Aprendés más de la vida ahí que en la charla, cosa que era estadísticamente probable.",
                  "Te invitan un fernet y te cuentan la historia del club, que es la historia del barrio, que es la historia."] },
    { label: "Comprar el libro que vende al final.", efectos: { mangos: -300, conciencia: 8, karma: 3 },
      resultado: ["Trescientos pesos por ciento veinte páginas con interlineado doble. Hay cuatro párrafos buenos.",
                  "Te lo firma con una dedicatoria genérica. La conservás igual."] },
    { label: "Irte en el intervalo.", efectos: { conciencia: 3, paranoia: -5 },
      resultado: ["Te vas cuando sirven la pizza, que es el momento en que nadie mira la puerta.",
                  "Salís y te quedás diez minutos en la vereda escuchando la murga de la cuadra de al lado. Mejor decisión."] }
  ]
},

{
  id: "cn_zanjon_vision", categoria: "trip", tramo: [1, 2], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "precario", "trip"] }, personaje: { tags: ["quimico", "lumpen"] }, complicacion: { tags: ["trip", "cuerpo"] } },
  variantes: [
    { texto: [
      "El agua de {escenario} tiene una película arcoíris que es hermosa por los motivos equivocados.",
      "{personaje.nombre} dice que en el zanjón «se ve mejor», y con eso puede estar diciendo dos cosas distintas.",
      "{^complicacion}."
    ]},
    { texto: [
      "A las cuatro de la tarde el reflejo del sol en el agua podrida hace una cosa que no puede ser legal.",
      "Están vos, {personaje.nombre} y dos bolsas de nylon flotando en círculos perfectos.",
      "«Mirá el remolino», dice. Miran el remolino cuarenta minutos."
    ]}
  ],
  opciones: [
    { label: "Mirar el remolino hasta el final.", efectos: { conciencia: 18, paranoia: 12, efecto: 10 },
      resultado: ["Cuarenta minutos de agua girando. Entendés una cosa sobre la repetición y no la vas a poder explicar.",
                  "El remolino se deshace de golpe y sentís una pérdida real, lo cual es un dato clínico."] },
    { label: "Meter la mano en el agua.", efectos: { aguante: -12, conciencia: 12, karma: 3 },
      riesgo: { prob: 0.4, efectos: { aguante: -12 }, resultado: ["Te agarrás una cosa en la piel que te va a durar dos semanas. Fue una decisión y la tomaste."] },
      resultado: ["Está tibia. No debería estar tibia. Sacás la mano rápido.",
                  "La metés hasta la muñeca y no pasa nada, lo cual también es información."] },
    { label: "Irte a un lugar con menos toxinas.", efectos: { aguante: 8, conciencia: 5, paranoia: -8 },
      resultado: ["Caminan tres cuadras hasta una plaza. Es mucho mejor y {personaje.nombre} no lo va a admitir nunca.",
                  "«Sos delicado», te dice. Te vas igual. Tenías razón."] },
    { label: "Tirar {objeto} al agua como ofrenda.", efectos: { karma: 5, conciencia: 14, paranoia: 8 },
      resultado: ["Lo tirás. Se hunde despacio y con dignidad. Los dos se quedan callados un rato largo.",
                  "Flota. Se queda flotando. La ofrenda rechazada es peor que la ofrenda no hecha."] }
  ]
},

{
  id: "cn_haedo_anden", categoria: "descanso", tramo: [1, 2, 3], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "transito", "noche"] }, personaje: { tags: ["musico", "lumpen", "social"] }, complicacion: { tags: ["ruido", "melancolia"] } },
  ascii: "vias",
  variantes: [
    { texto: [
      "El andén de {escenario} pasada la medianoche. El próximo tren figura en cuarenta y ocho minutos.",
      "{personaje.nombre} canta boleros con un parlante bluetooth al 3% y le queda una canción de batería.",
      "{^complicacion}."
    ]},
    { texto: [
      "Once personas esperando un tren que ya debería haber pasado y nadie se queja, porque quejarse cansa más que esperar.",
      "{personaje.desc}. Canta para nadie, que es la forma más honesta de cantar.",
      "El parlante se apaga en la mitad del estribillo y sigue a capela."
    ]}
  ],
  opciones: [
    { label: "Escuchar la última canción entera.", efectos: { conciencia: 16, karma: 12, paranoia: -15 },
      resultado: ["Se apaga el parlante y sigue sin música. Once personas escuchan un bolero a capela en un andén. Es el mejor momento del tramo.",
                  "Termina y hay un aplauso de cuatro personas. Se ríe. Se va sin pedir nada."] },
    { label: "Darle plata.", requiere: { stats: { mangos: { min: 100 } } }, requisitoTexto: "$100",
      efectos: { mangos: -100, karma: 12, conciencia: 8 },
      resultado: ["Le das cien. No los quiere. Se los dejás en el estuche igual y se los guarda.",
                  "Acepta con un cabeceo. «Otra?», pregunta. Sí. Otra."] },
    { label: "Dormir sentado en el banco.", efectos: { aguante: 15, efecto: -18, paranoia: -8 },
      resultado: ["Cuarenta minutos de banco de cemento. El cuerpo agarra lo que le den.",
                  "Te despierta el tren. Nadie te robó nada. El conurbano a veces te perdona."] },
    { label: "Cantar con él.", efectos: { karma: 18, conciencia: 14, aguante: -5, paranoia: -18 },
      resultado: ["Cantás mal y fuerte. Se suman dos más. Por cuatro minutos el andén es otra cosa.",
                  "No sabés la letra y la inventás. Nadie protesta. Se armó algo."] }
  ]
},

{
  id: "cn_terminal_micro", categoria: "ruta", tramo: [1, 2], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "transito"] }, personaje: { tags: ["comercio", "social", "transito"] } },
  ascii: "micro",
  variantes: [
    { texto: [
      "En {escenario} hay cuatro empresas de micro y ninguna tiene el horario que te dijeron por teléfono.",
      "{personaje.nombre} atiende una ventanilla y sabe todo lo que se puede saber sobre la ruta.",
      "«El de las siete sale cuando sale», resume."
    ]},
    { texto: [
      "Huele a facturas viejas y a gasoil y las dos cosas dan hambre.",
      "El micro al retiro sale de la plataforma 4, o de la 6, dependiendo de a quién le preguntes.",
      "{personaje.desc} te mira la cara y te dice: «vos vas al de la sierra, ¿no?»"
    ]}
  ],
  opciones: [
    { label: "Sacar el pasaje y esperar lo que haya que esperar.", efectos: { mangos: -400, conciencia: 10, aguante: -8, paranoia: -5 },
      resultado: ["Tres horas de terminal. Comés dos facturas y ves pasar el país entero por una plataforma.",
                  "Sale con dos horas de retraso. Nadie se sorprende. Subís y dormís hasta el amanecer."] },
    { label: "Preguntarle a {personaje.nombre} qué conviene.", efectos: { conciencia: 12, karma: 8, mangos: -250 },
      resultado: ["Te vende otro pasaje, más barato, en otra empresa, que llega antes. Le acabás de ganar cuatro horas a la vida.",
                  "«No vayas en ese», te dice, y te explica por qué en once segundos. Le crees. Hacés bien."] },
    { label: "Ir a dedo.", efectos: { mangos: 0, aguante: -18, conciencia: 16, paranoia: 12 },
      riesgo: { prob: 0.4, efectos: { aguante: -15, paranoia: 18 }, resultado: ["Cinco horas en la banquina y un camionero que habla de cosas que no querés escuchar durante doscientos kilómetros."] },
      resultado: ["Te levanta una camioneta a los veinte minutos. Es una familia. Te dan un sándwich. La ruta te trata bien.",
                  "Tres autos, once horas, y una conversación que vale el pasaje que no pagaste."] },
    { label: "Volverte a casa.", efectos: { conciencia: -8, aguante: 20, paranoia: -15, karma: -5 }, flags: { set: ["se_volvio"] },
      resultado: ["Das media vuelta en la plataforma. Es una decisión razonable y te va a perseguir un tiempo.",
                  "Te tomás el bondi de vuelta. En el camino te convencés de que fue lo mejor."] }
  ]
},

{
  id: "cn_quinta_moreno", categoria: "ritual", tramo: [2], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "ritual", "precario"] }, personaje: { tags: ["guru", "conurbano"] }, complicacion: { tags: ["precario", "social", "clima"] } },
  variantes: [
    { texto: [
      "La quinta es la quinta del cuñado de {personaje.nombre} y se alquila por fin de semana.",
      "Hay lugar para nueve y vinieron catorce, lo cual se resuelve con criterio y con colchones inflables.",
      "{^complicacion}."
    ]},
    { texto: [
      "{^escenario}: {escenario.detalle}.",
      "El baño es uno. Catorce personas, un baño, y una sustancia purgante. La matemática es la matemática.",
      "«Se organiza y sale», dice {personaje.nombre}, que no va a organizar nada."
    ]}
  ],
  opciones: [
    { label: "Tomar el mando de la logística.", efectos: { conciencia: 15, karma: 18, aguante: -12, paranoia: 8 },
      resultado: ["Armás turnos, repartís baldes, conseguís papel. Sos el héroe invisible del fin de semana y nadie te lo va a decir.",
                  "En veinte minutos tenés un sistema que funciona. {^personaje.nombre} lo presenta como propio."] },
    { label: "Agarrar el mejor lugar y no decir nada.", efectos: { aguante: 15, karma: -12, paranoia: 8 },
      resultado: ["Te quedás con el cuarto de arriba, el único con ventilador. Es una victoria mezquina y dormís bárbaro.",
                  "Nadie discute porque llegaste primero. Vas a escuchar comentarios el domingo."] },
    { label: "Renunciar a tu lugar y dormir afuera.", efectos: { aguante: -10, karma: 22, conciencia: 16 },
      resultado: ["Dormís en una reposera abajo de un limonero. Es lo mejor que te podía pasar y no lo hiciste por eso.",
                  "Cedés el colchón. A la mañana tres personas te tratan distinto."] },
    { label: "Meterte en la pileta con la rana muerta.", efectos: { aguante: -10, conciencia: 12, karma: 8, paranoia: -12 },
      resultado: ["Sacás la rana primero. Después te metés. Es un orden de operaciones que habla bien de vos.",
                  "Te metés sin sacar nada. Nadie te acompaña. Es tuya la pileta y el problema."] }
  ]
},

{
  id: "cn_asado_verdad", categoria: "dialogo", tramo: [1, 2, 3], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "social"] }, personaje: { tags: ["social", "lumpen"] }, personaje2: { tags: ["familia", "social"] } },
  ascii: "parrilla",
  variantes: [
    { texto: [
      "En {escenario}, a la hora del postre, se dice una verdad que estaba guardada desde hace cuatro años.",
      "La dice {personaje.nombre}, con la boca llena, sin ninguna intención de hacer daño.",
      "El daño se hace igual, con la eficiencia de las cosas dichas sin intención."
    ]},
    { texto: [
      "Se rompe el clima en tres segundos y no hay forma de arreglarlo con más carne.",
      "{personaje.nombre} miró a {personaje2.nombre} y dijo seis palabras.",
      "Nadie mueve el tenedor."
    ]}
  ],
  opciones: [
    { label: "Cambiar de tema con violencia.", efectos: { karma: 8, conciencia: 5, paranoia: 8 },
      resultado: ["Metés un tema de fútbol como un topadora. Funciona a medias, que es lo máximo disponible.",
                  "Hablás de la inflación durante cuatro minutos hasta que alguien se te suma. Salvaste el asado y no el vínculo."] },
    { label: "Sostener el silencio.", efectos: { conciencia: 16, karma: 5, paranoia: 12 },
      resultado: ["Nadie habla dos minutos completos. Después alguien llora y después se arregla de verdad. El silencio hizo el trabajo.",
                  "Aguantás y aguantan todos. Se dicen cosas después que no se hubieran dicho nunca."] },
    { label: "Ponerte del lado de {personaje2.nombre}.", efectos: { karma: 15, conciencia: 10, paranoia: 10 },
      riesgo: { prob: 0.35, efectos: { karma: -10, paranoia: 12 }, resultado: ["Elegiste el bando equivocado con información incompleta. En una hora te vas a enterar del resto de la historia."] },
      resultado: ["Le pones el cuerpo. Te lo va a agradecer por diez años.",
                  "«Che, pará», decís, y con eso alcanza para frenar todo."] },
    { label: "Levantarte a lavar los platos.", efectos: { karma: 12, conciencia: 12, aguante: -5, paranoia: -10 },
      resultado: ["Te vas a la cocina y te quedás cuarenta minutos. Se suman dos. Ahí se arregla, en la pileta, no en la mesa.",
                  "Los platos son una excusa muy antigua y muy eficaz."] }
  ]
},

{
  id: "cn_dealer_filosofo", categoria: "comercio", tramo: [1, 2, 3], peso: 10, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "urbano", "comercio"] }, personaje: { tags: ["quimico", "comercio"] } },
  variantes: [
    { texto: [
      "{personaje.nombre}, {personaje.mote}, vende y también opina, y las dos cosas vienen en el mismo paquete sin descuento.",
      "Antes de darte lo que pediste te explica su lectura de medio libro de Nietzsche de 2009.",
      "La lectura es mala y el análisis del barrio que hace después es excelente."
    ]},
    { texto: [
      "En {escenario}, {personaje.desc}, te hace esperar diez minutos mientras termina una idea.",
      "«El problema no es la droga», te dice. «El problema es para qué la usás.» Y te lo dice mientras te la vende.",
      "No hay ninguna contradicción en su cara."
    ]}
  ],
  opciones: [
    { label: "Comprar y escuchar toda la charla.", efectos: { mangos: -250, efecto: 5, conciencia: 14, karma: 5 }, flags: { set: ["tiene_faso"] },
      resultado: ["Cuarenta minutos de filosofía de vereda. Es más útil que el módulo 2 y cuesta lo mismo.",
                  "Te vas con lo que fuiste a buscar y con dos ideas que no buscabas."] },
    { label: "Comprar y cortarla rápido.", efectos: { mangos: -250, efecto: 5, karma: -5 }, flags: { set: ["tiene_faso"] },
      resultado: ["«Estoy apurado», decís. Se ofende un cinco por ciento y te lo va a cobrar la próxima.",
                  "Transacción de noventa segundos. Eficiente y triste."] },
    { label: "Discutirle a Nietzsche.", efectos: { conciencia: 15, karma: -5, paranoia: 5, mangos: -250 }, flags: { set: ["tiene_faso"] },
      resultado: ["Discuten veinte minutos en una esquina. Gana él, no por argumento sino por resistencia.",
                  "Le señalás que eso no es lo que dice el libro. «Bueno», dice, «yo lo leo así». Es una posición sólida."] },
    { label: "Pedirle consejo de verdad.", efectos: { conciencia: 18, karma: 10, paranoia: -12 },
      resultado: ["«No compres hoy», te dice, mirándote la cara. «Andá a comer algo.» Es el mejor consejo del día y le costó una venta.",
                  "Te escucha y te dice tres cosas concretas. Ninguna es mística. Las tres sirven."] }
  ]
},

{
  id: "cn_feria_americana", categoria: "comercio", tramo: [1, 2], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["comercio", "social"] }, personaje: { tags: ["comercio", "social", "veterano"] } },
  variantes: [
    { texto: [
      "En {escenario} todo cuesta lo mismo y nada sirve, salvo una cosa.",
      "{personaje.nombre} atiende sentada en un banquito y no negocia porque no hace falta.",
      "Hay un saco de lana que te queda perfecto y que perteneció a alguien que ya no lo necesita."
    ]},
    { texto: [
      "Cuatro mesas de caballete, ropa por kilo, y una caja de zapatos con cosas sueltas.",
      "En la caja hay {objeto}, que no debería estar ahí.",
      "{personaje.desc}. «Llevate lo que quieras», dice. «Todo tiene historia y ninguna es mía.»"
    ]}
  ],
  opciones: [
    { label: "Comprar el abrigo.", efectos: { mangos: -200, aguante: 15, conciencia: 8, karma: 3 },
      resultado: ["Doscientos pesos y te salva las próximas tres noches. La mejor inversión de la run.",
                  "Te queda como hecho a medida y huele levemente a naftalina y a otra casa."] },
    { label: "Comprar la cosa suelta de la caja.", efectos: { mangos: -150, conciencia: 10 }, daReliquia: true,
      resultado: ["Ciento cincuenta pesos por algo que no sabés qué es. Es la mejor forma de comprar.",
                  "«Ese lo trajo un señor que se murió», te dice, sin dramatismo. Te lo llevás igual. Por eso mismo."] },
    { label: "Ponerte a charlar sin comprar.", efectos: { conciencia: 14, karma: 12, aguante: -3 },
      resultado: ["Cuarenta minutos con ella. Te cuenta de dónde viene cada cosa de la mesa. Es un museo y es gratis.",
                  "No compras nada y te vas con más de lo que ibas a llevar."] },
    { label: "Vender algo tuyo ahí mismo.", efectos: { mangos: 250, conciencia: 5, karma: -3 },
      resultado: ["Le vendés la campera que traías puesta. Vas a extrañarla a las cuatro de la mañana.",
                  "Se lo compra sin regatear y con eso te dice algo sobre lo que valía."] }
  ]
},

{
  id: "cn_cancha_clausurada", categoria: "trip", tramo: [1, 2, 3], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["publico", "noche", "conurbano", "urbano"] }, personaje: { tags: ["joven", "lumpen"] }, complicacion: { tags: ["ruido", "misterio"] } },
  variantes: [
    { texto: [
      "{^escenario}: {escenario.detalle}.",
      "Están vos, {personaje.nombre} y un arco solo. El otro arco se lo llevaron y nadie preguntó nunca.",
      "{^complicacion}."
    ]},
    { texto: [
      "Se entra por el alambrado cortado, que es como se entra a todos los lugares importantes.",
      "El pasto sintético está levantado en tiras y de noche parece agua.",
      "{personaje.nombre} pica una pelota once veces sin decir nada."
    ]}
  ],
  opciones: [
    { label: "Jugar al arco solo hasta cansarte.", efectos: { aguante: -15, conciencia: 15, karma: 10, paranoia: -20, efecto: -15 },
      resultado: ["Cuarenta minutos pateando al arco vacío. Es lo más limpio que hiciste en semanas.",
                  "Metés diecisiete de veinte. En el diecisiete gritás un gol y te escuchás gritar y te reís solo."] },
    { label: "Acostarte en el centro del campo.", efectos: { conciencia: 18, paranoia: -18, aguante: 8, efecto: -10 },
      resultado: ["Boca arriba en el medio de la cancha. Desde ahí el cielo del conurbano tiene tres estrellas y son suficientes.",
                  "Veinte minutos sin moverte. En algún momento se te acomoda la respiración sola."] },
    { label: "Fumar y hablar de cuando eran chicos.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 22, conciencia: 12, karma: 12, aguante: -5 },
      resultado: ["Dos horas de infancia en una cancha clausurada. La nostalgia bien usada es una tecnología potente.",
                  "Se cuentan cosas que no se contaron nunca. Al final los dos están un poco mejor y ninguno lo dice."] },
    { label: "Volver a poner el otro arco.", efectos: { aguante: -18, karma: 15, conciencia: 16 },
      resultado: ["Encuentran dos caños y un tejido en el fondo. Tres horas de trabajo inútil y perfecto. Queda un arco torcido y funcional.",
                  "Lo intentan y no sale. Igual, intentarlo era el evento."] }
  ]
},

{
  id: "cn_liniers_santeria", categoria: "comercio", tramo: [1, 2], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["comercio", "conurbano", "urbano"] }, personaje: { tags: ["religioso", "comercio", "guru"] } },
  ascii: "virgen",
  variantes: [
    { texto: [
      "Una santería a media cuadra de {escenario}: velas de siete colores, estampitas, y un olor a incienso que se te queda en la campera tres días.",
      "{personaje.nombre} atiende y no te vende nada de lo que pediste.",
      "«Vos no necesitás eso», dice, y te da otra cosa, más barata."
    ]},
    { texto: [
      "Hay una virgen de yeso de un metro veinte y siete gatos, o el mismo gato siete veces.",
      "{personaje.desc}. Te mira entrar y dice: «uh».",
      "El «uh» viene con diagnóstico incluido y sin cargo."
    ]}
  ],
  opciones: [
    { label: "Hacer exactamente lo que te dice.", efectos: { mangos: -150, conciencia: 14, karma: 12, paranoia: -15 },
      resultado: ["Compras una vela blanca y un baño de ruda. Las instrucciones son precisas. Las cumplís y algo pasa, aunque sea placebo, y el placebo también pasa.",
                  "Te da tres pasos concretos. Los hacés. A la noche dormís mejor y no hace falta explicarlo."] },
    { label: "Comprar de todo por si acaso.", efectos: { mangos: -600, conciencia: 5, paranoia: 12 }, daReliquia: true,
      resultado: ["Salís con una bolsa de nylon con doce productos. La ansiedad también compra.",
                  "Seiscientos pesos de protección espiritual. Algo de todo eso va a servir por pura estadística."] },
    { label: "Discutirle que esto es superstición.", efectos: { conciencia: 8, karma: -10, paranoia: 10 },
      resultado: ["Te escucha entero. «Y bueno», dice al final, y sigue acomodando velas. Perdiste sin que nadie compitiera.",
                  "«¿Y vos qué viniste a hacer acá entonces?» Fin de la discusión."] },
    { label: "Preguntarle qué ve.", efectos: { conciencia: 18, paranoia: 15, karma: 5 },
      resultado: ["Te dice dos cosas. La primera es genérica. La segunda es específica y no puede saberla nadie.",
                  "«Tenés algo atrás», dice, sin dramatismo, como quien informa que tenés la camisa afuera."] }
  ]
},

{
  id: "cn_pension_terraza", categoria: "descanso", tramo: [1, 3], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["precario", "noche", "urbano", "conurbano"] }, personaje: { tags: ["social", "testigo", "veterano"] }, complicacion: { tags: ["social", "melancolia", "ruido"] } },
  variantes: [
    { texto: [
      "La terraza de la pensión es de todos, o sea de nadie, o sea del primero que sube.",
      "Esta noche el primero que subió fue {personaje.nombre}, que ya tiene la silla puesta y un mate.",
      "{^complicacion}."
    ]},
    { texto: [
      "Doce piezas, un baño, y una terraza con vista a los techos de todo el barrio.",
      "Se sube por una escalera de material sin baranda y eso filtra visitantes.",
      "{personaje.desc}, arriba, mirando la ciudad como quien mira un problema que ya no es suyo."
    ]}
  ],
  opciones: [
    { label: "Sentarte a tomar mate en silencio.", efectos: { conciencia: 16, aguante: 12, paranoia: -18, karma: 8 },
      resultado: ["Una hora de mate sin hablar. Es lo máximo que la humanidad logró en materia de compañía.",
                  "Te ceba sin preguntarte si querés. Eso es una invitación completa."] },
    { label: "Preguntarle cuánto lleva ahí.", efectos: { conciencia: 18, karma: 10 },
      resultado: ["«Once años», dice. Y después: «vine por tres meses». Se ríe. No es una risa alegre y no es triste.",
                  "Te cuenta la historia de la pensión, que son cuarenta historias, y las cuenta bien."] },
    { label: "Contarle lo que estás buscando.", efectos: { conciencia: 12, karma: 12, paranoia: -12 },
      resultado: ["Escucha. «Yo también», dice al final, y no aclara nada más. Es la conversación más corta y más completa del tramo.",
                  "Te deja hablar veinte minutos. Después te ceba otro mate. Eso fue la respuesta."] },
    { label: "Quedarte a dormir arriba.", efectos: { aguante: 18, paranoia: -12, conciencia: 8, efecto: -18 },
      riesgo: { prob: 0.3, efectos: { aguante: -12 }, resultado: ["Llueve a las cinco de la mañana. Esa lluvia fina que moja más. Bajás empapado y sin dormir."] },
      resultado: ["Dormís en la terraza con la campera de almohada. Cinco horas de sueño de las buenas.",
                  "Te tapa con una frazada que apareció de algún lado. No hablan de eso a la mañana."] }
  ]
},

{
  id: "cn_bici_persecucion", categoria: "combate", tramo: [1, 2, 3], peso: 9, unlock: "A1",
  slots: { escenario: { tags: ["conurbano", "urbano", "noche"] }, personaje: { tags: ["lumpen", "joven"] } },
  variantes: [
    { texto: [
      "Dos en una bici te vienen siguiendo desde hace cuadra y media en {escenario}.",
      "No aceleran. Mantienen la distancia, que es la parte técnica del asunto.",
      "Tenés {objeto} en el bolsillo y no vale nada, pero eso ellos no lo saben."
    ]},
    { texto: [
      "{personaje.nombre} se te pone al lado en bici y pedalea a tu velocidad de caminata, que es un ritmo incómodo de sostener.",
      "«¿Tenés hora?», pregunta. Es la pregunta.",
      "En {escenario} no hay nadie más y las dos partes lo saben."
    ]}
  ],
  opciones: [
    { label: "Dar todo antes de que lo pidan.", efectos: { mangos: -300, paranoia: 15, aguante: 0, conciencia: 8 },
      resultado: ["Sacás todo y lo ponés en la mano. Se sorprenden. Se van rápido. Es la maniobra correcta y no te la va a aplaudir nadie.",
                  "«Tomá», decís. Se lo llevan y ni te miran. Terminó en once segundos."] },
    { label: "Hablarles.", tirada: { stat: "karma", dificultad: 0 },
      exito: { efectos: { karma: 8, conciencia: 15, paranoia: 8 }, resultado: ["Les hablás normal, de igual a igual, y algo se desarma. Terminan charlando dos minutos y se van sin nada. Pasa. No siempre, pero pasa."] },
      fallo: { efectos: { mangos: -400, aguante: -15, paranoia: 25 }, resultado: ["No era el momento de hablar. Se resuelve rápido y mal y te quedás sentado en un cordón haciendo inventario."] },
      resultado: [] },
    { label: "Correr.", tirada: { stat: "aguante", dificultad: 65 },
      exito: { efectos: { aguante: -18, paranoia: 20, conciencia: 5 }, resultado: ["Corrés hasta una avenida con luz y gente. Te salvás. Vas a temblar veinte minutos después."] },
      fallo: { efectos: { aguante: -25, mangos: -400, paranoia: 30 }, resultado: ["No se le corre a una bici. Es geometría. Lo aprendés de la peor manera disponible."] },
      resultado: [] },
    { label: "Ofrecerles lo que tenés de fumar.", requiere: { flags: { any: ["tiene_faso"] } }, requisitoTexto: "tener faso",
      efectos: { efecto: 15, karma: 10, conciencia: 12, paranoia: -10 },
      resultado: ["Sacás el faso y lo prendés ahí mismo. Se bajan de la bici. Terminan los tres sentados en un cordón. El conurbano tiene estas cosas.",
                  "Se lo convidás. Cambia todo el clima en cuatro segundos. Es una tecnología diplomática."] }
  ]
}

]);
