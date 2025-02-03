"use client";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import VideoComponent from "@/components/video-component";
import { cn } from "@/lib/utils";

const FeaturesTwoColumnsListItem = ({ item }: { item: any }) => {
  return (
    <div className="w-full overflow-x-hidden md:px-10 md:py-14">
      <div
        className={cn(
          "flex max-w-7xl flex-col gap-y-20 gap-x-12",
          item.media_side === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
        )}
      >
        <div className="flex flex-1 flex-col gap-10">
          <h2
            className="font-normal! max-w-xl text-[30px]/[34.5px] lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: item?.headline || "" }}
          ></h2>
          {item?.subheadline ? (
            <div
              dangerouslySetInnerHTML={{ __html: item?.subheadline || "" }}
              className="wysiwyg-formatting max-w-lg text-base"
            ></div>
          ) : null}
          <div className="flex flex-col gap-[10px]">
            {item?.items?.length &&
              item?.items?.map((card: any, index: number) => (
                <div
                  key={card?.rich_text_id?.name + index}
                  className="flex w-fit items-center gap-10 bg-mistral-beige-deep p-3 sm:h-[44px] sm:py-0"
                >
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: card?.rich_text_id?.content || "",
                    }}
                  ></div>
                  {card?.rich_text_id?.icon ? (
                    <DirectusImageClient
                      width={16}
                      height={16}
                      className="origin-center object-contain"
                      asset={card?.rich_text_id?.icon}
                    />
                  ) : null}
                </div>
              ))}

            {item?.button ? (
              <div className="mt-6">
                <ButtonLink keybutton={item?.button}>
                  <CButton
                    className="border-0 bg-mistral-black px-3 text-white hover:bg-mistral-black"
                    label={item?.button?.label}
                    icon={item?.button?.icon[0]?.icons_id}
                    btn={item?.button}
                  />
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
        {item?.media_type === "image" && (
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="relative aspect-video size-full max-h-[434px] w-full min-w-[498px] max-w-2xl lg:aspect-square lg:min-w-[320px]">
              <DirectusImageClient
                fill
                className="origin-center object-contain"
                asset={item?.image}
              />
            </div>
          </div>
        )}
        {item?.media_type === "video" && (
          <div className="flex aspect-video w-full max-w-lg flex-1 items-center justify-center lg:max-w-none">
            <VideoComponent
              className="aspect-video w-full"
              src={item?.video_url}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesTwoColumnsListItem;
