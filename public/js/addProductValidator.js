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
    formAdd = ge("productForm"),
    submitErrors = ge("errorAddProductForm"),
    seasonInsert = ge("seasonInsert"),
    errorSeasonInsert = ge("insertSeason"),
    formAddSeason = ge("formAddSeason"),
    errorFormSeasonInsert = ge("errorSeasonInsert"),
    categoryInsert = ge("categoryInsert"),
    errorCategoryInsert = ge("insertCategory"),
    formAddCategory = ge("formAddCategory"),
    errorFormCategoryInsert = ge("errorCategoryInsert"),
    colorInsert = ge("colorInsert"),
    errorColorInsert = ge("insertColor"),
    formAddColor = ge("formAddColor"),
    errorFormColorInsert = ge("errorcolorInsert"),
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

  formAdd.addEventListener("submit", function (event) {
    let error = false;
    event.preventDefault();
    let elementosForm = formAdd.elements;

    for (let index = 0; index < elementosForm.length - 2; index++) {
      if (
        elementosForm[index].value == "" &&
        elementosForm[index].name !== "image"
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
      formAdd.submit();
    }
  });

  seasonInsert.addEventListener("blur", function () {
    switch (true) {
      case !seasonInsert.value.trim():
        errorSeasonInsert.innerHTML = "Ingrese una temporada";
        addBorderRed(seasonInsert);
        break;
      default:
        addBorderGreen(seasonInsert);
        errorSeasonInsert.innerHTML = "";
        break;
    }
  });

  formAddSeason.addEventListener("submit", function (event) {
    let error = false;
    event.preventDefault();

    if (seasonInsert.value == "") {
      addBorderRed(seasonInsert);
      errorFormSeasonInsert.innerHTML = "Ingrese una temporada";
      error = true;
    }

    if (!error) {
      console.log("Todo bien");
      formAddSeason.submit();
    }
  });

  categoryInsert.addEventListener("blur", function () {
    switch (true) {
      case !categoryInsert.value.trim():
        errorFormCategoryInsert.innerHTML = "Ingrese una categoría";
        addBorderRed(categoryInsert);
        break;
      default:
        addBorderGreen(categoryInsert);
        errorCategoryInsert.innerHTML = "";
        break;
    }
  });

  formAddCategory.addEventListener("submit", function (event) {
    let error = false;
    event.preventDefault();

    if (categoryInsert.value == "") {
      addBorderRed(categoryInsert);
      errorFormCategoryInsert.innerHTML = "Ingrese una temporada";
      error = true;
    }

    if (!error) {
      console.log("Todo bien");
      formAddCategory.submit();
    }
  });

  colorInsert.addEventListener("blur", function () {
    switch (true) {
      case !colorInsert.value.trim():
        errorFormColorInsert.innerHTML = "Ingrese un color";
        addBorderRed(colorInsert);
        break;
      default:
        addBorderGreen(colorInsert);
        errorColorInsert.innerHTML = "";
        break;
    }
  });

  formAddColor.addEventListener("submit", function (event) {
    let error = false;
    event.preventDefault();

    if (colorInsert.value == "") {
      addBorderRed(colorInsert);
      errorFormColorInsert.innerHTML = "Ingrese una temporada";
      error = true;
    }

    if (!error) {
      console.log("Todo bien");
      formAddColor.submit();
    }
  });
});
