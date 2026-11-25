# Arquitectura del Sistema — Inici4rSesi0n

Documento técnico de referencia sobre la organización estructural, separación de responsabilidades y flujo de despliegue del sitio web personal de **Edson Espinal** (`inici4rsesi0n`).

---

## Visión General

El proyecto sigue una arquitectura estática modular sin dependencias de frameworks ni procesos de compilación pesados. Cada capa tiene una responsabilidad definida para facilitar el mantenimiento, la legibilidad y la extensibilidad:

- **Presentación (`index.html`):** Define la estructura semántica del documento, las secciones del portafolio, los metadatos sociales y el visor modal.
- **Estilos (`css/`):** Organiza la apariencia visual mediante variables de tema, reinicio base, utilidades, rejillas de diseño y componentes independientes.
- **Comportamiento (`js/`):** Encapsula la lógica interactiva en módulos ES6 independientes inicializados desde un único punto de entrada.
- **Entrega continua (`.github/workflows/deploy.yml`):** Automatiza la publicación del contenido estático hacia **GitHub Pages** desde la rama `main`.

---

## Estructura de Directorios

```text
Inici4rSesi0n_Wired/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── badges/
│   ├── certs/
│   ├── cv/
│   └── repos/
├── css/
│   ├── base/
│   │   ├── _reset.css
│   │   ├── _utilities.css
│   │   └── _variables.css
│   ├── components/
│   │   ├── _buttons.css
│   │   ├── _cards.css
│   │   └── _decorations.css
│   ├── layout/
│   │   ├── _grid.css
│   │   └── _header.css
│   └── main.css
├── docs/
│   └── ARCHITECTURE.md
├── js/
│   ├── modules/
│   │   ├── clipboard.js
│   │   ├── image-modal.js
│   │   └── theme-toggle.js
│   └── main.js
├── .gitignore
├── index.html
├── LICENSE
└── README.md

```

---

## Capas y Módulos

### Capa de Estilos (`css/`)

- **`main.css`:** Punto de entrada que importa los módulos en orden de precedencia.
- **`base/`:** Tokens de diseño (`_variables.css` para temas oscuro y claro), normalización y desplazamiento suave (`_reset.css`) y clases auxiliares de tipografía y estados (`_utilities.css`).
- **`layout/`:** Barra de navegación fija (`_header.css`) y estructura principal, héroe, línea de tiempo y pie de página (`_grid.css`).
- **`components/`:** Controles interactivos y botones (`_buttons.css`), tarjetas, galerías y visor modal (`_cards.css`), y efectos visuales como escaneo CRT y paneles (`_decorations.css`), respetando `prefers-reduced-motion`.

### Capa de Comportamiento (`js/`)

- **`main.js`:** Orquesta la inicialización tras `DOMContentLoaded`, actualiza el año en el pie de página y gestiona el efecto *glitch* cuando no se solicita movimiento reducido.
- **`modules/theme-toggle.js`:** Alterna entre modo oscuro y claro, consulta `prefers-color-scheme` y persiste la preferencia en `localStorage` de forma segura.
- **`modules/clipboard.js`:** Decodifica la dirección de correo codificada en Base64 (`data-e`), utiliza la API del portapapeles en contextos seguros con respaldo clásico y muestra el aviso de confirmación.
- **`modules/image-modal.js`:** Administra la apertura, navegación entre galerías (`ArrowLeft` / `ArrowRight`), cierre (`Escape`, clic fuera o botón) y bloqueo del desplazamiento del cuerpo.

---

## Flujo de Interacción y Despliegue

1. **Carga inicial:** El navegador solicita `index.html`, carga `css/main.css` y ejecuta `js/main.js` como módulo ES6.
2. **Interacción del usuario:** Cada módulo responde a eventos aislados (cambio de tema, copia de correo o inspección de imágenes/credenciales) sin acoplamiento directo entre módulos.
3. **Publicación:** Cada `push` a `main` (o ejecución manual del *workflow*) empaqueta el repositorio y lo despliega en **GitHub Pages** mediante **GitHub Actions**.
