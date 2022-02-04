function qs(element){
  return document.querySelector(element)
}

let barSearch = qs("#search-mobile");
let searchIco = qs("#search-ico");
let mySidenav = qs("#mySidenav")
let boxCloseNav = qs("#nav")
let iconRowDownCategory=qs("#fa-angle-down")

/* ABRIMOS EL MENU LATERAL IZQUIERDO Y A LA VEZ CERRAMOS LA BARRA DE BÚSQUEDA */

/* Menu BURGER  */

let McButton = $("[data=hamburger-menu]");
let McBar1 = McButton.find("b:nth-child(1)");
let McBar2 = McButton.find("b:nth-child(2)");
let McBar3 = McButton.find("b:nth-child(3)");
function animation() {
  if (McButton.hasClass("active")) {
    McBar1.velocity({ top: "50%" }, { duration: 200, easing: "swing" });
    McBar3.velocity(
      { top: "50%" },
      { duration: 200, easing: "swing" }
    ).velocity(
      { rotateZ: "90deg" },
      { duration: 800, delay: 250, easing: [500, 20] }
    );
    McButton.velocity(
      { rotateZ: "135deg",opacity:0},
      { duration: 800, delay: 250, easing: [500, 20] }
    );
  
  } else {
    McButton.velocity("reverse");
    McBar3.velocity(
      { rotateZ: "0deg" },
      { duration: 1000, easing: [500, 20] }
    ).velocity({ top: "100%" }, { duration: 200, easing: "swing" });
    McBar1.velocity("reverse", { delay: 800 });
  }
}
McButton.click(function () {
 
    $(this).addClass("active");
    animation();
    mySidenav.style.width = "210px";
    mySidenav.style.opacity = "1";
    barSearch.style.width = "0vw";
    barSearch.style.opacity = "0";
    searchIco.style.color = "black";
    searchIco.style.filter = "drop-shadow(4px 4px 2px red);";
    boxCloseNav.style.width = "100%";
    boxCloseNav.style.height = "100vh";
  
  setTimeout(() => {
    iconRowDownCategory.style.display = "inline";
  }, 500);

  
});

/* End Menu Burger */

/* CERRAMOS EL MENU LATERAL Y AL ABRIR LA BARRA DE BÚSQUEDA TAMBIÉN SE CIERRA */
function closeNav() {
    $(McButton).toggleClass("active");
    animation();
 
  mySidenav.style.width = "0";
  mySidenav.style.opacity = "0";
  barSearch.style.width = "0vw";
  barSearch.style.opacity = "0";
  searchIco.style.color = "black";
  searchIco.style.filter = "drop-shadow(4px 4px 2px red);";
 boxCloseNav.style.width = "0";
 boxCloseNav.style.height = "0";
  qs("#category_m").style.display = "none";
  iconRowDownCategory.style.display = "none";
}


boxCloseNav.onclick = function () {
  
    $(McButton).toggleClass("active");
    animation();
  
  mySidenav.style.width = "0";
  mySidenav.style.opacity = "0.5";
  boxCloseNav.style.width = "0";
  boxCloseNav.style.height = "0";
  qs("#category_m").style.display = "none";
  qs("#fa-angle-down").style.display = "none";
  if(McButton.hasClass("active")){
    McButton.removeClass("active")
    McButton.velocity("reverse");
    McBar3.velocity(
      { rotateZ: "0deg" },
      { duration: 1000, easing: [500, 20] }
    ).velocity({ top: "100%" }, { duration: 200, easing: "swing" });
    McBar1.velocity("reverse", { delay: 800 });

  selectTranslate.classList.remove("active")
  
  qs('#search-ico').velocity(
    { rotateZ: "135deg",opacity:0},
    { duration: 800, delay: 250, easing: [500, 20] }
  );

  }
};

/* BAR SEARCH */
searchIco.onclick = function () {
  if ((barSearch.style.width == "0vw") & (barSearch.style.opacity == "0")) {
    if(McButton.hasClass("active")){
      McButton.removeClass("active")
      McButton.velocity("reverse");
      McBar3.velocity(
        { rotateZ: "0deg" },
        { duration: 1000, easing: [500, 20] }
      ).velocity({ top: "100%" }, { duration: 200, easing: "swing" });
      McBar1.velocity("reverse", { delay: 800 });
    }
  
    qs("#search-mobile").style.display = "flex";
    barSearch.style.width = "90%";
    document.querySelector(".input-header").focus()
    barSearch.style.opacity = "1";
    searchIco.style.color = "var(--bordes)";
    searchIco.style.filter = "drop-shadow(4px 4px 2px gray);";
    mySidenav.style.width = "0";
    mySidenav.style.opacity = "0.5";
    boxCloseNav.style.width = "0";
    boxCloseNav.style.height = "0";
    qs("#btn-lupa").style.display = "flex";
  } else {
    
    barSearch.style.width = "0vw";
    barSearch.style.opacity = "0";
    searchIco.style.color = "black";
    searchIco.style.filter = "drop-shadow(4px 4px 2px red);";
    setTimeout(() => {
      qs("#search-mobile").style.display = "none";
    }, 500);
  }
};

/* TRANSLATE GOOGLE */

let icoWord = qs('.translateSelect')
let selectTranslate  = qs('.selectTranslate')
icoWord.onclick= function(){
  selectTranslate.classList.toggle("active")
  boxCloseNav.style.width = "100%";
  boxCloseNav.style.height = "100vh";
}

/* CART SHOPPING */
qs("#cart-popup-right").addEventListener("click",(event)=>{
  event.preventDefault()
  qs("#carrito").classList.toggle("active")
})



