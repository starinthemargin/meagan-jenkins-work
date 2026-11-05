/* Round 2: Refine (scaffolded). The coach states goals; hints are on request. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  var TESTS = [
    { name: 'Getting started video script', status: 'SME review', pri: 'High', type: 'Video', overdue: true },
    { name: 'Quick reference: reports glossary', status: 'Draft', pri: 'Low', type: 'Job aid', overdue: true },
    { name: 'Navigating your dashboard', status: 'Published', pri: 'High', type: 'Video', overdue: true },
    { name: 'Admin onboarding course: module 3', status: 'Draft', pri: 'High', type: 'Course', overdue: false }
  ];

  var CONDITIONS = [
    { value: 'type-course', label: 'Type is Course' },
    { value: 'stat-pub', label: 'Status is Published' },
    { value: 'pri-low', label: 'Priority is Low' },
    { value: 'pri-high', label: 'Priority is High' },
    { value: 'stat-notpub', label: 'Status is not Published' }
  ];

  var TESTERS = {
    'type-course': function (t) { return t.type === 'Course'; },
    'stat-pub': function (t) { return t.status === 'Published'; },
    'stat-notpub': function (t) { return t.status !== 'Published'; },
    'pri-low': function (t) { return t.pri === 'Low'; },
    'pri-high': function (t) { return t.pri === 'High'; }
  };

  function evaluate(conds, t) {
    if (!t.overdue) { return false; }
    return conds.every(function (c) { return TESTERS[c](t); });
  }

  function isCorrect(conds) {
    return conds.length === 2 && conds.indexOf('pri-high') !== -1 && conds.indexOf('stat-notpub') !== -1;
  }

  function reasonFor(t) {
    if (!t.overdue) { return 'it isn’t overdue yet'; }
    if (t.pri !== 'High') { return 'its priority is ' + t.pri; }
    if (t.status === 'Published') { return 'it’s already published'; }
    return 'one of the conditions wasn’t true';
  }

  var NUDGE = 'That one isn’t needed for this step. Take a look at the goal in the coach card.';

  DB.runRound2 = function (root, onDone) {
    var i = 0;
    var furthest = 0;
    var log = [];
    var starts = [0];
    var len = 0;
    var sim = null;
    var coach = null;

    function prediction() {
      for (var k = log.length - 1; k >= 0; k -= 1) {
        if (log[k].key === 'sel-submit' && log[k].step === 4) {
          return String(log[k].value || '').split(',').filter(Boolean).map(Number);
        }
      }
      return null;
    }

    function compareMsg() {
      var pred = prediction() || [];
      var actual = sim.firedIndexes();
      for (var n = 0; n < TESTS.length; n += 1) {
        var p = pred.indexOf(n) !== -1;
        var a = actual.indexOf(n) !== -1;
        if (p && !a) {
          return 'Interesting! “' + TESTS[n].name + '” stayed quiet because ' + reasonFor(TESTS[n]) + '. Conditions work as a team, so if one isn’t true, the rule waits.';
        }
        if (!p && a) {
          return 'Interesting! “' + TESTS[n].name + '” did get a nudge. It’s overdue, High priority, and not published, so every condition was true.';
        }
      }
      return 'Nice read. Two conditions, and both had to be true.';
    }

    var STEPS = [
      { stage: 1, allow: ['run-test'], focus: '[data-key="run-test"]',
        text: 'This is your team’s Overdue nudge rule. It’s been sending nudges nobody asked for. Select **Run test** to see who it would nudge.',
        hints: ['The **Run test** button is under the rule on the left.'],
        onEvent: function (key) { return key === 'run-test' ? { next: true } : null; } },

      { stage: 2, allow: ['sel-card', 'sel-submit'], focus: '[data-key="sel-card"]',
        select: { label: 'Select the cards that shouldn’t get a nudge.', submit: 'Check my answer' },
        praise: 'Test run. Three of the four cards would get a nudge.',
        text: 'Which of those shouldn’t? Select them, then select **Check my answer**.',
        hints: ['Read the tags under each card: status, priority, and whether it’s overdue.',
                'Two of the three cards that got a nudge are low priority or already published.'],
        check: function (key, v) {
          if (v === '1,2') { return true; }
          if (v.split(',').indexOf('0') !== -1) {
            return 'Good thinking. The Getting started video script is overdue, High priority, and still in review, so a nudge makes sense there. Want to look at the others?';
          }
          return 'Good start. Look at each card’s tags again. Which of the nudged cards are low priority, or already published?';
        },
        onEvent: function (key) { return key === 'sel-submit' ? { next: true } : null; } },

      { stage: 3, allow: ['add-cond', 'cond-opt', 'remove-cond'], focus: '[data-key="add-cond"]',
        praise: 'Yes. A low-priority job aid and an already-published video don’t need nudges.',
        text: 'Conditions narrow down when a rule runs. In **Only if**, add a condition so that only high-priority work gets nudged.',
        hints: ['Conditions live in the **Only if** section.', 'Open **Add a condition** and choose **Priority is High**.'],
        check: function (key, v) {
          return v === 'pri-high' ? true : 'Good thinking, that’s a real condition. This step is about priority, and we want only high-priority work. Which option does that?';
        },
        onEvent: function (key, v) { return key === 'cond-opt' && v === 'pri-high' ? { next: true } : null; } },

      { stage: 4, allow: ['add-cond', 'cond-opt', 'remove-cond'], focus: '[data-key="add-cond"]',
        praise: 'Nice. Only high-priority work will be nudged.',
        text: 'Add a second condition so finished work stays quiet. Every condition has to be true for the rule to run.',
        hints: ['Think about which status means the work is finished.', 'Look at the options that start with **Status**, and read the wording carefully.'],
        check: function (key, v) {
          return v === 'stat-pub' || v === 'stat-notpub' ? true : 'Good thinking, that’s a real condition. This one is about finished work, so look at the status options.';
        },
        onEvent: function (key, v) { return key === 'cond-opt' && (v === 'stat-pub' || v === 'stat-notpub') ? { next: true } : null; } },

      { stage: 5, allow: ['sel-card', 'sel-submit'], focus: '[data-key="sel-card"]',
        select: { label: 'Select the cards you think the rule will nudge.', submit: 'Lock in my prediction' },
        praise: 'Got it. Both conditions are in.',
        text: 'Before you test, predict which cards will get a nudge now. Select them, then select **Lock in my prediction**.',
        hints: ['Check each card against both conditions. A card has to pass them all.',
                'Only cards that are overdue, High priority, and not Published will get a nudge.'],
        onEvent: function (key) { return key === 'sel-submit' ? { next: true } : null; } },

      { stage: 6, allow: ['run-test', 'add-cond', 'cond-opt', 'remove-cond'], focus: '[data-key="run-test"]',
        praise: 'Prediction locked in.',
        text: 'Select **Run test** to check your prediction.',
        hints: ['Run the test, then compare each card with what you predicted.',
                'If a result surprises you, read the wording of each condition in **Only if**.'],
        check: function (key, v) {
          return v === 'pri-high' || v === 'stat-notpub' ? true : 'Good thinking, that’s a real condition. For this rule, we want high-priority work that isn’t published yet. Which option fits?';
        },
        onEvent: function (key) {
          if (key === 'cond-opt' && isCorrect(sim.conditions())) {
            coach.feedback('That looks right. Select **Run test** again to see what changes.', 'ok');
            return null;
          }
          if (key !== 'run-test') { return null; }
          var conds = sim.conditions();
          if (isCorrect(conds)) { return { next: true }; }
          if (conds.indexOf('stat-pub') !== -1) {
            coach.feedback('Here’s what happened: the rule nudged only finished work, which is exactly what that condition asks for. A small change to the wording flips it. Want to try “is not” and run the test again?', 'try');
          } else {
            coach.feedback('Let’s take a look at the **Only if** section. The rule needs both conditions: High priority, and a status that isn’t Published. Then run the test again.', 'try');
          }
          return null;
        } },

      { stage: 7, allow: ['save'], focus: '[data-key="save"]',
        praise: function () { return compareMsg(); },
        text: 'That’s the behavior you want. Select **Save rule** to switch it on.',
        onEvent: function (key) { return key === 'save' ? { next: true } : null; } }
    ];

    function praiseFor(n) {
      var p = STEPS[n] && STEPS[n].praise;
      return typeof p === 'function' ? p() : p;
    }

    function focusStep(step, keep) {
      window.setTimeout(function () {
        var a = document.activeElement;
        if (keep && a && a !== document.body && a.getBoundingClientRect().width > 0) { return; }
        var el = root.querySelector(step.focus);
        if (el) { el.focus({ preventScroll: true }); }
      }, 90);
    }

    function show(n, withPraise, keepFocus) {
      var step = STEPS[n];
      sim.allow(step.allow);
      sim.setSelect(step.select || null);
      sim.setPrediction(n >= 5 ? prediction() : null);
      coach.step({
        target: null,
        text: step.text,
        hints: step.hints,
        stage: step.stage,
        stages: 7,
        praise: withPraise ? praiseFor(n) : null,
        canBack: n > 0,
        canNext: n < furthest
      });
      focusStep(step, keepFocus);
    }

    function showFinish() {
      sim.allow([]);
      sim.setSelect(null);
      sim.setPrediction(prediction());
      coach.finish({
        text: 'Your refined rule is saved and on. Now it only nudges work that is overdue, High priority, and not published.',
        praise: 'Rule refined.',
        button: 'Finish Refine',
        canBack: true,
        onClick: onDone
      });
    }

    function record(key, value) {
      if (len < log.length) {         // acting after going back: the old future no longer applies
        log.length = len;
        starts.length = i + 1;
        furthest = i;
      }
      log.push({ key: key, value: value, step: i });
      len = log.length;
    }

    function advance() {
      i += 1;
      if (i > furthest) { furthest = i; }
      starts[i] = log.length;
      if (i >= STEPS.length) { showFinish(); } else { show(i, true); }
    }

    function build() {
      if (sim) { sim.destroy(); }
      sim = DB.createRefineSim(root, {
        task: 'Fix the Overdue nudge rule so it only nudges work that needs it.',
        ruleName: 'Overdue nudge',
        when: 'A task’s due date passes',
        actions: ['Notify the task owner'],
        tests: TESTS,
        conditionMenu: CONDITIONS,
        evaluate: evaluate,
        check: function (key, value) {
          var step = STEPS[i];
          return step && step.check ? step.check(key, value) : true;
        },
        onReject: function (key, msg) { coach.feedback(msg, 'try'); },
        onBlocked: function () { coach.feedback(NUDGE, 'nudge'); },
        onEvent: function (key, value) {
          var step = STEPS[i];
          if (!step) { return; }
          record(key, value);
          if (key !== 'remove-cond') { coach.clearFeedback(); }
          var res = step.onEvent ? step.onEvent(key, value) : null;
          if (res && res.next) { advance(); }
        }
      });
    }

    function restoreTo(n, withPraise) {
      build();
      sim.replay(log.slice(0, starts[n]));
      len = starts[n];
      i = n;
      if (n >= STEPS.length) { showFinish(); } else { show(n, withPraise, true); }
    }

    coach = DB.createCoach({
      dock: 'left',
      onBlocked: function () { coach.feedback(NUDGE, 'nudge'); },
      onBack: function () { restoreTo(Math.max(0, i - 1), false); },
      onNext: function () { if (i < furthest) { restoreTo(i + 1, true); } }
    });

    build();
    show(0, false);

    return function teardown() { coach.destroy(); };
  };
})();
