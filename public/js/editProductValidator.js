function ge(element) {
  return document.getElementById(element);
}

function addBorderRed(input) {
  input.style.boxShadow = "0 0 10px red";
}

function addBorderGreen(input) {
  input.style.boxShadow = "0 0 10px green";
}

window.addEventListener("load", function () {
  let inputName = ge("name"),
    errorName = ge("errorName"),
    description = ge("description"),
    errorDescription = ge("errorDescription"),
    season = ge("season"),
    errorSeason = ge("errorSeason"),
    category = ge("category"),
    errorCategory = ge("errorCategory"),
    price = ge("price"),
    errorPrice = ge("errorPrice"),
    color = ge("color"),
    errorColor = ge("errorColor"),
    size = ge("size"),
    errorSize = ge("errorSize"),
    stock = ge("stock"),
    errorStock = ge("errorStock"),
    fileUpload = ge("file-upload"),
    errorFileUpload = ge("errorFileUpload"),
    formEdit = ge("editProductForm"),
    submitErrors = ge("errorEditProductForm"),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]{5,20}$/,
    regExDescrip = /^[a-zA-Z\sñáéíóúü ]{20,500}$/,
    regExNum = /^[0-9]{7,8}$/;

  inputName.addEventListener("blur", function () {
    switch (true) {
      case !inputName.value.trim():
        errorName.innerHTML = "El campo nombre es obligatorio";
        addBorderRed(inputName);
        break;
      case !regExAlpha.test(inputName.value):
        errorName.innerHTML =
          "Debes ingresar un nombre válido, 5 - 20 caracteres";
        addBorderRed(inputName);
        break;
      default:
        addBorderGreen(inputName);
        errorName.innerHTML = "";
        break;
    }
  });
  description.addEventListener("blur", function () {
    switch (true) {
      case !description.value.trim():
        errorDescription.innerHTML = "Debes ingresar una descripción";
        addBorderRed(description);
        break;
      case !regExDescrip.test(description.value):
        errorDescription.innerHTML =
          "Debes ingresar una descripción válida, 20 - 500 caracteres";
        addBorderRed(description);
        break;
      default:
        addBorderGreen(description);
        errorDescription.innerHTML = "";
        break;
    }
  });
  season.addEventListener("change", function () {
    switch (true) {
      case !season.value.trim():
        errorSeason.innerHTML = "Selecciona una temporada";
        addBorderRed(season);
        break;
      default:
        addBorderGreen(season);
        errorSeason.innerHTML = "";
        break;
    }
  });
  category.addEventListener("change", function () {
    switch (true) {
      case !category.value.trim():
        errorCategory.innerHTML = "Selecciona una categoría";
        addBorderRed(category);
        break;
      default:
        addBorderGreen(category);
        errorCategory.innerHTML = "";
        break;
    }
  });
  price.addEventListener("blur", function () {
    switch (true) {
      case !price.value.trim():
        errorPrice.innerHTML = "Ingresa un precio";
        addBorderRed(price);
        break;
      default:
        addBorderGreen(price);
        errorPrice.innerHTML = "";
        break;
    }
  });
  color.addEventListener("change", function () {
    switch (true) {
      case !color.value.trim():
        errorColor.innerHTML = "Selecciona un color";
        addBorderRed(color);
        break;
      default:
        addBorderGreen(color);
        errorColor.innerHTML = "";
        break;
    }
  });
  size.addEventListener("change", function () {
    switch (true) {
      case !size.value.trim():
        errorSize.innerHTML = "Selecciona un talle";
        addBorderRed(size);
        break;
      default:
        addBorderGreen(size);
        errorSize.innerHTML = "";
        break;
    }
  });
  stock.addEventListener("blur", function () {
    switch (true) {
      case !stock.value.trim():
        errorStock.innerHTML = "Ingresa una cantidad";
        addBorderRed(stock);
        break;
      default:
        addBorderGreen(stock);
        errorStock.innerHTML = "";
        break;
    }
  });
  fileUpload.addEventListener("change", function fileValidation() {
    let filePath = fileUpload.value,
      allowefExtensions = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    if (!allowefExtensions.exec(filePath)) {
      errorFileUpload.innerHTML =
        "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif - .webp)";
      fileUpload.value = "";
      $imgPreview.innerHTML = "";
      return false;
    } else {
      console.log(fileUpload.files);
      if (fileUpload.files && fileUpload.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $imgPreview.innerHTML = '<img src="' + e.target.result + '"/>';
        };
        reader.readAsDataURL(fileUpload.files[0]);
        errorFileUpload.innerHTML = "";
        addBorderRed(fileUpload);
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
          elementosForm[index].name !== "image") ||
        elementosForm[index].style.boxShadow == "0 0 10px red"
      ) {
        if (index == "4") {
          continue;
        }
        addBorderRed(elementosForm[index]);
        submitErrors.innerHTML = "Los campos señalados son obligatorios";
        error = true;
      }
    }

    if (!error) {
      console.log("Todo bien");
      formEdit.submit();
    }
  });
});
