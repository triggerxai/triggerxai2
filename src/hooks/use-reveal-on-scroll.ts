import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-stagger, .reveal-image";

/**
 * Adds subtle reveal animations as elements enter the viewport.
 * Targets `.reveal`, `.reveal-stagger`, and `.reveal-image`.
 * Also drives a lightweight parallax via `--parallax-y` on `.parallax` elements.
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => {
          if (!el.classList.contains("reveal-visible")) observer.observe(el);
        });
    };

    observe();

    const mutation = new MutationObserver(() => observe());
    mutation.observe(document.body, { childList: true, subtree: true });

    // Lightweight parallax — uses rAF + scroll
    let ticking = false;
    const updateParallax = () => {
      const els = document.querySelectorAll<HTMLElement>(".parallax");
      const vh = window.innerHeight;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.06");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = -center * speed;
        el.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateParallax();

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
};
