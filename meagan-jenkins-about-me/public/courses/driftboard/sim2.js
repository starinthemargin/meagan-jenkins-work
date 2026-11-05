/* Simulated Driftboard, "refine" variant: an existing rule whose conditions the
   learner edits, with card selection and prediction markers. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};
  var K = DB.simShared;
  var I = K.I;
  var esc = K.esc;

  var CHECKBOX = '<span class="cbox" aria-hidden="true"></span>';

  DB.createRefineSim = function (root, opts) {
    var allowed = {};
    var conds = [];            // condition values, in the order added
    var tested = false;
    var saved = false;
    var selectMode = null;     // null | { label }
    var selected = {};         // index -> true
    var prediction = null;     // array of indexes the learner predicted would fire
    var silent = false;

    root.innerHTML = K.template(opts);
    root.querySelector('.sim').classList.add('docked');
    root.querySelector('.sim-tabs').hidden = true;
    root.querySelector('#sim-board').hidden = true;
    root.querySelector('#sim-rules').hidden = false;
    var menu = root.querySelector('#sim-menu');

    function condLabel(v) {
      for (var i = 0; i < opts.conditionMenu.length; i += 1) { if (opts.conditionMenu[i].value === v) { return opts.conditionMenu[i].label; } }
      return v;
    }

    function fires(t) { return opts.evaluate(conds, t); }

    /* rendering ------------------------------------------------------ */

    function renderBuilder() {
      var h = '<h2>Overdue nudge</h2><p class="sub">An existing rule. It’s on, and it’s sending more nudges than your team wants.</p>' +
        '<div class="rule-name">' + esc(opts.ruleName) + '</div>';

      h += '<div class="step"><span class="badge when" aria-hidden="true">1</span><div class="step-title">When</div>' +
        '<div class="block"><span class="ico when">' + I.arrow + '</span><span><strong>' + esc(opts.when) + '</strong></span><span class="chip">Trigger</span></div></div>';

      h += '<div class="step"><span class="badge if" aria-hidden="true">2</span><div class="step-title">Only if</div>';
      conds.forEach(function (c, i) {
        h += '<div class="block cond"><span class="ico if">' + I.plus.replace('M12 5v14M5 12h14', 'M5 12l5 5L19 8') + '</span><span><strong>' + esc(condLabel(c)) + '</strong></span>' +
          '<button class="x-btn" data-key="remove-cond" data-value="' + i + '" type="button" aria-label="Remove condition: ' + esc(condLabel(c)) + '">Remove</button></div>';
      });
      if (conds.length > 1) { h += '<p class="and-note">Every condition has to be true for the rule to run.</p>'; }
      h += '<button class="block add" data-key="add-cond" type="button"><span class="ico if">' + I.plus + '</span>Add a condition</button></div>';

      h += '<div class="step"><span class="badge then" aria-hidden="true">3</span><div class="step-title">Then</div>';
      opts.actions.forEach(function (a) {
        h += '<div class="block"><span class="ico then">' + I.person + '</span><span>' + esc(a) + '</span><span class="chip">Action</span></div>';
      });
      h += '</div>';

      if (saved) { h += '<div class="saved">' + I.check + '<span>Rule saved. It’s on.</span></div>'; }

      h += '<div class="builder-actions"><button class="sbtn pri" data-key="run-test" type="button">Run test</button>' +
        '<button class="sbtn" data-key="save" type="button">Save rule</button><span class="sbtn ghost" aria-hidden="true">Cancel</span></div>';
      root.querySelector('#sim-builder').innerHTML = h;
    }

    function renderTests() {
      var h = '<h2>Test this rule</h2><p class="sub">' + (selectMode ? esc(selectMode.label) : 'See what the rule would do with four sample tasks.') + '</p>';
      opts.tests.forEach(function (t, i) {
        var attrs = '<div class="attrs"><span class="attr">' + esc(t.status) + '</span><span class="attr">' + esc(t.pri) + ' priority</span>' +
          '<span class="attr' + (t.overdue ? ' late' : '') + '">' + (t.overdue ? 'Overdue' : 'Not overdue') + '</span></div>';
        var res = '';
        if (tested) {
          res = fires(t) ? '<span class="result fired">Would nudge</span>' : '<span class="result skipped">Would stay quiet</span>';
        }
        var pred = '';
        if (prediction) {
          var p = prediction.indexOf(i) !== -1;
          pred = '<span class="pred">You predicted: ' + (p ? 'nudge' : 'quiet') + '</span>';
        }
        var body = '<div class="tc-main"><div class="name">' + esc(t.name) + '</div>' + attrs + '</div><div class="tc-side">' + res + pred + '</div>';
        if (selectMode) {
          var on = !!selected[i];
          h += '<button class="test-card selectable' + (on ? ' on' : '') + '" data-key="sel-card" data-value="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '" type="button">' + CHECKBOX + body + '</button>';
        } else {
          h += '<div class="test-card">' + body + '</div>';
        }
      });
      if (selectMode) {
        h += '<div class="sel-foot"><button class="sbtn pri" data-key="sel-submit" type="button">' + esc(selectMode.submit) + '</button>' +
          '<span class="sel-count" id="sel-count" role="status"></span></div>';
      }
      root.querySelector('#sim-tests').innerHTML = h;
      updateCount();
    }

    function refocus(sel) {
      if (silent) { return; }
      var el = root.querySelector(sel);
      if (el) { el.focus({ preventScroll: true }); }
    }

    function updateCount() {
      var el = root.querySelector('#sel-count');
      if (!el) { return; }
      var n = Object.keys(selected).length;
      el.textContent = n + ' selected';
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
          h += '<div class="log-row"><time>9:0' + n + ' AM</time><span>Nudged the owner of “' + esc(t.name) + '”.</span></div>';
        });
        if (!n) { h += '<div class="empty">Nothing fired for these sample tasks.</div>'; }
      }
      root.querySelector('#sim-log').innerHTML = h;
    }

    function renderAll() { renderBuilder(); renderTests(); renderLog(); }
    renderAll();

    /* menu ----------------------------------------------------------- */

    function openMenu(anchor) {
      menu.innerHTML = opts.conditionMenu.map(function (it) {
        return '<button role="menuitem" data-key="cond-opt" data-value="' + esc(it.value) + '" type="button">' + esc(it.label) + '</button>';
      }).join('');
      menu.setAttribute('aria-label', (anchor.textContent || '').trim().slice(0, 40) || 'Options');
      menu.hidden = false;
      var simRect = root.querySelector('.sim').getBoundingClientRect();
      var r = anchor.getBoundingClientRect();
      menu.style.left = Math.round(r.left - simRect.left) + 'px';
      menu.style.top = Math.round(r.bottom - simRect.top + 6) + 'px';
      menu.style.minWidth = Math.max(260, Math.round(r.width)) + 'px';
      if (!silent) { window.setTimeout(function () { var f = menu.querySelector('button'); if (f) { f.focus({ preventScroll: true }); } }, 30); }
    }
    function closeMenu() { menu.hidden = true; menu.innerHTML = ''; }

    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') { return; }
      var items = Array.prototype.slice.call(menu.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
      e.preventDefault();
    });

    /* behavior ------------------------------------------------------- */

    function handle(key, el, rawValue) {
      if (!silent && !allowed[key]) {
        if (opts.onBlocked) { opts.onBlocked(key); }
        return;
      }
      var value = rawValue !== undefined ? rawValue : (el && el.dataset ? el.dataset.value : undefined);

      if (key === 'add-cond') {
        openMenu(el);
      } else if (key === 'cond-opt') {
        var res = silent ? true : opts.check(key, value);
        if (res !== true) { opts.onReject(key, res); return; }
        conds.push(value);
        tested = false; saved = false;
        closeMenu();
        renderAll();
        refocus('[data-key="add-cond"]');
      } else if (key === 'remove-cond') {
        conds.splice(Number(value), 1);
        tested = false; saved = false;
        renderAll();
        refocus('[data-key="add-cond"]');
      } else if (key === 'run-test') {
        tested = true;
        renderTests(); renderLog();
      } else if (key === 'sel-card') {
        if (selected[value]) { delete selected[value]; } else { selected[value] = true; }
        renderTests();
        var again = root.querySelector('[data-key="sel-card"][data-value="' + value + '"]');
        if (again && !silent) { again.focus({ preventScroll: true }); }
        return;
      } else if (key === 'sel-submit') {
        var picks = Object.keys(selected).map(Number).sort();
        var v = picks.join(',');
        var r2 = silent ? true : opts.check(key, v);
        if (r2 !== true) { opts.onReject(key, r2); return; }
        value = v;
      } else if (key === 'save') {
        saved = true;
        renderBuilder();
        refocus('[data-key="save"]');
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
      conditions: function () { return conds.slice(); },
      hasTested: function () { return tested; },
      firedIndexes: function () { var o = []; opts.tests.forEach(function (t, i) { if (fires(t)) { o.push(i); } }); return o; },
      setSelect: function (cfg) {
        selectMode = cfg || null;
        selected = {};
        renderTests();
      },
      setPrediction: function (arr) { prediction = arr; renderTests(); },
      replay: function (actions) {
        silent = true;
        actions.forEach(function (a) {
          if (a.key === 'sel-submit') {
            selected = {};
            String(a.value || '').split(',').forEach(function (n) { if (n !== '') { selected[n] = true; } });
            return;
          }
          var sel = '[data-key="' + a.key + '"]' + (a.value !== undefined && a.key !== 'run-test' && a.key !== 'save' && a.key !== 'add-cond' ? '[data-value="' + a.value + '"]' : '');
          var el = root.querySelector(sel);
          if (el) { handle(a.key, el); }
        });
        selected = {};
        silent = false;
      },
      destroy: function () {
        root.removeEventListener('click', onClick);
        root.innerHTML = '';
      }
    };
  };
})();
