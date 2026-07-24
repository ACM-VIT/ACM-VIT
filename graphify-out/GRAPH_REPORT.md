# Graph Report - .  (2026-07-24)

## Corpus Check
- Large corpus: 3174 files · ~12,462,484 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 807 nodes · 1620 edges · 40 communities (38 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Blog Ingestion & Rendering|Blog Ingestion & Rendering]]
- [[_COMMUNITY_Events Collection Schema|Events Collection Schema]]
- [[_COMMUNITY_Content Compiler|Content Compiler]]
- [[_COMMUNITY_Cassette Scroll Page|Cassette Scroll Page]]
- [[_COMMUNITY_Yearly Archive Pages|Yearly Archive Pages]]
- [[_COMMUNITY_Hero & About Sections|Hero & About Sections]]
- [[_COMMUNITY_Event Calendar Widget|Event Calendar Widget]]
- [[_COMMUNITY_Block Registry & Pages|Block Registry & Pages]]
- [[_COMMUNITY_Design Guide System|Design Guide System]]
- [[_COMMUNITY_Cassette Player & Mobile Nav|Cassette Player & Mobile Nav]]
- [[_COMMUNITY_Misc Page Routes|Misc Page Routes]]
- [[_COMMUNITY_Forktober & Projects Data|Forktober & Projects Data]]
- [[_COMMUNITY_Team & Board Data|Team & Board Data]]
- [[_COMMUNITY_Site Singleton Schema|Site Singleton Schema]]
- [[_COMMUNITY_Design Intro Loader|Design Intro Loader]]
- [[_COMMUNITY_Domain Tools & AOI Cards|Domain Tools & AOI Cards]]
- [[_COMMUNITY_Misc Collections Schemas|Misc Collections Schemas]]
- [[_COMMUNITY_Project Details Schema|Project Details Schema]]
- [[_COMMUNITY_Domain Data Models|Domain Data Models]]
- [[_COMMUNITY_Design Products Collection|Design Products Collection]]
- [[_COMMUNITY_Footer & Home Layout|Footer & Home Layout]]
- [[_COMMUNITY_Cassette Builder Tool|Cassette Builder Tool]]
- [[_COMMUNITY_AOIs Collection & Domain Data|AOIs Collection & Domain Data]]
- [[_COMMUNITY_Domain Pages & Showcase UI|Domain Pages & Showcase UI]]
- [[_COMMUNITY_Keystatic Config Generation|Keystatic Config Generation]]
- [[_COMMUNITY_Sitemap & Slug Routes|Sitemap & Slug Routes]]
- [[_COMMUNITY_z0d1ak CTF Data|z0d1ak CTF Data]]
- [[_COMMUNITY_Merchandise Page|Merchandise Page]]
- [[_COMMUNITY_Projects Block & Title Art|Projects Block & Title Art]]
- [[_COMMUNITY_Achievements & Community|Achievements & Community]]
- [[_COMMUNITY_Design Domain AOI|Design Domain AOI]]
- [[_COMMUNITY_Research Domain AOI|Research Domain AOI]]
- [[_COMMUNITY_Pages Singleton Schema|Pages Singleton Schema]]
- [[_COMMUNITY_Schema Core Registry|Schema Core Registry]]
- [[_COMMUNITY_Blog Bento & Cards|Blog Bento & Cards]]
- [[_COMMUNITY_Tech Tool Logos|Tech Tool Logos]]
- [[_COMMUNITY_Gear Step UI|Gear Step UI]]
- [[_COMMUNITY_Calendar Sample Data|Calendar Sample Data]]

## God Nodes (most connected - your core abstractions)
1. `../layouts/Footer.astro` - 67 edges
2. `../layouts/Layout.astro` - 56 edges
3. `../styles/globals.css` - 52 edges
4. `getAssetUrl()` - 50 edges
5. `[]` - 45 edges
6. `../components/calendar/EventCalendar.astro` - 31 edges
7. `../components/ui/MobileNavbar.astro` - 28 edges
8. `[]` - 26 edges
9. `[]` - 25 edges
10. `../components/ui/FillButton.astro` - 23 edges

## Surprising Connections (you probably didn't know these)
- `loadTrack()` --calls--> `fmt()`  [INFERRED]
  src/components/ui/CassettePlayer.astro → src/components/ui/MobileNavbar.astro
- `applyRemoteState()` --calls--> `fmt()`  [INFERRED]
  src/components/ui/CassettePlayer.astro → src/components/ui/MobileNavbar.astro
- `../data/z0d1akData.ts` --re_exports--> `RatingYear`  [EXTRACTED]
  src/data/z0d1akData.ts → src/platform/schema/singletons/z0d1ak.ts
- `getPost()` --calls--> `processContent()`  [EXTRACTED]
  src/lib/blog/index.ts → src/lib/blog/content.ts
- `fetchFromRss()` --calls--> `parseRss()`  [EXTRACTED]
  src/lib/blog/hashnode.ts → src/lib/blog/rssParser.ts

## Import Cycles
- None detected.

## Communities (40 total, 2 thin omitted)

### Community 0 - "Blog Ingestion & Rendering"
Cohesion: 0.05
Nodes (55): GET(), ../blocks/BlogsBlock.astro, enhanceImages(), extractHeadings(), injectHeadingIds(), processContent(), slugify(), balanceHtmlFragment() (+47 more)

### Community 1 - "Events Collection Schema"
Cohesion: 0.06
Nodes (42): ../blocks/EventsBlock.astro, ../blocks/PartnersBlock.astro, EventCollectibleItem, eventCollectibleItemSchema, EventCollectibleYear, EventDetail, eventDetailSchema, EventEditionLink (+34 more)

### Community 2 - "Content Compiler"
Cohesion: 0.07
Nodes (35): assetUsage, auditAssets(), checkRefs(), codeRefs, compiledCollections, compiledSingletons, errors, fail() (+27 more)

### Community 3 - "Cassette Scroll Page"
Cohesion: 0.06
Nodes (33): [], boot(), buildCassette(), buildSpinStage, buildStages(), chapters, dpr, elapsedWordLower (+25 more)

### Community 4 - "Yearly Archive Pages"
Cohesion: 0.12
Nodes (11): items, ../blocks/AcmWBlock.astro, ../../../components/blog/BlogDock.astro, gsap/Flip, ./Header.astro, ../layouts/Layout.astro, gsap/ScrollTrigger, ../components/ui/AnimatedButton.astro (+3 more)

### Community 5 - "Hero & About Sections"
Cohesion: 0.08
Nodes (25): ../blocks/IntroBlock.astro, gsap/ScrambleTextPlugin, brandLogos, homeSection, techSection, wrapper, ../components/ui/ScrollCue.astro, measure() (+17 more)

### Community 6 - "Event Calendar Widget"
Cohesion: 0.09
Nodes (28): ../components/calendar/CalendarAgenda.astro, ../components/calendar/EventCalendar.astro, buildMonthGrid(), buildWeekGrid(), currentDate, DAYS, escapeHtml(), formatTime() (+20 more)

### Community 7 - "Block Registry & Pages"
Cohesion: 0.07
Nodes (21): ../blocks/CommunityBlock.astro, ../blocks/ContactBlock.astro, ../blocks/GalleryBlock.astro, ../blocks/OutroBlock.astro, BlockDef, blockNames, blocks, PageEntry (+13 more)

### Community 8 - "Design Guide System"
Cohesion: 0.07
Nodes (19): heart, breakpoints, figmaGrids, label, stops, sections, durations, easings (+11 more)

### Community 9 - "Cassette Player & Mobile Nav"
Cohesion: 0.07
Nodes (24): ../components/ui/CassettePlayer.astro, applyRemoteState(), loadTrack(), ../components/ui/MobileNavbar.astro, cpNext, cpPlayG, cpPrev, cpSvgArtist (+16 more)

### Community 10 - "Misc Page Routes"
Cohesion: 0.15
Nodes (11): featuredPosts, items, ../components/ui/BlogMarqueeCard.astro, ../components/ui/PartnerCasetteSingular.astro, ../components/ui/PartnerGridCard.astro, hasLogo, ../styles/calendar-agenda.css, ../styles/calendar.css (+3 more)

### Community 11 - "Forktober & Projects Data"
Cohesion: 0.09
Nodes (22): ../blocks/DomainsBlock.astro, ForktoberMetaEntry, GridProjectEntry, forktoberByYear, forktoberMeta, forktoberProjectDetails, forktoberYears, byName (+14 more)

### Community 12 - "Team & Board Data"
Cohesion: 0.13
Nodes (20): ../blocks/BoardBlock.astro, TeamMemberEntry, boardDivision, historicalBoards, TeamDivisionDef, TeamMember, teamYears, yearLabel() (+12 more)

### Community 13 - "Site Singleton Schema"
Cohesion: 0.13
Nodes (20): BlogRefEntry, blogRefSchema, BoardMemberEntry, boardMemberSchema, EventsSection, eventsSectionSchema, HomeDomainEntry, homeDomainSchema (+12 more)

### Community 14 - "Design Intro Loader"
Cohesion: 0.09
Nodes (20): bigCircles, C, cap, diagLines, diagSeeds, F, headRect, hLines (+12 more)

### Community 15 - "Domain Tools & AOI Cards"
Cohesion: 0.13
Nodes (15): ../../components/ToolCard.astro, iconUrl, ccTools, mgmtTools, techAOIs, techTools, pyramidSizes, techEventsCustom (+7 more)

### Community 16 - "Misc Collections Schemas"
Cohesion: 0.13
Nodes (16): AchievementEntry, achievementSchema, calendarDomain, CalendarEventEntry, calendarEventSchema, EventDomain, forktoberMetaSchema, gridProjectSchema (+8 more)

### Community 17 - "Project Details Schema"
Cohesion: 0.16
Nodes (16): collectTechSlugs(), ProjectDesigner, projectDesignerSchema, ProjectDetail, projectDetailSchema, ProjectDeveloper, projectDeveloperSchema, ProjectFeature (+8 more)

### Community 18 - "Domain Data Models"
Cohesion: 0.15
Nodes (14): CcEvent, CcTool, MgmtEvent, MgmtTool, TechAOI, TechEvent, TechProject, TechTool (+6 more)

### Community 19 - "Design Products Collection"
Cohesion: 0.17
Nodes (14): ProductExtra, productExtraSchema, ProductGuide, productGuideSchema, ProductIconography, productIconographySchema, ProductLink, productLinkSchema (+6 more)

### Community 20 - "Footer & Home Layout"
Cohesion: 0.14
Nodes (8): ../layouts/Footer.astro, currentYear, footerColumnsHtml, socialLinksHtml, home, ../components/ui/GrepSideTab.astro, ../../generated/pages, getMediaUrl()

### Community 21 - "Cassette Builder Tool"
Cohesion: 0.13
Nodes (6): ../components/ui/CassetteBuilder.astro, createColorPicker(), getPicker(), PRESETS, state, THEME_SWATCHES

### Community 22 - "AOIs Collection & Domain Data"
Cohesion: 0.18
Nodes (11): Aoi, AoiProject, aoiProjectSchema, aoiSchema, DesignWork, designWorkSchema, DesignAOI, DesignTool (+3 more)

### Community 23 - "Domain Pages & Showcase UI"
Cohesion: 0.19
Nodes (8): [], gsap/ScrollToPlugin, [], ../components/ui/CassetteTile.astro, ../components/ui/FillButton.astro, ../components/ui/ProjectsShowcase.astro, ../components/ui/SectionHeading.astro, ../../styles/domain.css

### Community 24 - "Keystatic Config Generation"
Cohesion: 0.23
Nodes (12): generatedCollections, generatedSingletons, AnyZod, fieldFor(), humanize(), ImageHints, keystaticCollection(), keystaticSingleton() (+4 more)

### Community 25 - "Sitemap & Slug Routes"
Cohesion: 0.22
Nodes (9): designAOIs, productGuides, eventSlugs, researchAOIs, [], totalPages, paths, staticPaths (+1 more)

### Community 26 - "z0d1ak CTF Data"
Cohesion: 0.18
Nodes (12): ../data/z0d1akData.ts, Achievement, achievementLines, Member, ResultRow, TimelineEra, CtfAchievement, ctfAchievementSchema (+4 more)

### Community 27 - "Merchandise Page"
Cohesion: 0.15
Nodes (12): btn, cards, chars, collAnims, collections, descs, edition, lineup (+4 more)

### Community 28 - "Projects Block & Title Art"
Cohesion: 0.21
Nodes (8): ../blocks/ProjectsBlock.astro, lookupTechTool(), projectDetails, projectSlugs, ../data/projectDetailsData, ../../generated/home-projects, ../../utils/titleArt, titleToArt()

### Community 29 - "Achievements & Community"
Cohesion: 0.24
Nodes (4): achievements, z0d1akPodiums, focusAreas, ../styles/globals.css

### Community 30 - "Design Domain AOI"
Cohesion: 0.22
Nodes (7): designTools, aoiData, aoiTools, otherAOIs, designEventsCustom, pyramidSizes, ../data/designDomainData

### Community 31 - "Research Domain AOI"
Cohesion: 0.22
Nodes (7): researchTools, pyramidSizes, researchEventsCustom, aoiData, aoiTools, otherAOIs, ../data/researchDomainData

### Community 32 - "Pages Singleton Schema"
Cohesion: 0.20
Nodes (9): statSchema, AchievementsPage, achievementsPageSchema, DomainPage, domainPageSchema, EventLinks, eventLinksSchema, Redirects (+1 more)

### Community 33 - "Schema Core Registry"
Cohesion: 0.22
Nodes (8): CollectionDef, ContentDef, defineCollection(), defineSingleton(), PUBLISHING_KEYS, publishingFields, RefRule, SingletonDef

### Community 34 - "Blog Bento & Cards"
Cohesion: 0.33
Nodes (6): ../../components/blog/BentoGrid.astro, leftPosts, rightPosts, formattedDate, ../../components/blog/BlogList.astro, ../../../lib/blog/types

### Community 35 - "Tech Tool Logos"
Cohesion: 0.29
Nodes (6): colorHex, monochrome, name, order, slug, svgFile

## Knowledge Gaps
- **292 isolated node(s):** `name`, `slug`, `svgFile`, `colorHex`, `monochrome` (+287 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `../layouts/Footer.astro` connect `Footer & Home Layout` to `Blog Ingestion & Rendering`, `Events Collection Schema`, `Cassette Scroll Page`, `Yearly Archive Pages`, `Misc Page Routes`, `Forktober & Projects Data`, `Team & Board Data`, `Domain Tools & AOI Cards`, `Domain Data Models`, `AOIs Collection & Domain Data`, `Domain Pages & Showcase UI`, `Sitemap & Slug Routes`, `Merchandise Page`, `Projects Block & Title Art`, `Achievements & Community`, `Design Domain AOI`, `Research Domain AOI`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `../layouts/Layout.astro` connect `Yearly Archive Pages` to `Blog Ingestion & Rendering`, `Events Collection Schema`, `Cassette Scroll Page`, `Hero & About Sections`, `Cassette Player & Mobile Nav`, `Misc Page Routes`, `Forktober & Projects Data`, `Team & Board Data`, `Domain Tools & AOI Cards`, `Footer & Home Layout`, `Domain Pages & Showcase UI`, `Sitemap & Slug Routes`, `Merchandise Page`, `Projects Block & Title Art`, `Achievements & Community`, `Design Domain AOI`, `Research Domain AOI`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `[]` connect `Cassette Scroll Page` to `Achievements & Community`, `Yearly Archive Pages`, `Footer & Home Layout`, `Domain Pages & Showcase UI`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `svgFile` to the rest of the system?**
  _292 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Blog Ingestion & Rendering` be split into smaller, more focused modules?**
  _Cohesion score 0.05472837022132797 - nodes in this community are weakly interconnected._
- **Should `Events Collection Schema` be split into smaller, more focused modules?**
  _Cohesion score 0.05568627450980392 - nodes in this community are weakly interconnected._
- **Should `Content Compiler` be split into smaller, more focused modules?**
  _Cohesion score 0.06852497096399536 - nodes in this community are weakly interconnected._