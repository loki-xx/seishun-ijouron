/* =================================================
   main.js — 青春異常論 共通スクリプト
   ================================================= */

/* ---------- Active nav link ---------- */
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* AYN Timeline logic is now in ayn.html via Firebase */

/* ---------- Scroll fade-in ---------- */
(function () {
  const targets = document.querySelectorAll('[data-fade]');
  if (!targets.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => io.observe(t));
})();

/* ---------- Mobile Nav Toggle ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }
});

