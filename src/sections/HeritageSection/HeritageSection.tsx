import photoUrl from '../../assets/images/footballer.jpg';
import { OutlineText } from '../../components/OutlineText/OutlineText';
import { heading } from '../../generated/glyphOutlines';
import styles from './HeritageSection.module.css';

/*
 * Screen 2 is split in two because its parts sit at different depths:
 * the photo is behind the can, the heading in front of the can and the nav.
 */

export function HeritagePhoto() {
  return (
    <div className={styles.photo} data-layer="photo">
      <img
        className={styles.image}
        src={photoUrl}
        alt="Footballer striking a ball"
        draggable={false}
      />
    </div>
  );
}

export function HeritageHeading() {
  return (
    <h2 data-layer="heading">
      <OutlineText outline={heading} label="Since 2002 producing" fill="var(--color-lime)" />
    </h2>
  );
}
