import { BlockDivider } from "@/types/directus-schema";
import { useId } from "react";

const DEFAULT_SIZE = "48px";
export default function Divider({ data }: { data: BlockDivider }) {
  const id = useId();

  return (
    <div
      key={id}
      className="h-[var(--space-mobile)] w-full md:h-[var(--space-desktop)] lg:h-[var(--space-desktop)]"
      style={
        {
          "--space-desktop": data.size || DEFAULT_SIZE,
          "--space-mobile": data.size_mobile || data.size || DEFAULT_SIZE,
        } as React.CSSProperties
      }
    />
  );
}
