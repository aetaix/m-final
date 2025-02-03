"use client";
import React from "react";
import FeaturesInAnchoredSectionsInnerTabsDesktopView from "./features-in-anchored-sections-inner-tabs-desktop-view-v2";
import FeaturesInAnchoredSectionsInnerTabsMobileView from "./features-in-anchored-sections-inner-tabs-mobile-view";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { asyncScrollToElement, cn } from "@/lib/utils";
import { ScreenType } from "@/constants/enum";

const FeaturesInAnchoredSectionsTabs = ({
  tabs,
  activeIcon,
}: {
  tabs: any[];
  activeIcon: any;
}) => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]?.name);

  // set the selected tab based on viewport with useEffect
  React.useEffect(() => {
    const handleScroll = () => {
      tabs.forEach((tab) => {
        const element = document.getElementById(`section-${tab.name}-desktop`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top - 200 <= 0 && rect.bottom > 0) {
            setSelectedTab(tab.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);
  React.useEffect(() => {
    const handleScroll = () => {
      tabs.forEach((tab) => {
        const element = document.getElementById(`section-${tab.name}-mobile`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top - 200 <= 0 && rect.bottom > 0) {
            setSelectedTab(tab.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);

  async function scrollToSection(sectionName: string, screen: ScreenType) {
    if (screen === ScreenType.MOBILE) {
      const element = document.getElementById(`section-${sectionName}-mobile`);
      asyncScrollToElement(element);
    }
    const element = document.getElementById(`section-${sectionName}-desktop`);
    asyncScrollToElement(element);
  }

  return (
    <>
      {/* TAB FOR DESKTOP */}
      <div className="no-scrollbar sticky top-[80px] z-30 hidden w-full overflow-x-scroll bg-background px-5 pb-4 md:flex md:justify-center lg:top-[123px]">
        {tabs.map((card: any) => (
          <button
            key={card.name}
            onClick={() => {
              scrollToSection(card.name, ScreenType.DESKTOP);
            }}
            className={cn(
              "anchored-tabs-section-btn flex h-[49px] transition-colors flex-row items-center justify-between gap-x-10 text-nowrap border-y border-mistral-black px-4 py-0 text-left ",
              selectedTab === card.name
                ? "bg-mistral-black text-primary-foreground"
                : "bg-background",
            )}
          >
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: card?.title || "" }}
            ></div>
            {selectedTab === card.name && card.icon && (
              <div className="relative size-4">
                <DirectusImageClient
                  fill
                  className="shrink-0 origin-center object-contain"
                  asset={card.icon}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="no-scrollbar sticky top-[80px] z-30 flex w-full overflow-x-scroll bg-background px-5 pb-4 md:hidden md:justify-center lg:top-[123px]">
        {tabs.map((card: any) => (
          <button
            key={card.name}
            onClick={() => {
              scrollToSection(card.name, ScreenType.MOBILE);
            }}
            className={cn(
              "anchored-tabs-section-btn flex h-[49px] transition-colors flex-row items-center justify-between gap-x-10 text-nowrap border-y border-mistral-black px-4 py-0 text-left ",
              selectedTab === card.name
                ? "bg-mistral-black text-primary-foreground"
                : "bg-background",
            )}
          >
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: card?.title || "" }}
            ></div>
            {selectedTab === card.name && card.icon && (
              <div className="relative size-4">
                <DirectusImageClient
                  fill
                  className="shrink-0 origin-center object-contain"
                  asset={card.icon}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="md:hidden">
        {tabs.map((card: any, idx: number) => (
          <div
            className={cn(
              "relative",
              idx === 0
                ? "anchored-tabs-section-background border-b border-[#ECDAA150] mb-6"
                : "",
            )}
          >
            <div
              id={`section-${card.name}-mobile`}
              className="container m-0 mx-auto w-full scroll-m-32 pb-[62px] pt-11 md:pb-[76px]"
            >
              <h3
                className="mb-[17px] max-w-[607px] text-[30px]/[34.5px] md:mb-2xl-2 md:text-[48px]/[45.6px]"
                dangerouslySetInnerHTML={{
                  __html: card.headline || "",
                }}
              ></h3>
              {card.subheadline?.length ? (
                <p
                  className="mb-16 max-w-[607px]"
                  dangerouslySetInnerHTML={{
                    __html: card.subheadline || "",
                  }}
                ></p>
              ) : null}
              <FeaturesInAnchoredSectionsInnerTabsMobileView
                data={card}
                activeIcon={activeIcon}
              />
            </div>
          </div>
        ))}
      </div>

      {tabs.map((card: any, idx: number) => (
        <div
          key={card.name + idx}
          id={`section-${card.name}-desktop`}
          className="hidden w-full md:block"
        >
          <div className="relative">
            <div
              className={
                card.subheadline?.length
                  ? "bg-grid-pattern absolute top-[213px] -z-10 size-full bg-grid-size-[50px_50px] bg-grid-[#ECDAA150] md:top-0"
                  : "bg-grid-pattern absolute top-[143px] -z-10 size-full bg-grid-size-[50px_50px] bg-grid-[#ECDAA150] md:top-0"
              }
            ></div>
            <div className="container m-0 mx-auto w-full py-24">
              <h3
                className="mb-[17px] max-w-[607px] text-[30px]/[34.5px] md:mb-2xl-2 md:text-[48px]/[45.6px]"
                dangerouslySetInnerHTML={{
                  __html: card.headline || "",
                }}
              ></h3>
              {card.subheadline?.length ? (
                <p
                  className="mb-16 max-w-[607px]"
                  dangerouslySetInnerHTML={{
                    __html: card.subheadline || "",
                  }}
                ></p>
              ) : null}
              <FeaturesInAnchoredSectionsInnerTabsDesktopView
                parentIndex={idx}
                cardName={card?.name}
                items={card?.items}
                menuPosition={card?.menu_position}
                activeIcon={activeIcon}
              />
              {/* TODO: Remove when Mistrl validates the mobile view */}
              {/* <FeaturesInAnchoredSectionsInnerTabsMobileView
                data={card}
                activeIcon={activeIcon}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturesInAnchoredSectionsTabs;
