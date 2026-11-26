import { captions, type CaptionOutlines } from '../generated/glyphOutlines';
import type { Place } from '../config/screens';
import type { Variant } from '../config/stage';

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Product {
  id: 'eng' | 'red' | 'green' | 'sky' | 'blue';
  name: string;
  price: string;
  caption: CaptionOutlines;
  /** Static can; absent for green, whose can is the one travelling through the screens. */
  can?: { x: number; y: number; w: number; tint: string };
  pedestal: Box;
  /** Where the can group sits per variant. */
  place: Record<Variant, Place>;
  /** Where the caption sits per variant. */
  captionPlace: Record<Variant, Place>;
}

const ORIGIN: Place = { x: 0, y: 0, scale: 1 };

/** Scales a desktop group so that its point (cx, cy) lands on (tx, ty). */
const onto = (cx: number, cy: number, tx: number, ty: number, scale: number): Place => ({
  x: tx - cx * scale,
  y: ty - cy * scale,
  scale,
});

/** Desktop keeps the design position; mobile centres the name on (tx, ty). */
const captionAt = (
  { name }: CaptionOutlines,
  tx: number,
  ty: number,
  scale: number,
): Record<Variant, Place> => ({
  desktop: ORIGIN,
  mobile: onto(name.x + name.w / 2, name.y, tx, ty, scale),
});

export const PRODUCTS: Product[] = [
  {
    id: 'eng',
    name: 'Nitro ENG',
    price: '10.58 $',
    caption: captions.eng,
    can: { x: 120.276, y: 392, w: 167.655, tint: 'rgb(255 128 0)' },
    pedestal: { x: 125, y: 818.623, w: 169, h: 25.509 },
    place: { desktop: ORIGIN, mobile: onto(204.1, 834, 58, 728, 0.41) },
    captionPlace: captionAt(captions.eng, 58, 750, 0.54),
  },
  {
    id: 'red',
    name: 'Nitro Red',
    price: '11.00 $',
    caption: captions.red,
    can: { x: 467.104, y: 312, w: 198, tint: 'rgb(255 0 0)' },
    pedestal: { x: 462, y: 815, w: 217, h: 32.755 },
    place: { desktop: ORIGIN, mobile: onto(566.1, 834, 149, 728, 0.35) },
    captionPlace: captionAt(captions.red, 149, 750, 0.54),
  },
  {
    id: 'green',
    name: 'Nitro Green',
    price: '12.00 $',
    caption: captions.green,
    pedestal: { x: 828, y: 852, w: 265, h: 40 },
    place: { desktop: ORIGIN, mobile: onto(960, 541.27, 195, 277, 0.44) },
    captionPlace: captionAt(captions.green, 195, 450, 0.72),
  },
  {
    id: 'sky',
    name: 'Nitro Sky',
    price: '11.00 $',
    caption: captions.sky,
    can: { x: 1288, y: 312, w: 198, tint: 'rgb(0 178.5 255)' },
    pedestal: { x: 1282, y: 815, w: 217, h: 32.755 },
    place: { desktop: ORIGIN, mobile: onto(1387, 834, 241, 728, 0.35) },
    captionPlace: captionAt(captions.sky, 241, 750, 0.54),
  },
  {
    id: 'blue',
    name: 'Nitro Blue',
    price: '10.58 $',
    caption: captions.blue,
    can: { x: 1634, y: 392, w: 167.655, tint: 'rgb(0 4.25 255)' },
    pedestal: { x: 1633, y: 818.623, w: 169, h: 25.509 },
    place: { desktop: ORIGIN, mobile: onto(1717.8, 834, 332, 728, 0.41) },
    captionPlace: captionAt(captions.blue, 332, 750, 0.54),
  },
];

/** Lime glow under the featured (green) pedestal. */
export const PEDESTAL_GLOW: Box = { x: 798.1, y: 826.1, w: 324.8, h: 99.8 };
