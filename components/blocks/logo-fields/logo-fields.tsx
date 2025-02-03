"use client";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { BlockLogoField } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useEffect, useState } from "react";

const fetchLogoFieldsData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_LOGO_FIELDS, {
      filter: { id: { _eq: blockId } },
      fields: ["*", { images: ["*", { block_image_id: ["*"] }] }],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default function LogoFields({ data: { id }, locale }: any) {
  const [data, setData] = useState<BlockLogoField | null>(null);
  const [marqueeImages, setMarqueeImages] = useState<any>(null);

  useEffect(() => {
    if (data) return;
    const fetchData = async () => {
      const _data = await fetchLogoFieldsData(id, locale);
      setData(_data);
      const itemsData = (_data?.images || [])
        .map((item: any) => {
          return {
            name: item.block_image_id?.name,
            logo: item.block_image_id?.file,
          };
        })
        .filter((item: any) => item?.logo);

      const formattedItems = itemsData
        .map((item: any) => {
          return { name: item.name, url: item.logo };
        })
        .sort((a: any, b: any) => (a?.name || "").localeCompare(b?.name || ""));

      const options = {
        type: "loop",
        drag: false,
        focus: "center",
        autoWidth: true,
        autoHeight: true,
        perPage: 3,
        gap: "1rem",
        arrows: false,
        pagination: false,
        breakpoints: {
          768: {
            autoScroll: {
              speed: 0.8, // for mobile
              pauseOnHover: false,
              pauseOnFocus: false,
            },
          },
        },
        autoScroll: {
          speed: 0.75, //for desktop
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      };

      setMarqueeImages(
        <Splide
          options={options}
          extensions={{ AutoScroll }}
          aria-label="Our clients"
        >
          {[...formattedItems].map((item, idx) => (
            <SplideSlide key={idx}>
              <DirectusImage
                asset={item.url}
                width={100}
                height={44}
                className={`marquee-logos-slide-img mx-10 block h-[44px] w-auto object-contain py-1.5`}
                key={(item.name || "") + idx}
              />
            </SplideSlide>
          ))}
        </Splide>,
      );
    };

    fetchData();
  }, [id]);

  if (!data) return <div className="container h-[212px]"></div>;

  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="container py-2xl md:py-4xl"
    >
      <div className="marquee-logos flex items-center">{marqueeImages}</div>
    </div>
  );
}
