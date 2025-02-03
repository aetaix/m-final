"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useCallback, useMemo } from "react";

interface navigationElement {
  title: string;
  has_children?: boolean;
  children?: navigationElement[];
}

interface HeaderNavigationProps {
  navigation?: navigationElement[];
  navigationBtn?: navigationElement[];
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  navigation = [],
}) => {
  const renderMenuItems = useCallback(
    (items: navigationElement[] = [], depth = 0) => {
      return items.map((item) => {
        if (!item.has_children) {
          return (
            <NavigationMenu.Link
              key={item.title}
              className={`${depth === 0 ? "text-foreground" : "text-foreground/60"} inline-block text-nowrap`}
            >
              {item.title}
            </NavigationMenu.Link>
          );
        }
        return (
          <div key={item.title} className="space-y-4">
            <h4 className="leading-none">{item.title}</h4>
            <div className="flex flex-col space-y-2">
              {renderMenuItems(item.children, depth + 1)}
            </div>
          </div>
        );
      });
    },
    [],
  );

  const menuItems = useMemo(() => {
    if (!navigation?.length) return null;

    return navigation.map((item) => (
      <NavigationMenu.Item className="p-0" key={item.title}>
        <NavigationMenu.Trigger className="flex items-center gap-1 px-3 py-2">
          {item.title}
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="absolute left-0 top-full w-auto border bg-background p-4 shadow-md">
          <div className="grid grid-flow-col gap-x-8">
            {renderMenuItems(item.children)}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    ));
  }, [navigation, renderMenuItems]);

  if (!navigation?.length) return null;

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center gap-2">
        {menuItems}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default HeaderNavigation;
