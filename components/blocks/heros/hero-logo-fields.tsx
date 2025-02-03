import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes, ModelStatus } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { BlockImage } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";
import { CSSProperties } from "react";

const fetchHeroLogoFieldData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_LOGO_FIELDS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          button_group: [
            "*",
            {
              buttons: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["*", { icons_id: ["*"] }],
                },
              ],
            },
          ],
          logos: ["*", { block_image_id: ["*", { translations: ["*"] }] }],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

interface LogoFieldsV2SectionItem {
  id: number;
  status: ModelStatus;
  name: string;
  sort: number;
  image: BlockImage;
}

export default async function HeroLogoField({ data: { id }, locale }: any) {
  const data = await fetchHeroLogoFieldData(id, locale);
  const images: Array<any> = data?.logos
    ?.map(
      (item: {
        sort: any;
        block_image_id: {
          sort: number;
          name: any;
          image: any;
        };
      }) => ({
        sort: item?.sort,
        name: item?.block_image_id?.name,
        image: item?.block_image_id,
      }),
    )
    .sort((a: { sort: number }, b: { sort: number }) => a?.sort - b?.sort);
  return (
    <div className="relative mx-auto mb-4xl mt-6xl flex h-fit max-h-[588px] min-h-[588px]  flex-col gap-y-[43px] overflow-hidden lg:mb-[146px] lg:items-center lg:overflow-visible">
      <div className="bg-grid-pattern absolute z-[-80] size-full w-screen max-w-screen-4xl bg-grid-size-[48.9px] bg-grid-[#ECDAA2]/[.5]" />
      <div className="container z-10 mt-2xl-2 flex flex-col justify-center gap-y-2xl md:max-w-[506px] md:px-0 lg:mt-[119px] lg:gap-y-2xl">
        <h3
          className="mx-auto max-w-[506px] text-center text-heading-2 lg:text-heading-0"
          dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
        />
        <div
          className="mx-auto text-center sm:px-md lg:px-0"
          dangerouslySetInnerHTML={{ __html: data?.subheadline || "" }}
        />
      </div>

      <div className="hero-marquee inset-0 z-0 mx-auto flex size-full w-svw min-w-[524px] max-w-screen-4xl gap-x-24 pb-80 lg:absolute lg:justify-center">
        {Array.from({ length: 5 }).map((_, idx) => (
          <LogoFieldsV2Section
            ariaHidden={!idx ? "false" : "true"}
            className={cn(
              "marquee-content inset-0 z-0 mx-auto mb-16 h-[233px] min-w-full  lg:absolute lg:h-[650px] lg:animate-none",
              { "lg:hidden": !!idx },
            )}
            items={images}
          />
        ))}
      </div>
    </div>
  );
}

const desktopPositions = [
  { x: 89.2, y: 4.2 },
  { x: 1.9, y: 3.8 },
  { x: 80.8, y: 34.6 },
  { x: 12.5, y: 41.4 },
  { x: 37.5, y: 57.1 },
  { x: -3.5, y: 64.3 },
  { x: 65.2, y: 64.3 },
  { x: 94.2, y: 70.8 },
];

const mobilePositions = [
  { x: 0, y: 0 },
  { x: 27.2, y: 11.1 },
  { x: 55.4, y: 1.3 },
  { x: 85.2, y: 11.1 },
  { x: 1.7, y: 60.3 },
  { x: 35.6, y: 66.2 },
  { x: 63.0, y: 64.5 },
  { x: 90, y: 70.5 },
];

const getLogoCoordinates = (position: number) =>
  ({
    "--x": mobilePositions[position - 1]?.x + "%",
    "--y": mobilePositions[position - 1]?.y + "%",
    "--lg-x": desktopPositions[position - 1]?.x + "%",
    "--lg-y": desktopPositions[position - 1]?.y + "%",
  }) as CSSProperties;

function LogoFieldsV2Section({
  items,
  className,
  ariaHidden,
}: {
  items: LogoFieldsV2SectionItem[];
  className?: string;

  ariaHidden?: "true" | "false";
}) {
  return (
    <div aria-hidden={ariaHidden} className={cn("relative", className)}>
      {items.map((item, idx) => {
        return (
          <div
            style={getLogoCoordinates(item.sort)}
            key={`${idx}-${"logos"}`}
            className={`absolute left-[var(--x)] top-[var(--y)] aspect-square h-[82px] w-[89px] bg-white shadow-deploy-logo transition-all duration-300 ease-linear sm:size-[100px]  md:h-[120px] md:w-[130px] lg:left-[var(--lg-x)] lg:top-[var(--lg-y)] lg:size-[145px] xl:h-[175px] xl:w-[178px]`}
          >
            {item?.image?.file && (
              <DirectusImage
                asset={item.image}
                key={`logo-fields-v2-${item.id}`}
                fill
                className="object-contain p-4 md:p-8 lg:p-8 xl:p-12"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
