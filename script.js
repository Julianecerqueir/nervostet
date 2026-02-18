(function () {
  'use strict';
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  const heroLines = document.querySelectorAll('.hero-line');

  if (heroLines.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroLines.forEach((line, i) => {
        const factor = (i + 1) * 0.04;
        line.style.transform = `translateY(${scrollY * factor}px) scaleX(${1 - scrollY * 0.0003})`;
      });
    }, { passive: true });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.1s linear;
      will-change: transform;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ---- DIGISTORE24 LINK PLACEHOLDER WARNING ----
  const ds24Links = document.querySelectorAll('a[href*="YOUR_PRODUCT_ID"]');
  if (ds24Links.length) {
    console.info(
      '%c NERVO™ Dev Notice',
      'color: #c9a96e; font-weight: bold; font-size: 14px;',
      '\nReplace YOUR_PRODUCT_ID in all links with your actual Digistore24 product ID.\nExample: https://www.digistore24.com/product/123456'
    );
  }

  // ---- SIGNAL LIST STAGGER (re-trigger on resize) ----
  function checkSignalItems() {
    const items = document.querySelectorAll('.signal-list li.reveal');
    items.forEach((item) => {
      if (!item.classList.contains('visible')) {
        revealObserver.observe(item);
      }
    });
  }

  window.addEventListener('resize', checkSignalItems, { passive: true });

})();