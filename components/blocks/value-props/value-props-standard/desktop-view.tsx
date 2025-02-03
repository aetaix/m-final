"use client";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { BackgroundType } from "@/constants/enum";
import { cn, slugify } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import { useEffect, useState } from "react";
import ValuePropsStandardTabButton from "./value-props-standard-tab-button";

function DesktopView({ items, activeIcon }: { items: any; activeIcon: Icon }) {
  const [activeTab, setActiveTab] = useState(items[0].id);

  const updateActiveTab = (itemId: string) => {
    setActiveTab(itemId);
  };

  useEffect(() => {
    const contentTabs = document.querySelectorAll(
      `.content-standard-tab-observed`,
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
    <div className="hidden lg:flow-root">
      <div className="relative overflow-y-hidden">
        <div className="flex scroll-smooth">
          <div className="flex !h-fit shrink-0 flex-col divide-y divide-mistral-black border border-mistral-black sm:w-64">
            {items.map((item: any) => (
              <ValuePropsStandardTabButton
                key={`title-${item?.id}-standard`}
                item={item}
                activeButton={activeTab}
                updateActiveTab={updateActiveTab}
                activeIcon={activeIcon}
              />
            ))}
          </div>
          <div
            id={`section-standard-content`}
            className="no-scrollbar flex flex-1 flex-col gap-y-3xl overflow-y-scroll border-b-[0.5px] border-[#f5edd3] md:h-[475px]"
          >
            {items.map((item: any, index: number) => (
              <div
                key={`content-${item.id}-standard`}
                data-id={item.id}
                id={`content-${slugify(item.headline)}-standard`}
                className={`content-standard-tab-observed grid grid-cols-2 md:h-[475px]`}
              >
                <div className="bg-grid-thickness bg-grid-pattern relative aspect-square flex-1 shrink-0 bg-transparent bg-grid-size-[51px_51px] bg-grid-[#f5edd3] xs:aspect-auto lg:aspect-square">
                  <div className="flex size-full flex-1 flex-col items-start justify-between gap-[17px] border-b border-r border-secondary px-[18px] py-[44px] sm:px-[51px] sm:py-[44px] sm:pb-[36px]">
                    <div
                      className="max-w-[351px] text-[20px]/[24px] xs:text-[24px]/[32px]"
                      dangerouslySetInnerHTML={{
                        __html: item.subheadline || "",
                      }}
                    ></div>
                    {item.button_group?.buttons?.map(
                      (btn: any, index: number) => (
                        <ButtonLink key={btn?.label + index} button={btn}>
                          <CButton
                            className="h-[44px] min-w-full justify-between"
                            label={btn?.label}
                            icon={btn.icon[0]?.icons_id}
                            iconClassName="text-primary"
                            btn={btn}
                          />
                        </ButtonLink>
                      ),
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "relative flex size-full border flex-1 shrink-0 items-center justify-center aspect-square translate-x-[-1px]",
                    { "p-4 md:p-8": item?.image_padding },
                  )}
                  style={{
                    backgroundColor: item?.background_color
                      ? item?.background_color.value
                      : "#FFFAEB",
                  }}
                >
                  <div className="relative z-10 size-full">
                    {item?.image && (
                      <DirectusImageClient
                        blur
                        key={index}
                        fill
                        className="aspect-square object-contain"
                        asset={item.image}
                      />
                    )}
                  </div>
                  {item?.background_type === BackgroundType.IMAGE &&
                  item?.background_image ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="relative size-full">
                        <DirectusImageClient
                          asset={item?.background_image}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
