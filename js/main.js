/* ═══════════════════════════════════════════════════
   JAN Scheunert — main.js
   Copyright year · Mobile nav · Lightbox
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Copyright year ─────────────────────────────── */
  const copyrightEl = document.getElementById('footer-copy');
  if (copyrightEl) {
    copyrightEl.textContent =
      '\u00a9 ' + new Date().getFullYear() + ' Jan Scheunert. All rights reserved.';
  }

  /* ── Mobile nav ─────────────────────────────────── */
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('aria-hidden', String(isOpen));
      mobileNav.classList.toggle('is-open', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('is-open');
      }
    });
  }

  /* ── Lightbox ────────────────────────────────────── */
  const items      = Array.from(document.querySelectorAll('.grid-item'));
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbCounter  = document.getElementById('lightboxCounter');
  const lbClose    = document.getElementById('lightboxClose');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');
  const lbBackdrop = document.getElementById('lightboxBackdrop');

  if (!lightbox || items.length === 0) return;

  let currentIndex  = 0;
  let previousFocus = null;

  function getImages() {
    return items.map((btn) => {
      const img = btn.querySelector('img');
      return { src: img ? img.src : '', alt: img ? img.alt : '' };
    });
  }

  function setImage(index) {
    const images = getImages();
    const total  = images.length;
    currentIndex = ((index % total) + total) % total;

    lbImg.style.opacity = '0';
    const { src, alt } = images[currentIndex];

    const preload    = new Image();
    const onLoad     = () => { lbImg.src = src; lbImg.alt = alt; lbImg.style.opacity = '1'; };
    preload.onload   = onLoad;
    preload.onerror  = onLoad; // show placeholder on error too
    preload.src      = src;

    lbCounter.textContent  = `${currentIndex + 1} / ${total}`;
    lbPrev.disabled        = total <= 1;
    lbNext.disabled        = total <= 1;
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;
    setImage(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lbClose.focus());
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  }

  const prevImage = () => setImage(currentIndex - 1);
  const nextImage = () => setImage(currentIndex + 1);

  items.forEach((btn, i) => btn.addEventListener('click', () => openLightbox(i)));

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevImage);
  lbNext.addEventListener('click', nextImage);
  lbBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    switch (e.key) {
      case 'Escape':     closeLightbox(); break;
      case 'ArrowLeft':  e.preventDefault(); prevImage(); break;
      case 'ArrowRight': e.preventDefault(); nextImage(); break;
    }
  });

  // Focus trap
  lightbox.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(lightbox.querySelectorAll('button:not([disabled])'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? nextImage() : prevImage();
  }, { passive: true });

})();
