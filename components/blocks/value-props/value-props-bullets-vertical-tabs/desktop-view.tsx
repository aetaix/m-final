"use client";

import DirectusImage from "@/components/shared/directus-image";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { tabletBreakpoint } from "@/constants/screens";
import { Icon } from "@/types/directus-schema";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTENT_GAP = 48;
const SCROLL_OFFSET = 123;

function DesktopView({
  items,
  activeIcon,
  bulletIcon,
}: {
  items: any;
  activeIcon: Icon;
  bulletIcon: Icon;
}) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const productContainerRef = useRef<HTMLDivElement>(null);
  const fixedContainer = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTitleClick = async (index: number) => {
    const contents = gsap.utils.toArray(".image-bullets-content") as any[];
    const targetedContent = contents[index];
    if (targetedContent) {
      const automaticOffset = index === 0 ? SCROLL_OFFSET * 2 : SCROLL_OFFSET;
      window.scrollBy({
        top: targetedContent!.getBoundingClientRect().top - automaticOffset,
        behavior: "instant",
      });
    }
  };

  useGSAP(() => {
    const contents = gsap.utils.toArray(
      ".image-bullets-content",
    ) as HTMLDivElement[];
    const titles = gsap.utils.toArray(
      ".image-bullets-title",
    ) as HTMLButtonElement[];
    const icons = gsap.utils.toArray(
      ".image-bullets-title-icon",
    ) as HTMLSpanElement[];
    const matchMedia = gsap.matchMedia();
    matchMedia.add(`(min-width: ${tabletBreakpoint}px)`, () => {
      // Existing ScrollTrigger setup remains the same
      scrollTriggerRef.current?.kill(true);
      const containerHeight = productContainerRef.current?.scrollHeight;

      gsap.set(titles, { backgroundColor: "transparent", color: "#171616" });
      gsap.set(icons, { opacity: 0 });
      gsap.set(titles[0], { backgroundColor: "#171616", color: "#FFFAEB" });
      gsap.set(icons[0], { opacity: 1 });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: productContainerRef.current,
        pin: fixedContainer.current,
        start: `top ${SCROLL_OFFSET}px`,
        end: () => `+=${containerHeight! - CONTENT_GAP * items?.length}`,
        invalidateOnRefresh: true,
      });
      const triggerPointOffset = SCROLL_OFFSET + CONTENT_GAP;
      contents.forEach((content, index) => {
        if (index < contents.length) {
          ScrollTrigger.create({
            trigger: content,
            start: `top ${triggerPointOffset}px`,
            end: `bottom ${content.getBoundingClientRect().height}px`,
            onEnter: () => {
              gsap.to(titles, {
                backgroundColor: "transparent",
                color: "#171616",
                duration: 0.3,
              });
              gsap.to(icons, { opacity: 0, duration: 0.3 });
              gsap.to(titles[index], {
                backgroundColor: "#171616",
                color: "#FFFAEB",
                duration: 0.3,
              });
              gsap.to(icons[index], { opacity: 1, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(titles, {
                backgroundColor: "transparent",
                color: "#171616",
                duration: 0.3,
              });
              gsap.to(icons, { opacity: 0, duration: 0.3 });
              gsap.to(titles[index], {
                backgroundColor: "#171616",
                color: "#FFFAEB",
                duration: 0.3,
              });
              gsap.to(icons[index], {
                opacity: 1,
                duration: 0.3,
              });
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, [windowSize]);

  return (
    <div className="hidden md:flow-root">
      <div
        ref={productContainerRef}
        className="relative overflow-y-hidden scroll-smooth"
      >
        <div className="flex justify-between ">
          <div
            ref={fixedContainer}
            className="flex h-fit min-w-[236px] flex-col border border-[#1E1E1E]"
          >
            {items.map((item: any, index: number) => (
              <button
                key={`title-${item?.id}`}
                className="image-bullets-title flex min-h-[49px] cursor-pointer items-center justify-between gap-x-10 border-b border-b-[#1E1E1E] px-md last:border-b-0"
                onClick={() => handleTitleClick(index)}
              >
                <div
                  key={item.name}
                  className="text-nowrap text-sm"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <div className="relative inline-flex size-3 items-center justify-center">
                  <DirectusImageClient
                    fill
                    asset={activeIcon}
                    className="image-bullets-title-icon flex size-3 items-center justify-center text-primary"
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="grid flex-1 grid-flow-row gap-y-3xl">
            {items.map((item: any, index: number) => {
              const mappedBullets = item.bullets.flatMap(
                ({ block_bullets_vertical_tabs_items_bullets_id }: any) =>
                  block_bullets_vertical_tabs_items_bullets_id,
              );
              return (
                <div
                  key={`image-bullets-content-${item.id}`}
                  className="image-bullets-content bg-grid-pattern grid grid-cols-2 border-b border-r border-[#ECDAA2]/[.5] bg-grid-size-[49px] bg-grid-[#ECDAA2]/[.5] xl:gap-x-0"
                >
                  <div className="relative aspect-square size-full">
                    {item?.image && (
                      <DirectusImageClient
                        blur
                        key={index}
                        fill
                        className="object-cover object-left"
                        asset={item.image}
                      />
                    )}
                  </div>
                  <div className="mx-auto size-full content-center space-y-[10px] p-[51px]">
                    {mappedBullets.map((item: any) => (
                      <div
                        key={`bullets-${item.id}`}
                        className="flex w-full max-w-[347px] items-center justify-between gap-2xl-2 bg-[#FFF0C3] p-md text-[#171616]"
                      >
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: item.content || "",
                          }}
                        />
                        <div className="relative flex size-xl items-center justify-center text-primary">
                          <DirectusImage
                            asset={bulletIcon}
                            fill
                            className="relative flex size-xl items-center justify-center"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
