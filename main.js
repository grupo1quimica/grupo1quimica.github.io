// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 160;
let tiempoRegresivoId = null;
let timerInicial = 160;

// Apuntando a elementos del documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let tablero = document.getElementById("tablero");

// Generación de números aleatorios
let numeros = ["h", 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i < 36; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal
function destapar(id) {
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas === 1) {
        // Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;

        // Deshabilitar primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        // Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            // Reiniciar contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 18) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantástico! 🥳 solo demoraste ${
                    timerInicial - timer
                } segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
            }
        } else {
            // Mostrar temporalmente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

// Creación del tablero
for (let i = 0; i < 6; i++) {
    let fila = document.createElement("div");
    fila.classList.add("fila");
    for (let j = 0; j < 6; j++) {
        let tarjeta = document.createElement("button");
        tarjeta.classList.add("tarjeta");
        tarjeta.id = i * 6 + j; // ID único para cada tarjeta
        tarjeta.innerHTML = `<img src="./images/cover.png" alt="">`;
        tarjeta.addEventListener("click", () => destapar(tarjeta.id));
        fila.appendChild(tarjeta);
    }
    tablero.appendChild(fila);
}