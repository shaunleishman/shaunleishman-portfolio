/** Ratio along a seek control. A zero-width box (hidden or not yet laid out) stays at the start. */
export function ratioFromClientX(element: HTMLElement | null, clientX: number) {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  if (rect.width <= 0) return 0;
  return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
}

export function capturePointer(element: HTMLElement | null, pointerId: number) {
  if (!element) return;
  try {
    element.setPointerCapture(pointerId);
  } catch {
    // The pointer can already be inactive. Seeking still works while it is over the control.
  }
}

/** `releasePointerCapture` throws if this element is not the current capture target. */
export function releasePointer(element: HTMLElement | null, pointerId: number) {
  if (!element?.hasPointerCapture(pointerId)) return;
  element.releasePointerCapture(pointerId);
}
