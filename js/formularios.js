
// funciones modulares (FUERA del DOMContentLoaded)

// --- Funciones de validación reutilizables ---
function validarLongitudMinima(texto, minimo) {
    if (texto.length < minimo) {
        return false;
    }
    return true;
}

function validarEmail(email) {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return false;
    }
    return true;
}

function validarCoincidencia(valor1, valor2) {
    if (valor1 !== valor2) {
        return false;
    }
    return true;
}

// --- Funciones de UI reutilizables ---
function resetearMensaje(elemento) {
    elemento.style.display = 'none';
}

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

// --- Función para guardar usuario en localStorage ---
function guardarUsuario(nombre, email) {
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('emailUsuario', email);
}

// --- Función para redirigir después de un tiempo ---
function redirigirDespues(url, milisegundos) {
    setTimeout(function () {
        window.location.href = url;
    }, milisegundos);
}


// ==========================================
// EVENTOS (DENTRO del DOMContentLoaded)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica del formulario de registro ---
    let formRegistro = document.getElementById('registroForm');

    if (formRegistro) {
        let mensaje = document.getElementById('mensaje-feedback');

        formRegistro.addEventListener('submit', function (event) {
            event.preventDefault();

            let nombre = document.getElementById('nombre-usuario').value.trim();
            let email = document.getElementById('email-usuario').value.trim();
            let pass = document.getElementById('pass-usuario').value;
            let passConfirm = document.getElementById('pass-confirmar').value;

            resetearMensaje(mensaje);
            let esValido = true;

            if (!validarLongitudMinima(nombre, 3)) {
                mostrarError(mensaje, 'El nombre debe tener al menos 3 caracteres.');
                esValido = false;
            }
            else if (!validarEmail(email)) {
                mostrarError(mensaje, 'El correo electrónico no es válido (debe tener @ y .).');
                esValido = false;
            }
            else if (!validarLongitudMinima(pass, 8)) {
                mostrarError(mensaje, 'La contraseña debe tener al menos 8 caracteres.');
                esValido = false;
            }
            else if (!validarCoincidencia(pass, passConfirm)) {
                mostrarError(mensaje, 'Las contraseñas no coinciden.');
                esValido = false;
            }

            if (esValido) {
                guardarUsuario(nombre, email);
                mostrarExito(mensaje, '✅ Registro exitoso. Bienvenido ' + nombre);
                formRegistro.reset();
                redirigirDespues('index.html', 1500);
            }
        });
    }


    // --- Lógica del formulario de contacto ---
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

            resetearMensaje(mensaje);
            let esValido = true;

            if (!validarLongitudMinima(nombre, 3) || !validarLongitudMinima(apellido, 3)) {
                mostrarError(mensaje, 'Nombre y apellido deben tener al menos 3 caracteres.');
                esValido = false;
            }
            else if (!validarEmail(correo)) {
                mostrarError(mensaje, 'El correo electrónico no es válido.');
                esValido = false;
            }
            else if (!validarLongitudMinima(asunto, 5)) {
                mostrarError(mensaje, 'El asunto debe tener al menos 5 caracteres.');
                esValido = false;
            }
            else if (!validarLongitudMinima(descripcion, 10)) {
                mostrarError(mensaje, 'La descripción debe tener al menos 10 caracteres.');
                esValido = false;
            }

            if (esValido) {
                mostrarExito(mensaje, '✅ ¡Mensaje enviado! Te contactaremos a ' + correo);
                formContacto.reset();
            }
        });
    }

});