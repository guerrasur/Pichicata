# PICHICATA

Roguelite narrativo de texto. Un buscador espiritual venido a menos atraviesa un viaje
de 12 a 18 minutos que termina en iluminación, muerte o reencarnación fallida. Al morir
se reinicia todo **menos el progreso meta**: el Karma Acumulado compra contenido nuevo
que se suma para siempre al pool de eventos.

HTML/CSS/JS plano. Sin frameworks, sin build, sin backend. Abrí `index.html` y listo.

```
git clone <repo> && cd Pichicata && xdg-open index.html
# o, si preferís servirlo:
python3 -m http.server 8000
```

Todo el progreso vive en `localStorage` de tu navegador.

---

## Stats

| Stat | Rango | Qué hace |
|---|---|---|
| **Conciencia** | 0 → 108 | El progreso real. Necesitás 85 para acceder al Ascenso y 108 para iluminarte. |
| **Karma** | −100 → +100 | No mata: filtra qué eventos aparecen y **qué final te toca**. La tibieza no paga. |
| **Aguante** | 0 → 100 | El cuerpo. Trasnoches, peleas, hambre y sustancias lo bajan. |
| **Mangos** | libre | Plata. Podés estar en rojo, pero hay un piso. |
| **Efecto** | 0 → 100 | Cuánta sustancia tenés **activa ahora**. Distorsiona la UI y el texto. Baja 10-15 por turno. |
| **Paranoia** | 0 → 100 | Independiente del Efecto. Cierra opciones sociales y abre opciones erráticas. |

### Derrotas

| Trigger | Final |
|---|---|
| Aguante ≤ 0 | **El cuerpo dijo basta** |
| Efecto ≥ 100 | **Sobredosis de sabiduría** (la Ampolla de Naloxona lo cancela una vez por run) |
| Paranoia ≥ 100 | **Brote** |
| Conciencia ≤ 0 | **Vegetal astral** |
| Mangos ≤ −300 | **Te vinieron a cobrar** |

### Victorias

Se entra al Tramo IV con Conciencia ≥ 85 y se gana con 108. El final concreto sale del
cruce de Karma, Efecto y Mangos: **Iluminación Limpia**, **Iluminación Química**,
**Iluminación Incómoda**, **Gurú Chanta**, **Bodhisattva Lumpen** y **El Vacío**.
Sobrevivir los cuatro tramos sin llegar a 108 es **La Rueda**: reencarnás, pero el KA queda.

---

## Estructura de la run

Cuatro tramos de 4 a 6 turnos (cinco con El Vacío desbloqueado), ~22 turnos en total.
Cada tramo tiene una plantilla de categorías con jitter, y nunca salen dos eventos de la
misma categoría seguidos salvo diálogo.

```
I  — EL BARRIO
II — EL RETIRO      (o LA RUTA DEL NORTE, con D1)
III— LA CAÍDA       (o EL SÓTANO, con D2)
IV — EL ASCENSO     (requiere Conciencia 85)
V  — EL VACÍO       (con D5, post-victoria)
```

Categorías de evento: `dialogo`, `trip`, `combate`, `descanso`, `comercio`, `ruta`,
`ritual`, `final`.

---

## No repetición

Es el requisito central del proyecto y funciona en cuatro capas:

**1. Los eventos son recetas, no textos.** Un evento declara *slots* y el motor los llena
en runtime con piezas sorteadas del banco:

```js
{
  id: "ev_toma_ayahuasca",
  categoria: "trip", tramo: [2, 3], peso: 14,
  requiere: { stats: { mangos: { min: 50 } }, flags: { none: ["se_volvio"] } },
  slots: {
    escenario:    { tags: ["ritual"] },
    personaje:    { tags: ["guru", "ritual"] },
    complicacion: { tags: ["ritual", "social", "misterio"] }
  },
  ascii: "cuenco",
  variantes: [                          // 2-3 redacciones del mismo evento
    { texto: ["párrafo con {escenario} y {personaje.nombre}", "…", "{^complicacion}."] },
    { texto: [ /* … */ ] }
  ],
  opciones: [{
    label: "Tomar la toma completa.",
    requiere: { stats: { aguante: { min: 45 } } }, requisitoTexto: "Aguante 45",
    efectos: { efecto: 38, conciencia: 10, aguante: -12 },
    flags: { set: ["tomo_aya"] },
    resultado: ["texto A", "texto B"],   // también con variantes
    riesgo: { prob: 0.4, efectos: { paranoia: 20 }, resultado: [ /* … */ ] }
    // o bien: tirada: { stat: "aguante", dificultad: 55 }, exito: {…}, fallo: {…}
  }]
}
```

**2. El pool se agota antes de repetir.** El motor filtra por tramo, stats, flags y
desbloqueos; se queda con los eventos del **menor `eventCount` histórico** y ahí sortea
por peso. Ningún evento base vuelve a salir hasta que salieron todos los demás.

**3. Firmas registradas.** Cada texto mostrado se identifica por
`evento|variante|escenario|personaje|personaje2|complicación`. Si la firma ya se leyó, el
motor re-sortea hasta 24 veces (variando también la redacción). Solo cuando un evento
agotó de verdad sus combinaciones se purga **la memoria de ese evento**, no el historial.

**4. Tres almacenes separados en localStorage.**

```
pichicata.meta.v1   permanente: KA, desbloqueos, logros, finales, records
pichicata.seen.v1   permanente: firmas leídas, veces que salió cada evento, variantes usadas
pichicata.run.v1    volátil: la run actual — se borra al morir
```

Morir borra `run`. Nunca `meta` ni `seen`. El menú de ayuda tiene un botón para purgar
solo `seen` (volver a ver textos viejos) sin tocar el KA ni los desbloqueos.

### Medición actual

| | solo contenido base | todo desbloqueado |
|---|---|---|
| eventos base | 61 | 154 |
| escenarios / personajes / complicaciones | 17 / 24 / 25 | 46 / 48 / 39 |
| combinaciones registrables | ≈ 620.000 | ≈ 13.200.000 |
| espacio mediano por evento | 306 textos distintos | 1.188 textos distintos |

En 60 runs seguidas (~1.150 eventos mostrados) con todo desbloqueado: **0 textos
repetidos**. El menú muestra estos números en vivo.

---

## Árbol de desbloqueos

Moneda: **KA (Karma Acumulado)**, se gana al terminar cualquier run, ganes o pierdas.

```
KA = turnos × 2  +  tramo × 15  +  conciencia/2  +  |karma|/4
   + 40 si ganás (+ bonus del final)  + 25 por final nuevo  + logros (10-50)
   × 1.15 con el Billete de 2 Pesos Doblado
```

Run mala ≈ 60 KA · run buena ≈ 250-350 KA. El árbol entero cuesta 5.330 KA.

<details>
<summary><strong>A — EL POOL</strong> (eventos y piezas nuevas)</summary>

| id | qué | costo | requiere |
|---|---|---|---|
| A1 | Circuito Conurbano: +13 eventos, +7 escenarios | 60 | — |
| A2 | El Retiro Mal Organizado: +13 eventos | 90 | A1 |
| A3 | After de After: +13 eventos | 120 | A1 |
| A4 | Plano Astral Bajo: +13 eventos, +5 escenarios, +3 personajes | 160 | A2 |
| A5 | Fauna Espiritual: +14 personajes | 140 | — |
| A6 | Escenarios Remotos: +12 escenarios | 130 | — |
| A7 | Complicaciones Cósmicas: +14 complicaciones | 110 | — |
| A8 | La Comisaría: +11 eventos | 150 | A3 |
| A9 | Cumbre del Ego: +11 eventos, +2 personajes | 200 | A4 |
</details>

<details>
<summary><strong>B — ENCARNACIONES</strong> (personajes jugables)</summary>

| id | quién | costo | pasiva |
|---|---|---|---|
| — | El Buscador Venido a Menos | gratis | ninguna |
| B1 | El Fumón Sereno | 80 | Paranoia sube 40% menos; +1 Conciencia/turno con Efecto ≥ 20 |
| B2 | La Tarotista Endeudada | 150 | Ves el efecto de una opción al azar por evento |
| B3 | El Pibe del Kiosco | 180 | Todo cuesta 40% menos; Karma sube 30% más lento |
| B4 | El Ex-Monje Alcohólico | 240 | Vino infinito: opción extra de tomar en cualquier evento |
| B5 | La Doctora en Filosofía | 300 | Arranca con Conciencia 40; el Aguante baja más rápido |
| B6 | El Perro que Meditó | 450 | No habla: los diálogos se resuelven al azar. No usa plata |
</details>

<details>
<summary><strong>C — RELIQUIAS</strong> (aparecen en runs futuras, no las tenés desde el inicio)</summary>

| id | qué | costo |
|---|---|---|
| C4 | Encendedor Que Nunca Falla — arrancás con material | 60 |
| C1 | Mala de Semillas — −3 Paranoia por turno | 70 |
| C3 | Termo Consagrado — descansar rinde +50% | 90 |
| C2 | Ampolla de Naloxona Bendecida — cancela una muerte por Efecto | 110 |
| C5 | Cuenco Rajado — meditar da +3 Conciencia | 130 |
| C6 | Libreta del Gurú Muerto — ves los efectos de todas las opciones | 170 |
| C7 | Billete de 2 Pesos Doblado — +15% de KA | 200 |
| C8 | Tercer Ojo Legañoso — rechazás un evento por run (req. C6) | 260 |
</details>

<details>
<summary><strong>D — RUTAS Y FINALES</strong></summary>

| id | qué | costo | requiere |
|---|---|---|---|
| D1 | La Ruta del Norte: Tramo II alternativo, +6 eventos | 180 | A6 |
| D2 | El Sótano: Tramo III alternativo, +6 eventos | 220 | A3 |
| D3 | Final: Gurú Chanta | 200 | — |
| D4 | Final: Bodhisattva Lumpen | 280 | — |
| D5 | Tramo V — El Vacío: +11 eventos y un final secreto | 500 | D3, D4 |
</details>

<details>
<summary><strong>E — MATERIA SUTIL</strong> (cosmético)</summary>

| id | qué | costo |
|---|---|---|
| E2 / E3 / E4 | Temas: Fósforo Verde / Ámbar de Bar / Blanco Ceremonial | 30 / 30 / 50 |
| E6 | Marco de bordes ASCII | 35 |
| E1 | Portadas ASCII extendidas: +27 ilustraciones | 40 |
| E7 | Epitafios extendidos: +28 lápidas | 45 |
| E5 | Distorsión de trip avanzada | 70 |
</details>

---

## Archivos

```
index.html                 carga los scripts en orden (globals, sin módulos → anda con file://)
style.css                  terminal oscura + 3 temas desbloqueables
js/
  state.js                 stats, RNG con semilla, los tres almacenes de localStorage
  content-engine.js        selección anti-repetición, firmas, ensamblado del texto
  game.js                  loop de turnos, tramos, metabolismo, muertes, finales
  meta.js                  cálculo de KA, logros, tienda
  ui.js                    render, distorsión por Efecto, teclado
content/
  pieces.js                46 escenarios · 48 personajes · 39 complicaciones · 25 objetos · 40 frases
  ascii.js                 56 ilustraciones
  unlocks.js               el árbol de 35 desbloqueos
  characters.js            7 jugables · 8 reliquias · 14 logros
  endings.js               evento del Ascenso · 7 finales · 5 muertes · 44 epitafios
  events-core.js           27 eventos base
  events-core-2.js         26 eventos base
  events-conurbano.js      13  (A1)
  events-retiro.js         13  (A2)
  events-after.js          13  (A3)
  events-astral.js         13  (A4)
  events-policia.js        11  (A8)
  events-ego.js            11  (A9)
  events-rutas.js          23  (D1 + D2 + D5)
```

## Cómo agregar contenido

Un archivo nuevo en `content/`, un `<script>` en `index.html`, y:

```js
PICHI.addEvents([ { id: "…", categoria: "…", tramo: [2], peso: 10, unlock: "A1", /* … */ } ]);
```

Piezas nuevas: pushealas a `PICHI.ESCENARIOS`, `PICHI.PERSONAJES` o
`PICHI.COMPLICACIONES` y se cruzan solas con **todos** los eventos que pidan esos tags.
Es la vía más barata de multiplicar variedad.

Dos reglas que el motor no puede chequear por vos:

- Un placeholder a principio de oración va con `{^…}` para que se capitalice.
- Las piezas del plano astral (`vos, a los siete`, `tu doble`…) llevan **solo** los tags
  `ego` y `astral`. Si les agregás tags genéricos se filtran a eventos mundanos y aparece
  *vos, a los siete* comprando en un kiosco.

## Atajos

`1`-`5` eligen opción, `Espacio` o `Enter` avanzan. La run se guarda en cada turno: podés
cerrar la pestaña y seguir después.

## Tono

Sátira espiritual under, en rioplatense. Misticismo de galpón cruzado con humor negro,
lenguaje callejero y consumo explícito de sustancias. Hay drogas con nombre, dosis
imprudentes y consecuencias médicas y penales; no hay instrucciones de preparación ni de
dosificación real. El juego se ríe del negocio de la iluminación, no de los que la buscan.
