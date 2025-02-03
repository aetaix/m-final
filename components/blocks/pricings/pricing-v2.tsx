"use client";
// components/Pricing.tsx
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import React, { useEffect, useState } from "react";
import PricingCurrencyFrequencyDisplay from "./pricing-currency-frequency-display";
import { fetchData } from "./server";

interface PricingProps {
  data: { id: number; anchor: string };
  locale: string;
}

const Pricing: React.FC<PricingProps> = ({ data: { id, anchor }, locale }) => {
  const [currency, setCurrency] = useState("dollar");
  const [data, setData] = useState(null) as any;

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData(id, locale);
      setData(fetchedData);
    };
    getData();
  }, [id, locale]);

  if (!data) return <div></div>;

  return (
    <div
      id={anchor || ""}
      className="container mb-10 w-full space-y-8 pb-8 md:mb-0 md:py-8"
    >
      <div className="mb-8 flex flex-col items-center justify-between gap-8 md:mb-0 md:flex-row">
        <h2 className="text-[30px]/[34.5px] md:text-[40px]/[38px]">
          {data.headline}
        </h2>
        <button
          className="relative flex w-full border border-black md:w-fit"
          onClick={() => setCurrency(currency === "dollar" ? "euro" : "dollar")}
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
      <div className="flex flex-wrap gap-8 md:flex-nowrap">
        {data.items.map((pricing: any, idx: number) => {
          return (
            <div
              key={pricing.pricing_id?.title + idx}
              className="flex flex-1 flex-col  gap-y-xl bg-mistral-beige-deep p-8 py-10"
            >
              <div className="flex flex-col gap-y-xl">
                <div
                  dangerouslySetInnerHTML={{
                    __html: pricing.pricing_id?.title || "",
                  }}
                  className="text-[21px]/[22px] font-medium"
                ></div>

                {pricing.pricing_id?.pricing_type === "number" ? (
                  <PricingCurrencyFrequencyDisplay
                    price={pricing.pricing_id?.prices.find(
                      (price: any) => price.currency === currency,
                    )}
                    terms={pricing.pricing_id?.special_term_toggle}
                  />
                ) : pricing.pricing_id?.pricing_type === "text" ? (
                  <p className="text-[44px]/[46px]">
                    {pricing.pricing_id?.custom_text}
                  </p>
                ) : null}

                <div
                  dangerouslySetInnerHTML={{
                    __html: pricing.pricing_id?.description || "",
                  }}
                  className="min-h-20 text-sm text-[#818181]"
                ></div>
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
                        className="flex items-start gap-x-2 text-sm"
                      >
                        <DirectusImage
                          width={16}
                          height={16}
                          className="mt-[5px] shrink-0 object-contain"
                          asset={feature.pricing_item_id?.icon}
                        />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: feature.pricing_item_id?.content || "",
                          }}
                        ></div>
                      </li>
                    ),
                  )}
                </ul>

                {pricing.pricing_id?.special_term_toggle && (
                  <p className="text-sm italic">
                    <span className="mr-1 text-[20px] text-mistral-orange">
                      *
                    </span>
                    {pricing.pricing_id.special_terms}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
