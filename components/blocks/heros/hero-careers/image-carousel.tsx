"use client";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const options = {
  type: "loop",
  drag: false,
  focus: "center",
  autoHeight: true,
  perPage: 3,
  gap: "1rem",
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 0.5,
    pauseOnHover: false,
    pauseOnFocus: false,
  },
};

export default function CarouselImages({ images }: any) {
  return (
    <Splide
      className="w-full py-12"
      options={options}
      extensions={{ AutoScroll }}
      aria-label="Mistral Marquee Heading"
    >
      {images.map((image: any, index: number) => (
        <SplideSlide key={index} className="h-[400px] w-full">
          <DirectusImageClient
            asset={image}
            fill
            className="w-full object-cover"
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
