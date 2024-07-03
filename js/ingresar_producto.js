function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value
    let precio_ingresado = document.getElementById("precio").value 
    let stock_ingresado = document.getElementById("stock").value 
    let imagen_ingresada = document.getElementById("imagen").value 

    console.log(nombre_ingresado,precio_ingresado,stock_ingresado,imagen_ingresada);
    let datos = {
        nombre: nombre_ingresado,
        precio:precio_ingresado,
        stock:stock_ingresado,
        imagen:imagen_ingresada
    }
    console.log(datos);
    
    let url = "http://localhost:5000/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            
            window.location.href = "../tabla_productos.html";  
            
        })
        .catch(err => {
            
            alert("Error al grabar" )
            console.error(err);
        })
}