#!/usr/bin/env node
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ExifReader from 'exifreader';
import sharp from 'sharp';
import type { AlbumMetadata, ExifData } from '../src/types/album';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ALBUMS_DIR = join(__dirname, '../public/albums');
const THUMBNAILS_DIR = join(__dirname, '../public/thumbnails');
const OUTPUT_FILE = join(__dirname, '../src/data/albums.json');

// Thumbnail configuration
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_QUALITY = 80;

async function generateThumbnail(
  sourcePath: string,
  albumName: string,
  filename: string
): Promise<string> {
  // Create thumbnails directory structure
  const thumbnailAlbumDir = join(THUMBNAILS_DIR, albumName);
  if (!fs.existsSync(thumbnailAlbumDir)) {
    fs.mkdirSync(thumbnailAlbumDir, { recursive: true });
  }

  const thumbnailPath = join(thumbnailAlbumDir, filename);

  // Skip if thumbnail already exists and is newer than source
  if (fs.existsSync(thumbnailPath)) {
    const sourceStats = fs.statSync(sourcePath);
    const thumbStats = fs.statSync(thumbnailPath);
    if (thumbStats.mtime >= sourceStats.mtime) {
      return `/thumbnails/${albumName}/${filename}`;
    }
  }

  // Generate thumbnail using sharp
  try {
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ progressive: true, quality: THUMBNAIL_QUALITY })
      .toFile(thumbnailPath);

    return `/thumbnails/${albumName}/${filename}`;
  } catch (error) {
    console.warn(`Failed to generate thumbnail for ${filename}:`, error);
    // Fallback to original image
    return `/albums/${albumName}/${filename}`;
  }
}

function extractExifData(filePath: string): ExifData {
  try {
    const tags = ExifReader.load(fs.readFileSync(filePath));

    return {
      aperture: tags.FNumber?.description ?? null,
      camera: tags.Model?.description ?? null,
      dateTime: tags.DateTime?.description ?? tags.DateTimeOriginal?.description ?? null,
      focalLength: tags.FocalLength?.description ?? null,
      height: tags.ImageHeight?.value ?? null,
      iso: tags.ISOSpeedRatings?.description ?? null,
      lens: tags.LensModel?.description ?? null,
      location:
        tags.GPSLatitude && tags.GPSLongitude
          ? `${tags.GPSLatitude.description}, ${tags.GPSLongitude.description}`
          : null,
      shutterSpeed: tags.ExposureTime?.description ?? null,
      width: tags.ImageWidth?.value ?? null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Failed to extract EXIF from ${filePath}:`, errorMessage);
    return {
      aperture: null,
      camera: null,
      dateTime: null,
      focalLength: null,
      height: null,
      iso: null,
      lens: null,
      location: null,
      shutterSpeed: null,
      width: null,
    };
  }
}

async function generateAlbumData() {
  if (!fs.existsSync(ALBUMS_DIR)) {
    console.log('Albums directory not found, creating...');
    fs.mkdirSync(ALBUMS_DIR, { recursive: true });
    return { albums: [] };
  }

  // Create thumbnails directory
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }

  const albums = [];
  const albumDirs = fs
    .readdirSync(ALBUMS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const albumName of albumDirs) {
    const albumPath = join(ALBUMS_DIR, albumName);
    const photos = [];

    // Read all image files in the album directory
    const files = fs.readdirSync(albumPath);
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    console.log(`Processing ${albumName}: ${imageFiles.length} photos...`);

    for (const filename of imageFiles) {
      const filePath = join(albumPath, filename);
      const stats = fs.statSync(filePath);
      const exifData = extractExifData(filePath);
      const thumbnailUrl = await generateThumbnail(filePath, albumName, filename);

      photos.push({
        caption: null, // Can be manually added later
        exif: exifData,
        filename,
        fileSize: stats.size,
        tags: [], // Can be manually added later
        thumbnailUrl,
        title: null, // Can be manually added later
        url: `/albums/${albumName}/${filename}`,
      });
    }

    // Try to read album metadata if it exists
    const metadataPath = join(albumPath, 'album.json');
    let albumMetadata: AlbumMetadata = {
      description: undefined,
      title: albumName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    };

    if (fs.existsSync(metadataPath)) {
      try {
        const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
        const metadata = JSON.parse(metadataContent) as AlbumMetadata;
        albumMetadata = { ...albumMetadata, ...metadata };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.warn(`Failed to read metadata for ${albumName}:`, errorMessage);
      }
    }

    albums.push({
      id: albumName,
      ...albumMetadata,
      coverPhoto: photos[0]?.url || null,
      coverPhotoThumbnail: photos[0]?.thumbnailUrl || null,
      photoCount: photos.length,
      photos: photos.sort((a, b) => {
        // Sort by date if available, otherwise by filename
        const dateA = a.exif.dateTime || a.filename;
        const dateB = b.exif.dateTime || b.filename;
        return dateA > dateB ? 1 : -1;
      }),
    });
  }

  return { albums };
}

// Generate and save the album data
const albumData = await generateAlbumData();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albumData, null, 2));
console.log(`✓ Generated album data for ${albumData.albums.length} albums`);
console.log(
  `  Total photos: ${albumData.albums.reduce((sum, album) => sum + album.photoCount, 0)}`
);
console.log(`✓ Thumbnails generated in ${THUMBNAILS_DIR}`);
