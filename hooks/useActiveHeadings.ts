"use client";
import React from "react";
export const useActiveHeading = (headings: any[]) => {
  const [activeId, setActiveId] = React.useState(headings?.[0]?.id || "");

  React.useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);

            if (history.pushState) {
              history.pushState(null, "", `#${id}`);
            } else {
              window.location.hash = `#${id}`;
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const elements = headings
      .map((heading: any) => document.getElementById(heading.id))
      .filter(Boolean);

    elements.forEach((element: any) => observer.observe(element as Element));

    return () => {
      elements.forEach((element: any) =>
        observer.unobserve(element as Element),
      );
    };
  }, [headings]);

  return activeId;
};
