"use client";

import DirectusImageClient from "@/components/shared/directus-image-client";
import { Button } from "@/components/ui/button";
import { CarouselContent, useCarousel } from "@/components/ui/carousel";
import { FeaturesCollectionCarouselType } from "@/constants/enum";

import { Fragment, useCallback, useState } from "react";
import CustomerStoriesCarouselCard from "./customers-stories-carousel-card";
import NewsCarouselCard from "./news-carousel-card";

export default function FeaturesCollectionCarouselCards({
  headline,
  cards,
  prevIcon,
  nextIcon,
  buttonLabel,
  buttonIcon,
}: any) {
  const { scrollPrev, scrollNext, canScrollNext, canScrollPrev } =
    useCarousel();
  const [_, setCurrent] = useState(0);

  const goToPrev = useCallback(() => {
    if (canScrollPrev) {
      setCurrent((prev) => prev - 1);
      scrollPrev();
    }
  }, [canScrollPrev, scrollPrev]);

  const goToNext = useCallback(() => {
    if (canScrollNext) {
      setCurrent((prev) => prev + 1);
      scrollNext();
    }
  }, [canScrollNext, scrollNext]);

  return (
    <div className="container relative flex flex-col gap-y-3xl">
      <div className="flex items-center justify-between ">
        <div
          className="heading-3"
          dangerouslySetInnerHTML={{ __html: headline || "" }}
        />
        <div className="hidden gap-x-2 md:flex">
          <Button
            variant="ghost"
            disabled={!canScrollPrev}
            size="icon"
            className="relative flex size-[26.4px] items-center justify-center bg-[#1E1E1E] text-background hover:bg-[#3C3C3C]"
            onClick={goToPrev}
          >
            <DirectusImageClient
              fill
              className="flex size-[26.4px] items-center justify-center object-contain p-1"
              asset={prevIcon}
            />
          </Button>
          <Button
            disabled={!canScrollNext}
            variant="ghost"
            size="icon"
            className="relative flex size-[26.4px] items-center justify-center bg-[#1E1E1E] text-background hover:bg-[#3C3C3C]"
            onClick={goToNext}
          >
            <DirectusImageClient
              fill
              className="flex size-[26.4px] items-center justify-center object-contain p-1"
              asset={nextIcon}
            />
          </Button>
        </div>
      </div>
      <CarouselContent className="ml-0 gap-md md:gap-x-xl">
        {cards.map((card: any, idx: number) => (
          <Fragment key={idx}>
            {card.collection_type === FeaturesCollectionCarouselType.NEWS ? (
              <NewsCarouselCard
                card={card}
                idx={idx}
                buttonIcon={buttonIcon}
                buttonLabel={buttonLabel}
              />
            ) : null}
            {card.collection_type ===
            FeaturesCollectionCarouselType.CUSTOMERS_STORIES ? (
              <CustomerStoriesCarouselCard
                card={card}
                idx={idx}
                buttonIcon={buttonIcon}
                buttonLabel={buttonLabel}
              />
            ) : null}
          </Fragment>
        ))}
      </CarouselContent>
      <div className="flex gap-x-2 md:hidden">
        <Button
          variant="ghost"
          disabled={!canScrollPrev}
          size="icon"
          className="relative flex size-[26.4px] items-center justify-center bg-[#1E1E1E] text-background hover:bg-[#3C3C3C]"
          onClick={goToPrev}
        >
          <DirectusImageClient
            fill
            className="flex size-[26.4px] items-center justify-center object-contain p-1"
            asset={prevIcon}
          />
        </Button>
        <Button
          variant="ghost"
          disabled={!canScrollNext}
          size="icon"
          className="relative flex size-[26.4px] items-center justify-center bg-[#1E1E1E] text-background hover:bg-[#3C3C3C]"
          onClick={goToNext}
        >
          <DirectusImageClient
            fill
            className="flex size-[26.4px] items-center justify-center object-contain p-1"
            asset={nextIcon}
          />
        </Button>
      </div>
    </div>
  );
}
