import type { Photo } from '../types/album';

interface MetadataItem {
  label: string;
  value: string;
}

class LightboxClass {
  private lightbox: HTMLElement | null;
  private image: HTMLImageElement | null;
  private imageContainer: HTMLElement | null;
  private title: HTMLElement | null;
  private counter: HTMLElement | null;
  private metadataContent: HTMLElement | null;
  private thumbnailsContainer: HTMLElement | null;
  private photos: Photo[];
  private currentIndex: number;
  private isZoomed: boolean;
  private scale: number;

  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.image = document.getElementById('lightbox-image') as HTMLImageElement | null;
    this.imageContainer = document.getElementById('lightbox-image-container');
    this.title = document.getElementById('lightbox-title');
    this.counter = document.getElementById('lightbox-counter');
    this.metadataContent = document.getElementById('metadata-content');
    this.thumbnailsContainer = document.getElementById('lightbox-thumbnails');

    this.photos = [];
    this.currentIndex = 0;
    this.isZoomed = false;
    this.scale = 1;

    this.init();
  }

  init(): void {
    // Close button
    document.getElementById('lightbox-close')?.addEventListener('click', () => this.close());

    // Navigation buttons
    document.getElementById('lightbox-prev')?.addEventListener('click', () => this.prev());
    document.getElementById('lightbox-next')?.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.lightbox?.classList.contains('hidden')) {
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      }
    });

    // Zoom functionality
    this.imageContainer?.addEventListener('click', () => this.toggleZoom());

    // Click outside image to close
    this.lightbox?.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.lightbox) this.close();
    });

    // Listen for photo thumbnail clicks
    document.addEventListener('click', (e: MouseEvent) => {
      const thumbnail = (e.target as HTMLElement).closest('.photo-thumbnail') as HTMLElement | null;
      if (thumbnail) {
        const index = Number.parseInt(thumbnail.dataset.photoIndex ?? '0');
        this.open(index);
      }
    });
  }

  open(index: number): void {
    this.photos = (window as typeof window & { albumPhotos: Photo[] }).albumPhotos || [];
    if (this.photos.length === 0) return;

    this.currentIndex = index;
    this.isZoomed = false;
    this.scale = 1;
    this.lightbox?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.render();
  }

  close(): void {
    this.lightbox?.classList.add('hidden');
    document.body.style.overflow = '';
    this.isZoomed = false;
    this.scale = 1;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.isZoomed = false;
    this.scale = 1;
    this.render();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.isZoomed = false;
    this.scale = 1;
    this.render();
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
    this.scale = this.isZoomed ? 2 : 1;
    if (this.image) {
      this.image.style.transform = `scale(${this.scale})`;
      if (this.imageContainer) {
        this.imageContainer.style.cursor = this.isZoomed ? 'zoom-out' : 'zoom-in';
        this.imageContainer.style.overflow = this.isZoomed ? 'auto' : 'hidden';
      }
    }
  }

  render(): void {
    const photo = this.photos[this.currentIndex];
    if (!photo) return;

    // Update image
    if (this.image) {
      this.image.src = photo.url;
      this.image.alt = photo.title || photo.filename;
      this.image.style.transform = 'scale(1)';
    }

    // Update title and counter
    if (this.title) {
      this.title.textContent = photo.title || photo.filename;
    }
    if (this.counter) {
      this.counter.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
    }

    // Update metadata
    this.renderMetadata(photo);

    // Update thumbnails
    this.renderThumbnails();
  }

  renderMetadata(photo: Photo): void {
    if (!this.metadataContent) return;

    const metadata: MetadataItem[] = [];

    if (photo.caption) {
      metadata.push({ label: 'Caption', value: photo.caption });
    }

    if (photo.exif?.dateTime) {
      metadata.push({ label: 'Date', value: photo.exif.dateTime });
    }

    if (photo.exif?.location) {
      metadata.push({ label: 'Location', value: photo.exif.location });
    }

    if (photo.exif?.camera) {
      metadata.push({ label: 'Camera', value: photo.exif.camera });
    }

    if (photo.exif?.lens) {
      metadata.push({ label: 'Lens', value: photo.exif.lens });
    }

    if (
      photo.exif?.focalLength ||
      photo.exif?.aperture ||
      photo.exif?.shutterSpeed ||
      photo.exif?.iso
    ) {
      const settings = [
        photo.exif.focalLength,
        photo.exif.aperture && `f/${photo.exif.aperture}`,
        photo.exif.shutterSpeed,
        photo.exif.iso && `ISO ${photo.exif.iso}`,
      ]
        .filter(Boolean)
        .join(' · ');

      if (settings) {
        metadata.push({ label: 'Settings', value: settings });
      }
    }

    if (photo.tags && photo.tags.length > 0) {
      metadata.push({ label: 'Tags', value: photo.tags.join(', ') });
    }

    this.metadataContent.innerHTML = metadata
      .map(
        ({ label, value }) => `
        <div>
          <div class="text-gray-400 text-xs">${label}</div>
          <div class="text-white">${value}</div>
        </div>
      `
      )
      .join('');
  }

  renderThumbnails(): void {
    if (!this.thumbnailsContainer) return;

    this.thumbnailsContainer.innerHTML = this.photos
      .map(
        (photo, index) => `
        <button
          type="button"
          class="thumbnail-btn flex-shrink-0 w-16 h-16 rounded overflow-hidden ${index === this.currentIndex ? 'ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'} transition-opacity"
          data-index="${index}"
        >
          <img
            src="${photo.url}"
            alt="${photo.title || photo.filename}"
            class="w-full h-full object-cover"
          />
        </button>
      `
      )
      .join('');

    // Add click handlers to thumbnails
    this.thumbnailsContainer
      .querySelectorAll<HTMLButtonElement>('.thumbnail-btn')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const index = Number.parseInt(btn.dataset.index ?? '0', 10);
          this.currentIndex = index;
          this.isZoomed = false;
          this.scale = 1;
          this.render();
        });
      });

    // Scroll current thumbnail into view
    const currentThumb = this.thumbnailsContainer.querySelector<HTMLButtonElement>(
      `[data-index="${this.currentIndex}"]`
    );
    currentThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// Initialize lightbox
if (typeof window !== 'undefined') {
  window.lightbox = new LightboxClass();
}
