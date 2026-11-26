import { ARTBOARDS } from '../../config/stage';
import styles from './Background.module.css';

/** Gradient transform from the Figma export, in desktop artboard pixels. */
const GRADIENT_MATRIX = 'matrix(-20.000122 1197 2093.114502 34.972889 -76.557129 -105.98645)';
/** Paint far past the artboard so the gradient fills any viewport around it. */
const BLEED = 4000;

interface BackgroundProps {
  /** Artboard size. */
  w: number;
  h: number;
}

/** The frame's radial gradient, stretched to the current artboard. */
export function Background({ w, h }: BackgroundProps) {
  const desktop = ARTBOARDS.desktop;
  const fit = `scale(${w / desktop.w} ${h / desktop.h})`;
  return (
    <svg className={styles.background} width={w} height={h} aria-hidden="true">
      <defs>
        <radialGradient
          id="background-gradient"
          gradientUnits="userSpaceOnUse"
          cx="0.5"
          cy="0.5"
          r="0.5"
          gradientTransform={`${fit} ${GRADIENT_MATRIX}`}
        >
          <stop offset="0" stopColor="#272727" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect
        x={-BLEED}
        y={-BLEED}
        width={desktop.w + 2 * BLEED}
        height={desktop.h + 2 * BLEED}
        fill="url(#background-gradient)"
      />
    </svg>
  );
}
