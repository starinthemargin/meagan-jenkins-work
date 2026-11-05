/* Simulated Driftboard app. Content-agnostic: a round supplies menus, tests and
   a check() function that decides whether a pick is accepted. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  var COLUMNS = [
    { name: 'Draft', cards: [
      { t: 'Admin onboarding course: module 3', kind: 'Course', pri: 'High', due: 'Due Nov 12', who: 'AM', c: '#6A4AEA' },
      { t: 'Quick reference: reports glossary', kind: 'Job aid', pri: 'Low', due: 'Due Nov 20', who: 'JT', c: '#C93E1C' }
    ] },
    { name: 'SME review', cards: [
      { t: 'Getting started video script', kind: 'Video', pri: 'High', late: true, who: 'RS', c: '#1B7F58' },
      { t: 'Workflow basics course: assessment', kind: 'Course', pri: 'Medium', due: 'Due Nov 10', who: 'AM', c: '#6A4AEA' }
    ] },
    { name: 'Approved', cards: [
      { t: 'Integrations deep dive course', kind: 'Course', pri: 'High', due: 'Approved Nov 3', who: 'JT', c: '#C93E1C' }
    ] },
    { name: 'Published', cards: [
      { t: 'Navigating your dashboard', kind: 'Video', pri: 'Low', due: 'Live Oct 28', who: 'RS', c: '#1B7F58' }
    ] }
  ];

  var I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    bolt: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    boards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></svg>',
    team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 100-6M21 20c0-2.4-1.5-4.4-3.6-5.4"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function labelOf(list, value) {
    for (var i = 0; i < list.length; i += 1) { if (list[i].value === value) { return list[i].label; } }
    return value;
  }

  function template(opts) {
    var board = COLUMNS.map(function (col) {
      return '<div class="col"><div class="col-head">' + esc(col.name) + ' <span class="count">' + col.cards.length + '</span></div>' +
        col.cards.map(function (c) {
          return '<article class="task"><h3>' + esc(c.t) + '</h3><div class="tags"><span class="tag">' + esc(c.kind) + '</span>' +
            '<span class="tag ' + (c.pri === 'High' ? 'high' : (c.pri === 'Low' ? 'low' : '')) + '">' + esc(c.pri) + '</span>' +
            (c.late ? '<span class="tag late">Overdue</span>' : '') + '</div>' +
            '<div class="meta"><span>' + esc(c.due || '') + '</span><span class="av" style="background:' + c.c + '">' + c.who + '</span></div></article>';
        }).join('') + '</div>';
    }).join('');

    return '' +
      '<div class="sim">' +
        '<aside class="sim-side">' +
          '<div class="sim-brand"><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2B2640"/><path d="M5 19c3-6 6-6 9-2s6 4 9-2" fill="none" stroke="#FBF7F5" stroke-width="2.6" stroke-linecap="round"/><circle cx="25" cy="11" r="3.2" fill="#FF6B4A"/></svg>Driftboard</div>' +
          '<div class="sim-nav active">' + I.boards + 'Boards</div>' +
          '<div class="sim-nav">' + I.clock + 'My work</div>' +
          '<div class="sim-nav">' + I.chart + 'Reports</div>' +
          '<div class="sim-label">Workspace</div>' +
          '<div class="sim-nav">' + I.team + 'Team</div>' +
          '<div class="sim-foot"><span class="av" style="background:#6A4AEA">YO</span>You</div>' +
        '</aside>' +
        '<div class="sim-main">' +
          '<header class="sim-top"><div><div class="crumbs">Education team / Boards</div><h2>Learning content pipeline</h2></div>' +
            '<div class="sim-top-r"><div class="avatars" aria-hidden="true"><span class="av" style="background:#6A4AEA">AM</span><span class="av" style="background:#C93E1C">JT</span><span class="av" style="background:#1B7F58">RS</span></div>' +
            '<span class="sbtn" aria-hidden="true">Share</span><span class="sbtn pri" aria-hidden="true">New task</span></div></header>' +
          '<div class="sim-task"><strong>' + esc(opts.taskLabel || 'Your task') + ':</strong> ' + esc(opts.task) + '</div>' +
          '<div class="sim-tabs" role="tablist">' +
            '<button class="tab active" role="tab" data-key="tab-board" aria-selected="true" type="button">Board</button>' +
            '<button class="tab" role="tab" data-key="tab-rules" aria-selected="false" type="button">Automations</button>' +
          '</div>' +
          '<section class="sim-screen" id="sim-board" aria-label="Board"><div class="board">' + board + '</div></section>' +
          '<section class="sim-screen" id="sim-rules" aria-label="Automations" hidden>' +
            '<div class="builder">' +
              '<div class="panel" id="sim-builder"></div>' +
              '<div><div class="panel" id="sim-tests"></div><div class="panel log" id="sim-log"></div></div>' +
            '</div>' +
          '</section>' +
        '</div>' +
        '<div class="sim-menu" id="sim-menu" role="menu" hidden></div>' +
      '</div>';
  }


  DB.simShared = { I: I, esc: esc, template: template };

  DB.createSim = function (root, opts) {
    var allowed = {};
    var rule = { trigger: null, column: null, actions: [], saved: false };
    var tested = false;
    var whyDone = false;
    var menuAnchor = null;
    var silent = false;

    root.innerHTML = template(opts);
    var menu = root.querySelector('#sim-menu');


    /* rendering -------------------------------------------------------- */

    function renderBuilder() {
      var h = '<h2>New rule</h2><p class="sub">Tell Driftboard what to watch for, and what to do about it.</p>' +
        '<div class="rule-name">' + esc(opts.ruleName) + '</div>';

      // When
      h += '<div class="step"><span class="badge when" aria-hidden="true">1</span><div class="step-title">When</div>';
      if (!rule.trigger) {
        h += '<button class="block add" data-key="trigger-btn" type="button"><span class="ico when">' + I.arrow + '</span>Choose a trigger<span class="caret">' + I.chev + '</span></button>';
      } else {
        h += '<div class="block"><span class="ico when">' + I.arrow + '</span><span><strong>A task</strong> moves to ' +
          (rule.column ? '<strong>' + esc(rule.column) + '</strong>' : '<button class="inline-pick" data-key="col-btn" type="button">Choose a column' + I.chev + '</button>') +
          '</span><span class="chip">Trigger</span></div>';
      }
      h += '</div>';

      // Only if
      h += '<div class="step"><span class="badge if" aria-hidden="true">2</span><div class="step-title">Only if</div>' +
        '<div class="block add idle"><span class="ico if">' + I.plus + '</span>Add a condition (optional)</div></div>';

      // Then
      h += '<div class="step"><span class="badge then" aria-hidden="true">3</span><div class="step-title">Then</div>';
      rule.actions.forEach(function (a, i) {
        var ico = a.type === 'assign' ? I.person : I.cal;
        var body;
        if (a.type === 'assign') {
          body = 'Assign to ' + (a.value ? '<strong>' + esc(labelOf(opts.menus['person-opt'], a.value)) + '</strong>'
            : '<button class="inline-pick" data-key="person-btn" data-i="' + i + '" type="button">Choose who' + I.chev + '</button>');
        } else {
          body = 'Set due date to ' + (a.value ? '<strong>' + esc(labelOf(opts.menus['due-opt'], a.value)) + '</strong>'
            : '<button class="inline-pick" data-key="due-btn" data-i="' + i + '" type="button">Choose when' + I.chev + '</button>');
        }
        h += '<div class="block"><span class="ico then">' + ico + '</span><span>' + body + '</span><span class="chip">Action</span></div>';
      });
      h += '<button class="block add" data-key="add-action" type="button"><span class="ico then">' + I.plus + '</span>Add an action</button></div>';

      if (rule.saved) {
        h += '<div class="saved">' + I.check + '<span>Rule saved. It’s on.</span></div>';
      }

      h += '<div class="builder-actions">' +
        '<button class="sbtn pri" data-key="run-test" type="button">Run test</button>' +
        '<button class="sbtn" data-key="save" type="button">Save rule</button>' +
        '<span class="sbtn ghost" aria-hidden="true">Cancel</span></div>';
      root.querySelector('#sim-builder').innerHTML = h;
    }

    function fires(test) {
      return rule.trigger === 'moves' && rule.column && rule.column === test.moves;
    }

    function detailHtml(t) {
      var d = t.detail;
      return '<div class="detail">' +
        '<p class="detail-name">' + esc(t.name) + '</p>' +
        '<dl class="detail-fields">' + d.fields.map(function (f) {
          return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
        }).join('') + '</dl>' +
        '<p class="detail-head">What the rule checked</p>' +
        '<ul class="detail-checks">' + d.checks.map(function (c) {
          return '<li><span class="dcheck-label">' + esc(c.label) + '</span><span class="dcheck-note">' + esc(c.note) + '</span></li>';
        }).join('') + '</ul></div>';
    }

    function renderTests() {
      var h = '<h2>Test this rule</h2><p class="sub">See what would happen to four sample tasks before you turn the rule on.</p>';
      opts.tests.forEach(function (t, i) {
        var res = '<span class="result">Not run</span>';
        if (tested) {
          res = fires(t) ? '<span class="result fired">Would fire</span>' : '<span class="result skipped">Would not fire</span>';
        }
        var inner = '<div><div class="name">' + esc(t.name) + '</div><div class="why">' + esc(t.note) + '</div></div>' + res;
        if (t.clickKey && tested) {
          h += '<button class="test-card pickable" data-key="' + t.clickKey + '" aria-expanded="false" type="button">' + inner + '<span class="open-hint">' + I.chev + '</span></button>';
        } else {
          h += '<div class="test-card">' + inner + '</div>';
        }
      });
      if (tested && opts.why) {
        var picked = opts.tests.filter(function (t) { return t.clickKey; })[0];
        h += '<div class="why-panel" id="sim-why" role="group" aria-labelledby="why-q" hidden>' +
          (picked && picked.detail ? detailHtml(picked) : '') +
          '<p id="why-q" class="why-q">' + esc(opts.why.question) + '</p>' +
          opts.why.options.map(function (o) {
            return '<button class="why-opt" data-key="why-opt" data-value="' + esc(o.value) + '" type="button">' + esc(o.label) + '</button>';
          }).join('') +
          '<div class="why-fb" id="why-fb" role="status"></div></div>';
      }
      root.querySelector('#sim-tests').innerHTML = h;
    }

    function renderLog() {
      var h = '<h3>Activity log</h3>';
      if (!tested) {
        h += '<div class="empty">Run a test to see what the rule would do.</div>';
      } else {
        var n = 0;
        opts.tests.forEach(function (t) {
          if (!fires(t)) { return; }
          n += 1;
          var did = rule.actions.map(function (a) {
            return a.type === 'assign' ? 'assigned it to ' + labelOf(opts.menus['person-opt'], a.value).toLowerCase().replace('subject matter expert', 'a SME')
              : 'set the due date to ' + labelOf(opts.menus['due-opt'], a.value).toLowerCase();
          }).join(' and ');
          h += '<div class="log-row"><time>9:0' + n + ' AM</time><span>“' + esc(t.name) + '”: ' + esc(did) + '.</span></div>';
        });
        if (!n) { h += '<div class="empty">Nothing fired for these sample tasks.</div>'; }
      }
      root.querySelector('#sim-log').innerHTML = h;
    }

    function renderAll() { renderBuilder(); renderTests(); renderLog(); }

    /* menus ------------------------------------------------------------ */

    function openMenu(anchor, key) {
      var items = opts.menus[key];
      menuAnchor = anchor;
      menu.innerHTML = items.map(function (it) {
        return '<button role="menuitem" data-key="' + key + '" data-value="' + esc(it.value) + '" type="button">' + esc(it.label) + '</button>';
      }).join('');
      menu.setAttribute('aria-label', (anchor.textContent || '').trim().slice(0, 40) || 'Options');
      menu.hidden = false;
      var simRect = root.querySelector('.sim').getBoundingClientRect();
      var r = anchor.getBoundingClientRect();
      menu.style.left = Math.round(r.left - simRect.left) + 'px';
      menu.style.top = Math.round(r.bottom - simRect.top + 6) + 'px';
      menu.style.minWidth = Math.max(240, Math.round(r.width)) + 'px';
    }

    function closeMenu() { menu.hidden = true; menu.innerHTML = ''; menuAnchor = null; }

    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') { return; }
      var items = Array.prototype.slice.call(menu.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
      e.preventDefault();
    });

    /* behavior --------------------------------------------------------- */

    function showTab(name) {
      root.querySelector('#sim-board').hidden = name !== 'board';
      root.querySelector('#sim-rules').hidden = name !== 'rules';
      root.querySelectorAll('.sim-tabs .tab').forEach(function (t) {
        var on = t.dataset.key === 'tab-' + name;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (name === 'rules' && !root.querySelector('#sim-builder').innerHTML) { renderAll(); }
    }

    function afterPick(key, value) {
      if (key === 'trigger-opt') {
        rule.trigger = value;
        closeMenu();
        renderBuilder();
        openMenu(root.querySelector('[data-key="col-btn"]'), 'col-opt');
      } else if (key === 'col-opt') {
        rule.column = value;
        closeMenu();
        renderAll();
      } else if (key === 'action-opt') {
        rule.actions.push({ type: value, value: null });
        closeMenu();
        renderBuilder();
        var btn = root.querySelector('[data-key="' + (value === 'assign' ? 'person-btn' : 'due-btn') + '"][data-i="' + (rule.actions.length - 1) + '"]');
        openMenu(btn, value === 'assign' ? 'person-opt' : 'due-opt');
      } else if (key === 'person-opt' || key === 'due-opt') {
        rule.actions[rule.actions.length - 1].value = value;
        closeMenu();
        renderAll();
      }
    }

    function handle(key, el) {
      if (!silent && !allowed[key]) {
        if (opts.onBlocked) { opts.onBlocked(key); }
        return;
      }
      var value = el.dataset.value;

      if (key === 'tab-board' || key === 'tab-rules') {
        showTab(key === 'tab-rules' ? 'rules' : 'board');
      } else if (key === 'trigger-btn') {
        openMenu(el, 'trigger-opt');
      } else if (key === 'col-btn') {
        openMenu(el, 'col-opt');
      } else if (key === 'add-action') {
        openMenu(el, 'action-opt');
      } else if (key === 'person-btn') {
        openMenu(el, 'person-opt');
      } else if (key === 'due-btn') {
        openMenu(el, 'due-opt');
      } else if (key === 'trigger-opt' || key === 'col-opt' || key === 'action-opt' || key === 'person-opt' || key === 'due-opt') {
        var res = silent ? true : opts.check(key, value);
        if (res !== true) { opts.onReject(key, res); return; }
        afterPick(key, value);
      } else if (key === 'run-test') {
        tested = true;
        renderTests();
        renderLog();
      } else if (key === 'result-glossary') {
        var panel = root.querySelector('#sim-why');
        if (panel) { panel.hidden = false; }
        el.setAttribute('aria-expanded', 'true');
      } else if (key === 'why-opt') {
        var r2 = silent ? true : opts.check(key, value);
        var fb = root.querySelector('#why-fb');
        if (r2 !== true) { opts.onReject(key, r2); return; }
        whyDone = true;
        root.querySelectorAll('.why-opt').forEach(function (b) {
          b.disabled = true;
          if (b.dataset.value === value) { b.classList.add('right'); }
        });
        fb.textContent = opts.why.correct;
        fb.className = 'why-fb ok';
      } else if (key === 'save') {
        rule.saved = true;
        renderBuilder();
      }
      if (!silent && opts.onEvent) { opts.onEvent(key, value); }
    }

    function onClick(e) {
      var t = e.target.closest('[data-key]');
      if (!t || t.disabled) { return; }
      handle(t.dataset.key, t);
    }
    root.addEventListener('click', onClick);

    return {
      el: root.querySelector('.sim'),
      allow: function (keys) { allowed = {}; keys.forEach(function (k) { allowed[k] = true; }); },
      rule: rule,
      isWhyDone: function () { return whyDone; },
      /* Re-apply recorded actions without firing events, to restore an earlier point. */
      replay: function (actions) {
        silent = true;
        actions.forEach(function (a) {
          var sel = '[data-key="' + a.key + '"]' + (a.value ? '[data-value="' + a.value + '"]' : '');
          var el = root.querySelector(sel);
          if (el) { handle(a.key, el); }
        });
        silent = false;
      },
      destroy: function () {
        root.removeEventListener('click', onClick);
        root.innerHTML = '';
      }
    };
  };
})();
