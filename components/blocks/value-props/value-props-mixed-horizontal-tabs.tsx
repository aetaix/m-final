import BaseBlock from "@/components/base-block";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import * as Tabs from "@radix-ui/react-tabs";

const fetchMixedHorizontalTabsData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_VALUE_PROPS_MIXED_HORIZONTAL_TABS, {
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
              block: [
                "*",
                {
                  item: {
                    block_table_multi_sections: ["id"],
                    block_logo_fields_grid: ["id"],
                    block_form_two_column: ["id"],
                  },
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

export default async function ValuePropsMixedHorizontalTabs({
  data: { id: dataID },
  locale,
}: any) {
  const data = await fetchMixedHorizontalTabsData(dataID, locale);
  if (!data) return;
  const { headline, subheadline, items, tabs_active_icon } = data;
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container flex w-full flex-col gap-y-3xl"
    >
      {(headline || subheadline) && (
        <div className="mx-auto flex max-w-[825px] flex-col gap-y-xl md:gap-y-3xl">
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
      )}

      <Tabs.Root defaultValue={items?.[0]?.id} className="relative">
        <Tabs.List className="no-scrollbar container z-10 flex max-w-min overflow-x-scroll bg-background px-0 md:justify-center">
          {items?.map((section: any) => (
            <Tabs.Trigger
              key={section?.name}
              className={cn(
                "group flex h-[42px] items-center justify-center gap-x-2xl-2 text-nowrap no-wrap-container p-md text-sm",
                "data-[state=active]:bg-foreground data-[state=active]:text-background",
                "border-y border-r border-foreground first-of-type:border-l",
              )}
              value={section?.id}
            >
              {section?.title && (
                <div
                  dangerouslySetInnerHTML={{ __html: section?.title || "" }}
                />
              )}
              <div className="relative flex size-xl items-center justify-center text-primary">
                <DirectusImage
                  className="hidden size-xl items-center justify-center object-contain [.group[data-state=active]_&]:flex"
                  asset={tabs_active_icon}
                  width={16}
                  height={16}
                />
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="relative z-0 mt-3xl">
          {items?.map((item: any) => (
            <Tabs.Content
              key={item.name}
              value={item.id}
              forceMount
              className="static inset-0 opacity-100 data-[state=inactive]:absolute data-[state=inactive]:z-[-1] data-[state=inactive]:opacity-0"
            >
              <BaseBlock locale={locale} block={item?.block[0]} />
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
