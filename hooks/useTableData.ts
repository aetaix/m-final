import { useEffect, useState } from "react";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const useTableData = (tableID: number, locale: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null) as any;
  const { directus } = useDirectus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await directus.request(
          readItems("block_table", {
            filter: { id: { _eq: tableID } },
            fields: [
              "*",
              {
                translations: ["*"],
                rows: [
                  "block_table_row_id",
                  {
                    block_table_row_id: [
                      "*",
                      {
                        translations: ["*"],
                        cells: ["*", { translations: ["*"] }],
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        );
        const translatedData = applyTranslations(response, locale);
        setData(translatedData[0]);
      } catch (error) {
        console.error("Error fetching table data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [tableID, locale, directus]);

  return { data, error };
};

export default useTableData;
