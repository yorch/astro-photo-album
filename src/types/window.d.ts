import type { Photo } from './album';

export interface LightboxInstance {
  open(index: number): void;
  close(): void;
  prev(): void;
  next(): void;
}

declare global {
  interface Window {
    albumPhotos: Photo[];
    lightbox: LightboxInstance;
  }
}

export {};
