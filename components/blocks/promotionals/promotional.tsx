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
  BlockPromotional,
  BlockPromotionalTranslation,
  Color,
  Icon,
} from "@/types/directus-schema";
import { readItems } from "@directus/sdk";
import ButtonLink from "../../shared/custom/button-link";

type PromotionalProps = {
  data: (BlockPromotional & {
    button: BlockButton;
  }) &
    BlockPromotionalTranslation;
  locale: string;
};

const fetchPromotionalData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PROMOTIONAL, {
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

export default async function Promotional({
  data: { id },
  locale,
}: PromotionalProps) {
  const data = await fetchPromotionalData(id, locale);
  if (!data) return;
  const { title, headline, button, text_color, background_color, date } = data;
  const icon = (button?.icon as BlockButtonIcon[])?.[0]?.icons_id as Icon;
  const color = (text_color as Color)?.value;
  const background = (background_color as Color)?.value;
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container">
      <article
        style={{ background }}
        className="px-xl py-2xl-2 md:px-3xl md:py-2xl"
      >
        <div className="flex flex-col justify-between gap-2xl md:flex-row md:items-end">
          <header className="flex max-w-[457px] flex-col gap-y-[51px]">
            <span style={{ color }} className="text-large">
              {title}
            </span>
            <ButtonLink className="inline-flex items-end" button={button}>
              <h4 className="subtitle relative">
                <span
                  className="inline-rich-text"
                  style={{ color }}
                  dangerouslySetInnerHTML={{
                    __html: headline || "",
                  }}
                />
                {icon && (
                  <Button
                    className="relative mx-3 inline-flex aspect-square size-[27px] items-center justify-center"
                    size="icon"
                  >
                    <DirectusImage
                      fill
                      asset={icon}
                      className="flex size-md items-center justify-center object-contain p-1 text-background"
                    />
                  </Button>
                )}
              </h4>
            </ButtonLink>
          </header>
          {date && <div style={{ color }}>{formatLocalizedDate(date)}</div>}
        </div>
      </article>
    </div>
  );
}
