interface CodeExampleProps {
  code: string;
  language?: string;
}

export default function CodeExample({ code, language = 'tsx' }: CodeExampleProps) {
  return (
    <div className="bg-[#2D3748] rounded-[8px] p-4 overflow-x-auto">
      <pre className="text-[12px] font-mono text-[#E2E8F0] leading-[18px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
