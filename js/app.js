$(document).ready(function () {


    actualizarInterfazUsuario();
    actualizarContadorCarrito();

    if ($('#vista-carrito').length > 0) {
        mostrarCarritoCompleto();
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

    // Menú desplegable con efecto slideToggle
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

        // Limpiar carrito manual
        let cantidad = localStorage.getItem('cantidadCarrito');
        if (cantidad !== null) {
            cantidad = parseInt(cantidad);
            for (let i = 0; i < cantidad; i++) {
                localStorage.removeItem('item_' + i + '_nombre');
                localStorage.removeItem('item_' + i + '_precio');
            }
        }
        localStorage.removeItem('cantidadCarrito');

        window.location.href = 'index.html';
    });

    //  simulador carrito basico con localstorage 
    function actualizarContadorCarrito() {
        let cantidad = localStorage.getItem('cantidadCarrito');
        if (cantidad === null) {
            cantidad = 0;
        }
        $('#contador-carrito').text(cantidad);
    }

    // Agregar al carrito
    $(document).on('click', '.btn-agregar', function () {
        let nombreProd = $(this).attr('data-nombre');
        let precioProd = $(this).attr('data-precio');

        let cantidad = localStorage.getItem('cantidadCarrito');
        if (cantidad === null) {
            cantidad = 0;
        } else {
            cantidad = parseInt(cantidad);
        }

        localStorage.setItem('item_' + cantidad + '_nombre', nombreProd);
        localStorage.setItem('item_' + cantidad + '_precio', precioProd);

        cantidad = cantidad + 1; // CONTADOR
        localStorage.setItem('cantidadCarrito', cantidad);

        actualizarContadorCarrito();
        alert('✅ Agregaste ' + nombreProd + ' al carrito.');
    });

    // Mostrar carrito completo en carrito.html
    function mostrarCarritoCompleto() {
        let cantidad = localStorage.getItem('cantidadCarrito');
        if (cantidad === null) {
            cantidad = 0;
        } else {
            cantidad = parseInt(cantidad);
        }

        let contenedor = $('#contenedor-items');
        let subtotal = 0; // acumulador para el subtotal

        if (cantidad === 0) {
            contenedor.html('<p class="carrito-vacio">Tu carrito está vacío. ¡Agregá algunos productos!</p>');
            actualizarTotales(0);
        } else {
            let html = '<ul class="lista-carrito-simple">';

            for (let i = 0; i < cantidad; i++) {
                let nombre = localStorage.getItem('item_' + i + '_nombre');
                let precio = localStorage.getItem('item_' + i + '_precio');

                precio = parseFloat(precio);
                subtotal = subtotal + precio; // ACUMULADOR

                html = html + '<li class="item-carrito-simple">';
                html = html + '<strong>' + nombre + '</strong> - $' + precio.toFixed(2);
                html = html + '</li>';
            }

            html = html + '</ul>';
            contenedor.html(html);

            actualizarTotales(subtotal);
        }
    }

    //LÓGICA DE DESCUENTOS Y MÉTODOS DE PAGO
    function actualizarTotales(subtotal) {
        let metodo = $('#metodo-pago').val();
        subtotal = subtotal || 0;
        let total = subtotal;
        let cuotas = 0;

        // 1. Descuentos por método de pago 
        if (metodo === 'efectivo') {
            total = subtotal * 0.90; // 10% OFF
        } else if (metodo === 'transferencia') {
            total = subtotal * 0.85; // 15% OFF
        } else if (metodo === 'tarjeta') {
            total = subtotal * 1.20; // 20% Recargo
            cuotas = total / 3;
        }

        // 2. Verificamos si está logueado para darle su 10% OFF de socio
        let nombreRegistrado = localStorage.getItem('nombreUsuario');
        let msjDescuento = $('#msj-descuento-socio');

        if (nombreRegistrado && total > 0) {
            total = total * 0.90; // 10% OFF Socio
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

        // Imprimimos los números en pantalla
        $('#subtotal').text(subtotal.toFixed(2));
        $('#total-final').text(total.toFixed(2));

        if (metodo === 'tarjeta' && total > 0) {
            $('#texto-cuotas').fadeIn(200);
            $('#valor-cuota').text(cuotas.toFixed(2));
        } else {
            $('#texto-cuotas').hide();
        }
    }

    // Evento al cambiar el método de pago
    $('#metodo-pago').change(function () {
        let cantidad = localStorage.getItem('cantidadCarrito');
        let subtotal = 0;
        if (cantidad !== null) {
            cantidad = parseInt(cantidad);
            for (let i = 0; i < cantidad; i++) {
                let precio = localStorage.getItem('item_' + i + '_precio');
                subtotal = subtotal + parseFloat(precio);
            }
        }
        actualizarTotales(subtotal);
    });

    // Vaciar carrito
    $('#btn-vaciar').click(function () {
        if (confirm('¿Vaciar completamente el carrito?')) {
            let cantidad = localStorage.getItem('cantidadCarrito');
            if (cantidad !== null) {
                cantidad = parseInt(cantidad);
                for (let i = 0; i < cantidad; i++) {
                    localStorage.removeItem('item_' + i + '_nombre');
                    localStorage.removeItem('item_' + i + '_precio');
                }
            }
            localStorage.removeItem('cantidadCarrito');
            actualizarContadorCarrito();
            mostrarCarritoCompleto();
        }
    });

    // Confirmar compra
    $('#btn-confirmar').click(function () {
        let cantidad = localStorage.getItem('cantidadCarrito');
        if (cantidad === null || parseInt(cantidad) === 0) {
            alert('El carrito está vacío.');
        } else {
            alert('¡Compra confirmada por $' + $('#total-final').text() + '!');
            let cant = parseInt(cantidad);
            for (let i = 0; i < cant; i++) {
                localStorage.removeItem('item_' + i + '_nombre');
                localStorage.removeItem('item_' + i + '_precio');
            }
            localStorage.removeItem('cantidadCarrito');
            window.location.href = 'index.html';
        }
    });

    // BUSCADOR 
    $('#buscador-texto').keypress(function (evento) {
        if (evento.which === 13) {
            let termino = $(this).val().toLowerCase();
            let galeria = $('#galeria-productos');

            if (galeria.length === 0) {
                window.location.href = 'index.html';
            } else {
                galeria.empty();
                let encontrados = 0;

                for (let i = 0; i < CATALOGO_MAESTRO.length; i++) {
                    let producto = CATALOGO_MAESTRO[i];
                    let nombreProducto = producto.nombre.toLowerCase();

                    if (nombreProducto.indexOf(termino) !== -1) {
                        encontrados = encontrados + 1;

                        let htmlTarjeta = "<article class='tarjeta'>";
                        htmlTarjeta = htmlTarjeta + "<img src='" + producto.imagen + "' alt='" + producto.nombre + "'>";
                        htmlTarjeta = htmlTarjeta + "<h3>" + producto.nombre + "</h3>";
                        htmlTarjeta = htmlTarjeta + "<p class='precio'>$" + producto.precio.toFixed(2) + "</p>";
                        htmlTarjeta = htmlTarjeta + "<button class='btn-agregar' data-nombre='" + producto.nombre + "' data-precio='" + producto.precio + "'>Agregar al Carrito</button>";
                        htmlTarjeta = htmlTarjeta + "</article>";

                        galeria.append(htmlTarjeta);
                    }
                }

                if (encontrados === 0) {
                    galeria.append("<p style='padding:40px; font-weight:bold; text-align:center;'>No se encontraron productos.</p>");
                }
            }
        }
    });

});

// -------- CATALOGO MAESTRO ----------
let CATALOGO_MAESTRO = [
    { id: 1, nombre: "CPU Intel Core Ultra 5", precio: 396588.92, imagen: "./img/cpu_Intel Core Ultra 5.jpg", link: "producto1.html" },
    { id: 2, nombre: "CPU Intel Core i9 Ultra", precio: 450000.00, imagen: "./img/cpu_intelCorei9ultra.jpg", link: "producto2.html" },
    { id: 3, nombre: "CPU Ryzen 7", precio: 350000.00, imagen: "./img/cpu_ryzen7.jpg", link: "producto3.html" },
    { id: 4, nombre: "Intel Core i5", precio: 250000.00, imagen: "./img/cpu_intelCorei5.jpeg", link: "producto4.html" },
    { id: 5, nombre: "Intel Pentium", precio: 80000.00, imagen: "./img/cpu_pentium.jpeg", link: "producto5.html" },
    { id: 6, nombre: "Ryzen Athlon", precio: 90000.00, imagen: "./img/cpu_ryzenAthlon.jpg", link: "producto6.html" },
    { id: 7, nombre: "Intel Core i9", precio: 500000.00, imagen: "./img/cpu_intelCorei9.jpg", link: "producto7.html" },
    { id: 8, nombre: "Ryzen 3 5300G", precio: 130000.00, imagen: "./img/cpu_ryzen3_5300g.jpg", link: "producto8.html" },
    { id: 9, nombre: "HDD 1TB Seagate", precio: 120000.00, imagen: "./img/hdd_1tb.jpg", link: "producto9.html" },
    { id: 10, nombre: "HDD 4TB Seagate", precio: 250000.00, imagen: "./img/hdd_4tb.jpeg", link: "producto10.html" },
    { id: 11, nombre: "Mando PS5 Azul", precio: 137877.00, imagen: "./img/mando_ps5Azul.jpeg", link: "producto11.html" },
    { id: 12, nombre: "Mando Trust Muta", precio: 166987.00, imagen: "./img/mando_trustMuta.png", link: "producto12.html" },
    { id: 13, nombre: "Mando Fantech", precio: 158760.56, imagen: "./img/mando_Fantech.jpg", link: "producto13.html" },
    { id: 14, nombre: "Mando Razer Pro", precio: 126745.07, imagen: "./img/mando_razerPro.png", link: "producto14.html" },
    { id: 15, nombre: "Mando Xbox Blanco", precio: 143567.90, imagen: "./img/mando_xboxBlanco.jpeg", link: "producto15.html" },
    { id: 16, nombre: "Mando PS4 Camouflage", precio: 200476.87, imagen: "./img/mando_ps4Camouflage.jpeg", link: "producto16.html" },
    { id: 17, nombre: "Mando Razer Wolverine", precio: 143547.67, imagen: "./img/mando_razerWolverine.png", link: "producto17.html" },
    { id: 18, nombre: "Mando Xbox Green", precio: 189004.73, imagen: "./img/mando_xboxGreen.jpg", link: "producto18.html" },
    { id: 19, nombre: "Mother AM4 B550L", precio: 426919.51, imagen: "./img/mother_am4B550l.png", link: "producto19.html" },
    { id: 20, nombre: "Mother ASRock A620M", precio: 405994.13, imagen: "./img/mother_asrockA620M.png", link: "producto20.html" },
    { id: 21, nombre: "Mother B650", precio: 426919.51, imagen: "./img/Mother_B650.png", link: "producto21.html" },
    { id: 22, nombre: "Mother AM5 B850", precio: 772845.29, imagen: "./img/mother_am5B850.jpg", link: "producto22.html" },
    { id: 23, nombre: "Mother Asus Prime B650EM", precio: 405994.13, imagen: "./img/mother_asusPrimeB650EM.png", link: "producto23.html" },
    { id: 24, nombre: "Mother Gigabyte B550 Aorus Elite", precio: 407506.72, imagen: "./img/mother_gigabyteB550aorusElite.png", link: "producto24.html" },
    { id: 25, nombre: "Mother Asus TUF Gaming", precio: 450000.00, imagen: "./img/mother_asusTUFGaming.jpg", link: "producto25.html" },
    { id: 26, nombre: "Mother ASRock A520M", precio: 396588.92, imagen: "./img/mother_asrockA520M.png", link: "producto26.html" },
    { id: 27, nombre: "Mother Gigabyte B550 Eagle", precio: 487432.67, imagen: "./img/mother_gigabyteb550eagle.png", link: "producto27.html" },
    { id: 28, nombre: "Notebook Asus TUF", precio: 189004.73, imagen: "./img/Notebook Asus TUF.jpg", link: "producto28.html" },
    { id: 29, nombre: "Notebook HP 15", precio: 250000.00, imagen: "./img/notebook_hp15.jpg", link: "producto29.html" },
    { id: 30, nombre: "Notebook Ryzen 7", precio: 400000.00, imagen: "./img/notebook_ryzen7.png", link: "producto30.html" },
    { id: 31, nombre: "Notebook AMD R3", precio: 180000.00, imagen: "./img/notebook_amdR3.jpg", link: "producto31.html" },
    { id: 32, nombre: "Notebook HP 250", precio: 200000.00, imagen: "./img/notebook_hp250.png", link: "producto32.html" },
    { id: 33, nombre: "Notebook V14 Ryzen 3", precio: 300000.00, imagen: "./img/notebook_v14Ryzen3.jpg", link: "producto33.html" },
    { id: 34, nombre: "Notebook Intel i7", precio: 450000.00, imagen: "./img/notebook_intelI7.png", link: "producto34.html" },
    { id: 35, nombre: "RTX 4060 OC", precio: 250000.00, imagen: "./img/placaVideo_rtx4060oc.png", link: "producto35.html" },
    { id: 36, nombre: "RTX 3050", precio: 200000.00, imagen: "./img/placaVideo_rx3050.jpg", link: "producto36.html" },
    { id: 37, nombre: "RTX 9060", precio: 350000.00, imagen: "./img/placaVideo_rx9060.png", link: "producto37.html" },
    { id: 38, nombre: "RTX 5080", precio: 300000.00, imagen: "./img/placaVideo_rtx5080.jpg", link: "producto38.html" },
    { id: 39, nombre: "RX 5060 Ti", precio: 250000.00, imagen: "./img/placaVideo_rx5060ti.png", link: "producto39.html" },
    { id: 40, nombre: "RTX 3050 OC", precio: 189004.73, imagen: "./img/placaVideo_rtx3050oc.jpg", link: "producto40.html" },
    { id: 41, nombre: "RTX 5080 Edición MIKU", precio: 350000.00, imagen: "./img/placaVideo_rtx5080edicionMIKU.png", link: "producto41.html" },
    { id: 42, nombre: "RX 6600", precio: 300000.00, imagen: "./img/placaVideo_rx6600.jpg", link: "producto42.html" },
    { id: 43, nombre: "SSD Kingston 240GB", precio: 79900.00, imagen: "./img/ssd_kingston240gb.jpg", link: "producto43.html" },
    { id: 44, nombre: "SSD WD Blue 500GB", precio: 123504.73, imagen: "./img/ssd_wdBlue500gb.png", link: "producto44.html" },
    { id: 45, nombre: "SSD ADATA", precio: 299900.00, imagen: "./img/ssd_adata.jpeg", link: "producto45.html" },
    { id: 46, nombre: "SSD M.2 SanDisk", precio: 299900.00, imagen: "./img/ssd_m2Sandisk.png", link: "producto46.html" },
    { id: 47, nombre: "SSD WD Green", precio: 123004.73, imagen: "./img/ssd_wdGreen.png", link: "producto47.html" },
    { id: 48, nombre: "SSD Crucial", precio: 123004.73, imagen: "./img/ssd_crucial.jpg", link: "producto48.html" },
    { id: 49, nombre: "SSD SanDisk 240GB", precio: 79900.00, imagen: "./img/ssd_sandisk240gb.png", link: "producto49.html" },
    { id: 50, nombre: "Teclado Asus Falchion", precio: 87900.00, imagen: "./img/teclado_asusFalchion.png", link: "producto50.html" },
    { id: 51, nombre: "Teclado Combo Mouse Simple", precio: 47506.71, imagen: "./img/teclado_comboMouseSimple.png", link: "producto51.html" },
    { id: 52, nombre: "Teclado Trust Zora", precio: 129900.00, imagen: "./img/teclado_trustZora.png", link: "producto52.html" },
    { id: 53, nombre: "Teclado Asus M701", precio: 79900.00, imagen: "./img/teclado_asusM701.png", link: "producto53.html" },
    { id: 54, nombre: "Teclado Razer Hello Kitty", precio: 129956.00, imagen: "./img/teclado_razeredicionHelloKitty.png", link: "producto54.html" },
    { id: 55, nombre: "Teclado Royal R65", precio: 47506.71, imagen: "./img/Teclado Royal R65.jpg", link: "producto55.html" },
    { id: 56, nombre: "Teclado Aula 75", precio: 79950.00, imagen: "./img/teclado_Aula75.jpg", link: "producto56.html" },
    { id: 57, nombre: "Teclado Trust Ody Blanco", precio: 79900.00, imagen: "./img/teclado_trustOdyBlanco.png", link: "producto57.html" }
];