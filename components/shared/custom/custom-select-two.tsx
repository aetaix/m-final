"use client";
import { FormFieldTypes } from "@/constants/enum";
import { countries } from "@/data/countries";
import { FormField, FormFieldsTranslation } from "@/types/directus-schema";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./custom-select";

const NULL_VALUE = "null";

const CustomSelectTwo = ({
  field,
}: {
  field: FormField & FormFieldsTranslation;
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  //@ts-ignore
  const locale = field.locale;

  const options = useMemo(() => {
    if (field.type === FormFieldTypes.COUNTRY_SELECT) {
      return countries.map((option: any) => ({
        label: option.label[locale as keyof typeof option.label],
        value: option.value,
      }));
    } else {
      return field.choices?.map((option: any) => ({
        label: option.label || option.text,
        value: option.name,
      }));
    }
  }, [field, locale]);

  return (
    <div className="w-full">
      {field?.show_label && selectedValue && selectedValue !== NULL_VALUE && (
        <label className="pb-4 text-xs text-black transition-all">
          {field?.placeholder}
        </label>
      )}
      <Select
        required={field?.required as boolean}
        name={field?.name}
        onValueChange={setSelectedValue}
      >
        <SelectTrigger className="flex w-full justify-between border-b border-t-0 border-b-[#ECDAA2] text-gray-500 hover:text-gray-500">
          <SelectValue placeholder={field?.placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-none bg-background text-gray-500 shadow-none">
          <SelectItem
            key="placeholder"
            value={NULL_VALUE}
            showIndicator={false}
            className="left-0 ml-0 !px-0 py-2 pl-0 focus-within:border-black focus-within:!bg-transparent focus-within:!text-black hover:border-black hover:!bg-transparent hover:!text-black focus:border-b "
            onClick={() => setSelectedValue(NULL_VALUE)}
          >
            {field?.placeholder}
          </SelectItem>
          {options?.map((option: any) => (
            <SelectItem
              key={option.value}
              value={option.value}
              showIndicator={false}
              onClick={() => setSelectedValue(option.value)}
              className="left-0 ml-0 !px-0 py-2 pl-0 focus-within:border-black focus-within:!bg-transparent focus-within:!text-black hover:border-black hover:!bg-transparent hover:!text-black focus:border-b "
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        name={field?.name}
        defaultValue={selectedValue || ""}
        required
        className="hidden-input"
        pattern={`^(?!${NULL_VALUE}$).+`}
      />

      <span
        className="error-message text-xs text-red-500"
        dangerouslySetInnerHTML={{
          __html: field?.error_validation_msg || "",
        }}
      />
    </div>
  );
};

export default CustomSelectTwo;
