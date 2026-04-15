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
    '      <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><circle cx="5" cy="5" r="5"/></svg>',
    '    </a>',
    '    <div class="nav-items">',
    '      <a href="' + pagesBase + 'home.html" class="nav-item" data-page="home">Home</a>',
    '      <a href="' + pagesBase + 'engagement.html" class="nav-item" data-page="engagement">Engagement</a>',
    '      <a href="' + pagesBase + 'shopping-assistant.html" class="nav-item" data-page="shopping">',
    '        <span class="nav-icon-sparkle">\u2736</span> Shopping Assistant',
    '      </a>',
    '      <a href="' + pagesBase + 'knowledge.html" class="nav-item" data-page="knowledge">Knowledge</a>',
    '      <a href="' + reportsBase + 'conversations.html" class="nav-item" data-page="reports">',
    '        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">',
    '          <rect x="1" y="9" width="3" height="6" rx="1"/>',
    '          <rect x="6" y="5" width="3" height="10" rx="1"/>',
    '          <rect x="11" y="2" width="3" height="13" rx="1"/>',
    '        </svg>',
    '        Reports',
    '      </a>',
    '      <a href="' + pagesBase + 'settings.html" class="nav-item" data-page="settings">',
    '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '          <circle cx="12" cy="12" r="3"/>',
    '          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    '        </svg>',
    '        Settings',
    '      </a>',
    '    </div>',
    '    <div class="nav-actions">',
    '      <button class="btn-help">Help</button>',
    '      <div class="client-selector">',
    '        <button class="client-selector-btn" aria-haspopup="true" aria-expanded="false">',
    '          <span class="client-name">Brand - EN</span>',
    '          <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">',
    '            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    '          </svg>',
    '        </button>',
    '        <div class="client-dropdown">',
    '          <div class="client-dropdown-item is-active">Brand - EN</div>',
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

})();
