function modificar() {
  let id = document.getElementById("id").value;
  let nombre_ingresado = document.getElementById("nombre").value;
  let precio_ingresado = document.getElementById("precio").value;
  let tipo_ingresado = document.getElementById("tipo").value;
  let stock_ingresado = document.getElementById("stock").value;
  let imagen_ingresada = document.getElementById("imagen").value;

  let datos = {
    nombre: nombre_ingresado,
    precio: precio_ingresado,
    tipo: tipo_ingresado,
    stock: stock_ingresado,
    imagen: imagen_ingresada,
  };

  console.log(datos);

  let url = "http://pcrisorio.pythonanywhere.com/update/"+id;
  var options = {
    body: JSON.stringify(datos),
    method: "PUT",

    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };
  fetch(url, options)
    .then(function () {
      console.log("modificado");
      alert("Registro modificado");
      window.location.href = "/templates/tabla_productos.html";
    })
    .catch((err) => {
      this.error = true;
      console.error(err);
      alert("Error al Modificar");
    });
}
