// cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")
// open
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
// Close
closeCart.onclick = () =>{
    cart.classList.remove("active");
}