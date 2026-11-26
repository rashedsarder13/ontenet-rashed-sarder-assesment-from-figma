import baseUrl from '../assets/can/can-base.png';
import labelUrl from '../assets/can/can-label.jpg';
import shadowUrl from '../assets/can/can-shadow-hero.png';
import sideShadowUrl from '../assets/can/can-shadow-side.png';

/** The can's own box; everything on it is expressed in these units. */
export const CAN = { w: 256.6208, h: 676.5457 };

const LABEL = { w: 1114.5977, h: 664.8362, cropX: -2.7266 };

export const SHADOWS = {
  hero: { x: 127.616, y: -108.19, w: 198.6714, h: 822.7029 },
  side: { x: 160.85, y: -108.14, w: 198.73, h: 884.51 },
} as const;

export type CanImages = Record<'base' | 'label' | 'shadow' | 'sideShadow', HTMLImageElement>;

const load = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });

let images: Promise<CanImages> | undefined;

export const loadCanImages = () =>
  (images ??= Promise.all([baseUrl, labelUrl, shadowUrl, sideShadowUrl].map(load)).then(
    ([base, label, shadow, sideShadow]) => ({ base, label, shadow, sideShadow }),
  ));

interface DrawOptions {
  /** Maps can units to canvas pixels. */
  place(ctx: CanvasRenderingContext2D): void;
  /** Horizontal offset of the label strip. */
  label: number;
  shadow: keyof typeof SHADOWS;
  /** Flavour tint: re-hues the green label. */
  tint?: string;
  /** Reusable offscreen canvas for the masked label. */
  scratch: HTMLCanvasElement;
}

/**
 * Composites the can exactly as Figma does: an aluminium can with a wide label
 * strip masked to its silhouette and blended with colour burn. Sliding the
 * strip sideways under the fixed can reads as a 3D spin.
 */
export function drawCan(
  ctx: CanvasRenderingContext2D,
  images: CanImages,
  { place, label, shadow, tint, scratch }: DrawOptions,
) {
  const { canvas } = ctx;
  if (scratch.width !== canvas.width || scratch.height !== canvas.height) {
    scratch.width = canvas.width;
    scratch.height = canvas.height;
  }
  const layer = scratch.getContext('2d')!;

  const reset = (c: CanvasRenderingContext2D) => {
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'source-over';
    c.imageSmoothingQuality = 'high';
    c.clearRect(0, 0, canvas.width, canvas.height);
    place(c);
  };

  reset(layer);
  layer.drawImage(images.label, label + LABEL.cropX, CAN.h - LABEL.h, LABEL.w, LABEL.h);
  if (tint) {
    layer.globalCompositeOperation = 'hue';
    layer.fillStyle = tint;
    layer.fillRect(label, CAN.h - LABEL.h, LABEL.w + 2 * LABEL.cropX, LABEL.h);
  }
  layer.globalCompositeOperation = 'destination-in';
  layer.drawImage(images.base, 0, 0, CAN.w, CAN.h);

  reset(ctx);
  const s = SHADOWS[shadow];
  ctx.drawImage(shadow === 'hero' ? images.shadow : images.sideShadow, s.x, s.y, s.w, s.h);
  ctx.drawImage(images.base, 0, 0, CAN.w, CAN.h);
  ctx.globalCompositeOperation = 'color-burn';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(scratch, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
}
