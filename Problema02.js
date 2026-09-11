// Arreglo para almacenar el registro de clientes atendidos
const listaClientes = [];

// Precios oficiales del combustible
const PRECIOS = {
  especial: 3.78,
  regular: 3.64,
  diesel: 3.43,
};

// Capturar el formulario del DOM
const formulario = document.getElementById("formGasolinera");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Evitar que se envie el form y se recargue la pagina

  // Obtener los valores ingresados por el usuario
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const marca = document.getElementById("marca").value;
  const tipoVehiculo = document.getElementById("tipoVehiculo").value;
  const tipoCombustible = document.getElementById("tipoCombustible").value;
  const galones = parseFloat(document.getElementById("galones").value);

  // 2. Validado de restricciones  (sedan no puede diesel, camion solo diesel)
  if (tipoVehiculo === "sedan" && tipoCombustible === "diesel") {
    alert("Aviso: Un vehiculo tipo Sedan no puede tanquear diesel.");
    return;
  }
  if (tipoVehiculo === "camion" && tipoCombustible !== "diesel") {
    alert("Aviso: Un vehiculo tipo Camion solo puede tanquear diesel.");
    return;
  }

  // Calcular venta total
  const precioUnitario = PRECIOS[tipoCombustible];
  const ventaTotal = galones * precioUnitario;
  const fechaActual = new Date();

  //  Crear el objeto cliente
  const nuevoCliente = {
    nombre: nombre,
    correo: correo,
    vehiculo: {
      marca: marca,
      tipo: tipoVehiculo,
    },
    compra: {
      combustible: tipoCombustible,
      galones: galones,
      total: ventaTotal,
    },
    fecha:
      fechaActual.toLocaleDateString() + " " + fechaActual.toLocaleTimeString(),
  };

  // Agregar el objeto al arreglo
  listaClientes.push(nuevoCliente);

  // Mostrar resultados en pantalla
  actualizarInterfaz(nuevoCliente);

  // Limpiar el formulario para el siguiente cliente
  formulario.reset();
});

// Renderizado de la factura
function actualizarInterfaz(cliente) {
  // Mostrar estadísticas
  document.getElementById("statsClientes").innerText =
    `Total de clientes atendidos: ${listaClientes.length}`;
  document.getElementById("fechaSistema").innerText =
    `Fecha del sistema: ${cliente.fecha}`;

  // Mostrar detalle de la factura del último cliente registrado
  const contenedorFactura = document.getElementById("detalleFactura");
  contenedorFactura.innerHTML = `
        <h4>Última Factura Generada:</h4>
        <p><strong>Cliente:</strong> ${cliente.nombre}</p>
        <p><strong>Correo:</strong> ${cliente.correo}</p>
        <p><strong>Vehiculo:</strong> ${cliente.vehiculo.marca} (${cliente.vehiculo.tipo.toUpperCase()})</p>
        <p><strong>Combustible:</strong> ${cliente.compra.combustible.toUpperCase()} (${cliente.compra.galones} galones)</p>
        <p><strong>VENTA TOTAL:</strong> $${cliente.compra.total.toFixed(2)}</p>
    `;
}
