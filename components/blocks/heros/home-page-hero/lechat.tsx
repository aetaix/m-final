import HeroLeChatFormInput from "@/components/hero-lechat-form-input";
import ButtonLink from "@/components/shared/custom/button-link";
import { CButton } from "@/components/shared/custom/custom-button";
import { HeroBlock } from "@/components/tetris-blocks/tetris-simple-block";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_LECHAT, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          input_button_icon: ["*"],
          input_icon: ["*"],
          translations: ["*"],
          sample_prompts: ["*", { translations: ["*"] }],
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
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

const HeroLeChat = async ({ data: { id }, locale }: any) => {
  const heroBlocks = [
    {
      className:
        "absolute left-[calc(2*var(--block-size-3)*1)] top-[calc(2*var(--block-size-3)*1)] -z-10",
      shapes: [0, 0, 0, 0, 0, 1, 1, 0, 0],
    },
    {
      className:
        "absolute left-[calc(2*var(--block-size-3)*1)] top-[calc(2*var(--block-size-3)*6)] -z-10",
      shapes: [0, 1, 1, 0, 1, 0, 0, 0, 1],
    },
    {
      className:
        "absolute right-[calc(2*var(--block-size-3)*1)] top-[calc(2*var(--block-size-3)*1)] -z-10",
      shapes: [1, 1, 1, 1, 0, 0, 0, 1, 0],
    },
    {
      className:
        "absolute right-[calc(2*var(--block-size-3)*1)] top-[calc(2*var(--block-size-3)*6)] -z-10",
      shapes: [0, 0, 0, 0, 0, 0, 1, 0, 0],
    },
    {
      className:
        "absolute right-[calc(2*var(--block-size-3)*1)] top-[calc(2*var(--block-size-3)*10)] -z-10",
      shapes: [1, 1, 0, 0, 1, 1, 0, 0, 0],
    },
    {
      className:
        "absolute left-[calc(2*var(--block-size-3)*12)] top-[calc(2*var(--block-size-3)*10)] -z-10",
      shapes: [0, 0, 0, 0, 0, 0, 1, 1, 0],
    },
    {
      className:
        "absolute left-[calc(2*var(--block-size-3)*6)] top-[calc(2*var(--block-size-3)*10)] -z-10",
      shapes: [0, 0, 0, 0, 1, 0, 0, 1, 0],
    },
  ];
  const data = await fetchData(id, locale);
  if (!data) return;
  return (
    <div className="relative mt-5 w-svw overflow-hidden">
      <div className="bg-grid-pattern absolute -z-10 h-[calc(100%-200px)] w-full bg-grid-[#f5eac7] md:h-[calc(100%-193px)] lg:hidden"></div>

      <div className="relative">
        <div className="relative left-1/2 h-[calc(2*var(--block-size-3)*13)] w-[calc(2*var(--block-size-3)*27)] -translate-x-1/2 opacity-0 lg:opacity-100">
          <div className="grid-background-3 absolute left-1/2 h-[calc(2*var(--block-size-3)*13)] w-[calc(2*var(--block-size-3)*9999)] -translate-x-1/2 border-b border-[#FEF2CB]"></div>
          <div className="relative h-[calc(2*var(--block-size-3)*13)] w-[calc(2*var(--block-size-3)*27)]">
            {heroBlocks.map((block) => (
              <HeroBlock
                className={block.className}
                color="#FEF2CB"
                shapes={block.shapes}
              />
            ))}
          </div>
        </div>
        <div
          className={
            "container absolute inset-0 mx-auto flex size-full max-w-[1057px] flex-col items-center justify-center gap-8 pb-[72px] pt-[62px] text-center"
          }
        >
          <h1
            className="mx-[5px] max-w-2xl text-[40px]/[42px] sm:text-6xl md:text-5xl lg:mx-0 lg:text-7xl"
            dangerouslySetInnerHTML={{ __html: data.headline || "" }}
          ></h1>
          {data?.subheadline ? (
            <div
              dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
              className="mx-[20px] max-w-[782px] text-[18px]/[21.6px] lg:mx-0 lg:text-[20px]/[27px]"
            ></div>
          ) : null}
          <HeroLeChatFormInput
            data={{
              input_icon: data?.input_icon,
              input_redirect_link: data?.input_redirect_link,
              input_placeholder: data?.input_placeholder,
              input_button_label: data?.input_button_label,
              input_button_icon: data?.input_button_icon,
              sample_title: data?.sample_title,
              sample_prompts: data?.sample_prompts,
            }}
          />
          {data?.button_group ? (
            <div className="flex flex-wrap items-center justify-center gap-4 lg:mb-[62px]">
              {data.button_group?.buttons.map((ctaBtn: any, idx: number) => (
                <ButtonLink key={ctaBtn.label + idx} button={ctaBtn}>
                  <CButton
                    btn={ctaBtn}
                    label={ctaBtn.label}
                    icon={ctaBtn.icon[0]?.icons_id}
                    iconClassName="text-primary"
                  />
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroLeChat;
