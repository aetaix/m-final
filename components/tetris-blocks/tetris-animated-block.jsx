"use client";
import React from "react";
import { useInterval } from "@/hooks/useInterval";

export function Block({
  className = "",
  color = "#fff",
  shapes = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  duration = 1000,
}) {
  const memoizedShapes = React.useMemo(() => shapes, [shapes]);

  const [state, step, cells] = useInterval(
    memoizedShapes.length,
    memoizedShapes,
    duration,
  );

  return (
    <div
      className={`tetris-block grid grid-cols-3 ${className}`}
      style={{
        width: "calc(2*var(--block-size)*3)",
        height: "calc(2*var(--block-size)*3)",
      }}
    >
      {cells.map((cell, index) => (
        <div
          key={`tetris-block-${index}-${state}-${step}`}
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
