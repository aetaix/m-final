import { AnchorType, NEWS_PREFIX } from "@/constants/enum";
import { Page, PagesBlock } from "@/types/directus-schema";
import { clsx, type ClassValue } from "clsx";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { stringify } from "querystring";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updatePathParameters(
  url: string,
  params?: Record<string, any>,
): string {
  const { query, pathname } = parseUrl(url);

  const updatedParams = {
    ...query,
    ...params,
  };
  const updatedQueryString = stringify(updatedParams);
  return `${pathname}?${updatedQueryString}`;
}

export function urlForButton(button: any, locale: any) {
  let anchor;
  if (button?.type === AnchorType.EXTERNAL) {
    anchor = button.external_url;
  } else if (button?.type === AnchorType.URL) {
    anchor = button.url;
  } else if (button?.type?.startsWith(AnchorType.PAGES)) {
    const permalink = button?.page?.permalink || "#";
    anchor = "/" + locale + permalink;
  } else if (button?.type === AnchorType.POSTS) {
    anchor = `/${NEWS_PREFIX}/` + button.post?.slug;
  }
  return anchor || "#";
}

export function extractSection(params: { data: Page; section: string }) {
  return params.data.blocks?.filter(
    (b: any) => b.item.section_id === params.section,
  )[0] as PagesBlock;
}

export type ColsPerRow = 1 | 2 | 3 | 4 | 5 | 6;
export const getGridCols = (cols: ColsPerRow): string => {
  const baseClass = "grid gap-xl";
  const responsiveColumns: Record<ColsPerRow, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  return `${baseClass} ${responsiveColumns[cols]}`;
};

export function slugify(string: string) {
  if (!string) return;
  return string
    .toString() // Ensure the input is a string
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .normalize("NFD") // Normalize to decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
}

export function asyncScrollToElement(element: any) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          observer.disconnect();
          // @ts-ignore
          resolve();
        }
      },
      {
        root: null, // viewport
        threshold: 1.0, // fully visible
      },
    );
    observer.observe(element);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function scrollToElementWithOffset(element: any, offset: number) {
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function groupBy(array: any[], keySelector: any) {
  if (!Array.isArray(array)) {
    console.error("The second argument must be a function.");
    return [];
  }

  if (typeof keySelector !== "function") {
    console.error("The second argument must be a function.");
    return [];
  }

  return array.reduce((grouped, item) => {
    const key = keySelector(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
}

// Utility function to check if the provided permalink represents a "news post".
// A permalink is considered a "news post" if:
// 1. It is an array.
// 2. The first element of the array is the string NEWS_PREFIX.
// 3. The array has exactly two elements (e.g., [NEWS_PREFIX, "some-slug"]).
export function isNewsPost(permalink: any) {
  return (
    Array.isArray(permalink) &&
    permalink[0] === NEWS_PREFIX &&
    permalink.length === 2
  );
}
