 let delSeason = document.querySelector("#DelSeason")
let delCategory = document.querySelector("#DelCategory")
let delColor= document.querySelector("#DelColor")

let form = document.getElementById('formDelSeason')

let windowGeneral = document.querySelector('.windowGeneral')


delSeason.addEventListener('click',()=>{
    
    form.style.display = "block"
    windowGeneral.classList.toggle('activeWindow')
}),
delCategory.addEventListener('click',()=>{
    
    form.style.display = "block"
    windowGeneral.classList.toggle('activeWindow')
}),
delColor.addEventListener('click',()=>{
   
    form.style.display = "block"
    windowGeneral.classList.toggle('activeWindow')
})

function closeWindowDel(){
    form.style.display = "none" 
    windowGeneral.classList.toggle('activeWindow')
}

function closeWindowDel2(){
form.style.display = "none" 
windowGeneral.classList.toggle('activeWindow')
}


function valueChange(enlace,indexValue){
    let value0 = +document.getElementById('season').options[document.getElementById('season').selectedIndex].value
let value1 = +document.getElementById('category').options[document.getElementById('category').selectedIndex].value
let value2 = +document.getElementById('color').options[document.getElementById('color').selectedIndex].value
let values=[value0,value1,value2]
form.setAttribute('action',`/admin/products/${enlace}/${Number(values[indexValue])}?_method=DELETE`)
} 



