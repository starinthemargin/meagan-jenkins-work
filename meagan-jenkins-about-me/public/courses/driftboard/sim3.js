/* Simulated Driftboard, "solo" variant: a free rule builder with no coaching and
   no right/wrong feedback. After the rule is saved, an admin follow-up opens an
   investigation panel (card details, what the rule checked) and two questions. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};
  var K = DB.simShared;
  var I = K.I;
  var esc = K.esc;

  function labelIn(list, value) {
    for (var i = 0; i < list.length; i += 1) { if (list[i].value === value) { return list[i].label; } }
    return value;
  }

  DB.createSoloSim = function (root, opts) {
    var init = opts.initial || {};
    var rule = init.rule ? JSON.parse(JSON.stringify(init.rule)) : { trigger: null, column: null, conds: [], actions: [] };
    var ranTest = !!init.ranTest;
    var saved = !!init.saved;
    var tested = false;
    var diag = init.diag || null;
    var fix = init.fix || null;
    var openCard = null;
    var error = '';
    var menuCtx = null;

    root.innerHTML = K.template(opts);
    root.querySelector('.sim-tabs').hidden = true;
    root.querySelector('#sim-board').hidden = true;
    root.querySelector('#sim-rules').hidden = false;
    var menu = root.querySelector('#sim-menu');

    function data() {
      return { rule: JSON.parse(JSON.stringify(rule)), ranTest: ranTest, saved: saved, diag: diag, fix: fix };
    }
    function changed() { if (opts.onChange) { opts.onChange(data()); } }
    function touchRule() { tested = false; changed(); }

    /* evaluation ------------------------------------------------------- */

    function triggerMatches(card) {
      return rule.trigger === 'moves' && rule.column && rule.column === card.moves;
    }
    function condPasses(c, card) { return opts.testers[c](card); }
    function fires(card) {
      return triggerMatches(card) && rule.conds.every(function (c) { return condPasses(c, card); });
    }

    function why(c, card) {
      var t = card.type || '';
      if (c.indexOf('type-') === 0) { return t ? 'Not met. The Type is ' + t + '.' : 'Not met. The Type is not set on this card.'; }
      if (c.indexOf('pri-') === 0) { return 'Not met. The priority is ' + card.pri + '.'; }
      return 'Not met. The status is ' + card.status + '.';
    }

    function checksFor(card) {
      var out = [];
      var trig = 'When: ' + (rule.trigger ? triggerText() : 'no trigger set');
      if (!rule.trigger) { out.push([trig, 'Nothing starts this rule.']); }
      else if (triggerMatches(card)) { out.push([trig, 'Happened. This task moved to ' + card.moves + '.']); }
      else if (rule.trigger === 'moves') { out.push([trig, 'Didn’t happen. This task moved to ' + card.moves + '.']); }
      else { out.push([trig, 'Didn’t happen for this task.']); }

      if (!rule.conds.length) { out.push(['Only if: no conditions set', 'Nothing else to check.']); }
      rule.conds.forEach(function (c) {
        out.push(['Only if: ' + labelIn(opts.menus['cond-opt'], c), condPasses(c, card) ? 'Met.' : why(c, card)]);
      });

      var ran = fires(card);
      if (!rule.actions.length) { out.push(['Then: no actions set', 'Nothing to run.']); }
      else {
        out.push(['Then: ' + rule.actions.map(actionText).join('; '), ran ? 'Ran.' : 'Didn’t run, because an earlier check wasn’t met.']);
      }
      return out;
    }

    function triggerText() {
      if (rule.trigger === 'moves') { return 'a task moves to ' + (rule.column || '(column not chosen)'); }
      return labelIn(opts.menus['trigger-opt'], rule.trigger).toLowerCase();
    }

    function actionText(a) {
      var base = labelIn(opts.menus['action-opt'], a.type);
      return a.value ? base + ' ' + labelIn(opts.valueMenus[a.type], a.value) : base;
    }

    /* rendering -------------------------------------------------------- */

    function pickBtn(key, label, attrs) {
      return '<button class="inline-pick" data-key="' + key + '"' + (attrs || '') + ' type="button">' + esc(label) + I.chev + '</button>';
    }

    function renderBuilder() {
      var h = '<h2>New rule</h2><p class="sub">Build the rule the admin asked for. Nothing is scored until you submit.</p>';

      h += '<div class="step"><span class="badge when" aria-hidden="true">1</span><div class="step-title">When</div>';
      if (!rule.trigger) {
        h += '<button class="block add" data-key="trigger-btn" type="button"><span class="ico when">' + I.arrow + '</span>Choose a trigger<span class="caret">' + I.chev + '</span></button>';
      } else {
        var body;
        if (rule.trigger === 'moves') {
          body = 'A task moves to ' + pickBtn('col-btn', rule.column || 'Choose a column');
        } else {
          body = '<strong>' + esc(labelIn(opts.menus['trigger-opt'], rule.trigger)) + '</strong>';
        }
        h += '<div class="block"><span class="ico when">' + I.arrow + '</span><span>' + body + '</span>' +
          '<button class="x-btn" data-key="remove-trigger" type="button" aria-label="Remove the trigger">Remove</button></div>';
      }
      h += '</div>';

      h += '<div class="step"><span class="badge if" aria-hidden="true">2</span><div class="step-title">Only if</div>';
      rule.conds.forEach(function (c, i) {
        h += '<div class="block cond"><span class="ico if">' + I.check + '</span><span><strong>' + esc(labelIn(opts.menus['cond-opt'], c)) + '</strong></span>' +
          '<button class="x-btn" data-key="remove-cond" data-value="' + i + '" type="button" aria-label="Remove condition: ' + esc(labelIn(opts.menus['cond-opt'], c)) + '">Remove</button></div>';
      });
      h += '<button class="block add" data-key="add-cond" type="button"><span class="ico if">' + I.plus + '</span>Add a condition (optional)</button></div>';

      h += '<div class="step"><span class="badge then" aria-hidden="true">3</span><div class="step-title">Then</div>';
      rule.actions.forEach(function (a, i) {
        var base = labelIn(opts.menus['action-opt'], a.type);
        var val = pickBtn('aval-btn', a.value ? labelIn(opts.valueMenus[a.type], a.value) : 'Choose', ' data-i="' + i + '"');
        h += '<div class="block"><span class="ico then">' + I.person + '</span><span>' + esc(base) + ' ' + val + '</span>' +
          '<button class="x-btn" data-key="remove-action" data-value="' + i + '" type="button" aria-label="Remove action: ' + esc(actionText(a)) + '">Remove</button></div>';
      });
      h += '<button class="block add" data-key="add-action" type="button"><span class="ico then">' + I.plus + '</span>Add an action</button></div>';

      if (saved) { h += '<div class="saved">' + I.check + '<span>Rule saved. It’s on.</span></div>'; }

      h += '<div class="builder-actions"><button class="sbtn pri" data-key="run-test" type="button">Run test</button>' +
        '<button class="sbtn" data-key="save" type="button">Save rule</button></div>';
      root.querySelector('#sim-builder').innerHTML = h;
    }

    function chip(card) {
      return fires(card) ? '<span class="result fired">Would fire</span>' : '<span class="result skipped">Would not fire</span>';
    }

    function renderTests() {
      var h = '<h2>Test this rule</h2><p class="sub">' + (saved ? 'Select a card to see what the rule checked.' : 'See what the rule would do with four sample tasks.') + '</p>';
      opts.tests.forEach(function (t, i) {
        var show = tested || saved;
        var inner = '<div><div class="name">' + esc(t.name) + '</div><div class="why">Moving to ' + esc(t.moves) + '</div></div>' +
          (show ? chip(t) : '<span class="result">Not run</span>');
        if (saved) {
          h += '<button class="test-card pickable' + (openCard === i ? ' open' : '') + '" data-key="card-open" data-value="' + i + '" aria-expanded="' + (openCard === i ? 'true' : 'false') + '" type="button">' + inner + '<span class="open-hint">' + I.chev + '</span></button>';
        } else {
          h += '<div class="test-card">' + inner + '</div>';
        }
      });

      if (saved) {
        h += '<div class="admin-msg"><p class="admin-from">From the LMS admin</p><p>' + esc(opts.followup) + '</p></div>';
        if (openCard !== null) { h += detailHtml(opts.tests[openCard]); }
        h += questionsHtml();
      }
      root.querySelector('#sim-tests').innerHTML = h;
    }

    function detailHtml(card) {
      return '<div class="why-panel"><div class="detail" id="sim-detail">' +
        '<p class="detail-name">' + esc(card.name) + '</p>' +
        '<dl class="detail-fields"><div><dt>Status</dt><dd>' + esc(card.status) + '</dd></div>' +
        '<div><dt>Type</dt><dd>' + esc(card.type || 'Not set') + '</dd></div>' +
        '<div><dt>Priority</dt><dd>' + esc(card.pri) + '</dd></div></dl>' +
        '<p class="detail-head">What the rule checked</p><ul class="detail-checks">' +
        checksFor(card).map(function (c) {
          return '<li><span class="dcheck-label">' + esc(c[0]) + '</span><span class="dcheck-note">' + esc(c[1]) + '</span></li>';
        }).join('') + '</ul></div></div>';
    }

    function qHtml(qid, q, current) {
      return '<div class="q-block" role="group" aria-labelledby="' + qid + '"><p class="why-q" id="' + qid + '">' + esc(q.question) + '</p>' +
        q.options.map(function (o) {
          var on = current === o.value;
          return '<button class="why-opt' + (on ? ' on' : '') + '" data-key="' + q.key + '" data-value="' + esc(o.value) + '" aria-pressed="' + (on ? 'true' : 'false') + '" type="button">' + esc(o.label) + '</button>';
        }).join('') + '</div>';
    }

    function questionsHtml() {
      return '<div class="questions">' + qHtml('q-diag', opts.diagnosis, diag) + qHtml('q-fix', opts.fixQ, fix) +
        '<div class="submit-row"><button class="sbtn pri" data-key="submit" type="button">Submit for results</button>' +
        '<span class="form-error" id="form-error" role="alert">' + esc(error) + '</span></div></div>';
    }

    function renderLog() {
      var h = '<h3>Activity log</h3>';
      if (!(tested || saved)) { h += '<div class="empty">Run a test to see what the rule would do.</div>'; }
      else {
        var n = 0;
        opts.tests.forEach(function (t) {
          if (!fires(t)) { return; }
          n += 1;
          h += '<div class="log-row"><time>9:0' + n + ' AM</time><span>“' + esc(t.name) + '”: ' + esc(rule.actions.map(actionText).join(', ') || 'no actions') + '.</span></div>';
        });
        if (!n) { h += '<div class="empty">Nothing fired for these sample tasks.</div>'; }
      }
      root.querySelector('#sim-log').innerHTML = h;
    }

    function renderAll() { renderBuilder(); renderTests(); renderLog(); }
    renderAll();

    /* menus ------------------------------------------------------------ */

    function openMenu(anchor, key, items, ctx) {
      menuCtx = ctx || null;
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
      window.setTimeout(function () { var f = menu.querySelector('button'); if (f) { f.focus({ preventScroll: true }); } }, 30);
    }
    function closeMenu() { menu.hidden = true; menu.innerHTML = ''; menuCtx = null; }

    document.addEventListener('keydown', escClose);
    function escClose(e) { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); } }

    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') { return; }
      var items = Array.prototype.slice.call(menu.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
      e.preventDefault();
    });

    /* behavior --------------------------------------------------------- */

    function refocus(sel) {
      var el = root.querySelector(sel);
      if (el) { el.focus({ preventScroll: true }); }
    }

    function lastActionBtn(i) { return root.querySelector('[data-key="aval-btn"][data-i="' + i + '"]'); }

    function handle(key, el) {
      var v = el.dataset.value;
      error = '';

      if (key === 'trigger-btn') { openMenu(el, 'trigger-opt', opts.menus['trigger-opt']); return; }
      if (key === 'trigger-opt') {
        rule.trigger = v; rule.column = v === 'moves' ? rule.column : null;
        closeMenu(); touchRule(); renderAll();
        if (v === 'moves') { openMenu(root.querySelector('[data-key="col-btn"]'), 'col-opt', opts.menus['col-opt']); }
        else { refocus('[data-key="remove-trigger"]'); }
        return;
      }
      if (key === 'col-btn') { openMenu(el, 'col-opt', opts.menus['col-opt']); return; }
      if (key === 'col-opt') { rule.column = v; closeMenu(); touchRule(); renderAll(); refocus('[data-key="col-btn"]'); return; }
      if (key === 'remove-trigger') { rule.trigger = null; rule.column = null; touchRule(); renderAll(); refocus('[data-key="trigger-btn"]'); return; }

      if (key === 'add-cond') { openMenu(el, 'cond-opt', opts.menus['cond-opt']); return; }
      if (key === 'cond-opt') { if (rule.conds.indexOf(v) === -1) { rule.conds.push(v); } closeMenu(); touchRule(); renderAll(); refocus('[data-key="add-cond"]'); return; }
      if (key === 'remove-cond') { rule.conds.splice(Number(v), 1); touchRule(); renderAll(); refocus('[data-key="add-cond"]'); return; }

      if (key === 'add-action') { openMenu(el, 'action-opt', opts.menus['action-opt']); return; }
      if (key === 'action-opt') {
        rule.actions.push({ type: v, value: null });
        closeMenu(); touchRule(); renderAll();
        var i = rule.actions.length - 1;
        openMenu(lastActionBtn(i), 'aval-opt', opts.valueMenus[v], { i: i });
        return;
      }
      if (key === 'aval-btn') { var ai = Number(el.dataset.i); openMenu(el, 'aval-opt', opts.valueMenus[rule.actions[ai].type], { i: ai }); return; }
      if (key === 'aval-opt') { rule.actions[menuCtx.i].value = v; closeMenu(); touchRule(); renderAll(); refocus('[data-key="add-action"]'); return; }
      if (key === 'remove-action') { rule.actions.splice(Number(v), 1); touchRule(); renderAll(); refocus('[data-key="add-action"]'); return; }

      if (key === 'run-test') { tested = true; ranTest = true; changed(); renderTests(); renderLog(); return; }
      if (key === 'save') { saved = true; changed(); renderAll(); refocus('[data-key="save"]'); return; }
      if (key === 'card-open') { openCard = openCard === Number(v) ? null : Number(v); renderTests(); refocus('[data-key="card-open"][data-value="' + v + '"]'); return; }
      if (key === 'diag-opt') { diag = v; changed(); renderTests(); focusKey('diag-opt', v); return; }
      if (key === 'fix-opt') { fix = v; changed(); renderTests(); focusKey('fix-opt', v); return; }
      if (key === 'submit') {
        if (!diag || !fix) {
          error = 'Choose an answer for both questions first.';
          renderTests();
          refocus('[data-key="submit"]');
          return;
        }
        if (opts.onSubmit) { opts.onSubmit(data()); }
      }
    }

    function focusKey(key, v) {
      var el = root.querySelector('[data-key="' + key + '"][data-value="' + v + '"]');
      if (el) { el.focus({ preventScroll: true }); }
    }

    function onClick(e) {
      var t = e.target.closest('[data-key]');
      if (!t || t.disabled) { return; }
      handle(t.dataset.key, t);
    }
    root.addEventListener('click', onClick);

    return {
      data: data,
      destroy: function () {
        root.removeEventListener('click', onClick);
        document.removeEventListener('keydown', escClose);
        root.innerHTML = '';
      }
    };
  };
})();
