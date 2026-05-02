(function () {
  'use strict';

  var GAP = 12;

  function init() {
    var container = document.querySelector('.sidenote-layout .content-body');
    if (!container) return;

    var footnotesSection = container.querySelector('.footnotes') ||
                           container.querySelector('section.footnotes');
    if (!footnotesSection) return;

    var refs = container.querySelectorAll('sup[id^="fnref"]');
    if (!refs.length) return;

    if (window.innerWidth < 900) {
      container.classList.add('sidenotes-fallback');
      footnotesSection.style.display = '';
      return;
    }

    var lastBottom = 0;

    refs.forEach(function (sup) {
      var anchor = sup.querySelector('a[href^="#fn"]');
      if (!anchor) return;

      var fnId = anchor.getAttribute('href').replace('#', '');
      var footnoteLi = footnotesSection.querySelector('#' + CSS.escape(fnId));
      if (!footnoteLi) return;

      var clone = footnoteLi.cloneNode(true);
      clone.querySelectorAll('.footnote-backref, a[href^="#fnref"]')
           .forEach(function (bl) { bl.remove(); });

      var noteNumber = anchor.textContent.trim();

      var sidenote = document.createElement('span');
      sidenote.className = 'sidenote';
      sidenote.setAttribute('role', 'note');
      sidenote.innerHTML =
        '<span class="sidenote-number">' + noteNumber + '</span> ' +
        clone.innerHTML.trim();

      container.appendChild(sidenote);

      var containerRect = container.getBoundingClientRect();
      var supRect = sup.getBoundingClientRect();
      var desiredTop = supRect.top - containerRect.top;

      if (desiredTop < lastBottom + GAP) desiredTop = lastBottom + GAP;

      sidenote.style.top = desiredTop + 'px';
      lastBottom = desiredTop + sidenote.offsetHeight;
    });

    footnotesSection.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      document.querySelectorAll('.sidenote').forEach(function (el) { el.remove(); });
      var fs = document.querySelector('.sidenote-layout .content-body .footnotes') ||
               document.querySelector('.sidenote-layout .content-body section.footnotes');
      if (fs) fs.style.display = '';
      var fb = document.querySelector('.sidenotes-fallback');
      if (fb) fb.classList.remove('sidenotes-fallback');
      init();
    }, 250);
  });
})();
