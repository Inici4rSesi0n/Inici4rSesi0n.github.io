# Portafolio Web Personal — Inici4rSesi0n

Sitio web personal y portafolio profesional de **Edson Espinal** (`inici4rsesi0n`), publicado en **GitHub Pages** y enfocado en desarrollo backend, arquitectura de software y ciberseguridad.

---

## Arquitectura y Tecnologías

- **Estructura y semántica:** HTML5 semántico con metadatos Open Graph y Twitter Card, navegación por anclas y accesibilidad básica.
- **Estilos:** CSS3 modular organizado con enfoque BEM y capas de cascada (`base/`, `layout/`, `components/`), variables CSS (`:root` y `.light-mode`) y respeto a `prefers-color-scheme` y `prefers-reduced-motion`.
- **Interactividad:** JavaScript ES6+ (`type="module"`) dividido en módulos funcionales para gestión de tema (`theme-toggle.js`), copiado seguro de correo (`clipboard.js`), visor modal con navegación por teclado (`image-modal.js`) y punto de entrada (`main.js`).
- **Despliegue continuo (CI/CD):** Flujo automatizado en GitHub Actions (`.github/workflows/deploy.yml`) que publica la rama `main` en GitHub Pages.

---

## Instalación y Uso Local

Clona el repositorio y levanta un servidor HTTP local desde la raíz del proyecto:

```bash
git clone https://github.com/Inici4rSesi0n/Inici4rSesi0n.github.io.git
cd Inici4rSesi0n.github.io
python3 -m http.server 8080
```
Abre `http://localhost:8080` en tu navegador.

---

## Licencia

Este proyecto se distribuye bajo la licencia **GNU General Public License v3.0 (GPLv3)**. Consulta el archivo [LICENSE](LICENSE) para ver el texto completo.
