import { renderizarProducts } from "../js/app.js"


const getProducts = () => {

    fetch("ddbb.json")
    .then (res => res.json())
    .then (data => {
        renderizarProducts (data);
    })
    .catch(error => {
        console.log(error)
    })

}

export { getProducts };