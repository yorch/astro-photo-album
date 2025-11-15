# Photo Albums

This directory contains all your photo albums. Each subdirectory represents an album.

## Album Structure

```
albums/
├── album-name/
│   ├── album.json (optional metadata)
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.png
└── another-album/
    ├── album.json
    └── photos...
```

## Album Metadata (album.json)

Each album can have an optional `album.json` file with the following structure:

```json
{
  "title": "My Vacation Photos",
  "description": "Summer 2024 trip to the mountains"
}
```

If no `album.json` is provided, the folder name will be used as the album title.

## Adding Photos

1. Create a new folder for your album (e.g., `vacation-2024`)
2. Add your photos to the folder
3. Optionally create an `album.json` file with title and description
4. Run `yarn generate-albums` to extract EXIF data and update the album database

## Supported Photo Formats

- JPG/JPEG
- PNG
- GIF
- WebP

## EXIF Data

The build script automatically extracts the following EXIF data from your photos:

- Date/time taken
- GPS location (if available)
- Camera model
- Lens model
- Focal length, aperture, ISO, shutter speed
- Image dimensions

This data will be displayed in the lightbox viewer when viewing photos.
