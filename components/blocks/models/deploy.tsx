import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import FeaturesSmallGridItem from "./features-small-grid-item";

export default function Deploy({ data }: any) {
  const { grid_items, headline, items_per_row, subheadline, button, anchor } =
    data;

  // Group items into rows
  const rows = Array.from(
    { length: Math.ceil(grid_items.length / items_per_row) },
    (_, rowIndex) =>
      grid_items.slice(
        rowIndex * items_per_row,
        rowIndex * items_per_row + items_per_row,
      ),
  );

  return (
    <section
      id={anchor || ""}
      className="bg-cream flex flex-col gap-y-3xl py-12 "
    >
      <div className="container flex flex-col justify-between gap-y-3xl lg:flex-row">
        <div className="flex flex-col gap-y-3xl">
          <div
            className="heading-3 max-w-[682px]"
            dangerouslySetInnerHTML={{
              __html: headline || "",
            }}
          />
          {subheadline && (
            <div
              className="max-w-[721px]"
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
            />
          )}
        </div>
        {button && (
          <ButtonLink button={button} className="lg:self-center">
            <CButton
              btn={button}
              className="text-base md:gap-x-xl"
              iconClassName="text-primary"
            />
          </ButtonLink>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto mt-4xl flex flex-col gap-6 xl:mt-[88px]">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-col items-stretch md:flex-row"
          >
            {/* Divider before the first card */}
            <div className="h-px w-full bg-mistral-beige-deeper md:hidden" />
            <div className="hidden w-px bg-mistral-beige-deeper md:block" />

            {row.map((feature: any, index: number) => (
              <div
                key={feature.id}
                className={`flex flex-1 flex-col py-8 md:py-0 ${
                  index
                    ? "border-t border-mistral-beige-deeper md:border-l md:border-t-0"
                    : ""
                }`}
              >
                <FeaturesSmallGridItem
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  size="large"
                  button={feature.button}
                  index={index}
                />
              </div>
            ))}

            {/* Placeholder divs to fill remaining space */}
            {rowIndex === rows.length - 1 &&
              row.length < items_per_row &&
              Array.from({ length: items_per_row - row.length }).map(
                (_, placeholderIndex) => (
                  <div
                    key={`placeholder-${placeholderIndex}`}
                    className="flex flex-1 flex-col border-t border-mistral-beige-deeper md:border-l md:border-t-0"
                  ></div>
                ),
              )}

            {/* Divider after the last card */}
            <div className="h-px w-full bg-mistral-beige-deeper md:hidden"></div>
            <div className="hidden w-px bg-mistral-beige-deeper md:block"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
