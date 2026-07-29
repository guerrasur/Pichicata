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
| **Efecto** | 0 → 100 | Cuánta sustancia tenés **activa ahora**. Distorsiona la UI y el texto. El cuerpo lo limpia solo, más lento cuanto más cargado estés. |
| **Paranoia** | 0 → 100 | Independiente del Efecto. Cierra opciones sociales y abre opciones erráticas. |

### Derrotas

| Trigger | Final |
|---|---|
| Aguante ≤ 0 | **El cuerpo dijo basta** |
| Efecto ≥ 100 | **Sobredosis de sabiduría** (la Ampolla de Naloxona lo cancela una vez por run) |
| Paranoia ≥ 100 | **Brote** |
| Conciencia ≤ 0 | **Vegetal astral** |
| Mangos ≤ −300 | **Te vinieron a cobrar** |

### La curva del Efecto

El Efecto no es una barra lineal: tiene tres zonas y cada una te cobra distinto. Es lo que
hace que "estar limpio y paranoico" y "estar dado vuelta y tranquilo" sean dos formas
distintas de jugar.

| zona | por turno | qué significa |
|---|---|---|
| ≤ 10 | −2 Paranoia | limpio: la cabeza se acomoda sola |
| 40-84 | +2 a +4 Paranoia | la zona paranoica: acá se brota la gente |
| ≥ 85 | −3 Paranoia, −8 Aguante | más allá de la paranoia: ya no pensás, paga el cuerpo |

El cuerpo limpia más lento cuanto más cargado estás (−4/−8 por turno arriba de 70, −10/−15
abajo), así que sostenerse en la zona roja es posible y es caro. La sobredosis se dispara
por la dosis **cruda** —meterte 38 encima de 85 son 123, no 100— o por aguantar dos turnos
seguidos arriba de 90.

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

## El dado

Algunas acciones se pueden ejecutar bien o mal, y esas muestran su tirada **antes** de que
elijas (`⚄ d20 +2 AGU · 65%`): el riesgo tiene que ser información con la que decidís, no
una sorpresa que te enterás después. Se tira un d20 más un modificador que sale de cuánto
te sobra del stat que la acción pide, y hay que llegar a 11.

El **20 es crítico** y el **1 es pifia**, siempre, sin importar el modificador: el mejor
preparado se puede comer un papelón y el más roto puede tener un momento. El modificador
está topado en ±6 para que el dado nunca deje de importar.

Hay tres formas de incertidumbre, de más liviana a más pesada:

| campo | qué significa | cómo se resuelve |
|---|---|---|
| `pericia: "aguante"` | la acción se puede hacer bien o mal | escala los propios efectos de la opción: crítico 150% / éxito 100% / fallo 40% de lo bueno y 140% de lo malo / pifia peor |
| `riesgo: { prob }` | hay una complicación que puede aparecer | fallar la tirada hace aparecer la complicación |
| `tirada: { stat, dificultad }` | éxito y fallo son dos ramas escritas | elige entre `exito` y `fallo`, y el crítico o la pifia amplifican la que tocó |

`pericia` existe para que el dado entre en todas partes con un campo de una palabra y sin
escribir prosa nueva. Cuando no hay texto propio para el resultado, se usa el banco de
`content/dados-textos.js`, que tiene líneas por categoría para que no chirríen.

El stat contra el que se tira sale del contenido; cuando no lo dice, se deduce de la
categoría del evento — regatear no se defiende con el cuerpo y una pelea no se defiende con
labia. Hoy: 282 de 690 opciones se juegan con dado (41%), 1,6 por evento, con 29 eventos
sin ningún dado y 7 donde todas las opciones tiran.

## El elenco

Cada run sortea **tres personas que van a volver a aparecer**: un chanta, alguien de la
calle y alguien que te cuida. Están en la barra de arriba, y las que ya cruzaste se marcan
con las veces que las viste.

Los eventos prefieren reutilizarlas antes que sortear un desconocido (70% para el elenco,
35% para cualquiera que ya hayas cruzado), así que el viaje tiene gente en vez de ser una
sucesión de caras nuevas: el elenco cubre ~54% de las apariciones y una run pasa de ~17
personas distintas a ~8.

El elenco se sortea de nuevo en cada run, así que la continuidad es interna y la variedad
entre partidas no se toca: medido, la repetición de textos siguió en 0% en los dos extremos.
Las piezas del plano astral quedan afuera — un jaguar que te acompaña todo el viaje por el
conurbano no es un elenco, es un error.

## La run como itinerario

El reporte era **"nada tiene continuidad"** y era exacto. Medido: el escenario cambiaba en
el **100% de las transiciones entre turnos**. Una run era un pueblo de la pampa, después un
colectivo a las tres de la mañana, después el patio de tu infancia, después un salón de
fiestas en Villa Crespo. No era una historia, era una teletransportación con buena prosa.

`js/mundo.js` le pone al viaje las dos cosas que le faltaban: un **lugar** y una **hora**.

**El lugar persiste.** Si el lugar donde estás sirve para el evento que toca, te quedás:
85% de probabilidad, que baja a 35% después de tres turnos en el mismo sitio — una run que
no se mueve nunca tampoco es un viaje. Resultado medido: **el lugar cambia en el 42% de las
transiciones**, no en el 100%.

**Moverse es un hecho del relato.** Los 400+ cambios de lugar por cada 60 runs se narran con
una línea de traslado antes del evento. Nunca hay un salto invisible.

**Hay geografía.** No hay mapa, pero sí distancias: capital, conurbano, lejos. Desde capital
se llega al conurbano, no al monte chaqueño entre dos escenas. Es un filtro blando —si deja
el pool vacío se afloja— y los traslados imposibles quedaron en el 1,5%.

**El reloj solo avanza.** Seis franjas de mañana a madrugada, con día que se incrementa al
dar la vuelta. Dormir adelanta más que meditar. Un after no pasa al mediodía y un salar a
las dos de la tarde no pasa a las cuatro de la mañana: el escenario se filtra por la luz.

## Las decisiones deciden lo que sigue

Antes, el evento siguiente se sorteaba por ritmo de tramo y nada más: pasara lo que pasara,
el turno que venía no tenía ninguna relación con el anterior.

Ahora cada decisión deja un **sesgo** —qué clase de cosa corresponde después— y el sorteo lo
respeta con 75% de probabilidad. El sesgo se deriva de lo que efectivamente pasó, no de una
etiqueta escrita a mano:

| lo que pasó | lo que viene |
|---|---|
| pifiaste la tirada | `combate` — "lo que hiciste recién no va a quedar así" |
| sacaste un crítico | `dialogo` — "te salió y eso se nota desde lejos" |
| Aguante ≤ 30, o te sacaron 18+ | `descanso` — "el cuerpo no da para más" |
| Paranoia ≥ 70, o subió 15+ | `descanso` / `combate` — "la paranoia se paga" |
| Efecto ≥ 65, o te metiste 25+ | `trip` — "la dosis todavía está subiendo" |
| te quedaste sin plata, o gastaste 300+ | `comercio` — "no te queda un peso y eso ordena el día" |
| ganaste 18+ de Conciencia | `ritual` — "quedó una puerta abierta y no se cierra sola" |
| moviste el Karma 15+ | `dialogo` — "lo que hiciste pide una conversación" |

Cuando el sesgo se cumple, el porqué se dice en media línea arriba del evento. Cada causa
tiene varias redacciones y **nunca se anuncia la misma dos veces seguidas**: repetir "la
paranoia se paga" tres veces en cuatro turnos deja de ser causalidad y pasa a ser ruido.
Medido: **391 turnos con causa anunciada cada 1065**, ~37%.

Si el pool de esa categoría está vacío en el tramo, el sesgo no se anuncia. Nunca se promete
una causa que después no se cumplió.

### Secuelas escritas a mano

Además del sesgo automático, una opción puede nombrar el evento que viene después:

```js
{ label: "Decirle que sí y arrepentirte en el acto.",
  secuela: { evento: "ev_la_deuda_vuelve", porque: "quedaste debiendo" },
  efectos: { mangos: 400, karma: -8 } }
```

Es la forma de escribir una escena de dos partes. Se respeta solo si el evento nombrado
además es elegible en ese tramo; si no, se sortea normal y la escena no ocurre. También
acepta `categoria` en vez de `evento` para sesgar sin fijar.

## Lo que hiciste vuelve

El contenido prendía **63 flags** para registrar decisiones —una promesa, una garcada, una
deuda, un pacto— y **54 de ellas no las leía nadie**. La maquinaria de continuidad estaba
escrita y el motor la tiraba a la basura. `content/consecuencias.js` la lee.

Cada flag tiene dos consecuencias:

| campo | dónde aparece |
|---|---|
| `eco` | una línea sola, arriba de un evento posterior de la misma run |
| `rastro` | el resumen final, en "lo que dejaste atrás" |
| `karma` | corrección al Karma al cerrar la run |

Los **ecos de flag** son consecuencia de una decisión concreta y tienen prioridad. Como una
run junta solo 3 flags en promedio, hay además **16 ecos de estado** que salen de cómo viene
el viaje (el cuerpo al límite, la deuda, la paranoia, la gente que se repite, el papelón de
hace dos turnos) y están disponibles siempre.

Un eco por turno como máximo y con 45% de probabilidad: da ~1 cada 3 turnos, ~4,7 por run.
Con 70% llegaba al 38% de los turnos y dejaba de leerse como un recuerdo para volverse una
cortina. Ninguno se repite dentro de la misma run.

El Karma final ya no depende solo de cómo elegís el último turno: `karmaDelRastro()` cobra
lo que hiciste durante el viaje. Cumplir una promesa vale +8, encubrir bajo declaración −12.

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
  variantes: [                          // 2 a 5 redacciones del mismo evento
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
| eventos base | 80 | 173 |
| escenarios / personajes / complicaciones | 27 / 36 / 41 | 56 / 56 / 55 |
| combinaciones registrables | ≈ 2.500.000 | ≈ 29.900.000 |
| espacio mediano por evento | 700 textos distintos | 2.240 textos distintos |

En 60 runs seguidas (~1.000 eventos mostrados): **0 textos repetidos**, tanto con el pool
base como con todo desbloqueado. Se mide en los dos extremos porque el jugador nuevo es el
caso peor y es justo el que decide si el juego engancha. El menú muestra estos números en
vivo.

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
  dados.js                 el d20: modificador, crítico y pifia, escala de resultados
  mundo.js                 lugar y hora de la run: persistencia, geografía, traslados
  content-engine.js        selección anti-repetición, firmas, ensamblado del texto,
                           el sorteo de personas que prefiere al elenco y el de
                           escenarios que prefiere quedarse donde estás
  game.js                  loop de turnos, tramos, elenco, dados, sesgo de la decisión,
                           muertes, finales
  meta.js                  cálculo de KA, logros, tienda
  ui.js                    render, distorsión por Efecto, teclado
content/
  pieces.js                56 escenarios · 56 personajes · 55 complicaciones · 25 objetos · 40 frases
  ascii.js                 56 ilustraciones
  dados-textos.js          líneas de crítico, fallo y pifia por categoría
  consecuencias.js         64 consecuencias de flags + 16 ecos de estado
  unlocks.js               el árbol de 35 desbloqueos
  characters.js            7 jugables · 8 reliquias · 14 logros
  endings.js               evento del Ascenso (5 redacciones) · 7 finales · 5 muertes · 44 epitafios
  events-core.js           27 eventos base
  events-core-2.js         26 eventos base
  events-base-extra.js     19 eventos base (ruta, combate, comercio y Tramo IV)
  events-conurbano.js      13  (A1)
  events-retiro.js         13  (A2)
  events-after.js          13  (A3)
  events-astral.js         13  (A4)
  events-policia.js        11  (A8)
  events-ego.js            11  (A9)
  events-rutas.js          23  (D1 + D2 + D5)
```

## Pruebas

```
node test/run.js              suite completa, sin dependencias  (~15s)
node test/run.js --rapido     menos runs, para iterar           (~3s)

npm i --no-save playwright    opcional
node test/browser.js          smoke test de navegador
node test/browser.js --fotos  además guarda capturas en /tmp
```

`test/harness.js` carga los archivos reales del juego en un sandbox de Node con
`localStorage` y `document` stubbeados, y expone estrategias de juego automático.
Cada estrategia estresa el motor por un lado distinto: `asceta` busca iluminarse y
ejercita los tramos IV y V, `quemado` persigue el Efecto, `vegetal` se apaga,
`kamikaze` se revienta.

La suite verifica, entre otras cosas:

- que `index.html` y el arnés carguen los mismos archivos (si agregás contenido y te
  olvidás de uno de los dos lados, falla);
- estructura y referencias cruzadas de los 173 eventos, incluidos ascii y unlocks;
- que todo placeholder exista, tenga su slot declarado y use `{^…}` a principio de oración;
- que ninguna pieza del plano astral se filtre a eventos mundanos y que ningún slot
  quede sin candidatos temáticos;
- que **las 5 muertes y los 7 finales sean alcanzables** — cada uno con la estrategia
  que lo busca y presupuesto acotado, así el contenido inalcanzable falla en vez de
  pasar desapercibido;
- la matemática del dado: que 50% sea 50%, que el crítico y la pifia salgan ~5% cada uno,
  que el pronóstico que se le muestra al jugador coincida con lo que pasa, y que el dado
  aparezca seguido pero no en todas las opciones;
- que el elenco vuelva a aparecer, que cambie entre runs y que nunca incluya piezas
  astrales;
- que **la run sea un itinerario y no una sucesión de postales**: que el lugar cambie bien
  por debajo del 100% de las transiciones pero tampoco se estanque, que todo cambio de
  lugar se narre, que los traslados respeten la geografía y que el reloj solo avance;
- que **las decisiones influyan en lo que sigue**: que un sesgo dado lleve de verdad al
  evento que promete, que una secuela escrita traiga exactamente el evento que nombra, y
  que nunca se anuncie la misma causa dos veces seguidas;
- que **toda flag que el contenido prende tenga consecuencia** — esta prueba existe porque
  54 de 63 no la tenían — y que los ecos aparezcan seguido sin saturar, no se repitan dentro
  de una run y lleguen al resumen final;
- que la repetición de textos se mantenga en 0% a lo largo de 60 runs seguidas, medida
  tanto con el pool base como con todo desbloqueado;
- que los 35 desbloqueos sean comprables y que no se pueda saltear un requisito;
- que morir no toque el KA y que un save corrupto no rompa la carga.

## Cómo agregar contenido

Un archivo nuevo en `content/`, un `<script>` en `index.html`, una línea en `ARCHIVOS`
de `test/harness.js` (la suite falla si te olvidás de alguno de los tres), y:

```js
PICHI.addEvents([ { id: "…", categoria: "…", tramo: [2], peso: 10, unlock: "A1", /* … */ } ]);
```

Piezas nuevas: pushealas a `PICHI.ESCENARIOS`, `PICHI.PERSONAJES` o
`PICHI.COMPLICACIONES` y se cruzan solas con **todos** los eventos que pidan esos tags.
Es la vía más barata de multiplicar variedad.

Dos reglas que el motor no aplica solo, pero que las pruebas sí chequean:

- Un placeholder a principio de oración va con `{^…}` para que se capitalice.
- Las piezas del plano astral (`vos, a los siete`, `tu doble`…) llevan **solo** los tags
  `ego` y `astral`. Si les agregás tags genéricos se filtran a eventos mundanos y aparece
  *vos, a los siete* comprando en un kiosco. Vale igual para los escenarios astrales: un
  escenario con `astral` no cuenta como lugar del mundo y no se llega caminando.
- Los escenarios llevan la geografía en los tags: `urbano`, `conurbano`, `remoto` o
  `naturaleza`. Sin ninguno de esos, la pieza es bisagra y se llega desde cualquier lado —
  útil para interiores. Los tags `dia` y `noche` limitan a qué hora puede pasar.

Placeholders de mundo disponibles en cualquier texto: `{hora}`, `{dehora}` y `{lugar}`.

Corré `node test/run.js` después de tocar contenido: además de esas dos reglas verifica
que no hayas dejado un evento con pool chico ni un slot sin candidatos.

## Colección

El menú tiene una pantalla de colección que cierra el círculo del meta-progreso: los 7
finales (los no descubiertos aparecen como `???`, sin espoilear), las 5 maneras de terminar
mal con cuántas veces te tocó cada una, los 14 logros con lo que falta para cada uno, las 8
reliquias con su costo, y los récords: máxima Conciencia, tramo más lejano, run más larga,
mejor cosecha de KA y cuántos textos distintos leíste en total.

## Atajos

`1`-`5` eligen opción, `Espacio` o `Enter` avanzan. La run se guarda en cada turno: podés
cerrar la pestaña y seguir después.

## Tono

Sátira espiritual under, en rioplatense. Misticismo de galpón cruzado con humor negro,
lenguaje callejero y consumo explícito de sustancias. Hay drogas con nombre, dosis
imprudentes y consecuencias médicas y penales; no hay instrucciones de preparación ni de
dosificación real. El juego se ríe del negocio de la iluminación, no de los que la buscan.
