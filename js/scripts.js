/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

    const form = document.getElementById("formProducto");
    const tablaBody = document.querySelector("#tablaProductos tbody");

    // Cargar productos desde LocalStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    function renderProductos() {
        tablaBody.innerHTML = "";
        productos.forEach((prod, index) => {
            const fila = `
                <tr>
                    <td>${prod.nombre}</td>
                    <td>$${prod.precio}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const precio = document.getElementById("precio").value;

        productos.push({ nombre, precio });
        localStorage.setItem("productos", JSON.stringify(productos));

        form.reset();
        renderProductos();
    });

    function eliminarProducto(index) {
        productos.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        renderProductos();
    }

    function editarProducto(index) {
        const nuevoPrecio = prompt("Ingrese el nuevo precio:", productos[index].precio);
        if(nuevoPrecio !== null && nuevoPrecio !== ""){
            productos[index].precio = nuevoPrecio;
            localStorage.setItem("productos", JSON.stringify(productos));
            renderProductos();
        }
    }

    renderProductos();
