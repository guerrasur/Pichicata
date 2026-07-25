/* PICHICATA — el dado.
   Un d20 más un modificador que sale de tu stat, contra una dificultad fija.
   Diseño:
     - La tirada se muestra ANTES de elegir. El riesgo tiene que ser información
       con la que decidís, no una sorpresa que te enteras después.
     - 20 es crítico y 1 es pifia, siempre, sin importar el modificador: el mejor
       preparado se puede comer un papelón y el más roto puede tener un momento.
     - Tres formas de incertidumbre, de más liviana a más pesada:
         pericia  -> la acción se ejecuta bien o mal; escala sus propios efectos
         riesgo   -> hay una complicación que puede aparecer o no
         tirada   -> éxito y fallo son dos ramas narrativas distintas
   El 87% de las opciones no tenía ninguna incertidumbre; `pericia` existe para
   arreglar eso con un campo de una palabra y sin reescribir prosa. */

window.PICHI = window.PICHI || {};

PICHI.Dados = {
  CD: 11,          // hay que igualar o pasar 11 en d20+mod
  CARA_MAX: 20,

  /* El modificador sale de cuánto te sobra (o te falta) del stat pedido.
     stat == dificultad -> +0 -> 50%. Cada 8 puntos de diferencia vale 1. */
  modificador: function (stat, valor, dificultad) {
    var d = (typeof dificultad === "number") ? dificultad : 50;
    var bruto;
    if (stat === "karma") bruto = (valor - d) / 16;      // karma va de -100 a 100
    else if (stat === "mangos") bruto = (valor - d) / 400;
    else bruto = (valor - d) / 8;
    return Math.max(-6, Math.min(6, Math.round(bruto)));
  },

  /* Probabilidad de éxito, para mostrarla antes de tirar. */
  probabilidad: function (mod) {
    var buenas = 0;
    for (var cara = 1; cara <= 20; cara++) {
      if (cara === 20) { buenas++; continue; }    // el crítico siempre entra
      if (cara === 1) continue;                   // la pifia siempre falla
      if (cara + mod >= PICHI.Dados.CD) buenas++;
    }
    return buenas / 20;
  },

  /* Tira. Devuelve todo lo necesario para narrar y para aplicar efectos. */
  tirar: function (stat, valor, dificultad, ventaja) {
    var mod = PICHI.Dados.modificador(stat, valor, dificultad);
    var cara = 1 + PICHI.rndInt(20);
    if (ventaja) {
      var otra = 1 + PICHI.rndInt(20);
      cara = ventaja > 0 ? Math.max(cara, otra) : Math.min(cara, otra);
    }
    var total = cara + mod;
    var grado;
    if (cara === 20) grado = "critico";
    else if (cara === 1) grado = "pifia";
    else if (total >= PICHI.Dados.CD) grado = "exito";
    else grado = "fallo";
    return {
      stat: stat, cara: cara, mod: mod, total: total, cd: PICHI.Dados.CD,
      grado: grado,
      exito: grado === "critico" || grado === "exito",
      margen: total - PICHI.Dados.CD
    };
  },

  /* Cómo se escalan los efectos de una acción según cómo salió.
     Lo bueno se multiplica por bien, lo malo por mal. */
  escala: function (grado) {
    switch (grado) {
      case "critico": return { bien: 1.5, mal: 0.5 };
      case "exito": return { bien: 1, mal: 1 };
      case "fallo": return { bien: 0.4, mal: 1.4 };
      case "pifia": return { bien: 0, mal: 1.8 };
    }
    return { bien: 1, mal: 1 };
  },

  /* Un stat sube o baja según lo que le convenga al jugador. */
  esBueno: function (statId, delta) {
    if (statId === "paranoia" || statId === "efecto") return delta < 0;
    return delta > 0;
  },

  aplicarEscala: function (efectos, grado) {
    var e = PICHI.Dados.escala(grado), out = {};
    for (var k in efectos) {
      var v = efectos[k];
      var factor = PICHI.Dados.esBueno(k, v) ? e.bien : e.mal;
      out[k] = Math.round(v * factor);
    }
    return out;
  },

  /* Texto corto para la línea del dado. */
  etiqueta: function (t) {
    var signo = t.mod >= 0 ? "+" : "";
    return "d20 " + t.cara + " " + signo + t.mod + " = " + t.total + " vs " + t.cd;
  },

  nombreGrado: function (grado) {
    return { critico: "CRÍTICO", exito: "sale bien", fallo: "sale mal", pifia: "PIFIA" }[grado] || grado;
  },

  /* Etiqueta previa, para que el jugador decida sabiendo a qué se expone. */
  pronostico: function (stat, valor, dificultad) {
    var mod = PICHI.Dados.modificador(stat, valor, dificultad);
    var p = Math.round(PICHI.Dados.probabilidad(mod) * 100);
    var signo = mod >= 0 ? "+" : "";
    var abrev = { conciencia: "CON", karma: "KAR", aguante: "AGU", mangos: "$", efecto: "EFE", paranoia: "PAR" };
    return "d20 " + signo + mod + " " + (abrev[stat] || stat) + " · " + p + "%";
  }
};
