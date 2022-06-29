let palabraOculta = "";

if (!window.location.search) {
  while (palabraOculta == "") {
    palabraOculta = prompt("Escribi una palabra");
  }
  ocultar("label");

} else {
  palabraOculta = atob(window.location.search.replace("?", ""));
  ocultar("modoAdivinar");
  ocultar("palabraDevelada")
}
document.getElementById("palabraDevelada").innerText = "La palabra es: " + palabraOculta

const newUrl = window.location.href + "?" + btoa(palabraOculta);

const letrasAdivinadas = [];
const estaLetraYaFueAdivinada = (letra) => letrasAdivinadas.includes(letra);

const winSong = document.getElementById("winSong");

document.getElementById("cantidadDeLetras").innerHTML =
  "la palabra tiene " + palabraOculta.length + " letras";

const palabraOcultaDisplay = document.getElementById("palabraOcultaDisplay");

const caracteresPalabraOculta = palabraOculta.toLowerCase().split("");
const regex = /[a-z]/gi;
let strikes = 0;

let wachin = document.getElementById("img");
function ocultar(cosa) {
  document.getElementById(cosa).style.display = "none";
}
function modoAdivinar() {
  window.open(newUrl);
}

function setPalabraOcultaDisplay(text) {
  palabraOcultaDisplay.innerText = text;
}
function reloadPage() {
  window.open(window.location.pathname, "_self");
}
setPalabraOcultaDisplay(palabraOculta.replace(regex, "*"));
function winFunction() {
  setTimeout(function () {
    reloadPage();
  }, 3000);
}
function procesarLetraAdivinada(userChar) {
  letrasAdivinadas.push(userChar);
  setPalabraOcultaDisplay(
    caracteresPalabraOculta
      .map((caracter) => (estaLetraYaFueAdivinada(caracter) ? caracter : "*"))
      .join("")
  );
  if (palabraOcultaDisplay.innerText === caracteresPalabraOculta.join("")) {
    let win = document.createElement("img");
    win.style.cssText = " max-width:10%;";
    document.body.appendChild(win);
    win.src =
      "https://media4.giphy.com/media/SsaGzaI7QEaft8s3HK/giphy.gif?cid=790b7611ff284530e4067afd1cc70a4b122652e7530d7016&rid=giphy.gif&ct=s";
    winSong.volume = 0.2;
    winSong.play();

    winFunction();
  }
}
function looseFunction() {
  setTimeout(function () {
    alert("La palabra era " + palabraOculta);
    reloadPage();
  }, 800);
}
function procesarLetraErrada(userChar) {
  strikes++;

  switch (strikes) {
    case 1:
      wachin.src = "https://i.imgur.com/KbeRPVw.png";
      document.getElementById("letrasErradas").textContent += userChar;

      break;
    case 2:
      wachin.src = "https://i.imgur.com/t0fZfcT.png";
      document.getElementById("letrasErradas").textContent += userChar;
      break;
    case 3:
      wachin.src = "https://i.imgur.com/bz0lL9y.png";
      document.getElementById("letrasErradas").textContent += userChar;
      break;
    case 4:
      wachin.src = "https://i.imgur.com/qIBhe5c.png";
      document.getElementById("letrasErradas").textContent += userChar;
      break;
    case 5:
      wachin.src = "https://i.imgur.com/DCk0cDV.png";

      looseFunction();
      break;
  }
}
function getUserChar() {
  return document.getElementById("input").value.toLowerCase();
}
function cleanUserChar() {
  document.getElementById("input").value = "";
}

document.getElementById("input").onchange = function () {
  const userChar = getUserChar();
  const adivinoLaLetra = caracteresPalabraOculta.includes(userChar);

  if (adivinoLaLetra) {
    procesarLetraAdivinada(userChar);
  } else {
    procesarLetraErrada(userChar);
  }
  cleanUserChar();
};
