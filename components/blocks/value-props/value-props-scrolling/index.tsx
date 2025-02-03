import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

const fetchValuePropsScrollingData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_SCROLLING, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          active_icon: ["*"],
          items: [
            "*",
            {
              translations: ["*"],
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
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function ValuePropsScrolling({
  data: { id },
  locale,
}: any) {
  const data = await fetchValuePropsScrollingData(id, locale);
  if (!data) return;
  const { items, headline, active_icon, shrinked_header } = data;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col gap-y-3xl"
    >
      {headline && (
        <div
          className={cn("heading-3", {
            "max-w-[508px]": shrinked_header,
          })}
          dangerouslySetInnerHTML={{ __html: headline || "" }}
        />
      )}
      <MobileView items={items} activeIcon={active_icon} />
      <DesktopView items={items} activeIcon={active_icon} />
    </div>
  );
}
