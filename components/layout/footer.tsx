import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { fetchIcon, navigationQuery } from "@/lib/directus/fetchers";
import { applyTranslations } from "@/lib/translation";
import { Social } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import ButtonLink from "../shared/custom/button-link";
import DirectusImage from "../shared/directus-image";
import { NavigationElement } from "./desktop-header";
import { directusAssets } from "@/lib/image";
import LanguageSwitcher from "../language-switcher";

const bandColors = [
  "hsla(45, 100%, 88%, 1)",
  "hsla(51, 100%, 50%, 1)",
  "hsla(41, 100%, 50%, 1)",
  "hsla(30, 100%, 51%, 1)",
  "hsla(17, 96%, 52%, 1)",
  "hsla(1, 100%, 44%, 1)",
];

const fetchFooterData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_NAV_FOOTER, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          // @ts-ignore
          navigation: navigationQuery,
          languages: ["*", { languages_code: ["*"] }],
          socials: ["*", { socials_id: ["*", { logo: ["*"] }] }],
          manage_cookies: [
            "*",
            {
              translations: ["*"],
              icon: ["*", { icons_id: ["*"] }],
            },
          ],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function Footer({ data: { id }, locale }: any) {
  const data = await fetchFooterData(id, locale);
  if (!data) return null;
  const catGif = await fetchIcon("cat-gif");
  const linksGroup = data.navigation?.items as NavigationElement[];

  return (
    <footer className="relative mt-5 bg-secondary px-0">
      <div className="absolute left-1/2 aspect-square size-[212px] -translate-x-1/2 translate-y-[-44%]">
        {catGif?.image && (
          <img
            src={directusAssets(catGif.image)}
            alt="LeChat - Mistral"
            className="size-full object-contain pt-2"
          />
        )}
      </div>
      {bandColors.map((background, idx) => (
        <div key={idx} style={{ background }} className={`h-[50px] w-full`} />
      ))}
      <div className="container mx-auto space-y-[107px] p-5 py-16 xl:px-12">
        <div className="mx-auto flex flex-col justify-between gap-8 lg:flex-row">
          <div className="flex min-w-[100px] flex-1 flex-col justify-between gap-6">
            {data.navigation?.logo && (
              <Link
                href="/"
                className="relative z-10 inline-flex h-2xl-2 min-w-2xl-2"
              >
                <DirectusImage
                  className="object-contain text-foreground"
                  fill
                  asset={data.navigation.logo}
                  variant="dark"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-10 lg:gap-28">
            <div className="grid w-fit grid-cols-2 gap-4 gap-x-12 sm:grid-cols-4 lg:flex lg:flex-wrap">
              {linksGroup.map((button, idx) => (
                <nav
                  key={`${button.id}${idx}-footer`}
                  className="flex w-auto flex-col gap-y-1 text-[14px]/[24.5px] leading-normal"
                >
                  <ButtonLink
                    button={button}
                    className="pointer-events-none first-of-type:text-mistral-orange-bright"
                    aria-disabled={true}
                    tabIndex={-1}
                  >
                    {button.title}
                  </ButtonLink>
                  {button.children?.map((chilButton) => (
                    <ButtonLink button={chilButton}>
                      {chilButton.title}
                    </ButtonLink>
                  ))}
                </nav>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-between gap-y-8 md:flex-row md:items-center">
          <div className="flex w-full justify-between md:w-1/2">
            <div className="-mt-1 flex gap-x-[15px] text-sm md:mt-2">
              <p className="flex gap-x-1 text-sm">{data.copyright}</p>
              {data.manage_cookies && (
                <ButtonLink
                  target={
                    data.manage_cookies.open_in_new_tab ? "_blank" : "_self"
                  }
                  href={
                    data.manage_cookies.external_url ||
                    data.manage_cookies.page?.permalink ||
                    "#"
                  }
                >
                  <span className="text-sm underline">
                    {data.manage_cookies?.label}
                  </span>
                </ButtonLink>
              )}
            </div>
            {data.language_selector && data.languages && (
              <LanguageSwitcher
                locales={data.languages
                  .map((item: any) => item.languages_code || null)
                  .filter((lang: any) => lang !== null && lang !== undefined)}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-x-[10px]">
            {data.socials &&
              data.socials
                .map((item: any) => item.socials_id)
                .filter(
                  (social: any): social is Social =>
                    social !== null && social !== undefined,
                )
                .map(({ name, link, logo }: any) => (
                  <Link
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-mistral-beige-tint"
                  >
                    <DirectusImage
                      className="size-[38px] p-2.5"
                      // @ts-ignore
                      asset={logo}
                      width={38}
                      height={38}
                    />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
