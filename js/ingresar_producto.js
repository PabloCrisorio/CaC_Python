function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value
    let precio_ingresado = document.getElementById("precio").value 
    let tipo_ingresado = document.getElementById("tipo").value 
    let stock_ingresado = document.getElementById("stock").value 
    let imagen_ingresada = document.getElementById("imagen").value 

    console.log(nombre_ingresado,precio_ingresado,tipo_ingresado,stock_ingresado,imagen_ingresada);
    let datos = {
        nombre: nombre_ingresado,
        precio:precio_ingresado,
        tipo:tipo_ingresado,
        stock:stock_ingresado,
        imagen:imagen_ingresada
    }
    console.log(datos);
    
    let url = "https://pcrisorio.pythonanywhere.com/registro_producto"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            
            window.location.href = "/templates/tabla_productos.html";  
            
        })
        .catch(err => {
            
            alert("Error al grabar" )
            console.error(err);
        })
}