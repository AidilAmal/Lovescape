"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  phase: "introSphere" | "flyThrough" | "gallery" | "topView";
};

export function ParticleSphere({ phase }: Props) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 15000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 18 + Math.random() * 14;

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi);
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const y = pos[i3 + 1];
      const whiteBand = Math.exp(-Math.pow(y / 2.3, 2));
      const upperHemisphere = y > 2 ? 1 : 0;
      const crimson = 0.65 + upperHemisphere * 0.3;
      col[i3] = crimson * (1 - whiteBand) + whiteBand;
      col[i3 + 1] = 0.08 * (1 - whiteBand) + whiteBand * 0.97;
      col[i3 + 2] = 0.12 * (1 - whiteBand) + whiteBand * 0.99;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const targetZ = phase === "flyThrough" ? -52 : phase === "gallery" ? -24 : -8;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.z += delta * 0.018;
    pointsRef.current.position.z += (targetZ - pointsRef.current.position.z) * Math.min(1, delta * 0.9);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.19}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
