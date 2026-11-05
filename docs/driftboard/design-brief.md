# Driftboard course: design brief

Status: Built in `driftboard-course/`: shell, opening with objectives, Rounds 1-3, results and certificate, open navigation, course map, and Back/Next through Rounds 1-2. Accessibility audit (WCAG 2.2 AA) done and documented in `driftboard-course/ACCESSIBILITY.md`. Remaining: real screen-reader test, full run-through, and publishing to the portfolio.

## Concept
Customer-education course for **Driftboard**, a fictional board-style project management tool (inspired by Asana/Trello-style products; original name and branding, no real company assets or data). Learners practice building and verifying automation rules in a realistic simulated app.

- Audience: customer education (external customers of the product)
- Learner persona: a leader of a customer education/content team whose pipeline moves courses, job aids, and videos through draft, SME review, approval, and publish
- Length: about 10-15 minutes
- Format: custom HTML/CSS/JS, to be hosted on the meaganjenkins.work portfolio
- Look: fictional product with its own brand; high-fidelity simulated UI; framed layout for story screens, full-screen for hands-on practice

## Performance goal
Given a plain-language request to automate a repeated step in a team's workflow, the learner builds a working automation rule and verifies that it behaves as intended.

## Objectives
1. **Identify:** recognize a repetitive manual step that suits automation, and name its trigger and desired outcome.
2. **Build:** assemble a rule from a trigger, conditions, and actions.
3. **Refine:** use conditions to limit when a rule runs, so it doesn't fire when it shouldn't.
4. **Verify:** test a rule against sample tasks and diagnose why it did or didn't fire.

## Learner journey
1. Opening story (practices objective 1): the learner sorts a list of manual chores into "automate" and "keep human" (for example, assigning a reviewer vs. deciding whether a course is good enough to publish)
2. Round 1, fully guided (spotlight + coach tips; learner clicks the real element to advance)
3. Round 2, scaffolded (hints on request)
4. Round 3, solo and scored
5. Results screen and certificate-style completion

- Feedback: immediate and explanatory in Rounds 1-2; deferred to the results screen in Round 3
- Navigation: linear the first time, free to revisit afterward

## Section names (navigation)
The header and course map use skill names, not round numbers, so the step numbers 1-5 don't clash with "Round 1-3": **Get started** (opening), **Build** (guided), **Refine** (scaffolded), **Verify** (solo, scored), **Results**. "Round 1-3" remains only as internal shorthand in this brief and the code.

## Skill ladder
Each round adds one new idea; Round 3 only recombines what's been practiced.

| Round | Support | Task | New skill | Already practiced |
|---|---|---|---|---|
| 1 | Fully guided | **Build:** when a course moves to SME Review, assign the reviewer and set a due date 2 days out; run a test on one sample card | Trigger, actions, running a test | None |
| 2 | Scaffolded | **Refine:** a noisy rule notifies owners when anything is overdue, including finished and low-priority work. Add conditions (not Done, priority High), predict which of four sample cards will fire, then check | Conditions, predicting before testing | Actions, testing |
| 3 | Solo, scored | **Build and verify:** from a plain-language request ("when a course is Approved, move it to the publish queue and tell the LMS admin"), build the rule, test it, and diagnose why one sample card didn't fire | Diagnosing a miss | Trigger, conditions, actions, testing |

Round 3 is one trigger, one or two conditions, and two actions.

## Tone standard for feedback (approved)
Voice is warm and collegial. Especially around incorrect answers, the course must feel like a safe place to learn.
1. **Credit first.** Open with something true and good about the learner's thinking.
2. **The rule is the subject, not the learner.** "The rule fired on finished work," not "you set it up wrong."
3. **One clear next step, phrased as an invitation.** "Want to try 'is not'?", never an order.
4. **No loaded words.** No "wrong," "incorrect," "not quite," "opposite." Buttons say "Try again."
5. **Product names in bold.** When coach copy refers to a part of the app, use its exact on-screen wording in bold (for example **Only if**, **Run test**, **Save rule**) so learners can match the words to what they see.
6. **Safe frame.** The opening says "Nothing you do here touches a real board. Try things, and ask for a hint whenever you want one." Visuals use gentle violet/coral tints and a lightbulb icon for "let's look closer"; no red X marks.

## Approved content

### Opening (framed layout; company-neutral, "your education team")
1. Title: "Automate the busywork in Driftboard" (about 12 minutes, all data fictional). The same screen shows a "By the end, you'll be able to" card with the four learning objectives (Spot, Build, Refine, Verify) so learners see what they'll get before they click Start.
2. Scenario: it's Monday and the learner leads their education team's content pipeline; lots of repeated nudging and checking
3. Sort the chores into **Automate it** / **Keep it human** (objective 1). Automate: assign a SME when a course enters review; set a due date 2 days out for every review; nudge the owner when high-priority work is overdue. Keep human: decide whether a course is good enough to publish; choose next quarter's topics; give a SME feedback on a confusing assessment question. (Style: "a SME", pronounced "smee".) Summary: automate the "when this happens, always do that"; keep human the calls that need judgment.
4. Anatomy of a rule: **When** something happens, **only if** conditions are true, **then** do something.

Sort feedback on a miss: each chore has its own message so the feedback always matches the chore (see `retry` in `driftboard-course/app.js`). All follow the tone standard: credit the instinct, explain why the chore belongs in the other bucket, invite another try.

### Round 1: Build (fully guided)
Task: when a course moves to SME review, assign the reviewer and set a due date 2 days out.
Steps: open Automations tab; choose trigger "A task moves to a column" then SME review (menu also offers "A task is created", "A due date arrives"); add Assign to Subject matter expert; add Set due date, 2 days; Run test; click the glossary job aid card and answer why it didn't fire; Save rule.
Sample cards: Admin onboarding course: module 3 (moving to SME review, fires); Quick reference: reports glossary (stays in Draft, no); Integrations deep dive course (stays in Approved, no); Navigating your dashboard (moving to SME review, fires).
Feedback: wrong trigger: "Good thinking, that's a real trigger. It just fires at a different moment. Which event happens when a card lands in SME review?" Why-didn't-it-fire answers: correct = it never moved to SME review; the type/priority distractors get: "Good guess, those are things a rule can look at. This rule has no conditions yet, so it only watches for the move itself. We'll add conditions in the next round."

### Round 2: Refine (scaffolded; Hint button with two levels)
Situation: an existing "Overdue nudge" rule notifies the owner when a due date passes and is noisy.
Steps: run test (3 of 4 fire); select the cards that shouldn't have fired; add **Priority is High**; add **Status is not Published** (conditions all must be true); predict which cards will fire; run test and compare; save.
Sample cards: Getting started video script (SME review, High, overdue): fires before and after. Quick reference: reports glossary (Draft, Low, overdue): fires before, not after (priority). Navigating your dashboard (Published, High, overdue): fires before, not after (status). Admin onboarding course: module 3 (Draft, High, not overdue): never fires.
Feedback: built "Status is Published" by mistake: "Here's what happened: the rule nudged only finished work, which is exactly what that condition asks for. A small change to the wording flips it. Want to try 'is not' and run the test again?" Prediction differs: "Interesting! [Card] stayed quiet because [its tag]. Conditions work as a team, so if one isn't true, the rule waits. Want to run it again and watch?" Prediction correct: "Nice read. Two conditions, and both had to be true."

### Round 3: Build and verify (solo, scored, feedback deferred to the results screen)
Request from the LMS admin: "When a course is approved, I need to know so I can load it into the LMS. Just courses, please. Not videos or job aids. Bonus if you can add a 'Ready to load' label to the card."
Build: trigger a task moves to **Approved**; condition **Type is Course**; action **Notify the LMS admin** (**Add the label "Ready to load"** is an unscored nice-to-have); run the test; diagnose the miss; choose the fix.
Sample cards: Integrations deep dive course (Course, fires); Getting started video script (Video, no, correct); Quick reference: reports glossary (Job aid, no, correct); Admin onboarding course: module 3 (Type blank, no: the miss).
Diagnosis: correct = its Type field is blank, so the condition didn't match (distractors: the trigger is wrong; courses can't use this action). Fix: correct = set the card's Type to Course (distractors: delete the condition; change the trigger to "Task is created").
Scoring (100): correct trigger 20; correct condition 20; notify the LMS admin 20; ran a test before saving 10; correct diagnosis 20; correct fix 10. Passing 70+; learners can try again and their build carries over. The "Ready to load" label is a nice-to-have named in the admin's request and shown on the results screen as "Not scored", because labels aren't practiced in the course.
Results feedback: diagnosis: "It's natural to suspect the trigger first. Here, the trigger did its job. Module 3's Type field was blank, so the condition had nothing to match. Checking the card's details is a great first move next time." Fix: "Deleting the condition would get module 3 through, but videos and job aids would come along too. Filling in the Type fixes the cause without changing what the rule does." Below 70: "You're close. Here's what's worth another look. Try again whenever you're ready, and your build carries over." 70+: "You built it, tested it, and tracked down a tricky miss. Here's your certificate."
Completion: certificate-style screen, "Driftboard Automations: Foundations", marked as a portfolio sample (not an official certification).
Results screen reports feedback by objective (identify, build, refine, verify).

## Brand: Driftboard
- Name: Driftboard (web search found no existing project management product by this name; not a trademark check, do your own search before publishing)
- Palette B, ink and coral: ink `#1F1B2E`, coral `#FF6B4A`, light coral `#FFE1D6`, violet `#7A5CFA`, warm white `#FBF7F5`
- Typography: Plus Jakarta Sans (geometric sans)
- Logo: wave/current mark (a flowing line with a coral dot) plus wordmark

## Still to decide
- Simulated app screens: decided on two, the **board view** (columns with sample cards) and the **rule builder**, which includes the test panel and activity log as sections inside it
Nothing left open before the build begins.

## Build decisions
- No fictional company name (the story says "your education team")
- Technology: plain HTML, CSS, and JS with no build step, in `driftboard-course/`; to be copied to `public/courses/driftboard/` on the portfolio
- Accessibility: WCAG 2.2 AA (full keyboard use, visible focus, screen-reader announcements for feedback, sufficient contrast, reduced-motion support). Sorting and rule building use buttons and menus, not drag-and-drop only.
- Certificate: generic, no name entry, no personal data
- Devices: desktop and tablet (768px and up); phones see a friendly "switch to a larger screen" note

## Release note: cache busting
`index.html` tags every local script and stylesheet with `?v=<version>`. Bump the version string (search for `?v=`) each time you change a file and publish; otherwise browsers and GitHub Pages can serve stale copies of changed files.
