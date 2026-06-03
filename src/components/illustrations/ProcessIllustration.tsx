"use client";

import { cn } from "@/lib/utils";

type ProcessIllustrationProps = {
  step: number;
  className?: string;
};

function AnimG({
  anim,
  delay = 0,
  className,
  style,
  children,
}: {
  anim: "pop" | "rise" | "slide" | "grow-y" | "sweep";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <g
      className={cn(`process-anim-${anim}`, className)}
      style={{ animationDelay: `${delay}ms`, ...style }}
    >
      {children}
    </g>
  );
}

function DiscoverIllustration() {
  return (
    <>
      <AnimG anim="pop" delay={0}>
        <circle cx="80" cy="100" r="24" fill="#3b66f5" fillOpacity="0.15" stroke="#3b66f5" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="pop" delay={140}>
        <circle cx="160" cy="80" r="20" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="pop" delay={280}>
        <circle cx="240" cy="110" r="22" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="rise" delay={420}>
        <path d="M104 96 L136 84 M180 88 L218 102" stroke="#3b66f5" strokeWidth="1.5" strokeDasharray="4 3" />
      </AnimG>
      <AnimG anim="rise" delay={540}>
        <rect x="60" y="150" width="200" height="48" rx="8" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="slide" delay={640}>
        <rect x="76" y="166" width="80" height="6" rx="3" fill="#3b66f5" fillOpacity="0.6" />
      </AnimG>
      <AnimG anim="slide" delay={720}>
        <rect x="76" y="180" width="120" height="5" rx="2.5" fill="#d4d4d4" />
      </AnimG>
    </>
  );
}

function DefineIllustration() {
  return (
    <>
      <AnimG anim="rise" delay={0}>
        <rect x="48" y="56" width="224" height="128" rx="12" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="pop" delay={180}>
        <circle cx="120" cy="120" r="36" stroke="#3b66f5" strokeWidth="2" fill="#3b66f5" fillOpacity="0.08" />
      </AnimG>
      <AnimG anim="pop" delay={320}>
        <circle cx="120" cy="120" r="8" fill="#3b66f5" />
      </AnimG>
      <AnimG anim="slide" delay={440}>
        <rect x="180" y="88" width="72" height="8" rx="4" fill="#3b66f5" fillOpacity="0.5" />
      </AnimG>
      <AnimG anim="slide" delay={520}>
        <rect x="180" y="108" width="56" height="6" rx="3" fill="#d4d4d4" />
      </AnimG>
      <AnimG anim="slide" delay={600}>
        <rect x="180" y="124" width="64" height="6" rx="3" fill="#d4d4d4" />
      </AnimG>
    </>
  );
}

function IdeateIllustration() {
  return (
    <>
      <AnimG anim="pop" delay={0}>
        <rect x="40" y="48" width="100" height="72" rx="10" fill="white" stroke="#3b66f5" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="pop" delay={160}>
        <rect x="160" y="48" width="100" height="72" rx="10" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="rise" delay={320}>
        <rect x="100" y="136" width="120" height="72" rx="10" fill="#3b66f5" fillOpacity="0.12" stroke="#3b66f5" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="rise" delay={480}>
        <path d="M90 84 L150 120 M210 84 L150 120 M150 120 L160 172" stroke="#3b66f5" strokeWidth="1.5" strokeDasharray="5 4" />
      </AnimG>
    </>
  );
}

function PrototypeIllustration() {
  return (
    <>
      <AnimG anim="rise" delay={0}>
        <rect x="56" y="40" width="208" height="160" rx="12" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="slide" delay={120}>
        <rect x="72" y="56" width="176" height="24" rx="6" fill="#f7f7f7" />
      </AnimG>
      <AnimG anim="pop" delay={240}>
        <rect x="72" y="92" width="80" height="80" rx="8" fill="#3b66f5" fillOpacity="0.1" stroke="#3b66f5" strokeWidth="1" strokeDasharray="4 3" />
      </AnimG>
      <AnimG anim="rise" delay={380}>
        <rect x="168" y="92" width="80" height="36" rx="6" fill="#f7f7f7" />
      </AnimG>
      <AnimG anim="rise" delay={480}>
        <rect x="168" y="136" width="80" height="36" rx="6" fill="#f7f7f7" />
      </AnimG>
    </>
  );
}

function TestIllustration() {
  return (
    <>
      <AnimG anim="rise" delay={0}>
        <rect x="48" y="52" width="224" height="136" rx="12" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="pop" delay={160}>
        <circle cx="160" cy="110" r="40" stroke="#3b66f5" strokeWidth="2" fill="none" />
      </AnimG>
      <AnimG anim="sweep" delay={340} style={{ transformOrigin: "160px 110px" }}>
        <path d="M160 78 L160 110 L184 124" stroke="#3b66f5" strokeWidth="2" strokeLinecap="round" />
      </AnimG>
      <AnimG anim="grow-y" delay={520} style={{ transformOrigin: "96px 176px" }}>
        <rect x="72" y="168" width="48" height="8" rx="4" fill="#22c55e" fillOpacity="0.6" />
      </AnimG>
      <AnimG anim="grow-y" delay={600} style={{ transformOrigin: "152px 176px" }}>
        <rect x="128" y="168" width="48" height="8" rx="4" fill="#ef4444" fillOpacity="0.5" />
      </AnimG>
      <AnimG anim="grow-y" delay={680} style={{ transformOrigin: "208px 176px" }}>
        <rect x="184" y="168" width="48" height="8" rx="4" fill="#22c55e" fillOpacity="0.6" />
      </AnimG>
    </>
  );
}

function DeliverIllustration() {
  return (
    <>
      <AnimG anim="rise" delay={0}>
        <rect x="40" y="48" width="120" height="144" rx="10" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="pop" delay={200}>
        <rect x="176" y="48" width="104" height="64" rx="10" fill="#3b66f5" fillOpacity="0.12" stroke="#3b66f5" strokeWidth="1.5" />
      </AnimG>
      <AnimG anim="rise" delay={360}>
        <rect x="176" y="128" width="104" height="64" rx="10" fill="white" stroke="#e5e5e5" />
      </AnimG>
      <AnimG anim="slide" delay={500}>
        <path d="M160 120 L176 80 M160 120 L176 160" stroke="#3b66f5" strokeWidth="2" strokeLinecap="round" />
      </AnimG>
      <AnimG anim="slide" delay={640}>
        <rect x="56" y="72" width="88" height="6" rx="3" fill="#d4d4d4" />
      </AnimG>
      <AnimG anim="slide" delay={700}>
        <rect x="56" y="88" width="72" height="6" rx="3" fill="#d4d4d4" />
      </AnimG>
      <AnimG anim="slide" delay={760}>
        <rect x="56" y="104" width="80" height="6" rx="3" fill="#3b66f5" fillOpacity="0.5" />
      </AnimG>
    </>
  );
}

const stepIllustrations = [
  DiscoverIllustration,
  DefineIllustration,
  IdeateIllustration,
  PrototypeIllustration,
  TestIllustration,
  DeliverIllustration,
];

export function ProcessIllustration({ step, className }: ProcessIllustrationProps) {
  const StepArt = stepIllustrations[step] ?? DiscoverIllustration;

  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("process-illustration", className)}
      aria-hidden
    >
      <rect width="320" height="240" rx="16" fill="#f0f0f0" />
      <StepArt />
    </svg>
  );
}
