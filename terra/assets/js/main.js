/* TERRA — Main JS */
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

  // Parcel list interactive
  document.querySelectorAll('.parcel-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.parcel-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Land Area Calculator
  const landInput = document.getElementById('landInput');
  const landUnits = document.querySelectorAll('.calc-unit');
  const landResultValue = document.getElementById('landResultValue');
  const landResultUnit = document.getElementById('landResultUnit');
  const landConvAcres = document.getElementById('landConvAcres');
  const landConvHect = document.getElementById('landConvHect');
  const landConvSqm = document.getElementById('landConvSqm');
  const landConvSqft = document.getElementById('landConvSqft');

  let currentUnit = 'acres';

  const updateLand = () => {
    const raw = parseFloat(landInput?.value || 0);
    if (isNaN(raw)) return;
    // Convert to acres as base
    let acres = raw;
    if (currentUnit === 'hectares') acres = raw * 2.47105;
    else if (currentUnit === 'sqm') acres = raw / 4046.86;
    else if (currentUnit === 'sqft') acres = raw / 43560;

    const hectares = acres / 2.47105;
    const sqm = acres * 4046.86;
    const sqft = acres * 43560;

    if (landResultValue) {
      let val = currentUnit === 'acres' ? acres
              : currentUnit === 'hectares' ? hectares
              : currentUnit === 'sqm' ? sqm
              : sqft;
      landResultValue.textContent = val.toLocaleString('en-GB', { maximumFractionDigits: val > 100 ? 0 : 2 });
    }
    if (landResultUnit) landResultUnit.textContent = currentUnit;
    if (landConvAcres) landConvAcres.textContent = acres.toLocaleString('en-GB', { maximumFractionDigits: 2 }) + ' acres';
    if (landConvHect) landConvHect.textContent = hectares.toLocaleString('en-GB', { maximumFractionDigits: 2 }) + ' ha';
    if (landConvSqm) landConvSqm.textContent = Math.round(sqm).toLocaleString('en-GB') + ' m²';
    if (landConvSqft) landConvSqft.textContent = Math.round(sqft).toLocaleString('en-GB') + ' ft²';
  };

  landInput?.addEventListener('input', updateLand);
  landUnits.forEach(u => u.addEventListener('click', () => {
    landUnits.forEach(x => x.classList.remove('active'));
    u.classList.add('active');
    currentUnit = u.dataset.unit;
    updateLand();
  }));
  updateLand();

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

  // Drone tour
  document.querySelector('.drone-play')?.addEventListener('click', () => {
    alert('Drone estate tour would launch here. Integrate with Vimeo/YouTube embed or custom video player.');
  });

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.reset();
    alert('Thank you for your enquiry. Our team will be in touch within 2 business days.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
