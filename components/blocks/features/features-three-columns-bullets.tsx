import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchFeaturesThreeColumnsBulletsData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_THREE_COLUMNS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          bullets: [
            "block_bullets_cards_item_bullets_id",
            {
              block_bullets_cards_item_bullets_id: [
                "*",
                { translations: ["*"] },
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

export default async function FeaturesThreeColumnsBullets({
  data: { id },
  locale,
}: any) {
  const data = await fetchFeaturesThreeColumnsBulletsData(id, locale);
  if (!data) return;

  const mappedBullets = data.bullets.map(
    ({ block_bullets_cards_item_bullets_id }: any) =>
      block_bullets_cards_item_bullets_id,
  );
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="relative w-svw overflow-hidden border-[#ECDAA2]/[.5] md:container sm:border-b md:border-r xl:border-t-0"
    >
      {data?.desktop_background && (
        <DirectusImage
          fill
          className="z-[-1] hidden object-cover sm:flow-root"
          asset={data?.desktop_background}
        />
      )}
      {data?.mobile_background && (
        <DirectusImage
          fill
          className="z-[-1] overflow-visible object-fill object-top sm:hidden"
          asset={data?.mobile_background}
        />
      )}
      <div className="pb-[170px] pt-[60px] md:pb-[60px]">
        <div className="mx-auto max-w-min space-y-3xl">
          <div
            className="heading-3 text-center"
            dangerouslySetInnerHTML={{ __html: data.headline || "" }}
          />
          <div className="flex flex-col items-center gap-y-[21px]">
            {mappedBullets.map((item: any) => (
              <div
                className="min-w-max bg-[#FFF0C3] px-xl py-md text-[20px]/[24px] md:text-[24px]/[32px]"
                dangerouslySetInnerHTML={{ __html: item.content || "" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
