"use client";
import { formPlateformeAction } from "@/actions/form-contact-action";
import CustomDynamicForm from "@/components/shared/custom/forms/custom-dynamic-form";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";
import { useActionState, useLayoutEffect, useState } from "react";
import FormTwoColumnsSkeleton from "./form-two-columns-skeleton";

const fetchFormData = async (tableID: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_FORM_TWO_COLUMN, {
      filter: { id: { _eq: tableID } },
      fields: [
        "*",
        {
          translations: ["*"],
          logo: ["*"],
          addon_img: ["*"],
          form: [
            "*",
            {
              translations: ["*"],
              submit_cta: ["*", { translations: ["*"], icon: ["*"] }],
              fields: [
                "*",
                {
                  form_fields_id: ["*", { translations: ["*"] }],
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

export function FormTwoColumns({ data: { id: blockID }, locale }: any) {
  const initialState = {
    success: false,
    error: null,
  };
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formState, formAction, isPending] = useActionState(
    formPlateformeAction,
    initialState,
  );

  useLayoutEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchFormData(blockID, locale);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [blockID, locale]);

  if (loading || !data) return <FormTwoColumnsSkeleton />;

  const {
    logo,
    form,
    description,
    addon_img,
    anchor,
    success_form_headline,
    success_form_subheadline,
    submission_consent_msg,
  } = data;

  return (
    <div
      id={anchor || ""}
      className="bg-grid-pattern flex flex-col justify-between gap-y-4xl border-b border-r border-[#ECDAA2]/[.5] bg-grid-size-[48px] bg-grid-[#ECDAA2]/[.5] lg:max-h-min lg:flex-row"
    >
      <div className="flex w-full flex-col !gap-[98px] p-[20px] lg:flex-1 lg:justify-between lg:gap-3xl lg:p-3xl">
        <div className="flex aspect-square size-[97px] items-center justify-center bg-secondary">
          <div className="relative flex size-2xl items-center justify-center text-[#FF8205]">
            <DirectusImage
              fill
              className="flex size-2xl items-center justify-center object-contain"
              asset={logo}
            />
          </div>
        </div>
        <div
          className="text-2xl space-y-5 px-1 sm:px-0 lg:max-w-[452px] xl:text-[24px]/[32px]"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center bg-secondary px-md py-2xl lg:min-w-[630px] lg:max-w-[630px] ">
        {form && (
          <div className="flex size-full max-w-[452px] flex-col gap-y-3xl lg:max-h-min">
            {formState.success ? (
              <>
                <div
                  className="text-[30px]/[34.5px]"
                  dangerouslySetInnerHTML={{
                    __html: success_form_headline || "",
                  }}
                />
                <div
                  className="text-xl"
                  dangerouslySetInnerHTML={{
                    __html: success_form_subheadline || "",
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className="text-[30px]/[34.5px]"
                  dangerouslySetInnerHTML={{ __html: form?.title || "" }}
                />
                <CustomDynamicForm
                  form={Object.assign({}, form, {
                    submission_consent_msg,
                  })}
                  action={formAction}
                  loading={isPending}
                />
              </>
            )}
          </div>
        )}
        <div className="absolute bottom-0 right-3 size-[98px] lg:right-8">
          <DirectusImage className="object-contain" fill asset={addon_img} />
        </div>
      </div>
    </div>
  );
}
