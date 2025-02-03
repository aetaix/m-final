/* eslint-disable react-hooks/rules-of-hooks */
import { Models, ModelStatus, NavigationType } from "@/constants/enum";
import { defaultLocale } from "@/constants/locale";
import { Icon, Navigation, PagesBlock, Post } from "@/types/directus-schema";
import { applyTranslations } from "../translation";
import { useDirectus } from "./directus";

/**
 * Fetches page data by permalink, including all nested blocks and dynamically fetching blog posts if required.
 */

export const navigationQuery = [
  "items",
  {
    items: [
      "*",
      {
        translations: ["*"],
        icon: ["*"],
        children: [
          "*",
          {
            page: ["name", "permalink", "status", "slug"],
            post: ["slug"],
            translations: ["*"],
            icon: ["*"],
            children: [
              "*",
              {
                page: ["name", "permalink", "status", "slug"],
                post: ["slug"],
                translations: ["*"],
                icon: ["*"],
                children: [
                  "*",
                  {
                    page: ["name", "permalink", "status", "slug"],
                    post: ["slug"],
                    translations: ["*"],
                  },
                ],
              },
            ],
          },
        ],
        page: ["name", "permalink", "status", "slug"],
        post: ["slug"],
      },
    ],
    logo: ["*"],
    open_menu_icon: ["*"],
    close_menu_icon: ["*"],
  },
];

export const fetchPageData = async (
  permalink: string,
  locale: string = defaultLocale,
) => {
  const { directus, readItems } = useDirectus();
  try {
    const pageData = await directus.request(
      readItems(Models.PAGES, {
        filter: {
          permalink: { _eq: permalink },
          status: { _eq: ModelStatus.PUBLISHED },
        },
        deep: {
          translations: {
            _filter: { languages_code: { _eq: locale } },
          },
        },
        fields: [
          "title",
          "translations",
          "seo",
          {
            translations: ["*"],
            seo: ["*", { seo_translations: ["*"] }],
            blocks: [
              "collection",
              "item",
              "sort",
              {
                item: {
                  block_hero_logo_fields: ["id"],
                  block_hero: ["id"],
                  block_hero_models: [
                    "*",
                    {
                      translations: ["*"],
                      items: [
                        "block_hero_models_item_id",
                        {
                          block_hero_models_item_id: [
                            "*",
                            {
                              translations: ["*"],
                              button: [
                                "*",
                                {
                                  translations: ["*"],
                                  page: ["permalink"],
                                  post: ["slug"],
                                  icon: ["icons_id", { icons_id: ["*"] }],
                                },
                              ],
                              image: ["*"],
                            },
                          ],
                        },
                      ],
                      button_group: [
                        "*",
                        {
                          buttons: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["*", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_hero_customer_stories: [
                    "*",
                    {
                      translations: ["*"],
                      featured_story: [
                        "*",
                        {
                          translations: ["*"],
                          logo: ["*"],
                          modal_close_icon: ["*"],
                          customer_story_page: ["*"],
                        },
                      ],
                      button_icon: ["*"],
                    },
                  ],
                  block_collection_customer_stories: [
                    "*",
                    {
                      translations: ["*"],
                      item_button_icon: ["*"],
                      items: [
                        "*",
                        {
                          translations: ["*"],
                          logo: ["*"],
                          modal_close_icon: ["*"],
                          customer_story_page: ["*"],
                        },
                      ],
                    },
                  ],
                  block_hero_customer_stories_detail: [
                    "*",
                    {
                      translations: ["*"],
                      logo: ["*"],
                    },
                  ],
                  block_blog_details_hero: [
                    "*",
                    {
                      translations: ["*"],
                    },
                  ],
                  block_content: ["id"],
                  block_blog_content: [
                    "*",
                    {
                      translations: ["*"],
                      share_buttons: [
                        "*",
                        {
                          buttons: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["*", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                      resources_buttons: [
                        "*",
                        {
                          buttons: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["*", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_title_section: [
                    "*",
                    {
                      translations: ["*"],
                      icon: ["*"],
                    },
                  ],
                  block_free_from_html: [
                    "*",
                    {
                      translations: ["*"],
                    },
                  ],
                  block_listing: [
                    "*",
                    {
                      translations: ["*"],
                      item_icon: ["*"],
                      items: [
                        "*",
                        {
                          translations: ["*"],
                        },
                      ],
                    },
                  ],
                  block_quote: [
                    "*",
                    {
                      translations: ["*"],
                      quote_icon: ["*"],
                    },
                  ],
                  block_hero_internal: [
                    "*",
                    {
                      translations: ["*"],
                      button_group: [
                        "*",
                        {
                          buttons: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["*", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                      background_color: ["*"],
                    },
                  ],
                  block_404_page: [
                    "*",
                    {
                      translations: ["*"],
                      image: ["*"],
                      buttons: [
                        "*",
                        {
                          buttons: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["*", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_hero_lechat: ["id"],
                  block_hero_solutions: ["id"],
                  block_features_small_grid: [
                    "*",
                    {
                      items: [
                        "*",
                        {
                          translations: ["*"],
                          icon: ["*"],
                        },
                      ],
                    },
                  ],
                  block_deploy_models_grid: [
                    "*",
                    {
                      translations: ["*"],
                      button: [
                        "*",
                        {
                          translations: ["*"],
                          page: ["permalink"],
                          post: ["slug"],
                          icon: ["icons_id", { icons_id: ["*"] }],
                        },
                      ],
                      grid_items: [
                        "*",
                        {
                          translations: ["*"],
                          button: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["icons_id", { icons_id: ["*"] }],
                            },
                          ],
                          icon: ["*"],
                        },
                      ],
                    },
                  ],
                  block_models_accordion: [
                    "*",
                    {
                      translations: ["*"],
                      note: [
                        "*",
                        {
                          translations: ["*"],
                          icon: ["icons_id", { icons_id: ["*"] }],
                        },
                      ],
                      items: [
                        "*",
                        {
                          translations: ["*"],
                          button: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["icons_id", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_table: [
                    "*",
                    {
                      translations: ["*"],
                      rows: [
                        "*",
                        {
                          block_table_row_id: [
                            "*",
                            {
                              cells: [
                                "*",
                                { translations: ["*"], prepend_icon: ["*"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_models_custom: [
                    "*",
                    {
                      translations: ["*"],
                      items: [
                        "*",
                        {
                          translations: ["*"],
                          tab: [
                            "*",
                            {
                              translations: ["*"],
                              icon: ["icons_id", { icons_id: ["*"] }],
                            },
                          ],
                          image: ["*"],
                          button: [
                            "*",
                            {
                              translations: ["*"],
                              page: ["permalink"],
                              post: ["slug"],
                              icon: ["icons_id", { icons_id: ["*"] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  block_hero_bottom_image: ["id"],
                  block_features_alternating_sides: ["id"],
                  block_features_stats: ["id"],
                  block_hero_news: ["id"],
                  block_collection_news: ["id"],
                  block_features_inpage_anchored_sections: ["id"],
                  block_logo_fields: ["id"],
                  block_value_props_premium: ["id"],
                  block_value_props_standard: ["id"],
                  block_value_props_v2: ["id"],
                  block_value_props_v3: ["id"],
                  block_value_props_v4: ["id"],
                  block_value_props_horizontal_tabs: ["id"],
                  block_value_props_scrolling: ["id"],
                  block_value_props_mixed_horizontal_tabs: ["id"],
                  block_logo_fields_v2: ["id"],
                  block_promotional: ["id"],
                  block_promotional_v2: ["id"],
                  block_promotional_v3: ["id"],
                  block_promotional_v4: ["id"],
                  block_promotional_v5: ["id"],
                  block_cta_v2: ["id"],
                  block_cta: ["id"],
                  block_features_large_grid: ["id"],
                  block_features_icons_above: ["id"],
                  block_features_two_cards_with_icons: ["id"],
                  block_pricing: ["id"],
                  block_table_simple_rows: ["id"],
                  block_nav_footer: ["id"],
                  block_divider: ["*"],
                  block_button_group: ["id"],
                  block_table_multi_sections: ["id"],
                  block_logo_fields_grid: ["id"],
                  block_form_two_column: ["id"],
                  mixed_section: ["id"],
                  block_logo_cards: ["id"],
                  block_bullets_cards: ["id"],
                  block_scrolling_header: ["id"],
                  block_stories_carrousel: ["id"],
                  block_cta_group: ["id"],
                  rich_text: ["id"],
                  block_careers_hero: ["id"],
                  block_three_column_bullets: ["id"],
                  block_two_column_bullets: ["id"],
                  block_grid_inner_border: ["id"],
                  block_image_flexible: ["id"],
                  block_bullets_vertical_tabs: ["id"],
                  block_form_contact: ["id"],
                },
              },
            ],
          },
        ],
        limit: 1,
      }),
    );

    if (!pageData.length) {
      if (permalink === "/favicon.ico") {
        return {};
      }
      throw new Error("Page not found");
    }

    const page = pageData[0];

    if (Array.isArray(page.blocks)) {
      for (const block of page.blocks as PagesBlock[]) {
        if (
          block.collection === "block_posts" &&
          typeof block.item === "object" &&
          (block.item as any).collection === "posts"
        ) {
          const posts = await directus.request<Post[]>(
            readItems("posts", {
              fields: ["id", "title", "slug", "status"],
              filter: { status: { _eq: "published" } },
              sort: ["-user_updated"],
            }),
          );

          (block.item as any & { posts: Post[] }).posts = posts;
        }
      }
    }
    return applyTranslations(page, locale);
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw new Error("Failed to fetch page data");
  }
};

export async function getStaticPaths(
  type: NavigationType,
  locale: string = defaultLocale,
) {
  const { directus, readItems } = useDirectus();
  const [navigationData] = await directus.request(
    readItems(Models.NAVIGATION, {
      filter: { type: { _eq: type } },
      // @ts-ignore
      fields: navigationQuery,
    }),
  );
  const translatedNavigationData = applyTranslations(
    navigationData,
    locale,
  ) as Navigation;
  return translatedNavigationData;
}

/**
 * Fetches a single blog post by slug.
 */
export const fetchPostBySlug = async (
  slug: string,
  locale: string = defaultLocale,
) => {
  const { directus, readItems } = useDirectus();

  try {
    const posts = await directus.request(
      readItems(Models.POSTS, {
        filter: { slug: { _eq: slug } },
        limit: 1,
        fields: [
          "id",
          "cover",
          "date",
          "author",
          "with_form",
          {
            translations: ["*"],
            category: ["*"],
            form: [
              "*",
              {
                translations: ["*"],
                submit_cta: ["*", { translations: ["*"], icon: ["*"] }],
                fields: [
                  "*",
                  {
                    form_fields_id: ["*", { translations: ["*"] }],
                  },
                ],
              },
            ],
            cta: [
              "*",
              {
                translations: ["*"],
                buttons: [
                  "*",
                  {
                    buttons: [
                      "*",
                      {
                        translations: ["*"],
                        page: ["permalink"],
                        post: ["slug"],
                        icon: ["*", { icons_id: ["*"] }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    );

    return applyTranslations(posts[0] || null, locale);
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    throw new Error(`Failed to fetch post with slug "${slug}"`);
  }
};

/**
 * Fetches a single blog post by slug.
 */
export const fetchPostSeoBySlug = async (
  slug: string,
  locale: string = defaultLocale,
) => {
  const { directus, readItems } = useDirectus();

  try {
    const posts = await directus.request(
      readItems(Models.POSTS, {
        filter: { slug: { _eq: slug } },
        limit: 1,
        fields: [
          "translations",
          {
            // @ts-ignore
            translations: ["title", "description", "languages_code"],
            seo: ["*", { seo_translations: ["*"] }],
          },
        ],
      }),
    );

    return applyTranslations(posts[0] || null, locale);
  } catch (error) {
    console.error(`Error fetching post seo with slug "${slug}":`, error);
    throw new Error(`Failed to fetch post seo with slug "${slug}"`);
  }
};

export const fetchPosts = async (query?: any) => {
  const { directus, readItems } = useDirectus();

  const posts = await directus.request(
    readItems(Models.POSTS, { ...query, fields: ["*"] }),
  );

  return posts as any[];
};

export const fetchSocial = async () => {
  const { directus, readItems } = useDirectus();
  const items = await directus.request(
    readItems(Models.SOCIALS, {
      fields: ["name", "link", "logo", { logo: ["*"] }],
    }),
  );
  return items;
};

export const fetchIcon = async (name: string) => {
  const { directus, readItems } = useDirectus();
  const [item] = await directus.request(
    readItems(Models.ICONS, {
      filter: { name: { _eq: name } },
      fields: ["name", "image", "svg"],
    }),
  );
  return item as Icon;
};

export const fetchLanguages = async () => {
  const { directus, readItems } = useDirectus();
  const items = await directus.request(
    readItems(Models.LANGUAGES, {
      fields: ["*"],
    }),
  );
  return items;
};

export const fetchColors = async () => {
  const { directus, readItems } = useDirectus();
  const items = await directus.request(
    readItems("colors", {
      fields: ["*"],
    }),
  );
  return items;
};

export const fetchGlobal = async (locale = defaultLocale) => {
  const { directus, readSingleton } = useDirectus();
  const data = await directus.request(
    readSingleton("global", {
      fields: ["*"],
    }),
  );
  return applyTranslations(data, locale);
};
