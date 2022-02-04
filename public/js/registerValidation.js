function global(element){
    return document.getElementById(element)
}

window.addEventListener('load', () => {
    let Inputname = global('Nombre'),
    apellido = global('Apellido'),
    email = global('Email'),
    pass = global('Password'),
    pass2 = global('Password2'),
    secretPass = global('secretPass')
    formulario = global('Registro'),
    term = global('terms'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]{3,}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/
    
    
    /* spans errors */
    errorName = global('errorfirstName'),
    errorlastName = global('errorlastName'),
    errorEmail = global('errorEmail'),
    errorpass = global('errorPassword'),
    errorpass2 = global('errorPassword2'),
    errorterm = global('errorTerms'),
    errorForm = global('errorForm'),
    errorSecret= global('errorSecret')


    Inputname.addEventListener("blur", function () {
      switch (true) {
        case !Inputname.value.trim():
          errorName.innerHTML = "El campo nombre es obligatorio";
          Inputname.style.boxShadow = '0 0 10px red';
          break;
        case !regExAlpha.test(Inputname.value):
          errorName.innerHTML = "Debes ingresar un nombre válido";
          Inputname.style.boxShadow = '0 0 10px red';
          break;
        default:
            Inputname.style.boxShadow = '0 0 10px green';
            errorName.innerHTML = "";
          break;
      }
    })
    apellido.addEventListener("blur", function () {
        switch (true) {
          case !apellido.value.trim():
            errorlastName.innerHTML = "El campo apellido es obligatorio";
            apellido.style.boxShadow = '0 0 10px red';
            break;
          case !regExAlpha.test(apellido.value):
            errorlastName.innerHTML = "Debes ingresar un apellido válido";
            apellido.style.boxShadow = '0 0 10px red';
            break;
          default:
              apellido.style.boxShadow = '0 0 10px green';
              errorlastName.innerHTML = "";
            break;
        }
      })
      email.addEventListener("blur", function () {
        switch (true) {
          case !email.value.trim():
            errorEmail.innerHTML = "El campo email es obligatorio";
            email.style.boxShadow = '0 0 10px red';
            break;
          case !regExEmail.test(email.value):
            errorEmail.innerHTML = "Debes ingresar un email válido";
            email.style.boxShadow = '0 0 10px red';
            break;
          default:
              email.style.boxShadow = '0 0 10px green';
              errorEmail.innerHTML = "";
            break;
        }
      })
      pass.addEventListener("blur", function () {
        switch (true) {
          case !pass.value.trim():
            errorpass.innerHTML = "El campo password es obligatorio";
            pass.style.boxShadow = '0 0 10px red';
            break;
          case !regExPassword.test(pass.value):
            errorpass.innerHTML = "Debes ingresar un password válido";
            pass.style.boxShadow = '0 0 10px red';
            break;
          default:
              pass.style.boxShadow = '0 0 10px green';
              errorpass.innerHTML = "";
            break;
        }
      })
      pass2.addEventListener("blur", function () {
        switch (true) {
          case !pass2.value.trim():
            errorpass.innerHTML = "El campo password es obligatorio";
            pass.style.boxShadow = '0 0 10px red';
            break;
          case !regExPassword.test(pass2.value):
            errorpass2.innerHTML = "Las contraseñas no coinciden";
            pass.style.boxShadow = '0 0 10px red';
            break;
          default:
              pass2.style.boxShadow = '0 0 10px green';
              errorpass2.innerHTML = "";
            break;
        }
      })
      secretPass.addEventListener("blur", function () {
        switch (true) {
          case !secretPass.value.trim():
            errorSecret.innerHTML = "El campo nombre es obligatorio";
            secretPass.style.boxShadow = '0 0 10px red';
            break;
          case !regExAlpha.test(secretPass.value):
            errorSecret.innerHTML = "Debes ingresar un nombre válido";
            secretPass.style.boxShadow = '0 0 10px red';
            break;
          default:
              secretPass.style.boxShadow = '0 0 10px green';
              errorSecret.innerHTML = "";
            break;
        }
      })
      term.addEventListener('click',function(){
        term.value = 'on'
        term.style.boxShadow = '0 0 10px green'
        errorterm.innerHTML = ""
    })
    formulario.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        let elementosForm = formulario.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" && elementosForm[index].name !== "archivo"){
                elementosForm[index].style.boxShadow = '0 0 10px red';
                errorForm.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }
    
        if(!term.checked){
            term.style.boxShadow = '0 0 10px red';
            errorterm.innerHTML = "Debes aceptar las bases y condiciones"
            error = true
        }
    
        if(!error){
            console.log('bien')
            formulario.submit()
        }
    
    })
})