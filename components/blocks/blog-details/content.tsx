"use client";

import { useEffect, useState } from "react";
import { IBlogDetailsContentData } from "./type";
import BlogDetailsSidebar from "./sidebar";

export default function BlogDetailsContent({ data }: IBlogDetailsContentData) {
  const { content } = data;
  const [contentWithWrappedTables, setContentWithWrappedTables] =
    useState(content);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      // Find all <table> elements and wrap them
      const tables = doc.querySelectorAll("table");
      tables.forEach((table) => {
        const wrapper = doc.createElement("div");
        wrapper.className = "table-wrapper";
        table.parentNode?.replaceChild(wrapper, table);
        wrapper.appendChild(table);
      });

      setContentWithWrappedTables(doc.body.innerHTML);
    }
  }, [content]);

  return (
    <section className="container mx-auto">
      <div className="flex w-full flex-wrap justify-center gap-[70px] lg:px-0 xl:flex-nowrap">
        <div
          dangerouslySetInnerHTML={{ __html: contentWithWrappedTables }}
          className="blog-rich-text relative w-full overflow-hidden xl:w-auto"
        />
        <BlogDetailsSidebar data={data} />
      </div>
    </section>
  );
}
