import type { CSSProperties } from 'react';
import type { Outline } from '../../generated/glyphOutlines';

interface OutlineTextProps {
  outline: Outline;
  /** Accessible text; the outline itself is only a picture of it. */
  label: string;
  fill?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Text drawn from the design's own glyph outlines, so it renders exactly like
 * Figma on every platform, while assistive tech reads `label`.
 */
export function OutlineText({
  outline,
  label,
  fill = 'currentColor',
  className,
  style,
}: OutlineTextProps) {
  return (
    <svg
      role="img"
      aria-label={label}
      className={className}
      style={style}
      width={outline.w}
      height={outline.h}
      viewBox={`0 0 ${outline.w} ${outline.h}`}
    >
      <path d={outline.d} fill={fill} />
    </svg>
  );
}
