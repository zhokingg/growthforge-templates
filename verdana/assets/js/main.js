/* ============================================================
   VERDANA — Main JavaScript
   Modern Apartment Landing Page
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── Header scroll ── */
  const header = document.querySelector('.header');
  const btt = document.querySelector('.back-to-top');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 40);
    btt?.classList.toggle('visible', scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── Back to top ── */
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Unit Selector Tabs ── */
  const unitTabs = document.querySelectorAll('.unit-tab');
  const unitItems = document.querySelectorAll('.unit-item');
  unitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      unitTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const floor = tab.dataset.floor;
      unitItems.forEach(item => {
        if (floor === 'all' || item.dataset.floor === floor) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ── Unit Selection ── */
  unitItems.forEach(item => {
    item.addEventListener('click', () => {
      unitItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      updateFloorplan(item.dataset);
    });
  });

  /* ── Floor Plan Viewer ── */
  function updateFloorplan(data) {
    const nameEl = document.getElementById('fpName');
    const bedsEl = document.getElementById('fpBeds');
    const bathsEl = document.getElementById('fpBaths');
    const areaEl = document.getElementById('fpArea');
    const priceEl = document.getElementById('fpPrice');
    if (nameEl) nameEl.textContent = data.name || 'Unit';
    if (bedsEl) bedsEl.textContent = (data.beds || '1') + ' Bedroom' + (data.beds > 1 ? 's' : '');
    if (bathsEl) bathsEl.textContent = (data.baths || '1') + ' Bathroom' + (data.baths > 1 ? 's' : '');
    if (areaEl) areaEl.textContent = (data.area || '0') + ' sqft';
    if (priceEl) priceEl.textContent = '$' + Number(data.price || 0).toLocaleString();
  }

  /* ── Unit Filters ── */
  const filterSelects = document.querySelectorAll('.unit-filter select');
  filterSelects.forEach(sel => {
    sel.addEventListener('change', () => {
      const type = document.getElementById('filterType')?.value || '';
      const status = document.getElementById('filterStatus')?.value || '';
      const beds = document.getElementById('filterBeds')?.value || '';
      unitItems.forEach(item => {
        let show = true;
        if (type && item.dataset.type !== type) show = false;
        if (status && item.dataset.status !== status) show = false;
        if (beds && item.dataset.beds !== beds) show = false;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Walkthrough play ── */
  document.querySelector('.walkthrough-play')?.addEventListener('click', () => {
    alert('Virtual walkthrough would launch here. Integrate with Matterport or custom 3D viewer.');
  });

  /* ── Newsletter ── */
  document.querySelector('.cta-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input?.value) { input.value = ''; alert('Thank you for subscribing!'); }
  });

  /* ── Contact form ── */
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your enquiry. We will be in touch shortly.');
  });

  /* ── Counter animation ── */
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
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
      counterObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.hero-stats, .stats-row').forEach(el => counterObs.observe(el));

  /* ── Year ── */
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
