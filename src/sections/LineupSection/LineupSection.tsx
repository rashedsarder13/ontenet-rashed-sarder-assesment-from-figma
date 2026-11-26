import { FlavourCan } from '../../components/FlavourCan/FlavourCan';
import { Pedestal } from '../../components/Pedestal/Pedestal';
import { PEDESTAL_GLOW, PRODUCTS } from '../../data/products';
import type { Stage } from '../../hooks/useStage';
import { placeStyle } from '../../lib/geometry';
import type { Variant } from '../../config/stage';
import { ProductCaption } from './ProductCaption';
import styles from './LineupSection.module.css';

/*
 * Screen 3 is split in two because its parts sit at different depths: the
 * cans and pedestals are behind the travelling green can, the captions are
 * in front of everything.
 */

export function LineupProducts({ stage }: { stage: Stage }) {
  return (
    <div data-layer="lineup" aria-hidden="true">
      {PRODUCTS.map(({ id, can, pedestal, place }) => {
        const groupPlace = place[stage.variant];
        return (
          <div key={id} className={styles.group} style={placeStyle(groupPlace)}>
            {/* The green can has no static copy: it is the travelling can. */}
            <Pedestal box={pedestal} glow={can ? undefined : PEDESTAL_GLOW} />
            {can && <FlavourCan {...can} density={stage.scale * stage.dpr * groupPlace.scale} />}
          </div>
        );
      })}
    </div>
  );
}

export function LineupCaptions({ variant, active }: { variant: Variant; active: boolean }) {
  return (
    <section data-layer="lineup" aria-label="Flavours" inert={!active}>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductCaption
            key={product.id}
            product={product}
            place={product.captionPlace[variant]}
          />
        ))}
      </ul>
    </section>
  );
}
