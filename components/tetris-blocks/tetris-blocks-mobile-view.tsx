import { BlockStatic } from "./tetris-static-block";

const TetrisBlocksMobileView = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <BlockStatic
        className="t-one-static"
        color="var(--block-1-color)"
        shapes={[0, 0, 1, 0, 1, 1, 0, 0, 1]}
      />
      <BlockStatic
        className="t-two-static"
        color="var(--block-2-color)"
        shapes={[0, 1, 0, 0, 1, 0, 1, 1, 1]}
      />
      <BlockStatic
        className="t-three-static"
        color="var(--block-3-color)"
        shapes={[0, 0, 0, 0, 1, 0, 1, 1, 1]}
      />
      <BlockStatic
        className="t-four-static"
        color="var(--block-4-color)"
        shapes={[0, 0, 0, 1, 0, 0, 1, 1, 1]}
      />
      <BlockStatic
        className="t-five-static"
        color="var(--block-5-color)"
        shapes={[0, 0, 0, 1, 1, 1, 1, 0, 0]}
      />
      <BlockStatic
        className="t-six-static"
        color="var(--block-6-color)"
        shapes={[0, 1, 0, 1, 1, 0, 0, 0, 0]}
      />
      <BlockStatic
        className="t-seven-static"
        color="var(--block-7-color)"
        shapes={[0, 1, 0, 0, 1, 1, 0, 0, 1]}
      />
    </div>
  );
};

export default TetrisBlocksMobileView;
