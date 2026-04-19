import { MemoryConfig } from "./types";

export const memoryConfig: MemoryConfig = {
  recipientName: "Indahul Jannah",
  titleText: "Only For U, Indahul Jannah",
  subtitleText: "A small universe of us.",
  scannerText: {
    title: "Memory Scanner",
    instruction: "Point your camera at the memory card",
    helper: "Use the printed target image to unlock the experience",
    denied: "Camera access is needed for image-target scanning."
  },
  loadingText: {
    primary: "Target recognized",
    secondary: "Opening your memory universe..."
  },
  photos: Array.from({ length: 12 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/photos/photo-${i + 1}.jpeg`,
    alt: `Memory photo ${i + 1}`
  }))
};
