import type { CSSProperties } from 'react';
import { buyNow, logo, navLinks, type Outline } from '../../generated/glyphOutlines';
import { Button } from '../Button/Button';
import { OutlineText } from '../OutlineText/OutlineText';
import styles from './Navbar.module.css';

/** Design position as CSS variables, so layout variants can override it in CSS. */
const position = ({ x, y }: Outline) => ({ '--x': `${x}px`, '--y': `${y}px` }) as CSSProperties;

/** Top navigation. Labels are spelled exactly as in the design. */
export function Navbar() {
  return (
    <header>
      <a className={styles.logo} href="#" style={position(logo)}>
        <OutlineText outline={logo} label="Nitro" fill="var(--color-lime)" />
      </a>
      <nav className={styles.links} aria-label="Main">
        {navLinks.map(({ label, outline }) => (
          <a key={label} className={styles.link} href="#" style={position(outline)}>
            <OutlineText outline={outline} label={label} />
          </a>
        ))}
      </nav>
      <Button variant="lime" label="Buy Now" outline={buyNow} className={styles.buy} />
    </header>
  );
}
