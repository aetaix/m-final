import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_BULLETS_VERTICAL_TABS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          active_icon: ["*"],
          bullet_icon: ["*"],
          items: [
            "block_bullets_vertical_tabs_items_id",
            {
              block_bullets_vertical_tabs_items_id: [
                "*",
                {
                  translations: ["*"],
                  bullets: [
                    "block_bullets_vertical_tabs_items_bullets_id",
                    {
                      block_bullets_vertical_tabs_items_bullets_id: [
                        "*",
                        { translations: ["*"] },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FeaturesVerticalBulletsTabs({
  data: { id },
  locale,
}: any) {
  const data = await fetchData(id, locale);
  if (!data) return;
  const mappedItems = data.items.flatMap(
    ({ block_bullets_vertical_tabs_items_id }: any) =>
      block_bullets_vertical_tabs_items_id,
  );
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col gap-y-3xl"
    >
      {data.headline && (
        <div
          className="heading-3 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
        />
      )}
      <DesktopView
        items={mappedItems}
        activeIcon={data?.active_icon}
        bulletIcon={data?.bullet_icon}
      />
      <MobileView
        items={mappedItems}
        activeIcon={data?.active_icon}
        bulletIcon={data?.bullet_icon}
      />
    </div>
  );
}
