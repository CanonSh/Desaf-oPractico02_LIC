// Guarda los registros de los test de velocidad
let tests = [];

// constantes para editar registros
let editarIndex = null;
const btnIngresar = document.getElementById("btnIngresar");

// Constantes del DOM
const formTest = document.getElementById("formTest");
const piloto = document.getElementById("inputPiloto");
const marca = document.getElementById("inputMarca");
const velocidad = document.getElementById("inputVelocidad");
const tabla = document.getElementById("tablaBody")

// función para calcular el resultado según la velociadad
function calcularResultado(velocidad) {
    if (velocidad < 0) {
        return null;
    } else if (velocidad <= 90) {
        return "Velocidad baja";
    } else if (velocidad <= 150) {
        return "Velocidad moderada";
    } else if (velocidad <= 250) {
        return "Velocidad media";
    } else if (velocidad <= 350) {
        return "Velocidad perfecta";
    } else {
        return "Motor reventado";
    }
};

formTest.addEventListener("submit", function (evento) {
    evento.preventDefault(); // la pagina no se recargara

    const velocidadTotal = Number(velocidad.value);

    // Verificamos que la velocidad no sea negativa ni que el valor ingresado no sea un numero
    if (isNaN(velocidadTotal) || velocidadTotal < 0) {
        alert("La velocidad no puede ser negativa, ingresa una velocidad válida");
        return;
    }

    const resultado = calcularResultado(velocidadTotal);

    // Objeto piloto
    const datosPiloto = {
        piloto: piloto.value,
        marca: marca.value,
        velocidad: velocidadTotal,
        resultado: resultado
    };

    if (editarIndex === null) {
        // Agregamos al array
        tests.push(datosPiloto);
    } else {
        // Editamos un registro existente
        tests[editarIndex] = datosPiloto;
        editarIndex = null;
        btnIngresar.textContent = "Agregar";
    }

    //Se llena la tabla
    llenarTabla();

    // Limpiamos el formulario
    formTest.reset();
});

// funcion para llenar la tabla
function llenarTabla() {
    tabla.innerHTML = ""; // Se vacia antes de lenarse

    tests.forEach(function (t, index) {
        const fila = `
            <tr>
                <td>${t.piloto}</td>
                <td>${t.marca}</td>
                <td>${t.velocidad}</td>
                <td>${t.resultado}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
};

// listener para la tabla y sus botones
tabla.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-eliminar")) {
        const index = evento.target.dataset.index;
        tests.splice(index, 1);
        llenarTabla();
    } else if (evento.target.classList.contains("btn-editar")) {
        const index = evento.target.dataset.index;

        // Obtenemos objeto piloto de esa posicion
        const t = tests[index];

        // Llenamos el formulario con los datos del piloto elegido
        piloto.value = t.piloto;
        marca.value = t.marca;
        velocidad.value = t.velocidad;

        editarIndex = index;
        btnIngresar.textContent = "Guardar cambios";
    }
});