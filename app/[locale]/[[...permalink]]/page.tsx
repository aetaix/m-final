/* eslint-disable react-hooks/rules-of-hooks */
import PageBuilder from "@/components/page-builder";
import { BlockTypes, Models } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { directusAssets } from "@/lib/image";
import { isNewsPost } from "@/lib/utils";
import { PagesBlock } from "@/types/directus-schema";
import {
  fetchPageData,
  fetchPostBySlug,
  fetchPostSeoBySlug,
} from "@lib/directus/fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageParams {
  permalink?: string[];
  locale: string;
}

interface PageProps {
  params: Promise<PageParams>;
  searchParams: any;
}

const NEWS_DETAIL_TEMPLATE_PERMALINK: string = "/blog-details";

const resolvePermalink = (permalink?: string[]): string => {
  const permalinkSegments = permalink || [];
  return `/${permalinkSegments.join("/")}`.replace(/\/$/, "") || "/";
};

const getStaticProps = async (permalink: string[], locale: string) => {
  const resolvedPermalink = resolvePermalink(permalink);

  try {
    const page = await fetchPageData(resolvedPermalink, locale);

    if (!page || !page.blocks) {
      return null;
    }
    return page;
  } catch (error) {
    console.error("Error loading page:", error);
    return null;
  }
};

const getPostData = async (slug: string, locale: string) => {
  try {
    const post = await fetchPostBySlug(slug, locale);
    if (!post) {
      throw new Error(`No post data found for slug: "${slug}"`);
    }

    const newsDetailPage = await fetchPageData(
      NEWS_DETAIL_TEMPLATE_PERMALINK,
      locale,
    );
    if (!newsDetailPage) {
      throw new Error("News detail template not found");
    }

    newsDetailPage.blocks = newsDetailPage.blocks.map((block: any) => {
      if (block.collection === BlockTypes.BLOCK_BLOG_CONTENT) {
        block.item.content = post.content;
        block.item.with_form = post.with_form;
        block.item.form = post.form;
        block.item.cta = post.cta;
      } else if (block.collection === BlockTypes.BLOCK_BLOG_DETAILS_HERO) {
        block.item.headline = post.title;
        block.item.subheadline = post.description;
        block.item.author = post.author;
        block.item.creation_date = post.date;
        block.item.company = post.category;
      }
      return block;
    });

    return newsDetailPage;
  } catch (error) {
    console.error("Error loading page:", error);
    return null;
  }
};

export async function generateStaticParams() {
  const { directus, readItems } = useDirectus();

  const [languages, pages] = await Promise.all([
    directus.request(readItems(Models.LANGUAGES, { fields: ["code"] })),
    directus.request(readItems(Models.PAGES, { fields: ["permalink"] })),
  ]);

  return languages.flatMap((language) =>
    pages.map(({ permalink = "" }) => ({
      locale: language.code,
      permalink: permalink === "/" ? [] : permalink?.split("/").filter(Boolean),
      searchParams: {},
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // use const because permalink & locale are not reassigned
  const { permalink, locale } = await params;

  // holds the updated permalink
  let updatedPermalink = permalink;
  const _isNewsPost = isNewsPost(permalink);
  let postData = null;

  // Check if the permalink corresponds to a "news post"
  if (_isNewsPost) {
    // if it does, update the permalink to point to
    // `NEWS_DETAIL_TEMPLATE_PERMALINK` without the trailing slash
    updatedPermalink = [NEWS_DETAIL_TEMPLATE_PERMALINK.slice(1)];

    postData = await fetchPostSeoBySlug(permalink![1], locale);
  }

  // then retrieve the relevant page information to build the metadata
  let page = await getStaticProps(updatedPermalink || [], locale);

  // if page doesn't exist, fetch custom 404 page data
  if (!page) {
    updatedPermalink = ["404"];
    page = await getStaticProps(updatedPermalink || [], locale);
    // display default otherwise
    if (!page) {
      return notFound();
    }
  }

  let title = "";
  let description = "";

  const pageSEO = page.seo;

  if (_isNewsPost) {
    title = `${postData?.title} | Mistral AI`;
    description = postData?.description;
  } else {
    const seoTranslation = page.seo?.seo_translations?.find(
      (trans: { languages_code: string }) => trans.languages_code === locale,
    );
    title = seoTranslation?.title || pageSEO?.title || "";
    description = seoTranslation?.meta_description || pageSEO?.meta_description;
  }

  return {
    title: {
      default: title,
      template: `%s | ${pageSEO?.name}`,
    },
    icons: {
      icon: directusAssets(pageSEO?.favicon),
      shortcut: directusAssets(pageSEO?.favicon),
      apple: directusAssets(pageSEO?.favicon),
      other: {
        rel: "apple-touch-icon-precomposed",
        url: directusAssets(pageSEO?.favicon),
      },
    },
    description,
    robots: {
      index: pageSEO?.no_index !== true,
      follow: pageSEO?.no_follow !== true,
    },
    openGraph: {
      title: title,
      description,
      images: [
        {
          url: pageSEO?.og_image?.toString() || "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
  };
}

export default async function Page({ params, searchParams = {} }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { permalink, locale } = await params;

  let slug: string | null = null;

  if (isNewsPost(permalink)) {
    // we're certain in this block that permalink is not null
    // hence we use the `!` to silence TS/compiler error/warning
    slug = permalink![1];
  }

  let page = null;

  if (slug) {
    page = await getPostData(slug, locale);
  } else {
    page = await getStaticProps(permalink || [], locale);
  }

  // if page doesn't exist, fetch custom 404 page data
  if (!page) {
    page = await getStaticProps(["404"], locale);
    // display default otherwise
    if (!page) {
      return notFound();
    }
  }

  const blocks: PagesBlock[] = page.blocks.filter(
    (block: any): block is PagesBlock =>
      typeof block === "object" && block.collection,
  );

  return (
    <PageBuilder
      locale={locale}
      sections={blocks}
      searchParams={resolvedSearchParams}
      permalink={permalink}
    />
  );
}
