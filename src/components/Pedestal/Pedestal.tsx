import glowUrl from '../../assets/images/pedestal-glow.png';
import { boxStyle, type Box } from '../../lib/geometry';
import styles from './Pedestal.module.css';

interface PedestalProps {
  box: Box;
  /** Featured pedestal: lighter, outlined and glowing. */
  glow?: Box;
}

/** Elliptical stand a can sits on. */
export function Pedestal({ box, glow }: PedestalProps) {
  return (
    <>
      {glow && (
        <img
          className={styles.glow}
          src={glowUrl}
          alt=""
          style={boxStyle(glow)}
          draggable={false}
        />
      )}
      <span
        className={glow ? `${styles.pedestal} ${styles.featured}` : styles.pedestal}
        style={boxStyle(box)}
      />
    </>
  );
}
