import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import { MAX_CANVAS_WIDTH } from '../../config/stage';
import type { CanPose } from '../../config/screens';
import type { CanPainter } from '../../hooks/useScreenTransitions';
import type { Stage } from '../../hooks/useStage';
import { CAN, drawCan, loadCanImages, type CanImages } from '../../lib/canRenderer';
import styles from './TravellingCan.module.css';

interface TravellingCanProps {
  stage: Stage;
  ref: Ref<CanPainter>;
}

/**
 * The green can that travels through all three screens. It is drawn on an
 * artboard-sized canvas and repainted by the screen transitions every frame.
 */
export function TravellingCan({ stage, ref }: TravellingCanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratch = useRef<HTMLCanvasElement | null>(null);
  const images = useRef<CanImages | null>(null);
  const pose = useRef<CanPose | null>(null);

  const density = Math.min(stage.scale * stage.dpr, MAX_CANVAS_WIDTH / stage.w);
  const width = Math.round(stage.w * density);
  const height = Math.round(stage.h * density);

  const paint = () => {
    const canvas = canvasRef.current;
    const p = pose.current;
    if (!canvas || !images.current || !p) return;
    const k = canvas.width / stage.w;
    drawCan(canvas.getContext('2d')!, images.current, {
      label: p.label / p.scale,
      shadow: 'hero',
      scratch: (scratch.current ??= document.createElement('canvas')),
      place(ctx) {
        ctx.setTransform(k, 0, 0, k, 0, 0);
        ctx.translate(p.cx, p.cy);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.scale, p.scale);
        ctx.translate(-CAN.w / 2, -CAN.h / 2);
      },
    });
  };

  useImperativeHandle(ref, () => ({
    draw(next) {
      pose.current = { ...next };
      paint();
    },
  }));

  // Resizing a canvas clears it, so repaint after every commit.
  useEffect(() => {
    let alive = true;
    loadCanImages().then((loaded) => {
      if (!alive) return;
      images.current = loaded;
      paint();
    });
    return () => {
      alive = false;
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={width}
      height={height}
      aria-hidden="true"
    />
  );
}
