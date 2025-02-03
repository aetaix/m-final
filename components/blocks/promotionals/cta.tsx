import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { directusAssets } from "@/lib/image";
import { applyTranslations } from "@/lib/translation";
import {
  BlockButtonGroup,
  BlockCta,
  BlockCtaTranslation,
  PagesBlock,
} from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

interface Cta extends PagesBlock {
  button_group: any;
  headline: string;
  subheadline: string;
  background_image?: string;
  background_image_mobile?: string;
  item: {
    button_group: BlockButtonGroup;
  } & BlockCta &
    BlockCtaTranslation;
}

const fetchCtaData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_CTA, {
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

export default async function Cta({ data: { id }, locale }: any) {
  const data = await fetchCtaData(id, locale);
  if (!data) return null;
  const {
    background_image,
    background_image_mobile,
    headline,
    subheadline,
    button_group,
  } = data;

  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container">
      <div
        className={`relative mx-auto py-20 ${
          background_image || background_image_mobile
            ? "bg-grid-size-md bg-grid-secondary bg-grid-pattern max-w-[1036px]"
            : ""
        }`}
      >
        {/* Desktop Background */}
        {background_image && (
          <div
            className="absolute inset-0 hidden bg-auto bg-center bg-no-repeat md:block"
            style={{
              backgroundImage: `url(${directusAssets(background_image)})`,
            }}
          />
        )}

        {/* Mobile Background */}
        {background_image_mobile && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: `url(${directusAssets(
                background_image_mobile,
              )})`,
            }}
          />
        )}

        <div
          className={`relative z-10 flex w-full flex-col items-center justify-center gap-9 text-center ${
            background_image || background_image_mobile
              ? "min-h-[339px]"
              : "bg-background"
          }`}
        >
          <h2
            className="heading-2"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          />

          {subheadline && (
            <div
              className="text-base md:text-[32px]/[36.8px]"
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
            />
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-x-8">
            {button_group?.buttons?.map((ctaBtn: any, idx: number) => (
              <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
                <CButton
                  btn={ctaBtn}
                  label={ctaBtn?.label}
                  icon={ctaBtn?.icon[0]?.icons_id}
                  iconClassName="text-primary"
                />
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
