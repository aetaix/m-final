"use client";

import DirectusImageClient from "@/components/shared/directus-image-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./modal";
import { CustomerStoriesData } from "./types";

export default function CustomerStories({ data }: CustomerStoriesData) {
  const router = useRouter();
  const { item_button_icon, item_button_text, items, anchor } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleNextAction = (customer_story_page: any, item: any) => {
    if (customer_story_page) {
      router.push(customer_story_page.permalink);
    } else {
      handleOpenModal(item);
    }
  };

  return (
    <div id={anchor || ""} className="container mx-auto">
      <div className="mt-[68px] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items?.map((item, i) => {
          const { headline, logo, customer_story_page, logo_height } = item;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-between border border-mistral-beige-deeper px-6 py-8 hover:border-transparent hover:bg-mistral-beige-deep"
            >
              {/* Logo Section */}
              <div className="flex h-20 items-center justify-center">
                {logo?.file && (
                  <DirectusImageClient
                    className="size-auto max-h-full"
                    height={20}
                    width={150}
                    style={{
                      height: logo_height || "100%",
                    }}
                    asset={logo?.file}
                  />
                )}
              </div>

              {/* Headline Section */}
              <div className="mt-12 flex flex-1 justify-center text-center">
                <p
                  dangerouslySetInnerHTML={{ __html: headline || "" }}
                  className="my-4"
                />
              </div>

              {/* Button Section */}
              <div className="mt-12 flex items-center justify-center">
                <button
                  onClick={() => handleNextAction(customer_story_page, item)}
                  className="flex items-center gap-7 border-b border-b-black py-[14px] text-black"
                >
                  <span>{item_button_text}</span>
                  <DirectusImageClient
                    className="h-[12.33px] w-[7.39px] object-cover"
                    height={12.33}
                    width={7.39}
                    asset={item_button_icon?.image}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          logo={selectedItem.logo}
          modalCloseIcon={selectedItem.modal_close_icon}
          content={selectedItem.modal_content}
        />
      )}
    </div>
  );
}
