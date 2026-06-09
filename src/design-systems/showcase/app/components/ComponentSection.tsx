"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import CodeExample from "./CodeExample";
import { ComponentSectionContext } from "./ComponentSectionContext";
import { ShowcaseChromeButton } from "./ShowcaseChromeButton";

type ComponentSectionProps = {
  id: string;
  title: string;
  description: string;
  code: string;
  children: ReactNode;
};

export function ComponentSection({
  id,
  title,
  description,
  code,
  children,
}: ComponentSectionProps) {
  const [showCode, setShowCode] = useState(false);
  const [liveCode, setLiveCode] = useState(code);
  const [codeVisible, setCodeVisible] = useState(true);

  useEffect(() => {
    setLiveCode(code);
    setCodeVisible(true);
    setShowCode(false);
  }, [code]);

  useEffect(() => {
    if (!codeVisible) setShowCode(false);
  }, [codeVisible]);

  const contextValue = useMemo(
    () => ({ setLiveCode, setCodeVisible }),
    [setLiveCode, setCodeVisible],
  );

  return (
    <ComponentSectionContext.Provider value={contextValue}>
      <section
        id={id}
        className="min-w-0 scroll-mt-6"
      >
        <div className="mb-4 sm:mb-6">
          <h2 className="showcase-section-title mb-2 text-xl font-semibold sm:text-2xl" style={{ color: "#4a5453" }}>
            {title}
          </h2>
          <p className="showcase-section-desc max-w-2xl text-sm" style={{ color: "#aab6b4" }}>
            {description}
          </p>
        </div>

        <div className="showcase-panel min-w-0 rounded-2xl border p-4 sm:p-6" style={{ borderColor: "#aab6b4", backgroundColor: "#ffffff" }}>
          <div className="showcase-panel__demo min-w-0">{children}</div>

          <div className="mt-6 border-t border-[#cdd4d3] pt-4">
            <ShowcaseChromeButton
              variant={showCode ? "secondary" : "ghost"}
              disabled={!codeVisible}
              onClick={() => setShowCode((current) => !current)}
            >
              {showCode ? "Hide code" : "Show code"}
            </ShowcaseChromeButton>

            {showCode && codeVisible && (
              <div className="mt-4">
                <CodeExample code={liveCode} />
              </div>
            )}
          </div>
        </div>
      </section>
    </ComponentSectionContext.Provider>
  );
}
