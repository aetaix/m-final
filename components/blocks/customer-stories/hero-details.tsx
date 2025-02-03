import DirectusImageClient from "@/components/shared/directus-image-client";
import { IHeroCustomerStoriesDetailsData } from "./types";

export default function HeroCustomerStoriesDetails({
  data,
}: IHeroCustomerStoriesDetailsData) {
  const { headline, logo } = data;
  return (
    <section className="hero-section bg-grid-size-md bg-grid-secondary bg-grid-pattern mb-[92px] mt-[83px] pb-[100px] pt-[82px] md:mb-6xl md:mt-[74px] md:pb-[162px] md:pt-[110px]">
      <div className="container">
        <h1
          dangerouslySetInnerHTML={{
            __html: headline || "",
          }}
          className="mx-auto max-w-[473px] text-center text-[40px]/[42px] font-normal text-foreground md:text-[72px]/[72px]"
        />
        <div className="mt-[47px] flex justify-center md:mt-11">
          <div className="flex size-[188px] items-center justify-center bg-mistral-beige-deep">
            <div className="relative max-h-[100px]">
              {logo?.file && (
                <DirectusImageClient
                  className="order-1 size-auto max-h-full min-h-[60px] object-contain md:order-2"
                  width={78}
                  height={78}
                  asset={logo?.file}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
