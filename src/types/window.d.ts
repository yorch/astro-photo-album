import type { Photo } from './album';

export interface LightboxInstance {
  open(index: number): void;
  close(): void;
  prev(): void;
  next(): void;
}

type PlausibleEventOptions = {
  props?: Record<string, string | number | boolean>;
  u?: string;
  callback?: (result: { status: number } | { error: string } | null) => void;
  interactive?: boolean;
};

interface PlausibleFunction {
  (eventName: string, options?: PlausibleEventOptions): void;
  q?: Array<[string, PlausibleEventOptions?]>;
}

declare global {
  interface Window {
    albumPhotos: Photo[];
    lightbox: LightboxInstance;
    plausible: PlausibleFunction;
  }
}
