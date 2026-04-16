/* ============================================================
   nav.js — shared navigation component
   Injects nav-primary (all pages) and nav-secondary (reports + settings).
   Detects the current directory depth to resolve relative paths.
   ============================================================ */

(function () {
  'use strict';

  var path       = window.location.pathname;
  var isReports  = path.indexOf('/reports/') !== -1;
  var isSettings = path.indexOf('/settings') !== -1;

  /* Relative path prefixes based on depth */
  var root        = isReports ? '../../'        : '../';
  var pagesBase   = isReports ? '../'           : './';
  var reportsBase = isReports ? './'            : './reports/';

  /* ── Primary nav ── */
  var navPrimary = [
    '<nav class="nav-primary">',
    '  <div class="nav-primary-inner">',
    '    <a href="' + root + 'index.html" class="nav-logo" aria-label="Dashboard home">',
    '      <img src="' + root + 'assets/icons/logo.png" width="28" height="28" alt="" aria-hidden="true">',
    '    </a>',
    '    <div class="nav-items">',
    '      <a href="' + pagesBase + 'home.html" class="nav-item" data-page="home">',
    '        <img src="' + root + 'assets/icons/Navigation/home.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Home',
    '      </a>',
    '      <a href="' + pagesBase + 'engagement.html" class="nav-item" data-page="engagement">',
    '        <img src="' + root + 'assets/icons/Navigation/engagement.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Engagement',
    '      </a>',
    '      <a href="' + pagesBase + 'shopping-assistant.html" class="nav-item" data-page="shopping">',
    '        <img src="' + root + 'assets/icons/Navigation/aisa.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Shopping Assistant',
    '      </a>',
    '      <a href="' + pagesBase + 'knowledge.html" class="nav-item" data-page="knowledge">',
    '        <img src="' + root + 'assets/icons/Navigation/knowledge.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Knowledge',
    '      </a>',
    '      <a href="' + reportsBase + 'overview.html" class="nav-item" data-page="reports">',
    '        <img src="' + root + 'assets/icons/Navigation/report.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Reports',
    '      </a>',
    '      <a href="' + pagesBase + 'settings.html" class="nav-item" data-page="settings">',
    '        <img src="' + root + 'assets/icons/Navigation/Settings.png" width="16" height="16" alt="" aria-hidden="true" class="nav-icon">',
    '        Settings',
    '      </a>',
    '    </div>',
    '    <div class="nav-actions">',
    '      <button class="btn-help">',
    '        <img src="' + root + 'assets/icons/Navigation/help.png" width="14" height="14" alt="" aria-hidden="true" class="nav-icon">',
    '        Help',
    '      </button>',
    '      <div class="client-selector">',
    '        <button class="client-selector-btn" aria-haspopup="true" aria-expanded="false">',
    '          <span class="client-name">Nespresso - FR</span>',
    '          <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">',
    '            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    '          </svg>',
    '        </button>',
    '        <div class="client-dropdown">',
    '          <div class="client-dropdown-item is-active">Nespresso - FR</div>',
    '          <div class="client-dropdown-item">Nespresso - EN</div>',
    '          <div class="client-dropdown-divider"></div>',
    '          <div class="client-dropdown-item">Brand - EN</div>',
    '          <div class="client-dropdown-item">Brand - FR</div>',
    '        </div>',
    '      </div>',
    '      <div class="user-avatar" title="Anne Pedro">AP</div>',
    '    </div>',
    '  </div>',
    '</nav>'
  ].join('\n');

  /* ── Secondary nav (reports section) ── */
  var navSecondary = isReports ? [
    '<nav class="nav-secondary">',
    '  <div class="nav-secondary-inner">',
    '    <a href="./overview.html"      class="nav-sub-item" data-page="overview">Overview</a>',
    '    <a href="./sales.html"         class="nav-sub-item" data-page="sales">Sales</a>',
    '    <a href="./conversations.html" class="nav-sub-item" data-page="conversations">Conversations</a>',
    '    <a href="./quality.html"       class="nav-sub-item" data-page="quality">Quality</a>',
    '  </div>',
    '</nav>'
  ].join('\n')

  /* ── Secondary nav (settings section) ── */
  : isSettings ? [
    '<nav class="nav-secondary">',
    '  <div class="nav-secondary-inner">',
    '    <a href="' + pagesBase + 'settings.html"              class="nav-sub-item" data-page="settings-users">Users</a>',
    '    <a href="' + pagesBase + 'settings.html"              class="nav-sub-item" data-page="settings-pagetypes">Page types configuration</a>',
    '    <a href="' + pagesBase + 'settings.html"              class="nav-sub-item" data-page="settings-integration">Integration</a>',
    '    <a href="' + pagesBase + 'settings.html"              class="nav-sub-item" data-page="settings-consent">Consent</a>',
    '  </div>',
    '</nav>'
  ].join('\n')

  : '';

  /* Insert nav HTML right before this <script> tag */
  var currentScript = document.currentScript;
  currentScript.insertAdjacentHTML('beforebegin', navPrimary + '\n' + navSecondary);

  /* ── Set active nav item and icon ── */
  var currentFile = path.split('/').pop() || 'index.html';
  var activePage = null;

  if (currentFile === 'index.html' || currentFile === '') {
    activePage = 'home';
  } else if (currentFile === 'home.html') {
    activePage = 'home';
  } else if (currentFile === 'engagement.html') {
    activePage = 'engagement';
  } else if (currentFile === 'shopping-assistant.html') {
    activePage = 'shopping';
  } else if (currentFile === 'knowledge.html') {
    activePage = 'knowledge';
  } else if (isReports) {
    activePage = 'reports';
  } else if (currentFile === 'settings.html') {
    activePage = 'settings';
  }

  if (activePage) {
    var activeItem = document.querySelector('[data-page="' + activePage + '"]');
    if (activeItem) {
      activeItem.classList.add('active');
      var icon = activeItem.querySelector('.nav-icon');
      if (icon && icon.src) {
        icon.src = icon.src.replace(/\.png$/, '-active.png');
      }
    }
  }

})();
