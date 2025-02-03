"use client";
import { scrollToElementWithOffset, slugify } from "@/lib/utils";
import React from "react";
import DirectusImageClient from "./shared/directus-image-client";
import { AnchoredSectionMenuPositions } from "@/constants/enum";

const FeaturesInAnchoredSectionsInnerTabButton = ({
  item,
  activeButton,
  activeIcon,
  parentIndex,
  menuPosition,
  updateActiveTab,
}: {
  item: any;
  activeButton: boolean;
  activeIcon: any;
  parentIndex: number;
  menuPosition: AnchoredSectionMenuPositions;
  updateActiveTab: any;
}) => {
  function scrollTo() {
    updateActiveTab(item.id);
    const tabContentWrapper = document.querySelector(
      `#section-tab-content-${parentIndex}`,
    );
    scrollToElementWithOffset(tabContentWrapper, 190);
    const childElement = document.querySelector(
      `#content-${slugify(item.headline)}-anchored-inner-tabs`,
    );
    if (!childElement) return;
    if (!tabContentWrapper) return;

    // @ts-ignore
    tabContentWrapper.scrollTo({
      // @ts-ignore
      top: childElement?.offsetTop - tabContentWrapper.offsetTop,
      behavior: "instant",
    });
  }
  return (
    <button
      onClick={scrollTo}
      key={`title-${item?.id}-anchored-inner-tabs`}
      className={`flex ${String(activeButton) === String(item.id) ? "bg-mistral-black text-white" : "bg-background text-mistral-black"} ${
        menuPosition === AnchoredSectionMenuPositions.RIGHT
          ? "flex-row-reverse"
          : "flex-row"
      } group relative min-h-[49px] items-center px-3 transition-[color]`}
    >
      <div
        className="max-w-[249px] text-left text-sm"
        dangerouslySetInnerHTML={{
          __html: item.headline || "",
        }}
      ></div>
      <DirectusImageClient
        asset={activeIcon}
        width={20}
        height={20}
        className={`${
          menuPosition === AnchoredSectionMenuPositions.RIGHT
            ? "left-[10px] rotate-180"
            : "right-[10px]"
        } absolute ${String(activeButton) === String(item.id) ? "opacity-100" : "opacity-0"} top-1/2 size-5 shrink-0 -translate-y-1/2 text-primary transition-opacity`}
      />
    </button>
  );
};

export default FeaturesInAnchoredSectionsInnerTabButton;
