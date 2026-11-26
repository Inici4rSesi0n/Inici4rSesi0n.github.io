function syncNavVisibility(total) {
  const prevBtn = document.querySelector('.image-modal__prev');
  const nextBtn = document.querySelector('.image-modal__next');
  const showNav = total > 1;
  if (prevBtn) prevBtn.style.display = showNav ? '' : 'none';
  if (nextBtn) nextBtn.style.display = showNav ? '' : 'none';
}

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
  let lastFocused = null;

  function showImage(index) {
    if (!currentGallery.length) return;
    if (index < 0) index = currentGallery.length - 1;
    if (index >= currentGallery.length) index = 0;
    currentIndex = index;
    modalImg.src = currentGallery[currentIndex].src;
    modalImg.alt = currentGallery[currentIndex].alt || 'Vista Ampliada';
  }

  function toggleModal(open) {
    modal.classList.toggle('active', open);
    modal.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      lastFocused = document.activeElement;
      syncNavVisibility(currentGallery.length);
      closeBtn.focus();
    } else {
      syncNavVisibility(0);
      currentGallery = [];
      currentIndex = 0;
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
        lastFocused = null;
      }
    }
  }

  clickables.forEach((el) => {
    el.addEventListener('click', () => {
      const imgElement = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (!imgElement) return;

      const galleryId = el.getAttribute('data-gallery') || imgElement.getAttribute('data-gallery');
      if (galleryId) {
        const galleryContainer = document.getElementById('gallery-' + galleryId);
        if (!galleryContainer) return;
        currentGallery = Array.from(galleryContainer.querySelectorAll('img'));
        const targetSrc = imgElement.getAttribute('src');
        currentIndex = currentGallery.findIndex((gImg) => gImg.getAttribute('src') === targetSrc);
        if (currentIndex === -1) currentIndex = 0;
      } else {
        currentGallery = [imgElement];
        currentIndex = 0;
      }

      showImage(currentIndex);
      toggleModal(true);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGallery.length > 1) showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGallery.length > 1) showImage(currentIndex + 1);
    });
  }

  closeBtn.addEventListener('click', () => {
    toggleModal(false);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      toggleModal(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      toggleModal(false);
    } else if (e.key === 'ArrowLeft' && currentGallery.length > 1) {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentGallery.length > 1) {
      showImage(currentIndex + 1);
    } else if (e.key === 'Tab') {
      const focusables = [closeBtn, prevBtn, nextBtn].filter(
        (btn) => btn && btn.style.display !== 'none'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
