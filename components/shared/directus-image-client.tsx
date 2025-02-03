"use client";

import { Asset, ImageVariant, parseAsset } from "@/lib/image";
import { cn } from "@/lib/utils";
//@ts-ignore
import imgPlaceholder from "@/public/image_placeholder.jpg";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";

interface DirectusImageClientProps extends Omit<ImageProps, "src" | "alt"> {
  asset: Asset;
  variant?: ImageVariant;
  blur?: boolean;
}

export default function DirectusImageClient({
  width,
  height,
  asset,
  variant,
  blur,
  ...rest
}: DirectusImageClientProps) {
  if (!asset) return;
  const data = parseAsset(asset, variant);
  let placeholder: PlaceholderValue = "empty";
  let blurDataURL;

  if (blur) {
    placeholder = "blur";
    blurDataURL = imgPlaceholder.blurDataURL;
  }
  if (!data?.src && !data?.svg) {
    return null;
  }

  if (data.svg) {
    delete rest.fill;
    return (
      <div
        {...rest}
        style={{ width, height }}
        className={cn(rest.className, "svg-container")}
        dangerouslySetInnerHTML={{ __html: data?.svg || "" }}
      />
    );
  }

  if (!data?.src) {
    return null;
  }

  return (
    <Image
      src={data.src}
      alt={data.alt}
      width={width}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      height={height}
      {...rest}
    />
  );
}
