import React from "react";
import ValuePropsV4Component from "./value-prop-v4";
import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_V4, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          background_color: ["*"],
          items: [
            "*",
            {
              answer_icon: ["*"],
              icon: ["*"],
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

const ValuePropsV4 = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  return <ValuePropsV4Component data={data} />;
};

export default ValuePropsV4;
