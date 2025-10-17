// --- Mostrar productos en carrito.html ---
if (window.location.pathname.endsWith('carrito.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    // Array de productos igual que en detalle-producto.js
    const productos = [
      { id: 1, nombre: "Detergente Líquido", img: "img/Detergente.jpg", precio: 5990, oferta: false, precioOferta: null },
      { id: 2, nombre: "Cloro Desinfectante", img: "img/Cloro.jpg", precio: 2500, oferta: true, precioOferta: 2000 },
      { id: 3, nombre: "Escoba Multiuso", img: "img/escoba.jpg", precio: 3500, oferta: false, precioOferta: null },
      { id: 4, nombre: "Guantes de Limpieza", img: "img/guantes.jpg", precio: 1500, oferta: true, precioOferta: 1200 },
      { id: 5, nombre: "Esponja Multiuso", img: "img/esponja.jpg", precio: 800, oferta: false, precioOferta: null },
      { id: 6, nombre: "Limpiavidrios", img: "img/limpiavidrios.jpg", precio: 3000, oferta: true, precioOferta: 2500 },
      { id: 7, nombre: "Trapo de Piso", img: "img/trapo.jpg", precio: 1000, oferta: false, precioOferta: null },
      { id: 8, nombre: "Escobillón", img: "img/escobillon.jpg", precio: 2200, oferta: false, precioOferta: null },
      { id: 9, nombre: "Limpiapisos", img: "img/limpiapisos.jpg", precio: 3500, oferta: true, precioOferta: 3000 },
      { id: 10, nombre: "Cepillo de Limpieza", img: "img/cepillo.jpg", precio: 1800, oferta: false, precioOferta: null },
      { id: 11, nombre: "Bolsas de Basura", img: "img/bolsas.jpg", precio: 1500, oferta: false, precioOferta: null },
      { id: 12, nombre: "Limpiador Multiuso", img: "img/limpiador-multiuso.jpg", precio: 3200, oferta: true, precioOferta: 2800 }
    ];

    const carrito = getCarrito();
    const lista = document.getElementById('carrito-lista');
    const totalSpan = document.getElementById('carrito-total');

    if (!carrito.length) {
      if (lista) lista.innerHTML = '<p>El carrito está vacío.</p>';
      if (totalSpan) totalSpan.textContent = '$0';
      const ivaDiv = document.getElementById('carrito-original-iva');
      if (ivaDiv) ivaDiv.innerHTML = '';
      return;
    }

    let total = 0;
    let html = '<table class="table"><thead><tr><th>Producto</th><th>Nombre</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th><th></th></tr></thead><tbody>';
    carrito.forEach(item => {
      const prod = productos.find(p => p.id === item.id);
      if (!prod) return;
      const precioUnit = prod.oferta ? prod.precioOferta : prod.precio;
      const subtotal = precioUnit * item.cantidad;
      total += subtotal;
      html += `<tr>
        <td><img src="${prod.img}" alt="${prod.nombre}" style="width:60px;height:60px;object-fit:contain;"></td>
        <td>${prod.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${precioUnit.toLocaleString()}</td>
        <td>$${subtotal.toLocaleString()}</td>
        <td><button class='btn btn-danger btn-sm' onclick='eliminarDelCarrito(${item.id})'><i class="bi bi-trash"></i></button></td>
      </tr>`;
    });
    html += '</tbody></table>';
    if (lista) lista.innerHTML = html;
    if (totalSpan) totalSpan.textContent = '$' + total.toLocaleString();

    // Calcular y mostrar IVA
    const ivaDiv = document.getElementById('carrito-original-iva');
    if (ivaDiv) {
      const subtotal = Math.round(total / 1.19);
      const iva = total - subtotal;
      ivaDiv.innerHTML = `
        <div class="carrito-iva-col">
          <span class="carrito-iva-item">Subtotal: <b>$${subtotal.toLocaleString()}</b></span>
          <span class="carrito-iva-item">IVA (19%): <b>$${iva.toLocaleString()}</b></span>
        </div>
      `;
    }
  });
}

// --- Carrito global (localStorage) ---
function getCarrito() {
  try { return JSON.parse(localStorage.getItem('carrito') || '[]'); }
  catch { return []; }
}

function setCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito(); // update inmediato del badge
}

// 🔧 Actualiza TODOS los posibles badges de carrito
function actualizarContadorCarrito() {
  const carrito = getCarrito();
  const total = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  const nodos = document.querySelectorAll('#lfCartBadge, #carrito-contador, .js-cart-badge, [data-cart-badge]');
  nodos.forEach(el => { el.textContent = String(total); });
}

// Actualiza al cargar la página cuando el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
} else {
  actualizarContadorCarrito();
}

// Sincroniza entre pestañas/ventanas
window.addEventListener('storage', (e) => {
  if (e.key === 'carrito') actualizarContadorCarrito();
});

// --- Agregar / Quitar ---
window.agregarAlCarrito = function (id) {
  const carrito = getCarrito();
  const idx = carrito.findIndex(p => p.id === id);
  if (idx >= 0) carrito[idx].cantidad += 1;
  else carrito.push({ id, cantidad: 1 });
  setCarrito(carrito);
};

window.agregarAlCarritoConCantidad = function (id, cantidad) {
  const carrito = getCarrito();
  const idx = carrito.findIndex(p => p.id === id);
  if (idx >= 0) carrito[idx].cantidad += cantidad;
  else carrito.push({ id, cantidad });
  setCarrito(carrito);
};

window.eliminarDelCarrito = function (id) {
  const carrito = getCarrito().filter(item => item.id !== id);
  setCarrito(carrito);
  location.reload();
};
// ===================== CARRITO: BADGE UNIVERSAL =====================
(function () {
  // Soporta ambas convenciones de id (nuevo y antiguo)
  const BADGE_SELECTORS = ['#lfCartBadge', '#carrito-contador'];

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sels) => sels.map(s => $(s)).filter(Boolean);

  function getCarrito() {
    try { return JSON.parse(localStorage.getItem('carrito') || '[]'); }
    catch { return []; }
  }
  function setCarrito(c) { localStorage.setItem('carrito', JSON.stringify(c)); }

  function contarItems() {
    return getCarrito().reduce((acc, item) => acc + Number(item.cantidad || 0), 0);
  }

  function pintarBadge() {
    const n = contarItems();
    const els = $$(BADGE_SELECTORS);
    els.forEach(el => {
      el.textContent = n;
      el.style.display = '';                // por si estaba oculto
      el.classList.remove('d-none');        // por si un CSS lo escondía
      el.setAttribute('aria-label', `Carrito: ${n}`);
    });
    return n;
  }

  // Exponer para que puedas llamarla cuando quieras
  window.actualizarContadorCarrito = pintarBadge;

  // Pintar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pintarBadge);
  } else {
    pintarBadge();
  }

  // Sincronizar si cambió localStorage en otra pestaña
  window.addEventListener('storage', (e) => {
    if (e.key === 'carrito') pintarBadge();
  });

  // Parchear/envolver los agregadores para que SIEMPRE actualicen el badge
  function envolverAgregador(nombre, fallback) {
    const original = window[nombre];
    if (typeof original === 'function') {
      window[nombre] = function () {
        const r = original.apply(this, arguments);
        pintarBadge();
        return r;
      };
    } else {
      window[nombre] = fallback;
    }
  }

  // Fallbacks por si no existían
  const addBase = (id, qty) => {
    const cantidad = Number(qty) || 1;
    const c = getCarrito();
    const i = c.findIndex(p => p.id === id);
    if (i >= 0) c[i].cantidad = (Number(c[i].cantidad) || 0) + cantidad;
    else c.push({ id, cantidad });
    setCarrito(c);
    pintarBadge();
  };

  envolverAgregador('agregarAlCarrito', (id) => addBase(id, 1));
  envolverAgregador('agregarAlCarritoConCantidad', (id, cantidad) => addBase(id, cantidad));
})();
