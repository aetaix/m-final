"use client";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { useActiveHeading } from "@/hooks/useActiveHeadings";
import { cn, scrollToElementWithOffset } from "@/lib/utils";

export const TermsTableOfContent = ({
  headings,
  activeIcon,
}: {
  headings: any;
  activeIcon: any;
}) => {
  const activeId = useActiveHeading(headings);

  function alignsScrollToElementWithOffset(index: number, targetElement: any) {
    switch (index) {
      case 1:
        scrollToElementWithOffset(targetElement, 140);
        break;
      case 2:
        scrollToElementWithOffset(targetElement, 175);
        break;
      case 3:
        scrollToElementWithOffset(targetElement, 225);
        break;
      case 4:
        scrollToElementWithOffset(targetElement, 275);
        break;
      case 5:
        scrollToElementWithOffset(targetElement, 323);
        break;
      case 6:
        scrollToElementWithOffset(targetElement, 373);
        break;
      default:
        break;
    }
  }

  return (
    <nav className="sticky top-[123px] hidden h-fit w-[293px] lg:block">
      <ul className="h-fit divide-y-[0.5px] divide-[#ECDAA1] border-b-[0.5px] border-[#ECDAA1]">
        {headings.map((heading: any, idx: number) => (
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();

              // @ts-ignore
              const targetElement = document.getElementById(heading.id);
              if (targetElement) {
                const index = idx + 1;
                alignsScrollToElementWithOffset(index, targetElement);

                if (history.pushState) {
                  history.pushState(null, "", `#${heading.id}`);
                } else {
                  window.location.hash = `#${heading.id}`;
                }
              }
            }}
            className="group relative flex min-h-[49px] w-full cursor-pointer items-center pl-4 text-sm"
            key={heading.id}
          >
            <div
              className={cn(
                "max-w-[242px] group-hover:text-mistral-black",
                activeId === heading.id
                  ? "text-mistral-black"
                  : "text-[#818181] dark:text-[]",
              )}
              dangerouslySetInnerHTML={{ __html: heading.title || "" }}
            ></div>
            <DirectusImageClient
              asset={activeIcon}
              width={16}
              height={16}
              className={cn(
                "absolute right-4 top-1/2 size-5 shrink-0 -translate-y-1/2 text-primary transition-[color]",
                activeId === heading.id ? "block" : "hidden",
              )}
            />
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default TermsTableOfContent;
