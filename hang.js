//elige palabra y crea array para letras adivinadas
let palabraOculta = prompt("Escribi una palabra")

const letrasAdivinadas = []
const estaLetraYaFueAdivinada = (letra) => letrasAdivinadas.includes(letra) //funcion que te dice si una letra ya se adivino o todavia no
const winSong = document.getElementById("winSong")
//te muestra cuantos caracteres tiene
document.getElementById("cantidadDeLetras").innerHTML = "la palabra tiene " + palabraOculta.length + " letras"

//crea 1 "?" x cada caracter y divide la palabra en caracteres para luego matchear
const head = document.createElement("h1");
head.style.cssText = 'text-align: center;';
document.body.appendChild(head);

const chars = palabraOculta.split(''); // para mostrar array sin comas va .join(' ')
const regex = /[a-z]/gi;

// muestra los caracteres ocultos de la palabra, crea un contador para contar los strikes y un lugar donde aparece el wachin

head.innerText = palabraOculta.replace(regex, '*')
let strikes = 0

let wachin = document.createElement("img");
wachin.style.cssText = ' max-width:10%;';
document.body.appendChild(wachin);

//cuando jugador escribe ve si la letra coincide o no con alguna de las letras de la palabraOculta
document.getElementById("input").onchange = function () {
    const userChar = document.getElementById("input").value
    function checkChar() {
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == userChar.toLowerCase()) {
                return true
            }
        }
    }
    if (checkChar() === true) {   // aca va lo que pasa si acertaste
        letrasAdivinadas.push(userChar)
        head.innerText = chars.map(caracter => estaLetraYaFueAdivinada(caracter) ? caracter : "*").join("")
        if (letrasAdivinadas.join("") === palabraOculta) {

            let win = document.createElement("img");
            win.style.cssText = ' max-width:10%;';
            document.body.appendChild(win);
            win.src = "https://media4.giphy.com/media/SsaGzaI7QEaft8s3HK/giphy.gif?cid=790b7611ff284530e4067afd1cc70a4b122652e7530d7016&rid=giphy.gif&ct=s";
            winSong.volume = 0.2;
            winSong.play();
            function winFunction() {
            setTimeout(function () { location.reload(); }, 3000);
        }
        winFunction()
        }
        
    } else { //aca va lo que pasa si no acertas

        strikes++

        switch (strikes) {
            case 1:
                wachin.src = "https://i.ibb.co/1z2hRwP/1-cara.png";
                document.getElementById('letrasErradas').textContent += userChar;

                break;
            case 2:
                wachin.src = "https://i.ibb.co/jVHzL7G/2-torso.png";
                document.getElementById('letrasErradas').textContent += userChar;
                break;
            case 3:
                wachin.src = "https://i.ibb.co/4m11Tv6/3-brazos.png";
                document.getElementById('letrasErradas').textContent += userChar;
                break;
            case 4:
                wachin.src = "https://i.ibb.co/6tmStks/4-patas.png";
                document.getElementById('letrasErradas').textContent += userChar;
                break;
            case 5:
                wachin.src = "https://i.ibb.co/WgfC3fH/5-soga.png";
                function timeFunction() {
                    setTimeout(function () { alert("perdiste"); location.reload(); }, 800);
                }
                timeFunction()
                break;
        }

    }
    document.getElementById("input").value = ""
}


