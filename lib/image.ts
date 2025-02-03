import { AssetData } from "@/components/shared/directus-image";
import {
  BlockImage,
  BlockImageTranslation,
  Icon,
} from "@/types/directus-schema";

import { env } from "@/env";

export type Asset = (BlockImage & BlockImageTranslation) | Icon | string;
export type ImageVariant = "white" | "dark" | "default";

export const directusAssets = (name: string | any) => {
  return env.NEXT_PUBLIC_DIRECTUS_URL?.concat(`/assets/${name}`) || name;
};

export const isBlockImage = (asset: Asset): asset is BlockImage =>
  Object.keys(asset || {}).includes("file");

export const isIcon = (asset: Asset): asset is Icon =>
  Object.keys(asset || {}).includes("image");

export const getVariantSource = (
  asset: Asset,
  variant: ImageVariant,
): { src?: string; svg?: string } => {
  if (typeof asset === "string") return { src: asset };
  if (isBlockImage(asset)) {
    const variantSrc = {
      default: asset.file,
      white: asset.file_white,
      dark: asset.file_black,
    };
    return { src: variantSrc[variant] as string };
  }
  if (isIcon(asset)) {
    const variantSrc = {
      default: asset.image,
      white: asset.image,
      dark: asset.image_dark_mode,
    };
    const svgVariantSrc = {
      default: asset.svg,
      white: asset.svg,
      dark: asset.svg_dark_mode,
    };
    return {
      svg: svgVariantSrc[variant] as string,
      src: variantSrc[variant] as string,
    };
  }
  return {};
};

export const parseAsset = (
  asset: Asset = "",
  variant: ImageVariant = "default",
): AssetData => {
  const { src, svg } = getVariantSource(asset, variant);
  const alt =
    typeof asset === "string"
      ? asset
      : isBlockImage(asset)
        ? asset?.description || ""
        : asset?.name;
  const fullSrc = directusAssets(src);

  return { src: fullSrc, alt, svg };
};
