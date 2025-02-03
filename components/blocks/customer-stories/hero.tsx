"use client";
import { useState } from "react";

import DirectusImageClient from "@/components/shared/directus-image-client";
import { directusAssets } from "@/lib/image";
import { HeroCustomerStoriesData } from "./types";
import Modal from "./modal";
import { useRouter } from "next/navigation";

export default function HeroCustomerStories({ data }: HeroCustomerStoriesData) {
  const router = useRouter();
  const {
    button_icon,
    button_text,
    headline,
    subheadline,
    featured_story: {
      headline: featuredHeadline,
      logo: featuredLogo,
      modal_close_icon: featuredModalCloseIcon,
      modal_content: featuredModalContent,
      customer_story_page: storyPage,
    },
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextAction = () => {
    if (storyPage) {
      router.push(storyPage.permalink);
    } else {
      handleOpenModal();
    }
  };

  return (
    <section className="mb-[138px] pb-[0.2rem]">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        logo={featuredLogo}
        modalCloseIcon={featuredModalCloseIcon}
        content={featuredModalContent}
      />
      <div className="relative mt-[135px] overflow-hidden">
        <div className="bg-grid-size-md bg-grid-secondary bg-grid-pattern absolute inset-0 top-[-17%] h-[100.3%] w-full xl:top-[-13%]" />
        <div className="flex items-center justify-center">
          <div className="container relative z-10 mx-auto mt-2xl md:mt-[78px]">
            <h1
              dangerouslySetInnerHTML={{ __html: headline || "" }}
              className="mx-auto mb-8 max-w-[638px] text-center text-[40px]/[42px] text-foreground sm:mb-[46px] sm:text-[72px]/[72px]"
            />
            <div
              dangerouslySetInnerHTML={{ __html: subheadline || "" }}
              className="mx-auto max-w-[823px] text-center text-xl/[21.6px] text-foreground sm:text-[20px]/[27px]"
            />
            <div className="mt-12 bg-mistral-beige-deep px-8 py-4 md:mt-[120px] md:pb-[30px] md:pl-[38px] md:pr-[61px] md:pt-[50px]">
              <div className="flex flex-wrap gap-12 md:items-end md:justify-between">
                <div className="order-2 md:order-1">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: featuredHeadline || "",
                    }}
                    className="text-2xl mb-12 max-w-[452px] md:mb-6xl"
                  />
                  <button
                    onClick={handleNextAction}
                    className="flex items-center gap-4 bg-foreground px-3 py-[14px] text-white"
                  >
                    <span>{button_text}</span>
                    <DirectusImageClient
                      className="h-[12.33px] w-[7.39px] object-cover"
                      height={12.33}
                      width={7.39}
                      asset={button_icon?.image}
                    />
                  </button>
                </div>
                <img
                  src={directusAssets(featuredLogo?.file)}
                  alt={featuredLogo?.name}
                  className="order-1 h-[44px] w-[205px] object-contain md:order-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
