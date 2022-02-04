window.addEventListener("load", () => {
  let filterProducts = document.getElementById("filterProducts");
  let colorSelect = document.getElementById("colorSelect");
  let sizeSelect = document.getElementById("sizeSelect");
  let priceSelect = document.getElementById("priceSelect");
  let articles = document.querySelectorAll("article");
  let sectionProducts = document.getElementById('sectionProducts');
  let accountant = document.getElementById('accountantProducts');
  let filterButtom = document.getElementById('filter');
  let filterNavBar = document.getElementById('navBar');


  filterProducts.addEventListener("click", () => {
      
      let products = []
      if(colorSelect.value != '' && sizeSelect.value != '' && priceSelect != ''){
        articles.forEach((article) => {
            if (
                article.getAttribute("color") != colorSelect.value ||
                article.getAttribute("size") != sizeSelect.value ||
                article.getAttribute("price") > priceSelect.value
            ) {
                article.style.display = "none";
            } else {
                article.style.display = "block";
            }
            });
      }
      
            articles.forEach(ar => {
            if(ar.style.display == 'none'){
                products.push(ar)
            }
        })
        if(products.length == accountant.value){
            sectionProducts.innerHTML+= '<p>No hay productos que coincidan con la búsqueda</p>'
        }
        
  });
  filterButtom.addEventListener("click", () => {
     
      if(filterNavBar.style.display == "flex") {
          filterNavBar.style.display = "none"
      } else {
          filterNavBar.style.display = "flex"
      }
      
  })
  
});



