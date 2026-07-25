/* PICHICATA — consecuencias de lo que hiciste.
   Hasta acá, 54 de las 63 flags se prendían y no las leía nadie: el contenido
   prometía consecuencias y el motor las tiraba a la basura. Esta tabla las lee.

   Cada flag tiene:
     eco     -> línea que aparece ANTES de un evento más adelante en la run.
                Es un recordatorio, no una escena: una oración, sin opciones.
     rastro  -> línea del resumen final, en "lo que dejaste atrás".
     karma   -> corrección al Karma cuando se cierra la run (opcional).
     mecanica-> true si la flag es solo un estado del motor y no una decisión
                con peso moral (esas no llevan eco).

   Los ecos NO usan placeholders de slots: se muestran fuera del evento. */

window.PICHI = window.PICHI || {};

PICHI.CONSECUENCIAS = {

  /* ---------- plata y deudas ---------- */
  pago_completo: {
    eco: ["Pagaste todo por adelantado y en efectivo. Cada tanto te acordás del monto.",
          "La plata que dejaste en esa mano sigue produciendo un ruido bajo."],
    rastro: "Pagaste el retiro completo, en efectivo, sin regatear."
  },
  deuda_kiosco: {
    eco: ["Hay un cuaderno Gloria con tu nombre y una cifra al lado.",
          "Le debés al kiosco. No es mucho. Es una cifra que existe."],
    rastro: "Quedó una deuda anotada en un cuaderno Gloria.", karma: -3
  },
  deuda_sotano: {
    eco: ["Subiste los once escalones sin pasar por la silla. Eso no se olvida solo.",
          "Le debés al del sótano, y el sótano sigue estando donde estaba."],
    rastro: "Te fuiste del sótano debiendo.", karma: -5
  },
  pago_intensivo: {
    eco: ["Pagaste el intensivo en tres cuotas y todavía queda una.",
          "El grupo chico era mejor. Eso es lo que te da rabia."],
    rastro: "Pagaste el intensivo: una fortuna y, honestamente, mejor."
  },
  certificado: {
    eco: ["Tenés un diploma en una carpeta de plástico que habilita algo que no sabés qué.",
          "El certificado está en el bolso. Sirve. Eso es lo inquietante."],
    rastro: "Te certificaste en un fin de semana."
  },
  trabaja_sotano: {
    eco: ["Ahora atendés la puerta del sótano. Cobrás en efectivo al final de la noche.",
          "Sos parte de la estructura y todavía no sabés qué significa eso."],
    rastro: "Terminaste trabajando para el sótano.", karma: -5
  },

  /* ---------- el chanta y el negocio ---------- */
  garca_del_guru: {
    eco: ["Entraste sin pagar. Nadie te lo dijo nunca y por eso pesa más.",
          "Le garcaste la seña al que te recibió con un abrazo de ocho segundos."],
    rastro: "Entraste al retiro sin pagar.", karma: -5
  },
  guru_te_respeta: {
    eco: ["Desde que le dijiste en la cara que era un chanta, te trata distinto. Mejor.",
          "Te ganaste algo raro: el respeto del que estás desconfiando."],
    rastro: "Le dijiste chanta en la cara y te respetó por eso.", karma: 3
  },
  socio_del_chanta: {
    eco: ["Hay un acuerdo hecho y no hay forma de deshacerlo con un gesto.",
          "Sos socio. La palabra suena mejor de lo que es."],
    rastro: "Te hiciste socio del negocio.", karma: -8
  },
  socio_del_contador: {
    eco: ["El plan de negocios está escrito en una servilleta y la servilleta la tenés vos.",
          "Los números cierran y eso ya es un problema tuyo."],
    rastro: "Armaste un plan de negocios en una servilleta.", karma: -5
  },
  guia_honesto: {
    eco: ["Guiaste una ronda sin cobrar un peso y todavía te duele la espalda.",
          "Once personas te hicieron caso y no les cobraste. Es la primera cosa que hiciste bien en años."],
    rastro: "Guiaste una ronda gratis.", karma: 8
  },
  guia_chanta: {
    eco: ["Cobraste como cobra él. Sos bueno en esto, y esa es la información nueva.",
          "La primera ronda propia salió redonda y eso te tiene inquieto."],
    rastro: "Guiaste y cobraste.", karma: -8
  },
  guru_chanta_final: {
    eco: ["Ya tenés el galpón, las telas de colores y la seña del cincuenta por ciento.",
          "El cartel es más grande que el de él."],
    rastro: "Montaste tu propio retiro.", karma: -10
  },
  enemigo_de_coach: {
    eco: ["Te silenciaron el micrófono en un seminario y hay gente que lo vio.",
          "Hiciste una pregunta que no había que hacer y circuló."],
    rastro: "Te ganaste un enemigo con dientes de otro país."
  },
  expuso_traductor: {
    eco: ["El retiro está dividido en dos bandos desde que hablaste en portugués.",
          "Rompiste un sistema que le servía a nueve personas."],
    rastro: "Expusiste al traductor que no sabía portugués."
  },
  falso_medium: {
    eco: ["Le inventaste un mensaje del más allá a una viuda y te lo pagó.",
          "Ella va a repetir esa frase el resto de su vida. La escribiste vos."],
    rastro: "Canalizaste a un muerto que no dijo nada.", karma: -10
  },
  ladron_de_luz: {
    eco: ["El aro de luz lo vendiste a la vuelta. El escándalo se escuchó de lejos.",
          "Hay alguien buscando un aro de luz que vos ya no tenés."],
    rastro: "Robaste y vendiste un aro de luz.", karma: -5
  },
  traicion: {
    eco: ["Tenés una lista de contactos que no es tuya.",
          "Hay una traición esperando su momento y el momento no llegó todavía."],
    rastro: "Te llevaste la lista de contactos.", karma: -8
  },

  /* ---------- promesas ---------- */
  cumplio_promesa: {
    eco: ["Cumpliste. Fue aburrido y fue enorme, y nadie aplaudió.",
          "Aquella vez paraste cuando dijiste que ibas a parar."],
    rastro: "Cumpliste la promesa.", karma: 8
  },
  promesa_amanecer: {
    eco: ["Prometiste cambiar tu vida con el sol saliendo. Van tres días.",
          "El «desde mañana» de aquel amanecer sigue vigente en el papel."],
    rastro: "Prometiste cambiar tu vida en un amanecer."
  },
  promesa_concreta: {
    eco: ["Prometiste una cosa chica y verificable, y eso es lo peor: es verificable.",
          "Hay una promesa con fecha y la fecha se acerca."],
    rastro: "Prometiste algo concreto, con fecha.", karma: 3
  },
  arranco_mintiendo: {
    eco: ["Arrancaste el viaje con una frase inventada y todavía te la creen.",
          "Tu presentación fue una mentira bien construida y funcionó."],
    rastro: "Empezaste mintiendo en la ronda de presentación.", karma: -3
  },
  mintio_dieta: {
    eco: ["Levantaste la mano diciendo que cumpliste la dieta. Fue un pacto colectivo.",
          "La milanesa de anteayer sigue sin declararse."],
    rastro: "Mentiste sobre la dieta previa.", karma: -3
  },
  mintio_en_ceremonia: {
    eco: ["Escupiste la toma y actuaste el trance cuatro horas. Nadie te descubrió.",
          "Le mentiste a la selva, que es un modo de decir que te mentiste a vos."],
    rastro: "Fingiste tomar en la ceremonia.", karma: -5
  },

  /* ---------- vínculos ---------- */
  encargado_amigo: {
    eco: ["El encargado te saluda desde que lo invitaste a subir. Eso vale más de lo que parece.",
          "Hay un tipo con un trapo al hombro que ahora está de tu lado."],
    rastro: "El encargado del edificio te saluda.", karma: 3
  },
  contacto_retiro: {
    eco: ["Alguien del retiro tiene tu número de verdad y lo va a usar.",
          "Quedó un teléfono intercambiado que no era por cortesía."],
    rastro: "Intercambiaste un teléfono que sí era real.", karma: 3
  },
  guarda_secreto: {
    eco: ["Cargás un secreto ajeno y no lo dijiste ni cuando convenía.",
          "Hay algo que sabés y que no vas a decir. Pesa y es tuyo."],
    rastro: "Guardaste un secreto que te confiaron a las seis de la mañana.", karma: 5
  },
  debe_favor: {
    eco: ["Le debés un favor a alguien que no conocés y eso es una forma moderna del karma.",
          "Alguien pagó un abogado por vos. En algún momento va a aparecer."],
    rastro: "Le debés un favor a un desconocido.", karma: -3
  },
  pacto_vecinal: {
    eco: ["Hay un acuerdo con el vecino y lo estás cumpliendo, cosa notable.",
          "El acuerdo del palier sigue en pie."],
    rastro: "Negociaste con el vecino y cumpliste.", karma: 5
  },
  tiene_perro: {
    eco: ["El perro sigue con vos. Dos pasos atrás, sin pedir nada.",
          "Hay alguien que depende de vos y eso ordena mejor que cualquier mantra."],
    rastro: "Te llevaste el perro.", karma: 8
  },
  repara: {
    eco: ["Te comprometiste a reparar una cosa concreta con una persona concreta.",
          "Elegiste uno de los catorce y empezaste por ahí. Es la única forma que funcionó nunca."],
    rastro: "Te comprometiste a reparar algo con alguien.", karma: 8
  },
  se_volvio: {
    eco: ["Ya te volviste una vez. Sabés cómo se siente el alivio y sabés cómo se paga.",
          "Diste media vuelta en una plataforma y la decisión sigue ahí."],
    rastro: "Volviste a casa en el medio del viaje."
  },
  camino_propio: {
    eco: ["Desde que decidiste seguir solo, el viaje es tuyo con todo lo malo que eso implica.",
          "No hay maestro. Fue tu decisión y se nota en cada evento."],
    rastro: "Seguiste el camino sin maestro.", karma: 5
  },
  se_fue_temprano: {
    eco: ["Te subiste a una moto sin casco y sin explicación. Nadie te lo va a preguntar.",
          "Te fuiste antes y todavía no sabés de qué te salvaste."],
    rastro: "Te fuiste antes de que terminara."
  },
  sostuvo_ronda: {
    eco: ["Sostuviste una ronda de once personas mientras el guía dormía. Fue tu mejor hora.",
          "Nueve personas no se enteraron de nada y por eso salió bien."],
    rastro: "Sostuviste la ronda vos.", karma: 8
  },
  defensor_del_orden: {
    eco: ["Frenaste algo en el medio de una ceremonia y el guía lo anotó.",
          "Dijiste «loco, no» y funcionó, que es lo más raro de esa noche."],
    rastro: "Frenaste una ceremonia que se iba al carajo.", karma: 5
  },
  discutio_en_ronda: {
    eco: ["Cortaste el clima de once personas por tener razón. Salió caro.",
          "Hay gente que todavía no te perdona la discusión del flúor."],
    rastro: "Tuviste razón en el peor momento posible."
  },

  /* ---------- lo turbio y lo legal ---------- */
  retiro_quemado: {
    eco: ["El video circula. Le arruinaste el año a alguien y no está claro si estuvo bien.",
          "Cuarenta segundos de video cambiaron el resto del viaje."],
    rastro: "Quemaste el retiro."
  },
  declaro_contra: {
    eco: ["Declaraste cuatro horas con detalle. El retiro no existe más por tu mano.",
          "Hay un acta con tu firma y con nombres."],
    rastro: "Declaraste contra el retiro.", karma: 5
  },
  encubrio: {
    eco: ["Mentiste bajo declaración y te lo pagaron en la puerta. Eso lo empeora todo.",
          "Hay una segunda denuncia esperando, y esta vez con una internación."],
    rastro: "Encubriste bajo declaración.", karma: -12
  },
  firmo_acta: {
    eco: ["Firmaste sin leer para salir rápido. Va a llegar una carta.",
          "La velocidad tuvo un precio y todavía no llegó la factura."],
    rastro: "Firmaste un acta sin leerla.", karma: -3
  },
  tiene_grabacion: {
    eco: ["Tenés cuatro minutos de audio impecable que no vas a usar nunca.",
          "Hay una carta guardada que no vas a jugar, y tenerla te da una calma rara."],
    rastro: "Grabaste una coima y te la guardaste."
  },
  llamo_ambulancia: {
    eco: ["Llamaste. Podría no haber hecho falta y podría haber salvado a alguien.",
          "La luz azul en el portón la trajiste vos."],
    rastro: "Llamaste una ambulancia.", karma: 10
  },
  llamo_policia: {
    eco: ["Llamaste a la policía contra la opinión de todos. Van a culparte años.",
          "Hiciste lo correcto y nadie te lo va a decir."],
    rastro: "Llamaste a la policía cuando faltaba alguien.", karma: 5
  },

  /* ---------- química y cuerpo ---------- */
  doble_toma: {
    eco: ["Pediste la segunda toma delante de todos. El silencio de la ronda sigue ahí.",
          "Hubo un momento en que extendiste el vaso y nadie lo olvidó."],
    rastro: "Pediste la segunda toma."
  },
  mezclo_todo: {
    eco: ["Mezclaste, y fuiste consciente de que estabas mezclando.",
          "El cuerpo lleva registro de esa combinación."],
    rastro: "Mezclaste todo lo que había.", karma: -3
  },
  recayo: {
    eco: ["Recaíste. No fue una catástrofe, fue una decepción, que es más difícil de digerir.",
          "«Una sola vez» era la frase, y la frase completa es más larga."],
    rastro: "Recaíste.", karma: -5
  },

  /* ---------- el plano astral y el ego ---------- */
  invoco_algo: {
    eco: ["Hay algo en el rincón desde aquella noche del mantra. No se fue.",
          "Estuviste tres horas invocando más o menos lo contrario y eso quedó."],
    rastro: "Invocaste algo con el mantra mal dicho."
  },
  no_miro: {
    eco: ["Sigue habiendo algo que no estás mirando, y sostener eso es un trabajo.",
          "Decidiste no mirar y estás cumpliendo, que es tu logro más grande."],
    rastro: "Nunca miraste.", karma: 3
  },
  ego_pendiente: {
    eco: ["Fumaron juntos y no se resolvió nada. Dijo «seguimos después» y va a cumplir.",
          "Hay una conversación con vos mismo que quedó a mitad de camino."],
    rastro: "Dejaste la charla con el ego a mitad de camino."
  },
  socio_del_ego: {
    eco: ["Le propusiste sociedad a tu propio ego y aceptó. Nunca se queda sin texto, pero esa vez sí.",
          "«Vos vas a llegar lejos», te dijo. Y era un elogio, y da miedo."],
    rastro: "Te asociaste con tu ego.", karma: -8
  },
  pacto_con_ego: {
    eco: ["Hay un acuerdo de convivencia firmado: él opina, vos decidís. Está funcionando.",
          "Va de acompañante y avisa los pozos. Es todo lo que se podía lograr."],
    rastro: "Firmaste un acuerdo de convivencia con tu ego.", karma: 5
  },
  ego_inflado: {
    eco: ["Aceptaste la bendición de un maestro impecable y salís flotando desde entonces.",
          "Te sentís elegido. Eso es exactamente el problema."],
    rastro: "Te dejaste bendecir por un maestro demasiado perfecto.", karma: -5
  },
  ultima_excusa: {
    eco: ["Te quedaste con la última excusa. Es cómoda y la vas a necesitar.",
          "Todavía tenés con qué explicar todo, y eso te frena."],
    rastro: "Te quedaste con la última excusa."
  },
  no_lo_conto: {
    eco: ["No se lo contaste a nadie. Se queda entero. Es la única forma de que se quede entero.",
          "Lo que te pasó no tiene testigos y por eso sigue siendo tuyo."],
    rastro: "No se lo contaste a nadie.", karma: 5
  },

  /* ---------- rutas y desvíos ---------- */
  desvio: {
    eco: ["Te desviaste del plan y desde entonces el viaje no es el que te vendieron.",
          "Aquel desvío te mostró tres cosas que el plan no incluía."],
    rastro: "Te desviaste del camino previsto."
  },
  siguio_la_carta: {
    eco: ["Fuiste a la dirección del papel. Lo que había ahí no te lo explicó nadie.",
          "Seguiste una instrucción escrita con letra ajena y salió bien."],
    rastro: "Seguiste la dirección de un papel."
  },

  /* ---------- estados del motor (sin eco: no son decisiones) ---------- */
  tiene_faso: { mecanica: true, rastro: "Anduviste con material encima." },
  tomo_aya: { mecanica: true, rastro: "Tomaste." },
  vino_infinito: { mecanica: true, rastro: "Nunca se te terminó el litro." },
  en_sotano: { mecanica: true, rastro: "Bajaste al sótano." },
  tiene_alarma: { mecanica: true, rastro: "Programaste la salida antes de entrar." },
  mision_rescate: { mecanica: true, rastro: "Bajaste a buscar a alguien." },
  norte: { mecanica: true, rastro: "Tomaste por la ruta del norte." }
};

/* ---------------------------------------------------------------------------
   ECOS DE ESTADO

   Los ecos de flag solo alcanzan para ~1,6 por run: una run junta 3 flags en
   promedio y no todas tienen eco. El límite no es la probabilidad, es que se
   registran pocas decisiones.

   Estos otros ecos salen de cómo viene la run —el cuerpo, la deuda, el elenco,
   cómo te fue en los dados— y están disponibles siempre. Son los que hacen que
   un turno cualquiera se sienta parte de algo y no un evento suelto.
--------------------------------------------------------------------------- */

PICHI.ECOS_DE_ESTADO = [
  {
    id: "cuerpo_al_limite",
    cond: function (r) { return r.stats.aguante <= 25; },
    textos: ["El cuerpo viene avisando desde hace un rato y vos vienes sin escuchar.",
             "Te tiembla algo que antes no temblaba.",
             "Cada movimiento cuesta un poco más que el anterior."]
  },
  {
    id: "en_rojo",
    cond: function (r) { return r.stats.mangos < 0; },
    textos: ["Estás en rojo y la cifra la sabés de memoria.",
             "No te queda plata. Eso cambia qué preguntas podés hacer.",
             "Hacés la cuenta de nuevo y da lo mismo que la última vez."]
  },
  {
    id: "cabeza_al_limite",
    cond: function (r) { return r.stats.paranoia >= 70; },
    textos: ["Hace varios turnos que estás revisando conversaciones viejas.",
             "La sensación de que algo va a pasar no se fue en ningún momento.",
             "Seguís contando gente por costumbre."]
  },
  {
    id: "muy_arriba",
    cond: function (r) { return r.stats.efecto >= 70; },
    textos: ["Hace horas que no bajás y el cuerpo lleva la cuenta aunque vos no.",
             "Todavía tenés todo encima y todavía no se fue nada.",
             "El piso sigue estando un poco más lejos de lo que corresponde."]
  },
  {
    id: "limpio_hace_rato",
    cond: function (r) { return r.stats.efecto <= 5 && r.turno >= 6; },
    textos: ["Estás sobrio desde el principio y eso también es una manera de estar raro.",
             "No tomaste nada en todo el viaje. Se nota en cómo te miran."]
  },
  {
    id: "casi_iluminado",
    cond: function (r) { return r.stats.conciencia >= PICHI.GATE_TRAMO_4; },
    textos: ["Estás muy cerca de algo y por eso te da más miedo que antes.",
             "Se te acomodó tanto que ahora tenés algo que perder."]
  },
  {
    id: "vacio_de_conciencia",
    cond: function (r) { return r.stats.conciencia <= 12 && r.turno >= 6; },
    textos: ["Hace varios turnos que no entendés nada y ya te acostumbraste.",
             "Algo se te apagó en el camino y no sabés cuándo."]
  },
  {
    id: "karma_santo",
    cond: function (r) { return r.stats.karma >= 55; },
    textos: ["Últimamente la gente te trata bien y no sabés qué hacer con eso.",
             "Venís haciendo las cosas bien y se te nota en la cara, que es lo peor."]
  },
  {
    id: "karma_podrido",
    cond: function (r) { return r.stats.karma <= -45; },
    textos: ["Venís dejando un tendal y en algún momento alguien va a hacer la cuenta.",
             "Hay tres personas en este viaje a las que preferirías no volver a ver."]
  },
  {
    id: "pifia_reciente",
    cond: function (r) { return (r.marcas.pifias || 0) > 0; },
    textos: ["Todavía te dura la vergüenza del papelón de hace un rato.",
             "Alguien vio cómo te salió mal aquello y no lo va a olvidar.",
             "Preferirías que lo de antes no hubiera pasado con público."]
  },
  {
    id: "critico_reciente",
    cond: function (r) { return (r.marcas.criticos || 0) > 0; },
    textos: ["Todavía te dura la sensación de aquella vez que salió redondo.",
             "Una vez te salió perfecto y desde entonces querés repetirlo."]
  },
  {
    id: "elenco_repetido",
    cond: function (r) {
      var enc = r.encuentros || {};
      for (var i = 0; i < (r.elenco || []).length; i++) if ((enc[r.elenco[i]] || 0) >= 3) return true;
      return false;
    },
    textos: ["Otra vez la misma cara. A esta altura ya no es casualidad.",
             "Hay gente que en este viaje aparece siempre, y eso empieza a significar algo.",
             "Te cruzás con la misma persona por tercera vez y los dos lo notan."]
  },
  {
    id: "cargado_de_reliquias",
    cond: function (r) { return r.reliquias.length >= 2; },
    textos: ["Cargás más cosas de las que trajiste y ninguna pesa lo que debería.",
             "El bolsillo interno está lleno de objetos que no le explicarías a nadie."]
  },
  {
    id: "lejos_del_arranque",
    cond: function (r) { return r.turno >= 14; },
    textos: ["Te acordás de la primera decisión del viaje y te parece de otra persona.",
             "Ya no sabés cuántas horas hace que salíste de tu casa.",
             "El que arrancó este viaje y el que está acá no coinciden en nada."]
  },
  {
    id: "solo",
    cond: function (r) {
      var enc = r.encuentros || {};
      return r.turno >= 8 && Object.keys(enc).length <= 3;
    },
    textos: ["Viniste cruzándote con muy poca gente y eso también es un resultado.",
             "Hace un rato que el viaje es bastante solitario."]
  },
  {
    id: "sin_dormir",
    cond: function (r) { return r.turno >= 10 && r.stats.aguante <= 45; },
    textos: ["No dormiste y el no haber dormido ya es un personaje del viaje.",
             "Las horas sin dormir se acumulan y empiezan a opinar."]
  }
];

/* Los ecos disponibles ahora: flags prendidas, con eco escrito y sin usar. */
PICHI.ecosDisponibles = function () {
  var r = PICHI.run;
  if (!r) return [];
  var usados = r.ecosUsados || {};
  var out = [];
  for (var flag in r.flags) {
    if (!r.flags[flag]) continue;
    var c = PICHI.CONSECUENCIAS[flag];
    if (!c || !c.eco || !c.eco.length) continue;
    if (usados[flag]) continue;
    out.push({ flag: flag, textos: c.eco });
  }
  return out;
};

/* Ecos de estado que aplican ahora mismo y no se usaron todavía. */
PICHI.ecosDeEstadoDisponibles = function () {
  var r = PICHI.run;
  if (!r) return [];
  var usados = r.ecosUsados || {};
  var out = [];
  for (var i = 0; i < PICHI.ECOS_DE_ESTADO.length; i++) {
    var e = PICHI.ECOS_DE_ESTADO[i];
    if (usados[e.id]) continue;
    var aplica = false;
    try { aplica = e.cond(r); } catch (err) { aplica = false; }
    if (aplica) out.push({ flag: e.id, textos: e.textos });
  }
  return out;
};

/* Un eco por turno como máximo, y no siempre: si apareciera en cada evento
   dejaría de ser un recuerdo y pasaría a ser una cortina.
   Los de flag tienen prioridad —son consecuencia de una decisión concreta— y
   los de estado rellenan cuando no hay ninguna decisión fresca que ecoar. */
PICHI.ecoDelTurno = function () {
  if (!PICHI.run || PICHI.run.turno < 3) return null;   // el eco necesita un antes
  /* 0.45 da ~1 eco cada 3 turnos (≈4,7 por run). Medido: con 0.7 llegaba al 38%
     de los turnos y dejaba de leerse como recuerdo para volverse una cortina. */
  if (!PICHI.chance(0.45)) return null;

  var pool = PICHI.ecosDisponibles();
  if (!pool.length || PICHI.chance(0.4)) {
    var estado = PICHI.ecosDeEstadoDisponibles();
    if (estado.length) pool = pool.concat(estado);
  }
  if (!pool.length) return null;

  var elegido = PICHI.pick(pool);
  PICHI.run.ecosUsados = PICHI.run.ecosUsados || {};
  PICHI.run.ecosUsados[elegido.flag] = 1;
  return { flag: elegido.flag, texto: PICHI.pick(elegido.textos) };
};

/* El rastro: todo lo que quedó marcado, para el resumen del final. */
PICHI.rastroDeLaRun = function () {
  var r = PICHI.run, out = [];
  if (!r) return out;
  for (var flag in r.flags) {
    if (!r.flags[flag]) continue;
    var c = PICHI.CONSECUENCIAS[flag];
    if (!c || !c.rastro) continue;
    out.push({ flag: flag, texto: c.rastro, karma: c.karma || 0, mecanica: !!c.mecanica });
  }
  // primero lo que tuvo peso moral, después los estados
  out.sort(function (a, b) {
    if (a.mecanica !== b.mecanica) return a.mecanica ? 1 : -1;
    return Math.abs(b.karma) - Math.abs(a.karma);
  });
  return out;
};

/* Corrección de Karma al cerrar: lo que hiciste pesa, no solo lo que elegiste
   en el último turno. */
PICHI.karmaDelRastro = function () {
  var total = 0, rastro = PICHI.rastroDeLaRun();
  for (var i = 0; i < rastro.length; i++) total += rastro[i].karma;
  return total;
};
