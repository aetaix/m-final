import DirectusImageClient from "@/components/shared/directus-image-client";
import { ITitleSectionData } from "./types";

export default function TitleSection({ data }: ITitleSectionData) {
  const { headline, subheadline, icon, anchor } = data;
  return (
    <section id={anchor || ""} className="mx-auto max-w-[1036px]">
      <div className="container">
        {headline && (
          <h4
            dangerouslySetInnerHTML={{
              __html: headline || "",
            }}
            className="mb-8 max-w-[1036px] text-[30px]/[34.5px] text-foreground md:text-[48px]/[45.6px]"
          />
        )}
        <div className="flex flex-nowrap items-start gap-6 text-[18px]/[21.6px] text-foreground md:text-2xl/[27px] xl:items-center">
          {icon?.image && (
            <DirectusImageClient
              width={21}
              height={19}
              className="h-[19px] w-[21px] min-w-[21px]"
              asset={icon?.image}
            />
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: subheadline || "",
            }}
          />
        </div>
      </div>
    </section>
  );
}
