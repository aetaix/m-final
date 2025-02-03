"use client";
import { cn } from "@/lib/utils";
import { ComponentType, CSSProperties, useState } from "react";
import { CButton } from "../custom-button";
import TextArea from "./text-area";
import TextInput from "./text-input";

import Checkbox from "@/components/ui/checkbox";
import CheckboxGroup from "@/components/ui/checkbox-group";
import { FormFieldTypes } from "@/constants/enum";
import CustomSelectTwo from "../custom-select-two";

interface CustomDynamicFormProps {
  form: any;
  className?: string;
  action?: any;
  loading?: boolean;
}
interface FieldBaseProps {
  field: any;
}
const fieldsMap: { [key: string]: ComponentType<any> } = {
  [FormFieldTypes.TEXT]: TextInput,
  [FormFieldTypes.EMAIL]: TextInput,
  [FormFieldTypes.TEXTAREA]: TextArea,
  [FormFieldTypes.SELECT]: CustomSelectTwo,
  [FormFieldTypes.COUNTRY_SELECT]: CustomSelectTwo,
  [FormFieldTypes.CHECKBOX]: Checkbox,
  [FormFieldTypes.CHECKBOX_GROUP]: CheckboxGroup,
};

function FieldBase({ field }: FieldBaseProps) {
  const Component = fieldsMap[field.type];
  if (!Component) return <TextInput field={field} />;
  return <Component field={field} />;
}

const formWrapperVariable = {
  "--form-x-gap": `${29 / 2}px`,
  "--form-y-gap": "39px",
} as CSSProperties;

export default function CustomDynamicForm({
  form,
  className,
  action,
  loading,
}: CustomDynamicFormProps) {
  const [isActive, setIsActive] = useState(false);
  const {
    fields,
    action_url,
    submit_cta,
    submission_consent_msg,
    note,
    note_is_important,
  } = form;

  const flattedFields = fields.flatMap((item: any) => item?.form_fields_id);
  return (
    <form
      action={action_url || action}
      className={cn("size-full ", className, isActive && "shake")}
    >
      <div className="flex size-full min-w-full flex-col justify-between gap-y-6">
        {note && (
          <div
            className={cn(
              "wysiwyg-formatting label-rich relative mb-5 max-w-[325px] text-base",
              {
                "pl-3 before:text-2xl before:absolute before:left-0 before:inline before:font-black before:text-red-500 before:content-['*']":
                  note_is_important,
              },
            )}
            dangerouslySetInnerHTML={{ __html: note }}
          />
        )}
        <div
          key={form.id}
          style={formWrapperVariable}
          className="flex flex-wrap justify-between gap-y-[var(--form-y-gap)] text-gray-500 peer-active:bg-red-500"
        >
          {flattedFields.map((field: any) => (
            <FieldBase field={field} key={field?.id} />
          ))}
        </div>
        {submission_consent_msg && (
          <div
            className="wysiwyg-formatting label-rich mb-2 max-w-[325px] text-[12px]/[19.2px]"
            dangerouslySetInnerHTML={{ __html: submission_consent_msg }}
          />
        )}
        {submit_cta && (
          <CButton
            type="submit"
            className="peer  self-start bg-foreground p-3 text-sm text-white hover:bg-foreground hover:text-white"
            iconClassName="text-primary"
            label={submit_cta.label as string}
            icon={submit_cta.icon as any}
            onClick={() => setIsActive(true)}
            loading={loading}
          />
        )}
      </div>
    </form>
  );
}
