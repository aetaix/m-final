import React from "react";

const FormTwoColumnsSkeleton = () => {
  return (
    <div className="bg-grid-pattern mt-3xl flex animate-pulse flex-col justify-between gap-y-4xl border-b border-r border-[#ECDAA2]/[.5] bg-grid-size-[48px] bg-grid-[#ECDAA2]/[.5] lg:max-h-min lg:flex-row">
      <div className="relative flex w-full flex-col items-center justify-center bg-secondary px-md py-2xl lg:min-w-[630px] lg:max-w-[630px]">
        <div className="flex size-full max-w-[452px] flex-col gap-y-xl">
          <div className="h-8 w-[400px] rounded bg-white/20" />
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="h-8 rounded bg-white/20" />
            <div className="h-8 rounded bg-white/20" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-8 rounded bg-white/20" />
            <div className="h-8 rounded bg-white/20" />
          </div>
          <div className="h-8 w-full rounded bg-white/20" />
          <div className="mt-4 h-10 w-32 rounded bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default FormTwoColumnsSkeleton;
