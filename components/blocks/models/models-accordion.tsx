"use client";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollToItem } from "@/hooks/useScrollToItem";
import { directusAssets } from "@/lib/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelsAccordionProps } from "./types";
import { useScrollContext } from "@/contexts/ScrollContext";

const colorClasses = [
  "bg-mistral-sunshine-50",
  "bg-mistral-sunshine-100",
  "bg-mistral-sunshine-200",
  "bg-mistral-sunshine-300",
  "bg-mistral-sunshine-400",
  "bg-mistral-sunshine-500",
  "bg-mistral-sunshine-600",
];

export default function ModelsAccordion({ data }: ModelsAccordionProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { anchor } = data;

  const slideHeight = isMobile ? 600 : 420;
  const slideTranslateY = 30;

  const { items, note, heading } = data;

  const { ref, scrollToItem } = useScrollToItem(slideHeight, items);
  const { setScrollFunction } = useScrollContext();

  useEffect(() => {
    setScrollFunction(scrollToItem);
  }, [scrollToItem, setScrollFunction]);

  const [scrollY, setScrollY] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top + window.scrollY);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const currentScrollY = window.scrollY;

      if (currentScrollY > top) {
        setScrollY(currentScrollY - top);
      } else {
        setScrollY(0);
      }
    }
  }, [top]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const memoizedItems = useMemo(
    () =>
      items.map((item, index) => {
        const isVisible = scrollY >= index * (slideHeight - slideTranslateY);
        const scale = isVisible ? 1 : 1 - index * 0.02;
        const translateY =
          scrollY > index * slideHeight
            ? -scrollY + index * (slideHeight + slideTranslateY)
            : index * slideTranslateY;

        return (
          <div
            key={index}
            className={`absolute flex h-[600px] w-full flex-col md:h-[420px] ${index === 0 ? "bg-mistral-beige" : ""}`}
            style={{
              zIndex: items.length - index + 1,
              transform: `translateY(${translateY}px)`,
            }}
          >
            <div
              className={`${colorClasses[index]} grid size-full gap-12 p-6 transition-transform duration-200 ease-in-out md:grid-cols-2 md:p-12`}
              style={{
                transform: `scale(${scale})`,
              }}
            >
              <div>
                <h3 className="heading-3 mb-[18px] font-normal text-foreground">
                  {item.title}
                </h3>
                <p className="text-xl/[21.6px] font-normal leading-6 text-foreground md:text-[20px]">
                  {item.short_desc}
                </p>
              </div>

              <div className="flex items-start justify-end gap-6">
                <img
                  src={directusAssets(item?.description_icon)}
                  alt={item?.name || "icon"}
                  className="mt-[5px] hidden md:block"
                />
                <div>
                  <div className="mb-4 flex items-start gap-6 md:mb-0">
                    <img
                      src={directusAssets(item?.description_icon)}
                      alt={item?.name || "icon"}
                      className="mt-[5px] md:hidden"
                    />
                    <p className="mb-6 max-w-[294px] text-lg/[21.6px] font-normal leading-6 text-foreground md:mb-[42px] md:text-[20px]">
                      {item.long_desc}
                    </p>
                  </div>

                  {item.button && (
                    <ButtonLink
                      button={item.button}
                      className="w-fit md:min-w-min"
                    >
                      <CButton
                        className="h-[44px] w-fit justify-between"
                        label={item?.button?.label}
                        icon={item?.button?.icon[0]?.icons_id}
                        btn={item?.button}
                      />
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }),
    [scrollY, slideHeight, slideTranslateY, items],
  );

  return (
    <section id={anchor || ""} className="py-12">
      <div className="container mb-24">
        <h1
          className="models-accordion-heading mb-12 max-w-[952px] text-[30px]/[34.5px] font-normal text-foreground md:text-5xl/[45.6px]"
          dangerouslySetInnerHTML={{ __html: heading || "" }}
        />
        {note && <span className="">{note.label}</span>}
      </div>
      <div className="accordion-container container" ref={ref}>
        <section className="container sticky top-[25vh] mx-auto flex h-[600px] items-center justify-center py-24 md:h-[420px] ">
          {memoizedItems}
        </section>
        {items.map((item) => (
          <div className="h-[600px] md:h-[420px]" key={item.id}></div>
        ))}
      </div>
    </section>
  );
}
