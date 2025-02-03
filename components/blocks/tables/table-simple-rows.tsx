import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { Icon } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

const fetchTableSimpleRowsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_TABLE_SIMPLE_ROWS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          button: [
            "*",
            {
              translations: ["*"],
              page: ["permalink"],
              post: ["slug"],
              icon: ["icons_id", { icons_id: ["*"] }],
            },
          ],
          table: [
            "*",
            {
              translations: ["*"],
              header_icon: ["*"],
              titles_icon: ["*"],
              rows: [
                "table_simple_rows_rows_id",
                {
                  table_simple_rows_rows_id: [
                    "*",
                    {
                      translations: ["*"],
                      items: [
                        "*",
                        {
                          translations: ["*"],
                        },
                      ],
                    },
                  ],
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

export default async function TableSimpleRows({ data: { id }, locale }: any) {
  const data = await fetchTableSimpleRowsData(id, locale);
  if (!data) return;
  const { anchor, headline, subheadline, button, table } = data;
  return (
    <div
      id={anchor || ""}
      className="container flex flex-col gap-y-3xl md:gap-y-2xl lg:gap-y-3xl"
    >
      <div className="mx-auto flex  max-w-[824px] flex-col items-center gap-y-xl bg-transparent md:gap-y-2xl lg:gap-y-3xl">
        {headline && (
          <h3
            className="heading-3-img heading-3 px-2 text-center md:px-0"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {subheadline && (
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
        {button && (
          <ButtonLink button={button}>
            <CButton
              className="max-w-min text-sm text-[#3C3C3C] md:gap-x-7 md:text-base"
              iconClassName="text-primary"
              btn={button}
            />
          </ButtonLink>
        )}
      </div>
      <Table data={table} />
    </div>
  );
}

const paletteColors = ["#FFAD2E", "#FFB83E", "#FFC452"];

function Table({ data }: any) {
  if (!data) return;
  const { headline, header_icon, titles_icon, rows, has_featured_header } =
    data;
  const parsedRows = rows?.map((item: any) => item?.table_simple_rows_rows_id);
  return (
    <div className="overflow-hidden bg-secondary">
      {has_featured_header && (
        <TableHead headline={headline} headerIcon={header_icon} />
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <tbody>
            {parsedRows.map((row: any, idx: number) => (
              <TableRow
                key={idx}
                position={idx}
                data={row}
                titleIcon={titles_icon}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type TableHeadProps = {
  headline: string;
  headerIcon: Icon;
};

function TableHead({ headline, headerIcon }: TableHeadProps) {
  return (
    <div className="flex items-center justify-between px-md py-xl md:p-[20px] lg:py-xl">
      <div dangerouslySetInnerHTML={{ __html: headline || "" }} />
      {headerIcon && (
        <div className="relative flex size-md items-center justify-center text-[#FF8205]">
          <DirectusImage
            fill
            asset={headerIcon}
            className="flex size-md translate-x-1/2 items-center justify-center object-contain"
          />
        </div>
      )}
    </div>
  );
}

type TableRowProps = {
  titleIcon: Icon;
  position: number;
  data: {
    id: number;
    name: string;
    variant: "bullets" | "standard";
    items: { name: string; content: string }[];
    title: string;
  };
};

function TableRow({
  titleIcon,
  position,
  data: { title, items, variant },
}: TableRowProps) {
  const background = paletteColors[position % paletteColors.length];
  return (
    <tr
      style={{ background }}
      className="flex flex-col gap-y-[30px] px-md py-3xl lg:table-row lg:px-[35px]"
    >
      <td className="lg:py-[52px] lg:pl-2xl">
        <div className="flex items-center justify-between gap-md whitespace-nowrap ">
          <div dangerouslySetInnerHTML={{ __html: title || "" }} />
          {titleIcon && (
            <div className="relative flex size-md items-center justify-center">
              <DirectusImage
                fill
                asset={titleIcon}
                className="flex size-md items-center justify-center object-contain"
              />
            </div>
          )}
        </div>
      </td>
      <td className="lg:py-[52px] lg:pl-32 xl:pr-2xl">
        <div className="flex flex-wrap gap-[10px] lg:flex-nowrap lg:gap-x-[10px]">
          {items.map((item, idx) => (
            <TableRowItem key={idx} variant={variant} content={item?.content} />
          ))}
        </div>
      </td>
    </tr>
  );
}

type TableRowItemProps = {
  variant: TableRowProps["data"]["variant"];
  content: string;
};

function TableRowItem({ variant, content }: TableRowItemProps) {
  if (!content) return;
  if (variant === "bullets")
    return (
      <div
        className="flex h-auto items-center text-wrap bg-[#FFF0C3] px-2 py-1 text-sm text-black md:h-[38px] md:text-nowrap md:rounded-none md:px-3 md:py-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  return (
    <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
