/* ============================================================
   EMERALD ELOPEMENTS — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV SCROLL BEHAVIOUR ───────────────────────────────── */
  const nav = document.getElementById('mainNav');
  const hasHero = document.querySelector('.hero');

  if (nav) {
    if (!hasHero) {
      // Inner pages: nav is always solid
      nav.classList.add('nav--solid');
    } else {
      // Homepage: transparent → solid on scroll
      nav.classList.add('nav--transparent');

      const onScroll = () => {
        const scrolled = window.scrollY > 60;
        nav.classList.toggle('scrolled', scrolled);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // run once on load
    }
  }

  /* ── HERO LOAD ANIMATION ────────────────────────────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('load', () => {
      hero.classList.add('loaded');
    });
    // Fallback if already loaded
    if (document.readyState === 'complete') {
      hero.classList.add('loaded');
    }
  }

  /* ── MOBILE NAV TOGGLE ──────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── SCROLL FADE-IN ANIMATIONS ──────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    fadeEls.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── ACTIVE NAV LINK ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link:not(.nav__link--cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── CONTACT FORM ────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async send (replace with actual endpoint later)
      setTimeout(() => {
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          contactForm.style.display = 'none';
          successMsg.style.display = 'block';
        } else {
          btn.textContent = 'Message Sent!';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            contactForm.reset();
          }, 3000);
        }
      }, 1200);
    });
  }

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
