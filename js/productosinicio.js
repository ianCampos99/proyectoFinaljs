const productosMenu = [
    {
        id: "procesador-1", titulo: "ryzen 5 3600",
        img: "./img/ryzen53600.jpg",
        categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 1000,
    },
    {
        id: "procesador-2", titulo: "ryzen 7 3700x",
        img: "./img/ryzen73700x.jpg",
        categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 2222,
    },
    {
        id: "procesador-3", titulo: "ryzen 9 5600x",
        img: "./img/ryzen95600x.jpg",
        categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 3333,
    },
    {
        id: "procesador-4", titulo: "intel i5-11400f",
        img: "./img/inteli5-11400f.jpg",
        categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 4444,
    },
    {
        id: "procesador-5", titulo: "intel i5-9400f",
        img: "./img/inteli5-9400f.jpg", categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 5555,
    },
    {
        id: "procesador-6", titulo: "intel i9-9900k",
        img: "./img/inteli9-9900k.jpg", categoria: {
            nombre: "Procesadores",
            id: "procesador"
        },
        precio: 5555,
    },
    {
        id: "amd-1", titulo: "AMD rx 6400",
        img: "./img/amdrx6400.jpg", categoria: {
            nombre: "Amd",
            id: "amd"
        },
        precio: 5555,
    },
    {
        id: "amd-2", titulo: "AMD rx 6500xt",
        img: "./img/amdrx6500xt.jpg", categoria: {
            nombre: "Amd",
            id: "amd"
        },
        precio: 5555,
    },
    {
        id: "amd-3", titulo: "AMD rx 6800xt",
        img: "./img/amdrx6800xt.jpg", categoria: {
            nombre: "Amd",
            id: "amd"
        },
        precio: 5555,
    },
    {
        id: "amd-4", titulo: "AMD rx 7600xt",
        img: "./img/amdrx7600xt.jpg", categoria: {
            nombre: "Amd",
            id: "amd"
        },
        precio: 5555,
    },
    {
        id: "amd-5", titulo: "AMD rx 7800xt",
        img: "./img/amdrx7800xt.jpg", categoria: {
            nombre: "Amd",
            id: "amd"
        },
        precio: 5555,
    },
    {
        id: "nvidia-1", titulo: "nvidia RTX 2080",
        img: "./img/nvidiartx2080.jpg", categoria: {
            nombre: "Nvidia",
            id: "nvidia"
        },
        precio: 5555,
    },
    {
        id: "nvidia-2", titulo: "nvidia RTX 2060",
        img: "./img/nvidia2060.jpg", categoria: {
            nombre: "Nvidia",
            id: "nvidia"
        },
        precio: 5555,
    },
    {
        id: "nvidia-3", titulo: "nvidia RTX 4070",
        img: "./img/nvidia4070.jpg", categoria: {
            nombre: "Nvidia",
            id: "nvidia"
        },
        precio: 5555,
    },
    {
        id: "nvidia-4", titulo: "nvidia GTX 970",
        img: "./img/nvidiagtx970.jpg", categoria: {
            nombre: "Nvidia",
            id: "nvidia"
        },
        precio: 5555,
    },
    {
        id: "nvidia-5", titulo: "nvidia GTX 1080ti",
        img: "./img/nvidiagtx1080ti.jpg", categoria: {
            nombre: "Nvidia",
            id: "nvidia"
        },
        precio: 5555,
    },
];



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

cargarProductos(productosMenu);

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