import type { CSSProperties } from 'react';
import type { Place } from '../config/screens';

export interface Point {
  x: number;
  y: number;
}

export interface Box extends Point {
  w: number;
  h: number;
}

/** Absolute position of a point on the artboard. */
export const pointStyle = ({ x, y }: Point): CSSProperties => ({ left: x, top: y });

/** Absolute position and size of a box on the artboard. */
export const boxStyle = ({ x, y, w, h }: Box): CSSProperties => ({
  left: x,
  top: y,
  width: w,
  height: h,
});

/** Translate and scale from the element's top-left corner. */
export const placeStyle = ({ x, y, scale }: Place): CSSProperties => ({
  transform: `translate(${x}px, ${y}px) scale(${scale})`,
});
