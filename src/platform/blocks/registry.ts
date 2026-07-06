/**
 * Block registry - the catalogue of page sections editors can compose with.
 *
 * Pure data (node-safe): the compiler validates page content against these
 * names, and the Keystatic page editor offers them in a select. The matching
 * Astro components live in src/blocks/ and are wired up in
 * src/components/PageSections.astro - adding a block means: component in
 * src/blocks/, entry here, mapping there. The build fails if the three
 * drift apart.
 *
 * Lifecycle: new blocks start "experimental" (hidden from the picker default
 * list is a future nicety), become "stable", and are only deleted after the
 * compiler's usage index proves nothing references them ("deprecated" until
 * then).
 */
export interface BlockDef {
  name: string;
  label: string;
  description: string;
  status: "stable" | "experimental" | "deprecated";
}

export const blocks: BlockDef[] = [
  { name: "intro", label: "Intro (hero + about)", description: "Scroll-video hero, legend pins, Because Tech Matters, and the About section. One unit - they share the pinned scroll video.", status: "stable" },
  { name: "domains", label: "Domains", description: "The five domain cassettes (desktop grid / mobile variant).", status: "stable" },
  { name: "events", label: "Events rail", description: "Event cassette rail with detail overlays.", status: "stable" },
  { name: "projects", label: "Projects showcase", description: "Projects intro, showcase rail from the home-projects collection, and the projects CTA.", status: "stable" },
  { name: "acm-w", label: "ACM-W", description: "ACM-W motto, content, and bento grid.", status: "stable" },
  { name: "community", label: "Community", description: "Community programs section.", status: "stable" },
  { name: "board", label: "Board", description: "Current board members from the board-members collection.", status: "stable" },
  { name: "blogs", label: "Blogs", description: "Blog marquee.", status: "stable" },
  { name: "partners", label: "Partners", description: "Partner logo marquee with partner CTAs.", status: "stable" },
  { name: "gallery", label: "Gallery", description: "Photo gallery strip.", status: "stable" },
  { name: "contact", label: "Contact", description: "Contact form (desktop / touch variant).", status: "stable" },
  { name: "outro", label: "Outro (more tapes + boombox)", description: "More Tapes curtain over the pinned Socials boombox. One unit - they share the curtain scroll trick.", status: "stable" },
];

export const blockNames = blocks.map((b) => b.name) as [string, ...string[]];
