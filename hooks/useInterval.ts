import React from "react";

export function useInterval(times = 3, shapes = [], duration = 1000) {
  const turns = times - 1;
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!Array.isArray(shapes) || shapes.length === 0) return;

    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < turns) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          return prevStep; // Keep the step unchanged after completion
        }
      });
    }, duration);

    return () => clearInterval(interval);
  }, [turns, duration, shapes.length]);

  // Derive `state` directly from `step`
  const state = step + 1;

  const cells = shapes[state - 1] || [];

  return [state, step, cells];
}
