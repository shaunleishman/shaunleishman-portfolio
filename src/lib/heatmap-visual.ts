export function dwellColor(intensity: number): string {
  if (intensity <= 0) return "transparent";
  const alpha = 0.2 + intensity * 0.75;
  const r = Math.round(255 * intensity);
  const g = Math.round(40 * (1 - intensity));
  const b = Math.round(20 * (1 - intensity));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function formatDwell(ms: number): string {
  if (ms <= 0) return "N/A";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`;
}
