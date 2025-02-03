import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";

export default function MobileView({ items }: any) {
  return (
    <div className="grid flex-1 grid-flow-row gap-y-xl md:hidden">
      {items.map((item: any, index: number) => (
        <div
          key={`v-props-scrolling-${items.id}-${index}`}
          className="container bg-grid-pattern flex flex-col gap-4xl border-b border-r border-[#E2D19D]/[.5] px-[20px] py-2xl-2 bg-grid-size-[38.8px_40.1px] bg-grid-[#E2D19D]/[.5]"
        >
          <div className="flex flex-1 flex-col justify-between gap-y-5xl">
            <div className="flex flex-col gap-y-[26px]">
              <div
                className="text-[30px]/[34px]"
                dangerouslySetInnerHTML={{ __html: item.headline }}
              />
              <div
                className="text-[#3C3C3C]"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
            {item.button && (
              <ButtonLink button={item.button}>
                <CButton
                  className="max-w-min text-sm text-mistral-black-tint"
                  iconClassName="text-primary"
                  btn={item.button}
                />
              </ButtonLink>
            )}
          </div>
          <div className="relative mx-auto aspect-square size-full max-h-[319px] max-w-[319px] shrink-0 lg:flex-1">
            {item?.image && (
              <DirectusImageClient
                blur
                key={index}
                fill
                className="aspect-square object-contain"
                asset={item.image}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
