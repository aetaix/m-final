import { BlockButton, BlockButtonTranslation } from "@/types/directus-schema";
import ButtonLink from "../../shared/custom/button-link";
import { CButton } from "../../shared/custom/custom-button";

interface IBlockHeroSectionLight {
  headline: string;
  subheadline: string;
  button_group: {
    buttons: ((BlockButton & { icon: any[] }) & BlockButtonTranslation)[];
  };
}

const BlockHeroSectionLight = ({
  item,
  children,
}: {
  item: IBlockHeroSectionLight;
  children?: JSX.Element;
}) => {
  return (
    <>
      <div
        className={
          "container mx-auto flex max-w-[1057px] flex-col items-center justify-center gap-10 border text-center"
        }
      >
        <h1
          className="max-w-5xl text-5xl sm:text-6xl lg:text-7xl xl:text-[90px]/[90px]"
          dangerouslySetInnerHTML={{ __html: item.headline || "" }}
        ></h1>
        {item?.subheadline ? (
          <div
            dangerouslySetInnerHTML={{ __html: item.subheadline || "" }}
            className="max-w-3xl text-lg font-light"
          ></div>
        ) : null}
        {item?.button_group ? (
          <div className="flex flex-wrap items-center justify-center gap-9 gap-y-4">
            {item.button_group?.buttons.map((ctaBtn, idx: number) => (
              <ButtonLink key={ctaBtn.label! + idx} button={ctaBtn}>
                <CButton
                  btn={ctaBtn}
                  label={ctaBtn.label!}
                  icon={ctaBtn?.icon[0].icons_id}
                />
              </ButtonLink>
            ))}
          </div>
        ) : null}
      </div>
      {children}
    </>
  );
};

export default BlockHeroSectionLight;
