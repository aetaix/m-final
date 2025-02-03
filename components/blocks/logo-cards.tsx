import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import DirectusImage from "../shared/directus-image";

const fetchLogoCardsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_LOGO_CARDS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          cards: ["*", { block_image_id: ["*", { translations: ["*"] }] }],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function LogoCards({ data: { id }, locale }: any) {
  const data = await fetchLogoCardsData(id, locale);
  if (!data) return;
  return (
    <div
      id={data?.anchor || ""}
      className="container flex flex-col gap-2xl xl:grid xl:grid-cols-4 xl:gap-xl"
    >
      <div
        className="text-2xl max-w-[294px] md:text-2xl-md"
        dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
      />
      <div className="grid grid-cols-2 gap-xl xl:col-span-3 xl:grid-cols-3">
        {data?.cards?.map((card: any) => (
          <div
            id={card.id}
            className="relative flex min-h-[163px] min-w-[163px] cursor-pointer items-center justify-center border-[0.5px] border-[#ECDAA2] hover:border-0 hover:bg-[#FFF0C3] xl:h-[217px] xl:w-[294px]"
          >
            <DirectusImage
              height={163}
              width={163}
              sizes="(max-width: 768px) 294px, 217px"
              asset={card?.block_image_id}
              className="h-3/5 w-auto max-w-[72%] object-contain p-xl xl:p-0 xl:py-9"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
