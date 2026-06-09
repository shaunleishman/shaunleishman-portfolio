"use client";

import { EnhanceRoot } from "@/prototypes/enhance/EnhanceRoot";

export default function EnhancePrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <EnhanceRoot>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </EnhanceRoot>
  );
}
