"use client";
import { useEffect, useState } from "react";

const MOBILE_MARGIN = 80;
const DESKTOP_MARGIN = 123;
const BREAKPOINT = 1024;

const ScrollToSection = () => {
  const [margin, setMargin] = useState(DESKTOP_MARGIN);

  useEffect(() => {
    const updateMargin = () => {
      const updatedMargin =
        window.innerWidth >= BREAKPOINT ? DESKTOP_MARGIN : MOBILE_MARGIN;
      setMargin(updatedMargin);
    };

    updateMargin();

    window.addEventListener("resize", updateMargin);

    const scrollToSection = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const scrollHandler = () => {
          const section = document.getElementById(hash);
          if (section) {
            const elementPosition =
              section.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
              top: elementPosition - margin,
              behavior: "smooth",
            });
          }
        };

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", scrollHandler);
        } else {
          requestAnimationFrame(() => {
            setTimeout(scrollHandler, 50);
          });
        }
      }
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);

    return () => {
      window.removeEventListener("resize", updateMargin);
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, [margin]);

  return <div />;
};

export default ScrollToSection;
