// Animales registrados
let animales = [];
let editarindex = null;

// constantes e referencias
const formAnimal = document.getElementById("formAnimal");
const nombre = document.getElementById("inputNombre");
const especie = document.getElementById("selectEspecie");
const habitat = document.getElementById("selectHabitat");
const alimentacion = document.getElementById("selectAlimentacion");
const tabla = document.getElementById("tablaBody");
const contador = document.getElementById("strongContador");
const btnAgregar = document.getElementById("btnAgregar");

// funcion para calcular el costo mensual
function calcularCosto(tipoAlimentacion) {
    if (tipoAlimentacion === "Herbívoro") {
        return 150;
    } else if (tipoAlimentacion === "Carnívoro") {
        return 300;
    } else { 
        // Omnivoro
        return 220
    }
}

// Listener del formulario
formAnimal.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Que no se recargue la página

    const costo = calcularCosto(alimentacion.value);
    const fecha = new Date().toLocaleDateString(); // Obtenemos la fecha de hoy

    // Creamos el objeto animal
    const datosAnimal = {
        nombre: nombre.value,
        especie: especie.value,
        habitat: habitat.value,
        alimentacion: alimentacion.value,
        costo: costo,
        fecha: fecha
    };

    // Agregamos si es nuevo registro, modificamos si ya existia
    if (editarindex === null) {
        animales.push(datosAnimal);
    } else {
        animales[editarindex] = datosAnimal;
        editarindex = null;
        btnAgregar.textContent = "Agregar";
    }

    // LLenamos la tabla ylimpiamos formularios
    llenarTabla();
    formAnimal.reset();
})

// funcion de llenar la tabla
function llenarTabla() {
    tabla.innerHTML = "";

    animales.forEach(function (a, index) {
        const fila = `
            <tr>
                <td>${a.nombre}</td>
                <td>${a.especie}</td>
                <td>${a.habitat}</td>
                <td>${a.alimentacion}</td>
                <td>$${a.costo}</td>
                <td>${a.fecha}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            </tr>
        `;

        tabla.innerHTML += fila;
    });

    contador.textContent = animales.length;
}

// Listener de la tabla (botones de editar y eliminar)
tabla.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-eliminar")) {
        const index = evento.target.dataset.index;
        animales.splice(index, 1);
        llenarTabla();
    } else if(evento.target.classList.contains("btn-editar")) {
        const index = evento.target.dataset.index;
        const a = animales[index];

        nombre.value = a.nombre;
        especie.value = a.especie;
        habitat.value = a.habitat;
        alimentacion.value = a.alimentacion;

        editarindex = index;
        btnAgregar.textContent = "Guardar cambios";
    }
});