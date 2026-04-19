import type { ScannerAdapter, ScannerState } from "./scannerAdapter";

type MindARImageSystem = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};

/**
 * MindAR adapter isolated behind ScannerAdapter.
 * Replace `/targets/memory-target.mind` and `/targets/memory-target.jpg`
 * in the public folder with your own compiled MindAR target files.
 */
export class MindARScanner implements ScannerAdapter {
  private state: ScannerState = "idle";
  private system: MindARImageSystem | null = null;
  private onFound: (() => void) | null = null;
  private markerFoundHandler = () => {
    if (this.state === "detecting") {
      this.state = "detected";
      this.onFound?.();
    }
  };

  async init(video: HTMLVideoElement): Promise<void> {
    this.state = "ready";
    try {
      const mindar = await import("mind-ar/dist/mindar-image-three.prod.js");
      const ctor = (mindar as { MindARImageSystem: new (params: Record<string, unknown>) => MindARImageSystem }).MindARImageSystem;
      this.system = new ctor({
        container: video.parentElement,
        imageTargetSrc: "/targets/memory-target.mind",
        maxTrack: 1,
        uiLoading: "no",
        uiScanning: "no",
        uiError: "no"
      });
      this.state = "ready";
    } catch {
      this.state = "error";
      throw new Error("MindAR initialization failed");
    }
  }

  async start(onDetected: () => void): Promise<void> {
    if (!this.system) return;
    this.onFound = onDetected;
    this.state = "detecting";
    this.system.addEventListener("targetFound", this.markerFoundHandler);
    await this.system.start();
  }

  async stop(): Promise<void> {
    if (!this.system) return;
    this.system.removeEventListener("targetFound", this.markerFoundHandler);
    await this.system.stop();
    this.state = "idle";
  }

  getState(): ScannerState {
    return this.state;
  }
}
