/**
 * Figma "smart animate" timing, measured frame by frame from screen
 * recordings of the prototype.
 */
export const TRANSITION = {
  /** Screen 1 -> 2 and screen 2 -> 3, in seconds. */
  duration: 2.4,
  /** Screen 3 -> 1 is a separate interaction and runs a little faster. */
  loopDuration: 2.2,
  /** Figma's "ease in and out" as an SVG path for GSAP's CustomEase. */
  curve: 'M0,0 C0.42,0 0.58,1 1,1',
} as const;
