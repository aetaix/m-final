import { Asset, ImageVariant, parseAsset } from "@/lib/image";
import { cn } from "@/lib/utils";
import {
  ImageProps,
  PlaceholderValue,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface DirectusImageProps
  extends Omit<ImageProps, "src" | "alt" | "placeholder" | "blurDataURL"> {
  asset: Asset;
  variant?: ImageVariant;
  blur?: boolean;
  blurImg?: string;
}

export interface AssetData {
  src: string;
  alt: string;
  svg?: string;
}

export default function DirectusImage({
  width,
  height,
  asset,
  variant = "default",
  ...rest
}: DirectusImageProps) {
  let blurDataURL;
  const placeholder: PlaceholderValue = "empty";
  if (!asset) return;
  const data = parseAsset(asset, variant);
  const alt = data.alt;
  const src = data.src;
  const svg = data.svg;

  if (svg) {
    delete rest.fill;
    return (
      <div
        {...rest}
        className={cn(rest.className, "svg-container")}
        style={{ width, height }}
        dangerouslySetInnerHTML={{ __html: svg || "" }}
      />
    );
  }

  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...rest}
    />
  );
}
