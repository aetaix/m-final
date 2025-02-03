import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { readItems } from "@directus/sdk";

const fetchButtonsGroupData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_BUTTON_GROUP, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          buttons: [
            "*",
            {
              translations: ["*"],
              page: ["permalink"],
              post: ["slug"],
              icon: ["icons_id", { icons_id: ["*"] }],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function ButtonsGroup({ data: { id }, locale }: any) {
  const data = await fetchButtonsGroupData(id, locale);
  if (!data) return;
  const isCentered = data?.layout === "centered";
  return (
    <div
      id={data?.anchor || ""}
      className={cn(
        "flex container flex-wrap justify-center items-center gap-9 gap-y-4",
        {
          "justify-center": isCentered,
        },
      )}
    >
      {data?.buttons?.map((ctaBtn: any, idx: number) => (
        <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
          <CButton
            btn={ctaBtn}
            label={ctaBtn?.label}
            icon={ctaBtn?.icon[0]?.icons_id}
            iconClassName="text-primary"
            className="text-[#3C3C3C] md:gap-x-[28px]"
          />
        </ButtonLink>
      ))}
    </div>
  );
}
