import type { IconName } from './components/Icon3D'
export const profile = {
  name: 'Meagan Jenkins',
  degree: 'M.Ed. in Curriculum & Instruction',
  role: 'Manager, Client Enablement @ SmarterDx',
  location: 'Denver, Colorado',
  email: 'hello@meaganjenkins.work',
  linkedin: 'https://www.linkedin.com/in/meaganrjenkins/',
  startAltitude: 5280,
  summitAltitude: 14265,
}

// Page copy. Wrap a word in *asterisks* to show it in the accent color.
export const copy = {
  nav: [
    ['#/work', 'Work'],
    ['#/tech-stack', 'Tech stack'],
    ['#/about', 'About'],
  ] as [string, string][],
  home: {
    eyebrow: 'Trailhead · Denver, Colorado · 5,280 ft',
    title: 'Building strategy. Designing *learning.* Empowering others.',
    intro:
      'I build customer education programs from scratch, overhaul the ones that are stuck, and stay a little obsessed with whether customers actually succeed. I currently lead Client Enablement at SmarterDx.',
    workLabel: 'See the work',
    aboutLabel: 'About me',
    featuredLabel: 'Featured trails',
    featuredTitle: 'Three featured programs, *built end to end.*',
    featuredIntro: 'Each one started with a blank page and a business problem. Tap a card for the full story.',
    moreLabel: 'More along the ridge',
    moreTitle: 'Courses, videos, guides, *and tools.*',
    moreIntro: 'Samples of the content I design, plus the software I use to build it.',
  },
  work: {
    label: 'Work',
    title: 'Programs, *courses,* and content.',
    intro: 'Start with the case studies for the strategy. The other tabs hold the hands-on work.',
    elearningNote: [
      "Most of the eLearning I've built is training for proprietary software, so it lives behind customer and company logins, and I can't share it publicly. Over the years, that has included role-based courses, learning paths, and assessments built in Articulate 360 and Captivate, for customers, internal teams, and global audiences.",
      "To show how I work today, this is a mock course for a fictional product. Nothing in it comes from a real employer or customer, and I built it using AI as a design and development partner.",
    ],
    tabs: [
      ['cases', 'Case studies'],
      ['elearning', 'eLearning'],
      ['videos', 'Videos'],
      ['help-center', 'Help Center'],
      ['guides', 'Guides'],
    ] as [string, string][],
  },
  tech: {
    label: 'Tech stack',
    title: "What's in the *pack.*",
    intro:
      "Here are a few of the programs I've used, though this list is far from complete. As a lifelong learner with a passion for technology, I find it easy to adapt to new software.",
  },
  about: {
    eyebrow: 'About · Denver, Colorado',
    tagline: ['I build education programs.', 'Then I go outside.'],
    intro: [
      "I'm a leader in education program strategy and development based in Denver, CO. I love building programs from scratch, overhauling existing programs, and being customer-obsessed. I firmly believe in driving customer success through education.",
      'While I have a SERIOUS passion for building education programs, I also love dogs, reading, traveling, skiing, camping, hiking, design, DOGS, good food and drink, and hey, did I mention dogs?',
    ],
    connectLabel: 'Connect with me ↗',
    emailLabel: 'Say hello',
  },
  trail: {
    label: 'Waypoint 01',
    title: "What I do when *nobody's* asking for educational resources.",
    intro: 'Tap a trail sign for the story. Then sit by the fire, which is a legitimate hobby.',
  },
  ask: {
    label: 'Waypoint 02',
    title: 'Ask me *something.*',
    intro: 'The most-asked questions, answered without a meeting.',
  },
  route: {
    label: 'Waypoint 03',
    title: 'The route *so far.*',
    intro: 'From a high school classroom to leading customer education. Tap a camp along the ridge.',
  },
  footer: {
    title: 'Summit reached. *Thanks for the climb.*',
    intro: 'Want to talk education strategy, trails, or which dog is the best dog? (Aside from mine, whichever one is yours.)',
  },
}

export type Slide = {
  src: string
  alt: string
  mode: 'work' | 'fun'
  title: string
  caption: string
  fit: 'cover' | 'contain'
  position: string
}

export const slides: Slide[] = [
  {
    src: 'photos/work.jpg',
    alt: 'Meagan smiling in a bright pink blazer against a light studio background',
    mode: 'work',
    title: 'Work Meagan',
    caption: 'I lead education strategy and program design. But life is too short to be all business all the time.',
    fit: 'cover',
    position: '50% 18%',
  },
  {
    src: 'photos/hike.jpg',
    alt: 'Meagan taking a smiling selfie on a high alpine ridge in a blue hoodie and Broncos trucker hat',
    mode: 'fun',
    title: 'Trail Meagan',
    caption: "Chances are, you'll find me on some kind of trail on the weekend.",
    fit: 'cover',
    position: '22% 50%',
  },
  {
    src: 'photos/dog.jpg',
    alt: 'Meagan sitting on a red rock with a large fluffy white dog, mountains behind them',
    mode: 'fun',
    title: 'Adventure Meagan',
    caption: "Whether it's walking with wolves or dangling from a cliff, I'm always up for an adventure.",
    fit: 'cover',
    position: '50% 50%',
  },
  {
    src: 'photos/halloween.jpg',
    alt: 'Meagan and two friends dressed as the Sanderson Sisters from Hocus Pocus',
    mode: 'fun',
    title: 'Spooky Meagan',
    caption: 'Halloween is my favorite, and I love making my own costumes and props (when I have the time).',
    fit: 'contain',
    position: '50% 50%',
  },
]

export type Sign = { label: string; icon: IconName; blurb: string }

export const signs: Sign[] = [
  { label: 'Hiking', icon: 'boot', blurb: 'My default answer to "what should we do?" Bonus points for a cold beer afterward.' },
  { label: 'Skiing', icon: 'goggles', blurb: 'Living in Colorado helps. Winter is basically a personality trait.' },
  { label: 'Camping', icon: 'tent', blurb: "A tent, a campfire, and about three s'mores too many." },
  { label: 'Disc golf', icon: 'disc', blurb: 'A long walk in the woods with a scorecard and a VERY flexible definition of par.' },
  {
    label: 'Halloween',
    icon: 'pumpkin',
    blurb: 'Year-round enthusiast, October main event. It is also why I have a full sleeve of spooky (and spooky-adjacent) tattoos.',
  },
  { label: 'Dogs', icon: 'dog', blurb: 'Did I mention dogs? I feel like I should mention the dogs. Please send me pics of your dogs ANY time.' },
  { label: 'Fire-staring', icon: 'flame', blurb: 'A legitimate hobby. Wanna join me? Add a log to the fire!' },
]

export const fireMessages = [
  'still watching',
  'is it Tuesday?',
  'one more log',
  'time has no meaning',
  'clocks are a suggestion',
  'just five more minutes',
]

export type Question = { q: string; a: string }

export const questions: Question[] = [
  {
    q: 'What do you do at SmarterDx?',
    a: 'I lead the Client Enablement team (four teammates plus me) who run our customer education programs. We work with Product, Customer Success, Implementation, and Marketing so customers can use the platform with confidence.',
  },
  {
    q: 'How did you get into this?',
    a: 'I started as a high school English teacher (AP Lit and Composition, mostly), moved into EHR training at HCA, and never stopped loving the moment a confusing thing suddenly clicks for someone.',
  },
  {
    q: 'Proudest result?',
    a: 'Building Protenus Academy from scratch: 12% fewer tier 1 tickets and a 29 point NPS lift for trained customers. Close second: launching a full customer LMS at Updater in about three weeks.',
  },
  {
    q: 'Perfect weekend?',
    a: 'Mimosas at the bottom of the mountain before a perfect bluebird day of skiing with friends.',
  },
]

export type Stop = {
  when: string
  role: string
  where: string
  note: string
  camp: string
  elev: number
}

export const route: Stop[] = [
  {
    when: '2011 – 2015',
    role: 'Teacher',
    where: 'Wilson County Schools',
    note: 'AP Literature and Composition, English I through III, and Reading. Four and a half years of learning how to explain hard things.',
    camp: 'Trailhead',
    elev: 4,
  },
  {
    when: '2016',
    role: 'EHR Implementation Trainer',
    where: 'HCA Physician Services Group',
    note: 'Onboarded new hires and taught train-the-trainer courses for EHR implementation analysts.',
    camp: 'First switchback',
    elev: 14,
  },
  {
    when: '2016 – 2018',
    role: 'Instructional Designer I & II',
    where: 'HCA Physician Services Group',
    note: 'Built curricula and e-learning, mentored new instructors, and created a formal education request process.',
    camp: 'Tree line',
    elev: 24,
  },
  {
    when: '2018 – 2020',
    role: 'Training Specialist, then Training Manager',
    where: 'Confirmation',
    note: 'Managed the training team and built a global train-the-trainer certification program. Licensed Scrum Master and Product Owner.',
    camp: 'Ridge walk',
    elev: 36,
  },
  {
    when: '2020 – 2021',
    role: 'Program Manager, CM Group Academy',
    where: 'CM Group',
    note: 'Designed a global training strategy for sales teams across 7 brands in 8 countries.',
    camp: 'Saddle',
    elev: 46,
  },
  {
    when: '2021 – 2023',
    role: 'Customer Education Manager',
    where: 'Protenus',
    note: 'Built the customer education program from the ground up, including Protenus Academy: 12% fewer tier 1 tickets and a 29 point NPS increase.',
    camp: 'Big climb',
    elev: 60,
  },
  {
    when: '2023',
    role: 'Senior Customer Enablement Manager',
    where: 'Updater',
    note: 'Launched HomeSafe Connect Academy: learning paths for ten learner personas across three software products, with an LMS live in about three weeks.',
    camp: 'Fast pitch',
    elev: 68,
  },
  {
    when: '2023 – 2025',
    role: 'Senior Customer Education Manager',
    where: 'Bluesight',
    note: 'Bluesight acquired Protenus in 2025. Also owned Help Center strategy: architecture, governance, and shared ownership.',
    camp: 'Ridge line',
    elev: 78,
  },
  {
    when: '2025',
    role: 'Senior Customer Education Manager',
    where: 'Pluralsight',
    note: 'A short, focused stop on the way up.',
    camp: 'False summit',
    elev: 84,
  },
  {
    when: '2025 – now',
    role: 'Manager, Client Enablement',
    where: 'SmarterDx',
    note: 'Leading a team of four and the client education strategy at SmarterDx.',
    camp: 'Summit Push',
    elev: 94,
  },
]

export const education = [
  { degree: 'M.Ed., Curriculum and Instruction', school: 'Middle Tennessee State University' },
  { degree: 'B.A., English Language and Literature', school: 'Georgia State University' },
]

export const certs = ['Licensed Scrum Master', 'Licensed Product Owner', 'Ntrinsx Certified Trainer', 'Foundations in Customer Education']

export type Picture = { src: string; alt: string; kind: 'logo' | 'shot' | 'art' | 'wide' }

export type CaseStudy = {
  id: string
  image?: Picture
  company: string
  title: string
  stat: string
  statLabel: string
  summary: string
  paragraphs?: string[]
  sections: { heading: string; text?: string; items?: string[] }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'protenus',
    image: { src: 'images/protenus-academy-logo.png', alt: 'Protenus Academy logo', kind: 'logo' },
    company: 'Protenus',
    title: 'Customer Education at Protenus',
    stat: '29 pts',
    statLabel: 'higher NPS for Academy users vs. non-Academy',
    summary: 'Built the customer education program from scratch, including a self-serve Academy.',
    paragraphs: [
      'As the first Customer Education Manager for Protenus, I was tasked with building out the program from scratch. My first order of business was to assess the current state of customer training: how are customers being trained today? What resources are already available to them? What are the most important customer needs that we\u2019re not already addressing? Once I had the answers to those questions, I was able to begin working on a strategy and socialize customer education as a strategic program (not just a series of ad-hoc activities) to other areas of the business.',
    ],
    sections: [
      {
        heading: 'Vision & objectives',
        items: [
          'Faster time to value. The strategy began with helping new customers get up and running in the Protenus platform quickly, often on their own time, using high quality training resources.',
          'Operate at scale. Standing up a self-serve training solution (Protenus Academy) reduced the burden on CSMs and others who were solely responsible for training customers at activation (and beyond).',
          'Build customer loyalty. The strategy also delivered continuing education and just-in-time training to existing customers, with the goal of increasing retention.',
          'Deliver value. A strong education strategy helped the company deliver meaningful value by increasing feature adoption.',
        ],
      },
      {
        heading: 'Program-level metrics',
        items: ['New course enrollments', 'Assessment scores', '# of active users', 'Course completion rate', 'Learner satisfaction scores'],
      },
      {
        heading: 'Business outcomes',
        items: [
          'Reduction/impact on support tickets',
          'Decrease in CX operating costs',
          'Increase in average ARR per CSM',
          'Training to NPS correlation',
          'Customer retention/churn rate',
          '# of customer renewals/upsells',
          'Increase in feature adoption within first 30/60/90 days of rollout',
        ],
      },
      {
        heading: 'Notable results',
        text: 'Implementation of this program resulted in a 12% reduction in Tier 1 support tickets, a 29 point increase in NPS for users in Academy vs. non-Academy, and a 14% reduction in CX operating costs (CSM time saved).',
      },
    ],
  },
  {
    id: 'homesafe',
    image: { src: 'images/homesafe-connect-academy.jpg', alt: 'The HomeSafe Connect Academy home page, showing eight learning paths by learner persona', kind: 'shot' },
    company: 'Updater',
    title: 'Customer Education for HomeSafe Alliance',
    stat: '~3 wks',
    statLabel: 'to launch an MVP program for government personnel',
    summary: 'Launched HomeSafe Connect Academy for everyone on the U.S. Transportation Command household goods contract.',
    paragraphs: [
      'During my time at Updater, I built and launched HomeSafe Connect Academy, the learning platform for everyone involved with the U.S. Transportation Command\u2019s Global Household Goods Contract (GHC), complete with learning paths and comprehensive assessments for each learner persona working with the various HomeSafe Connect software products.',
      'This was a particularly challenging project due to the condensed timeline to launch a full training program for all involved, including designing and implementing the LMS. The full program covers three software products for various stakeholders: transportation service providers and moving companies, US government personnel, and internal and contracted customer support.',
    ],
    sections: [
      {
        heading: 'Notable achievements',
        items: [
          '8 individualized learning paths based on user personas',
          '37 unique courses',
          'Implemented an MVP program for government personnel in about 3 weeks to meet a government deadline, then kept refining and expanding ahead of official launch',
        ],
      },
    ],
  },
  {
    id: 'confirmation',
    image: { src: 'images/confirmation-customer-education.png', alt: 'Illustration of people collaborating around a globe with checkmarks, representing global customer education at Confirmation', kind: 'art' },
    company: 'Confirmation',
    title: 'Customer Education at Confirmation',
    stat: '1.5M',
    statLabel: 'users reached across 170 countries',
    summary: 'Built a global, scalable training strategy with a train-the-trainer certification program.',
    paragraphs: [
      'As the Training Manager for Confirmation, I was responsible for the development of a global, scalable training strategy, including a train-the-trainer certification program.',
      'A major part of developing this program was creating role-based training, both on-demand and 1:many instructor-led sessions, and making it available to a global audience. The on-demand courses and live training materials were offered in English, French, Japanese, German, Portuguese, and Spanish.',
    ],
    sections: [
      {
        heading: 'Impact',
        text: 'The program ultimately reached 1.5 million users at audit firms, banks, law firms, credit firms, and A/R departments across 170 countries.',
      },
    ],
  },
]

export type Course = {
  image?: Picture
  title: string
  company: string
  about: string
  objectivesIntro?: string
  objectives: string[]
  riseUrl?: string // path or link to the hosted course; shows a "View the course" button
}

export const courses: Course[] = [
  {
    title: 'Driftboard Automations: Foundations',
    image: { src: 'images/driftboard-course.jpg', alt: 'The title screen of the Driftboard Automations course, showing the course title, a note that all data is fictional, and a card listing four learning objectives', kind: 'wide' },
    company: 'Portfolio sample',
    about:
      'A mock customer-education course for a fictional project management tool, built to show how I design learning today. Instead of clicking through slides, learners work inside a realistic simulated app: they build an automation rule with a coach beside them, fix a rule that fires too often with hints on request, and then build and troubleshoot one on their own. The final challenge is scored, with feedback on every part, and it ends with a certificate. I designed it with AI as my build partner, aiming for WCAG 2.2 AA accessibility, with warm, safe-to-fail feedback throughout.',
    objectivesIntro: 'By the end, learners can:',
    riseUrl: 'courses/driftboard/index.html',
    objectives: [
      'Spot the repetitive steps that suit automation.',
      'Build a rule from a trigger and actions.',
      'Refine a rule with conditions, so it runs only when it should.',
      'Verify a rule by testing it and working out why it did or didn\u2019t fire.',
    ],
  },
]

export type Video = { title: string; blurb: string; vimeoId?: string } // add a Vimeo ID (the number in the URL) to embed it

export const videos: Video[] = [
  {
    title: 'Master Class Series: The Scope of the Drug Diversion Problem',
    blurb:
      'Created as part of a larger Master Class Series that teaches those involved in drug diversion surveillance how to approach their programs and conduct effective investigations. Showcases AI voiceover to create video content more efficiently.',
    vimeoId: '1056179588',
  },
  { title: 'Elevator Pitch', blurb: 'Designed for internal sales enablement. Covers how to create and deliver an elevator pitch.', vimeoId: '558108506' },
  { title: 'Auditing 101', blurb: 'Created as part of employee onboarding for Confirmation.', vimeoId: '367347314' },
  { title: 'Creating Journeys', blurb: 'Created as part of a contract consulting and design job for Branch Metrics.', vimeoId: '1054815517' },
  { title: 'PANDAS Habitat', blurb: 'Introduced the launch of the Protenus customer community platform.', vimeoId: '1055013644' },
]

// Help Center tab on the Work page. Numbers are approximate and "since launch" (still in its first year).
export const helpCenter = {
  company: 'SmarterDx',
  title: 'Designing the SmarterDx Help Center',
  intro:
    'The SmarterDx Help Center is the single source of truth for product documentation, release notes, and support across the SmarterDx platform. I designed and built it from the ground up in Zendesk, primarily for clients, though it has also become an essential resource for the internal teams who support them.',
  homeImage: {
    src: 'images/helpcenter-smarterdx-home.jpg',
    alt: 'The SmarterDx Help Center home page: a "How can we help?" search box above six product cards for SmarterDx, SmarterPrebill, SmarterDenials, SmarterCharges, SmarterNotes, and SmarterUtilization',
    kind: 'shot',
  } as Picture,
  stats: [
    ['~2,300', 'ticket deflections'],
    ['~5,500', 'page views'],
    ['~2,400', 'unique sessions'],
  ] as [string, string][],
  statsNote: '* Approximate figures since launch. The help center is still in its first year.',
  sections: [
    {
      heading: 'The problem',
      items: [
        'Product documentation was scattered, and clients had no evergreen resource to turn to.',
        'CSMs, Support, and Implementation often sent static PDF files as documentation, and those quickly went out of date.',
        'When clients had a question, they had to reach out to their CSM or the Support team and wait for a response.',
      ],
    },
    {
      heading: 'The goals',
      items: [
        'One up-to-date source for product documentation, for clients and internal teams alike.',
        'Self-serve answers and how-to articles that clients can find quickly and easily.',
        'One place for clients to submit and track support tickets, and to CC teammates so they stay informed.',
      ],
    },
    {
      heading: 'Information architecture',
      text: 'Content is organized by product first. Inside each product, articles follow the user’s journey: Getting started, Key workflows, Advanced workflows, and Troubleshooting and FAQs, alongside sections for metrics and product releases.',
    },
    {
      heading: 'Style guide and templates',
      text: 'With the lead documentation specialist on my team, I developed a style guide for product documentation and training. We used the SmarterDx marketing guide as a base and adapted it where product documentation needed something more specific. We also built two article templates: one for standard articles and one for product releases.',
    },
    {
      heading: 'Content governance',
      text: 'We built a content governance framework with a full review and approval process and a regular review cadence, so articles stay accurate as the products change.',
    },
    {
      heading: 'A fully custom theme',
      text: 'I designed and developed a fully custom Zendesk theme with the help of AI-assisted coding tools. The theme code is maintained in GitHub and connected directly to Zendesk, so publishing an update takes a single refresh in Zendesk.',
    },
  ] as { heading: string; text?: string; items?: string[] }[],
  structureImage: {
    src: 'images/helpcenter-smarterdx-category.jpg',
    alt: 'The SmarterPrebill category page, with article groups for Getting started, Key workflows, Advanced workflows, Troubleshooting and FAQs, Metrics, and product releases split into recent and past releases',
    kind: 'shot',
  } as Picture,
  structureCaption: 'A product category page. Each product follows the same structure, so clients always know where to look.',
  results:
    'Since launch, the help center has deflected about 2,300 tickets and drawn about 5,500 page views across roughly 2,400 unique sessions. Three of the top five articles are product release notes or articles about brand-new features, so clients are coming back to stay current, not only to troubleshoot.',}

export type Guide = { title: string; company: string; blurb: string; url: string; thumb: string }

// url is the PDF (in public/guides), thumb is a preview of its first page (in public/images).
export const guides: Guide[] = [
  {
    title: 'When to Contact Protenus',
    company: 'Protenus Help Center',
    blurb: 'A help center article that tells customers whether to contact Support or their CSM, with tips for submitting a great support ticket.',
    url: 'guides/when-to-contact-protenus.pdf',
    thumb: 'images/guide-when-to-contact-protenus.jpg',
  },
  {
    title: 'Client Authorization Instructions',
    company: 'Confirmation',
    blurb: 'A step-by-step quick reference that walks clients through providing authorization, including uploading a signature.',
    url: 'guides/client-authorization.pdf',
    thumb: 'images/guide-client-authorization.jpg',
  },
]

export const techStack: { group: string; icon: IconName; note?: string; items: string[] }[] = [
  {
    group: 'Content design',
    icon: 'compass',
    items: [
      'Articulate 360 (e-learning design)',
      'Captivate (e-learning design)',
      'Camtasia (videos)',
      'Canva (general design)',
      'Adobe programs (general design)',
      'Snagit (screenshots)',
    ],
  },
  {
    group: 'AI & building tools',
    icon: 'robot',
    note: "Full disclosure: I'm not a coder. But I know exactly how to ask AI tools to do it for me, and I'm pretty good at telling them when they got it wrong. (This site is proof.)",
    items: ['Claude', 'ChatGPT', 'Cursor', 'GitHub', 'WellSaid Labs (AI voiceover)', 'ElevenLabs (AI voiceover)'],
  },
  {
    group: 'Learning management',
    icon: 'cap',
    items: ['Skilljar', 'Northpass', 'Thinkific', 'Docebo', 'MindTickle', 'HealthStream', 'Brainshark'],
  },
  {
    group: 'Other tools',
    icon: 'techstack',
    items: ['G Suite', 'HubSpot', 'Asana', 'ChurnZero', 'Confluence', 'Freshdesk', 'Microsoft apps', 'Jira', 'Notion', 'Pendo', 'Salesforce', 'Tableau', 'Zendesk'],
  },
]
