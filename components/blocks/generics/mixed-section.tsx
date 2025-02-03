import PageBuilder from "@/components/page-builder";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchMixedSectionData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_MIXED_SECTION, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          tabs_active_icon: ["*"],
          blocks: [
            "collection",
            "item",
            {
              item: {
                block_logo_cards: ["id"],
              },
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function MixedSection({ data: { id }, locale }: any) {
  const data = await fetchMixedSectionData(id, locale);
  if (!data) return;
  return (
    <div
      id={data?.anchor || ""}
      className="mt-4xl flex flex-col gap-y-4xl md:mt-6xl md:gap-y-6xl"
    >
      <div className="container">
        <div
          className="heading-3 max-w-[500px] "
          dangerouslySetInnerHTML={{ __html: data.headline || "" }}
        />
      </div>
      <PageBuilder sections={data?.blocks} locale={locale} />
    </div>
  );
}
