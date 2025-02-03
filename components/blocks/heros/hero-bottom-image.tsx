import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

const fetchHeroBottomImageData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_BOTTOM_IMAGE, {
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
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["*", { icons_id: ["*"] }],
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

export default async function HeroBottomImage({ data: { id }, locale }: any) {
  const data = await fetchHeroBottomImageData(id, locale);
  if (!data) return;
  const { headline, subheadline, buttons, image, heading_layout } = data;
  const containedHeader = heading_layout === "contained";
  const ctas = buttons?.buttons;

  return (
    <div className="relative mt-[80px] flex flex-col items-center gap-y-2xl md:gap-y-3xl lg:mt-6xl">
      <div className="bg-grid-pattern absolute z-[-80] h-[490px] max-h-[588px] w-screen bg-grid-size-[49px_48.9px] bg-grid-[#FFF0C3] md:min-h-[588px]" />
      <div
        className={cn(
          "container flex flex-col gap-y-2xl pt-2xl-2 md:pt-[84px] text-center md:gap-y-[48px]",
          { "max-w-[823px]": containedHeader },
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
            className="text-xl md:text-[20px]/[27px]"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
        {ctas?.length && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-x-[30px]">
            {ctas?.map((ctaBtn: any, idx: number) => (
              <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
                <CButton
                  btn={ctaBtn}
                  label={ctaBtn?.label}
                  icon={ctaBtn?.icon[0]?.icons_id}
                  className="text-sm md:gap-x-[28px] md:text-base"
                  iconClassName="text-primary"
                />
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
      <div className="container flex justify-center overflow-hidden">
        <div
          className={cn(
            "container relative min-w-[490px] h-[235px] lg:h-[393px]",
          )}
        >
          <DirectusImage
            asset={image}
            fill
            priority
            blur
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
