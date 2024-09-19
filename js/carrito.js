let productosComprados = localStorage.getItem("productos-comprados");
productosComprados = JSON.parse(productosComprados);

const carritoVacio = document.querySelector("#carrito-limpio");
const carritoCompras = document.querySelector("#contenedor-carro");
const carritoInteraccion = document.querySelector("#carrito-interaccion");
const carritoFinal = document.querySelector("#carrito-finalizado");
let botonEliminar = document.querySelectorAll(".carrito-eliminar");
const vaciarCarro = document.querySelector("#carrito-interaccion-vaciar");
const botonComprar = document.querySelector("#carrito-interaccion-comprar");


function subirProductosAlCarrito() {
    if (productosComprados && productosComprados.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoCompras.classList.remove("disabled");
        carritoInteraccion.classList.remove("disabled");
        carritoFinal.classList.add("disabled");
    
        carritoCompras.innerHTML = "";
    
        productosComprados.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("contenedor-carro");
            div.innerHTML = `
                                            <img class="carrito-imagen" src="${producto.img}" alt="${producto.titulo}">
                                    <div class="carrito-producto-titulo">
                                        <small>Titulo</small>
                                        <h3>${producto.titulo}</h3>
                                    </div>
                                    <div class="carrito-producto-cantidad">
                                        <small>Cantidad</small>
                                        <p>${producto.cantidad}</p>
                                    </div>
                                    <div class="carrito-producto-precio">
                                        <small>Precio</small>
                                        <p>${producto.precio}</p>
                                    </div>
                                    <div class="carrito-producto-subtotal">
                                        <small>Subtotal</small>
                                        <p>${producto.precio * producto.cantidad}</p>
                                    </div>
                                    <button class="carrito-eliminar" id="${producto.id}">❌</button>
            `;
    
            carritoCompras.append(div);
        })
    
    
    
    } else {
    
        carritoVacio.classList.remove("disabled");
        carritoCompras.classList.add("disabled");
        carritoInteraccion.classList.add("disabled");
        carritoFinal.classList.add("disabled");
    }
    actualizarBotonEliminar();
    actualizarPrecio();
}

subirProductosAlCarrito();



function actualizarBotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });
}

function eliminarProducto(e) {
    const idBotton = e.currentTarget.id;
    const index = productosComprados.findIndex(producto => producto.id === idBotton);
    
    productosComprados.splice(index, 1);
    subirProductosAlCarrito();
    
    localStorage.setItem("productos-comprados", JSON.stringify(productosComprados));
}

vaciarCarro.addEventListener("click", vaciarCompra);

function vaciarCompra() {
    productosComprados.length = 0;
    localStorage.setItem("productos-comprados", JSON.stringify(productosComprados));
    subirProductosAlCarrito();
}

function actualizarPrecio() {
    const precioTotal =  productosComprados.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);

    total.innerHTML = `${precioTotal}`;
}


botonComprar.addEventListener("click", comprarProductos);
function comprarProductos() {

    productosComprados.length = 0;
    localStorage.setItem("productos-comprados", JSON.stringify(productosComprados));
    carritoVacio.classList.add("disabled");
    carritoCompras.classList.add("disabled");
    carritoInteraccion.classList.add("disabled");
    carritoFinal.classList.remove("disabled");
}