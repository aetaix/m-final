"use-client";
import { formBlogContactAction } from "@/actions/form-contact-action";
import CustomDynamicForm from "@/components/shared/custom/forms/custom-dynamic-form";
import React, { useActionState } from "react";

const BlogContactForm = ({ form }: any) => {
  const initialState = {
    success: false,
    error: null,
  };

  const [formState, formAction, isPending] = useActionState(
    formBlogContactAction,
    initialState,
  );

  return (
    <div className="flex size-full max-w-[452px] flex-col gap-y-3xl bg-white p-8 lg:max-h-min">
      {formState?.success ? (
        <div className="flex flex-col gap-y-10 py-10">
          <div
            className="text-center text-[30px]/[34.5px]"
            dangerouslySetInnerHTML={{
              __html: form?.success_submission_headline,
            }}
          />
          <div
            className=" text-center"
            dangerouslySetInnerHTML={{
              __html: form?.success_submission_subheadline,
            }}
          />
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-y-[25px]">
            <div
              className="text-center text-[30px]/[34.5px]"
              dangerouslySetInnerHTML={{ __html: form?.title }}
            />
            <div
              className="wysiwyg-formatting label-rich text-center"
              dangerouslySetInnerHTML={{
                __html: form?.description,
              }}
            />
          </div>
          <CustomDynamicForm
            form={form}
            action={formAction}
            loading={isPending}
          />
        </>
      )}
    </div>
  );
};

export default BlogContactForm;
