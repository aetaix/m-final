import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import TalkToLeChat from "./talk-to-le-chat";

const fetchHeroHomePageData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          input_submit_icon: ["*"],
          headline_color: ["*"],
          subheadline_color: ["*"],
          cta_color: ["*"],
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
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};
export default async function HeroHomePage({ data: { id }, locale }: any) {
  const data = await fetchHeroHomePageData(id, locale);
  if (!data) return;
  return (
    <div>
      <div className="relative flex max-h-[690px] min-h-[690px] items-center justify-center">
        {data?.background_image && (
          <DirectusImage
            asset={data?.background_image}
            className="absolute inset-0 -z-10 size-full bg-gradient-to-bl from-[#9F521A] via-[#D3812F] to-[#B35D20] object-cover backdrop-blur-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            width={1920}
            height={1080}
          />
        )}
        <div className="container relative z-10 mx-auto mt-2xl flex max-w-[1057px] flex-col items-center justify-center gap-y-2xl text-center md:mt-[120px] md:gap-y-3xl">
          <h1
            className={`heading-1`}
            style={{
              color: data?.headline_color?.value,
            }}
            dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
          />
          <div
            style={{
              color: data?.subheadline_color?.value,
            }}
            className="text-2xl md:text-2xl-md"
            dangerouslySetInnerHTML={{ __html: data?.subheadline || "" }}
          />
          <TalkToLeChat
            placeholder={data?.input_placeholder}
            actionUrl={data?.input_url}
            actionIcon={data?.input_submit_icon}
          />
          <div className="flex w-full flex-wrap items-center justify-center gap-x-2xl gap-y-md">
            {data?.button_group?.buttons?.map((cta: any, idx: number) => (
              <ButtonLink
                key={cta?.label + idx}
                button={cta}
                className="min-w-full md:min-w-min"
              >
                <CButton
                  overText
                  className="group h-[44px] min-w-full justify-between"
                  iconClassName="text-foreground group-hover:text-primary"
                  label={cta?.label}
                  icon={cta?.icon[0]?.icons_id}
                  btn={cta}
                  ctaColor={data?.cta_color}
                />
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
