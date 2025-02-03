import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { HeroModelsItem, HeroModelsProps } from "../types";
import HeroCardButton from "./card-button";

interface HeroItemCardProps {
  item: HeroModelsItem;
  wrapperStyles?: React.CSSProperties;
  wrapperClassName?: string;
  imageWidth: number;
  imageHeight: number;
  accordionItemId: number | null;
}

function HeroItemCard({
  item,
  wrapperStyles,
  wrapperClassName = "",
  imageWidth,
  imageHeight,
  accordionItemId,
}: HeroItemCardProps) {
  if (!item) return;

  return (
    <div
      style={wrapperStyles}
      className={`hero-item-card absolute flex flex-col items-center justify-center gap-3 bg-mistral-beige-deep px-2 md:gap-5 md:px-3 ${wrapperClassName}`}
    >
      {/* Image */}
      <DirectusImage
        asset={item.block_hero_models_item_id?.image}
        className={`object-contain`}
        width={imageWidth}
        height={imageHeight}
      />

      {/* Title and Button */}
      <div className="flex w-full items-center justify-between">
        <span className="text-[8.18px]/[9.81px] text-[#6E370F] md:text-base">
          {item.block_hero_models_item_id.title}
        </span>
        {item.block_hero_models_item_id?.button && (
          <HeroCardButton
            button={item.block_hero_models_item_id?.button}
            accordionItemId={accordionItemId}
          />
        )}
      </div>
    </div>
  );
}

export default function HeroModels({ data }: HeroModelsProps) {
  const { headline, subheadline, button_group, items } = data;

  const cardDataDesk = [
    {
      imageHeight: 90,
      imageWidth: 65,
      item: items[0],
      wrapperStyles: { width: "165px", height: "165px" },
      wrapperClassName: "pb-3 pt-7 top-[5%] left-0",
    },
    {
      imageHeight: 90,
      imageWidth: 77,
      item: items[1],
      wrapperStyles: { width: "228px", height: "154px" },
      wrapperClassName: "pb-3 pt-6 left-[17%]",
    },
    {
      imageHeight: 87,
      imageWidth: 60,
      item: items[2],
      wrapperStyles: { width: "241px", height: "154px" },
      wrapperClassName: "pb-3 pt-6 top-[60%] left-[12%]",
    },
    {
      imageHeight: 83,
      imageWidth: 71,
      item: items[3],
      wrapperStyles: { width: "165px", height: "154px" },
      wrapperClassName: "pb-3 pt-6 top-[43%] left-[33%]",
    },
    {
      imageHeight: 132,
      imageWidth: 97,
      item: items[4],
      wrapperStyles: { width: "226px", height: "237px" },
      wrapperClassName: "pb-3 pt-11 top-[12%] left-[49%]",
    },
    {
      imageHeight: 68,
      imageWidth: 89,
      item: items[5],
      wrapperStyles: { width: "241px", height: "154px" },
      wrapperClassName: "pb-3 pt-[34px] top-[5%] left-[69%]",
    },
    {
      imageHeight: 104,
      imageWidth: 71,
      item: items[6],
      wrapperStyles: { width: "165px", height: "165px" },
      wrapperClassName: "pb-3 pt-5 top-[60%] left-[72%]",
    },
    {
      imageHeight: 58,
      imageWidth: 58,
      item: items[7],
      wrapperStyles: { width: "135px", height: "155px" },
      wrapperClassName: "pb-3 pt-7 top-[33%] right-[2%]",
    },
  ];
  const cardDataMobile = [
    {
      imageHeight: 45,
      imageWidth: 33,
      item: items[0],
      wrapperStyles: { width: "84px", height: "100px" },
      wrapperClassName: "pb-4 pt-7 top-[5%] left-0",
    },
    {
      imageHeight: 43,
      imageWidth: 41,
      item: items[1],
      wrapperStyles: { width: "116px", height: "88px" },
      wrapperClassName: "pb-3 pt-6 left-[17%]",
    },
    {
      imageHeight: 45,
      imageWidth: 31,
      item: items[2],
      wrapperStyles: { width: "123px", height: "98px" },
      wrapperClassName: "pb-7 pt-6 top-[60%] left-[12%]",
    },
    {
      imageHeight: 42,
      imageWidth: 36,
      item: items[3],
      wrapperStyles: { width: "84px", height: "96px" },
      wrapperClassName: "pb-1 pt-6 top-[43%] left-[33%]",
    },
    {
      imageHeight: 67,
      imageWidth: 49,
      item: items[4],
      wrapperStyles: { width: "115px", height: "125px" },
      wrapperClassName: "pb-7 pt-11 top-[12%] left-[49%]",
    },
    {
      imageHeight: 35,
      imageWidth: 45,
      item: items[5],
      wrapperStyles: { width: "123px", height: "82px" },
      wrapperClassName: "pb-7 pt-[34px] top-[5%] left-[69%]",
    },
    {
      imageHeight: 54,
      imageWidth: 36,
      item: items[6],
      wrapperStyles: { width: "84px", height: "112px" },
      wrapperClassName: "pb-8 pt-5 top-[60%] left-[72%]",
    },
    {
      imageHeight: 29,
      imageWidth: 29,
      item: items[7],
      wrapperStyles: { width: "70px", height: "70px" },
      wrapperClassName: "pb-4 pt-7 top-[33%] right-[2%]",
    },
  ];

  return (
    <div className="relative mt-[51px] overflow-hidden md:mt-[135px]">
      <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern absolute inset-0 top-[-10%] size-full md:top-[-12%]" />
      <div className="relative flex items-center justify-center">
        <div className="container relative z-10 mx-auto mt-2xl pt-[112px] text-center md:mt-[78px] md:pt-0">
          <h1
            className="mb-8 text-[40px]/[42px] font-normal text-foreground md:mb-10 md:text-7xl/[72px]"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          />
          <div
            className="mb-8 text-xl/[21.6px] font-normal text-foreground md:mb-10 md:text-2xl/[27px]"
            dangerouslySetInnerHTML={{ __html: subheadline || "" }}
          />
          <div className="flex w-full items-center justify-center gap-x-4 gap-y-md md:gap-x-2xl">
            {button_group?.buttons?.map((cta: any, idx: number) => (
              <ButtonLink
                key={cta?.label + idx}
                button={cta}
                className="md:min-w-min"
              >
                <CButton
                  className="h-[44px] min-w-full justify-between px-3 md:px-0"
                  label={cta?.label}
                  icon={cta?.icon[0]?.icons_id}
                  btn={cta}
                />
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mt-[67px] hidden h-[410px] sm:block">
        <div className="hero-marquee">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} aria-hidden={i > 0} className="marquee-content">
              {cardDataDesk.map((card, index) => (
                <HeroItemCard
                  key={index}
                  accordionItemId={
                    card.item.block_hero_models_item_id?.accordion_item
                  }
                  imageHeight={card.imageHeight}
                  imageWidth={card.imageWidth}
                  item={card.item}
                  wrapperStyles={card.wrapperStyles}
                  wrapperClassName={card.wrapperClassName}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-[62px] h-[230px] sm:hidden">
        <div className="hero-marquee">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} aria-hidden={i > 0} className="marquee-content">
              {cardDataMobile.map((card, index) => (
                <HeroItemCard
                  key={index}
                  accordionItemId={
                    card.item.block_hero_models_item_id?.accordion_item
                  }
                  imageHeight={card.imageHeight}
                  imageWidth={card.imageWidth}
                  item={card.item}
                  wrapperStyles={card.wrapperStyles}
                  wrapperClassName={card.wrapperClassName}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
