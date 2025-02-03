export function BlockStatic({ className, color, shapes }) {
  return (
    <div
      className={"tetris-block grid grid-cols-3" + " " + className}
      style={{
        width: "calc(2*var(--block-size)*3)",
        height: "calc(2*var(--block-size)*3)",
      }}
    >
      {shapes.map((cell, index) => (
        <div
          key={"tetris-block-static-" + index}
          style={{
            width: "calc(2*var(--block-size))",
            height: "calc(2*var(--block-size))",
            backgroundColor: cell === 1 ? color : "transparent",
          }}
        ></div>
      ))}
    </div>
  );
}
