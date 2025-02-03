import DirectusImage from "@/components/shared/directus-image";
import { cn } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import * as Tabs from "@radix-ui/react-tabs";

const MobileView = ({
  items,
  activeIcon,
  bulletIcon,
}: {
  items: any;
  activeIcon: Icon;
  bulletIcon: Icon;
}) => {
  return (
    <div className="md:hidden">
      <Tabs.Root defaultValue={items?.[0]?.id} className="relative">
        <Tabs.List className="container sticky top-[80px] z-10 flex  divide-x divide-foreground overflow-x-scroll border border-foreground bg-background px-0 md:static md:max-w-min">
          {items?.map((item: any) => (
            <Tabs.Trigger
              key={item?.name}
              className={cn(
                "group flex h-[42px] min-w-[177px] items-center justify-center gap-x-2xl-2 text-nowrap no-wrap-container p-md text-sm",
                "data-[state=active]:bg-foreground data-[state=active]:text-background",
              )}
              value={item?.id}
            >
              {item?.title && (
                <div dangerouslySetInnerHTML={{ __html: item?.title || "" }} />
              )}
              <div className="relative flex size-xl items-center justify-center text-primary">
                <DirectusImage
                  fill
                  className="hidden size-xl items-center justify-center object-contain [.group[data-state=active]_&]:flex"
                  asset={activeIcon}
                />
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {items?.map((item: any) => {
          const mappedBullets = item.bullets.flatMap(
            ({ block_bullets_vertical_tabs_items_bullets_id }: any) =>
              block_bullets_vertical_tabs_items_bullets_id,
          );

          return (
            <Tabs.Content
              className="bg-grid-pattern border-b border-r border-[#ECDAA2]/[.5] py-[50px] bg-grid-[#ECDAA2]/[.5]"
              key={item?.id}
              value={item?.id}
            >
              <div className="content-center justify-items-center space-y-[10px]">
                {mappedBullets.map((bulletItem: any) => (
                  <div
                    key={bulletItem.id}
                    className="flex w-full items-center justify-between gap-2xl-2 bg-[#FFF0C3] p-md text-[#171616]"
                  >
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: bulletItem?.content || "",
                      }}
                    />
                    <div className="relative flex size-xl items-center justify-center text-primary">
                      <DirectusImage
                        asset={bulletIcon}
                        fill
                        className="relative flex size-xl items-center justify-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
};

export default MobileView;
