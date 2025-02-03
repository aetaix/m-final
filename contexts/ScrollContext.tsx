"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ScrollContextType = {
  scrollToItem: (index: number) => void;
  setScrollFunction: (fn: (index: number) => void) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollFn, setScrollFn] = useState<(index: number) => void>(
    () => () => {},
  );

  const setScrollFunction = useCallback((fn: (index: number) => void) => {
    setScrollFn(() => fn);
  }, []);

  return (
    <ScrollContext.Provider
      value={{ scrollToItem: scrollFn, setScrollFunction }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
