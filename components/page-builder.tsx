import { PagesBlock } from "@/types/directus-schema";
import BaseBlock from "./base-block";

interface PageBuilderProps {
  sections: PagesBlock[];
  locale: string;
  searchParams?: any;
  permalink?: string[];
}

const PageBuilder = ({
  sections,
  locale,
  searchParams,
  permalink,
}: PageBuilderProps) => {
  const validBlocks = sections.filter(
    (block): block is PagesBlock & { collection: string; item: object } =>
      typeof block.collection === "string" &&
      !!block.item &&
      typeof block.item === "object",
  );

  return (
    <>
      {validBlocks.map((block) => (
        <BaseBlock
          locale={locale}
          key={block.id + block.collection + block.sort}
          block={block}
          searchParams={searchParams}
          permalink={permalink}
        />
      ))}
    </>
  );
};

export default PageBuilder;
