import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import "@splidejs/react-splide/css";
import ScrollingHeaderView from "./scrolling-header";
import "./scrolling-header.css";

const fetchScrollingHeaderData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_SCROLLING_HEADER, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function ScrollingHeader({ data: { id }, locale }: any) {
  const data = await fetchScrollingHeaderData(id, locale);
  if (!data) return;
  return (
    <div id={data?.anchor || ""}>
      <ScrollingHeaderView content={data?.content} />;
    </div>
  );
}
