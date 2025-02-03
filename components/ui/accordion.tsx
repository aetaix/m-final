"use client";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        className="size-4 shrink-0 transition-transform duration-200"
        width="13"
        height="8"
        viewBox="0 0 13 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.06934 7.69561L8.06934 5.23364L5.60064 5.23364L5.60064 7.69561L8.06934 7.69561Z"
          fill="#FA500F"
        />
        <path
          d="M10.5312 5.23077L10.5312 2.7688L8.06256 2.7688L8.06256 5.23077L10.5312 5.23077Z"
          fill="#FA500F"
        />
        <path
          d="M13 2.76617L13 0.304199L10.5313 0.304199L10.5313 2.76617L13 2.76617Z"
          fill="#FA500F"
        />
        <path
          d="M5.60059 5.23077L5.60059 2.7688L3.13189 2.7688L3.13189 5.23077L5.60059 5.23077Z"
          fill="#FA500F"
        />
        <path
          d="M3.13867 2.76617L3.13867 0.304199L0.669979 0.304199L0.669979 2.76617L3.13867 2.76617Z"
          fill="#FA500F"
        />
      </svg>
      {/* <ChevronDown className="size-4 shrink-0 transition-transform duration-200" /> */}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:border-b data-[state=open]:border-secondary"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
