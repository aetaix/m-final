import { slugify } from "@/lib/utils";
import React from "react";

const TermsContentMobile = ({ items }: { items: any }) => {
  return (
    <div className="flex w-[70%] flex-1 flex-col gap-14">
      {items.map((item: any) => (
        <div id={`${slugify(item.name)}`}>
          <div
            className="mb-6 text-4xl font-[600]"
            dangerouslySetInnerHTML={{
              __html: item?.headline,
            }}
          ></div>
          <div
            className="terms-content-wysiwyg"
            dangerouslySetInnerHTML={{
              __html: item?.body,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default TermsContentMobile;
