import { Button } from '../../components/Button/Button';
import { OutlineText } from '../../components/OutlineText/OutlineText';
import { SocialLinks } from '../../components/SocialLinks/SocialLinks';
import { buyNow, copy, moreInfo } from '../../generated/glyphOutlines';
import { pointStyle } from '../../lib/geometry';
import { Wordmark } from './Wordmark';
import styles from './HeroSection.module.css';

const COPY =
  'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac.';

/** Screen 1. The travelling can is drawn separately, above this section. */
export function HeroSection({ active }: { active: boolean }) {
  return (
    <section aria-label="Nitro energy drink" inert={!active}>
      <h1 data-layer="wordmark">
        <Wordmark />
      </h1>

      <p data-layer="copy">
        <OutlineText outline={copy} label={COPY} className={styles.copy} style={pointStyle(copy)} />
      </p>

      <div className={styles.cta} data-layer="cta">
        <Button variant="white" label="Buy Now" outline={buyNow} className={styles.ctaButton} />
        <Button
          variant="outline"
          label="More info"
          outline={moreInfo}
          className={styles.ctaButton}
        />
      </div>

      <div data-layer="social">
        <SocialLinks />
      </div>
    </section>
  );
}
