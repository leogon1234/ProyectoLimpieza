//JS DE REGISTRO
document.addEventListener("DOMContentLoaded", () => {
  const registro = document.getElementById("registro");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  registro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = registro.nombreRegistro.value.trim();
    const correo = registro.correoRegistro.value.trim();
    const contraseña = registro.contraseñaRegistro.value.trim();

    let valido = true;



    //Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mensajeRegistro.textContent = "¡Correo no válido!";
      mensajeRegistro.style.color = "red";
      valido = false;
    }
    //Validar contraseña
    if (contraseña.length < 6) {
      mensajeRegistro.textContent = "¡La contraseña debe tener al menos 6 caracteres!";
      mensajeRegistro.style.color = "red";
      valido = false;
    }

    if (!valido) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //Revisar si ya existe el correo
    if (usuarios.some(user => user.correo === correo)) {
      mensajeRegistro.textContent = "¡Este correo ya está registrado!";
      mensajeRegistro.style.color = "red";
      return;
    }

    mensajeRegistro.textContent = "¡Registro exitoso! Redirigiendo...";
    mensajeRegistro.style.color = "green";

    //Guardar usuario
    usuarios.push({ nombre, correo, contraseña });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

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

    const correo = loginForm.querySelector('input[name="correoLogin"]').value.trim();
    const contraseña = loginForm.querySelector('input[name="contraseñaLogin"]').value.trim();

    // Si es admin
    if (correo === "admin" && contraseña === "admin") {
      mensajeLogin.textContent = "¡Bienvenido Administrador!";
      mensajeLogin.style.color = "green";

      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1000);
      return;
    }

    // Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mensajeLogin.textContent = "¡Correo no válido!";
      mensajeLogin.style.color = "red";
      return;
    }

    // Validar contraseña
    if (contraseña.length < 6) {
      mensajeLogin.textContent = "¡La contraseña debe tener al menos 6 caracteres!";
      mensajeLogin.style.color = "red";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(user => user.correo === correo && user.contraseña === contraseña);

    if (usuarioValido) {
      mensajeLogin.textContent = "¡Inicio de sesión correcto!";
      mensajeLogin.style.color = "green";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      mensajeLogin.textContent = "Usuario o contraseña incorrectos";
      mensajeLogin.style.color = "red";
    }
  });
});