import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";

const fetchFlexibleImageData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus, readItems } = useDirectus();

  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FLEXIBLE_IMAGE, {
      filter: {
        id: { _eq: blockId },
      },
      fields: ["*"],
    }),
  );

  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FlexibleImage({ data: { id }, locale }: any) {
  const data = await fetchFlexibleImageData(id, locale);
  if (!data) return null;
  return (
    <div id={data?.anchor || ""} className="container">
      <div className="relative size-full h-[483px]">
        <DirectusImage asset={data?.image} fill className="object-cover" />
      </div>
    </div>
  );
}
