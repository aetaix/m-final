import NewsCard from "./news-card";
import NewsCardSkeleton from "./news-card-skeleton";

export const NewsGrid = ({
  newsData,
  button,
  isLoading,
  itemsPerPage = 6,
  emptyMessage,
}: {
  newsData: any;
  button: any;
  isLoading: boolean;
  itemsPerPage: number;
  emptyMessage?: string;
}) => {
  if (!isLoading && !newsData?.length) {
    return (
      <div className="my-10 w-full text-center text-lg">{emptyMessage}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
      {isLoading
        ? Array.from({ length: itemsPerPage }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))
        : newsData?.map((item: any) => (
            <div key={item.id}>
              <NewsCard data={item} button={button} />
            </div>
          ))}
    </div>
  );
};
