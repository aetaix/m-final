import { ModelsAccordionItem } from "@/components/blocks/models/types";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";

export const useScrollToItem = (
  slideHeight: number,
  items: ModelsAccordionItem[],
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  // Compute the top position of the accordion container
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top + window.scrollY);
    }
  }, []);

  const itemsMap = useMemo(() => {
    if (!items) return {};
    return items.reduce<Record<number, number>>(
      (acc, item: ModelsAccordionItem, idx) => {
        acc[item.id] = idx;
        return acc;
      },
      {},
    );
  }, [items]);

  // Scroll to a specific item
  const scrollToItem = useCallback(
    (accordionItemId: number) => {
      if (!Object.keys(itemsMap).length) return;

      if (ref.current) {
        const itemScrollPosition = itemsMap[accordionItemId] * slideHeight;
        window.scrollTo({
          top: top + itemScrollPosition,
          behavior: "smooth",
        });
      }
    },
    [top, slideHeight, itemsMap],
  );

  return { ref, scrollToItem };
};
