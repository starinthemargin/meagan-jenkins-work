/* Results screen and certificate for Round 3. All feedback is deferred to here. */
(function () {
  'use strict';
  var DB = window.DB = window.DB || {};

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  var CHECK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var BULB = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/></svg>';

  var TITLES = {
    trigger: 'Trigger: a task moves to Approved',
    condition: 'Condition: Type is Course',
    notify: 'Action: notify the LMS admin',
    test: 'Ran a test before saving',
    diagnosis: 'Diagnosis: why module 3 didn’t fire',
    fix: 'Fix: how to resolve it'
  };

  function message(item, d) {
    var r = d.rule;
    switch (item.id) {
      case 'trigger':
        if (item.ok) { return 'Your trigger watches for a task moving to Approved, which is the moment the admin needs to know.'; }
        if (!r.trigger) { return 'The rule didn’t have a trigger yet. The admin wants to hear when a course is approved, which is a task moving to the Approved column.'; }
        return 'Your trigger is a real one, and it fits other rules. This request is about the moment a task moves to Approved, so that’s the event to watch for.';
      case 'condition':
        if (item.ok) { return 'Type is Course keeps videos and job aids out, just as the admin asked.'; }
        if (!r.conds.length) { return 'Without a condition, the admin would hear about every approved task, including videos and job aids. A Type condition narrows it to courses.'; }
        return 'The condition you chose is a real one. For this request, the Type field is what separates courses from videos and job aids, so Type is Course is the match.';
      case 'notify':
        return item.ok ? 'Notifying the LMS admin gets the news to the person who loads courses.'
          : 'The admin asked to know when a course is approved, so a notification to the LMS admin is what carries that message.';
      case 'test':
        return item.ok ? 'You tested before saving. That’s how you catch surprises early.'
          : 'A quick test before saving would have shown which sample cards the rule catches.';
      case 'diagnosis':
        if (r.conds.indexOf('type-course') === -1) {
          return 'With your rule as built, module 3 would actually have fired, because there was no Type condition to check. In the rule the admin asked for, Type is Course is what makes module 3\u2019s blank Type field matter, and checking the card\u2019s details is a great first move.';
        }
        return item.ok
          ? 'Yes. Module 3’s Type field was blank, so the condition had nothing to match. Checking the card’s details is a great first move.'
          : 'It’s natural to suspect the trigger first. Here, the trigger did its job. Module 3’s Type field was blank, so the condition had nothing to match. Checking the card’s details is a great first move next time.';
      case 'fix':
        if (item.ok) { return 'Setting the Type fixes the cause without changing what the rule does.'; }
        if (d.fix === 'trigger') { return 'Changing the trigger to “A task is created” would fire at a different moment, when a card is made instead of approved. Filling in the Type fixes the cause without changing what the rule does.'; }
        return 'Deleting the condition would get module 3 through, but videos and job aids would come along too. Filling in the Type fixes the cause without changing what the rule does.';
      default:
        return '';
    }
  }

  function objective(name, blurb, items, d) {
    var earned = 0, possible = 0;
    items.forEach(function (i) { earned += i.earned; possible += i.points; });
    var full = earned === possible;
    return '<section class="obj" aria-label="' + esc(name) + '">' +
      '<header><div><h2>' + esc(name) + '</h2><p>' + esc(blurb) + '</p></div>' +
      '<span class="obj-score' + (full ? ' full' : '') + '">' + earned + ' / ' + possible + '</span></header>' +
      '<ul class="obj-items">' + items.map(function (it) {
        return '<li class="' + (it.ok ? 'ok' : 'try') + '"><span class="obj-ico">' + (it.ok ? CHECK : BULB) + '</span>' +
          '<div><p class="obj-title">' + esc(TITLES[it.id]) + ' <span class="pts">' + it.earned + ' / ' + it.points + '</span></p>' +
          '<p class="obj-msg">' + esc(message(it, d)) + '</p></div></li>';
      }).join('') + '</ul></section>';
  }

  function identifyCard(sort) {
    var finished = sort && sort.finished;
    var msg;
    if (!finished) { msg = 'You haven’t finished the opening sort yet. It’s a quick way to practice spotting what to automate.'; }
    else if (!sort.misses) { msg = 'You sorted every chore correctly on the first try.'; }
    else { msg = 'You sorted all six chores. ' + sort.misses + (sort.misses === 1 ? ' pick needed' : ' picks needed') + ' a second look, which is how the activity is meant to work.'; }
    return '<section class="obj" aria-label="Identify"><header><div><h2>Identify</h2>' +
      '<p>Spot the repetitive steps that suit automation.</p></div><span class="obj-score info">Practiced in the opening</span></header>' +
      '<ul class="obj-items"><li class="' + (finished ? 'ok' : 'try') + '"><span class="obj-ico">' + (finished ? CHECK : BULB) + '</span>' +
      '<div><p class="obj-msg">' + esc(msg) + '</p></div></li></ul></section>';
  }

  function bonusCard(result) {
    var ok = result.bonus && result.bonus.label;
    var msg = ok
      ? 'You also added the \u201cReady to load\u201d label, which gives the admin a clear signal on the card itself. Nice extra.'
      : 'The admin mentioned a \u201cReady to load\u201d label as a bonus. It gives the admin a clear signal on the card itself. We didn\u2019t practice labels in this course, so it isn\u2019t part of your score, but you\u2019ll find it under Add an action when you want to try it.';
    return '<section class="obj bonus" aria-label="Nice to have"><header><div><h2>Nice to have</h2>' +
      '<p>An extra from the admin\u2019s request.</p></div><span class="obj-score info">Not scored</span></header>' +
      '<ul class="obj-items"><li class="' + (ok ? 'ok' : 'note') + '"><span class="obj-ico">' + (ok ? CHECK : BULB) + '</span>' +
      '<div><p class="obj-title">Add the label \u201cReady to load\u201d</p><p class="obj-msg">' + esc(msg).replace('Add an action', '<strong>Add an action</strong>') + '</p></div></li></ul></section>';
  }

  function certificate() {
    var date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    return '<section class="certificate" aria-label="Certificate of completion"><div class="cert-inner">' +
      '<div class="cert-brand"><svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2B2640"/><path d="M5 19c3-6 6-6 9-2s6 4 9-2" fill="none" stroke="#FBF7F5" stroke-width="2.6" stroke-linecap="round"/><circle cx="25" cy="11" r="3.2" fill="#FF6B4A"/></svg><span>Driftboard Academy</span></div>' +
      '<p class="cert-kicker">Certificate of completion</p>' +
      '<h2>Driftboard Automations: Foundations</h2>' +
      '<p class="cert-body">This certifies completion of a course on building, refining, and verifying automation rules.</p>' +
      '<ul class="cert-skills"><li>Built a rule from a request</li><li>Narrowed it with conditions</li><li>Tested it and diagnosed a miss</li></ul>' +
      '<p class="cert-date">Completed ' + esc(date) + '</p>' +
      '<p class="cert-note">A portfolio sample, not an official certification. All names and data in this course are fictional.</p>' +
      '</div></section>';
  }

  DB.renderResults = function (result, sort) {
    if (!result) {
      return '<div class="wrap soon"><p class="eyebrow">Your results</p>' +
        '<h1 class="display" style="font-size:clamp(30px,4vw,44px)" tabindex="-1">Your results will appear here</h1>' +
        '<p>Finish the Verify section and submit your work to see how it went, with feedback on every part.</p>' +
        '<div class="actions" style="justify-content:center;margin-top:28px"><button class="btn primary" data-jump="r3-intro" type="button">Go to Verify</button></div></div>';
    }
    var d = result.data;
    var by = function (o) { return result.items.filter(function (i) { return i.objective === o; }); };
    var pct = result.total;
    var headline = result.passed ? 'You <em>did it.</em>' : 'You’re <em>close.</em>';
    var lead = result.passed
      ? 'You built it, tested it, and tracked down a tricky miss. Here’s your certificate.'
      : 'Here’s what’s worth another look. Try again whenever you’re ready, and your build carries over.';

    return '<div class="wrap results">' +
      '<div class="results-body">' +
        '<p class="eyebrow">Your results</p>' +
        '<h1 class="display" style="font-size:clamp(34px,5vw,54px)" tabindex="-1">' + headline + '</h1>' +
        '<p class="lead">' + lead + '</p>' +
        '<div class="score-card" role="group" aria-label="Your score">' +
          '<div class="score-num"><span class="big">' + result.total + '</span><span class="of"> / 100</span></div>' +
          '<div class="score-bar" role="img" aria-label="' + pct + ' out of 100, passing is 70"><span style="width:' + pct + '%"></span><i style="left:70%"></i></div>' +
          '<p class="score-note">' + (result.passed ? 'Passing is 70 or above.' : 'Passing is 70 or above. You’re ' + (70 - result.total) + ' points away.') + '</p>' +
        '</div>' +
        '<div class="obj-grid">' +
          identifyCard(sort) +
          objective('Build', 'Assemble a rule from a trigger and actions.', by('build'), d) +
          objective('Refine', 'Use conditions to limit when a rule runs.', by('refine'), d) +
          objective('Verify', 'Test a rule and work out why it did or didn’t fire.', by('verify'), d) +
          bonusCard(result) +
        '</div>' +
        '<div class="actions results-actions">' +
          (result.passed
            ? '<button class="btn primary" data-print="1" type="button">Print or save certificate</button><button class="btn" data-retry="1" type="button">Try again</button>'
            : '<button class="btn primary" data-retry="1" type="button">Try again</button>') +
        '</div>' +
      '</div>' +
      (result.passed ? certificate() : '') +
    '</div>';
  };
})();
