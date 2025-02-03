import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";

export default function NotFound({ data }: any) {
  const { headline, subheadline, buttons, image } = data;
  return (
    <section>
      <div className="flex items-center justify-center xl:mb-[63px]">
        <div className="container relative z-10 mx-auto mt-[170px] text-center xl:mt-[212px]">
          <h1
            className="mb-8 text-[40px]/[42px] text-foreground xl:mb-12 xl:text-[72px]/[72px]"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          />
          <div
            className="mx-auto mb-8 text-xl/[21.6px] text-foreground xl:mb-12 xl:max-w-[699px] xl:text-[20px]/[27px]"
            dangerouslySetInnerHTML={{ __html: subheadline || "" }}
          />
          <div className="flex w-full flex-wrap items-center justify-center gap-x-2xl gap-y-md">
            {buttons?.buttons?.map((cta: any, idx: number) => (
              <ButtonLink
                key={cta?.label + idx}
                button={cta}
                className="min-w-full md:min-w-min"
              >
                <CButton
                  className="mx:min-w-full h-[44px] justify-between"
                  label={cta?.label}
                  icon={cta?.icon[0]?.icons_id}
                  btn={cta}
                />
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern relative top-[-92px] pb-[46px] pt-[118px] xl:top-0 xl:pt-[25px]">
        <div className="flex items-center justify-center">
          <DirectusImageClient
            asset={image?.id}
            width={340}
            height={280}
            className="h-[142px] w-[173px] max-w-full object-contain lg:object-top xl:h-[280px] xl:w-[340px]"
          />
        </div>
      </div>
    </section>
  );
}
