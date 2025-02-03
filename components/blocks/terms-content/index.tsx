import React from "react";
import { useDirectus } from "@/lib/directus/directus";
import { readItems } from "@directus/sdk";
import { BlockTypes } from "@/constants/enum";
import { applyTranslations } from "@/lib/translation";
import TermsContentMobile from "./terms-content";
import { slugify } from "@/lib/utils";
import TermsTableOfContent from "./terms-table-of-content";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_CONTENT, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          toc_icon: ["*"],
          items: [
            "*",
            {
              translations: ["*"],
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

const TermsContent = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;

  const headings = data.items.map((item: any) => ({
    id: slugify(item.name),
    title: item.headline,
  }));

  return (
    <div className="container mt-[148px] md:mt-[207px] xl:w-[1011px]">
      <div className="mb-[76px] flex flex-col items-center gap-4 px-4 text-center md:mb-[86px] md:gap-8">
        <h2
          className="text-[40px]/[42px] md:text-[72px]/[72px]"
          dangerouslySetInnerHTML={{ __html: data.headline || "" }}
        ></h2>
        <div
          className="text-[18px]/[21.6px] md:text-[20px]/[27px]"
          dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
        ></div>
      </div>

      <div className="terms-content-scroll-padding relative flex w-full gap-6">
        <TermsTableOfContent activeIcon={data?.toc_icon} headings={headings} />
        <TermsContentMobile items={data?.items} />
      </div>
    </div>
  );
};

export default TermsContent;
