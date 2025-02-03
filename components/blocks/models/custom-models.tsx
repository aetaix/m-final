/* eslint-disable tailwindcss/classnames-order */
"use client";

import { useState } from "react";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { directusAssets } from "@/lib/image";
import { CustomizationSectionProps } from "./types";
import TextMarquee from "../value-props/value-props-v2/text-marquee";

export default function CustomModels({ data }: CustomizationSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(data.items[0]?.id || 0);
  const activeTabContent = data.items.find((item) => item.id === activeTab);
  const { anchor } = data;

  return (
    <section id={anchor || ""} className="custom-models -mt-2xl md:mt-0">
      {data.heading && <TextMarquee headline={data.heading} />}
      <div className="container">
        {/* Heading and Subheading */}
        <div
          className="mb-20 md:text-center text-base/[19.6px] font-normal max-w-[573px] mx-auto"
          dangerouslySetInnerHTML={{ __html: data.subheading }}
        />

        {/* Tab Content */}
        {activeTabContent && (
          <div className="bg-grid-secondary relative bg-grid-size-md bg-grid-pattern grid grid-cols-1 items-center px-4 xl:px-[150px] pb-[77px] pt-[73px] lg:grid-cols-2">
            {/* Tabs */}
            <div className="flex justify-center w-full md:w-[612px] -top-10 left-1/2 -translate-x-1/2 absolute">
              {data.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex gap-10 flex-1 whitespace-nowrap items-center justify-between px-4 py-2 text-sm font-medium ${
                    activeTab === item.id
                      ? "bg-black text-white"
                      : "bg-transparent text-black"
                  } border border-black`}
                >
                  {item.name}
                  <DirectusImageClient
                    className={`object-cover min-w-4 ${!(activeTab === item.id) && "hidden"}`}
                    height={11}
                    width={16}
                    asset={item.tab?.icon[0]?.icons_id}
                  />
                </button>
              ))}
            </div>

            {/* Text Content */}
            <div>
              <h2 className="mb-[35px] md:mb-[38px] max-w-[410px] text-[24px]/[27.6px] md:text-[32px]/[36.8px] font-normal text-foreground">
                {activeTabContent?.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: activeTabContent?.description,
                }}
                className="mb-[35px] md:mb-11 max-w-[410px] text-base/[19.6px] font-normal text-foreground"
              />
              {activeTabContent?.button && (
                <ButtonLink
                  className="inline-block"
                  button={activeTabContent.button}
                >
                  <CButton
                    className="!p-0 text-[16px]/[13.6px]"
                    label={activeTabContent.button.label}
                    icon={activeTabContent.button?.icon[0]?.icons_id}
                    btn={activeTabContent.button}
                  />
                </ButtonLink>
              )}
            </div>

            {/* Image Content */}
            {activeTabContent?.image && (
              <div className="mt-[82px] md:mt-0">
                <img
                  src={directusAssets(activeTabContent.image?.id)}
                  alt={activeTabContent.image?.title}
                  className="w-full object-contain"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
