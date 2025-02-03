"use client";
import { cn } from "@/lib/utils";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { BackgroundType } from "@/constants/enum";
import DirectusImageClient from "@/components/shared/directus-image-client";

const MobileView = ({ data }: { data: any }) => {
  const [selectedTab, setSelectedTab] = React.useState(data?.items[0]?.name);

  const changeSelectedTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div id={data?.section_id} className="block w-full pb-10 lg:hidden">
      <div className="mb-8 flex flex-col items-center justify-center gap-8 gap-x-10 text-center sm:mb-12">
        <h3
          className="font-normal! no-img-margin inline-image-size-1 heading-3 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: data.headline || "" }}
        ></h3>
        {data?.subheadline ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
            className="max-w-[642px] text-base text-[#3C3C3C]"
          ></div>
        ) : null}
      </div>

      <Tabs
        defaultValue={data?.items[0]?.name}
        onValueChange={changeSelectedTab}
        className="flex flex-col sm:flex-row"
      >
        <TabsList className="no-scrollbar m-0 mr-[-20px] flex h-fit shrink-0 flex-nowrap items-center justify-start divide-x divide-mistral-black overflow-x-auto border border-mistral-black p-0 sm:mr-0 sm:max-w-md sm:flex-col sm:justify-start sm:divide-x-0 sm:divide-y">
          {data.items.map((card: any) => (
            <TabsTrigger
              key={card.name}
              className="data-[state=active]:shadow-none"
              value={card.name}
              asChild
            >
              <button className="group flex min-h-[50px] w-fit flex-row items-center justify-between gap-x-8 px-5 py-0 text-left first:translate-y-0 data-[state=active]:bg-mistral-black data-[state=active]:text-secondary data-[state=active]:shadow-none sm:w-64">
                <div
                  className="sm:wrap-inner-p text-sm sm:max-w-[160px]"
                  dangerouslySetInnerHTML={{
                    __html: card.headline || "",
                  }}
                ></div>
                {selectedTab === card.name && data.active_icon && (
                  <>
                    <div
                      className="size-5 text-primary dark:hidden"
                      dangerouslySetInnerHTML={{
                        __html: data.active_icon.svg || "",
                      }}
                    ></div>
                    <div
                      className="hidden size-5 text-primary dark:block"
                      dangerouslySetInnerHTML={{
                        __html: data.active_icon.svg_dark || "",
                      }}
                    ></div>
                  </>
                )}
              </button>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="m-0 flex-1">
          {data.items.map((card: any) => (
            <TabsContent
              key={card.name}
              className="m-0 !block p-0 opacity-100 data-[state=inactive]:opacity-0"
              value={card.name}
            >
              <div className="relative flex flex-col overflow-hidden lg:grid lg:grid-cols-2">
                <div className="bg-grid-pattern absolute -z-20 size-full opacity-90 bg-grid-size-[46px_49.29px] bg-grid-[#f5edd3]"></div>
                <div
                  className={cn(
                    "relative flex-1 shrink-0 bg-transparent",
                    card.button_group?.buttons.length > 0
                      ? "aspect-square"
                      : "lg:aspect-square",
                  )}
                >
                  <div className="flex size-full flex-col items-start justify-between gap-[17px] border-b border-r border-secondary px-[18px] py-[44px] sm:px-[51px] sm:py-[44px] sm:pb-[51px]">
                    <div
                      className="max-w-[351px] text-[20px]/[24px] xs:text-[24px]/[32px]"
                      dangerouslySetInnerHTML={{
                        __html: card.subheadline || "",
                      }}
                    ></div>
                    {card.button_group?.buttons?.map(
                      (btn: any, index: number) => (
                        <ButtonLink key={btn.label + index} button={btn}>
                          <CButton
                            className="h-[44px] min-w-full justify-between px-3"
                            label={btn.label}
                            icon={btn.icon[0].icons_id}
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
                    "relative flex size-full flex-1 shrink-0 items-center justify-center aspect-square lg:aspect-auto",
                    { "p-4 md:p-8": card?.image_padding },
                  )}
                  style={{
                    backgroundColor: card?.background_color
                      ? card?.background_color.value
                      : "#FFFAEB",
                  }}
                >
                  {card?.image ? (
                    <div className="relative z-10 size-full">
                      <DirectusImageClient
                        asset={card?.image}
                        fill
                        className="size-full object-contain"
                      />
                    </div>
                  ) : null}
                  {card?.background_type === BackgroundType.IMAGE &&
                  card?.background_image ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="relative size-full">
                        <DirectusImageClient
                          asset={card?.background_image}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default MobileView;
