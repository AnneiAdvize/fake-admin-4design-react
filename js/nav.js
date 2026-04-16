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
    '        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" class="nav-icon">',
    '          <path d="M5.00024 13.4888V8.55543C5.00024 8.18206 5.00024 7.99537 5.07291 7.85276C5.13682 7.72732 5.23881 7.62534 5.36425 7.56142C5.50686 7.48876 5.69354 7.48876 6.06691 7.48876H7.93358C8.30695 7.48876 8.49363 7.48876 8.63624 7.56142C8.76168 7.62534 8.86367 7.72732 8.92758 7.85276C9.00024 7.99537 9.00024 8.18206 9.00024 8.55543V13.4888M6.34537 1.33144L1.82384 4.84819C1.52159 5.08327 1.37047 5.20081 1.2616 5.34801C1.16515 5.4784 1.09331 5.62529 1.0496 5.78147C1.00024 5.95778 1.00024 6.14923 1.00024 6.53214V11.3554C1.00024 12.1022 1.00024 12.4755 1.14557 12.7607C1.2734 13.0116 1.47737 13.2156 1.72826 13.3434C2.01347 13.4888 2.38684 13.4888 3.13358 13.4888H10.8669C11.6136 13.4888 11.987 13.4888 12.2722 13.3434C12.5231 13.2156 12.7271 13.0116 12.8549 12.7607C13.0002 12.4755 13.0002 12.1022 13.0002 11.3554V6.53214C13.0002 6.14923 13.0002 5.95778 12.9509 5.78147C12.9072 5.62529 12.8353 5.4784 12.7389 5.34801C12.63 5.20081 12.4789 5.08327 12.1767 4.84819L7.65511 1.33144C7.4209 1.14927 7.30379 1.05818 7.17448 1.02317C7.06038 0.992277 6.94011 0.992277 6.82601 1.02317C6.6967 1.05818 6.57959 1.14927 6.34537 1.33144Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    '        </svg>',
    '        Home',
    '      </a>',
    '      <a href="' + pagesBase + 'engagement.html" class="nav-item" data-page="engagement">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="nav-icon">',
    '          <g clip-path="url(#clip0_6260_2158)">',
    '            <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="currentColor"/>',
    '          </g>',
    '          <defs>',
    '            <clipPath id="clip0_6260_2158">',
    '              <rect width="16" height="16" fill="white"/>',
    '            </clipPath>',
    '          </defs>',
    '        </svg>',
    '        Engagement',
    '      </a>',
    '      <a href="' + pagesBase + 'shopping-assistant.html" class="nav-item" data-page="shopping">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="nav-icon">',
    '          <path d="M13.3523 0.309072C13.2355 -0.102301 12.6765 -0.103274 12.5582 0.307658C12.0411 2.10385 11.9988 2.14689 10.2092 2.66243C9.7992 2.78056 9.79997 3.34414 10.2104 3.46113C11.9989 3.97096 12.0415 4.01473 12.5583 5.80946C12.6766 6.22033 13.2355 6.21939 13.3523 5.80809C13.8617 4.01476 13.9032 3.97068 15.6917 3.46114C16.1022 3.34419 16.103 2.78046 15.6928 2.66236C13.9032 2.14702 13.8618 2.10379 13.3523 0.309072Z" fill="currentColor"/>',
    '          <path d="M7.37764 3.4126C7.14229 2.59024 6.02095 2.5909 5.7863 3.41346C4.64321 7.42053 4.60895 7.45805 0.616096 8.59857C-0.204746 8.83304 -0.205604 9.96385 0.614955 10.1993C4.60919 11.3455 4.64319 11.3773 5.78625 15.3827C6.02098 16.2053 7.14239 16.2059 7.37788 15.3837C8.52508 11.3779 8.55383 11.3462 12.5465 10.1995C13.3669 9.9639 13.3661 8.83309 12.5453 8.59852C8.55315 7.45755 8.52467 7.42058 7.37764 3.4126Z" fill="currentColor"/>',
    '        </svg>',
    '        Shopping Assistant',
    '      </a>',
    '      <a href="' + pagesBase + 'knowledge.html" class="nav-item" data-page="knowledge">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="nav-icon">',
    '          <path d="M14.4 1H1.6C0.72 1 0 1.75 0 2.66667V5.16667C0 5.625 0.36 6 0.8 6V14.3333C0.8 15.25 1.52 16 2.4 16H13.6C14.48 16 15.2 15.25 15.2 14.3333V6C15.64 6 16 5.625 16 5.16667V2.66667C16 1.75 15.28 1 14.4 1ZM14.4 2.66667V4.33333H1.6V2.66667H14.4ZM13.6 14.3333H2.4V6H13.6V14.3333Z" fill="currentColor"/>',
    '          <path d="M10.4001 6.83325H5.6001V9.33325H10.4001V6.83325Z" fill="currentColor"/>',
    '        </svg>',
    '        Knowledge',
    '      </a>',
    '      <a href="' + reportsBase + 'overview.html" class="nav-item" data-page="reports">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="nav-icon">',
    '          <path d="M6.66663 3.33341C6.66663 2.96522 6.9651 2.66675 7.33329 2.66675H8.66663C9.03482 2.66675 9.33329 2.96522 9.33329 3.33341V12.6667C9.33329 13.0349 9.03482 13.3334 8.66663 13.3334H7.33329C6.9651 13.3334 6.66663 13.0349 6.66663 12.6667V3.33341Z" fill="currentColor"/>',
    '          <path d="M2.66663 8.00008C2.66663 7.63189 2.9651 7.33341 3.33329 7.33341H4.66663C5.03482 7.33341 5.33329 7.63189 5.33329 8.00008V12.6667C5.33329 13.0349 5.03482 13.3334 4.66663 13.3334H3.33329C2.9651 13.3334 2.66663 13.0349 2.66663 12.6667V8.00008Z" fill="currentColor"/>',
    '          <path d="M11.3333 6.00008C10.9651 6.00008 10.6666 6.29856 10.6666 6.66675V12.6667C10.6666 13.0349 10.9651 13.3334 11.3333 13.3334H12.6666C13.0348 13.3334 13.3333 13.0349 13.3333 12.6667V6.66675C13.3333 6.29856 13.0348 6.00008 12.6666 6.00008H11.3333Z" fill="currentColor"/>',
    '        </svg>',
    '        Reports',
    '      </a>',
    '      <a href="' + pagesBase + 'settings.html" class="nav-item" data-page="settings">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="nav-icon">',
    '          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7384 5.73653C12.818 5.90302 12.8892 6.07438 12.9513 6.25003H14.125C14.6083 6.25003 15 6.64178 15 7.12503V8.87503C15 9.35827 14.6083 9.75 14.125 9.75H12.9513C12.8891 9.92561 12.818 10.097 12.7383 10.2635L13.5685 11.0936C13.9102 11.4353 13.9102 11.9893 13.5685 12.3311L12.331 13.5685C11.9893 13.9102 11.4352 13.9102 11.0936 13.5685L10.2634 12.7384C10.0969 12.818 9.92561 12.8891 9.75 12.9513V14.125C9.75 14.6083 9.35827 15 8.875 15H7.125C6.64173 15 6.25 14.6083 6.25 14.125V12.9513C6.07435 12.8891 5.90302 12.818 5.73651 12.7384L4.90642 13.5685C4.56467 13.9102 4.0107 13.9102 3.66895 13.5685L2.43154 12.331C2.08985 11.9893 2.08985 11.4353 2.43154 11.0936L3.26163 10.2634C3.18194 10.0969 3.11075 9.92561 3.0487 9.74997H1.875C1.39173 9.74997 1 9.35822 1 8.87497V7.12497C1 6.64173 1.39173 6.24997 1.875 6.24997H3.04875C3.11081 6.07435 3.182 5.90299 3.26168 5.73651L2.43154 4.90639C2.08985 4.56467 2.08985 4.01067 2.43154 3.66895L3.669 2.43152C4.0107 2.08979 4.56472 2.08979 4.90642 2.43152L5.73656 3.26163C5.90302 3.18194 6.07435 3.11081 6.25 3.04872V1.875C6.25 1.39176 6.64173 1 7.125 1H8.875C9.35827 1 9.75 1.39176 9.75 1.875V3.04872C9.92561 3.11081 10.0969 3.18197 10.2635 3.26166L11.0936 2.43154C11.4353 2.08982 11.9893 2.08982 12.3311 2.43154L13.5685 3.66898C13.9102 4.01067 13.9102 4.5647 13.5685 4.90642L12.7384 5.73653ZM8 10.625C9.44975 10.625 10.625 9.44975 10.625 8C10.625 6.55025 9.44975 5.375 8 5.375C6.55025 5.375 5.375 6.55025 5.375 8C5.375 9.44975 6.55025 10.625 8 10.625Z" fill="currentColor"/>',
    '        </svg>',
    '        Settings',
    '      </a>',
    '    </div>',
    '    <div class="nav-actions">',
    '      <button class="btn-help">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none" class="nav-icon">',
    '          <path d="M3.33301 10.667C3.70109 10.667 3.99982 10.965 4 11.333C4 11.7012 3.7012 12 3.33301 12C2.96497 11.9998 2.66699 11.7011 2.66699 11.333C2.66717 10.9651 2.96508 10.6672 3.33301 10.667ZM4 0C6 0 8 1.66667 8 4C8 6.33333 6 8 4 8V10H2.66699V6.66699C4.33363 7.00015 6.66699 6.33316 6.66699 4C6.66699 2.71373 5.629 1.33301 4 1.33301C2.33333 1.33301 1.33301 2.66667 1.33301 4H0C6.62274e-08 2 1.66667 6.81214e-08 4 0Z" fill="currentColor"/>',
    '        </svg>',
    '        Help',
    '      </button>',
    '      <button class="btn-notification" aria-label="Notifications">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">',
    '          <path fill-rule="evenodd" clip-rule="evenodd" d="M18 9V12L20.2663 14.7196C21.3519 16.0223 20.4256 18 18.7299 18H5.27006C3.57438 18 2.64807 16.0223 3.73361 14.7196L5.99997 12V9C5.99997 5.68629 8.68627 3 12 3C15.3137 3 18 5.68629 18 9ZM5.27006 16L7.99997 12.7241V9C7.99997 6.79086 9.79084 5 12 5C14.2091 5 16 6.79086 16 9V12.7241L18.7299 16L5.27006 16Z" fill="#3D3D38"/>',
    '          <path d="M15 19H9V21H15V19Z" fill="#3D3D38"/>',
    '        </svg>',
    '      </button>',
    '      <div class="client-selector">',
    '        <button class="client-selector-btn" aria-haspopup="true" aria-expanded="false">',
    '          <span class="client-name">Brand - EN</span>',
    '          <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">',
    '            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    '          </svg>',
    '        </button>',
    '        <div class="client-dropdown">',
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
    }
  }

})();
