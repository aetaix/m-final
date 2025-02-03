"use client";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import { useLayoutEffect, useMemo, useState } from "react";

import CollectionPagination from "@/components/layout/collection-pagination";

import { BlockTypes, Models, ModelStatus } from "@/constants/enum";
import { LIMIT_NEWS_PER_PAGE } from "@/constants/pagination";
import { CategoryFilter } from "./category-filter";
import NewsCardSkeleton from "./news-card-skeleton";
import { NewsGrid } from "./news-grid";
import { SearchForm } from "./search-form";
import { useRouter } from "next/navigation";

const fetchNewsData = async ({
  locale,
  blockId,
  searchParams = {},
  limit = LIMIT_NEWS_PER_PAGE,
}: any) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const { searchTerm = "", category = "", page = 1 }: any = searchParams;
  const commonFilters = {
    limit,
    filter: {
      parent: { _eq: blockId },
      status: { _eq: ModelStatus.PUBLISHED },
      ...(searchTerm && {
        _or: [
          {
            translations: {
              description: { _icontains: searchTerm?.toLowerCase() },
            },
          },
          {
            translations: { title: { _icontains: searchTerm?.toLowerCase() } },
          },
        ],
      }),
      ...(category && {
        category: { name: { _icontains: category.toLowerCase() } },
      }),
    },
  };

  const _filterCount = await directus.request(
    readItems(Models.POSTS, {
      ...commonFilters,

      aggregate: { count: "*" },
    }),
  );
  const data = await directus.request(
    readItems(Models.POSTS, {
      fields: ["*", { translations: ["*"], category: ["*"], parent: ["id"] }],
      ...commonFilters,
      ...(page && { page: Number(page) }),

      sort: ["-date"],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  //@ts-ignore
  return { items: translatedData, count: _filterCount[0]?.count };
};

const fetchCollectionNewsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();

  const data = await directus.request(
    readItems(BlockTypes.BLOCK_COLLECTION_NEWS, {
      filter: {
        id: { _eq: blockId },
      },
      fields: [
        "*",
        "count(items)",
        {
          translations: ["*"],
          item_button_icon: ["*"],
          search_icon: ["*"],
          category_filter_icon: ["*"],
          navigation_left_icon: ["*"],
          navigation_right_icon: ["*"],
          categories: ["*", { translations: ["*"] }],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const News = ({
  data,
  searchParams,
  permalink,
}: {
  data: any;
  searchParams: any;
  permalink: any;
}) => {
  const router = useRouter();

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingNews, setLoadingNews] = useState(false);
  const { id, locale } = data;
  const [collectionNewsData, setCollectionNewsData] = useState<any>();
  const [filteredNewsData, setFilteredNewsData] = useState<any>();
  const [filterParams, setFilterParams] = useState<any>({
    searchTerm: "",
    category: searchParams?.category || "",
    page: 1,
  });

  const limit =
    collectionNewsData?.number_of_items_per_page || LIMIT_NEWS_PER_PAGE;

  useLayoutEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const _collectionNewsData = await fetchCollectionNewsData(id, locale);
        setCollectionNewsData(_collectionNewsData);
        const newsData = await fetchNewsData({
          locale,
          blockId: id,
          limit: _collectionNewsData?.number_of_items_per_page,
          searchParams: {
            ...filterParams,
            page: 1,
          },
        });
        setFilteredNewsData(newsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id, locale]);

  const onFilterChange = async (filter: any) => {
    if (
      searchParams?.category &&
      filter?.category?.toLowerCase() !== searchParams?.category?.toLowerCase()
    ) {
      router.push(`${permalink[0]}`, {
        scroll: false,
      });
    }
    setLoadingNews(true);
    try {
      setFilterParams({
        ...filterParams,
        ...filter,
      });
      const newsData = await fetchNewsData({
        locale,
        blockId: id,
        searchParams: {
          ...filterParams,
          ...filter,
        },
        limit,
      });

      setFilteredNewsData(newsData);
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const button = {
    label: collectionNewsData?.item_button_text,
    icon: collectionNewsData?.item_button_icon,
  };

  const totalPages = useMemo(() => {
    return Math.ceil(Number(filteredNewsData?.count) / limit);
  }, [filteredNewsData, limit]);

  const currentPage = useMemo(() => {
    return Number(filterParams?.page || 1);
  }, [filterParams]);

  if (initialLoading)
    return (
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {Array.from({ length: LIMIT_NEWS_PER_PAGE }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="container flex flex-col gap-y-8" id="news-section">
      <div className="flex flex-wrap justify-between gap-y-8">
        <CategoryFilter
          categories={collectionNewsData?.categories}
          currentCategory={filterParams?.category}
          filterByCategoryTitle={collectionNewsData?.filter_by_category_title}
          allLatestNewsText={collectionNewsData?.all_latest_news_text}
          categoryFilterIcon={collectionNewsData?.category_filter_icon}
          onFilterChange={onFilterChange}
        />

        <SearchForm
          searchPlaceholderText={collectionNewsData?.search_placeholder_text}
          searchIcon={collectionNewsData?.search_icon}
          onFilterChange={onFilterChange}
        />
      </div>

      {collectionNewsData && (
        <NewsGrid
          newsData={filteredNewsData?.items}
          button={button}
          isLoading={loadingNews}
          itemsPerPage={
            collectionNewsData?.number_of_items_per_page || LIMIT_NEWS_PER_PAGE
          }
          emptyMessage={collectionNewsData?.no_news_available_text}
        />
      )}

      {totalPages > 0 && (
        <CollectionPagination
          totalPages={totalPages}
          currentPage={currentPage}
          icons={{
            arrowLeft: collectionNewsData?.navigation_left_icon,
            arrowRight: collectionNewsData?.navigation_right_icon,
          }}
          onFilterChange={onFilterChange}
        />
      )}
    </div>
  );
};

export default News;
