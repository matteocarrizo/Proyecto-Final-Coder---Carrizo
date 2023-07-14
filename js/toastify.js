function toastify(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            padding: '6px 20px',
            borderRadius: '0px',
            border: '1.5px solid transparent',
            background: '#111',
            color: '#fff',
            margin: '40px 16px ',
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

export { toastify };