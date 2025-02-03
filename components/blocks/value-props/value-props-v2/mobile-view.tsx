import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";

function MobileView({ items }: { items: any }) {
  return (
    <div className="container md:hidden">
      <div className="container bg-grid-size-md bg-grid-secondary bg-grid-pattern py-[80px]">
        <div className="flex flex-col gap-y-6xl">
          {items.map((item: any, index: number) => (
            <div key={index} className="flex flex-col gap-y-4xl">
              <div className="flex flex-col gap-y-2xl">
                <header className="flex flex-col gap-y-6">
                  <h3
                    className="heading-3"
                    dangerouslySetInnerHTML={{ __html: item?.headline || "" }}
                  />
                  <div
                    className="text-xl"
                    dangerouslySetInnerHTML={{
                      __html: item?.subheadline || "",
                    }}
                  />
                </header>
                <ButtonLink button={item.button} className="inline-block">
                  <CButton
                    className="bg-foreground p-3 text-[14px]/[11px] text-background hover:bg-foreground hover:text-background"
                    label={item?.button?.label || ""}
                    btn={item?.button}
                    icon={item?.button?.icon[0]?.icons_id}
                    iconClassName="text-primary"
                  />
                </ButtonLink>
              </div>
              <div className="relative mx-auto aspect-square h-[250px] w-full">
                {item?.image?.file && (
                  <DirectusImage
                    key={index}
                    asset={item?.image}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileView;
