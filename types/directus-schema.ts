export interface Block404Page {
  /** @required */
  id: number;
  sort?: number | null;
  image?: DirectusFile | string | null;
  buttons?: BlockButtonGroup | string | null;
  /** @required */
  name: string;
  translations?: Block404PageTranslation[] | null;
}

export interface Block404PageTranslation {
  /** @required */
  id: number;
  block_404_page_id?: Block404Page | string | null;
  languages_code?: Language | string | null;
  /** @required */
  headline: string;
  subheadline?: string | null;
}

export interface BlockBlogContent {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  share_buttons?: BlockButtonGroup | string | null;
  resources_buttons?: BlockButtonGroup | string | null;
  translations?: BlockBlogContentTranslation[] | null;
}

export interface BlockBlogContentTranslation {
  /** @required */
  id: number;
  block_blog_content_id?: BlockBlogContent | string | null;
  languages_code?: Language | string | null;
  /** @required */
  content: string;
  /** @required */
  share_button_text: string;
  /** @required */
  resources_button_text: string;
}

export interface BlockBlogDetailsHero {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  translations?: BlockBlogDetailsHeroTranslation[] | null;
}

export interface BlockBlogDetailsHeroTranslation {
  /** @required */
  id: number;
  block_blog_details_hero_id?: BlockBlogDetailsHero | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  company?: string | null;
  author?: string | null;
  creation_date?: string | null;
}

export interface BlockBulletsCard {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  bullets_icon?: Icon | string | null;
  anchor?: string | null;
  cards?: BlockBulletsCardsBlockBulletsCardsItem[] | string[];
}

export interface BlockBulletsCardsBlockBulletsCardsItem {
  /** @required */
  id: number;
  block_bullets_cards_id?: BlockBulletsCard | string | null;
  block_bullets_cards_item_id?: BlockBulletsCardsItem | string | null;
  sort?: number | null;
}

export interface BlockBulletsCardsItem {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockBulletsCardsItemTranslation[] | null;
  bullets?: BlockBulletsCardsItemBlockBulletsCardsItemBullet[] | string[];
}

export interface BlockBulletsCardsItemBlockBulletsCardsItemBullet {
  /** @required */
  id: number;
  block_bullets_cards_item_id?: BlockBulletsCardsItem | string | null;
  block_bullets_cards_item_bullets_id?:
    | BlockBulletsCardsItemBullet
    | string
    | null;
  sort?: number | null;
}

export interface BlockBulletsCardsItemBullet {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockBulletsCardsItemBulletsTranslation[] | null;
}

export interface BlockBulletsCardsItemBulletsTranslation {
  /** @required */
  id: number;
  block_bullets_cards_item_bullets_id?:
    | BlockBulletsCardsItemBullet
    | string
    | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface BlockBulletsCardsItemTranslation {
  /** @required */
  id: number;
  block_bullets_cards_item_id?: BlockBulletsCardsItem | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  body?: string | null;
}

export interface BlockBulletsCardsTranslation {
  /** @required */
  id: number;
  block_bullets_cards_id?: BlockBulletsCard | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  body?: string | null;
}

export interface BlockBulletsVerticalTab {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  bullet_icon?: Icon | string | null;
  active_icon?: Icon | string | null;
  translations?: BlockBulletsVerticalTabsTranslation[] | null;
  items?: BlockBulletsVerticalTabsBlockBulletsVerticalTabsItem[] | string[];
}

export interface BlockBulletsVerticalTabsBlockBulletsVerticalTabsItem {
  /** @required */
  id: number;
  block_bullets_vertical_tabs_id?: BlockBulletsVerticalTab | string | null;
  block_bullets_vertical_tabs_items_id?:
    | BlockBulletsVerticalTabsItem
    | string
    | null;
  sort?: number | null;
}

export interface BlockBulletsVerticalTabsItem {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  image?: DirectusFile | string | null;
  bullets?:
    | BlockBulletsVerticalTabsItemsBlockBulletsVerticalTabsItemsBullet[]
    | string[];
  translations?: BlockBulletsVerticalTabsItemsTranslation[] | null;
}

export interface BlockBulletsVerticalTabsItemsBlockBulletsVerticalTabsItemsBullet {
  /** @required */
  id: number;
  block_bullets_vertical_tabs_items_id?:
    | BlockBulletsVerticalTabsItem
    | string
    | null;
  block_bullets_vertical_tabs_items_bullets_id?:
    | BlockBulletsVerticalTabsItemsBullet
    | string
    | null;
  sort?: number | null;
}

export interface BlockBulletsVerticalTabsItemsBullet {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockBulletsVerticalTabsItemsBulletsTranslation[] | null;
}

export interface BlockBulletsVerticalTabsItemsBulletsTranslation {
  /** @required */
  id: number;
  block_bullets_vertical_tabs_items_bullets_id?:
    | BlockBulletsVerticalTabsItemsBullet
    | string
    | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface BlockBulletsVerticalTabsItemsTranslation {
  /** @required */
  id: number;
  block_bullets_vertical_tabs_items_id?:
    | BlockBulletsVerticalTabsItem
    | string
    | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface BlockBulletsVerticalTabsTranslation {
  /** @required */
  id: number;
  block_bullets_vertical_tabs_id?: BlockBulletsVerticalTab | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockButton {
  /** @required */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  type?: "pages" | "posts" | "external" | null;
  external_url?: string | null;
  post?: Post | string | null;
  page?: Page | string | null;
  button_group?: BlockButtonGroup | string | null;
  open_in_new_tab?: boolean | null;
  /** @required */
  name: string;
  visible?: boolean | null;
  group_id?: BlockCtaGroup | string | null;
  icon_position?: "start" | "end" | null;
  translations?: BlockButtonTranslation[] | null;
  icon?: BlockButtonIcon[] | string[];
}

export interface BlockButtonGroup {
  /** @required */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @description Describe where the buttons are placed @required */
  for: string;
  buttons?: BlockButton[] | string[];
}

export interface BlockButtonIcon {
  /** @required */
  id: number;
  block_button_id?: BlockButton | string | null;
  icons_id?: Icon | string | null;
}

export interface BlockButtonTranslation {
  /** @required */
  id: number;
  block_button_id?: BlockButton | string | null;
  languages_code?: Language | string | null;
  label?: string | null;
}

export interface BlockCareersHero {
  /** @required */
  id: number;
  sort?: number | null;
  buttons?: BlockCtaGroup | string | null;
  name?: string | null;
  translations?: BlockCareersHeroTranslation[] | null;
  images?: BlockCareersHeroBlockCareersHeroImage[] | string[];
}

export interface BlockCareersHeroBlockCareersHeroImage {
  /** @required */
  id: number;
  block_careers_hero_id?: BlockCareersHero | string | null;
  block_careers_hero_images_id?: BlockCareersHeroImage | string | null;
  sort?: number | null;
}

export interface BlockCareersHeroBlockImage {
  /** @required */
  id: number;
  block_careers_hero_id?: BlockCareersHero | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockCareersHeroFile {
  /** @required */
  id: number;
  block_careers_hero_id?: BlockCareersHero | string | null;
  directus_files_id?: DirectusFile | string | null;
}

export interface BlockCareersHeroImage {
  /** @required */
  id: number;
  sort?: number | null;
  image?: DirectusFile | string | null;
  name?: string | null;
}

export interface BlockCareersHeroTranslation {
  /** @required */
  id: number;
  block_careers_hero_id?: BlockCareersHero | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockClientsClient {
  /** @required */
  id: number;
  clients_id?: Client | string | null;
}

export interface BlockCollectionCustomerStory {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus. @required */
  name: string;
  item_button_icon?: Icon | string | null;
  anchor?: string | null;
  items?: BlockCollectionCustomerStoriesItem[] | string[];
  translations?: BlockCollectionCustomerStoriesTranslation[] | null;
}

export interface BlockCollectionCustomerStoriesItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  customer_story_page?: Page | string | null;
  parent?: BlockCollectionCustomerStory | string | null;
  logo?: BlockImage | string | null;
  /** @required */
  modal_close_icon: Icon | string;
  /** @description Height of the logo in pixels */
  logo_height?: number | null;
  translations?: BlockCollectionCustomerStoriesItemTranslation[] | null;
}

export interface BlockCollectionCustomerStoriesItemTranslation {
  /** @required */
  id: number;
  block_collection_customer_stories_item_id?:
    | BlockCollectionCustomerStoriesItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  modal_content?: string | null;
  description?: string | null;
}

export interface BlockCollectionCustomerStoriesTranslation {
  /** @required */
  id: number;
  block_collection_customer_stories_id?:
    | BlockCollectionCustomerStory
    | string
    | null;
  languages_code?: Language | string | null;
  item_button_text?: string | null;
}

export interface BlockCollectionItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  post?: Post | string | null;
  /** @required */
  collection_type: `customers-stories` | "news";
  story?: BlockCollectionCustomerStoriesItem | string | null;
  external_link?: string | null;
  open_in_new_tab?: boolean | null;
}

export interface BlockCollectionNew {
  /** @required */
  id: number;
  /** @required */
  name: string;
  /** @description Button icon for each item in the collection  */
  item_button_icon?: Icon | string | null;
  search_icon?: Icon | string | null;
  category_filter_icon?: Icon | string | null;
  navigation_left_icon?: Icon | string | null;
  navigation_right_icon?: Icon | string | null;
  number_of_items_per_page?: number | null;
  no_news_available_text?: string | null;
  anchor?: string | null;
  items?: Post[] | string[];
  categories?: PostsCategory[] | string[];
  translations?: BlockCollectionNewsTranslation[] | null;
}

export interface BlockCollectionNewsTranslation {
  /** @required */
  id: number;
  block_collection_news_id?: BlockCollectionNew | string | null;
  languages_code?: Language | string | null;
  /** @description Button text for each item in the collection  */
  item_button_text?: string | null;
  filter_by_category_title?: string | null;
  all_latest_news_text?: string | null;
  search_placeholder_text?: string | null;
}

export interface BlockContent {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  toc_icon?: Icon | string | null;
  translations?: BlockContentTranslation[] | null;
  items?: BlockContentItem[] | string[];
}

export interface BlockContentItem {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  parent?: BlockContent | string | null;
  translations?: BlockContentItemTranslation[] | null;
}

export interface BlockContentItemTranslation {
  /** @required */
  id: number;
  block_content_item_id?: BlockContentItem | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockContentTranslation {
  /** @required */
  id: number;
  block_content_id?: BlockContent | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockCta {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  background_image?: DirectusFile | string | null;
  background_image_mobile?: DirectusFile | string | null;
  translations?: BlockCtaTranslation[] | null;
}

export interface BlockCtaGroup {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  layout?: "centered" | "left" | "right" | null;
  buttons?: BlockButton[] | string[];
}

export interface BlockCtaTranslation {
  /** @required */
  id: number;
  block_cta_id?: BlockCta | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockCtaTry {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  buttons?: BlockButtonGroup | string | null;
  translations?: BlockCtaTryTranslation[] | null;
}

export interface BlockCtaTryTranslation {
  /** @required */
  id: number;
  block_cta_try_id?: BlockCtaTry | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  description?: string | null;
  bottom_text?: string | null;
  buttons_separator_text?: string | null;
}

export interface BlockCtaV2 {
  /** @required */
  id: number;
  sort?: number | null;
  image?: BlockImage | string | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  anchor?: string | null;
  translations?: BlockCtaV2Translation[] | null;
}

export interface BlockCtaV2Translation {
  /** @required */
  id: number;
  block_cta_v2_id?: BlockCtaV2 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockDeployModelsGrid {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  items_per_row?: number | null;
  anchor?: string | null;
  translations?: BlockDeployModelsGridTranslation[] | null;
  grid_items?: BlockDeployModelsGridItem[] | string[];
}

export interface BlockDeployModelsGridItem {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  grid_item_id?: BlockDeployModelsGrid | string | null;
  /** @required */
  name: string;
  icon?: Icon | string | null;
  translations?: BlockDeployModelsGridItemTranslation[] | null;
}

export interface BlockDeployModelsGridItemTranslation {
  /** @required */
  id: number;
  block_deploy_models_grid_item_id?: BlockDeployModelsGridItem | string | null;
  languages_code?: Language | string | null;
  /** @required */
  title: string;
  /** @required */
  description: string;
}

export interface BlockDeployModelsGridTranslation {
  /** @required */
  id: number;
  block_deploy_models_grid_id?: BlockDeployModelsGrid | string | null;
  languages_code?: Language | string | null;
  /** @required */
  headline: string;
  subheadline?: string | null;
}

export interface BlockDivider {
  /** @required */
  id: number;
  sort?: number | null;
  size?:
    | "20px"
    | "32px"
    | "40px"
    | "48px"
    | "64px"
    | "80px"
    | "96px"
    | "128px"
    | null;
  size_mobile?: "48px" | null;
}

export interface BlockFeaturesAlternatingSide {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  items?: BlockFeaturesAlternatingSidesItem[] | string[];
}

export interface BlockFeaturesAlternatingSidesItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  media_type?: "image" | "video" | null;
  image?: DirectusFile | string | null;
  parent?: BlockFeaturesAlternatingSide | string | null;
  /** @description Youtube Embed Link and Vimeo Link */
  video_url?: string | null;
  media_side?: "left" | "right" | null;
  button?: BlockButton | string | null;
  translations?: BlockFeaturesAlternatingSidesItemTranslation[] | null;
  items?: BlockFeaturesAlternatingSidesItemRichText[] | string[];
}

export interface BlockFeaturesAlternatingSidesItemRichText {
  /** @required */
  id: number;
  block_features_alternating_sides_item_id?:
    | BlockFeaturesAlternatingSidesItem
    | string
    | null;
  rich_text_id?: RichText | string | null;
}

export interface BlockFeaturesAlternatingSidesItemTranslation {
  /** @required */
  id: number;
  block_features_alternating_sides_item_id?:
    | BlockFeaturesAlternatingSidesItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesAlternatingSidesTranslation {
  /** @required */
  id: number;
  block_features_alternating_sides_id?:
    | BlockFeaturesAlternatingSide
    | string
    | null;
  languages_code?: Language | string | null;
}

export interface BlockFeaturesBasic {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  background_color?: Color | string | null;
  translations?: BlockFeaturesBasicTranslation[] | null;
}

export interface BlockFeaturesBasicTranslation {
  /** @required */
  id: number;
  block_features_basic_id?: BlockFeaturesBasic | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesIconsAbove {
  /** @required */
  id: number;
  sort?: number | null;
  variant?:
    | "simple_icons"
    | "simple_icons_with_cta"
    | "block_icons"
    | "block_with_bullets"
    | "simple_icons_compact"
    | null;
  items_per_row?: number | null;
  /** @required */
  name: string;
  heading_layout?: "left" | "center" | null;
  bullets_icon?: Icon | string | null;
  anchor?: string | null;
  items?: BlockFeaturesIconsAboveItem[] | string[];
  translations?: BlockFeaturesIconsAboveTranslation[] | null;
}

export interface BlockFeaturesIconsAboveItem {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  icon?: Icon | string | null;
  /** @required */
  name: string;
  parent_id?: BlockFeaturesIconsAbove | string | null;
  translations?: BlockFeaturesIconsAboveItemTranslation[] | null;
  bullets?:
    | BlockFeaturesIconsAboveItemBlockFeaturesIconsAboveItemBullet[]
    | string[];
}

export interface BlockFeaturesIconsAboveItemBlockFeaturesIconsAboveItemBullet {
  /** @required */
  id: number;
  block_features_icons_above_item_id?:
    | BlockFeaturesIconsAboveItem
    | string
    | null;
  block_features_icons_above_item_bullets_id?:
    | BlockFeaturesIconsAboveItemBullet
    | string
    | null;
  sort?: number | null;
}

export interface BlockFeaturesIconsAboveItemBullet {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockFeaturesIconsAboveItemBulletsTranslation[] | null;
}

export interface BlockFeaturesIconsAboveItemBulletsTranslation {
  /** @required */
  id: number;
  block_features_icons_above_item_bullets_id?:
    | BlockFeaturesIconsAboveItemBullet
    | string
    | null;
  languages_code?: Language | string | null;
  label?: string | null;
}

export interface BlockFeaturesIconsAboveItemTranslation {
  /** @required */
  id: number;
  block_features_icons_above_item_id?:
    | BlockFeaturesIconsAboveItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesIconsAboveTranslation {
  /** @required */
  id: number;
  block_features_icons_above_id?: BlockFeaturesIconsAbove | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesInpageAnchoredSection {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  active_icon?: Icon | string | null;
  /** @required */
  tabs: BlockFeaturesInpageAnchoredSectionsTab[] | string[];
  translations?: BlockFeaturesInpageAnchoredSectionsTranslation[] | null;
}

export interface BlockFeaturesInpageAnchoredSectionsTab {
  /** @required */
  id: number;
  parent?: BlockFeaturesInpageAnchoredSection | string | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  sort?: number | null;
  icon?: Icon | string | null;
  menu_position?: "left" | "right" | null;
  anchor?: string | null;
  translations?: BlockFeaturesInpageAnchoredSectionsTabTranslations1[] | null;
  items?: BlockFeaturesInpageAnchoredSectionsTabItem[] | string[];
}

export interface BlockFeaturesInpageAnchoredSectionsTabItem {
  /** @required */
  id: number;
  sort?: number | null;
  parent?: BlockFeaturesInpageAnchoredSectionsTab | string | null;
  /** @description Name to identify the item in directus */
  name?: string | null;
  icon?: Icon | string | null;
  action?: BlockButton | string | null;
  /** @required */
  background_image: DirectusFile | string;
  hovering_image?: DirectusFile | string | null;
  translations?: BlockFeaturesInpageAnchoredSectionsTabItemTranslation[] | null;
}

export interface BlockFeaturesInpageAnchoredSectionsTabItemTranslation {
  /** @required */
  id: number;
  block_features_inpage_anchored_sections_tab_item_id?:
    | BlockFeaturesInpageAnchoredSectionsTabItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesInpageAnchoredSectionsTabTranslation {
  /** @required */
  id: number;
  block_features_inpage_anchored_sections_tab_id?:
    | BlockFeaturesInpageAnchoredSectionsTab
    | string
    | null;
  languages_code?: Language | string | null;
}

export interface BlockFeaturesInpageAnchoredSectionsTabTranslations1 {
  /** @required */
  id: number;
  block_features_inpage_anchored_sections_tab_id?:
    | BlockFeaturesInpageAnchoredSectionsTab
    | string
    | null;
  languages_code?: Language | string | null;
  title?: string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesInpageAnchoredSectionsTranslation {
  /** @required */
  id: number;
  block_features_inpage_anchored_sections_id?:
    | BlockFeaturesInpageAnchoredSection
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesLargeGrid {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button?: BlockButton | string | null;
  items_per_row?: number | null;
  anchor?: string | null;
  translations?: BlockFeaturesLargeGridTranslation[] | null;
  items?: BlockFeaturesLargeGridItem[] | string[];
}

export interface BlockFeaturesLargeGridItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  image?: BlockImage | string | null;
  parent?: BlockFeaturesLargeGrid | string | null;
  button?: BlockButton | string | null;
  translations?: BlockFeaturesLargeGridItemTranslation[] | null;
}

export interface BlockFeaturesLargeGridItemTranslation {
  /** @required */
  id: number;
  block_features_large_grid_item_id?:
    | BlockFeaturesLargeGridItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesLargeGridTranslation {
  /** @required */
  id: number;
  block_features_large_grid_id?: BlockFeaturesLargeGrid | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesSmallGrid {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  items_per_row?: number | null;
  items?: BlockFeaturesSmallGridItem[] | string[];
  translations?: BlockFeaturesSmallGridTranslation[] | null;
}

export interface BlockFeaturesSmallGridItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  icon?: Icon | string | null;
  parent?: BlockFeaturesSmallGrid | string | null;
  translations?: BlockFeaturesSmallGridItemTranslation[] | null;
}

export interface BlockFeaturesSmallGridItemTranslation {
  /** @required */
  id: number;
  block_features_small_grid_item_id?:
    | BlockFeaturesSmallGridItem
    | string
    | null;
  languages_code?: Language | string | null;
  /** @required */
  title: string;
  description?: string | null;
}

export interface BlockFeaturesSmallGridTranslation {
  /** @required */
  id: number;
  block_features_small_grid_id?: BlockFeaturesSmallGrid | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFeaturesStat {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  variant?: "ample" | "compact" | null;
  translations?: BlockFeaturesStatsTranslation[] | null;
  items?: BlockFeaturesStatsItem[] | string[];
}

export interface BlockFeaturesStatsItem {
  /** @required */
  id: number;
  sort?: number | null;
  parent?: BlockFeaturesStat | string | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  icon?: Icon | string | null;
  translations?: BlockFeaturesStatsItemTranslation[] | null;
}

export interface BlockFeaturesStatsItemTranslation {
  /** @required */
  id: number;
  block_features_stats_item_id?: BlockFeaturesStatsItem | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  description?: string | null;
}

export interface BlockFeaturesStatsTranslation {
  /** @required */
  id: number;
  block_features_stats_id?: BlockFeaturesStat | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesTwoCardsWithIcon {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  section_id?: string | null;
  anchor?: string | null;
  translations?: BlockFeaturesTwoCardsWithIconsTranslation[] | null;
  items?: BlockFeaturesTwoCardsWithIconsItem[] | string[];
}

export interface BlockFeaturesTwoCardsWithIconsItem {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  icon?: Icon | string | null;
  parent_id?: BlockFeaturesTwoCardsWithIcon | string | null;
  /** @required */
  name: string;
  translations?: BlockFeaturesTwoCardsWithIconsItemTranslation[] | null;
}

export interface BlockFeaturesTwoCardsWithIconsItemTranslation {
  /** @required */
  id: number;
  block_features_two_cards_with_icons_item_id?:
    | BlockFeaturesTwoCardsWithIconsItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockFeaturesTwoCardsWithIconsTranslation {
  /** @required */
  id: number;
  block_features_two_cards_with_icons_id?:
    | BlockFeaturesTwoCardsWithIcon
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockFormContact {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  buttons?: BlockButtonGroup | string | null;
  form?: Form | string | null;
  translations?: BlockFormContactTranslation[] | null;
}

export interface BlockFormContactFormsFormField {
  /** @required */
  id: number;
  block_form_contact_id?: BlockFormContact | string | null;
  forms_form_fields_id?: FormsFormField | string | null;
}

export interface BlockFormContactTranslation {
  /** @required */
  id: number;
  block_form_contact_id?: BlockFormContact | string | null;
  languages_code?: Language | string | null;
  body?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  form_success_headline?: string | null;
  form_success_subheadline?: string | null;
  submission_consent_msg?: string | null;
}

export interface BlockFormTwoColumn {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  logo?: Icon | string | null;
  addon_img?: BlockImage | string | null;
  form?: Form | string | null;
  translations?: BlockFormTwoColumnTranslation[] | null;
}

export interface BlockFormTwoColumnFormField {
  /** @required */
  id: number;
  block_form_two_column_id?: BlockFormTwoColumn | string | null;
  form_fields_id?: FormField | string | null;
  sort?: number | null;
}

export interface BlockFormTwoColumnTranslation {
  /** @required */
  id: number;
  block_form_two_column_id?: BlockFormTwoColumn | string | null;
  languages_code?: Language | string | null;
  description?: string | null;
  success_form_headline?: string | null;
  success_form_subheadline?: string | null;
  submission_consent_msg?: string | null;
}

export interface BlockFreeFromHtml {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  headline_type?: "h1" | "h2" | "h3" | "h4" | null;
  spacing_bottom?: number | null;
  spacing_bottom_mobile?: number | null;
  translations?: BlockFreeFromHtmlTranslation[] | null;
}

export interface BlockFreeFromHtmlTranslation {
  /** @required */
  id: number;
  block_free_from_html_id?: BlockFreeFromHtml | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  content?: string | null;
}

export interface BlockGridInnerBorder {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  items_per_row?: number | null;
  items?: BlockGridInnerBorderBlockGridInnerBorderItem[] | string[];
  translations?: BlockGridInnerBorderTranslation[] | null;
}

export interface BlockGridInnerBorderBlockGridInnerBorderItem {
  /** @required */
  id: number;
  block_grid_inner_border_id?: BlockGridInnerBorder | string | null;
  block_grid_inner_border_items_id?: BlockGridInnerBorderItem | string | null;
}

export interface BlockGridInnerBorderItem {
  /** @required */
  id: number;
  sort?: number | null;
  icon?: Icon | string | null;
  name?: string | null;
  buttons?: BlockButtonGroup | string | null;
  translations?: BlockGridInnerBorderItemsTranslation[] | null;
}

export interface BlockGridInnerBorderItemsTranslation {
  /** @required */
  id: number;
  block_grid_inner_border_items_id?: BlockGridInnerBorderItem | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockGridInnerBorderTranslation {
  /** @required */
  id: number;
  block_grid_inner_border_id?: BlockGridInnerBorder | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockHero {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  background_image?: DirectusFile | string | null;
  headline_color?: Color | string | null;
  subheadline_color?: Color | string | null;
  input_url?: string | null;
  input_submit_icon?: Icon | string | null;
  cta_color?: Color | string | null;
  background_image_blur?: DirectusFile | string | null;
  translations?: BlockHeroTranslation[] | null;
}

export interface BlockHeroBottomImage {
  /** @required */
  id: number;
  sort?: number | null;
  buttons?: BlockButtonGroup | string | null;
  image?: DirectusFile | string | null;
  name?: string | null;
  heading_layout?: "wide" | "contained" | null;
  translations?: BlockHeroBottomImageTranslation[] | null;
}

export interface BlockHeroBottomImageTranslation {
  /** @required */
  id: number;
  block_hero_bottom_image_id?: BlockHeroBottomImage | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroCustomerStory {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  button_icon?: Icon | string | null;
  /** @required */
  featured_story: BlockCollectionCustomerStoriesItem | string;
  translations?: BlockHeroCustomerStoriesTranslation[] | null;
}

export interface BlockHeroCustomerStoriesDetail {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  logo?: BlockImage | string | null;
  translations?: BlockHeroCustomerStoriesDetailTranslation[] | null;
}

export interface BlockHeroCustomerStoriesDetailTranslation {
  /** @required */
  id: number;
  block_hero_customer_stories_detail_id?:
    | BlockHeroCustomerStoriesDetail
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockHeroCustomerStoriesTranslation {
  /** @required */
  id: number;
  block_hero_customer_stories_id?: BlockHeroCustomerStory | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  button_text?: string | null;
}

export interface BlockHeroInternal {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  background_media?: "image" | "video_url" | null;
  background_image?: DirectusFile | string | null;
  background_video_url?: string | null;
  button_group?: BlockButtonGroup | string | null;
  media_position?: `full-bleed-bg` | "left" | "right" | null;
  background_color?: Color | string | null;
  image?: DirectusFile | string | null;
  size?: "standard" | "compact" | null;
  translations?: BlockHeroInternalTranslation[] | null;
}

export interface BlockHeroInternalTranslation {
  /** @required */
  id: number;
  block_hero_internal_id?: BlockHeroInternal | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroLechat {
  /** @required */
  id: number;
  sort?: number | null;
  background_image?: DirectusFile | string | null;
  input_placeholder?: string | null;
  button_group?: BlockButtonGroup | string | null;
  /** @required */
  name: string;
  input_redirect_link?: string | null;
  input_button_label?: string | null;
  input_icon?: Icon | string | null;
  input_button_icon?: Icon | string | null;
  background_image_mobile?: DirectusFile | string | null;
  translations?: BlockHeroLechatTranslation[] | null;
  sample_prompts?: BlockHeroLechatPrompt[] | string[];
}

export interface BlockHeroLechatPrompt {
  /** @required */
  id: number;
  sort?: number | null;
  prompt_id?: BlockHeroLechat | string | null;
  /** @required */
  name: string;
  translations?: BlockHeroLechatPromptsTranslation[] | null;
}

export interface BlockHeroLechatPromptsTranslation {
  /** @required */
  id: number;
  block_hero_lechat_prompts_id?: BlockHeroLechatPrompt | string | null;
  languages_code?: Language | string | null;
  prompt?: string | null;
}

export interface BlockHeroLechatTranslation {
  /** @required */
  id: number;
  block_hero_lechat_id?: BlockHeroLechat | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  sample_title?: string | null;
}

export interface BlockHeroLogoField {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockHeroLogoFieldsTranslation[] | null;
  logos?: BlockHeroLogoFieldsBlockImage[] | string[];
}

export interface BlockHeroLogoFieldsBlockImage {
  /** @required */
  id: number;
  block_hero_logo_fields_id?: BlockHeroLogoField | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockHeroLogoFieldsTranslation {
  /** @required */
  id: number;
  block_hero_logo_fields_id?: BlockHeroLogoField | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroModel {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  translations?: BlockHeroModelsTranslation[] | null;
  items?: BlockHeroModelsBlockHeroModelsItem[] | string[];
}

export interface BlockHeroModelsBlockHeroModelsItem {
  /** @required */
  id: number;
  block_hero_models_id?: BlockHeroModel | string | null;
  block_hero_models_item_id?: BlockHeroModelsItem | string | null;
  sort?: number | null;
}

export interface BlockHeroModelsBlockImage {
  /** @required */
  id: number;
  block_hero_models_id?: BlockHeroModel | string | null;
  block_image_id?: BlockImage | string | null;
}

export interface BlockHeroModelsImage {
  /** @required */
  id: number;
  block_hero_models_id?: BlockHeroModel | string | null;
  item?: BlockImage | string | null;
  collection?: string | null;
}

export interface BlockHeroModelsItem {
  /** @required */
  id: number;
  sort?: number | null;
  image?: BlockImage | string | null;
  button?: BlockButton | string | null;
  /** @required */
  name: string;
  translations?: BlockHeroModelsItemTranslation[] | null;
}

export interface BlockHeroModelsItemTranslation {
  /** @required */
  id: number;
  block_hero_models_item_id?: BlockHeroModelsItem | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface BlockHeroModelsTranslation {
  /** @required */
  id: number;
  block_hero_models_id?: BlockHeroModel | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroNew {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element on directus @required */
  name: string;
  featured_post?: Post | string | null;
  featured_post_button_text?: string | null;
  featured_post_button_icon?: Icon | string | null;
  translations?: BlockHeroNewsTranslation[] | null;
}

export interface BlockHeroNewsTranslation {
  /** @required */
  id: number;
  block_hero_news_id?: BlockHeroNew | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroSolution {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  translations?: BlockHeroSolutionsTranslation[] | null;
}

export interface BlockHeroSolutionsTranslation {
  /** @required */
  id: number;
  block_hero_solutions_id?: BlockHeroSolution | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockHeroTranslation {
  /** @required */
  id: number;
  block_hero_id?: BlockHero | string | null;
  languages_code?: Language | string | null;
  /** @required */
  headline: string;
  subheadline?: string | null;
  input_placeholder?: string | null;
}

export interface BlockImage {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  /** @required */
  file: DirectusFile | string;
  file_white?: DirectusFile | string | null;
  file_black?: DirectusFile | string | null;
  tags?: any | null;
  hero_id?: BlockCareersHero | string | null;
  translations?: BlockImageTranslations1[] | null;
}

export interface BlockImageFlexible {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  image?: DirectusFile | string | null;
}

export interface BlockImageTranslation {
  /** @required */
  id: number;
  languages_code?: Language | string | null;
  description?: string | null;
}

export interface BlockImageTranslations1 {
  /** @required */
  id: number;
  block_image_id?: BlockImage | string | null;
  languages_code?: Language | string | null;
  description?: string | null;
}

export interface BlockListing {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  item_icon?: Icon | string | null;
  sort?: number | null;
  spacing_bottom?: number | null;
  spacing_bottom_mobile?: number | null;
  translations?: BlockListingTranslation[] | null;
  items?: BlockListingItem[] | string[];
}

export interface BlockListingItem {
  /** @required */
  id: number;
  sort?: number | null;
  parent?: BlockListing | string | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  translations?: BlockListingItemTranslation[] | null;
}

export interface BlockListingItemTranslation {
  /** @required */
  id: number;
  block_listing_item_id?: BlockListingItem | string | null;
  languages_code?: Language | string | null;
  highlighted_text?: string | null;
  text?: string | null;
}

export interface BlockListingTranslation {
  /** @required */
  id: number;
  block_listing_id?: BlockListing | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockLogoCard {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  anchor?: string | null;
  translations?: BlockLogoCardsTranslation[] | null;
  cards?: BlockLogoCardsBlockImage[] | string[];
}

export interface BlockLogoCardsBlockImage {
  /** @required */
  id: number;
  block_logo_cards_id?: BlockLogoCard | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockLogoCardsTranslation {
  /** @required */
  id: number;
  block_logo_cards_id?: BlockLogoCard | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockLogoField {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  anchor?: string | null;
  images?: BlockLogoFieldsBlockImage[] | string[];
}

export interface BlockLogoFieldsBlockImage {
  /** @required */
  id: number;
  block_logo_fields_id?: BlockLogoField | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockLogoFieldsGrid {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  name?: string | null;
  anchor?: string | null;
  translations?: BlockLogoFieldsGridTranslation[] | null;
  images?: BlockLogoFieldsGridBlockImage[] | string[];
}

export interface BlockLogoFieldsGridBlockImage {
  /** @required */
  id: number;
  block_logo_fields_grid_id?: BlockLogoFieldsGrid | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockLogoFieldsGridTranslation {
  /** @required */
  id: number;
  block_logo_fields_grid_id?: BlockLogoFieldsGrid | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockLogoFieldsV2 {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button_group?: BlockButtonGroup | string | null;
  anchor?: string | null;
  translations?: BlockLogoFieldsV2Translation[] | null;
  images?: BlockLogoFieldsV2BlockImage[] | string[];
}

export interface BlockLogoFieldsV2BlockImage {
  /** @required */
  id: number;
  block_logo_fields_v2_id?: BlockLogoFieldsV2 | string | null;
  block_image_id?: BlockImage | string | null;
  sort?: number | null;
}

export interface BlockLogoFieldsV2Translation {
  /** @required */
  id: number;
  block_logo_fields_v2_id?: BlockLogoFieldsV2 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockModelsAccordion {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  note?: BlockButton | string | null;
  anchor?: string | null;
  translations?: BlockModelsAccordionTranslation[] | null;
  items?: BlockModelsAccordionItem[] | string[];
}

export interface BlockModelsAccordionItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  /** @required */
  description_icon: DirectusFile | string;
  button?: BlockButton | string | null;
  item_id?: BlockModelsAccordion | string | null;
  translations?: BlockModelsAccordionItemTranslation[] | null;
}

export interface BlockModelsAccordionItemTranslation {
  /** @required */
  id: number;
  block_models_accordion_item_id?: BlockModelsAccordionItem | string | null;
  languages_code?: Language | string | null;
  /** @required */
  short_desc: string;
  /** @required */
  long_desc: string;
  /** @required */
  title: string;
}

export interface BlockModelsAccordionTranslation {
  /** @required */
  id: number;
  block_models_accordion_id?: BlockModelsAccordion | string | null;
  languages_code?: Language | string | null;
  /** @required */
  heading: string;
}

export interface BlockModelsCustom {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  anchor?: string | null;
  translations?: BlockModelsCustomTranslation[] | null;
  items?: BlockModelsCustomItem[] | string[];
}

export interface BlockModelsCustomItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  /** @required */
  tab: BlockButton | string;
  /** @required */
  button: BlockButton | string;
  item_id?: BlockModelsCustom | string | null;
  /** @required */
  image: DirectusFile | string;
  translations?: BlockModelsCustomItemTranslation[] | null;
}

export interface BlockModelsCustomItemTranslation {
  /** @required */
  id: number;
  block_models_custom_item_id?: BlockModelsCustomItem | string | null;
  languages_code?: Language | string | null;
  /** @required */
  title: string;
  /** @required */
  description: string;
}

export interface BlockModelsCustomTranslation {
  /** @required */
  id: number;
  block_models_custom_id?: BlockModelsCustom | string | null;
  languages_code?: Language | string | null;
  /** @required */
  heading: string;
  /** @required */
  subheading: string;
}

export interface BlockNavFooter {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  copyright?: string | null;
  manage_cookies?: BlockButton | string | null;
  navigation?: Navigation | string | null;
  language_selector?: boolean | null;
  languages?: BlockNavFooterLanguage[] | string[];
  socials?: BlockNavFooterSocial[] | string[];
}

export interface BlockNavFooterLanguage {
  /** @required */
  id: number;
  block_nav_footer_id?: BlockNavFooter | string | null;
  languages_code?: Language | string | null;
}

export interface BlockNavFooterSocial {
  /** @required */
  id: number;
  block_nav_footer_id?: BlockNavFooter | string | null;
  socials_id?: Social | string | null;
}

export interface BlockPricing {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  items?: BlockPricingPricing[] | string[];
  translations?: BlockPricingTranslations3[] | null;
  anchor?: string | null;
}

export interface BlockPricingPricing {
  /** @required */
  id: number;
  block_pricing_id?: BlockPricing | string | null;
  pricing_id?: Pricing | string | null;
  sort?: number | null;
}

export interface BlockPricingTranslation {
  /** @required */
  id: number;
  block_pricing_id?: BlockPricing | string | null;
  languages_code?: Language | string | null;
}

export interface BlockPricingTranslations1 {
  /** @required */
  id: number;
  block_pricing_id?: BlockPricing | string | null;
  pricing_translations_id?: PricingTranslation | string | null;
}

export interface BlockPricingTranslations2 {
  /** @required */
  id: number;
  block_pricing_id?: BlockPricing | string | null;
  block_pricing_translations_id?: BlockPricingTranslation | string | null;
  /** @required */
  headline: string;
}

export interface BlockPricingTranslations3 {
  /** @required */
  id: number;
  block_pricing_id?: BlockPricing | string | null;
  languages_code?: Language | string | null;
  /** @required */
  headline: string;
}

export interface BlockPromotional {
  /** @required */
  id: number;
  sort?: number | null;
  icon?: Icon | string | null;
  /** @description Name to identify element in directus @required */
  name: string;
  post?: Post | string | null;
  background_color?: Color | string | null;
  text_color?: Color | string | null;
  button?: BlockButton | string | null;
  date?: string | null;
  anchor?: string | null;
  translations?: BlockPromotionalTranslation[] | null;
}

export interface BlockPromotionalTranslation {
  /** @required */
  id: number;
  block_promotional_id?: BlockPromotional | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  headline?: string | null;
}

export interface BlockPromotionalV2 {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  post?: Post | string | null;
  icon?: Icon | string | null;
  background_color?: Color | string | null;
  text_color?: Color | string | null;
  image?: DirectusFile | string | null;
  button?: BlockButton | string | null;
  date?: string | null;
  image_position?: "left" | "right" | null;
  anchor?: string | null;
  translations?: BlockPromotionalV2Translation[] | null;
}

export interface BlockPromotionalV2Translation {
  /** @required */
  id: number;
  block_promotional_v2_id?: BlockPromotionalV2 | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  headline?: string | null;
}

export interface BlockPromotionalV3 {
  /** @required */
  id: number;
  sort?: number | null;
  text_color?: Color | string | null;
  image?: DirectusFile | string | null;
  button?: BlockButton | string | null;
  /** @required */
  name: string;
  anchor?: string | null;
  translations?: BlockPromotionalV3Translation[] | null;
}

export interface BlockPromotionalV3Translation {
  /** @required */
  id: number;
  block_promotional_v3_id?: BlockPromotionalV3 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockPromotionalV4 {
  /** @required */
  id: number;
  sort?: number | null;
  image?: DirectusFile | string | null;
  button?: BlockButton | string | null;
  /** @required */
  name: string;
  text_color?: Color | string | null;
  background_color?: Color | string | null;
  addon_img?: BlockImage | string | null;
  variant?: "image" | "no_image" | null;
  anchor?: string | null;
  translations?: BlockPromotionalV4Translation[] | null;
}

export interface BlockPromotionalV4Translation {
  /** @required */
  id: number;
  block_promotional_v4_id?: BlockPromotionalV4 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockPromotionalV5 {
  /** @required */
  id: number;
  /** @description Name to identify the element in directus @required */
  name: string;
  image?: BlockImage | string | null;
  action?: BlockButton | string | null;
  translations?: BlockPromotionalV5Translation[] | null;
  anchor?: string | null;
}

export interface BlockPromotionalV5Translation {
  /** @required */
  id: number;
  block_promotional_v5_id?: BlockPromotionalV5 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockQuote {
  /** @required */
  id: number;
  sort?: number | null;
  author?: string | null;
  author_company?: string | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  /** @required */
  quote_icon: Icon | string;
  spacing_bottom?: number | null;
  spacing_bottom_mobile?: number | null;
  translations?: BlockQuoteTranslation[] | null;
}

export interface BlockQuoteTranslation {
  /** @required */
  id: number;
  block_quote_id?: BlockQuote | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
  author_role?: string | null;
}

export interface BlockScrollingHeader {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  anchor?: string | null;
  translations?: BlockScrollingHeaderTranslation[] | null;
}

export interface BlockScrollingHeaderTranslation {
  /** @required */
  id: number;
  block_scrolling_header_id?: BlockScrollingHeader | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface BlockStoriesCarrousel {
  /** @required */
  id: number;
  sort?: number | null;
  prev_icon?: Icon | string | null;
  next_icon?: Icon | string | null;
  name?: string | null;
  story_button_icon?: Icon | string | null;
  anchor?: string | null;
  stories?:
    | BlockStoriesCarrouselBlockCollectionCustomerStoriesItem[]
    | string[];
  translations?: BlockStoriesCarrouselTranslation[] | null;
  items?: BlockStoriesCarrouselBlockCollectionItem[] | string[];
}

export interface BlockStoriesCarrouselBlockCollectionCustomerStoriesItem {
  /** @required */
  id: number;
  block_stories_carrousel_id?: BlockStoriesCarrousel | string | null;
  block_collection_customer_stories_item_id?:
    | BlockCollectionCustomerStoriesItem
    | string
    | null;
  sort?: number | null;
}

export interface BlockStoriesCarrouselBlockCollectionItem {
  /** @required */
  id: number;
  block_stories_carrousel_id?: BlockStoriesCarrousel | string | null;
  block_collection_item_id?: BlockCollectionItem | string | null;
  sort?: number | null;
}

export interface BlockStoriesCarrouselTranslation {
  /** @required */
  id: number;
  block_stories_carrousel_id?: BlockStoriesCarrousel | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  story_button_label?: string | null;
}

export interface BlockTable {
  /** @required */
  id: number;
  sort?: number | null;
  has_header?: boolean | null;
  /** @required */
  name: string;
  caption_position?: "top" | "bottom" | null;
  anchor?: string | null;
  translations?: BlockTableTranslation[] | null;
  rows?: BlockTableBlockTableRow[] | string[];
}

export interface BlockTableBlockTableRow {
  /** @required */
  id: number;
  block_table_id?: BlockTable | string | null;
  block_table_row_id?: BlockTableRow | string | null;
  sort?: number | null;
}

export interface BlockTableCell {
  /** @required */
  id: number;
  sort?: number | null;
  display?: boolean | null;
  prepend_icon?: Icon | string | null;
  row_id?: BlockTableRow | string | null;
  rowspan?: number | null;
  colspan?: number | null;
  font_size?: "sm" | "base" | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  type?: "text" | "price" | null;
  dollar?: number | null;
  euro?: number | null;
  translations?: BlockTableCellTranslation[] | null;
}

export interface BlockTableCellTranslation {
  /** @required */
  id: number;
  block_table_cell_id?: BlockTableCell | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
  dollar?: number | null;
  euro?: number | null;
  type?: "text" | "price" | null;
}

export interface BlockTableMultiSection {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  open_icon?: Icon | string | null;
  close_icon?: Icon | string | null;
  heading?: boolean | null;
  anchor?: string | null;
  translations?: BlockTableMultiSectionsTranslation[] | null;
  sections?: BlockTableMultiSectionsBlockTableMultiSectionsSection[] | string[];
}

export interface BlockTableMultiSectionsBlockTableMultiSectionsSection {
  /** @required */
  id: number;
  block_table_multi_sections_id?: BlockTableMultiSection | string | null;
  block_table_multi_sections_sections_id?:
    | BlockTableMultiSectionsSection
    | string
    | null;
  sort?: number | null;
}

export interface BlockTableMultiSectionsSection {
  /** @required */
  id: number;
  sort?: number | null;
  table?: BlockTable | string | null;
  name?: string | null;
  translations?: BlockTableMultiSectionsSectionsTranslation[] | null;
}

export interface BlockTableMultiSectionsSectionsTranslation {
  /** @required */
  id: number;
  block_table_multi_sections_sections_id?:
    | BlockTableMultiSectionsSection
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockTableMultiSectionsTranslation {
  /** @required */
  id: number;
  block_table_multi_sections_id?: BlockTableMultiSection | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockTableRow {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  as_caption?: boolean | null;
  cells?: BlockTableCell[] | string[];
}

export interface BlockTableSimpleRow {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  button?: BlockButton | string | null;
  table?: TableSimpleRow | string | null;
  section_id?: string | null;
  anchor?: string | null;
  translations?: BlockTableSimpleRowsTranslation[] | null;
}

export interface BlockTableSimpleRowsTranslation {
  /** @required */
  id: number;
  block_table_simple_rows_id?: BlockTableSimpleRow | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockTableTranslation {
  /** @required */
  id: number;
  block_table_id?: BlockTable | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  caption?: string | null;
}

export interface BlockThreeColumnBullet {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  desktop_background?: DirectusFile | string | null;
  mobile_background?: DirectusFile | string | null;
  translations?: BlockThreeColumnBulletsTranslation[] | null;
  bullets?: BlockThreeColumnBulletsBlockBulletsCardsItemBullet[] | string[];
  anchor?: string | null;
}

export interface BlockThreeColumnBulletsBlockBulletsCardsItemBullet {
  /** @required */
  id: number;
  block_three_column_bullets_id?: BlockThreeColumnBullet | string | null;
  block_bullets_cards_item_bullets_id?:
    | BlockBulletsCardsItemBullet
    | string
    | null;
  sort?: number | null;
}

export interface BlockThreeColumnBulletsTranslation {
  /** @required */
  id: number;
  block_three_column_bullets_id?: BlockThreeColumnBullet | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockTitleSection {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  icon?: Icon | string | null;
  spacing_bottom?: number | null;
  spacing_bottom_mobile?: number | null;
  translations?: BlockTitleSectionTranslation[] | null;
}

export interface BlockTitleSectionTranslation {
  /** @required */
  id: number;
  block_title_section_id?: BlockTitleSection | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockTwoColumnBullet {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  bullet_icon?: Icon | string | null;
  image?: DirectusFile | string | null;
  anchor?: string | null;
  translations?: BlockTwoColumnBulletsTranslation[] | null;
  bullets?: BlockTwoColumnBulletsBlockTwoColumnBulletsItem[] | string[];
}

export interface BlockTwoColumnBulletsBlockTwoColumnBulletsItem {
  /** @required */
  id: number;
  block_two_column_bullets_id?: BlockTwoColumnBullet | string | null;
  block_two_column_bullets_items_id?: BlockTwoColumnBulletsItem | string | null;
  sort?: number | null;
}

export interface BlockTwoColumnBulletsItem {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  translations?: BlockTwoColumnBulletsItemsTranslation[] | null;
}

export interface BlockTwoColumnBulletsItemsTranslation {
  /** @required */
  id: number;
  block_two_column_bullets_items_id?: BlockTwoColumnBulletsItem | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface BlockTwoColumnBulletsTranslation {
  /** @required */
  id: number;
  block_two_column_bullets_id?: BlockTwoColumnBullet | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsHorizontalTab {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  tabs_active_icon?: Icon | string | null;
  section_id?: string | null;
  anchor?: string | null;
  translations?: BlockValuePropsHorizontalTabsTranslation[] | null;
  items?: BlockValuePropsHorizontalTabsItem[] | string[];
}

export interface BlockValuePropsHorizontalTabsItem {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  image?: DirectusFile | string | null;
  parent_id?: BlockValuePropsHorizontalTab | string | null;
  /** @required */
  name: string;
  translations?: BlockValuePropsHorizontalTabsItemTranslation[] | null;
}

export interface BlockValuePropsHorizontalTabsItemTranslation {
  /** @required */
  id: number;
  block_value_props_horizontal_tabs_item_id?:
    | BlockValuePropsHorizontalTabsItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockValuePropsHorizontalTabsTranslation {
  /** @required */
  id: number;
  block_value_props_horizontal_tabs_id?:
    | BlockValuePropsHorizontalTab
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsMixedHorizontalTab {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  tabs_active_icon?: Icon | string | null;
  section_id?: string | null;
  anchor?: string | null;
  translations?: BlockValuePropsMixedHorizontalTabsTranslation[] | null;
  items?: BlockValuePropsMixedHorizontalTabsItem[] | string[];
}

export interface BlockValuePropsMixedHorizontalTabsItem {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  parent_id?: BlockValuePropsMixedHorizontalTab | string | null;
  translations?: BlockValuePropsMixedHorizontalTabsItemsTranslation[] | null;
  block?: BlockValuePropsMixedHorizontalTabsItemsBlock[] | string[];
}

export interface BlockValuePropsMixedHorizontalTabsItemsBlock {
  /** @required */
  id: number;
  block_value_props_mixed_horizontal_tabs_items_id?:
    | BlockValuePropsMixedHorizontalTabsItem
    | string
    | null;
  item?:
    | BlockTableMultiSection
    | BlockLogoFieldsGrid
    | BlockFormTwoColumn
    | string
    | null;
  collection?: string | null;
}

export interface BlockValuePropsMixedHorizontalTabsItemsTranslation {
  /** @required */
  id: number;
  block_value_props_mixed_horizontal_tabs_items_id?:
    | BlockValuePropsMixedHorizontalTabsItem
    | string
    | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface BlockValuePropsMixedHorizontalTabsTranslation {
  /** @required */
  id: number;
  block_value_props_mixed_horizontal_tabs_id?:
    | BlockValuePropsMixedHorizontalTab
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsPremium {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  image?: BlockImage | string | null;
  anchor?: string | null;
  translations?: BlockValuePropsPremiumTranslation[] | null;
  items?: BlockValuePropsPremiumItem[] | string[];
}

export interface BlockValuePropsPremiumBlockValuePropsPremiumItem {
  /** @required */
  id: number;
  block_value_props_premium_id?: BlockValuePropsPremium | string | null;
  block_value_props_premium_item_id?:
    | BlockValuePropsPremiumItem
    | string
    | null;
}

export interface BlockValuePropsPremiumItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  parent: BlockValuePropsPremium | string;
  icon?: Icon | string | null;
  /** @description Name to identify element in directus @required */
  name: string;
  translations?: BlockValuePropsPremiumItemTranslation[] | null;
}

export interface BlockValuePropsPremiumItemTranslation {
  /** @required */
  id: number;
  block_value_props_premium_item_id?:
    | BlockValuePropsPremiumItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsPremiumTranslation {
  /** @required */
  id: number;
  block_value_props_premium_id?: BlockValuePropsPremium | string | null;
  languages_code?: Language | string | null;
  /** @required */
  headline: string;
}

export interface BlockValuePropsScrolling {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  active_icon?: Icon | string | null;
  section_id?: string | null;
  shrinked_header?: boolean | null;
  anchor?: string | null;
  translations?: BlockValuePropsScrollingTranslation[] | null;
  items?: BlockValuePropsScrollingItem[] | string[];
}

export interface BlockValuePropsScrollingItem {
  /** @required */
  id: number;
  sort?: number | null;
  button?: BlockButton | string | null;
  image?: DirectusFile | string | null;
  parent_id?: BlockValuePropsScrolling | string | null;
  name?: string | null;
  translations?: BlockValuePropsScrollingItemTranslation[] | null;
}

export interface BlockValuePropsScrollingItemTranslation {
  /** @required */
  id: number;
  block_value_props_scrolling_item_id?:
    | BlockValuePropsScrollingItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  body?: string | null;
}

export interface BlockValuePropsScrollingTranslation {
  /** @required */
  id: number;
  block_value_props_scrolling_id?: BlockValuePropsScrolling | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockValuePropsStandard {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  active_icon?: Icon | string | null;
  section_id?: string | null;
  anchor?: string | null;
  translations?: BlockValuePropsStandardTranslation[] | null;
  /** @description Name to identify element in directus */
  items?: BlockValuePropsStandardItem[] | string[];
}

export interface BlockValuePropsStandardItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  parent_id?: BlockValuePropsStandard | string | null;
  button_group?: BlockButtonGroup | string | null;
  /** @required */
  image: DirectusFile | string;
  background_image?: DirectusFile | string | null;
  /** @required */
  background_type: "image" | "color";
  background_color?: Color | string | null;
  image_padding?: boolean | null;
  translations?: BlockValuePropsStandardItemTranslation[] | null;
}

export interface BlockValuePropsStandardItemTranslation {
  /** @required */
  id: number;
  block_value_props_standard_item_id?:
    | BlockValuePropsStandardItem
    | string
    | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsStandardTranslation {
  /** @required */
  id: number;
  block_value_props_standard_id?: BlockValuePropsStandard | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsV2 {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  items?: BlockValuePropsV2Item[] | string[];
  anchor?: string | null;
  translations?: BlockValuePropsV2Translation[] | null;
}

export interface BlockValuePropsV2Item {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify element in directus @required */
  name: string;
  button?: BlockButton | string | null;
  image?: BlockImage | string | null;
  parent?: BlockValuePropsV2 | string | null;
  translations?: BlockValuePropsV2ItemTranslations1[] | null;
}

export interface BlockValuePropsV2ItemTranslation {
  /** @required */
  id: number;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsV2ItemTranslations1 {
  /** @required */
  id: number;
  block_value_props_v2_item_id?: BlockValuePropsV2Item | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsV2Translation {
  /** @required */
  id: number;
  block_value_props_v2_id?: BlockValuePropsV2 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface BlockValuePropsV3 {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  /** @required */
  name: string;
  anchor?: string | null;
  translations?: BlockValuePropsV3Translation[] | null;
  propositions?: BlockValuePropsV3Item[] | string[];
}

export interface BlockValuePropsV3Item {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  image?: DirectusFile | string | null;
  value_prop_v3_id?: BlockValuePropsV3 | string | null;
  /** @required */
  name: string;
  options?: BlockValuePropsV3ItemCalloutOption[] | string[];
}

export interface BlockValuePropsV3ItemCalloutOption {
  /** @required */
  id: number;
  sort?: number | null;
  callout_item_id?: BlockValuePropsV3Item | string | null;
  /** @required */
  name: string;
  icon?: BlockValuePropsV3ItemCalloutOptionIcon[] | string[];
  translations?: BlockValuePropsV3ItemCalloutOptionTranslation[] | null;
}

export interface BlockValuePropsV3ItemCalloutOptionIcon {
  /** @required */
  id: number;
  block_value_props_v3_item_callout_option_id?:
    | BlockValuePropsV3ItemCalloutOption
    | string
    | null;
  icons_id?: Icon | string | null;
}

export interface BlockValuePropsV3ItemCalloutOptionTranslation {
  /** @required */
  id: number;
  block_value_props_v3_item_callout_option_id?:
    | BlockValuePropsV3ItemCalloutOption
    | string
    | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface BlockValuePropsV3Translation {
  /** @required */
  id: number;
  block_value_props_v3_id?: BlockValuePropsV3 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export interface BlockValuePropsV4 {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  background_type?: "image" | "color" | null;
  background_image?: DirectusFile | string | null;
  /** @required */
  name: string;
  background_color?: Color | string | null;
  anchor?: string | null;
  translations?: BlockValuePropsV4Translation[] | null;
  items?: BlockValuePropsV4Item[] | string[];
}

export interface BlockValuePropsV4Item {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  value_prop_v4_id?: BlockValuePropsV4 | string | null;
  /** @required */
  name: string;
  answer_icon?: Icon | string | null;
  icon?: Icon | string | null;
  translations?: BlockValuePropsV4ItemTranslation[] | null;
}

export interface BlockValuePropsV4ItemTranslation {
  /** @required */
  id: number;
  block_value_props_v4_item_id?: BlockValuePropsV4Item | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
  subheadline?: string | null;
  prompt?: string | null;
  answer_time?: string | null;
  answer?: string | null;
}

export interface BlockValuePropsV4Translation {
  /** @required */
  id: number;
  block_value_props_v4_id?: BlockValuePropsV4 | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface Client {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  display_on_hero?: boolean | null;
}

export interface Color {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  /** @required */
  value: string;
  value_dark?: string | null;
}

export interface FormCta {
  /** @required */
  id: number;
  sort?: number | null;
  icon?: Icon | string | null;
  name?: string | null;
  translations?: FormCtaTranslation[] | null;
}

export interface FormCtaTranslation {
  /** @required */
  id: number;
  form_cta_id?: FormCta | string | null;
  languages_code?: Language | string | null;
  label?: string | null;
}

export interface FormField {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  /** @required */
  type:
    | "email"
    | "select"
    | "text"
    | "textarea"
    | "checkbox"
    | `checkbox-group`
    | `country-select`;
  required?: boolean | null;
  width?: "100" | "50" | null;
  is_multi_choices?: boolean | null;
  show_label?: boolean | null;
  error_validation_msg?: string | null;
  translations?: FormFieldsTranslation[] | null;
  choices?: FormFieldsChoice[] | string[];
}

export interface FormFieldsChoice {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  parent?: FormField | string | null;
  translations?: FormFieldsChoicesTranslation[] | null;
}

export interface FormFieldsChoicesTranslation {
  /** @required */
  id: number;
  form_fields_choices_id?: FormFieldsChoice | string | null;
  languages_code?: Language | string | null;
  /** @required */
  text: string;
  label?: string | null;
}

export interface FormFieldsTranslation {
  /** @required */
  id: number;
  form_fields_id?: FormField | string | null;
  languages_code?: Language | string | null;
  label?: string | null;
  placeholder?: string | null;
  label_rich?: string | null;
}

export interface Form {
  /** @required */
  id: number;
  sort?: number | null;
  method?: "POST" | "GET" | null;
  action_url?: string | null;
  submit_cta?: FormCta | string | null;
  name?: string | null;
  fields?: FormsFormField[] | string[];
  translations?: FormsTranslation[] | null;
}

export interface FormsFormField {
  /** @required */
  id: number;
  forms_id?: Form | string | null;
  form_fields_id?: FormField | string | null;
  sort?: number | null;
}

export interface FormsTranslation {
  /** @required */
  id: number;
  forms_id?: Form | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  note?: string | null;
  description?: string | null;
  success_submission_headline?: string | null;
  success_submission_subheadline?: string | null;
  submission_consent_msg?: string | null;
}

export interface Global {
  /** @required */
  id: number;
  company_name?: string | null;
  logo?: BlockImage | string | null;
  logo_mini?: BlockImage | string | null;
}

export interface Icon {
  /** @required */
  id: number;
  /** @required */
  name: string;
  image?: DirectusFile | string | null;
  image_dark_mode?: DirectusFile | string | null;
  svg?: string | null;
  svg_dark_mode?: string | null;
}

export interface Inbox {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
}

export interface Language {
  /** @required */
  code: string;
  name?: string | null;
  direction?: "ltr" | "rtl" | null;
}

export interface MixedSection {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  anchor?: string | null;
  translations?: MixedSectionTranslation[] | null;
  blocks?: MixedSectionBlock[] | string[];
}

export interface MixedSectionBlock {
  /** @required */
  id: number;
  mixed_section_id?: MixedSection | string | null;
  item?: BlockLogoCard | string | null;
  collection?: string | null;
}

export interface MixedSectionTranslation {
  /** @required */
  id: number;
  mixed_section_id?: MixedSection | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface Navigation {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  title?: string | null;
  /** @required */
  type: "footer" | "header";
  logo?: Icon | string | null;
  open_menu_icon?: Icon | string | null;
  close_menu_icon?: Icon | string | null;
  parent?: BlockNavFooter | string | null;
  items?: NavigationItem[] | string[];
}

export interface NavigationItem {
  /** @required */
  id: number;
  sort?: number | null;
  url?: string | null;
  open_in_new_tab?: boolean | null;
  has_children?: boolean | null;
  page?: Page | string | null;
  parent?: NavigationItem | string | null;
  navigation?: Navigation | string | null;
  type?: "url" | "page" | null;
  /** @description Name of the element in directus @required */
  name: string;
  is_button?: boolean | null;
  icon?: Icon | string | null;
  children?: NavigationItem[] | string[];
  translations?: NavigationItemsTranslation[] | null;
}

export interface NavigationItemsTranslation {
  /** @required */
  id: number;
  navigation_items_id?: NavigationItem | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface Page {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  slug?: string | null;
  /** @required */
  seo: Seo | string;
  /** @description Prefix of the URL that will be displayed on the browser to reach this page. */
  permalink?: string | null;
  /** @required */
  name: string;
  title?: string | null;
  /** @required */
  type: "Normal" | `Customer Story`;
  logo?: BlockImage | string | null;
  blocks?: PagesBlock[] | string[];
  translations?: PagesTranslation[] | null;
}

export interface PagesBlock {
  /** @required */
  id: number;
  pages_id?: Page | string | null;
  item?:
    | BlockHero
    | BlockHeroLechat
    | BlockHeroSolution
    | BlockHeroBottomImage
    | BlockHeroLogoField
    | BlockHeroNew
    | BlockCareersHero
    | BlockHeroInternal
    | BlockLogoField
    | BlockLogoFieldsV2
    | BlockLogoFieldsGrid
    | BlockValuePropsPremium
    | BlockValuePropsStandard
    | BlockValuePropsV2
    | BlockValuePropsV3
    | BlockValuePropsV4
    | BlockValuePropsHorizontalTab
    | BlockValuePropsScrolling
    | BlockValuePropsMixedHorizontalTab
    | BlockPromotional
    | BlockPromotionalV2
    | BlockPromotionalV3
    | BlockPromotionalV4
    | BlockPromotionalV5
    | BlockCtaV2
    | BlockCta
    | BlockFeaturesSmallGrid
    | BlockFeaturesAlternatingSide
    | BlockFeaturesLargeGrid
    | BlockFeaturesIconsAbove
    | BlockFeaturesTwoCardsWithIcon
    | BlockFeaturesInpageAnchoredSection
    | BlockBulletsCard
    | BlockStoriesCarrousel
    | BlockThreeColumnBullet
    | BlockTwoColumnBullet
    | BlockBulletsVerticalTab
    | BlockFeaturesStat
    | BlockGridInnerBorder
    | BlockPricing
    | BlockTableSimpleRow
    | BlockTableMultiSection
    | BlockFormTwoColumn
    | BlockFormContact
    | BlockButtonGroup
    | BlockCtaGroup
    | BlockDivider
    | BlockHeroModel
    | BlockDeployModelsGrid
    | BlockModelsCustom
    | BlockModelsAccordion
    | BlockTable
    | MixedSection
    | BlockLogoCard
    | RichText
    | BlockImageFlexible
    | BlockScrollingHeader
    | BlockHeroCustomerStory
    | BlockHeroCustomerStoriesDetail
    | BlockCollectionNew
    | BlockCollectionCustomerStory
    | BlockTitleSection
    | BlockListing
    | BlockQuote
    | BlockBlogDetailsHero
    | BlockContent
    | BlockBlogContent
    | Block404Page
    | BlockNavFooter
    | BlockFreeFromHtml
    | string
    | null;
  collection?: string | null;
  sort?: number | null;
}

export interface PagesTranslation {
  /** @required */
  id: number;
  pages_id?: Page | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface Post {
  /** @required */
  id: string;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  title?: string | null;
  /** @required */
  slug: string;
  cover?: DirectusFile | string | null;
  parent?: BlockCollectionNew | string | null;
  author?: string | null;
  date?: string | null;
  category?: PostsCategory | string | null;
  content?: string | null;
  description?: string | null;
  count?: number | null;
  seo?: Seo | string | null;
  with_form?: boolean | null;
  form?: Form | string | null;
  cta?: BlockCtaTry | string | null;
  translations?: PostsTranslation[] | null;
}

export interface PostsCategory {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to identify the element in directus @required */
  name: string;
  parent?: BlockCollectionNew | string | null;
  translations?: PostsCategoriesTranslation[] | null;
}

export interface PostsCategoriesTranslation {
  /** @required */
  id: number;
  posts_categories_id?: PostsCategory | string | null;
  languages_code?: Language | string | null;
  name?: string | null;
}

export interface PostsTranslation {
  /** @required */
  id: number;
  posts_id?: Post | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  description?: string | null;
  content?: string | null;
}

export interface Pricing {
  /** @required */
  id: number;
  sort?: number | null;
  /** @description Name to idenfy the element in directus @required */
  name: string;
  buttons?: BlockButtonGroup | string | null;
  price?: PricingOptionPrice | string | null;
  special_term_toggle?: boolean | null;
  special_terms?: string | null;
  pricing_type?: "number" | "text" | null;
  custom_text?: string | null;
  translations?: PricingTranslation[] | null;
  features?: PricingPricingItem[] | string[];
  /** @description Add one entry per frequency and currency, the dollar price will be default. @required */
  prices: PricingOptionPrice[] | string[];
}

export interface PricingItem {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  icon?: Icon | string | null;
  translations?: PricingItemTranslation[] | null;
}

export interface PricingItemTranslation {
  /** @required */
  id: number;
  pricing_item_id?: PricingItem | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface PricingOptionPrice {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  amount: number;
  /** @required */
  currency: "dollar" | "euro";
  /** @required */
  frequency: "month" | "year";
  pricing_id?: Pricing | string | null;
}

export interface PricingPricingItem {
  /** @required */
  id: number;
  pricing_id?: Pricing | string | null;
  pricing_item_id?: PricingItem | string | null;
  sort?: number | null;
}

export interface PricingTranslation {
  /** @required */
  id: number;
  pricing_id?: Pricing | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  description?: string | null;
}

export interface RichText {
  /** @required */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  icon?: Icon | string | null;
  layout?: "wide" | "centered" | "left" | "right" | null;
  translations?: RichTextTranslation[] | null;
}

export interface RichTextTranslation {
  /** @required */
  id: number;
  rich_text_id?: RichText | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface Seo {
  /** @required */
  id: number;
  og_image?: DirectusFile | string | null;
  canonical_url?: string | null;
  /** @description Instruct crawlers not to follow links on this page. */
  no_follow?: boolean | null;
  /** @description Instruct crawlers not to index this entry. */
  no_index?: boolean | null;
  /** @required */
  name: string;
  author?: string | null;
  title?: string | null;
  meta_description?: string | null;
  favicon?: DirectusFile | string | null;
  seo_translations?: SeoTranslation[] | null;
}

export interface SeoTranslation {
  /** @required */
  id: number;
  seo_id?: Seo | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
  meta_description?: string | null;
}

export interface Social {
  /** @required */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  /** @required */
  link: string;
  logo?: BlockImage | string | null;
  /** @required */
  name: string;
}

export interface TableSimpleRow {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  has_featured_header?: boolean | null;
  header_icon?: Icon | string | null;
  titles_icon?: Icon | string | null;
  rows?: TableSimpleRowsTableSimpleRowsRow[] | string[];
  translations?: TableSimpleRowsTranslation[] | null;
}

export interface TableSimpleRowsRow {
  /** @required */
  id: number;
  sort?: number | null;
  name?: string | null;
  variant?: "standard" | "bullets" | null;
  translations?: TableSimpleRowsRowsTranslation[] | null;
  items?: TableSimpleRowsRowsItem[] | string[];
}

export interface TableSimpleRowsRowsItem {
  /** @required */
  id: number;
  sort?: number | null;
  row_id?: TableSimpleRowsRow | string | null;
  name?: string | null;
  translations?: TableSimpleRowsRowsItemsTranslation[] | null;
}

export interface TableSimpleRowsRowsItemsTranslation {
  /** @required */
  id: number;
  table_simple_rows_rows_items_id?: TableSimpleRowsRowsItem | string | null;
  languages_code?: Language | string | null;
  content?: string | null;
}

export interface TableSimpleRowsRowsTranslation {
  /** @required */
  id: number;
  table_simple_rows_rows_id?: TableSimpleRowsRow | string | null;
  languages_code?: Language | string | null;
  title?: string | null;
}

export interface TableSimpleRowsTableSimpleRowsRow {
  /** @required */
  id: number;
  table_simple_rows_id?: TableSimpleRow | string | null;
  table_simple_rows_rows_id?: TableSimpleRowsRow | string | null;
  sort?: number | null;
}

export interface TableSimpleRowsTranslation {
  /** @required */
  id: number;
  table_simple_rows_id?: TableSimpleRow | string | null;
  languages_code?: Language | string | null;
  headline?: string | null;
}

export interface TestimonialsTranslation {
  /** @required */
  id: number;
  languages_code?: Language | string | null;
}

export interface DirectusAccess {
  /** @required */
  id: string;
  role?: DirectusRole | string | null;
  user?: DirectusUser | string | null;
  policy?: DirectusPolicy | string;
  sort?: number | null;
}

export interface DirectusActivity {
  /** @required */
  id: number;
  action?: string;
  user?: DirectusUser | string | null;
  timestamp?: string;
  ip?: string | null;
  user_agent?: string | null;
  collection?: string;
  item?: string;
  origin?: string | null;
  revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
  /** @required */
  collection: string;
  icon?: string | null;
  note?: string | null;
  display_template?: string | null;
  hidden?: boolean;
  singleton?: boolean;
  translations?: Array<{
    language: string;
    translation: string;
    singular: string;
    plural: string;
  }> | null;
  archive_field?: string | null;
  archive_app_filter?: boolean;
  archive_value?: string | null;
  unarchive_value?: string | null;
  sort_field?: string | null;
  accountability?: "all" | "activity" | null | null;
  color?: string | null;
  item_duplication_fields?: any | null;
  sort?: number | null;
  group?: DirectusCollection | string | null;
  collapse?: string;
  preview_url?: string | null;
  versioning?: boolean;
}

export interface DirectusComment {
  /** @required */
  id: string;
  collection?: DirectusCollection | string;
  item?: string;
  comment?: string;
  date_created?: string | null;
  date_updated?: string | null;
  user_created?: DirectusUser | string | null;
  user_updated?: DirectusUser | string | null;
}

export interface DirectusField {
  /** @required */
  id: number;
  collection?: DirectusCollection | string;
  field?: string;
  special?: string[] | null;
  interface?: string | null;
  options?: any | null;
  display?: string | null;
  display_options?: any | null;
  readonly?: boolean;
  hidden?: boolean;
  sort?: number | null;
  width?: string | null;
  translations?: any | null;
  note?: string | null;
  conditions?: any | null;
  required?: boolean | null;
  group?: DirectusField | string | null;
  validation?: any | null;
  validation_message?: string | null;
}

export interface DirectusFile {
  /** @required */
  id: string;
  storage?: string;
  filename_disk?: string | null;
  filename_download?: string;
  title?: string | null;
  type?: string | null;
  folder?: DirectusFolder | string | null;
  uploaded_by?: DirectusUser | string | null;
  created_on?: string;
  modified_by?: DirectusUser | string | null;
  modified_on?: string;
  charset?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  embed?: string | null;
  description?: string | null;
  location?: string | null;
  tags?: string[] | null;
  metadata?: any | null;
  focal_point_x?: number | null;
  focal_point_y?: number | null;
  tus_id?: string | null;
  tus_data?: any | null;
  uploaded_on?: string | null;
}

export interface DirectusFolder {
  /** @required */
  id: string;
  name?: string;
  parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
  /** @required */
  version: string;
  name?: string;
  timestamp?: string | null;
}

export interface DirectusPermission {
  /** @required */
  id: number;
  collection?: string;
  action?: string;
  permissions?: any | null;
  validation?: any | null;
  presets?: any | null;
  fields?: string[] | null;
  policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
  /** @required */
  id: string;
  /** @required */
  name: string;
  icon?: string;
  description?: string | null;
  ip_access?: string[] | null;
  enforce_tfa?: boolean;
  admin_access?: boolean;
  app_access?: boolean;
  permissions?: DirectusPermission[] | string[];
  users?: DirectusAccess[] | string[];
  roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
  /** @required */
  id: number;
  bookmark?: string | null;
  user?: DirectusUser | string | null;
  role?: DirectusRole | string | null;
  collection?: string | null;
  search?: string | null;
  layout?: string | null;
  layout_query?: any | null;
  layout_options?: any | null;
  refresh_interval?: number | null;
  filter?: any | null;
  icon?: string | null;
  color?: string | null;
}

export interface DirectusRelation {
  /** @required */
  id: number;
  many_collection?: string;
  many_field?: string;
  one_collection?: string | null;
  one_field?: string | null;
  one_collection_field?: string | null;
  one_allowed_collections?: string[] | null;
  junction_field?: string | null;
  sort_field?: string | null;
  one_deselect_action?: string;
}

export interface DirectusRevision {
  /** @required */
  id: number;
  activity?: DirectusActivity | string;
  collection?: string;
  item?: string;
  data?: any | null;
  delta?: any | null;
  parent?: DirectusRevision | string | null;
  version?: DirectusVersion | string | null;
}

export interface DirectusRole {
  /** @required */
  id: string;
  /** @required */
  name: string;
  icon?: string;
  description?: string | null;
  parent?: DirectusRole | string | null;
  children?: DirectusRole[] | string[];
  policies?: DirectusAccess[] | string[];
  users?: DirectusUser[] | string[];
}

export interface DirectusSession {
  /** @required */
  token: string;
  user?: DirectusUser | string | null;
  expires?: string;
  ip?: string | null;
  user_agent?: string | null;
  share?: DirectusShare | string | null;
  origin?: string | null;
  next_token?: string | null;
}

export interface DirectusSettings {
  /** @required */
  id: number;
  project_name?: string;
  project_url?: string | null;
  project_color?: string;
  project_logo?: DirectusFile | string | null;
  public_foreground?: DirectusFile | string | null;
  public_background?: DirectusFile | string | null;
  public_note?: string | null;
  auth_login_attempts?: number | null;
  auth_password_policy?:
    | null
    | `/^.{8,}$/`
    | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{\';\'?>.<,])(?!.*\\s).*$/`
    | null;
  storage_asset_transform?: "all" | "none" | "presets" | null;
  storage_asset_presets?: Array<{
    key: string;
    fit: "contain" | "cover" | "inside" | "outside";
    width: number;
    height: number;
    quality: number;
    withoutEnlargement: boolean;
    format: "auto" | "jpeg" | "png" | "webp" | "tiff" | "avif";
    transforms: any;
  }> | null;
  custom_css?: string | null;
  storage_default_folder?: DirectusFolder | string | null;
  basemaps?: Array<{
    name: string;
    type: "raster" | "tile" | "style";
    url: string;
    tileSize: number;
    attribution: string;
  }> | null;
  mapbox_key?: string | null;
  module_bar?: any | null;
  project_descriptor?: string | null;
  default_language?: string;
  custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
  public_favicon?: DirectusFile | string | null;
  default_appearance?: "auto" | "light" | "dark";
  default_theme_light?: string | null;
  theme_light_overrides?: any | null;
  default_theme_dark?: string | null;
  theme_dark_overrides?: any | null;
  report_error_url?: string | null;
  report_bug_url?: string | null;
  report_feature_url?: string | null;
  public_registration?: boolean;
  public_registration_verify_email?: boolean;
  public_registration_role?: DirectusRole | string | null;
  public_registration_email_filter?: any | null;
}

export interface DirectusUser {
  /** @required */
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
  location?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: string[] | null;
  avatar?: DirectusFile | string | null;
  language?: string | null;
  tfa_secret?: string | null;
  status?:
    | "draft"
    | "invited"
    | "unverified"
    | "active"
    | "suspended"
    | "archived";
  role?: DirectusRole | string | null;
  token?: string | null;
  last_access?: string | null;
  last_page?: string | null;
  provider?: string;
  external_identifier?: string | null;
  auth_data?: any | null;
  email_notifications?: boolean | null;
  appearance?: null | "auto" | "light" | "dark" | null;
  theme_dark?: string | null;
  theme_light?: string | null;
  theme_light_overrides?: any | null;
  theme_dark_overrides?: any | null;
  policies?: DirectusAccess[] | string[];
}

export interface DirectusWebhook {
  /** @required */
  id: number;
  name?: string;
  method?: null;
  url?: string;
  status?: "active" | "inactive";
  data?: boolean;
  actions?: string[];
  collections?: string[];
  headers?: Array<{ header: string; value: string }> | null;
  was_active_before_deprecation?: boolean;
  migrated_flow?: DirectusFlow | string | null;
}

export interface DirectusDashboard {
  /** @required */
  id: string;
  name?: string;
  icon?: string;
  note?: string | null;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
  color?: string | null;
  panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
  /** @required */
  id: string;
  dashboard?: DirectusDashboard | string;
  name?: string | null;
  icon?: string | null;
  color?: string | null;
  show_header?: boolean;
  note?: string | null;
  type?: string;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
  options?: any | null;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
  /** @required */
  id: number;
  timestamp?: string | null;
  status?: string | null;
  recipient?: DirectusUser | string;
  sender?: DirectusUser | string | null;
  subject?: string;
  message?: string | null;
  collection?: string | null;
  item?: string | null;
}

export interface DirectusShare {
  /** @required */
  id: string;
  name?: string | null;
  collection?: DirectusCollection | string;
  item?: string;
  role?: DirectusRole | string | null;
  password?: string | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  date_start?: string | null;
  date_end?: string | null;
  times_used?: number | null;
  max_uses?: number | null;
}

export interface DirectusFlow {
  /** @required */
  id: string;
  name?: string;
  icon?: string | null;
  color?: string | null;
  description?: string | null;
  status?: string;
  trigger?: string | null;
  accountability?: string | null;
  options?: any | null;
  operation?: DirectusOperation | string | null;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
  operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
  /** @required */
  id: string;
  name?: string | null;
  key?: string;
  type?: string;
  position_x?: number;
  position_y?: number;
  options?: any | null;
  resolve?: DirectusOperation | string | null;
  reject?: DirectusOperation | string | null;
  flow?: DirectusFlow | string;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
  /** @required */
  id: string;
  /** @required */
  language: string;
  /** @required */
  key: string;
  /** @required */
  value: string;
}

export interface DirectusVersion {
  /** @required */
  id: string;
  key?: string;
  name?: string | null;
  collection?: DirectusCollection | string;
  item?: string;
  hash?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  user_created?: DirectusUser | string | null;
  user_updated?: DirectusUser | string | null;
  delta?: any | null;
}

export interface DirectusExtension {
  enabled?: boolean;
  /** @required */
  id: string;
  folder?: string;
  source?: string;
  bundle?: string | null;
}

export interface Schema {
  block_404_page: Block404Page[];
  block_404_page_translations: Block404PageTranslation[];
  block_blog_content: BlockBlogContent[];
  block_blog_content_translations: BlockBlogContentTranslation[];
  block_blog_details_hero: BlockBlogDetailsHero[];
  block_blog_details_hero_translations: BlockBlogDetailsHeroTranslation[];
  block_bullets_cards: BlockBulletsCard[];
  block_bullets_cards_block_bullets_cards_item: BlockBulletsCardsBlockBulletsCardsItem[];
  block_bullets_cards_item: BlockBulletsCardsItem[];
  block_bullets_cards_item_block_bullets_cards_item_bullets: BlockBulletsCardsItemBlockBulletsCardsItemBullet[];
  block_bullets_cards_item_bullets: BlockBulletsCardsItemBullet[];
  block_bullets_cards_item_bullets_translations: BlockBulletsCardsItemBulletsTranslation[];
  block_bullets_cards_item_translations: BlockBulletsCardsItemTranslation[];
  block_bullets_cards_translations: BlockBulletsCardsTranslation[];
  block_bullets_vertical_tabs: BlockBulletsVerticalTab[];
  block_bullets_vertical_tabs_block_bullets_vertical_tabs_items: BlockBulletsVerticalTabsBlockBulletsVerticalTabsItem[];
  block_bullets_vertical_tabs_items: BlockBulletsVerticalTabsItem[];
  block_bullets_vertical_tabs_items_block_bullets_vertical_tabs_items_bullets: BlockBulletsVerticalTabsItemsBlockBulletsVerticalTabsItemsBullet[];
  block_bullets_vertical_tabs_items_bullets: BlockBulletsVerticalTabsItemsBullet[];
  block_bullets_vertical_tabs_items_bullets_translations: BlockBulletsVerticalTabsItemsBulletsTranslation[];
  block_bullets_vertical_tabs_items_translations: BlockBulletsVerticalTabsItemsTranslation[];
  block_bullets_vertical_tabs_translations: BlockBulletsVerticalTabsTranslation[];
  block_button: BlockButton[];
  block_button_group: BlockButtonGroup[];
  block_button_icons: BlockButtonIcon[];
  block_button_translations: BlockButtonTranslation[];
  block_careers_hero: BlockCareersHero[];
  block_careers_hero_block_careers_hero_images: BlockCareersHeroBlockCareersHeroImage[];
  block_careers_hero_block_image: BlockCareersHeroBlockImage[];
  block_careers_hero_files: BlockCareersHeroFile[];
  block_careers_hero_images: BlockCareersHeroImage[];
  block_careers_hero_translations: BlockCareersHeroTranslation[];
  block_clients_clients: BlockClientsClient[];
  block_collection_customer_stories: BlockCollectionCustomerStory[];
  block_collection_customer_stories_item: BlockCollectionCustomerStoriesItem[];
  block_collection_customer_stories_item_translations: BlockCollectionCustomerStoriesItemTranslation[];
  block_collection_customer_stories_translations: BlockCollectionCustomerStoriesTranslation[];
  block_collection_item: BlockCollectionItem[];
  block_collection_news: BlockCollectionNew[];
  block_collection_news_translations: BlockCollectionNewsTranslation[];
  block_content: BlockContent[];
  block_content_item: BlockContentItem[];
  block_content_item_translations: BlockContentItemTranslation[];
  block_content_translations: BlockContentTranslation[];
  block_cta: BlockCta[];
  block_cta_group: BlockCtaGroup[];
  block_cta_translations: BlockCtaTranslation[];
  block_cta_try: BlockCtaTry[];
  block_cta_try_translations: BlockCtaTryTranslation[];
  block_cta_v2: BlockCtaV2[];
  block_cta_v2_translations: BlockCtaV2Translation[];
  block_deploy_models_grid: BlockDeployModelsGrid[];
  block_deploy_models_grid_item: BlockDeployModelsGridItem[];
  block_deploy_models_grid_item_translations: BlockDeployModelsGridItemTranslation[];
  block_deploy_models_grid_translations: BlockDeployModelsGridTranslation[];
  block_divider: BlockDivider[];
  block_features_alternating_sides: BlockFeaturesAlternatingSide[];
  block_features_alternating_sides_item: BlockFeaturesAlternatingSidesItem[];
  block_features_alternating_sides_item_rich_text: BlockFeaturesAlternatingSidesItemRichText[];
  block_features_alternating_sides_item_translations: BlockFeaturesAlternatingSidesItemTranslation[];
  block_features_alternating_sides_translations: BlockFeaturesAlternatingSidesTranslation[];
  block_features_basic: BlockFeaturesBasic[];
  block_features_basic_translations: BlockFeaturesBasicTranslation[];
  block_features_icons_above: BlockFeaturesIconsAbove[];
  block_features_icons_above_item: BlockFeaturesIconsAboveItem[];
  block_features_icons_above_item_block_features_icons_above_item_bullets: BlockFeaturesIconsAboveItemBlockFeaturesIconsAboveItemBullet[];
  block_features_icons_above_item_bullets: BlockFeaturesIconsAboveItemBullet[];
  block_features_icons_above_item_bullets_translations: BlockFeaturesIconsAboveItemBulletsTranslation[];
  block_features_icons_above_item_translations: BlockFeaturesIconsAboveItemTranslation[];
  block_features_icons_above_translations: BlockFeaturesIconsAboveTranslation[];
  block_features_inpage_anchored_sections: BlockFeaturesInpageAnchoredSection[];
  block_features_inpage_anchored_sections_tab: BlockFeaturesInpageAnchoredSectionsTab[];
  block_features_inpage_anchored_sections_tab_item: BlockFeaturesInpageAnchoredSectionsTabItem[];
  block_features_inpage_anchored_sections_tab_item_translations: BlockFeaturesInpageAnchoredSectionsTabItemTranslation[];
  block_features_inpage_anchored_sections_tab_translations: BlockFeaturesInpageAnchoredSectionsTabTranslation[];
  block_features_inpage_anchored_sections_tab_translations_1: BlockFeaturesInpageAnchoredSectionsTabTranslations1[];
  block_features_inpage_anchored_sections_translations: BlockFeaturesInpageAnchoredSectionsTranslation[];
  block_features_large_grid: BlockFeaturesLargeGrid[];
  block_features_large_grid_item: BlockFeaturesLargeGridItem[];
  block_features_large_grid_item_translations: BlockFeaturesLargeGridItemTranslation[];
  block_features_large_grid_translations: BlockFeaturesLargeGridTranslation[];
  block_features_small_grid: BlockFeaturesSmallGrid[];
  block_features_small_grid_item: BlockFeaturesSmallGridItem[];
  block_features_small_grid_item_translations: BlockFeaturesSmallGridItemTranslation[];
  block_features_small_grid_translations: BlockFeaturesSmallGridTranslation[];
  block_features_stats: BlockFeaturesStat[];
  block_features_stats_item: BlockFeaturesStatsItem[];
  block_features_stats_item_translations: BlockFeaturesStatsItemTranslation[];
  block_features_stats_translations: BlockFeaturesStatsTranslation[];
  block_features_two_cards_with_icons: BlockFeaturesTwoCardsWithIcon[];
  block_features_two_cards_with_icons_item: BlockFeaturesTwoCardsWithIconsItem[];
  block_features_two_cards_with_icons_item_translations: BlockFeaturesTwoCardsWithIconsItemTranslation[];
  block_features_two_cards_with_icons_translations: BlockFeaturesTwoCardsWithIconsTranslation[];
  block_form_contact: BlockFormContact[];
  block_form_contact_forms_form_fields: BlockFormContactFormsFormField[];
  block_form_contact_translations: BlockFormContactTranslation[];
  block_form_two_column: BlockFormTwoColumn[];
  block_form_two_column_form_fields: BlockFormTwoColumnFormField[];
  block_form_two_column_translations: BlockFormTwoColumnTranslation[];
  block_free_from_html: BlockFreeFromHtml[];
  block_free_from_html_translations: BlockFreeFromHtmlTranslation[];
  block_grid_inner_border: BlockGridInnerBorder[];
  block_grid_inner_border_block_grid_inner_border_items: BlockGridInnerBorderBlockGridInnerBorderItem[];
  block_grid_inner_border_items: BlockGridInnerBorderItem[];
  block_grid_inner_border_items_translations: BlockGridInnerBorderItemsTranslation[];
  block_grid_inner_border_translations: BlockGridInnerBorderTranslation[];
  block_hero: BlockHero[];
  block_hero_bottom_image: BlockHeroBottomImage[];
  block_hero_bottom_image_translations: BlockHeroBottomImageTranslation[];
  block_hero_customer_stories: BlockHeroCustomerStory[];
  block_hero_customer_stories_detail: BlockHeroCustomerStoriesDetail[];
  block_hero_customer_stories_detail_translations: BlockHeroCustomerStoriesDetailTranslation[];
  block_hero_customer_stories_translations: BlockHeroCustomerStoriesTranslation[];
  block_hero_internal: BlockHeroInternal[];
  block_hero_internal_translations: BlockHeroInternalTranslation[];
  block_hero_lechat: BlockHeroLechat[];
  block_hero_lechat_prompts: BlockHeroLechatPrompt[];
  block_hero_lechat_prompts_translations: BlockHeroLechatPromptsTranslation[];
  block_hero_lechat_translations: BlockHeroLechatTranslation[];
  block_hero_logo_fields: BlockHeroLogoField[];
  block_hero_logo_fields_block_image: BlockHeroLogoFieldsBlockImage[];
  block_hero_logo_fields_translations: BlockHeroLogoFieldsTranslation[];
  block_hero_models: BlockHeroModel[];
  block_hero_models_block_hero_models_item: BlockHeroModelsBlockHeroModelsItem[];
  block_hero_models_block_image: BlockHeroModelsBlockImage[];
  block_hero_models_images: BlockHeroModelsImage[];
  block_hero_models_item: BlockHeroModelsItem[];
  block_hero_models_item_translations: BlockHeroModelsItemTranslation[];
  block_hero_models_translations: BlockHeroModelsTranslation[];
  block_hero_news: BlockHeroNew[];
  block_hero_news_translations: BlockHeroNewsTranslation[];
  block_hero_solutions: BlockHeroSolution[];
  block_hero_solutions_translations: BlockHeroSolutionsTranslation[];
  block_hero_translations: BlockHeroTranslation[];
  block_image: BlockImage[];
  block_image_flexible: BlockImageFlexible[];
  block_image_translations: BlockImageTranslation[];
  block_image_translations_1: BlockImageTranslations1[];
  block_listing: BlockListing[];
  block_listing_item: BlockListingItem[];
  block_listing_item_translations: BlockListingItemTranslation[];
  block_listing_translations: BlockListingTranslation[];
  block_logo_cards: BlockLogoCard[];
  block_logo_cards_block_image: BlockLogoCardsBlockImage[];
  block_logo_cards_translations: BlockLogoCardsTranslation[];
  block_logo_fields: BlockLogoField[];
  block_logo_fields_block_image: BlockLogoFieldsBlockImage[];
  block_logo_fields_grid: BlockLogoFieldsGrid[];
  block_logo_fields_grid_block_image: BlockLogoFieldsGridBlockImage[];
  block_logo_fields_grid_translations: BlockLogoFieldsGridTranslation[];
  block_logo_fields_v2: BlockLogoFieldsV2[];
  block_logo_fields_v2_block_image: BlockLogoFieldsV2BlockImage[];
  block_logo_fields_v2_translations: BlockLogoFieldsV2Translation[];
  block_models_accordion: BlockModelsAccordion[];
  block_models_accordion_item: BlockModelsAccordionItem[];
  block_models_accordion_item_translations: BlockModelsAccordionItemTranslation[];
  block_models_accordion_translations: BlockModelsAccordionTranslation[];
  block_models_custom: BlockModelsCustom[];
  block_models_custom_item: BlockModelsCustomItem[];
  block_models_custom_item_translations: BlockModelsCustomItemTranslation[];
  block_models_custom_translations: BlockModelsCustomTranslation[];
  block_nav_footer: BlockNavFooter[];
  block_nav_footer_languages: BlockNavFooterLanguage[];
  block_nav_footer_socials: BlockNavFooterSocial[];
  block_pricing: BlockPricing[];
  block_pricing_pricing: BlockPricingPricing[];
  block_pricing_translations: BlockPricingTranslation[];
  block_pricing_translations_1: BlockPricingTranslations1[];
  block_pricing_translations_2: BlockPricingTranslations2[];
  block_pricing_translations_3: BlockPricingTranslations3[];
  block_promotional: BlockPromotional[];
  block_promotional_translations: BlockPromotionalTranslation[];
  block_promotional_v2: BlockPromotionalV2[];
  block_promotional_v2_translations: BlockPromotionalV2Translation[];
  block_promotional_v3: BlockPromotionalV3[];
  block_promotional_v3_translations: BlockPromotionalV3Translation[];
  block_promotional_v4: BlockPromotionalV4[];
  block_promotional_v4_translations: BlockPromotionalV4Translation[];
  block_promotional_v5: BlockPromotionalV5[];
  block_promotional_v5_translations: BlockPromotionalV5Translation[];
  block_quote: BlockQuote[];
  block_quote_translations: BlockQuoteTranslation[];
  block_scrolling_header: BlockScrollingHeader[];
  block_scrolling_header_translations: BlockScrollingHeaderTranslation[];
  block_stories_carrousel: BlockStoriesCarrousel[];
  block_stories_carrousel_block_collection_customer_stories_item: BlockStoriesCarrouselBlockCollectionCustomerStoriesItem[];
  block_stories_carrousel_block_collection_item: BlockStoriesCarrouselBlockCollectionItem[];
  block_stories_carrousel_translations: BlockStoriesCarrouselTranslation[];
  block_table: BlockTable[];
  block_table_block_table_row: BlockTableBlockTableRow[];
  block_table_cell: BlockTableCell[];
  block_table_cell_translations: BlockTableCellTranslation[];
  block_table_multi_sections: BlockTableMultiSection[];
  block_table_multi_sections_block_table_multi_sections_sections: BlockTableMultiSectionsBlockTableMultiSectionsSection[];
  block_table_multi_sections_sections: BlockTableMultiSectionsSection[];
  block_table_multi_sections_sections_translations: BlockTableMultiSectionsSectionsTranslation[];
  block_table_multi_sections_translations: BlockTableMultiSectionsTranslation[];
  block_table_row: BlockTableRow[];
  block_table_simple_rows: BlockTableSimpleRow[];
  block_table_simple_rows_translations: BlockTableSimpleRowsTranslation[];
  block_table_translations: BlockTableTranslation[];
  block_three_column_bullets: BlockThreeColumnBullet[];
  block_three_column_bullets_block_bullets_cards_item_bullets: BlockThreeColumnBulletsBlockBulletsCardsItemBullet[];
  block_three_column_bullets_translations: BlockThreeColumnBulletsTranslation[];
  block_title_section: BlockTitleSection[];
  block_title_section_translations: BlockTitleSectionTranslation[];
  block_two_column_bullets: BlockTwoColumnBullet[];
  block_two_column_bullets_block_two_column_bullets_items: BlockTwoColumnBulletsBlockTwoColumnBulletsItem[];
  block_two_column_bullets_items: BlockTwoColumnBulletsItem[];
  block_two_column_bullets_items_translations: BlockTwoColumnBulletsItemsTranslation[];
  block_two_column_bullets_translations: BlockTwoColumnBulletsTranslation[];
  block_value_props_horizontal_tabs: BlockValuePropsHorizontalTab[];
  block_value_props_horizontal_tabs_item: BlockValuePropsHorizontalTabsItem[];
  block_value_props_horizontal_tabs_item_translations: BlockValuePropsHorizontalTabsItemTranslation[];
  block_value_props_horizontal_tabs_translations: BlockValuePropsHorizontalTabsTranslation[];
  block_value_props_mixed_horizontal_tabs: BlockValuePropsMixedHorizontalTab[];
  block_value_props_mixed_horizontal_tabs_items: BlockValuePropsMixedHorizontalTabsItem[];
  block_value_props_mixed_horizontal_tabs_items_block: BlockValuePropsMixedHorizontalTabsItemsBlock[];
  block_value_props_mixed_horizontal_tabs_items_translations: BlockValuePropsMixedHorizontalTabsItemsTranslation[];
  block_value_props_mixed_horizontal_tabs_translations: BlockValuePropsMixedHorizontalTabsTranslation[];
  block_value_props_premium: BlockValuePropsPremium[];
  block_value_props_premium_block_value_props_premium_item: BlockValuePropsPremiumBlockValuePropsPremiumItem[];
  block_value_props_premium_item: BlockValuePropsPremiumItem[];
  block_value_props_premium_item_translations: BlockValuePropsPremiumItemTranslation[];
  block_value_props_premium_translations: BlockValuePropsPremiumTranslation[];
  block_value_props_scrolling: BlockValuePropsScrolling[];
  block_value_props_scrolling_item: BlockValuePropsScrollingItem[];
  block_value_props_scrolling_item_translations: BlockValuePropsScrollingItemTranslation[];
  block_value_props_scrolling_translations: BlockValuePropsScrollingTranslation[];
  block_value_props_standard: BlockValuePropsStandard[];
  block_value_props_standard_item: BlockValuePropsStandardItem[];
  block_value_props_standard_item_translations: BlockValuePropsStandardItemTranslation[];
  block_value_props_standard_translations: BlockValuePropsStandardTranslation[];
  block_value_props_v2: BlockValuePropsV2[];
  block_value_props_v2_item: BlockValuePropsV2Item[];
  block_value_props_v2_item_translations: BlockValuePropsV2ItemTranslation[];
  block_value_props_v2_item_translations_1: BlockValuePropsV2ItemTranslations1[];
  block_value_props_v2_translations: BlockValuePropsV2Translation[];
  block_value_props_v3: BlockValuePropsV3[];
  block_value_props_v3_item: BlockValuePropsV3Item[];
  block_value_props_v3_item_callout_option: BlockValuePropsV3ItemCalloutOption[];
  block_value_props_v3_item_callout_option_icons: BlockValuePropsV3ItemCalloutOptionIcon[];
  block_value_props_v3_item_callout_option_translations: BlockValuePropsV3ItemCalloutOptionTranslation[];
  block_value_props_v3_translations: BlockValuePropsV3Translation[];
  block_value_props_v4: BlockValuePropsV4[];
  block_value_props_v4_item: BlockValuePropsV4Item[];
  block_value_props_v4_item_translations: BlockValuePropsV4ItemTranslation[];
  block_value_props_v4_translations: BlockValuePropsV4Translation[];
  clients: Client[];
  colors: Color[];
  form_cta: FormCta[];
  form_cta_translations: FormCtaTranslation[];
  form_fields: FormField[];
  form_fields_choices: FormFieldsChoice[];
  form_fields_choices_translations: FormFieldsChoicesTranslation[];
  form_fields_translations: FormFieldsTranslation[];
  forms: Form[];
  forms_form_fields: FormsFormField[];
  forms_translations: FormsTranslation[];
  global: Global;
  icons: Icon[];
  inbox: Inbox[];
  languages: Language[];
  mixed_section: MixedSection[];
  mixed_section_blocks: MixedSectionBlock[];
  mixed_section_translations: MixedSectionTranslation[];
  navigation: Navigation[];
  navigation_items: NavigationItem[];
  navigation_items_translations: NavigationItemsTranslation[];
  pages: Page[];
  pages_blocks: PagesBlock[];
  pages_translations: PagesTranslation[];
  posts: Post[];
  posts_categories: PostsCategory[];
  posts_categories_translations: PostsCategoriesTranslation[];
  posts_translations: PostsTranslation[];
  pricing: Pricing[];
  pricing_item: PricingItem[];
  pricing_item_translations: PricingItemTranslation[];
  pricing_option_price: PricingOptionPrice[];
  pricing_pricing_item: PricingPricingItem[];
  pricing_translations: PricingTranslation[];
  rich_text: RichText[];
  rich_text_translations: RichTextTranslation[];
  seo: Seo[];
  seo_translations: SeoTranslation[];
  socials: Social[];
  table_simple_rows: TableSimpleRow[];
  table_simple_rows_rows: TableSimpleRowsRow[];
  table_simple_rows_rows_items: TableSimpleRowsRowsItem[];
  table_simple_rows_rows_items_translations: TableSimpleRowsRowsItemsTranslation[];
  table_simple_rows_rows_translations: TableSimpleRowsRowsTranslation[];
  table_simple_rows_table_simple_rows_rows: TableSimpleRowsTableSimpleRowsRow[];
  table_simple_rows_translations: TableSimpleRowsTranslation[];
  testimonials_translations: TestimonialsTranslation[];
  directus_access: DirectusAccess[];
  directus_activity: DirectusActivity[];
  directus_collections: DirectusCollection[];
  directus_comments: DirectusComment[];
  directus_fields: DirectusField[];
  directus_files: DirectusFile[];
  directus_folders: DirectusFolder[];
  directus_migrations: DirectusMigration[];
  directus_permissions: DirectusPermission[];
  directus_policies: DirectusPolicy[];
  directus_presets: DirectusPreset[];
  directus_relations: DirectusRelation[];
  directus_revisions: DirectusRevision[];
  directus_roles: DirectusRole[];
  directus_sessions: DirectusSession[];
  directus_settings: DirectusSettings;
  directus_users: DirectusUser[];
  directus_webhooks: DirectusWebhook[];
  directus_dashboards: DirectusDashboard[];
  directus_panels: DirectusPanel[];
  directus_notifications: DirectusNotification[];
  directus_shares: DirectusShare[];
  directus_flows: DirectusFlow[];
  directus_operations: DirectusOperation[];
  directus_translations: DirectusTranslation[];
  directus_versions: DirectusVersion[];
  directus_extensions: DirectusExtension[];
}
