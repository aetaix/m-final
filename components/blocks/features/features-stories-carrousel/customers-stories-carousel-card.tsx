"use client";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { CarouselItem } from "@/components/ui/carousel";

const CustomerStoriesCarouselCard = ({
  card,
  idx,
  buttonIcon,
  buttonLabel,
}: {
  card: any;
  idx: number;
  buttonIcon: any;
  buttonLabel: any;
}) => {
  return (
    <CarouselItem
      key={"content" + idx}
      className="flex min-h-[356px] max-w-[86%] flex-col gap-y-3xl bg-[#FFF0C3] px-[20px] py-3xl md:p-2xl lg:pr-[94px]"
    >
      <div className="flex flex-1 flex-col justify-between gap-y-3xl md:flex-row md:gap-x-[80px] lg:gap-x-[144px]">
        <div
          className="subtitle max-w-[508px]"
          dangerouslySetInnerHTML={{ __html: card.headline || "" }}
        />
        <div
          className="md:max-w-[322px]"
          dangerouslySetInnerHTML={{ __html: card.description || "" }}
        />
      </div>
      <div className="md: flex flex-col justify-between gap-y-3xl md:flex-row-reverse  md:gap-x-[144px]">
        <div className="relative h-[39px] w-full max-w-[322px]">
          <DirectusImageClient
            fill
            asset={card?.logo}
            className="object-contain object-left"
          />
        </div>
        <ButtonLink
          target={card?.openInNewTab ? "_blank" : "_self"}
          href={card?.externalLink || card?.customer_story_page?.permalink}
        >
          <CButton
            icon={buttonIcon}
            className="text-[17px]"
            label={buttonLabel}
          />
        </ButtonLink>
      </div>
    </CarouselItem>
  );
};

export default CustomerStoriesCarouselCard;
