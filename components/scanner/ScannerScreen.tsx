"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MindARScanner } from "@/lib/scanner/mindarScanner";
import { ScanOverlay } from "./ScanOverlay";

type Props = {
  onDetected: () => void;
};

export function ScannerScreen({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lockRef = useRef(false);
  const [detected, setDetected] = useState(false);
  const [denied, setDenied] = useState(false);
  const scanner = useMemo(() => new MindARScanner(), []);

  useEffect(() => {
    let mounted = true;
    let stream: MediaStream | null = null;

    const boot = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1080 },
            height: { ideal: 1920 }
          },
          audio: false
        });

        if (!videoRef.current || !mounted) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        await scanner.init(videoRef.current);
        await scanner.start(async () => {
          if (lockRef.current) return;
          lockRef.current = true;
          setDetected(true);
          navigator.vibrate?.(30);
          setTimeout(() => {
            onDetected();
          }, 850);
        });
      } catch {
        setDenied(true);
      }
    };

    boot();

    return () => {
      mounted = false;
      scanner.stop();
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [onDetected, scanner]);

  return (
    <motion.section className="scanner-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <video ref={videoRef} autoPlay muted playsInline className="scanner-video" />
      <ScanOverlay detected={detected} denied={denied} onFallbackUnlock={onDetected} />
    </motion.section>
  );
}
