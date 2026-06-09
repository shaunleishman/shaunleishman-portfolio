type ProgressBarProps = {
  className?: string;
  progressBar?: "Half" | "Full" | "Progress medium";
  showProgress?: boolean;
};

export default function ProgressBar({ className, progressBar = "Half", showProgress = true }: ProgressBarProps) {
  return (
    <div className={className || `bg-[#e5e8e7] content-stretch flex flex-col items-start relative rounded-[8px] w-[48px] ${progressBar === "Progress medium" ? "h-[8px] pr-[24px]" : progressBar === "Full" ? "h-[3px]" : "pr-[24px]"}`}>
      {["Full", "Progress medium"].includes(progressBar) && showProgress && <div className="bg-[#4ca843] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" />}
      {progressBar === "Half" && showProgress && <div className="bg-[#4ca843] h-[3px] relative rounded-[8px] shrink-0 w-full" />}
    </div>
  );
}