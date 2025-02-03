"use client";

import React, { useState } from "react";
import Checkbox from "./checkbox";
import { FormField, FormFieldsTranslation } from "@/types/directus-schema";

const CheckboxGroup = ({
  field,
}: {
  field: FormField & FormFieldsTranslation;
}) => {
  const { name, choices, label, required, error_validation_msg } = field;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValues((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

  return (
    <div className="flex w-full flex-col gap-1 text-gray-500">
      <label className="mb-1">{label}</label>
      {choices?.map((option: any, index: number) => (
        <Checkbox
          key={index}
          label={option.text}
          value={option.name}
          id={`${name}-${index}`}
          onChange={handleChange}
        />
      ))}
      <input
        className="hidden-input"
        id={name as string}
        name={name as string}
        defaultValue={selectedValues.join(",")}
        required={required as boolean}
        type="text"
      />
      <span
        className="error-message text-xs text-red-500"
        dangerouslySetInnerHTML={{
          __html: error_validation_msg || "",
        }}
      />
    </div>
  );
};

export default CheckboxGroup;
