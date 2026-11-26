/**
 * Where every animated layer sits on each of the three screens.
 *
 * Desktop values are the layer coordinates of the Figma frames; each frame
 * keeps the layers that are not on screen parked above or below it, which is
 * what makes them slide in and out. Mobile values are an adaptation.
 */
import type { Variant } from './stage';

export type ScreenIndex = 0 | 1 | 2;

export const SCREEN_COUNT = 3;

export interface Place {
  x: number;
  y: number;
  scale: number;
}

export interface CanPose {
  /** Centre of the can on the artboard. */
  cx: number;
  cy: number;
  scale: number;
  /** Degrees clockwise from upright. */
  rotation: number;
  /**
   * Horizontal offset of the label strip in artboard pixels. Sliding it under
   * the can is what makes the can appear to spin. Figma tweens it
   * independently of the can's scale.
   */
  label: number;
}

/** Elements carrying `data-layer="<id>"` are moved together. */
export type LayerId = 'wordmark' | 'copy' | 'cta' | 'social' | 'photo' | 'heading' | 'lineup';

type PerScreen<T> = [T, T, T];

export const CAN_POSES: Record<Variant, PerScreen<CanPose>> = {
  desktop: [
    { cx: 960.27, cy: 487.93, scale: 1.3241, rotation: 90, label: -93.67 },
    { cx: 960, cy: 571, scale: 2.19941, rotation: 90, label: -1666.79 },
    { cx: 960, cy: 541.27, scale: 1, rotation: 0, label: -419.69 },
  ],
  mobile: [
    { cx: 195, cy: 338, scale: 0.6, rotation: 14, label: -42.44 },
    { cx: 195, cy: 356, scale: 0.6, rotation: 90, label: -454.7 },
    { cx: 195, cy: 277, scale: 0.44, rotation: 0, label: -184.66 },
  ],
};

const at = (x: number, y: number, scale = 1): Place => ({ x, y, scale });

export const LAYERS: Record<Variant, Record<LayerId, PerScreen<Place>>> = {
  desktop: {
    wordmark: [at(108, 299), at(108, -771), at(108, -771)],
    copy: [at(88, 894), at(88, -176), at(88, -176)],
    // The hero buttons travel further than the rest of the hero in Figma.
    cta: [at(787, 898), at(787, -417), at(787, -417)],
    social: [at(1569, 894), at(1569, -176), at(1569, -176)],
    // Screen 2 sits exactly halfway between screens 3 and 1, so on the way
    // back to the hero the photo and heading sweep through it.
    photo: [at(64, 1425), at(64, 122), at(64, -1181)],
    heading: [at(1263, 1494), at(1263, 234), at(1273, -1026)],
    lineup: [at(0, 1071), at(0, 1071), at(0, 0)],
  },
  mobile: {
    wordmark: [at(20, 298, 0.199), at(20, -500, 0.199), at(20, -500, 0.199)],
    copy: [at(20, 604, 0.772), at(20, -240, 0.772), at(20, -240, 0.772)],
    cta: [at(34, 668), at(34, -300), at(34, -300)],
    social: [at(63, 752), at(63, -80), at(63, -80)],
    photo: [at(20, 1000, 0.3959), at(20, 112, 0.3959), at(20, -776, 0.3959)],
    heading: [at(39, 1300, 0.548), at(39, 432, 0.548), at(39, -436, 0.548)],
    lineup: [at(0, 844), at(0, 844), at(0, 0)],
  },
};
