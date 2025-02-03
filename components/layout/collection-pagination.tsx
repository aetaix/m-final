import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import DirectusImage from "../shared/directus-image";
import { MAX_VISIBLE_PAGES, SCROLL_OFFSET } from "@/constants/pagination";

const CollectionPagination = ({
  totalPages = 1,
  currentPage = 1,
  icons,
  onFilterChange,
}: {
  totalPages: number;
  currentPage: number;
  icons: any;
  onFilterChange: (filter: any) => void;
}) => {
  const maxVisiblePages = MAX_VISIBLE_PAGES;
  const ellipsis = <PaginationEllipsis color="#FA500F" className="w-fit" />;
  const { arrowLeft, arrowRight } = icons;

  const generatePageButtons = () => {
    let tempNumberOfButtons: (number | JSX.Element)[] = [];

    if (totalPages <= maxVisiblePages) {
      tempNumberOfButtons = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage >= 1 && currentPage <= maxVisiblePages / 2) {
      tempNumberOfButtons = [
        ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => i + 1),
        ellipsis,
        totalPages,
      ];
    } else if (currentPage === 4) {
      tempNumberOfButtons = [
        ...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1),
        ellipsis,
        totalPages,
      ];
    } else if (currentPage > 4 && currentPage < totalPages - 2) {
      const sliced1 = Array.from({ length: 2 }, (_, i) => currentPage - 2 + i);
      const sliced2 = [currentPage];
      tempNumberOfButtons = [
        1,
        ellipsis,
        ...sliced1,
        ...sliced2,
        ellipsis,
        totalPages,
      ];
    } else if (currentPage > totalPages - 3) {
      const sliced = Array.from({ length: 4 }, (_, i) => totalPages - 3 + i);
      tempNumberOfButtons = [1, ellipsis, ...sliced];
    }

    return tempNumberOfButtons;
  };

  const handlePaginationChange = (e: any, page: number) => {
    e.preventDefault();
    if (!page || page > totalPages) return;

    onFilterChange({ page: page });

    const section = document.getElementById("news-section");
    if (section) {
      const offsetTop = section.offsetTop - SCROLL_OFFSET;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const arrOfCurrButtons = generatePageButtons();

  return (
    <Pagination>
      <PaginationContent className="mt-5 gap-x-xl md:mb-24">
        <PaginationLink
          className={`size-[26.4px] border hover:border-mistral-orange ${currentPage === 1 ? "cursor-not-allowed border-mistral-black bg-mistral-black text-white" : "border-mistral-orange bg-mistral-orange text-white"}`}
          href="#"
          aria-disabled={currentPage === 1}
          role="button"
          onClick={(e) => handlePaginationChange(e, currentPage - 1)}
        >
          <DirectusImage asset={arrowLeft} width={16} height={16} />
        </PaginationLink>
        {arrOfCurrButtons.map((data, index) =>
          typeof data === "number" ? (
            <PaginationLink
              key={index}
              href="#"
              className={`size-[26.4px] border border-mistral-orange ${currentPage === data ? "bg-mistral-orange text-white" : " text-mistral-orange"}`}
              onClick={(e) => handlePaginationChange(e, data)}
              role="button"
            >
              {data}
            </PaginationLink>
          ) : (
            <PaginationEllipsis className="w-fit" key={index} />
          ),
        )}
        <PaginationLink
          href="#"
          className={`size-[26.4px] border hover:border-mistral-orange ${currentPage === totalPages ? "cursor-not-allowed border-mistral-black bg-mistral-black text-white" : "border-mistral-orange bg-mistral-orange text-white"}`}
          aria-disabled={currentPage === totalPages}
          role="button"
          onClick={(e) => handlePaginationChange(e, currentPage + 1)}
        >
          <DirectusImage asset={arrowRight} width={16} height={16} />
        </PaginationLink>
      </PaginationContent>
    </Pagination>
  );
};

export default CollectionPagination;
