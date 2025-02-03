import { BlockTypes } from "@/constants/enum";
import NotFound from "./blocks/404/not-found";
import BlogDetailsContent from "./blocks/blog-details/content";
import BlogDetailsHero from "./blocks/blog-details/hero";
import ButtonsGroup from "./blocks/buttons/buttons-group";
import FlexibleButtonsGroup from "./blocks/buttons/flexible-buttons-group";
import FreeFormHTML from "./blocks/customer-stories/free-from-html";
import HeroCustomerStories from "./blocks/customer-stories/hero";
import HeroCustomerStoriesDetails from "./blocks/customer-stories/hero-details";
import Listing from "./blocks/customer-stories/listing";
import Quote from "./blocks/customer-stories/quote";
import CustomerStories from "./blocks/customer-stories/stories";
import TitleSection from "./blocks/customer-stories/title-section";
import FeaturesBorderedCardsWithCtas from "./blocks/features/features-bordered-cards-with-ctas";
import BulletsCards from "./blocks/features/features-bullets-cards";
import FeaturesIconsAbove from "./blocks/features/features-icons-above";
import FeaturesInAnchoredSections from "./blocks/features/features-in-anchored-sections";
import FeaturesLargeGrid from "./blocks/features/features-large-grid";
import FeaturesStoriesCarrousel from "./blocks/features/features-stories-carrousel";
import FeaturesThreeColumnsBullets from "./blocks/features/features-three-columns-bullets";
import FeaturesTwoCardsWithIcons from "./blocks/features/features-two-cards-with-icons";
import FeaturesTwoColumnsBullets from "./blocks/features/features-two-columns-bullets";
import FeaturesTwoColumnsList from "./blocks/features/features-two-columns-list";
import { FormTwoColumns } from "./blocks/forms/form-two-columns";
import FlexibleImage from "./blocks/generics/flexible-image";
import MixedSection from "./blocks/generics/mixed-section";
import RichText from "./blocks/generics/rich-text";
import ScrollingHeader from "./blocks/headers/index";
import HeroNews from "./blocks/heros/collection-page-hero/hero-news";
import HeroAiSolutions from "./blocks/heros/hero-ai-solutions";
import HeroBottomImage from "./blocks/heros/hero-bottom-image";
import HeroCareers from "./blocks/heros/hero-careers/hero-careers";
import HeroLogoField from "./blocks/heros/hero-logo-fields";
import HeroHomePage from "./blocks/heros/home-page-hero/hero-home-page";
import HeroLeChat from "./blocks/heros/home-page-hero/lechat";
import LogoCards from "./blocks/logo-cards";
import LogoFieldsGrid from "./blocks/logo-fields/logo-field-grid";
import LogoFields from "./blocks/logo-fields/logo-fields";
import LogoFieldsV2 from "./blocks/logo-fields/logo-fields-v2";
import CustomModels from "./blocks/models/custom-models";
import Deploy from "./blocks/models/deploy";
import FeaturesSmallGrid from "./blocks/models/features-small-grid";
import LicenseTable from "./blocks/models/license-table";
import ModelsAccordion from "./blocks/models/models-accordion";
import News from "./blocks/news";
import PricingV2 from "./blocks/pricings/pricing-v2";
import Cta from "./blocks/promotionals/cta";
import CtaV2 from "./blocks/promotionals/cta-v2";
import Promotional from "./blocks/promotionals/promotional";
import PromotionalSimpleWithImage from "./blocks/promotionals/promotional-simple-with-image";
import PromotionalV2 from "./blocks/promotionals/promotional-v2";
import PromotionalV3 from "./blocks/promotionals/promotional-v3";
import PromotionalV5 from "./blocks/promotionals/promotional-v5";
import TableMultiSections from "./blocks/tables/table-multi-sections";
import TableSimpleRows from "./blocks/tables/table-simple-rows";
import ValuePropsPremium from "./blocks/value-props/value-prop-premium";
import ValuePropsV3 from "./blocks/value-props/value-prop-v3";
import FeaturesVerticalBulletsTabs from "./blocks/value-props/value-props-bullets-vertical-tabs";
import ValuePropsHorizontalTabs from "./blocks/value-props/value-props-horizontal-tabs";
import ValuePropsMixedHorizontalTabs from "./blocks/value-props/value-props-mixed-horizontal-tabs";
import ValuePropsScrolling from "./blocks/value-props/value-props-scrolling";
import ValuePropStandard from "./blocks/value-props/value-props-standard";
import ValuePropsV2 from "./blocks/value-props/value-props-v2";
import ValuePropsV4 from "./blocks/value-props/value-props-v4";
import Footer from "./layout/footer";
import Divider from "./shared/divider";
import FeaturesStats from "./blocks/features/features-stats";
import FormContactUs from "./blocks/form-contact/form-contact-us";
import TermsContent from "./blocks/terms-content";
import HeroInternal from "./blocks/models/hero-models-internal";
import HeroModels from "./blocks/models/hero-models";

interface BaseBlockProps {
  block: {
    collection: string;
    item: any;
  };
  locale: string;
  searchParams?: any;
  permalink?: string[];
}

const BaseBlock = ({
  block,
  locale,
  searchParams,
  permalink,
}: BaseBlockProps) => {
  const blockMapComponent: Record<BlockTypes, React.ElementType> = {
    // HEROES
    [BlockTypes.BLOCK_HERO]: HeroHomePage,
    [BlockTypes.BLOCK_HERO_LECHAT]: HeroLeChat,
    [BlockTypes.BLOCK_HERO_SOLUTIONS]: HeroAiSolutions,
    [BlockTypes.BLOCK_HERO_BOTTOM_IMAGE]: HeroBottomImage,
    [BlockTypes.BLOCK_HERO_LOGO_FIELDS]: HeroLogoField,
    [BlockTypes.BLOCK_HERO_NEWS]: HeroNews,
    [BlockTypes.BLOCK_HERO_CAREERS]: HeroCareers,
    [BlockTypes.BLOCK_HERO_INTERNAL]: HeroInternal,
    [BlockTypes.BLOCK_HERO_MODELS]: HeroModels,
    [BlockTypes.BLOCK_HERO_CUSTOMER_STORIES]: HeroCustomerStories,
    [BlockTypes.BLOCK_HERO_CUSTOMER_STORIES_DETAIL]: HeroCustomerStoriesDetails,
    [BlockTypes.BLOCK_BLOG_DETAILS_HERO]: BlogDetailsHero,

    // VALUE LOGO FIELDS
    [BlockTypes.BLOCK_LOGO_FIELDS]: LogoFields,
    [BlockTypes.BLOCK_LOGO_FIELDS_V2]: LogoFieldsV2,
    [BlockTypes.BLOCK_LOGO_FIELDS_GRID]: LogoFieldsGrid,

    // VALUE PROPS
    [BlockTypes.BLOCK_VALUE_PROPS_PREMIUM]: ValuePropsPremium,
    [BlockTypes.BLOCK_VALUE_PROPS_STANDARD]: ValuePropStandard,
    [BlockTypes.BLOCK_VALUE_PROPS_V2]: ValuePropsV2,
    [BlockTypes.BLOCK_VALUE_PROPS_V3]: ValuePropsV3,
    [BlockTypes.BLOCK_VALUE_PROPS_V4]: ValuePropsV4,
    [BlockTypes.BLOCK_VALUE_PROPS_HORIZONTAL_TABS]: ValuePropsHorizontalTabs,
    [BlockTypes.BLOCK_VALUE_PROPS_SCROLLING]: ValuePropsScrolling,
    [BlockTypes.BLOCK_VALUE_PROPS_MIXED_HORIZONTAL_TABS]:
      ValuePropsMixedHorizontalTabs,

    // PROMOTIONAL
    [BlockTypes.BLOCK_PROMOTIONAL]: Promotional,
    [BlockTypes.BLOCK_PROMOTIONAL_V2]: PromotionalV2,
    [BlockTypes.BLOCK_PROMOTIONAL_V3]: PromotionalV3,
    [BlockTypes.BLOCK_PROMOTIONAL_V4]: PromotionalSimpleWithImage,
    [BlockTypes.BLOCK_PROMOTIONAL_V5]: PromotionalV5,

    // CTAS
    [BlockTypes.BLOCK_CTA]: Cta,
    [BlockTypes.BLOCK_CTA_V2]: CtaV2,

    // FEATURES
    [BlockTypes.BLOCK_FEATURES_SMALL_GRID]: FeaturesSmallGrid,
    [BlockTypes.BLOCK_FEATURES_ALTERNATING_SIDES]: FeaturesTwoColumnsList,
    [BlockTypes.BLOCK_FEATURES_LARGE_GRID]: FeaturesLargeGrid,
    [BlockTypes.BLOCK_FEATURES_ICONS_ABOVE]: FeaturesIconsAbove,
    [BlockTypes.BLOCK_FEATURES_TWO_CARDS_WITH_ICONS]: FeaturesTwoCardsWithIcons,
    [BlockTypes.BLOCK_FEATURES_INPAGE_ANCHORED_SECTIONS]:
      FeaturesInAnchoredSections,
    [BlockTypes.BLOCK_BULLETS_CARDS]: BulletsCards,
    [BlockTypes.BLOCK_FEATURES_STORIES_CARROUSEL]: FeaturesStoriesCarrousel,
    [BlockTypes.BLOCK_FEATURES_THREE_COLUMNS]: FeaturesThreeColumnsBullets,
    [BlockTypes.BLOCK_FEATURES_TWO_COLUMNS_BULLETS]: FeaturesTwoColumnsBullets,
    [BlockTypes.BLOCK_FEATURES_BULLETS_VERTICAL_TABS]:
      FeaturesVerticalBulletsTabs,
    [BlockTypes.BLOCK_FEATURES_STATS]: FeaturesStats,
    [BlockTypes.BLOCK_FEATURES_BORDERED_CARDS_WITH_CTAS]:
      FeaturesBorderedCardsWithCtas,

    // PRICING
    [BlockTypes.BLOCK_PRICING]: PricingV2,

    // TABLES
    [BlockTypes.BLOCK_TABLE_SIMPLE_ROWS]: TableSimpleRows,
    [BlockTypes.BLOCK_TABLE_MULTI_SECTIONS]: TableMultiSections,

    // FORMS
    [BlockTypes.BLOCK_FORM_TWO_COLUMN]: FormTwoColumns,
    [BlockTypes.BLOCK_FORM_CONTACT]: FormContactUs,

    // BUTTONS
    [BlockTypes.BLOCK_BUTTON_GROUP]: ButtonsGroup,
    [BlockTypes.BLOCK_CTA_GROUP]: FlexibleButtonsGroup,

    // MISC
    [BlockTypes.BLOCK_DIVIDER]: Divider,
    [BlockTypes.BLOCK_DEPLOY_MODELS_GRID]: Deploy,
    [BlockTypes.BLOCK_MODELS_CUSTOM]: CustomModels,
    [BlockTypes.BLOCK_MODELS_ACCORDION]: ModelsAccordion,
    [BlockTypes.BLOCK_TABLE]: LicenseTable,
    [BlockTypes.BLOCK_MIXED_SECTION]: MixedSection,
    [BlockTypes.BLOCK_LOGO_CARDS]: LogoCards,
    [BlockTypes.BLOCK_RICH_TEXT]: RichText,
    [BlockTypes.BLOCK_FLEXIBLE_IMAGE]: FlexibleImage,
    // HEADERS
    [BlockTypes.BLOCK_SCROLLING_HEADER]: ScrollingHeader,

    [BlockTypes.BLOCK_COLLECTION_CUSTOMER_STORIES]: CustomerStories,
    [BlockTypes.BLOCK_TITLE_SECTION]: TitleSection,
    [BlockTypes.BLOCK_FREE_FROM_HTML]: FreeFormHTML,
    [BlockTypes.BLOCK_LISTING]: Listing,
    [BlockTypes.BLOCK_QUOTE]: Quote,

    [BlockTypes.BLOCK_CONTENT]: TermsContent,
    [BlockTypes.BLOCK_BLOG_CONTENT]: BlogDetailsContent,
    [BlockTypes.BLOCK_404_PAGE]: NotFound,
    // NAVS
    [BlockTypes.BLOCK_NAV_FOOTER]: Footer,

    // NEWS
    [BlockTypes.BLOCK_COLLECTION_NEWS]: News,
  } as const;

  const Component = blockMapComponent[block?.collection as BlockTypes];

  if (!Component) {
    return null;
  }
  return (
    <Component
      locale={locale}
      data={block.item}
      searchParams={searchParams}
      permalink={permalink}
    />
  );
};

export default BaseBlock;
