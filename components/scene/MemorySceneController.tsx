"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { memoryConfig } from "@/lib/memoryConfig";
import type { PhotoItem, ScenePhase } from "@/lib/types";
import { ScannerScreen } from "@/components/scanner/ScannerScreen";
import { LoadingTransition } from "@/components/loading/LoadingTransition";
import { StarField } from "./StarField";
import { ParticleSphere } from "./ParticleSphere";
import { ParticleFlyThrough } from "./ParticleFlyThrough";
import { FloatingPhotoGallery } from "@/components/gallery/FloatingPhotoGallery";
import { PhotoModal } from "@/components/gallery/PhotoModal";
import { PersonalTitle } from "./PersonalTitle";
import { TopViewParticleDisk } from "./TopViewParticleDisk";

function CameraDirector({ phase }: { phase: ScenePhase }) {
  const { camera } = useThree();
  const targets = useMemo(
    () => ({
      introSphere: new THREE.Vector3(0, 1, 42),
      flyThrough: new THREE.Vector3(0, 0.3, 5),
      gallery: new THREE.Vector3(0, 3.8, 20),
      topView: new THREE.Vector3(0, 30, 2)
    }),
    []
  );
  const lookAtTargets = useMemo(
    () => ({
      introSphere: new THREE.Vector3(0, 0, -6),
      flyThrough: new THREE.Vector3(0, 0, -18),
      gallery: new THREE.Vector3(0, 2, -14),
      topView: new THREE.Vector3(0, 0, -12)
    }),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = Math.min(1, delta * 0.9);
    const drift = Math.sin(clock.elapsedTime * 0.22) * 0.28;
    if (phase === "introSphere") {
      camera.position.lerp(targets.introSphere, t);
      camera.position.x = drift;
      camera.lookAt(lookAtTargets.introSphere);
    } else if (phase === "flyThrough") {
      camera.position.lerp(targets.flyThrough, t * 0.62);
      camera.position.x = drift * 0.35;
      camera.lookAt(lookAtTargets.flyThrough);
    } else if (phase === "gallery") {
      camera.position.lerp(targets.gallery, t);
      camera.lookAt(lookAtTargets.gallery);
    } else if (phase === "topView") {
      camera.position.lerp(targets.topView, t);
      camera.lookAt(lookAtTargets.topView);
    }
  });

  return null;
}

export function MemorySceneController() {
  const [phase, setPhase] = useState<ScenePhase>("scanning");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [burst, setBurst] = useState(0);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (phase === "loading") {
      const toIntro = setTimeout(() => setPhase("introSphere"), 2100);
      return () => clearTimeout(toIntro);
    }
    if (phase === "introSphere") {
      const toFly = setTimeout(() => setPhase("flyThrough"), reducedMotion ? 300 : 2900);
      return () => clearTimeout(toFly);
    }
    if (phase === "flyThrough") {
      const toGallery = setTimeout(() => setPhase("gallery"), reducedMotion ? 450 : 3200);
      return () => clearTimeout(toGallery);
    }
    return;
  }, [phase, reducedMotion]);

  return (
    <main className="experience-root" onDoubleClick={() => setBurst((v) => v + 1)}>
      <div className="atmospheric-glow" />
      <AnimatePresence mode="wait">
        {phase === "scanning" && <ScannerScreen key="scanner" onDetected={() => setPhase("loading")} />}
        {phase === "loading" && <LoadingTransition key="loading" />}
      </AnimatePresence>

      {(phase === "introSphere" || phase === "flyThrough" || phase === "gallery" || phase === "topView") && (
        <>
          <PersonalTitle />
          <button className="top-view-toggle" type="button" onClick={() => setPhase(phase === "topView" ? "gallery" : "topView")}>
            {phase === "topView" ? "Return" : "Top View"}
          </button>
          <Canvas camera={{ position: [0, 0, 45], fov: 54 }} dpr={[1, 1.7]}>
            <color attach="background" args={["#050816"]} />
            <fog attach="fog" args={["#050816", 24, 120]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 8, 10]} intensity={1.2} color="#ffdfe4" />
            <Suspense fallback={null}>
              <StarField />
              <ParticleSphere phase={phase} />
              <ParticleFlyThrough trigger={burst} />
              {phase === "topView" && <TopViewParticleDisk />}
              {(phase === "gallery" || phase === "topView") && (
                <FloatingPhotoGallery
                  photos={memoryConfig.photos}
                  onOpen={setActivePhoto}
                  topView={phase === "topView"}
                />
              )}
              <mesh position={[0, phase === "topView" ? -0.2 : -2.6, -20]}>
                <sphereGeometry args={[phase === "topView" ? 3.2 : 4.4, 48, 48]} />
                <meshBasicMaterial color="#a20d1f" transparent opacity={0.82} />
              </mesh>
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableDamping
              dampingFactor={0.07}
              minDistance={12}
              maxDistance={30}
              minPolarAngle={phase === "topView" ? 0 : Math.PI / 3.2}
              maxPolarAngle={phase === "topView" ? Math.PI / 3.4 : Math.PI / 1.9}
            />
            <CameraDirector phase={phase} />
          </Canvas>
          <PhotoModal active={activePhoto} onClose={() => setActivePhoto(null)} />
        </>
      )}
    </main>
  );
}
