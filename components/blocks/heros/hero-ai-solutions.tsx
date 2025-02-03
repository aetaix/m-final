/* eslint-disable */
import TetrisBlocksDesktopView from "@/components/tetris-blocks/tetris-blocks-desktop-view";
import TetrisBlocksMobileView from "@/components/tetris-blocks/tetris-blocks-mobile-view";
import { BlockTypes } from "@/constants/enum";
import { useDirectus } from "@/lib/directus/directus";
import { applyTranslations } from "@/lib/translation";
import { readItems } from "@directus/sdk";

const fetchData = async (blockId: number, locale: string) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { directus } = useDirectus();
  const data = await directus.request(
    readItems(BlockTypes.BLOCK_HERO_SOLUTIONS, {
      filter: { id: { _eq: blockId } },
      fields: [
        "*",
        {
          translations: ["*"],
        },
      ],
    }),
  );
  const translatedData = applyTranslations(data, locale);
  return translatedData[0];
};

export default async function HeroAiSolutions({ data: { id }, locale }: any) {
  const data = await fetchData(id, locale);
  if (!data) return;
  return (
    <>
      <div className="w-full lg:hidden overflow-clip">
        <div className="container pt-[123px]">
          {/* <div className='left-1/2 -translate-x-1/2 grid-background w-[calc(2*var(--block-size)*17)] z-20 h-[calc(2*var(--block-size))] border-r border-[var(--block-grid-color)]'></div> */}
          <div className="relative w-[calc(2*var(--block-size)*17)] left-1/2 -translate-x-1/2">
            <div className="z-20 max-w-sm mx-auto md:max-w-3xl lg:max-w-max pt-[calc(2*var(--block-size))] md:pt-[calc(1.3*var(--block-size))] px-8 flex flex-col items-center gap-5 absolute -top-4 lg:top-[17px] left-0 right-0 lg:translate-y-[calc(2*var(--block-size))]]">
              <h1
                className="text-[40px]/[42px] text-center md:text-[72px]/[72px]"
                dangerouslySetInnerHTML={{ __html: data.headline || "" }}
              ></h1>
              <div
                className="text-center text-[18px]/[21.6px] md:text-[20px]/[27px]"
                dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
              ></div>
            </div>
            <TetrisBlocksDesktopView className="hidden md:block relative top-[calc(2*var(--block-size)*3)] md:top-[calc(2*var(--block-size)*4)] lg:top-0" />
            <TetrisBlocksMobileView className="md:hidden relative top-[calc(2*var(--block-size)*3)] md:top-[calc(2*var(--block-size)*4)] lg:top-0" />

            {/* GRIDS */}
            <div className="grid-background bg-[#fffaeb] w-[calc(2*var(--block-size)*17)] h-[calc(2*var(--block-size)*5)] md:h-[calc(2*var(--block-size)*6)] absolute inset-0 z-10 lg:hidden"></div>
            <div className="grid-background w-[calc(2*var(--block-size)*17)] h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] absolute inset-0 z-10"></div>
            {/* GRIDS SUBDIVIDING (use if needed) */}
            {/* <div className='grid-background-2 w-[calc(2*var(--block-size)*20)] h-[calc(2*var(--block-size)*5)] md:h-[calc(2*var(--block-size)*8)] absolute inset-0 z-10 lg:-z-10 left-1/2 -translate-x-1/2'></div> */}
          </div>
        </div>
        <div className="h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] lg:h-[calc(2*var(--block-size)*8)] relative">
          <div className="grid-background w-[calc(2*var(--block-size)*101)] h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] absolute border-b border-r border-[var(--block-grid-color)] inset-0 -z-10 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      <div className="w-full hidden lg:block overflow-clip">
        <div className="container pt-[123px]">
          <div className="relative w-[calc(2*var(--block-size)*17)] left-1/2 -translate-x-1/2">
            <div className="left-1/2 -translate-x-1/2 grid-background bg-background w-[calc(2*var(--block-size)*25)] z-20 h-[calc(2*var(--block-size))] border-r border-[var(--block-grid-color)]"></div>
            {/* <div className='left-1/2 -translate-x-1/2 grid-background bg-background w-[calc(2*var(--block-size)*25)] z-20 h-[calc(2*var(--block-size)*4)] mb-[calc(-2*var(--block-size))] border-r border-[var(--block-grid-color)]'></div> */}
            <div className="z-20 max-w-sm sm:max-w-[37rem] lg:max-w-2xl lg:whitespace-nowrap mx-auto pt-[calc(2*var(--block-size))] md:pt-[calc(1.3*var(--block-size))] px-8 flex flex-col items-center gap-5 absolute -top-4 lg:top-[17px] left-0 right-0 lg:translate-y-[calc(2*var(--block-size))]]">
              {/* <div className='z-20 max-w-sm mx-auto md:max-w-3xl lg:max-w-max pt-[calc(2*var(--block-size))] md:pt-[calc(1.3*var(--block-size))] px-8 flex flex-col items-center gap-5 absolute -top-4 lg:top-[17px] left-0 right-0 lg:translate-y-[calc(2*var(--block-size))]]'> */}
              <h1
                className="text-[40px]/[42px] text-center md:text-[72px]/[72px]"
                dangerouslySetInnerHTML={{ __html: data.headline || "" }}
              ></h1>
              <div
                className="text-center text-[18px]/[21.6px] md:text-[20px]/[27px]"
                dangerouslySetInnerHTML={{ __html: data.subheadline || "" }}
              ></div>
            </div>
            <TetrisBlocksDesktopView className="hidden md:block relative top-[calc(2*var(--block-size)*3)] md:top-[calc(2*var(--block-size)*4)] lg:top-0" />
            <TetrisBlocksMobileView className="md:hidden relative top-[calc(2*var(--block-size)*3)] md:top-[calc(2*var(--block-size)*4)] lg:top-0" />

            {/* GRIDS */}
            <div className="grid-background bg-[#fffaeb] w-[calc(2*var(--block-size)*17)] h-[calc(2*var(--block-size)*5)] md:h-[calc(2*var(--block-size)*6)] absolute inset-0 z-10 lg:hidden"></div>
            <div className="grid-background w-[calc(2*var(--block-size)*17)] h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] absolute inset-0 z-10"></div>
            {/* GRIDS SUBDIVIDING (use if needed) */}
            {/* <div className='grid-background-2 w-[calc(2*var(--block-size)*20)] h-[calc(2*var(--block-size)*5)] md:h-[calc(2*var(--block-size)*8)] absolute inset-0 z-10 lg:-z-10 left-1/2 -translate-x-1/2'></div> */}
          </div>
        </div>
        <div className="h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] lg:h-[calc(2*var(--block-size)*8)] relative">
          <div className="grid-background w-[calc(2*var(--block-size)*101)] h-[calc(2*var(--block-size)*11)] md:h-[calc(2*var(--block-size)*12)] absolute border-b border-r border-[var(--block-grid-color)] inset-0 -z-10 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </>
  );
}
