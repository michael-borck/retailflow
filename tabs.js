/* RetailFlow reusable tabs.
   Each .rf-tabs groups buttons (.rf-tab, with data-tab); the sibling .rf-panel
   elements (data-tab) under the same parent are the panels. Supports multiple
   independent tab groups per page. Keyboard arrows move between tabs;
   location.hash deep-links to a tab (e.g. page.html#stores). */
(function () {
  function setup(tablist) {
    var scope = tablist.parentElement;
    if (!scope) return;
    var tabs = [].slice.call(tablist.querySelectorAll('.rf-tab'));
    var panels = [].slice.call(scope.querySelectorAll(':scope > .rf-panel'));
    if (!tabs.length) return;

    function activate(id, focus) {
      tabs.forEach(function (t) {
        var on = t.dataset.tab === id;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.classList.toggle('active', p.dataset.tab === id); });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(t.dataset.tab); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); activate(n.dataset.tab, true); }
      });
    });

    var h = (location.hash || '').replace('#', '');
    activate((h && scope.querySelector(':scope > .rf-panel[data-tab="' + h + '"]')) ? h : tabs[0].dataset.tab);
  }

  function init() { document.querySelectorAll('.rf-tabs').forEach(setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
