(() => {
  const body = document.body;
  const themeButton = document.querySelector('#theme-toggle');
  const menuButton = document.querySelector('#menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const cursor = document.querySelector('.cursor');

  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'light') body.classList.add('light');
  themeButton?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
  });

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    body.classList.add('desktop-pointer');
    window.addEventListener('pointermove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'; });
      element.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; });
    });
  } else body.classList.add('touch');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
