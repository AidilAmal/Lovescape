export type ScenePhase =
  | "idle"
  | "scanning"
  | "detected"
  | "loading"
  | "introSphere"
  | "flyThrough"
  | "gallery"
  | "topView";

export type PhotoItem = {
  id: string;
  src: string;
  alt: string;
};

export type MemoryConfig = {
  recipientName: string;
  titleText: string;
  subtitleText: string;
  scannerText: {
    title: string;
    instruction: string;
    helper: string;
    denied: string;
  };
  loadingText: {
    primary: string;
    secondary: string;
  };
  photos: PhotoItem[];
};
