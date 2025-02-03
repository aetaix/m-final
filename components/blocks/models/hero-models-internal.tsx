import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { directusAssets } from "@/lib/image";
import Image from "next/image";
import { HeroInternalProps } from "./types";

const Sizes = Object.freeze({
  STANDARD: "standard",
  COMPACT: "compact",
});

export default function HeroInternal({ data }: HeroInternalProps) {
  const {
    background_media,
    background_image,
    background_video_url,
    background_color,
    media_position,
    image,
    headline,
    subheadline,
    button_group,
    size,
    name,
  } = data;

  return (
    <>
      {size === Sizes.STANDARD ? (
        <div
          className={`relative mb-24 mt-6 pb-14 pt-[100px] md:space-y-6 xl:mt-[123px] xl:space-y-[67px]`}
          style={{
            backgroundColor: background_color?.value || "transparent",
          }}
        >
          {/* Background Media */}
          {background_media === "image" && background_image && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${directusAssets(background_image)})`,
              }}
            ></div>
          )}

          {background_media === "video" && background_video_url && (
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={background_video_url} type="video/mp4" />
            </video>
          )}

          <div className="container relative mx-auto flex flex-col gap-10 px-4 lg:px-0">
            <div
              className={`flex flex-wrap ${
                media_position === "right" ? "flex-row" : "flex-row-reverse"
              } items-center justify-between gap-10 pb-8`}
            >
              {/* Headline and Subheadline */}
              <div className="max-w-[535px] text-center xl:text-left">
                <h1
                  className="mb-10 text-[40px]/[42px] font-normal text-foreground xl:text-[66px]/[66px]"
                  dangerouslySetInnerHTML={{ __html: headline }}
                />
                <p
                  className="mb-[37px] max-w-[336px] text-base text-gray-500"
                  dangerouslySetInnerHTML={{ __html: subheadline }}
                />

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-[30px] xl:justify-start">
                  {button_group?.buttons
                    ?.filter((button) => button.visible)
                    ?.map((button, idx) => (
                      <ButtonLink
                        key={button.label + idx}
                        button={button}
                        className="md:min-w-fit"
                      >
                        <CButton
                          btn={button}
                          className="h-[44px] w-fit justify-between px-0 text-black"
                          label={button.label}
                          icon={button?.icon[0]?.icons_id}
                        />
                      </ButtonLink>
                    ))}
                </div>
              </div>

              {/* Placeholder for Additional Media */}
              {image && (
                <div className="relative flex w-fit items-center justify-center pb-6 xl:pb-8">
                  <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern absolute top-1/2 z-0 h-[112%] w-full -translate-y-1/2 xl:left-[10%] xl:h-[115%]" />
                  <Image
                    src={directusAssets(image)}
                    alt={name!}
                    width={500}
                    height={500}
                    className="relative z-10 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mt-[123px] flex items-center justify-center pb-[53px] xl:pb-0">
          <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern absolute inset-0 xl:size-full" />
          <div className="container relative z-10 mx-auto mt-2xl text-center md:pb-[50px] md:pt-[30px]">
            <h1
              className="heading-1 mb-10 text-foreground"
              dangerouslySetInnerHTML={{ __html: headline || "" }}
            />
            <div
              className="text-2xl mb-10 text-foreground"
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
            />
            <div className="flex w-full flex-wrap items-center justify-center gap-x-2xl gap-y-md">
              {button_group?.buttons?.map((cta: any, idx: number) => (
                <ButtonLink
                  key={cta?.label + idx}
                  button={cta}
                  className="min-w-min"
                >
                  <CButton
                    className="h-[44px] justify-between xl:min-w-full"
                    label={cta?.label}
                    icon={cta?.icon[0]?.icons_id}
                    btn={cta}
                  />
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
