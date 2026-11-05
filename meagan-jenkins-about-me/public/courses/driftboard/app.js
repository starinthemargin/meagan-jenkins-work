(function () {
  'use strict';

  var SECTIONS = [
    { id: 'intro', label: 'Get started' },
    { id: 'r1', label: 'Build' },
    { id: 'r2', label: 'Refine' },
    { id: 'r3', label: 'Verify' },
    { id: 'results', label: 'Results' }
  ];

  var ICONS = {
    bulb: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>'
  };

  var CHORES = [
    {
      text: 'Assign a SME when a course enters review',
      answer: 'auto',
      right: 'Yes. Entering review is a clear trigger, and the action is the same every time.',
      retry: 'Good instinct to treat reviewers with care. Assigning a SME follows the same steps each time, and a course entering review is a clear signal, so a rule can handle it. Want to try the other bucket?'
    },
    {
      text: 'Set a due date 2 days out for every review',
      answer: 'auto',
      right: 'Yes. It is the same step every time, so a rule can do it for you.',
      retry: 'Due dates do matter. This one is the same every time, two days after a review starts, and a rule can count that for you. Want to try the other bucket?'
    },
    {
      text: 'Decide whether a course is good enough to publish',
      answer: 'human',
      right: 'Right. That judgment is yours to bring.',
      retry: 'That’s a reasonable instinct, since it happens at the same point in every project. This one rests on your judgment, though, and a rule can’t weigh the quality of a course. Want to try the other bucket?'
    },
    {
      text: 'Nudge the owner when high-priority work is overdue',
      answer: 'auto',
      right: 'Yes. A due date passing is a clear trigger.',
      retry: 'A nudge can feel personal, so that’s a fair instinct. A due date passing is a clear signal, and the nudge is the same every time, so a rule can send it. Want to try the other bucket?'
    },
    {
      text: 'Choose which topics to build next quarter',
      answer: 'human',
      right: 'Right. Strategy calls stay with you.',
      retry: 'That’s a reasonable instinct, since planning can feel like routine. Choosing topics depends on strategy and context, though, and a rule can’t weigh those. Want to try the other bucket?'
    },
    {
      text: 'Give a SME feedback on a confusing assessment question',
      answer: 'human',
      right: 'Right. A thoughtful conversation is a human job.',
      retry: 'That’s a reasonable instinct, since feedback comes up often. A good conversation depends on the specific question and the person, though, and a rule can’t read either. Want to try the other bucket?'
    }
  ];

  var state = {
    current: 'title',
    unlocked: { intro: true, r1: true, r2: true, r3: true, results: true },
    done: {},
    sort: { index: 0, placed: { auto: [], human: [] }, answered: false, finished: false, misses: 0 },
    r3: { draft: null, result: null }
  };

  var main = document.getElementById('main');
  var stepper = document.getElementById('stepper');
  var announcer = document.getElementById('announcer');

  function announce(msg) {
    announcer.textContent = '';
    window.setTimeout(function () { announcer.textContent = msg; }, 30);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* screens ------------------------------------------------------------ */

  var SCREENS = {
    title: {
      section: 'intro',
      next: 'scenario',
      render: function () {
        return '' +
          '<div class="wrap hero">' +
            '<div class="hero-text">' +
              '<p class="eyebrow">Driftboard Academy</p>' +
              '<h1 class="display" tabindex="-1">Automate the <em>busywork</em> in Driftboard</h1>' +
              '<p class="lead">Build rules that handle the repetitive parts of your content pipeline, and make sure they do what you meant.</p>' +
              '<p class="meta-line">About 12 minutes</p>' +
              '<p class="fiction-note">All data in this course, including the product itself, is fictional.</p>' +
              '<div class="safe-note">' + ICONS.shield +
                '<span><strong>Nothing you do here touches a real board.</strong> Try things, and ask for a hint whenever you want one.</span></div>' +
            '</div>' +
            goalsCard() +
            '<div class="actions hero-actions"><button class="btn primary" data-go="next" type="button">Start</button></div>' +
          '</div>';
      }
    },

    scenario: {
      section: 'intro',
      prev: 'title',
      next: 'sort',
      render: function () {
        return '' +
          '<div class="wrap screen-inner">' +
            '<p class="eyebrow">The scenario</p>' +
            '<h1 class="title h2 display" style="font-size:clamp(30px,4.2vw,46px)" tabindex="-1">It’s Monday, and you lead your education team’s content pipeline.</h1>' +
            '<p class="lead">By 10 a.m., you’ve already done a lot of small, repeatable things:</p>' +
            '<ul class="timeline">' +
              '<li><time>8:40</time><span>Pinged three subject matter experts about reviews</span></li>' +
              '<li><time>9:15</time><span>Checked two due dates by hand</span></li>' +
              '<li><time>9:50</time><span>Nudged a late video script</span></li>' +
            '</ul>' +
            '<p class="pivot">None of it was hard, and all of it was repeated. Driftboard can take over the repeatable parts. First, decide which parts those are.</p>' +
            footNav(true, 'Sort the chores') +
          '</div>';
      }
    },

    sort: {
      section: 'intro',
      prev: 'scenario',
      next: 'anatomy',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Decide what to hand off</p>' +
            '<div class="sort-top">' +
              '<h1 class="title h2 display" style="font-size:clamp(28px,3.6vw,40px)" tabindex="-1">Automate it, or keep it human?</h1>' +
              '<span class="sort-progress" id="sort-progress"></span>' +
            '</div>' +
            '<div class="sort-grid">' +
              '<div id="sort-stage"></div>' +
              '<div class="buckets" aria-label="Your sorted chores">' +
                '<section class="bucket auto" aria-labelledby="b-auto"><h2 id="b-auto">Automate it <span class="count" id="count-auto">0</span></h2><ul id="list-auto"></ul></section>' +
                '<section class="bucket human" aria-labelledby="b-human"><h2 id="b-human">Keep it human <span class="count" id="count-human">0</span></h2><ul id="list-human"></ul></section>' +
              '</div>' +
            '</div>' +
            '<div id="sort-summary"></div>' +
            '<div class="foot-nav"><button class="btn ghost" data-go="prev" type="button">Back</button>' +
              '<div class="actions"><span class="hint-line" id="sort-gate">You can finish sorting any time.</span>' +
              '<button class="btn primary" data-go="next" id="sort-continue" type="button">Continue</button></div></div>' +
          '</div>';
      },
      after: function () { renderSort(); }
    },

    anatomy: {
      section: 'intro',
      prev: 'sort',
      next: 'r1-intro',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">How rules work</p>' +
            '<h1 class="display" style="font-size:clamp(30px,4.2vw,46px)" tabindex="-1">Every rule has the same three parts</h1>' +
            '<div class="anatomy">' +
              '<div class="part when"><div class="num" aria-hidden="true">1</div><h2>When</h2><p>This is the event Driftboard watches for.</p><div class="ex">For example, a card moves to SME review.</div></div>' +
              '<div class="part if"><div class="num" aria-hidden="true">2</div><h2>Only if</h2><p>These are optional conditions that have to be true for the rule to run.</p><div class="ex">For example, the card’s priority is High.</div></div>' +
              '<div class="part then"><div class="num" aria-hidden="true">3</div><h2>Then</h2><p>This is what Driftboard does every time the rule runs.</p><div class="ex">For example, it assigns a reviewer.</div></div>' +
            '</div>' +
            '<p class="sentence" aria-label="When a card moves to SME review, only if priority is High, then assign a reviewer.">' +
              '<span class="w">Rule in a sentence: </span>' +
              '<mark class="m1">When</mark> a card moves to SME review, ' +
              '<mark class="m2">only if</mark> priority is High, ' +
              '<mark class="m3">then</mark> assign a reviewer.</p>' +
            '<p class="pivot">Next, you’ll build a rule with a trigger and two actions.</p>' +
            footNav(true, 'Open Driftboard') +
          '</div>';
      }
    },

    'r1-intro': {
      section: 'r1',
      prev: 'anatomy',
      next: 'r1-app',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Build · Guided practice</p>' +
            '<h1 class="display" style="font-size:clamp(30px,4.2vw,46px)" tabindex="-1">Build your first rule</h1>' +
            '<p class="lead">Reviews keep stalling because nobody is sure who’s reviewing what, or by when. You’ll build a rule that fixes both.</p>' +
            '<div class="task-card"><h2>Your task</h2><p>When a course moves to SME review, assign a SME and set the due date 2 days out.</p></div>' +
            '<ul class="expect">' +
              '<li><span class="expect-ico" aria-hidden="true">1</span><span>A coach points out where to click. You’ll use the real Driftboard controls.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">2</span><span>Ask for a hint whenever you want one.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">3</span><span>You’ll test your rule before turning it on, just like you would at work.</span></li>' +
            '</ul>' +
            footNav(true, 'Open Driftboard') +
          '</div>';
      }
    },

    'r1-app': {
      section: 'r1',
      bleed: true,
      render: function () { return '<h1 class="sr-only" tabindex="-1">Build: practice in Driftboard</h1><div id="sim-root"></div>'; },
      after: function () {
        return DB.runRound1(document.getElementById('sim-root'), function () { go('r1-done'); });
      }
    },

    'r1-done': {
      section: 'r1',
      next: 'r2-intro',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Build complete</p>' +
            '<h1 class="display" style="font-size:clamp(34px,5vw,54px)" tabindex="-1">Rule <em>on.</em></h1>' +
            '<p class="lead">You picked a clear trigger, added two actions, and tested before switching it on.</p>' +
            '<ul class="recap">' +
              '<li>Trigger: a task moves to SME review</li>' +
              '<li>Action: assign a SME</li>' +
              '<li>Action: set the due date 2 days out</li>' +
            '</ul>' +
            '<p class="pivot">Next, a rule that fires more often than it should.</p>' +
            '<div class="actions" style="margin-top:28px"><button class="btn primary" data-go="next" type="button">Continue to Refine</button></div>' +
          '</div>';
      }
    },

    'r2-intro': {
      section: 'r2',
      prev: 'r1-done',
      next: 'r2-app',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Refine \u00b7 Practice with hints</p>' +
            '<h1 class="display" style="font-size:clamp(30px,4.2vw,46px)" tabindex="-1">Fix a rule that fires too often</h1>' +
            '<p class="lead">Your team\u2019s Overdue nudge rule is working, but it\u2019s nudging work that doesn\u2019t need it. You\u2019ll narrow it down with conditions.</p>' +
            '<div class="task-card"><h2>Your task</h2><p>Make the Overdue nudge rule nudge only high-priority work that isn\u2019t published yet.</p></div>' +
            '<ul class="expect">' +
              '<li><span class="expect-ico" aria-hidden="true">1</span><span>This time the coach states the goal, and you decide where to click.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">2</span><span>Ask for a hint whenever you want one. There are two levels.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">3</span><span>You\u2019ll predict what the rule will do before you test it.</span></li>' +
            '</ul>' +
            footNav(true, 'Open Driftboard') +
          '</div>';
      }
    },

    'r2-app': {
      section: 'r2',
      bleed: true,
      render: function () { return '<h1 class="sr-only" tabindex="-1">Refine: practice in Driftboard</h1><div id="sim-root"></div>'; },
      after: function () {
        return DB.runRound2(document.getElementById('sim-root'), function () { go('r2-done'); });
      }
    },

    'r2-done': {
      section: 'r2',
      next: 'r3-intro',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Refine complete</p>' +
            '<h1 class="display" style="font-size:clamp(34px,5vw,54px)" tabindex="-1">Rule <em>refined.</em></h1>' +
            '<p class="lead">You spotted the noise, narrowed the rule with two conditions, and checked your prediction against the test.</p>' +
            '<ul class="recap">' +
              '<li>Condition: Priority is High</li>' +
              '<li>Condition: Status is not Published</li>' +
              '<li>Both conditions have to be true</li>' +
            '</ul>' +
            '<p class="pivot">Next, you\u2019ll build a rule from a request, on your own.</p>' +
            '<div class="actions" style="margin-top:28px"><button class="btn primary" data-go="next" type="button">Continue to Verify</button></div>' +
          '</div>';
      }
    },

    'r3-intro': {
      section: 'r3',
      prev: 'r2-done',
      next: 'r3-app',
      render: function () {
        return '' +
          '<div class="wrap">' +
            '<p class="eyebrow">Verify \u00b7 On your own</p>' +
            '<h1 class="display" style="font-size:clamp(30px,4.2vw,46px)" tabindex="-1">Build and verify a rule</h1>' +
            '<p class="lead">A request just came in from the LMS admin. This time there\u2019s no coach, and nothing is graded until you submit. Use what you\u2019ve practiced.</p>' +
            '<div class="task-card"><h2>Request from the LMS admin</h2><p>\u201cWhen a course is approved, I need to know so I can load it into the LMS. Just courses, please. Not videos or job aids. Bonus if you can add a \u201cReady to load\u201d label to the card.\u201d</p></div>' +
            '<ul class="expect">' +
              '<li><span class="expect-ico" aria-hidden="true">1</span><span>Build the rule the admin asked for. You can test it before you save.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">2</span><span>After you save, the admin follows up with a question to investigate.</span></li>' +
              '<li><span class="expect-ico" aria-hidden="true">3</span><span>You\u2019ll see your results, with feedback on every part, when you submit.</span></li>' +
            '</ul>' +
            '<div class="safe-note">' + ICONS.shield + '<span><strong>Not sure about something? Try it.</strong> You can change anything before you submit, and you can try again afterward.</span></div>' +
            footNav(true, 'Open Driftboard') +
          '</div>';
      }
    },

    'r3-app': {
      section: 'r3',
      bleed: true,
      render: function () { return '<h1 class="sr-only" tabindex="-1">Verify: practice in Driftboard</h1><div id="sim-root"></div>'; },
      after: function () {
        return DB.runRound3(document.getElementById('sim-root'), state.r3.draft, {
          onChange: function (d) { state.r3.draft = d; },
          onSubmit: function (d) { state.r3.result = DB.scoreRound3(d); go('results'); }
        });
      }
    },

    'results': {
      section: 'results',
      render: function () { return DB.renderResults(state.r3.result, state.sort); }
    }
  };

  function footNav(hasBack, nextLabel) {
    return '<div class="foot-nav">' +
      (hasBack ? '<button class="btn ghost" data-go="prev" type="button">Back</button>' : '<span></span>') +
      '<button class="btn primary" data-go="next" type="button">' + esc(nextLabel) + '</button></div>';
  }

  function goalsCard() {
    var goals = [
      ['Spot', 'the repetitive steps that suit automation'],
      ['Build', 'a rule from a trigger and actions'],
      ['Refine', 'a rule with conditions, so it runs only when it should'],
      ['Verify', 'a rule by testing it and working out why it did or didn\u2019t fire']
    ];
    return '<aside class="goals" aria-labelledby="goals-h">' +
      heroArt().replace('viewBox="0 0 440 380"', 'viewBox="0 26 440 206"') +
      '<div class="goals-body">' +
        '<h2 id="goals-h">By the end, you\u2019ll be able to</h2>' +
        '<ul class="goal-list">' + goals.map(function (g, i) {
          return '<li><span class="goal-n" aria-hidden="true">' + (i + 1) + '</span><span><strong>' + g[0] + '</strong> ' + g[1] + '</span></li>';
        }).join('') + '</ul>' +
        '<p class="goals-foot">You\u2019ll finish with a challenge on your own, and a certificate to show for it.</p>' +
      '</div></aside>';
  }

  function heroArt() {
    return '<svg viewBox="0 0 440 380" role="img" aria-label="Illustration of three task cards on a board, one marked with a lightning bolt">' +
      '<rect x="0" y="0" width="440" height="380" rx="28" fill="#F4EDE8"/>' +
      '<rect x="36" y="44" width="110" height="292" rx="14" fill="#EBDDD6" opacity=".7"/>' +
      '<rect x="165" y="44" width="110" height="292" rx="14" fill="#EBDDD6" opacity=".7"/>' +
      '<rect x="294" y="44" width="110" height="292" rx="14" fill="#EBDDD6" opacity=".7"/>' +
      '<g>' +
        '<rect x="46" y="62" width="90" height="62" rx="10" fill="#fff"/><rect x="56" y="74" width="60" height="8" rx="4" fill="#1F1B2E"/><rect x="56" y="90" width="34" height="8" rx="4" fill="#ECE7FF"/>' +
        '<rect x="46" y="136" width="90" height="62" rx="10" fill="#fff"/><rect x="56" y="148" width="50" height="8" rx="4" fill="#1F1B2E"/><rect x="56" y="164" width="40" height="8" rx="4" fill="#FFE1D6"/>' +
      '</g>' +
      '<g transform="rotate(-4 220 120)">' +
        '<rect x="175" y="86" width="90" height="70" rx="10" fill="#fff" stroke="#FF6B4A" stroke-width="2.5"/>' +
        '<rect x="185" y="98" width="64" height="8" rx="4" fill="#1F1B2E"/><rect x="185" y="114" width="36" height="8" rx="4" fill="#ECE7FF"/>' +
        '<circle cx="253" cy="140" r="9" fill="#7A5CFA"/>' +
      '</g>' +
      '<g>' +
        '<circle cx="258" cy="86" r="17" fill="#FF6B4A"/><path d="M262 76l-9 12h6l-2 9 9-12h-6z" fill="#1F1B2E"/>' +
      '</g>' +
      '<g>' +
        '<rect x="304" y="62" width="90" height="62" rx="10" fill="#fff"/><rect x="314" y="74" width="56" height="8" rx="4" fill="#1F1B2E"/><rect x="314" y="90" width="30" height="8" rx="4" fill="#DDF3EA"/>' +
      '</g>' +
      '<path d="M120 300c30-40 60-40 90-8s60 30 100-14" fill="none" stroke="#1F1B2E" stroke-width="7" stroke-linecap="round" opacity=".12"/>' +
    '</svg>';
  }

  /* sort activity ------------------------------------------------------ */

  function updateBuckets() {
    var s = state.sort;
    ['auto', 'human'].forEach(function (k) {
      var list = document.getElementById('list-' + k);
      document.getElementById('count-' + k).textContent = s.placed[k].length;
      list.innerHTML = s.placed[k].length
        ? s.placed[k].map(function (i) { return '<li>' + esc(CHORES[i].text) + '</li>'; }).join('')
        : '<li class="empty" style="background:none;padding:0">Nothing here yet.</li>';
    });
  }

  function renderSort() {
    var s = state.sort;
    var stage = document.getElementById('sort-stage');
    var progress = document.getElementById('sort-progress');

    updateBuckets();

    if (s.finished) {
      progress.textContent = 'All sorted';
      stage.innerHTML = '';
      document.querySelector('.sort-grid').classList.add('finished');
      document.getElementById('sort-summary').innerHTML =
        '<div class="summary"><div class="a"><b>Automate</b>the “when this happens, always do that.”</div>' +
        '<div class="h"><b>Keep human</b>the calls that need judgment.</div></div>';
      document.getElementById('sort-gate').textContent = '';
      return;
    }

    var chore = CHORES[s.index];
    progress.textContent = 'Chore ' + (s.index + 1) + ' of ' + CHORES.length;
    stage.innerHTML =
      '<div class="chore" role="group" aria-labelledby="chore-q">' +
        '<p class="q" id="chore-q">' + esc(chore.text) + '</p>' +
        '<div class="choice-row">' +
          '<button class="choice" data-choice="auto" type="button">Automate it</button>' +
          '<button class="choice" data-choice="human" type="button">Keep it human</button>' +
        '</div>' +
        '<div id="chore-feedback"></div>' +
      '</div>';
    s.answered = false;
  }

  function chooseSort(choice) {
    var s = state.sort;
    if (s.answered) { return; }
    var chore = CHORES[s.index];
    var fb = document.getElementById('chore-feedback');
    var buttons = document.querySelectorAll('.choice');

    if (choice === chore.answer) {
      s.answered = true;
      s.placed[choice].push(s.index);
      buttons.forEach(function (b) {
        b.disabled = true;
        b.classList.remove('picked');
        if (b.dataset.choice === choice) { b.classList.add('right'); }
      });
      updateBuckets();
      var last = s.index === CHORES.length - 1;
      fb.innerHTML =
        '<div class="feedback ok">' + ICONS.check + '<span>' + esc(chore.right) + '</span></div>' +
        '<div class="actions"><button class="btn primary" id="sort-next" type="button">' + (last ? 'See your sort' : 'Next chore') + '</button></div>';
      announce(chore.right);
      var next = document.getElementById('sort-next');
      next.focus();
      next.addEventListener('click', function () {
        if (last) { s.finished = true; } else { s.index += 1; }
        renderSort();
        if (s.finished) {
          var hd = document.querySelector('h1[tabindex="-1"]');
          if (hd) { hd.focus(); }
        } else {
          var q = document.getElementById('chore-q');
          if (q) { q.setAttribute('tabindex', '-1'); q.focus(); }
        }
      });
    } else {
      s.misses += 1;
      var msg = chore.retry;
      buttons.forEach(function (b) {
        b.classList.toggle('picked', b.dataset.choice === choice);
      });
      fb.innerHTML = '<div class="feedback try">' + ICONS.bulb + '<span>' + esc(msg) + '</span></div>';
      announce(msg);
    }
  }

  /* navigation --------------------------------------------------------- */

  function sectionIndex(id) {
    for (var i = 0; i < SECTIONS.length; i += 1) { if (SECTIONS[i].id === id) { return i; } }
    return 0;
  }

  function renderStepper() {
    var current = SCREENS[state.current].section;
    stepper.innerHTML = SECTIONS.map(function (sec, i) {
      var unlocked = !!state.unlocked[sec.id];
      var isCurrent = sec.id === current;
      var done = !!state.done[sec.id];
      return '<li><button type="button" data-section="' + sec.id + '"' +
        (unlocked ? '' : ' disabled') +
        (isCurrent ? ' aria-current="step"' : '') +
        (done ? ' class="done"' : '') + '>' +
        '<span class="dot" aria-hidden="true">' + (done ? '✓' : (i + 1)) + '</span>' +
        '<span class="label">' + esc(sec.label) + '</span>' +
        (done ? '<span class="sr-only"> (complete)</span>' : '') +
        '</button></li>';
    }).join('');
  }

  var TITLES = {
    title: null, scenario: 'The scenario', sort: 'Sort the chores', anatomy: 'How rules work',
    'r1-intro': 'Build: your first rule', 'r1-app': 'Build: practice', 'r1-done': 'Build complete',
    'r2-intro': 'Refine: fix a noisy rule', 'r2-app': 'Refine: practice', 'r2-done': 'Refine complete',
    'r3-intro': 'Verify: on your own', 'r3-app': 'Verify: practice', results: 'Your results'
  };
  var BASE_TITLE = 'Automate the busywork in Driftboard';

  var FIRST_SCREEN = { intro: 'title', r1: 'r1-intro', r2: 'r2-intro', r3: 'r3-intro', results: 'results' };
  var DB = window.DB;

  function go(id, initial) {
    var screen = SCREENS[id];
    if (!screen) { return; }
    if (state.teardown) { state.teardown(); state.teardown = null; }
    var prevSection = SCREENS[state.current] && SCREENS[state.current].section;
    if (prevSection && prevSection !== screen.section && sectionIndex(screen.section) > sectionIndex(prevSection)) {
      state.done[prevSection] = true;
    }
    state.unlocked[screen.section] = true;
    state.current = id;
    document.title = TITLES[id] ? TITLES[id] + ' \u00b7 ' + BASE_TITLE : BASE_TITLE;
    main.classList.toggle('bleed', !!screen.bleed);
    main.innerHTML = '<div class="screen">' + screen.render() + '</div>';
    if (screen.after) { state.teardown = screen.after() || null; }
    renderStepper();
    var h = main.querySelector('h1');
    if (h) {
      h.setAttribute('tabindex', '-1');
      if (!initial) { h.focus({ preventScroll: true }); }
    }
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-choice],[data-section],[data-retry],[data-print],[data-jump]');
    if (!t) { return; }
    if (t.dataset.jump) { go(t.dataset.jump); return; }
    if (t.dataset.print) { window.print(); return; }
    if (t.dataset.retry) {
      var prev = state.r3.result && state.r3.result.data;
      state.r3.draft = prev ? { rule: prev.rule, ranTest: false, saved: false, diag: null, fix: null } : null;
      go('r3-app');
      return;
    }
    if (t.dataset.choice) { chooseSort(t.dataset.choice); return; }
    if (t.dataset.section) {
      go(FIRST_SCREEN[t.dataset.section] || state.current);
      return;
    }
    var screen = SCREENS[state.current];
    if (t.dataset.go === 'next' && screen.next) { go(screen.next); }
    if (t.dataset.go === 'prev' && screen.prev) { go(screen.prev); }
  });

  /* course map ---------------------------------------------------------- */

  var MAP = [
    { label: 'Get started', items: [['title', 'Title'], ['scenario', 'The scenario'], ['sort', 'Sort the chores'], ['anatomy', 'How rules work']] },
    { label: 'Build', items: [['r1-intro', 'Introduction'], ['r1-app', 'Practice in Driftboard'], ['r1-done', 'Section complete']] },
    { label: 'Refine', items: [['r2-intro', 'Introduction'], ['r2-app', 'Practice in Driftboard'], ['r2-done', 'Section complete']] },
    { label: 'Verify', items: [['r3-intro', 'Introduction'], ['r3-app', 'Practice in Driftboard']] },
    { label: 'Results', items: [['results', 'Results and certificate']] }
  ];
  var mapBtn = document.getElementById('map-btn');
  var mapPanel = document.getElementById('map-panel');

  function renderMap() {
    mapPanel.innerHTML = MAP.map(function (g) {
      return '<div class="map-group"><p class="map-label">' + esc(g.label) + '</p>' +
        g.items.map(function (it) {
          return '<button type="button" class="map-item" data-map="' + it[0] + '"' + (state.current === it[0] ? ' aria-current="page"' : '') + '>' + esc(it[1]) + '</button>';
        }).join('') + '</div>';
    }).join('');
  }

  function setMap(open) {
    if (open) { renderMap(); }
    mapPanel.hidden = !open;
    mapBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      var cur = mapPanel.querySelector('[aria-current]') || mapPanel.querySelector('button');
      if (cur) { cur.focus(); }
    }
  }

  mapBtn.addEventListener('click', function () { setMap(mapPanel.hidden); });
  mapPanel.addEventListener('click', function (e) {
    var b = e.target.closest('[data-map]');
    if (!b) { return; }
    setMap(false);
    go(b.dataset.map);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mapPanel.hidden) { setMap(false); mapBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!mapPanel.hidden && !e.target.closest('.map-wrap')) { setMap(false); }
  });

  go('title', true);
})();
