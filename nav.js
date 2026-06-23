/* RetailFlow responsive navigation — hamburger toggle.
   Adds a .nav-toggle button to each page header; this script wires it up. */
(function () {
  function init() {
    var navs = document.querySelectorAll('header nav, nav.nav-site');
    navs.forEach(function (nav) {
      // Build the toggle button once per nav
      if (nav.querySelector('.nav-toggle')) return;
      var links = nav.querySelector('.nav-links');
      if (!links) return;

      var btn = document.createElement('button');
      btn.className = 'nav-toggle';
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', 'Open menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(btn);

      function close() {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      }
      btn.addEventListener('click', function () {
        var open = nav.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      // Close after choosing a destination
      links.addEventListener('click', function (e) {
        if (e.target.closest('a')) close();
      });
      // Close on Escape / outside click
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) close();
      });
      // Reset when resizing up to desktop
      window.addEventListener('resize', function () {
        if (window.innerWidth > 860) close();
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
