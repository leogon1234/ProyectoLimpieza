(() => {
  const IVA_PERCENT = 19;
  const STORAGE_KEY = "lf_products";

  const form = document.querySelector("form");
  const nameInput = form.querySelector('input[type="text"]');
  const descInput = form.querySelector("textarea");
  const numberInputs = form.querySelectorAll('input[type="number"]');
  const priceInput = numberInputs[0];
  const stockInput = numberInputs[1];
  const tbody = document.querySelector("table.table tbody");

  let products = [];
  let editingIndex = null; 

  const toInt = (v) => {
    if (typeof v === "number") return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, "");
    return n ? Math.round(parseInt(n, 10)) : 0;
  };

  const formatCLP = (n) => "$" + toInt(n).toLocaleString("es-CL");

  const clearForm = () => {
    form.reset();
    editingIndex = null;
    form.querySelector('.btn.btn-success').textContent = "Guardar";
  };

  const saveStorage = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  const loadStorageOrSeedFromTable = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      products = JSON.parse(raw);
      return;
    }
   
    products = Array.from(tbody.querySelectorAll("tr")).map((tr) => {
      const tds = tr.children;
      const name = tds[0]?.textContent.trim() || "";
      const price = toInt(tds[1]?.textContent);
      const iva = toInt(tds[2]?.textContent) || IVA_PERCENT;
      const stock = toInt(tds[4]?.textContent);
      return { name, desc: "", price, stock, iva };
    });
    saveStorage();
  };

  const render = () => {
    tbody.innerHTML = products
      .map((p, i) => {
        const priceWithIVA = Math.round(p.price * (1 + p.iva / 100));
        return `
        <tr data-index="${i}">
          <td>${p.name}</td>
          <td>${formatCLP(p.price)}</td>
          <td>${p.iva}%</td>
          <td>${formatCLP(priceWithIVA)}</td>
          <td>${p.stock}</td>
          <td>
            <button class="btn btn-sm btn-primary" data-action="edit">Editar</button>
            <button class="btn btn-sm btn-danger" data-action="delete">Eliminar</button>
          </td>
        </tr>`;
      })
      .join("");
  };

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const price = toInt(priceInput.value);
    const stock = toInt(stockInput.value);
    const iva = IVA_PERCENT;

    if (!name) {
      alert("Ingresa el nombre del producto.");
      return;
    }
    if (price <= 0) {
      alert("Ingresa un precio válido.");
      return;
    }
    if (stock < 0) {
      alert("Ingresa un stock válido (0 o más).");
      return;
    }

    const payload = { name, desc, price, stock, iva };

    if (editingIndex === null) {
      // Crear
      products.push(payload);
    } else {
      
      products[editingIndex] = payload;
    }

    saveStorage();
    render();
    clearForm();
  });

  
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const tr = e.target.closest("tr");
    const index = toInt(tr?.dataset.index);
    const action = btn.dataset.action;

    if (action === "delete") {
      if (confirm("¿Eliminar este producto?")) {
        products.splice(index, 1);
        saveStorage();
        render();
        if (editingIndex === index) clearForm();
      }
      return;
    }

    if (action === "edit") {
      const p = products[index];
      nameInput.value = p.name;
      descInput.value = p.desc || "";
      priceInput.value = p.price;
      stockInput.value = p.stock;
      editingIndex = index;
      form.querySelector('.btn.btn-success').textContent = "Actualizar";
    }
  });

 
  document.addEventListener("DOMContentLoaded", () => {
    loadStorageOrSeedFromTable();
    render();
  });
})();

// js/admin.js
(() => {
  const IVA_PERCENT = 19;
  const STORAGE_KEY = "lf_products";

  const form = document.querySelector("form");
  const nameInput = form.querySelector('input[type="text"]');
  const descInput = form.querySelector("textarea");
  const numberInputs = form.querySelectorAll('input[type="number"]');
  const priceInput = numberInputs[0];
  const stockInput = numberInputs[1];
  const tbody = document.querySelector("table.table tbody");

  let products = [];
  let editingIndex = null; // null = creando, número = editando

  // --- Utils ---
  const toInt = (v) => {
    if (typeof v === "number") return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, "");
    return n ? Math.round(parseInt(n, 10)) : 0;
  };

  const formatCLP = (n) => "$" + toInt(n).toLocaleString("es-CL");

  const clearForm = () => {
    form.reset();
    editingIndex = null;
    form.querySelector('.btn.btn-success').textContent = "Guardar";
  };

  const saveStorage = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  const loadStorageOrSeedFromTable = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      products = JSON.parse(raw);
      return;
    }
    // Si no hay storage aún, tomamos lo que está en la tabla (tu fila de ejemplo)
    products = Array.from(tbody.querySelectorAll("tr")).map((tr) => {
      const tds = tr.children;
      const name = tds[0]?.textContent.trim() || "";
      const price = toInt(tds[1]?.textContent);
      const iva = toInt(tds[2]?.textContent) || IVA_PERCENT;
      const stock = toInt(tds[4]?.textContent);
      return { name, desc: "", price, stock, iva };
    });
    saveStorage();
  };

  const render = () => {
    tbody.innerHTML = products
      .map((p, i) => {
        const priceWithIVA = Math.round(p.price * (1 + p.iva / 100));
        return `
        <tr data-index="${i}">
          <td>${p.name}</td>
          <td>${formatCLP(p.price)}</td>
          <td>${p.iva}%</td>
          <td>${formatCLP(priceWithIVA)}</td>
          <td>${p.stock}</td>
          <td>
            <button class="btn btn-sm btn-primary" data-action="edit">Editar</button>
            <button class="btn btn-sm btn-danger" data-action="delete">Eliminar</button>
          </td>
        </tr>`;
      })
      .join("");
  };

  // --- Eventos ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const price = toInt(priceInput.value);
    const stock = toInt(stockInput.value);
    const iva = IVA_PERCENT;

    if (!name) {
      alert("Ingresa el nombre del producto.");
      return;
    }
    if (price <= 0) {
      alert("Ingresa un precio válido.");
      return;
    }
    if (stock < 0) {
      alert("Ingresa un stock válido (0 o más).");
      return;
    }

    const payload = { name, desc, price, stock, iva };

    if (editingIndex === null) {
      // Crear
      products.push(payload);
    } else {
      // Actualizar
      products[editingIndex] = payload;
    }

    saveStorage();
    render();
    clearForm();
  });

  // Delegación para Editar/Eliminar
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const tr = e.target.closest("tr");
    const index = toInt(tr?.dataset.index);
    const action = btn.dataset.action;

    if (action === "delete") {
      if (confirm("¿Eliminar este producto?")) {
        products.splice(index, 1);
        saveStorage();
        render();
        if (editingIndex === index) clearForm();
      }
      return;
    }

    if (action === "edit") {
      const p = products[index];
      nameInput.value = p.name;
      descInput.value = p.desc || "";
      priceInput.value = p.price;
      stockInput.value = p.stock;
      editingIndex = index;
      form.querySelector('.btn.btn-success').textContent = "Actualizar";
    }
  });

  // --- Init ---
  document.addEventListener("DOMContentLoaded", () => {
    loadStorageOrSeedFromTable();
    render();
  });
})();