"use client";
import { PricingOptionPrice } from "@/types/directus-schema";
import React from "react";

const PricingCurrencyFrequencyDisplay = ({
  price,
  terms,
}: {
  price: PricingOptionPrice;
  terms: boolean;
}) => {
  function formatCurrency(currency: string) {
    switch (currency) {
      case "dollar":
        return "$";
      case "euro":
        return "€";
    }
  }
  return (
    <div className="flex items-end gap-2">
      <p className="text-[44px]/[46px]">
        {formatCurrency(price?.currency)}
        {price?.amount}
      </p>
      <span className="inline-block text-sm">{"/ " + price?.frequency}</span>
      {terms && <span className="text-[20px] text-mistral-orange">*</span>}
    </div>
  );
};

export default PricingCurrencyFrequencyDisplay;
