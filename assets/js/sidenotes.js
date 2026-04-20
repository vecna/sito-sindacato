/**
 * sidenotes.js
 * Takes Hugo-rendered Goldmark footnotes and repositions them
 * as margin notes alongside the text that references them.
 *
 * Hugo/Goldmark renders footnotes as:
 *   - References:  <sup id="fnref:N"><a href="#fn:N">N</a></sup>
 *                  or <sup id="fnref1:N"><a href="#fn:N">N</a></sup> (for duplicate refs)
 *   - Section:     <section class="footnotes"> … <ol> <li id="fn:N"> … </li> </ol> </section>
 */

(function () {
  'use strict';

  const MARGIN_TOP_PX = 12;   // minimum vertical gap between sidenotes

  function initSidenotes() {
    const container = document.querySelector('.sidenote-layout .content-body');
    if (!container) return;

    const footnotesSection = container.querySelector('.footnotes, section.footnotes');
    if (!footnotesSection) return;

    // Collect all footnote reference <sup> elements
    const refs = container.querySelectorAll('sup[id^="fnref"]');
    if (refs.length === 0) return;

    // Check viewport: skip sidenote placement on narrow screens
    if (window.innerWidth < 900) {
      container.classList.add('sidenotes-fallback');
      footnotesSection.style.display = '';
      return;
    }

    let lastBottom = 0;

    refs.forEach(function (sup) {
      // Get the footnote id from the <a> inside the <sup>
      const anchor = sup.querySelector('a[href^="#fn"]');
      if (!anchor) return;

      const fnId = anchor.getAttribute('href').replace('#', '');
      const footnoteLi = footnotesSection.querySelector('#' + CSS.escape(fnId));
      if (!footnoteLi) return;

      // Extract footnote content (skip the back-reference link)
      const clone = footnoteLi.cloneNode(true);
      const backlinks = clone.querySelectorAll('.footnote-backref, a[href^="#fnref"]');
      backlinks.forEach(function (bl) { bl.remove(); });
      const noteHTML = clone.innerHTML.trim();

      // Extract footnote number from the sup text
      const noteNumber = anchor.textContent.trim();

      // Create sidenote element
      const sidenote = document.createElement('span');
      sidenote.className = 'sidenote';
      sidenote.setAttribute('role', 'note');
      sidenote.innerHTML =
        '<span class="sidenote-number">' + noteNumber + '.</span> ' + noteHTML;

      // Append to content-body (absolutely positioned)
      container.appendChild(sidenote);

      // Position vertically aligned with the reference
      const containerRect = container.getBoundingClientRect();
      const supRect = sup.getBoundingClientRect();
      let desiredTop = supRect.top - containerRect.top;

      // Prevent overlap with previous sidenote
      if (desiredTop < lastBottom + MARGIN_TOP_PX) {
        desiredTop = lastBottom + MARGIN_TOP_PX;
      }

      sidenote.style.top = desiredTop + 'px';

      // Track the bottom of this sidenote for collision avoidance
      lastBottom = desiredTop + sidenote.offsetHeight;
    });

    // Hide the original footnotes section
    footnotesSection.style.display = 'none';
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidenotes);
  } else {
    initSidenotes();
  }

  // Re-run on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Remove existing sidenotes and re-init
      document.querySelectorAll('.sidenote').forEach(function (el) { el.remove(); });
      const fs = document.querySelector('.sidenote-layout .content-body .footnotes, .sidenote-layout .content-body section.footnotes');
      if (fs) fs.style.display = '';
      var fb = document.querySelector('.sidenotes-fallback');
      if (fb) fb.classList.remove('sidenotes-fallback');
      initSidenotes();
    }, 250);
  });
})();
