"use client";

import { formContactAction } from "@/actions/form-contact-action";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import CustomDynamicForm from "@/components/shared/custom/forms/custom-dynamic-form";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import { useActionState, useLayoutEffect, useState } from "react";
import FormContactSkeleton from "./form-contact-skeleton";
import HeroSection from "./hero-section";
import SuccessMsg from "./success-msg";

const fetchFormContactData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FORM_CONTACT, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          form: [
            "*",
            {
              translations: ["*"],
              submit_cta: ["*", { translations: ["*"], icon: ["*"] }],
              fields: [
                "*",
                {
                  form_fields_id: [
                    "*",
                    {
                      translations: ["*"],
                      choices: ["*", { translations: ["*"] }],
                    },
                  ],
                },
              ],
            },
          ],
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
    }),
  );

  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const FormContactUs = ({ id, locale }: any) => {
  const initialState = {
    success: false,
    error: null,
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, formAction, isPending] = useActionState(
    formContactAction,
    initialState,
  );

  useLayoutEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchFormContactData(id, locale);
      setLoading(false);
      setData(data);
    };
    fetchData();
  }, [id, locale]);

  if (loading && !data) {
    return <FormContactSkeleton />;
  }

  if (formState?.success) {
    return <SuccessMsg data={data} />;
  }

  const { body, buttons, form, submission_consent_msg, anchor } = data as any;

  return (
    <div>
      <HeroSection data={data} anchor={anchor} />
      <div className="container mb-24 mt-28 flex flex-col-reverse pb-10 md:mb-28 md:flex-row">
        <div className="relative max-w-[534px]">
          <div className="bg-grid-pattern z-[-80] hidden max-h-[833px] w-full bg-grid-size-[49px_49px] bg-grid-[#FFF0C3] md:absolute md:block md:max-h-full " />
          <div className="h-fit md:sticky md:top-[123px]">
            <div className="flex flex-col gap-y-8 pt-[41px] md:gap-y-12 md:px-[61px]  md:py-[41px]">
              {body && (
                <div
                  className="label-rich text-left"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              )}
              {buttons?.buttons?.length && (
                <div className="justify-left flex flex-wrap items-center gap-4 md:gap-x-md">
                  {buttons?.buttons?.map((ctaBtn: any, idx: number) => (
                    <ButtonLink key={ctaBtn?.label + idx} button={ctaBtn}>
                      <CButton
                        btn={ctaBtn}
                        className="self-start bg-foreground p-3 text-sm text-white hover:bg-foreground hover:text-white lg:text-base"
                        iconClassName="text-primary"
                        label={ctaBtn?.label as string}
                        icon={ctaBtn?.icon[0] as any}
                      />
                    </ButtonLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-y-3xl border-b border-[#FFF0C3] py-10 md:gap-y-6 md:border md:p-10">
          <div
            className="text-[30px]/[34.5px]"
            dangerouslySetInnerHTML={{ __html: form?.title || "" }}
          />
          <CustomDynamicForm
            form={Object.assign({}, form, { submission_consent_msg })}
            action={formAction}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default FormContactUs;
