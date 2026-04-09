/* SOLARA — Main JS */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const header = document.querySelector('.header');
  const btt = document.querySelector('.back-to-top');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 40);
    btt?.classList.toggle('visible', scrollY > 500);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const ham = document.querySelector('.hamburger');
  const mn = document.querySelector('.mobile-nav');
  ham?.addEventListener('click', () => {
    mn?.classList.toggle('open');
    document.body.style.overflow = mn?.classList.contains('open') ? 'hidden' : '';
  });
  mn?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mn.classList.remove('open');
    document.body.style.overflow = '';
  }));

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  }));

  btt?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Location map interactive
  const locItems = document.querySelectorAll('.location-item');
  locItems.forEach(item => {
    item.addEventListener('click', () => {
      locItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Calendar month selector
  const months = document.querySelectorAll('.month-card');
  months.forEach(m => m.addEventListener('click', () => {
    if (m.classList.contains('booked')) return;
    months.forEach(mm => mm.classList.remove('peak'));
    m.classList.add('peak');
  }));

  // Counter
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1500, step = target / (dur / 16);
        let cur = 0;
        const tick = () => {
          cur += step;
          if (cur >= target) { el.textContent = target.toLocaleString() + suffix; return; }
          el.textContent = Math.floor(cur).toLocaleString() + suffix;
          requestAnimationFrame(tick);
        };
        tick();
      });
      cObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stats-grid, .hero-stats').forEach(el => cObs.observe(el));

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.reset();
    alert('Thank you! Our concierge team will contact you within 24 hours.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
