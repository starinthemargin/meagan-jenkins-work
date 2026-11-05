/* Spotlight and coach card for guided practice. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  var BULB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/></svg>';
  var CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var PAD = 8;
  var CARD_W = 340;
  var EDGE = 20;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function rich(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  DB.createCoach = function (opts) {
    opts = opts || {};
    var target = null;
    var layer = document.createElement('div');
    layer.className = 'coach-layer';
    layer.innerHTML =
      '<div class="coach-block" data-side="top"></div><div class="coach-block" data-side="bottom"></div>' +
      '<div class="coach-block" data-side="left"></div><div class="coach-block" data-side="right"></div>' +
      '<div class="coach-spot" aria-hidden="true"></div>' +
      '<section class="coach-card" aria-label="Coach">' +
        '<div class="coach-head"><span class="coach-badge">Coach</span><span class="coach-step"></span></div>' +
        '<div class="coach-bar" aria-hidden="true"><span></span></div>' +
        '<div class="coach-praise" role="status" aria-live="polite"></div>' +
        '<p class="coach-text" id="coach-text"></p>' +
        '<div class="coach-fb" role="status" aria-live="polite"></div>' +
        '<div class="coach-extra"></div>' +
        '<div class="coach-foot">' +
          '<button class="coach-nav coach-back" type="button">← Back</button>' +
          '<button class="coach-nav coach-next" type="button">Next →</button>' +
          '<button class="coach-hint" type="button">Need a hint?</button>' +
        '</div>' +
        '<p class="coach-hint-text" hidden></p>' +
      '</section>';
    document.body.appendChild(layer);

    var spot = layer.querySelector('.coach-spot');
    var card = layer.querySelector('.coach-card');
    var textEl = layer.querySelector('.coach-text');
    var praiseEl = layer.querySelector('.coach-praise');
    var fbEl = layer.querySelector('.coach-fb');
    var extra = layer.querySelector('.coach-extra');
    var stepEl = layer.querySelector('.coach-step');
    var barEl = layer.querySelector('.coach-bar span');
    var backBtn = layer.querySelector('.coach-back');
    var nextBtn = layer.querySelector('.coach-next');
    var hintBtn = layer.querySelector('.coach-hint');
    var foot = layer.querySelector('.coach-foot');
    var hintText = layer.querySelector('.coach-hint-text');
    var blocks = Array.prototype.slice.call(layer.querySelectorAll('.coach-block'));
    var spotlightOn = true;

    var hints = [];
    var shown = 0;
    function renderHints() {
      hintText.innerHTML = hints.slice(0, shown).map(function (h) { return '<span>' + rich(h) + '</span>'; }).join('');
      hintText.hidden = shown === 0;
      hintBtn.textContent = shown === 0 ? 'Need a hint?' : (shown < hints.length ? 'Show another hint' : 'Hide hints');
      schedule();
    }
    hintBtn.addEventListener('click', function () {
      if (shown < hints.length) { shown += 1; } else { shown = 0; }
      renderHints();
    });
    backBtn.addEventListener('click', function () { if (opts.onBack) { opts.onBack(); } });
    nextBtn.addEventListener('click', function () { if (opts.onNext) { opts.onNext(); } });

    blocks.forEach(function (b) {
      b.addEventListener('click', function () { if (opts.onBlocked) { opts.onBlocked(); } });
    });

    function setNav(cfg) {
      backBtn.hidden = !cfg.canBack;
      nextBtn.hidden = !cfg.canNext;
      hintBtn.hidden = !(cfg.hints || (cfg.hint ? [cfg.hint] : [])).length;
      foot.hidden = backBtn.hidden && nextBtn.hidden && hintBtn.hidden;
    }

    function place() {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var r = target && document.body.contains(target) ? target.getBoundingClientRect() : null;
      var ch = card.offsetHeight;

      if (!r || !spotlightOn || (r.width === 0 && r.height === 0)) {
        spot.style.display = 'none';
        blocks.forEach(function (b) { b.style.display = 'none'; });
        var left = opts.dock === 'left' && vw >= 1100;
        card.style.left = (left ? 16 : Math.max(12, vw - CARD_W - 24)) + 'px';
        card.style.top = Math.max(12, vh - ch - (left ? 16 : 24)) + 'px';
        return;
      }

      var x = Math.round(Math.max(0, r.left - PAD)), y = Math.round(Math.max(0, r.top - PAD));
      var w = Math.round(r.width + PAD * 2), h = Math.round(r.height + PAD * 2);
      spot.style.display = 'block';
      spot.style.left = x + 'px'; spot.style.top = y + 'px';
      spot.style.width = w + 'px'; spot.style.height = h + 'px';

      var geo = {
        top: [0, 0, vw, y],
        bottom: [0, y + h, vw, Math.max(0, vh - (y + h))],
        left: [0, y, x, h],
        right: [x + w, y, Math.max(0, vw - (x + w)), h]
      };
      blocks.forEach(function (b) {
        var g = geo[b.dataset.side];
        b.style.display = 'block';
        b.style.left = g[0] + 'px'; b.style.top = g[1] + 'px';
        b.style.width = g[2] + 'px'; b.style.height = g[3] + 'px';
      });

      var gap = 18;
      var clampX = function (v) { return Math.min(Math.max(EDGE, v), vw - CARD_W - EDGE); };
      var clampY = function (v) { return Math.min(Math.max(EDGE, v), vh - ch - EDGE); };
      var tall = r.height > 120;
      var spots = {
        below: { left: clampX(r.left), top: r.bottom + gap, ok: r.bottom + gap + ch <= vh - EDGE },
        above: { left: clampX(r.left), top: r.top - gap - ch, ok: r.top - gap - ch >= EDGE },
        right: { left: r.right + gap, top: clampY(r.top), ok: r.right + gap + CARD_W <= vw - EDGE },
        left: { left: r.left - gap - CARD_W, top: clampY(r.top), ok: r.left - gap - CARD_W >= EDGE }
      };
      var order = tall ? ['right', 'left', 'below', 'above'] : ['below', 'above', 'right', 'left'];
      var pick = null;
      for (var i = 0; i < order.length; i += 1) { if (spots[order[i]].ok) { pick = spots[order[i]]; break; } }
      if (!pick) { pick = { left: vw - CARD_W - EDGE, top: vh - ch - EDGE }; }
      card.style.left = Math.round(pick.left) + 'px';
      card.style.top = Math.round(Math.max(EDGE, Math.min(pick.top, vh - ch - EDGE))) + 'px';
    }

    function schedule() { window.requestAnimationFrame(place); }
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);

    function showPraise(msg) {
      praiseEl.innerHTML = msg ? CHECK + '<span>' + rich(msg) + '</span>' : '';
      praiseEl.classList.toggle('show', !!msg);
    }

    return {
      step: function (cfg) {
        // cfg: { target, text, hint, stage, stages, praise, canBack, canNext }
        target = cfg.target || null;
        showPraise(cfg.praise);
        textEl.innerHTML = rich(cfg.text);
        extra.innerHTML = '';
        fbEl.className = 'coach-fb';
        fbEl.innerHTML = '';
        if (cfg.stages) {
          stepEl.textContent = 'Step ' + cfg.stage + ' of ' + cfg.stages;
          barEl.style.width = Math.round((cfg.stage - 1) / cfg.stages * 100 + 100 / cfg.stages / 2) + '%';
        }
        setNav(cfg);
        hints = cfg.hints || (cfg.hint ? [cfg.hint] : []);
        shown = 0;
        renderHints();
        spotlightOn = !!target;
        if (target && target.scrollIntoView) {
          var r = target.getBoundingClientRect();
          if (r.top < 90 || r.bottom > window.innerHeight - 150) { target.scrollIntoView({ block: 'center' }); }
        }
        schedule();
        window.setTimeout(place, 60);
      },
      feedback: function (msg, kind) {
        if (kind === 'ok') { showPraise(msg); } else {
          fbEl.className = 'coach-fb show ' + kind;
          fbEl.innerHTML = BULB + '<span>' + rich(msg) + '</span>';
        }
        schedule();
      },
      finish: function (cfg) {
        target = null;
        spotlightOn = false;
        showPraise(cfg.praise);
        textEl.innerHTML = rich(cfg.text);
        fbEl.className = 'coach-fb';
        fbEl.innerHTML = '';
        setNav({ canBack: cfg.canBack, canNext: false });
        hints = [];
        shown = 0;
        renderHints();
        stepEl.textContent = 'All steps done';
        barEl.style.width = '100%';
        extra.innerHTML = '<button class="coach-go" type="button">' + esc(cfg.button) + '</button>';
        extra.querySelector('button').addEventListener('click', cfg.onClick);
        schedule();
        window.setTimeout(place, 60);
        extra.querySelector('button').focus();
      },
      clearFeedback: function () {
        fbEl.className = 'coach-fb';
        fbEl.innerHTML = '';
        schedule();
      },
      refresh: schedule,
      destroy: function () {
        window.removeEventListener('resize', schedule);
        window.removeEventListener('scroll', schedule, true);
        if (layer.parentNode) { layer.parentNode.removeChild(layer); }
      }
    };
  };
})();
