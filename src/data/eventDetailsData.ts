// Rich event metadata for /events/[event] detail pages.
// Slugs match Events.astro link map. Cassette images live in /public/events/.
// Data sourced from public ACM-VIT event archives, devfolio/unstop pages, and
// community social posts. Fill placeholders with deep-research data later.

export type EventStat = { value: string; label: string };
export type EventTrack = { name: string; description: string };
export type EventScheduleItem = { time: string; title: string; description?: string };
export type EventFaq = { q: string; a: string };
export type EventPrize = { place: string; value: string; note?: string };
export type EventHighlight = { year: string; title: string; description: string };
export type EventSponsor = {
  name: string;
  tier?: string;
  logo?: string;
};
export type EventEditionLink = { label: string; href: string };
export type EventPastEdition = {
  year: string;
  edition: string;
  description: string;
  links?: EventEditionLink[];
  collectibles?: EventCollectibleItem[];
  sponsors?: EventSponsor[];
};
export type EventCollectibleItem = {
  name: string;
  image?: string;
  desc?: string;
};
export type EventCollectibleYear = {
  year: string;
  items: EventCollectibleItem[];
};

export interface EventDetail {
  slug: string;
  title: string;
  tagline: string;
  eyebrow: string;
  themeKey: "tech" | "cc" | "design" | "research" | "management" | "brand";
  cassetteSvg: string;
  shortDescription: string;
  longDescription: string[];
  format: string;
  duration: string;
  mode: "Offline" | "Online" | "Hybrid";
  audience: string;
  team: string;
  organizedBy: string;
  firstHeld?: string;
  recurrence: string;
  registrationUrl: string;
  primaryCtaLabel: string;
  stats: EventStat[];
  tracks: EventTrack[];
  schedule: EventScheduleItem[];
  prizes: EventPrize[];
  highlights: EventHighlight[];
  perks: string[];
  faq: EventFaq[];
  socials?: { label: string; href: string }[];
  pastEditions?: EventPastEdition[];
  collectibles?: EventCollectibleYear[];
  instagramHandle?: string;
  isAcmW?: boolean;
  hideCtaBanner?: boolean;
  themeColor?: string;
  themeColorSecondary?: string;
  speaker?: {
    name: string;
    role: string;
    institution: string;
    image: string;
    bio: string[];
    profileUrl?: string;
  };
}

const themeHex: Record<EventDetail["themeKey"], string> = {
  tech: "#9B51E0",
  cc: "#42CD9D",
  design: "#FF0054",
  research: "#135DE2",
  management: "#008080",
  brand: "#F95F4A",
};

export function getEventThemeHex(key: EventDetail["themeKey"]): string {
  return themeHex[key] ?? "#F95F4A";
}

export const eventDetails: Record<string, EventDetail> = {
  apptitude: {
    slug: "apptitude",
    title: "Apptitude",
    tagline: "Put your App on the Map.",
    eyebrow: "ACM-VIT · National App Development Hackathon",
    themeKey: "tech",
    themeColor: "#D4A341",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-apptitude-cassette.svg",
    shortDescription:
      "Apptitude is ACM-VIT's national-level app development hackathon designed to encourage students to build innovative mobile applications that solve real-world problems. Free registration, 36 hours, open to all.",
    longDescription: [
      "Apptitude is ACM-VIT's national-level app development hackathon designed to encourage students to build innovative mobile applications that solve real-world problems. The event welcomes both beginners and experienced developers, providing participants with an opportunity to learn, collaborate, and create an application from scratch within a 36-hour hacking period.",
      "The hackathon revolves around solving real-world problems using mobile applications. Participants choose one of the United Nations Sustainable Development Goals as their problem domain: Industry, Innovation and Infrastructure; Quality Education; Good Health and Well-being; or Climate Action.",
      "The event had a dedicated Android and iOS app for participants. Registration was completely free, with the landing page initially collecting RSVPs through an email-based system before full registration opened. Cross-college teams are allowed, and participants without teammates can find partners through the event Discord server.",
    ],
    format: "Virtual · 36-hour app development hackathon",
    duration: "36 hours",
    mode: "Online",
    audience: "Students from colleges across India - no prior app dev experience required",
    team: "Teams of 1 to 2",
    organizedBy: "ACM-VIT",
    firstHeld: "2018",
    recurrence: "Annual",
    registrationUrl: "https://apptitude.acmvit.in",
    primaryCtaLabel: "Visit apptitude.acmvit.in",
    stats: [
      { value: "36h", label: "Build Window" },
      { value: "Free", label: "Registration" },
    ],
    tracks: [
      { name: "Industry, Innovation and Infrastructure", description: "UN SDG 9 - build apps for resilient infrastructure and sustainable industrialisation." },
      { name: "Quality Education", description: "UN SDG 4 - apps that improve access to inclusive, equitable education." },
      { name: "Good Health and Well-being", description: "UN SDG 3 - mobile solutions for healthcare and wellness." },
      { name: "Climate Action", description: "UN SDG 13 - apps that address climate change and its impacts." },
    ],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Free registration",
      "Dedicated Android and iOS app for the event",
      "Mentors and speaker sessions",
      "Discord server for team formation",
    ],
    faq: [
      { q: "Do I need prior app development experience?", a: "No. Beginners are encouraged to participate." },
      { q: "Can I form a cross-college team?", a: "Yes. Cross-college teams are allowed. You can also find partners on the event Discord server." },
      { q: "Is there a registration fee?", a: "No. Registration is completely free." },
      { q: "What do I need to submit?", a: "Original work built during the official 36-hour hackathon. Previously completed projects are not allowed." },
    ],
    socials: [
      { label: "Website", href: "https://apptitude.acmvit.in" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  code2create: {
    slug: "code2create",
    title: "Code2Create",
    tagline: "Don't just code for the vibes, Code2Create.",
    eyebrow: "ACM-VIT · ACM-W · Flagship Hackathon",
    themeKey: "brand",
    themeColor: "#4AB887",
    cassetteSvg: "/events/events-c2c-cassette.svg",
    shortDescription:
      "Code2Create (C2C) is ACM-VIT's flagship hackathon. First conducted in 2017 and now six editions deep, it has grown into a national platform for builders from across India to ship real solutions to real problems.",
    longDescription: [
      "Code2Create is one of the oldest and most prestigious student-run hackathons at VIT. The first edition went up in 2017 and the event has run six editions to date, becoming a national platform that brings together developers, designers and entrepreneurs from colleges across the country to build impactful solutions to real-world problems.",
      "Today C2C is recognised as one of ACM-VIT's premier events. The most recent edition, Code2Create 6.0 in 2025, received over 2,300 total registrations including 200+ external registrations from institutions across India, making it the largest edition in the event's history. Participants compete across multiple innovation tracks while interacting with mentors, industry professionals, and distinguished speakers.",
      "Across its journey C2C has served as a launchpad for hundreds of student projects, giving participants 48 hours to transform an idea into a working product. Supported by leading technology companies and industry partners, the event consistently encourages creativity, problem solving, and engineering excellence, while fostering a vibrant developer community at VIT and beyond.",
      "Code2Create runs under ACM-W's umbrella as part of the chapter's commitment to championing more women in STEM. Each edition raises the bar and strengthens its legacy as one of the most anticipated student hackathons hosted by the university.",
      "For the latest updates on upcoming editions, follow @c2c.acmvit and @acmvit on Instagram.",
    ],
    format: "Offline · Multi-track flagship hackathon",
    duration: "48 hours",
    mode: "Offline",
    audience: "Undergraduate students across India",
    team: "Teams of 2 to 4",
    organizedBy: "ACM-VIT · ACM-W · Cross-domain",
    firstHeld: "2017",
    recurrence: "Annual flagship · 6 editions to date",
    registrationUrl: "https://c2c.acmvit.in",
    primaryCtaLabel: "Visit c2c.acmvit.in",
    stats: [
      { value: "6", label: "Editions" },
      { value: "48h", label: "Per Edition" },
      { value: "5000+", label: "Past Participants" },
      { value: "30+", label: "Sponsors To Date" },
    ],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    isAcmW: true,
    instagramHandle: "c2c.acmvit",
    socials: [
      { label: "Instagram · @c2c.acmvit", href: "https://instagram.com/c2c.acmvit" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
      { label: "Website", href: "https://c2c.acmvit.in" },
    ],
    pastEditions: [
      {
        year: "2025",
        edition: "Code2Create 6.0",
        description: "Largest edition to date. 2,300+ total registrations including 200+ external sign-ups from institutions across India, run as a multi-track innovation hackathon with mentors and industry partners on the floor.",
        links: [
          { label: "Website", href: "https://c2c.acmvit.in" },
          { label: "@c2c.acmvit", href: "https://instagram.com/c2c.acmvit" },
        ],
        collectibles: [
          { name: "C2C 6.0 Sticker - Variant 1", image: "/events/c2c/events-c2c-sticker-1.webp", desc: "First sticker variant from the 2025 edition." },
          { name: "C2C 6.0 Sticker - Variant 2", image: "/events/c2c/events-c2c-sticker-2.webp", desc: "Second sticker variant from the 2025 edition." },
          { name: "RunPod Credits", desc: "USD 25 in compute credits from RunPod for every participant." },
          { name: "ElevenLabs Credits", desc: "USD 50 in API credits from ElevenLabs for every participant." },
        ],
        sponsors: [
          { name: "RunPod", tier: "Platinum", logo: "/events/c2c/sponsors/events-c2c-sponsors-runpod.svg" },
          { name: "ElevenLabs", tier: "Gold", logo: "/events/c2c/sponsors/events-c2c-sponsors-elevenlabs.svg" },
        ],
      },
      {
        year: "2021",
        edition: "Code2Create 5.0",
        description: "First fully online edition during the pandemic. Virtual judging, Discord-based mentor rooms, and a sponsor pool that broadened C2C's national reach across colleges.",
        collectibles: [
          { name: "ACM-VIT Schwag Kit", desc: "Chapter merch and curated swag for every participant." },
          { name: "Patron Stickers", desc: "Sticker pack from the edition's industry patrons." },
        ],
        sponsors: [
          { name: "Meribachat", tier: "Gold", logo: "/events/c2c/sponsors/events-c2c-sponsors-meribachat.svg" },
          { name: "Mcwitties", tier: "Silver", logo: "/events/c2c/sponsors/events-c2c-sponsors-mcwitties.svg" },
          { name: "Capital Inc.", tier: "Silver", logo: "/events/c2c/sponsors/events-c2c-sponsors-capitalinc.svg" },
          { name: "Skill Oxide", tier: "Silver", logo: "/events/c2c/sponsors/events-c2c-sponsors-skilloxide.svg" },
          { name: "OneDrop", tier: "Silver", logo: "/events/c2c/sponsors/events-c2c-sponsors-onedrop.svg" },
          { name: "GitHub", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-github.svg" },
          { name: "Sashido", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-sashido.svg" },
          { name: "Wolfram Language", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-wolframlanguage.svg" },
          { name: "Balsamiq", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-balsamiq.svg" },
          { name: "Replit", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-replit.svg" },
          { name: "Taskade", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-taskade.svg" },
          { name: "O'Reilly", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-oreilly.svg" },
          { name: "Bilda", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-bilda.svg" },
          { name: "Sticker Mule", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-stickermule.svg" },
          { name: "EchoAR", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-echoar.svg" },
          { name: "Axure", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-axure.svg" },
          { name: "Egghead.io", tier: "Sponsor" },
          { name: "C4 Projects", tier: "Mentoring Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-c4projects.svg" },
          { name: "Zuddl", tier: "Portal Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-zuddl.svg" },
        ],
      },
      {
        year: "2020",
        edition: "Code2Create 4.0",
        description: "Offline edition held on campus with an expanded sponsor roster and mentor pool. Strongest industry partner lineup of any edition to that point.",
        collectibles: [
          { name: "Digital Schwag Pack", desc: "Online edition schwag delivered digitally to all participants." },
          { name: "Patron Stickers", desc: "Sticker pack from sponsoring patrons of the edition." },
        ],
        sponsors: [
          { name: "JetBrains", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-jetbrains.svg" },
          { name: "DigitalOcean", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-digitalocean.svg" },
          { name: "Slack", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-slack.svg" },
          { name: "CloudSploit", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-cloudsploit.svg" },
          { name: "GeeksforGeeks", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-geeksforgeeks.svg" },
          { name: "Wolfram Alpha", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-wolframalpha.svg" },
          { name: "Coding Blocks", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-codingblocks.svg" },
          { name: "Axure", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-axure.svg" },
          { name: "Rosenfeld", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-rosenfeld.svg" },
          { name: "GitHub", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-github.svg" },
          { name: "Devfolio", tier: "Platinum Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-devfolio.svg" },
          { name: "Fold", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-fold.svg" },
          { name: "Matic", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-matic.svg" },
        ],
      },
      {
        year: "2019",
        edition: "Code2Create 3.0",
        description: "Largest pre-pandemic edition, with industry mentors from across Bangalore and Mumbai and the most diverse sponsor roster in C2C history at the time.",
        collectibles: [
          { name: "ACM-VIT Schwag Kit", desc: "Chapter merch and curated swag for every participant." },
          { name: "Patron Stickers", desc: "Sticker pack from the edition's industry patrons." },
        ],
        sponsors: [
          { name: "GitHub", tier: "Title Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-github.svg" },
          { name: "HackerEarth", tier: "Platform Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-hackerearth.svg" },
          { name: "Indriya Construction Company", tier: "Platinum Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-indriya.svg" },
          { name: "DigitalOcean", tier: "Cloud Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-digitalocean.svg" },
          { name: "IBM", tier: "Innovation Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-ibm.svg" },
          { name: "Hasura", tier: "Innovation Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-hasura.svg" },
          { name: "Coding Blocks", tier: "Learning Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-codingblocks.svg" },
          { name: "AnitaB.org", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-anitab.svg" },
          { name: "Axure RP", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-axure.svg" },
          { name: "Bugsee", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-bugsee.svg" },
          { name: "CloudSploit", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-cloudsploit.svg" },
          { name: "InVision", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-invision.svg" },
          { name: "Jenkins", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-jenkins.svg" },
          { name: "JetBrains", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-jetbrains.svg" },
          { name: "Sketch", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-sketch.svg" },
          { name: "Slang Labs", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-slanglabs.svg" },
          { name: "Shift", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-shift.svg" },
          { name: "Sticker Mule", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-stickermule.svg" },
          { name: "Taskade", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-taskade.svg" },
          { name: "TTA", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-tta.svg" },
          { name: ".Tech Domains", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-techdomains.svg" },
          { name: "Wolfram Language", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-wolframlanguage.svg" },
        ],
      },
      {
        year: "2018",
        edition: "Code2Create 2.0",
        description: "Second edition, expanding tracks, sponsors, and on-campus participation. Built the foundation for C2C becoming a national flagship.",
        collectibles: [
          { name: "ACM-VIT Schwag Kit", desc: "Chapter merch and curated swag for every participant." },
          { name: "Patron Stickers", desc: "Sticker pack from the edition's industry patrons." },
        ],
        sponsors: [
          { name: "JSP Projects Pvt. Ltd.", tier: "Gold Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-jsp.svg" },
          { name: "Balsamiq", tier: "Silver Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-balsamiq.svg" },
          { name: "GitLab", tier: "Diversity Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-gitlab.svg" },
          { name: "Iconscout", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-iconscout.svg" },
          { name: "Slack", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-slack.svg" },
          { name: "Twilio", tier: "Patron", logo: "/events/c2c/sponsors/events-c2c-sponsors-twilio.svg" },
          { name: "Zulip", tier: "Chat Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-zulip.svg" },
          { name: "Custom Baba", tier: "Merchandise Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-custombaba.svg" },
          { name: "Ozonetel", tier: "Cloud Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-ozonetel.svg" },
          { name: "GeeksforGeeks", tier: "Coding Partner", logo: "/events/c2c/sponsors/events-c2c-sponsors-geeksforgeeks.svg" },
          { name: "npm", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-npm.svg" },
          { name: "Product Hunt", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-producthunt.svg" },
          { name: "Zeplin", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-zeplin.svg" },
          { name: "Travis CI", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-travisci.svg" },
          { name: "Docker", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-docker.svg" },
        ],
      },
      {
        year: "2017",
        edition: "Code2Create 1.0",
        description: "The inaugural edition. Campus-first hackathon that laid the foundation for everything that followed.",
        collectibles: [
          { name: "ACM-VIT Schwag Kit", desc: "Chapter merch and curated swag for every participant." },
          { name: "Patron Stickers", desc: "Sticker pack from the inaugural edition's patrons." },
        ],
        sponsors: [
          { name: "Transitus", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-transitus.svg" },
          { name: "Tricentis", tier: "Sponsor", logo: "/events/c2c/sponsors/events-c2c-sponsors-tricentis.svg" },
        ],
      },
    ],
  },

  codart: {
    slug: "codart",
    title: "Codart",
    tagline: "Code meets darts. Aim well, code better.",
    eyebrow: "ACM-VIT · Competitive Coding + Darts",
    themeKey: "cc",
    themeColor: "#F06465",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-codart-cassette.svg",
    shortDescription:
      "Codart is a standout ACM-VIT event combining competitive programming with dart throwing. You don't just need accuracy with your coding skills - you need aiming skills too.",
    longDescription: [
      "Codart is one of ACM-VIT's most popular events - a perfect amalgamation of coding and fun. As the name suggests, there's a twist: you don't need accuracy just with your coding skills but even your aiming skills.",
      "The event consisted of two rounds. The first was an online round on HackerEarth, featuring multiple levels like Rush Hour, Volatile Round, and Slip N Tweet. The second round was offline - and that's where the fun began. Participants threw darts, and the better the aim, the easier the coding question they received.",
      "When the dart was thrown, the problem would pop up on the coder's screen through a custom portal created especially for Codart. It was then up to the coder to skillfully hustle through the problem, and the one with the most problems solved won.",
      "Codart started with 120 participants in 2016 and grew massively, breaking VIT's records by 2018 with over 200 teams. It singlehandedly transformed codathons forever. Last conducted in 2019.",
    ],
    format: "Hybrid · Online coding round + offline dart-throwing finale",
    duration: "Multi-round",
    mode: "Hybrid",
    audience: "All undergraduate students",
    team: "Individual",
    organizedBy: "ACM-VIT · Competitive Coding Domain",
    firstHeld: "2016",
    recurrence: "Last conducted in 2019",
    registrationUrl: "https://acmvit.in/events",
    primaryCtaLabel: "Learn More",
    stats: [
      { value: "200+", label: "Teams (2018)" },
      { value: "120", label: "Participants (2016)" },
    ],
    tracks: [],
    schedule: [
      { time: "Round 1", title: "Online Round on HackerEarth", description: "Multiple levels: Rush Hour, Volatile Round, Slip N Tweet." },
      { time: "Round 2", title: "Offline Finale", description: "Three dart throws decide the difficulty of your coding challenge." },
    ],
    prizes: [],
    highlights: [],
    perks: [
      "Custom portal built for the dart-to-code experience",
      "Unique format combining physical skill with coding",
    ],
    faq: [
      { q: "How do darts affect the coding challenge?", a: "The better your aim, the easier the problem. Your dart throw determines the difficulty of the question that appears on screen." },
      { q: "What platform was the online round on?", a: "HackerEarth." },
    ],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  "code-plus-plus": {
    slug: "code-plus-plus",
    title: "Code Plus Plus",
    tagline: "Think Fast, Code Faster!",
    eyebrow: "ACM-VIT · Competitive Coding",
    themeKey: "cc",
    themeColor: "#FF007A",
    themeColorSecondary: "#7F30FF",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-code-plusplus-cassette.svg",
    shortDescription:
      "Code Plus Plus (Code++) is ACM-VIT's annual competitive coding competition that challenges an individual's mathematical prowess and logical thinking skills. Open to everyone - from absolute beginners to seasoned professionals.",
    longDescription: [
      "Code Plus Plus is ACM-VIT's competitive coding competition held on HackerRank. The event is a four-hour contest in which participants are awarded points based on the number of test cases they can pass successfully.",
      "Participation is open for all - there is something for everyone, from absolute beginners to seasoned professionals. There are no restrictions on programming languages, so participants can use whatever they're most comfortable with.",
      "It is a valuable opportunity to recognise and develop one's true potential in competitive coding.",
    ],
    format: "Online · 4-hour contest on HackerRank",
    duration: "4 hours",
    mode: "Online",
    audience: "Open for all - beginners to professionals",
    team: "Individual",
    organizedBy: "ACM-VIT · Competitive Coding Domain",
    firstHeld: "2022",
    recurrence: "1 edition to date",
    registrationUrl: "https://codeplusplus.acmvit.in",
    primaryCtaLabel: "Visit codeplusplus.acmvit.in",
    stats: [
      { value: "1", label: "Edition" },
      { value: "4h", label: "Contest Window" },
    ],
    tracks: [],
    schedule: [
      { time: "2:00 PM", title: "Contest Begins", description: "Problems go live on HackerRank." },
      { time: "6:00 PM", title: "Contest Ends" },
    ],
    prizes: [],
    highlights: [],
    perks: [
      "No language restrictions",
      "Open to all skill levels",
      "Discord server for questions and support",
    ],
    faq: [
      { q: "Where will Code Plus Plus be held?", a: "Code Plus Plus is held on HackerRank." },
      { q: "What programming languages can be used?", a: "There are no restrictions on the programming languages that can be used to solve the problems." },
      { q: "Who all can participate?", a: "Participation is open for all - from absolute beginners to seasoned professionals." },
    ],
    socials: [
      { label: "Website", href: "https://codeplusplus.acmvit.in" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
    pastEditions: [
      {
        year: "2022",
        edition: "Code Plus Plus 1.0",
        description: "Inaugural edition held on 3rd July 2022 (Sunday), 2:00 PM to 6:00 PM IST on HackerRank. A four-hour competitive coding contest open to all skill levels.",
      },
    ],
  },

  "codex-cryptum": {
    slug: "codex-cryptum",
    title: "Codex Cryptum",
    tagline: "Beyond the Obvious",
    eyebrow: "ACM-VIT · Cybersecurity Workshop",
    themeKey: "cc",
    themeColor: "#FF7A01",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-codex-cryptum-cassette.svg",
    shortDescription:
      "Codex Cryptum is ACM-VIT's cybersecurity workshop series where students learn the basics of cybersecurity, exploits, cryptography, and digital forensics - the perfect preparation for Cryptic Hunt.",
    longDescription: [
      "Codex Cryptum is ACM-VIT's hands-on cybersecurity workshop designed to equip students with the fundamentals of cybersecurity. Across its four editions, participants have learned about exploits, cryptography, steganography, web security, and digital forensics from experienced mentors.",
      "The workshop grew out of Cryptic Hunt's ecosystem - as the scavenger hunt gained popularity, ACM-VIT recognized the need for a structured learning path that would help participants build the skills to tackle Cryptic Hunt's increasingly complex challenges. Codex Cryptum became that bridge, teaching the techniques behind the puzzles.",
      "From classical ciphers and encoding schemes to web exploitation and OSINT, Codex Cryptum covers the building blocks that make someone a stronger puzzle solver and a more security-aware developer. It's a natural stepping stone into both Cryptic Hunt and the broader cybersecurity community at VIT.",
    ],
    format: "Workshop · Hands-on cybersecurity sessions",
    duration: "1 day",
    mode: "Hybrid",
    audience: "All undergraduate students - no prior security background needed",
    team: "Individual",
    organizedBy: "ACM-VIT · Cross-domain",
    firstHeld: "2021",
    recurrence: "Annual · Fall semester",
    registrationUrl: "https://codexcryptum.acmvit.in",
    primaryCtaLabel: "Visit codexcryptum.acmvit.in",
    stats: [
      { value: "4", label: "Editions" },
    ],
    tracks: [
      { name: "Cryptography", description: "Classical ciphers, encoding schemes, hash functions, and cryptanalysis basics." },
      { name: "Web Security", description: "Common web vulnerabilities, OWASP basics, and hands-on exploit walkthroughs." },
      { name: "Steganography & Forensics", description: "Hidden data in images, audio, and files - the skills behind Cryptic Hunt's toughest puzzles." },
      { name: "OSINT", description: "Open-source intelligence gathering, web sleuthing, and digital footprint analysis." },
    ],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Hands-on exercises with guided walkthroughs",
      "Direct preparation for Cryptic Hunt challenges",
      "Pathway into ACM-VIT's security study groups",
    ],
    faq: [
      { q: "Do I need prior cybersecurity background?", a: "No. Codex Cryptum starts from the basics and builds up." },
      { q: "Is this related to Cryptic Hunt?", a: "Yes - Codex Cryptum was created as a learning path to help participants build the skills needed for Cryptic Hunt." },
    ],
    instagramHandle: "acmvit",
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
      { label: "Website", href: "https://codexcryptum.acmvit.in" },
    ],
    pastEditions: [
      {
        year: "2025",
        edition: "Codex Cryptum 4.0",
        description: "Fourth edition, continuing to build the cybersecurity learning pipeline at VIT.",
      },
      {
        year: "2024",
        edition: "Codex Cryptum 3.0",
        description: "Third edition held during Gravitas 2024, expanding the workshop's scope and reach.",
        links: [
          { label: "Portal", href: "https://codexcryptum.acmvit.in" },
        ],
      },
      {
        year: "2023",
        edition: "Codex Cryptum 2.0",
        description: "Second edition, returning in-person with expanded topics and hands-on labs.",
      },
      {
        year: "2021",
        edition: "Codex Cryptum 1.0",
        description: "The inaugural edition, conducted online. Laid the foundation for ACM-VIT's cybersecurity workshop series.",
      },
    ],
  },

  "cryptic-hunt": {
    slug: "cryptic-hunt",
    title: "Cryptic Hunt",
    tagline: "Expect the Unexpected",
    eyebrow: "ACM-VIT · Campus Scavenger Hunt",
    themeKey: "cc",
    themeColor: "#F5753B",
    cassetteSvg: "/events/events-cryptic-hunt-cassette.svg",
    shortDescription:
      "Cryptic Hunt is ACM-VIT's flagship scavenger hunt - a 36-hour campus-wide adventure where teams decode multi-layered clues, scan QR codes, and race across VIT Vellore to top the leaderboard.",
    longDescription: [
      "Cryptic Hunt is a campus-wide scavenger hunt packed with riddles, QR codes, and hidden clues scattered across VIT Vellore. Teams of 2 to 5 race against the clock over 36 hours, solving puzzles that blend lateral thinking, internet sleuthing, steganography, and physical exploration of the campus.",
      "The entire hunt runs through a custom-built app developed by ACM-VIT, available on both Android and iOS. Every clue, submission, and leaderboard update happens in real time through the app, making it a seamless mobile-first experience from start to finish.",
      "Since its debut in 2022, Cryptic Hunt has grown into one of the most anticipated events on the VIT calendar. With 2,700+ participants across four editions, it has become a tradition that brings together puzzle enthusiasts, curious explorers, and competitive teams every fall semester.",
      "What sets Cryptic Hunt apart is its blend of digital and physical. You're not just sitting at a laptop - you're running across campus, scanning hidden QR codes behind buildings, decoding ciphers in the library, and piecing together clues that span the real and the virtual.",
      "For the latest updates, follow @acmvit on Instagram and visit cryptichunt.acmvit.in.",
    ],
    format: "Offline · Campus scavenger hunt via mobile app",
    duration: "36 hours",
    mode: "Offline",
    audience: "All VIT students",
    team: "Teams of 2 to 5",
    organizedBy: "ACM-VIT · Cross-domain",
    firstHeld: "2022",
    recurrence: "Annual · Fall semester",
    registrationUrl: "https://cryptichunt.acmvit.in",
    primaryCtaLabel: "Visit cryptichunt.acmvit.in",
    hideCtaBanner: true,
    stats: [
      { value: "4", label: "Editions" },
      { value: "36h", label: "Per Edition" },
      { value: "2700+", label: "Past Participants" },
      { value: "App", label: "Android & iOS" },
    ],
    tracks: [
      { name: "Lateral Thinking", description: "Wordplay, riddles, cryptic crosswords, lateral logic puzzles." },
      { name: "Campus Exploration", description: "QR codes, physical clues, and hidden markers scattered across VIT Vellore." },
      { name: "Steganography", description: "Hidden data in images, audio spectrograms, and encoded files." },
      { name: "Web Sleuthing", description: "URL surgery, view-source, image EXIF, deep-Google." },
    ],
    schedule: [
      { time: "T-0", title: "Hunt Opens", description: "First clues drop on the Cryptic Hunt app." },
      { time: "T+12h", title: "Mid-hunt Checkpoint" },
      { time: "T+24h", title: "Final Stretch" },
      { time: "T+36h", title: "Hunt Closes + Results" },
    ],
    prizes: [
      { place: "1st Team", value: "Cash + ACM-VIT custom merch" },
      { place: "2nd & 3rd", value: "Cash + swag kit" },
      { place: "Fastest Solve Bounties", value: "Special prizes for first-to-crack milestones" },
    ],
    highlights: [],
    perks: [
      "Custom mobile app experience on Android & iOS",
      "Real-time leaderboard and hint system",
      "Full solution walkthroughs released post-event",
      "Custom merch and stickers for participants",
    ],
    faq: [
      { q: "Do I need to be on campus?", a: "Yes. Cryptic Hunt is a physical scavenger hunt across VIT Vellore campus." },
      { q: "Do I need to download an app?", a: "Yes. The hunt runs entirely through the Cryptic Hunt app, available on both Android and iOS." },
      { q: "What's a good team size?", a: "3 to 4 is the sweet spot - enough coverage to split up and explore while staying coordinated." },
    ],
    instagramHandle: "acmvit",
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
      { label: "Website", href: "https://cryptichunt.acmvit.in" },
    ],
    pastEditions: [
      {
        year: "2025",
        edition: "Cryptic Hunt 4.0",
        description: "Largest edition yet, featuring refined app experience, new puzzle mechanics, and collectible stickers for participants. Sponsored by Hey Hoku.",
        links: [
          { label: "Website", href: "https://cryptichunt.acmvit.in" },
          { label: "Solutions", href: "https://github.com/ACM-VIT/Cryptic-Hunt-Solutions-2025" },
        ],
        collectibles: [
          { name: "CH Espresso Sticker", image: "/events/cryptic-hunt/events-cryptic-hunt-ch-espresso.webp", desc: "Limited-edition Cryptic Hunt sticker from the 2025 edition." },
          { name: "CH Timeless Sticker", image: "/events/cryptic-hunt/events-cryptic-hunt-ch-timeless.webp", desc: "Limited-edition Cryptic Hunt sticker from the 2025 edition." },
        ],
        sponsors: [
          { name: "Hey Hoku", tier: "Sponsor" },
        ],
      },
      {
        year: "2024",
        edition: "Cryptic Hunt 3.0",
        description: "Third edition that expanded the puzzle chain and campus coverage, with Urban Jungle coming on board as sponsor.",
        links: [
          { label: "Solutions", href: "https://github.com/ACM-VIT/Cryptic-Hunt-Solutions-2024" },
        ],
        sponsors: [
          { name: "Urban Jungle", tier: "Sponsor" },
        ],
      },
      {
        year: "2023",
        edition: "Cryptic Hunt 2.0",
        description: "Second edition building on the inaugural format with more puzzles, wider campus coverage, and a growing participant base.",
        links: [
          { label: "Solutions", href: "https://github.com/ACM-VIT/Cryptic-Hunt-Solutions-2023" },
        ],
      },
      {
        year: "2022",
        edition: "Cryptic Hunt 1.0",
        description: "The inaugural edition. A brand-new campus scavenger hunt format powered by a custom-built app, setting the foundation for what would become one of ACM-VIT's most beloved events.",
        links: [
          { label: "Solutions", href: "https://github.com/ACM-VIT/Cryptic-Hunt-22-solutions" },
        ],
      },
    ],
  },

  forktober: {
    slug: "forktober",
    title: "Forktober Fest",
    tagline: "Every great open-source contributor starts with a single commit.",
    eyebrow: "ACM-VIT · Hacktoberfest · Open Source",
    themeKey: "tech",
    themeColor: "#EFEFEF",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-forktober-cassette.svg",
    shortDescription:
      "Forktober is ACM-VIT's annual open-source initiative conducted as part of the global Hacktoberfest celebration. It equips students with the practical skills needed to contribute confidently to open-source projects.",
    longDescription: [
      "Every great open-source contributor starts with a single commit, and Forktober is where that journey begins. Forktober is ACM-VIT's annual open-source initiative, conducted as part of the global Hacktoberfest celebration. Designed to introduce students to the world of collaborative software development, the event equips participants with the practical skills needed to contribute confidently to open-source projects while fostering a culture of learning, collaboration, and community-driven development.",
      "Through a series of hands-on workshops, live coding sessions, and mentorship, participants learn the complete Git and GitHub workflow - from creating repositories and managing branches to resolving merge conflicts and submitting their first pull requests. Beyond technical skills, Forktober emphasises best practices in open-source contribution, project collaboration, version control, and community etiquette.",
      "As participants progress through the event, they are encouraged to contribute to beginner-friendly open-source repositories as part of Hacktoberfest, allowing them to apply their newly acquired skills in real-world projects under the guidance of experienced mentors. This hands-on approach helps students build confidence, strengthen their portfolios, and become active contributors to the global open-source community.",
      "Whether you're making your very first pull request or taking your first steps into collaborative development, Forktober serves as the perfect launchpad into open source. Over the years, it has empowered hundreds of students to begin their open-source journey, transforming beginners into confident contributors while fostering a thriving developer community within ACM-VIT.",
    ],
    format: "Hybrid · Workshops + contribution drive",
    duration: "October",
    mode: "Hybrid",
    audience: "All students, all skill levels",
    team: "Individual contributor",
    organizedBy: "ACM-VIT · Technical Domain",
    firstHeld: "2021",
    recurrence: "Annual · Every October",
    registrationUrl: "https://github.com/ACM-VIT",
    primaryCtaLabel: "Contribute on GitHub",
    stats: [
      { value: "5", label: "Editions" },
    ],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Hands-on Git and GitHub workshops",
      "Mentorship from experienced contributors",
      "Real open-source contribution experience",
    ],
    faq: [
      { q: "Do I need to know git?", a: "Not before kickoff - the workshops cover git, GitHub, and the contribution workflow from scratch." },
      { q: "What repositories can I contribute to?", a: "ACM-VIT maintains beginner-friendly repositories on GitHub specifically for Forktober participants." },
    ],
    socials: [
      { label: "ACM-VIT GitHub", href: "https://github.com/ACM-VIT" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
    pastEditions: [
      {
        year: "2025",
        edition: "Forktober 2025",
        description: "Fifth edition with new repositories for participants to contribute to.",
        links: [
          { label: "open-with-browser", href: "https://github.com/ACM-VIT/open-with-browser" },
          { label: "scrag", href: "https://github.com/ACM-VIT/scrag" },
          { label: "Digital-Circuit-Simulator", href: "https://github.com/ACM-VIT/Digital-Circuit-Simulator" },
        ],
      },
      {
        year: "2024",
        edition: "Forktober 2024",
        description: "Fourth edition featuring blog posts and live sessions alongside contributions.",
        links: [
          { label: "Session", href: "https://www.youtube.com/watch?v=Adc-iTzIbko&t=1476s" },
          { label: "Blog: Quantizing LLMs", href: "https://blog.acmvit.in/honey-i-shrunk-the-ai-quantizing-llms-for-edge-hardware" },
          { label: "Blog: AI Dream Manipulation", href: "https://blog.acmvit.in/beyond-the-totem-ai-driven-dream-manipulation-the-future-of-lucid-dreaming" },
        ],
      },
      {
        year: "2023",
        edition: "Forktober 2023",
        description: "Third edition with YouTube sessions, new repositories, and an offline session by Rishabh Keshan, Shubham Palriwala, and Abhitej Singh on open-source contribution and blockchain.",
        links: [
          { label: "Session 1", href: "https://www.youtube.com/watch?v=E_dwtisWjdI" },
          { label: "Session 2", href: "https://www.youtube.com/watch?v=tSolfruU4Qw" },
          { label: "Session 3", href: "https://www.youtube.com/watch?v=mbKmVj9S8Cw" },
          { label: "EchoLink", href: "https://github.com/ACM-VIT/EchoLink" },
          { label: "Ride-Safe", href: "https://github.com/ACM-VIT/Ride-Safe" },
          { label: "PDFMaker", href: "https://github.com/ACM-VIT/PDFMaker" },
        ],
      },
      {
        year: "2022",
        edition: "Forktober 2022",
        description: "Second edition with an expanded roster of 15 repositories for contributors.",
        links: [
          { label: "fludget", href: "https://github.com/ACM-VIT/fludget" },
          { label: "gitpositive", href: "https://github.com/ACM-VIT/gitpositive" },
          { label: "muscle_magic", href: "https://github.com/ACM-VIT/muscle_magic" },
          { label: "AlarmIT", href: "https://github.com/ACM-VIT/AlarmIT" },
          { label: "sticky-links", href: "https://github.com/ACM-VIT/sticky-links" },
          { label: "10-000-Hours", href: "https://github.com/ACM-VIT/10-000-Hours" },
          { label: "certify", href: "https://github.com/ACM-VIT/certify" },
          { label: "golly-bot", href: "https://github.com/ACM-VIT/golly-bot" },
          { label: "maildart-backend", href: "https://github.com/ACM-VIT/maildart-backend" },
          { label: "Paint-me", href: "https://github.com/ACM-VIT/Paint-me" },
          { label: "CryptoDash", href: "https://github.com/ACM-VIT/CryptoDash" },
          { label: "todo-app", href: "https://github.com/ACM-VIT/todo-app" },
          { label: "create-boilerplate-node", href: "https://github.com/ACM-VIT/create-boilerplate-node" },
          { label: "QChat", href: "https://github.com/ACM-VIT/QChat" },
        ],
      },
      {
        year: "2021",
        edition: "Forktober 2021",
        description: "Inaugural edition introducing VIT students to open-source contribution through Hacktoberfest.",
        links: [
          { label: "Session", href: "https://www.youtube.com/watch?v=Bmt6MC1P5pw" },
          { label: "fludget", href: "https://github.com/ACM-VIT/fludget" },
          { label: "gitpositive", href: "https://github.com/ACM-VIT/gitpositive" },
          { label: "Algos-for-all-Amigos", href: "https://github.com/ACM-VIT/Algos-for-all-Amigos" },
          { label: "sticky-links", href: "https://github.com/ACM-VIT/sticky-links" },
          { label: "maildart-frontend", href: "https://github.com/ACM-VIT/maildart-frontend" },
          { label: "certify", href: "https://github.com/ACM-VIT/certify" },
          { label: "acm-github-bot", href: "https://github.com/ACM-VIT/acm-github-bot" },
          { label: "maildart-backend", href: "https://github.com/ACM-VIT/maildart-backend" },
          { label: "discord-hackpot", href: "https://github.com/ACM-VIT/discord-hackpot" },
        ],
      },
    ],
  },

  inspiher: {
    slug: "inspiher",
    title: "inspiHer",
    tagline: "if they can you can too",
    eyebrow: "ACM-W VIT · Podcast & Speaker Series",
    themeKey: "management",
    themeColor: "#CE307D",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-inspiher-cassette.svg",
    isAcmW: true,
    shortDescription:
      "inspiHer is ACM-VIT's flagship podcast and speaker series organized under ACM-W, created to showcase the journeys of accomplished women in technology, research, entrepreneurship, design, and STEM through candid conversations.",
    longDescription: [
      "inspiHer is ACM-VIT's flagship podcast and speaker series organized under ACM-W (Association for Computing Machinery - Women's Chapter). It was created to showcase the journeys of accomplished women in technology, research, entrepreneurship, design, and STEM, while making these stories accessible to students through candid conversations rather than formal lectures.",
      "The series is built around the idea that seeing successful women in technology discuss their experiences can inspire more students - especially women - to pursue careers in computing and leadership. Each episode explores the speaker's career journey, college experiences, breaking into the tech industry, challenges faced as women in STEM, work-life balance, leadership experiences, building communities, and advice for students.",
      "Unlike a technical workshop where the focus is on learning a technology, inspiHer focuses on the people behind the technology. The conversations are intentionally informal so students can relate to the speaker's experiences. It extends beyond coding into leadership, entrepreneurship, mental health, communication, and personal growth.",
    ],
    format: "Podcast & Speaker Series",
    duration: "Ongoing series",
    mode: "Online",
    audience: "All students - focused on inspiring women in STEM",
    team: "Individual",
    organizedBy: "ACM-W VIT · Women's Chapter",
    recurrence: "4 seasons to date",
    registrationUrl: "https://acmvit.in/events",
    primaryCtaLabel: "Watch on YouTube",
    stats: [
      { value: "4", label: "Seasons" },
    ],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Career guidance through real experiences",
      "Relatable role models for aspiring engineers",
      "Conversations on leadership, entrepreneurship, and personal growth",
    ],
    faq: [
      { q: "What is inspiHer?", a: "A podcast and speaker series by ACM-W VIT showcasing the journeys of accomplished women in technology through candid conversations." },
      { q: "Where can I watch?", a: "All seasons are available on YouTube." },
    ],
    instagramHandle: "acmvit",
    socials: [
      { label: "Season 1 · YouTube", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF6iqZGfuKruN5iNN5u6XBmX" },
      { label: "Season 2 · YouTube", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF7hyT1BWL3RMspLHU0CWMJu" },
      { label: "Season 3 · YouTube", href: "https://www.youtube.com/watch?v=FJvIf-I8PfI&list=PLW6zTUiVTfF6nWF-p0pWokPr3Z6U5I0d1" },
      { label: "Season 4 · YouTube", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF77nYKDBsZGS2sDbjmX_UyP" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
    pastEditions: [
      {
        year: "Season 4",
        edition: "inspiHer Season 4",
        description: "Fourth season of the podcast and speaker series.",
        links: [
          { label: "YouTube Playlist", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF77nYKDBsZGS2sDbjmX_UyP" },
        ],
      },
      {
        year: "Season 3",
        edition: "inspiHer Season 3",
        description: "Third season continuing the candid conversations with women in tech.",
        links: [
          { label: "YouTube Playlist", href: "https://www.youtube.com/watch?v=FJvIf-I8PfI&list=PLW6zTUiVTfF6nWF-p0pWokPr3Z6U5I0d1" },
        ],
      },
      {
        year: "Season 2",
        edition: "inspiHer Season 2",
        description: "Second season expanding the range of speakers and topics.",
        links: [
          { label: "YouTube Playlist", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF7hyT1BWL3RMspLHU0CWMJu" },
        ],
      },
      {
        year: "Season 1",
        edition: "inspiHer Season 1",
        description: "The inaugural season that launched the podcast series.",
        links: [
          { label: "YouTube Playlist", href: "https://www.youtube.com/playlist?list=PLW6zTUiVTfF6iqZGfuKruN5iNN5u6XBmX" },
        ],
      },
    ],
  },

  "neural-hack": {
    slug: "neural-hack",
    title: "The Neural Hack",
    tagline: "An AI-based hackathon. An ACM-W initiative.",
    eyebrow: "ACM-VIT · ACM-W · AI/ML Hackathon",
    themeKey: "research",
    themeColor: "#FA0148",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-neural-hack-cassette.svg",
    shortDescription:
      "The Neural Hack is a 36-hour data-centric AI and Machine Learning hackathon by ACM-W VIT that emphasises data understanding, cleaning, pipeline design, and problem-solving beyond basic model-building.",
    longDescription: [
      "The Neural Hack is ACM-W VIT's dedicated AI/ML hackathon, first held online in 2020 and returning in-person in 2026. It invites developers of all skill levels to create machine learning solutions addressing real-world challenges, with a strong emphasis on promoting women in STEM.",
      "The hackathon is data-centric at its core - participants are evaluated not just on model accuracy but on their approach to data understanding, cleaning, pipeline design, solution efficiency, inference speed, novelty, implementation strategy, and code quality. Teams work through multiple review rounds with eliminatory checkpoints before final pitches.",
      "Each team requires at least one female member, reflecting ACM-W's commitment to championing women in tech. The first edition in 2020 ran online with tracks spanning Community and Equality, Healthcare and Crisis Response, Entertainment and Life Hacks, and Security and Surveillance.",
    ],
    format: "Hackathon · Data-centric AI/ML with review rounds",
    duration: "36 hours",
    mode: "Hybrid",
    audience: "Undergrad students of all skill levels",
    team: "Teams of 2 to 4 (at least one female member required)",
    organizedBy: "ACM-W VIT · ACM-VIT",
    firstHeld: "2020",
    recurrence: "2 editions to date",
    registrationUrl: "https://nh.acmvit.in",
    primaryCtaLabel: "Visit nh.acmvit.in",
    isAcmW: true,
    stats: [
      { value: "2", label: "Editions" },
      { value: "36h", label: "Per Edition" },
    ],
    tracks: [
      { name: "Community and Equality", description: "ML solutions for social impact, inclusion, and accessibility." },
      { name: "Healthcare and Crisis Response", description: "AI for medical, public health, and emergency use cases." },
      { name: "Entertainment and Life Hacks", description: "Creative AI applications for everyday life and entertainment." },
      { name: "Security and Surveillance", description: "ML-driven solutions for safety, threat detection, and monitoring." },
    ],
    schedule: [
      { time: "Day 1 · 8 AM", title: "Arrival & Registration" },
      { time: "Day 1 · 12:15 PM", title: "Dataset Release" },
      { time: "Day 1 · 5 PM", title: "Review 0", description: "Initial checkpoint." },
      { time: "Day 2 · 12 AM", title: "Review 1", description: "Midnight review round." },
      { time: "Day 2 · 9 AM", title: "Participants Return" },
      { time: "Day 2 · 4 PM", title: "Review 2 (Eliminatory)", description: "Teams shortlisted for final pitches." },
      { time: "Day 2 · 5-8 PM", title: "Final Pitches & Awards" },
    ],
    prizes: [],
    highlights: [],
    perks: [
      "Free registration",
      "Discord server for team formation",
      "Datasets and problem statements provided",
    ],
    faq: [
      { q: "Do I need deep ML experience?", a: "No. The Neural Hack welcomes developers of all skill levels." },
      { q: "What's the team composition requirement?", a: "Teams of 2-4, with at least one female member per team." },
      { q: "What gets evaluated?", a: "Accuracy, precision/recall/F1-score, solution efficiency, inference speed, novelty, implementation strategy, code quality, and round-wise improvement." },
    ],
    instagramHandle: "acmvit",
    socials: [
      { label: "Website", href: "https://nh.acmvit.in" },
      { label: "Devpost", href: "https://theneuralhack.devpost.com/" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
    pastEditions: [
      {
        year: "2026",
        edition: "The Neural Hack 2.0",
        description: "In-person return at Shakespeare Gallery, VIT Vellore. 36-hour data-centric AI hackathon with multiple review rounds and eliminatory checkpoints. Teams of exactly 3 with at least one female member.",
        links: [
          { label: "Website", href: "https://nh.acmvit.in" },
        ],
      },
      {
        year: "2020",
        edition: "The Neural Hack 1.0",
        description: "First edition, held online December 4-5 2020. 66 participants across four impact-focused tracks. Featured a guest speaker session by Dr. Ganna Pogrebna. Teams of 2-4 with at least 50% women participants.",
        links: [
          { label: "Devpost", href: "https://theneuralhack.devpost.com/" },
        ],
      },
    ],
  },

  "reverse-coding": {
    slug: "reverse-coding",
    title: "Reverse Coding",
    tagline: "Code, Invert, Conquer!",
    eyebrow: "ACM-VIT · RCPC · Competitive Coding",
    themeKey: "cc",
    themeColor: "#9B51E0",
    cassetteSvg: "/events/events-reverse-coding-cassette.svg",
    shortDescription:
      "Reverse Coding (RCPC) is one of the premier competitive coding events hosted by ACM-VIT. An unconventional reverse-engineering competition where participants decipher hidden code logic based on provided input-output patterns or executable files - no problem statements, just test cases.",
    longDescription: [
      "Reverse Coding is one of the largest competitive coding events at VIT Vellore. Nicknamed RCPC - in homage to ICPC, once conducted by ACM-VIT's parent body ACM International - it has been running since 2018 and has grown into an ACM-VIT staple with 7 editions and over 5,000 participants to date.",
      "Instead of being given a problem statement and writing code from scratch, participants must deduce the underlying logic of a mystery program. They are provided with runnable or executable files that display specific input and output test cases. Programmers analyse the relationship between inputs and outputs to spot hidden patterns in strings, numbers, or sequences, then reverse-engineer the algorithm and submit code in C, C++, Java, or Python to pass hidden test cases on a custom portal.",
      "The entire event runs on a portal fully developed by ACM-VIT - frontend, backend, everything. Since the 2024 edition every year's portal has had a new theme: the 2024 edition was themed around algorithms and time complexity, the 2025 edition embraced Star Wars, and the 2026 edition went with Formula 1.",
      "Reverse Coding is an annual event held during the winter semester. It rewards pattern recognition, hypothesis-testing, and the ability to write code from a fuzzy specification. Some problems are simple math, others are string manipulation, others involve lateral reasoning. The lore is real.",
    ],
    format: "Online · Reverse-engineering coding contest on custom portal",
    duration: "3 hours",
    mode: "Online",
    audience: "All undergraduate students",
    team: "Teams of 2 to 4",
    organizedBy: "ACM-VIT · Competitive Coding Domain",
    firstHeld: "2018",
    recurrence: "Annual · Winter semester",
    registrationUrl: "https://rcpc.acmvit.in",
    primaryCtaLabel: "Visit rcpc.acmvit.in",
    stats: [
      { value: "7", label: "Editions" },
      { value: "5000+", label: "Past Participants" },
    ],
    tracks: [
      { name: "Pattern Recognition", description: "Most problems reduce to spotting the rule that maps input to output." },
      { name: "Math & Number Theory", description: "Sequences, modular arithmetic, prime properties - common building blocks." },
      { name: "String Transformation", description: "Encoding, decoding, character mapping - read carefully." },
    ],
    schedule: [
      { time: "00:00", title: "Contest Opens", description: "Problem set drops as I/O pairs only on the custom portal." },
      { time: "02:30", title: "Scoreboard Frozen - Final 30 Minutes" },
      { time: "03:00", title: "Contest Ends + Editorials Released" },
    ],
    prizes: [
      { place: "1st", value: "Cash + ACM-VIT custom merch" },
      { place: "2nd & 3rd", value: "Cash + swag kit" },
      { place: "First Solve Bonuses", value: "Recognition per problem for fastest solve" },
    ],
    highlights: [],
    perks: [
      "Full editorials with worked examples post-contest",
      "Community Discord with hint and discussion channels",
      "Pathway into ACM-VIT's internal CP cohort",
      "Custom-themed portal experience each year",
    ],
    faq: [
      { q: "How do I know what to code without a problem statement?", a: "That's the contest. The I/O pairs are the specification. Analyse the patterns and reverse-engineer the logic." },
      { q: "What language can I use?", a: "C, C++, Java, or Python - submitted through the custom RCPC portal." },
      { q: "Is partial credit awarded?", a: "Yes - submissions are graded per test case." },
      { q: "What is RCPC?", a: "RCPC is the nickname for Reverse Coding, in homage to ICPC which was conducted by ACM-VIT's parent body ACM International." },
    ],
    instagramHandle: "acmvit",
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
      { label: "2026 Portal · rcpc.acmvit.in", href: "https://rcpc.acmvit.in" },
      { label: "2025 Portal · futureportal.acmvit.in", href: "http://futureportal.acmvit.in/" },
    ],
    pastEditions: [
      {
        year: "2026",
        edition: "RCPC 2026",
        description: "Formula 1-themed edition. The portal at rcpc.acmvit.in featured an F1-inspired design, continuing the tradition of a unique portal theme each year.",
        links: [
          { label: "Portal", href: "https://rcpc.acmvit.in" },
          { label: "Solutions", href: "https://github.com/ACM-VIT/rc26-solutions" },
        ],
        collectibles: [
          { name: "RCPC Sticker", image: "/events/events-reverse-coding-sticker-2026.webp", desc: "Limited-edition RCPC sticker from the 2026 edition." },
        ],
      },
      {
        year: "2025",
        edition: "RCPC 2025",
        description: "Star Wars-themed edition. The portal at futureportal.acmvit.in brought a galaxy far, far away to competitive coding. Sponsored by EaseMyTrip.",
        links: [
          { label: "Portal", href: "http://futureportal.acmvit.in/" },
          { label: "Solutions", href: "https://github.com/ACM-VIT/rc-2025-solutions" },
        ],
        collectibles: [
          { name: "RCPC Sticker", image: "/events/events-reverse-coding-sticker-2025.webp", desc: "Limited-edition RCPC sticker from the 2025 edition." },
        ],
        sponsors: [
          { name: "EaseMyTrip", tier: "Sponsor" },
        ],
      },
      {
        year: "2024",
        edition: "RCPC 2024",
        description: "Algorithms and time complexity-themed edition. First year with a themed portal experience, setting the standard for future editions. Sponsored by EaseMyTrip.",
        sponsors: [
          { name: "EaseMyTrip", tier: "Sponsor" },
        ],
      },
      {
        year: "2023",
        edition: "RCPC 2023",
        description: "Continued the annual tradition with a growing participant base and a refined contest format. Sponsored by Into The Verse.",
        sponsors: [
          { name: "Into The Verse", tier: "Sponsor" },
        ],
      },
      {
        year: "2022",
        edition: "RCPC 2022",
        description: "Return after a pandemic-year gap, bigger than ever. Sponsored by Nuclei.",
        links: [
          { label: "Solutions", href: "https://github.com/ACM-VIT/Reverse-Coding-2022-Solutions" },
        ],
        sponsors: [
          { name: "Nuclei", tier: "Sponsor" },
        ],
      },
      {
        year: "2020",
        edition: "RCPC 2020",
        description: "Edition held during a challenging year, backed by a strong roster of sponsors.",
        sponsors: [
          { name: "Recover", tier: "Sponsor" },
          { name: "Uacelt", tier: "Sponsor" },
          { name: "Code Asylums", tier: "Sponsor" },
          { name: "ClassRoom", tier: "Sponsor" },
          { name: "Replit", tier: "Sponsor" },
        ],
      },
      {
        year: "2019",
        edition: "RCPC 2019",
        description: "Second edition, building on the inaugural format with increased participation. Sponsored by Coding Blocks.",
        sponsors: [
          { name: "Coding Blocks", tier: "Sponsor" },
        ],
      },
      {
        year: "2018",
        edition: "RCPC 2018",
        description: "The inaugural edition. A brand-new reverse-engineering coding format that would grow into one of ACM-VIT's most beloved events. Sponsored by Foxmula.",
        sponsors: [
          { name: "Foxmula", tier: "Sponsor" },
        ],
      },
    ],
  },

  "the-tiny-hack": {
    slug: "the-tiny-hack",
    title: "The Tiny Hack",
    tagline: "\\\\tiny ideas, huge impact!",
    eyebrow: "ACM-VIT · Mini Hackathon",
    themeKey: "tech",
    themeColor: "#D6696E",
    themeColorSecondary: "#0D8ADE",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-the-tiny-hack-cassette.webp",
    shortDescription:
      "The Tiny Hack is a 10-hour hackathon designed for individuals interested in developing innovative projects in a short amount of time, focused on creating small but impactful solutions to real-world problems using technology.",
    longDescription: [
      "The Tiny Hack is a 10-hour-long hackathon designed for individuals who are interested in developing and building innovative projects in a short amount of time. The event is focused on creating small but impactful solutions to real-world problems using technology. Participants have the opportunity to collaborate and work with like-minded individuals from diverse backgrounds to develop their ideas.",
      "At the end of the 10 hours, participants present their projects to a panel of judges who select the top projects to receive cash prizes. The hack began with a session from keynote speaker Dr. Celestine Iwendi, one of ACM International's Most Distinguished Speakers.",
      "The Tiny Hack is a great opportunity for individuals to test their skills, network with other professionals, and potentially launch a new project or business idea.",
    ],
    format: "Hybrid · 10-hour hackathon with 4 problem statements",
    duration: "10 hours",
    mode: "Hybrid",
    audience: "All students",
    team: "Teams of 1 to 5",
    organizedBy: "ACM-VIT · Technical Domain",
    firstHeld: "2023",
    recurrence: "1 edition to date",
    registrationUrl: "https://unstop.com/hackathons/the-tiny-hack-vellore-institute-of-technology-vit-vellore-587842",
    primaryCtaLabel: "View on Unstop",
    stats: [
      { value: "1", label: "Edition" },
      { value: "10h", label: "Build Window" },
      { value: "4", label: "Problem Statements" },
    ],
    tracks: [],
    schedule: [
      { time: "10:00 AM", title: "Round 1 (Non-Elimination)", description: "Hacking begins. Non-VIT-V participants on Discord." },
      { time: "1:00 PM", title: "Round 2 (Elimination)", description: "Elimination round." },
      { time: "5:00 PM", title: "Final Round", description: "Last stretch before the pitch off." },
      { time: "7:30 PM", title: "Pitch Off", description: "Final pitches presented in Sarojini Naidu Gallery." },
    ],
    prizes: [],
    highlights: [],
    perks: [
      "Keynote session by Dr. Celestine Iwendi, ACM International's Most Distinguished Speaker",
      "Any tech stack allowed",
      "Cash prizes for top projects",
    ],
    faq: [
      { q: "How many members can be in a team?", a: "Maximum 5 members in a team." },
      { q: "Is this online or offline?", a: "VIT Vellore teams are present at Sarojini Naidu Gallery. Non-VIT-V participants join via ACM-VIT's official Discord server." },
      { q: "What tech stack can I use?", a: "Participants can implement their solutions via the tech stack of their choice." },
    ],
    socials: [
      { label: "Unstop", href: "https://unstop.com/hackathons/the-tiny-hack-vellore-institute-of-technology-vit-vellore-587842" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
    pastEditions: [
      {
        year: "2023",
        edition: "The Tiny Hack 1.0",
        description: "Held on 18th January 2023 at Sarojini Naidu Gallery, VIT Vellore (hybrid with Discord for non-VIT participants). 10-hour hackathon with 4 problem statements, keynote by Dr. Celestine Iwendi, and cash prizes. Teams of up to 5.",
        links: [
          { label: "Unstop", href: "https://unstop.com/hackathons/the-tiny-hack-vellore-institute-of-technology-vit-vellore-587842" },
        ],
      },
    ],
  },

  "be-the-builder": {
    slug: "be-the-builder",
    title: "Be The Builder",
    tagline: "Meet your chapter. Build your first idea together.",
    eyebrow: "ACM-VIT · Internal Ideathon",
    themeKey: "brand",
    themeColor: "#7496D8",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-bethebuilder-cassette.webp",
    shortDescription:
      "Be The Builder is ACM-VIT's internal ideathon for new recruits - a space where freshly inducted members meet each other, ideate together, interact across domains, and get to know how the chapter functions.",
    longDescription: [
      "Be The Builder is ACM-VIT's annual internal ideathon, created for the chapter's newest recruits. The event serves as the first collaborative experience for new members after induction, giving them a chance to meet their peers across domains, brainstorm ideas together, and understand how ACM-VIT operates as a team.",
      "More than a competition, Be The Builder is about onboarding through action. New members form cross-domain teams, pitch ideas, and work through the ideation process together. It's where friendships form, working styles are discovered, and the culture of building at ACM-VIT takes root.",
      "First conducted in 2024, Be The Builder has become a yearly tradition that sets the tone for every new cohort's journey within the chapter.",
    ],
    format: "Internal ideathon",
    duration: "1 day",
    mode: "Offline",
    audience: "ACM-VIT new recruits",
    team: "Cross-domain teams",
    organizedBy: "ACM-VIT",
    firstHeld: "2024",
    recurrence: "Annual",
    registrationUrl: "https://acmvit.in",
    primaryCtaLabel: "Learn More",
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  casa: {
    slug: "casa",
    title: "CASA",
    tagline: "Campaign Against Substance Abuse.",
    eyebrow: "ACM-VIT · Student Well-being",
    themeKey: "brand",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-casa-cassette.webp",
    shortDescription:
      "CASA (Campaign Against Substance Abuse) is an annual event conducted by ACM-VIT under VIT's larger CASA initiative, bringing highly trained counsellors to speak to students about the dangers and consequences of substance abuse.",
    longDescription: [
      "CASA - Campaign Against Substance Abuse - is an annual awareness event conducted by ACM-VIT as part of VIT's larger university-wide CASA initiative. Every year, highly trained counsellors visit campus and engage with students through expert-led sessions focused on the dangers, consequences, and realities of substance abuse.",
      "The programme goes beyond simple awareness talks. Sessions include interactive discussions on mental health and well-being, peer support network development, and candid conversations with professional counsellors who help students understand the impact of substance abuse on academic performance, relationships, and long-term health.",
      "ACM-VIT's involvement in CASA reflects the chapter's commitment to student well-being beyond technology. The goal is to create a healthier, more informed, and more supportive student community at VIT - because building great things starts with taking care of the people who build them.",
    ],
    format: "Awareness session · Expert-led counselling talks",
    duration: "1 day",
    mode: "Offline",
    audience: "All VIT students",
    team: "Individual",
    organizedBy: "ACM-VIT · Under VIT CASA Initiative",
    recurrence: "Annual",
    registrationUrl: "https://acmvit.in",
    primaryCtaLabel: "Learn More",
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Expert-led awareness sessions",
      "Interactions with trained counsellors",
      "Educational discussions on mental health and well-being",
      "Peer support network development",
    ],
    faq: [],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  deepfake: {
    slug: "deepfake",
    title: "Deepfake: The Digital Doppelganger",
    tagline: "Detect the fake. Defend the real.",
    eyebrow: "ACM-VIT · AI/ML Workshop",
    themeKey: "research",
    themeColor: "#2C4840",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-deepfake-cassette.webp",
    shortDescription:
      "Deepfake: The Digital Doppelganger is a workshop conducted by ACM-VIT in 2025 on deepfake detection and the basics of machine learning, attended by more than 100 participants.",
    longDescription: [
      "Deepfake: The Digital Doppelganger was a hands-on workshop conducted by ACM-VIT in 2025, focused on deepfake detection and the fundamentals of machine learning. With over 100 participants, it introduced students to the growing challenge of AI-generated synthetic media and equipped them with practical skills to identify and combat it.",
      "The session taught participants about the mechanics of deepfake generation, the basics of machine learning that power it, and practical deepfake detection techniques. Participants got hands-on experience running detection models on their own devices, making it an accessible introduction to applied AI security.",
    ],
    format: "Workshop · Hands-on deepfake detection",
    duration: "1 day",
    mode: "Offline",
    audience: "All students",
    team: "Individual",
    organizedBy: "ACM-VIT",
    firstHeld: "2025",
    recurrence: "1 edition to date",
    registrationUrl: "https://acmvit.in",
    primaryCtaLabel: "Learn More",
    stats: [
      { value: "100+", label: "Participants" },
      { value: "1", label: "Edition" },
    ],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [
      "Hands-on deepfake detection on personal devices",
      "Introduction to machine learning fundamentals",
      "Practical AI security skills",
    ],
    faq: [],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  "dr-peter-robinson": {
    slug: "dr-peter-robinson",
    title: "Computers Have Feelings Too",
    tagline: "Exploring emotion-aware computing with Dr. Peter Robinson.",
    eyebrow: "ACM-VIT · Distinguished Speaker Session",
    themeKey: "research",
    themeColor: "#F3ED99",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-peter-robinson-cassette.webp",
    shortDescription:
      "A Distinguished Speaker Session where Dr. Peter Robinson, Professor Emeritus of Computer Technology at the University of Cambridge, explored Human-Computer Interaction and its intersection with Affective Computing.",
    longDescription: [
      "ACM-VIT hosted a Distinguished Speaker Session with Dr. Peter Robinson, Professor Emeritus of Computer Technology at the University of Cambridge. The session, titled 'Computers Have Feelings Too', explored Human-Computer Interaction (HCI) and its intersection with Affective Computing.",
      "The session explored how emerging technologies are being designed to recognise, interpret, and simulate human emotions. The event provided valuable insights into the evolving relationship between humans and machines, emphasising the role of psychology and design in shaping intelligent, emotion-aware systems.",
    ],
    format: "Speaker Session · Distinguished Speaker Programme",
    duration: "1 session",
    mode: "Online",
    audience: "All students",
    team: "Individual",
    organizedBy: "ACM-VIT",
    recurrence: "One-time session",
    registrationUrl: "https://www.youtube.com/watch?v=YEY1P62zAf8&t=27s",
    primaryCtaLabel: "Watch Recording",
    speaker: {
      name: "Dr. Peter Robinson",
      role: "Professor Emeritus of Computer Technology",
      institution: "University of Cambridge",
      image: "/community/community-peter-robinson.webp",
      bio: [
        "Peter Robinson is Professor Emeritus of Computer Technology and a Fellow of Gonville & Caius College at the University of Cambridge. He was part of the Rainbow Group in the Computer Laboratory, where his research focused on Human-Computer Interaction and Affective Computing - designing systems that can recognise, interpret, and respond to human emotions.",
        "His work has explored how computers can understand facial expressions, tone of voice, and body language to build more intuitive and emotionally aware interfaces. His contributions have significantly shaped the field of emotion-sensing technology and its applications in education, healthcare, and assistive systems.",
      ],
      profileUrl: "https://www.cst.cam.ac.uk/people/pr10",
    },
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    socials: [
      { label: "Recording · YouTube", href: "https://www.youtube.com/watch?v=YEY1P62zAf8&t=27s" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  "dr-federica-sarro": {
    slug: "dr-federica-sarro",
    title: "Search-Based Software Engineering",
    tagline: "Intelligent optimisation for modern software systems with Dr. Federica Sarro.",
    eyebrow: "ACM-VIT · Distinguished Speaker Session · November 2025",
    themeKey: "research",
    themeColor: "#F3ED99",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-federica-sarro-cassette.webp",
    shortDescription:
      "ACM-VIT hosted an insightful session with Dr. Federica Sarro, Professor of Software Engineering at University College London, exploring search-based software engineering for modern software systems.",
    longDescription: [
      "ACM-VIT hosted an insightful session with Dr. Federica Sarro, Professor of Software Engineering at University College London. The talk, titled 'Search-Based Software Engineering', explored key areas such as software optimisation, predictive analytics, and empirical software engineering, with a focused discussion on search-based software engineering for modern software systems.",
      "Dr. Sarro shared how intelligent optimisation and data-driven techniques are transforming the way complex software challenges are addressed in practice. The session provided attendees with valuable perspectives on improving software quality, efficiency, and decision-making, and concluded with an engaging interaction that encouraged deeper understanding of emerging trends in software engineering.",
    ],
    format: "Speaker Session · Distinguished Speaker Programme",
    duration: "1 session",
    mode: "Online",
    audience: "All students",
    team: "Individual",
    organizedBy: "ACM-VIT",
    recurrence: "One-time session",
    registrationUrl: "https://www.youtube.com/watch?v=f9hT679ABb8",
    primaryCtaLabel: "Watch Recording",
    speaker: {
      name: "Dr. Federica Sarro",
      role: "Professor of Software Engineering",
      institution: "University College London (UCL)",
      image: "/community/community-federica-sarro.webp",
      bio: [
        "Federica Sarro is Professor of Software Engineering at University College London (UCL), where she heads the Software Systems Engineering group and leads the SOLAR (Software Analysis and Learning) research group. Her research focuses on search-based software engineering, software effort estimation, and app store analysis.",
        "She has served as Chair of the IEEE Technical Council on Software Engineering (TCSE) since January 2025. Her work applies intelligent optimisation and machine learning techniques to solve complex software engineering problems, and has been widely recognised through publications in top venues and best paper awards.",
      ],
      profileUrl: "https://profiles.ucl.ac.uk/38657-federica-sarro",
    },
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    socials: [
      { label: "Recording · YouTube", href: "https://www.youtube.com/watch?v=f9hT679ABb8" },
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  "kickstart-learn": {
    slug: "kickstart-learn",
    title: "Kickstart Learn",
    tagline: "Your launchpad into campus life and tech.",
    eyebrow: "ACM-VIT · Fresher Orientation",
    themeKey: "brand",
    themeColor: "#F95F4A",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-kickstart-learn-cassette.webp",
    shortDescription:
      "ACM-VIT's orientation event for freshers - helping new students navigate campus life, kickstart their tech journey, and discover how to become a part of ACM-VIT.",
    longDescription: [
      "Kickstart Learn is ACM-VIT's dedicated event for freshers arriving at campus. Designed to ease the transition into college life, the event addresses everything new students need to know - from navigating academics and campus resources to finding their footing in the tech community.",
      "The session covers common queries about college life, how to start building skills in tech, and what opportunities await within ACM-VIT. Members share their own experiences and guide freshers on how to make the most of their time at VIT, while also walking them through the process of joining ACM-VIT and getting involved in its projects, events, and community.",
    ],
    format: "Orientation · Interactive Session",
    duration: "1 session",
    mode: "Offline",
    audience: "Freshers",
    team: "Individual",
    organizedBy: "ACM-VIT",
    recurrence: "Annual",
    registrationUrl: "https://instagram.com/acmvit",
    primaryCtaLabel: "Follow ACM-VIT",
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },

  "sdg-workshops": {
    slug: "sdg-workshops",
    title: "SDG Workshops",
    tagline: "Building tech solutions for sustainable development goals.",
    eyebrow: "ACM-VIT · VIT SDG Week",
    themeKey: "tech",
    themeColor: "#00689D",
    themeColorSecondary: "#E5243B",
    hideCtaBanner: true,
    cassetteSvg: "/events/events-sdg-cassette.webp",
    shortDescription:
      "Every year during VIT's SDG Week, ACM-VIT conducts hands-on workshops where students build MERN stack solutions addressing one of the United Nations' Sustainable Development Goals.",
    longDescription: [
      "SDG Workshops are conducted by ACM-VIT every year as part of VIT's SDG Week. Each edition focuses on one of the United Nations' 17 Sustainable Development Goals, challenging students to build real tech solutions that address pressing global issues - from clean energy and quality education to responsible consumption and climate action.",
      "The workshops use the MERN stack (MongoDB, Express, React, Node.js) as the foundation, chosen for its accessibility and versatility so that even beginners can get up to speed quickly. ACM-VIT members guide participants through the entire process - from understanding the problem statement to building and deploying a working solution. The event bridges the gap between learning to code and applying those skills to create meaningful social impact.",
    ],
    format: "Workshop · Hands-on Build",
    duration: "1–2 sessions",
    mode: "Offline",
    audience: "All students",
    team: "Individual",
    organizedBy: "ACM-VIT",
    recurrence: "Annual · VIT SDG Week",
    registrationUrl: "https://instagram.com/acmvit",
    primaryCtaLabel: "Follow ACM-VIT",
    stats: [],
    tracks: [],
    schedule: [],
    prizes: [],
    highlights: [],
    perks: [],
    faq: [],
    socials: [
      { label: "Instagram · @acmvit", href: "https://instagram.com/acmvit" },
    ],
  },
};

export const eventSlugs = Object.keys(eventDetails);

// Map from Events.astro title to detail slug - keeps the cassette ordering in sync.
export const titleToSlug: Record<string, string> = {
  Apptitude: "apptitude",
  Code2Create: "code2create",
  Codart: "codart",
  "Code Plus Plus": "code-plus-plus",
  "Codex Cryptum": "codex-cryptum",
  "Cryptic Hunt": "cryptic-hunt",
  "Forktober Fest": "forktober",
  inspiHer: "inspiher",
  "The Neural Hack": "neural-hack",
  "Reverse Coding": "reverse-coding",
  "The Tiny Hack": "the-tiny-hack",
  "Be The Builder": "be-the-builder",
  CASA: "casa",
  "Deepfake: The Digital Doppelganger": "deepfake",
  "Computers Have Feelings Too": "dr-peter-robinson",
  "Search-Based Software Engineering": "dr-federica-sarro",
  "Kickstart Learn": "kickstart-learn",
  "SDG Workshops": "sdg-workshops",
};
