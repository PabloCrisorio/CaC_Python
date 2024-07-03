let cadena = location.search; // Cadena con los símbolos & y =
let datos = new URLSearchParams(cadena);
let resultado = {};
for (const [nombre, valor] of datos) {
    resultado[nombre] = valor;
    resultado[precio] = valor;
    resultado[stock] = valor
    resultado[imagen] = valor
}
document.getElementById("id").value = resultado["id"]
document.getElementById("nombre").value = resultado["nombre"]
document.getElementById("precio").value = resultado["precio"]
document.getElementById("stock").value = resultado["stock"]
document.getElementById("imagen").value = resultado["imagen"]