type CalendarCompDaysProps = {
  className?: string;
  property1?: "Inactive" | "Day-active" | "Start" | "End" | "Null" | "Day-inactive" | "Inactive disabled" | "Current" | "Single-active";
};

export default function CalendarCompDays({ className, property1 = "Inactive" }: CalendarCompDaysProps) {
  return (
    <div className={className || `relative size-[36px] ${property1 === "Null" ? "" : property1 === "Single-active" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-[4px]" : property1 === "End" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-br-[4px] rounded-tr-[4px]" : property1 === "Start" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-bl-[8px] rounded-tl-[8px]" : property1 === "Day-active" ? "bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px]" : "content-stretch flex flex-col items-center justify-center p-[8px]"}`}>
      {["Inactive", "Day-active", "Day-inactive", "Inactive disabled", "Current", "Start", "End", "Single-active"].includes(property1) && (
        <div className={`[word-break:break-word] flex flex-col h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] w-full ${["Start", "End", "Single-active"].includes(property1) ? 'font-["Open_Sans:regular",sans-serif] text-white' : property1 === "Current" ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a]' : property1 === "Inactive disabled" ? 'font-["Open_Sans:regular",sans-serif] text-[#aab6b4]' : 'font-["Open_Sans:regular",sans-serif] text-[#4a5453]'}`}>
          <p className="leading-[20px]">1</p>
        </div>
      )}
    </div>
  );
}