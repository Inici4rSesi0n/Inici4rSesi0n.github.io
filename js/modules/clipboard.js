function decodeEmail(encoded) {
if (!encoded) return '';
try {
return atob(encoded);
} catch {
return '';
}
}
export function initClipboard() {
const copyBtn = document.getElementById('copy-email');
const feedback = document.getElementById('copy-feedback');
if (!copyBtn || !feedback) return;
copyBtn.addEventListener('click', async (e) => {
e.preventDefault();
const raw = copyBtn.getAttribute('data-e') || copyBtn.getAttribute('data-email') || '';
const email = copyBtn.hasAttribute('data-e') ? decodeEmail(raw) : raw;
if (!email) return;
try {
if (navigator.clipboard && window.isSecureContext) {
await navigator.clipboard.writeText(email);
} else {
const textArea = document.createElement('textarea');
textArea.value = email;
textArea.style.position = 'absolute';
textArea.style.left = '-999999px';
document.body.prepend(textArea);
textArea.select();
document.execCommand('copy');
textArea.remove();
}
feedback.style.display = 'inline-block';
setTimeout(() => {
feedback.style.display = 'none';
}, 3000);
} catch (err) {
console.error('Error al copiar el correo', err);
alert('No se pudo copiar el correo automáticamente. Por favor, hazlo manualmente.');
}
});
}
