type ProcessIllustrationProps = {
  step: number;
  className?: string;
};

export function ProcessIllustration({ step, className }: ProcessIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="320" height="240" rx="16" fill="#f0f0f0" />
      {step === 0 && (
        <>
          <circle cx="80" cy="100" r="24" fill="#3b66f5" fillOpacity="0.15" stroke="#3b66f5" strokeWidth="1.5" />
          <circle cx="160" cy="80" r="20" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
          <circle cx="240" cy="110" r="22" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
          <path d="M104 96 L136 84 M180 88 L218 102" stroke="#3b66f5" strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="60" y="150" width="200" height="48" rx="8" fill="white" stroke="#e5e5e5" />
          <rect x="76" y="166" width="80" height="6" rx="3" fill="#3b66f5" fillOpacity="0.6" />
          <rect x="76" y="180" width="120" height="5" rx="2.5" fill="#d4d4d4" />
        </>
      )}
      {step === 1 && (
        <>
          <rect x="48" y="56" width="224" height="128" rx="12" fill="white" stroke="#e5e5e5" />
          <circle cx="120" cy="120" r="36" stroke="#3b66f5" strokeWidth="2" fill="#3b66f5" fillOpacity="0.08" />
          <circle cx="120" cy="120" r="8" fill="#3b66f5" />
          <rect x="180" y="88" width="72" height="8" rx="4" fill="#3b66f5" fillOpacity="0.5" />
          <rect x="180" y="108" width="56" height="6" rx="3" fill="#d4d4d4" />
          <rect x="180" y="124" width="64" height="6" rx="3" fill="#d4d4d4" />
        </>
      )}
      {step === 2 && (
        <>
          <rect x="40" y="48" width="100" height="72" rx="10" fill="white" stroke="#3b66f5" strokeWidth="1.5" />
          <rect x="160" y="48" width="100" height="72" rx="10" fill="white" stroke="#e5e5e5" />
          <rect x="100" y="136" width="120" height="72" rx="10" fill="#3b66f5" fillOpacity="0.12" stroke="#3b66f5" strokeWidth="1.5" />
          <path d="M90 84 L150 120 M210 84 L150 120 M150 120 L160 172" stroke="#3b66f5" strokeWidth="1.5" strokeDasharray="5 4" />
        </>
      )}
      {step === 3 && (
        <>
          <rect x="56" y="40" width="208" height="160" rx="12" fill="white" stroke="#e5e5e5" />
          <rect x="72" y="56" width="176" height="24" rx="6" fill="#f7f7f7" />
          <rect x="72" y="92" width="80" height="80" rx="8" fill="#3b66f5" fillOpacity="0.1" stroke="#3b66f5" strokeWidth="1" strokeDasharray="4 3" />
          <rect x="168" y="92" width="80" height="36" rx="6" fill="#f7f7f7" />
          <rect x="168" y="136" width="80" height="36" rx="6" fill="#f7f7f7" />
        </>
      )}
      {step === 4 && (
        <>
          <rect x="48" y="52" width="224" height="136" rx="12" fill="white" stroke="#e5e5e5" />
          <circle cx="160" cy="110" r="40" stroke="#3b66f5" strokeWidth="2" fill="none" />
          <path d="M160 78 L160 110 L184 124" stroke="#3b66f5" strokeWidth="2" strokeLinecap="round" />
          <rect x="72" y="168" width="48" height="8" rx="4" fill="#22c55e" fillOpacity="0.6" />
          <rect x="128" y="168" width="48" height="8" rx="4" fill="#ef4444" fillOpacity="0.5" />
          <rect x="184" y="168" width="48" height="8" rx="4" fill="#22c55e" fillOpacity="0.6" />
        </>
      )}
      {step === 5 && (
        <>
          <rect x="40" y="48" width="120" height="144" rx="10" fill="white" stroke="#e5e5e5" />
          <rect x="176" y="48" width="104" height="64" rx="10" fill="#3b66f5" fillOpacity="0.12" stroke="#3b66f5" strokeWidth="1.5" />
          <rect x="176" y="128" width="104" height="64" rx="10" fill="white" stroke="#e5e5e5" />
          <path d="M160 120 L176 80 M160 120 L176 160" stroke="#3b66f5" strokeWidth="2" strokeLinecap="round" />
          <rect x="56" y="72" width="88" height="6" rx="3" fill="#d4d4d4" />
          <rect x="56" y="88" width="72" height="6" rx="3" fill="#d4d4d4" />
          <rect x="56" y="104" width="80" height="6" rx="3" fill="#3b66f5" fillOpacity="0.5" />
        </>
      )}
    </svg>
  );
}
