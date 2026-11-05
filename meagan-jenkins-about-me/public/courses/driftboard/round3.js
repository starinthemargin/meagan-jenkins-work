/* Round 3: Build and verify (solo, scored). No coaching and no right/wrong
   feedback while working; everything is explained on the results screen. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  var REQUEST = '“When a course is approved, I need to know so I can load it into the LMS. Just courses, please. Not videos or job aids. Bonus if you can add a “Ready to load” label to the card.”';
  var FOLLOWUP = 'Thanks for setting this up! One thing: “Admin onboarding course: module 3” was approved this morning, but I never got a notice. Can you find out why?';

  var TESTS = [
    { name: 'Integrations deep dive course', status: 'Approved', type: 'Course', pri: 'High', moves: 'Approved' },
    { name: 'Getting started video script', status: 'Approved', type: 'Video', pri: 'High', moves: 'Approved' },
    { name: 'Quick reference: reports glossary', status: 'Approved', type: 'Job aid', pri: 'Low', moves: 'Approved' },
    { name: 'Admin onboarding course: module 3', status: 'Approved', type: '', pri: 'High', moves: 'Approved' }
  ];

  var MENUS = {
    'trigger-opt': [
      { value: 'due', label: 'A due date arrives' },
      { value: 'moves', label: 'A task moves to a column' },
      { value: 'created', label: 'A task is created' }
    ],
    'col-opt': [
      { value: 'Draft', label: 'Draft' },
      { value: 'SME review', label: 'SME review' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Published', label: 'Published' }
    ],
    'cond-opt': [
      { value: 'pri-high', label: 'Priority is High' },
      { value: 'type-video', label: 'Type is Video' },
      { value: 'type-course', label: 'Type is Course' },
      { value: 'stat-pub', label: 'Status is Published' },
      { value: 'type-job', label: 'Type is Job aid' },
      { value: 'stat-notpub', label: 'Status is not Published' }
    ],
    'action-opt': [
      { value: 'move', label: 'Move to' },
      { value: 'notify', label: 'Notify' },
      { value: 'assign', label: 'Assign to' },
      { value: 'label', label: 'Add the label' },
      { value: 'due', label: 'Set due date to' }
    ]
  };

  var VALUE_MENUS = {
    notify: [
      { value: 'owner', label: 'the task owner' },
      { value: 'lms', label: 'the LMS admin' },
      { value: 'team', label: 'the education team' }
    ],
    label: [
      { value: 'review', label: 'Needs review' },
      { value: 'ready', label: 'Ready to load' },
      { value: 'archive', label: 'Archive' }
    ],
    assign: [
      { value: 'sme', label: 'a SME' },
      { value: 'owner', label: 'the course owner' },
      { value: 'me', label: 'me' }
    ],
    move: [
      { value: 'Draft', label: 'Draft' },
      { value: 'SME review', label: 'SME review' },
      { value: 'Published', label: 'Published' }
    ],
    due: [
      { value: 'same', label: 'the same day' },
      { value: '2d', label: '2 days from today' },
      { value: '1w', label: '1 week from today' }
    ]
  };

  var TESTERS = {
    'pri-high': function (t) { return t.pri === 'High'; },
    'type-video': function (t) { return t.type === 'Video'; },
    'type-course': function (t) { return t.type === 'Course'; },
    'type-job': function (t) { return t.type === 'Job aid'; },
    'stat-pub': function (t) { return t.status === 'Published'; },
    'stat-notpub': function (t) { return t.status !== 'Published'; }
  };

  var DIAGNOSIS = {
    key: 'diag-opt',
    question: 'The admin says module 3 never showed up. What’s the most likely reason?',
    options: [
      { value: 'trigger', label: 'The trigger is wrong.' },
      { value: 'blank', label: 'Its Type field is blank, so the condition didn’t match.' },
      { value: 'action', label: 'Courses can’t use this action.' }
    ]
  };

  var FIXQ = {
    key: 'fix-opt',
    question: 'What’s the best fix?',
    options: [
      { value: 'trigger', label: 'Change the trigger to “A task is created.”' },
      { value: 'settype', label: 'Set the card’s Type to Course.' },
      { value: 'delete', label: 'Delete the condition.' }
    ]
  };

  /* scoring ---------------------------------------------------------- */

  var ITEMS = [
    { id: 'trigger', points: 20, objective: 'build' },
    { id: 'condition', points: 20, objective: 'refine' },
    { id: 'notify', points: 20, objective: 'build' },
    { id: 'test', points: 10, objective: 'verify' },
    { id: 'diagnosis', points: 20, objective: 'verify' },
    { id: 'fix', points: 10, objective: 'verify' }
  ];

  function hasAction(rule, type, value) {
    return rule.actions.some(function (a) { return a.type === type && a.value === value; });
  }

  DB.scoreRound3 = function (d) {
    var r = d.rule;
    var got = {
      trigger: r.trigger === 'moves' && r.column === 'Approved',
      condition: r.conds.length === 1 && r.conds[0] === 'type-course',
      notify: hasAction(r, 'notify', 'lms'),
      test: !!d.ranTest,
      diagnosis: d.diag === 'blank',
      fix: d.fix === 'settype'
    };
    var total = 0;
    var items = ITEMS.map(function (it) {
      var ok = !!got[it.id];
      if (ok) { total += it.points; }
      return { id: it.id, points: it.points, earned: ok ? it.points : 0, ok: ok, objective: it.objective };
    });
    // The label is a nice-to-have mentioned in the request. It is shown on the results screen but never scored.
    return { total: total, passed: total >= 70, items: items, bonus: { label: hasAction(r, 'label', 'ready') }, data: d };
  };

  /* controller ------------------------------------------------------- */

  DB.runRound3 = function (root, draft, hooks) {
    var sim = DB.createSoloSim(root, {
      task: REQUEST,
      taskLabel: 'Request from the LMS admin',
      menus: MENUS,
      valueMenus: VALUE_MENUS,
      testers: TESTERS,
      tests: TESTS,
      followup: FOLLOWUP,
      diagnosis: DIAGNOSIS,
      fixQ: FIXQ,
      initial: draft,
      onChange: hooks.onChange,
      onSubmit: hooks.onSubmit
    });
    return function teardown() { sim.destroy(); };
  };

  DB.round3Meta = { MENUS: MENUS, VALUE_MENUS: VALUE_MENUS, ITEMS: ITEMS };
})();
