"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  trigger: number;
};

export function ParticleFlyThrough({ trigger }: Props) {
  const burst = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!burst.current) return;
    burst.current.children.forEach((child, i) => {
      child.position.z += (i % 2 === 0 ? 1 : -1) * delta * (1.8 + trigger * 2);
      child.position.y += Math.sin(i + performance.now() * 0.001) * delta * 0.2;
    });
  });

  return (
    <group ref={burst}>
      {Array.from({ length: 140 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 28, (Math.random() - 0.5) * 28, (Math.random() - 0.5) * 70]}>
          <sphereGeometry args={[0.05 + Math.random() * 0.06, 6, 6]} />
          <meshBasicMaterial color={i % 4 === 0 ? "#ffffff" : "#a50f23"} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}
