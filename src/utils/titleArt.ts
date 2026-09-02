import figlet from "figlet";
// Importable font ships the .flf as a string, so parseFont avoids figlet's
// fs-based sync loader (which is unavailable in the Cloudflare worker build).
import ansiShadow from "figlet/importable-fonts/ANSI Shadow.js";

let registered = false;

/** Render text as ANSI Shadow block-letter ASCII art (build-time safe). */
export function titleToArt(text: string): string {
  if (!registered) {
    figlet.parseFont("ANSI Shadow", ansiShadow as unknown as string);
    registered = true;
  }
  return figlet.textSync(text, { font: "ANSI Shadow" });
}
