"use client";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { AnchoredSectionMenuPositions } from "@/constants/enum";
import { cn } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import React, { useEffect, useState, useRef } from "react";

interface Action {
  label: string;
  icon: { icons_id: Icon }[];
}

interface Item {
  headline?: string;
  subheadline?: string;
  action?: Action;
  hovering_image?: string;
  background_image?: string;
}

interface AnchoredSectionsInnerTabsDesktopViewProps {
  parentIndex: number;
  items: Item[];
  menuPosition: AnchoredSectionMenuPositions;
  cardName: string;
  activeIcon: Icon;
}

function AnchoredSectionsInnerTabsDesktopView({
  parentIndex,
  cardName,
  items,
  menuPosition,
  activeIcon,
}: AnchoredSectionsInnerTabsDesktopViewProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = tabContentRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            requestAnimationFrame(() => setActiveIndex(index));
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    tabContentRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      tabContentRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [items]);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    const container = containerRef.current;
    const target = tabContentRefs.current[index];
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop, // Adjust for any container offset
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id={`section-${cardName}-desktop`}
      className={cn(
        "flex w-full ",
        menuPosition === AnchoredSectionMenuPositions.LEFT
          ? " grid-flow"
          : "flex-row-reverse",
      )}
    >
      <div className="flex h-fit w-1/4 flex-col divide-y divide-black border border-black">
        {items.map((item, index) => (
          <button
            key={index}
            className={` flex w-full justify-between p-4 text-left ${activeIndex === index ? "bg-black text-white" : ""} ${
              menuPosition === AnchoredSectionMenuPositions.LEFT
                ? ""
                : "flex-row-reverse"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            <div
              className="max-w-[249px] text-left text-sm"
              dangerouslySetInnerHTML={{
                __html: item.headline || "",
              }}
            ></div>
            {activeIndex === index && (
              <DirectusImageClient
                asset={activeIcon}
                width={20}
                height={20}
                className={`${
                  menuPosition === AnchoredSectionMenuPositions.RIGHT
                    ? "left-[10px] rotate-180"
                    : "right-[10px]"
                }  size-5 shrink-0 text-primary transition-opacity`}
              />
            )}
          </button>
        ))}
      </div>
      <div
        ref={containerRef}
        className="no-scrollbar flex h-[513px] w-3/4 snap-y snap-mandatory flex-col gap-20 overflow-y-scroll scroll-smooth border-[0.5px] border-[#ECDAA1] bg-background"
      >
        {items.map((item, index) => (
          <TabContent
            index={index}
            parentIndex={parentIndex}
            key={index}
            item={item}
            ref={(el) => {
              tabContentRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

interface TabContentProps {
  item: Item;
  index: number;
  parentIndex: number;
}

const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ item, index, parentIndex }, ref) => {
    return (
      <div
        ref={ref}
        className={`content-anchored-inner-tabs-${parentIndex} grid h-[513px] shrink-0 snap-end grid-cols-2`}
      >
        <div className="flex flex-col justify-between p-20">
          <div
            className="pointer-events-auto max-w-[351px] text-base"
            dangerouslySetInnerHTML={{
              __html: item.subheadline || "",
            }}
          ></div>
          {item.action ? (
            <ButtonLink
              key={item?.action?.label + index}
              button={item?.action}
              className="pointer-events-auto"
            >
              <CButton
                className="h-[37px] justify-between text-sm"
                label={item.action.label}
                icon={item.action.icon[0].icons_id}
                iconClassName="text-primary"
                btn={item.action}
              />
            </ButtonLink>
          ) : null}
        </div>
        <div
          className={cn(
            "relative flex size-full flex-1 shrink-0 items-center justify-center aspect-square translate-x-[-1px] p-4 md:p-8 md:py-12",
          )}
        >
          {item?.hovering_image && (
            <div className="relative z-10 size-full">
              <DirectusImageClient
                blur
                key={index}
                fill
                className="aspect-square object-contain"
                asset={item.hovering_image}
              />
            </div>
          )}
          {item?.background_image ? (
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative size-full bg-mistral-beige-deeper dark:bg-mistral-black">
                <DirectusImageClient
                  asset={item?.background_image}
                  fill
                  blur
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

TabContent.displayName = "TabContent";

export default AnchoredSectionsInnerTabsDesktopView;
