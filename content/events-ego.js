/* PICHICATA — pack A9: Cumbre del Ego. 11 eventos de confrontación interna. */

window.PICHI = window.PICHI || {};

PICHI.addEvents([

{
  id: "eg_juicio_interno", categoria: "combate", tramo: [3, 4], peso: 11, unlock: "A9",
  slots: { escenario: { tags: ["astral"] }, personaje: { tags: ["ego", "astral"] }, complicacion: { tags: ["astral"] } },
  ascii: "cabeza",
  variantes: [
    { texto: [
      "Hay un tribunal y sos el acusado y también el fiscal y también los tres jueces.",
      "El expediente tiene cuatrocientas hojas y todas son verdad.",
      "{^complicacion}."
    ]},
    { texto: [
      "«Se abre la causa», dice una voz que es la tuya cuando hablás por teléfono con un desconocido.",
      "Los cargos son cuatro y ninguno es penal y los cuatro son peores que un delito.",
      "{personaje.nombre} oficia de fiscal y está muy preparado."
    ]}
  ],
  opciones: [
    { label: "Declararte culpable de todo.", efectos: { conciencia: 25, karma: 12, paranoia: -15, aguante: -10 },
      resultado: ["«Culpable», decís, cuatro veces. El tribunal se disuelve porque no había juicio: había una espera de esa palabra.",
                  "Aceptás todo sin atenuantes. Nunca hubo condena prevista. Solo hacía falta que dejaras de defenderte."] },
    { label: "Defenderte con argumentos.", efectos: { conciencia: 12, karma: -8, paranoia: 22, aguante: -12 },
      resultado: ["Tu defensa es brillante y dura cuarenta minutos y no convence a nadie porque el tribunal sos vos.",
                  "Ganás el juicio. Seguís exactamente igual de mal. Ese es el chiste."] },
    { label: "Denunciar al tribunal por parcialidad.", pericia: "karma", efectos: { conciencia: 18, karma: 5, paranoia: 12 },
      resultado: ["Señalás que juez, fiscal y acusado son la misma persona. El tribunal lo admite y sigue funcionando igual.",
                  "«Objeción», decís. «Denegada», decís. Y ahí te reís por primera vez en el tramo."] },
    { label: "Pedir un abogado y esperar.", pericia: "karma", efectos: { conciencia: 15, paranoia: -12, aguante: 5 },
      resultado: ["Pedís asistencia. Aparece alguien que te quiere y dice tres cosas buenas de vos. El tribunal no estaba preparado para eso.",
                  "Esperás. Nadie viene. Pero mientras esperás, se te pasa, y eso también es una defensa."] }
  ]
},

{
  id: "eg_vos_exitoso", categoria: "combate", tramo: [3, 4], peso: 10, unlock: "A9",
  slots: { escenario: { tags: ["astral", "interior"] }, personaje: { tags: ["ego"] } },
  ascii: "espejo",
  variantes: [
    { texto: [
      "Es vos, pero el que tomó las otras decisiones. El que se quedó en el trabajo. El que no vino.",
      "Tiene mejor cara, mejor ropa, y una tranquilidad que se compra.",
      "No te desprecia. Es peor: le das lástima y la maneja con elegancia."
    ]},
    { texto: [
      "Llega en un auto que no podrías pagar y estaciona bien.",
      "«¿Todavía con esto?», pregunta, señalando alrededor con la pera.",
      "Y la pregunta tiene, hay que decirlo, cierto mérito."
    ]}
  ],
  opciones: [
    { label: "Preguntarle si es feliz.", efectos: { conciencia: 22, karma: 8, paranoia: 12 },
      resultado: ["Tarda cuatro segundos de más en contestar y en esos cuatro segundos se resuelve todo el evento.",
                  "«Sí», dice. Y después: «casi siempre». Y ese «casi siempre» te devuelve el aire."] },
    { label: "Admitir que lo envidiás.", efectos: { conciencia: 25, karma: 15, paranoia: -15 },
      resultado: ["Lo admitís en voz alta y se desarma. «Yo también», dice, señalándote. Nadie esperaba eso.",
                  "«Te tengo envidia», decís. Se sienta al lado tuyo. Se quedan callados un rato largo, bien."] },
    { label: "Pelearlo.", tirada: { stat: "conciencia", dificultad: 60 },
      exito: { efectos: { conciencia: 20, karma: 5, aguante: -15 }, resultado: ["No es una pelea física: es una discusión y le ganás con un solo argumento que trajiste de un evento anterior."] },
      fallo: { efectos: { conciencia: -12, aguante: -18, paranoia: 25 }, resultado: ["Te destroza con cuatro datos concretos sobre tu vida material. No hay respuesta espiritual para una boleta de luz."] },
      resultado: [] },
    { label: "Pedirle plata.", pericia: "karma", efectos: { mangos: 900, karma: -18, conciencia: 10, paranoia: 12 },
      resultado: ["Te la da sin dudar y sin condiciones, y eso es lo que te va a arruinar la semana.",
                  "«¿Cuánto?», pregunta, ya sacando la billetera. Es humillante y es útil."] }
  ]
},

{
  id: "eg_el_que_dejaste", categoria: "combate", tramo: [3, 4], peso: 10, unlock: "A9",
  slots: { escenario: {}, personaje: { tags: ["ego", "familia", "social", "duelo"] } },
  variantes: [
    { texto: [
      "Aparece alguien a quien dejaste solo en un momento en que no había que dejarlo solo.",
      "No viene a pelear. Viene a mirarte, que es peor.",
      "En {escenario} no hay nadie más y no hay excusas disponibles."
    ]},
    { texto: [
      "{personaje.nombre}, en la versión exacta de la noche en que no fuiste.",
      "Misma ropa, misma cara, mismo teléfono en la mano con tu nombre en la pantalla.",
      "«Te llamé», dice. Y no dice nada más."
    ]}
  ],
  opciones: [
    { label: "Pedirle perdón sin justificarte.", pericia: "karma", efectos: { conciencia: 28, karma: 25, paranoia: -20, aguante: -8 },
      resultado: ["Cuatro palabras sin ningún «pero». Es lo más difícil de todo el juego y lo hiciste.",
                  "«Perdoname. No hay excusa.» Se queda mirándote. Después asiente. Se va liviano y vos también."] },
    { label: "Explicarle por qué no fuiste.", pericia: "karma", efectos: { conciencia: 8, karma: -12, paranoia: 20 },
      resultado: ["La explicación es correcta, ordenada y completa. No sirve para nada. Nunca sirvió para nada.",
                  "Hablás cuatro minutos. Cuando terminás, dice: «ya sé. Igual te llamé»."] },
    { label: "Prometerle que la próxima vas.", efectos: { conciencia: 12, karma: 8, paranoia: 5 }, flags: { set: ["promesa_concreta"] },
      resultado: ["Prometés. La promesa es real esta vez y el juego lo va a verificar más adelante.",
                  "«La próxima voy», decís. Se ríe sin alegría. «Bueno.»"] },
    { label: "Decirle que no era tu responsabilidad.", pericia: "karma", efectos: { conciencia: -10, karma: -22, paranoia: 22 },
      resultado: ["Lo decís y es parcialmente cierto y te deja peor que si hubiera sido totalmente falso.",
                  "Se da vuelta y se va sin contestarte. Esa espalda te va a durar el resto de la run."] }
  ]
},

{
  id: "eg_maestro_falso_interno", categoria: "combate", tramo: [3, 4], peso: 9, unlock: "A9",
  slots: { escenario: { tags: ["astral", "ritual"] }, personaje: { tags: ["ego", "guru"] } },
  variantes: [
    { texto: [
      "Se te aparece un maestro y es impecable: la voz, la mirada, las frases.",
      "Dice exactamente lo que querés escuchar, en el orden en que querés escucharlo.",
      "Es demasiado perfecto y por eso mismo hay algo raro."
    ]},
    { texto: [
      "«Estás muy cerca», te dice. «Sos de los pocos que llegan hasta acá.»",
      "Es el tipo de frase que se le dice a todos los que llegan hasta acá.",
      "Y aun así, se siente increíble escucharla."
    ]}
  ],
  opciones: [
    { label: "Desconfiar y pedirle una prueba.", efectos: { conciencia: 25, karma: 8, paranoia: 15 },
      resultado: ["Le pedís que te diga algo que no querés escuchar. No puede. Se desarma. Era tu propio ego con túnica.",
                  "«Decime algo malo mío», pedís. Silencio. Ahí lo ves: no tiene cara propia."] },
    { label: "Creerle y aceptar la bendición.", efectos: { conciencia: -12, karma: -5, paranoia: 18 }, flags: { set: ["ego_inflado"] },
      resultado: ["Te dejás bendecir y sales flotando. El vuelo dura hasta el próximo evento y cae mal.",
                  "Aceptás. Te sentís elegido. Eso es exactamente el problema y no lo vas a ver hasta el final."] },
    { label: "Preguntarle cuánto cuesta.", efectos: { conciencia: 20, karma: 5, paranoia: -10 },
      resultado: ["«Nada», dice. Insistís. «Nada.» Insistís una tercera vez y se enoja, y ahí lo pescás.",
                  "La pregunta de la plata es un detector infalible y funcionó de nuevo."] },
    { label: "Agradecerle y seguir de largo.", efectos: { conciencia: 22, karma: 12, paranoia: -12 },
      resultado: ["«Gracias, maestro», decís, y seguís caminando. Ni lo enfrentás ni le crees. Es la jugada de un profesional.",
                  "No discutís, no aceptás. Pasás al lado. Se apaga solo."] }
  ]
},

{
  id: "eg_pieza_de_infancia", categoria: "trip", tramo: [3, 4], peso: 10, unlock: "A9",
  slots: { escenario: { tags: ["astral", "interior"] }, complicacion: { tags: ["astral", "trip"] } },
  ascii: "puerta",
  variantes: [
    { texto: [
      "Es tu pieza de cuando tenías siete años, con la mancha de humedad en la misma esquina.",
      "En la cama hay alguien de siete años y no está durmiendo.",
      "{^complicacion}."
    ]},
    { texto: [
      "La lámpara de noche, el placard con la puerta que no cierra, y el ruido de la tele del comedor.",
      "El nene está sentado en el borde de la cama esperando algo que no llegó.",
      "Sos el adulto de la habitación por primera vez en tu vida."
    ]}
  ],
  opciones: [
    { label: "Sentarte al lado y quedarte.", efectos: { conciencia: 30, karma: 22, paranoia: -25, aguante: -8 },
      resultado: ["Te sentás. No hablás. Le pones la mano en la espalda. Se duerme en cuatro minutos y vos llorás en silencio.",
                  "Te quedás hasta que se duerme. Era todo. Eso era todo lo que había que hacer y nadie lo hizo."] },
    { label: "Explicarle cómo termina todo.", pericia: "karma", efectos: { conciencia: 15, karma: -10, paranoia: 18 },
      resultado: ["Le contás el futuro. Es información que no le sirve para nada y que le arruina esta noche.",
                  "Le decís la verdad. Un chico de siete no necesitaba la verdad: necesitaba compañía."] },
    { label: "Pedirle perdón.", pericia: "karma", efectos: { conciencia: 25, karma: 18, paranoia: -12 },
      resultado: ["Le pedís perdón por lo que hiciste con lo que él te dio. Te mira sin entender. Igual sirve.",
                  "«Perdón», decís. «¿Por qué?», pregunta. Y no le podés contestar, y ahí está la respuesta."] },
    { label: "Salir y cerrar la puerta.", efectos: { conciencia: 8, karma: -15, paranoia: 25 },
      resultado: ["Cerrás la puerta. Del otro lado no se escucha nada y ese silencio es lo peor de la run.",
                  "Te vas. Como se fueron. Y ahí completás el círculo de la peor manera posible."] }
  ]
},

{
  id: "eg_ego_negocia", categoria: "dialogo", tramo: [4], peso: 10, unlock: "A9",
  requiere: { stats: { conciencia: { min: 60 } } },
  slots: { escenario: { tags: ["astral"] }, personaje: { tags: ["ego"] } },
  variantes: [
    { texto: [
      "El ego cambia de estrategia. Deja de pelear y se sienta a negociar.",
      "«Mirá», dice, «yo no me voy a ir. Pero podemos arreglar algo.»",
      "Y la propuesta es, hay que reconocerlo, bastante razonable."
    ]},
    { texto: [
      "«¿Vos querés que me muera?», pregunta. «Si yo me muero, ¿quién paga el alquiler?»",
      "Tiene un punto. Tiene varios puntos.",
      "En {escenario} te propone un acuerdo de convivencia con cláusulas."
    ]}
  ],
  opciones: [
    { label: "Firmar el acuerdo de convivencia.", efectos: { conciencia: 25, karma: 8, paranoia: -20 }, flags: { set: ["pacto_con_ego"] },
      resultado: ["Firman. Vos manejás y él va de acompañante y avisa los pozos. Es la solución adulta y nadie la enseña.",
                  "Acuerdan reglas: él opina, vos decidís. Funciona. Es todo lo que se podía lograr."] },
    { label: "Exigir la rendición total.", pericia: "karma", efectos: { conciencia: 15, paranoia: 25, aguante: -15 },
      resultado: ["Exigís que se vaya para siempre. Se ríe. «Cuando yo me vaya, no queda nadie», dice. Y tiene razón técnica.",
                  "La rendición total no está en el menú. Perdés cuatro horas descubriéndolo."] },
    { label: "Entregarle el volante y descansar.", efectos: { conciencia: -15, karma: -12, paranoia: -25, mangos: 500 },
      resultado: ["Le das el mando. Se te acomoda la vida material en dos semanas y se te apaga otra cosa.",
                  "«Manejá vos», decís, agotado. Es una respuesta legítima y tiene un costo específico."] },
    { label: "Preguntarle qué necesita.", efectos: { conciencia: 28, karma: 15, paranoia: -18 },
      resultado: ["«Que no me dejes solo», dice. Y ahí entendés que estuviste peleando con un chico de siete años todo este tiempo.",
                  "Le preguntás bien, sin trampa. La respuesta es tan simple que te sentás en el piso."] }
  ]
},

{
  id: "eg_todos_los_que_lastimaste", categoria: "combate", tramo: [4], peso: 9, unlock: "A9",
  slots: { escenario: { tags: ["astral"] }, complicacion: { tags: ["astral"] } },
  variantes: [
    { texto: [
      "Están todos. Son menos de los que temías y más de los que recordabas.",
      "No hay reproche colectivo: hay una fila ordenada y paciente.",
      "{^complicacion}."
    ]},
    { texto: [
      "Catorce personas en semicírculo y ninguna con cara de enojo, lo cual es infinitamente peor.",
      "Cada una tiene una cosa para decirte de una frase.",
      "Van a decirla todas, una por una, y no se puede acelerar."
    ]}
  ],
  opciones: [
    { label: "Escuchar a los catorce.", pericia: "conciencia", efectos: { conciencia: 30, karma: 20, aguante: -20, paranoia: 15 },
      resultado: ["Catorce frases. La cuarta y la novena te parten. Al terminar estás vaciado y liviano y ese es el precio correcto.",
                  "Aguantás las catorce sin interrumpir. Cuando termina la última, se van todos sin despedirse. Está bien así."] },
    { label: "Escuchar solo a los primeros tres y cortar.", pericia: "conciencia", efectos: { conciencia: 15, karma: 5, paranoia: 18 },
      resultado: ["Cortás en el cuarto. Los otros diez se quedan ahí, esperando, por el resto de la run.",
                  "Tres alcanzan para entender el patrón. No alcanzan para lo otro."] },
    { label: "Pedir que aparezcan también los que te lastimaron a vos.", pericia: "karma", efectos: { conciencia: 22, karma: 5, paranoia: 20 },
      resultado: ["Aparecen. Son más. La sala se llena. Es un empate horrible y es, técnicamente, la verdad.",
                  "«También quiero la otra lista», pedís. Te la dan. Es más larga y no te consuela."] },
    { label: "Ofrecerte a reparar algo concreto con uno.", pericia: "karma", efectos: { conciencia: 25, karma: 25, paranoia: -18 }, flags: { set: ["repara"] },
      resultado: ["Elegís uno, el más reparable, y te comprometés a algo específico. Los otros trece asienten. Eso alcanza.",
                  "No podés con catorce. Podés con uno. Empezás por uno. Es la única forma que funcionó nunca."] }
  ]
},

{
  id: "eg_espejo_de_agua", categoria: "trip", tramo: [4], peso: 9, unlock: "A9",
  slots: { escenario: { tags: ["astral", "naturaleza"] }, complicacion: { tags: ["astral", "trip"] } },
  variantes: [
    { texto: [
      "Hay una superficie de agua quieta y en el reflejo no estás vos.",
      "Está la habitación de atrás, están las nubes, está todo. Vos no.",
      "{^complicacion}."
    ]},
    { texto: [
      "Te asomás y el agua devuelve el cielo con precisión fotográfica y un hueco donde debería estar tu cabeza.",
      "No es terror. Es una información administrativa: no figurás.",
      "Podés tocar el agua y arruinar el reflejo, o podés quedarte a ver qué significa."
    ]}
  ],
  opciones: [
    { label: "Quedarte a mirar el hueco.", efectos: { conciencia: 30, paranoia: 20 },
      resultado: ["Mirás el hueco cuarenta minutos y en algún momento deja de dar miedo y empieza a ser un alivio.",
                  "El hueco tiene bordes limpios. Es la mejor noticia del tramo y no vas a poder explicar por qué."] },
    { label: "Tocar el agua para romper el reflejo.", efectos: { conciencia: 15, paranoia: -18, aguante: -5 },
      resultado: ["Metés la mano. Se deshace todo en círculos. Cuando se calma, estás.",
                  "Rompés el espejo con dos dedos. Volvés a existir. Fue barato."] },
    { label: "Meterte al agua.", pericia: "aguante", efectos: { conciencia: 28, paranoia: 22, aguante: -15 },
      resultado: ["Entrás. Es tibia. Desde adentro, hacia arriba, se ve una cara asomada y es la tuya.",
                  "Te metés hasta el pecho y sentís por cuatro segundos que no tenés cuerpo, y esos cuatro segundos son el juego entero."] },
    { label: "Traer a alguien para que mire con vos.", efectos: { conciencia: 20, karma: 15, paranoia: -15 },
      resultado: ["Traés a alguien. Él sí se refleja. Los dos miran el hueco tuyo y no dicen nada y eso es compañía.",
                  "«¿Vos te ves?» «Sí.» «Ah.» Y se quedan mirando juntos. Se hace soportable."] }
  ]
},

{
  id: "eg_ultima_excusa", categoria: "dialogo", tramo: [4], peso: 10, unlock: "A9",
  slots: { escenario: { tags: ["astral"] }, personaje: { tags: ["ego"] } },
  variantes: [
    { texto: [
      "Queda una sola excusa y es la buena. La que usás desde los veinte y nunca falló.",
      "{personaje.nombre} la trae escrita, prolija, con la fecha en que la inventaste.",
      "«Esta la vamos a necesitar», dice. «Sin esta no se puede vivir.»"
    ]},
    { texto: [
      "Es la excusa madre, la que explica todas las demás.",
      "Tiene una parte que es cierta y ahí está el problema: si fuera toda mentira sería fácil.",
      "Hay que decidir si se va o se queda, y no hay opción intermedia."
    ]}
  ],
  opciones: [
    { label: "Soltarla.", efectos: { conciencia: 32, karma: 15, paranoia: 20, aguante: -12 },
      resultado: ["La soltás. Queda un hueco enorme y por el hueco entra un frío que no habías sentido nunca. Y también entra aire.",
                  "Se va. Te quedás sin explicación para nada. Es la libertad y no es agradable."] },
    { label: "Quedártela.", efectos: { conciencia: -8, karma: -8, paranoia: -20, aguante: 8 }, flags: { set: ["ultima_excusa"] },
      resultado: ["Te la guardás. Es cómodo. Vas a llegar menos lejos y vas a llegar más entero, y esa es una decisión válida.",
                  "«La necesito», decís. Nadie te la va a discutir. Es tuya."] },
    { label: "Separar la parte cierta de la parte falsa.", pericia: "conciencia", efectos: { conciencia: 28, karma: 12, paranoia: 8 },
      resultado: ["Trabajo fino de cuarenta minutos. Queda un hecho verdadero y chico, y se cae toda la construcción alrededor.",
                  "Hacés la disección. Lo cierto pesa el diez por ciento de lo que pesaba el paquete. Con eso se puede vivir."] },
    { label: "Regalársela a otro.", efectos: { conciencia: 12, karma: -20, paranoia: 12 },
      resultado: ["Le pasás la excusa a alguien que la va a usar peor que vos. Es una crueldad elegante.",
                  "Se la das. La agarra agradecido. Vas a saber en algún momento qué hizo con eso."] }
  ]
},

{
  id: "eg_silencio_total", categoria: "descanso", tramo: [4], peso: 10, unlock: "A9",
  slots: { escenario: { tags: ["astral", "naturaleza", "remoto"] } },
  ascii: "vacio",
  variantes: [
    { texto: [
      "Se hace silencio. No un silencio de que nadie habla: un silencio de que no hay nada que suene.",
      "Ni el zumbido de la sangre, ni el aire, ni la ciudad.",
      "Y en ese silencio empieza a haber lugar."
    ]},
    { texto: [
      "Por primera vez en la run, no hay nada que hacer y nadie a quién contestarle.",
      "En {escenario} el tiempo no está detenido: está disponible.",
      "Podés hacer lo que quieras con esto, incluida la opción de arruinarlo."
    ]}
  ],
  opciones: [
    { label: "Quedarte en el silencio.", efectos: { conciencia: 30, paranoia: -25, aguante: 12 }, medita: true,
      resultado: ["Te quedás. No pasa nada y eso, por fin, es lo que estabas buscando.",
                  "Una hora, dos, no se sabe. Cuando se corta el silencio, sos un poco distinto y nadie te lo va a notar."] },
    { label: "Llenarlo hablando.", efectos: { conciencia: 5, paranoia: 15 },
      resultado: ["Empezás a hablar solo. En cuatro minutos arruinaste algo que tardó una run entera en aparecer.",
                  "No aguantás. Es entendible. Lo llenás de palabras y se va."] },
    { label: "Compartirlo con alguien.", efectos: { conciencia: 22, karma: 20, paranoia: -20 },
      resultado: ["Buscás a alguien y se sientan juntos en el silencio sin explicárselo. Es el mejor regalo que hiciste.",
                  "Le hacés un gesto y se sienta. No hablan. Los dos entienden."] },
    { label: "Poner música.", efectos: { conciencia: 10, paranoia: -12, efecto: 5 },
      resultado: ["Ponés algo bajito. No es un crimen. Es la opción humana y le sacás la mitad del efecto.",
                  "Suena algo lindo. El silencio se va, contento, sin dar un portazo."] }
  ]
}

]);
