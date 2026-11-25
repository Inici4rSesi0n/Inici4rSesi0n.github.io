export function initClipboard() {
const copyBtn = document.getElementById('copy-email');
const feedback = document.getElementById('copy-feedback');
if (!copyBtn || !feedback) return;
copyBtn.addEventListener('click', async (e) => {
e.preventDefault();
const email = copyBtn.getAttribute('data-email');
try {
if (navigator.clipboard && window.isSecureContext) {
await navigator.clipboard.writeText(email);
} else {
const textArea = document.createElement("textarea");
textArea.value = email;
textArea.style.position = "absolute";
textArea.style.left = "-999999px";
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
