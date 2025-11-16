/* Pandora: Los Males Desatados
Hecho por Darkko Nair Jorajuria Etchevarne 122739/6 y Seanna Ursula Sarlangue 122892/5
Youtube Ursu: https://youtu.be/MpoqVf86bjw
Youtube Darkko:
*/

class Juego {
  constructor() {
    this.puntos = 0;
    this.tiempoInicio = 0;
    this.tiempoLimite = 60;
    this.objetivoPuntos = 30;
    
    this.jugador = null;
    this.objetosBuenos = [];
    this.objetosMalos = [];
    
    this.pantallas = {
      menu: new PantallaMenu(this),
      jugando: new PantallaJugando(this),
      ganado: new PantallaGanado(this),
      perdido: new PantallaPerdido(this),
      creditos: new PantallaCreditos(this)
    };
    
    this.estadoActual = "menu";
  }
  
  iniciar() {
    this.jugador = new Jugador();
    this.tiempoInicio = millis();
    this.puntos = 0;
    this.objetosBuenos = [];
    this.objetosMalos = [];
    this.estadoActual = "jugando";
  }
  
  reiniciar() {
    this.iniciar();
  }
  
  cambiarEstado(nuevoEstado) {
    this.estadoActual = nuevoEstado;
  }
  
  actualizar() {
    this.pantallas[this.estadoActual].actualizar();
  }
  
  dibujar() {
    this.pantallas[this.estadoActual].dibujar();
  }
  
  manejarTecla(key) {
    this.pantallas[this.estadoActual].manejarTecla(key);
  }
}


class Pantalla {
  constructor(juego) {
    this.juego = juego;
  }
  
  actualizar() {}
  dibujar() {}
  manejarTecla(key) {}
}


class PantallaMenu extends Pantalla {
  dibujar() {
    if (gestorAssets.imagenes.fondo) {
      image(gestorAssets.imagenes.fondo, 0, 0, width, height);
      fill(0, 0, 0, 180);
      rect(0, 0, width, height);
    } else {
      background(20, 30, 60);
    }
    
    textAlign(CENTER, CENTER);
    noStroke();
    
    fill(0, 0, 0, 150);
    textSize(32);
    text("Pandora: Los Males Desatados", width/2 + 2, 82);
    
    fill(255, 215, 0);
    textSize(32);
    text("Pandora: Los Males Desatados", width/2, 80);
    
    fill(255);
    textSize(18);
    text("Absorbe 30 espiritus malignos en 60 segundos", width/2, 180);
    text("Evita los espiritus buenos que te quitan puntos", width/2, 210);
    
    fill(200, 255, 200);
    textSize(16);
    text("Usar FLECHAS para moverse", width/2, 260);
    
    if (!gestorAssets.cargaCompleta) {
      fill(255, 255, 100);
      textSize(18);
      text("Cargando imagenes...", width/2, 330);
    } else {
      fill(100, 200, 100);
      rect(width/2 - 100, 310, 200, 40, 10);
      fill(0);
      textSize(20);
      text("ESPACIO - Jugar", width/2, 330);
      
      fill(100, 100, 200);
      rect(width/2 - 100, 360, 200, 40, 10);
      fill(0);
      text("C - Creditos", width/2, 380);
    }
  }
  
  manejarTecla(key) {
    if (key === ' ' && gestorAssets.cargaCompleta) {
      this.juego.iniciar();
    } else if (key === 'c' || key === 'C') {
      this.juego.cambiarEstado("creditos");
    }
  }
}


class PantallaCreditos extends Pantalla {
  dibujar() {
    background(30, 20, 50);
    
    fill(255, 200, 50);
    textAlign(CENTER);
    textSize(40);
    text("CREDITOS", width/2, 80);
    
    fill(255);
    textSize(18);
    text("Trabajo Final - Programacion Orientada a Objetos", width/2, 240);
    text("Basado en el mito de la Caja de Pandora", width/2, 270);
    
    textSize(16);
    fill(200);
    text("Ursula Sarlangue", width/2, 320);
    text("Darkko Nair Jorajuria Etchevarne", width/2, 345);
    text("PMIW 2025: TpFinal2", width/2, 370);
    
    fill(255, 100, 100);
    textSize(18);
    text("Presiona ESC para volver al menu", width/2, 430);
  }
  
  manejarTecla(key) {
    if (keyCode === ESCAPE || key === ' ') {
      this.juego.cambiarEstado("menu");
    }
  }
}


class PantallaJugando extends Pantalla {
  actualizar() {
    let tiempoTranscurrido = (millis() - this.juego.tiempoInicio) / 1000;
    let tiempoRestante = this.juego.tiempoLimite - tiempoTranscurrido;
    
    if (this.juego.puntos >= this.juego.objetivoPuntos) {
      this.juego.cambiarEstado("ganado");
      return;
    }
    
    if (tiempoRestante <= 0) {
      this.juego.cambiarEstado("perdido");
      return;
    }
    
    let frecuencia = 60 - Math.floor(tiempoTranscurrido * 0.5);
    frecuencia = max(30, frecuencia);
    
    if (frameCount % frecuencia === 0) {
      if (random(1) > 0.3) {
        this.juego.objetosMalos.push(new ObjetoMalo());
      } else {
        this.juego.objetosBuenos.push(new ObjetoBueno());
      }
    }
    
    for (let i = this.juego.objetosBuenos.length - 1; i >= 0; i--) {
      this.juego.objetosBuenos[i].actualizar();
      
      if (this.juego.objetosBuenos[i].colisiona(this.juego.jugador)) {
        this.juego.puntos = max(0, this.juego.puntos - 1);
        this.juego.objetosBuenos.splice(i, 1);
      } else if (this.juego.objetosBuenos[i].fueraDePantalla()) {
        this.juego.objetosBuenos.splice(i, 1);
      }
    }
    
    for (let i = this.juego.objetosMalos.length - 1; i >= 0; i--) {
      this.juego.objetosMalos[i].actualizar();
      
      if (this.juego.objetosMalos[i].colisiona(this.juego.jugador)) {
        this.juego.puntos++;
        this.juego.objetosMalos.splice(i, 1);
      } else if (this.juego.objetosMalos[i].fueraDePantalla()) {
        this.juego.objetosMalos.splice(i, 1);
      }
    }
    
    this.juego.jugador.actualizar();
  }
  
  dibujar() {
    if (gestorAssets.imagenes.fondo) {
      imageMode(CORNER);
      image(gestorAssets.imagenes.fondo, 0, 0, width, height);
    } else {
      background(135, 206, 235);
    }
    
    let tiempoTranscurrido = (millis() - this.juego.tiempoInicio) / 1000;
    let tiempoRestante = this.juego.tiempoLimite - tiempoTranscurrido;
    
    for (let obj of this.juego.objetosBuenos) {
      obj.dibujar();
    }
    
    for (let obj of this.juego.objetosMalos) {
      obj.dibujar();
    }
    
    this.juego.jugador.dibujar();
    this.dibujarHUD(tiempoRestante);
  }
  
  dibujarHUD(tiempoRestante) {
    fill(0, 0, 0, 150);
    noStroke();
    rect(5, 5, 320, 75, 10);
    
    fill(255);
    textAlign(LEFT);
    textSize(18);
    text("Espiritus malignos atrapados: " + this.juego.puntos + "/" + this.juego.objetivoPuntos, 15, 30);
    
    if (tiempoRestante < 10) {
      fill(255, 100, 100);
    } else {
      fill(255);
    }
    text("Tiempo restante: " + Math.ceil(tiempoRestante) + "s", 15, 60);
  }
  
  manejarTecla(key) {
    if (key === 'r' || key === 'R') {
      this.juego.reiniciar();
    }
  }
}


class PantallaGanado extends Pantalla {
  dibujar() {
    if (gestorAssets.imagenes.fondo) {
      image(gestorAssets.imagenes.fondo, 0, 0, width, height);
      fill(50, 200, 50, 200);
      rect(0, 0, width, height);
    } else {
      background(50, 200, 50);
    }
    
    fill(0, 150);
    textAlign(CENTER);
    textSize(52);
    text("VICTORIA", width/2 + 3, height/2 - 47);
    
    fill(255, 255, 100);
    textSize(50);
    text("VICTORIA", width/2, height/2 - 50);
    
    fill(255);
    textSize(24);
    text("Conseguiste atrapar " + this.juego.puntos + " espiritus malignos", width/2, height/2 + 20);
    text("Has logrado sellar los males de Pandora", width/2, height/2 + 60);
    
    fill(200, 255, 200);
    textSize(18);
    text("Presiona ESPACIO para volver a jugar", width/2, height - 60);
    text("Presiona ESC para volver al menu", width/2, height - 30);
  }
  
  manejarTecla(key) {
    if (key === ' ') {
      this.juego.reiniciar();
    } else if (keyCode === ESCAPE) {
      this.juego.cambiarEstado("menu");
    }
  }
}


class PantallaPerdido extends Pantalla {
  dibujar() {
    if (gestorAssets.imagenes.fondo) {
      image(gestorAssets.imagenes.fondo, 0, 0, width, height);
      fill(100, 50, 50, 200);
      rect(0, 0, width, height);
    } else {
      background(100, 50, 50);
    }
    
    fill(0, 150);
    textAlign(CENTER);
    textSize(52);
    text("DERROTA", width/2 + 3, height/2 - 47);
    
    fill(255, 100, 100);
    textSize(50);
    text("DERROTA", width/2, height/2 - 50);
    
    fill(255);
    textSize(24);
    text("Solo conseguiste atrapar " + this.juego.puntos + "/" + this.juego.objetivoPuntos + " espiritus", width/2, height/2 + 20);
    text("El caos ha reclamado su dominio sobre el mundo", width/2, height/2 + 60);
    
    fill(255, 200, 200);
    textSize(18);
    text("Presiona ESPACIO para intentarlo de nuevo", width/2, height - 60);
    text("Presiona ESC para volver al menu", width/2, height - 30);
  }
  
  manejarTecla(key) {
    if (key === ' ') {
      this.juego.reiniciar();
    } else if (keyCode === ESCAPE) {
      this.juego.cambiarEstado("menu");
    }
  }
}


class Jugador {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.ancho = 200;
    this.alto = 175;
    this.velocidad = 6;
  }
  
  actualizar() {
    this.mover();
  }
  
  mover() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidad;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidad;
    }
    
    this.x = constrain(this.x, this.ancho/2, width - this.ancho/2);
  }
  
  dibujar() {
    if (gestorAssets.imagenes.jugador) {
      imageMode(CENTER);
      image(gestorAssets.imagenes.jugador, this.x, this.y, this.ancho, this.alto);
      imageMode(CORNER);
    } else {
      fill(255, 215, 0);
      stroke(180, 140, 0);
      strokeWeight(3);
      rectMode(CENTER);
      rect(this.x, this.y, this.ancho, this.alto, 5);
      rectMode(CORNER);
      strokeWeight(1);
    }
  }
  
  obtenerLimites() {
    return {
      izquierda: this.x - this.ancho/2,
      derecha: this.x + this.ancho/2,
      arriba: this.y - this.alto/2,
      abajo: this.y + this.alto/2
    };
  }
}


class ObjetoBueno {
  constructor() {
    this.x = random(30, width - 30);
    this.y = -20;
    this.tamaño = 30;
    this.velocidad = random(2, 3);
  }
  
  actualizar() {
    this.caer();
  }
  
  caer() {
    this.y += this.velocidad;
  }
  
  dibujar() {
    if (gestorAssets.imagenes.bueno) {
      imageMode(CENTER);
      image(gestorAssets.imagenes.bueno, this.x, this.y, this.tamaño * 2, this.tamaño * 2);
      imageMode(CORNER);
    } else {
      fill(100, 200, 255);
      stroke(50, 150, 255);
      strokeWeight(2);
      ellipse(this.x, this.y, this.tamaño * 2, this.tamaño * 2);
      strokeWeight(1);
    }
  }
  
  colisiona(jugador) {
    let limites = jugador.obtenerLimites();
    return this.x > limites.izquierda && 
           this.x < limites.derecha && 
           this.y > limites.arriba && 
           this.y < limites.abajo;
  }
  
  fueraDePantalla() {
    return this.y > height + 20;
  }
}


class ObjetoMalo {
  constructor() {
    this.x = random(30, width - 30);
    this.y = -20;
    this.tamaño = 30;
    this.velocidad = random(2.5, 3.5);
  }
  
  actualizar() {
    this.caer();
  }
  
  caer() {
    this.y += this.velocidad;
  }
  
  dibujar() {
    if (gestorAssets.imagenes.malo) {
      imageMode(CENTER);
      image(gestorAssets.imagenes.malo, this.x, this.y, this.tamaño * 2, this.tamaño * 2);
      imageMode(CORNER);
    } else {
      fill(200, 0, 0);
      stroke(150, 0, 0);
      strokeWeight(2);
      ellipse(this.x, this.y, this.tamaño * 2, this.tamaño * 2);
      strokeWeight(1);
    }
  }
  
  colisiona(jugador) {
    let limites = jugador.obtenerLimites();
    return this.x > limites.izquierda && 
           this.x < limites.derecha && 
           this.y > limites.arriba && 
           this.y < limites.abajo;
  }
  
  fueraDePantalla() {
    return this.y > height + 20;
  }
}


class Assets {
  constructor() {
    this.imagenes = {};
    this.cargaCompleta = false;
  }
  
  cargarImagenes() {
    this.imagenes.fondo = loadImage('assets/fondo.png', () => this.verificarCarga());
    this.imagenes.jugador = loadImage('assets/pandoraplayer.png', () => this.verificarCarga());
    this.imagenes.bueno = loadImage('assets/cosobueno.png', () => this.verificarCarga());
    this.imagenes.malo = loadImage('assets/cosomalo.png', () => this.verificarCarga());
  }
  
  verificarCarga() {
    let todasCargadas = true;
    for (let key in this.imagenes) {
      if (!this.imagenes[key] || this.imagenes[key].width === 0) {
        todasCargadas = false;
        break;
      }
    }
    this.cargaCompleta = todasCargadas;
  }
}


let juego;
let gestorAssets;

function preload() {
  gestorAssets = new Assets();
  gestorAssets.cargarImagenes();
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function keyPressed() {
  juego.manejarTecla(key);
}