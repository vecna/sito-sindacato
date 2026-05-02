(function () {
  'use strict';
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('nav-links');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
})();
