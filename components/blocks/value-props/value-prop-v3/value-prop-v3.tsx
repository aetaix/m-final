"use client";

import DirectusImageClient from "@/components/shared/directus-image-client";

const ValuePropsV3Component = ({ data }: { data: any }) => {
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container w-full"
    >
      <div className="mb-8 flex flex-col gap-8 gap-x-10 lg:mb-16">
        {data?.headline ? (
          <h3
            className="font-normal! no-img-margin heading-3 max-w-[349px] text-[30px]/[34.5px] sm:max-w-xl md:max-w-2xl md:text-5xl"
            dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
          ></h3>
        ) : null}
        {data?.subheadline ? (
          <div
            dangerouslySetInnerHTML={{ __html: data?.subheadline || "" }}
            className="max-w-[895px] text-base text-[#3C3C3C]"
          ></div>
        ) : null}

        <div className="mt-2 grid w-full gap-6 gap-y-12 md:grid-cols-2">
          {data?.propositions.map((proposition: any) => (
            <div
              key={proposition.id}
              className="relative pt-[51px] lg:pl-[101px]"
            >
              <div className="bg-grid-secondary bg-grid-pattern absolute inset-0 -z-10 border-b border-r border-secondary lg:w-[calc(100%_-_100px)]"></div>
              <div className="flex h-full flex-col justify-between overflow-hidden bg-mistral-beige-deep p-2 pb-0 md:p-6 md:pb-0">
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {proposition.options.map((option: any, index: number) => (
                    <div
                      key={option.title + index}
                      className="flex items-center gap-4 bg-background p-2 md:gap-8"
                    >
                      <span className="text-[12px]/[19.2px] md:text-sm">
                        {option.title}
                      </span>
                      <DirectusImageClient
                        width={16}
                        height={16}
                        className="origin-center object-contain"
                        asset={option.icon[0]?.icons_id}
                      />
                    </div>
                  ))}
                </div>
                <div className="relative -mb-10 mt-7 aspect-square w-full sm:-mb-24 md:mb-[-179px]">
                  <DirectusImageClient
                    fill
                    className="size-full rounded-t-[8px] object-contain object-top"
                    asset={proposition.image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuePropsV3Component;
