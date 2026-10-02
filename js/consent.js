/* ═══════════════════════════════════════════════════
   JAN Scheunert — consent.js
   DSGVO-konformes Cookie-Banner
   · Newsreader font, consistent with site design
   · localStorage — no tracking without acceptance
   · WCAG AA: sufficient contrast, keyboard accessible
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const KEY = 'jt_consent';
  let stored;
  try { stored = localStorage.getItem(KEY); } catch (e) { return; }
  if (stored === 'accepted' || stored === 'declined') return;

  /* ── Markup ───────────────────────────────────── */
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML =
    '<p class="cb-text">This site uses cookies to analyse traffic. ' +
    'See our <a href="datenschutz.html">Privacy Policy</a>.</p>' +
    '<div class="cb-actions">' +
    '<button class="cb-btn cb-decline" id="cbDecline">Decline</button>' +
    '<button class="cb-btn cb-accept"  id="cbAccept">Accept</button>' +
    '</div>';

  /* ── Styles — Newsreader, 18 px base ─────────── */
  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed;
      inset-block-end: 0;
      inset-inline: 0;
      z-index: 999;
      background: #F8F8F7;
      border-block-start: 1px solid #D4D2CE;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding-block: 14px;
      padding-inline: clamp(1.5rem, 4vw, 3.5rem);
      flex-wrap: wrap;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 1.125rem;
      font-weight: 300;
      font-variation-settings: 'opsz' 18;
      line-height: 1.55;
      transform: translateY(100%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #cookie-banner.cb-visible { transform: translateY(0); }

    .cb-text {
      flex: 1;
      min-inline-size: 200px;
      color: #5A5754;
      max-width: none;
    }
    .cb-text a {
      color: #0A0A0A;
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: opacity 150ms;
    }
    .cb-text a:hover { opacity: 0.5; }

    .cb-actions {
      display: flex;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .cb-btn {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 1rem;
      font-weight: 400;
      font-variation-settings: 'opsz' 16;
      padding-block: 0.6rem;
      padding-inline: 1.5rem;
      border: 1px solid #0A0A0A;
      cursor: pointer;
      transition: background 150ms, color 150ms, opacity 150ms;
      background: transparent;
      color: #0A0A0A;
    }
    .cb-btn:focus-visible {
      outline: 2px solid #0A0A0A;
      outline-offset: 3px;
    }

    .cb-decline { opacity: 0.55; }
    .cb-decline:hover { opacity: 1; }

    .cb-accept { background: #0A0A0A; color: #F8F8F7; }
    .cb-accept:hover { background: #2a2a2a; }

    @media (max-width: 480px) {
      #cookie-banner {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      .cb-actions {
        inline-size: 100%;
        justify-content: flex-end;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(banner);

  /* Slide in after paint — double rAF avoids style recalc skip */
  requestAnimationFrame(() =>
    requestAnimationFrame(() => banner.classList.add('cb-visible'))
  );

  /* ── Dismiss helper ───────────────────────────── */
  function dismiss(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    banner.style.transform = 'translateY(100%)';
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
  }

  document.getElementById('cbAccept').addEventListener('click', () => {
    dismiss('accepted');
    // Initialise analytics / tracking here when needed
  });

  document.getElementById('cbDecline').addEventListener('click',
    () => dismiss('declined')
  );

})();
