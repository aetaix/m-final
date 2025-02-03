import React from "react";

const FormContactSkeleton = () => {
  return (
    <div className="container animate-pulse ">
      <div className="mb-8 mt-[80px] h-[200px] w-full rounded bg-mistral-sunshine-50/50 lg:mt-[123px]"></div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="mb-4 h-[400px] w-full rounded bg-mistral-sunshine-50/50 md:w-1/4"></div>
        <div className="mb-4 h-[400px] w-full rounded bg-mistral-sunshine-50/50 md:w-3/4"></div>
      </div>
    </div>
  );
};

export default FormContactSkeleton;
