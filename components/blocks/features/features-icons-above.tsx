import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

type ColsPerRow = 1 | 2 | 3 | 4 | 5;

interface FeaturesIconsAboveProps {
  data: {
    id: number;
  };
  locale: string;
}

enum itemVariant {
  SIMPLE_ICONS = "simple_icons",
  SIMPLE_ICONS_COMPACT = "simple_icons_compact",
  BLOCK_ICONS = "block_icons",
  BLOCK_WITH_BULLETS = "block_with_bullets",
  SIMPLE_ICONS_WITH_CTA = "simple_icons_with_cta",
}

interface Bullets {
  id: number;
  name: string;
  label: string;
}
interface Data {
  items_per_row: ColsPerRow;
  headline: string;
  variant: "simple" | "simple_with_cta" | "block_icon";
  heading_layout: "center" | "left";
  subheadline: string;
  items: {
    id: string;
    headline: string;
    icon: Icon;
    body?: string;
    button?: {
      label: string;
      icon: { icons_id: Icon[] };
    };
  }[];
}

const fetchFeaturesIconsAboveData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_ICONS_ABOVE, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          bullets_icon: ["*"],
          items: [
            "*",
            {
              translations: ["*"],
              icon: ["*"],
              button: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["icons_id", { icons_id: ["*"] }],
                },
              ],
              bullets: [
                "block_features_icons_above_item_bullets_id",
                {
                  block_features_icons_above_item_bullets_id: [
                    "*",
                    { translations: ["*"] },
                  ],
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

export default async function FeaturesIconsAbove({
  data: { id },
  locale,
}: FeaturesIconsAboveProps) {
  const data = await fetchFeaturesIconsAboveData(id, locale);
  const {
    variant,
    items,
    items_per_row,
    headline,
    subheadline,
    bullets_icon,
    heading_layout,
  } = data;
  const ItemComponent = ItemComponents[variant];
  const isBlockIcons = variant === itemVariant.BLOCK_ICONS;
  const isSimpleIcons = variant === itemVariant.SIMPLE_ICONS;
  const isSimpleCompact = variant === itemVariant.SIMPLE_ICONS_COMPACT;

  // Responsive Grid
  const gridClasses = cn(
    "grid gap-xl",
    "grid-cols-1",
    items_per_row >= 2 && "sm:grid-cols-2",
    items_per_row >= 3 && "lg:grid-cols-3",
    items_per_row >= 4 && "xl:grid-cols-4",
  );

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className={`container flex flex-col gap-y-3xl md:gap-y-3xl ${isBlockIcons ? "bg-grid-pattern border-b border-[#FFF0C3] py-4xl bg-grid-size-[44.55px_43.4px] bg-grid-[#FFF0C3]" : ""}`}
    >
      <div
        className={cn("flex text-center flex-col gap-y-xl md:gap-y-3xl", {
          "lg:max-w-[50%] text-left": heading_layout === "left",
        })}
      >
        {headline && (
          <h3
            className="no-img-margin inline-image-size-1 heading-3"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {subheadline && (
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
      </div>
      <div
        className={cn(
          gridClasses,
          (isSimpleIcons || isSimpleCompact) &&
            "!gap-[44px] overflow-hidden grid-inner-border sm:px-6 py-[22px] sm:py-0",
          isBlockIcons && "gap-[25px]",
        )}
      >
        {items.map((item: any) => (
          <ItemComponent
            key={item.id}
            data={item}
            bulletIcon={bullets_icon}
            simpleCompact={isSimpleCompact}
          />
        ))}
      </div>
    </div>
  );
}

const BlockIconsItem = async ({
  data: { icon, headline, body },
}: {
  data: any;
}) => (
  <div className="flex w-full flex-col gap-y-[80px] border-[0.5px] border-[#E2D19D] bg-background px-[20px] py-[30px]">
    <div
      className={cn(
        "aspect-square size-4xl bg-[#FF8205] flex items-center justify-center",
      )}
    >
      {icon && (
        <div className="relative size-2xl items-center justify-center text-background">
          <DirectusImage
            className="flex size-2xl items-center justify-center object-contain"
            asset={icon}
            fill
          />
        </div>
      )}
    </div>
    <div className="flex flex-col gap-y-3xl">
      {headline && (
        <span
          className="max-w-max text-xl"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
      )}
      {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
    </div>
  </div>
);

const BlockWithBulletsItem = async ({
  data: { icon, headline, body, bullets },
  bulletIcon,
}: any) => {
  const mappedBullets = bullets.flatMap(
    ({ block_features_icons_above_item_bullets_id }: any) =>
      block_features_icons_above_item_bullets_id,
  ) as Bullets[];
  return (
    <div className="flex w-full flex-col gap-y-3xl border-[0.5px] border-[#E2D19D] bg-background px-[20px] py-[30px] md:gap-y-[80px]">
      <div
        className={cn(
          "aspect-square size-[80px] bg-[#FF8205] flex items-center justify-center",
        )}
      >
        {icon && (
          <div className="relative size-xl items-center justify-center text-background">
            <DirectusImage
              className="flex size-xl items-center justify-center object-contain"
              asset={icon}
              fill
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-xl">
        <div className="flex max-h-min flex-col gap-y-3xl md:min-h-[146px] md:leading-4">
          {headline && (
            <span
              className="max-w-max text-xl"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          )}
          {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
        </div>
        <div className="flex flex-col">
          {mappedBullets.map((item) => (
            <div className="flex items-center gap-x-10 p-[13px] text-sm">
              <div className="relative flex size-xl items-center justify-center text-primary">
                <DirectusImage
                  fill
                  className="flex size-xl items-center justify-center object-contain"
                  asset={bulletIcon}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SimpleIconsItem = async ({
  data: { icon, headline, body, button },
  className,
  simpleCompact,
}: {
  data: Data["items"][number];
  className?: string;
  simpleCompact: boolean;
}) => (
  <div
    className={cn(
      className,
      "grid-inner-border-item relative flex w-full flex-col sm:px-[22px] py-[22px] sm:py-0 group",
      {
        "gap-y-[24px]": simpleCompact,
        "gap-y-2xl-2 md:gap-y-[84px]": !simpleCompact,
      },
    )}
  >
    <div
      className={cn("flex flex-col", {
        "gap-y-[24px]": simpleCompact,
        "gap-y-md md:gap-y-xl max-h-11 no-scrollbar": !simpleCompact,
      })}
    >
      {icon && <DirectusImage width={24} height={24} asset={icon} />}
      {headline && (
        <span
          className="max-w-max text-xl"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
      )}
    </div>
    <div
      className={cn("flex justify-self-end h-full flex-col gap-y-xl", {
        "sm:min-h-[170px] justify-between": !!button,
      })}
    >
      {body && (
        <div
          className={cn({
            "sm:py-4": simpleCompact,
          })}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {button && (
        <ButtonLink button={button}>
          <CButton
            variant="secondary"
            className="gap-x-md bg-foreground !p-md text-background hover:bg-foreground"
            iconClassName="text-primary"
            btn={button}
          />
        </ButtonLink>
      )}
    </div>
    <div className="absolute right-[-23px] hidden h-full w-px bg-[#E2D19D] sm:block"></div>
    <div className="absolute bottom-[-22px] hidden h-px w-full bg-[#E2D19D] group-last:block sm:hidden"></div>
  </div>
);

const SimpleIconsWithCTAItem = async ({
  data: { icon, headline, body, button },
}: {
  data: any;
}) => (
  <div className="relative flex w-full flex-col gap-y-[80px] border border-[#ECDAA2] bg-background px-[20px] py-[30px] md:p-[35px]">
    <div className="flex flex-col items-start gap-y-[38px]">
      <div className="relative flex size-xl items-center justify-center text-[#FF8205]">
        <DirectusImage
          className="flex size-xl items-center justify-center object-contain"
          asset={icon}
          fill
        />
      </div>
      <div className="flex flex-col gap-y-xl">
        <div className="flex flex-col gap-y-md">
          {headline && (
            <div
              className="max-w-max text-[20px]/[27px]"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          )}
          {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
        </div>
        {button && (
          <ButtonLink button={button}>
            <CButton
              className="max-w-min text-sm text-[#3C3C3C]"
              iconClassName="text-primary"
              btn={button}
            />
          </ButtonLink>
        )}
      </div>
    </div>
  </div>
);

const ItemComponents: { [key: string]: any } = {
  [itemVariant.SIMPLE_ICONS]: SimpleIconsItem,
  [itemVariant.SIMPLE_ICONS_COMPACT]: SimpleIconsItem,
  [itemVariant.SIMPLE_ICONS_WITH_CTA]: SimpleIconsWithCTAItem,
  [itemVariant.BLOCK_ICONS]: BlockIconsItem,
  [itemVariant.BLOCK_WITH_BULLETS]: BlockWithBulletsItem,
};
