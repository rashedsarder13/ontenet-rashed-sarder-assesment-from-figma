import { wordmark } from '../../generated/glyphOutlines';

/** Gradient transform from the Figma export, in artboard pixels. */
const GRADIENT_MATRIX = 'matrix(340.679443 897.26416 1737.277222 -658.312866 -6.356934 482.059448)';

/** The giant "NITRO" behind the can, filled with the design's radial gradient. */
export function Wordmark() {
  return (
    <svg
      role="img"
      aria-label="Nitro"
      width={wordmark.w}
      height={wordmark.h}
      viewBox={`0 0 ${wordmark.w} ${wordmark.h}`}
    >
      <defs>
        <radialGradient
          id="wordmark-gradient"
          gradientUnits="userSpaceOnUse"
          cx="0.5"
          cy="0.5"
          r="0.5"
          gradientTransform={`translate(${-wordmark.x} ${-wordmark.y}) ${GRADIENT_MATRIX}`}
        >
          <stop offset="0" stopColor="#7d8000" />
          <stop offset="1" stopColor="#e0e600" />
        </radialGradient>
      </defs>
      <path d={wordmark.d} fill="url(#wordmark-gradient)" />
    </svg>
  );
}
