

document.addEventListener('DOMContentLoaded', () => {
  const isHome = !!document.querySelector('#hero');
  const welcomeScreen = document.getElementById('welcome-screen');
  const welcomeBtn = document.getElementById('welcome-btn');
  const welcomeLoader = document.getElementById('welcome-loader');
  const INTRO_KEY = 'solomon_intro_seen';

  // ─── GLOBAL UX UTILITIES ───
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.type = 'button';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.textContent = '↑';
  document.body.appendChild(backToTopBtn);

  const quickContact = document.createElement('a');
  quickContact.className = 'quick-contact';
  quickContact.href = 'https://wa.link/wctpny';
  quickContact.target = '_blank';
  quickContact.rel = 'noopener';
  quickContact.setAttribute('aria-label', 'Quick WhatsApp contact');
  quickContact.textContent = 'Chat';
  if (!window.location.pathname.includes('/contact.html')) {
    document.body.appendChild(quickContact);
  }

  function updateScrollUx() {
    const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
    const doc = document.documentElement;
    const height = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrolled / height));
    progressBar.style.transform = `scaleX(${progress})`;
    backToTopBtn.classList.toggle('visible', scrolled > 420);
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (isHome && welcomeScreen && welcomeBtn && welcomeLoader) {
    const introSeen = localStorage.getItem(INTRO_KEY) === '1';
    if (introSeen) {
      welcomeScreen.classList.add('hidden');
      document.body.classList.add('home-awake');
    } else {
      document.body.classList.add('home-locked');
    }
  } else {
    document.body.classList.add('home-awake');
  }

  // ─── NAV SCROLL STATE ───
  const nav = document.querySelector('nav');

  function updateNavScrollState() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  // ─── ACTIVE NAV LINK ───
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    if (!sections.length || !allNavLinks.length) return;
    let current = '';
    const scrollY = window.scrollY;
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 200) current = s.id;
    });
    allNavLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current || href === current + '.html');
    });
  }

  let scrollScheduled = false;
  const parallaxBgs = document.querySelectorAll('.page-header-bg, .contact-bg');

  window.addEventListener('scroll', (event) => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      updateNavScrollState();
      updateActiveNavLink();
      updateScrollUx();

      // Parallax backgrounds
      const scrollY = window.scrollY;
      parallaxBgs.forEach(bg => {
         bg.style.transform = `translateY(${scrollY * 0.35}px)`;
      });

      scrollScheduled = false;
    });
  }, { passive: true });

  // run once at startup for correct initial state
  updateNavScrollState();
  updateActiveNavLink();
  updateScrollUx();

  // Ensure hero content animates and is visible — add class to trigger transitions
  setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('hero-ready');
  }, 60);

  // Mark page as ready for global entrance animations
  setTimeout(() => {
    document.documentElement.classList.add('page-ready');
  }, 20);

  if (isHome && welcomeScreen && welcomeBtn && welcomeLoader) {
    welcomeBtn.addEventListener('click', () => {
      welcomeBtn.disabled = true;
      welcomeLoader.classList.add('active');
      window.setTimeout(() => {
        localStorage.setItem(INTRO_KEY, '1');
        welcomeScreen.classList.add('hidden');
        document.body.classList.remove('home-locked');
        document.body.classList.add('home-awake');
      }, 900);
    }, { once: true });
  }

  // ─── PAGE TRANSITIONS (fade/pull) ───
  // Uses View Transitions API when available; falls back to a quick leave animation.
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;

    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Only intercept same-origin navigations
    let url;
    try { url = new URL(href, window.location.href); } catch (_) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.href === window.location.href) return;

    // Avoid interfering with lightbox open logic on image click inside .feat-card/.work-card/.catalogue-item
    if (e.target && e.target.closest && (e.target.closest('.catalogue-item') || e.target.closest('.work-card') || e.target.closest('.feat-card'))) {
      const clickedImg = e.target.closest && e.target.closest('img');
      if (clickedImg) return;
    }

    // Let modifier keys behave normally (new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    const navigate = () => { window.location.href = url.href; };
    const root = document.documentElement;

    // Use standard fade-out transition
    root.classList.add('page-leave');
    window.setTimeout(navigate, 200);
  });

  // ─── MOBILE HAMBURGER ───
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    const closeMenu = () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      try { hamburger.setAttribute('aria-expanded', 'false'); } catch (e) {}
      try { navLinks.setAttribute('aria-hidden', 'true'); } catch (e) {}
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      // accessibility
      try { hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); } catch (e) {}
      try { navLinks.setAttribute('aria-hidden', isOpen ? 'false' : 'true'); } catch (e) {}
      if (isOpen) {
        // move focus into first link for keyboard users
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        hamburger.focus();
      }
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close when tapping outside the menu on mobile
    document.addEventListener('click', (e) => {
      if (!hamburger.classList.contains('open')) return;
      if (hamburger.contains(e.target) || navLinks.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        closeMenu();
      }
    });

    // Keep nav state sane when rotating/resizing to desktop widths
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, idx) => {
    if (!el.dataset.delay) {
      el.dataset.delay = String(Math.min(idx * 70, 560));
    }
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if .reveal-stagger
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -12% 0px' });
  const viewportH = window.innerHeight || document.documentElement.clientHeight;
  reveals.forEach(el => {
    // Prevent initial hidden-state flicker for above-the-fold elements
    try {
      const rect = el.getBoundingClientRect();
      const isLikelyVisible = rect.top < viewportH * 1.05 && rect.bottom > 0;
      if (isLikelyVisible) {
        const delay = Number(el.dataset.delay || 0) || 0;
        window.setTimeout(() => el.classList.add('visible'), delay);
      }
    } catch (e) {}
    observer.observe(el);
  });

  // ─── LIGHTBOX MODAL ───
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    // Lightbox gallery state (used for Catalogue swipe navigation)
    let galleryItems = [];
    let galleryIndex = -1;
    let galleryActive = false;

    function ensureLightboxNav() {
      if (lightbox.querySelector('.lightbox-nav')) return;
      const nav = document.createElement('div');
      nav.className = 'lightbox-nav';
      nav.innerHTML = `
        <button class="lightbox-prev" type="button" aria-label="Previous image">‹</button>
        <button class="lightbox-next" type="button" aria-label="Next image">›</button>
      `;
      lightbox.appendChild(nav);

      const prevBtn = nav.querySelector('.lightbox-prev');
      const nextBtn = nav.querySelector('.lightbox-next');
      prevBtn.addEventListener('click', () => showGalleryIndex(galleryIndex - 1));
      nextBtn.addEventListener('click', () => showGalleryIndex(galleryIndex + 1));
    }

    function setGalleryActive(isActive) {
      galleryActive = !!isActive;
      lightbox.classList.toggle('gallery-active', galleryActive);
      if (galleryActive) ensureLightboxNav();
    }

    function showGalleryIndex(nextIndex) {
      if (!galleryActive || !galleryItems.length) return;
      const len = galleryItems.length;
      const idx = (nextIndex % len + len) % len;
      galleryIndex = idx;
      openLightbox(galleryItems[galleryIndex]);
    }

    // Helper function to open lightbox with image
    function openLightbox(imageSrc) {
      if (imageSrc && imageSrc.trim()) {
        try { lightboxImg.decoding = 'async'; } catch (e) {}
        try { lightboxImg.loading = 'eager'; } catch (e) {}
        // Soft swap animation when navigating gallery
        try { lightboxImg.classList.remove('lightbox-img-ready'); } catch (e) {}
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    // Helper function to close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      setGalleryActive(false);
      document.body.style.overflow = '';
    }

    // Close button click
    lightboxClose.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (!lightbox.classList.contains('active')) return;
      if (!galleryActive) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); showGalleryIndex(galleryIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); showGalleryIndex(galleryIndex + 1); }
    });

    // Close when clicking on backdrop (outside image)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Swipe support (touch) for gallery mode
    let touchStartX = 0;
    let touchStartY = 0;
    let touchActive = false;
    lightbox.addEventListener('touchstart', (e) => {
      if (!galleryActive) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchActive = true;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (!galleryActive || !touchActive) return;
      touchActive = false;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dx) < 40) return;
      if (Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) showGalleryIndex(galleryIndex + 1);
      else showGalleryIndex(galleryIndex - 1);
    }, { passive: true });

    // Featured cards (.feat-card) - open lightbox only when the image itself is clicked
    document.addEventListener('click', (e) => {
      const featCard = e.target.closest('.feat-card');
      if (!featCard) return;
      // If the click target is the featured image, open lightbox and prevent navigation
      const clickedImg = e.target.closest && e.target.closest('img');
      if (clickedImg && clickedImg.classList.contains('feat-img')) {
        e.preventDefault();
        openLightbox(clickedImg.src);
      }
      // otherwise allow the link to navigate to the project page
    });

    // Work cards (.work-card) - extract image from .work-img
    document.addEventListener('click', (e) => {
      const workCard = e.target.closest('.work-card');
      if (workCard) {
        e.preventDefault();
        const img = workCard.querySelector('.work-img img');
        if (img && img.src) {
          openLightbox(img.src);
        }
      }
    });

    // Catalogue items (.catalogue-item) - check for data-src or nested image
    document.addEventListener('click', (e) => {
      const catalogueItem = e.target.closest('.catalogue-item');
      if (catalogueItem) {
        e.preventDefault();
        // Build gallery list from all catalogue images on the page
        const imgs = Array.from(document.querySelectorAll('.catalogue-item img'))
          .map((im) => im && im.src)
          .filter(Boolean);

        const dataSrc = catalogueItem.getAttribute('data-src');
        const img = catalogueItem.querySelector('img');
        const clickedSrc = (dataSrc && dataSrc.trim()) ? new URL(dataSrc, window.location.href).href : (img && img.src ? img.src : '');
        if (!clickedSrc) return;

        if (imgs.length) {
          galleryItems = imgs;
          galleryIndex = Math.max(0, galleryItems.indexOf(clickedSrc));
          setGalleryActive(true);
          showGalleryIndex(galleryIndex);
        } else {
          setGalleryActive(false);
          openLightbox(clickedSrc);
        }
      }
    });
  }

  // ─── IMAGE LOAD OPTIMIZATIONS ───
  // Defer non-critical image processing until the browser is idle to keep initial paint fast
  (window.requestIdleCallback || function (cb) { return setTimeout(cb, 200); })(() => {
    try {
      const imgs = Array.from(document.images || []);
      imgs.forEach((img) => {
        try { if (!img.decoding) img.decoding = 'async'; } catch (e) {}
        // Prioritize hero and featured images for faster paint
        try {
          if (img.closest && img.closest('#hero')) {
            img.setAttribute('fetchpriority', 'high');
            img.loading = 'eager';
          } else {
            if (!img.hasAttribute('loading')) img.loading = 'lazy';
            img.setAttribute('fetchpriority', 'low');
          }
        } catch (e) {}

        // Add a fade-in class once image is loaded to avoid pop-in
        img.classList.add('img-pending');
        // Add loading class on common containers for shimmer fallback (works in browsers without :has()).
        const container =
          (img.closest && (img.closest('.feat-card') || img.closest('.catalogue-item') || img.closest('.photo-frame') || img.closest('.work-img')));
        if (container) container.classList.add('is-img-loading');

        if (img.complete) {
          img.classList.remove('img-pending'); img.classList.add('img-loaded');
          if (container) container.classList.remove('is-img-loading');
        } else {
          img.addEventListener('load', () => {
            img.classList.remove('img-pending'); img.classList.add('img-loaded');
            if (container) container.classList.remove('is-img-loading');
          }, { once: true });
        }
      });
    } catch (err) {
      console.warn('image optimization init failed', err);
    }
  }, { timeout: 1000 });
});
