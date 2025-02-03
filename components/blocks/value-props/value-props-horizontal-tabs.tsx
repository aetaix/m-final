import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import * as Tabs from "@radix-ui/react-tabs";

const fetchValuePropsHorizontalTabsData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_HORIZONTAL_TABS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          tabs_active_icon: ["*"],
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

export default async function ValuePropsHorizontalTabs({
  data: { id },
  locale,
}: any) {
  const data = await fetchValuePropsHorizontalTabsData(id, locale);
  if (!data) return;
  const { items, headline, subheadline, tabs_active_icon } = data;

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex w-full flex-col gap-y-3xl"
    >
      <div className="mx-auto flex max-w-[825px] flex-col gap-y-2xl  md:gap-y-3xl">
        {headline && (
          <h3
            className="heading-3 text-center"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {subheadline && (
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
      </div>

      <Tabs.Root defaultValue={items?.[0]?.id} className="relative">
        <Tabs.List className="no-scrollbar container z-10 flex overflow-x-scroll bg-background px-0 md:max-w-min">
          {items?.map((card: any) => (
            <Tabs.Trigger
              key={card?.name}
              className={cn(
                "group flex h-[42px] items-center justify-center gap-x-2xl-2 text-nowrap no-wrap-container p-md text-sm",
                "data-[state=active]:bg-foreground data-[state=active]:text-background",
                "border-t border-r border-foreground first-of-type:border-l",
              )}
              value={card?.id}
            >
              {card?.headline && (
                <div dangerouslySetInnerHTML={{ __html: card.headline }} />
              )}
              <div className="relative flex size-xl items-center justify-center text-primary">
                <DirectusImage
                  className="hidden items-center justify-center object-contain [.group[data-state=active]_&]:flex"
                  asset={tabs_active_icon}
                  fill
                />
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="relative z-0 min-h-[542px]">
          {items?.map((item: any) => (
            <Tabs.Content
              forceMount
              key={item?.name}
              value={item?.id}
              className="z-0 !flex size-full flex-col gap-y-3 opacity-100 data-[state=inactive]:absolute data-[state=inactive]:z-[-1] data-[state=inactive]:opacity-0 md:flex-row md:gap-y-0"
            >
              <div className="flex min-h-full flex-1 flex-col justify-between gap-y-[69px] bg-[#FFF0C3] p-xl py-4xl md:p-[56px]">
                {item?.headline && (
                  <div
                    className="text-subtitle-md"
                    dangerouslySetInnerHTML={{ __html: item.headline }}
                  />
                )}
                <div className="flex max-w-[500px] flex-col gap-y-2xl-2">
                  {item?.body && (
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                  )}
                  {item?.button && (
                    <ButtonLink button={item.button}>
                      <CButton btn={item.button} iconClassName="text-primary" />
                    </ButtonLink>
                  )}
                </div>
              </div>
              {item?.image && (
                <div className="bg-grid-thickness-thin bg-grid-pattern relative flex aspect-square max-h-[270px] flex-1 items-center justify-center bg-grid-size-[45.4px_45.1px] bg-grid-[#ECDAA2] md:max-h-[542px] md:max-w-[637px] xl:min-w-[637px]">
                  <DirectusImage
                    fill
                    className="object-contain lg:p-3xl xl:p-[88px]"
                    asset={item.image}
                  />
                </div>
              )}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
