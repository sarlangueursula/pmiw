/* El Destino de Pandora
Hecho por Darkko Nair Jorajuria Etchevarne 122739/6 y Seanna Ursula Sarlangue 122892/5
Youtube Ursu:https://youtu.be/E8nro34AR34
Youtube Darkko:https://youtu.be/mq8bYUWPzSk
*/

let pantallaActual = 0;
let imagenes = [];
let musicaDefault;
let musicaFinalBueno;
let musicaFinalMalo;
let sonidoClick;
let musicaActual = null;
let audioIniciado = false;

let pantallas = [
  {
    texto: "Una elección sellará el destino de la humanidad.",
    titulo: "El Destino de Pandora",
    botones: [{texto: "Comenzar", destino: 1}]
  },
  {
    texto: "Los dioses del Olimpo forjaron a Pandora con sus propias manos. Hefesto moldeó su cuerpo de arcilla, Atenea le dio vida y sabiduría, Afrodita le otorgó belleza incomparable. Fue creada como la primera mujer, un regalo... o quizás una trampa para la humanidad.",
    botones: [{texto: "Continuar", destino: 2}]
  },
  {
    texto: "Zeus, el padre de los dioses, desciende con una caja ornamentada. Sus ojos brillan con conocimiento oscuro mientras advierte: 'Jamás la abras, Pandora. Lo que contiene no debe ver la luz'.",
    botones: [{texto: "Aceptar la caja", destino: 3}]
  },
  {
    texto: "Días pasan. Pandora contempla la caja en silencio. Siente su peso, escucha susurros imposibles. Su curiosidad crece como una llama que el tiempo solo aviva.",
    botones: [
      {texto: "Ignorar la caja", destino: 13},
      {texto: "Observar la caja", destino: 4}
    ]
  },
  {
    texto: "La caja parece llamarla. Un brillo oscuro se filtra por sus bordes dorados. Siente el latido de algo vivo dentro, algo que pulsa como un corazón prohibido. Las voces susurran promesas y secretos.",
    botones: [{texto: "Abrir un poco la caja", destino: 5}]
  },
  {
    texto: "La tapa cede. De su interior emergen sombras densas que se deslizan como humo vivo, figuras espectrales que serpentean hacia el cielo con un gemido ancestral.",
    botones: [{texto: "Seguir mirando", destino: 6}]
  },
  {
    texto: "Las sombras toman forma: el Dolor muestra sus garras, la Enfermedad exhala miasma verde, el Hambre abre sus fauces insaciables. Gritos de agonía llenan el aire mientras se alejan hacia el horizonte.",
    botones: [
      {texto: "Tratar de cerrarla", destino: 7},
      {texto: "Dejarla abierta", destino: 8}
    ]
  },
  {
    texto: "Con un esfuerzo desesperado, Pandora fuerza la tapa y la sella con todas sus fuerzas. El sonido del cierre resuena como trueno. Dentro, algo aún late, misterioso y poderoso.",
    botones: [{texto: "Avanzar", destino: 13}]
  },
  {
    texto: "Las sombras se escapan sin control, extendiéndose como tinta sobre un pergamino infinito. El sufrimiento se derrama por cada rincón de la tierra como un río oscuro e imparable.",
    botones: [{texto: "Seguir adelante", destino: 9}]
  },
  {
    texto: "Los hombres luchan entre sí, cegados por la ira y consumidos por el miedo. Hermanos se vuelven enemigos. El caos devora al mundo mientras las ciudades arden bajo cielos ensombrecidos.",
    botones: [{texto: "Avanzar", destino: 10}]
  },
  {
    texto: "Pero en el fondo de la caja, un destello dorado resiste la oscuridad. Es Elpis, la Esperanza, brillando como una estrella solitaria en la noche más profunda.",
    botones: [
      {texto: "Confiar en la Esperanza", destino: 11},
      {texto: "Rendirse al caos", destino: 12}
    ]
  },
  {
    texto: "Aunque los males se esparcieron por el mundo, Pandora sostiene la Esperanza entre sus manos temblorosas. Su luz cálida promete que la humanidad aún puede resistir, aún puede soñar.",
    botones: [{texto: "Avanzar", destino: 13}]
  },
  {
    texto: "Pandora cierra los ojos y deja caer la caja. Los males inundan el mundo sin oposición alguna. La última chispa de esperanza se extingue en la oscuridad eterna.",
    botones: [{texto: "Avanzar", destino: 13}]
  },
  {
    texto: "El eco de tu decisión retumba entre los dioses del Olimpo. El destino de la humanidad ha sido sellado por tus acciones. Las Moiras cortan el hilo del tiempo.",
    botones: [{texto: "Ver destino final", destino: 14}]
  },
  {
    texto: "",
    botones: [{texto: "Volver al inicio", destino: 0}]
  }
];

let rutaTomada = [];

function preload() {
  imagenes[0] = loadImage('assets/imagenes/pandora1.png');
  imagenes[1] = loadImage('assets/imagenes/pandora2.png');
  imagenes[2] = loadImage('assets/imagenes/pandora3.png');
  imagenes[3] = loadImage('assets/imagenes/pandora4.png');
  imagenes[4] = loadImage('assets/imagenes/pandora5.png');
  imagenes[5] = loadImage('assets/imagenes/pandora6.png');
  imagenes[6] = loadImage('assets/imagenes/pandora7.png');
  imagenes[7] = loadImage('assets/imagenes/pandora8.png');
  imagenes[8] = loadImage('assets/imagenes/pandora9.png');
  imagenes[9] = loadImage('assets/imagenes/pandora10.png');
  imagenes[10] = loadImage('assets/imagenes/pandora11.png');
  imagenes[11] = loadImage('assets/imagenes/pandora12.png');
  imagenes[12] = loadImage('assets/imagenes/pandora13.png');
  imagenes[13] = loadImage('assets/imagenes/pandora14.png');
  
  sonidoClick = loadSound('Boton.mp3');
  musicaDefault = loadSound('Fondo.mp3');
  musicaFinalBueno = loadSound('FinalBueno.mp3');
  musicaFinalMalo = loadSound('FinalMalo.mp3');
}

function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
}

function draw() {
  background(20, 15, 35);
  
  if (pantallaActual >= 0 && pantallaActual <= 13) {
    mostrarImagen(pantallaActual);
  }
  
  if (pantallaActual === 0) {
    mostrarInicio();
  } else if (pantallaActual === 14) {
    mostrarFinales();
  } else if (pantallaActual === 15) {
    mostrarCreditos();
  } else {
    mostrarPantallaHistoria();
  }
}

function mostrarImagen(indice) {
  if (imagenes[indice]) {
    imageMode(CORNER);
    image(imagenes[indice], 0, 0, width, height);
  }
}

function mostrarInicio() {
  fill(200, 200, 220);
  textSize(18);
  textStyle(NORMAL);
  text(pantallas[0].texto, width/2, height - 120);
  
  dibujarBoton(width/2, height - 70, 200, 50, pantallas[0].botones[0]);
}

function mostrarPantallaHistoria() {
  let datos = pantallas[pantallaActual];
  
  fill(0, 0, 0, 200);
  rect(0, height * 0.55, width, height * 0.45);
  
  fill(255, 250, 240);
  textSize(16);
  textStyle(NORMAL);
  let margen = 40;
  text(datos.texto, margen, height * 0.62, width - margen * 2, height * 0.25);
  
  let numBotones = datos.botones.length;
  if (numBotones === 1) {
    dibujarBoton(width/2, height - 40, 180, 45, datos.botones[0]);
  } else if (numBotones === 2) {
    dibujarBoton(width/2 - 110, height - 40, 180, 45, datos.botones[0]);
    dibujarBoton(width/2 + 110, height - 40, 180, 45, datos.botones[1]);
  }
}

function mostrarFinales() {
  let textoFinal = "";
  let tituloFinal = "";
  let esFinalBueno = false;
  
  if (rutaTomada.includes(7)) {
    tituloFinal = "FINAL: LA RESISTENCIA";
    textoFinal = "Pandora nunca permitió que todos los males escaparan. La caja permanece sellada, y aunque los dioses la observan con desconfianza, el mundo fue salvado... por ahora. Tu prudencia ha preservado la paz.";
    fill(138, 98, 180);
    esFinalBueno = true;
  } else if (rutaTomada.includes(12)) {
    tituloFinal = "FINAL: LA RUINA ETERNA";
    textoFinal = "La humanidad queda condenada a sufrir eternamente. El caos reina sin oposición, y Pandora es recordada como la portadora de la ruina absoluta. La esperanza ha muerto.";
    fill(200, 50, 50);
    esFinalBueno = false;
  } else if (rutaTomada.includes(11)) {
    tituloFinal = "FINAL: LA ESPERANZA PERSISTE";
    textoFinal = "Los males caminan por la tierra sembrando dolor, pero la chispa de la Esperanza que Pandora preservó guía a los hombres a resistir, a luchar, a sobrevivir. Mientras exista esperanza, existe futuro.";
    fill(138, 98, 180);
    esFinalBueno = true;
  } else {
    tituloFinal = "FINAL: LA SABIDURÍA";
    textoFinal = "Pandora resistió la tentación desde el principio. La caja permanece intacta, los males atrapados por la eternidad. El mundo continúa en paz, ignorante del destino que evitaste.";
    fill(138, 98, 180);
    esFinalBueno = true;
  }
  
  cambiarMusicaFinal(esFinalBueno);
  
  background(20, 15, 35);
  
  textSize(36);
  textStyle(BOLD);
  text(tituloFinal, width/2, 100);
  
  fill(255, 250, 240);
  textSize(18);
  textStyle(NORMAL);
  text(textoFinal, 60, 170, width - 120, 180);
  
  dibujarBoton(width/2, height - 80, 200, 50, pantallas[14].botones[0]);
  
  dibujarBotonSimple(width/2, height - 20, 120, 30, "Créditos");
}

function mostrarCreditos() {
  background(20, 15, 35);
  
  fill(180, 130, 220);
  textSize(36);
  textStyle(BOLD);
  text("CRÉDITOS", width/2, 60);
  
  fill(255, 250, 240);
  textSize(18);
  textStyle(NORMAL);
  text("Aventura Gráfica Interactiva", width/2, 110);
  text("Programación para medios interactivos orientada a las tecnologías web - 2025", width/2, 140);
  
  stroke(138, 98, 180);
  strokeWeight(2);
  line(170, 165, 470, 165);
  noStroke();
  
  textSize(16);
  fill(180, 130, 220);
  text("Desarrollado por:", width/2, 200);
  
  fill(255, 250, 240);
  textSize(15);
  text("Darkko Nair Jorajuria Etchevarne - Legajo: 122739/6", width/2, 235);
  text("Seanna Ursula Sarlangue - Legajo: 122892/5", width/2, 265);
  
  fill(180, 130, 220);
  textSize(16);
  text("Comisión:", width/2, 310);
  
  fill(255, 250, 240);
  textSize(15);
  text("Comisión 3 - Profesor: David Bedoian", width/2, 340);
  
  stroke(138, 98, 180);
  strokeWeight(2);
  line(170, 365, 470, 365);
  noStroke();
  
  fill(180, 130, 220);
  textSize(16);
  text("Basado en:", width/2, 395);
  
  fill(255, 250, 240);
  textSize(15);
  text("El Mito de Pandora - Mitología Griega", width/2, 425);
  
  dibujarBoton(width/2, height - 30, 180, 45, {texto: "Volver", destino: 14});
}

function dibujarBoton(x, y, w, h, botonData) {
  let hover = mouseX > x - w/2 && mouseX < x + w/2 && 
              mouseY > y - h/2 && mouseY < y + h/2;
  
  fill(0, 0, 0, 100);
  rect(x - w/2 + 3, y - h/2 + 3, w, h, 8);
  
  if (hover) {
    fill(180, 130, 220);
  } else {
    fill(138, 98, 180);
  }
  rect(x - w/2, y - h/2, w, h, 8);
  
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text(botonData.texto, x, y);
}

function dibujarBotonSimple(x, y, w, h, texto) {
  let hover = mouseX > x - w/2 && mouseX < x + w/2 && 
              mouseY > y - h/2 && mouseY < y + h/2;
  
  if (hover) {
    fill(180, 130, 220);
  } else {
    fill(138, 98, 180);
  }
  rect(x - w/2, y - h/2, w, h, 5);
  
  fill(255);
  textSize(12);
  text(texto, x, y);
}

function mousePressed() {
  if (!audioIniciado) {
    userStartAudio();
    audioIniciado = true;
    
    if (musicaDefault && !musicaDefault.isPlaying()) {
      musicaDefault.loop();
      musicaDefault.setVolume(0.3);
      musicaActual = musicaDefault;
    }
  }
  
  if (pantallaActual === 0) {
    if (verificarClick(width/2, height - 70, 200, 50)) {
      cambiarPantalla(pantallas[0].botones[0].destino);
    }
  } else if (pantallaActual === 14) {
    if (verificarClick(width/2, height - 80, 200, 50)) {
      reiniciarJuego();
    }
    if (verificarClick(width/2, height - 20, 120, 30)) {
      pantallaActual = 15;
    }
  } else if (pantallaActual === 15) {
    if (verificarClick(width/2, height - 30, 180, 45)) {
      pantallaActual = 14;
    }
  } else {
    let datos = pantallas[pantallaActual];
    if (datos.botones.length === 1) {
      if (verificarClick(width/2, height - 40, 180, 45)) {
        cambiarPantalla(datos.botones[0].destino);
      }
    } else if (datos.botones.length === 2) {
      if (verificarClick(width/2 - 110, height - 40, 180, 45)) {
        cambiarPantalla(datos.botones[0].destino);
      }
      if (verificarClick(width/2 + 110, height - 40, 180, 45)) {
        cambiarPantalla(datos.botones[1].destino);
      }
    }
  }
}

function verificarClick(x, y, w, h) {
  return mouseX > x - w/2 && mouseX < x + w/2 && 
         mouseY > y - h/2 && mouseY < y + h/2;
}

function cambiarPantalla(nuevaPantalla) {
  rutaTomada.push(pantallaActual);
  pantallaActual = nuevaPantalla;
  
  if (sonidoClick && sonidoClick.isLoaded()) {
    sonidoClick.play();
  }
}

function reiniciarJuego() {
  pantallaActual = 0;
  rutaTomada = [];
  
  detenerTodasLasMusicas();
  if (musicaDefault && !musicaDefault.isPlaying()) {
    musicaDefault.loop();
    musicaDefault.setVolume(0.3);
    musicaActual = musicaDefault;
  }
}

function cambiarMusicaFinal(esBueno) {
  detenerTodasLasMusicas();
  
  if (esBueno && musicaFinalBueno && musicaFinalBueno.isLoaded()) {
    musicaFinalBueno.loop();
    musicaFinalBueno.setVolume(0.3);
    musicaActual = musicaFinalBueno;
  } else if (!esBueno && musicaFinalMalo && musicaFinalMalo.isLoaded()) {
    musicaFinalMalo.loop();
    musicaFinalMalo.setVolume(0.3);
    musicaActual = musicaFinalMalo;
  }
}

function detenerTodasLasMusicas() {
  if (musicaDefault && musicaDefault.isPlaying()) {
    musicaDefault.stop();
  }
  if (musicaFinalBueno && musicaFinalBueno.isPlaying()) {
    musicaFinalBueno.stop();
  }
  if (musicaFinalMalo && musicaFinalMalo.isPlaying()) {
    musicaFinalMalo.stop();
  }
}
