/* PICHICATA — textos genéricos del dado.
   Se usan cuando una opción tiene `pericia` (la acción se ejecuta bien o mal)
   y el evento no trae prosa propia para ese resultado. Son deliberadamente
   cortos y agnósticos: la línea del dado acompaña al texto del evento, no lo
   reemplaza. Van por categoría para que no chirríen. */

window.PICHI = window.PICHI || {};

PICHI.DADO_TEXTOS = {

  critico: {
    generico: [
      "Y sale mejor de lo que tenías derecho a esperar.",
      "Sale redondo. No sabés por qué y no vas a preguntar.",
      "Te sale bien de una manera que no vas a poder repetir.",
      "Una de esas veces en que el cuerpo y la cabeza van para el mismo lado."
    ],
    combate: [
      "Y por una vez el cuerpo responde antes de que la cabeza dude.",
      "Sale limpio, rápido, sin que nadie tenga que gritar.",
      "Aparece de golpe una calma que no sabías que tenías guardada."
    ],
    dialogo: [
      "Y te sale la frase justa, con el tono justo, en el segundo justo.",
      "Decís exactamente lo que había que decir y ni una palabra más.",
      "Se hace un silencio de los buenos: el de alguien que está pensando."
    ],
    trip: [
      "Y se abre algo que no estaba en el programa de nadie.",
      "Todo encaja durante un rato largo y sin esfuerzo.",
      "Por una vez el viaje te lleva en vez de arrastrarte."
    ],
    comercio: [
      "Y el número cierra a tu favor sin que tengas que forzar nada.",
      "La transacción sale mejor de lo que valía cualquiera de las dos partes.",
      "Te sale el precio y te sale el respeto, que era más difícil."
    ],
    descanso: [
      "Y el cuerpo aprovecha cada minuto como si supiera que son pocos.",
      "Descansás de verdad, que es una cosa distinta a dormir.",
      "Se te acomoda algo mientras no estabas prestando atención."
    ],
    ritual: [
      "Y esta vez el ritual hace lo que el ritual dice que hace.",
      "Sale bien y nadie lo nota, que es como salen bien los rituales.",
      "Por un momento el galpón deja de ser un galpón."
    ],
    ruta: [
      "Y el camino colabora, que es una cosa que los caminos casi nunca hacen.",
      "Elegiste bien y encima lo vas a saber, que es raro.",
      "Todo lo que podía complicarse decide no complicarse."
    ]
  },

  fallo: {
    generico: [
      "Pero sale a medias, y las cosas a medias cuestan igual.",
      "Sale torpe. Funciona lo justo para no poder repetirlo.",
      "Lo intentás y el intento se nota más que el resultado.",
      "Sale mal, no catastrófico: de esos que solo vos registrás."
    ],
    combate: [
      "Pero el cuerpo llega tarde y llega mal.",
      "Sale con más ruido y más costo del necesario.",
      "Funciona por insistencia y no por destreza, y se paga distinto."
    ],
    dialogo: [
      "Pero se te enreda en la mitad y el final no cierra con el principio.",
      "Lo decís mal y te escuchás decirlo mal, que es lo peor.",
      "Sale la idea pero no sale el tono, y acá el tono era todo."
    ],
    trip: [
      "Pero se te va de las manos en un sentido poco interesante.",
      "El viaje te lleva a un lugar sin nada que mirar.",
      "Se abre algo y lo que se abre no era esto."
    ],
    comercio: [
      "Pero el número termina cerrando para el otro lado.",
      "Pagás más de lo que valía y te das cuenta a la cuadra siguiente.",
      "Negociás peor de lo que pensabas que negociabas."
    ],
    descanso: [
      "Pero el descanso no prende y te levantás peor que antes.",
      "Cierras los ojos dos horas y no descansás ni un minuto.",
      "El cuerpo no acepta la oferta."
    ],
    ritual: [
      "Pero el ritual no prende y queda la incomodidad de haberlo intentado.",
      "Se siente la maquinaria del asunto y eso arruina el asunto.",
      "Nada. Once personas haciendo algo y nada."
    ],
    ruta: [
      "Pero el camino cobra el peaje que no estaba anunciado.",
      "Llegás, más tarde y más roto de lo previsto.",
      "El desvío era un desvío nomás."
    ]
  },

  pifia: {
    generico: [
      "Y sale tan mal que por un segundo es casi gracioso.",
      "Sale mal de una manera que vas a recordar con lujo de detalle.",
      "Todo lo que podía salir mal elige salir mal al mismo tiempo.",
      "Es un papelón y encima es un papelón con público."
    ],
    combate: [
      "Y te sale tan mal que alguien tiene que intervenir para que pare.",
      "El cuerpo hace exactamente lo contrario de lo que le pediste.",
      "Termina con vos en el piso y sin ninguna explicación digna."
    ],
    dialogo: [
      "Y decís justo la cosa que no había que decir, con volumen.",
      "Se te sale una frase que va a circular durante días.",
      "Terminás pidiendo perdón por haber hablado, que es un piso nuevo."
    ],
    trip: [
      "Y lo que se abre no tenía que abrirse hoy ni así.",
      "Te vas a un lugar del que se vuelve caminando y despacio.",
      "Es de esas veces en que alguien tiene que quedarse con vos."
    ],
    comercio: [
      "Y terminás pagando por algo que ni querías, al doble.",
      "Te ven la desesperación desde la otra vereda y te la cobran.",
      "Cierras el peor trato de tu vida con una firmeza admirable."
    ],
    descanso: [
      "Y te despertás peor, más tarde y en otro lado.",
      "El descanso se convierte en un pozo de cuatro horas sin fondo.",
      "Perdés medio día y no ganás ni un gramo de cuerpo."
    ],
    ritual: [
      "Y lo arruinás para todos de una manera que nadie va a mencionar.",
      "Se corta el clima de once personas y fue por tu mano.",
      "Alguien se levanta y se va, y ese alguien tenía razón."
    ],
    ruta: [
      "Y el camino te devuelve al punto de partida, más pobre.",
      "Terminás perdido en un lugar sin nombre y sin señal.",
      "Elegiste mal y el error tiene consecuencias de kilómetros."
    ]
  }
};

/* Elige una línea del dado según el grado y la categoría del evento. */
PICHI.textoDado = function (grado, categoria) {
  var banco = PICHI.DADO_TEXTOS[grado];
  if (!banco) return "";
  var pool = banco[categoria] || banco.generico;
  return PICHI.pick(pool);
};
