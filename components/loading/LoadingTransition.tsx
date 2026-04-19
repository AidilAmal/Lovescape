"use client";

import { motion } from "framer-motion";
import { memoryConfig } from "@/lib/memoryConfig";

export function LoadingTransition() {
  return (
    <motion.section
      className="loading-screen"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-stars" />
      <div className="loading-core">
        <div className="loading-ring" />
        <h2>{memoryConfig.loadingText.primary}</h2>
        <p>{memoryConfig.loadingText.secondary}</p>
      </div>
    </motion.section>
  );
}
