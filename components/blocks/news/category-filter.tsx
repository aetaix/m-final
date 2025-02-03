"use client";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { cn } from "@/lib/utils";

export const CategoryButtonLink = ({ isActive, label, icon, ...rest }: any) => (
  <div
    className={cn(
      "group cursor-pointer flex h-[42px] w-full items-center justify-between gap-x-2xl-2 text-nowrap p-md px-[21px] md:w-auto",
      "md:border-t border-b border-r border-l md:border-l-0 border-foreground first-of-type:border-t md:first-of-type:border-l",
      "data-[state=active]:bg-foreground data-[state=active]:text-background",
    )}
    data-state={isActive ? "active" : "inactive"}
    {...rest}
  >
    <span dangerouslySetInnerHTML={{ __html: label }} />
    <DirectusImageClient
      className="hidden text-primary [.group[data-state=active]_&]:block"
      asset={icon}
      width={20}
      height={20}
    />
  </div>
);

export const CategoryFilter = ({
  categories,
  currentCategory,
  filterByCategoryTitle = "",
  allLatestNewsText = "",
  categoryFilterIcon,
  onFilterChange,
}: any) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ category: category, page: 1 });
  };

  return (
    <div className="flex w-full flex-col gap-3 md:w-auto  md:flex-row md:items-center">
      {filterByCategoryTitle && (
        <span dangerouslySetInnerHTML={{ __html: filterByCategoryTitle }} />
      )}

      <nav className="flex flex-col md:flex-row">
        <CategoryButtonLink
          isActive={currentCategory === ""}
          label={allLatestNewsText}
          icon={categoryFilterIcon}
          onClick={() => handleCategoryChange("")}
        />
        {categories?.map((item: any) => (
          <CategoryButtonLink
            key={item?.id}
            isActive={
              currentCategory.toLowerCase() === item?.name.toLowerCase()
            }
            label={item?.name}
            icon={categoryFilterIcon}
            onClick={() => handleCategoryChange(item?.name)}
          />
        ))}
      </nav>
    </div>
  );
};
