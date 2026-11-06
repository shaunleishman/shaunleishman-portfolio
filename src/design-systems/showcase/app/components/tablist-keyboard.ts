import type { KeyboardEvent } from "react";

/**
 * ArrowLeft, ArrowRight, Home, and End move the selected tab and wrap.
 * Every tab stays in the tab order. Do not switch the tablist to a roving
 * tabindex: that would take the other tabs out of the tab order.
 * Focus uses preventScroll so the page does not jump. Only the tablist's own
 * horizontal overflow is adjusted, and only when a tab is clipped.
 */
export function handleTablistKeyDown(
  event: KeyboardEvent<HTMLElement>,
  count: number,
  currentIndex: number,
  onSelect: (index: number) => void,
) {
  if (count <= 0 || event.altKey || event.ctrlKey || event.metaKey) return;

  const target = event.target;
  if (target instanceof HTMLElement) {
    const tag = target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
  }

  const direction =
    event.key === "ArrowRight"
      ? 1
      : event.key === "ArrowLeft"
        ? -1
        : event.key === "Home"
          ? "first"
          : event.key === "End"
            ? "last"
            : null;
  if (direction === null) return;

  event.preventDefault();

  const index = currentIndex >= 0 && currentIndex < count ? currentIndex : 0;
  const nextIndex =
    direction === "first" ? 0 : direction === "last" ? count - 1 : (index + direction + count) % count;

  if (nextIndex !== currentIndex) onSelect(nextIndex);

  const tab = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex];
  if (!tab) return;
  tab.focus({ preventScroll: true });

  const tablist = event.currentTarget;
  if (tablist.scrollWidth <= tablist.clientWidth + 1) return;
  const listRect = tablist.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  if (tabRect.left < listRect.left) {
    tablist.scrollLeft -= listRect.left - tabRect.left;
  } else if (tabRect.right > listRect.right) {
    tablist.scrollLeft += tabRect.right - listRect.right;
  }
}
