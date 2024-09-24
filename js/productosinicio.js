
let productosMenu = [];

fetch ("./js/productos.json")
.then(response => response.json())
.then(data => {
    productosMenu = data ;
    cargarProductos(productosMenu);
})


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesNav = document.querySelectorAll(".botones-nav");
const titulosNav = document.querySelector("#titulo-nav");
let botonesComprar = document.querySelectorAll(".producto-comprar");
const contador = document.querySelector("#contador");


function cargarProductos(productosClick) {

    contenedorProductos.innerHTML = "";

    productosClick.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.img}" alt="${producto.titulo}">
        <div class="producto-detalles">
    <h3 class="producto-titulo">${producto.titulo}</h3>
    <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-comprar" id=${producto.id}>Comprar</button>
        `;

        contenedorProductos.append(div);
    });
    actualizarCompra();

}


botonesNav.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesNav.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "all") {
            const productosNombres = productosMenu.find(producto => producto.categoria.id === e.currentTarget.id)
            titulosNav.innerHTML = productosNombres.categoria.nombre;

            const productosBoton = productosMenu.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            titulosNav.innerHTML = "Menu Principal";
            cargarProductos(productosMenu);
        }
    })
});

function actualizarCompra() {
    botonesComprar = document.querySelectorAll(".producto-comprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarProducto);
    });
}

let productosComprados;
let sumaContador;

let productosCompradosLS = localStorage.getItem("productos-comprados");


if (productosCompradosLS) {
    productosComprados = JSON.parse(productosCompradosLS);
    actualizarContador();
} else {
    productosComprados = [];
}


function agregarProducto(e) {
    const idBotton = e.currentTarget.id;
    const productoSeleccionado = productosMenu.find(producto => producto.id === idBotton);

    if (productosComprados.some(producto => producto.id === idBotton)) {
        const main = productosComprados.findIndex(producto => producto.id === idBotton);
        productosComprados[main].cantidad++;
    } else {
        productoSeleccionado.cantidad = 1;
        productosComprados.push(productoSeleccionado);
    }
    actualizarContador();

    localStorage.setItem("productos-comprados", JSON.stringify(productosComprados));
}

function actualizarContador() {
    let sumaContador = productosComprados.reduce((acc, producto) => acc + producto.cantidad, 0);
    contador.innerText = sumaContador;
}