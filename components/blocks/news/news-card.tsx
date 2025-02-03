import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { NEWS_PREFIX } from "@/constants/enum";
import { formatLocalizedDate } from "@/lib/date";

const NewsCard = ({ data, button }: { data: any; button: any }) => {
  const { category, title, description, date, author, slug } = data;

  return (
    <div className=" flex h-[351px] flex-col justify-between bg-mistral-sunshine-50 p-xl md:min-w-[400px]">
      <div className="flex flex-col gap-y-8">
        {category && (
          <span
            className=" h-[26px] w-fit rounded-3xl border border-mistral-black px-4 text-sm text-mistral-black"
            dangerouslySetInnerHTML={{
              __html: category.name,
            }}
          />
        )}
        <div className="flex flex-col gap-y-6">
          {title && (
            <h3
              className=" text-[28px]/[26.6px]"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {description && (
            <p
              className=" text-base"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between align-bottom">
        <div className="flex flex-col justify-between text-sm">
          {date && (
            <span
              dangerouslySetInnerHTML={{
                __html: formatLocalizedDate(date),
              }}
            />
          )}
          {author && <span dangerouslySetInnerHTML={{ __html: author }} />}
        </div>
        {button && (
          <ButtonLink
            href={`${NEWS_PREFIX}/${slug}`}
            target="_blank"
            button={button}
          >
            <CButton
              btn={button}
              className="text-sm text-[#3C3C3C]"
              iconClassName="text-primary"
              label={button.label}
              icon={button?.icon}
            />
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
