import React from "react";
import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";
import ValuePropsV3Component from "./value-prop-v3";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_V3, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          propositions: [
            "*",
            {
              options: [
                "*",
                {
                  icon: ["*", { icons_id: ["*"] }],
                  translations: ["*"],
                },
              ],
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

const ValuePropsV3 = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  return <ValuePropsV3Component data={data} />;
};

export default ValuePropsV3;
