export function initThemeToggle() {
const toggleBtn = document.getElementById('theme-toggle');
if (!toggleBtn) return;
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
document.body.classList.add('light-mode');
toggleBtn.textContent = '🌙';
}
toggleBtn.addEventListener('click', () => {
const isLight = document.body.classList.toggle('light-mode');
toggleBtn.textContent = isLight ? '🌙' : '☀️';
localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
}
