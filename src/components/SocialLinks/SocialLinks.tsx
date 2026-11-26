import { SOCIAL_LINKS } from '../../data/socialLinks';
import { icons } from '../../generated/glyphOutlines';
import styles from './SocialLinks.module.css';

const SIZE = 42;
// Slightly heavier than the design's 1px hairline so the ring stays solid when
// the artboard is scaled below 100%.
const RING_STROKE = 1.5;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>
      {SOCIAL_LINKS.map(({ id, label, href }) => (
        <li key={id}>
          <a href={href} aria-label={label}>
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={(SIZE - RING_STROKE) / 2}
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth={RING_STROKE}
              />
              {icons[id].map((glyph) => (
                <path
                  key={glyph.d}
                  d={glyph.d}
                  transform={`translate(${glyph.x} ${glyph.y})`}
                  fill="var(--color-lime)"
                />
              ))}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
