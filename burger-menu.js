document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('[data-menu-button]');
  const navWrapper = document.querySelector('.nav_wrapper');

  if (!menuBtn || !navWrapper) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.toggle('is-open');
    navWrapper.classList.toggle('is-open', isOpen);

    // accessibility
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
});
