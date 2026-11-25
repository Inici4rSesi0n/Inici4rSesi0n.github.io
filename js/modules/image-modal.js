export function initImageModal() {
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.image-modal__close');
const prevBtn = document.querySelector('.image-modal__prev');
const nextBtn = document.querySelector('.image-modal__next');
const clickables = document.querySelectorAll('.img-clickable');
if (!modal || !modalImg || !closeBtn) return;
let currentGallery = [];
let currentIndex = 0;
function showImage(index) {
if (!currentGallery.length) return;
if (index < 0) index = currentGallery.length - 1;
if (index >= currentGallery.length) index = 0;
currentIndex = index;
modalImg.src = currentGallery[currentIndex].src;
}
clickables.forEach(el => {
el.addEventListener('click', () => {
let imgElement = el.tagName === 'IMG' ? el : el.querySelector('img');
const galleryId = el.getAttribute('data-gallery') || (imgElement ? imgElement.getAttribute('data-gallery') : null);
if (galleryId) {
const galleryContainer = document.getElementById('gallery-' + galleryId);
currentGallery = Array.from(galleryContainer.querySelectorAll('img'));
const targetSrc = imgElement.getAttribute('src');
currentIndex = currentGallery.findIndex(gImg => gImg.getAttribute('src') === targetSrc);
if (currentIndex === -1) currentIndex = 0;
} else {
currentGallery = [imgElement];
currentIndex = 0;
}
showImage(currentIndex);
modal.classList.add('active');
});
});
if (prevBtn) {
prevBtn.addEventListener('click', (e) => {
e.stopPropagation();
showImage(currentIndex - 1);
});
}
if (nextBtn) {
nextBtn.addEventListener('click', (e) => {
e.stopPropagation();
showImage(currentIndex + 1);
});
}
closeBtn.addEventListener('click', () => {
modal.classList.remove('active');
});
modal.addEventListener('click', (e) => {
if (e.target === modal) {
modal.classList.remove('active');
}
});
}
