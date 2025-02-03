import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

const fetchFeaturesTwoCardsWithIconsData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_TWO_CARDS_WITH_ICONS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          items: [
            "*",
            {
              translations: ["*"],
              button: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["icons_id", { icons_id: ["*"] }],
                },
              ],
              icon: ["*", { image: ["*"] }],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FeaturesTwoCardsWithIcons({
  data: { id },
  locale,
}: any) {
  const data = await fetchFeaturesTwoCardsWithIconsData(id, locale);
  if (!data) return;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col gap-y-2xl md:gap-y-3xl"
    >
      <div className="mx-auto flex max-w-[825px] flex-col gap-y-xl md:gap-y-[46px]">
        {data?.headline && (
          <h3
            className="heading-3 text-center"
            dangerouslySetInnerHTML={{ __html: data.headline || "" }}
          />
        )}
        {data?.subheadline && (
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
          />
        )}
      </div>
      <div
        className={cn("grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-xl")}
      >
        {data?.items?.map((card: any) => <Card key={card.id} data={card} />)}
      </div>
    </div>
  );
}

async function Card({ data: { headline, body, icon, button } }: { data: any }) {
  return (
    <div className="flex w-full flex-col gap-y-2xl border border-[#ECDAA2] p-xl px-[20px] md:gap-y-3xl md:p-[56px]">
      <div className="flex aspect-square size-4xl items-center justify-center bg-[#FF8205]">
        {icon && (
          <div className="relative flex aspect-square size-2xl items-center justify-center text-background">
            <DirectusImage
              variant="dark"
              asset={icon?.image?.id}
              fill
              className="flex aspect-square size-2xl items-center justify-center object-contain"
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-y-xl">
        {headline && (
          <span
            className="subtitle max-w-max"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
      </div>
      {button && (
        <ButtonLink button={button}>
          <CButton
            btn={button}
            className="text-[#3C3C3C]"
            iconClassName="text-primary"
          />
        </ButtonLink>
      )}
    </div>
  );
}
