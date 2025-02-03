import React from "react";

const HeroSection = ({ data, anchor }: any) => {
  const { headline, subheadline } = data;
  return (
    <div
      id={anchor || ""}
      className="relative mb-8 mt-[80px] flex flex-col gap-y-8 md:gap-y-[82px] lg:mt-[123px]"
    >
      <div className="bg-grid-pattern absolute z-[-80] max-h-[833px] w-full bg-grid-size-[49px_49px] bg-grid-[#FFF0C3] md:hidden md:max-h-full" />

      <div className="container relative flex flex-col gap-y-2xl py-8 pb-14 text-center md:gap-y-2xl-2 md:pb-0 md:pt-[71px]">
        {headline && (
          <h2
            className="heading-2 md:text-[72px]/[72px]"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        )}
        {subheadline && (
          <div
            className="text-xl md:text-[20px]/[27px]"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
