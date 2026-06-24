document.addEventListener('DOMContentLoaded', function () {

    //Logica para el formulario de registro
    let formRegistro = document.getElementById('registroForm');

    if (formRegistro) {
        let mensaje = document.getElementById('mensaje-feedback');

        formRegistro.addEventListener('submit', function (event) {
            // Evita que el formulario se envíe
            event.preventDefault();

            let nombre = document.getElementById('nombre-usuario').value.trim();
            let email = document.getElementById('email-usuario').value.trim();
            let pass = document.getElementById('pass-usuario').value;
            let passConfirm = document.getElementById('pass-confirmar').value;

            mensaje.style.display = 'none';
            let esValido = true; //usamos bandera

            if (nombre.length < 3) {
                mostrarError(mensaje, 'El nombre debe tener al menos 3 caracteres.');
                esValido = false;
            }
            else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                mostrarError(mensaje, 'El correo electrónico no es válido (debe tener @ y .).');
                esValido = false;
            }
            else if (pass.length < 8) {
                mostrarError(mensaje, 'La contraseña debe tener al menos 8 caracteres.');
                esValido = false;
            }
            else if (pass !== passConfirm) {
                mostrarError(mensaje, 'Las contraseñas no coinciden.');
                esValido = false;
            }

            if (esValido) {
                localStorage.setItem('nombreUsuario', nombre);
                localStorage.setItem('emailUsuario', email);

                mostrarExito(mensaje, '✅ Registro exitoso. Bienvenido ' + nombre);
                formRegistro.reset();

                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }


    // 2. Logica para el formulario de contacto
    let formContacto = document.getElementById('contactoForm');

    if (formContacto) {
        let mensaje = document.getElementById('mensaje-feedback');

        formContacto.addEventListener('submit', function (event) {
            event.preventDefault();

            let nombre = document.getElementById('nombre').value.trim();
            let apellido = document.getElementById('apellido').value.trim();
            let correo = document.getElementById('correo').value.trim();
            let asunto = document.getElementById('asunto').value.trim();
            let descripcion = document.getElementById('descripcion').value.trim();

            mensaje.style.display = 'none';
            let esValido = true;

            if (nombre.length < 3 || apellido.length < 3) {
                mostrarError(mensaje, 'Nombre y apellido deben tener al menos 3 caracteres.');
                esValido = false;
            }
            else if (correo.indexOf('@') === -1 || correo.indexOf('.') === -1) {
                mostrarError(mensaje, 'El correo electrónico no es válido.');
                esValido = false;
            }
            else if (asunto.length < 5) {
                mostrarError(mensaje, 'El asunto debe tener al menos 5 caracteres.');
                esValido = false;
            }
            else if (descripcion.length < 10) {
                mostrarError(mensaje, 'La descripción debe tener al menos 10 caracteres.');
                esValido = false;
            }

            if (esValido) {
                mostrarExito(mensaje, '✅ ¡Mensaje enviado! Te contactaremos a ' + correo);
                formContacto.reset();
            }
        });
    }


    // Funciones auxiliares para mostrar mensajes de error y éxito
    function mostrarError(elemento, texto) {
        elemento.textContent = texto;
        elemento.style.backgroundColor = '#fff5f5';
        elemento.style.borderColor = '#cc0000';
        elemento.style.color = '#cc0000';
        elemento.style.display = 'block';
    }

    function mostrarExito(elemento, texto) {
        elemento.textContent = texto;
        elemento.style.backgroundColor = '#e8f4fd';
        elemento.style.borderColor = '#27ae60';
        elemento.style.color = '#27ae60';
        elemento.style.display = 'block';
    }
});