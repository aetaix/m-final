import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import React from "react";

import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PROMOTIONAL_V5, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          image: ["*"],
          action: [
            "*",
            {
              page: ["permalink"],
              post: ["slug"],
              translations: ["*"],
              icon: ["icons_id", { icons_id: ["*"] }],
            },
          ],
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const PromotionalV5 = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return "";
  const { headline, action, image } = data;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container w-full"
    >
      <div className="flex flex-col items-start gap-16 bg-mistral-beige-deep p-[25px] md:flex-row md:items-end md:justify-between md:px-[49px] md:py-[45px]">
        <div className="flex flex-col gap-14">
          {image ? (
            <DirectusImage width={81} height={81} asset={image} />
          ) : null}
          <h2
            className="max-w-[568px] text-[30px]/[34.5px] md:text-[48px]/[45.6px]"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          ></h2>
        </div>
        {action ? (
          <ButtonLink button={action}>
            <CButton
              className="h-[44px] justify-between gap-6"
              label={action?.label}
              icon={action?.icon[0]?.icons_id}
              style={{ gap: "26px" }}
              iconClassName="text-primary shrink-0 size-4"
              btn={action}
            />
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
};

export default PromotionalV5;
