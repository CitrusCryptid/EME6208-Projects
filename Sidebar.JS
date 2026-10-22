  var FADE_MS = 400; // fade duration in milliseconds

  function setupFade() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Black overlay that sits on top of the page content, just under the sidebar
    var overlay = document.createElement('div');
    overlay.id = HOST_ID + '-fade';
    overlay.style.cssText =
      'position:fixed;inset:0;background:#000;z-index:999;' +
      'pointer-events:none;opacity:1;transition:opacity ' + FADE_MS + 'ms ease;';
    document.body.appendChild(overlay);

    // Fade in when the page loads (double rAF makes sure the transition runs)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.style.opacity = '0'; });
    });

    // Back/forward buttons can restore the page from cache while it's still black
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '0';
      }
    });

    // Fade to black before following a sidebar link
    var host = document.getElementById(HOST_ID);
    host.shadowRoot.addEventListener('click', function (e) {
      var link = e.target.closest('a.nav-link');
      if (!link) return;
      if (link.target === '_blank') return;                     // new-tab links: no fade
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (link.origin !== location.origin) return;              // other sites: no fade

      e.preventDefault();
      overlay.style.pointerEvents = 'all';
      overlay.style.opacity = '1';
      setTimeout(function () { window.location.href = link.href; }, FADE_MS);
    });
  }

  function mount() {
    if (document.getElementById(HOST_ID)) return; // don't inject twice

    var host = document.createElement('div');
    host.id = HOST_ID;

    var shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<style>' + SIDEBAR_CSS + '</style>' + buildMarkup();

    document.body.insertBefore(host, document.body.firstChild);

    if (applyOffset) {
      var style = document.createElement('style');
      style.id = HOST_ID + '-page-style';
      style.textContent = PAGE_CSS;
      document.head.appendChild(style);
    }

    setupFade();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
;