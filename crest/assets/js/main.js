/* CREST — Main JS */
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

  // View simulator: compass + floor slider
  const compassPts = document.querySelectorAll('.compass-pt');
  const floorSlider = document.getElementById('floorSlider');
  const floorNum = document.getElementById('floorNum');
  const viewDir = document.getElementById('viewDir');
  const viewFloor = document.getElementById('viewFloor');
  const viewDisplay = document.querySelector('.view-display');

  const dirs = { N: 'Northern Skyline', E: 'Eastern Horizon', S: 'Southern River', W: 'Western Park' };

  const updateView = () => {
    if (floorNum && floorSlider) floorNum.textContent = 'F' + floorSlider.value;
    if (viewFloor && floorSlider) viewFloor.textContent = 'Floor ' + floorSlider.value;
    const active = document.querySelector('.compass-pt.active');
    if (active && viewDir) viewDir.textContent = dirs[active.dataset.dir] || 'Skyline';
    // Adjust display brightness based on floor (higher = lighter sky)
    if (viewDisplay && floorSlider) {
      const f = parseInt(floorSlider.value);
      const opacity = Math.min(1, 0.6 + (f / 80) * 0.4);
      viewDisplay.style.filter = 'brightness(' + opacity + ')';
    }
  };

  compassPts.forEach(pt => pt.addEventListener('click', () => {
    compassPts.forEach(p => p.classList.remove('active'));
    pt.classList.add('active');
    updateView();
  }));
  floorSlider?.addEventListener('input', updateView);
  updateView();

  // Counter animation
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800, step = target / (dur / 16);
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
  document.querySelectorAll('.stats-grid, .hero-meta').forEach(el => cObs.observe(el));

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.reset();
    alert('Thank you. Our private client team will respond within 24 hours.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
