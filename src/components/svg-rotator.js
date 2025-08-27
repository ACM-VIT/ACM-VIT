// /src/components/svg-rotator.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// TEMPORARILY DISABLED TO PREVENT SCROLLING CONFLICTS
// This script is causing ScrollTrigger conflicts with model-gsap.ts
console.log("[svg-rotator] Script disabled to prevent scrolling conflicts");

// Commenting out the entire script to prevent ScrollTrigger conflicts
/*
document.addEventListener("DOMContentLoaded", () => {
  const rotators = document.querySelectorAll(".svg-rotator");

  rotators.forEach((container) => {
    const svgElement = container.querySelector("img");
    const inner = container.querySelector(".svg-inner");
    if (!svgElement || !inner) return;

    // read data attrs (fall back to defaults)
    const triggerSelector = container.dataset.trigger || null;
    const startDeg = Number.parseFloat(105);
    const endDeg = Number.parseFloat( 21);

    // offset behaviour: percent => vw (as you described), otherwise px
    const offsetRaw = ("10%").trim();
    if (offsetRaw.endsWith("%")) {
      const pct = Number.parseFloat(offsetRaw);
      inner.style.left = `-${pct}vw`; // treat percent as viewport width
    } else {
      inner.style.left = `-${Number.parseFloat(offsetRaw)}px`;
    }

    // initial rotation
    gsap.set(svgElement, { rotation: startDeg });

    // determine trigger (the scroll-driving element). If not found, use container.
    const triggerEl = triggerSelector ? document.querySelector(triggerSelector) : container;
    if (!triggerEl) {
      console.warn("[svg-rotator] trigger not found, skipping", triggerSelector);
      return;
    }

    // Decide what to pin. Pin the rotator container itself so it stays fixed visually.
    const pinTarget = container;

    // Compute pin distance (how long it stays pinned). Prefer explicit data attribute,
    // otherwise compute from viewport + element height so animation has room.
    let pinDistance = Number(container.dataset.pinDistance || 0);
    if (!pinDistance || pinDistance <= 0) {
      // default: container height + 1x viewport — adjust multiplier to taste
      pinDistance = Math.round(container.offsetHeight + window.innerHeight * 1.2);
    }

    // Destroy any leftover triggers on the same element (helps HMR or repeat runs)
    ScrollTrigger.getAll()
      .filter(t => t.trigger === triggerEl || t.pin === pinTarget)
      .forEach(t => t.kill());

    // Single timeline + single ScrollTrigger:
    // - the ScrollTrigger pins `pinTarget` to the viewport when `triggerEl` hits top,
    // - it runs for `pinDistance` px and scrubs the timeline so rotation maps to scroll progress.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",          // when trigger hits viewport top, pin begins
        end: `+=${pinDistance}`,   // how long the pin+animation lasts (px)
        scrub: true,
        pin: pinTarget,
        pinSpacing: true,          // leave placeholder so page doesn't jump; set to false if you want overlap
        markers: true,
        // optional callbacks for debugging:
        // onRefresh: () => console.log('refresh'),
        // onEnter: () => console.log('enter'),
        // onLeave: () => console.log('leave'),
      }
    });

    // Drive rotation across the timeline (ease: "none" makes it linear with scroll)
    tl.to(svgElement, { rotation: endDeg, ease: "none" });

    // Keep renderer in sync if you need (not needed for pure SVG)
    // ScrollTrigger.refresh(); // optional: ensure sizes are correct right away
  });
});
*/
