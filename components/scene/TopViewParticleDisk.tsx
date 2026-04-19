"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TopViewParticleDisk() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 4200;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.pow(Math.random(), 0.55) * 18;
      data[i3] = Math.cos(t) * r;
      data[i3 + 1] = (Math.random() - 0.5) * 0.22;
      data[i3 + 2] = Math.sin(t) * r - 12;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f7f8ff" size={0.085} transparent opacity={0.92} depthWrite={false} />
    </points>
  );
}
