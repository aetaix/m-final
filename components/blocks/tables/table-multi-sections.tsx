import DirectusImage from "@/components/shared/directus-image";
import { Table } from "@/components/shared/table";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import * as Accordion from "@radix-ui/react-accordion";

const fetchTableMultiSectionsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_TABLE_MULTI_SECTIONS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          open_icon: ["*"],
          close_icon: ["*"],
          translations: ["*"],
          sections: [
            "block_table_multi_sections_sections_id",
            {
              block_table_multi_sections_sections_id: [
                "*",
                {
                  translations: ["*"],
                  table: ["id"],
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

export default async function TableMultiSections({
  data: { id },
  locale,
}: {
  data: any;
  locale: string;
}) {
  const data = await fetchTableMultiSectionsData(id, locale);
  if (!data) return;
  const { headline, subheadline, sections, open_icon, close_icon, anchor } =
    data;
  const mappedSections = sections.flatMap(
    (item: any) => item.block_table_multi_sections_sections_id,
  );
  const disableCollapse = mappedSections?.length === 1;
  return (
    <div id={anchor || ""} className="flex w-full flex-col gap-y-8">
      {(headline || subheadline) && (
        <div className="mx-auto flex max-w-[825px] flex-col gap-y-3xl">
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
      <Accordion.Root
        disabled={disableCollapse}
        type="single"
        defaultValue={`section-${0}`}
        collapsible
      >
        {mappedSections?.map((section: any, idx: number) => (
          <Accordion.Item
            key={idx}
            value={`section-${idx}`}
            className="group overflow-hidden  border-b border-foreground first-of-type:border-t"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="group text-2xl flex w-full items-center justify-between py-[30px] data-[state=closed]:text-[#818181] md:text-2xl-md">
                <span
                  dangerouslySetInnerHTML={{ __html: section.headline || "" }}
                />
                <div
                  hidden={disableCollapse}
                  className="relative flex size-xl items-center justify-center"
                >
                  {open_icon && (
                    <DirectusImage
                      asset={open_icon}
                      className={cn(
                        "flex justify-center items-center object-contain size-xl",
                        "transition-[transform,opacity,color] text-[#818181] duration-300 ease-in-out absolute inset-0",
                        "[.group[data-state=open]_&]:scale-50 [.group[data-state=open]_&]:opacity-0 [.group[data-state=open]_&]:text-primary",
                      )}
                      fill
                    />
                  )}
                  {close_icon && (
                    <DirectusImage
                      asset={close_icon}
                      className={cn(
                        "flex justify-center items-center size-xl",
                        "transition-[transform,opacity,color] text-[#818181] scale-50 opacity-0 duration-300 ease-in-out absolute  inset-0 ",
                        "[.group[data-state=open]_&]:scale-100 [.group[data-state=open]_&]:opacity-100 [.group[data-state=open]_&]:text-primary",
                      )}
                      fill
                    />
                  )}
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="mt-[-7px] pb-4xl">
                <Table locale={locale} tableID={section?.table?.id} />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
