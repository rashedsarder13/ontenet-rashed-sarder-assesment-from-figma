import { OutlineText } from '../../components/OutlineText/OutlineText';
import type { Place } from '../../config/screens';
import type { Product } from '../../data/products';
import { placeStyle, pointStyle } from '../../lib/geometry';
import styles from './LineupSection.module.css';

interface ProductCaptionProps {
  product: Product;
  place: Place;
}

/** Name, tagline and price under a can. */
export function ProductCaption({ product, place }: ProductCaptionProps) {
  const { name, note, price } = product.caption;
  return (
    <li className={styles.caption} style={placeStyle(place)}>
      <h3 className={styles.captionLine} style={pointStyle(name)}>
        <OutlineText outline={name} label={product.name} />
      </h3>
      <p className={`${styles.captionLine} ${styles.note}`} style={pointStyle(note)}>
        <OutlineText outline={note} label="High intensity" />
      </p>
      <p className={styles.captionLine} style={pointStyle(price)}>
        <OutlineText outline={price} label={product.price} />
      </p>
    </li>
  );
}
