import { cn } from "@/lib/utils";
import { ComponentType, CSSProperties } from "react";
import { CButton } from "../custom-button";
import TextArea from "./text-area";
import TextInput from "./text-input";
import { FormFieldTypes } from "@/constants/enum";

interface DynamicFormProps {
  form: any;
  className?: string;
}
interface FieldBaseProps {
  field: any;
}
const fieldsMap: { [key: string]: ComponentType<any> } = {
  [FormFieldTypes.TEXT]: TextInput,
  [FormFieldTypes.EMAIL]: TextInput,
  [FormFieldTypes.TEXTAREA]: TextArea,
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

export default function DynamicForm({ form, className }: DynamicFormProps) {
  const { fields, action_url, submit_cta, method } = form;
  const flattedFields = fields.flatMap((item: any) => item?.form_fields_id);
  return (
    <form
      method={method}
      action={action_url as string}
      className={cn("size-full", className)}
    >
      <div className="flex size-full min-w-full flex-col justify-between gap-y-4xl">
        <div
          style={formWrapperVariable}
          className="flex flex-wrap justify-between gap-y-[var(--form-y-gap)]"
        >
          {flattedFields.map((field: any) => (
            <FieldBase key={field.id} field={field} />
          ))}
        </div>
        <CButton
          type="submit"
          className="self-start bg-foreground p-3 text-sm text-white hover:bg-foreground hover:text-white"
          iconClassName="text-primary"
          label={submit_cta.label as string}
          icon={submit_cta.icon as any}
        />
      </div>
    </form>
  );
}
