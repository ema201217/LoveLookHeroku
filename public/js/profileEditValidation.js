
function global(element) {
  return document.getElementById(element);
}

function addBorderRed(input) {
  input.style.boxShadow = "0 0 10px red";
}

function addBorderGreen(input) {
  input.style.boxShadow = "0 0 10px green";
}

window.addEventListener("load", () => {
  let name = global("nombre"),
    apellido = global("apellido"),
    correo = global("email"),
    telefono = global("telefono"),
    direccion = global("direccion"),
    pc = global("cp"),
    imagen = global("examinar"),
    formEdit = global("editProfileForm"),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]{4,}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    errorTelefono = global("errorTelefono"),
    regExTel = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/i,
    regExAlphaNum = /^[a-zA-Z0-9\s]*$/;
    /* Spans errror */
    errorNombre = global("errorNombre"),
    errorApellido = global("errorApellido"),
    errorEmail = global("errorEmail"),
    errorProvincia = global("errorProvince"),
    errorDireccion = global("errorDireccion"),
    errorCp = global("errorCp"),
    errorCiudad = global("errorCity"),
    errorImagen = global("errorImagen"),
    errorFormEdit = global("errorProfileEditForm");

  name.addEventListener("blur", function () {
    switch (true) {
      case !name.value.trim():
        errorNombre.innerHTML = "El campo nombre es obligatorio";
        name.style.boxShadow = "0 0 10px red";
        break;
      case !regExAlpha.test(name.value):
        errorNombre.innerHTML = "Debes ingresar un nombre válido";
        name.style.boxShadow = "0 0 10px red";
        break;
      default:
        name.style.boxShadow = "0 0 10px green";
        errorNombre.innerHTML = "";
        break;
    }
  });
  apellido.addEventListener("blur", function () {
    switch (true) {
      case !apellido.value.trim():
        errorApellido.innerHTML = "El campo apellido es obligatorio";
        apellido.style.boxShadow = "0 0 10px red";
        break;
      case !regExAlpha.test(apellido.value):
        errorApellido.innerHTML = "Debes ingresar un apellido";
        apellido.style.boxShadow = "0 0 10px red";
        break;
      default:
        apellido.style.boxShadow = "0 0 10px green";
        errorApellido.innerHTML = "";
        break;
    }
  });
  correo.addEventListener("blur", function () {
    switch (true) {
      case !correo.value.trim():
        errorEmail.innerHTML = "El campo email es obligatorio";
        correo.style.boxShadow = "0 0 10px red";
        break;
      case !regExEmail.test(correo.value):
        errorEmail.innerHTML = "Debes ingresar un email válido";
        correo.style.boxShadow = "0 0 10px red";
        break;
      default:
        correo.style.boxShadow = "0 0 10px green";
        errorEmail.innerHTML = "";
        break;
    }
  });
  telefono.addEventListener("blur", function () {
    switch (true) {
      case !telefono.value.trim():
        errorTelefono.innerHTML = "El campo telefono es obligatorio";
        telefono.style.boxShadow = "0 0 10px red";
        break;
      case !regExTel.test(telefono.value):
        errorTelefono.innerHTML = "Debes ingresar un telefono válido";
        telefono.style.boxShadow = "0 0 10px red";
        break;
      default:
        telefono.style.boxShadow = "0 0 10px green";
        errorTelefono.innerHTML = "";
        break;
    }
  });
  direccion.addEventListener("blur", function () {
    switch (true) {
      case !direccion.value.trim():
        errorDireccion.innerHTML = "El campo dirección es obligatorio";
        direccion.style.boxShadow = "0 0 10px red";
        break;
      case !regExAlphaNum.test(direccion.value):
        errorDireccion.innerHTML = "Debes ingresar una dirección válida";
        direccion.style.boxShadow = "0 0 10px red";
        break;
      default:
        direccion.style.boxShadow = "0 0 10px green";
        errorDireccion.innerHTML = "";
        break;
    }
  });
  pc.addEventListener("blur", function () {
    switch (true) {
      case !pc.value.trim():
        errorCp.innerHTML = "El campo dirección es obligatorio";
        pc.style.boxShadow = "0 0 10px red";
        break;
      case !regExAlphaNum.test(pc.value):
        errorCp.innerHTML = "Debes ingresar una dirección válida";
        pc.style.boxShadow = "0 0 10px red";
        break;
      default:
        pc.style.boxShadow = "0 0 10px green";
        errorCp.innerHTML = "";
        break;
    }
  });
  imagen.addEventListener("change", function fileValidation() {
    let filePath = imagen.value,
      allowefExtensions = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    if (!allowefExtensions.exec(filePath)) {
      errorImagen.innerHTML =
        "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)";
      imagen.value = "";
      $imgPreview.innerHTML = "";
      return false;
    } else {
      console.log(imagen.files);
      if (imagen.files && imagen.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          document
            .querySelector(".image-view")
            .setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(imagen.files[0]);
        errorImagen.innerHTML = "";
        addBorderRed(imagen);
      }
    }
  });
  
  formEdit.addEventListener("submit", function (event) {
    let error = false;
    event.preventDefault();
    let elementosForm = formEdit.elements;

    for (let index = 0; index < elementosForm.length - 1; index++) {
      if (
        (elementosForm[index].value == "" &&
          elementosForm[index].name !== "avatar") ||
        elementosForm[index].style.boxShadow == "0 0 10px red"
      ) {
        if (index == "4") {
          continue;
        }
        addBorderRed(elementosForm[index]);
        errorFormEdit.innerHTML = "Los campos señalados son obligatorios";
        error = true;
      }
    }

    if (!error) {
      console.log("Todo bien");
      formEdit.submit();
    }
  });
});
