"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

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

export default async function ScrollingHeaderView({ content }: any) {
  return (
    <Splide
      className="py-12"
      options={options}
      extensions={{ AutoScroll }}
      aria-label="Mistral Marquee Heading"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <SplideSlide key={index}>
          <div
            className="scrolling-header p-4 text-[64px]"
            dangerouslySetInnerHTML={{
              __html: content || "",
            }}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
