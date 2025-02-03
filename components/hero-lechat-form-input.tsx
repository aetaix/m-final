"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loader } from "lucide-react";
import React from "react";
import DirectusImageClient from "./shared/directus-image-client";
import { Button } from "./ui/button";

interface HeroLeChatFormInputProps {
  input_icon: any;
  sample_title: string;
  input_redirect_link: string;
  input_placeholder: string;
  input_button_label: string;
  input_button_icon: any;
  sample_prompts: { prompt: string }[];
}

interface FormData {
  message: string;
}

const HeroLeChatFormInput = ({ data }: { data: HeroLeChatFormInputProps }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const [formData, setFormData] = React.useState<FormData>({
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(
      data.input_redirect_link + `?q=${encodeURIComponent(formData.message)}`,
      "_blank",
    );
    setSubmitted(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setSubmitted(true);
      window.open(
        data.input_redirect_link + `?q=${encodeURIComponent(formData.message)}`,
        "_blank",
      );
      setSubmitted(false);
    }
  };
  const onSampleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prompt: string,
  ) => {
    event.preventDefault();
    setFormData({ message: prompt });
  };
  return (
    <form
      className="flex w-full max-w-2xl flex-col rounded-[10px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start rounded-t-[10px] bg-mistral-black-deep p-5 lg:h-[76.33px]">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-center lg:py-0">
          <div className="flex w-full items-start">
            <div className="bg-white/20 p-1.5">
              <DirectusImageClient
                width={20}
                height={20}
                className="aspect-square origin-center object-contain"
                asset={data?.input_icon?.image_dark_mode}
              />
            </div>
            <textarea
              id="message"
              name="message"
              placeholder={data.input_placeholder}
              onKeyDown={handleKeyDown}
              className="flex h-32 w-full flex-1 resize-none border-none bg-mistral-black-deep px-3 py-2 text-white shadow-none placeholder:opacity-65 focus-visible:outline-none focus-visible:ring-0 dark:placeholder:opacity-90 lg:h-2xl lg:pb-0 lg:pt-2"
              value={formData?.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <Button
            type="submit"
            className="hidden items-center p-2 px-3 text-base lg:flex"
          >
            <span>{data.input_button_label}</span>
            {submitted ? (
              <Loader className="animate-spin" />
            ) : data.input_button_icon ? (
              <DirectusImageClient
                width={10}
                height={10}
                className="origin-center object-contain"
                asset={data.input_button_icon}
              />
            ) : null}
          </Button>
        </div>
        <Button
          type="submit"
          className="flex items-center p-2 px-3 text-base lg:hidden"
        >
          <span>{data.input_button_label}</span>
          {submitted ? (
            <Loader className="animate-spin" />
          ) : data.input_button_icon ? (
            <DirectusImageClient
              width={10}
              height={10}
              className="origin-center object-contain"
              asset={data.input_button_icon}
            />
          ) : null}
        </Button>
      </div>
      <div className="flex h-[84px] flex-col justify-center gap-y-2 rounded-b-[10px] border border-mistral-black border-t-white/20 bg-mistral-black-deep px-5 text-left lg:h-[54px] lg:flex-row lg:items-center lg:justify-between">
        <span className="text-sm text-mistral-beige-deep/50">
          {data.sample_title}
        </span>
        <div className="text-sm text-mistral-beige-deep">
          <Carousel
            className="overflow-hidden"
            orientation="vertical"
            opts={{
              duration: 20,
              align: "start",
            }}
            plugins={[plugin.current]}
          >
            <CarouselContent className="h-[35px]">
              {data.sample_prompts.map((item, index) => (
                <CarouselItem key={index} className="flex lg:justify-end">
                  <button onClick={(e) => onSampleSelect(e, item.prompt)}>
                    {item.prompt}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </form>
  );
};

export default HeroLeChatFormInput;
