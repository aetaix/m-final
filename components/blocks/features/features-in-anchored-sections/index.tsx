import React from "react";

import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";
import FeaturesInAnchoredSectionsTabsV2 from "./features-in-anchored-sections-tabs-v2";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_INPAGE_ANCHORED_SECTIONS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          active_icon: ["*"],
          tabs: [
            "*",
            "*",
            {
              icon: ["*"],
              items: [
                "*",
                "*",
                {
                  icon: ["*"],
                  action: [
                    "*",
                    "*",
                    {
                      translations: ["*"],
                      icon: ["icons_id", { icons_id: ["*"] }],
                    },
                  ],
                  translations: ["*"],
                },
              ],
              translations: ["*"],
            },
          ],
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const FeaturesInAnchoredSections = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  const { headline, subheadline, tabs, active_icon } = data;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="flex flex-col justify-center border-[var(--block-grid-color)] pt-20 lg:border-t-[1.5px] lg:pt-[80px]"
    >
      <div id="section-scroll-target"></div>

      <div className="container flex flex-col justify-center">
        <h2
          className="text-left text-[30px]/[34.5px] md:mx-auto md:text-center md:text-[48px]/[45.6px]"
          dangerouslySetInnerHTML={{ __html: headline || "" }}
        ></h2>
        <p
          className="mx-auto mb-7 mt-9 max-w-[824px] text-base md:text-center"
          dangerouslySetInnerHTML={{ __html: subheadline || "" }}
        ></p>
      </div>
      <FeaturesInAnchoredSectionsTabsV2 tabs={tabs} activeIcon={active_icon} />
    </div>
  );
};

export default FeaturesInAnchoredSections;
