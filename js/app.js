
// funciones modulares (FUERA del document.ready)
function obtenerCantidadCarrito() {
    let cantidad = localStorage.getItem('cantidadCarrito');
    if (cantidad === null) {
        return 0;
    }
    return parseInt(cantidad);
}

function limpiarCarrito() {
    let cantidad = obtenerCantidadCarrito();
    for (let i = 0; i < cantidad; i++) {
        localStorage.removeItem('item_' + i + '_nombre');
        localStorage.removeItem('item_' + i + '_precio');
    }
    localStorage.removeItem('cantidadCarrito');
}

function calcularSubtotal() {
    let cantidad = obtenerCantidadCarrito();
    let subtotal = 0;
    for (let i = 0; i < cantidad; i++) {
        let precio = localStorage.getItem('item_' + i + '_precio');
        subtotal = subtotal + parseFloat(precio);
    }
    return subtotal;
}

function actualizarInterfazUsuario() {
    let nombreRegistrado = localStorage.getItem('nombreUsuario');
    let objUserDisplay = $('#user-display');

    if (nombreRegistrado !== null && nombreRegistrado !== "") {
        objUserDisplay.text('👤 ' + nombreRegistrado + ' ▼');
        objUserDisplay.css({ 'background-color': '#1a252f', 'border-color': '#ff9900', 'color': '#ffffff' });
        objUserDisplay.attr('href', '#');
        $('#dropdown-usuario').hide();
    } else {
        objUserDisplay.text(' 10% OFF Registrate');
        objUserDisplay.css({ 'background-color': '', 'border-color': '', 'color': '' });
        objUserDisplay.attr('href', 'registro.html');
        $('#dropdown-usuario').hide();
    }
}

function actualizarContadorCarrito() {
    let cantidad = obtenerCantidadCarrito();
    $('#contador-carrito').text(cantidad);
}

function mostrarCarritoCompleto() {
    let cantidad = obtenerCantidadCarrito();
    let contenedor = $('#contenedor-items');
    let subtotal = 0;

    if (cantidad === 0) {
        contenedor.html('<p class="carrito-vacio">Tu carrito está vacío. ¡Agregá algunos productos!</p>');
        actualizarTotales(0);
    } else {
        let html = '<ul class="lista-carrito-simple">';
        for (let i = 0; i < cantidad; i++) {
            let nombre = localStorage.getItem('item_' + i + '_nombre');
            let precio = parseFloat(localStorage.getItem('item_' + i + '_precio'));
            subtotal = subtotal + precio;
            html = html + '<li class="item-carrito-simple">';
            html = html + '<strong>' + nombre + '</strong> - $' + precio.toFixed(2);
            html = html + '</li>';
        }
        html = html + '</ul>';
        contenedor.html(html);
        actualizarTotales(subtotal);
    }
}

function actualizarTotales(subtotal) {
    let metodo = $('#metodo-pago').val();
    subtotal = subtotal || 0;
    let total = subtotal;
    let cuotas = 0;

    if (metodo === 'efectivo') {
        total = subtotal * 0.90;
    } else if (metodo === 'transferencia') {
        total = subtotal * 0.85;
    } else if (metodo === 'tarjeta') {
        total = subtotal * 1.20;
        cuotas = total / 3;
    }

    let nombreRegistrado = localStorage.getItem('nombreUsuario');
    let msjDescuento = $('#msj-descuento-socio');

    if (nombreRegistrado && total > 0) {
        total = total * 0.90;
        if (msjDescuento.length === 0) {
            $('.total-destacado').before('<div id="msj-descuento-socio" style="color: #27ae60; font-weight: bold; font-size: 14px; text-align: right; margin-bottom: 5px;">✅ 10% OFF Socio Aplicado</div>');
        } else {
            msjDescuento.show();
        }
    } else {
        if (msjDescuento.length > 0) {
            msjDescuento.remove();
        }
    }

    $('#subtotal').text(subtotal.toFixed(2));
    $('#total-final').text(total.toFixed(2));

    if (metodo === 'tarjeta' && total > 0) {
        $('#texto-cuotas').fadeIn(200);
        $('#valor-cuota').text(cuotas.toFixed(2));
    } else {
        $('#texto-cuotas').hide();
    }
}


// ==========================================
// EVENTOS (DENTRO del document.ready)
// ==========================================
$(document).ready(function () {

    // Inicialización
    $('.tarjeta').fadeTo(1000, 1.0);
    actualizarInterfazUsuario();
    actualizarContadorCarrito();

    if ($('#vista-carrito').length > 0) {
        mostrarCarritoCompleto();
    }

    // Menú desplegable
    $('#user-display').click(function (evento) {
        let nombreRegistrado = localStorage.getItem('nombreUsuario');
        if (nombreRegistrado !== null && nombreRegistrado !== "") {
            evento.preventDefault();
            evento.stopPropagation();
            $('#dropdown-usuario').slideToggle(200);
        }
    });

    $(document).click(function () {
        $('#dropdown-usuario').slideUp(200);
    });

    // Cerrar sesión
    $('#btn-logout-dropdown').click(function (evento) {
        evento.preventDefault();
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('emailUsuario');
        limpiarCarrito(); // ← Reutiliza la función modular
        window.location.href = 'index.html';
    });

    // Agregar al carrito
    $(document).on('click', '.btn-agregar', function () {
        let nombreProd = $(this).attr('data-nombre');
        let precioProd = $(this).attr('data-precio');
        let cantidad = obtenerCantidadCarrito(); // ← Reutiliza la función modular

        localStorage.setItem('item_' + cantidad + '_nombre', nombreProd);
        localStorage.setItem('item_' + cantidad + '_precio', precioProd);
        cantidad = cantidad + 1;
        localStorage.setItem('cantidadCarrito', cantidad);

        actualizarContadorCarrito();
        alert('✅ Agregaste ' + nombreProd + ' al carrito.');
    });

    // Cambio de método de pago
    $('#metodo-pago').change(function () {
        let subtotal = calcularSubtotal(); // ← Reutiliza la función modular
        actualizarTotales(subtotal);
    });

    // Vaciar carrito
    $('#btn-vaciar').click(function () {
        if (confirm('¿Vaciar completamente el carrito?')) {
            limpiarCarrito(); // ← Reutiliza la función modular
            actualizarContadorCarrito();
            mostrarCarritoCompleto();
        }
    });

    // Confirmar compra
    $('#btn-confirmar').click(function () {
        let cantidad = obtenerCantidadCarrito();
        if (cantidad === 0) {
            alert('El carrito está vacío.');
        } else {
            alert('¡Compra confirmada por $' + $('#total-final').text() + '!');
            limpiarCarrito(); // ← Reutiliza la función modular
            window.location.href = 'index.html';
        }
    });

});