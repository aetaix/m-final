import { FormField, FormFieldsTranslation } from "@/types/directus-schema";

/* eslint-disable jsx-a11y/label-has-associated-control */
export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  field?: FormField & FormFieldsTranslation;
}

const Checkbox = (props: CheckboxProps) => {
  const { field, ...rest } = props;
  const { name, label } = field || {};
  return (
    <div className="flex h-10 w-full items-center gap-2 text-gray-500">
      <input
        className="peer relative size-4 shrink-0 appearance-none border border-gray-500 checked:border-2 checked:border-primary"
        type="checkbox"
        name={name as string}
        value={name as string}
        required={field?.required || false}
        {...rest}
      />

      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute ml-1  hidden size-2 text-primary peer-checked:block"
      >
        <path
          d="M4.40311 4.3999H2.20312V6.59989H4.40311V4.3999Z"
          fill="#FA500F"
        />
        <path
          d="M6.59843 2.19971H4.39844V4.3997H6.59843V2.19971Z"
          fill="#FA500F"
        />
        <path d="M8.80155 0H6.60156V2.19999H8.80155V0Z" fill="#FA500F" />
        <path d="M2.19999 2.19971H0V4.3997H2.19999V2.19971Z" fill="#FA500F" />
      </svg>

      <label
        htmlFor={props.id}
        dangerouslySetInnerHTML={{ __html: props.label || label || "" }}
      />
    </div>
  );
};

export default Checkbox;
