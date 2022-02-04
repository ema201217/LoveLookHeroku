
let subtitle1 = document.getElementById('ItemSubtitle1')
let subtitle2 = document.getElementById('ItemSubtitle2')
let subtitle3 = document.getElementById('ItemSubtitle3')
let info = document.getElementsByClassName('contain-hidden')
let closeItems = document.getElementById('closes')

function capitalize(text) {// funcion creada para colocarle una mayuscula en la primer letra 
  return text.charAt(0).toUpperCase() + text.slice(1);
}

subtitle1.onclick = function () {
 
  info[0].classList.toggle('active')
  info[1].classList.remove('active')
  info[2].classList.remove('active')
  closeItems.style.display="block"
}
subtitle2.onclick = function () {

  info[1].classList.toggle('active')
  info[0].classList.remove('active')
  info[2].classList.remove('active')
  closeItems.style.display="block"
 
}
subtitle3.onclick = function () {

  info[2].classList.toggle('active')
  info[1].classList.remove('active')
  info[0].classList.remove('active')
  closeItems.style.display="block"
 
}

let imgGuie = document.getElementById('img-guie')
closeItems.onclick = function(){
  info[0].classList.remove('active')
  info[1].classList.remove('active')
  info[2].classList.remove('active')
  closeItems.style.display="none"
  imgGuie.classList.remove('img-guie')
}

let linkGuie = document.getElementById('link-guie-task')
linkGuie.onclick=function(){
  imgGuie.classList.toggle('img-guie')
  closeItems.style.display="block"
}


/* galery images */

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activedd", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " activedd";
  /* captionText.innerHTML = dots[slideIndex-1].alt; */
}

/* galery images end */


