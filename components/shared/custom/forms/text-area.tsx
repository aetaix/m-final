"use client";

import { FormField, FormFieldsTranslation } from "@/types/directus-schema";
import TextAreaAuto from "react-textarea-autosize";
import { formFieldWidth } from "./utils";
import { cn } from "@/lib/utils";

export default function TextArea({
  field,
}: {
  field: FormField & FormFieldsTranslation;
}) {
  if (!field) return;
  const { name, placeholder, required, width, label_rich, label, show_label } =
    field;
  const dynamicWidth = formFieldWidth(width || "100");
  return (
    <div
      className="w-full md:w-[var(--dynamic-width)]"
      style={
        {
          "--dynamic-width": dynamicWidth,
        } as React.CSSProperties
      }
    >
      {show_label && (
        <div
          className="wysiwyg-formatting label-rich !mb-6"
          dangerouslySetInnerHTML={{ __html: label_rich || label || "" }}
        />
      )}
      <TextAreaAuto
        name={name as string}
        placeholder={placeholder as string}
        style={{ margin: 0, padding: 0 }}
        required={required as boolean}
        className={cn(
          "max-h-14 min-h-[29.5px] min-w-full border-b border-b-[#ECDAA2] bg-transparent outline-none placeholder:text-foreground focus-within:outline-none focus:border-b-black focus:placeholder:text-foreground/30 lg:max-h-24",
          show_label
            ? "placeholder:text-gray-500"
            : "placeholder:text-foreground",
        )}
      />
    </div>
  );
}
