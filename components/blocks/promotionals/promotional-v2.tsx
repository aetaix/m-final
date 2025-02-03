import ButtonLink from "@/components/shared/custom/button-link";
import DirectusImage from "@/components/shared/directus-image";
import { Button } from "@/components/ui/button";
import { BlockTypes } from "@/constants/enum";
import { formatLocalizedDate } from "@/lib/date";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import "@/styles/globals.css";
import {
  BlockButton,
  BlockButtonIcon,
  BlockPromotionalV2,
  BlockPromotionalV2Translation,
  Color,
  Icon,
} from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

type PromotionalV2Props = {
  data: (BlockPromotionalV2 & {
    button: BlockButton;
  }) &
    BlockPromotionalV2Translation;
  locale: string;
};

const fetchPromotionalV2Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PROMOTIONAL_V2, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
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

export default async function PromotionalV2({
  data: { id },
  locale,
}: PromotionalV2Props) {
  const data = await fetchPromotionalV2Data(id, locale);
  const {
    title,
    headline,
    button,
    text_color,
    background_color,
    date,
    image,
    image_position,
  } = data;
  const icon = (button?.icon as BlockButtonIcon[])?.[0]?.icons_id as Icon;
  const color = (text_color as Color)?.value;
  const background = (background_color as Color)?.value;
  const leftImage = image_position === "left";
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="mt:pt-0 container"
    >
      <article
        style={{ background }}
        className={`flex flex-col-reverse justify-between lg:h-[493px]  ${leftImage ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <div className="flex flex-1 flex-col justify-between gap-y-3xl p-xl lg:p-3xl">
          <header className="flex max-w-[457px] flex-col gap-y-[36px]">
            <div
              style={{ color }}
              className="text-large"
              dangerouslySetInnerHTML={{ __html: title || "" }}
            />
            <div className="flex flex-col gap-md">
              <h4
                style={{ color }}
                className="subtitle relative space-x-4"
                dangerouslySetInnerHTML={{ __html: headline || "" }}
              />
              <ButtonLink className="inline-flex items-end" button={button}>
                {icon && (
                  <Button
                    className="relative -bottom-1 aspect-square size-[26px]"
                    size="icon"
                  >
                    <DirectusImage fill asset={icon} className="p-1" />
                  </Button>
                )}
              </ButtonLink>
            </div>
          </header>
          {date && <div style={{ color }}>{formatLocalizedDate(date)}</div>}
        </div>
        <div className="relative aspect-video size-full max-h-[493px] lg:max-w-[628px]">
          <DirectusImage
            fill
            className="object-cover"
            asset={image as string}
          />
        </div>
      </article>
    </div>
  );
}
