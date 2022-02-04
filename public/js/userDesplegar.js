

let avatarHeader = document.querySelector("#circle_despegable")
let menuUser = document.querySelector("#user-desplegable")

avatarHeader.addEventListener('click', function(){
    menuUser.classList.toggle("active")
})