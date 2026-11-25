const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
export function initThemeToggle() {
const toggleBtn = document.getElementById('theme-toggle');
if (!toggleBtn) return;
const currentTheme = safeGet('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
document.body.classList.add('light-mode');
toggleBtn.textContent = '🌙';
}
toggleBtn.addEventListener('click', () => {
const isLight = document.body.classList.toggle('light-mode');
toggleBtn.textContent = isLight ? '🌙' : '☀️';
safeSet('theme', isLight ? 'light' : 'dark');
});
}
