import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import "@/styles/globals.css";
import { readItems } from "@directus/sdk";

const fetchCtaV2Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_CTA_V2, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          addon_img: ["*"],
          text_color: ["*"],
          background_color: ["*"],
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
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function CtaV2({ data: { id }, locale }: any) {
  const data = await fetchCtaV2Data(id, locale);
  if (!data) return;
  const [button] = data?.button_group?.buttons || [undefined];
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container py-xl">
      <div className="container relative flex h-[483px] w-full flex-col justify-end pb-xl pt-3xl md:px-3xl">
        <DirectusImage asset={data?.image} fill className="object-cover" />
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-y-8 pb-8 text-white">
          <h3
            dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
            className="heading-3 max-w-[438px]"
          />
          {button && (
            <ButtonLink button={button}>
              <CButton
                className="border-b-white bg-transparent"
                icon={button?.icon[0]?.icons_id}
                label={button.label}
                iconClassName="text-primary"
                btn={button}
              />
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}
