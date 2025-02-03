"use client";
import { FormField, FormFieldsTranslation } from "@/types/directus-schema";
import { formFieldWidth } from "./utils";
import { useState } from "react";

export default function TextInput({
  field,
}: {
  field: FormField & FormFieldsTranslation;
}) {
  const [isFocused, setIsFocused] = useState(false);
  if (!field) return null;

  const {
    name,
    placeholder,
    required,
    width,
    type,
    show_label,
    error_validation_msg,
  } = field;
  const dynamicWidth = formFieldWidth(width || "100");

  return (
    <div
      className="relative w-full md:w-[--dynamic-width]"
      style={
        {
          "--dynamic-width": dynamicWidth,
        } as React.CSSProperties
      }
    >
      {show_label && (
        <label
          htmlFor={name}
          className={`absolute left-0 cursor-pointer transition-all ${
            isFocused ? "-top-4 text-xs text-black" : "top-2 text-base"
          }`}
        >
          {placeholder}
        </label>
      )}
      <input
        id={name as string}
        name={name as string}
        type={type || "text"}
        placeholder={show_label ? "" : (placeholder as string)}
        required={required as boolean}
        className="h-10 w-full border-b border-b-[#ECDAA2] bg-transparent outline-none placeholder:text-foreground focus:border-b-black focus:text-black focus:placeholder:text-foreground/30"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        onChange={(e) => setIsFocused(e.target.value !== "")}
      />
      <span
        className="error-message mt-2 text-xs text-red-500"
        dangerouslySetInnerHTML={{
          __html: error_validation_msg || "",
        }}
      />
    </div>
  );
}
