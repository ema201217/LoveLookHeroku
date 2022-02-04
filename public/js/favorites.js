function cargarEventos(){

    window.addEventListener("click",(event)=>{
      /*   console.log(event.target.parentElement); */
        if(event.target.parentElement.classList.contains("agregar-favoritos")){
            event.target.classList.toggle("far"); 
            event.target.classList.toggle("fa"); 
           
        }


    })






}

cargarEventos();