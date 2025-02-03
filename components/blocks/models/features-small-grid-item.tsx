import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { directusAssets } from "@/lib/image";
import Image from "next/image";
import { FeaturesSmallGridItemProps } from "./types";

// Component for Large Size
function LargeFeaturesSmallGridItem({
  title,
  description,
  icon,
  button,
}: FeaturesSmallGridItemProps) {
  return (
    <div className="flex h-full flex-col md:px-11">
      {/* Content Container */}
      <div className="flex flex-1 flex-col items-start justify-between">
        {/* Icon */}
        <div className="mb-6 flex size-xl items-start justify-center">
          <DirectusImage
            asset={icon}
            width={24}
            height={24}
            className="size-xl object-cover"
          />
        </div>

        {/* Title */}
        <div className="min-h-[52px] max-w-[231px] text-[19px]/[25px] font-normal text-foreground">
          {title}
        </div>

        {/* Description */}
        <div
          className="mt-6 min-h-max flex-1 text-base font-normal text-black md:min-h-[170px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Button */}
      {button && (
        <div className="mt-6 md:mt-auto">
          <ButtonLink className="inline-block" button={button}>
            <CButton
              className="bg-foreground px-4 py-2 text-[14px]/[11px] text-background hover:bg-foreground hover:text-background"
              label={button.label}
              icon={button?.icon[0]?.icons_id}
              btn={button}
            />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

// Component for Non-Large Size
function CompactFeaturesSmallGridItem({
  title,
  description,
  icon,
  button,
  index,
}: FeaturesSmallGridItemProps) {
  return (
    <div className="flex h-full flex-col px-6">
      {/* Title */}
      <div className="mb-6 w-fit text-[19px]/[26px] font-normal text-foreground">
        {title}
      </div>

      {/* Content: Icon and Description */}
      <div className="mb-3 flex flex-1 items-start gap-6">
        <div className={`${index === 1 ? "min-w-xl" : "min-w-[20px]"}`}>
          <Image
            src={directusAssets(icon.image || icon.file)}
            alt={icon.name}
            width={27}
            height={27}
          />
        </div>
        <div
          className="text-base font-normal text-black"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Button */}
      {button && (
        <div className="mt-auto">
          <ButtonLink className="inline-block" button={button}>
            <CButton
              className="bg-foreground p-3 text-[14px]/[11px] text-background hover:bg-foreground hover:text-background"
              label={button.label}
              icon={button?.icon[0]?.icons_id}
              btn={button}
            />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

// Main Component
export default function FeaturesSmallGridItem(
  props: FeaturesSmallGridItemProps,
) {
  const { size } = props;

  return size === "large" ? (
    <LargeFeaturesSmallGridItem {...props} />
  ) : (
    <CompactFeaturesSmallGridItem {...props} />
  );
}
