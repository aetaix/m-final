import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { NEWS_PREFIX } from "@/constants/enum";
import { formatLocalizedDate } from "@/lib/date";
import React from "react";

const HeroNewsPost = async ({ data, button }: { data: any; button: any }) => {
  if (!data) return null;
  const { title, description, author, date, category, slug } = data;

  return (
    <div className="mb-10 flex min-h-[294px] w-full flex-col justify-between gap-y-xl bg-mistral-sunshine-50 p-xl md:gap-y-0">
      <div className="flex flex-wrap justify-between gap-y-xl md:gap-y-0">
        {title && (
          <h2
            className="text-[30px]/[34.5px] md:w-1/2 md:text-[48px]/[45.6px] lg:w-2/5"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {description && (
          <p
            className="text-[18px]/[21.6px] md:w-[35%]  md:text-[20px]/[27px] lg:w-1/4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      <div className="flex flex-wrap-reverse items-end justify-between gap-y-xl md:flex-wrap md:gap-y-0">
        {button && (
          <ButtonLink
            href={`/${NEWS_PREFIX}/${slug}`}
            target="_blank"
            button={button}
          >
            <CButton
              btn={button}
              className="self-start bg-foreground p-3 text-sm text-white hover:bg-foreground hover:text-white lg:text-base"
              iconClassName="text-primary"
              label={button?.label as string}
              icon={button?.icon as any}
            />
          </ButtonLink>
        )}
        <div className="flex flex-col gap-y-xl  md:w-[35%] lg:w-1/4">
          {category && (
            <span
              className=" h-[26px] w-fit rounded-3xl border border-mistral-black px-4 text-sm text-mistral-black"
              dangerouslySetInnerHTML={{
                __html: category?.name,
              }}
            />
          )}
          <div className="flex flex-wrap items-center gap-x-8 text-sm">
            {date && (
              <span
                dangerouslySetInnerHTML={{
                  __html: formatLocalizedDate(date),
                }}
              />
            )}
            {author && <span>|</span>}
            {author && <span dangerouslySetInnerHTML={{ __html: author }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroNewsPost;
