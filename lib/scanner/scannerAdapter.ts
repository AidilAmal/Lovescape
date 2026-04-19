export type ScannerState = "idle" | "ready" | "detecting" | "detected" | "error";

export interface ScannerAdapter {
  init(video: HTMLVideoElement): Promise<void>;
  start(onDetected: () => void): Promise<void>;
  stop(): Promise<void>;
  getState(): ScannerState;
}
