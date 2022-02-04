function ge(element) {
    return document.getElementById(element);
  }
  
  function addBorderRed(input){
    input.style.boxShadow = '0 0 10px red'
  }
  
  function addBorderGreen(input){
    input.style.boxShadow = '0 0 10px green'
  }
  
  
  
  window.addEventListener("load", function () {
      let email = ge('email'),
          errorEmail = ge('errorEmail'),
          password = ge('password'),
          errorPassword = ge('errorPassword'),
          loginForm = ge('loginForm'),
          errorLoginForm = ge('errorLoginForm'),
          regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i


    email.addEventListener('blur', function () {
        switch (true) {
            case !email.value.trim(): 
                addBorderRed(email)
                errorEmail.innerText = "Debes ingresar un email"
                break;
            case !regExEmail.test(email.value): 
                addBorderRed(email)
                errorEmail.innerText = "Debes ingresar un email válido"
                break;
            default:
                addBorderGreen(email)
                errorEmail.innerText = ""
                break;
        }
    })
    email.addEventListener('keypress', function () {
        switch (true) {
            case !email.value.trim(): 
                addBorderRed(email)
                errorEmail.innerText = "Debes ingresar un email"
                break;
            case !regExEmail.test(email.value): 
                addBorderRed(email)
                errorEmail.innerText = "Debes ingresar un email válido"
                break;
            default:
                addBorderGreen(email)
                errorEmail.innerText = ""
                break;
        }
    })
    
    loginForm.addEventListener('submit', (event) => {
        let error = false;
        event.preventDefault()
        let elementsForm = loginForm.elements
        for (let i = 0; i <= 1 ; i++) {
            if(elementsForm[i].value == "" || elementsForm[i].style.boxShadow == '0 0 6px red'){
                elementsForm[i].style.boxShadow = '0 0 6px red'
                errorLoginForm.innerText = "Los campos señalados son obligatorios";
                error = true;
            }
        }
    
        if(!error){
            loginForm.submit()
        } 
    
    })

  })

  