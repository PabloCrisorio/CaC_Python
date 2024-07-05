const { createApp } = Vue

  createApp({
    data() {
      return {
        url:"http://pcrisorio.pythonanywhere.com/productos", 
        productos:[],
        error:false,
        cargando:true
      }
    },
    
    created() {
        this.fetchData(this.url)  
    },
    methods: {
        fetchData(url) {
            // Acá se consume la Api  /productos
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                });
        },
        
        eliminar(id) {
            
            const url = 'http://localhost:5000/borrar/'+id;
            var options = {
                method: 'DELETE',
                
            }
            fetch(url, options)
                .then(res => res.text()) 
                .then(res => {
                    alert("Eliminado correctamente")
                    location.reload();
                })
        }


    },
    



  }).mount('#app')