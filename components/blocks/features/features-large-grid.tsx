import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import { Button } from "../../ui/button";

type colsPerRow = 1 | 2 | 3 | 4 | 5 | 6;

const fetchFeaturesLargeGridData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_LARGE_GRID, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          button: [
            "*",
            {
              translations: ["*"],
              page: ["permalink"],
              post: ["slug"],
              icon: ["icons_id", { icons_id: ["*"] }],
            },
          ],
          translations: ["*"],
          items: [
            "*",
            {
              translations: ["*"],
              image: ["*"],
              button: [
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
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FeaturesLargeGrid({ data: { id }, locale }: any) {
  const data = await fetchFeaturesLargeGridData(id, locale);
  if (!data) return;
  const getGridCols = (cols: colsPerRow) => {
    const baseClass = "grid gap-xl";
    const responsiveColumns = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    };

    return `${baseClass} ${responsiveColumns[cols] || responsiveColumns[4]}`;
  };

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col gap-y-3xl"
    >
      <div className="flex flex-col gap-y-xl">
        {data?.headline && (
          <h3
            className="heading-3"
            dangerouslySetInnerHTML={{ __html: data.headline || "" }}
          />
        )}
        {data?.subheadline && (
          <div dangerouslySetInnerHTML={{ __html: data.subheadline || "" }} />
        )}
      </div>
      <div className={getGridCols(data.items_per_row)}>
        {data.items.map((card: any) => (
          <LargeGridCard key={card.id} data={card} />
        ))}
      </div>
      <div>
        <ButtonLink button={data.button} className="flex items-center gap-x-md">
          <CButton
            icon={data?.button?.icon[0]?.icons_id}
            label={data?.button?.label}
            btn={data?.button}
            variant="ghost"
            className="!h-[36px] items-center gap-x-[10px] border-b border-foreground p-3 px-0 text-sm hover:text-foreground"
          />
        </ButtonLink>
      </div>
    </div>
  );
}

async function LargeGridCard({ data }: any) {
  return (
    <div className="group flex w-full cursor-pointer flex-col border border-secondary hover:bg-secondary">
      <div className="flex flex-1 flex-col gap-y-2xl p-xl">
        {data?.headline && (
          <span
            className="max-w-max text-xl"
            dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
          />
        )}
        {data?.subheadline && (
          <div dangerouslySetInnerHTML={{ __html: data?.subheadline || "" }} />
        )}
      </div>
      {(data?.image || data?.button) && (
        <div className="bg-grid-secondary bg-grid-pattern flex max-h-[200px] min-h-[200px] flex-1 flex-col justify-end p-xl">
          <div className="flex items-end justify-between">
            <div className="relative aspect-video h-auto w-2/5 -translate-x-5">
              <DirectusImage
                asset={data?.image}
                fill
                className="object-contain"
              />
            </div>
            {data?.button && (
              <ButtonLink button={data.button}>
                <Button
                  className="relative aspect-square size-[26px]"
                  size="icon"
                >
                  <DirectusImage
                    fill
                    asset={data?.button?.icon[0]?.icons_id}
                    className="p-1"
                  />
                </Button>
              </ButtonLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
