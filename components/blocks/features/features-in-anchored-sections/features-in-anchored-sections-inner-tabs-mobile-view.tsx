"use client";
import { cn, slugify } from "@/lib/utils";
import React from "react";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/custom-accordion";

import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImageClient from "@/components/shared/directus-image-client";

const AnchoredSectionsInnerTabsMobileView = ({
  data,
  activeIcon,
}: {
  data: any;
  activeIcon: any;
}) => {
  const [selectedTab, setSelectedTab] = React.useState(data.items[0].name);

  const changeSelectedTab = (value: string) => {
    setSelectedTab(value);

    setTimeout(() => {
      const tabId = "mobile-tab-" + slugify(value);
      const element = document.getElementById(tabId);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }, 100);
  };

  return (
    <div
      id={data?.section_id}
      className="bg-grid-pattern block w-full bg-grid-size-[50px_50px] bg-grid-[#ECDAA150] md:hidden"
    >
      <Accordion
        value={selectedTab}
        onValueChange={(val) => changeSelectedTab(val)}
        type="single"
        collapsible
        className="mt-[69px] w-full divide-y divide-mistral-black border border-mistral-black bg-background md:mt-0"
      >
        {data.items.map((card: any) => (
          <AccordionItem value={card.name} key={card.name} className="m-0">
            <AccordionTrigger asChild className="m-0">
              <button
                id={"mobile-tab-" + slugify(card.name)}
                className="group flex min-h-[50px] flex-row items-center justify-between gap-x-8 px-5 py-0 text-left no-underline first:translate-y-0 hover:no-underline data-[state=open]:bg-mistral-black data-[state=open]:text-secondary data-[state=open]:shadow-none"
              >
                <div
                  className="sm:wrap-inner-p text-sm no-underline sm:max-w-[160px]"
                  dangerouslySetInnerHTML={{
                    __html: card.headline || "",
                  }}
                ></div>
                {selectedTab === card.name && activeIcon && (
                  <div className="data-[state=open]:block data-[state=closed]:hidden">
                    <div
                      className="size-5 text-primary dark:hidden"
                      dangerouslySetInnerHTML={{
                        __html: activeIcon.svg || "",
                      }}
                    ></div>
                    <div
                      className="hidden size-5 text-primary dark:block"
                      dangerouslySetInnerHTML={{
                        __html: activeIcon.svg_dark || "",
                      }}
                    ></div>
                  </div>
                )}
              </button>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="flex flex-col">
                <div className={cn("relative flex-1 shrink-0 bg-background")}>
                  <div className="flex size-full flex-col items-start justify-between gap-[74px] px-[13px] py-[37px] sm:px-[51px] sm:py-[44px] sm:pb-[51px] md:gap-[17px]">
                    <div
                      className="max-w-[351px] text-base"
                      dangerouslySetInnerHTML={{
                        __html: card.subheadline || "",
                      }}
                    ></div>
                    {card.action ? (
                      <ButtonLink button={card?.action}>
                        <CButton
                          className="h-[37px] justify-between text-sm"
                          label={card?.action?.label}
                          icon={card?.action.icon[0]?.icons_id}
                          iconClassName="text-primary ml-3"
                          btn={card?.action}
                        />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>

                <div
                  className={cn(
                    "relative flex size-full flex-1 shrink-0 items-center justify-center bg-mistral-beige-deeper aspect-square lg:aspect-auto",
                  )}
                >
                  <div className="size-full p-4 md:p-8">
                    {card?.hovering_image ? (
                      <div className="relative z-10 size-full">
                        <DirectusImageClient
                          asset={card?.hovering_image}
                          fill
                          blur
                          className="size-full object-contain"
                        />
                      </div>
                    ) : null}
                    {card?.background_image ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="relative size-full">
                          <DirectusImageClient
                            asset={card?.background_image}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* <Tabs
        defaultValue={data.items[0].name}
        onValueChange={changeSelectedTab}
        className='flex flex-col sm:flex-row'
      >
        <TabsList className='no-scrollbar sticky top-[156px] z-20 m-0 mr-[-20px] flex h-fit shrink-0 flex-nowrap items-center justify-start divide-x divide-mistral-black overflow-x-auto border border-mistral-black p-0 sm:mr-0 sm:max-w-md sm:flex-col sm:justify-start sm:divide-x-0 sm:divide-y'>
          {data.items.map((card: any) => (
            <TabsTrigger
              key={card.name}
              className='data-[state=active]:shadow-none'
              value={card.name}
              asChild
            >
              <button className='group flex min-h-[50px] w-fit flex-row items-center justify-between gap-x-8 px-5 py-0 text-left first:translate-y-0 data-[state=active]:bg-mistral-black data-[state=active]:text-secondary data-[state=active]:shadow-none sm:w-64'>
                <div
                  className='sm:wrap-inner-p text-sm sm:max-w-[160px]'
                  dangerouslySetInnerHTML={{
                    __html: card.headline || '',
                  }}
                ></div>
                {selectedTab === card.name && activeIcon && (
                  <>
                    <div
                      className='size-5 text-primary dark:hidden'
                      dangerouslySetInnerHTML={{
                        __html: activeIcon.svg || '',
                      }}
                    ></div>
                    <div
                      className='hidden size-5 text-primary dark:block'
                      dangerouslySetInnerHTML={{
                        __html: activeIcon.svg_dark || '',
                      }}
                    ></div>
                  </>
                )}
              </button>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className='m-0 flex-1'>
          {data.items.map((card: any) => (
            <TabsContent
              key={card.name}
              className='m-0 !block p-0 opacity-100 data-[state=inactive]:opacity-0'
              value={card.name}
            >
              <div className='relative flex flex-col overflow-hidden border-[0.5px] border-[#ECDAA1] lg:grid lg:grid-cols-2'>
                <div
                  className={cn(
                    'relative flex-1 shrink-0 bg-background',
                    card.action ? 'aspect-square' : 'lg:aspect-square'
                  )}
                >
                  <div className='flex size-full flex-col items-start justify-between gap-[17px] px-[18px] py-[44px] sm:px-[51px] sm:py-[44px] sm:pb-[51px]'>
                    <div
                      className='max-w-[351px] text-base'
                      dangerouslySetInnerHTML={{
                        __html: card.subheadline || '',
                      }}
                    ></div>
                    {card.action ? (
                      <ButtonLink button={card?.action}>
                        <CButton
                          className='h-[37px] justify-between text-sm'
                          label={card?.action?.label}
                          icon={card?.action.icon[0]?.icons_id}
                          iconClassName='text-primary'
                          btn={card?.action}
                        />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
                <div
                  className={cn(
                    'relative flex size-full flex-1 shrink-0 items-center justify-center bg-mistral-beige-deeper aspect-square  lg:aspect-auto p-4 md:p-8 md:py-12'
                  )}
                >
                  {card?.hovering_image ? (
                    <div className='relative z-10 size-full'>
                      <DirectusImageClient
                        asset={card?.hovering_image}
                        fill
                        blur
                        className='size-full object-contain'
                      />
                    </div>
                  ) : null}
                  {card?.background_image ? (
                    <div className='absolute inset-0 overflow-hidden'>
                      <div className='relative size-full'>
                        <DirectusImageClient
                          asset={card?.background_image}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs> */}
    </div>
  );
};

export default AnchoredSectionsInnerTabsMobileView;
