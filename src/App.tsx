import { useRef, type MouseEvent } from 'react';
import { Background } from './components/Background/Background';
import { Navbar } from './components/Navbar/Navbar';
import { TravellingCan } from './components/TravellingCan/TravellingCan';
import { useScreenTransitions, type CanPainter } from './hooks/useScreenTransitions';
import { useStage } from './hooks/useStage';
import { HeritageHeading, HeritagePhoto } from './sections/HeritageSection/HeritageSection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { LineupCaptions, LineupProducts } from './sections/LineupSection/LineupSection';
import styles from './App.module.css';

export default function App() {
  const stage = useStage();
  const root = useRef<HTMLElement>(null);
  const can = useRef<CanPainter>(null);
  const { screen, advance } = useScreenTransitions(stage.variant, root, can);

  // A click anywhere goes to the next screen; the design's links lead nowhere else.
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    advance();
  };

  const size = { width: stage.w, height: stage.h };
  const transform = `translate(${stage.x}px, ${stage.y}px) scale(${stage.scale})`;

  return (
    <main
      ref={root}
      className={styles.viewport}
      data-variant={stage.variant}
      data-screen={screen + 1}
      onClick={handleClick}
    >
      <div className={styles.artboard} style={{ ...size, transform }}>
        <Background w={stage.w} h={stage.h} />
        {/* Children are in paint order: later ones sit in front. */}
        <div className={styles.frame} style={size}>
          <HeritagePhoto />
          <HeroSection active={screen === 0} />
          <LineupProducts stage={stage} />
          <TravellingCan stage={stage} ref={can} />
          <Navbar />
          <HeritageHeading />
          <LineupCaptions variant={stage.variant} active={screen === 2} />
        </div>
      </div>
    </main>
  );
}
