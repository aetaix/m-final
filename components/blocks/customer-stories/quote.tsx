import DirectusImageClient from "@/components/shared/directus-image-client";
import { IQuoteData } from "./types";

export default function Quote({ data }: IQuoteData) {
  const { author, author_company, author_role, content, quote_icon, anchor } =
    data;
  return (
    <section id={anchor || ""} className="mx-auto max-w-[1036px]">
      <div className="mt-12 flex flex-wrap justify-between gap-12 bg-mistral-beige-deep px-5 py-12 md:container md:items-end md:!px-[43px] md:py-[39px] xl:flex-nowrap">
        <div>
          <div className="mb-[51px]">
            {quote_icon?.image && (
              <DirectusImageClient
                className="size-[30px]"
                height={30}
                width={30}
                asset={quote_icon?.image}
              />
            )}
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: content || "" }}
            className="text-[24px]/[27.6px] text-foreground md:max-w-[568px] md:text-[32px]/[36.8px]"
          />
        </div>
        <p className="text-base font-normal text-foreground xl:text-sm">
          {[author, author_role, author_company].filter(Boolean).join(", ") ||
            "-"}
        </p>
      </div>
    </section>
  );
}
