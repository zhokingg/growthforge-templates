/* NORDIC — Main JS */
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

  // Natural Light Calculator
  const floorOpts = document.querySelectorAll('.light-opt[data-floor]');
  const orientOpts = document.querySelectorAll('.light-opt[data-orient]');
  const seasonOpts = document.querySelectorAll('.light-opt[data-season]');
  const lightScore = document.getElementById('lightScore');
  const lightRating = document.getElementById('lightRating');
  const lightDesc = document.getElementById('lightDesc');

  const state = { floor: 5, orient: 'south', season: 'summer' };

  const descriptions = {
    high: 'Exceptional natural light throughout the day. Ideal for plants, photography, and passive heating.',
    good: 'Plenty of natural light with comfortable variation throughout the day.',
    moderate: 'Good natural light during peak hours with softer ambient light.',
    low: 'Softer, diffused light ideal for art display and heat-sensitive spaces.'
  };

  const calcLight = () => {
    let score = 50;
    if (state.floor >= 10) score += 20;
    else if (state.floor >= 5) score += 12;
    else score += 4;
    if (state.orient === 'south') score += 20;
    else if (state.orient === 'east' || state.orient === 'west') score += 12;
    else score += 4;
    if (state.season === 'summer') score += 10;
    else if (state.season === 'spring' || state.season === 'autumn') score += 6;
    else score += 2;
    score = Math.min(99, score);

    let rating, desc;
    if (score >= 85) { rating = 'Exceptional'; desc = descriptions.high; }
    else if (score >= 70) { rating = 'Very Good'; desc = descriptions.good; }
    else if (score >= 55) { rating = 'Good'; desc = descriptions.moderate; }
    else { rating = 'Moderate'; desc = descriptions.low; }

    if (lightScore) lightScore.innerHTML = score + '<sup>/100</sup>';
    if (lightRating) lightRating.textContent = rating;
    if (lightDesc) lightDesc.textContent = desc;
  };

  const setupOpts = (opts, key, parse) => {
    opts.forEach(o => o.addEventListener('click', () => {
      opts.forEach(x => x.classList.remove('active'));
      o.classList.add('active');
      state[key] = parse ? parse(o.dataset[key]) : o.dataset[key];
      calcLight();
    }));
  };
  setupOpts(floorOpts, 'floor', v => parseInt(v));
  setupOpts(orientOpts, 'orient');
  setupOpts(seasonOpts, 'season');
  calcLight();

  // Timeline animation on scroll
  const tObs = new IntersectionObserver(entries => {
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
      tObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stats-grid, .hero-meta').forEach(el => tObs.observe(el));

  // Forms
  document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.reset();
    alert('Thank you for your enquiry. Our team will be in touch within 24 hours.');
  }));

  // Year
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();
});
