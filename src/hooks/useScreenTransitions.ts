import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { TRANSITION } from '../config/motion';
import {
  CAN_POSES,
  LAYERS,
  SCREEN_COUNT,
  type CanPose,
  type LayerId,
  type ScreenIndex,
} from '../config/screens';
import type { Variant } from '../config/stage';

gsap.registerPlugin(CustomEase);
const ease = CustomEase.create('figmaEaseInOut', TRANSITION.curve);

const LAYER_IDS = Object.keys(LAYERS.desktop) as LayerId[];
const ADVANCE_KEYS = ['Enter', ' ', 'ArrowRight'];

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Anything that can paint the travelling can for a given pose. */
export interface CanPainter {
  draw(pose: CanPose): void;
}

/**
 * Drives the three-screen sequence: moves every `[data-layer]` element inside
 * `root` and the travelling can from one screen's layout to the next.
 */
export function useScreenTransitions(
  variant: Variant,
  root: RefObject<HTMLElement | null>,
  can: RefObject<CanPainter | null>,
) {
  const [screen, setScreen] = useState<ScreenIndex>(0);
  const current = useRef<ScreenIndex>(0);
  const pose = useRef<CanPose>({ ...CAN_POSES[variant][0] });
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const layers = useCallback(
    (id: LayerId) => [...root.current!.querySelectorAll<HTMLElement>(`[data-layer="${id}"]`)],
    [root],
  );
  const drawCan = useCallback(() => can.current?.draw(pose.current), [can]);

  // Snap to the current screen on mount and whenever the layout variant changes.
  useLayoutEffect(() => {
    timeline.current?.kill();
    timeline.current = null;
    const index = current.current;
    for (const id of LAYER_IDS) {
      gsap.set(layers(id), {
        ...LAYERS[variant][id][index],
        opacity: 1,
        zIndex: 'auto',
        transformOrigin: '0 0',
      });
    }
    Object.assign(pose.current, CAN_POSES[variant][index]);
    drawCan();
  }, [variant, layers, drawCan]);

  const advance = useCallback(() => {
    // Ignore input while a transition is still running.
    if (timeline.current?.isActive()) return;

    const from = current.current;
    const next = ((from + 1) % SCREEN_COUNT) as ScreenIndex;
    const isLoop = next < from;
    current.current = next;
    setScreen(next);

    const duration = isLoop ? TRANSITION.loopDuration : TRANSITION.duration;
    const tl = gsap.timeline({ defaults: { duration, ease }, onUpdate: drawCan });
    timeline.current = tl;

    if (isLoop) {
      // Figma stacks layers in the destination frame's order: on the hero
      // frame the photo is above the hero, the can and the nav, and the
      // outgoing line-up dissolves on top of everything.
      const photo = layers('photo');
      const lineup = layers('lineup');
      tl.set(photo, { zIndex: 1 }, 0)
        .set(lineup, { zIndex: 2 }, 0)
        .set([...photo, ...lineup], { zIndex: 'auto' }, duration);
    }

    for (const id of LAYER_IDS) {
      const target = { ...LAYERS[variant][id][next] };
      if (isLoop && id === 'lineup') {
        // On the way back the line-up does not travel; it fades out in place…
        tl.to(layers(id), { opacity: 0 }, 0).set(layers(id), { ...target, opacity: 1 }, duration);
      } else if (isLoop && id === 'cta') {
        // …and the hero buttons, which are not on screen 3, fade in in place.
        tl.fromTo(layers(id), { ...target, opacity: 0 }, { opacity: 1, immediateRender: true }, 0);
      } else {
        tl.to(layers(id), target, 0);
      }
    }
    tl.to(pose.current, { ...CAN_POSES[variant][next] }, 0);

    if (prefersReducedMotion()) tl.progress(1);
  }, [variant, layers, drawCan]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Focused links and buttons already turn Enter/Space into a click.
      if (e.target instanceof Element && e.target.closest('a, button')) return;
      if (e.repeat || !ADVANCE_KEYS.includes(e.key)) return;
      e.preventDefault();
      advance();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advance]);

  return { screen, advance };
}
