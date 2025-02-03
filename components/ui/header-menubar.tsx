"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useCallback, useMemo, useState } from "react";
import { NavigationElement } from "../layout/desktop-header";
import ButtonLink from "../shared/custom/button-link";

interface HeaderMenubarProps {
  navigation?: NavigationElement[];
  navigationBtn?: NavigationElement[];
}

const HeaderMenubar: React.FC<HeaderMenubarProps> = ({ navigation = [] }) => {
  const [activeMenu, setActiveMenu] = useState<string | undefined>();

  const handleMouseEnter = useCallback((value: string) => {
    setActiveMenu(value);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveMenu(undefined);
  }, []);

  const renderMenuItems = useCallback((items: NavigationElement[] = []) => {
    return items.map((item) => {
      const menuKey = item.title;

      if (!item.has_children) {
        return (
          <MenubarItem className="h-2xl-2" key={menuKey}>
            <ButtonLink
              className="inline-flex size-full items-center px-3"
              target={item.open_in_new_tab ? "_blank" : "_self"}
              href={item.url || item.page?.permalink || "#"}
              rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
            >
              {item.title}
            </ButtonLink>
          </MenubarItem>
        );
      }

      return (
        <MenubarSub key={menuKey}>
          <MenubarSubTrigger className="h-2xl-2 px-3">
            {item.title}
          </MenubarSubTrigger>
          <MenubarSubContent className="-mt-px border border-black bg-white p-0">
            {renderMenuItems(item.children)}
          </MenubarSubContent>
        </MenubarSub>
      );
    });
  }, []);

  const menuItems = useMemo(() => {
    if (!navigation || navigation.length === 0) {
      return null;
    }

    return navigation.map(
      (item) =>
        item?.title && (
          <MenubarMenu key={item.title} value={item.title}>
            <MenubarTrigger
              onMouseEnter={() => handleMouseEnter(item.title!)}
              className="h-[36px] min-w-max cursor-pointer"
            >
              <ButtonLink
                className="inline-flex size-full items-center px-3"
                target={item.open_in_new_tab ? "_blank" : "_self"}
                href={item.url || item.page?.permalink || "#"}
                rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
              >
                {item.title}
              </ButtonLink>
            </MenubarTrigger>
            <MenubarContent
              alignOffset={20}
              className="border-0 !bg-transparent p-0"
            >
              <hr className="-mb-px mt-4 h-px bg-transparent" />
              <div className="border border-black bg-white">
                {renderMenuItems(item.children)}
              </div>
            </MenubarContent>
          </MenubarMenu>
        ),
    );
  }, [navigation, handleMouseEnter, renderMenuItems]);

  if (!navigation || navigation.length === 0) {
    return null;
  }

  return (
    <Menubar
      value={activeMenu}
      onMouseLeave={handleMouseLeave}
      className="hidden text-white lg:inline-flex"
    >
      {menuItems}
    </Menubar>
  );
};

export default HeaderMenubar;
