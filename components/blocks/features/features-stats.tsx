import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

enum statsVariant {
  AMPLE = "ample",
  COMPACT = "compact",
}
const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_STATS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            {
              icon: ["*"],
              translations: ["*"],
            },
          ],
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const FeaturesStats = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  const isCompact = data.variant === statsVariant.COMPACT;
  if (isCompact) return <CompactVariant items={data?.items} />;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col justify-center gap-y-6 bg-background pt-20 xs:pt-[50px] md:gap-y-[5.5rem]"
    >
      <h2
        className="no-img-margin inline-image-size-1 heading-3 max-w-[716px]"
        dangerouslySetInnerHTML={{ __html: data.headline || "" }}
      ></h2>
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:gap-x-10 lg:gap-28 xl:gap-36">
        <div
          className="sticky h-fit max-w-[507px] text-base md:top-[400px]"
          dangerouslySetInnerHTML={{ __html: data.body || "" }}
        ></div>
        <div className="flex w-full flex-1 shrink-0 flex-col gap-4 md:min-w-[413px]">
          {data.items.map((item: any) => (
            <div className="bg-grid-thickness-thin bg-grid-pattern flex h-[295px] w-full flex-col justify-center gap-y-[4.5rem] border-r border-[#ECDAA1] px-6 bg-grid-size-[49px_49px] bg-grid-[#ECDAA1] xs:gap-y-2 md:px-9 xl:h-[197px] xl:flex-row xl:items-center xl:justify-between xl:gap-y-[4.5rem]">
              <div className="flex items-end gap-6">
                <h3
                  className="text-[75px]/[71.25px] text-mistral-black xl:hidden xl:text-[119px]/[113.5px]"
                  dangerouslySetInnerHTML={{
                    __html: item.headline || "",
                  }}
                ></h3>
                <h3
                  className={cn(
                    "text-[75px]/[71.25px] hidden xl:inline-block text-mistral-black",
                    item?.headline?.includes("%")
                      ? "xl:text-[119px]/[78.5px]"
                      : "xl:text-[119px]/[113.5px]",
                  )}
                  dangerouslySetInnerHTML={{
                    __html:
                      item.headline.replace(
                        "%",
                        '<span style="font-size: 64px;">%</span>',
                      ) || "",
                  }}
                ></h3>
                <div
                  className="relative mb-[9px] hidden bg-mistral-black px-4 py-2 text-[15.95px]/[23.92px] text-mistral-beige after:absolute after:left-0 after:top-0 after:size-4 after:-translate-x-4 after:-translate-y-4 after:bg-mistral-black xl:mb-[15px] xl:block"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                ></div>
              </div>
              <div className="flex items-end justify-between gap-x-8">
                <div
                  className="relative translate-x-[14px] whitespace-nowrap bg-mistral-black px-4 py-2 text-sm text-mistral-beige after:absolute after:left-0 after:top-0 after:size-4 after:-translate-x-4 after:-translate-y-4 after:bg-mistral-black xs:text-[15.95px]/[23.92px] xl:hidden"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                ></div>
                <DirectusImage
                  asset={item.icon}
                  height={97}
                  width={110}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesStats;

function CompactVariant({ items }: any) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container gap-md",
      )}
    >
      {items.map((item: any) => (
        <div className="bg-grid-pattern mx-auto flex h-[291px] w-full flex-col justify-between border-b border-r border-[#ECDAA1]/[.5] p-[20px] bg-grid-size-[49px] bg-grid-[#ECDAA1]/[.5] lg:max-w-[400px]">
          <div className="flex items-end gap-6">
            <h3
              className="text-[93px]/[88.35px] text-[#171616]"
              dangerouslySetInnerHTML={{
                __html: item.headline || "",
              }}
            />
          </div>
          <div className="flex items-end justify-between gap-x-8">
            <div
              className="relative translate-x-[14px] whitespace-nowrap bg-[#1E1E1E] px-4 py-2 text-sm text-[#FFFAEB] after:absolute after:left-0 after:top-0 after:size-4 after:-translate-x-4 after:-translate-y-4 after:bg-mistral-black"
              dangerouslySetInnerHTML={{ __html: item.description || "" }}
            ></div>
            <DirectusImage
              asset={item.icon}
              height={103}
              width={114}
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
