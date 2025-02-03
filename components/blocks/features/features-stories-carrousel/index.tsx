import { Carousel } from "@/components/ui/carousel";
import { BlockTypes, FeaturesCollectionCarouselType } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { groupBy } from "@/lib/utils";
import { readItems } from "@directus/sdk";
import FeaturesCollectionCarouselCards from "./features-collection-carousel-cards";

const FeaturesStoriesCarrouselData = async (
  blockId: number,
  locale: string,
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FEATURES_STORIES_CARROUSEL, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          items: [
            "*",
            "block_collection_item_id",
            {
              block_collection_item_id: [
                "*",
                {
                  post: [
                    "*",
                    {
                      category: ["*"],
                      translations: ["*"],
                    },
                  ],
                  story: [
                    "*",
                    {
                      translations: ["*"],
                      logo: ["*"],
                      customer_story_page: ["permalink"],
                    },
                  ],
                  translations: ["*"],
                },
              ],
              translations: ["*"],
            },
          ],
          translations: ["*"],
          prev_icon: ["*"],
          next_icon: ["*"],
          story_button_icon: ["*"],
          stories: [
            "block_collection_customer_stories_item_id",
            {
              block_collection_customer_stories_item_id: [
                "*",
                {
                  translations: ["*"],
                  logo: ["*"],
                  customer_story_page: ["permalink"],
                },
              ],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function FeaturesStoriesCarrousel({
  data: { id },
  locale,
}: any) {
  const data = await FeaturesStoriesCarrouselData(id, locale);
  if (!data) return;

  const mappedItems = data.items.flatMap((item: any) => ({
    ...(item?.block_collection_item_id || {}),
    sort: item.sort,
  }));

  const groupedItems = groupBy(
    mappedItems,
    ({ collection_type }: { collection_type: string }) => collection_type,
  );

  const stories = groupedItems[
    FeaturesCollectionCarouselType.CUSTOMERS_STORIES
  ]?.map((item: any) => {
    return {
      collection_type: FeaturesCollectionCarouselType.CUSTOMERS_STORIES,
      ...item.story,
      externalLink: item.external_link,
      openInNewTab: item.open_in_new_tab,
      sort: item.sort,
    };
  });

  const news = groupedItems[FeaturesCollectionCarouselType.NEWS]?.map(
    (item: any) => {
      return {
        collection_type: FeaturesCollectionCarouselType.NEWS,
        ...item.post,
        externalLink: item.external_link,
        openInNewTab: item.open_in_new_tab,
        sort: item.sort,
      };
    },
  );
  const carouselNews = news?.length ? news : [];
  const carouselStories = stories?.length ? stories : [];
  const carouselCards = [...carouselStories, ...carouselNews];
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="w-svw overflow-hidden"
    >
      <Carousel>
        <FeaturesCollectionCarouselCards
          headline={data.headline}
          cards={carouselCards.sort((a, b) => a.sort - b.sort)}
          prevIcon={data.prev_icon}
          nextIcon={data.next_icon}
          buttonIcon={data.story_button_icon}
          buttonLabel={data.story_button_label}
        />
      </Carousel>
    </div>
  );
}
