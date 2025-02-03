"use client";
import { cn } from "@/lib/utils";
import {
  Icon,
  NavigationItem,
  NavigationItemsTranslation,
  Page,
  Post,
} from "@/types/directus-schema";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ButtonLink from "../shared/custom/button-link";
import HeaderButton from "./header-button";
import HeaderLogo from "./header-logo";

export type NavigationElement = NavigationItem &
  NavigationItemsTranslation & {
    permalink: string;
    post: Post;
    page: Page;
    children: NavigationElement[];
    icon: Icon;
    is_button?: boolean;
  };

interface DesktopHeaderProps {
  darkMode: boolean;
  navigationBtns: NavigationElement[];
  navigationLinks: NavigationElement[];
  logo: Icon;
  darkModeBlur: boolean;
}

export default function DesktopHeader({
  darkMode,
  navigationBtns,
  navigationLinks,
  logo,
  darkModeBlur,
}: DesktopHeaderProps) {
  const [isActive, setIsActive] = useState(false);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [value, setValue] = useState<string>();
  const linkItemsContainer = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const resetState = useCallback(() => {
    setValue(undefined);
    setIsActive(false);
  }, [setValue, setIsActive]);

  useEffect(() => {
    setIsActive(false);
    setValue(undefined);
  }, [pathname]);
  useEffect(() => {
    const updateOffset = () => {
      if (linkItemsContainer.current) {
        setOffsetLeft(linkItemsContainer.current.offsetLeft);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const renderMenuItems = useCallback(
    (items: NavigationElement[] = [], depth = 0) => {
      return items.map((item, i) => {
        if (!item.has_children) {
          return (
            <ButtonLink
              button={item}
              key={item.id}
              onClick={resetState}
              className={`inline-block min-w-[114px] animate-fadeInUp cursor-pointer text-nowrap opacity-0 `}
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <span
                className={cn("delay-100", {
                  "menuItem animate-shine-black": depth === 0,
                  "subMenuItem animate-shine": depth !== 0,
                })}
              >
                {item.title}
              </span>
            </ButtonLink>
          );
        }
        return (
          <div
            key={item.id}
            className="flex min-w-[114px] flex-col gap-y-[30px]"
          >
            {item && (item.permalink || item.url || item.page || item.post) ? (
              <ButtonLink
                button={item}
                key={item.id}
                onClick={resetState}
                className={`inline-block min-w-[114px] animate-fadeInUp cursor-pointer text-nowrap opacity-0 `}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {item.title}
              </ButtonLink>
            ) : (
              <div className="inline-block min-w-[114px] animate-fadeInUp opacity-0">
                <span className="menuItem animate-shine-black delay-100">
                  {item.title}
                </span>
              </div>
            )}
            <div className="flex min-w-[114px] flex-col gap-y-[26px]">
              {renderMenuItems(item.children, depth + 1)}
            </div>
          </div>
        );
      });
    },
    [resetState],
  );

  const menuItems = useMemo(() => {
    if (!navigationLinks?.length) return null;

    return navigationLinks.map((item, idx) => {
      if (!item.has_children)
        return (
          <NavigationMenu.Item className="relative p-0" key={item.id}>
            <ButtonLink
              button={item}
              onClick={resetState}
              className={cn(
                "relative z-20 delay-200 ease-in-out flex items-center gap-1 text-nowrap px-8 mx-0 py-2",
                {
                  "text-background": darkMode,
                  "text-foreground": isActive,
                  "pl-4": idx === 0,
                },
              )}
            >
              {item?.title}
            </ButtonLink>
          </NavigationMenu.Item>
        );
      return (
        <NavigationMenu.Item className="relative p-0" key={item.id}>
          <NavigationMenu.Trigger
            onClick={(e) => e.preventDefault()}
            className={cn(
              "relative z-20 delay-200 ease-in-out flex items-center gap-1 text-nowrap px-[16px] py-2",
              {
                "text-background": darkMode,
                "text-foreground": isActive,
                "pl-4": idx === 0,
              },
            )}
          >
            {item?.title}
          </NavigationMenu.Trigger>
          {item?.children && (
            <NavigationMenu.Content
              hidden={!isActive}
              className={cn("absolute inset-0 z-0")}
            >
              <div
                style={{
                  left: `${offsetLeft + 16}px`,
                }}
                className="relative top-[122.5px] grid max-w-max grid-flow-col items-start gap-x-14"
              >
                {renderMenuItems(item.children)}
              </div>
            </NavigationMenu.Content>
          )}
        </NavigationMenu.Item>
      );
    });
  }, [
    navigationLinks,
    renderMenuItems,
    offsetLeft,
    darkMode,
    isActive,
    resetState,
  ]);

  return (
    <NavigationMenu.Root
      delayDuration={100}
      onValueChange={(value) => {
        setIsActive(!!value);
        setValue(value);
      }}
      value={value}
      className={cn("hidden lg:block duration-300 h-0 bg-menu-gradient", {
        "h-[123px] transition-all bg-background backdrop-blur-[17px] ease-in-out":
          !darkMode,
        "h-[388px] bg-menu-gradient ease-in-out transition-all backdrop-blur-[49px] border-b-0":
          isActive,
      })}
    >
      <div
        className={cn(
          "transition-all duration-200 ease-linear size-full min-h-[123px] absolute inset-0 z-[-1]",
          {
            "backdrop-blur-[17px]": darkModeBlur && !isActive,
          },
        )}
      />
      <div
        className={cn(
          "container flex h-[36px] min-h-[123px] items-center justify-between py-4",
        )}
      >
        <HeaderLogo darkMode={darkMode} logo={logo} />
        <div
          ref={linkItemsContainer}
          className="flex items-center justify-between gap-x-4"
        >
          <NavigationMenu.List className="flex items-center">
            {menuItems}
          </NavigationMenu.List>

          <div className="z-20 h-full items-center gap-x-4 lg:flex">
            {navigationBtns.map((btn) => (
              <HeaderButton
                isMenuActive={isActive}
                darkMode={darkMode}
                key={btn?.title}
                button={btn}
              />
            ))}
          </div>
        </div>
      </div>
      <NavigationMenu.Viewport className="max-h-min overflow-hidden" />
    </NavigationMenu.Root>
  );
}
