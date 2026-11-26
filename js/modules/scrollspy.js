export function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav__links a[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      return el ? { id, el, link } : null;
    })
    .filter(Boolean);

  function setActive(activeId) {
    links.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveSection() {
    if (window.scrollY < 140) {
      setActive('top');
      return;
    }

    const offset = window.scrollY + 180;
    let current = sections[0]?.id || 'top';

    for (const item of sections) {
      if (item.id === 'top') continue;
      if (item.el.offsetTop <= offset) {
        current = item.id;
      }
    }

    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
    if (nearBottom) {
      current = 'contact';
    }

    setActive(current);
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  updateActiveSection();
}
