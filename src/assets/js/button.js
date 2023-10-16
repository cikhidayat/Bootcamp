// Hamburger menu
let isOpen = false
function triggerButton(){
    let hamburgerMenuCont = document.getElementById("menu-bar-container")
    if(!isOpen){
        hamburgerMenuCont.style.display = "block"
        isOpen = true
    } else {
        hamburgerMenuCont.style.display = "none"
        isOpen = false 
    }
}