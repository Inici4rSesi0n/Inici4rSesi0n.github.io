import { initThemeToggle } from './modules/theme-toggle.js';
import { initClipboard } from './modules/clipboard.js';
import { initImageModal } from './modules/image-modal.js';
document.addEventListener('DOMContentLoaded', () => {
initThemeToggle();
initClipboard();
initImageModal();
const yearSpan = document.getElementById('year');
if (yearSpan) {
yearSpan.textContent = new Date().getFullYear();
}
const glitchElements = document.querySelectorAll('.text-glitch');
glitchElements.forEach(el => {
el.addEventListener('mouseover', () => {
el.style.animation = 'none';
setTimeout(() => {
el.style.animation = '';
}, 200);
});
});
});
