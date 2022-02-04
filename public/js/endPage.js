let endPage = document.querySelector("#endPage");
let footer = document.querySelector(".footer");
let footerCoords = footer.getBoundingClientRect();

window.addEventListener("scroll", function (e) {
  let sY = window.scrollY;
  let ypos = window.innerHeight;
  endPage.classList.add("show-endPage");
  if (sY > ypos) {
    endPage.classList.add("show-endPage");
  }else{
    endPage.classList.remove("show-endPage");
  }
 

  endPage.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      endPage.classList.remove("show-endPage");
    }, 1500);
  });
});

