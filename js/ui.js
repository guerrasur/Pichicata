/* PICHICATA — render. Todo texto, cero animación, foco en la decisión. */

window.PICHI = window.PICHI || {};

PICHI.UI = {
  pantalla: "menu",   // menu | juego | tienda | personajes | coleccion | ayuda
  ramaAbierta: "A"
};

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function el(id) { return document.getElementById(id); }

/* ---------- distorsión por Efecto ---------- */

var MAPA_RARO = { a: "@", e: "3", i: "¡", o: "ø", s: "$", u: "ü", n: "ñ", c: "ç", r: "я", t: "†" };

PICHI.UI.distorsionar = function (txt, efecto) {
  if (efecto < 35) return txt;
  var avanzada = PICHI.tieneUnlock("E5");
  var fuerza = (efecto - 35) / 65;                 // 0 .. 1
  var prob = (avanzada ? 0.13 : 0.06) * fuerza;
  var out = "";
  for (var i = 0; i < txt.length; i++) {
    var c = txt[i], low = c.toLowerCase();
    if (MAPA_RARO[low] && PICHI.rnd() < prob) out += MAPA_RARO[low];
    else out += c;
    if (avanzada && efecto > 70 && c === " " && PICHI.rnd() < 0.04 * fuerza) out += " ";
  }
  return out;
};

function claseTrip(efecto) {
  if (efecto >= 85) return "trip-3";
  if (efecto >= 60) return "trip-2";
  if (efecto >= 35) return "trip-1";
  return "";
}

/* ---------- barra de stats ---------- */

function barra(valor, min, max) {
  var n = 20;
  var pos = Math.round(((valor - min) / (max - min)) * n);
  pos = Math.max(0, Math.min(n, pos));
  return "[" + new Array(pos + 1).join("#") + new Array(n - pos + 1).join(".") + "]";
}

function renderStats() {
  if (!PICHI.run) return "";
  var s = PICHI.run.stats, out = "", i;
  for (i = 0; i < PICHI.STATS.length; i++) {
    var def = PICHI.STATS[i], v = s[def.id];
    var alerta = "";
    if (def.id === "aguante" && v <= 20) alerta = " alerta";
    if (def.id === "efecto" && v >= 80) alerta = " alerta";
    if (def.id === "paranoia" && v >= 80) alerta = " alerta";
    if (def.id === "conciencia" && v <= 15) alerta = " alerta";
    if (def.id === "mangos" && v <= -150) alerta = " alerta";
    if (def.id === "conciencia" && v >= PICHI.GATE_TRAMO_4) alerta = " bien";

    var valorTxt = (def.prefijo || "") + v;
    out += '<div class="stat' + alerta + '">' +
      '<span class="stat-label">' + esc(def.label) + '</span>' +
      '<span class="stat-bar">' + (def.barra ? esc(barra(v, def.min, def.max)) : "") + '</span>' +
      '<span class="stat-val">' + esc(valorTxt) + '</span>' +
      '</div>';
  }

  var rel = "";
  if (PICHI.run.reliquias.length) {
    var nombres = [];
    for (i = 0; i < PICHI.run.reliquias.length; i++) {
      var r = PICHI.reliquia(PICHI.run.reliquias[i]);
      if (r) nombres.push(r.nombre);
    }
    rel = '<div class="reliquias">reliquias: ' + esc(nombres.join(" · ")) + '</div>';
  }

  var elenco = "";
  var gente = PICHI.elencoDeLaRun();
  if (gente.length) {
    var partes = [];
    for (i = 0; i < gente.length; i++) {
      var g = gente[i];
      partes.push('<span class="' + (g.encuentros ? 'conocido' : 'por-conocer') + '">' +
        esc(g.pieza.nombre) + (g.encuentros > 1 ? ' ×' + g.encuentros : '') + '</span>');
    }
    elenco = '<div class="elenco">en el viaje: ' + partes.join(' · ') + '</div>';
  }

  /* Dónde estás y qué hora es. Es la línea que convierte una secuencia de
     escenas en un itinerario: si no se ve, el jugador no registra que se quedó
     en el mismo lugar tres turnos ni que se le hizo de noche. */
  var lugar = PICHI.lugarActual();
  var hora = PICHI.horaActual();
  var dia = PICHI.run.dia > 1 ? ' · día ' + PICHI.run.dia : '';
  var donde = '<div class="donde">' + esc(hora.nombre) +
    (lugar ? ' · ' + esc(lugar.nombre) : ' · en ningún lado del mapa') + esc(dia) + '</div>';

  var def4 = PICHI.tramoDef(PICHI.run.tramo);
  return '<div class="hud">' +
    '<div class="hud-top">' +
      '<span class="tramo">' + esc(PICHI.nombreTramo(PICHI.run.tramo)) + '</span>' +
      '<span class="turno">turno ' + PICHI.run.turno + ' · paso ' + Math.min(PICHI.run.turnoEnTramo, def4.turnos) + '/' + def4.turnos + '</span>' +
    '</div>' +
    donde +
    '<div class="stats">' + out + '</div>' + elenco + rel +
    '</div>';
}

/* ---------- ascii ---------- */

function renderAscii(key) {
  var lines = key ? PICHI.asciiDisponible(key) : null;
  if (!lines) return "";
  return '<pre class="ascii">' + esc(lines.join("\n")) + '</pre>';
}

/* ---------- pantallas ---------- */

function renderMenu() {
  var diag = PICHI.diagnostico();
  var m = PICHI.meta;
  var pj = PICHI.personajeJugable(m.personaje);
  var ultima = "";
  if (m.ultimaRun) {
    ultima = '<div class="bloque"><div class="titulo-min">última run</div>' +
      '<p class="tenue">' + esc(m.ultimaRun.fin) + " · tramo " + m.ultimaRun.tramo +
      " · " + m.ultimaRun.turnos + " turnos · +" + m.ultimaRun.ka + " KA</p></div>";
  }

  return '<pre class="logo">' + esc(
"  ██████  ██  ██████ ██  ██ ██  ██████  ██████  ██████  ██████\n" +
"  ██   ██ ██ ██      ██  ██ ██ ██       ██   ██   ██   ██   ██\n" +
"  ██████  ██ ██      ██████ ██ ██       ██████    ██   ██████ \n" +
"  ██      ██ ██      ██  ██ ██ ██       ██   ██   ██   ██   ██\n" +
"  ██      ██  ██████ ██  ██ ██  ██████  ██   ██   ██   ██   ██") + '</pre>' +
  '<p class="subtitulo">roguelite de búsqueda espiritual con presupuesto ajustado</p>' +

  '<div class="bloque">' +
    '<div class="fila-kv"><span>Karma Acumulado</span><span class="destacado">' + m.ka + ' KA</span></div>' +
    '<div class="fila-kv"><span>runs jugadas</span><span>' + m.runs + '</span></div>' +
    '<div class="fila-kv"><span>victorias</span><span>' + m.victorias + '</span></div>' +
    '<div class="fila-kv"><span>finales vistos</span><span>' + m.endings.length + '/' + PICHI.FINALES.length + '</span></div>' +
    '<div class="fila-kv"><span>logros</span><span>' + m.achievements.length + '/' + PICHI.LOGROS.length + '</span></div>' +
    '<div class="fila-kv"><span>encarnación elegida</span><span>' + esc(pj.nombre) + '</span></div>' +
  '</div>' +

  '<div class="bloque">' +
    '<div class="titulo-min">contenido disponible ahora</div>' +
    '<p class="tenue">' + diag.eventos + ' eventos base (de ' + diag.eventosTotales + ') · ' +
      diag.escenarios + ' escenarios · ' + diag.personajes + ' personajes · ' + diag.complicaciones + ' complicaciones<br>' +
      '≈ ' + diag.combinaciones.toLocaleString("es-AR") + ' combinaciones posibles · ' + diag.leidas + ' ya leídas</p>' +
  '</div>' + ultima +

  '<div class="acciones">' +
    (PICHI.hayRunGuardada() ? '<button data-act="reanudar">[ seguir la run en curso ]</button>' : '') +
    '<button data-act="nueva">[ arrancar el viaje ]</button>' +
    '<button data-act="tienda">[ karma acumulado · desbloqueos ]</button>' +
    '<button data-act="personajes">[ elegir encarnación ]</button>' +
    '<button data-act="coleccion">[ colección · logros y finales ]</button>' +
    '<button data-act="ayuda">[ cómo funciona ]</button>' +
  '</div>';
}

function renderJuego() {
  var r = PICHI.run;
  if (!r) return renderMenu();
  var efecto = r.stats.efecto;
  var cls = claseTrip(efecto);

  if (r.fase === "fin") return renderFin();

  var html = renderStats();

  if (r.puenteVacio && r.tramo === 5 && r.turnoEnTramo === 1) {
    html += '<div class="bloque puente"><div class="titulo-min">' + esc(r.puenteVacio) + '</div>' +
      '<p>Y después de eso, todavía, hay días. Sigue el viaje.</p></div>';
  }
  if (r.milagro) {
    html += '<div class="bloque milagro"><p>' + esc(r.milagro) + '</p></div>';
    delete r.milagro;
  }

  if (r.fase === "evento") {
    var ev = r.evento;
    html += '<div class="evento ' + cls + '">';
    /* El traslado y el porqué van ANTES del evento: uno dice cómo llegaste acá,
       el otro dice por qué esto y no otra cosa. Sin ellos cada turno se leía
       como una postal suelta. */
    if (ev.traslado) html += '<div class="traslado">' + esc(PICHI.UI.distorsionar(ev.traslado, efecto)) + '</div>';
    if (ev.porque) html += '<div class="porque">' + esc(ev.porque) + '</div>';
    if (ev.eco) html += '<div class="eco">' + esc(PICHI.UI.distorsionar(ev.eco.texto, efecto)) + '</div>';
    html += renderAscii(ev.ascii);
    if (ev.titulo) html += '<h2>' + esc(ev.titulo) + '</h2>';
    for (var i = 0; i < ev.parrafos.length; i++) {
      html += '<p>' + esc(PICHI.UI.distorsionar(ev.parrafos[i], efecto)) + '</p>';
    }
    html += '<div class="opciones">';
    for (i = 0; i < ev.opciones.length; i++) {
      var op = ev.opciones[i];
      var spoiler = op.spoiler ? '<span class="spoiler">' + esc(op.spoiler) + '</span>' : "";
      var dado = op.dado
        ? '<span class="dado-previo" title="tirada de dado">⚄ ' + esc(op.dado.etiqueta) + '</span>'
        : "";
      if (op.disponible) {
        html += '<button class="opcion' + (op.dado ? ' con-dado' : '') + '" data-op="' + i + '">' +
          '<span class="num">' + (i + 1) + '.</span> ' + esc(PICHI.UI.distorsionar(op.label, efecto)) +
          dado + spoiler + '</button>';
      } else {
        html += '<div class="opcion bloqueada"><span class="num">' + (i + 1) + '.</span> <s>' + esc(op.label) + '</s>' +
          (op.motivo ? ' <span class="req">requiere ' + esc(op.motivo) + '</span>' : ' <span class="req">no disponible</span>') + '</div>';
      }
    }
    html += '</div>';
    if (PICHI.tieneReliquiaEnRun("C8") && !r.ojoUsado) {
      html += '<button class="secundario" data-act="rechazar">[ tercer ojo: rechazar este evento ]</button>';
    }
    html += '</div>';
    return html;
  }

  // resolución
  var res = r.resolucion;
  html += '<div class="evento resolucion ' + cls + '">';
  html += '<div class="elegiste">elegiste: ' + esc(res.label) + '</div>';
  if (res.tirada) html += renderTirada(res.tirada);
  for (var j = 0; j < res.textos.length; j++) {
    html += '<p>' + esc(PICHI.UI.distorsionar(res.textos[j], efecto)) + '</p>';
  }
  if (res.notas.length) html += '<p class="notas">' + esc(res.notas.join(" · ")) + '</p>';
  html += renderDeltas(res.deltas);
  html += '<div class="opciones"><button class="opcion" data-act="continuar"><span class="num">→</span> seguir</button></div>';
  html += '</div>';
  return html;
}

/* El dado, después de tirar. Se muestra la cara, el modificador y el resultado
   contra la dificultad: el jugador tiene que poder auditar por qué salió así. */
function renderTirada(t) {
  var caras = { 1: "⚀", 2: "⚁", 3: "⚂", 4: "⚃", 5: "⚄", 6: "⚅" };
  var icono = caras[t.cara] || "⚄";
  var signo = t.mod >= 0 ? "+" : "";
  var abrev = { conciencia: "CON", karma: "KAR", aguante: "AGU", mangos: "$", efecto: "EFE", paranoia: "PAR" };
  return '<div class="tirada ' + t.grado + '">' +
    '<span class="tirada-icono">' + icono + '</span>' +
    '<span class="tirada-cuenta">' + t.cara + ' <span class="tenue">' + signo + t.mod + ' ' +
      esc(abrev[t.stat] || t.stat) + '</span> = <strong>' + t.total + '</strong>' +
      ' <span class="tenue">vs ' + t.cd + '</span></span>' +
    '<span class="tirada-grado">' + esc(PICHI.Dados.nombreGrado(t.grado)) + '</span>' +
    '</div>';
}

function renderDeltas(deltas) {
  var partes = [];
  for (var i = 0; i < PICHI.STATS.length; i++) {
    var def = PICHI.STATS[i], v = deltas[def.id];
    if (!v) continue;
    partes.push('<span class="' + (v > 0 ? "sube" : "baja") + '">' + esc(def.label) + " " + (v > 0 ? "+" : "") + v + '</span>');
  }
  if (!partes.length) return "";
  return '<div class="deltas">' + partes.join(" · ") + '</div>';
}

function renderFin() {
  var r = PICHI.run, f = r.fin, res = r.resumen, i;
  var html = '<div class="fin ' + (f.tipo === "victoria" ? "victoria" : f.tipo === "muerte" ? "muerte" : "neutro") + '">';
  html += renderAscii(f.ascii);
  html += '<h2>' + esc(f.nombre) + '</h2>';
  if (r.puenteFinal) html += '<p class="tenue">En el Tramo IV alcanzaste: ' + esc(r.puenteFinal.nombre) + '. Y seguiste.</p>';
  for (i = 0; i < f.texto.length; i++) html += '<p>' + esc(f.texto[i]) + '</p>';
  if (f.epitafio) html += '<pre class="epitafio">' + esc("« " + f.epitafio + " »") + '</pre>';

  if (r.rastro && r.rastro.length) {
    html += '<div class="bloque"><div class="titulo-min">lo que dejaste atrás</div>';
    for (i = 0; i < r.rastro.length; i++) {
      var t = r.rastro[i];
      var peso = t.karma > 0 ? '<span class="sube">+' + t.karma + ' karma</span>'
        : (t.karma < 0 ? '<span class="baja">' + t.karma + ' karma</span>' : '');
      html += '<div class="fila-kv' + (t.mecanica ? ' pendiente' : '') + '">' +
        '<span>' + esc(t.texto) + '</span><span class="tenue">' + peso + '</span></div>';
    }
    if (r.karmaDelRastro) {
      html += '<div class="fila-kv total"><span>lo que pesó al final</span><span class="' +
        (r.karmaDelRastro > 0 ? 'sube' : 'baja') + '">' +
        (r.karmaDelRastro > 0 ? '+' : '') + r.karmaDelRastro + ' karma</span></div>';
    }
    html += '</div>';
  }

  html += '<div class="bloque"><div class="titulo-min">cómo terminó</div>';
  for (i = 0; i < PICHI.STATS.length; i++) {
    var d = PICHI.STATS[i];
    html += '<div class="fila-kv"><span>' + esc(d.label) + '</span><span>' + esc((d.prefijo || "") + r.stats[d.id]) + '</span></div>';
  }
  html += '<div class="fila-kv"><span>turnos</span><span>' + (r.turno - 1) + '</span></div>';
  html += '<div class="fila-kv"><span>tramo</span><span>' + r.tramo + '</span></div>';
  html += '</div>';

  if (res) {
    html += '<div class="bloque"><div class="titulo-min">karma acumulado ganado</div>';
    for (i = 0; i < res.detalle.length; i++) {
      var it = res.detalle[i];
      html += '<div class="fila-kv"><span>' + esc(it.label) + '</span><span>' + (it.ka == null ? "×" + res.multiplicador.toFixed(2) : "+" + it.ka) + '</span></div>';
    }
    html += '<div class="fila-kv total"><span>TOTAL</span><span class="destacado">+' + res.total + ' KA</span></div>';
    html += '</div>';
    if (res.logros.length) {
      html += '<div class="bloque"><div class="titulo-min">logros nuevos</div>';
      for (i = 0; i < res.logros.length; i++) {
        html += '<div class="fila-kv"><span>' + esc(res.logros[i].nombre) + '</span><span class="tenue">' + esc(res.logros[i].desc) + '</span></div>';
      }
      html += '</div>';
    }
  }

  html += '<div class="acciones">' +
    '<button data-act="tienda">[ gastar ' + PICHI.meta.ka + ' KA ]</button>' +
    '<button data-act="nueva">[ volver a nacer ]</button>' +
    '<button data-act="coleccion">[ colección ]</button>' +
    '<button data-act="menu">[ menú ]</button>' +
    '</div></div>';
  return html;
}

function renderTienda() {
  var html = '<h2>KARMA ACUMULADO</h2>' +
    '<p class="subtitulo">Tenés <span class="destacado">' + PICHI.meta.ka + ' KA</span>. Todo lo que compres es permanente y ' +
    '<strong>suma</strong> al pool: nunca reemplaza contenido.</p>';

  html += '<div class="tabs">';
  for (var i = 0; i < PICHI.RAMAS.length; i++) {
    var ra = PICHI.RAMAS[i];
    html += '<button class="tab' + (PICHI.UI.ramaAbierta === ra.id ? " activa" : "") + '" data-rama="' + ra.id + '">' + esc(ra.id + " · " + ra.nombre) + '</button>';
  }
  html += '</div>';

  var rama = null;
  for (i = 0; i < PICHI.RAMAS.length; i++) if (PICHI.RAMAS[i].id === PICHI.UI.ramaAbierta) rama = PICHI.RAMAS[i];
  html += '<p class="tenue">' + esc(rama.desc) + '</p>';

  html += '<div class="lista-unlocks">';
  for (i = 0; i < PICHI.UNLOCKS.length; i++) {
    var u = PICHI.UNLOCKS[i];
    if (u.rama !== PICHI.UI.ramaAbierta) continue;
    var estado = PICHI.estadoUnlock(u.id);
    var reqTxt = "";
    if (u.req.length) {
      var faltan = [];
      for (var j = 0; j < u.req.length; j++) if (!PICHI.tieneUnlock(u.req[j])) faltan.push(u.req[j]);
      if (faltan.length) reqTxt = '<span class="req">necesita ' + esc(faltan.join(", ")) + '</span>';
    }
    html += '<div class="unlock ' + estado + '">' +
      '<div class="unlock-head"><span class="unlock-id">' + esc(u.id) + '</span>' +
      '<span class="unlock-nombre">' + esc(u.nombre) + '</span>' +
      '<span class="unlock-costo">' + (estado === "comprado" ? "✓ tuyo" : u.costo + " KA") + '</span></div>' +
      '<div class="unlock-desc">' + esc(u.desc) + ' ' + reqTxt + '</div>' +
      (estado === "disponible" ? '<button class="comprar" data-comprar="' + esc(u.id) + '">[ comprar ]</button>' : '') +
      '</div>';
  }
  html += '</div>';

  // temas
  var temas = PICHI.temasDisponibles();
  if (temas.length > 1) {
    html += '<div class="bloque"><div class="titulo-min">tema visual</div><div class="acciones-min">';
    for (i = 0; i < temas.length; i++) {
      html += '<button class="' + (PICHI.meta.tema === temas[i].id ? "activa" : "") + '" data-tema="' + esc(temas[i].id) + '">' + esc(temas[i].nombre) + '</button>';
    }
    html += '</div></div>';
  }

  html += '<div class="acciones">' +
    '<button data-act="nueva">[ arrancar el viaje ]</button>' +
    '<button data-act="menu">[ volver al menú ]</button>' +
    '</div>';
  return html;
}

function renderPersonajes() {
  var html = '<h2>ENCARNACIÓN</h2><p class="subtitulo">Con quién arrancás la próxima run.</p><div class="lista-unlocks">';
  var disp = PICHI.personajesDisponibles();
  for (var i = 0; i < PICHI.PERSONAJES_JUGABLES.length; i++) {
    var p = PICHI.PERSONAJES_JUGABLES[i];
    var tiene = PICHI.tieneUnlock(p.unlock);
    var sel = PICHI.meta.personaje === p.id;
    html += '<div class="unlock ' + (tiene ? (sel ? "comprado" : "disponible") : "bloqueado") + '">' +
      '<div class="unlock-head"><span class="unlock-nombre">' + esc(p.nombre) + '</span>' +
      '<span class="unlock-costo">' + (tiene ? (sel ? "✓ elegido" : "") : "requiere " + esc(p.unlock)) + '</span></div>' +
      '<div class="unlock-desc">' + esc(p.desc) + '</div>' +
      '<div class="unlock-desc tenue">' +
        'CON ' + p.stats.conciencia + ' · KAR ' + p.stats.karma + ' · AGU ' + p.stats.aguante +
        ' · $' + p.stats.mangos + ' · EFE ' + p.stats.efecto + ' · PAR ' + p.stats.paranoia +
      '</div>' +
      '<div class="unlock-desc">' + esc(p.pasivaTexto) + '</div>' +
      (tiene && !sel ? '<button class="comprar" data-personaje="' + esc(p.id) + '">[ elegir ]</button>' : '') +
      '</div>';
  }
  html += '</div><div class="acciones">' +
    '<button data-act="nueva">[ arrancar con ' + esc(PICHI.personajeJugable(PICHI.meta.personaje).nombre) + ' ]</button>' +
    '<button data-act="menu">[ volver al menú ]</button></div>';
  return html;
}

function renderColeccion() {
  var m = PICHI.meta, i, html = '';

  html += '<h2>COLECCIÓN</h2><p class="subtitulo">Lo que juntaste en ' + m.runs +
    ' run' + (m.runs === 1 ? '' : 's') + '. Lo que falta no dice qué es.</p>';

  /* --- finales --- */
  html += '<div class="bloque"><div class="titulo-min">finales · ' +
    m.endings.length + '/' + PICHI.FINALES.length + '</div>';
  for (i = 0; i < PICHI.FINALES.length; i++) {
    var f = PICHI.FINALES[i];
    var visto = m.endings.indexOf(f.id) !== -1;
    var accesible = PICHI.tieneUnlock(f.unlock);
    var nota;
    if (visto) nota = f.tipo === "victoria" ? "iluminación" : (f.tipo === "neutro" ? "reencarnaste" : "");
    else if (!accesible) nota = "requiere " + f.unlock;
    else nota = "sin descubrir";
    html += '<div class="fila-kv' + (visto ? ' logrado' : ' pendiente') + '">' +
      '<span>' + (visto ? esc(f.nombre) : '???') + '</span>' +
      '<span class="tenue">' + esc(nota) + '</span></div>';
  }
  html += '</div>';

  /* --- muertes --- */
  var totalMuertes = 0;
  for (var k in m.muertes) totalMuertes += m.muertes[k];
  html += '<div class="bloque"><div class="titulo-min">maneras de terminar mal · ' +
    Object.keys(m.muertes).length + '/' + Object.keys(PICHI.MUERTES).length + '</div>';
  for (var causa in PICHI.MUERTES) {
    var veces = m.muertes[causa] || 0;
    html += '<div class="fila-kv' + (veces ? ' logrado' : ' pendiente') + '">' +
      '<span>' + (veces ? esc(PICHI.MUERTES[causa].nombre) : '???') + '</span>' +
      '<span class="tenue">' + (veces ? veces + (veces === 1 ? ' vez' : ' veces') : 'todavía no') + '</span></div>';
  }
  if (totalMuertes) html += '<div class="fila-kv total"><span>total</span><span>' + totalMuertes + '</span></div>';
  html += '</div>';

  /* --- logros --- */
  html += '<div class="bloque"><div class="titulo-min">logros · ' +
    m.achievements.length + '/' + PICHI.LOGROS.length + '</div>';
  for (i = 0; i < PICHI.LOGROS.length; i++) {
    var l = PICHI.LOGROS[i];
    var tiene = m.achievements.indexOf(l.id) !== -1;
    html += '<div class="fila-kv' + (tiene ? ' logrado' : ' pendiente') + '">' +
      '<span>' + esc(l.nombre) + '</span>' +
      '<span class="tenue">' + esc(l.desc) + (tiene ? '' : ' · +' + l.ka + ' KA') + '</span></div>';
  }
  html += '</div>';

  /* --- reliquias --- */
  html += '<div class="bloque"><div class="titulo-min">reliquias desbloqueadas</div>';
  for (i = 0; i < PICHI.RELIQUIAS.length; i++) {
    var r = PICHI.RELIQUIAS[i];
    var abierta = PICHI.tieneUnlock(r.id);
    html += '<div class="fila-kv' + (abierta ? ' logrado' : ' pendiente') + '">' +
      '<span>' + (abierta ? esc(r.nombre) : '???') + '</span>' +
      '<span class="tenue">' + esc(abierta ? r.desc : 'en la rama C, ' + PICHI.UNLOCK_BY_ID[r.id].costo + ' KA') + '</span></div>';
  }
  html += '</div>';

  /* --- records --- */
  var d = PICHI.diagnostico();
  html += '<div class="bloque"><div class="titulo-min">récords</div>' +
    '<div class="fila-kv"><span>máxima Conciencia</span><span>' + m.record.conciencia + '/' + PICHI.META_CONCIENCIA + '</span></div>' +
    '<div class="fila-kv"><span>tramo más lejano</span><span>' + (m.record.tramo || '—') + '</span></div>' +
    '<div class="fila-kv"><span>run más larga</span><span>' + m.record.turnos + ' turnos</span></div>' +
    '<div class="fila-kv"><span>mejor cosecha de KA</span><span>' + m.record.ka + '</span></div>' +
    '<div class="fila-kv"><span>victorias</span><span>' + m.victorias + ' de ' + m.runs + '</span></div>' +
    '<div class="fila-kv"><span>KA ganado en total</span><span>' + m.kaTotalHistorico + '</span></div>' +
    '<div class="fila-kv"><span>textos distintos leídos</span><span>' + d.leidas + '</span></div>' +
    '</div>';

  html += '<div class="acciones">' +
    '<button data-act="tienda">[ gastar ' + m.ka + ' KA ]</button>' +
    '<button data-act="menu">[ volver al menú ]</button></div>';
  return html;
}

function renderAyuda() {
  var d = PICHI.diagnostico();
  return '<h2>CÓMO FUNCIONA</h2>' +
  '<div class="bloque"><div class="titulo-min">la run</div><p>' +
  'Cuatro tramos (cinco con El Vacío desbloqueado), 22 turnos aproximadamente, 12 a 18 minutos. ' +
  'Cada turno es un evento con 2 a 5 opciones. Las opciones mueven stats, prenden flags y abren o cierran ramas.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">morís si</div>' +
  '<div class="fila-kv"><span>Aguante llega a 0</span><span>el cuerpo dijo basta</span></div>' +
  '<div class="fila-kv"><span>Efecto llega a 100</span><span>sobredosis de sabiduría</span></div>' +
  '<div class="fila-kv"><span>Paranoia llega a 100</span><span>brote</span></div>' +
  '<div class="fila-kv"><span>Conciencia llega a 0</span><span>vegetal astral</span></div>' +
  '<div class="fila-kv"><span>Mangos bajan de -300</span><span>te vinieron a cobrar</span></div>' +
  '</div>' +

  '<div class="bloque"><div class="titulo-min">ganás si</div><p>' +
  'Necesitás Conciencia ' + PICHI.GATE_TRAMO_4 + ' al terminar el Tramo III para acceder al Ascenso, y llegar a ' +
  PICHI.META_CONCIENCIA + ' para iluminarte. Qué final te toca lo define el cruce de Karma, Efecto y Mangos. ' +
  'Si sobrevivís sin iluminarte, reencarnás: igual te llevás el KA.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">el dado</div><p>' +
  'Algunas acciones se pueden ejecutar bien o mal. Esas muestran su tirada <strong>antes</strong> de que ' +
  'elijas —<span class="dado-previo">⚄ d20 +2 AGU · 65%</span>— porque el riesgo tiene que ser información con la ' +
  'que decidís, no una sorpresa. Se tira un d20 y se le suma un modificador que sale de cuánto te sobra ' +
  'del stat que la acción pide; hay que llegar a 11.' +
  '</p><p>' +
  'El <strong>20 es crítico</strong> y el <strong>1 es pifia</strong>, siempre: el mejor preparado se puede comer un papelón y el ' +
  'más roto puede tener un momento. En un crítico lo bueno rinde más y lo malo pega menos; en una pifia, al revés. ' +
  'Las opciones sin dado son seguras, y ese contraste es el que hace que el dado importe.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">el viaje tiene un mapa y un reloj</div><p>' +
  'Arriba de las stats dice <strong>qué hora es y dónde estás</strong>. El lugar no cambia cada turno: ' +
  'te quedás donde estás mientras sirva, y cuando te movés el traslado se cuenta. La hora solo avanza, ' +
  'y dormir la adelanta más que meditar: un after no pasa al mediodía.' +
  '</p><p>' +
  'También hay distancias. Desde la capital se llega al conurbano; al monte no se va entre dos escenas.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">lo que elegís decide lo que sigue</div><p>' +
  'Cada decisión deja un sesgo y el turno siguiente lo respeta. Si pifiaste, viene el lío. Si te quedaste ' +
  'sin plata, el día se ordena alrededor de conseguirla. Si te metiste algo grande, lo que sigue pasa arriba. ' +
  'Cuando eso ocurre, arriba del evento hay <strong>media línea que dice por qué</strong>.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">lo que hiciste vuelve</div><p>' +
  'Las decisiones quedan anotadas. Más adelante en la misma run aparece un <strong>eco</strong> —una línea sola, ' +
  'arriba del evento— que te recuerda algo que hiciste: una promesa, una garcada, una deuda. ' +
  'También hay ecos de cómo viene el viaje: el cuerpo, la plata, la gente que se repite.' +
  '</p><p>' +
  'Al terminar, el resumen incluye <strong>lo que dejaste atrás</strong>: todo lo que quedó marcado, y cuánto ' +
  'pesó en el Karma final. No alcanza con cómo elegís el último turno.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">el elenco</div><p>' +
  'Cada run sortea tres personas que van a volver a aparecer: un chanta, alguien de la calle y alguien que te ' +
  'cuida. Están en la barra de arriba, y las que ya cruzaste se marcan con las veces que las viste. ' +
  'También aparece gente nueva, pero el viaje tiene un elenco en vez de ser una sucesión de desconocidos. ' +
  'En la próxima run el elenco es otro.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">no repetición</div><p>' +
  'Cada evento se arma con piezas sorteadas (escenario + personaje + complicación + variante de redacción). ' +
  'El juego registra cada combinación leída y siempre elige el evento base menos visto, así agota el pool antes de repetir nada. ' +
  'Ahora mismo tenés ' + d.eventos + ' eventos base y ≈' + d.combinaciones.toLocaleString("es-AR") + ' combinaciones; leíste ' + d.leidas + '.' +
  '</p></div>' +

  '<div class="bloque"><div class="titulo-min">atajos</div><p>' +
  'Teclas <strong>1</strong> a <strong>5</strong> para elegir opción. <strong>Espacio</strong> o <strong>Enter</strong> para seguir.' +
  '</p></div>' +

  '<div class="bloque peligro"><div class="titulo-min">memoria</div>' +
  '<p class="tenue">Purgar la memoria de eventos borra qué combinaciones leíste (para volver a ver textos viejos) y NO toca el KA ni los desbloqueos.</p>' +
  '<div class="acciones-min">' +
    '<button data-act="purgar">[ purgar memoria de eventos ]</button>' +
    '<button data-act="borrar-todo">[ borrar todo el progreso ]</button>' +
  '</div></div>' +

  '<div class="acciones"><button data-act="menu">[ volver al menú ]</button></div>';
}

/* ---------- render principal ---------- */

PICHI.UI.render = function () {
  document.documentElement.setAttribute("data-tema", PICHI.meta.tema || "base");
  document.documentElement.setAttribute("data-marco", PICHI.tieneUnlock("E6") ? "si" : "no");

  var html;
  if (PICHI.UI.pantalla === "juego" && PICHI.run) html = renderJuego();
  else if (PICHI.UI.pantalla === "tienda") html = renderTienda();
  else if (PICHI.UI.pantalla === "personajes") html = renderPersonajes();
  else if (PICHI.UI.pantalla === "coleccion") html = renderColeccion();
  else if (PICHI.UI.pantalla === "ayuda") html = renderAyuda();
  else html = renderMenu();

  el("app").innerHTML = html;
  if (PICHI.UI.pantalla !== "juego") window.scrollTo(0, 0);
  else {
    var ev = document.querySelector(".evento, .fin");
    if (ev) window.scrollTo(0, Math.max(0, ev.offsetTop - 20));
  }
};

/* ---------- eventos de la interfaz ---------- */

function accion(act) {
  switch (act) {
    case "nueva":
      PICHI.UI.pantalla = "juego";
      PICHI.nuevaRun();
      break;
    case "reanudar":
      PICHI.UI.pantalla = "juego";
      if (!PICHI.reanudar()) { PICHI.UI.pantalla = "menu"; PICHI.UI.render(); }
      break;
    case "continuar": PICHI.continuar(); break;
    case "rechazar": PICHI.rechazarEvento(); break;
    case "tienda": PICHI.UI.pantalla = "tienda"; PICHI.UI.render(); break;
    case "personajes": PICHI.UI.pantalla = "personajes"; PICHI.UI.render(); break;
    case "coleccion": PICHI.UI.pantalla = "coleccion"; PICHI.UI.render(); break;
    case "ayuda": PICHI.UI.pantalla = "ayuda"; PICHI.UI.render(); break;
    case "menu": PICHI.UI.pantalla = "menu"; PICHI.UI.render(); break;
    case "purgar":
      if (confirm("¿Purgar la memoria de combinaciones leídas? El KA y los desbloqueos no se tocan.")) {
        PICHI.purgarMemoriaEventos();
        PICHI.UI.render();
      }
      break;
    case "borrar-todo":
      if (confirm("¿Borrar TODO el progreso, incluido el KA y los desbloqueos? No hay vuelta atrás.")) {
        PICHI.borrarTodo();
        PICHI.UI.pantalla = "menu";
        PICHI.UI.render();
      }
      break;
  }
}

document.addEventListener("click", function (e) {
  var t = e.target;
  while (t && t !== document.body && !t.getAttribute) t = t.parentNode;
  for (var n = t; n && n !== document.body; n = n.parentNode) {
    if (!n.getAttribute) continue;
    if (n.getAttribute("data-op") != null) { PICHI.elegirOpcion(parseInt(n.getAttribute("data-op"), 10)); return; }
    if (n.getAttribute("data-act")) { accion(n.getAttribute("data-act")); return; }
    if (n.getAttribute("data-rama")) { PICHI.UI.ramaAbierta = n.getAttribute("data-rama"); PICHI.UI.render(); return; }
    if (n.getAttribute("data-comprar")) {
      if (PICHI.comprar(n.getAttribute("data-comprar"))) PICHI.UI.render();
      return;
    }
    if (n.getAttribute("data-personaje")) {
      PICHI.meta.personaje = n.getAttribute("data-personaje");
      PICHI.saveMeta();
      PICHI.UI.render();
      return;
    }
    if (n.getAttribute("data-tema")) {
      PICHI.meta.tema = n.getAttribute("data-tema");
      PICHI.saveMeta();
      PICHI.UI.render();
      return;
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (PICHI.UI.pantalla !== "juego" || !PICHI.run) return;
  if (PICHI.run.fase === "evento") {
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      var op = PICHI.run.evento.opciones[n - 1];
      if (op && op.disponible) { e.preventDefault(); PICHI.elegirOpcion(n - 1); }
    }
  } else if (PICHI.run.fase === "resolucion") {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); PICHI.continuar(); }
  }
});

/* ---------- arranque ---------- */

window.addEventListener("DOMContentLoaded", function () {
  PICHI.UI.render();
});
