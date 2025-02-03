import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const rightBandColors = ["#FFD800", "#FFAF00", "#FF8205", "#FA500F", "#E10500"];

const fetchBulletsCardsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_BULLETS_CARDS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          bullets_icon: ["*"],
          cards: [
            "block_bullets_cards_item_id",
            {
              block_bullets_cards_item_id: [
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
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function BulletsCards({ data: { id }, locale }: any) {
  const data = await fetchBulletsCardsData(id, locale);
  if (!data) return;
  const mappedCards = data?.cards?.flatMap(
    ({ block_bullets_cards_item_id }: any) => block_bullets_cards_item_id,
  );
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container grid grid-cols-1 gap-[25px] md:grid-cols-2"
    >
      {mappedCards?.map((card: any) => (
        <div className="relative bg-[#FFF0C3] px-xl py-[56px] md:px-10">
          <div className="absolute inset-0 grid h-full w-[9px] grid-flow-row">
            {rightBandColors.map((color) => (
              <div className="w-full" style={{ background: color }} />
            ))}
          </div>
          <div className="flex size-full flex-col gap-y-3xl">
            {card?.title && (
              <div
                className="text-sm text-[#818181]"
                dangerouslySetInnerHTML={{ __html: card.title || "" }}
              />
            )}
            <div
              className="text-xl md:text-[20px]/[27px]"
              dangerouslySetInnerHTML={{ __html: card.body || "" }}
            />
            <div className="flex flex-1 shrink-0 flex-col justify-end divide-y divide-[#ECDAA2]">
              {card.bullets.map((bullet: any) => (
                <CardBullet
                  data={bullet?.block_bullets_cards_item_bullets_id}
                  icon={data?.bullets_icon}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardBullet({ data, icon }: any) {
  if (!data?.content) return;
  return (
    <div className="flex items-start gap-x-xl py-xl">
      <div className="relative flex size-xl items-center justify-center">
        <DirectusImage
          fill
          className="relative flex size-xl items-center justify-center"
          asset={icon}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
}
