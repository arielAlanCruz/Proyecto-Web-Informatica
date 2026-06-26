# TecnoShop 🛒⚡

> Plataforma de comercio electrónico (E-commerce) especializada en la venta minorista de hardware, componentes de computación de alto rendimiento y periféricos.

Este proyecto ha sido desarrollado como trabajo integrador para la materia **Diseño y Desarrollo Web** en la **Universidad Argentina de la Empresa (UADE)**.

---

## 🚀 Características Principales

*   **Maquetación Semántica y Flexible:** Diseñado de forma nativa utilizando HTML5 semántico y CSS3 con layouts basados en **Flexbox**, logrando una cuadrícula fluida de 4 columnas en escritorios sin el uso de frameworks pesados (Bootstrap, Tailwind, etc.).
*   **Experiencia Responsiva (Mobile First):** Adaptabilidad completa para resoluciones de teléfonos móviles, tablets y computadoras de escritorio.
*   **Carrito de Compras Interactivo:**
    *   Persistencia del estado del carrito mediante la API de **LocalStorage**.
    *   Cálculo automático de subtotales y totales en tiempo real.
    *   Variaciones automáticas de precios según método de pago (Efectivo/Transferencia con descuento, Tarjeta con recargo y cuotas fijas).
    *   Detección de sesión activa para aplicar un **10% de Descuento adicional por Socio**.
*   **Formularios con Validación en Tiempo Real (JS nativo):** Validaciones minuciosas de seguridad y formato en el formulario de contacto y registro de usuarios.
*   **Transiciones y Microinteracciones:**
    *   Efecto de carga suave en las galerías de productos mediante `.fadeTo()` de **jQuery**.
    *   Menú interactivo de perfil con efecto deslizante `.slideToggle()`.
    *   Menú desplegable dinámico para la navegación ágil de categorías (Dropdown "Componentes").

---

## 🛠️ Tecnologías Utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

---

## 📁 Estructura del Proyecto

```text
├── estilos/
│   ├── estilos.css             # Estilos de diseño global, cabecera, navegación y footer
│   ├── estilos-producto.css    # Estilos específicos de las fichas de detalle
│   ├── formularios.css         # Estilos compartidos para formularios
│   └── carrito.css             # Estilos del simulador de compra
├── js/
│   ├── jquery-3.7.1.min.js     # Librería jQuery local
│   ├── app.js                  # Lógica del carrito, sesión de usuario e interacciones visuales
│   └── formularios.js          # Lógica de validación del formulario de contacto
├── img/                        # Recursos gráficos y fotos de productos
├── index.html                  # Página principal de la tienda (Home)
├── index_CPUs.html             # Categoría CPUs
├── index_Discos.html           # Categoría Almacenamiento
├── index_PlacasMadre.html      # Categoría Motherboards
├── index_Placas de Video.html  # Categoría GPU
├── index_Notebook.html         # Categoría Laptops
├── index_Mandos-Joystick.html  # Categoría Mandos
├── index_Teclados.html         # Categoría Teclados
├── producto1.html              # Ficha de detalle de producto
├── carrito.html                # Interfaz de checkout de compra
├── registro.html               # Formulario de registro de membresías
└── contactanos.html            # Formulario de soporte y contacto