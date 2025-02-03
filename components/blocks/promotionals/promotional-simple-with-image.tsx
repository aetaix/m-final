import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

const fetchPromotionalV4Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PROMOTIONAL_V4, {
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

export default async function PromotionalSimpleWithImage({
  data: { id },
  locale,
}: any) {
  const data = await fetchPromotionalV4Data(id, locale);
  if (!data) return;
  const {
    headline,
    image,
    addon_img,
    text_color,
    background_color,
    button,
    variant,
  } = data;
  const background = background_color?.value;
  const color = text_color?.value;
  const withImage = variant === "image";
  if (withImage)
    return (
      <div id={data?.anchor ? `${data?.anchor}` : ""} className="container">
        <div
          style={{ color, background }}
          className="relative flex flex-col items-center justify-between overflow-hidden sm:h-[158px] sm:flex-row"
        >
          <div className="relative aspect-square size-full max-h-[153px] sm:max-h-full sm:w-auto">
            <DirectusImage
              fill
              asset={image}
              className="object-fill sm:object-cover"
            />
          </div>
          <div
            className={cn(
              "flex flex-1 flex-col w-full justify-between gap-y-3xl text-xl lg:flex-row lg:items-center py-xl md:py-3xl px-md sm:py-[56px] sm:px-10",
              {
                "max-w-[849px]": !!addon_img,
              },
            )}
          >
            <div
              className="md:text-[20px]/[27px text-xl"
              dangerouslySetInnerHTML={{
                __html: headline || "",
              }}
            />
            {button && (
              <ButtonLink button={button}>
                <CButton
                  btn={button}
                  className="text-base md:gap-x-xl"
                  iconClassName="scale-75 text-primary"
                />
              </ButtonLink>
            )}
          </div>
          {addon_img && (
            <div className="absolute bottom-0 right-0 hidden items-end self-end px-xl sm:flex lg:static lg:px-4xl">
              <div className="relative aspect-square h-[70px] w-[65px] md:h-[98px] md:w-[85px]">
                <DirectusImage
                  fill
                  className="object-contain"
                  asset={addon_img}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""} className="container">
      <div
        style={{ color, background }}
        className="container relative flex flex-col py-3xl md:flex-row md:!px-2xl-2"
      >
        <div className={cn("flex flex-col gap-y-2xl flex-1 shrink-0")}>
          <div
            className="subtitle"
            dangerouslySetInnerHTML={{
              __html: headline || "",
            }}
          />
          {button && (
            <ButtonLink button={button}>
              <CButton
                btn={button}
                className="bg-foreground p-3 text-sm text-background hover:bg-foreground"
                iconClassName="scale-75 text-primary"
              />
            </ButtonLink>
          )}
        </div>
        {addon_img && (
          <div className="relative h-[111px] w-[165px] md:translate-y-3xl">
            <DirectusImage fill className="object-contain" asset={addon_img} />
          </div>
        )}
      </div>
    </div>
  );
}
