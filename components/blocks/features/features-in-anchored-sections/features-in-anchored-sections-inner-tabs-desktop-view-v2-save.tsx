"use client";

import FeaturesInAnchoredSectionsInnerTabButton from "@/components/features-in-anchored-sections-inner-tab-button";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { AnchoredSectionMenuPositions } from "@/constants/enum";
import { cn, slugify } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import { useEffect, useState } from "react";

function AnchoredSectionsInnerTabsDesktopView({
  cardName,
  parentIndex,
  items,
  menuPosition,
  activeIcon,
}: {
  parentIndex: number;
  items: any;
  menuPosition: AnchoredSectionMenuPositions;
  activeIcon: Icon;
  cardName: string;
}) {
  const [activeTab, setActiveTab] = useState(items[0].id);

  const updateActiveTab = (itemId: string) => {
    setActiveTab(itemId);
  };

  return (
    <div id={`section-${cardName}-desktop`} className="hidden md:flow-root">
      <div
        className={cn(
          "flex scroll-smooth",
          menuPosition === AnchoredSectionMenuPositions.LEFT
            ? "flex-row"
            : "flex-row-reverse",
        )}
      >
        <div className="sticky top-[188px] flex !h-fit w-[330px] flex-col divide-y divide-mistral-black border border-mistral-black">
          {items.map((item: any) => (
            <FeaturesInAnchoredSectionsInnerTabButton
              parentIndex={parentIndex}
              key={`title-${item?.id}-anchored-inner-tabs`}
              item={item}
              activeButton={activeTab}
              activeIcon={activeIcon}
              menuPosition={menuPosition}
              updateActiveTab={updateActiveTab}
            />
          ))}
        </div>
        <div
          id={"section-tab-content" + "-" + parentIndex}
          className="no-scrollbar flex h-[513px] flex-1 flex-col gap-y-3xl overflow-y-scroll border-[0.5px] border-[#ECDAA1] bg-background"
        >
          {items.map((item: any, index: number) => (
            <TabContent
              item={item}
              parentIndex={parentIndex}
              index={index}
              menuPosition={menuPosition}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TabContent = ({
  item,
  parentIndex,
  menuPosition,
  index,
  activeTab,
  updateActiveTab,
}: any) => {
  useEffect(() => {
    const contentTabs = document.querySelectorAll(
      `.content-anchored-inner-tab-observed`,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // @ts-ignore
            updateActiveTab(entry.target.dataset.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    contentTabs.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  return (
    <div
      key={`content-${item.id}-anchored-inner-tabs`}
      data-id={item.id}
      id={`content-${slugify(item.headline)}-anchored-inner-tabs`}
      className={cn(
        `content-anchored-inner-tabs-${parentIndex} ${activeTab} content-anchored-inner-tab-observed`,
        "relative flex flex-col transition-transform duration-300 lg:grid lg:grid-cols-2 h-[513px]",
      )}
      style={{
        direction:
          menuPosition === AnchoredSectionMenuPositions.RIGHT
            ? "rtl"
            : "initial",
      }}
    >
      <div
        className={cn(
          "relative aspect-square flex-1 shrink-0 bg-background px-[18px] py-[44px] xs:aspect-auto sm:px-[51px] sm:py-[44px] sm:pb-[36px] lg:h-[511px]",
        )}
        style={{
          direction:
            menuPosition === AnchoredSectionMenuPositions.RIGHT
              ? "ltr"
              : "initial",
        }}
      >
        <div className="mx-auto flex size-full max-w-[287px] flex-1 flex-col gap-[108px]">
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
};

export default AnchoredSectionsInnerTabsDesktopView;
