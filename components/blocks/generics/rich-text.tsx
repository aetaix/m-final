import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

const fetchRichTextData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();

  const data = await directus.request(
    readItems(BlockTypes.BLOCK_RICH_TEXT, {
      filter: {
        id: { _eq: blockId },
      },
      fields: [
        "*",
        {
          translations: ["*"],
          icon: ["*"],
        },
      ],
    }),
  );

  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function RichText({ data: { id }, locale }: any) {
  const data = await fetchRichTextData(id, locale);
  if (!data) return null;

  const wide = data?.layout === "wide";
  const justifyCenter = data?.layout === "centered";
  const justifyStart = data?.layout === "left";
  const justifyEnd = data?.layout === "right";

  return (
    <div
      id={data?.anchor || ""}
      className={cn("container my-[24px]", {
        "grid md:grid-cols-2 items-end": justifyStart || justifyEnd,
        "grid md:grid-cols-1 items-center": justifyCenter || wide,
      })}
    >
      <div
        className={cn("xl:min-w-[666px]", {
          "col-start-1": justifyStart,
          "col-start-2": justifyEnd,
          "max-w-[666px] mx-auto": justifyCenter,
        })}
        dangerouslySetInnerHTML={{ __html: data?.content || "" }}
      />
    </div>
  );
}
