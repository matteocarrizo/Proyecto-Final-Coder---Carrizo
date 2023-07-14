import { getProducts } from "../services/services.js";
import { toastify } from './toastify.js';

const cargaInicial = () => {

    obtenerCarritoDelLocalStorage();
    getProducts();
    renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", cargaInicial);

let Carrito = [];

const renderizarProducts = (productos) => {

    const tarjetas = document.querySelector(".shop-content");
    productos.forEach(producto => {

        // div
        const div = document.createElement("div");
        div.classList.add("product-box");
        // img
        const img = document.createElement("img");
        img.src = producto.imagen
        img.classList.add("product-img")
        //h2
        const h2 = document.createElement("h2");
        h2.textContent = producto.nombre;
        h2.classList.add("product-title")
        //span
        const span = document.createElement("span");
        span.textContent = (producto.precio + "$" );
        span.classList.add("price")
        //button
        const button = document.createElement("button");
        button.textContent = ("+")
        button.classList.add("add-cart")
        // agregar al div
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(span);
        div.appendChild(button);
        // agrego div al contenedor
        tarjetas.appendChild(div);
        // agrego evento
        button.addEventListener("click", () => {

            agregarAlcarrito(producto)

        })

    })
}

const agregarAlcarrito = (producto) => {

    const productoEnCarrito = Carrito.find(item => item.id === producto.id)

    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

    } else {
        Carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        })
    }



    toastify("✔️Producto Agregado al Carrito✔️", "success")

    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

const renderizarCarrito = () => {

    const contenedorCarrito = document.querySelector(".cart-content")

    contenedorCarrito.innerHTML = "";

    Carrito.forEach(producto => {

        // div contenedor
        const div = document.createElement("div");
        div.classList.add("cart-box");
        // img
        const img = document.createElement("img");
        img.src = producto.imagen
        img.classList.add("cart-img")
        //div2
        const div2 = document.createElement("div");
        div2.classList.add("detail-box")
        //div3
        const div3 = document.createElement("div");
        div3.classList.add("cart-product-title")
        div3.textContent = producto.nombre
        //div4
        const div4 = document.createElement("div");
        div4.classList.add("cart-price")
        div4.textContent = `${producto.precio * producto.cantidad}`
        //input
        const input = document.createElement("input");
        input.classList.add("cart-quantity")
        input.type = "number";
        input.value = producto.cantidad;
        //button 
        const button = document.createElement("button");
        button.classList.add("cart-remove")
        button.textContent = ("X")


        // acoplar
        div.appendChild(img);
        div.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(div4);
        div2.appendChild(input);
        div.appendChild(button);

        contenedorCarrito.appendChild(div);


        //evento al boton X
        button.addEventListener("click", () => {
            eliminarProducto(producto.id)
        })
        //agregar evento al input
        input.addEventListener("change", () => {
            cambiarCantidad(producto.id, +(input.value))
            totalIndividual(producto.id, producto.precio, +(input.value));
        })

    })

    let espacio = document.querySelector(".total")
    const total = Carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    espacio.textContent = 'TOTAL: $' + total;

}

const totalIndividual = (id, precio, cantidad) => {
    const producto = Carrito.find(producto => producto.id === id)

    if (cantidad > 0) {

        producto.total = precio * cantidad

    } else {

        eliminarProducto(id);

    }

    renderizarCarrito();
    guardarCarritoEnLocalStorage();

}

const eliminarProducto = (id) => {

    Carrito = Carrito.filter(producto => producto.id !== id);

    toastify("❌Producto Eliminado del Carrito❌", "error")

    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Local Storage

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(Carrito))
}

const obtenerCarritoDelLocalStorage = () => {
    if (localStorage.getItem("carrito")) {
        Carrito = JSON.parse(localStorage.getItem("carrito"))
    } else {
        Carrito = [];
    }
}

const cambiarCantidad = (id, cantidad) => {
    const producto = Carrito.find(producto => producto.id === id);
    producto.cantidad = cantidad;

    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}


// validar compra
const confirmarCompra = () => {
    let botonComprar = document.querySelector('.btn-buy')
    botonComprar.addEventListener('click', (e) => {
        e.preventDefault();
        if (Carrito.length == 0) {
            console.log("no hay nada")
            Swal.fire({
                title: 'No hay Productos en el Carrito!',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            })
        } else {
            setTimeout(() => location.href = "../compra.html", 1000);
        }
    })
}
confirmarCompra();




export { renderizarProducts }
