import React from "react";

const SuccessMsg = ({ data }: any) => {
  const { form_success_headline, form_success_subheadline } = data;
  return (
    <div className="container">
      <div className="relative mb-8 mt-[80px] flex flex-col gap-y-8 md:gap-y-[82px] lg:mt-[123px]">
        <div className="bg-grid-pattern absolute z-[-80] max-h-[568px] w-full border-r border-[rgb(255,240,195)] bg-grid-size-[50.6px_50.6px] bg-grid-[rgb(255,240,195)] md:max-h-[708px]" />
        <div className="container flex max-w-[823px] flex-col gap-y-2xl py-24 pt-[71px] text-center md:gap-y-2xl-2">
          {form_success_headline && (
            <h2
              className="heading-2 md:text-[72px]/[72px]"
              dangerouslySetInnerHTML={{ __html: form_success_headline }}
            />
          )}
          {form_success_subheadline && (
            <div
              className="text-xl md:text-[20px]/[27px]"
              dangerouslySetInnerHTML={{ __html: form_success_subheadline }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessMsg;
