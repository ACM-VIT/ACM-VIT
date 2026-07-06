// AUTO-GENERATED from content/ by the content compiler. DO NOT EDIT.
// Edit content/**/project-details entries (or the Keystatic admin UI) and run: npm run content:compile
import type { ProjectDetail } from "../platform/schema/collections/project-details.ts";

export const items: ProjectDetail[] = [
  {
    "slug": "acmone",
    "order": 0,
    "title": "ACMOne",
    "tagline": "All of ACM, in one.",
    "eyebrow": "ACM-VIT · Mobile · Chapter Ops",
    "themeColor": "#F95F4A",
    "themeColorSecondary": "#2A1410",
    "shortDescription": "Internal app for ACM-VIT's 100+ organising committee. Announcements, events calendar, meetings, ID scanning for On Duty and Night Slips, learning resources - one place for everything chapter ops.",
    "longDescription": [
      "Running a 100-strong student chapter gets messy fast. Meetings stack up, deadlines slip through DMs, ODs get lost in spreadsheets. ACMOne is what ACM-VIT built so the people running ACM-VIT could stop firefighting and start shipping.",
      "Members get real-time announcements, a shared events calendar, meeting agendas + minutes in one place, and an ID scanner that takes On Duty and Night Slip registrations from a 10-minute Google Form ritual down to a tap. Leads manage roles, assign tasks, and track who's actually around for the next event.",
      "The Android app is built in React Native + Expo with Firebase + Auth0 for sign-in. The backend is FastAPI on Docker, SQLAlchemy talking to PostgreSQL on CockroachDB, and a Google APIs integration so calendar + sheets stay in sync with the chapter's existing workflows."
    ],
    "status": "online",
    "statusNote": "Internal - chapter only",
    "heroImage": "/projects/acmone/projects-acmone-logo.webp",
    "gallery": [
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
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "100+",
        "label": "Committee members"
      },
      {
        "value": "Android",
        "label": "Platform"
      },
      {
        "value": "2024",
        "label": "First shipped"
      },
      {
        "value": "Internal",
        "label": "Audience"
      }
    ],
    "features": [
      {
        "title": "Real-time announcements",
        "description": "Push updates to the whole committee so nothing lives in a forgotten DM."
      },
      {
        "title": "Events calendar",
        "description": "Every workshop, meeting, and deadline in one shared view. No more 'when was that again?'"
      },
      {
        "title": "Meeting ops",
        "description": "Schedule, set agendas, capture minutes. Past meetings stay searchable."
      },
      {
        "title": "ID scanning for OD / Night Slip",
        "description": "Camera-based scanner registers On Duty and Night Slip entries in seconds."
      },
      {
        "title": "Roles and tasks",
        "description": "Assign responsibilities, track ownership, see who's handling what at a glance."
      },
      {
        "title": "Learning resources",
        "description": "Workshop material and reading lists pulled straight into the app for new inductees."
      }
    ],
    "techStack": [
      {
        "category": "Mobile",
        "slugs": [
          "react-native",
          "expo",
          "typescript",
          "firebase"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "python",
          "postgresql",
          "cockroachdb",
          "docker"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "gcp"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github",
          "postman"
        ]
      }
    ],
    "developers": [
      {
        "github": "tanushgolwala",
        "role": "Lead developer"
      },
      {
        "github": "theg1239",
        "role": "Developer"
      },
      {
        "github": "Balaji-3009",
        "role": "Developer"
      },
      {
        "github": "TejasGhatte",
        "role": "Developer"
      },
      {
        "github": "DibyashaktiMoharana",
        "role": "Developer"
      },
      {
        "github": "ShreyasM09",
        "role": "Developer"
      },
      {
        "github": "harshitaak07",
        "role": "Developer"
      },
      {
        "github": "TaniyaRajesh",
        "role": "Developer"
      },
      {
        "github": "Pratishtha36",
        "role": "Developer"
      },
      {
        "github": "JothishKamal",
        "role": "Developer"
      },
      {
        "github": "yashsinha1224",
        "role": "Developer"
      },
      {
        "github": "Van5sh",
        "role": "Developer"
      },
      {
        "github": "Kashishsingh4",
        "role": "Developer"
      },
      {
        "github": "Mkrishbl4z3",
        "role": "Developer"
      },
      {
        "github": "RealAradhyaGupta",
        "role": "Developer"
      },
      {
        "github": "nishthaaggarwal24",
        "role": "Developer"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://acmone.acmvit.in",
        "kind": "website"
      },
      {
        "label": "App repo",
        "href": "https://github.com/ACM-VIT/ACMOne-app",
        "kind": "github"
      },
      {
        "label": "Backend repo",
        "href": "https://github.com/ACM-VIT/ACMOne-backend",
        "kind": "github"
      },
      {
        "label": "Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.acmvit.acmone&hl=en_IN",
        "kind": "play"
      }
    ],
    "commitGraphSeed": 42
  },
  {
    "slug": "unipool",
    "order": 10,
    "title": "UniPool",
    "tagline": "Carpooling, redesigned for campus.",
    "eyebrow": "ACM-VIT · Mobile · Carpool",
    "themeColor": "#B5D750",
    "themeColorSecondary": "#263B33",
    "shortDescription": "Carpooling app for university students. Find people headed your way, split fares, chat in-app, and track rides on a live map.",
    "longDescription": [
      "UniPool is a student-first carpooling app built by ACM-VIT to make daily commute and weekend travel easier for university students. Riders post or join trips, match on routes, coordinate in chat, and meet at a pickup pin on the map.",
      "The current release (UniPool 2) is a ground-up redesign of the original 2024 app. It's available on both Android and iOS, ships an in-app chat, native maps with live pickup, and a notification pipeline that actually keeps both sides of the ride in sync.",
      "Under the hood it's the same idea as before - students helping students travel cheaper and safer - but with a cleaner flow, fewer taps, and a UI built for the way people actually plan trips on a campus."
    ],
    "status": "online",
    "statusNote": "Actively maintained",
    "heroImage": "/projects/unipool/projects-unipool-main-logo.svg",
    "gallery": [
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
    "stats": [
      {
        "value": "iOS + Android",
        "label": "Platforms"
      },
      {
        "value": "v2.0",
        "label": "Current release"
      },
      {
        "value": "2024",
        "label": "First shipped"
      },
      {
        "value": "Campus-first",
        "label": "Audience"
      }
    ],
    "features": [
      {
        "title": "In-app chat",
        "description": "1-on-1 and ride group chats so co-riders can coordinate pickup without leaking phone numbers."
      },
      {
        "title": "Live map",
        "description": "Native map with pickup pins, route preview, and trip status."
      },
      {
        "title": "Smart notifications",
        "description": "Ride requests, accepts, reminders, and status changes pushed across both platforms."
      },
      {
        "title": "Redesigned UX",
        "description": "Rebuilt from scratch over UniPool 1 - fewer taps to post or join a ride."
      },
      {
        "title": "Cross-platform",
        "description": "Built once for iOS and Android via React Native / Expo."
      },
      {
        "title": "Auth that just works",
        "description": "Firebase + Google sign-in, no separate password to forget."
      }
    ],
    "techStack": [
      {
        "category": "Mobile",
        "slugs": [
          "react-native",
          "expo",
          "typescript",
          "react"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "go",
          "postgresql",
          "gcp",
          "firebase"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github",
          "postman"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "UniPool 2 - Lead developer"
      }
    ],
    "designers": [
      {
        "name": "JuxtaRYCT",
        "linkedin": "https://www.linkedin.com/in/juxtaryct/",
        "role": "UniPool 2 - Design"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://unipool.acmvit.in/",
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
    "versions": [
      {
        "label": "UniPool 2",
        "year": "2025",
        "blurb": "Total redesign. Chat, native maps, push notifications, smoother onboarding, and an iOS release alongside Android.",
        "techSlugs": [
          "react-native",
          "expo",
          "typescript",
          "go",
          "postgresql",
          "firebase",
          "gcp"
        ],
        "developers": [
          {
            "github": "theg1239",
            "role": "Lead developer"
          }
        ],
        "designers": [
          {
            "name": "JuxtaRYCT",
            "linkedin": "https://www.linkedin.com/in/juxtaryct/",
            "role": "Design"
          }
        ],
        "links": [
          {
            "label": "Website",
            "href": "https://unipool.acmvit.in/",
            "kind": "website"
          }
        ],
        "themeColor": "#B5D750"
      },
      {
        "label": "UniPool 1",
        "year": "2024",
        "blurb": "First release. Android-only via Play Store. Picked up decent traction across the campus carpool crowd.",
        "techSlugs": [
          "react-native",
          "expo",
          "typescript",
          "go",
          "postgresql",
          "firebase",
          "gcp"
        ],
        "developers": [
          {
            "github": "tanushgolwala"
          },
          {
            "github": "mananssh"
          },
          {
            "github": "harshitaak07"
          },
          {
            "github": "eshita241"
          },
          {
            "github": "aastikn"
          },
          {
            "github": "JuxtaRYCT"
          }
        ],
        "designers": [
          {
            "name": "Srija Puvvada",
            "linkedin": "https://www.linkedin.com/in/srija-puvvada-5764962b5/"
          },
          {
            "name": "Karn",
            "linkedin": "https://www.linkedin.com/in/karnx/"
          }
        ],
        "themeColor": "#7C3AED"
      }
    ],
    "commitGraphSeed": 71
  },
  {
    "slug": "examcooker",
    "order": 20,
    "title": "ExamCooker",
    "tagline": "Cramming, made easy.",
    "eyebrow": "ACM-VIT · Web + Mobile · EdTech",
    "themeColor": "#27BAEC",
    "themeColorSecondary": "#253EE0",
    "shortDescription": "One-stop platform for exam resources. Past papers, notes, syllabi, forums, and a resource repo - built by students, for the 2 AM crammer.",
    "longDescription": [
      "ExamCooker started as a summer project idea from a senior who wanted a single place for past year papers and notes. Four maintainers from ACM-VIT shaped it into a full-stack platform that now serves 15,000+ students across VIT Vellore.",
      "Students upload and access past papers, contribute notes, check syllabi, and discuss on forums. The platform verifies VIT email addresses via Google OAuth, generates PDF thumbnails on the fly, and caches aggressively with Redis so it doesn't fall over during exam week traffic spikes.",
      "The app ships on web, Android, and iOS. Under the hood it runs Next.js 14 with server-side rendering on Vercel, a FastAPI microservice for PDF processing, CockroachDB for distributed storage, and Google Cloud Storage for file hosting."
    ],
    "status": "online",
    "statusNote": "Actively maintained",
    "heroImage": "/projects/examcooker/projects-examcooker-logo.webp",
    "gallery": [
      {
        "src": "/projects/examcooker/projects-examcooker-shot-1.webp",
        "alt": "ExamCooker papers view"
      },
      {
        "src": "/projects/examcooker/projects-examcooker-shot-2.webp",
        "alt": "ExamCooker syllabus repository"
      },
      {
        "src": "/projects/examcooker/projects-examcooker-shot-3.webp",
        "alt": "ExamCooker home screen"
      }
    ],
    "stats": [
      {
        "value": "15,000+",
        "label": "Active users"
      },
      {
        "value": "Web + iOS + Android",
        "label": "Platforms"
      },
      {
        "value": "100+",
        "label": "Courses covered"
      },
      {
        "value": "2024",
        "label": "First shipped"
      }
    ],
    "features": [
      {
        "title": "Past papers",
        "description": "Searchable repository of previous exam papers across 100+ courses, tagged by semester and subject."
      },
      {
        "title": "Student notes",
        "description": "Community-contributed notes. Upload your own or study from someone else's."
      },
      {
        "title": "Syllabus tracker",
        "description": "Know exactly what's in scope before you start cramming."
      },
      {
        "title": "Forums",
        "description": "Discussion boards for peer-to-peer Q&A and exam strategy."
      },
      {
        "title": "Resource repo",
        "description": "Curated links to articles, videos, and external learning material."
      },
      {
        "title": "PDF preview",
        "description": "Instant thumbnail previews of uploaded PDFs. No more downloading to check if it's the right paper."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "python",
          "cockroachdb",
          "prisma",
          "redis"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "vercel",
          "gcp"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "Lead developer"
      },
      {
        "github": "Supratim69",
        "role": "Maintainer"
      },
      {
        "github": "Alan-J-Bibins",
        "role": "Developer"
      },
      {
        "github": "RohitPhaniramSakamuri",
        "role": "Developer"
      },
      {
        "github": "kairavsheth",
        "role": "Maintainer"
      },
      {
        "github": "nitine",
        "role": "Developer"
      },
      {
        "github": "AnishaDhoot",
        "role": "Developer"
      },
      {
        "github": "ojask99",
        "role": "Developer"
      },
      {
        "github": "Nitesh-04",
        "role": "Maintainer"
      },
      {
        "github": "thinkter",
        "role": "Developer"
      },
      {
        "github": "Kaustubh-sandy",
        "role": "Developer"
      },
      {
        "github": "mahendra785",
        "role": "Developer"
      },
      {
        "github": "tanushgolwala",
        "role": "Developer"
      },
      {
        "github": "adii2ma",
        "role": "Developer"
      },
      {
        "github": "drashtishukla",
        "role": "Developer"
      },
      {
        "github": "SarupaVL",
        "role": "Developer"
      },
      {
        "github": "bhatiyavansh",
        "role": "Developer"
      },
      {
        "github": "vianmangal",
        "role": "Developer"
      },
      {
        "github": "eshita241",
        "role": "Maintainer"
      },
      {
        "github": "pj4real",
        "role": "Developer"
      },
      {
        "github": "Passive-Coder",
        "role": "Developer"
      },
      {
        "github": "ant1v3n0m",
        "role": "Developer"
      }
    ],
    "designers": [
      {
        "name": "Alan J Bibins",
        "linkedin": "https://www.linkedin.com/in/alanjbibins/",
        "role": "Design"
      },
      {
        "name": "Krishika Sureka",
        "linkedin": "https://www.linkedin.com/in/krishikasureka/",
        "role": "Design"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://examcooker.acmvit.in/",
        "kind": "website"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/ExamCooker",
        "kind": "github"
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
      },
      {
        "label": "Blog",
        "href": "https://blog.acmvit.in/the-chefs-secrets-the-story-behind-examcooker",
        "kind": "external"
      }
    ],
    "versions": [
      {
        "label": "ExamCooker App",
        "year": "2025",
        "blurb": "Native mobile app on iOS and Android, bringing past papers and notes to phones. Growth to 15,000+ users.",
        "techSlugs": [
          "react-native",
          "expo",
          "typescript"
        ],
        "developers": [
          {
            "github": "theg1239",
            "role": "Lead developer"
          }
        ]
      },
      {
        "label": "ExamCooker Website",
        "year": "2024",
        "blurb": "Full-stack web platform. Built during ACM summer project cycle. Hit 1,500 users during the first exam season.",
        "techSlugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss",
          "python",
          "cockroachdb",
          "prisma",
          "redis",
          "vercel",
          "gcp"
        ],
        "developers": [
          {
            "github": "theg1239",
            "role": "Lead developer"
          },
          {
            "github": "Supratim69",
            "role": "Maintainer"
          },
          {
            "github": "Alan-J-Bibins",
            "role": "Developer"
          },
          {
            "github": "RohitPhaniramSakamuri",
            "role": "Developer"
          },
          {
            "github": "kairavsheth",
            "role": "Maintainer"
          },
          {
            "github": "nitine",
            "role": "Developer"
          },
          {
            "github": "AnishaDhoot",
            "role": "Developer"
          },
          {
            "github": "ojask99",
            "role": "Developer"
          },
          {
            "github": "Nitesh-04",
            "role": "Maintainer"
          },
          {
            "github": "thinkter",
            "role": "Developer"
          },
          {
            "github": "Kaustubh-sandy",
            "role": "Developer"
          },
          {
            "github": "mahendra785",
            "role": "Developer"
          },
          {
            "github": "tanushgolwala",
            "role": "Developer"
          },
          {
            "github": "adii2ma",
            "role": "Developer"
          },
          {
            "github": "drashtishukla",
            "role": "Developer"
          },
          {
            "github": "SarupaVL",
            "role": "Developer"
          },
          {
            "github": "bhatiyavansh",
            "role": "Developer"
          },
          {
            "github": "vianmangal",
            "role": "Developer"
          },
          {
            "github": "eshita241",
            "role": "Maintainer"
          },
          {
            "github": "pj4real",
            "role": "Developer"
          },
          {
            "github": "Passive-Coder",
            "role": "Developer"
          },
          {
            "github": "ant1v3n0m",
            "role": "Developer"
          }
        ],
        "designers": [
          {
            "name": "Alan J Bibins",
            "linkedin": "https://www.linkedin.com/in/alanjbibins/",
            "role": "Design"
          },
          {
            "name": "Krishika Sureka",
            "linkedin": "https://www.linkedin.com/in/krishikasureka/",
            "role": "Design"
          }
        ]
      }
    ],
    "commitGraphSeed": 137
  },
  {
    "slug": "localhost",
    "order": 30,
    "title": "Localhost",
    "tagline": "Recruitment, opened in VS Code.",
    "eyebrow": "ACM-VIT · 2024 · Organising Committee Selections",
    "themeColor": "#B7AA98",
    "themeColorSecondary": "#EB5757",
    "shortDescription": "ACM-VIT's 2024 OCS portal, built end-to-end as VS Code in the browser. Every page, tab, sidebar and editor panel mirrored the editor. Readable content was rendered from Markdown files. Form rounds were Python files inside the editor area.",
    "longDescription": [
      "Localhost was ACM-VIT's organising committee selections portal for 2024. The brief was the usual one - run domain rounds for 100+ applicants - but the form factor was a complete rebuild of VS Code as a web app.",
      "The name is a joke at devs' own expense - every developer's first website lives at localhost, served out of their editor. The recruitment portal returned the favour by being a VS Code clone you open in a browser.",
      "The interface used a real activity bar, sidebar file explorer, tabbed editors, command palette and integrated terminal. The chapter's pitch, FAQs and round briefs were written as Markdown files and opened like any other tab. Form rounds were styled as Python files - the editor itself was the registration form.",
      "Under the hood, Localhost ran on Next.js 14 (App Router) with Prisma on CockroachDB, NextAuth for session management, Material UI as the component base, and a Vercel KV-backed rate limiter on top. The whole thing leaned hard on the editor aesthetic, with several easter eggs hidden across the file tree, command palette and terminal for applicants who actually went looking."
    ],
    "status": "archived",
    "statusNote": "Recruitment cycle closed",
    "cassetteSvg": "/projects/projects-localhost.svg",
    "gallery": [
      {
        "src": "/projects/localhost/projects-localhost-screen-1.webp",
        "alt": "Localhost VS Code-styled portal"
      },
      {
        "src": "/projects/localhost/projects-localhost-screen-2.webp",
        "alt": "Localhost editor view"
      },
      {
        "src": "/projects/localhost/projects-localhost-screen-3.webp",
        "alt": "Localhost markdown content"
      },
      {
        "src": "/projects/localhost/projects-localhost-screen-4.webp",
        "alt": "Localhost form round"
      },
      {
        "src": "/projects/localhost/projects-localhost-screen-5.webp",
        "alt": "Localhost terminal pane"
      },
      {
        "src": "/projects/localhost/projects-localhost-screen-6.webp",
        "alt": "Localhost portal flow"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "2024",
        "label": "Year"
      },
      {
        "value": "Web",
        "label": "Platform"
      },
      {
        "value": "VS Code",
        "label": "Theme"
      },
      {
        "value": ".md + .py",
        "label": "Content format"
      }
    ],
    "features": [
      {
        "title": "Full VS Code shell",
        "description": "Activity bar, file explorer, tabs, status bar, command palette - all of it."
      },
      {
        "title": "Markdown as content",
        "description": "Static round briefs, FAQs and chapter intro rendered from .md files inside the editor."
      },
      {
        "title": "Forms as Python files",
        "description": "Each form round opened as a .py file in the editor. Submitting felt like writing the script."
      },
      {
        "title": "Integrated terminal",
        "description": "Working terminal inside the portal for navigation and hidden commands."
      },
      {
        "title": "Rate-limited APIs",
        "description": "Vercel KV + Upstash ratelimit guarded the form endpoints against spam and abuse."
      },
      {
        "title": "Easter eggs",
        "description": "Hidden files, secret commands and a few small jokes scattered around for the curious."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "nextjs",
          "prisma",
          "cockroachdb"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "vercel"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github",
          "postman"
        ]
      }
    ],
    "developers": [
      {
        "github": "kairavsheth",
        "role": "Lead developer"
      },
      {
        "github": "Supratim69",
        "role": "Lead developer"
      },
      {
        "github": "lopus-maximus",
        "role": "Developer"
      },
      {
        "github": "curiousduckkk",
        "role": "Developer"
      },
      {
        "github": "Realitylion",
        "role": "Developer"
      },
      {
        "github": "shane-thomas",
        "role": "Developer"
      },
      {
        "github": "JuxtaRYCT",
        "role": "Design"
      }
    ],
    "links": [
      {
        "label": "Live portal",
        "href": "https://localhost.acmvit.in/",
        "kind": "website"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/enrollment-website-2024",
        "kind": "github"
      },
      {
        "label": "Walkthrough",
        "href": "https://www.youtube.com/watch?v=AGCgD3d8H4Q&t=113s",
        "kind": "demo"
      }
    ],
    "commitGraphSeed": 314
  },
  {
    "slug": "ocs-25",
    "order": 40,
    "title": "OS",
    "tagline": "Recruitment, but it's an entire operating system.",
    "eyebrow": "ACM-VIT · 2025 · Organising Committee Selections",
    "themeColor": "#DCA2C4",
    "themeColorSecondary": "#600EC7",
    "shortDescription": "ACM-VIT's 2025 OCS portal, rebuilt as a full macOS-style desktop in the browser. Window management, tiling, a menu bar, an honest dock, working terminal, real apps for every domain - and a fair amount of hidden games.",
    "longDescription": [
      "OS is ACM-VIT's organising committee selections portal for 2025, and it's the most ambitious recruitment site the chapter has shipped. The whole interface is a macOS-style desktop running in a browser tab.",
      "It ships the things a real OS ships: a top menu bar with system status and clocks, an animated dock, draggable and resizable windows, tiling and stacking, a working terminal, a Finder-style file explorer, a Photos app for chapter memories, a Notes app, a Calculator, a Calendar, and Settings - including a wallpaper picker and theme switcher.",
      "Every recruitment domain runs as its own dedicated app instead of a generic form. The App domain opens inside an App Store clone. Web opens inside a GitHub-styled repo browser. Competitive Coding runs in a LeetCode-style problem view with a Monaco editor. Design opens as a Figma-styled canvas. Research lives inside a Reddit-style subreddit. Management runs as a Discord server with channels and polls.",
      "There are real games in here. A 2048 tile clone. ACM Draws - a multiplayer scribble game built on top of socket.io with the same feature set as skribbl.io. And DOOM, embedded and playable.",
      "There's also a FaceTime-style scheduler for interview slots - applicants pick a time and the call card flips like a real ringing call.",
      "Easter eggs are scattered across the entire OS. Hidden apps, hidden dock items, secret terminal commands, secret keyboard shortcuts, and at least one app that only opens if you go looking. The bar set by previous OCS sites has been thoroughly cleared.",
      "Under the hood: Next.js 16 with the App Router on React 19, Prisma 6 talking to CockroachDB, NextAuth v5 for auth, AWS S3 + CloudFront for asset delivery, socket.io for the multiplayer scribble game, the Monaco Editor for the LeetCode app, and a Radix + shadcn/ui + Tailwind base. Window dragging, tiling and resizing are powered by react-rnd, animations by Framer Motion, and the whole thing leans on next-mdx-remote for in-app content."
    ],
    "status": "archived",
    "statusNote": "Recruitment cycle closed",
    "cassetteSvg": "/projects/projects-cover.svg",
    "gallery": [
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-1.webp",
        "alt": "OS desktop"
      },
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-2.webp",
        "alt": "OS app window"
      },
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-3.webp",
        "alt": "OS domain app"
      },
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-4.webp",
        "alt": "OS terminal / scheduler"
      },
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-5.webp",
        "alt": "OS game view"
      },
      {
        "src": "/projects/ocs-25/projects-ocs-25-screen-6.webp",
        "alt": "OS settings / wallpaper"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "2025",
        "label": "Year"
      },
      {
        "value": "Web",
        "label": "Platform"
      },
      {
        "value": "macOS",
        "label": "Theme"
      },
      {
        "value": "6 domain apps",
        "label": "Recruitment flow"
      }
    ],
    "features": [
      {
        "title": "macOS desktop in a tab",
        "description": "Menu bar, dock, draggable + resizable + tiled windows, system tray, working terminal. The full shell."
      },
      {
        "title": "App Store - App domain",
        "description": "Mobile app recruitment runs inside an App Store clone with featured cards, ratings and install flow."
      },
      {
        "title": "GitHub - Web domain",
        "description": "Web domain opens as a GitHub repo, with README, file tree and contribution flow as the recruitment form."
      },
      {
        "title": "LeetCode - CC domain",
        "description": "Competitive Coding runs inside a LeetCode-style problem view backed by the Monaco editor."
      },
      {
        "title": "Figma - Design domain",
        "description": "Design domain opens as a Figma canvas with layers, frames and a properties panel."
      },
      {
        "title": "Reddit - Research domain",
        "description": "Research domain renders as a subreddit, with posts, comments and upvotes around the round prompts."
      },
      {
        "title": "Discord - Management domain",
        "description": "Management domain is a Discord server clone, complete with channels, server polls and a member list."
      },
      {
        "title": "ACM Draws",
        "description": "A socket.io-powered multiplayer scribble game modeled on skribbl.io - lobbies, rounds, word reveal, scoring."
      },
      {
        "title": "DOOM, in the browser",
        "description": "DOOM bundled inside an app window. Yes, really."
      },
      {
        "title": "2048",
        "description": "A polished 2048 clone, playable inside its own window."
      },
      {
        "title": "FaceTime scheduler",
        "description": "Interview slots picked through a FaceTime-style ringing call UI. Each applicant gets a slot card."
      },
      {
        "title": "Notes, Calendar, Calculator",
        "description": "Daily-driver apps shipped alongside the recruitment ones so the desktop actually feels populated."
      },
      {
        "title": "Settings + wallpaper picker",
        "description": "Theme switcher, dock controls and a wallpaper gallery, just like the real thing."
      },
      {
        "title": "Easter eggs everywhere",
        "description": "Hidden apps, secret commands, surprise dock items, keyboard shortcuts. Bring patience."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss",
          "shadcn"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "nextjs",
          "prisma",
          "cockroachdb"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "vercel",
          "aws",
          "cloudflare"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github",
          "postman"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "Lead developer"
      },
      {
        "github": "RohitPhaniramSakamuri",
        "role": "Developer"
      },
      {
        "github": "qwerty-dvorak",
        "role": "Developer"
      },
      {
        "github": "pokymono",
        "role": "Developer"
      },
      {
        "github": "mahendra785",
        "role": "Developer"
      },
      {
        "github": "Quasar-025",
        "role": "Developer"
      },
      {
        "github": "adii2ma",
        "role": "Developer"
      },
      {
        "github": "btcry",
        "role": "Developer"
      },
      {
        "github": "Van5sh",
        "role": "Developer"
      },
      {
        "github": "SarupaVL",
        "role": "Developer"
      },
      {
        "github": "drashtishukla",
        "role": "Developer"
      },
      {
        "github": "abhiiii9av",
        "role": "Developer"
      },
      {
        "github": "yashsinha1224",
        "role": "Developer"
      },
      {
        "github": "Kashishsingh4",
        "role": "Developer"
      },
      {
        "github": "JuxtaRYCT",
        "role": "Developer"
      },
      {
        "github": "Supratim69",
        "role": "Developer"
      },
      {
        "github": "ShauryaGarg17",
        "role": "Developer"
      },
      {
        "github": "TejasGhatte",
        "role": "Developer"
      },
      {
        "github": "Avadhoot1905",
        "role": "Developer"
      },
      {
        "github": "harshitnarang28",
        "role": "Developer"
      },
      {
        "github": "kairavsheth",
        "role": "Developer"
      },
      {
        "github": "D-Vspec",
        "role": "Developer"
      },
      {
        "github": "JothishKamal",
        "role": "Developer"
      },
      {
        "github": "tanushgolwala",
        "role": "Developer"
      },
      {
        "github": "vg-21",
        "role": "Developer"
      }
    ],
    "designers": [
      {
        "name": "Aarjav Jain",
        "linkedin": "https://www.linkedin.com/in/bharatwalejain/",
        "role": "Design"
      },
      {
        "name": "Krishika Sureka",
        "linkedin": "https://www.linkedin.com/in/krishikasureka/",
        "role": "Design"
      },
      {
        "name": "Aditya Singh",
        "linkedin": "https://www.linkedin.com/in/aditya-singh-750717310/",
        "role": "Design"
      },
      {
        "name": "Prakhar Joshi",
        "linkedin": "https://www.linkedin.com/in/prakharjoshi23/",
        "role": "Design"
      },
      {
        "name": "Nishtha Aggarwal",
        "linkedin": "https://hashnode.com/@nishthaaggarwal",
        "role": "Design"
      },
      {
        "name": "Arnav Srivastava",
        "linkedin": "https://www.linkedin.com/in/arnav-srivastava-16825b290/",
        "role": "Design"
      },
      {
        "name": "Yashika Panda",
        "linkedin": "https://www.linkedin.com/in/yashikapanda-26825m/",
        "role": "Design"
      },
      {
        "name": "Naincy Jain",
        "linkedin": "https://www.linkedin.com/in/naincy-jain-38a20a283/",
        "role": "Design"
      },
      {
        "name": "Aradhya Gupta",
        "linkedin": "https://www.linkedin.com/in/aradhya-gupta-designer/",
        "role": "Design"
      },
      {
        "name": "JuxtaRYCT",
        "linkedin": "https://www.linkedin.com/in/juxtaryct/",
        "role": "Design"
      }
    ],
    "links": [
      {
        "label": "Live OS",
        "href": "https://os.acmvit.in",
        "kind": "website"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/os.acmvit.in",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 555
  },
  {
    "slug": "ocs-26",
    "order": 50,
    "title": "Explore",
    "tagline": "A browser, inside your browser.",
    "eyebrow": "ACM-VIT · 2026 · Organising Committee Selections",
    "themeColor": "#EFE28B",
    "themeColorSecondary": "#1A1607",
    "shortDescription": "ACM-VIT's 2026 OCS portal, themed as a full browser running inside your browser. Each form was a website applicants could open in a tab. Ships an in-house meeting client with breakout rooms, the foundation that became Conclave. Drove the highest enrollment in the chapter's 17-year history.",
    "longDescription": [
      "Explore is ACM-VIT's organising committee selections portal for the 2026 cycle. The premise is recursive: it's a browser, rendered inside your real browser. Tabs, URL bar, history, bookmarks, the whole thing.",
      "Every form round was modelled as its own webpage applicants could navigate to. Apply by opening the page, just like any other site.",
      "For the first time, the entire meeting infrastructure was built in-house instead of bolting on Google Meet or Zoom. Explore shipped a complete meeting client with the scheduler, signalling and media routing all written by ACM-VIT developers. Every interview, every round, for a very large applicant pool ran on it.",
      "The meeting app supported the usual stack - video, audio, screen-share, chat - plus instant breakout rooms that interviewers could spin up from inside a live call with one click. After OCS, the meeting client was extracted into its own project and continues life as Conclave.",
      "Explore also bundled real games. Breaking blocks, Snake, Minecraft, Krunker, skribbl.io - all playable from inside a tab.",
      "The result: the highest number of registrations ACM-VIT has received in its 17-year history.",
      "Stack: Next.js 16 with the App Router on React 19, Prisma 6 talking to MongoDB, Better Auth for sessions, Upstash Redis + ratelimit guarding the form endpoints, mediasoup-client + a custom SFU on Node + Socket.io for the meeting backbone, Monaco Editor for code rounds, Tailwind v4, Framer Motion, react-three-fiber + drei + three.js for 3D bits, d3 + lenis for visualisation and smooth scroll, Matter.js for the games physics, Lottie for motion graphics, and PostHog for analytics. The whole thing builds with Turbopack and ships behind a Vercel + Cloudflare R2 pipeline. Code quality is enforced by Biome + Husky."
    ],
    "status": "online",
    "statusNote": "Live · 2026 cycle",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-ocs-26.webp",
    "gallery": [
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-1.webp",
        "alt": "Explore browser-themed portal"
      },
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-2.webp",
        "alt": "Explore browser tabs and content"
      },
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-3.webp",
        "alt": "Explore form-as-webpage round"
      },
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-4.webp",
        "alt": "Explore in-house meeting client"
      },
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-5.webp",
        "alt": "Explore game inside browser"
      },
      {
        "src": "/projects/ocs-26/projects-ocs-26-screen-6.webp",
        "alt": "Explore portal flow"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "2026",
        "label": "Year"
      },
      {
        "value": "Browser",
        "label": "Theme"
      },
      {
        "value": "Highest ever",
        "label": "Registrations"
      },
      {
        "value": "17 years",
        "label": "Chapter history"
      }
    ],
    "features": [
      {
        "title": "Browser inside browser",
        "description": "Tabs, URL bar, history, bookmarks - the full chrome, rendered on top of the real browser."
      },
      {
        "title": "Forms as webpages",
        "description": "Each round opens like a regular website. Apply by visiting the page."
      },
      {
        "title": "In-house meeting client",
        "description": "Full video meeting stack written by ACM-VIT - signalling, scheduler, SFU. No Meet, no Zoom."
      },
      {
        "title": "One-click breakout rooms",
        "description": "Spin up a breakout from inside a live call. Used heavily during round interviews."
      },
      {
        "title": "Custom SFU",
        "description": "mediasoup-based selective forwarding unit ships in /sfu - low-bandwidth profiles, transitions, observability."
      },
      {
        "title": "Code rounds via Monaco",
        "description": "Coding interviews and rounds run on a Monaco editor embedded in the portal."
      },
      {
        "title": "Games in tabs",
        "description": "Breaking Blocks, Snake, Minecraft, Krunker, skribbl.io - all playable inside the Explore browser."
      },
      {
        "title": "3D and motion",
        "description": "react-three-fiber, drei and three.js power the 3D bits; Framer Motion + Lottie handle the rest."
      },
      {
        "title": "Smooth scroll + viz",
        "description": "Lenis for scroll inertia, d3 for data visualisation across the portal."
      },
      {
        "title": "Rate-limited APIs",
        "description": "Upstash Redis + ratelimit guard all submission endpoints against abuse."
      },
      {
        "title": "PostHog analytics",
        "description": "Funnel + product analytics wired in across the application flow."
      },
      {
        "title": "Record-breaking reach",
        "description": "Highest enrollment count ACM-VIT has ever recorded - across all 17 years of the chapter."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "nextjs",
          "prisma",
          "mongodb",
          "redis"
        ]
      },
      {
        "category": "Realtime / Meeting",
        "slugs": [
          "nodejs",
          "typescript"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "vercel",
          "cloudflare",
          "docker"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github",
          "postman"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "Lead developer"
      },
      {
        "github": "technical-director-acmvit",
        "role": "Lead developer"
      },
      {
        "github": "AdityaVKochar",
        "role": "Developer"
      },
      {
        "github": "mahendra785",
        "role": "Developer"
      },
      {
        "github": "RohitPhaniramSakamuri",
        "role": "Developer"
      },
      {
        "github": "Van5sh",
        "role": "Developer"
      },
      {
        "github": "thinkter",
        "role": "Developer"
      },
      {
        "github": "Krishang-Zinzuwadia",
        "role": "Developer"
      },
      {
        "github": "adhyan-jain",
        "role": "Developer"
      },
      {
        "github": "AdheeshGarg",
        "role": "Developer"
      },
      {
        "github": "arnavsoni1",
        "role": "Developer"
      },
      {
        "github": "ludicrouslytrue",
        "role": "Developer"
      },
      {
        "github": "MKDev121",
        "role": "Developer"
      },
      {
        "github": "POSTI-25",
        "role": "Developer"
      },
      {
        "github": "Passive-Coder",
        "role": "Developer"
      },
      {
        "github": "fabjenny13",
        "role": "Developer"
      },
      {
        "github": "Bhanuch2006",
        "role": "Developer"
      },
      {
        "github": "Heyaa28041",
        "role": "Developer"
      },
      {
        "github": "Ishitajoshii",
        "role": "Developer"
      },
      {
        "github": "LordSlushii",
        "role": "Developer"
      },
      {
        "github": "navaneethk99",
        "role": "Developer"
      },
      {
        "github": "chinmayeebadiger",
        "role": "Developer"
      },
      {
        "github": "TarunRam-git",
        "role": "Developer"
      },
      {
        "github": "ananyab1404",
        "role": "Developer"
      },
      {
        "github": "m-rithik",
        "role": "Developer"
      },
      {
        "github": "vimalaadhityan",
        "role": "Developer"
      }
    ],
    "links": [
      {
        "label": "Explore",
        "href": "https://explore.acmvit.in/",
        "kind": "website"
      },
      {
        "label": "Explore repo",
        "href": "https://github.com/ACM-VIT/explore.acmvit.in",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 626
  },
  {
    "slug": "ocs-22",
    "order": 60,
    "title": "OCS '22",
    "tagline": "Recruitment, but you have to play the game.",
    "eyebrow": "ACM-VIT · 2022 · Organising Committee Selections",
    "themeColor": "#C0D470",
    "themeColorSecondary": "#78C0AB",
    "shortDescription": "Organising Committee Selections portal for ACM-VIT, 2022. A playable 2D RPG world where applicants navigated the map, met characters, and finished the in-game registration form to enrol.",
    "longDescription": [
      "OCS '22 was ACM-VIT's recruitment portal for the 2022 organising committee, built around a single idea - make the application itself a game.",
      "The site put applicants inside a 2D top-down RPG world. Instead of filling out a static form, candidates moved a character around the map, ran into NPCs, and progressed through the in-game flow until they reached the registration step - which was also built directly into the world.",
      "The form section ran inside the website itself, so submitting an application meant actually playing through the game first."
    ],
    "status": "archived",
    "statusNote": "Recruitment cycle closed",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-ocs-22.svg",
    "gallery": [
      {
        "src": "/projects/ocs-22/projects-ocs-22-screen-1.webp",
        "alt": "OCS '22 in-game scene"
      },
      {
        "src": "/projects/ocs-22/projects-ocs-22-screen-2.webp",
        "alt": "OCS '22 in-game scene"
      },
      {
        "src": "/projects/ocs-22/projects-ocs-22-screen-3.webp",
        "alt": "OCS '22 in-game scene"
      },
      {
        "src": "/projects/ocs-22/projects-ocs-22-screen-4.webp",
        "alt": "OCS '22 in-game scene"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "2022",
        "label": "Year"
      },
      {
        "value": "Web",
        "label": "Platform"
      },
      {
        "value": "2D RPG",
        "label": "Theme"
      }
    ],
    "features": [
      {
        "title": "Playable 2D world",
        "description": "Top-down RPG map applicants actually navigated to apply."
      },
      {
        "title": "In-game registration",
        "description": "Form section was built into the world. No bounce to an external typeform."
      },
      {
        "title": "RPG theming end-to-end",
        "description": "UI, NPCs, and flow all leaned into the game premise."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "react"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "go"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "postman"
        ]
      }
    ],
    "links": [
      {
        "label": "Live portal",
        "href": "https://acm-recruitment-2022-portal-tau.vercel.app/",
        "kind": "website"
      },
      {
        "label": "Walkthrough 1",
        "href": "https://www.youtube.com/shorts/nRVoQCC4EGA",
        "kind": "demo"
      },
      {
        "label": "Walkthrough 2",
        "href": "https://www.youtube.com/shorts/fZd-Kz_U5MI",
        "kind": "demo"
      }
    ],
    "commitGraphSeed": 122
  },
  {
    "slug": "ocs-23",
    "order": 70,
    "title": "OCS '23",
    "tagline": "Recruitment, in the terminal.",
    "eyebrow": "ACM-VIT · 2023 · Organising Committee Selections",
    "themeColor": "#41E22E",
    "themeColorSecondary": "#0A2A0A",
    "shortDescription": "Organising Committee Selections portal for ACM-VIT, 2023. A terminal-themed website - the whole recruitment flow dressed up as a command line interface.",
    "longDescription": [
      "OCS '23 was ACM-VIT's recruitment portal for the 2023 organising committee. The whole site was built around a terminal aesthetic - typed prompts, monospace UI, command-line flow.",
      "It's the second in the chapter's run of themed OCS sites, following the 2022 RPG portal."
    ],
    "status": "archived",
    "statusNote": "Recruitment cycle closed",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-ocs-23.svg",
    "gallery": [
      {
        "src": "/projects/ocs-23/projects-ocs-23-frame-10.webp",
        "alt": "OCS '23 terminal interface"
      },
      {
        "src": "/projects/ocs-23/projects-ocs-23-frame-11.webp",
        "alt": "OCS '23 terminal interface"
      },
      {
        "src": "/projects/ocs-23/projects-ocs-23-frame-12.webp",
        "alt": "OCS '23 terminal interface"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "2023",
        "label": "Year"
      },
      {
        "value": "Web",
        "label": "Platform"
      },
      {
        "value": "Terminal",
        "label": "Theme"
      }
    ],
    "features": [
      {
        "title": "Terminal UI",
        "description": "Whole site styled as a command-line interface."
      }
    ],
    "techStack": [],
    "links": [],
    "commitGraphSeed": 233
  },
  {
    "slug": "cli-rpg",
    "order": 80,
    "title": "CLI-RPG",
    "tagline": "Mystery of the Forgotten.",
    "eyebrow": "ACM-VIT · Game · Terminal",
    "themeColor": "#16A34A",
    "themeColorSecondary": "#0F3D1E",
    "shortDescription": "A text-based adventure game in your terminal. Explore a mysterious world, solve puzzles, manage your inventory, and uncover secrets - all through the command line.",
    "longDescription": [
      "Mystery of the Forgotten is a CLI role-playing game built during the ACM-VIT project cycle. Players navigate a mysterious world filled with branching storylines, diverse characters, and challenging puzzles - entirely through text commands.",
      "The game features an inventory management system, ASCII art for every location and encounter, and an integrated music player with a live audio visualizer - all running inside a terminal. Multiple endings mean each playthrough can go differently depending on your choices.",
      "Built in Rust using Ratatui for the terminal UI and Supabase on the backend, CLI-RPG is a showcase of what's possible when you push the command line beyond its usual limits."
    ],
    "status": "online",
    "statusNote": "Playable now",
    "heroImage": "/projects/projects-cli-rpg.svg",
    "gallery": [
      {
        "src": "/projects/cli-rpg/projects-cli-rpg-shot-login.webp",
        "alt": "CLI-RPG login screen"
      },
      {
        "src": "/projects/cli-rpg/projects-cli-rpg-shot-house.webp",
        "alt": "CLI-RPG haunted house ASCII art"
      },
      {
        "src": "/projects/cli-rpg/projects-cli-rpg-shot-map.webp",
        "alt": "CLI-RPG floor plan exploration"
      },
      {
        "src": "/projects/cli-rpg/projects-cli-rpg-shot-puzzle.webp",
        "alt": "CLI-RPG DNA sequence puzzle"
      }
    ],
    "galleryLayout": "landscape",
    "stats": [
      {
        "value": "Rust",
        "label": "Built in"
      },
      {
        "value": "Multiple",
        "label": "Endings"
      },
      {
        "value": "Terminal",
        "label": "Platform"
      },
      {
        "value": "2024",
        "label": "First shipped"
      }
    ],
    "features": [
      {
        "title": "Branching storyline",
        "description": "Multiple endings based on your choices. Every playthrough reveals something different."
      },
      {
        "title": "ASCII art",
        "description": "Hand-crafted ASCII art for locations, characters, and encounters."
      },
      {
        "title": "Music player",
        "description": "Integrated music player with an interactive audio visualizer, all in the terminal."
      },
      {
        "title": "Inventory system",
        "description": "Collect, use, and manage items as you explore the world."
      },
      {
        "title": "Puzzles and minigames",
        "description": "Various puzzles and games woven into the narrative."
      },
      {
        "title": "Terminal-native",
        "description": "No GUI, no browser. Pure command-line experience built with Ratatui."
      }
    ],
    "techStack": [
      {
        "category": "Core",
        "slugs": [
          "rust"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "supabase"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "aastikn",
        "role": "Maintainer"
      },
      {
        "github": "shambhavipaygude",
        "role": "Maintainer"
      },
      {
        "github": "JuxtaRYCT",
        "role": "Maintainer"
      },
      {
        "github": "D-Vspec",
        "role": "Developer"
      },
      {
        "github": "AV295",
        "role": "Developer"
      },
      {
        "github": "bharatwalejain",
        "role": "Developer"
      },
      {
        "github": "Zxcivic",
        "role": "Developer"
      },
      {
        "github": "AJ1312",
        "role": "Developer"
      },
      {
        "github": "GHAUTHAM2509",
        "role": "Developer"
      },
      {
        "github": "btcry",
        "role": "Developer"
      },
      {
        "github": "theforce1579",
        "role": "Developer"
      },
      {
        "github": "NAINCY1710",
        "role": "Developer"
      },
      {
        "github": "parthgoyal974",
        "role": "Developer"
      },
      {
        "github": "SINGHPARTH2003",
        "role": "Developer"
      },
      {
        "github": "prateekpurohit13",
        "role": "Developer"
      },
      {
        "github": "ShauryaGarg17",
        "role": "Developer"
      },
      {
        "github": "SonitBahl",
        "role": "Developer"
      },
      {
        "github": "0VISH",
        "role": "Developer"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://cli-rpg.acmvit.in/",
        "kind": "website"
      }
    ],
    "commitGraphSeed": 203
  },
  {
    "slug": "conclave",
    "order": 90,
    "title": "Conclave",
    "tagline": "Meetings, built from scratch.",
    "eyebrow": "ACM-VIT · Video · Meetings Platform",
    "themeColor": "#FF6B35",
    "themeColorSecondary": "#1A0E05",
    "shortDescription": "A real-time meetings platform with web and mobile clients, a custom SFU, instant breakout rooms, shared browser, and an in-meeting apps SDK. Born out of ACM-VIT's OCS 2026 portal - every interview that cycle ran on it.",
    "longDescription": [
      "Conclave started life as the meeting infrastructure inside Explore, ACM-VIT's 2026 OCS portal. The chapter needed a meeting client that could handle hundreds of applicant interviews without leaning on Google Meet or Zoom, so the team built one from scratch.",
      "The result was good enough to extract into its own product. Conclave ships a Next.js web client, a React Native + Expo mobile app, and a native Swift/Kotlin client. The media backbone is a custom SFU built on mediasoup with low-bandwidth profiles, transitions, and observability baked in.",
      "Beyond basic video calls, Conclave supports one-click breakout rooms from inside a live call, a shared browser powered by VNC for distributed screen interaction, and an in-meeting apps runtime with real-time data sync via Yjs. The apps SDK lets developers build collaborative tools that run inside a Conclave call.",
      "The whole thing is containerised with Docker, managed as a pnpm monorepo, and ships under an MIT licence."
    ],
    "status": "online",
    "statusNote": "Actively maintained",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-conclave.svg",
    "stats": [
      {
        "value": "Web + Mobile",
        "label": "Platforms"
      },
      {
        "value": "Custom SFU",
        "label": "Media backbone"
      },
      {
        "value": "2025",
        "label": "Extracted"
      },
      {
        "value": "MIT",
        "label": "Licence"
      }
    ],
    "features": [
      {
        "title": "Custom SFU",
        "description": "mediasoup-based selective forwarding unit with low-bandwidth profiles, transitions, and observability."
      },
      {
        "title": "One-click breakout rooms",
        "description": "Spin up a breakout from inside a live call. Used heavily during OCS round interviews."
      },
      {
        "title": "Shared browser",
        "description": "VNC-based shared browsing so participants can interact with the same page in real time."
      },
      {
        "title": "In-meeting apps SDK",
        "description": "Build collaborative tools that run inside a call. Data sync powered by Yjs."
      },
      {
        "title": "Cross-platform clients",
        "description": "Web (Next.js), mobile (React Native + Expo), and native (Swift, Kotlin) clients."
      },
      {
        "title": "Docker-ready",
        "description": "Containerised and ready to self-host. Docker Compose for local dev, production configs included."
      }
    ],
    "techStack": [
      {
        "category": "Frontend",
        "slugs": [
          "nextjs",
          "react",
          "typescript",
          "tailwindcss"
        ]
      },
      {
        "category": "Mobile",
        "slugs": [
          "react-native",
          "expo",
          "swift",
          "kotlin"
        ]
      },
      {
        "category": "Realtime",
        "slugs": [
          "nodejs",
          "typescript"
        ]
      },
      {
        "category": "Infrastructure",
        "slugs": [
          "docker"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "Lead developer"
      },
      {
        "github": "thinkter",
        "role": "Developer"
      },
      {
        "github": "technical-director-acmvit",
        "role": "Developer"
      },
      {
        "github": "Krishang-Zinzuwadia",
        "role": "Developer"
      },
      {
        "github": "TarunRam-git",
        "role": "Developer"
      },
      {
        "github": "AdityaVKochar",
        "role": "Developer"
      },
      {
        "github": "ananyab1404",
        "role": "Developer"
      },
      {
        "github": "m-rithik",
        "role": "Developer"
      },
      {
        "github": "vim-all",
        "role": "Developer"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://conclave.acmvit.in",
        "kind": "website"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/conclave",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 735
  },
  {
    "slug": "wenvy",
    "order": 100,
    "title": "Wenvy",
    "tagline": "Version your secrets like you version your code.",
    "eyebrow": "ACM-VIT · CLI · Secrets Management",
    "themeColor": "#F03104",
    "themeColorSecondary": "#1A0505",
    "shortDescription": "A TypeScript-first, Cloudflare-native encrypted environment state platform. Push, pull, and snapshot your .env files with proper versioning, encryption, and team sync - all from the terminal.",
    "longDescription": [
      "Wenvy treats environment variables the way Git treats source code. Instead of passing .env files over Slack or stuffing them into shared drives, teams init a project, snapshot their local state, and push encrypted diffs to a Cloudflare-backed store. Pulling on another machine restores the exact environment.",
      "The CLI ships commands that mirror a familiar workflow: wenvy init, wenvy snapshot, wenvy push, wenvy pull, wenvy doctor. Authentication uses service account tokens, and every secret is encrypted before it leaves the machine.",
      "Under the hood, Wenvy runs on Cloudflare Workers with Hono for routing, Durable Objects for state, Queues for async work, and Workflows for multi-step operations. The shared domain package enforces type-safe business logic and security rules across the stack. The landing page is a React + Vite app.",
      "The whole project is a pnpm monorepo with Vitest for testing, and it's open-source under ACM-VIT."
    ],
    "status": "online",
    "statusNote": "Actively maintained",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-wenvy.svg",
    "heroImage": "/projects/wenvy/projects-wenvy-koi.svg",
    "stats": [
      {
        "value": "TypeScript",
        "label": "Built in"
      },
      {
        "value": "Cloudflare",
        "label": "Runtime"
      },
      {
        "value": "CLI",
        "label": "Interface"
      },
      {
        "value": "Encrypted",
        "label": "By default"
      }
    ],
    "features": [
      {
        "title": "Git-style workflow",
        "description": "init, snapshot, push, pull - manage secrets with commands that feel like version control."
      },
      {
        "title": "End-to-end encryption",
        "description": "Secrets are encrypted before they leave your machine. The server never sees plaintext."
      },
      {
        "title": "Team sync",
        "description": "Push encrypted state to a shared store. Team members pull the latest env to their machine."
      },
      {
        "title": "Cloudflare-native",
        "description": "Runs on Workers, Durable Objects, Queues, and Workflows. Fast globally, zero cold starts."
      },
      {
        "title": "Doctor command",
        "description": "wenvy doctor validates your local setup, checks connectivity, and flags misconfigurations."
      },
      {
        "title": "Type-safe domain layer",
        "description": "Shared business logic package with security rules enforced across CLI and API."
      }
    ],
    "techStack": [
      {
        "category": "Core",
        "slugs": [
          "typescript"
        ]
      },
      {
        "category": "Backend",
        "slugs": [
          "cloudflare",
          "hono"
        ]
      },
      {
        "category": "Frontend",
        "slugs": [
          "react"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239",
        "role": "Lead developer"
      },
      {
        "github": "qwerty-dvorak",
        "role": "Developer"
      },
      {
        "github": "harshitnarang28",
        "role": "Developer"
      },
      {
        "github": "pokymono",
        "role": "Developer"
      }
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://wenvy.dev",
        "kind": "website"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/wenvy",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 891
  },
  {
    "slug": "cli-top",
    "order": 110,
    "title": "CLI-TOP",
    "tagline": "VTOP, but in your terminal.",
    "eyebrow": "ACM-VIT · CLI · Campus Utility",
    "themeColor": "#48BB78",
    "themeColorSecondary": "#0A2A15",
    "shortDescription": "A command-line interface for seamless interaction with VIT's student portal, VTOP. Skip the browser, check your timetable, attendance, and marks straight from the terminal. Available on Windows, macOS, Linux, and Android.",
    "longDescription": [
      "VTOP is the student portal every VIT student lives in - timetables, attendance, marks, exam schedules, the works. CLI-TOP strips away the browser and puts the same data in your terminal.",
      "The tool ships as a lightweight binary across Windows, macOS, Linux, and Android. On Windows there's an automated installer that drops the binary into AppData and configures PATH for you. On macOS and Linux, it's a manual download with shell profile setup.",
      "CLI-TOP was built by ACM-VIT as a utility project - the kind of tool that saves five minutes every day for thousands of students on campus."
    ],
    "status": "online",
    "statusNote": "Available for download",
    "cassetteSvg": "/projects/cassettes/projects-cassettes-cli-top.svg",
    "stats": [
      {
        "value": "4",
        "label": "Platforms"
      },
      {
        "value": "CLI",
        "label": "Interface"
      },
      {
        "value": "VTOP",
        "label": "Data source"
      },
      {
        "value": "Campus-wide",
        "label": "Audience"
      }
    ],
    "features": [
      {
        "title": "Cross-platform",
        "description": "Ships on Windows, macOS, Linux, and Android. Dedicated installer on Windows."
      },
      {
        "title": "Terminal-native",
        "description": "No browser needed. Access timetable, attendance, and marks from the command line."
      },
      {
        "title": "Lightweight binary",
        "description": "Small compiled binary. Download, configure PATH, and go."
      },
      {
        "title": "VTOP integration",
        "description": "Pulls data directly from VIT's student portal."
      }
    ],
    "techStack": [],
    "links": [
      {
        "label": "Website",
        "href": "https://clitop.acmvit.in/",
        "kind": "website"
      }
    ],
    "commitGraphSeed": 448
  },
  {
    "slug": "open-with-browser",
    "order": 120,
    "title": "Open with Browser",
    "tagline": "Smart link manager that opens URLs in specific browsers and profiles based on customizable rules.",
    "eyebrow": "ACM-VIT · Forktober 2025 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Smart link manager that opens URLs in specific browsers and profiles based on customizable rules.",
    "longDescription": [
      "Smart link manager that opens URLs in specific browsers and profiles based on customizable rules.",
      "Open with Browser was part of ACM-VIT's Forktober open-source drive in 2025, opening up to student contributors during Hacktoberfest.",
      "The repository is still being maintained. New contributions, issues and pull requests are welcome on GitHub.",
      "Across its lifetime, the project drew 13 contributors, 36 pull requests and 118 commits."
    ],
    "status": "online",
    "statusNote": "Actively maintained · Forktober 2025",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "13",
        "label": "Contributors"
      },
      {
        "value": "36",
        "label": "Pull requests"
      },
      {
        "value": "118",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "typescript"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "theg1239"
      },
      {
        "github": "Maitri-shah29"
      },
      {
        "github": "POSTI-25"
      },
      {
        "github": "AdityaVKochar"
      },
      {
        "github": "toygma"
      },
      {
        "github": "anshukaushik4700"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/open-with-browser",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 740
  },
  {
    "slug": "scrag",
    "order": 130,
    "title": "Scrag",
    "tagline": "A flexible web scraper that intelligently adapts to different website structures using multiple extraction strategies (newspaper3k, readability-lxml, BeautifulSoup, and optional headless rendering). It outputs clean, structured data for RAG pipelines or local LLMs, with an optional extension to automatically build RAG indexes from web queries.",
    "eyebrow": "ACM-VIT · Forktober 2025 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A flexible web scraper that intelligently adapts to different website structures using multiple extraction strategies (newspaper3k, readability-lxml, BeautifulSoup, and optional headless rendering). It outputs clean, structured data for RAG pipelines or local LLMs, with an optional extension to automatically build RAG indexes from web queries.",
    "longDescription": [
      "A flexible web scraper that intelligently adapts to different website structures using multiple extraction strategies (newspaper3k, readability-lxml, BeautifulSoup, and optional headless rendering). It outputs clean, structured data for RAG pipelines or local LLMs, with an optional extension to automatically build RAG indexes from web queries.",
      "Scrag was part of ACM-VIT's Forktober open-source drive in 2025, opening up to student contributors during Hacktoberfest.",
      "The repository is still being maintained. New contributions, issues and pull requests are welcome on GitHub.",
      "Across its lifetime, the project drew 8 contributors, 20 pull requests and 76 commits."
    ],
    "status": "online",
    "statusNote": "Actively maintained · Forktober 2025",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "8",
        "label": "Contributors"
      },
      {
        "value": "20",
        "label": "Pull requests"
      },
      {
        "value": "76",
        "label": "Commits"
      },
      {
        "value": "4",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "python"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "POSTI-25"
      },
      {
        "github": "pokymono"
      },
      {
        "github": "theg1239"
      },
      {
        "github": "Ryuga-17"
      },
      {
        "github": "samarthnaikk"
      },
      {
        "github": "AdityaVKochar"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/scrag",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 528
  },
  {
    "slug": "digital-circuit-simulator",
    "order": 140,
    "title": "Digital Circuit Simulator",
    "tagline": "A web-based tool for building and testing digital logic circuits visually using click-and-drop gates, switches, and real-time simulation without physical hardware.",
    "eyebrow": "ACM-VIT · Forktober 2025 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A web-based tool for building and testing digital logic circuits visually using click-and-drop gates, switches, and real-time simulation without physical hardware.",
    "longDescription": [
      "A web-based tool for building and testing digital logic circuits visually using click-and-drop gates, switches, and real-time simulation without physical hardware.",
      "Digital Circuit Simulator was part of ACM-VIT's Forktober open-source drive in 2025, opening up to student contributors during Hacktoberfest.",
      "The repository is still being maintained. New contributions, issues and pull requests are welcome on GitHub.",
      "Across its lifetime, the project drew 11 contributors, 22 pull requests and 103 commits."
    ],
    "status": "online",
    "statusNote": "Actively maintained · Forktober 2025",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "11",
        "label": "Contributors"
      },
      {
        "value": "22",
        "label": "Pull requests"
      },
      {
        "value": "103",
        "label": "Commits"
      },
      {
        "value": "9",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "typescript",
          "react"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "fabjenny13"
      },
      {
        "github": "beetlejusse"
      },
      {
        "github": "adii2ma"
      },
      {
        "github": "utk2602"
      },
      {
        "github": "NeerajCodz"
      },
      {
        "github": "farazmirzax"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/Digital-Circuit-Simulator",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 571
  },
  {
    "slug": "echolink",
    "order": 150,
    "title": "EchoLink",
    "tagline": "An app to sync audio devices",
    "eyebrow": "ACM-VIT · Forktober 2023 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "An app to sync audio devices",
    "longDescription": [
      "An app to sync audio devices",
      "EchoLink was part of ACM-VIT's Forktober open-source drive in 2023, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 7 contributors, 49 pull requests and 99 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2023 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "7",
        "label": "Contributors"
      },
      {
        "value": "49",
        "label": "Pull requests"
      },
      {
        "value": "99",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "JuxtaRYCT"
      },
      {
        "github": "tanushgolwala"
      },
      {
        "github": "Abh1noob"
      },
      {
        "github": "harshitaak07"
      },
      {
        "github": "aastikn"
      },
      {
        "github": "RohanKhatua"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/EchoLink",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 845
  },
  {
    "slug": "ride-safe",
    "order": 160,
    "title": "Ride-Safe",
    "tagline": "A travel companion app to make your travel safer through driver feedbacks and live tracking functionality",
    "eyebrow": "ACM-VIT · Forktober 2023 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A travel companion app to make your travel safer through driver feedbacks and live tracking functionality",
    "longDescription": [
      "A travel companion app to make your travel safer through driver feedbacks and live tracking functionality",
      "Ride-Safe was part of ACM-VIT's Forktober open-source drive in 2023, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 5 contributors, 3 pull requests and 18 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2023 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "5",
        "label": "Contributors"
      },
      {
        "value": "3",
        "label": "Pull requests"
      },
      {
        "value": "18",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Forks"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter",
          "cplusplus"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "aastikn"
      },
      {
        "github": "RohanKhatua"
      },
      {
        "github": "harshitaak07"
      },
      {
        "github": "tanushgolwala"
      },
      {
        "github": "eshita241"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/Ride-Safe",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 880
  },
  {
    "slug": "pdfmaker",
    "order": 170,
    "title": "PDFMaker",
    "tagline": "Simplify Generating PDFs for your Assignments",
    "eyebrow": "ACM-VIT · Forktober 2023 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Simplify Generating PDFs for your Assignments",
    "longDescription": [
      "Simplify Generating PDFs for your Assignments",
      "PDFMaker was part of ACM-VIT's Forktober open-source drive in 2023, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 6 contributors, 7 pull requests and 34 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2023 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "6",
        "label": "Contributors"
      },
      {
        "value": "7",
        "label": "Pull requests"
      },
      {
        "value": "34",
        "label": "Commits"
      },
      {
        "value": "2",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "python"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "adarshxs"
      },
      {
        "github": "MarvelMathesh"
      },
      {
        "github": "RohanKhatua"
      },
      {
        "github": "Samuelsuhas96"
      },
      {
        "github": "abhi-shek-09"
      },
      {
        "github": "yr1404"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/PDFMaker",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 842
  },
  {
    "slug": "fludget",
    "order": 180,
    "title": "Fludget",
    "tagline": "Learn Flutter on Flutter! A widget directory with implementation samples!",
    "eyebrow": "ACM-VIT · Forktober 2021, 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Learn Flutter on Flutter! A widget directory with implementation samples!",
    "longDescription": [
      "Learn Flutter on Flutter! A widget directory with implementation samples!",
      "Fludget was part of ACM-VIT's Forktober open-source drive across 2021, 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 65 contributors, 171 pull requests and 573 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "65",
        "label": "Contributors"
      },
      {
        "value": "171",
        "label": "Pull requests"
      },
      {
        "value": "573",
        "label": "Commits"
      },
      {
        "value": "31",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "Kunal-8789"
      },
      {
        "github": "suryaa62"
      },
      {
        "github": "sidheshwar-s"
      },
      {
        "github": "yuran09"
      },
      {
        "github": "sachin161kr"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/fludget",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 747
  },
  {
    "slug": "gitpositive",
    "order": 190,
    "title": "gitpositive",
    "tagline": "An efficient GitHub profile app, written in Kotlin!",
    "eyebrow": "ACM-VIT · Forktober 2021, 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "An efficient GitHub profile app, written in Kotlin!",
    "longDescription": [
      "An efficient GitHub profile app, written in Kotlin!",
      "gitpositive was part of ACM-VIT's Forktober open-source drive across 2021, 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 18 contributors, 41 pull requests and 95 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "18",
        "label": "Contributors"
      },
      {
        "value": "41",
        "label": "Pull requests"
      },
      {
        "value": "95",
        "label": "Commits"
      },
      {
        "value": "15",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "kotlin",
          "android-studio"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "prasoonsoni"
      },
      {
        "github": "rishuyadav"
      },
      {
        "github": "rooparsh"
      },
      {
        "github": "Avinaash7"
      },
      {
        "github": "ersascape"
      },
      {
        "github": "DarthBenro008"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/gitpositive",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 207
  },
  {
    "slug": "muscle-magic",
    "order": 200,
    "title": "Muscle Magic",
    "tagline": "A complete fitness mobile app in flutter",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A complete fitness mobile app in flutter",
    "longDescription": [
      "A complete fitness mobile app in flutter",
      "Muscle Magic was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 11 contributors, 22 pull requests and 75 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "11",
        "label": "Contributors"
      },
      {
        "value": "22",
        "label": "Pull requests"
      },
      {
        "value": "75",
        "label": "Commits"
      },
      {
        "value": "12",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Harsh-Vipin"
      },
      {
        "github": "AryanC19"
      },
      {
        "github": "gautamjain09"
      },
      {
        "github": "AgneyaAnoop"
      },
      {
        "github": "lio2011"
      },
      {
        "github": "PrajwalGKale"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/muscle_magic",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 207
  },
  {
    "slug": "alarmit",
    "order": 210,
    "title": "AlarmIT",
    "tagline": "AlarmIT is a simple alarm app. The alarms can be turned off via three methods - normal turnoff, by shaking the device a number of times, by solving maths questions.",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "AlarmIT is a simple alarm app. The alarms can be turned off via three methods - normal turnoff, by shaking the device a number of times, by solving maths questions.",
    "longDescription": [
      "AlarmIT is a simple alarm app. The alarms can be turned off via three methods - normal turnoff, by shaking the device a number of times, by solving maths questions.",
      "AlarmIT was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 7 contributors, 9 pull requests and 28 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "7",
        "label": "Contributors"
      },
      {
        "value": "9",
        "label": "Pull requests"
      },
      {
        "value": "28",
        "label": "Commits"
      },
      {
        "value": "8",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "kotlin",
          "android-studio"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "rudrankbasant"
      },
      {
        "github": "watermelon3093"
      },
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "risingstar-bit"
      },
      {
        "github": "SHREYAS-NIRGUDE"
      },
      {
        "github": "Kardelio"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/AlarmIT",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 746
  },
  {
    "slug": "sticky-links",
    "order": 220,
    "title": "Sticky Links",
    "tagline": "Bookmark important links with categories to read them later on the go!",
    "eyebrow": "ACM-VIT · Forktober 2021, 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Bookmark important links with categories to read them later on the go!",
    "longDescription": [
      "Bookmark important links with categories to read them later on the go!",
      "Sticky Links was part of ACM-VIT's Forktober open-source drive across 2021, 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 10 contributors, 23 pull requests and 62 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "10",
        "label": "Contributors"
      },
      {
        "value": "23",
        "label": "Pull requests"
      },
      {
        "value": "62",
        "label": "Commits"
      },
      {
        "value": "7",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "swift"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Samridh29"
      },
      {
        "github": "kevalvadoliya"
      },
      {
        "github": "kangarooSurfer"
      },
      {
        "github": "IgorChernyshov"
      },
      {
        "github": "darshilagrawal"
      },
      {
        "github": "agustiyann"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/sticky-links",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 253
  },
  {
    "slug": "10-000-hours",
    "order": 230,
    "title": "10,000 Hours",
    "tagline": "A flutter application to track the number of hours you devoted a particular skill. Helps you track your process in a neat and organised way",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A flutter application to track the number of hours you devoted a particular skill. Helps you track your process in a neat and organised way",
    "longDescription": [
      "A flutter application to track the number of hours you devoted a particular skill. Helps you track your process in a neat and organised way",
      "10,000 Hours was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 14 contributors, 22 pull requests and 71 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "14",
        "label": "Contributors"
      },
      {
        "value": "22",
        "label": "Pull requests"
      },
      {
        "value": "71",
        "label": "Commits"
      },
      {
        "value": "5",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Him-anshuSharma"
      },
      {
        "github": "Shubhi-Paul"
      },
      {
        "github": "Arsh-78"
      },
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "FaizFk"
      },
      {
        "github": "ersascape"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/10-000-Hours",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 892
  },
  {
    "slug": "certify",
    "order": 240,
    "title": "Certify",
    "tagline": "A mass certificate generator with a given design",
    "eyebrow": "ACM-VIT · Forktober 2021, 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A mass certificate generator with a given design",
    "longDescription": [
      "A mass certificate generator with a given design",
      "Certify was part of ACM-VIT's Forktober open-source drive across 2021, 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 11 contributors, 13 pull requests and 46 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "11",
        "label": "Contributors"
      },
      {
        "value": "13",
        "label": "Pull requests"
      },
      {
        "value": "46",
        "label": "Commits"
      },
      {
        "value": "4",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "javascript"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "pranavvdesai"
      },
      {
        "github": "anandamideShakyan"
      },
      {
        "github": "1407arjun"
      },
      {
        "github": "lio2011"
      },
      {
        "github": "SwarupKharul"
      },
      {
        "github": "YashKumarVerma"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/certify",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 758
  },
  {
    "slug": "golly-bot",
    "order": 250,
    "title": "Golly Bot",
    "tagline": "A general purpose discord bot, written in GO!",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A general purpose discord bot, written in GO!",
    "longDescription": [
      "A general purpose discord bot, written in GO!",
      "Golly Bot was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 20 contributors, 42 pull requests and 115 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "20",
        "label": "Contributors"
      },
      {
        "value": "42",
        "label": "Pull requests"
      },
      {
        "value": "115",
        "label": "Commits"
      },
      {
        "value": "4",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "go"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "z404"
      },
      {
        "github": "ankan792"
      },
      {
        "github": "othorotka"
      },
      {
        "github": "salman0ansari"
      },
      {
        "github": "MqllR"
      },
      {
        "github": "SiddhiKhade"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/golly-bot",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 921
  },
  {
    "slug": "maildart-backend",
    "order": 260,
    "title": "MailDart Backend",
    "tagline": "A mass mailer operating through a given set of emails in JSON",
    "eyebrow": "ACM-VIT · Forktober 2021, 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A mass mailer operating through a given set of emails in JSON",
    "longDescription": [
      "A mass mailer operating through a given set of emails in JSON",
      "MailDart Backend was part of ACM-VIT's Forktober open-source drive across 2021, 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 6 contributors, 6 pull requests and 11 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "6",
        "label": "Contributors"
      },
      {
        "value": "6",
        "label": "Pull requests"
      },
      {
        "value": "11",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "javascript",
          "nodejs"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "decipher07"
      },
      {
        "github": "YashKumarVerma"
      },
      {
        "github": "Mannan-Goyal"
      },
      {
        "github": "1407arjun"
      },
      {
        "github": "MaheraFurniturewala"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/maildart-backend",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 603
  },
  {
    "slug": "paint-me",
    "order": 270,
    "title": "Paint-me",
    "tagline": "Paint-me Is a simple painting app. Feel free to show your artistic talent on the wide canvas provided!",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Paint-me Is a simple painting app. Feel free to show your artistic talent on the wide canvas provided!",
    "longDescription": [
      "Paint-me Is a simple painting app. Feel free to show your artistic talent on the wide canvas provided!",
      "Paint-me was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 6 contributors, 4 pull requests and 24 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "6",
        "label": "Contributors"
      },
      {
        "value": "4",
        "label": "Pull requests"
      },
      {
        "value": "24",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "kotlin",
          "android-studio"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "anshulhq"
      },
      {
        "github": "Arsh-78"
      },
      {
        "github": "SaxenaAnushka102"
      },
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "Chandra-Mauli-Sharma"
      },
      {
        "github": "RohitLakra299"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/Paint-me",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 795
  },
  {
    "slug": "cryptodash",
    "order": 280,
    "title": "CryptoDash",
    "tagline": "CryptoDash allows you to track the price of popular cryptocurrencies and see their performance over time.",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "CryptoDash allows you to track the price of popular cryptocurrencies and see their performance over time.",
    "longDescription": [
      "CryptoDash allows you to track the price of popular cryptocurrencies and see their performance over time.",
      "CryptoDash was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 5 contributors, 5 pull requests and 12 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "5",
        "label": "Contributors"
      },
      {
        "value": "5",
        "label": "Pull requests"
      },
      {
        "value": "12",
        "label": "Commits"
      },
      {
        "value": "2",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "flutter"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "ersascape"
      },
      {
        "github": "RohanKhatua"
      },
      {
        "github": "blyncnov"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/CryptoDash",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 89
  },
  {
    "slug": "todo-app",
    "order": 290,
    "title": "Todo App",
    "tagline": " A React web-app to maintain and track our day-to-day tasks or any thing important lined up for a day!",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": " A React web-app to maintain and track our day-to-day tasks or any thing important lined up for a day!",
    "longDescription": [
      " A React web-app to maintain and track our day-to-day tasks or any thing important lined up for a day!",
      "Todo App was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 10 contributors, 11 pull requests and 33 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "10",
        "label": "Contributors"
      },
      {
        "value": "11",
        "label": "Pull requests"
      },
      {
        "value": "33",
        "label": "Commits"
      },
      {
        "value": "2",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "react",
          "javascript"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "nakshatraraghav"
      },
      {
        "github": "harshalranjhani"
      },
      {
        "github": "tab21"
      },
      {
        "github": "ThPadelis"
      },
      {
        "github": "AryanKhubchandani"
      },
      {
        "github": "ersascape"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/todo-app",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 804
  },
  {
    "slug": "create-boilerplate-node",
    "order": 300,
    "title": "create-boilerplate-node",
    "tagline": "A CLI tool which generates boilerplate code for nodejs server applications taking in various configuration parameters.",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A CLI tool which generates boilerplate code for nodejs server applications taking in various configuration parameters.",
    "longDescription": [
      "A CLI tool which generates boilerplate code for nodejs server applications taking in various configuration parameters.",
      "create-boilerplate-node was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 1 contributors, 2 pull requests and 7 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "1",
        "label": "Contributors"
      },
      {
        "value": "2",
        "label": "Pull requests"
      },
      {
        "value": "7",
        "label": "Commits"
      },
      {
        "value": "1",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "nodejs",
          "javascript",
          "express",
          "mongodb"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "kaushalrathi24"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/create-boilerplate-node",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 311
  },
  {
    "slug": "qchat",
    "order": 310,
    "title": "QChat",
    "tagline": "Mobile chat application with end-to-end encryption using Quantum Key Distribution (QKD)",
    "eyebrow": "ACM-VIT · Forktober 2022 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Mobile chat application with end-to-end encryption using Quantum Key Distribution (QKD)",
    "longDescription": [
      "Mobile chat application with end-to-end encryption using Quantum Key Distribution (QKD)",
      "QChat was part of ACM-VIT's Forktober open-source drive in 2022, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 2 contributors, 0 pull requests and 10 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2022 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "2",
        "label": "Contributors"
      },
      {
        "value": "0",
        "label": "Pull requests"
      },
      {
        "value": "10",
        "label": "Commits"
      },
      {
        "value": "1",
        "label": "Forks"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "python"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Mayan-Ryan"
      },
      {
        "github": "AryanKhubchandani"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/QChat",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 529
  },
  {
    "slug": "algos-for-all-amigos",
    "order": 320,
    "title": "Algos for all Amigos",
    "tagline": "This repository consists an implementation of the Algorithms encountered in Computer Science, Physics and Mathematics.",
    "eyebrow": "ACM-VIT · Forktober 2021 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "This repository consists an implementation of the Algorithms encountered in Computer Science, Physics and Mathematics.",
    "longDescription": [
      "This repository consists an implementation of the Algorithms encountered in Computer Science, Physics and Mathematics.",
      "Algos for all Amigos was part of ACM-VIT's Forktober open-source drive in 2021, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 7 contributors, 11 pull requests and 31 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2021 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "7",
        "label": "Contributors"
      },
      {
        "value": "11",
        "label": "Pull requests"
      },
      {
        "value": "31",
        "label": "Commits"
      },
      {
        "value": "9",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "cplusplus",
          "python"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Chasmiccoder"
      },
      {
        "github": "nilupulmanodya"
      },
      {
        "github": "Karun842002"
      },
      {
        "github": "Devansh-ops"
      },
      {
        "github": "Anshika0924"
      },
      {
        "github": "Prasang023"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/Algos-for-all-Amigos",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 949
  },
  {
    "slug": "maildart-frontend",
    "order": 330,
    "title": "MailDart Frontend",
    "tagline": "A mass mailer operating through a given set of emails in CSV/JSON",
    "eyebrow": "ACM-VIT · Forktober 2021 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "A mass mailer operating through a given set of emails in CSV/JSON",
    "longDescription": [
      "A mass mailer operating through a given set of emails in CSV/JSON",
      "MailDart Frontend was part of ACM-VIT's Forktober open-source drive in 2021, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 7 contributors, 13 pull requests and 40 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2021 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "7",
        "label": "Contributors"
      },
      {
        "value": "13",
        "label": "Pull requests"
      },
      {
        "value": "40",
        "label": "Commits"
      },
      {
        "value": "5",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "javascript",
          "react"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Rachel-glitch"
      },
      {
        "github": "satyamsingh07"
      },
      {
        "github": "ANISH0309"
      },
      {
        "github": "ayushgoswamiabr"
      },
      {
        "github": "YashKumarVerma"
      },
      {
        "github": "Likkiii"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/maildart-frontend",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 755
  },
  {
    "slug": "acm-github-bot",
    "order": 340,
    "title": "ACM GitHub Bot",
    "tagline": "Github bot for ACM Organization",
    "eyebrow": "ACM-VIT · Forktober 2021 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Github bot for ACM Organization",
    "longDescription": [
      "Github bot for ACM Organization",
      "ACM GitHub Bot was part of ACM-VIT's Forktober open-source drive in 2021, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 3 contributors, 9 pull requests and 32 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2021 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "3",
        "label": "Contributors"
      },
      {
        "value": "9",
        "label": "Pull requests"
      },
      {
        "value": "32",
        "label": "Commits"
      },
      {
        "value": "3",
        "label": "Stars"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "javascript",
          "nodejs"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "SwarupKharul"
      },
      {
        "github": "YashKumarVerma"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/acm-github-bot",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 363
  },
  {
    "slug": "discord-hackpot",
    "order": 350,
    "title": "Discord Hackpot",
    "tagline": "Discord Hackpot is a discord bot to assist organizing events over discord",
    "eyebrow": "ACM-VIT · Forktober 2021 · Open Source",
    "themeColor": "#EFEFEF",
    "themeColorSecondary": "#1a1a1a",
    "shortDescription": "Discord Hackpot is a discord bot to assist organizing events over discord",
    "longDescription": [
      "Discord Hackpot is a discord bot to assist organizing events over discord",
      "Discord Hackpot was part of ACM-VIT's Forktober open-source drive in 2021, opening up to student contributors during Hacktoberfest.",
      "The repository is archived. It remains on GitHub as a record of the Forktober edition that ran it, but is no longer accepting new contributions.",
      "Across its lifetime, the project drew 4 contributors, 7 pull requests and 23 commits."
    ],
    "status": "archived",
    "statusNote": "Forktober 2021 · Archived",
    "cassetteSvg": "/events/events-forktober-cassette.svg",
    "stats": [
      {
        "value": "4",
        "label": "Contributors"
      },
      {
        "value": "7",
        "label": "Pull requests"
      },
      {
        "value": "23",
        "label": "Commits"
      },
      {
        "value": "0",
        "label": "Forks"
      }
    ],
    "techStack": [
      {
        "category": "Stack",
        "slugs": [
          "javascript",
          "nodejs"
        ]
      },
      {
        "category": "Tooling",
        "slugs": [
          "git",
          "github"
        ]
      }
    ],
    "developers": [
      {
        "github": "Mannan-Goyal"
      },
      {
        "github": "YashKumarVerma"
      },
      {
        "github": "ANISH0309"
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/ACM-VIT/discord-hackpot",
        "kind": "github"
      }
    ],
    "commitGraphSeed": 535
  }
];
