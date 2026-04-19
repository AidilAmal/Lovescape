declare module "mind-ar/dist/mindar-image-three.prod.js" {
  export class MindARImageSystem {
    constructor(params: Record<string, unknown>);
    start(): Promise<void>;
    stop(): Promise<void>;
    addEventListener(event: string, cb: () => void): void;
    removeEventListener(event: string, cb: () => void): void;
  }
}
