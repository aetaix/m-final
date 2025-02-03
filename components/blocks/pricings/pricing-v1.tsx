import PricingCurrencyFrequencyDisplay from "./pricing-currency-frequency-display";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_PRICING, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            {
              pricing_id: [
                "*",
                {
                  buttons: [
                    "*",
                    {
                      buttons: [
                        "*",
                        {
                          icon: ["icons_id", { icons_id: ["*"] }],
                          page: ["permalink"],
                          post: ["slug"],
                          translations: ["*"],
                        },
                      ],
                    },
                  ],
                  features: ["*", { pricing_item_id: ["*", { icon: ["*"] }] }],
                  price: ["*"],
                  translations: ["*"],
                },
              ],
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

const PricingV1 = async ({ data: { id }, locale }: any) => {
  const data = await fetchData(id, locale);
  if (!data) return;
  return (
    <div className="container mb-10 flex w-full flex-col gap-8 pb-8 md:mb-0 md:py-8">
      {data?.headline && (
        <h2 className="mb-8 text-[30px]/[34.5px] md:mb-0 md:text-[40px]/[38px]">
          {data.headline}
        </h2>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.items?.map((pricing: any, idx: number) => (
          <div
            key={pricing.pricing_id?.title + idx}
            className="flex flex-1  flex-col justify-between gap-y-xl bg-mistral-beige-deep p-8 py-10"
          >
            <div className="flex flex-col gap-y-xl">
              <div
                dangerouslySetInnerHTML={{
                  __html: pricing.pricing_id?.title || "",
                }}
                className="text-[21px]/[22px] font-medium"
              ></div>
              <PricingCurrencyFrequencyDisplay
                price={pricing.pricing_id?.price}
                terms={pricing.pricing_id?.terms}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: pricing.pricing_id?.description || "",
                }}
                className="text-sm text-[#818181]"
              />
            </div>
            <div className="flex max-h-min flex-col gap-y-3xl justify-self-end">
              <div>
                {pricing.pricing_id?.buttons?.buttons.map(
                  (btn: any, idx: number) => (
                    <ButtonLink key={btn.label + idx} button={btn}>
                      <CButton
                        className="border-0 bg-mistral-black px-3 text-white hover:bg-mistral-black"
                        label={btn.label}
                        icon={btn.icon[0]?.icons_id}
                        btn={btn}
                        iconClassName="text-primary"
                      />
                    </ButtonLink>
                  ),
                )}
              </div>
              <ul className="flex flex-col gap-3">
                {pricing.pricing_id?.features.map(
                  (feature: any, idx: number) => (
                    <li
                      key={feature.pricing_item_id?.name + idx}
                      className="flex items-center gap-x-2 text-sm"
                    >
                      <DirectusImage
                        width={16}
                        height={16}
                        className="object-contain"
                        asset={feature.pricing_item_id?.icon}
                      />
                      {feature.pricing_item_id?.name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingV1;
