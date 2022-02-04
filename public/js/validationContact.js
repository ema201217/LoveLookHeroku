

function qs(id) {
  return document.querySelector(id);
}
/* Form */
let form = qs("#form");

/* Elements form */
var $inputNombre = qs("input#nombreInput"),
  $inputApellido = qs("input#apellidoInput"),
  $inputDni = qs("input#dniInput"),
  $inputEmail = qs("input#emailInput"),
  $inputTel = qs("input#telInput"),
  $inputCv = qs("input#cvInput"),
  $selectLocalidad = qs("select#localidadInput"),
  $inputDomicilio = qs("input#domicilioInput"),
  $selectProvince = qs("select#provinceInput"),
  $inputCuit = qs("input#cuitInput"),
  $inputRSocial = qs("input#RSocialInput"),
  $selectDSocial = qs("select#DSocialSelect"),
  $inputMsg = qs("textarea#msgInput"),
  $inputCaptcha = qs("#ReCaptcha"),
  regExAlpha = /^[a-zA-Z\sñáéíóúü]*$/,
  regExDomicilio = /^[a-zA-Z\sñáéíóúü]+[0-9]{2,5}$/,
  regExDNI = /^[0-9]{7,8}$/,
  regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
  regExCUIT = /\b(20|23|24|27|30|33|34)(\D)?[0-9]{7,8}(\D)?[0-9]/,
  regExAlphanumeric = /^[a-z0-9A-Z\sñáéíóúü]*$/;

/* Errors span */
($NombreError = qs("span#nombreError")),
  ($ApellidoError = qs("span#apellidoError")),
  ($DniError = qs("span#dniError")),
  ($EmailError = qs("span#emailError")),
  ($TelError = qs("span#telError")),
  ($CvError = qs("span#cvError")),
  ($LocalidadError = qs("span#localidadError")),
  ($DomicilioError = qs("span#domicilioError")),
  ($ProvinceError = qs("span#provinceError")),
  ($CuitError = qs("span#cuitError")),
  ($RSocialError = qs("span#RSocialError")),
  ($DSocialError = qs("span#DSocialError")),
  ($MsgError = qs("span#msgError")),
  ($captchaError = qs("#recaptchaError"));

window.addEventListener("load", function () {
  function error(input, message, text) {
    input.classList.remove("validationsSuccess");
    input.classList.add("validationsErrors");
    message.classList.add("validationsErrors");
    message.innerText = text;
  }

  function success(input, message) {
    message.classList.remove("validationsErrors");
    input.classList.remove("validationsErrors");
    input.classList.add("validationsSuccess");
    message.innerText = "";
  }

  /* ------------ */
  /* Consultas */
  /* ------------ */

  /* NOMBRE */
  $inputNombre.onblur = function () {
    switch (true) {
      case !$inputNombre.value.trim():
        error($inputNombre, $NombreError, "Campo obligatorio");
        break;
      case !regExAlpha.test($inputNombre.value):
        error(
          $inputNombre,
          $NombreError,
          "El nombre no puede contener numeros ni caracteres especiales"
        );
        break;
      case $inputNombre.value.length < 5:
        error(
          $inputNombre,
          $NombreError,
          "El nombre debe ser mayor a 4 caracteres"
        );
        break;
      default:
        success($inputNombre, $NombreError);
    }
  };

  /* APELLIDO */
  $inputApellido.onblur = function () {
    switch (true) {
      case !$inputApellido.value.trim():
        error($inputApellido, $ApellidoError, "Campo obligatorio");
        break;
      case !regExAlpha.test($inputApellido.value):
        error(
          $inputApellido,
          $ApellidoError,
          "El apellido no puede contener numeros"
        );
        break;
      case $inputApellido.value.length < 5:
        error(
          $inputApellido,
          $ApellidoError,
          "El apellido debe ser mayor a 4 caracteres"
        );
        break;
      default:
        success($inputApellido, $ApellidoError);
    }
  };

  /* EMAIL */
  $inputEmail.onblur = function () {
    switch (true) {
      case !$inputEmail.value.trim():
        error($inputEmail, $EmailError, "Campo obligatorio");
        break;
      case !regExEmail.test($inputEmail.value):
        error($inputEmail, $EmailError, "Debes ingresar un email válido");
        break;
      default:
        success($inputEmail, $EmailError);
    }
  };

  /* MENSAJE */
  $inputMsg.onblur = function () {
    switch (true) {
      case !$inputMsg.value.trim():
        error($inputMsg, $MsgError, "Campo obligatorio");
        break;
      default:
        success($inputMsg, $MsgError);
    }
  };

  if (
    location.pathname == "/info/contact/rrhh" ||
    location.pathname == "/info/contact/franchise" ||
    location.pathname == "/info/contact/attention"
  ) {
    /* TELEFONO */
    $inputTel.onblur = function () {
      switch (true) {
        case !$inputTel.value.trim():
          error($inputTel, $TelError, "Campo obligatorio");
          break;
        case isNaN($inputTel.value):
          error($inputTel, $TelError, "El valor debe ser numerico");
          break;
        case $inputTel.value.length < 8:
          error(
            $inputTel,
            $TelError,
            "El telefono debe tener mas de 8 numeros"
          );
          break;
        default:
          success($inputTel, $TelError);
      }
    };
  }
  /* ------------ */
  /* RRHH */
  /* ------------ */
  if (location.pathname == "/info/contact/rrhh") {
    /* CV */
    document.querySelector("#cvInputView").oninput = function () {
      if ($inputCv.files.length == 0) {
        error($inputView, $CvError, "Archivo obligatorio");
      }
    };
    $inputCv.onchange = function () {
      var nameFile = document.querySelectorAll("#cvInput")[0].files[0].name;
      if (nameFile.length > 15) {
        /*Si el nombre del archivo tiene mas de 15 caracteres */
        nameFile = `${nameFile.substr(
          0,
          15
        )}(...)`; /*  se substraen los primeros 15 caracteres y se coloca (...) */
      }

      document.querySelector(
        ".cv-input span"
      ).innerHTML = `Nombre del archivo: ${nameFile}`;

      let $inputView = document.querySelector("#cvInputView");
      switch (true) {
        case !/\.(pdf)/.test($inputCv.value):
          error($inputView, $CvError, "Archivo permitido (.pdf)");
          break;
        default:
          success($inputView, $CvError);
      }
    };
  }

  /* ------------ */
  /* FRANQUICIA */
  /* ------------ */
  if (location.pathname == "/info/contact/franchise") {
    /* DNI */
    $inputDni.onblur = function () {
      switch (true) {
        case !$inputDni.value.trim():
          error($inputDni, $DniError, "Campo obligatorio");
          break;
        case !regExDNI.test($inputDni.value):
          error($inputDni, $DniError, "El valor ingresado no es un dni");
          break;
        default:
          success($inputDni, $DniError);
      }
    };

    /* PROVINCIAS */
    $selectLocalidad.disabled = true;
    $selectDSocial.disabled = true;
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) => {
        var provinces = data.provincias.sort(function (prev, next) {
          return prev.nombre > next.nombre
            ? 1
            : prev.nombre < next.nombre
            ? -1
            : 0;
        });
        return provinces.forEach((province) => {
          $selectProvince.innerHTML += `<option value="${province.id}">${province.nombre}</option>`;
        });
      })
      .catch((err) => console.log(err));

    $selectProvince.onblur = function () {
      if ($selectProvince.options[$selectProvince.selectedIndex].value == "") {
        error($selectProvince, $ProvinceError, "Selección obligatoria");
      }
    };

    $selectProvince.onchange = function (event) {
      $selectLocalidad.innerHTML = "";
      $selectLocalidad.disabled = false;
      $selectDSocial.disabled = false;

      let provinceNombre = event.target.value;

      success($selectProvince, $ProvinceError);

      /* OPTIONS SELECT LOCALIDADES */

      function fetchProvince(value) {
        fetch(
          `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${value}&campos=id,nombre&max=5000`
        )
          .then((response) => response.json())
          .then((results) => {
            console.log(results);
            let localidades = results.departamentos.sort(function (prev, next) {
              return prev.nombre > next.nombre
                ? 1
                : prev.nombre < next.nombre
                ? -1
                : 0;
            });

            localidades.forEach((location) => {
              if (results.parametros.provincia[0] == "02") {
                $selectLocalidad.innerHTML =
                  "<option value='0' selected>No hay opciones</option>";
              } else {
                $selectLocalidad.innerHTML += `<option value="" selected hidden>Selecciona</option>
                                <option value="${location.nombre}">${location.nombre}</option>`;
                $selectDSocial.innerHTML += `<option value="" selected hidden>Selecciona</option>
                                <option value="${location.nombre}">${location.nombre}</option>`;
              }
            });
          });
      }
      fetchProvince(provinceNombre);
    };

    /* LOCALIDAD */
    $selectLocalidad.onblur = function () {
      if (
        $selectLocalidad.options[$selectLocalidad.selectedIndex].value == ""
      ) {
        error($selectLocalidad, $LocalidadError, "Selección obligatoria");
      }
    };
    $selectLocalidad.onchange = function () {
      success($selectLocalidad, $LocalidadError);
    };

    /* DOMICILIO */
    $inputDomicilio.onblur = function () {
      switch (true) {
        case !$inputDomicilio.value.trim():
          error($inputDomicilio, $DomicilioError, "Campo obligatorio");
          break;
        case !regExDomicilio.test($inputDomicilio.value):
          error(
            $inputDomicilio,
            $DomicilioError,
            "Ingrese una dirección y su altura"
          );
          break;
        case $inputDomicilio.value.trim().length < 6:
          error(
            $inputDomicilio,
            $DomicilioError,
            "El domicilio debe tener mas de 5 caracteres"
          );
          break;

        default:
          success($inputDomicilio, $DomicilioError);
      }
    };

    /* CUIT */
    $inputCuit.onblur = function () {
      switch (true) {
        case !$inputCuit.value.trim():
          error($inputCuit, $CuitError, "Campo obligatorio");
          break;

        case !regExCUIT.test($inputCuit.value):
          error($inputCuit, $CuitError, "El cuit ingresado es invalido");
          break;

        default:
          success($inputCuit, $CuitError);
      }
    };

    /* RAZON SOCIAL */
    $inputRSocial.onblur = function () {
      switch (true) {
        case !$inputRSocial.value.trim():
          error($inputRSocial, $RSocialError, "Campo obligatorio");
          break;

        case !regExAlphanumeric.test($inputRSocial.value):
          error(
            $inputRSocial,
            $RSocialError,
            "No se permiten caracteres especiales"
          );
          break;

        default:
          success($inputRSocial, $RSocialError);
      }
    };

    /* DIRECCION SOCIAL */
    $selectDSocial.onblur = function () {
      switch (true) {
        case !$selectDSocial.value.trim():
          error($selectDSocial, $DSocialError, "Campo obligatorio");
          break;

        default:
          success($selectDSocial, $DSocialError);
      }
    };
  }

  function validationError(index, span, elements) {
    span[index].classList.add("validationsErrors");
    elements[index].classList.add("validationsErrors");
    if (elements[index].value === "") {
      span[index].innerText = "Campo obligatorio";
    }
  }

  function validationsSuccess(index, span, elements) {
    span[index].innerText = "";
    span[index].classList.remove("validationsErrors");
    elements[index].classList.remove("validationsErrors");
    elements[index].classList.add("validationsSuccess");
  }

  form.addEventListener("submit", function (event) {
    let spans = document.querySelectorAll(".error");

    event.preventDefault();

    let error = false;

    let elementos = form.elements;

    var response = grecaptcha.getResponse();
    if (response == "") {
      $inputCaptcha.classList.remove("validationsSuccess");
      $inputCaptcha.classList.add("validationsErrors");
      $captchaError.classList.add("validationsErrors");
      $captchaError.innerText = "Captcha obligatorio";
      error = true;
    } else {
      $captchaError.innerText = "";
      $inputCaptcha.classList.remove("validationsErrors");
      $captchaError.classList.remove("validationsErrors");
      $inputCaptcha.classList.add("validationsSuccess");
    }

    for (let i = 0; i < elementos.length - 1; i++) {
      if (elementos[i].name == "name") {
        switch (true) {
          case elementos[i].value === "":
          case !regExAlpha.test(elementos[i].value):
          case elementos[i].value.length < 5:
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "lastName") {
        switch (true) {
          case elementos[i].value === "":
          case !regExAlpha.test(elementos[i].value):
          case elementos[i].value.length < 5:
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "email") {
        switch (true) {
          case elementos[i].value === "":
          case !regExEmail.test(elementos[i].value):
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "msg") {
        switch (true) {
          case elementos[i].value === "":
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "phone") {
        switch (true) {
          case elementos[i].value === "":
          case isNaN(elementos[i].value):
          case elementos[i].value.length < 8:
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "cv") {
        switch (true) {
          case elementos[i].files.length == 0:
          case !/\.(pdf)/.test($inputCv.value):
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "dni") {
        switch (true) {
          case !elementos[i].value.trim():
          case !regExDNI.test(elementos[i].value):
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name == "province") {
        switch (true) {
          case elementos[i].options[elementos[i].selectedIndex].value == "":
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (
        elementos[i].name == "location" ||
        elementos[i].name === "socialLocation"
      ) {
        switch (true) {
          case elementos[i].disabled === true:
          case elementos[i].options[elementos[i].selectedIndex].value == "":
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name === "address") {
        switch (true) {
          case !elementos[i].value.trim():
          case !regExDomicilio.test(elementos[i].value):
          case elementos[i].value.trim().length < 6:
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name === "cuit") {
        switch (true) {
          case !elementos[i].value.trim():
          case !regExCUIT.test(elementos[i].value):
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
      if (elementos[i].name === "businessName") {
        switch (true) {
          case !elementos[i].value.trim():
          case !regExAlphanumeric.test(elementos[i].value):
            validationError(i, spans, elementos);
            error = true;
            break;
          default:
            validationsSuccess(i, spans, elementos);
            break;
        }
      }
    }
    if (!error) {
      form.submit();
    }
  });
});
