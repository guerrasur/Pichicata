# HANDOFF — próximo paso: los hilos

Documento para retomar el proyecto en otra sesión. Lo que sigue es **una cosa
sola y grande**: darle a cada run una columna vertebral narrativa.

Última medición del estado actual: PR #7 (`29b7ef2`). Suite verde.

---

## Qué está resuelto y qué no

Ya hay continuidad **de escena a escena**:

| capa | qué hace | dónde |
|---|---|---|
| el elenco | 3 personas vuelven a aparecer toda la run | `js/game.js` → `armarElenco` |
| los ecos | lo que hiciste vuelve como recuerdo | `content/consecuencias.js` |
| el lugar y la hora | la run es un itinerario, no una postal por turno | `js/mundo.js` |
| el sesgo | la decisión anterior decide de qué va el turno siguiente | `js/game.js` → `sesgoDeLaDecision` |

Lo que **falta** es continuidad **de principio a fin**. Hoy una run es una
sucesión coherente de escenas, pero no tiene una pregunta que la atraviese. No
hay nada que el jugador *quiera*, más allá de subir Conciencia, y por lo tanto
no hay nada que se abra en el Tramo I y se cierre en el IV.

Eso son los **hilos**.

---

## Qué es un hilo

Cada run sortea **un hilo**: algo concreto que querés y que va a definir el
viaje. No es una quest con checklist visible; es una promesa narrativa que se
abre, se complica dos o tres veces y se resuelve.

Ejemplos del tono que corresponde:

- **La deuda.** Le debés plata a alguien que no es del todo una persona. El hilo
  se abre con el recordatorio, se complica cuando lo ves de lejos, y se resuelve
  pagando, huyendo o arreglando de una forma peor que la deuda.
- **El que te enseñó.** Estás buscando a alguien que te enseñó algo hace años y
  que desapareció. Termina encontrándolo hecho pelota, o descubriendo que la
  enseñanza era afanada, o no encontrándolo nunca y que eso sea el punto.
- **La ceremonia del sábado.** Hay una ceremonia a la que tenés que llegar. Todo
  el viaje es llegar. Podés llegar tarde, llegar y que no sea lo que esperabas,
  o no llegar y que el viaje haya sido la ceremonia.
- **El favor.** Alguien te pidió algo al principio y vos dijiste que sí sin
  escuchar bien qué era.
- **La plata del pasaje.** Necesitás juntar una cifra concreta antes del Tramo
  III. Este es el más mecánico de todos y por eso conviene tenerlo: ancla el hilo
  a un stat.

Cinco o seis alcanzan para empezar. Cada uno con **2-3 redacciones** de cada
beat, como todo lo demás del proyecto.

---

## Estructura propuesta

```js
// content/hilos.js
PICHI.HILOS = [{
  id: "hilo_deuda",
  nombre: "la deuda",
  // condiciones para que este hilo pueda salir en esta run
  requiere: { unlock: null, personaje: null },
  // a quién involucra: se fija UNA vez al empezar la run y no cambia
  slots: { personaje: { tags: ["chanta", "peligro"] } },

  apertura: { /* evento, tramo 1, turno 1-2 */ },
  nudos: [ /* 2-3 eventos, gateados por avance */ ],
  resoluciones: [
    { id: "pagaste",   cond: r => r.hilo.progreso >= 3, /* … */ },
    { id: "huiste",    cond: r => r.flags.huyo_de_la_deuda, /* … */ },
    { id: "sin_saldar",cond: () => true, /* el default: no resolverlo también resuelve */ }
  ]
}];
```

Puntos clave del diseño, en orden de importancia:

1. **El hilo no puede fallar en silencio.** Si un nudo no puede salir (pool
   vacío, tramo equivocado, stats), el hilo tiene que degradar a algo que igual
   se lea. Un hilo que se abre y no se cierra es peor que no tener hilo: es la
   promesa rota. **Siempre** tiene que haber una resolución con `cond` que
   devuelva `true`.
2. **La persona del hilo se fija una vez.** Sortear el `personaje` del hilo al
   empezar la run y guardarlo en `run.hilo.piezas`, no en cada beat. Es el mismo
   error que ya se cometió una vez con el elenco.
3. **El hilo no reemplaza el pool, lo interrumpe.** Los beats se insertan entre
   los eventos normales, no en lugar del sorteo. Una run tiene ~18 turnos y el
   hilo se lleva 4 o 5: el resto sigue siendo el juego que ya existe.
4. **La resolución tiene que pesar.** KA, karma, una reliquia, una línea en el
   resumen final. Si resolver el hilo no cambia nada, es decorado.

---

## Dónde engancha (código actual)

| qué | dónde |
|---|---|
| sortear el hilo | `js/game.js` → `PICHI.nuevaRun`, al lado de `armarElenco()` |
| insertar un beat | `js/game.js` → `PICHI.siguienteEvento`, **antes** de `categoriaDelTurno()` — misma posición donde hoy se consulta `run.sesgo.evento` |
| avanzar el progreso | `js/game.js` → `PICHI.elegirOpcion`, junto a donde se setea `run.sesgo` |
| forzar el evento | ya existe: `ctx.forzar` en `PICHI.elegirEvento` (`js/content-engine.js`), el mismo mecanismo que usa `op.secuela` |
| la resolución | `js/game.js` → `PICHI.terminarRun`, junto al `puenteFinal` |
| mostrarlo | `js/ui.js` → `renderStats` (una línea en el HUD, al lado de `.elenco`) y `renderFin` |
| registrar el archivo | `index.html` **y** `test/harness.js` → `ARCHIVOS` (la suite falla si falta uno) |

**Reusá `ctx.forzar` en vez de escribir un mecanismo nuevo.** Ya está probado y
hace exactamente esto: nombrar el evento que viene y respetarlo solo si además
es elegible.

---

## Pruebas que hay que escribir

Van en el grupo `continuidad de la run` de `test/run.js`, que ya existe y ya
tiene el patrón (medir sobre 60 runs con `antesDeElegir`).

- **Todo hilo que se abre se cierra.** Sobre 60 runs que lleguen al Tramo III o
  más: 100% tienen resolución. Esta es la prueba importante y es la razón del
  punto 1 de arriba.
- **Cada hilo es alcanzable.** Como la prueba de los 7 finales: cada hilo sale al
  menos una vez con presupuesto acotado. Si no, es contenido muerto.
- **Cada resolución es alcanzable.** Con la estrategia que la busca.
- **El hilo no come la run.** Los beats no superan ~30% de los turnos.
- **El hilo no rompe la no-repetición.** Volver a medir los dos extremos (pool
  base y todo desbloqueado): el techo sigue siendo 0%. Los beats de hilo son
  eventos que salen sí o sí, así que son justo los que más riesgo tienen de
  repetirse entre runs — probablemente haya que darles variantes de más.
- **La persona del hilo no cambia a mitad de run.**

Correr también `node test/browser.js` (con `npm i --no-save playwright`).

---

## Trampas conocidas de este repo

Cosas que ya mordieron una vez. Están todas documentadas en el README pero acá
van las que aplican a este trabajo:

- **Nada de ES modules.** Todo es global sobre `window.PICHI` a propósito, porque
  los módulos rompen con `file://` y el requisito es que ande abriendo
  `index.html`.
- **Archivo nuevo = tres lugares**: el archivo, `index.html`, y `ARCHIVOS` en
  `test/harness.js`. La suite chequea que los tres coincidan.
- **`{^…}` a principio de oración**, siempre. La suite lo verifica.
- **Piezas astrales**: solo tags `ego` y `astral`. Vale para personajes y para
  escenarios. Ya se filtró dos veces, por dos caminos distintos.
- **Contenido que nadie lee.** Este proyecto ya tuvo 54 flags muertas, un final
  inalcanzable y una muerte matemáticamente imposible. Si escribís un campo
  nuevo, escribí también la prueba de que algo lo consume.
- **Medir antes de afirmar.** Las dos veces que algo "no tenía continuidad", la
  medición dijo algo distinto de lo que yo suponía. Instrumentar primero.

---

## Otras cosas pendientes, más chicas

Por si el hilo es demasiado para una sesión:

- La categoría `ritual` tiene **3 eventos** contra 43 de `trip`. El sesgo de
  apertura ("quedó una puerta abierta") apunta ahí y muchas veces no encuentra
  con qué cumplirlo. Faltan ~8 eventos de ritual.
- `op.secuela` se usa en **3 opciones** de 686. Es barato y rinde: hay pares
  obvios sin escribir (la promesa y el cobro, la ceremonia y la resaca, el
  favor y la factura).
- Los traslados tienen 7 pools con 17 líneas en total. Con 400+ traslados cada
  60 runs, se empiezan a repetir dentro de la misma run.
- La pantalla de colección no muestra los lugares visitados. Sería un buen
  registro del itinerario y encaja con el meta-progreso que ya existe.
