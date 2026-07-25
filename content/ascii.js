/* PICHICATA — ilustraciones ASCII.
   Cada entrada: { lines: [...], unlock: null | "E1" }
   Solo una parte de los eventos tiene ascii, para que no se sature. */

window.PICHI = window.PICHI || {};

PICHI.ASCII = {

  /* ============ base ============ */

  cuenco: { unlock: null, lines: [
    "        . . . . . .        ",
    "     .                .    ",
    "   (                    )  ",
    "    \\   ~ ~ ~ ~ ~ ~    /   ",
    "     \\  ~ ~ ~ ~ ~ ~   /    ",
    "      \\______________/     ",
    "       '.__________.'      "
  ]},

  hongo: { unlock: null, lines: [
    "        _.-^^---....,,--    ",
    "    _--                --_  ",
    "   <          o o         > ",
    "   |                      | ",
    "    \\._            _./     ",
    "       ```--. . , ;.--'''   ",
    "             | |            ",
    "          .-=||=-.          "
  ]},

  espejo: { unlock: null, lines: [
    "  +--------------------+ ",
    "  |                    | ",
    "  |     O        O     | ",
    "  |                    | ",
    "  |       \\____/       | ",
    "  |                    | ",
    "  |   ( sos vos, pero  | ",
    "  |     mejor vestido )| ",
    "  +--------------------+ "
  ]},

  escalera: { unlock: null, lines: [
    "                    _____ ",
    "               ____|     ",
    "          ____|          ",
    "     ____|               ",
    "    |                    ",
    "    |   ( no hay pasama- ",
    "    |     nos arriba )   ",
    "  __|__                  "
  ]},

  porro: { unlock: null, lines: [
    "                       ~ ~ ",
    "                     ~     ",
    "   ==================o     ",
    "   ------------------      ",
    "                           ",
    "   ( lo armo yo, dijo, y   ",
    "     tardo veinte minutos )"
  ]},

  policia: { unlock: null, lines: [
    "   _____________________   ",
    "  |  [] [] [] [] [] []  |  ",
    "  |_____________________|  ",
    "     ()             ()     ",
    "                           ",
    "   * * * * * * * * * * *   ",
    "   documentos, jefe        "
  ]},

  ojo: { unlock: null, lines: [
    "      ______________       ",
    "   .-'              '-.    ",
    "  /    .----------.    \\  ",
    " |    /   .----.   \\    | ",
    " |   |   (  ##  )   |   |  ",
    "  \\   \\   '----'   /   /  ",
    "   '-.  '--------'  .-'    ",
    "      '------------'       "
  ]},

  chakras: { unlock: null, lines: [
    "         (o)  corona       ",
    "         (o)  tercer ojo   ",
    "         (o)  garganta     ",
    "         (o)  corazon      ",
    "         (x)  plexo  <-- roto",
    "         (o)  sacro        ",
    "         (?)  raiz         "
  ]},

  botella: { unlock: null, lines: [
    "        _n_        ",
    "       |   |       ",
    "      /     \\     ",
    "     |  T I N |    ",
    "     |  T O   |    ",
    "     |________|    ",
    "     |________|    ",
    "     ( 1 litro )   "
  ]},

  tumba: { unlock: null, lines: [
    "        ______        ",
    "      .'      '.      ",
    "     /   R.I.P  \\    ",
    "    |            |    ",
    "    |    ~~~~    |    ",
    "    |            |    ",
    "  __|____________|__  ",
    " /////////////////// "
  ]},

  loto: { unlock: null, lines: [
    "      _       _      ",
    "  \\  (_)  |  (_)  /  ",
    "   \\  \\   |   /  /  ",
    "    \\_ \\ _|_ / _/   ",
    "      \\_______/     ",
    "       \\_____/      ",
    "     ~~~~~~~~~~~~     "
  ]},

  colectivo: { unlock: null, lines: [
    "   ______________________  ",
    "  |  60  |[]|[]|[]|[]|  |] ",
    "  |______|__|__|__|__|__|  ",
    "     (O)            (O)    ",
    "                           ",
    "   ( el fondo esta libre   ",
    "     por un motivo )       "
  ]},

  fuego: { unlock: null, lines: [
    "        )     (          ",
    "       (  ,   )          ",
    "      )  ) (  (  ,       ",
    "     ( (  )  ) )  )      ",
    "    _(__(___)__(__)_     ",
    "   /_/_/_/_/_/_/_/_/     ",
    "     ~ ~ ~ ~ ~ ~ ~       "
  ]},

  celular: { unlock: null, lines: [
    "    ____________   ",
    "   |  ///////// |  ",
    "   | //  4%  // |  ",
    "   |/////////// |  ",
    "   |            |  ",
    "   |    ( o )   |  ",
    "   |____________|  ",
    "   14 llamadas     "
  ]},

  mano: { unlock: null, lines: [
    "     _  _  _        ",
    "    | || || | _     ",
    "    | || || || |    ",
    "    |_||_||_||_|    ",
    "   /            \\  ",
    "  |   (temblando)  | ",
    "   \\____________/  "
  ]},

  tambor: { unlock: null, lines: [
    "    ______________    ",
    "   /              \\  ",
    "  | ~~~~~~~~~~~~~~ |   ",
    "  |________________|   ",
    "   |              |    ",
    "   |______________|    ",
    "   pum   pum   pum     "
  ]},

  perro: { unlock: null, lines: [
    "      / \\__          ",
    "     (    @\\___      ",
    "     /         O      ",
    "    /   (_____/       ",
    "   /_____/   U        ",
    "                      ",
    "  ( no es de nadie )  "
  ]},

  puerta: { unlock: null, lines: [
    "   ________________   ",
    "  |                |  ",
    "  |            o   |  ",
    "  |                |  ",
    "  |                |  ",
    "  |                |  ",
    "  |________________|  ",
    "  ( abre para adentro )"
  ]},

  estrella: { unlock: null, lines: [
    "        .              .   ",
    "   .        *      .       ",
    "        .       .     *    ",
    "  *   .     .        .     ",
    "     .    *      .    .    ",
    "  ( hay dos lunas y una    ",
    "    esta de mas )          "
  ]},

  jeringa: { unlock: null, lines: [
    "   ______________          ",
    "  |___|__________|>------  ",
    "      |                    ",
    "  ( naloxona, bendecida    ",
    "    por un tipo dudoso )   "
  ]},

  guiso: { unlock: null, lines: [
    "       ~   ~   ~        ",
    "     _______________    ",
    "  ==|               |== ",
    "    |  o  O   o  O  |   ",
    "    |_______________|   ",
    "     \\_____________/   ",
    "   ( rinde para todos )  "
  ]},

  vias: { unlock: null, lines: [
    "  ||   ||   ||   ||   || ",
    "  ==================== ",
    "  ||   ||   ||   ||   || ",
    "  ==================== ",
    "                        ",
    "   ( el tren pasa a las ",
    "     4:12, siempre )    "
  ]},

  reloj: { unlock: null, lines: [
    "      .-''''''-.      ",
    "    .'    |     '.    ",
    "   /      |       \\  ",
    "  |       |____    |  ",
    "  |            \\   | ",
    "   \\               / ",
    "    '.__________.'    ",
    "        4:12          "
  ]},

  billete: { unlock: null, lines: [
    "  +----------------------+ ",
    "  | $2  ~~~~~~~~~~   $2  | ",
    "  |    (  ()()  )        | ",
    "  | DOS PESOS ARGENTINOS | ",
    "  +----------------------+ ",
    "   ( doblado en ocho )     "
  ]},

  mala: { unlock: null, lines: [
    "     o o o o o o        ",
    "   o             o      ",
    "  o               o     ",
    "  o               o     ",
    "   o             o      ",
    "     o o o o o o        ",
    "  ( faltan dos cuentas )"
  ]},

  termo: { unlock: null, lines: [
    "     ____     ",
    "    |    |    ",
    "   _|____|_   ",
    "  |        |  ",
    "  | ABOLLA |  ",
    "  |   DO   |  ",
    "  |________|  "
  ]},

  libreta: { unlock: null, lines: [
    "   ________________   ",
    "  |o               |  ",
    "  |o  ~~~~~~~~~~~  |  ",
    "  |o  ~~~~~~~      |  ",
    "  |o  ~~~~~~~~~~~  |  ",
    "  |o               |  ",
    "  |o  deudores:    |  ",
    "  |o  1. vos       |  ",
    "  |________________|  "
  ]},

  ampolla: { unlock: null, lines: [
    "      __      ",
    "     |  |     ",
    "    _|  |_    ",
    "   |      |   ",
    "   | ~~~~ |   ",
    "   |______|   ",
    "   sellada    "
  ]},

  vacio: { unlock: null, lines: [
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        "
  ]},

  /* ============ E1: portadas ASCII extendidas ============ */

  serpiente: { unlock: "E1", lines: [
    "        _______          ",
    "     .-'   ,   '-.       ",
    "    /     (o)     \\     ",
    "   |    ~~~~~~~     |     ",
    "    \\  ~~~~~~~~~   /     ",
    "     '-._______.-'       ",
    "   ( te habla en tu voz )"
  ]},

  jaguar: { unlock: "E1", lines: [
    "      /\\_/\\   .-.      ",
    "     ( o.o ) (   )       ",
    "      > ^ <   '-'        ",
    "     /|   |\\            ",
    "    ( |   | )            ",
    "   ( no pestanea )       "
  ]},

  cana2: { unlock: "E1", lines: [
    "   ___________________   ",
    "  |    ACTA  N. ____   | ",
    "  |  ~~~~~~~~~~~~~~~~  | ",
    "  |  ~~~~~~~~~~~       | ",
    "  |  firme aca: ______ | ",
    "  |___________________|  "
  ]},

  guitarra: { unlock: "E1", lines: [
    "      |=|               ",
    "      |=|               ",
    "      |=|               ",
    "    _.-'-._             ",
    "   /   O   \\           ",
    "  |         |            ",
    "   \\_______/           ",
    "  ( tres cuerdas )       "
  ]},

  pileta: { unlock: "E1", lines: [
    "  ______________________ ",
    " |~~~~~~~~~~~~~~~~~~~~~| ",
    " |~~~~~ (rana) ~~~~~~~~| ",
    " |~~~~~~~~~~~~~~~~~~~~~| ",
    " |_____________________| ",
    "  ( verde desde marzo )  "
  ]},

  parrilla: { unlock: "E1", lines: [
    "  ===================== ",
    "  ||||||||||||||||||||| ",
    "  ===================== ",
    "      )   (   )         ",
    "     (  ,   ,  )        ",
    "  ( fuego sin carne )   "
  ]},

  bondi_noche: { unlock: "E1", lines: [
    "  . . . . . . . . . . . ",
    "   _____________________ ",
    "  |[]|[]|  |[]|  |[]|[]| ",
    "  |__|__|__|__|__|__|__| ",
    "    (o)          (o)     ",
    "  ( ultimo servicio )    "
  ]},

  monte: { unlock: "E1", lines: [
    "    /\\    /\\  /\\      ",
    "   /  \\/\\/  \\/  \\    ",
    "  /   /  \\   \\   \\   ",
    " ~~~~~~~~~~~~~~~~~~~~~  ",
    "  ( el ruido es silencio )"
  ]},

  salar: { unlock: "E1", lines: [
    "                        ",
    "  ____________________  ",
    "  ....................  ",
    "  ....................  ",
    "                        ",
    "  ( no hay sombra )     "
  ]},

  rio: { unlock: "E1", lines: [
    "  ~~~~~~~~~~~~~~~~~~~~  ",
    "   ~~~~~~~~~~~~~~~~~~~  ",
    "  ~~~~~ ___ ~~~~~~~~~~  ",
    "  ~~~~ /   \\ ~~~~~~~~~ ",
    "  ( el agua sube y baja  ",
    "    como si respirara )  "
  ]},

  virgen: { unlock: "E1", lines: [
    "       .-\"\"\"-.       ",
    "      /  . .  \\       ",
    "     |    o    |        ",
    "      \\  ___  /        ",
    "     .-'     '-.        ",
    "    /___________\\      ",
    "   ( plastificada )     "
  ]},

  gato: { unlock: "E1", lines: [
    "    /\\_/\\             ",
    "   ( o.o )              ",
    "    > ^ <               ",
    "   (       )            ",
    "  ( en el centro del     ",
    "    circulo, siempre )   "
  ]},

  cadena: { unlock: "E1", lines: [
    "  (O)-(O)-(O)-(O)-(O)   ",
    "                        ",
    "  ( karma, dicen, pero   ",
    "    es una deuda )       "
  ]},

  pastillas: { unlock: "E1", lines: [
    "   [L][M][M][J][V]      ",
    "   [ ][o][ ][o][o]      ",
    "                        ",
    "  ( el pastillero se     ",
    "    reasigno )           "
  ]},

  bandera: { unlock: "E1", lines: [
    "  |\\_______________     ",
    "  | RETIRO DE LUZ  |     ",
    "  | Y SANACION     |     ",
    "  | (senia 50%)    |     ",
    "  |/_______________|     ",
    "  |                      ",
    "  |                      "
  ]},

  bicho: { unlock: "E1", lines: [
    "     \\   /             ",
    "    __\\ /__            ",
    "   (   x   )             ",
    "    ''| |''              ",
    "  ( te mira desde la     ",
    "    pared, hace rato )   "
  ]},

  luna2: { unlock: "E1", lines: [
    "    (       )           ",
    "   ( O )   ( O )        ",
    "                        ",
    "  ( una de las dos       ",
    "    esta de mas )        "
  ]},

  ventilador: { unlock: "E1", lines: [
    "  ____|____              ",
    "     [O]                 ",
    "   /  |  \\              ",
    "  /   |   \\             ",
    "                         ",
    "  ( clic cada vuelta      ",
    "    y media )             "
  ]},

  guardia: { unlock: "E1", lines: [
    "  [][][][][][][][][][]  ",
    "  ------------------- ",
    "   ( ) ( ) (o) ( ) ( )   ",
    "  ------------------- ",
    "  turno 47 - espere      "
  ]},

  balde: { unlock: "E1", lines: [
    "   \\_____________/     ",
    "    |           |        ",
    "    |  ~~~~~~~  |        ",
    "    |___________|        ",
    "  ( 20 litros, reasig-   ",
    "    nado )               "
  ]},

  ventanita: { unlock: "E1", lines: [
    "  ####################  ",
    "  ####  ________  ####  ",
    "  ####  |      |  ####  ",
    "  ####  | (--) |  ####  ",
    "  ####  |______|  ####  ",
    "  ####################  ",
    "  ( solo se ven manos )  "
  ]},

  micro: { unlock: "E1", lines: [
    "   _____________________ ",
    "  | ~~ EL VIAJE ~~     |]",
    "  |_[]__[]__[]__[]_____| ",
    "    (O)          (O)     ",
    "  ( sale cuando sale )   "
  ]},

  altar: { unlock: "E1", lines: [
    "    _______________     ",
    "   |  *  |  o  |  * |    ",
    "   |_____|_____|____|    ",
    "   |  ~~~~~~~~~~~~  |    ",
    "   |________________|    ",
    "  ( velas y un compresor )"
  ]},

  telefono: { unlock: "E1", lines: [
    "    ______________      ",
    "   |  llamada de  |      ",
    "   |   MAMA       |      ",
    "   |              |      ",
    "   | [X]     [OK] |      ",
    "   |______________|      "
  ]},

  cruz: { unlock: "E1", lines: [
    "        ___             ",
    "       |   |            ",
    "   ____|   |____        ",
    "  |             |       ",
    "  |_____   _____|       ",
    "       |   |            ",
    "       |___|            ",
    "  ( sin techo )         "
  ]},

  cabeza: { unlock: "E1", lines: [
    "      .-------.         ",
    "     /  o   o  \\       ",
    "    |     >     |        ",
    "    |   \\___/   |       ",
    "     \\_________/        ",
    "      |  | |  |          ",
    "  ( hay alguien adentro   ",
    "    y no sos vos )        "
  ]},

  disolucion: { unlock: "E1", lines: [
    "   . : . : . : . : .    ",
    "  : . : .   . : . : .   ",
    "   . :   .   :   . :    ",
    "  :   .           .     ",
    "     .       .          ",
    "        .               ",
    "                        "
  ]}
};

PICHI.asciiDisponible = function (key) {
  var a = PICHI.ASCII[key];
  if (!a) return null;
  if (!PICHI.tieneUnlock(a.unlock)) return null;
  return a.lines;
};
