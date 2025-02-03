import Link from "next/link";
import DirectusImageClient from "@/components/shared/directus-image-client";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { IBlogDetailsContentData } from "./type";
import BlogContactForm from "./blog-contact-form";
import { IconPosition } from "@/constants/enum";

const BlogDetailsSidebar = ({ data }: IBlogDetailsContentData) => {
  const {
    with_form,
    form,
    cta,
    resources_buttons,
    share_buttons,
    resources_button_text,
    share_button_text,
  } = data;

  if (with_form && cta && form) {
    return (
      <div className="hide-scrollbar top-[123px] flex w-full max-w-full flex-col gap-y-10 self-start xl:sticky xl:max-h-[calc(100vh-163px)] xl:min-w-[400px] xl:overflow-y-auto xl:pb-10">
        <div className="flex flex-col gap-y-10  bg-black p-8 text-white">
          <div className="flex flex-col gap-y-[25px]">
            <div
              className="text-center text-[30px]/[34.5px]"
              dangerouslySetInnerHTML={{ __html: cta?.title }}
            />
            <div
              className="wysiwyg-formatting label-rich text-center"
              dangerouslySetInnerHTML={{ __html: cta?.description }}
            />
          </div>
          {cta?.buttons?.buttons?.length && (
            <div className="flex items-center  justify-center gap-x-xl">
              {cta?.buttons?.buttons?.map((ctaBtn: any, idx: number) => (
                <>
                  <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
                    <CButton
                      btn={ctaBtn}
                      className=" gap-x-2  self-start border-b-mistral-sunshine-50  pb-6 text-sm text-white hover:text-white lg:text-base [&_svg]:!size-6"
                      iconClassName="text-primary size-6"
                      label={ctaBtn?.label as string}
                      icon={ctaBtn?.icon[0] as any}
                      iconPosition={ctaBtn?.icon_position as IconPosition}
                    />
                  </ButtonLink>
                  {idx < cta.buttons.buttons.length - 1 &&
                    cta.buttons_separator_text && (
                      <span>{cta.buttons_separator_text}</span>
                    )}
                </>
              ))}
            </div>
          )}
          <div
            className="wysiwyg-formatting label-rich text-center"
            dangerouslySetInnerHTML={{ __html: cta?.bottom_text }}
          />
        </div>
        <BlogContactForm form={form} />
      </div>
    );
  }

  return (
    <div className="top-[123px] w-full max-w-full self-start xl:sticky xl:min-w-[400px]">
      <div className="border-t border-t-black pt-6">
        <div className="mb-10">
          <div
            dangerouslySetInnerHTML={{ __html: share_button_text || "" }}
            className="mb-6 text-[20px]/[27px] font-normal text-foreground"
          />
          <div className="flex items-center gap-6">
            {share_buttons?.buttons?.map((btn) => {
              return (
                <Link
                  href={btn?.external_url || "#"}
                  target={btn?.open_in_new_tab ? "_blank" : "_self"}
                  key={btn?.id}
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-black"
                >
                  <DirectusImageClient
                    className="max-h-[18px]"
                    height={16}
                    width={16}
                    asset={btn?.icon[0]?.icons_id}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: resources_button_text || "",
            }}
            className="mb-6 text-[20px]/[27px] font-normal text-foreground"
          />
          <div className="max-w-[350px]">
            {resources_buttons?.buttons?.map((btn) => {
              return (
                <ButtonLink key={btn?.id} button={btn}>
                  <CButton
                    btn={btn}
                    label={btn?.label}
                    icon={btn?.icon[0]?.icons_id}
                    iconClassName="text-primary"
                    className="mb-6 flex w-full justify-between"
                  />
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSidebar;
