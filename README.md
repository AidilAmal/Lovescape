# Lovescape — Mobile-first WebAR Memory Universe

A cinematic WebAR romantic gallery built with **Next.js App Router + TypeScript + React Three Fiber + Three.js + Framer Motion**. The experience starts from a camera scanner and transitions into a premium 3D memory universe.

## Features

- Full-screen scanner UI with elegant frame brackets.
- MindAR image-target integration through a clean adapter interface (`ScannerAdapter`).
- Fallback path when camera permission or MindAR is unavailable.
- Cinematic loading transition.
- Massive red/white particle sphere intro + fly-through.
- Floating 3D photo cards with modal lightbox.
- Personalized title/subtitle from centralized config.
- Optional top-view cosmic memory map mode.
- Mobile-first full-screen styling with polished transitions.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Three.js + React Three Fiber
- @react-three/drei
- Framer Motion
- MindAR (browser image target tracking)

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace recipient name, title, and text

Edit:

- `lib/memoryConfig.ts`

Fields:

- `recipientName`
- `titleText`
- `subtitleText`
- `scannerText`
- `loadingText`

## Replace photos

1. Put your square images in `public/photos/`.
2. Update `photos` entries in `lib/memoryConfig.ts` if filenames change.

## Replace MindAR target image

> Important: the included target assets are placeholders.

1. Create a real target image (JPG/PNG).
2. Compile the `.mind` file with the MindAR compiler tool.
3. Replace:
   - `public/targets/memory-target.mind`
   - `public/targets/memory-target.jpg`
4. If you rename files, update `imageTargetSrc` in `lib/scanner/mindarScanner.ts`.

## Scanner integration architecture

- `lib/scanner/scannerAdapter.ts` defines a generic scanner contract.
- `lib/scanner/mindarScanner.ts` implements MindAR-specific behavior.
- `components/scanner/ScannerScreen.tsx` only depends on the adapter API.

This keeps the 3D scene independent from scanner implementation, so swapping scanner providers won’t require rewriting scene logic.

## Production notes

- Tune particle counts for target devices.
- Add compressed JPG/WebP photos for better mobile performance.
- Ambient audio can be added at loading/scene stages without architecture changes.
