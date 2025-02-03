import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import "@/styles/globals.css";
import {
  BlockButton,
  BlockButtonIcon,
  BlockButtonTranslation,
  BlockPromotionalV3,
  BlockPromotionalV3Translation,
  Color,
  Icon,
} from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

type PromotionalV3Props = {
  data: (BlockPromotionalV3 & {
    button: BlockButton;
  }) &
    BlockPromotionalV3Translation;
  locale: string;
};

const fetchPromotionalV3Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PROMOTIONAL_V3, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          text_color: ["*"],
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

export default async function PromotionalV3({
  data: { id },
  locale,
}: PromotionalV3Props) {
  const data = await fetchPromotionalV3Data(id, locale);
  if (!data) return;
  const { headline, button, text_color, image, subheadline } = data;
  const icon = (button?.icon as BlockButtonIcon[])?.[0]?.icons_id as Icon;
  const color = (text_color as Color)?.value;
  const cta = button as BlockButton & BlockButtonTranslation;
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container py-xl">
      <div className="container relative flex h-[483px] w-full flex-col justify-end pb-xl pt-3xl md:!px-3xl">
        <DirectusImage
          asset={image as string}
          fill
          className="size-full object-cover"
        />
        <div className="relative z-10 mb-6 flex flex-wrap items-end justify-between gap-y-2xl md:gap-y-3xl">
          <div className="flex max-w-[438px] flex-col gap-y-2xl md:gap-y-10">
            <h3
              style={{ color }}
              dangerouslySetInnerHTML={{ __html: headline || "" }}
              className="heading-3"
            />
            <div
              style={{ color }}
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
            />
          </div>
          <ButtonLink button={button}>
            <CButton
              className="bg-transparent"
              icon={icon}
              ctaColor={color}
              iconClassName="text-primary"
              label={cta?.label || ""}
              btn={button}
            />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
