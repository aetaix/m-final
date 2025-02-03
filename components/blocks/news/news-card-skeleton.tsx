import React from "react";

const NewsCardSkeleton = () => {
  return (
    <div className="flex h-[351px] animate-pulse flex-col justify-between bg-mistral-sunshine-50 p-xl md:min-w-[400px]">
      <div className="flex flex-col gap-y-8">
        <div className="h-[26px] w-1/4 rounded-3xl bg-gray-300" />
        <div className="flex flex-col gap-y-6">
          <div className="h-8 w-3/4 bg-gray-300/50" />
          <div className="h-4 w-full bg-gray-300/50" />
        </div>
      </div>
      <div className="flex items-center justify-between align-bottom">
        <div className="flex flex-col justify-between text-sm">
          <div className="h-4 w-1/2 bg-gray-300/50" />
          <div className="h-4 w-1/3 bg-gray-300/50" />
        </div>
        <div className="h-10 w-24 rounded bg-gray-300/50" />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
