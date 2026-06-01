"use client";

import { Reveal } from "@/components/ui/Reveal";

export function CvSection({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} variant="up">
      <section className="mb-10 print:mb-8">
        <h2 className="text-label uppercase tracking-widest text-[#3b66f5] mb-4">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export function CvHeader({ children }: { children: React.ReactNode }) {
  return (
    <Reveal immediate variant="up">
      <div className="mb-8 border-b border-[#e5e5e5] pb-8 print:mb-6 print:pb-6">{children}</div>
    </Reveal>
  );
}

export function CvQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal immediate delay={80} variant="fade">
      <blockquote className="mb-10 border-l-4 border-[#3b66f5] pl-5 text-body-lg italic text-[#525252] print:mb-8">
        {children}
      </blockquote>
    </Reveal>
  );
}
