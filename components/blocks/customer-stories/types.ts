export interface MediaAsset {
  id: number;
  sort: number | null;
  name: string;
  file: string | null;
  file_white: string | null;
  file_black: string | null;
  tags: string | null;
  locale: string;
}

export interface Icon {
  id: number;
  name: string;
  image: string;
  image_dark_mode: string | null;
  svg: string;
  svg_dark_mode: string;
  locale: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  logo: MediaAsset | null;
  modalCloseIcon: Icon | null;
  content: string | null;
}

interface FeaturedStory {
  id: number;
  sort: number | null;
  name: string;
  customer_story_page: any;
  parent: number | null;
  logo: MediaAsset;
  modal_close_icon: Icon;
  headline: string;
  modal_content: string;
  locale: string;
}

interface HeroCustomerStories {
  id: number;
  sort: number | null;
  name: string;
  featured_story: FeaturedStory;
  button_icon: Icon;
  headline: string;
  subheadline: string;
  button_text: string;
  locale: string;
}

export interface HeroCustomerStoriesData {
  data: HeroCustomerStories;
}

interface CustomerStoryItem {
  id: number;
  sort: number | null;
  name: string;
  customer_story_page: any;
  parent: number;
  logo: MediaAsset | null;
  logo_height: number;
  modal_close_icon: Icon | null;
  headline: string;
  modal_content: string | null;
  locale: string;
}

interface CustomerStories {
  id: number;
  sort: number | null;
  name: string;
  items: CustomerStoryItem[];
  item_button_icon: Icon;
  item_button_text: string;
  locale: string;
  anchor: string;
}

export interface CustomerStoriesData {
  data: CustomerStories;
}

interface Listing {
  headline: string;
  subheadline?: string;
  item_icon: Icon;
  anchor: string;
  items: {
    highlighted_text: string;
    text: string;
  }[];
}

export interface ListingData {
  data: Listing;
}

interface IFreeFormHTML {
  headline: string;
  content: string;
  anchor: string;
}

export interface IFreeFormHTMLData {
  data: IFreeFormHTML;
}

interface IHeroCustomerStoriesDetails {
  headline: string;
  logo: MediaAsset;
}

export interface IHeroCustomerStoriesDetailsData {
  data: IHeroCustomerStoriesDetails;
}

interface IQuote {
  author: string;
  author_company: string;
  author_role: string;
  content: string;
  quote_icon: Icon;
  anchor: string;
}

export interface IQuoteData {
  data: IQuote;
}

interface ITitleSection {
  headline: string;
  subheadline: string;
  icon: Icon;
  anchor: string;
}

export interface ITitleSectionData {
  data: ITitleSection;
}
