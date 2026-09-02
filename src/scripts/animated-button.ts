import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

function initAnimatedButtons() {
  const anchors = document.querySelectorAll<HTMLElement>("[data-anim-btn]");

  anchors.forEach((anchor) => {
    if (anchor.dataset.animBtnInit) return;
    anchor.dataset.animBtnInit = "1";

    const btn = anchor.querySelector<HTMLElement>(".anim-btn");
    const label = anchor.querySelector<HTMLElement>(".anim-btn-label");
    if (!btn || !label) return;

    let triggered = false;

    const play = (immediate = false) => {
      if (triggered) return;
      triggered = true;

      const run = () => {
        const tl = gsap.timeline();

        tl.fromTo(
          btn,
          { opacity: 0, y: 24, scale: 0.7 },
          {
            opacity: 1,
            y: -6,
            scale: 1.05,
            duration: 0.35,
            ease: "power2.out",
          }
        )
          .to(btn, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          })
          .add(() => {
            const state = Flip.getState(btn);
            btn.classList.add("is-expanded");

            Flip.from(state, {
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(label, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }, "-=0.08");
      };

      if (immediate) run();
      else gsap.delayedCall(1, run);
    };

    const st = ScrollTrigger.create({
      trigger: anchor,
      start: "top 95%",
      onEnter: () => play(),
      onEnterBack: () => play(),
    });

    // Already past trigger at init (page jump / fast scroll / refresh mid-page)
    const rect = anchor.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.95) {
      play(true);
      st.kill();
    }
  });
}

// Listen for variant mounts (templates cloned into live DOM)
window.addEventListener("variants-mounted", () => {
  requestAnimationFrame(() => initAnimatedButtons());
});
window.addEventListener("app:variants-mounted", () => {
  requestAnimationFrame(() => initAnimatedButtons());
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => initAnimatedButtons());
    });
  });
} else {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => initAnimatedButtons());
  });
}
