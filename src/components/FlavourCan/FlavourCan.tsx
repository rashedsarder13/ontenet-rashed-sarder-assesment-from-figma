import { useEffect, useRef } from 'react';
import { CAN, SHADOWS, drawCan, loadCanImages } from '../../lib/canRenderer';
import styles from './FlavourCan.module.css';

/** Label offset of the static cans: the logo faces the viewer. */
const LABEL_OFFSET = -426.41;
const { side } = SHADOWS;
/** Canvas bounds in can units: the can plus the shadow that spills past it. */
const BOUNDS = { y: side.y, w: side.x + side.w, h: side.h };

interface FlavourCanProps {
  /** Can box on the artboard; the height follows from the width. */
  x: number;
  y: number;
  w: number;
  /** Colour the green label is re-hued to. */
  tint: string;
  /** Device pixels per artboard pixel. */
  density: number;
}

/** A static, tinted can. Renders the same artwork as the travelling can. */
export function FlavourCan({ x, y, w, tint, density }: FlavourCanProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const scale = w / CAN.w;
  const width = Math.ceil(BOUNDS.w * scale * density);
  const height = Math.ceil(BOUNDS.h * scale * density);

  useEffect(() => {
    let alive = true;
    loadCanImages().then((images) => {
      if (!alive || !ref.current) return;
      const k = scale * density;
      drawCan(ref.current.getContext('2d')!, images, {
        label: LABEL_OFFSET,
        shadow: 'side',
        tint,
        scratch: document.createElement('canvas'),
        place: (ctx) => ctx.setTransform(k, 0, 0, k, 0, -BOUNDS.y * k),
      });
    });
    return () => {
      alive = false;
    };
  }, [scale, density, tint, width, height]);

  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      width={width}
      height={height}
      aria-hidden="true"
      style={{
        left: x,
        top: y + BOUNDS.y * scale,
        width: width / density,
        height: height / density,
      }}
    />
  );
}
