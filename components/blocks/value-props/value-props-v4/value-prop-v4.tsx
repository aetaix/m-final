"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackgroundType } from "@/constants/enum";
import React from "react";
import TextMarquee from "../value-props-v2/text-marquee";
import DirectusImageClient from "@/components/shared/directus-image-client";

const ValuePropsV4Component = ({ data }: { data: any }) => {
  const [selectedTab, setSelectedTab] = React.useState(data.items[0].name);

  const changeSelectedTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="flex flex-col gap-8 md:gap-20"
    >
      <div className="mt-14 lg:mt-10">
        {data?.headline.length ? (
          <TextMarquee headline={data?.headline} />
        ) : null}
      </div>
      <div className="container w-full">
        <Tabs
          defaultValue={data.items[0].name}
          onValueChange={changeSelectedTab}
          className="flex flex-col lg:flex-row lg:items-center"
        >
          <TabsList className="no-scrollbar z-10 m-0 mr-[-20px] inline-flex h-fit flex-nowrap justify-start divide-x divide-mistral-black overflow-x-auto p-0 lg:ml-0 lg:mr-[-110px] lg:flex-col lg:justify-start lg:divide-y">
            {data.items.map((card: any) => (
              <TabsTrigger
                key={card.name}
                className="w-fit data-[state=active]:shadow-none"
                value={card.name}
                asChild
              >
                <button className="value-prop-v4-button group flex items-center justify-between gap-x-20 text-nowrap border border-mistral-black px-4 py-3 text-left first:translate-y-0 data-[state=active]:bg-mistral-black data-[state=active]:text-secondary data-[state=active]:shadow-none lg:w-52">
                  <h2
                    dangerouslySetInnerHTML={{ __html: card.headline || "" }}
                  ></h2>
                  {selectedTab === card?.name && card?.icon && (
                    <div className="relative size-[20px]">
                      <DirectusImageClient fill asset={card?.icon?.image} />
                    </div>
                  )}
                </button>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative m-0 flex-1">
            <div
              style={{
                backgroundColor: data?.background_color
                  ? data?.background_color.value
                  : "#00000020",
              }}
              className="absolute inset-0 -z-20"
            >
              {data?.background_type === BackgroundType.IMAGE &&
              data?.background_image ? (
                <DirectusImageClient
                  fill
                  className="size-full object-cover"
                  asset={data?.background_image}
                />
              ) : null}
            </div>
            {data.items.map((card: any) => (
              <TabsContent
                key={card.name}
                className="m-0 flex items-center justify-center p-0"
                value={card.name}
              >
                <div className="mx-auto grid w-full gap-x-16 gap-y-8 overflow-hidden px-4 py-12 lg:py-10 lg:pl-52 lg:pr-20 xl:h-[600px] xl:grid-cols-2">
                  <div
                    className="flex max-w-80 items-center justify-center font-arial text-[18px]/[21.6px] text-white lg:text-[24px]/[27px]"
                    dangerouslySetInnerHTML={{
                      __html: card.subheadline || "",
                    }}
                  ></div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* PROMPT */}
                    <div className="flex w-full gap-5 rounded-[12px] bg-background p-5 text-sm text-mistral-black">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex aspect-square size-7 items-center justify-center bg-mistral-black text-base text-white">
                          U
                        </div>
                        <div className="flex-1 border-r-[0.5px] border-mistral-black"></div>
                      </div>
                      <div className="flex flex-col gap-3 text-sm">
                        {card.prompt}
                        <span className="text-mistral-black opacity-50">
                          {card.answer_time}
                        </span>
                      </div>
                    </div>
                    {/* ANSWER */}
                    {card.answer ? (
                      <div className="flex w-full gap-[20px] rounded-[12px] bg-background p-5 text-sm text-mistral-black">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex aspect-square size-7 items-center justify-center bg-primary text-base text-white">
                            {data?.background_image &&
                            card?.answer_icon?.image_dark_mode ? (
                              <DirectusImageClient
                                width={16}
                                height={16}
                                className="aspect-square object-contain"
                                asset={card?.answer_icon?.image_dark_mode}
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 border-r-[0.5px] border-mistral-black"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div
                            className="wysiwyg-formatting text-sm"
                            dangerouslySetInnerHTML={{
                              __html: card.answer || "",
                            }}
                          ></div>
                          <span className="text-xs text-mistral-black opacity-50">
                            {card?.answer_time}
                          </span>
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
    </div>
  );
};

export default ValuePropsV4Component;
