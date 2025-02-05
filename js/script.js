let currentSlide = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.slider-container');
let slideWidth = sliderContainer.offsetWidth;


function updateSlideWidth() {
    slideWidth = sliderContainer.offsetWidth;
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
}


window.addEventListener('resize', updateSlideWidth);


function showSlide(index) {
    if(index < 0)
        index = slides.length - 1;
    else if(index >= slides.length)
        index = 0;

    currentSlide = index;
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Datos de los productos
const productos = [
    {
        id: 1,
        nombre: 'Papa Frita',
        peso: '30 gramos',
        precio: '3 Bs.',
        descripcion: 'Deliciosas papas fritas crujientes, perfectamente sazonadas.',
        imagen: 'img/papa1.png',
        disponible: true
    },
     {
        id: 5,
        nombre: 'Papa Frita',
        peso: '100 gramos',
        precio: '7 Bs.',
        descripcion: 'Papas fritas crujientes, tamaño mediano, perfectas para disfrutar solo o acompañado.',
        imagen: 'img/papa-100gr.jpg',
        disponible: true
    },
    {
        id: 2,
        nombre: 'Papa Frita',
        peso: '100 gramos',
        precio: '10 Bs.',
        descripcion: 'Porción familiar de nuestras papas fritas premium.',
        imagen: 'img/papa-100gr.jpg',
        disponible: false
    },
    {
        id: 3,
        nombre: 'Yuca Frita',
        peso: '30 gramos',
        precio: '3 Bs.',
        descripcion: 'Yuca frita crujiente, un snack tradicional y delicioso.',
        imagen: 'img/yuca1.png',
        disponible: true
    },
    {
        id: 4,
        nombre: 'Camote Frito',
        peso: '30 gramos',
        precio: '3 Bs.',
        descripcion: 'Camote frito dulce y crujiente, snack saludable.',
        imagen: 'img/camo1.png',
        disponible: true
    }
];

function showContent() {
    const contentContainer = document.querySelector('.content-container');
    if (!contentContainer) return;

    let content = '';

    if (window.location.pathname.includes("productos.html")) {

        //Generar HTML dinámicamente para todos los productos disponibles
        let productCardsHTML = '';
        productos.forEach(producto => {
            if (producto.disponible){
            productCardsHTML += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${producto.imagen}" alt="${producto.nombre} ${producto.peso}">
                    </div>
                    <h3 class="product-title">${producto.nombre}</h3>
                    <p class="product-weight">${producto.peso}</p>
                    <p class="product-price">${producto.precio}</p>
                    <p class="product-description">${producto.descripcion}</p>
                    <a href="https://wa.link/xw747a" class="buy-button" target="_blank">Comprar</a>
                </div>
            `;
        }
        });

        content = `
            <div class="products-container">
                 ${productCardsHTML}
            </div>
         `;
    } else {
        content = `
            <p style="text-align: center; margin-top: 2rem; font-size: 1.5rem;">¡Bienvenido a la página principal de Raíces Doradas!</p>
        `;
    }

    contentContainer.innerHTML = content;
}


window.addEventListener('DOMContentLoaded', function() {
    showContent();
    updateSlideWidth();

    if (slider) {
        setInterval(nextSlide, 5000);
    }
});