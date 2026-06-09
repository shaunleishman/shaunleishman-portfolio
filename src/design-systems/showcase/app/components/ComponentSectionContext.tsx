"use client";

import { createContext, useContext, useEffect, useRef } from "react";

type ComponentSectionContextValue = {
  setLiveCode: (code: string) => void;
  setCodeVisible: (visible: boolean) => void;
};

export const ComponentSectionContext = createContext<ComponentSectionContextValue | null>(null);

export function useComponentSectionCode(code: string, visible = true) {
  const ctx = useContext(ComponentSectionContext);
  const setLiveCodeRef = useRef(ctx?.setLiveCode);
  const setCodeVisibleRef = useRef(ctx?.setCodeVisible);

  setLiveCodeRef.current = ctx?.setLiveCode;
  setCodeVisibleRef.current = ctx?.setCodeVisible;

  useEffect(() => {
    setLiveCodeRef.current?.(code);
    setCodeVisibleRef.current?.(visible);
  }, [code, visible]);
}
