import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import ImageCarousel from "./image-carousel";

const fetchHeroCareersData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_CAREERS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          buttons: [
            "*",
            {
              buttons: [
                "*",
                {
                  translations: ["*"],
                  icon: ["*", { icons_id: ["*"] }],
                  page: ["permalink"],
                  post: ["slug"],
                },
              ],
            },
          ],
          images: [
            "block_careers_hero_images_id",
            { block_careers_hero_images_id: ["*"] },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function HeroCareers({ data: { id }, locale }: any) {
  const data = await fetchHeroCareersData(id, locale);
  if (!data) return;
  const { headline, subheadline, buttons, images } = data;
  const ctas = buttons?.buttons;
  const justifyCenter = buttons?.layout === "centered";
  const justifyStart = buttons?.layout === "left";
  const justifyRight = buttons?.layout === "right";
  const mappedImages = images.flatMap(
    ({ block_careers_hero_images_id }: any) => block_careers_hero_images_id,
  );
  return (
    <div className="relative mt-[80px] flex flex-col items-center gap-y-2xl md:gap-y-[69px] lg:mt-6xl">
      <div className="bg-grid-pattern absolute z-[-80] h-[490px] max-h-[588px] w-screen max-w-screen-4xl bg-grid-size-[49px_48.9px] bg-grid-[#FFF0C3] md:min-h-[588px]" />
      <div
        className={cn(
          "container flex flex-col gap-y-2xl pt-[40px] md:pt-[85px] text-center md:gap-y-2xl-2",
        )}
      >
        {headline && (
          <h2
            className="heading-2 md:text-[72px]/[72px]"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {subheadline && (
          <div
            className="mx-auto max-w-[661px] text-xl md:text-[20px]/[27px]"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
        {ctas?.length && (
          <div
            className={cn(
              "flex container flex-wrap items-center gap-9 gap-y-4",
              {
                "justify-start": justifyStart,
                "justify-center": justifyCenter,
                "justify-end": justifyRight,
              },
            )}
          >
            {ctas?.map((ctaBtn: any, idx: number) => (
              <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
                <CButton
                  btn={ctaBtn}
                  label={ctaBtn?.label}
                  icon={ctaBtn?.icon[0]?.icons_id}
                  iconClassName="text-primary"
                  className="text-[#3C3C3C] md:gap-x-[28px]"
                />
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <ImageCarousel images={mappedImages} />
      </div>
    </div>
  );
}
