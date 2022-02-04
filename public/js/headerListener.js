

window.onload = () => {
     document.querySelector("#categorias_dii").addEventListener("click", event => {
     document.querySelector("#category_m").classList.toggle("active");
    });







    let categoriasDesplegable = document.querySelector("#categoriasDesplegableDesktop")
let $categoriesBox = document.querySelector('#CBox')


categoriasDesplegable.addEventListener('click',function(){
    $categoriesBox.classList.toggle('active')
}) 
}