"use client";
import React from "react";
import { Block } from "./tetris-animated-block";

const TetrisBlocksDesktopView = React.memo(
  ({ className }: { className: string }) => {
    const DURATIONS = {
      T_1: 1000,
      T_2: 1000,
      T_3: 600,
      T_4: 400,
      T_5: 900,
      T_6: 1000,
      T_7: 870,
    };

    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
      setShow(true);
    }, []);

    return (
      <>
        {show ? (
          <div className={className}>
            <Block
              className="t-one"
              color="var(--block-1-color)"
              shapes={[
                [0, 0, 0, 0, 1, 0, 1, 1, 1],
                [0, 0, 1, 0, 1, 1, 0, 0, 1],
                [0, 0, 1, 0, 1, 1, 0, 0, 1],
              ]}
              duration={DURATIONS.T_1}
            />
            <Block
              className="t-two"
              color="var(--block-2-color)"
              shapes={[
                [0, 1, 0, 0, 1, 0, 1, 1, 1],
                [0, 1, 0, 0, 1, 0, 1, 1, 1],
                [0, 1, 0, 0, 1, 0, 1, 1, 1],
              ]}
              duration={DURATIONS.T_2}
            />
            <Block
              className="t-three"
              color="var(--block-3-color)"
              shapes={[
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 1, 0, 1, 1, 1],
              ]}
              duration={DURATIONS.T_3}
            />
            <Block
              className="t-four"
              color="var(--block-4-color)"
              shapes={[
                [1, 1, 1, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 1, 1, 1],
              ]}
              duration={DURATIONS.T_4}
            />
            <Block
              className="t-five"
              color="var(--block-5-color)"
              shapes={[
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
                // [0, 0, 0, 1, 1, 1, 0, 1, 0],
              ]}
              duration={DURATIONS.T_5}
            />
            <Block
              className="t-six"
              color="var(--block-6-color)"
              shapes={[
                // [0, 1, 0, 1, 1, 0, 0, 1, 0],
                // [0, 1, 0, 1, 1, 0, 0, 1, 0],
                // [0, 1, 0, 1, 1, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 0, 0, 0],
              ]}
              duration={DURATIONS.T_6}
            />
            <Block
              className="t-seven"
              color="var(--block-7-color)"
              shapes={[
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 1, 1, 0, 0, 1],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 1, 1, 1, 0, 0, 0],
                // [0, 1, 0, 0, 1, 1, 0, 1, 0],
              ]}
              duration={DURATIONS.T_7}
            />
          </div>
        ) : null}
      </>
    );
  },
);

export default TetrisBlocksDesktopView;
