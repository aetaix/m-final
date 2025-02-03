"use client";

import ScrollTrigger from "gsap/src/ScrollTrigger";
import Lenis, { LenisOptions } from "lenis";
import { useEffect } from "react";

export const SmoothScroll = () => {
  useEffect(() => {
    // we need to ensure this is executed on client side
    if (typeof window !== "undefined") {
      const lenisOptions: LenisOptions = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(1.8, -10 * t)),
        touchMultiplier: 2,
        lerp: 0,
        smoothWheel: true,
      };

      const lenisInstance = new Lenis(lenisOptions);
      lenisInstance.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
        ScrollTrigger.update();
      }
      requestAnimationFrame(raf);
      return () => {
        lenisInstance.destroy();
      };
    }
  }, []);

  return null;
};
