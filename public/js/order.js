let carro = new Carrito();
let carrito = document.getElementById("carrito");
let productos = document.getElementById("lista-productos");
let listaProductos = document.querySelector("#lista-carrito tbody");
let vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let viewCart = document.getElementById("viewCart");



if(location.pathname == "/user/cart"){
 carrito.style.display = "none" 
}else{
  carrito.style.display = "block" 
}

function cargarEventos() {
  function calcularCantidad(){
    document.querySelector(".carrito .count span").innerText = JSON.parse(localStorage.getItem("productos")).length
  }
  /* FUNCION PARA ACTUALIZAR CONSTANTEMENTE EL ESTADO LA CANTIDAD DEL ICONO DEL CARRITO DE COMPRA ARRIBA A LA DERECHA EN EL HEADER */
 

  /* COMPRAR PRODUCTO */
  window.addEventListener("click", (event) => { 
    carro.comprarProduto(event) 
    calcularCantidad()
  });

  /* ELIMINAR PRODUCTO */
  carrito.addEventListener("click", (event) => {
    carro.eliminarProducto(event)
  });

/* VACIAR CARRITO */
  vaciarCarritoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let productosLocalStorage = carro.obtenerProductosLocalStorage();
    if (productosLocalStorage.length > 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "swal-confirm",
          cancelButton: "swal-cancel",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "¿Estas seguro de vaciar el carrito?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) { 
            swalWithBootstrapButtons.fire({
              title: "Carrito vacio",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            carro.vaciarCarrito(event);
          }
        });
    }
  });

  /* LEER EL ALMACENAMIENTO LOCAL*/
  document.addEventListener("DOMContentLoaded",()=>{ 
    carro.leerLocalStorage()
    calcularCantidad()
  });

/* PROCESAR PEDIDO */
  viewCart.addEventListener("click", (event) => {
    carro.procesarPedido(event)
  });
  
}

cargarEventos();
