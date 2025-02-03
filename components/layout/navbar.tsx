"use client";

import {
  Icon,
  Navigation,
  NavigationItem,
  NavigationItemsTranslation,
  Page,
} from "@/types/directus-schema";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

export type NavigationElement = NavigationItem &
  NavigationItemsTranslation & {
    page: Page;
    children: NavigationElement[];
    icon: Icon;
    is_button?: boolean;
  };
const DARK_MODE_OFFSET = 600;
interface HeaderProps {
  navigationData: Omit<Navigation, "items"> & {
    items: NavigationElement[];
  };
}

function setDefaultModeBypathName(pathname: string) {
  if (pathname === "") return true;
  return false;
}

export default function Navbar({ navigationData }: HeaderProps) {
  const pathname = String(usePathname()).slice(3);
  const [isDark, setIsDark] = useState(() =>
    setDefaultModeBypathName(pathname),
  );
  const [isDarkWithBlur, setIsDarkWithBlur] = useState(false);

  const navigationBtns = navigationData?.items?.filter(
    (item) => item.is_button,
  );
  const navigationLinks = navigationData.items?.filter(
    (item) => !item.is_button,
  );

  useEffect(() => {
    if (pathname !== "") {
      setIsDark(false);
      return;
    } else setIsDark(true);

    const handleScroll = () => {
      const windowScrollOffset = window.scrollY;
      const disableDarkMode = windowScrollOffset > DARK_MODE_OFFSET;
      setIsDarkWithBlur(
        windowScrollOffset > 50 &&
          windowScrollOffset < DARK_MODE_OFFSET &&
          pathname === "",
      );
      setIsDark(!disableDarkMode);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[99]">
      <DesktopHeader
        logo={navigationData?.logo as Icon}
        darkMode={isDark}
        darkModeBlur={isDarkWithBlur}
        // @ts-ignore
        navigationBtns={navigationBtns}
        // @ts-ignore
        navigationLinks={navigationLinks}
      />
      <MobileHeader
        openIcon={navigationData?.open_menu_icon as Icon}
        closeIcon={navigationData?.close_menu_icon as Icon}
        logo={navigationData?.logo as Icon}
        darkMode={isDark}
        darkModeBlur={isDarkWithBlur}
        navigation={navigationLinks}
        navigationBtns={navigationBtns}
      />
    </header>
  );
}
