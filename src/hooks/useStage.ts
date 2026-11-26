import { useEffect, useState } from 'react';
import { ARTBOARDS, MOBILE_MAX_ASPECT, type Variant } from '../config/stage';

export interface Stage {
  variant: Variant;
  /** Artboard size in design pixels. */
  w: number;
  h: number;
  /** Uniform scale from design pixels to CSS pixels. */
  scale: number;
  /** Artboard offset in the viewport, in CSS pixels. */
  x: number;
  y: number;
  dpr: number;
}

function measure(): Stage {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const variant: Variant = vw / vh < MOBILE_MAX_ASPECT ? 'mobile' : 'desktop';
  const { w, h, contentH } = ARTBOARDS[variant];
  // Fit the content, not the whole frame: only background is lost on short viewports.
  const scale = Math.min(vw / w, vh / contentH);
  const fitsWholeFrame = h * scale <= vh;
  return {
    variant,
    w,
    h,
    scale,
    x: Math.round((vw - w * scale) / 2),
    y: Math.round((vh - (fitsWholeFrame ? h : contentH) * scale) / 2),
    dpr: window.devicePixelRatio || 1,
  };
}

/** Tracks how the artboard fits the current viewport. */
export function useStage(): Stage {
  const [stage, setStage] = useState(measure);
  useEffect(() => {
    const onResize = () => setStage(measure());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return stage;
}
