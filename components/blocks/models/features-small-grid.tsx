import FeaturesSmallGridItem from "./features-small-grid-item";
import { FeaturesSmallGridProps } from "./types";

export default function FeaturesSmallGrid({ data }: FeaturesSmallGridProps) {
  const { items: features, items_per_row, headline, subheadline } = data;

  const rows = Array.from(
    { length: Math.ceil(features.length / items_per_row) },
    (_, rowIndex) =>
      features.slice(
        rowIndex * items_per_row,
        rowIndex * items_per_row + items_per_row,
      ),
  );

  return (
    <section className="bg-cream py-12">
      {/* Headline and Subheadline */}
      <div className="container flex flex-col gap-y-xl">
        {headline && (
          <h3
            className="heading-3"
            dangerouslySetInnerHTML={{ __html: headline || "" }}
          />
        )}
        {subheadline && (
          <div dangerouslySetInnerHTML={{ __html: subheadline || "" }} />
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto flex flex-col gap-6">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-col items-stretch md:flex-row"
          >
            {/* Divider before the first card */}
            {rowIndex ? (
              <div className="h-px w-full bg-mistral-beige-deeper md:hidden" />
            ) : null}
            <div className="hidden w-px bg-mistral-beige-deeper md:block" />

            {row.map((feature, index) => (
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
                  size="small"
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
