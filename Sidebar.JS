/*!
 * sidebar.js — drop-in sidebar for any page.
 *
 * Usage:
 *   <script src="sidebar.js" defer></script>
 *
 * Options (all optional, set as data attributes on the script tag):
 *   data-offset="false"   Don't push the page content to the right of the sidebar.
 *
 * The sidebar lives in a Shadow DOM, so its CSS can't clash with your page's CSS
 * (and your page's CSS can't break the sidebar).
 */
(function () {
  'use strict';

  var HOST_ID = 'bf-sidebar-host';
  var script = document.currentScript;
  var applyOffset = !(script && script.dataset.offset === 'false');

  // ---------- CONFIG: edit your content here ----------
  var CONFIG = {
    name: 'Ben Finkelstein',
    subtitle: 'EdTech',
    links: [
      { label: 'Home', href: 'https://bfinkelsteinedu.carrd.co/', newTab: true },
      { label: 'Gibbon Quiz', href: 'index.html'},
      { label: 'Drag & Drop', href: 'drag.html'},
      // { label: 'About', href: '/about.html' },
    ]
  };

  // ---------- STYLES (inside the shadow root) ----------
  var SIDEBAR_CSS = `
    :host { all: initial; }

    .sidebar * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .sidebar {
      --sidebar-width: 225px;
      --primary-color: #261815;
      --secondary-color: #2B1616;
      --text-color: #DBA9A9;
      --hover-color: #F5F0F0;
      --mobile-nav-height: auto;

      font-family: system-ui, -apple-system, sans-serif;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: var(--sidebar-width);
      background: linear-gradient(black, var(--secondary-color));
      padding: 2rem;
      backdrop-filter: blur(8px);
      z-index: 1000;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      padding: 1rem;
      opacity: 1;
    }

    .logo {
      color: var(--text-color);
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      white-space: nowrap;
    }

    .logo-name {
      font-size: 2rem;
      line-height: 1.5;
    }

    .logo-subtitle {
      font-size: 1rem;
      font-weight: normal;
      opacity: 0.8;
      text-align: center;
      line-height: 0.5;
    }

    .nav-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      color: #F26F4B;
      text-decoration: none;
      border-radius: 2.75rem;
      transition: all 0.2s ease;
      font-size: 1.25rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0);
      white-space: nowrap;
    }

    .nav-link:hover {
      background: var(--hover-color);
      color: var(--primary-color);
      transform: translateX(10px);
      border-color: var(--primary-color);
      box-shadow: 0 0 20px rgba(19, 175, 240, 0.1);
    }

    .nav-link svg {
      width: 32px;
      height: 32px;
      margin-right: 1rem;
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
      flex-shrink: 0;
    }

    .nav-link span {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        height: auto;
        position: relative;
        padding: 1rem;
      }
      .sidebar-header { margin-bottom: 1rem; }
      .logo { gap: 0.5rem; }
      .logo-name { font-size: 1.5rem; }
      .logo-subtitle { font-size: 0.875rem; }
      .nav-list {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }
      .nav-link {
        padding: 0.75rem 1rem;
        font-size: 1rem;
        flex-direction: column;
        text-align: center;
        transform: none;
      }
      .nav-link:hover { transform: translateY(-5px); }
      .nav-link svg {
        width: 24px;
        height: 24px;
        margin-right: 0;
        margin-bottom: 0.5rem;
      }
      .nav-link span { font-size: 0.875rem; }
    }

    @media (max-width: 480px) {
      .sidebar { padding: 0.75rem; }
      .logo-name { font-size: 1.25rem; }
      .logo-subtitle { font-size: 0.75rem; }
      .nav-link { padding: 0.5rem 0.75rem; }
      .nav-link svg { width: 20px; height: 20px; }
      .nav-link span { font-size: 0.75rem; }
    }
  `;

  // ---------- PAGE-LEVEL CSS (pushes content past the fixed sidebar) ----------
  // Sidebar total width = 225px content + 2rem padding on each side.
  var PAGE_CSS = `
    body { margin-left: calc(225px + 4rem); }
    @media (max-width: 768px) {
      body { margin-left: 0; }
    }
  `;

  // ---------- HELPERS ----------
  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function buildMarkup() {
    var items = CONFIG.links.map(function (l) {
      var external = l.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
      return (
        '<li class="nav-item">' +
          '<a href="' + escapeHTML(l.href) + '" class="nav-link"' + external + '>' +
            '<span>' + escapeHTML(l.label) + '</span>' +
          '</a>' +
        '</li>'
      );
    }).join('');

    return (
      '<aside class="sidebar">' +
        '<div class="sidebar-header">' +
          '<div class="logo">' +
            '<span class="logo-name">' + escapeHTML(CONFIG.name) + '</span>' +
            '<span class="logo-subtitle">' + escapeHTML(CONFIG.subtitle) + '</span>' +
          '</div>' +
        '</div>' +
        '<ul class="nav-list">' + items + '</ul>' +
      '</aside>'
    );
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();