// src/components/rotator-text.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".svg-rotator");

  wrappers.forEach((container) => {
    // ensure text wrapper exists
    let textWrap = container.querySelector(".rotator-text");
    if (!textWrap) {
      textWrap = document.createElement("div");
      textWrap.className = "rotator-text";
      container.appendChild(textWrap);
    }

    // find or create the <p>. We want exactly one editable p we animate.
    let p = container.querySelector(".rotator-p");
    if (!p) {
      p = document.createElement("p");
      p.className = "rotator-p";
      p.id = container.id ? `${container.id}-text` : "";
      // put placeholder visible text (you can override via data-texts)
      p.textContent = container.dataset.text || " "; 
      textWrap.appendChild(p);
    }

    // style fallback to ensure text is visible (in case CSS was missing)
    // keep light touch — user can override with their CSS
    Object.assign(p.style, {
      margin: "0",
      color: "#fff",
      fontSize: "1.25rem",
      lineHeight: "1.2",
      opacity: p.style.opacity || 0,
      transform: p.style.transform || "translateY(20px)",
      willChange: "opacity, transform",
    });

    // determine trigger element (shared with rotator)
    const triggerSelector = container.dataset.trigger || null;
    const triggerEl = triggerSelector ? document.querySelector(triggerSelector) : container;
    if (!triggerEl) {
      console.warn("[rotator-text] trigger not found:", triggerSelector);
      return;
    }

    // get pinDistance either set by rotator or compute same default
    let pinDistance = Number(container.dataset.pinDistance || 0);
    if (!pinDistance || pinDistance <= 0) {
      pinDistance = Math.round(container.offsetHeight + window.innerHeight * 1.2);
    }

    // parse a list of texts:
    // - highest priority: container.dataset.texts as JSON array string e.g. '["a","b"]'
    // - fallback: container.dataset.texts as a separator-joined string; use dataset.textsSep or '||'
    let texts = [];
    if (container.dataset.texts) {
      try {
        const parsed = JSON.parse(container.dataset.texts);
        if (Array.isArray(parsed)) texts = parsed.map(String);
        else throw new Error("not array");
      } catch (e) {
        // fallback split
        const sep = container.dataset.textsSep || "||";
        texts = String(container.dataset.texts).split(sep).map(s => s.trim()).filter(Boolean);
      }
    }
    // if no texts array provided, try single fallback from dataset.text or p.textContent
    if (texts.length === 0) {
      const fallback = container.dataset.text || p.textContent || "";
      texts = fallback ? [fallback] : [""]; // ensure at least one entry
    }

    // ensure the initial visible text is the first entry
    p.textContent = texts[0];

    // if only a single text, animate it in/out based on progress (previous behavior)
    if (texts.length === 1) {
      gsap.set(p, { opacity: 0, y: 20 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: true,
          markers: false,
        }
      });
      // fade in early, hold, fade out near end
      tl.to(p, { opacity: 1, y: 0, ease: "none", duration: 0.15 }, 0);
      tl.to(p, { opacity: 0, y: -20, ease: "none", duration: 0.2 }, 0.8);
      return;
    }

    // If multiple texts: change p.textContent as the scroll progresses.
    let lastIndex = -1;
    const n = texts.length;

    // helper to swap text with animated crossfade (small durations for smoothness)
    function swapToIndex(i) {
      if (i === lastIndex) return;
      lastIndex = i;
      // quick fade out, change content, fade in
      gsap.to(p, {
        duration: 0.14,
        opacity: 0,
        y: -8,
        ease: "power1.out",
        onComplete() {
          p.textContent = texts[i] ?? "";
          gsap.to(p, { duration: 0.18, opacity: 1, y: 0, ease: "power1.out" });
        }
      });
    }

    // create ScrollTrigger that only drives onUpdate (no timeline required)
    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: `+=${pinDistance}`,
      scrub: true,
      markers: false,
      onUpdate(self) {
        // map progress [0,1] to discrete index [0..n-1], use floor so early indices hold longer
        const prog = Math.max(0, Math.min(1, self.progress));
        let idx = Math.floor(prog * n);
        if (idx === n) idx = n - 1; // clamp upper edge
        swapToIndex(idx);
      },
      onRefresh() {
        // re-evaluate on refresh (for resizes)
        lastIndex = -1;
      }
    });

    // ensure start visible state for p after setup
    gsap.set(p, { opacity: 1, y: 0 });
  });
});
