"use client";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { scrollToElementWithOffset, slugify } from "@/lib/utils";
import React from "react";

const ValuePropsStandardTabButton = ({
  item,
  activeButton,
  activeIcon,
  updateActiveTab,
}: {
  item: any;
  activeButton: boolean;
  activeIcon: any;
  updateActiveTab: any;
}) => {
  function scrollTo() {
    updateActiveTab(item.id);
    const tabContentWrapper = document.querySelector(
      `#section-standard-content`,
    );

    scrollToElementWithOffset(tabContentWrapper, 123);

    const childElement = document.querySelector(
      `#content-${slugify(item.headline)}-standard`,
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
      key={`title-${item?.id}-standard`}
      className={`${String(activeButton) === String(item.id) ? "bg-mistral-black text-white" : "bg-background text-mistral-black"} group relative flex min-h-[49px] items-center pl-5 transition-[color]`}
    >
      <div
        className="max-w-[199px] text-left text-sm"
        dangerouslySetInnerHTML={{
          __html: item.headline || "",
        }}
      ></div>
      <DirectusImageClient
        asset={activeIcon}
        className={`${String(activeButton) === String(item.id) ? "opacity-100" : "opacity-0"} title-icon-standard absolute right-5 top-1/2 size-5 shrink-0 -translate-y-1/2 text-primary transition-[color]`}
        width={20}
        height={20}
      />
    </button>
  );
};

export default ValuePropsStandardTabButton;
