"use client";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
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

function DesktopView({ items, activeIcon }: { items: any; activeIcon: Icon }) {
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

  useGSAP(() => {
    const contents = gsap.utils.toArray(".content") as any[];
    const titles = gsap.utils.toArray(".pinnedTitle") as any[];
    const icons = gsap.utils.toArray(".title-icon") as any[];
    const matchMedia = gsap.matchMedia();

    matchMedia.add(`(min-width: ${tabletBreakpoint}px)`, () => {
      // Kill existing ScrollTrigger instances before creating new ones
      scrollTriggerRef.current?.kill(true);
      const containerHeight = productContainerRef.current?.scrollHeight;

      // Set initial state for all titles and icons
      gsap.set(titles, { opacity: 0.5 });
      gsap.set(icons, { opacity: 0 });

      // Set initial active state for first title and icon
      gsap.set(titles[0], { opacity: 1 });
      gsap.set(icons[0], { opacity: 1 });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: productContainerRef.current,
        pin: fixedContainer.current,
        start: `top ${SCROLL_OFFSET}px`,
        end: () => `+=${containerHeight! - CONTENT_GAP * items?.length}`,
        invalidateOnRefresh: true,
      });

      // Create individual scroll triggers for each content section
      const marginOffset = SCROLL_OFFSET + CONTENT_GAP;
      contents.forEach((content, index) => {
        if (index < contents.length) {
          ScrollTrigger.create({
            trigger: content,
            start: `top ${marginOffset}px`,
            end: `bottom ${content.getBoundingClientRect().height}px`,
            onEnter: () => {
              // Fade out all titles and icons
              gsap.to(titles, { opacity: 0.5, duration: 0.3 });
              gsap.to(icons, { opacity: 0, duration: 0.3 });

              // Fade in current title and icon
              gsap.to(titles[index], { opacity: 1, duration: 0.3 });
              gsap.to(icons[index], { opacity: 1, duration: 0.3 });
            },
            onEnterBack: () => {
              // Same animation when scrolling back up
              gsap.to(titles, { opacity: 0.5, duration: 0.3 });
              gsap.to(icons, { opacity: 0, duration: 0.3 });

              gsap.to(titles[index], { opacity: 1, duration: 0.3 });
              gsap.to(icons[index], { opacity: 1, duration: 0.3 });
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, [windowSize]);

  const handleTitleClick = async (index: number) => {
    const contents = gsap.utils.toArray(".content") as any[];
    const targetedContent = contents[index];
    if (targetedContent) {
      const automaticOffset = index === 0 ? SCROLL_OFFSET * 2 : SCROLL_OFFSET;
      window.scrollBy({
        top: targetedContent!.getBoundingClientRect().top - automaticOffset,
        behavior: "instant",
      });
    }
  };

  return (
    <div className="hidden md:flow-root">
      <div
        ref={productContainerRef}
        className="relative overflow-y-hidden scroll-smooth"
      >
        <div className="flex">
          <div
            ref={fixedContainer}
            className="flex !h-fit max-h-min flex-col border-b border-[#ECDAA2]/[.5]"
          >
            {items.map((item: any, index: number) => (
              <button
                onClick={() => handleTitleClick(index)}
                key={`title-${item?.id}`}
                className="flex min-h-[49px] items-center gap-x-10 border-t border-[#ECDAA2]/[.5] px-md first:border-t-0"
              >
                <div
                  key={item.name}
                  className="pinnedTitle text-nowrap text-sm"
                  dangerouslySetInnerHTML={{ __html: item.headline || "" }}
                />
                <div className="relative flex size-[20px] items-center justify-center text-primary">
                  <DirectusImageClient
                    asset={activeIcon}
                    className="title-icon flex size-[20px] items-center justify-center object-contain "
                    fill
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="grid flex-1 grid-flow-row gap-y-3xl">
            {items.map((item: any, index: number) => (
              <div
                key={`content-${item.id}`}
                className="content bg-grid-thickness-base bg-grid-pattern flex w-full flex-col gap-3xl border-b border-r border-[#ECDAA2]/[.5] py-[70px] pl-[106px] pr-[77px] bg-grid-size-[49px] bg-grid-[#ECDAA2]/[.5] lg:flex-row"
              >
                <div className="flex flex-1 flex-col justify-center gap-y-5xl xl:gap-y-[144px]">
                  <div className="flex flex-col gap-y-[26px]">
                    <div
                      className="text-[30px]/[34px] text-black"
                      dangerouslySetInnerHTML={{ __html: item.headline || "" }}
                    />
                    <div
                      className="text-[#3C3C3C]"
                      dangerouslySetInnerHTML={{ __html: item.body || "" }}
                    />
                  </div>
                  {item.button && (
                    <ButtonLink button={item.button}>
                      <CButton
                        className="max-w-min text-sm text-mistral-black-tint"
                        iconClassName="text-primary"
                        btn={item.button}
                      />
                    </ButtonLink>
                  )}
                </div>
                <div className="relative mx-auto aspect-square size-full max-h-[319px] max-w-[319px] shrink-0 lg:flex-1 xl:max-h-[448px] xl:max-w-[448px]">
                  {item?.image && (
                    <DirectusImageClient
                      blur
                      key={index}
                      fill
                      className="aspect-square object-contain"
                      asset={item.image}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
