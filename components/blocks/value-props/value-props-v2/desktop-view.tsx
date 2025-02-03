"use client";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { tabletBreakpoint } from "@/constants/screens";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS_GAP = 144;

function DesktopView({ items }: { items: any }) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const productContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
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
    const details = gsap.utils.toArray(".descriptionSection") as any[];
    const photos = gsap.utils.toArray(".illustration") as any[];
    const matchMedia = gsap.matchMedia();

    matchMedia.add(`(min-width: ${tabletBreakpoint}px)`, () => {
      // Kill existing ScrollTrigger instances before creating new ones
      scrollTriggerRef.current?.kill(true);

      const fixedContainerHeight = rightContainerRef?.current?.clientHeight;
      const containerHeight = productContainerRef.current?.scrollHeight;
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: productContainerRef.current,
        pin: rightContainerRef.current,
        start: "top 150px",
        end: () =>
          `+=${containerHeight! - (fixedContainerHeight! + CARDS_GAP)}`,
        invalidateOnRefresh: true,
        immediateRender: true,
        fastScrollEnd: true,
      });

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: productContainerRef.current,
          start: "10% top",
          end: "bottom bottom",
          scrub: 1,
          fastScrollEnd: true,
          immediateRender: true,
        },
      });

      details
        .slice(1)
        .forEach((detail) =>
          gsap.set(detail, { y: "0%", opacity: 0, scale: 0.9 }),
        );

      details.forEach((detail, index) => {
        if (index < details.length - 1) {
          masterTimeline
            .to(detail, {
              opacity: 0,
              y: "-100%",
              scale: 0.9,
              duration: 1,
            })
            .to(
              photos[index],
              {
                opacity: 0,
                duration: 1,
              },
              "<",
            )
            .to(
              details[index + 1],
              {
                opacity: 1,
                y: "0%",
                scale: 1,
                duration: 1,
              },
              "<",
            )
            .to(
              photos[index + 1],
              {
                opacity: 1,
                duration: 1,
              },
              "<",
            );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, [windowSize]);
  return (
    <div className="container hidden md:flow-root">
      <div
        ref={productContainerRef}
        className="product-container bg-grid-pattern-size-md bg-grid-secondary bg-grid-pattern relative max-w-screen-xl py-[80px]"
      >
        <div className="mx-auto mr-0 flex w-11/12 justify-between scroll-smooth">
          <div className="left flex flex-1 flex-col gap-y-[196px]">
            {items.map((item: any, index: number) => (
              <div
                key={index}
                className="descriptionSection flex h-screen max-h-[450px] snap-start flex-col justify-center gap-y-[144px]"
              >
                <div className="sectionHeader max-w-[377px] space-y-2xl">
                  <div
                    className="text-5xl"
                    dangerouslySetInnerHTML={{ __html: item?.headline || "" }}
                  />
                  <div
                    className="max-w-[276px] text-[22px]/[26px]"
                    dangerouslySetInnerHTML={{
                      __html: item?.subheadline || "",
                    }}
                  />
                </div>
                <ButtonLink className="inline-block" button={item.button}>
                  <CButton
                    className="bg-foreground p-3 text-[14px]/[11px] text-background hover:bg-foreground hover:text-background"
                    label={item?.button?.label}
                    btn={item?.button}
                    iconClassName="text-primary"
                    icon={item?.button?.icon[0]?.icons_id}
                  />
                </ButtonLink>
              </div>
            ))}
          </div>
          <div
            ref={rightContainerRef}
            className="right flex aspect-video h-screen max-h-[500px] max-w-[612px] flex-col md:w-1/2 2xl:w-auto 2xl:flex-1"
          >
            <div className="relative size-full overflow-hidden">
              {items
                .filter((item: { image: any }) => item.image)
                .map((item: any, index: number) => (
                  <DirectusImageClient
                    key={index}
                    blur
                    fill
                    className={`illustration object-contain ${index === 0 ? "opacity-100" : "opacity-0"}`}
                    asset={item?.image}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
