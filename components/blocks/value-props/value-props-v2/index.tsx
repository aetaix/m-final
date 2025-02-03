import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";
import OverScreenTextMarquee from "./text-marquee";

const fetchValuePropsV2Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_V2, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            {
              translations: ["*"],
              image: ["*"],
              button: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["*", { icons_id: ["*"] }],
                },
              ],
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

export default async function ValuePropsV2({ data: { id }, locale }: any) {
  const data = await fetchValuePropsV2Data(id, locale);
  if (!data) return;
  return (
    <div id={data?.anchor ? `${data?.anchor}` : ""}>
      {data?.headline && <OverScreenTextMarquee headline={data?.headline} />}
      {data.items?.length && <MobileView items={data.items} />}
      {data.items?.length && <DesktopView items={data.items} />}
    </div>
  );
}
