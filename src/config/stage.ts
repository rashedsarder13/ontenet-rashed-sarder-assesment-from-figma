/**
 * The design is a fixed-size artboard that we scale to the viewport.
 *
 * Desktop matches the 1920x1098 Figma frames. The design only covers desktop,
 * so the portrait (mobile) artboard is an adaptation.
 */

export type Variant = 'desktop' | 'mobile';

export interface Artboard {
  w: number;
  h: number;
  /**
   * Height that must stay visible. Below it the frame only holds background,
   * so short viewports may crop it instead of shrinking everything.
   */
  contentH: number;
}

export const ARTBOARDS: Record<Variant, Artboard> = {
  // The lowest content is the screen 2 photo, which ends at y = 1042.
  desktop: { w: 1920, h: 1098, contentH: 1042 },
  mobile: { w: 390, h: 844, contentH: 844 },
};

/** Viewports narrower than this aspect ratio (width / height) use the mobile artboard. */
export const MOBILE_MAX_ASPECT = 0.8;

/** Upper bound for canvas backing stores, in device pixels across the artboard. */
export const MAX_CANVAS_WIDTH = 2880;
