import DirectusImageClient from "@/components/shared/directus-image-client";
import { ListingData } from "./types";

export default function Listing({ data }: ListingData) {
  const { headline, subheadline, items, item_icon, anchor } = data;
  return (
    <section
      id={anchor || ""}
      className="customer-stories-listing mx-auto max-w-[1036px]"
    >
      <div className="container">
        <div className="mt-12 md:mt-4xl">
          {headline && (
            <div
              dangerouslySetInnerHTML={{
                __html: headline || "",
              }}
              className="mb-12 text-[30px]/[34.5px] text-foreground xl:text-4xl/[42px]"
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: subheadline || "",
            }}
            className="text-2xl mb-12 text-foreground"
          />
          <ul className="">
            {items?.map(({ highlighted_text, text }, id) => (
              <li
                key={id}
                className="mb-6 flex w-full items-start gap-6 border-b border-b-black text-foreground last-of-type:mb-0 md:gap-4xl"
              >
                {item_icon?.image && (
                  <DirectusImageClient
                    width={25}
                    height={18}
                    className="h-[18px] w-[25px] min-w-[25px]"
                    asset={item_icon?.image}
                  />
                )}
                <p className="listing-item-content w-full pb-6 text-base md:pb-[27.5px]">
                  <span className="text-primary">{highlighted_text}</span>{" "}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: text || "",
                    }}
                  />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
