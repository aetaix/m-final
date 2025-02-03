// lib/fetchData.ts
import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";

export const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PRICING, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            {
              pricing_id: [
                "*",
                {
                  buttons: [
                    "*",
                    {
                      buttons: [
                        "*",
                        {
                          icon: ["icons_id", { icons_id: ["*"] }],
                          page: ["permalink"],
                          post: ["slug"],
                          translations: ["*"],
                        },
                      ],
                    },
                  ],
                  features: [
                    "*",
                    {
                      pricing_item_id: [
                        "*",
                        { icon: ["*"], translations: ["*"] },
                      ],
                    },
                  ],
                  price: ["*"],
                  prices: ["amount", "currency", "frequency"],
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
