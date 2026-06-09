type ContentTabulationProps = {
  className?: string;
  filter1?: boolean;
  filter2?: boolean;
  filter3?: boolean;
  filter4?: boolean;
  filter5?: boolean;
  filter6?: boolean;
  filter7?: boolean;
  state?: "Tab1" | "Tab2" | "Tab3" | "Tab4" | "Tab5" | "Tab6" | "Tab7";
};

export default function ContentTabulation({ className, filter1 = true, filter2 = true, filter3 = true, filter4 = true, filter5 = true, filter6 = true, filter7 = true, state = "Tab1" }: ContentTabulationProps) {
  const isTab1 = state === "Tab1";
  const isTab2 = state === "Tab2";
  const isTab3 = state === "Tab3";
  const isTab4 = state === "Tab4";
  const isTab5 = state === "Tab5";
  const isTab6 = state === "Tab6";
  const isTab7 = state === "Tab7";
  return (
    <div className={className || "content-stretch flex items-end relative w-[1618px]"}>
      {["Tab2", "Tab3", "Tab4", "Tab5", "Tab6", "Tab7"].includes(state) && filter1 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 1</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {["Tab3", "Tab4", "Tab5", "Tab6", "Tab7"].includes(state) && filter2 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 2</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {["Tab4", "Tab5", "Tab6", "Tab7"].includes(state) && filter3 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 3</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {["Tab5", "Tab6", "Tab7"].includes(state) && filter4 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 4</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {["Tab6", "Tab7"].includes(state) && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter1 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 1</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter2 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 2</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter3 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 3</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter4 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 4</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {["Tab1", "Tab7"].includes(state) && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab1 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab2 && filter2 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 2</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && filter3 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 3</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && filter4 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 4</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab2 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab3 && filter3 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 3</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab3 && filter4 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 4</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab3 && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab3 && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab3 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab3 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab4 && filter4 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 4</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab4 && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab4 && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab4 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab4 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab5 && filter5 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 5</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab5 && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab5 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab5 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab6 && filter6 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[140px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 6</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab6 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
        </div>
      )}
      {isTab6 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
      {isTab7 && filter7 && (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[141px]" data-name="Tab">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px]">Tab filter 7</p>
                </div>
                <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />
        </div>
      )}
      {isTab7 && (
        <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative" data-name="Tab">
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">​</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />
          </div>
        </div>
      )}
    </div>
  );
}