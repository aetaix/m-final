interface IconDetails {
  id: number;
  name: string;
  image: string;
  image_dark_mode: string | null;
  svg: string | null;
  svg_dark_mode: string | null;
}

interface Icon {
  id: number;
  block_button_id: number;
  icons_id: IconDetails;
}

export interface Button {
  id: number;
  sort: number;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  type: "external" | "internal";
  external_url: string | null;
  post: string | null;
  page: string | null;
  button_group: number;
  open_in_new_tab: boolean;
  name: string;
  visible: boolean;
  icon: Icon[];
  label: string;
}

interface HeroInternalData {
  image: string;
  name?: string;
  background_media: "image" | "video";
  background_image?: string;
  background_video_url?: string;
  background_color?: { value: string; value_dark?: string };
  media_position: "left" | "right";
  headline: string;
  subheadline: string;
  button_group?: {
    buttons: Button[];
  };
  size: "standard" | "compact";
}

export type HeroInternalProps = {
  data: HeroInternalData;
};

export interface HeroModelsItem {
  block_hero_models_item_id: {
    id: number;
    sort: number | null;
    button: Button;
    name: string;
    image: { id: number; file: string; name: string };
    title: string;
    accordion_item: null | number;
  };
}

interface HeroModelsData {
  id: number;
  background_type: "image" | "video";
  background_url?: string;
  background_color?: string;
  position: "left" | "right";
  headline: string;
  subheadline: string;
  button_group?: {
    buttons: Button[];
  };
  items: HeroModelsItem[];
}

export type HeroModelsProps = {
  data: HeroModelsData;
};

interface Feature {
  id: number;
  sort: number;
  name: string;
  parent: number;
  icon: Icon;
  title: string;
  description: string;
}

export interface FeaturesSmallGridData {
  collection: string;
  sort: number;
  items: Feature[];
  items_per_row: number;
  headline?: string;
  subheadline?: string;
}

export interface FeaturesSmallGridItemProps {
  id: number;
  title: string;
  description: string;
  icon: any;
  size: "small" | "large";
  button?: Button;
  index?: number;
}

export interface FeaturesSmallGridProps {
  data: FeaturesSmallGridData;
}

interface GridItem {
  id: number;
  sort: number | null;
  grid_item_id: string;
  name: string;
  button: Button;
  icon: Icon;
  title: string;
  description: string;
}

export interface DeploymentData {
  id: number;
  sort: number | null;
  name: string;
  grid_items: GridItem[];
  headline: string;
  items_per_row: number;
}

export interface DeploymentProps {
  data: DeploymentData;
}

interface ImageData {
  id: string;
  title: string;
  description: string | null;
  tags: string | null;
  location: string | null;
  storage: string;
}

interface TabData {
  id: number;
  sort: number | null;
  name: string;
  item_id: string;
  tab: Button;
  image: ImageData;
  button: Button;
  title: string;
  description: string;
}

interface CustomModelsData {
  id: number;
  sort: number | null;
  name: string;
  items: TabData[];
  heading: string;
  subheading: string;
  anchor: string;
}

export interface CustomizationSectionProps {
  data: CustomModelsData;
}

export interface ModelsAccordionItem {
  id: number;
  sort: number | null;
  name: string;
  description_icon: string;
  item_id: string;
  button: Button;
  short_desc: string;
  long_desc: string;
  title: string;
}

interface ModelsAccordionData {
  id: number;
  sort: number | null;
  name: string;
  items: ModelsAccordionItem[];
  note: Button;
  heading: string;
  anchor: string;
}

export interface ModelsAccordionProps {
  data: ModelsAccordionData;
}
