export enum ModelStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
  ARCHIVED = "archived",
}

export enum Models {
  PAGES = "pages",
  NEWS = "news",
  EVENTS = "events",
  LANGUAGES = "languages",
  NAVIGATION = "navigation",
  POSTS = "posts",
  TESTIMONIALS = "testimonials",
  ICONS = "icons",
  CLIENTS = "clients",
  DEPLOYMENTS = "deployments",
  GLOBAL = "global",
  SOCIALS = "socials",
}

export enum NavigationType {
  HEADER = "header",
  FOOTER = "footer",
}

export enum Pages {
  HOME = "home",
  LE_CHAT = "le-chat",
  MODELS = "models",
}

export enum AnchorType {
  EXTERNAL = "external",
  POSTS = "posts",
  PAGES = "page",
  URL = "url",
}
export enum BackgroundType {
  IMAGE = "image",
  color = "color",
}

export enum AnchoredSectionMenuPositions {
  LEFT = "left",
  RIGHT = "right",
}

export enum FeaturesCollectionCarouselType {
  NEWS = "news",
  CUSTOMERS_STORIES = "customers-stories",
}

export enum BlockTypes {
  // HEROES
  BLOCK_HERO = "block_hero",
  BLOCK_HERO_LECHAT = "block_hero_lechat",
  BLOCK_HERO_BOTTOM_IMAGE = "block_hero_bottom_image",
  BLOCK_HERO_NEWS = "block_hero_news",
  BLOCK_HERO_LOGO_FIELDS = "block_hero_logo_fields",
  BLOCK_HERO_SOLUTIONS = "block_hero_solutions",
  BLOCK_HERO_CAREERS = "block_careers_hero",
  BLOCK_HERO_INTERNAL = "block_hero_internal",

  // VALUE LOGO FIELDS
  BLOCK_LOGO_FIELDS = "block_logo_fields",
  BLOCK_LOGO_FIELDS_V2 = "block_logo_fields_v2",
  BLOCK_LOGO_FIELDS_GRID = "block_logo_fields_grid",

  // VALUE PROPS
  BLOCK_VALUE_PROPS_PREMIUM = "block_value_props_premium",
  BLOCK_VALUE_PROPS_STANDARD = "block_value_props_standard",
  BLOCK_VALUE_PROPS_V2 = "block_value_props_v2",
  BLOCK_VALUE_PROPS_V3 = "block_value_props_v3",
  BLOCK_VALUE_PROPS_V4 = "block_value_props_v4",
  BLOCK_VALUE_PROPS_HORIZONTAL_TABS = "block_value_props_horizontal_tabs",
  BLOCK_VALUE_PROPS_SCROLLING = "block_value_props_scrolling",
  BLOCK_VALUE_PROPS_MIXED_HORIZONTAL_TABS = "block_value_props_mixed_horizontal_tabs",

  // PROMOTIONAL
  BLOCK_PROMOTIONAL = "block_promotional",
  BLOCK_PROMOTIONAL_V2 = "block_promotional_v2",
  BLOCK_PROMOTIONAL_V3 = "block_promotional_v3",
  BLOCK_PROMOTIONAL_V4 = "block_promotional_v4",
  BLOCK_PROMOTIONAL_V5 = "block_promotional_v5",

  // CTAS
  BLOCK_CTA = "block_cta",
  BLOCK_CTA_V2 = "block_cta_v2",

  // FEATURES
  BLOCK_FEATURES_SMALL_GRID = "block_features_small_grid",
  BLOCK_FEATURES_ALTERNATING_SIDES = "block_features_alternating_sides",
  BLOCK_FEATURES_LARGE_GRID = "block_features_large_grid",
  BLOCK_FEATURES_ICONS_ABOVE = "block_features_icons_above",
  BLOCK_FEATURES_TWO_CARDS_WITH_ICONS = "block_features_two_cards_with_icons",
  BLOCK_FEATURES_INPAGE_ANCHORED_SECTIONS = "block_features_inpage_anchored_sections",
  BLOCK_FEATURES_STORIES_CARROUSEL = "block_stories_carrousel",
  BLOCK_FEATURES_STATS = "block_features_stats",
  BLOCK_FEATURES_BULLETS_VERTICAL_TABS = "block_bullets_vertical_tabs",
  BLOCK_FEATURES_THREE_COLUMNS = "block_three_column_bullets",
  BLOCK_FEATURES_TWO_COLUMNS_BULLETS = "block_two_column_bullets",
  BLOCK_FEATURES_BORDERED_CARDS_WITH_CTAS = "block_grid_inner_border",

  // PRICING
  BLOCK_PRICING = "block_pricing",

  // TABLES
  BLOCK_TABLE_SIMPLE_ROWS = "block_table_simple_rows",
  BLOCK_TABLE_MULTI_SECTIONS = "block_table_multi_sections",

  // FORMS
  BLOCK_FORM_TWO_COLUMN = "block_form_two_column",
  BLOCK_FORM_CONTACT = "block_form_contact",

  // BUTTONS
  BLOCK_BUTTON_GROUP = "block_button_group",
  BLOCK_CTA_GROUP = "block_cta_group",

  // MISC
  BLOCK_DIVIDER = "block_divider",
  BLOCK_HERO_MODELS = "block_hero_models",
  BLOCK_DEPLOY_MODELS_GRID = "block_deploy_models_grid",
  BLOCK_MODELS_CUSTOM = "block_models_custom",
  BLOCK_MODELS_ACCORDION = "block_models_accordion",
  BLOCK_TABLE = "block_table",
  BLOCK_HERO_CUSTOMER_STORIES = "block_hero_customer_stories",
  BLOCK_COLLECTION_CUSTOMER_STORIES = "block_collection_customer_stories",
  BLOCK_HERO_CUSTOMER_STORIES_DETAIL = "block_hero_customer_stories_detail",
  BLOCK_TITLE_SECTION = "block_title_section",
  BLOCK_FREE_FROM_HTML = "block_free_from_html",
  BLOCK_LISTING = "block_listing",
  BLOCK_QUOTE = "block_quote",
  BLOCK_MIXED_SECTION = "mixed_section",
  BLOCK_LOGO_CARDS = "block_logo_cards",
  BLOCK_BLOG_DETAILS_HERO = "block_blog_details_hero",
  BLOCK_CONTENT = "block_content",
  BLOCK_BLOG_CONTENT = "block_blog_content",
  BLOCK_BULLETS_CARDS = "block_bullets_cards",
  BLOCK_RICH_TEXT = "rich_text",
  BLOCK_FLEXIBLE_IMAGE = "block_image_flexible",
  BLOCK_404_PAGE = "block_404_page",

  // HEADERS
  BLOCK_SCROLLING_HEADER = "block_scrolling_header",

  // NAVS
  BLOCK_NAV_FOOTER = "block_nav_footer",

  // NEWS
  BLOCK_COLLECTION_NEWS = "block_collection_news",
}

export enum FormFieldTypes {
  SELECT = "select",
  COUNTRY_SELECT = "country-select",
  TEXT = "text",
  EMAIL = "email",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  CHECKBOX_GROUP = "checkbox-group",
}

export enum ScreenType {
  MOBILE = "mobile",
  DESKTOP = "desktop",
}

export enum IconPosition {
  START = "start",
  END = "end",
}

export const NEWS_PREFIX = "news";
