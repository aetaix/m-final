import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import { CSSProperties } from "react";

const fetchLogoFieldsGridsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_LOGO_FIELDS_GRID, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          images: [
            "block_image_id",
            { block_image_id: ["*", { translations: ["*"] }] },
          ],
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

const imagesPosition = [
  { x: 22, y: 1 },
  { x: 2, y: 2 },
  { x: 23, y: 5 },
  { x: 3, y: 6 },
  { x: 1, y: 8 },
  { x: 20, y: 8 },
];

const getPositionByIndex = (idx: number) => ({
  left: `calc(var(--x-offset)*${imagesPosition[idx].x})`,
  top: `calc(var(--y-offset)*${imagesPosition[idx].y})`,
});

const wrapperGridUnits = {
  "--x-offset": "47.97px",
  "--y-offset": "48.5px",
} as CSSProperties;

export default async function LogoFieldsGrid({ data: { id }, locale }: any) {
  const data = await fetchLogoFieldsGridsData(id, locale);
  if (!data) return;
  const { headline, subheadline, button, images } = data;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      style={wrapperGridUnits}
      className="container relative flex items-center justify-center overflow-hidden"
    >
      <div className="container bg-grid-pattern relative flex h-[534px] !min-w-[1248px] items-center justify-center bg-grid-size-[var(--x-offset)_var(--y-offset)] bg-grid-[#ECDAA2]/[.5]">
        {images?.map(({ block_image_id: asset }: any, idx: number) => (
          <div
            style={getPositionByIndex(idx)}
            className="absolute h-[calc(var(--y-offset)*2)] w-[calc(var(--x-offset)*2)] border-[0.5px] border-[#ECDAA2] bg-[#FFF0C3]"
          >
            <DirectusImage
              fill
              className="flex items-center justify-center object-contain px-xl"
              asset={asset}
            />
          </div>
        ))}
      </div>
      <div className="absolute flex items-center border-[0.5px] border-[#ECDAA2]  bg-background p-[20px] text-center md:h-[calc(var(--y-offset)*7)] md:w-[calc(var(--x-offset)*12)] md:p-10">
        <div className="flex max-h-fit flex-col items-center gap-y-2xl  md:gap-y-3xl">
          {headline && (
            <h4
              className="text-2xl"
              dangerouslySetInnerHTML={{ __html: headline || "" }}
            />
          )}
          {subheadline && (
            <div dangerouslySetInnerHTML={{ __html: subheadline || "" }} />
          )}
          {button && (
            <ButtonLink button={button}>
              <CButton
                className="text-sm text-[#3C3C3C]"
                btn={button}
                iconClassName="text-primary"
              />
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}
