interface Icon {
  id: number;
  block_button_id: number;
  icons_id: {
    id: number;
    name: string;
    image: string;
    image_dark_mode: string | null;
    svg: string;
    svg_dark_mode: string;
    locale: string;
  };
  locale: string;
}

interface Button {
  id: number;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  type: string;
  external_url: string | null;
  post: string | null;
  page: string | null;
  button_group: number;
  open_in_new_tab: boolean;
  name: string;
  visible: boolean;
  group_id: number | null;
  icon: Icon[];
  label: string;
  locale: string;
}

interface ButtonGroupData {
  id: number;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  for: string;
  buttons: Button[];
  locale: string;
}

interface IBlogDetailsHero {
  id: number;
  name: string;
  headline: string;
  subheadline: string;
  company: {
    name: string;
  };
  author: string;
  creation_date: string;
  locale: string;
}

export interface IBlogDetailsHeroData {
  data: IBlogDetailsHero;
}

export interface IBlogDetailsSidebarData {
  resources_buttons: ButtonGroupData;
  share_buttons: ButtonGroupData;
  resources_button_text: string;
  share_button_text: string;
}

interface IBlogDetailsContent {
  content: string;
  resources_buttons: ButtonGroupData;
  share_buttons: ButtonGroupData;
  resources_button_text: string;
  share_button_text: string;
  with_form: boolean;
  form: any;
  cta: any;
}

export interface IBlogDetailsContentData {
  data: IBlogDetailsContent;
}
