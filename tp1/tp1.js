/* Seanna Ursula Sarlangue 
https://youtu.be/b7_eZuU-UKE
*/
let art;
let coloresRandom = false;
let filas = 6;
let columnas = 6;
let cuadrado = 65;
let pasoX = cuadrado + 1;
let pasoY = cuadrado + 1;
let filaMovil = -1;
let columnaMovil = -1;
let desplazamientoX = 0;
let desplazamientoY = 0;

function preload() {
  art = loadImage('https://i.imgur.com/h65YQ5q.jpeg');
}

function setup() {
  createCanvas(800, 400);
  art.resize(width / 2, height);
}

function draw() {
  background(255);
  image(art, 0, 0);
  
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      let x0 = 400 + i * pasoX;
      let y0 = j * pasoY;
      
      if (j === filaMovil && i === columnaMovil && mouseIsPressed) {
        x0 = mouseX - desplazamientoX;
        y0 = mouseY - desplazamientoY;
      }
      
      mostrarCuadrados(x0, y0, coloresRandom);
    }
  }
}

function mostrarCuadrados(x, y, colores) {
  let tamañoBase = 68;
  let cantidad = 5;    
  let paso = 9;     
  
  for (let i = 0; i < cantidad; i++) {
    let t = tamañoBase - i * paso;
    
    if (colores) {
      let intensidad = calcularDistancia(x, y, width / 2, height / 2);
      let r = map(intensidad, 0, 255, 100, 255);
      let g = map(y, 0, height, 100, 200);
      let b = map(x, 400, width, 200, 100);
      fill(r, g, b);
    } else {
      fill(255);
    }
    
    stroke(0);
    strokeWeight(2.5);
    rect(x, y, t, t);
  }
}

function calcularDistancia(x1, y1, x2, y2) {
  let distancia = dist(x1, y1, x2, y2);
  return map(distancia, 0, width, 0, 255);
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    coloresRandom = true;
  }
  if (key === 'r' || key === 'R') {
    coloresRandom = false;
  }
}

function mousePressed() {
  let tamañoBase = 68;
  
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      let x0 = 400 + i * pasoX;
      let y0 = j * pasoY;
      
      if (mouseX > x0 && mouseX < x0 + tamañoBase &&
          mouseY > y0 && mouseY < y0 + tamañoBase) {
        filaMovil = j;
        columnaMovil = i;
        desplazamientoX = mouseX - x0;
        desplazamientoY = mouseY - y0;
        return;
      }
    }
  }
}

function mouseReleased() {
  filaMovil = -1;
  columnaMovil = -1;
}
