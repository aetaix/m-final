"use client";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import DirectusImageClient from "@/components/shared/directus-image-client";

const DEBOUNCE_TIME = 700;

export const SearchForm = ({
  searchPlaceholderText,
  searchIcon,
  onFilterChange,
}: {
  searchPlaceholderText: string;
  searchIcon: any;
  onFilterChange: (filter: any) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFilter(e.target.value);
  };

  const debouncedFilter = debounce((value: string) => {
    onFilterChange({ searchTerm: value, page: 1 });
  }, DEBOUNCE_TIME);

  return (
    <div className="flex w-full items-center gap-x-2 border-b border-black md:w-[400px]">
      {searchIcon?.image && (
        <DirectusImageClient
          asset={searchIcon}
          fill
          className="object-contain"
        />
      )}
      <Input
        placeholder={searchPlaceholderText}
        className="w-full border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        name="search"
        onChange={handleInputChange}
      />
    </div>
  );
};
