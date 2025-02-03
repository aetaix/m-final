import { IFreeFormHTMLData } from "./types";

export default function FreeFormHTML({ data }: IFreeFormHTMLData) {
  const { headline, content, anchor } = data;
  return (
    <section id={anchor || ""} className="mx-auto max-w-[1036px]">
      <div className="container">
        <div className="text-foreground">
          {headline && (
            <h4
              dangerouslySetInnerHTML={{
                __html: headline || "",
              }}
              className="mb-8 text-[24px]/[27.6px] font-normal md:text-[32px]/[36.8px]"
            />
          )}
          <p
            className="format-rich"
            dangerouslySetInnerHTML={{
              __html: content || "",
            }}
          />
        </div>
      </div>
    </section>
  );
}
