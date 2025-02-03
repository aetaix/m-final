"use client";

import DirectusImageClient from "@/components/shared/directus-image-client";
import { Button } from "@/components/ui/button";
import { Button as ButtonProps } from "../types";
import { useScrollContext } from "@/contexts/ScrollContext";
import ButtonLink from "@/components/shared/custom/button-link";

export default function HeroCardButton({
  button,
  accordionItemId,
}: {
  button: ButtonProps;
  accordionItemId: number | null;
}) {
  const { scrollToItem } = useScrollContext();

  return accordionItemId ? (
    <Button
      onClick={() => scrollToItem(accordionItemId)}
      className="relative aspect-square size-[8.18px] md:size-[22px]"
      size="icon"
    >
      <DirectusImageClient
        fill
        asset={button?.icon[0]?.icons_id}
        className="p-[2px] md:p-1"
      />
    </Button>
  ) : (
    <ButtonLink button={button}>
      <Button
        className="relative aspect-square size-[8.18px] md:size-[22px]"
        size="icon"
      >
        <DirectusImageClient
          fill
          asset={button?.icon[0]?.icons_id}
          className="p-[2px] md:p-1"
        />
      </Button>
    </ButtonLink>
  );
}
