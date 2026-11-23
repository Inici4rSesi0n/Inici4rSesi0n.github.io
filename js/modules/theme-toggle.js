export function initThemeToggle() {
const toggleBtn = document.getElementById('theme-toggle');
if (!toggleBtn) return;
toggleBtn.addEventListener('click', () => {
const isDark = document.body.classList.toggle('light-mode');
toggleBtn.textContent = isDark ? '☀️' : '🌙';
});
}
