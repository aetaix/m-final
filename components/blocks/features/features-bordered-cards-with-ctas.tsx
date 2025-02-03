import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

interface FeaturesIconsAboveProps {
  data: {
    id: number;
  };
  locale: string;
}

const fetchFeaturesBorderedCardsWithCtasData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_BORDERED_CARDS_WITH_CTAS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          items: [
            "block_grid_inner_border_items_id",
            {
              block_grid_inner_border_items_id: [
                "*",
                {
                  translations: ["*"],
                  icon: ["*"],
                  buttons: [
                    "buttons",
                    {
                      buttons: [
                        "*",
                        {
                          translations: ["*"],
                          page: ["permalink"],
                          post: ["slug"],
                          icon: ["icons_id", { icons_id: ["*"] }],
                        },
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

export default async function FeaturesBorderedCardsWithCtas({
  data: { id },
  locale,
}: FeaturesIconsAboveProps) {
  const data = await fetchFeaturesBorderedCardsWithCtasData(id, locale);
  if (!data) return;
  const { items, items_per_row, headline } = data;

  // Responsive Grid
  const gridClasses = cn(
    "grid gap-xl",
    "grid-cols-1",
    items_per_row >= 2 && "sm:grid-cols-2",
    items_per_row >= 3 && "lg:grid-cols-3",
    items_per_row >= 4 && "xl:grid-cols-4",
  );
  const mappedItems = items.flatMap(
    ({ block_grid_inner_border_items_id }: any) =>
      block_grid_inner_border_items_id,
  );
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className={`container flex flex-col gap-y-[60px] md:gap-y-3xl `}
    >
      {headline && (
        <h3
          className="no-img-margin inline-image-size-1 heading-3"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
      )}
      <div className={cn(gridClasses)}>
        {mappedItems.map((item: any) => (
          <SimpleIconsWithCTAItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

const SimpleIconsWithCTAItem = async ({
  data: {
    icon,
    headline,
    buttons: { buttons },
  },
}: {
  data: any;
}) => {
  return (
    <div className="relative flex min-h-[250px] w-full flex-col justify-between border border-[#ECDAA2] bg-background p-[35px]">
      <div className="relative flex size-xl items-center justify-center">
        <DirectusImage
          fill
          className="flex size-xl items-center justify-center object-contain text-[#FF8205]"
          asset={icon}
        />
      </div>
      <div className="flex flex-col gap-y-xl">
        {headline && (
          <div
            className="max-w-max text-xl text-[#171616] md:text-[20px]/[27px]"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {buttons?.length && (
          <div className="flex gap-x-xl">
            {buttons.map((button: any) => (
              <ButtonLink button={button}>
                <CButton
                  className="max-w-min text-sm text-[#171616]"
                  iconClassName="text-primary"
                  btn={button}
                />
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
