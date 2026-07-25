/* PICHICATA — estado y persistencia.
   Tres almacenes SEPARADOS en localStorage:
     pichicata.meta -> permanente: KA, desbloqueos, logros, finales vistos
     pichicata.seen -> permanente: qué combinaciones/variantes ya se leyeron
     pichicata.run  -> volátil: la run actual (se borra al morir/ganar)
   Morir borra 'run'. Nunca 'meta' ni 'seen'. */

window.PICHI = window.PICHI || {};

PICHI.KEYS = {
  meta: "pichicata.meta.v1",
  seen: "pichicata.seen.v1",
  run: "pichicata.run.v1"
};

PICHI.Save = {
  read: function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return JSON.parse(JSON.stringify(fallback));
      var obj = JSON.parse(raw);
      return obj && typeof obj === "object" ? obj : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  },
  write: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  drop: function (key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};

PICHI.DEFAULT_META = {
  ka: 0,
  kaTotalHistorico: 0,
  unlocks: [],          // ids del árbol: "A1", "B2", "C5", ...
  personaje: "base",    // personaje jugable elegido
  tema: "base",         // tema visual
  endings: [],          // ids de finales vistos
  achievements: [],     // ids de logros
  runs: 0,
  victorias: 0,
  muertes: {},          // causa -> veces, para la pantalla de colección
  record: { conciencia: 0, tramo: 0, turnos: 0, ka: 0 },
  ultimaRun: null       // resumen de la run anterior, para la pantalla de meta
};

PICHI.DEFAULT_SEEN = {
  combos: {},        // "evId|var|esc|per|cmp" -> 1
  eventCount: {},    // evId -> veces que salió
  variantsUsed: {},  // evId -> [idx, ...]
  comboCount: 0
};

PICHI.meta = PICHI.Save.read(PICHI.KEYS.meta, PICHI.DEFAULT_META);
PICHI.seen = PICHI.Save.read(PICHI.KEYS.seen, PICHI.DEFAULT_SEEN);
PICHI.run = null;

// --- normalización defensiva (saves viejos o corruptos) ---
(function normalize() {
  var d = PICHI.DEFAULT_META, m = PICHI.meta;
  for (var k in d) if (!(k in m)) m[k] = JSON.parse(JSON.stringify(d[k]));
  if (!Array.isArray(m.unlocks)) m.unlocks = [];
  if (!Array.isArray(m.endings)) m.endings = [];
  if (!Array.isArray(m.achievements)) m.achievements = [];
  if (!m.record) m.record = { conciencia: 0, tramo: 0, turnos: 0, ka: 0 };
  if (!m.muertes || typeof m.muertes !== "object") m.muertes = {};

  var s = PICHI.seen;
  if (!s.combos || typeof s.combos !== "object") s.combos = {};
  if (!s.eventCount || typeof s.eventCount !== "object") s.eventCount = {};
  if (!s.variantsUsed || typeof s.variantsUsed !== "object") s.variantsUsed = {};
  if (typeof s.comboCount !== "number") s.comboCount = Object.keys(s.combos).length;
})();

PICHI.saveMeta = function () { PICHI.Save.write(PICHI.KEYS.meta, PICHI.meta); };
PICHI.saveSeen = function () { PICHI.Save.write(PICHI.KEYS.seen, PICHI.seen); };
PICHI.saveRun = function () {
  if (PICHI.run) PICHI.Save.write(PICHI.KEYS.run, PICHI.run);
  else PICHI.Save.drop(PICHI.KEYS.run);
};

PICHI.tieneUnlock = function (id) {
  if (!id) return true;
  return PICHI.meta.unlocks.indexOf(id) !== -1;
};

/* ---------- stats ---------- */

PICHI.STATS = [
  { id: "conciencia", label: "Conciencia", min: 0, max: 108, barra: true },
  { id: "karma", label: "Karma", min: -100, max: 100, barra: true, firmado: true },
  { id: "aguante", label: "Aguante", min: 0, max: 100, barra: true },
  { id: "mangos", label: "Mangos", min: -9999, max: 999999, barra: false, prefijo: "$" },
  { id: "efecto", label: "Efecto", min: 0, max: 100, barra: true },
  { id: "paranoia", label: "Paranoia", min: 0, max: 100, barra: true }
];

PICHI.clampStat = function (id, valor) {
  var def = null;
  for (var i = 0; i < PICHI.STATS.length; i++) if (PICHI.STATS[i].id === id) def = PICHI.STATS[i];
  if (!def) return valor;
  return Math.max(def.min, Math.min(def.max, Math.round(valor)));
};

/* ---------- utilidades de azar (con semilla opcional por run) ---------- */

PICHI.rng = {
  seed: 0,
  set: function (s) { this.seed = s >>> 0; },
  next: function () {
    // xorshift32: reproducible y suficiente
    var x = this.seed || (this.seed = (Date.now() & 0x7fffffff) || 1);
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5; x >>>= 0;
    this.seed = x;
    return (x >>> 0) / 4294967296;
  }
};

PICHI.rnd = function () { return PICHI.rng.next(); };
PICHI.rndInt = function (n) { return Math.floor(PICHI.rnd() * n); };
PICHI.pick = function (arr) { return arr[PICHI.rndInt(arr.length)]; };
PICHI.chance = function (p) { return PICHI.rnd() < p; };
PICHI.shuffle = function (arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = PICHI.rndInt(i + 1);
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};
