"use client";
import React from "react";
import useTableData from "@/hooks/useTableData"; // Adjust the import path as necessary
import { cn } from "@/lib/utils";

interface TableBodyProps {
  children: React.ReactNode;
  caption?: string;
  captionPosition?: "top" | "bottom";
  ariaLabel?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  isHeader?: boolean;
  asCaption: boolean;
}

interface TableCellProps {
  type: "text" | "price";
  content: string;
  isHeader?: boolean;
  colSpan: number;
  rowSpan: number;
  colSpanFull: boolean;
  fontSize: "sm" | "base";
  firstRowAfterHeaderTd?: boolean;
  dollar?: number;
  euro?: number;
  currency?: "dollar" | "euro" | undefined;
}

const TableBody: React.FC<TableBodyProps> = ({
  children,
  caption,
  captionPosition,
  ariaLabel = "Data table",
}) => (
  <div className="overflow-x-auto" role="region" aria-label={ariaLabel}>
    <table className="w-full border-separate border-spacing-0 border-spacing-y-[19px]">
      {captionPosition === "top" && caption && (
        <caption
          className="mb-2 caption-top text-sm"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
      {children}
      {captionPosition === "bottom" && caption && (
        <caption
          className="mt-2 caption-bottom text-left text-sm"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </table>
  </div>
);

const TableRow: React.FC<TableRowProps> = ({
  children,
  isHeader,
  asCaption,
}) => (
  <tr
    className={cn(
      "text-left group border-foreground border-t last-of-type:border-b",
      {
        "!bg-background": isHeader,
        "full-span peer !bg-background": asCaption,
      },
      "[&:not(.full-span)]:odd:bg-secondary [&:not(.full-span)]:even:bg-background",
      "peer-odd:odd:bg-background peer-odd:even:bg-secondary peer-even:odd:bg-secondary peer-even:even:bg-background",
    )}
  >
    {children}
  </tr>
);

const TableCell: React.FC<TableCellProps> = ({
  type,
  content,
  isHeader,
  colSpan,
  rowSpan,
  fontSize,
  colSpanFull,
  firstRowAfterHeaderTd,
  dollar,
  euro,
  currency,
}) => {
  const Component = isHeader ? "th" : "td";
  return (
    <Component
      className={cn(
        "min-w-[216px] tracking-[-0.0002em] p-5 font-normal align-top",
        {
          "!text-nowrap": isHeader,
          "text-sm": fontSize === "sm",
          "text-base": fontSize !== "sm",
          "p-0 py-[20px]": colSpanFull,
          "border-t border-foreground": firstRowAfterHeaderTd,
        },
      )}
      {...(isHeader && { scope: "col" })}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {type === "text" && (
        <div
          className={cn("wysiwyg")}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      )}
      {type === "price" && (
        <div className="flex items-center">
          {currency === "dollar" && (
            <>
              <span className="mr-1 ">$</span>
              <span className="">{dollar}</span>
            </>
          )}
          {currency === "euro" && (
            <>
              <span className="mr-1 ">€</span>
              <span className="">{euro}</span>
            </>
          )}
        </div>
      )}
    </Component>
  );
};

const Table: React.FC<{ tableID: number; locale: string }> = ({
  tableID,
  locale,
}) => {
  const { data, error } = useTableData(tableID, locale);

  const [currency, setCurrency] = React.useState("dollar") as any;

  const memoizedData = React.useMemo(() => data, [data]);

  if (error) return <div>Error loading table data</div>;
  if (!memoizedData) return <div className="h-screen"></div>;

  const {
    headline,
    caption_position,
    caption,
    has_header,
    rows,
  }: {
    headline: string;
    caption_position: "top" | "bottom" | undefined;
    caption: string;
    has_header: boolean;
    rows: any[];
  } = memoizedData;

  const mappedRows: any[] = rows.flatMap((row: any) => row.block_table_row_id);
  const headerRow = has_header ? mappedRows[0] : null;
  const bodyRows = has_header ? mappedRows.slice(1) : mappedRows;

  const isPricingTable = bodyRows.some((row: any) =>
    row.cells.some((cell: any) => cell.type === "price"),
  );

  return (
    <>
      {isPricingTable && (
        <div className="my-4">
          <button
            className="relative flex w-full border border-black md:w-fit"
            onClick={() =>
              setCurrency(currency === "dollar" ? "euro" : "dollar")
            }
          >
            <div
              className={`absolute inset-y-0 left-0 w-1/2 bg-black transition-transform ${currency === "dollar" ? "" : "translate-x-full"}`}
            ></div>
            <div
              className={`relative w-full p-4 md:w-40 ${currency === "dollar" ? " text-white" : "text-black"}`}
            >
              Dollar ($)
            </div>
            <div
              className={`relative w-full p-4 md:w-40 ${currency != "dollar" ? " text-white" : "text-black"}`}
            >
              Euro (€)
            </div>
          </button>
        </div>
      )}
      <div className="w-full animate-fadeInUp">
        {headline && (
          <h4
            className="heading-3 mb-4"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          />
        )}
        <TableBody caption={caption} captionPosition={caption_position}>
          {has_header && (
            <thead>
              <TableRow isHeader asCaption={headerRow?.as_caption}>
                {headerRow?.cells?.map(
                  (
                    {
                      type,
                      content,
                      display,
                      rowspan,
                      colspan,
                      font_size,
                    }: any,
                    cellIndex: number,
                  ) =>
                    display && (
                      <TableCell
                        type={type}
                        colSpanFull={headerRow?.as_caption && cellIndex === 0}
                        key={`header-cell-${cellIndex}`}
                        content={content}
                        rowSpan={rowspan}
                        colSpan={colspan}
                        isHeader
                        fontSize={font_size}
                      />
                    ),
                )}
              </TableRow>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`} asCaption={row?.as_caption}>
                {row.cells.map(
                  (
                    {
                      type,
                      content,
                      display,
                      rowspan,
                      colspan,
                      font_size,
                      dollar,
                      euro,
                    }: any,
                    cellIndex: number,
                  ) =>
                    display && (
                      <TableCell
                        type={type}
                        key={`cell-${rowIndex}-${cellIndex}`}
                        content={content}
                        rowSpan={rowspan}
                        colSpan={colspan}
                        fontSize={font_size}
                        colSpanFull={row.as_caption && cellIndex === 0}
                        firstRowAfterHeaderTd={rowIndex === 0 && has_header}
                        dollar={dollar}
                        euro={euro}
                        currency={currency}
                      />
                    ),
                )}
              </TableRow>
            ))}
          </tbody>
        </TableBody>
      </div>
    </>
  );
};

export { Table, TableBody, TableCell, TableRow };
