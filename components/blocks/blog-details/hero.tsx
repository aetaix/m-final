import { formatDate } from "@/lib/utils";
import { IBlogDetailsHeroData } from "./type";

export default function BlogDetailsHero({ data }: IBlogDetailsHeroData) {
  const {
    headline,
    subheadline,
    author,
    creation_date,
    company: { name: category },
  } = data;
  return (
    <section className="relative mt-[143px] overflow-hidden pt-10 xl:mt-[88px] xl:pb-[74px] xl:pt-[85px]">
      <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern absolute inset-0 xl:top-[-3%] xl:size-full" />
      <div className="container">
        <div className="relative z-10 mx-auto max-w-screen-xl bg-mistral-beige-deep px-4 py-8 xl:px-8">
          <div className="flex flex-wrap justify-between gap-8 xl:flex-nowrap xl:items-start">
            <h1
              dangerouslySetInnerHTML={{
                __html: headline || "",
              }}
              className="text-[30px]/[34.5px] font-normal text-foreground xl:text-5xl/[45.6px]"
            />
            <div
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
              className="max-w-[473px] text-[18px]/[21.6px] font-normal text-foreground xl:text-[20px]/[27px]"
            />
          </div>
          <div className="mt-16 xl:mt-[75px]">
            <div
              dangerouslySetInnerHTML={{ __html: category || "" }}
              className="mb-[35px] inline-block rounded-[300px] border border-foreground px-4 py-1 text-sm xl:mb-6"
            />
            <div className="flex items-center gap-6 text-base/[15.2px] text-foreground">
              <div
                dangerouslySetInnerHTML={{
                  __html: formatDate(creation_date) || "",
                }}
              />
              {creation_date && author && (
                <span className="h-[11px] w-px bg-foreground" />
              )}
              <div dangerouslySetInnerHTML={{ __html: author || "" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
