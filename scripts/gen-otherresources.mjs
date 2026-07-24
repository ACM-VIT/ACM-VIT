// One-off asset pipeline for the /design/otherresources gallery.
// Takes the raw event / product / enamel logos off the design team's
// drive, renames them to kebab-case slugs, and emits SVG (vector sources
// only) plus PNG + WebP at 512 / 1024 / 2048 into public/design/otherresources.
// Longest side maps to the size number, aspect + transparency preserved,
// matching the logosystem convention.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "/Users/juxtar/Desktop/Event Logos";
const OUT = path.resolve("public/design/otherresources");
const SIZES = [512, 1024, 2048];

// [ source (relative to SRC), slug, "vec" (svg source) | "raster" (png source) ]
const CATALOG = [
  // Events & hackathons
  ["Apptitude/Apptitude v2.svg", "apptitude-v2", "vec"],
  ["Apptitude/Apptitude-v1.png", "apptitude-v1", "raster"],
  ["Code plus plus/Frame 2396.svg", "code-plus-plus", "vec"],
  ["Code2Create/C2C Logo.svg", "code2create-logo", "vec"],
  ["Code2Create/Frame 1000011067.svg", "code2create-wordmark", "vec"],
  ["Codex Cryptum/Codex Cryptum 2023.svg", "codex-cryptum-2023", "vec"],
  ["Codex Cryptum/Codex Cryptum 2024.svg", "codex-cryptum-2024", "vec"],
  ["Codex Cryptum/Codex Cryptum 2025.svg", "codex-cryptum-2025", "vec"],
  ["Cryptic Hunt/Cryptic Hunt-1 Logo.svg", "cryptic-hunt-1", "vec"],
  ["Cryptic Hunt/Cryptic Hunt 2.0.svg", "cryptic-hunt-2", "vec"],
  ["Cryptic Hunt/Cryptic Hunt-3.0.png", "cryptic-hunt-3", "raster"],
  ["Cryptic Hunt/cryptic hunt 4.svg", "cryptic-hunt-4", "vec"],
  ["Forktober/forktober logo.svg", "forktober-logo", "vec"],
  ["Forktober/Vector-1.svg", "forktober-wordmark-dark", "vec"],
  ["Forktober/Vector.svg", "forktober-wordmark-white", "vec"],
  ["GREP/Frame 2731.svg", "grep-blue", "vec"],
  ["GREP/Frame 2736.svg", "grep-cream", "vec"],
  ["The Neural Hack/Neural Hack full logo.svg", "neural-hack-logo", "vec"],
  ["The Neural Hack/Neural Hack Brain.svg", "neural-hack-brain", "vec"],
  ["The Neural Hack/The Neural Hack wordmark.svg", "neural-hack-wordmark", "vec"],
  ["Reverse Coding/Reverse Coding old.svg", "reverse-coding-classic", "vec"],
  ["Reverse Coding/Reverse Coding-2024.svg", "reverse-coding-2024", "vec"],
  ["Reverse Coding/Reverse Coding 2025.svg", "reverse-coding-2025", "vec"],
  ["Reverse Coding/Reverse Coding-2026.svg", "reverse-coding-2026", "vec"],
  ["__abs__/Users/juxtar/Desktop/rc-26-car.png", "reverse-coding-2026-car", "raster"],
  ["the tiny hack/full with bg.svg", "tiny-hack-logo", "vec"],
  ["the tiny hack/black.svg", "tiny-hack-black", "vec"],
  ["the tiny hack/white.svg", "tiny-hack-white", "vec"],
  ["conclave-logo.svg", "conclave-logo", "vec"],
  ["localhost-red.svg", "localhost-red", "vec"],
  ["localhost-dark.svg", "localhost-dark", "vec"],
  // Products & platforms
  ["ExamCooker full logo.svg", "examcooker-logo", "vec"],
  ["examcooker brandmark.svg", "examcooker-brandmark", "vec"],
  ["examcookerWordmark.svg", "examcooker-wordmark", "vec"],
  ["UniPool 2.0 Logo.svg", "unipool-logo", "vec"],
  // Enamel pins
  ["enamel/ACM Enamel.svg", "enamel-acm", "vec"],
  ["enamel/ACM-W Enamel.svg", "enamel-acmw", "vec"],
  ["enamel/C2C Enamel.svg", "enamel-code2create", "vec"],
  ["enamel/conclave-enamel.svg", "enamel-conclave", "vec"],
  ["enamel/Cryptic Hunt Enamel.svg", "enamel-cryptic-hunt", "vec"],
  ["enamel/ExamCooker Enamel.svg", "enamel-examcooker", "vec"],
  ["enamel/Reverse Coding Enamel.svg", "enamel-reverse-coding", "vec"],
  ["enamel/UniPool 2.0 enamel.svg", "enamel-unipool", "vec"],
  ["enamel/Group 48095818.svg", "enamel-acmone", "vec"],
  ["enamel/hello enamel.svg", "enamel-hello", "vec"],
];

fs.mkdirSync(OUT, { recursive: true });

async function raster(input, slug) {
  // Base metadata at default density so we can scale SVGs up crisply.
  const meta = await sharp(input).metadata();
  const maxDim = Math.max(meta.width || 1, meta.height || 1);
  for (const S of SIZES) {
    const density = Math.min(3000, Math.max(72, Math.round((72 * S) / maxDim)));
    const base = sharp(input, { density }).resize(S, S, {
      fit: "inside",
      withoutEnlargement: false,
    });
    await base
      .clone()
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `${slug}-${S}.png`));
    await base
      .clone()
      .webp({ quality: 90 })
      .toFile(path.join(OUT, `${slug}-${S}.webp`));
  }
}

// Uniform stage preview: trim the source to its content box (drops glow /
// padding baked into individual exports), then centre it on one fixed
// canvas so every card renders the mark at the same optical size. The
// downloads above stay untouched - this only feeds the gallery <img>.
const PREVIEW_W = 880;
const PREVIEW_H = 300;
async function preview(input, slug) {
  const meta = await sharp(input).metadata();
  const maxDim = Math.max(meta.width || 1, meta.height || 1);
  const density = Math.min(3000, Math.max(72, Math.round((72 * 1600) / maxDim)));
  let img = sharp(input, { density });
  try {
    img = img.trim({ threshold: 12 });
  } catch {
    /* nothing to trim */
  }
  await img
    .resize(PREVIEW_W, PREVIEW_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      position: "centre",
    })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, `${slug}-preview.webp`));
}

let ok = 0;
for (const [rel, slug, kind] of CATALOG) {
  const input = rel.startsWith("__abs__") ? rel.slice("__abs__".length) : path.join(SRC, rel);
  if (!fs.existsSync(input)) {
    console.error("MISSING", rel);
    continue;
  }
  if (kind === "vec") {
    fs.copyFileSync(input, path.join(OUT, `${slug}.svg`));
  }
  await raster(input, slug);
  await preview(input, slug);
  ok++;
  console.log("done", slug);
}
console.log(`\n${ok}/${CATALOG.length} logos generated into ${OUT}`);
