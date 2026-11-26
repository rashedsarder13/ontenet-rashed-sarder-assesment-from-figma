import type { Outline } from '../../generated/glyphOutlines';
import { OutlineText } from '../OutlineText/OutlineText';
import styles from './Button.module.css';

export type ButtonVariant = 'lime' | 'white' | 'outline';

interface ButtonProps {
  variant: ButtonVariant;
  label: string;
  /** Glyph outline of the label, positioned relative to the design-size button. */
  outline: Outline;
  className?: string;
}

/** Design-size button boxes; the label stays centred if CSS resizes the button. */
const SIZES: Record<ButtonVariant, { w: number; h: number }> = {
  lime: { w: 153, h: 44 },
  white: { w: 153, h: 44 },
  outline: { w: 159, h: 44 },
};

export function Button({ variant, label, outline, className }: ButtonProps) {
  const { w, h } = SIZES[variant];
  return (
    <button
      type="button"
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
    >
      <OutlineText
        outline={outline}
        label={label}
        className={styles.label}
        style={{
          left: `calc(50% + ${outline.x - w / 2}px)`,
          top: `calc(50% + ${outline.y - h / 2}px)`,
        }}
      />
    </button>
  );
}
