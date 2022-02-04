let toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function calcularCantidad() {
  document.querySelector(".carrito .count span").innerText = JSON.parse(
    localStorage.getItem("productos")
  ).length;
}


/* window.addEventListener("DOMContentLoaded",calcularCantidad) */
class Carrito {
  // Añadir el producto al carrito
  comprarProduto(event) {
    /*   event.preventDefault(); */
    if (event.target.parentElement.classList.contains("agregar-carrito")) {
      console.log(event.target);

     /*  event.target.classList.toggle("text-success") */
      const producto =
        event.target.parentElement.parentElement.parentElement.parentElement;
        

      /* console.log(producto); */
      this.leerDatosProducto(producto);
     
    }
  }
/* clas es el nombre de la clase que le agregamos o sacamos , ejemplo   add("...") o remove("...") */
  leerDatosProducto(producto) {
    
    if( /\/products\/detail/.test(location.pathname)){
      let sectionProductDetail=document.querySelector('.details-products .product .imgs').children[0]
      var imgDetail=sectionProductDetail.querySelector('img').src
    }
    /* OBTENEMOS LOS VALORES DE LA TARJETA QUE INTRODUCIMOS COMO PARAMETRO */
    var infoProducto = {
      image: /\/products\/detail/.test(location.pathname) ? imgDetail:producto.querySelector("img").src,
      title: producto.querySelector("h5").textContent,
      price: Number(
        producto
          .querySelector("p.price")
          .textContent.split("$")[1]
          .split(".")
          .join("")
      ),
      id: producto.querySelector("a").getAttribute("data-id") /* DATA-ID */,
      count: 1,
      
    };
    
    
    /* OBTENEMOS LOS PRODUCTOS QUE ESTAN EN EL ALMACENAMIENTO LOCAL DEL NAVEGADOR */
    let productosLS = this.obtenerProductosLocalStorage();

    /* RECORREMOS EL O LOS PRODUCTOS QUE EXISTAN EN EL ALMACENAMIENTO LOCAL */
    productosLS.forEach((productoLS) => {
      /* SI EN EL PRODUCTO QUE ESTAMOS RECORRIENDO EL ID ES IGUAL AL PRODUCTO CON EL ID DEL PRODUCTO (data-id) QUE INGRESA EN EL METODO leerDatosProductos*/
      if (productoLS.id === infoProducto.id) {
        /* LE ASIGNAMOS A LA VARIABLE QUE productosLS el valor ID del elemento que se encontro en el ALMACENAMIENTO LOCAL */
        productosLS = productoLS.id;
      }
    });

    /* SI EL ID (productosLS) ES IGUAL AL PRODUCTO INGRESADO EN LA FUNCION leerDatosProductos  */
    if (productosLS === infoProducto.id) {
      /* MOSTRAME ESTE CARTEL */
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "swal-confirm",
          cancelButton: "swal-cancel",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "El producto ya exite en el carrito",
          text: "¿Quieres Eliminarlo?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          /* Si el usuario confirma la eliminacion del producto */
          if (result.isConfirmed) {
            /* MOSTRAME ESTE MENSAJE */
            swalWithBootstrapButtons.fire({
              title: "Producto Eliminado",
              text: "",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });

            this.eliminarProductoLocalStorage(infoProducto.id);
            setTimeout(() => {
              location.reload()
            }, 1200);
            /* Y ELIMINA EL ELEMENTO DEL ALMACENAMIENTO LOCAL */

            let cards = listaProductos.querySelectorAll("a");
            
            let cardId = [];
            cards.forEach((card) => {
              /* console.log(card); */
              cardId.push(card.dataset.id);

              cardId.forEach((id, index) => {
                if (id == infoProducto.id) {
                  console.log(infoProducto.id);
                  console.log(id);
                  cards[index].parentElement.parentElement.remove();
                }
              });
            });




          }
        });
    } else {
      /* SI EL PRODUCTO NO EXISTIA EN EL ALMACENAMIENTO LOCAL */
      this.insertarCarrito(infoProducto);
      /* MANDAME ESTE MENSAJE DE CONFIRMACION DE AGREGADO */
      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        html: `<div style="display:flex;width: 100%;
            justify-content: center;
            gap: 30px;">
            <img style="width:100px;" 
            src="${infoProducto.image}" 
            alt="${infoProducto.title}">
        <div style="display:flex;flex-direction:column;justify-content:space-around">    
        <h4 style="font-size:2rem;">${infoProducto.title}</h4>
        <strong style="font-size:1.5rem;"> $ ${toThousand(
          infoProducto.price
        )}</strong>
        </div>
        </div>
        `,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }

  insertarCarrito(producto) {
    /* CREAMOS UN ELEMENTO DEL DOM */
    let row = document.createElement("tr");

    /* METEMOS EN EL ELEMENTO LA PLANTILLA ASIGNADA DENTRO DE LOS TEMPLATE STRING */
    row.innerHTML = `
    <td>
    <a href="/products/detail/${producto.id}/5">
    <img src="${producto.image}" alt="${producto.title}">
    </a>
</td>
<td>
    ${producto.title}
</td>
<td>
$ ${toThousand(producto.price)}
</td>
<td>
    <a href="#" class="fas fa-times-circle borrar-producto" style="color: var(--bordes);" data-id="${
      producto.id
    }"></a>
</td>
    `;
    /* DENTRO DE LA VARIABLE QUE REPRESENTA LA UBICACION DEL ELEMENTO EN EL QUE VAMOS A INTRODUCIR INTRODUCIMOS EL ELEMENTO CREADO CON SUS RESPECTIVOS HIJOS */
    listaProductos.appendChild(row);
    /* SI ESTAMOS EN LA VISTA DE CARRITO DE COMPRA !! */
    if (location.pathname === "/user/cart") {
      listaCompra.innerHTML += `
  <tr class="table-striped">
<td>
<a href="/products/detail/${producto.id}/5">
  <img src='${producto.image}' alt='${
        producto.title
      }' style="width:100px;height:150px">
      </a>
</td>
<td>${producto.title}</td>

<td class="priceCart">
 $ ${toThousand(producto.price)}
</td>
<td>
<input type="number" class="form-control cantidad m-auto" id="CCC" min="1" value="${
        producto.count
      }"> 
</td>
<td id="sub-total">
 $ ${toThousand(producto.price * producto.count)}
</td>
<td>
 <a href="#" class="borrar-producto fas fa-times-circle" style="color: var(--bordes);" data-id=${
   producto.id
 }></a>
</td>
</tr>
`;
}

    /* GUARDAMOS EN EL PRODUCTO EN EL ALMACENAMIENTO LOCAL */
    this.guardarProductosLocalStorage(producto);
    calcularCantidad();
    this.calcularTotal()
  }

  eliminarProducto(event) {
    let producto, productoId;
    /* CUANDO SE EJECITE EL EVENTO EN EL ELEMENTO EN EL QUE SE CLICKEE (en este caso) */
    /* SI EL ELEMENTO DONDE SE HIZO CLICK EXISTE EN SU PROPIEDAD DE CLASE EL NOMBRE DE  "borrar-producto" */
    if (event.target.classList.contains("borrar-producto")) {
      /* ELIMINAME ESE PRODUCTO DEL HTML */
      /* OBTENEMOS EL ID DE ESA TARJETA UBICADO EN EL DATA-ID EN LA ETIQUETA "a" */
      producto = event.target.parentElement;
      console.log(producto);
      
      productoId = producto.querySelector("a").getAttribute("data-id");/* getAttribute("data-id"); */
      console.log(productoId);
      event.target.parentElement.parentElement.remove();
    }

    /* UTILIZANDO ESE ID LLAMAMOS AL METODO eliminarProductoLocalStorage */
    this.eliminarProductoLocalStorage(productoId);
    /* ACTUALIZAMOS EN TIEMPO REAL EL TOTAL DE DINERO EN EL CARRITO DE COMPRA */

    this.calcularTotal();
  }

  vaciarCarrito(event) {
    /* event.preventDefault(); */
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    if (location.pathname == "/user/cart") {
      while (listaCompra.firstChild) {
        listaCompra.removeChild(listaCompra.firstChild);
      }
    }
    this.vaciarLocalStorage();
    return false;
  }

  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  obtenerProductosLocalStorage() {
    let productoLS;
    if (localStorage.getItem("productos") === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  eliminarProductoLocalStorage(productoId) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((productoLS, index) => {
      if (productoLS.id == productoId) {
        productosLS.splice(index, 1);
      }
    });
    localStorage.setItem("productos", JSON.stringify(productosLS));
  
  }

  leerLocalStorage() {
    let productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((producto) => {
      let row = document.createElement("tr");
      row.innerHTML = `
    <td>
    <a href="/products/detail/${producto.id}/5">
    <img src="${producto.image}" alt="${producto.title}">
    </a>
    </td>
    <td>
        ${producto.title}
    </td>
    <td>
   $ ${toThousand(producto.price)}
    </td>
    <td>
        <a href="#" class="borrar-producto fas fa-times-circle" style="color: var(--bordes);" data-id="${
          producto.id
        }"></a>
    </td>
    `;
      listaProductos.appendChild(row);
    });
  }

  leerLocalStorageCompra() {
    let productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((producto) => {
      if (location.pathname == "/user/cart") {
        listaCompra.innerHTML += `
      <tr class="table-striped">
    <td>
      <img src='${producto.image}' alt='${
          producto.title
        }' style="width:100px;height:150px">
    </td>
    <td>${producto.title}</td>
  
    <td id="priceCart">
     $ ${toThousand(producto.price)}
    </td>
    <td>
    <input type="number" class="form-control cantidad m-auto" min="1" value="${
      producto.count
    }"> 
  </td>
    <td id="sub-total">
     $ ${toThousand(producto.price * producto.count)}
    </td>
    <td>
     <a href="#" class="borrar-producto fas fa-times-circle" style="color: var(--bordes);" data-id=${
       producto.id
     }></a>
    </td>
    </tr>
    `;
      }
    });
  }

  vaciarLocalStorage() {
    localStorage.removeItem("productos");
    document.querySelector(".carrito .count span").innerText = "0"
  }

  procesarPedido(event) {
    event.preventDefault();
    if (location.pathname != "/user/cart") {
      if (this.obtenerProductosLocalStorage().length > 0) {
        location.href = "/user/cart";
      } else {
        Swal.fire({
          icon: "warning",
          title: "El carrito esta vacio",
          html: "<h4>Agrega algun producto pulsando <i class='fas fa-cart-plus'></i></h4>",
          timer: 2300,
          showConfirmButton: false,
        });
      }
    }
  }

  calcularTotal() {
    let productosLS;
    let total = 0;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((productoLS) => {
      let element = +productoLS.price * productoLS.count;
      total = total + element;
    });

    /* ESTA LINEA QUE SE REPITE SIRVEN PARA EVITAR ERRORES EN CONSOLA DEL NAVEGADOR */
    if (location.pathname == "/user/cart") {
      let totalP = document.getElementById("total");
      totalP.innerHTML = `$  ${total.toFixed(2)}`;
    }
  }


}
