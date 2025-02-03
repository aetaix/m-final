"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Icon, NavigationItem } from "@/types/directus-schema";
import React, { useCallback, useState } from "react";
import ButtonLink from "../shared/custom/button-link";
import { CButton } from "../shared/custom/custom-button";
import DirectusImageClient from "../shared/directus-image-client";
import HeaderLogo from "./header-logo";

interface HeaderMenubarProps {
  navigation?: NavigationItem[];
  navigationBtns?: NavigationItem[];
  logo: Icon;
  darkMode: boolean;
  openIcon: Icon;
  closeIcon: Icon;
  darkModeBlur: boolean;
}

const MobileHeader: React.FC<HeaderMenubarProps> = ({
  navigation = [],
  navigationBtns = [],
  logo,
  darkMode,
  openIcon,
  closeIcon,
  darkModeBlur,
}) => {
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setActiveMenu((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
  }, []);
  const onNavigation = useCallback(
    (item: NavigationItem, e?: Event) => {
      e?.stopPropagation();
      if (!item.open_in_new_tab) {
        toggleMenu();
      }
    },
    [toggleMenu],
  );

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const renderNestedLinks = useCallback(
    (items: NavigationItem[] = [], parentTitle: string) => {
      return (
        <div className="flex flex-col gap-y-xl">
          <div className="text-base">{parentTitle}</div>
          <div className="flex flex-col gap-y-xl">
            {items.map((item: any, index) => {
              if (!item.has_children)
                return (
                  <ButtonLink
                    key={`${parentTitle}-nested-${index}`}
                    className="flex w-full items-center text-sm text-foreground/[56%]"
                    button={item}
                    onClick={(e: Event) => onNavigation(item, e)}
                  >
                    {item.title}
                  </ButtonLink>
                );
              return (
                <div className="pl-3">
                  {renderNestedLinks(item.children, item.title)}
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    [onNavigation],
  );

  const renderNavItems = useCallback(
    (items: NavigationItem[] = [], depth = 0) => {
      return items.map((item: any) => {
        const itemKey = `nav-${item.title}-${depth}`;

        if (!item.has_children) {
          return (
            <ButtonLink
              className={`flex w-full items-center text-base ${depth === 0 ? "h-[62px] border-b border-secondary" : "border-none"}`}
              key={itemKey}
              button={item}
              onClick={() => onNavigation(item)}
            >
              {item.title}
            </ButtonLink>
          );
        }
        if (depth) return renderNestedLinks(item.children, item.title);
        return (
          <AccordionItem value={itemKey} key={itemKey}>
            <AccordionTrigger className="h-[62px] border-b border-secondary px-0 hover:no-underline data-[state=open]:border-b-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <Accordion
                collapsible
                className="flex flex-col gap-y-xl"
                type="single"
              >
                {renderNavItems(item.children, depth + 1)}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      });
    },
    [onNavigation, renderNestedLinks],
  );

  if (!activeMenu) {
    return (
      <div
        className={cn(`min-h-[80px] pt-xl lg:hidden`, {
          "bg-background backdrop-blur-[17px]": !darkMode,
          "backdrop-blur-[17px]": darkModeBlur,
        })}
      >
        <nav className="container flex items-center justify-between">
          <HeaderLogo darkMode={darkMode} logo={logo} />
          <button
            onClick={toggleMenu}
            className="relative flex size-xl items-center justify-center text-xl"
          >
            <DirectusImageClient
              asset={openIcon}
              className={cn(
                "flex size-xl text-foreground items-center justify-center object-contain",
                { "text-background": darkMode },
              )}
              fill
            />
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="container fixed inset-0 z-50 max-h-svh min-h-svh w-svw bg-background py-md lg:hidden">
      <div className="sticky top-0 flex w-full items-center justify-end bg-background">
        <button
          onClick={toggleMenu}
          className="relative flex size-xl items-center justify-center text-xl"
        >
          <DirectusImageClient
            asset={closeIcon}
            className="flex size-xl items-center justify-center object-contain"
            fill
          />
        </button>
      </div>
      <div className="h-[calc(100svh-200px)] overflow-y-auto">
        <Accordion collapsible type="single">
          {renderNavItems(navigation)}
        </Accordion>
      </div>
      <div className="sticky top-[calc(100svh-200px)] flex flex-col gap-y-md">
        {navigationBtns.map((btn: any) => {
          return (
            <ButtonLink button={btn}>
              <CButton
                icon={btn?.icon}
                label={btn.title}
                btn={btn}
                className="!h-[38px] w-full items-center justify-between border-none bg-black p-3 text-background  hover:bg-black hover:text-background"
              />
            </ButtonLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileHeader;
