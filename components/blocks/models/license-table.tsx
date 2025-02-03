"use client";

import { directusAssets } from "@/lib/image";
import React, { useState } from "react";

interface Cell {
  display: boolean;
  name: string;
  content?: string;
  icon_is_check_icon: boolean;
  prepend_icon?: {
    id: number;
    name: string;
    image?: string;
    svg?: string;
  };
}

interface Row {
  block_table_row_id: {
    id: number;
    name: string;
    cells: Cell[];
  };
}

interface LicenseTableProps {
  data: {
    anchor: string;
    headline: string;
    rows: Row[];
  };
}

export default function LicenseTable({ data }: LicenseTableProps) {
  const { anchor } = data;
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const handleMouseEnter = (colIndex: number) => setHoveredCol(colIndex);
  const handleMouseLeave = () => setHoveredCol(null);

  const headerRow =
    data.rows.length > 0 && data.rows[0].block_table_row_id
      ? data.rows[0]
      : null;

  const tableRows = data.rows.length > 1 ? data.rows.slice(1) : [];

  return (
    <div id={anchor || ""} className="license-table container">
      <h1
        className="heading-3 mb-[88px] text-foreground"
        dangerouslySetInnerHTML={{ __html: data.headline || "" }}
      />
      <div className="overflow-x-auto">
        {/* Responsive Table */}
        <table className="w-full table-auto border-collapse text-left md:table-fixed">
          {/* Define column widths for desktop */}
          <colgroup>
            <col className="w-auto md:w-[180px]" />
            {headerRow?.block_table_row_id.cells
              .slice(1)
              .map((_, index) => (
                <col key={index} className="w-auto md:w-[170px]" />
              ))}
          </colgroup>

          {/* Header */}
          <thead>
            <tr>
              {headerRow?.block_table_row_id.cells.map((cell, index) => (
                <th
                  key={index}
                  className={`border-black px-4 py-[15px] text-base/[13.6px] font-normal text-foreground ${
                    index === 0 ? "border-b" : "border"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cell.content || "",
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tableRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  !(rowIndex === tableRows.length - 1) &&
                  "border-b border-black"
                }`}
              >
                {row.block_table_row_id.cells.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 pb-[63px] pt-5 text-sm/[14.7px] font-normal text-foreground ${
                      hoveredCol === colIndex ? "bg-mistral-beige-deep" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(colIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex w-full items-start gap-10">
                      {cell.prepend_icon ? (
                        <img
                          src={directusAssets(cell.prepend_icon.image)}
                          alt={cell.prepend_icon.name}
                          className="inline-block size-[25px]"
                        />
                      ) : (
                        ""
                      )}
                      {cell.display && (
                        <div
                          className={`${
                            colIndex !== 0
                              ? "max-w-none md:max-w-[169px]"
                              : "min-w-[156px] max-w-none md:max-w-[245px]"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: cell.content || "",
                          }}
                        />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
