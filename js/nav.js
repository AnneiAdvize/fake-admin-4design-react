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
    '      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '        <circle cx="10" cy="10" r="10" fill="#0A0A09"/>',
    '        <circle cx="10" cy="9" r="4.5" fill="none" stroke="white" stroke-width="1.5"/>',
    '        <path d="M7 13.5 Q10 16 13 13.5" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    '      </svg>',
    '    </a>',
    '    <div class="nav-items">',
    '      <a href="' + pagesBase + 'home.html" class="nav-item" data-page="home">',
    '        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">',
    '          <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    '          <path d="M6 15v-5h4v5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    '        </svg>',
    '        Home',
    '      </a>',
    '      <a href="' + pagesBase + 'engagement.html" class="nav-item" data-page="engagement">',
    '        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">',
    '          <circle cx="8" cy="8" r="6"/>',
    '          <circle cx="8" cy="8" r="2.5"/>',
    '          <line x1="8" y1="1" x2="8" y2="2.5"/>',
    '          <line x1="8" y1="13.5" x2="8" y2="15"/>',
    '          <line x1="1" y1="8" x2="2.5" y2="8"/>',
    '          <line x1="13.5" y1="8" x2="15" y2="8"/>',
    '        </svg>',
    '        Engagement',
    '      </a>',
    '      <a href="' + pagesBase + 'shopping-assistant.html" class="nav-item" data-page="shopping">',
    '        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">',
    '          <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z"/>',
    '        </svg>',
    '        Shopping Assistant',
    '      </a>',
    '      <a href="' + pagesBase + 'knowledge.html" class="nav-item" data-page="knowledge">',
    '        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">',
    '          <rect x="2" y="2" width="12" height="10" rx="1.5"/>',
    '          <path d="M5 6h6M5 9h4"/>',
    '          <path d="M5 14l3-2 3 2"/>',
    '        </svg>',
    '        Knowledge',
    '      </a>',
    '      <a href="' + reportsBase + 'overview.html" class="nav-item" data-page="reports">',
    '        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">',
    '          <rect x="1" y="9" width="3" height="6" rx="1"/>',
    '          <rect x="6.5" y="5" width="3" height="10" rx="1"/>',
    '          <rect x="12" y="2" width="3" height="13" rx="1"/>',
    '        </svg>',
    '        Reports',
    '      </a>',
    '      <a href="' + pagesBase + 'settings.html" class="nav-item" data-page="settings">',
    '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '          <circle cx="12" cy="12" r="3"/>',
    '          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    '        </svg>',
    '        Settings',
    '      </a>',
    '    </div>',
    '    <div class="nav-actions">',
    '      <button class="btn-help">',
    '        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">',
    '          <circle cx="8" cy="8" r="7"/>',
    '          <path d="M6.5 6a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5"/>',
    '          <circle cx="8" cy="12" r=".5" fill="currentColor"/>',
    '        </svg>',
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

})();
