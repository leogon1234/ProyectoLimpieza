//JS DE REGISTRO
document.addEventListener("DOMContentLoaded", () => {
  const registro = document.getElementById("registro");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  registro.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Formulario enviado"); // <-- Para verificar en consola

    const nombreRegistro = document.getElementById("nombreRegistro").value.trim();
    const correoRegistro = document.getElementById("correoRegistro").value.trim();
    const contraseñaRegistro = document.getElementById("contraseñaRegistro").value.trim();

    if (!nombreRegistro || !correoRegistro || !contraseñaRegistro) {
      mensajeRegistro.textContent = "Por favor, completa todos los campos.";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find(user => user.correoRegistro === correoRegistro);
    if (usuarioExistente) {
      mensajeRegistro.textContent = "Este correo ya está registrado.";
      return;
    }

    usuarios.push({ nombreRegistro, correoRegistro, contraseñaRegistro });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mensajeRegistro.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";

    registro.reset();
  });
});

//JS DE LOGIN

//JS DE LOGIN ADMIN
    const formulario = document.getElementById('formularioLogin');
    const mensajeError = document.getElementById('mensajeError');

    formulario.addEventListener('submit', function(e) {
      e.preventDefault();

      const usuario = document.getElementById('usuario').value;
      const clave = document.getElementById('clave').value;
      const adminUsuario = "admin";
      const adminClave = "admin";

      if(usuario === adminUsuario && clave === adminClave){
        window.location.href = "admin.html";
      } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos";
      }
    });
