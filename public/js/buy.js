
let compra = new Carrito();
let listaCompra = document.querySelector("#lista-compra tbody");
let procesarCompraBtn = document.getElementById("procesar-compra");
let vaciarCarritoBtn2 = document.getElementById("vaciar-carrito-2");
function calcularCantidad(){
  document.querySelector(".carrito .count span").innerText = JSON.parse(localStorage.getItem("productos")).length
}


function cargarEventos() {


  document.addEventListener("DOMContentLoaded",()=>{
        compra.leerLocalStorageCompra()
        calcularCantidad()
        compra.calcularTotal()
    });

  listaCompra.addEventListener("click", function (event) {
    compra.eliminarProducto(event);
    calcularCantidad()
  });

  procesarCompraBtn.addEventListener("click", procesarCompra);




if(location.pathname == "/user/cart"){
    let $iconRow = document.querySelector("#iconArrow");
let $iconSync = document.querySelector("#iconSync");
$iconRow.onclick = () => (window.location.href = "/products");
$iconSync.onclick = () => window.location.reload();

vaciarCarritoBtn2.addEventListener('click',(event)=>{
    /* event.preventDefault(); */
    let productosLocalStorage = compra.obtenerProductosLocalStorage();
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
            compra.vaciarCarrito(event);
           compra.calcularTotal()
           calcularCantidad()
          }
        });
    }
})

}

function procesarCompra(event) {

  if (compra.obtenerProductosLocalStorage().length === 0) {
    /* SI ESTA VACIO EL CARRITO ENVIA ESTE CARTEL */
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay productos, selecciona alguno",
      timer: 2300,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "/products";
    });
  } else {

    Swal.fire({
        title: "¿Quieres realizar la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        /* Si el usuario confirma la eliminacion del producto */
        if (result.isConfirmed) {
    /* LOADING SIMULACION DE PROCESO INTERNO DE COMPRA */
    let timerInterval;
    Swal.fire({
      title: "Finalizando compra",
      html: "Loading <b></b> milisegundos",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      // LUEGO DEL LOADING QUIRO QUE ME MUESTRES ESTE CARTEL 
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          icon: "success",
          title: "Compra Finalizada",
          text: "Gracias por su compra",
          timer: 2000,
          showConfirmButton: false,
        })
          // LUEGO DEL CARTEL DE COMPRA REALIZADA ELIMINAME TODOS LOS PRODUCTOS DEL CARRITO 
          compra.vaciarCarrito(event);
          setTimeout(() => {
            location.href = "/"
          }, 1000);
      }
    }) 
}})
  }

}

}

cargarEventos();