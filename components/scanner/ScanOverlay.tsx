"use client";

import { motion } from "framer-motion";
import { memoryConfig } from "@/lib/memoryConfig";

type Props = {
  detected: boolean;
  denied: boolean;
  onFallbackUnlock?: () => void;
};

export function ScanOverlay({ detected, denied, onFallbackUnlock }: Props) {
  return (
    <div className="scan-overlay">
      <div className="scan-top">{memoryConfig.scannerText.title}</div>
      <motion.div
        className={`scan-frame ${detected ? "is-detected" : ""}`}
        animate={{ scale: detected ? [1, 1.03, 1] : 1 }}
        transition={{ duration: 0.7 }}
      >
        <span />
        <span />
        <span />
        <span />
      </motion.div>
      <div className="scan-bottom">
        <p>{memoryConfig.scannerText.instruction}</p>
        <small>{memoryConfig.scannerText.helper}</small>
        {denied && (
          <>
            <small className="warning">{memoryConfig.scannerText.denied}</small>
            <button onClick={onFallbackUnlock} type="button">
              Continue without scanner
            </button>
          </>
        )}
      </div>
    </div>
  );
}
