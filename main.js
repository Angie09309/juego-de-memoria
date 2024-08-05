let tarjeasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');


//apuntando a documento HTML
let mostarMovimientos = document.getElementById('movimientos');
let mostarAciertos = document.getElementById('aciertos');
let mostarTiempo = document.getElementById('t-restante');

//generador de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numeros = numeros.sort(() => { return Math.random() - 0.5 })
console.log(numeros)

//funciones 
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas()
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = ` <img src="./img/${numeros[i]}.png" alt="">`;

        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo()
        temporizador = true;
    }

    tarjeasDestapadas++;
    if (tarjeasDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = ` <img src="./img/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar primer boton
        tarjeta1.ariaDisabled = true;
    } else if (tarjeasDestapadas == 2) {
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = ` <img src="./img/${segundoResultado}.png" alt="">`;


        //Deshabilitar primer boton
        tarjeta2.ariaDisabled = true;

        //indremetar movimientos
        movimientos++;
        mostarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            // enecerra contador tarjetas destapadas
            tarjeasDestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if (aciertos == 8) {
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostarTiempo.innerHTML = `Solamente demoraste ${timerInicial - timer} segundos`;
                mostarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

            }


        } else {
            wrongAudio.play();
            //mostara valores y volver a tapar   
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.ariaDisabled = false;
                tarjeta2.ariaDisabled = false;
                tarjeasDestapadas = 0;
            }, 800)
        }
    }
}