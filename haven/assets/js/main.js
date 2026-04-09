/* HAVEN — Main JS */
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

  // Space Calculator
  const sqft = document.getElementById('calcSqft');
  const desks = document.getElementById('calcDesks');
  const months = document.getElementById('calcMonths');
  const sqftVal = document.getElementById('calcSqftVal');
  const desksVal = document.getElementById('calcDesksVal');
  const monthsVal = document.getElementById('calcMonthsVal');
  const rBase = document.getElementById('calcRentBase');
  const rUtil = document.getElementById('calcRentUtil');
  const rServ = document.getElementById('calcRentServ');
  const rTotal = document.getElementById('calcTotal');

  const calc = () => {
    const s = parseInt(sqft?.value || 2000);
    const d = parseInt(desks?.value || 20);
    const m = parseInt(months?.value || 12);
    if (sqftVal) sqftVal.textContent = s.toLocaleString() + ' sqft';
    if (desksVal) desksVal.textContent = d + ' desks';
    if (monthsVal) monthsVal.textContent = m + ' months';
    const base = s * 4.5;
    const util = Math.round(s * 0.65);
    const serv = d * 45;
    const total = base + util + serv;
    if (rBase) rBase.textContent = '$' + base.toLocaleString();
    if (rUtil) rUtil.textContent = '$' + util.toLocaleString();
    if (rServ) rServ.textContent = '$' + serv.toLocaleString();
    if (rTotal) rTotal.textContent = '$' + total.toLocaleString();
  };
  [sqft, desks, months].forEach(i => i?.addEventListener('input', calc));
  calc();

  // Floor Browser
  const floorUp = document.getElementById('floorUp');
  const floorDown = document.getElementById('floorDown');
  const floorCur = document.getElementById('floorCurrent');
  const floorAvail = document.getElementById('floorAvail');
  const floorPrice = document.getElementById('floorPrice');
  const floorData = {
    12: { avail: 'Available', price: '$48/sqft', status: 'success' },
    11: { avail: '2 Units Left', price: '$46/sqft', status: 'warn' },
    10: { avail: 'Available', price: '$46/sqft', status: 'success' },
    9: { avail: 'Leased', price: '$44/sqft', status: 'warn' },
    8: { avail: 'Available', price: '$44/sqft', status: 'success' },
    7: { avail: '1 Unit Left', price: '$42/sqft', status: 'warn' },
    6: { avail: 'Available', price: '$42/sqft', status: 'success' },
    5: { avail: 'Available', price: '$40/sqft', status: 'success' },
  };
  let curFloor = 10;
  const updateFloor = () => {
    if (floorCur) floorCur.textContent = 'F' + String(curFloor).padStart(2, '0');
    const d = floorData[curFloor];
    if (d && floorAvail) {
      floorAvail.textContent = d.avail;
      floorAvail.className = 'floor-stat-value ' + d.status;
    }
    if (d && floorPrice) floorPrice.textContent = d.price;
  };
  floorUp?.addEventListener('click', () => { if (curFloor < 12) curFloor++; updateFloor(); });
  floorDown?.addEventListener('click', () => { if (curFloor > 5) curFloor--; updateFloor(); });
  updateFloor();

  // Counters
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

  // Virtual tour
  document.querySelector('.tour-play')?.addEventListener('click', () => {
    alert('Virtual office tour would launch here. Integrate with Matterport or custom 3D viewer.');
  });

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.reset();
    alert('Thank you. Our team will respond within 1 business day.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
