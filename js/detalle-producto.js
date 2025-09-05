// Simulación de productos
const productos = [
  {
    id: 1,
    nombre: "Detergente Líquido",
    desc: "Ideal para ropa y superficies.",
    img: "img/Detergente.jpg",
    precio: 5990,
    oferta: false,
    precioOferta: null
  },
  {
    id: 2,
    nombre: "Cloro Desinfectante",
    desc: "Elimina el 99.9% de bacterias.",
    img: "img/Cloro.jpg",
    precio: 2500,
    oferta: true,
    precioOferta: 2000
  },
  {
    id: 3,
    nombre: "Escoba Multiuso",
    desc: "Perfecta para interiores y exteriores.",
    img: "img/escoba.jpg",
    precio: 3500,
    oferta: false,
    precioOferta: null
  },
  {
    id: 4,
    nombre: "Guantes de Limpieza",
    desc: "Protección para tus manos.",
    img: "img/guantes.jpg",
    precio: 1500,
    oferta: true,
    precioOferta: 1200
  },
  {
    id: 5,
    nombre: "Esponja Multiuso",
    desc: "Ideal para cocina y baño.",
    img: "img/esponja.jpg",
    precio: 800,
    oferta: false,
    precioOferta: null
  },
  {
    id: 6,
    nombre: "Limpiavidrios",
    desc: "Brillo sin manchas.",
    img: "img/limpiavidrios.jpg",
    precio: 3000,
    oferta: true,
    precioOferta: 2500
  },
  {
    id: 7,
    nombre: "Trapo de Piso",
    desc: "Absorbente y resistente.",
    img: "img/trapo.jpg",
    precio: 1000,
    oferta: false,
    precioOferta: null
  },
  {
    id: 8,
    nombre: "Escobillón",
    desc: "Cerdas resistentes para exteriores.",
    img: "img/escobillon.jpg",
    precio: 2200,
    oferta: false,
    precioOferta: null
  },
  {
    id: 9,
    nombre: "Limpiapisos",
    desc: "Fragancia duradera.",
    img: "img/limpiapisos.jpg",
    precio: 3500,
    oferta: true,
    precioOferta: 3000
  },
  {
    id: 10,
    nombre: "Cepillo de Limpieza",
    desc: "Ideal para superficies difíciles.",
    img: "img/cepillo.jpg",
    precio: 1800,
    oferta: false,
    precioOferta: null
  },
  {
    id: 11,
    nombre: "Bolsas de Basura",
    desc: "Resistentes y prácticas.",
    img: "img/bolsas.jpg",
    precio: 1500,
    oferta: false,
    precioOferta: null
  },
  {
    id: 12,
    nombre: "Limpiador Multiuso",
    desc: "Eficaz en todas las superficies.",
    img: "img/limpiador-multiuso.jpg",
    precio: 3200,
    oferta: true,
    precioOferta: 2800
  }
];

// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
let producto = productos.find(p => p.id === id) || productos[0];

// Generar ID aleatorio para mostrar
function generarID() {
  return 'SKU-' + Math.floor(100000 + Math.random() * 900000);
}

// Mostrar datos
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('detalle-img').src = producto.img;
  document.getElementById('detalle-nombre').textContent = producto.nombre;
  document.getElementById('detalle-desc').textContent = producto.desc;
  document.getElementById('detalle-id').textContent = 'ID: ' + generarID();
  if(producto.oferta) {
    document.getElementById('detalle-precios').innerHTML = `<span class="detalle-precio-oferta">$${producto.precioOferta.toLocaleString()}</span> <span class="detalle-precio-tachado">$${producto.precio.toLocaleString()}</span>`;
  } else {
    document.getElementById('detalle-precios').innerHTML = `<span class="detalle-precio">$${producto.precio.toLocaleString()}</span>`;
  }
});
