/* ============================================================
   interactions.js — nav active states, dropdowns, misc UI
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Utility: run after DOM is ready
  ---------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ----------------------------------------------------------
     NAV ACTIVE STATES
     Reads data-page on .nav-item / .nav-sub-item and compares
     against the current page path.
  ---------------------------------------------------------- */
  function initNavActiveStates() {
    const path = window.location.pathname;

    /* Primary nav */
    document.querySelectorAll('.nav-item[data-page]').forEach(function (el) {
      el.classList.remove('active');
      const page = el.dataset.page;
      const shouldBeActive =
        (page === 'home'              && path.includes('/home')) ||
        (page === 'engagement'        && path.includes('/engagement')) ||
        (page === 'shopping'          && path.includes('/shopping-assistant')) ||
        (page === 'knowledge'         && path.includes('/knowledge')) ||
        (page === 'reports'           && path.includes('/reports/')) ||
        (page === 'settings'          && path.includes('/settings'));
      if (shouldBeActive) el.classList.add('active');
    });

    /* Secondary (sub) nav */
    document.querySelectorAll('.nav-sub-item[data-page]').forEach(function (el) {
      el.classList.remove('active');
      const page = el.dataset.page;
      const shouldBeActive =
        (page === 'overview'       && path.includes('/overview')) ||
        (page === 'sales'          && path.includes('/sales')) ||
        (page === 'conversations'  && path.includes('/conversations')) ||
        (page === 'quality'        && path.includes('/quality'));
      if (shouldBeActive) el.classList.add('active');
    });
  }

  /* ----------------------------------------------------------
     CLIENT SELECTOR DROPDOWN
  ---------------------------------------------------------- */
  function initClientSelector() {
    const btn      = document.querySelector('.client-selector-btn');
    const dropdown = document.querySelector('.client-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const opening = !dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (opening) {
        dropdown.classList.add('is-open');
        btn.classList.add('is-open');
      }
    });

    /* Clicking an item updates the button label */
    dropdown.querySelectorAll('.client-dropdown-item').forEach(function (item) {
      item.addEventListener('click', function () {
        dropdown.querySelectorAll('.client-dropdown-item')
          .forEach(function (i) { i.classList.remove('is-active'); });
        this.classList.add('is-active');

        const nameEl = btn.querySelector('.client-name');
        if (nameEl) nameEl.textContent = this.textContent.trim();
        closeAllDropdowns();
      });
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.client-dropdown').forEach(function (d) {
      d.classList.remove('is-open');
    });
    document.querySelectorAll('.client-selector-btn').forEach(function (b) {
      b.classList.remove('is-open');
    });
    document.querySelectorAll('.avatar-dropdown').forEach(function (d) {
      d.classList.remove('is-open');
    });
  }

  /* Close dropdowns on outside click */
  document.addEventListener('click', closeAllDropdowns);

  /* ----------------------------------------------------------
     AVATAR DROPDOWN
  ---------------------------------------------------------- */
  function initAvatarDropdown() {
    var avatar = document.querySelector('.user-avatar');
    if (!avatar) return;

    /* Wrap avatar in position:relative container */
    var wrap = document.createElement('div');
    wrap.className = 'avatar-wrap';
    avatar.parentNode.replaceChild(wrap, avatar);
    wrap.appendChild(avatar);

    /* Build dropdown */
    var dropdown = document.createElement('div');
    dropdown.className = 'avatar-dropdown';
    dropdown.innerHTML =
      '<div class="avatar-dropdown-item">My account</div>' +
      '<div class="avatar-dropdown-item">My projects</div>' +
      '<div class="avatar-dropdown-divider"></div>' +
      '<div class="avatar-dropdown-item avatar-dropdown-item--danger">Sign out</div>';
    wrap.appendChild(dropdown);

    /* Toggle on avatar click */
    avatar.addEventListener('click', function (e) {
      e.stopPropagation();
      var opening = !dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (opening) dropdown.classList.add('is-open');
    });

    /* Prevent click inside dropdown from closing it */
    dropdown.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* ----------------------------------------------------------
     DATE RANGE BUTTON — cosmetic toggle (no real date picker)
  ---------------------------------------------------------- */
  function initDateRange() {
    document.querySelectorAll('.date-range-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        /* In a real app this would open a date picker.
           For this prototype we just show a subtle pressed state. */
        this.style.background = 'var(--hover)';
        setTimeout(function () {
          btn.style.background = '';
        }, 200);
      });
    });
  }

  /* ----------------------------------------------------------
     TABLE ROW HOVER — highlight entire row on View click
  ---------------------------------------------------------- */
  function initTableActions() {
    document.querySelectorAll('.btn-view-row').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const row = this.closest('tr');
        if (!row) return;
        row.style.background = 'var(--hover)';
        /* Flash to indicate interaction */
        setTimeout(function () { row.style.background = ''; }, 400);
      });
    });
  }

  /* ----------------------------------------------------------
     CHANNEL BAR WIDTHS — animate in on load
     Each .channel-bar-fill has data-width="68" etc.
  ---------------------------------------------------------- */
  function initChannelBars() {
    document.querySelectorAll('.channel-bar-fill[data-width]').forEach(function (bar) {
      bar.style.width = '0%';
      setTimeout(function () {
        bar.style.width = bar.dataset.width + '%';
      }, 150);
    });
  }

  /* ----------------------------------------------------------
     FILTER SELECT — keep label in sync (cosmetic)
  ---------------------------------------------------------- */
  function initFilters() {
    document.querySelectorAll('.filter-select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        /* future: could filter the visible table rows */
      });
    });

    /* Live search: hide rows not matching the search input */
    var searchInput = document.querySelector('#table-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      document.querySelectorAll('.data-table tbody tr').forEach(function (row) {
        var text = row.textContent.toLowerCase();
        row.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  /* ----------------------------------------------------------
     COLLAPSE / ACCORDION
     Clicking a .collapse-header toggles .is-open on its parent
     .collapse-item.
  ---------------------------------------------------------- */
  function initCollapse() {
    document.querySelectorAll('.collapse-header').forEach(function (header) {
      header.addEventListener('click', function () {
        var item = this.closest('.collapse-item');
        if (!item) return;
        item.classList.toggle('is-open');
      });
    });
  }

  /* ----------------------------------------------------------
     TOGGLE — native checkbox powers the toggle; this just adds
     an accessible keyboard handler.
  ---------------------------------------------------------- */
  function initToggles() {
    document.querySelectorAll('.toggle-wrap').forEach(function (wrap) {
      var input = wrap.querySelector('input[type="checkbox"]');
      if (!input) return;
      /* Clicking the whole wrap toggles the hidden checkbox */
      wrap.addEventListener('click', function (e) {
        if (e.target !== input && !wrap.classList.contains('is-disabled')) {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change'));
        }
      });
    });
  }

  /* ----------------------------------------------------------
     CHECKBOX — clicking wrap toggles the hidden checkbox
  ---------------------------------------------------------- */
  function initCheckboxes() {
    document.querySelectorAll('.checkbox-wrap').forEach(function (wrap) {
      var input = wrap.querySelector('input[type="checkbox"]');
      if (!input) return;
      wrap.addEventListener('click', function (e) {
        if (e.target !== input && !wrap.classList.contains('is-disabled')) {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change'));
        }
      });
    });
  }

  /* ----------------------------------------------------------
     TABS — clicking a .tab-item activates it within its bar
  ---------------------------------------------------------- */
  function initTabs() {
    document.querySelectorAll('.tabs-bar').forEach(function (bar) {
      bar.querySelectorAll('.tab-item').forEach(function (tab) {
        tab.addEventListener('click', function () {
          if (tab.classList.contains('is-disabled')) return;
          bar.querySelectorAll('.tab-item').forEach(function (t) {
            t.classList.remove('is-active');
          });
          tab.classList.add('is-active');
        });
      });
    });
  }

  /* ----------------------------------------------------------
     BIG OPTION — clicking a .big-option selects it within its group
  ---------------------------------------------------------- */
  function initBigOptions() {
    document.querySelectorAll('.big-option-group').forEach(function (group) {
      group.querySelectorAll('.big-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (opt.classList.contains('is-disabled')) return;
          group.querySelectorAll('.big-option').forEach(function (o) {
            o.classList.remove('is-selected');
          });
          opt.classList.add('is-selected');
        });
      });
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  ready(function () {
    initNavActiveStates();
    initClientSelector();
    initAvatarDropdown();
    initDateRange();
    initTableActions();
    initChannelBars();
    initFilters();
    initCollapse();
    initToggles();
    initCheckboxes();
    initTabs();
    initBigOptions();
  });

})();
