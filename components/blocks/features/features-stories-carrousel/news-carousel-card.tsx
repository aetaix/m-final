"use client";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { CarouselItem } from "@/components/ui/carousel";
import { NEWS_PREFIX } from "@/constants/enum";
import { formatLocalizedDate } from "@/lib/date";

const NewsCarouselCard = ({
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
      <div className="flex h-full flex-col gap-x-16 gap-y-20 md:grid md:grid-cols-2 xl:gap-x-36">
        <div className="flex flex-col gap-y-8 md:justify-between">
          <div
            className="subtitle max-w-[508px]"
            dangerouslySetInnerHTML={{ __html: card?.title || "" }}
          />
          <div
            className="md:hidden md:max-w-[322px]"
            dangerouslySetInnerHTML={{ __html: card?.description || "" }}
          />
          <ButtonLink
            className="hidden md:inline"
            href={card?.externalLink || `/${NEWS_PREFIX}/${card?.slug}`}
          >
            <CButton
              icon={buttonIcon}
              className="text-[17px]"
              label={buttonLabel}
            />
          </ButtonLink>
        </div>
        <div className="flex flex-1 flex-col-reverse justify-start gap-y-9 md:flex-col md:justify-between xl:ml-[90px]">
          <div
            className="hidden md:block md:max-w-[322px]"
            dangerouslySetInnerHTML={{ __html: card.description || "" }}
          />
          <ButtonLink
            target={card?.openInNewTab ? "_blank" : "_self"}
            className="md:hidden"
            href={card?.externalLink || `/${NEWS_PREFIX}/${card?.slug}`}
          >
            <CButton
              icon={buttonIcon}
              className="text-[17px]"
              label={buttonLabel}
            />
          </ButtonLink>
          <div className="flex flex-col gap-y-4">
            {card?.category && (
              <span
                className=" h-[26px] w-fit rounded-3xl border border-mistral-black px-4 text-sm text-mistral-black"
                dangerouslySetInnerHTML={{
                  __html: card?.category?.name,
                }}
              />
            )}
            <div className="flex flex-col text-sm">
              {card?.date?.length && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatLocalizedDate(card?.date),
                  }}
                />
              )}
              {card?.author?.length && (
                <span
                  dangerouslySetInnerHTML={{ __html: card?.author || "" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default NewsCarouselCard;
