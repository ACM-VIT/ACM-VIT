// AUTO-GENERATED from content/ by the content compiler. DO NOT EDIT.
// Edit content/**/design-products entries (or the Keystatic admin UI) and run: npm run content:compile
import type { ProductGuide } from "../platform/schema/collections/design-products.ts";

export const items: ProductGuide[] = [
  {
    "slug": "unipool",
    "order": 0,
    "name": "UniPool",
    "tagline": "Carpool with your campus.",
    "category": "Mobile · Carpool",
    "story": [
      "UniPool matches students headed the same way - to class, the airport, or home - so they can share the trip and split the cost. UniPool 2 is a ground-up redesign of the 2024 original, shipping on both Android and iOS with in-app chat, live maps, and a notification pipeline that keeps both sides of a ride in sync.",
      "The identity is built on one pairing: a deep forest green that carries every surface and headline, and a lime that means exactly one thing - go. Warm cream keeps the app feeling like a campus noticeboard, not a cab aggregator."
    ],
    "accent": "#B5D750",
    "accentTonal": "#f2f8da",
    "hero": {
      "bg": "#263B33",
      "fg": "#FFFDF4",
      "sub": "#B5D750"
    },
    "logo": {
      "src": "/projects/unipool/projects-unipool-logo.webp",
      "width": 96
    },
    "facts": [
      {
        "label": "Platforms",
        "value": "iOS · Android · Web"
      },
      {
        "label": "Current release",
        "value": "UniPool 2 (2025)"
      },
      {
        "label": "First shipped",
        "value": "2024"
      },
      {
        "label": "Stack",
        "value": "React Native · Expo · Go"
      }
    ],
    "logos": [
      {
        "label": "Primary lockup",
        "src": "/design/products/unipool-lockup.png",
        "width": 170,
        "bg": "#B5D750",
        "fg": "#263B33"
      },
      {
        "label": "App icon - wordmark on lime",
        "src": "/projects/unipool/projects-unipool-logo.webp",
        "width": 92,
        "bg": "#FFFDF4",
        "fg": "#263B33"
      }
    ],
    "logoNote": "The wordmark is the mark: the double-o of Pool becomes the wheels of a monoline vehicle rolling over it. Because it reads at any size, the app icon is simply the stacked wordmark on lime. Forest on lime or cream only - never on photography, never recolored.",
    "palette": [
      {
        "name": "Forest",
        "hex": "#263B33",
        "on": "#FFFDF4",
        "use": "Primary surface, headlines, and body text. Carries the brand more than the lime does."
      },
      {
        "name": "Lime",
        "hex": "#B5D750",
        "on": "#263B33",
        "use": "One job: action. CTAs, active states, the route line. Never body text."
      },
      {
        "name": "Cream",
        "hex": "#FFFDF4",
        "on": "#263B33",
        "use": "Paper. Default light background across app and website."
      },
      {
        "name": "Warm cream",
        "hex": "#FBF7E9",
        "on": "#263B33",
        "use": "Tonal step for cards and alternate sections on cream."
      }
    ],
    "paletteNote": "Forest on cream and cream on forest both pass contrast comfortably; lime does not carry text on either. Lime is a shape and a highlight, never a paragraph.",
    "type": [
      {
        "family": "Trap",
        "role": "Display",
        "weights": "700",
        "note": "Licensed face, not bundled here - specimen is approximate.",
        "css": "'Trap', 'DM Sans', sans-serif",
        "sample": "Going my way?",
        "sampleSize": "44px",
        "sampleWeight": 800,
        "approximate": true
      },
      {
        "family": "Nunito Sans",
        "role": "UI & body",
        "weights": "300 / 400 / 600 / 700",
        "css": "'Nunito Sans', sans-serif",
        "sample": "Find a verified ride to class, the airport, or home. Share the trip, split the cost.",
        "sampleSize": "17px",
        "sampleWeight": 400
      },
      {
        "family": "JetBrains Mono",
        "role": "Numbers & fare math",
        "weights": "400 / 600",
        "css": "'JetBrains Mono', monospace",
        "sample": "₹140 → split 4 ways → ₹35",
        "sampleSize": "15px",
        "sampleWeight": 400
      }
    ],
    "typeNote": "Trap does the shouting on hero surfaces and store creatives; Nunito Sans does everything else. The rounded warmth of both keeps a logistics app from feeling like logistics.",
    "icons": {
      "images": [
        {
          "src": "/design/products/unipool-icon-home.svg",
          "alt": "Home doodle icon",
          "label": "home"
        },
        {
          "src": "/design/products/unipool-icon-search.svg",
          "alt": "Search doodle icon",
          "label": "search"
        },
        {
          "src": "/design/products/unipool-icon-map.svg",
          "alt": "Map doodle icon",
          "label": "map"
        },
        {
          "src": "/design/products/unipool-icon-location-pin.svg",
          "alt": "Location pin doodle icon",
          "label": "location-pin"
        },
        {
          "src": "/design/products/unipool-icon-message.svg",
          "alt": "Message doodle icon",
          "label": "message"
        },
        {
          "src": "/design/products/unipool-icon-bell.svg",
          "alt": "Bell doodle icon",
          "label": "bell"
        },
        {
          "src": "/design/products/unipool-icon-user.svg",
          "alt": "User doodle icon",
          "label": "user"
        },
        {
          "src": "/design/products/unipool-icon-car.svg",
          "alt": "Car doodle icon",
          "label": "car"
        }
      ],
      "bullets": [
        "Hand-drawn doodle line icons - wobbly on purpose, like a route sketched on a napkin.",
        "Single-weight ink strokes; no fills at rest. Active states may fill with lime.",
        "Drawn from a curated in-app library organized by category - interface, arrows, objects, hands.",
        "Never mix a geometric icon set into the same screen; the wobble is the system."
      ]
    },
    "personality": {
      "do": [
        "Friendly and practical - the tone of a classmate offering a seat.",
        "Lime means go: reserve it for the action the screen wants taken.",
        "Route lines, pickup pins, and the scooter illustrations carry the journey motif.",
        "Rounded geometry throughout - buttons, cards, map pins."
      ],
      "dont": [
        "No cab-aggregator urgency: no surge language, no countdown pressure.",
        "No lime body text on cream - it fails contrast and reads as neon soup.",
        "Don't put forest and black side by side; forest is the black.",
        "Don't restyle the wordmark's pool ripple."
      ]
    },
    "motifs": [
      {
        "title": "The route line",
        "desc": "A rounded path stroke in lime connecting two pins - the closest thing UniPool has to a graphic signature."
      },
      {
        "title": "Beep",
        "desc": "The scooter illustration set used on empty states and the website. Keep it monoline, keep it forest."
      },
      {
        "title": "Fare split",
        "desc": "Money UI leans on mono digits and division - the product's whole pitch in one number."
      }
    ],
    "shots": [
      {
        "src": "/projects/unipool/projects-unipool-shot-home.webp",
        "alt": "UniPool home feed"
      },
      {
        "src": "/projects/unipool/projects-unipool-shot-search.webp",
        "alt": "UniPool ride search"
      },
      {
        "src": "/projects/unipool/projects-unipool-shot-pay.webp",
        "alt": "UniPool fare split"
      }
    ],
    "links": [
      {
        "label": "unipool.acmvit.in",
        "href": "https://unipool.acmvit.in",
        "kind": "website"
      },
      {
        "label": "Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.carpoolitapp&hl=en",
        "kind": "play"
      },
      {
        "label": "App Store",
        "href": "https://apps.apple.com/in/app/unipool/id6756426249",
        "kind": "appstore"
      }
    ],
    "googleFonts": "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
  },
  {
    "slug": "examcooker",
    "order": 10,
    "name": "ExamCooker",
    "tagline": "Cramming, made easy.",
    "category": "Web · Academics",
    "story": [
      "ExamCooker is where VIT students go the week before exams: past papers, notes, syllabus PDFs, and forums for 100+ courses, searchable half-asleep. It runs on Next.js with community-uploaded resources and a search bar built to forgive typos.",
      "The identity is a kitchen at two times of day. Light mode is steam and porcelain - pale blues on near-white. Dark mode is the midnight-before-the-exam: a deep navy that most users actually live in. One typeface, Plus Jakarta Sans, holds the whole thing together."
    ],
    "accent": "#5FC4E7",
    "accentTonal": "#e7f5fb",
    "hero": {
      "bg": "#0C1222",
      "fg": "#EAF6FF",
      "sub": "#5FC4E7"
    },
    "logo": {
      "src": "/projects/examcooker/projects-examcooker-logo.webp",
      "width": 120
    },
    "facts": [
      {
        "label": "Platforms",
        "value": "Web · iOS · Android"
      },
      {
        "label": "Resources",
        "value": "Papers · Notes · Syllabi · Forums"
      },
      {
        "label": "Stack",
        "value": "Next.js · CockroachDB · Drizzle"
      },
      {
        "label": "Access",
        "value": "VIT Google sign-in"
      }
    ],
    "logos": [
      {
        "label": "App icon - gradient tile",
        "src": "/design/products/examcooker-app-icon.png",
        "width": 96,
        "bg": "#EAF6FF",
        "fg": "#0C1222"
      },
      {
        "label": "Site logo",
        "src": "/projects/examcooker/projects-examcooker-logo.webp",
        "width": 104,
        "bg": "#0C1222",
        "fg": "#EAF6FF"
      }
    ],
    "logoNote": "The mark is a monoline cooker: a pot with crossed utensils beneath it, drawn in a single white stroke. Store surfaces get the blue gradient tile; inside the product the mark runs flat - white on midnight, midnight on porcelain. The gradient never appears in the UI itself.",
    "palette": [
      {
        "name": "Steam",
        "hex": "#5FC4E7",
        "on": "#0C1222",
        "use": "Primary accent. Links, active states, and the brand blue in both themes."
      },
      {
        "name": "Royal",
        "hex": "#253EE0",
        "on": "#FFFFFF",
        "use": "Deep accent for emphasis, buttons, and headings on light surfaces."
      },
      {
        "name": "Mist",
        "hex": "#C2E6EC",
        "on": "#0C1222",
        "use": "Tonal fill for cards and tags in light mode."
      },
      {
        "name": "Sky",
        "hex": "#82BEE9",
        "on": "#0C1222",
        "use": "Secondary accent - hover states and illustration fills."
      },
      {
        "name": "Mint spark",
        "hex": "#3BF4C7",
        "on": "#0C1222",
        "use": "Success and 'fresh upload' moments. Use in pinches, not spreads."
      },
      {
        "name": "Midnight",
        "hex": "#0C1222",
        "on": "#EAF6FF",
        "use": "Dark-mode surface. The default mood the night before an exam."
      },
      {
        "name": "Porcelain",
        "hex": "#EAF6FF",
        "on": "#0C1222",
        "use": "Light-mode paper."
      }
    ],
    "paletteNote": "Every accent is a blue relative - the palette deliberately avoids alarm reds and warning yellows. An exam-resources product should lower the pulse, not raise it.",
    "type": [
      {
        "family": "Plus Jakarta Sans",
        "role": "Everything",
        "weights": "500 / 600 / 700 / 800",
        "css": "'Plus Jakarta Sans', sans-serif",
        "sample": "Past papers, notes & syllabus - in one place.",
        "sampleSize": "34px",
        "sampleWeight": 800
      },
      {
        "family": "Plus Jakarta Sans",
        "role": "Body & UI",
        "weights": "500",
        "css": "'Plus Jakarta Sans', sans-serif",
        "sample": "Type approximately anything half asleep and we will fetch the best results.",
        "sampleSize": "16px",
        "sampleWeight": 500
      }
    ],
    "typeNote": "One family, four weights. Medium (500) is the workhorse body weight; ExtraBold (800) headlines. No second face, no serifs - the product's calm comes from repetition.",
    "icons": {
      "images": [
        {
          "src": "/design/products/examcooker-app-icon.png",
          "alt": "ExamCooker cooker mark",
          "label": "cooker mark",
          "bg": "#EAF6FF"
        }
      ],
      "bullets": [
        "Rounded line icons on the same monoline weight as the cooker mark.",
        "Icons pick up steam blue for interactive states and stay neutral at rest.",
        "The favicon family reduces the mark to the pot alone - white and gradient cuts exist for dark and light tabs.",
        "Kitchen glyphs (pot, hat, utensils) are reserved for brand moments, not for navigation."
      ]
    },
    "personality": {
      "do": [
        "Calm, slightly wry - it knows you left everything to the last minute.",
        "Kitchen wordplay in features and empty states: cooking, recipes, fresh out the oven.",
        "Design light and dark together; dark navy is the primary mood, not an afterthought.",
        "Generous information density - it is a reference tool, let tables be tables."
      ],
      "dont": [
        "No panic mechanics: no red badges, no 'exam in 3 days!!' countdowns.",
        "Don't mix a second typeface into UI - Jakarta covers every register.",
        "Don't use mint spark for anything other than success or freshness.",
        "No gatekeeping copy - a first-year finding the site at 2 am is the target user."
      ]
    },
    "motifs": [
      {
        "title": "The kitchen",
        "desc": "Cooking is the product metaphor - the Figma page is literally called Kitchen Ideas. Features get plated, resources get cooked."
      },
      {
        "title": "Two kitchens",
        "desc": "Light (steam on porcelain) and dark (midnight navy) are equal citizens; every component ships in both."
      },
      {
        "title": "The search bar",
        "desc": "The hero of every layout. Whatever the page, search stays one glance away."
      }
    ],
    "shots": [
      {
        "src": "/projects/examcooker/projects-examcooker-shot-1.webp",
        "alt": "ExamCooker home"
      },
      {
        "src": "/projects/examcooker/projects-examcooker-shot-2.webp",
        "alt": "ExamCooker resource view"
      },
      {
        "src": "/projects/examcooker/projects-examcooker-shot-3.webp",
        "alt": "ExamCooker search results"
      }
    ],
    "links": [
      {
        "label": "examcooker.acmvit.in",
        "href": "https://examcooker.acmvit.in",
        "kind": "website"
      },
      {
        "label": "Google Play",
        "href": "https://play.google.com/store/apps/details?id=in.acmvit.examcooker",
        "kind": "play"
      },
      {
        "label": "App Store",
        "href": "https://apps.apple.com/ng/app/examcooker/id6765768416",
        "kind": "appstore"
      }
    ],
    "googleFonts": "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
  },
  {
    "slug": "conclave",
    "order": 20,
    "name": "Conclave",
    "wordmark": "c0nclav3",
    "tagline": "Meetings, minus the friction.",
    "category": "Web · Mobile · Real-time",
    "story": [
      "Conclave is ACM-VIT's real-time meetings platform: web and mobile clients, a mediasoup SFU underneath, and an in-meeting apps SDK so a call can hold more than faces. It is built for organised, low-friction discussions - the chapter runs on it.",
      "Of every product in the family, Conclave sits closest to the chapter's own identity. It inherits the website's skeleton directly - PolySans, the ink-dark surfaces, the ACM orange - and pushes it one step darker. The only liberty it takes is its name: the wordmark spells it c0nclav3."
    ],
    "accent": "#F95F4A",
    "accentTonal": "#ffeae5",
    "hero": {
      "bg": "#0a0a0b",
      "fg": "#fafafa",
      "sub": "#F95F4A"
    },
    "facts": [
      {
        "label": "Platforms",
        "value": "Web · iOS · Android"
      },
      {
        "label": "Architecture",
        "value": "Next.js · Expo · mediasoup SFU"
      },
      {
        "label": "Extensible",
        "value": "In-meeting apps SDK"
      },
      {
        "label": "Inherits from",
        "value": "acmvit.in design system"
      }
    ],
    "logos": [
      {
        "label": "The diamond",
        "src": "/design/products/conclave-favicon.svg",
        "width": 84,
        "bg": "#0a0a0b",
        "fg": "#fafafa"
      },
      {
        "label": "Wordmark",
        "text": {
          "content": "c0nclav3",
          "css": "'PolySans Wide DS', 'DM Sans', sans-serif",
          "size": "34px",
          "weight": 700
        },
        "bg": "#131316",
        "fg": "#fafafa"
      }
    ],
    "logoNote": "Conclave's mark is the ACM diamond itself, re-cut for the product - the strongest statement of inheritance in the family. The wordmark is typeset, not drawn: c0nclav3 in PolySans Bulky Wide, always lowercase. Diamond for icons and favicons, wordmark for headers; the two rarely need to appear together.",
    "palette": [
      {
        "name": "Void",
        "hex": "#0a0a0b",
        "on": "#fafafa",
        "use": "The call surface. Darker than the website's Ink - video tiles need to float on nothing."
      },
      {
        "name": "Panel",
        "hex": "#131316",
        "on": "#fafafa",
        "use": "Sheets, sidebars, and the meeting chrome."
      },
      {
        "name": "Surface ramp",
        "hex": "#18181b",
        "on": "#fafafa",
        "use": "Cards and controls step 18181b → 232327 → 2e2e33 on hover. Tone does the elevation."
      },
      {
        "name": "Cream",
        "hex": "#fafafa",
        "on": "#0a0a0b",
        "use": "Text and icons. Full-contrast white is reserved for active speakers."
      },
      {
        "name": "ACM Orange",
        "hex": "#F95F4A",
        "on": "#ffffff",
        "use": "Borrowed straight from the chapter. Primary actions, live indicators, focus rings."
      },
      {
        "name": "Pink",
        "hex": "#FF007A",
        "on": "#ffffff",
        "use": "Secondary accent - recording states and ACM-W surfaces."
      }
    ],
    "paletteNote": "There is no light mode and that is a decision, not a gap: a meetings product lives in dark rooms and shared screens. Elevation comes from the surface ramp, never from shadows.",
    "type": [
      {
        "family": "PolySans Bulky Wide",
        "role": "Display & wordmark",
        "weights": "Bulky",
        "css": "'PolySans Wide DS', 'DM Sans', sans-serif",
        "sample": "c0nclav3",
        "sampleSize": "44px",
        "sampleWeight": 700
      },
      {
        "family": "PolySans",
        "role": "UI & body",
        "weights": "Slim / Neutral / Median",
        "css": "'PolySans DS', 'DM Sans', sans-serif",
        "sample": "A video conferencing platform for meetings, webinars, and collaboration.",
        "sampleSize": "17px",
        "sampleWeight": 400
      },
      {
        "family": "Virgil",
        "role": "Doodles & annotations",
        "weights": "400",
        "note": "The Excalidraw hand - used for whiteboard annotations only.",
        "css": "'Virgil', 'Bradley Hand', cursive",
        "sample": "circle the action items →",
        "sampleSize": "20px",
        "sampleWeight": 400,
        "approximate": true
      }
    ],
    "typeNote": "Same faces as acmvit.in, same jobs: Bulky Wide shouts, regular PolySans works. Virgil appears only where a human is drawing - never in chrome.",
    "icons": {
      "images": [
        {
          "src": "/design/products/conclave-favicon.svg",
          "alt": "Conclave diamond favicon",
          "label": "favicon",
          "bg": "#0a0a0b"
        },
        {
          "src": "/design/products/conclave-touch-icon.png",
          "alt": "Conclave touch icon",
          "label": "touch icon",
          "bg": "#131316"
        }
      ],
      "bullets": [
        "Line icons follow the chapter spec - 1.75px stroke on a 24px grid, rounded caps.",
        "In-call controls are the icon set's main stage: mic, camera, share, apps - cream at rest.",
        "Orange fills mean live: an orange icon is capturing, recording, or broadcasting.",
        "The diamond is the only branded glyph; no other icon carries identity."
      ]
    },
    "personality": {
      "do": [
        "Quiet chrome: in a call, the interface recedes and the people are the UI.",
        "Leetspeak stays in the wordmark - c0nclav3 is a logo, not a spelling.",
        "Orange means live: active mic, live recording, the join button.",
        "Motion follows the chapter's rules - power3, fast, functional."
      ],
      "dont": [
        "No light mode. Do not build one for a slide deck.",
        "Never write c0nclav3 in body copy, docs, or store listings - there it is Conclave.",
        "Don't introduce a third accent; orange and pink cover every state.",
        "No shadows for elevation - step the surface ramp instead."
      ]
    },
    "motifs": [
      {
        "title": "The wordmark",
        "desc": "c0nclav3, set in PolySans Bulky Wide. The numerals are the brand's one joke; everything else plays it straight."
      },
      {
        "title": "Surface ramp",
        "desc": "Four grays between void and control - the same tonal-elevation idea as the chapter site, tuned for video."
      },
      {
        "title": "Tiles on nothing",
        "desc": "Video tiles get rounded corners on pure void, no borders - light from the video itself does the separating."
      }
    ],
    "links": [
      {
        "label": "conclave.acmvit.in",
        "href": "https://conclave.acmvit.in",
        "kind": "website"
      },
      {
        "label": "Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.acmvit.conclave&hl=en",
        "kind": "play"
      },
      {
        "label": "App Store",
        "href": "https://apps.apple.com/dk/app/conclave-by-acm-vit/id6758411334",
        "kind": "appstore"
      }
    ]
  },
  {
    "slug": "grep",
    "order": 30,
    "name": "GREP",
    "tagline": "Your search query for ACM-VIT updates.",
    "category": "Print · Newsletter",
    "story": [
      "GREP is the chapter's quarterly newsletter - a print-first, A4 publication that reads like a zine and files like a report. Edition v0, the Origins Edition, retraced ACM-VIT's fifteen-year journey; every edition after tracks a quarter of events, projects, and people.",
      "The identity is a keyboard on paper: warm cream stock, a single cobalt blue doing all the talking, a pixel-LED wordmark, and a cursive script for the human moments. It is the loudest single-color system in the family - one ink, total commitment."
    ],
    "accent": "#2023FE",
    "accentTonal": "#e6e7ff",
    "hero": {
      "bg": "#FEFBE7",
      "fg": "#2023FE",
      "sub": "#686868"
    },
    "logo": {
      "src": "/grep/grep-wordmark.png",
      "width": 180
    },
    "facts": [
      {
        "label": "Format",
        "value": "A4 print + web reader"
      },
      {
        "label": "Cadence",
        "value": "Quarterly"
      },
      {
        "label": "First edition",
        "value": "v0 · Origins (2025)"
      },
      {
        "label": "Read at",
        "value": "acmvit.in/grep"
      }
    ],
    "logos": [
      {
        "label": "Pixel wordmark",
        "src": "/grep/grep-wordmark.png",
        "width": 170,
        "bg": "#2023FE",
        "fg": "#FEFBE7"
      },
      {
        "label": "Cobalt on paper",
        "text": {
          "content": "GREP",
          "css": "'ChessType DS', monospace",
          "size": "44px"
        },
        "bg": "#FEFBE7",
        "fg": "#2023FE"
      }
    ],
    "logoNote": "The wordmark is typeset, not drawn: GREP in ChessType's pixel-LED dots, usually stacked GR over EP on covers, with 'by acm-vit' underneath in Borel script. Two colorways exist - cobalt on paper, paper on cobalt - and no third. Never anti-alias it into softness; the hard pixel edge is the point.",
    "palette": [
      {
        "name": "Cobalt",
        "hex": "#2023FE",
        "on": "#FEFBE7",
        "use": "The ink. Headers, illustrations, rules, folios - if it prints, it prints cobalt."
      },
      {
        "name": "Paper",
        "hex": "#FEFBE7",
        "on": "#2023FE",
        "use": "The stock. Every page starts here; large cobalt blocks reverse onto it."
      },
      {
        "name": "Keycap",
        "hex": "#ECECEC",
        "on": "#686868",
        "use": "The keyboard motif's resting key color and subtle panel fill."
      },
      {
        "name": "Graphite",
        "hex": "#686868",
        "on": "#FEFBE7",
        "use": "Long-form body text - full cobalt paragraphs would vibrate."
      },
      {
        "name": "ACM-W Pink",
        "hex": "#FF007A",
        "on": "#FEFBE7",
        "use": "Full-page takeover: ACM-W features swap every cobalt element to pink."
      }
    ],
    "paletteNote": "One ink on one paper. The discipline is the identity - when a page needs a second voice (ACM-W), the whole page changes ink rather than mixing two.",
    "type": [
      {
        "family": "ChessType",
        "role": "Wordmark & section numbers",
        "weights": "400",
        "note": "Pixel-LED face. Wordmark and folio numbers only.",
        "css": "'ChessType DS', monospace",
        "sample": "GREP",
        "sampleSize": "52px",
        "sampleWeight": 400
      },
      {
        "family": "Borel",
        "role": "Script headings",
        "weights": "400",
        "note": "The handwritten voice - chapter headings and pull quotes.",
        "css": "'Borel', cursive",
        "sample": "Table of Contents",
        "sampleSize": "30px",
        "sampleWeight": 400
      },
      {
        "family": "Inter",
        "role": "Body",
        "weights": "500",
        "css": "'Inter', sans-serif",
        "sample": "A curated snapshot of the chapter's journey - initiatives, impactful work, and the people who make it happen.",
        "sampleSize": "16px",
        "sampleWeight": 500
      }
    ],
    "typeNote": "Three registers, three faces: the machine (ChessType), the hand (Borel), the report (Inter). Each stays in its lane - the pixel face never sets a sentence, the script never sets a caption.",
    "icons": {
      "images": [
        {
          "src": "/grep/grep-keyboard.svg",
          "alt": "GREP keyboard illustration",
          "label": "the keyboard",
          "bg": "#FEFBE7"
        },
        {
          "src": "/grep/grep-mailbox.svg",
          "alt": "GREP mailbox illustration",
          "label": "the mailbox",
          "bg": "#FEFBE7"
        }
      ],
      "bullets": [
        "GREP doesn't separate icons from illustration - everything is one monoline cobalt pen.",
        "Spot illustrations mark every section: a thinker for questions, a balloon for milestones, a mailbox for delivery.",
        "Keycaps double as UI: highlighted keys spell the issue, single keys badge the sections.",
        "No fills except flat cobalt shapes; no gradients, ever - it has to survive a photocopier."
      ]
    },
    "personality": {
      "do": [
        "Editorial and warm - a zine assembled by people who care, not a corporate PDF.",
        "Keyboard everywhere: keycaps frame the cover, highlighted keys spell the issue.",
        "Monoline cobalt illustrations on every page - people, mailboxes, balloons.",
        "The wavy header band and the footer line - 'Because Technology Matters' - anchor every page."
      ],
      "dont": [
        "No photography inside the newsletter - illustration carries it all.",
        "Never mix cobalt and pink on one page; a page picks its ink.",
        "Don't set body copy in cobalt - graphite exists so paragraphs stay readable.",
        "No gradient, no shadow, no halftone - flat ink on paper, like actual print."
      ]
    },
    "motifs": [
      {
        "title": "The keyboard",
        "desc": "Cream keycaps in a full spread; lavender-highlighted keys spell g-r-e-p. The cover is the logo."
      },
      {
        "title": "The mailbox",
        "desc": "The delivery mascot - a cobalt monoline mailbox with a letter on a spring. Marks subscription and delivery moments."
      },
      {
        "title": "The wavy band",
        "desc": "Every page tops out with a cobalt wave - the newsletter's running header and its most recognizable silhouette."
      }
    ],
    "links": [
      {
        "label": "Read GREP",
        "href": "/grep",
        "kind": "read"
      }
    ],
    "googleFonts": "https://fonts.googleapis.com/css2?family=Borel&family=Inter:wght@500;600&display=swap"
  },
  {
    "slug": "acmone",
    "order": 40,
    "name": "ACMOne",
    "tagline": "All of ACM, in one.",
    "category": "Mobile · Chapter Ops",
    "story": [
      "ACMOne is the app ACM-VIT built to run ACM-VIT: announcements, a shared events calendar, meeting agendas and minutes, task ownership, and an ID scanner that turns On Duty and Night Slip paperwork into a tap. Its audience is the 100+ member organising committee - it is the family's one internal product.",
      "Being internal bought it the most relaxed identity in the family: a deep ink-plum base carrying a pastel trio of periwinkle, mint, and dusty rose. Nothing else ACM-VIT ships looks like it, and since its users chose to be there, nothing has to convert them."
    ],
    "accent": "#7F8CC0",
    "accentTonal": "#eceef7",
    "hero": {
      "bg": "#1C1C23",
      "fg": "#FEFDF8",
      "sub": "#DBB8BF"
    },
    "logo": {
      "src": "/projects/acmone/projects-acmone-logo.webp",
      "width": 110
    },
    "facts": [
      {
        "label": "Platform",
        "value": "Android (internal)"
      },
      {
        "label": "Audience",
        "value": "100+ committee members"
      },
      {
        "label": "Stack",
        "value": "React Native · Expo · FastAPI"
      },
      {
        "label": "First shipped",
        "value": "2024"
      }
    ],
    "logos": [
      {
        "label": "App icon - the 1",
        "src": "/projects/acmone/projects-acmone-logo.webp",
        "width": 96,
        "bg": "#FEFDF8",
        "fg": "#1C1C23"
      },
      {
        "label": "Stacked lockup",
        "text": {
          "content": "ACM ONE",
          "css": "'Garet', 'DM Sans', sans-serif",
          "size": "34px",
          "weight": 800
        },
        "bg": "#7F8CC0",
        "fg": "#1C1C23"
      }
    ],
    "logoNote": "The icon is the lockup's party trick: A-C-M stacked and stretched until the whole arrangement reads as a giant numeral 1. Porcelain on ink, always - the pastels tint the UI, never the mark. If the 1 stops reading, the icon is being used too small.",
    "palette": [
      {
        "name": "One Ink",
        "hex": "#1C1C23",
        "on": "#FEFDF8",
        "use": "Base surface. A plum-leaning near-black that warms the pastels sitting on it."
      },
      {
        "name": "Porcelain",
        "hex": "#FEFDF8",
        "on": "#1C1C23",
        "use": "Text on ink, and the light surface for content-dense views."
      },
      {
        "name": "Periwinkle",
        "hex": "#7F8CC0",
        "on": "#1C1C23",
        "use": "Primary pastel - headers, active tabs, the calendar."
      },
      {
        "name": "Mint",
        "hex": "#B6DAD0",
        "on": "#1C1C23",
        "use": "Success, attendance, and the scanner's confirm states."
      },
      {
        "name": "Dusty rose",
        "hex": "#DBB8BF",
        "on": "#1C1C23",
        "use": "Highlights, meeting cards, and the cover's signature tint."
      },
      {
        "name": "Blush",
        "hex": "#ECDCDF",
        "on": "#1C1C23",
        "use": "Tonal fill behind rose elements - the soft step between rose and porcelain."
      }
    ],
    "paletteNote": "Three pastels share the stage evenly - none of them is 'the' brand color, which keeps a dense ops tool feeling light. The site's project card paints ACMOne chapter-orange; inside the product, that orange never appears.",
    "type": [
      {
        "family": "Garet Heavy",
        "role": "Display & splash",
        "weights": "Heavy",
        "note": "Licensed geometric face - the stacked ACM/ONE splash. Specimen approximate.",
        "css": "'Garet', 'DM Sans', sans-serif",
        "sample": "ACM ONE",
        "sampleSize": "44px",
        "sampleWeight": 800,
        "approximate": true
      },
      {
        "family": "DM Sans",
        "role": "UI & body",
        "weights": "400 / 500 / 700",
        "note": "The chapter's own typeface, carried into the internal tool.",
        "css": "'DM Sans', sans-serif",
        "sample": "Meetings, tasks, OD scans, and everything the committee runs on.",
        "sampleSize": "17px",
        "sampleWeight": 500
      }
    ],
    "typeNote": "Garet Heavy exists for exactly one gesture - the stacked ACM / ONE lockup. Everything functional is DM Sans, the same face as the chapter site, so internal tools still feel like home.",
    "icons": {
      "images": [
        {
          "src": "/projects/acmone/projects-acmone-logo.webp",
          "alt": "ACMOne app icon",
          "label": "app icon",
          "bg": "#1C1C23"
        }
      ],
      "bullets": [
        "Rounded line icons in porcelain on ink - quiet enough for a 20-times-a-day tool.",
        "Function-coded tints: periwinkle for planning, mint for confirmations, rose for meetings.",
        "The scanner viewfinder - mint corners on ink - is the app's most recognizable icon moment.",
        "Google sign-in keeps its own colors; nothing else on screen gets to be that loud."
      ]
    },
    "personality": {
      "do": [
        "Utilitarian first: this is a tool people open twenty times a day.",
        "Pastels code function - periwinkle plans, mint confirms, rose highlights.",
        "Playful in the gaps: splash screens and empty states can grin.",
        "Respect the density - lists, calendars, and scanners want clarity over air."
      ],
      "dont": [
        "No chapter orange inside the app - ACMOne's warmth comes from its pastels.",
        "Don't promote it like a public product; it ships to a closed committee.",
        "Don't let any single pastel take over - the trio shares the stage.",
        "No dark-pattern urgency on tasks; the users are volunteers, not metrics."
      ]
    },
    "motifs": [
      {
        "title": "The stacked lockup",
        "desc": "ACM over ONE in Garet Heavy, repeated as a pattern on the splash - the app's one big brand gesture."
      },
      {
        "title": "Pastel blocking",
        "desc": "Whole sections tint by function: periwinkle calendar, mint attendance, rose meetings."
      },
      {
        "title": "The scanner frame",
        "desc": "The ID-scan viewfinder - mint corners on ink - is the most-used screen and the de facto icon of the app."
      }
    ],
    "shots": [
      {
        "src": "/projects/acmone/projects-acmone-screen-1.webp",
        "alt": "ACMOne home screen"
      },
      {
        "src": "/projects/acmone/projects-acmone-screen-2.webp",
        "alt": "ACMOne events view"
      },
      {
        "src": "/projects/acmone/projects-acmone-screen-3.webp",
        "alt": "ACMOne ID scanning flow"
      }
    ],
    "links": [
      {
        "label": "acmone.acmvit.in",
        "href": "https://acmone.acmvit.in",
        "kind": "website"
      },
      {
        "label": "Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.acmvit.acmone&hl=en_IN",
        "kind": "play"
      }
    ]
  },
  {
    "slug": "website",
    "order": 50,
    "name": "acmvit.in",
    "tagline": "The mixtape the chapter ships.",
    "category": "Web · Chapter Site",
    "story": [
      "acmvit.in is the chapter's home - projects, events, recruitment, the blog, merch, and the player. It runs dark by default: Ink surfaces, Cream text, orange accents, and the cassette-and-mixtape identity threaded through heroes, tiles, and empty states. Light mode swaps to Paper with charcoal text.",
      "It is also the reference implementation of everything in these guidelines. Every product guide in this section describes a descendant of this system; the website is where the skeleton - the mark, the 4pt rhythm, the motion rules, the 1024px flip - lives at full strength."
    ],
    "accent": "#F95F4A",
    "accentTonal": "#ffeae5",
    "hero": {
      "bg": "#0D0E0D",
      "fg": "#FEFCD9",
      "sub": "#F95F4A"
    },
    "logo": {
      "src": "/design/logos/acm-horizontal-white.svg",
      "width": 210
    },
    "facts": [
      {
        "label": "Surfaces",
        "value": "Dark-first + light mode"
      },
      {
        "label": "Type",
        "value": "PolySans · DM Sans"
      },
      {
        "label": "Motion",
        "value": "GSAP + Lenis · power3.out"
      },
      {
        "label": "Layout",
        "value": "Splits flip at 1024px"
      }
    ],
    "logos": [
      {
        "label": "Horizontal - on dark",
        "src": "/design/logos/acm-horizontal-white.svg",
        "width": 190,
        "bg": "#0D0E0D",
        "fg": "#FEFCD9"
      },
      {
        "label": "Diamond - on light",
        "src": "/design/logos/acm-diamond-dark.svg",
        "width": 84,
        "bg": "#F5EDE4",
        "fg": "#1A1A1A"
      }
    ],
    "logoNote": "The website only ever uses the approved cuts - white on Ink, dark (#333) on Paper - with the diamond alone where space is tight. Full variant, clearspace, and misuse rules live in the Logo section of these guidelines.",
    "palette": [
      {
        "name": "Ink",
        "hex": "#0D0E0D",
        "on": "#FEFCD9",
        "use": "Default site background. Every dark surface is Ink or a tonal step above it."
      },
      {
        "name": "Cream",
        "hex": "#FEFCD9",
        "on": "#0D0E0D",
        "use": "Primary text on dark, and the sticker-label fill on cassette tiles."
      },
      {
        "name": "Paper",
        "hex": "#F5EDE4",
        "on": "#1A1A1A",
        "use": "Light-mode background."
      },
      {
        "name": "Charcoal",
        "hex": "#1A1A1A",
        "on": "#F5EDE4",
        "use": "Primary text in light mode."
      },
      {
        "name": "ACM Orange",
        "hex": "#F95F4A",
        "on": "#FFFFFF",
        "use": "The brand accent - CTAs, links, focus states, the player."
      },
      {
        "name": "Gold",
        "hex": "#F2C94C",
        "on": "#0D0E0D",
        "use": "Context accent: achievements and celebratory moments."
      },
      {
        "name": "Cyan",
        "hex": "#00B4D8",
        "on": "#0D0E0D",
        "use": "Context accent: FAQs, reference, and docs pages."
      }
    ],
    "paletteNote": "One accent per context, not a rainbow per page: orange is the default everywhere; gold belongs to achievements, cyan to FAQs and docs, pink to ACM-W, green to z0d1ak. The full chapter palette lives in the Color section.",
    "type": [
      {
        "family": "PolySans",
        "role": "Display & headings",
        "weights": "Bulky / Median",
        "css": "'PolySans Wide DS', 'DM Sans', sans-serif",
        "sample": "Because Technology Matters",
        "sampleSize": "36px",
        "sampleWeight": 700
      },
      {
        "family": "PolySans Mono",
        "role": "Labels, tags & body",
        "weights": "Median",
        "css": "'PolySans Mono DS', monospace",
        "sample": "tags, chips, and running copy - wide tracking, comfortable line-height",
        "sampleSize": "15px",
        "sampleWeight": 500
      },
      {
        "family": "Cormorant Garamond",
        "role": "Editorial accent",
        "weights": "400 / 500 / 600",
        "note": "One-off editorial moments (the Achievements page). Not a default.",
        "css": "'Cormorant Garamond', Georgia, serif",
        "sample": "Reserved for the rare page that earns a serif.",
        "sampleSize": "28px",
        "sampleWeight": 500
      }
    ],
    "typeNote": "PolySans in two voices - the standard cut for headings, Mono for labels and body - with a sanctioned serif exception. Headings run bold, uppercase, tight; labels run small, wide, patient.",
    "icons": {
      "images": [
        {
          "src": "/favicon.webp",
          "alt": "acmvit.in favicon",
          "label": "favicon",
          "bg": "#0D0E0D"
        }
      ],
      "bullets": [
        "Line icons on the chapter spec: 1.75px stroke, 24px grid, rounded caps and joins.",
        "Icons inherit text color - Cream on dark, Charcoal on light - never a color of their own.",
        "Cassette glyphs (reels, tapes, screws) badge the landing tiles and the player.",
        "Sizes stay on the 4pt scale: 16, 20, 24, 32."
      ]
    },
    "personality": {
      "do": [
        "Write like a person who builds this stuff - dry wit, specific numbers.",
        "Cassette and mixtape metaphors where they fit naturally.",
        "Dark-first: design the Ink version, then translate to Paper.",
        "Ship WebP with an original-format fallback, and an OpenGraph image on every page."
      ],
      "dont": [
        "Don't force a cassette pun where it doesn't fit.",
        "Don't reach for a new accent when a context color already exists.",
        "Don't bypass the 1024px flip - chrome and split layouts change together.",
        "Don't write copy that could belong to any other org."
      ]
    },
    "motifs": [
      {
        "title": "The cassette",
        "desc": "Reels, sleeves, and mixtapes are the running metaphor - project tiles are tapes, the player actually plays."
      },
      {
        "title": "Screws & stickers",
        "desc": "Corner screws and cream sticker labels give cards their hardware feel - the UI as a physical object."
      },
      {
        "title": "Floating docks",
        "desc": "Desktop sections carry floating docks that collapse into navbar panels on mobile - one convention, everywhere."
      }
    ],
    "extras": [
      {
        "title": "Signature components",
        "intro": "The pieces that make the site feel like the site. Live demos on the website-specific guide.",
        "items": [
          {
            "name": "Fill Button",
            "desc": "Primary action - flat fill, uppercase PolySans label, snappy hover."
          },
          {
            "name": "Animated Button",
            "desc": "Hero CTA - a dark pill with an accent circle that expands to reveal its label on hover."
          },
          {
            "name": "Cassette Tile",
            "desc": "Corner screws, cream sticker, spinning reels on hover. The landing page's More section."
          },
          {
            "name": "Accordion",
            "desc": "FAQs - same card language, a grid-rows collapse and a rotating play icon."
          }
        ]
      },
      {
        "title": "Motion rules",
        "items": [
          {
            "name": "Easing",
            "desc": "power3.out for reveals; cubic-bezier(0.25, 0.1, 0.25, 1) for hovers. Nothing bounces unless it's a bulb cord."
          },
          {
            "name": "Scroll reveals",
            "desc": "Opacity + y: 24-30px, lightly staggered, always guarded by prefers-reduced-motion."
          },
          {
            "name": "Buttons",
            "desc": "Snappy expand, not a slow reveal - state changes read in under 200ms."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "acmvit.in",
        "href": "https://www.acmvit.in",
        "kind": "website"
      },
      {
        "label": "Website-specific guide",
        "href": "/sleeve-notes",
        "kind": "read"
      }
    ],
    "googleFonts": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap"
  }
];
