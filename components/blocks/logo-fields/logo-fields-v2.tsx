import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import DirectusImage from "@/components/shared/directus-image";
import { BlockTypes, ModelStatus } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { BlockImage } from "@/types/directus-schema";
import { readItems } from "@directus/sdk";

const fetchValuePropsV2Data = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_LOGO_FIELDS_V2, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
          button_group: [
            "*",
            {
              buttons: [
                "*",
                {
                  translations: ["*"],
                  page: ["permalink"],
                  post: ["slug"],
                  icon: ["*", { icons_id: ["*"] }],
                },
              ],
            },
          ],
          images: ["*", { block_image_id: ["*", { translations: ["*"] }] }],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

interface LogoFieldsV2SectionItem {
  id: number;
  status: ModelStatus;
  name: string;
  sort: number;
  image: BlockImage;
}

export default async function LogoFieldsV2({ data: { id }, locale }: any) {
  const data = await fetchValuePropsV2Data(id, locale);
  const images: Array<any> = data?.images
    ?.map(
      (item: {
        sort: any;
        block_image_id: {
          sort: number;
          name: any;
          image: any;
        };
      }) => ({
        sort: item?.sort,
        name: item?.block_image_id?.name,
        image: item?.block_image_id,
      }),
    )
    .sort((a: { sort: number }, b: { sort: number }) => a?.sort - b?.sort);

  const [btnCta] = data?.button_group?.buttons || [];
  return (
    <div
      id={data?.anchor ? `${data?.anchor}` : ""}
      className="relative my-3xl w-svw justify-center lg:flex lg:max-h-[717px] lg:min-h-[717px]"
    >
      <LogoFieldsV2Section
        desktop
        className="absolute z-0 mx-auto hidden size-full w-svw max-w-screen-4xl overflow-x-visible lg:block"
        items={images}
      />
      <div className="z-10 flex w-full flex-col">
        <LogoFieldsV2Section
          className="container mb-xl h-[210px] w-full md:h-[250px] lg:hidden"
          items={images.slice(0, 3)}
        />
        <div className="container flex size-full max-w-[350px] flex-col justify-center gap-y-xl px-[10px] md:max-w-[497px] md:px-0 lg:gap-y-3xl">
          <h3
            className="heading-3 max-w-[497px] text-center"
            dangerouslySetInnerHTML={{ __html: data?.headline || "" }}
          />
          <div
            className="mx-auto text-center sm:px-md lg:px-0"
            dangerouslySetInnerHTML={{ __html: data?.subheadline || "" }}
          />
          <ButtonLink button={btnCta} className="mx-auto">
            <CButton
              size="lg"
              btn={btnCta}
              className="bg-transparent text-[#3C3C3C]"
              icon={btnCta?.icon[0]?.icons_id}
              iconClassName="text-primary"
              label={btnCta?.label || ""}
            />
          </ButtonLink>
        </div>
        <LogoFieldsV2Section
          className="container mt-xl h-[250px] w-full md:h-[350px] lg:hidden"
          items={images.slice(3, 7)}
        />
      </div>
    </div>
  );
}

const desktopPositions = [
  "top-[10%] left-[8%]",
  "top-[43%] left-[15%]",
  "bottom-0 left-[30%]",
  "bottom-[2%] right-[22%]",
  "bottom-[30%] right-[3%]",
  "top-[14%] right-[12%]",
  "top-0 right-[-5%]",
  //last three elements not showed on mobile
  "top-[25%] left-[-9%]",
  "top-[58%] left-[-2%]",
  "bottom-0 right-[-10%]",
];

const mobilePositions = [
  "top-[8%]",
  "left-[40%]",
  "right-[20px] top-[50%]",
  "top-0 left-[20px]",
  "right-[20px] top-[8%]",
  "top-[50%] left-[25%]",
  "bottom-0 right-[20px]",
  //last three elements not showed on mobile
  "hidden lg:block",
  "hidden lg:block",
  "hidden lg:block",
];

function LogoFieldsV2Section({
  items,
  desktop,
  className,
}: {
  items: LogoFieldsV2SectionItem[];
  className?: string;
  desktop?: boolean;
}) {
  const positions = desktop ? desktopPositions : mobilePositions;
  return (
    <div className={cn("relative", className)}>
      {items.map((item, idx) => {
        return (
          <div
            key={`${idx} ${desktop ? "desktop" : "mobile"}`}
            className={`absolute aspect-square size-[94px] bg-white shadow-deploy-logo sm:size-[100px] md:size-[150px]  xl:size-[179px] ${positions[item.sort - 1]}`}
          >
            {item?.image?.file && (
              <DirectusImage
                asset={item.image}
                key={`logo-fields-v2-${item.id}`}
                fill
                className="object-contain p-4 md:p-8 lg:p-8 xl:p-12"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
