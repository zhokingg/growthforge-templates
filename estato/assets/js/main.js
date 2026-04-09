/* ============================================================
   ESTATO — Main JavaScript
   Luxury Real Estate Landing Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ----- HEADER SCROLL ----- */
  const header = document.querySelector('.header');
  const handleScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
    const btt = document.querySelector('.back-to-top');
    btt?.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ----- MOBILE NAV ----- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ----- SMOOTH SCROLL ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----- BACK TO TOP ----- */
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----- INTERSECTION OBSERVER ANIMATIONS ----- */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stagger')) {
          Array.from(entry.target.children).forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 120);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-in, .stagger').forEach(el => {
    observer.observe(el);
  });

  /* ----- COUNTER ANIMATION ----- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.count, 10);
          const suffix = counter.dataset.suffix || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString() + suffix;
              return;
            }
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(update);
          };
          update();
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-grid, .hero-stats').forEach(el => {
    counterObserver.observe(el);
  });

  /* ----- MORTGAGE CALCULATOR ----- */
  const calcForm = document.getElementById('mortgageCalc');
  if (calcForm) {
    const priceInput = document.getElementById('calcPrice');
    const downInput = document.getElementById('calcDown');
    const rateInput = document.getElementById('calcRate');
    const termInput = document.getElementById('calcTerm');
    const rateSlider = document.getElementById('calcRateSlider');
    const monthlyEl = document.getElementById('calcMonthly');
    const totalEl = document.getElementById('calcTotal');
    const interestEl = document.getElementById('calcInterest');
    const principalEl = document.getElementById('calcPrincipal');
    const chartEl = document.querySelector('.calc-chart');
    const chartPercent = document.querySelector('.calc-chart-value');

    const formatCurrency = (n) => '$' + Math.round(n).toLocaleString();

    const calculate = () => {
      const price = parseFloat(priceInput?.value) || 0;
      const down = parseFloat(downInput?.value) || 0;
      const annualRate = parseFloat(rateInput?.value) || 0;
      const years = parseInt(termInput?.value) || 30;

      const principal = price - down;
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = years * 12;

      let monthly = 0;
      if (monthlyRate > 0) {
        monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
                  / (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        monthly = principal / numPayments;
      }

      const totalPaid = monthly * numPayments;
      const totalInterest = totalPaid - principal;
      const principalPercent = Math.round((principal / totalPaid) * 100);
      const interestDeg = Math.round(((totalInterest / totalPaid) * 360));

      if (monthlyEl) monthlyEl.textContent = formatCurrency(monthly);
      if (totalEl) totalEl.textContent = formatCurrency(totalPaid);
      if (interestEl) interestEl.textContent = formatCurrency(totalInterest);
      if (principalEl) principalEl.textContent = formatCurrency(principal);
      if (chartEl) {
        chartEl.style.background = `conic-gradient(var(--gold) 0deg ${360 - interestDeg}deg, rgba(255,255,255,0.1) ${360 - interestDeg}deg 360deg)`;
      }
      if (chartPercent) chartPercent.textContent = principalPercent + '%';
    };

    [priceInput, downInput, rateInput, termInput].forEach(input => {
      input?.addEventListener('input', calculate);
    });

    rateSlider?.addEventListener('input', () => {
      if (rateInput) rateInput.value = rateSlider.value;
      calculate();
    });

    rateInput?.addEventListener('input', () => {
      if (rateSlider) rateSlider.value = rateInput.value;
    });

    calculate();
  }

  /* ----- PROPERTY SEARCH FILTER ----- */
  const searchForm = document.getElementById('propertySearch');
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const params = {};
    for (const [key, value] of formData.entries()) {
      if (value) params[key] = value;
    }
    // In production, this would send an API request
    const searchSummary = Object.entries(params)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    alert(`Searching properties with filters:\n${searchSummary || 'No filters selected'}`);
  });

  /* ----- TESTIMONIAL SLIDER ----- */
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? 'block' : 'none';
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showTestimonial(i));
  });

  if (testimonials.length > 0) {
    showTestimonial(0);
    setInterval(() => {
      showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 6000);
  }

  /* ----- VIRTUAL TOUR MODAL PLACEHOLDER ----- */
  const tourBtn = document.querySelector('.tour-play-btn');
  tourBtn?.addEventListener('click', () => {
    alert('Virtual tour would launch here. Integrate with Matterport, Zillow 3D, or custom 360 viewer.');
  });

  /* ----- NEWSLETTER FORM ----- */
  const ctaForm = document.querySelector('.cta-form');
  ctaForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = ctaForm.querySelector('input[type="email"]');
    if (emailInput?.value) {
      emailInput.value = '';
      alert('Thank you for subscribing! You\'ll receive our exclusive listings.');
    }
  });

  /* ----- YEAR IN FOOTER ----- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
