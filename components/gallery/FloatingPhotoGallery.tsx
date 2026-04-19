"use client";

import { useMemo } from "react";
import { PhotoCard } from "./PhotoCard";
import type { PhotoItem } from "@/lib/types";

type Props = {
  photos: PhotoItem[];
  onOpen: (photo: PhotoItem) => void;
  topView: boolean;
};

export function FloatingPhotoGallery({ photos, onOpen, topView }: Props) {
  const positions = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return photos.map((_, i) => {
      const angle = i * golden + (i % 3) * 0.22;
      const shell = 8 + Math.sqrt(i + 1) * 2.7;
      const verticalWave = Math.sin(i * 1.6) * 2.2 + (i % 5) * 0.35 - 0.7;
      const radialJitter = ((i % 4) - 1.5) * 0.72;

      if (topView) {
        const topRadius = 7 + (i % 6) * 1.8 + Math.sqrt(i) * 1.4;
        return [Math.cos(angle) * topRadius, 0.4 + Math.sin(i * 1.3) * 0.45, Math.sin(angle) * topRadius - 12] as [
          number,
          number,
          number
        ];
      }

      return [
        Math.cos(angle) * (shell + radialJitter),
        verticalWave,
        Math.sin(angle) * (shell - radialJitter) - 14 - (i % 4) * 1.2
      ] as [number, number, number];
    });
  }, [photos, topView]);

  return (
    <group>
      {photos.map((photo, i) => (
        <PhotoCard key={photo.id} photo={photo} position={positions[i]} onOpen={onOpen} />
      ))}
    </group>
  );
}
