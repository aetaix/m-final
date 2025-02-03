import { BlockFeaturesAlternatingSidesItem } from "@/types/directus-schema";
import FeaturesTwoColumnsListItem from "./features-two-columns-list-item";
import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_ALTERNATING_SIDES, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            {
              button: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["*", { icons_id: ["*"] }],
                },
              ],
              items: [
                "*",
                {
                  rich_text_id: ["*", { icon: ["*"], translations: ["*"] }],
                },
              ],
              translations: ["*"],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const FeaturesTwoColumnsList = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col gap-10"
    >
      {data?.headline || data?.subheadline ? (
        <div className="flex flex-col gap-8">
          {data?.headline ? (
            <h3
              className="font-normal! no-img-margin heading-3 max-w-2xl text-4xl md:text-5xl"
              dangerouslySetInnerHTML={{ __html: data.headline }}
            ></h3>
          ) : null}
          {data?.subheadline ? (
            <div
              dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
              className="max-w-5xl text-base"
            ></div>
          ) : null}
        </div>
      ) : null}
      <div className="bg-grid-secondary bg-grid-pattern flex flex-col gap-y-36 border-b border-r border-secondary pb-[102px] pt-[51px] sm:gap-y-20 lg:pt-[60px]">
        {data.items.map(
          (item: BlockFeaturesAlternatingSidesItem, index: number) => (
            <FeaturesTwoColumnsListItem item={item} key={index} />
          ),
        )}
      </div>
    </div>
  );
};

export default FeaturesTwoColumnsList;
