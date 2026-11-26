# Nitro Energy Drink — animated landing page

A pixel-faithful implementation of the Figma prototype
[3d Animation Energy Drink Website ⚡](https://www.figma.com/proto/cD0AuCsGC0zrupvtxeeUzI/3d-Animation-Energy-Drink-Website-%E2%9A%A1--Community-?node-id=1-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1):
three full-screen scenes connected by "smart animate" transitions, with a 3D-looking can that
spins, zooms and travels between them.

**Stack:** React 19 · TypeScript (strict) · Vite · GSAP · CSS Modules

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script                 | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload    |
| `npm run build`        | Type-check, then build to `dist/`       |
| `npm run preview`      | Serve the production build locally      |
| `npm run typecheck`    | Type-check only                         |
| `npm run format`       | Format the codebase with Prettier       |
| `npm run format:check` | Check formatting without changing files |

## What it does

| Screen       | Content                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| 1 · Hero     | Giant gradient "NITRO" wordmark, the can lying across it, copy, CTAs, socials |
| 2 · Heritage | Footballer photo, the can zoomed in, "SINCE 2002 PRODUCING"                   |
| 3 · Line-up  | Five flavours on pedestals with names and prices; the green can is featured   |

- **Click anywhere** (or press <kbd>Enter</kbd>, <kbd>Space</kbd> or <kbd>→</kbd>) to go to the
  next screen: 1 → 2 → 3 → 1.
- Scrolling never changes the screen, and input is ignored while a transition is running.
- From screen 3 back to the hero, everything sweeps down through screen 2's position without
  stopping there. The line-up dissolves in place and the hero buttons fade in, exactly like the
  Figma prototype.

## Project structure

```
index.html                   Page shell: metadata, #root mount point, module script
src/
├── main.tsx                 React entry: mounts App into #root
├── App.tsx                  Scales the artboard and stacks the scenes in paint order
├── assets/
│   ├── can/                 Can artwork: aluminium body, label strip, shadows
│   └── images/              Footballer photo, pedestal glow
├── components/              Reusable building blocks
│   ├── Background/          Frame gradient, bled past the artboard
│   ├── Button/              Lime / white / outline buttons
│   ├── FlavourCan/          Static tinted can (screen 3)
│   ├── Navbar/              Logo, links, "Buy Now"
│   ├── OutlineText/         Accessible text drawn from Figma glyph outlines
│   ├── Pedestal/            Can stand, with an optional featured glow
│   ├── SocialLinks/         Ringed social icons
│   └── TravellingCan/       The canvas can that moves through all screens
├── sections/                One folder per screen
│   ├── HeroSection/
│   ├── HeritageSection/
│   └── LineupSection/
├── config/                  Design constants, no logic
│   ├── stage.ts             Artboard sizes and the mobile breakpoint
│   ├── screens.ts           Every layer's position on every screen, can poses
│   └── motion.ts            Transition durations and easing
├── data/                    Content: products, social links
├── hooks/
│   ├── useStage.ts          Fits the artboard to the viewport
│   └── useScreenTransitions.ts  Screen state and the GSAP timelines
├── lib/
│   ├── canRenderer.ts       Canvas compositing for the can
│   └── geometry.ts          Box / point types and style helpers
├── generated/
│   └── glyphOutlines.ts     Text outlines extracted from the Figma export
└── styles/
    └── global.css           Reset and colour tokens
```

`index.html` is the one HTML page Vite serves. It holds the document metadata and the page
title, the empty `#root` element that React fills, and the module script that loads
`src/main.tsx`. In development Vite serves it directly; `npm run build` writes a copy with the
bundled asset links into `dist/`.

Conventions: components and their CSS Modules are `PascalCase` and live in a folder of the same
name; hooks are `useCamelCase`; other modules are `camelCase`; assets are `kebab-case`;
constants are `UPPER_SNAKE_CASE`.

## How it works

### One artboard, three layouts

The page is a single 1920×1098 artboard (the Figma frame size) that is scaled uniformly to the
viewport ([`useStage`](src/hooks/useStage.ts)). It is fitted to the _content_ height rather than
the full frame, because the bottom of the frame is empty background: on short browser windows
that strip is cropped, and nothing is shrunk more than it has to be. In a 1920×1080 window
everything renders at exactly 100%.

Like Figma, each screen is the same set of layers in different positions: layers that are not on
screen are parked above or below the frame. Those positions live in
[`config/screens.ts`](src/config/screens.ts). Every animated element is tagged with
`data-layer="…"`, and [`useScreenTransitions`](src/hooks/useScreenTransitions.ts) builds a GSAP
timeline that tweens each layer, and the can's pose, to the next screen's values.

### Timing measured from the prototype

Durations and easing were measured frame by frame from screen recordings of the live prototype:

- Screens 1 → 2 and 2 → 3: 2.4 s with Figma's "ease in and out" (`cubic-bezier(.42, 0, .58, 1)`).
- Screen 3 → 1: 2.2 s. Figma stacks layers in the destination frame's order during this
  transition, so the photo passes over the hero and the nav. The app reproduces that.

### The 3D can

There is no 3D engine. The design builds the can from flat layers, and
[`canRenderer.ts`](src/lib/canRenderer.ts) composites them the same way on a `<canvas>`:

1. A wide label strip is drawn and masked to the can's silhouette (`destination-in`).
2. The aluminium body is drawn, and the masked label is blended over it with `color-burn`.
3. **Sliding the label strip sideways** under the fixed silhouette makes the can appear to spin.
   The transitions tween this offset together with position, scale and rotation.

The four flavour cans on screen 3 reuse the same renderer with a `hue` blend that re-tints the
green artwork orange, red, sky and blue. One set of images serves all five cans.

### Type that matches Figma exactly

Browsers rasterise fonts differently from Figma; with the live font, Chrome drew Outfit visibly
heavier and shifted lines by a pixel or two. To match the design exactly, every piece of text is
drawn from the glyph outlines in Figma's own PDF export
([`generated/glyphOutlines.ts`](src/generated/glyphOutlines.ts)), through
[`OutlineText`](src/components/OutlineText/OutlineText.tsx). Each outline is an
`<svg role="img">` with the real text as its `aria-label`, so screen readers and search engines
still read the content.

### Responsive behaviour

The design is desktop-only. Viewports narrower than 4:5 switch to a 390×844 portrait artboard
with its own layer positions in the same config, so the same components and transitions drive
both layouts.

### Accessibility

- Off-screen sections are `inert`, so keyboard focus and screen readers stay on the visible screen.
- Keyboard navigation works: <kbd>Enter</kbd>, <kbd>Space</kbd> or <kbd>→</kbd> advance.
- `prefers-reduced-motion` skips the animation and jumps straight to the next screen.
- Images have alt text; decorative canvases are `aria-hidden`.

## Notes on fidelity

- Copy is reproduced as designed, including the placeholder text and the "Galleru" nav label.
- The static Figma image exports show more water droplets on the can than the live prototype
  renders; the app follows the live prototype.
- The social icon rings are drawn at 1.5 px rather than 1 px so they stay crisp when the artboard
  is scaled below 100%.
- The links and buttons are not wired to destinations in the design, so a click anywhere advances
  the scenes.
