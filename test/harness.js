/* PICHICATA — arnés de pruebas.
   Carga los archivos REALES del juego en un sandbox de Node con localStorage y
   document stubbeados. No hay dependencias: node test/run.js y listo. */

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const RAIZ = path.join(__dirname, "..");

/* El mismo orden que index.html. Si agregás un archivo de contenido,
   agregalo en los dos lados o las pruebas no lo van a ver. */
const ARCHIVOS = [
  "js/state.js",
  "js/dados.js",
  "js/mundo.js",
  "js/content-engine.js",
  "content/pieces.js",
  "content/ascii.js",
  "content/dados-textos.js",
  "content/consecuencias.js",
  "content/unlocks.js",
  "content/characters.js",
  "content/endings.js",
  "content/events-core.js",
  "content/events-core-2.js",
  "content/events-base-extra.js",
  "content/events-conurbano.js",
  "content/events-retiro.js",
  "content/events-after.js",
  "content/events-astral.js",
  "content/events-policia.js",
  "content/events-ego.js",
  "content/events-rutas.js",
  "js/meta.js",
  "js/game.js"
];

/* js/ui.js no se carga acá a propósito: es puro DOM y lo cubre el smoke test de
   navegador (test/browser.js). Todo lo demás tiene que estar en las dos listas. */
const EXCLUIDOS = ["js/ui.js"];

/* Verifica que index.html cargue exactamente los mismos archivos que el arnés,
   para que no se desincronicen en silencio. */
function archivosDeIndex() {
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  const re = /<script src="([^"]+)"><\/script>/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function cargar() {
  const store = {};
  const sandbox = {
    console, Date, Math, JSON, parseInt, parseFloat, isNaN, setTimeout, Error,
    localStorage: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }
    },
    document: {
      documentElement: { setAttribute() {}, getAttribute: () => null },
      getElementById: () => ({ innerHTML: "" }),
      addEventListener() {},
      querySelector: () => null
    },
    confirm: () => true,
    alert: () => {},
    scrollTo() {}
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  for (const f of ARCHIVOS) {
    const src = fs.readFileSync(path.join(RAIZ, f), "utf8");
    vm.runInContext(src, sandbox, { filename: f });
  }

  const P = sandbox.PICHI;
  P.UI = { render() {} };   // el juego llama a UI.render en cada transición
  return P;
}

function desbloquearTodo(P) {
  for (const u of P.UNLOCKS) if (!P.tieneUnlock(u.id)) P.meta.unlocks.push(u.id);
}

/* Juega una run entera y devuelve el estado final.
   Valida el texto en cada turno: lanza si encuentra algo mal formado. */
function jugarRun(P, estrategia, opciones) {
  opciones = opciones || {};
  P.nuevaRun();
  let guard = 0;
  const maxTurnos = 500;

  while (P.run && P.run.fase !== "fin") {
    if (guard++ > maxTurnos) throw new Error("la run no termina nunca (posible loop)");

    if (P.run.fase === "evento") {
      const ev = P.run.evento;
      if (opciones.antesDeElegir) opciones.antesDeElegir(P);

      const disponibles = ev.opciones
        .map((o, i) => ({ op: o, i }))
        .filter(x => x.op.disponible);
      if (!disponibles.length) throw new Error(`evento sin opciones disponibles: ${ev.id}`);

      revisarTexto(ev.parrafos.join(" "), ev.id, "párrafo");
      for (const o of ev.opciones) revisarTexto(o.label, ev.id, "opción");

      P.elegirOpcion(estrategia(disponibles, P).i);
    } else if (P.run.fase === "resolucion") {
      revisarTexto(P.run.resolucion.textos.join(" "), P.run.evento.id, "resolución");
      P.continuar();
    } else {
      throw new Error("fase desconocida: " + P.run.fase);
    }
  }
  return P.run;
}

/* Las tres cosas que se rompen al escribir contenido nuevo. */
function revisarTexto(txt, evId, donde) {
  if (/\{|\}/.test(txt)) {
    throw new Error(`placeholder sin resolver en ${evId} (${donde}): ${recorte(txt, "{")}`);
  }
  if (/\bundefined\b|\bnull\b|\bNaN\b/.test(txt)) {
    throw new Error(`valor vacío en ${evId} (${donde}): ${recorte(txt, "undefined")}`);
  }
  const minus = txt.match(/[.!?]\s+[a-záéíóúüñ]/);
  if (minus) {
    throw new Error(`minúscula tras punto en ${evId} (${donde}) — falta {^…}: ${recorte(txt, minus[0])}`);
  }
}

function recorte(txt, aguja) {
  const i = Math.max(0, txt.indexOf(aguja) - 70);
  return "…" + txt.slice(i, i + 150) + "…";
}

/* Estrategias de juego automático. Cada una estresa el motor distinto. */
const ESTRATEGIAS = {
  azar: ops => ops[Math.floor(Math.random() * ops.length)],
  primera: ops => ops[0],
  ultima: ops => ops[ops.length - 1],
  // busca iluminarse: es la que llega más lejos y ejercita los tramos IV y V
  asceta: ops => {
    let mejor = ops[0], mejorValor = -Infinity;
    for (const x of ops) {
      const e = x.op.ref.efectos || {};
      const v = (e.conciencia || 0) * 3 + (e.aguante || 0) + (e.karma || 0) * 0.5
        - (e.paranoia || 0) - (e.efecto || 0) * 0.5;
      if (v > mejorValor) { mejorValor = v; mejor = x; }
    }
    return mejor;
  },
  /* Persigue el Efecto como lo haría un jugador real: se cuida cuando el cuerpo
     se le termina y no se funde comprando. Sin esas dos guardas se muere de
     Aguante o de deuda antes de acumular dosis, y la sobredosis nunca se toca:
     el 55% de las runs terminaba en "te vinieron a cobrar". */
  quemado: (ops, P) => {
    const s = P.run.stats;
    if (s.aguante <= 35) {   // primero el cuerpo
      let mejor = ops[0], v0 = -Infinity;
      for (const x of ops) {
        const e = x.op.ref.efectos || {};
        const v = (e.aguante || 0) * 3 - (e.efecto || 0) * 0.2;
        if (v > v0) { v0 = v; mejor = x; }
      }
      return mejor;
    }
    const pobre = s.mangos < 400;
    let mejor = ops[0], mejorValor = -Infinity;
    for (const x of ops) {
      const e = x.op.ref.efectos || {};
      const gasto = Math.min(0, e.mangos || 0);
      const v = (e.efecto || 0) * 3 + (e.aguante || 0)
        + (pobre ? gasto * 0.05 : gasto * 0.005);   // sin plata, no gasta
      if (v > mejorValor) { mejorValor = v; mejor = x; }
    }
    return mejor;
  },
  // se destruye a propósito: ejercita las muertes por cuerpo y por plata
  kamikaze: ops => {
    let peor = ops[0], peorValor = Infinity;
    for (const x of ops) {
      const e = x.op.ref.efectos || {};
      const v = (e.aguante || 0) + (e.conciencia || 0) - (e.efecto || 0) - (e.paranoia || 0);
      if (v < peorValor) { peorValor = v; peor = x; }
    }
    return peor;
  },
  /* Tira la Conciencia al piso cuidando todo lo demás: la única vía al vegetal
     astral. Los signos importan — hay que MINIMIZAR conciencia y a la vez
     maximizar aguante y mangos, o se muere de otra cosa antes. */
  vegetal: ops => {
    let peor = ops[0], peorValor = Infinity;
    for (const x of ops) {
      const e = x.op.ref.efectos || {};
      const v = (e.conciencia || 0) * 3
        - (e.aguante || 0) * 0.5
        - (e.mangos || 0) * 0.02
        + (e.paranoia || 0) * 0.4
        + (e.efecto || 0) * 0.3;
      if (v < peorValor) { peorValor = v; peor = x; }
    }
    return peor;
  }
};

module.exports = { cargar, desbloquearTodo, jugarRun, ESTRATEGIAS, ARCHIVOS, EXCLUIDOS, archivosDeIndex, RAIZ };
