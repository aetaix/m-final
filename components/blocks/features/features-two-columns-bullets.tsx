import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchFeaturesTwoColumnsBulletsData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_TWO_COLUMNS_BULLETS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          bullet_icon: ["*"],
          bullets: [
            "block_two_column_bullets_items_id",
            {
              block_two_column_bullets_items_id: ["*", { translations: ["*"] }],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FeaturesTwoColumnsBullets({
  data: { id },
  locale,
}: any) {
  const data = await fetchFeaturesTwoColumnsBulletsData(id, locale);
  if (!data) return;
  const mappedBullets = data.bullets.map(
    ({ block_two_column_bullets_items_id }: any) =>
      block_two_column_bullets_items_id,
  );
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container">
      <div className="bg-grid-pattern flex size-full flex-col gap-x-4 gap-y-[89px] border-b border-r border-[#ECDAA2]/[0.5] pt-[61px] bg-grid-size-[49px] bg-grid-[#ECDAA2]/[0.5] md:grid md:grid-cols-12 md:pt-0">
        <div className="mx-auto px-md md:order-2 md:col-span-5 md:py-4xl">
          <div className="mx-auto min-w-[71%] space-y-3xl">
            <div
              className="heading-3"
              dangerouslySetInnerHTML={{ __html: data.headline || "" }}
            />
            <div dangerouslySetInnerHTML={{ __html: data.subheadline || "" }} />
            <div className="flex flex-col gap-y-[10px]">
              {mappedBullets.map((item: any) => (
                <div className="flex max-w-max items-center gap-2xl-2 bg-[#FFF0C3] p-md">
                  <div
                    className="text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: item.content || "" }}
                  />
                  <div className="relative flex size-xl items-center justify-center text-primary">
                    <DirectusImage
                      asset={data?.bullet_icon}
                      fill
                      className="relative flex size-xl items-center justify-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative size-full h-[283px] md:col-span-6 md:h-full lg:max-w-[625px] xl:col-span-7">
          <DirectusImage fill className=" object-cover" asset={data?.image} />
        </div>
      </div>
    </div>
  );
}
