/* Round 1: Build (fully guided). */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  var MENUS = {
    'trigger-opt': [
      { value: 'created', label: 'A task is created' },
      { value: 'moves', label: 'A task moves to a column' },
      { value: 'due', label: 'A due date arrives' }
    ],
    'col-opt': [
      { value: 'Draft', label: 'Draft' },
      { value: 'SME review', label: 'SME review' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Published', label: 'Published' }
    ],
    'action-opt': [
      { value: 'move', label: 'Move to a column' },
      { value: 'assign', label: 'Assign to' },
      { value: 'notify', label: 'Send a notification' },
      { value: 'due', label: 'Set due date' }
    ],
    'person-opt': [
      { value: 'owner', label: 'Course owner' },
      { value: 'sme', label: 'Subject matter expert' },
      { value: 'me', label: 'Me' }
    ],
    'due-opt': [
      { value: 'same', label: 'Same day' },
      { value: '2d', label: '2 days from today' },
      { value: '1w', label: '1 week from today' }
    ]
  };

  var TESTS = [
    { name: 'Admin onboarding course: module 3', note: 'Moving to SME review', moves: 'SME review' },
    { name: 'Quick reference: reports glossary', note: 'Staying in Draft', moves: null, clickKey: 'result-glossary',
      detail: {
        fields: [['Status', 'Draft'], ['Type', 'Job aid'], ['Priority', 'Low']],
        checks: [
          { label: 'When: a task moves to SME review', note: 'Didn\u2019t happen. This task stayed in Draft.' },
          { label: 'Only if: no conditions set', note: 'Nothing else to check.' },
          { label: 'Then: assign a SME, set the due date', note: 'Didn\u2019t run, because the trigger didn\u2019t happen.' }
        ]
      } },
    { name: 'Integrations deep dive course', note: 'Staying in Approved', moves: null },
    { name: 'Navigating your dashboard', note: 'Moving to SME review', moves: 'SME review' }
  ];

  var WHY = {
    question: 'Why do you think the glossary job aid stayed quiet?',
    correct: 'Right. It never moved to SME review, so the trigger never happened.',
    options: [
      { value: 'type', label: 'It’s a job aid, not a course.' },
      { value: 'never', label: 'It never moved to SME review, so the trigger didn’t happen.' },
      { value: 'priority', label: 'It has Low priority.' }
    ]
  };

  var NUDGE = 'Let’s use the highlighted part for this step. You can explore everything once this section is done.';

  function wrongPick(accept, msg) {
    return function (v) { return v === accept ? true : msg; };
  }

  var STEPS = [
    { key: 'tab-rules', allow: ['tab-rules'], stage: 1, target: '[data-key="tab-rules"]',
      text: 'Welcome to Driftboard. Rules live in **Automations**. Open it to start a new one.' },

    { key: 'trigger-btn', allow: ['trigger-btn'], stage: 2, target: '[data-key="trigger-btn"]',
      text: 'Start with the trigger: the event Driftboard watches for. Select **Choose a trigger**.' },
    { key: 'trigger-opt', allow: ['trigger-opt'], stage: 2, target: '#sim-menu', focus: 'menu',
      text: 'Which event matches “a course enters review”?',
      hint: 'Think about what happens to a card when you drag it into a new column.',
      valid: wrongPick('moves', 'Good thinking, that’s a real trigger. It just fires at a different moment. Which event happens when a card lands in **SME review**?') },
    { key: 'col-opt', allow: ['col-opt', 'col-btn'], stage: 2, target: '#sim-menu', focus: 'menu',
      text: 'Now pick the column. Which one is the review stage?',
      hint: 'Courses wait in this column for a SME to look them over.',
      valid: wrongPick('SME review', 'That column is part of the pipeline, but this rule should start when a course enters review. Want to try another?') },

    { key: 'add-action', allow: ['add-action'], stage: 3, target: '[data-key="add-action"]',
      praise: 'Nice. Your trigger is set.',
      text: 'Now the actions: what should happen every time the trigger fires. Select **Add an action** to add the first one.' },
    { key: 'action-opt', allow: ['action-opt'], stage: 3, target: '#sim-menu', focus: 'menu',
      text: 'Which action hands the course to a reviewer?',
      hint: 'Look for the action that puts a person on the card.',
      valid: wrongPick('assign', 'Good thinking, that’s a real action. For this rule, the first job is to get the course in front of a reviewer. Which action does that?') },
    { key: 'person-opt', allow: ['person-opt', 'person-btn'], stage: 3, target: '#sim-menu', focus: 'menu',
      text: 'Who should it go to?',
      hint: 'Reviews are done by subject matter experts.',
      valid: wrongPick('sme', 'That could work in another rule. This one is about getting the course in front of a SME. Who should it go to?') },

    { key: 'add-action', allow: ['add-action'], stage: 4, target: '[data-key="add-action"]',
      praise: 'Got it. Reviewers will be assigned automatically.',
      text: 'Select **Add an action** again, so the reviewer knows when it’s due.' },
    { key: 'action-opt', allow: ['action-opt'], stage: 4, target: '#sim-menu', focus: 'menu',
      text: 'Which action sets a deadline?',
      hint: 'Look for the action that mentions a date.',
      valid: wrongPick('due', 'That’s a useful action, and you’ll use it soon. Right now the goal is a deadline for the reviewer. Which action sets a date?') },
    { key: 'due-opt', allow: ['due-opt', 'due-btn'], stage: 4, target: '#sim-menu', focus: 'menu',
      text: 'On this team, reviews are due 2 days after they start. Pick that option.',
      hint: 'Choose the option that says 2 days.',
      valid: wrongPick('2d', 'That’s a reasonable window for some teams. Here, reviews are due 2 days after they start. Which option matches?') },

    { key: 'run-test', allow: ['run-test'], stage: 5, target: '[data-key="run-test"]',
      praise: 'Two actions are ready.',
      text: 'Before you turn a rule on, test it on sample tasks. Select **Run test**.' },

    { key: 'result-glossary', allow: ['result-glossary'], stage: 6, target: '[data-key="result-glossary"]',
      praise: 'Two cards fired and two stayed quiet, so the rule is doing its job.',
      text: 'Open the glossary job aid to see what the rule checked.' },
    { key: 'why-opt', allow: ['why-opt'], stage: 6, target: '#sim-why', focus: 'why',
      text: 'Take a look at the card and **What the rule checked**. Then pick the reason it stayed quiet.',
      hint: 'Compare the first line under **What the rule checked** with where the card actually is.',
      valid: wrongPick('never', 'Good guess, those are things a rule can look at. This rule has no conditions yet, so it only watches for the move itself. We’ll add conditions in the next section.') },

    { key: 'save', allow: ['save'], stage: 7, target: '[data-key="save"]',
      text: 'That’s the behavior you wanted. Select **Save rule** to switch it on.' }
  ];

  DB.runRound1 = function (root, onDone) {
    var i = 0;                 // index of the current step (STEPS.length = finished)
    var furthest = 0;          // how many steps the learner has completed
    var done = [];             // the completing action for each finished step
    var sim = null;
    var coach = null;

    function focusFor(step, keep) {
      window.setTimeout(function () {
        var a = document.activeElement;
        if (keep && a && a !== document.body && a.getBoundingClientRect().width > 0) { return; }
        var el = root.querySelector(step.target);
        if (!el) { return; }
        var f = el;
        if (step.focus === 'menu' || step.focus === 'why') { f = el.querySelector('button'); }
        if (f && f.focus) { f.focus({ preventScroll: true }); }
      }, 80);
    }

    function show(n, withPraise, keepFocus) {
      var step = STEPS[n];
      sim.allow(step.allow);
      coach.step({
        target: root.querySelector(step.target),
        text: step.text,
        hint: step.hint,
        stage: step.stage,
        stages: 7,
        praise: withPraise ? step.praise : null,
        canBack: n > 0,
        canNext: n < furthest
      });
      focusFor(step, keepFocus);
    }

    function showFinish() {
      sim.allow([]);
      coach.finish({
        text: 'Your rule is saved and switched on. You picked a clear trigger, added two actions, and tested before turning it on.',
        praise: 'Rule on.',
        button: 'Finish Build',
        canBack: true,
        onClick: onDone
      });
    }

    function build() {
      if (sim) { sim.destroy(); }
      sim = DB.createSim(root, {
        task: 'When a course moves to SME review, assign a SME and set the due date 2 days out.',
        ruleName: 'Assign a SME when a course enters review',
        menus: MENUS,
        tests: TESTS,
        why: WHY,
        check: function (key, value) {
          var step = STEPS[i];
          if (!step || step.key !== key || !step.valid) { return true; }
          return step.valid(value);
        },
        onReject: function (key, msg) { coach.feedback(msg, 'try'); },
        onBlocked: function () { coach.feedback(NUDGE, 'nudge'); },
        onEvent: function (key, value) {
          if (!STEPS[i] || STEPS[i].key !== key) { return; }
          done[i] = { key: key, value: value };
          if (i + 1 > furthest) { furthest = i + 1; }
          i += 1;
          if (i >= STEPS.length) { showFinish(); } else { show(i, true); }
        }
      });
    }

    // Rebuild the app as it looked before step n, then show step n.
    function restoreTo(n, withPraise) {
      build();
      sim.replay(done.slice(0, n));
      i = n;
      if (n >= STEPS.length) { showFinish(); } else { show(n, withPraise, true); }
    }

    coach = DB.createCoach({
      onBlocked: function () { coach.feedback(NUDGE, 'nudge'); },
      onBack: function () { restoreTo(Math.max(0, i - 1), false); },
      onNext: function () { if (i < furthest) { restoreTo(i + 1, true); } }
    });

    build();
    show(0, false);

    return function teardown() { coach.destroy(); };
  };
})();
