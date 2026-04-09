/* NEXUS — Main JS */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Header scroll
  const header = document.querySelector('.header');
  const btt = document.querySelector('.back-to-top');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 40);
    btt?.classList.toggle('visible', scrollY > 500);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
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

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  }));

  // Back to top
  btt?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Demo tabs
  const demoTabs = document.querySelectorAll('.demo-tab');
  const demoPanes = document.querySelectorAll('.demo-pane');
  demoTabs.forEach(tab => tab.addEventListener('click', () => {
    demoTabs.forEach(t => t.classList.remove('active'));
    demoPanes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.pane)?.classList.add('active');
  }));

  // Pricing toggle
  const pToggle = document.querySelectorAll('.pricing-toggle-btn');
  pToggle.forEach(btn => btn.addEventListener('click', () => {
    pToggle.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const period = btn.dataset.period;
    document.querySelectorAll('[data-monthly][data-annual]').forEach(el => {
      el.textContent = period === 'annual' ? el.dataset.annual : el.dataset.monthly;
    });
    document.querySelectorAll('[data-billed]').forEach(el => {
      el.textContent = period === 'annual' ? 'Billed annually' : 'Billed monthly';
    });
  }));

  // Counter animation
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
  document.querySelectorAll('.stats-grid').forEach(el => cObs.observe(el));

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const input = f.querySelector('input[type="email"]');
    if (input) input.value = '';
    alert('Thanks! We\'ll be in touch soon.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
