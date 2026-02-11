// LISTA DE SABORES (elementos del algoritmo)
const sabores = [
    { nombre: "Chocolate", puntos: 0 },
    { nombre: "Vainilla", puntos: 0 },
    { nombre: "Fresa", puntos: 0 },
    { nombre: "Pistacho", puntos: 0 },
    { nombre: "Dulce de leche", puntos: 0 },
    { nombre: "Cookies & Cream", puntos: 0 },
    { nombre: "Mango", puntos: 0 },
    { nombre: "Limón", puntos: 0 },
    { nombre: "Caramelo salado", puntos: 0 },
    { nombre: "Café", puntos: 0 }
];

let comparaciones = 0;
const maxComparaciones = 25;

// ELEMENTOS DEL DOM
const botonA = document.getElementById("optionA");
const botonB = document.getElementById("optionB");
const rankingContainer = document.getElementById("ranking-container");
const rankingList = document.getElementById("ranking-list");
const comparisonContainer = document.getElementById("comparison-container");
const restartBtn = document.getElementById("restart-btn");

// FUNCIÓN PARA OBTENER DOS SABORES DIFERENTES
function obtenerSaboresAleatorios() {
    const indiceA = Math.floor(Math.random() * sabores.length);
    let indiceB = Math.floor(Math.random() * sabores.length);

    while (indiceA === indiceB) {
        indiceB = Math.floor(Math.random() * sabores.length);
    }

    return [sabores[indiceA], sabores[indiceB]];
}

// MOSTRAR COMPARACIÓN A/B
function mostrarComparacion() {
    if (comparaciones >= maxComparaciones) {
        mostrarRanking();
        return;
    }

    const [saborA, saborB] = obtenerSaboresAleatorios();

    botonA.textContent = saborA.nombre;
    botonB.textContent = saborB.nombre;

    botonA.onclick = () => votar(saborA);
    botonB.onclick = () => votar(saborB);
}

// SUMAR PUNTO AL ELEGIDO
function votar(saborSeleccionado) {
    saborSeleccionado.puntos++;
    comparaciones++;
    mostrarComparacion();
}

// MOSTRAR RANKING FINAL
function mostrarRanking() {
    comparisonContainer.style.display = "none";
    rankingContainer.style.display = "block";

    sabores.sort((a, b) => b.puntos - a.puntos);

    rankingList.innerHTML = "";

    sabores.forEach(sabor => {
        const li = document.createElement("li");
        li.textContent = `${sabor.nombre} - ${sabor.puntos} puntos`;
        rankingList.appendChild(li);
    });
}

// REINICIAR ALGORITMO
function reiniciar() {
    sabores.forEach(sabor => sabor.puntos = 0);
    comparaciones = 0;
    rankingContainer.style.display = "none";
    comparisonContainer.style.display = "block";
    mostrarComparacion();
}

restartBtn.addEventListener("click", reiniciar);

// INICIAR
mostrarComparacion();
