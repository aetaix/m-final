import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import HeroNewsPost from "./hero-news-post";

const fetchHeroNewsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_NEWS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          featured_post: ["*", { translations: ["*"], category: ["*"] }],
          featured_post_button_icon: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const HeroNews = async ({ data: { id }, locale }: any) => {
  const data = await fetchHeroNewsData(id, locale);
  const {
    headline,
    subheadline,
    buttons,
    featured_post,
    featured_post_button_text,
    featured_post_button_icon,
  } = data;
  const featuredPostButton = {
    label: featured_post_button_text,
    icon: featured_post_button_icon,
  };
  const ctas = buttons?.buttons;
  return (
    <div className="relative mb-8 mt-[80px] flex flex-col gap-y-8 md:gap-y-[82px] lg:mt-[123px]">
      <div className="bg-grid-pattern absolute z-[-80] max-h-[568px] w-screen bg-grid-size-[50.6px_50.6px] bg-grid-[#FFF0C3] md:max-h-[708px]" />
      <div className="container flex max-w-[823px] flex-col gap-y-2xl pt-[71px] text-center md:gap-y-2xl-2">
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
      <div className="container flex ">
        <HeroNewsPost data={featured_post} button={featuredPostButton} />
      </div>
    </div>
  );
};

export default HeroNews;
