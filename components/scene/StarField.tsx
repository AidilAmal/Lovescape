"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function StarField() {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);

  const nearStars = useMemo(() => {
    const pos = new Float32Array(5600 * 3);
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] = (Math.random() - 0.5) * 150;
      pos[i + 1] = (Math.random() - 0.5) * 150;
      pos[i + 2] = (Math.random() - 0.5) * 150;
    }
    return pos;
  }, []);

  const farStars = useMemo(() => {
    const pos = new Float32Array(7000 * 3);
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] = (Math.random() - 0.5) * 220;
      pos[i + 1] = (Math.random() - 0.5) * 220;
      pos[i + 2] = (Math.random() - 0.5) * 220;
    }
    return pos;
  }, []);

  useFrame(({ clock }, delta) => {
    const twinkleScale = 1 + Math.sin(clock.elapsedTime * 0.4) * 0.015;
    if (nearRef.current) {
      nearRef.current.rotation.y += delta * 0.012;
      nearRef.current.rotation.x += delta * 0.003;
      nearRef.current.scale.setScalar(twinkleScale);
    }
    if (farRef.current) {
      farRef.current.rotation.y -= delta * 0.004;
      farRef.current.rotation.z += delta * 0.0015;
    }
  });

  return (
    <>
      <Points ref={farRef} positions={farStars} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#d5deff" size={0.07} sizeAttenuation depthWrite={false} opacity={0.35} />
      </Points>
      <Points ref={nearRef} positions={nearStars} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.095} sizeAttenuation depthWrite={false} opacity={0.58} />
      </Points>
    </>
  );
}
