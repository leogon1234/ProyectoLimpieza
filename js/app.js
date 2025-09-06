//JS DE REGISTRO
document.addEventListener("DOMContentLoaded", () => {
  const registro = document.getElementById("registro");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  registro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = registro.nombreRegistro.value;
    const correo = registro.correoRegistro.value;
    const contraseña = registro.contraseñaRegistro.value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Revisar si ya existe el correo
    if (usuarios.some(user => user.correo === correo)) {
      mensajeRegistro.textContent = "¡Este correo ya está registrado!";
      mensajeRegistro.style.color = "red";
      return;
    }

    // Guardar nuevo usuario
    usuarios.push({ nombre, correo, contraseña });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeRegistro.textContent = "¡Registro exitoso! Redirigiendo...";
    mensajeRegistro.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
});


//JS DE LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");
  const mensajeLogin = document.getElementById("mensajeLogin");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los inputs de manera segura
    const correo = loginForm.querySelector('input[name="correoLogin"]').value;
    const contraseña = loginForm.querySelector('input[name="contraseñaLogin"]').value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(user => user.correo === correo && user.contraseña === contraseña);

    if (usuarioValido) {
      mensajeLogin.textContent = "¡Inicio de sesión correcto!";
      mensajeLogin.style.color = "green";

      setTimeout(() => {
        window.location.href = "prueba.html";
      }, 1000);
    } else {
      mensajeLogin.textContent = "Usuario o contraseña incorrectos";
      mensajeLogin.style.color = "red";
    }
  });
});



//JS DE LOGIN ADMIN
const formulario = document.getElementById('formularioLogin');
const mensajeError = document.getElementById('mensajeError');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;
  const adminUsuario = "admin";
  const adminClave = "admin";

  if (usuario === adminUsuario && clave === adminClave) {
    window.location.href = "admin.html";
  } else {
    mensajeError.textContent = "Usuario o contraseña incorrectos";
  }
});