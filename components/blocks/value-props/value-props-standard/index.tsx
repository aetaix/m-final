import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_STANDARD, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          active_icon: ["*"],
          items: [
            "*",
            {
              background_color: ["*"],
              button_group: [
                "*",
                {
                  buttons: [
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
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const ValuePropStandard = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex flex-col"
    >
      <div className="hidden flex-col items-center justify-center gap-8 gap-x-10 bg-background pb-3xl text-center lg:flex">
        {data.headline && (
          <div
            className="font-normal! no-img-margin inline-image-size-1 heading-3 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: data.headline || "" }}
          />
        )}
        {data?.subheadline ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
            className="max-w-[642px] text-base text-[#3C3C3C]"
          ></div>
        ) : null}
      </div>
      <DesktopView items={data.items} activeIcon={data.active_icon} />
      <MobileView data={data} />
    </div>
  );
};

export default ValuePropStandard;
