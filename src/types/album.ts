export interface ExifData {
  dateTime: string | null;
  location: string | null;
  camera: string | null;
  lens: string | null;
  focalLength: string | null;
  aperture: string | null;
  iso: string | null;
  shutterSpeed: string | null;
  width: number | null;
  height: number | null;
}

export interface Photo {
  filename: string;
  url: string;
  thumbnailUrl: string;
  title: string | null;
  caption: string | null;
  tags: string[];
  exif: ExifData;
  fileSize: number;
}

export interface Album {
  id: string;
  title: string;
  description: string | null;
  coverPhoto: string | null;
  coverPhotoThumbnail: string | null;
  photoCount: number;
  photos: Photo[];
}

export interface AlbumData {
  albums: Album[];
}

export interface AlbumMetadata {
  title?: string;
  description?: string;
}
