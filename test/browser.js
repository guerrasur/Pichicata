#!/usr/bin/env node
/* PICHICATA — smoke test de navegador. Cubre lo que el arnés de Node no puede:
   que index.html cargue con file://, que los clicks y el teclado funcionen y que
   la UI no explote.

   Es OPCIONAL y necesita Playwright:
     npm i --no-save playwright
     node test/browser.js
     node test/browser.js --fotos   guarda capturas en /tmp

   Si Playwright no está instalado, sale con código 0 y avisa: la suite
   principal (test/run.js) no depende de esto. */

const path = require("path");
const fs = require("fs");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch (e) {
  console.log("\n\x1b[2mPlaywright no está instalado — se saltea el smoke test de navegador.");
  console.log("   npm i --no-save playwright && node test/browser.js\x1b[0m\n");
  process.exit(0);
}

const FOTOS = process.argv.includes("--fotos");
const INDEX = "file://" + path.join(__dirname, "..", "index.html");
const DIR_FOTOS = "/tmp/pichicata-fotos";

let fallos = 0;
const ok = m => console.log("   \x1b[32m✓\x1b[0m " + m);
const mal = m => { console.log("   \x1b[31m✗ " + m + "\x1b[0m"); fallos++; };
const info = m => console.log("     \x1b[2m" + m + "\x1b[0m");
const afirmar = (c, bien, malo) => { c ? ok(bien) : mal(malo || bien); return c; };

/* Chromium puede venir preinstalado en otra ruta que la que espera Playwright. */
function opcionesDeLanzamiento() {
  for (const p of ["/opt/pw-browsers/chromium", process.env.CHROMIUM_PATH]) {
    if (p && fs.existsSync(p)) return { executablePath: p };
  }
  return {};
}

async function foto(page, nombre) {
  if (!FOTOS) return;
  fs.mkdirSync(DIR_FOTOS, { recursive: true });
  await page.screenshot({ path: path.join(DIR_FOTOS, nombre + ".png") });
}

(async () => {
  console.log("\n\x1b[1mPICHICATA — smoke test de navegador\x1b[0m");

  const browser = await chromium.launch(opcionesDeLanzamiento());
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });

  const errores = [];
  page.on("pageerror", e => errores.push("pageerror: " + e.message));
  page.on("console", m => { if (m.type() === "error") errores.push("console: " + m.text()); });

  /* ---------- carga ---------- */
  console.log("\n\x1b[1mcarga con file://\x1b[0m");
  await page.goto(INDEX);
  await page.waitForSelector(".logo", { timeout: 5000 });
  ok("index.html carga sin servidor y renderiza el menú");
  info((await page.textContent(".bloque .tenue")).replace(/\s+/g, " ").trim().slice(0, 110));
  await foto(page, "1-menu");

  /* ---------- una run completa ---------- */
  console.log("\n\x1b[1muna run completa\x1b[0m");
  await page.click('[data-act="nueva"]');
  await page.waitForSelector(".hud");

  const stats = await page.$$eval(".stat", els => els.length);
  afirmar(stats === 6, "la barra muestra las 6 stats", `muestra ${stats} stats`);

  const parrafos = await page.$$eval(".evento p", els => els.map(e => e.textContent));
  afirmar(parrafos.length >= 2 && parrafos.length <= 4,
    `el evento tiene ${parrafos.length} párrafos cortos`, `párrafos fuera de rango: ${parrafos.length}`);
  const opciones = await page.$$eval(".opcion", els => els.length);
  afirmar(opciones >= 2 && opciones <= 6, `${opciones} opciones de decisión`, `opciones fuera de rango: ${opciones}`);

  const elenco = await page.$$eval(".elenco span", els => els.map(e => e.textContent));
  afirmar(elenco.length === 3, `el HUD muestra el elenco de la run (${elenco.join(" · ")})`,
    `el HUD muestra ${elenco.length} personas del elenco`);
  await foto(page, "2-evento");

  // el dado tiene que verse ANTES de elegir, no después
  let previos = 0, vistos = 0;
  for (let t = 0; t < 12; t++) {
    if (!(await page.$(".opcion[data-op]"))) break;
    previos += await page.$$eval(".dado-previo", els => els.length);
    await page.keyboard.press("1");
    await page.waitForTimeout(25);
    if (await page.$(".tirada")) {
      vistos++;
      const txt = (await page.textContent(".tirada")).replace(/\s+/g, " ").trim();
      if (t === 0 || vistos === 1) info("resultado del dado: " + txt);
      const clase = await page.$eval(".tirada", e => e.className);
      if (!/critico|pifia|exito|fallo/.test(clase)) mal("la tirada no informa el grado: " + clase);
    }
    if (await page.$('[data-act="continuar"]')) {
      await page.click('[data-act="continuar"]');
      await page.waitForTimeout(25);
    }
  }
  afirmar(previos > 0, `el pronóstico del dado se muestra antes de elegir (${previos} veces en 12 turnos)`,
    "el dado no se anuncia antes de elegir: el riesgo es sorpresa y no decisión");
  afirmar(vistos > 0, `el resultado del dado se muestra al resolver (${vistos} veces)`,
    "el resultado del dado no se muestra");
  await foto(page, "3-dado");

  // los ecos: lo que hiciste antes tiene que volver
  let ecos = 0;
  const textosEco = [];
  for (let t = 0; t < 14; t++) {
    if (await page.$(".eco")) {
      ecos++;
      if (textosEco.length < 2) textosEco.push((await page.textContent(".eco")).trim());
    }
    if (await page.$(".opcion[data-op]")) await page.keyboard.press("2");
    else if (await page.$('[data-act="continuar"]')) await page.click('[data-act="continuar"]');
    else break;
    await page.waitForTimeout(20);
  }
  afirmar(ecos > 0, `los ecos aparecen durante la run (${ecos} en 14 turnos)`,
    "no apareció ningún eco: los turnos siguen sueltos");
  textosEco.forEach(t => info("eco: «" + t + "»"));

  // alternamos teclado y mouse hasta llegar a un final
  let turnos = 0, i = 0;
  while (i++ < 300 && !(await page.$(".fin"))) {
    if (await page.$(".opcion[data-op]")) {
      if (i % 2 === 0) await page.keyboard.press("1");
      else await page.click(".opcion[data-op]");
      turnos++;
    } else if (await page.$('[data-act="continuar"]')) {
      if (i % 3 === 0) await page.keyboard.press(" ");
      else await page.click('[data-act="continuar"]');
    } else break;
    await page.waitForTimeout(8);
  }
  afirmar(await page.$(".fin"), `la run llega a un final en ${turnos} turnos (mouse y teclado)`,
    "la run no llegó a ningún final");
  if (await page.$(".fin")) {
    info("final: " + (await page.textContent(".fin h2")).trim() +
      " · " + (await page.textContent(".fila-kv.total")).replace(/\s+/g, " ").trim());
    const rastro = await page.evaluate(() => {
      const bloques = [...document.querySelectorAll(".bloque")];
      const b = bloques.find(x => /dejaste atrás/i.test(x.textContent));
      return b ? [...b.querySelectorAll(".fila-kv")].map(f => f.textContent.trim()) : null;
    });
    afirmar(rastro && rastro.length > 0,
      `el resumen final lista lo que dejaste atrás (${rastro ? rastro.length : 0} entradas)`,
      "el resumen final no muestra el rastro de la run");
    if (rastro && rastro.length) info("rastro: " + rastro.slice(0, 3).join(" | "));
    await foto(page, "4-final");
  }

  /* ---------- tienda ---------- */
  console.log("\n\x1b[1mtienda de desbloqueos\x1b[0m");
  await page.click('[data-act="tienda"]');
  await page.waitForSelector(".lista-unlocks");
  const enRamaA = await page.$$eval(".unlock", els => els.length);
  afirmar(enRamaA > 0, `la rama A lista ${enRamaA} desbloqueos`, "la tienda está vacía");

  const comprables = await page.$$(".comprar");
  if (comprables.length) {
    const antes = parseInt((await page.textContent(".destacado")).replace(/\D/g, ""), 10);
    await comprables[0].click();
    await page.waitForTimeout(80);
    const despues = parseInt((await page.textContent(".destacado")).replace(/\D/g, ""), 10);
    afirmar(despues < antes, `comprar descuenta KA (${antes} → ${despues})`,
      "comprar no descontó KA");
  } else {
    info("sin KA suficiente para comprar en esta run: se saltea la compra");
  }

  for (const rama of ["B", "C", "D", "E"]) {
    await page.click(`[data-rama="${rama}"]`);
    await page.waitForTimeout(30);
    const n = await page.$$eval(".unlock", els => els.length);
    if (!n) mal(`la rama ${rama} quedó vacía`);
  }
  ok("las 5 ramas del árbol renderizan");
  await foto(page, "5-tienda");

  /* ---------- otras pantallas ---------- */
  console.log("\n\x1b[1mpantallas\x1b[0m");
  await page.click('[data-act="menu"]');
  await page.click('[data-act="personajes"]');
  await page.waitForSelector(".lista-unlocks");
  const pjs = await page.$$eval(".unlock", els => els.length);
  afirmar(pjs === 7, "las 7 encarnaciones se listan", `se listan ${pjs} encarnaciones`);

  await page.click('[data-act="menu"]');
  await page.click('[data-act="ayuda"]');
  await page.waitForSelector(".bloque.peligro");
  ok("la pantalla de ayuda renderiza");

  await page.click('[data-act="menu"]');
  await page.click('[data-act="coleccion"]');
  await page.waitForSelector(".fila-kv.pendiente");
  const coleccion = await page.evaluate(() => ({
    bloques: document.querySelectorAll(".bloque").length,
    logrados: document.querySelectorAll(".fila-kv.logrado").length,
    pendientes: document.querySelectorAll(".fila-kv.pendiente").length,
    ocultos: [...document.querySelectorAll(".fila-kv.pendiente")].filter(e => e.textContent.includes("???")).length
  }));
  afirmar(coleccion.bloques >= 5, `la colección muestra ${coleccion.bloques} secciones`,
    `la colección solo muestra ${coleccion.bloques} secciones`);
  afirmar(coleccion.ocultos > 0, `lo no descubierto se oculta con ??? (${coleccion.ocultos} filas)`,
    "la colección espoilea contenido no descubierto");
  info(`${coleccion.logrados} conseguidos · ${coleccion.pendientes} pendientes`);
  await foto(page, "7-coleccion");

  /* ---------- persistencia entre recargas ---------- */
  console.log("\n\x1b[1mpersistencia\x1b[0m");
  await page.click('[data-act="menu"]');
  await page.click('[data-act="nueva"]');
  await page.waitForSelector(".hud");
  await page.click(".opcion[data-op]");
  await page.waitForTimeout(40);
  await page.click('[data-act="continuar"]');
  await page.waitForSelector(".hud");
  const antesRecarga = (await page.textContent(".hud")).replace(/\s+/g, " ").trim();

  await page.reload();
  await page.waitForSelector('[data-act="reanudar"]');
  await page.click('[data-act="reanudar"]');
  await page.waitForSelector(".hud");
  const despuesRecarga = (await page.textContent(".hud")).replace(/\s+/g, " ").trim();
  afirmar(antesRecarga === despuesRecarga,
    "reanudar tras recargar la pestaña restaura el turno y las stats",
    "reanudar perdió estado:\n       antes:   " + antesRecarga + "\n       después: " + despuesRecarga);

  /* ---------- temas y distorsión ---------- */
  console.log("\n\x1b[1mtemas y distorsión\x1b[0m");
  const temas = await page.evaluate(() => {
    const res = [];
    PICHI.meta.unlocks.push("E2", "E3", "E4", "E6", "E5");
    for (const t of ["base", "fosforo", "ambar", "ceremonial"]) {
      PICHI.meta.tema = t;
      PICHI.UI.render();
      res.push(document.documentElement.getAttribute("data-tema") + ":" +
        getComputedStyle(document.body).backgroundColor);
    }
    return res;
  });
  const fondosDistintos = new Set(temas.map(t => t.split(":")[1])).size;
  afirmar(fondosDistintos === 4, "los 4 temas aplican fondos distintos",
    "algunos temas comparten fondo: " + temas.join(" | "));

  const marco = await page.evaluate(() => {
    PICHI.UI.render();
    return document.documentElement.getAttribute("data-marco");
  });
  afirmar(marco === "si", "el marco ASCII se activa al desbloquearlo", "el marco no se aplicó");

  /* La deformación es probabilística por carácter, así que se mide sobre varias
     muestras: con una sola había ~4% de chance de que no tocara ninguna letra y
     la prueba salía flaky. */
  const distorsion = await page.evaluate(() => {
    const frase = "casa serena con muchas letras repetidas y sonoras";
    const limpias = [], dadas = [];
    for (let i = 0; i < 10; i++) {
      limpias.push(PICHI.UI.distorsionar(frase, 0));
      dadas.push(PICHI.UI.distorsionar(frase, 95));
    }
    return {
      intactas: limpias.filter(t => t === frase).length,
      deformadas: dadas.filter(t => t !== frase).length,
      muestra: dadas.find(t => t !== frase) || dadas[0]
    };
  });
  afirmar(distorsion.intactas === 10, "con Efecto bajo el texto nunca se toca (10/10 intactas)",
    `el texto se distorsiona sin Efecto (${10 - distorsion.intactas}/10 deformadas)`);
  afirmar(distorsion.deformadas >= 8, `con Efecto alto el texto se deforma (${distorsion.deformadas}/10)`,
    `la distorsión casi no actúa: solo ${distorsion.deformadas}/10 muestras cambiaron`);
  info("Efecto 95 → " + distorsion.muestra.slice(0, 60));
  await foto(page, "6-tema");

  /* ---------- responsive ---------- */
  console.log("\n\x1b[1mresponsive\x1b[0m");
  for (const w of [390, 320]) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.waitForTimeout(50);
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    afirmar(overflow <= 1, `sin scroll horizontal en ${w}px`,
      `en ${w}px la página scrollea ${overflow}px de más`);
  }

  /* ---------- errores de consola ---------- */
  console.log("\n\x1b[1mconsola\x1b[0m");
  afirmar(errores.length === 0, "cero errores de JS en toda la sesión",
    "errores de JS:\n       " + errores.join("\n       "));

  await browser.close();

  if (FOTOS) console.log("\n\x1b[2mcapturas en " + DIR_FOTOS + "\x1b[0m");
  console.log("");
  if (fallos) {
    console.log(`\x1b[31m\x1b[1m${fallos} problema(s).\x1b[0m\n`);
    process.exit(1);
  }
  console.log("\x1b[32m\x1b[1mTodo en orden.\x1b[0m\n");
})().catch(e => {
  console.log("\n\x1b[31m✗ el smoke test explotó: " + e.message + "\x1b[0m\n");
  process.exit(1);
});
