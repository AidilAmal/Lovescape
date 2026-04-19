"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { PhotoItem } from "@/lib/types";

type Props = {
  active: PhotoItem | null;
  onClose: () => void;
};

export function PhotoModal({ active, onClose }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="photo-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="photo-modal-inner"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 14 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active.src} alt={active.alt} width={900} height={900} priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
