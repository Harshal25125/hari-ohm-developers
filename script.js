/**
 * Hari Om Developers - Premium Construction Website
 * Vanilla JavaScript - Modular & Well Commented
 */

(function () {
  'use strict';

  /* ============================================
     DOM Element References
     ============================================ */
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery__item');
  const slideUpElements = document.querySelectorAll('.slide-up');

  /* ============================================
     Loading Screen
     Hides after page load with smooth fade
     ============================================ */
  function initLoader() {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }, 1600);
    });

    // Fallback: hide loader after 3 seconds max
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, 3000);
  }

  /* ============================================
     Sticky Header
     Adds background on scroll
     ============================================ */
  function initStickyHeader() {
    function handleScroll() {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ============================================
     Mobile Navigation Toggle
     ============================================ */
  function initMobileNav() {
    // Create overlay element for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'nav__overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function closeMenu() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }

    function openMenu() {
      navToggle.classList.add('active');
      navMenu.classList.add('active');
      overlay.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }

    navToggle.addEventListener('click', function () {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /* ============================================
     Smooth Scrolling for Anchor Links
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ============================================
     Active Navigation Highlighting
     Updates active link based on scroll position
     ============================================ */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      const scrollPosition = window.scrollY + header.offsetHeight + 100;

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  /* ============================================
     Back to Top Button
     ============================================ */
  function initBackToTop() {
    function toggleButton() {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
        backToTop.removeAttribute('hidden');
      } else {
        backToTop.classList.remove('visible');
        backToTop.setAttribute('hidden', '');
      }
    }

    window.addEventListener('scroll', toggleButton, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ============================================
     Scroll Animations (Intersection Observer)
     Fade in / Slide up elements on scroll
     ============================================ */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      slideUpElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    slideUpElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     Gallery Lightbox
     ============================================ */
  function initLightbox() {
    function openLightbox(imgSrc, imgAlt) {
      lightboxImage.src = imgSrc;
      lightboxImage.alt = imgAlt;
      lightbox.classList.add('active');
      lightbox.removeAttribute('hidden');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('hidden', '');
      lightboxImage.src = '';
      document.body.classList.remove('no-scroll');
    }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = item.querySelector('img');
        if (img) {
          openLightbox(img.src, img.alt);
        }
      });

      // Keyboard accessibility
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const img = item.querySelector('img');
          if (img) {
            openLightbox(img.src, img.alt);
          }
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ============================================
     Contact Form Validation & Submission
     ============================================ */
  function initContactForm() {
    const fields = {
      name: {
        element: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: function (value) {
          if (!value.trim()) return 'Please enter your full name.';
          if (value.trim().length < 2) return 'Name must be at least 2 characters.';
          return '';
        }
      },
      phone: {
        element: document.getElementById('phone'),
        error: document.getElementById('phone-error'),
        validate: function (value) {
          if (!value.trim()) return 'Please enter your phone number.';
          const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
          if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number.';
          return '';
        }
      },
      email: {
        element: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: function (value) {
          if (!value.trim()) return 'Please enter your email address.';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.';
          return '';
        }
      },
      message: {
        element: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: function (value) {
          if (!value.trim()) return 'Please enter your message.';
          if (value.trim().length < 10) return 'Message must be at least 10 characters.';
          return '';
        }
      }
    };

    function showError(field, message) {
      field.element.classList.add('error');
      field.error.textContent = message;
    }

    function clearError(field) {
      field.element.classList.remove('error');
      field.error.textContent = '';
    }

    // Real-time validation on blur
    Object.keys(fields).forEach(function (key) {
      const field = fields[key];
      field.element.addEventListener('blur', function () {
        const error = field.validate(field.element.value);
        if (error) {
          showError(field, error);
        } else {
          clearError(field);
        }
      });

      field.element.addEventListener('input', function () {
        if (field.element.classList.contains('error')) {
          const error = field.validate(field.element.value);
          if (!error) {
            clearError(field);
          }
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      Object.keys(fields).forEach(function (key) {
        const field = fields[key];
        const error = field.validate(field.element.value);

        if (error) {
          showError(field, error);
          isValid = false;
        } else {
          clearError(field);
        }
      });

      if (!isValid) {
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      // Simulate form submission (replace with actual API call)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(function () {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        formSuccess.removeAttribute('hidden');

        setTimeout(function () {
          formSuccess.setAttribute('hidden', '');
        }, 6000);
      }, 1500);
    });
  }

  /* ============================================
     Lazy Loading Enhancement
     Native loading="lazy" + Intersection Observer fallback
     ============================================ */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
      return; // Browser supports native lazy loading
    }

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function (img) {
        imageObserver.observe(img);
      });
    }
  }

  /* ============================================
     Initialize All Modules
     ============================================ */
  function init() {
    document.body.classList.add('no-scroll');
    initLoader();
    initStickyHeader();
    initMobileNav();
    initSmoothScroll();
    initActiveNav();
    initBackToTop();
    initScrollAnimations();
    initLightbox();
    initContactForm();
    initLazyLoading();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
