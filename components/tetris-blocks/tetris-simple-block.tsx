export function HeroBlock({ className, color, shapes }: any) {
  return (
    <div
      className={"grid grid-cols-3" + " " + className}
      style={{
        width: "calc(2*var(--block-size-3)*3)",
        height: "calc(2*var(--block-size-3)*3)",
      }}
    >
      {shapes.map((cell: any, index: number) => (
        <div
          key={"tetris-block-static-" + index}
          style={{
            width: "calc(2*var(--block-size-3))",
            height: "calc(2*var(--block-size-3))",
            backgroundColor: cell === 1 ? color : "transparent",
          }}
        ></div>
      ))}
    </div>
  );
}
