"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { PhotoItem } from "@/lib/types";

type Props = {
  photo: PhotoItem;
  position: [number, number, number];
  onOpen: (photo: PhotoItem) => void;
};

export function PhotoCard({ photo, position, onOpen }: Props) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture(photo.src);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + position[0]) * 0.24;
    mesh.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.2 + position[2]) * 0.06;
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.4 + position[2]) * 0.22;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.25 + position[1]) * 0.08;
  });

  return (
    <RoundedBox
      ref={mesh}
      args={[2.2, 2.2, 0.08]}
      radius={0.14}
      smoothness={4}
      position={position}
      onClick={() => onOpen(photo)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <meshStandardMaterial map={texture} emissive="#44101d" emissiveIntensity={0.26} metalness={0.14} roughness={0.62} />
    </RoundedBox>
  );
}
