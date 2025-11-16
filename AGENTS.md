# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

## Project Overview

This is a modern photo album application built with Astro, Alpine.js, and Tailwind CSS. The application generates static photo galleries with EXIF metadata extraction, multi-tier image optimization, and interactive features.

## Development Commands

### Essential Commands

```bash
# Install dependencies
yarn install

# Start dev server (localhost:4321)
yarn dev

# Generate album data from photos (MUST run before build)
yarn generate-albums

# Build production site
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint

# Lint and auto-fix
yarn lint:fix

# TypeScript type checking
yarn astro check
```

### Important Build Process

The build process has a specific order that MUST be followed:

1. `yarn generate-albums` - Extracts EXIF data, generates thumbnails/lightbox images
2. `yarn build` - Compiles Astro site (automatically runs generate-albums first)

**Never skip the generate-albums step** - it creates the `src/data/albums.json` file and optimized images that the site depends on.

## Architecture Overview

### Image Processing Pipeline

The application implements a three-tier image optimization system:

1. **Original Images** (`public/albums/[album-name]/`)
   - User uploads full-resolution photos here
   - Organized by album folders

2. **Build-Time Processing** (`scripts/generate-album-data.ts`)
   - Extracts EXIF metadata using ExifReader
   - Generates thumbnails (400px, 80% quality) → `public/thumbnails/`
   - Generates lightbox images (1920px, 85% quality) → `public/lightbox/`
   - Creates `src/data/albums.json` with all metadata

3. **Runtime Optimization** (PhotoGallery component)
   - Lazy loads thumbnails with IntersectionObserver
   - Intelligent prefetching based on scroll direction
   - Preloads adjacent lightbox images for smooth navigation

### Data Flow

```
public/albums/         → scripts/generate-album-data.ts → src/data/albums.json
                      ↓
                  public/thumbnails/
                  public/lightbox/
                      ↓
              Components consume albums.json
                      ↓
              Alpine.js handles interactivity
```

### Configuration System

All features are controlled through `src/config/site.json`:

- Gallery features (tags, EXIF, download, zoom, keyboard nav)
- Theme settings (default theme, theme switcher)
- Footer and homepage content
- Site metadata

**Important**: Configuration changes require rebuild (`yarn build` or restart `yarn dev`)

### Component Architecture

**Astro Components** (static, server-rendered):

- `Layout.astro` - Base layout with Alpine.js initialization
- `PhotoGallery.astro` - Main gallery component (Alpine.js for interactivity)
- `AlbumCard.astro` - Album preview cards
- `ThemeSwitcher.astro` - Theme toggle component
- `Footer.astro` - Configurable footer with social links

**Alpine.js Integration**:

- All interactivity is handled client-side via Alpine.js directives
- State persistence uses `$persist()` magic with localStorage
- No external .js files for Alpine - all inline in components
- See ALPINE.md for detailed Alpine.js patterns

### TypeScript Structure

The codebase is **100% TypeScript** with strict typing:

**Type Definitions** (`src/types/`):

- `album.ts` - Photo, Album, ExifData, AlbumMetadata interfaces
- `config.ts` - Site configuration types
- `window.d.ts` - Window extensions for global state

**Build Scripts**:

- `scripts/generate-album-data.ts` - Full TypeScript with explicit types
- All functions have explicit return types
- No `any` types allowed
- Uses type guards for error handling

**Running Type Checks**:

```bash
yarn astro check  # Full type checking
```

## Key Implementation Details

### Photo Gallery Features

The PhotoGallery component implements:

1. **Layout Modes** (masonry/grid/list)
   - Persisted to localStorage as `photo-gallery-layout`
   - Switching layouts maintains filter state

2. **Tag Filtering**
   - Dynamic tag extraction from all photos
   - Multiple tags per photo supported
   - "All" tag shows unfiltered gallery

3. **Lightbox with Zoom**
   - Multi-level zoom (1x, 1.5x, 2x, 2.5x, 3x)
   - Pan/drag functionality when zoomed
   - Keyboard shortcuts (if enabled in config)
   - Preloads adjacent images for smooth navigation

4. **EXIF Metadata Display**
   - Camera, lens, settings (aperture, ISO, shutter speed)
   - GPS location, dimensions, date/time
   - Gracefully handles missing data

5. **Lazy Loading Strategy**
   - IntersectionObserver with 200px threshold
   - Scroll direction detection for smart prefetching
   - Aggressive caching when scrolling stops (400px range)

### Theme System

- Three modes: light, dark, auto
- Auto mode respects system preferences
- Theme persisted to localStorage
- Applied via Tailwind's dark mode (class strategy)
- ThemeSwitcher component in fixed top-right position

### Album Organization

Albums are auto-discovered from folder structure:

- Each folder in `public/albums/` becomes an album
- Album metadata from `album.json` (optional)
- Photos must be JPG/JPEG/PNG
- Filename becomes title if no metadata provided

Example album structure:

```
public/albums/
  ├── vacation-2024/
  │   ├── album.json (optional)
  │   ├── photo1.jpg
  │   └── photo2.jpg
  └── wedding/
      ├── album.json (optional)
      └── photos...
```

## Working with Images

### Adding New Photos

1. Create/use folder in `public/albums/[album-name]/`
2. Add JPG/PNG images to folder
3. (Optional) Add `album.json` for metadata:

   ```json
   {
     "title": "Album Title",
     "description": "Album description"
   }
   ```

4. Run `yarn generate-albums` to process
5. Rebuild/restart dev server

### Image Processing Notes

- Sharp library handles image optimization
- Thumbnails maintain aspect ratio (max width 400px)
- Lightbox images capped at 1920px width
- Original images preserved for download feature
- Generated images cached (only regenerate if source newer)

## Configuration Patterns

When modifying `src/config/site.json`:

1. Validate JSON syntax (build will fail on invalid JSON)
2. All `enable*` flags are boolean
3. Changes require restart/rebuild
4. See CONFIG.md for complete reference

**Enabling/Disabling Features**:

```json
{
  "gallery": {
    "enableTags": true,           // Tag filtering
    "enableExif": true,            // EXIF metadata display
    "enableDownload": true,        // Download button
    "enableZoom": true,            // Zoom controls
    "enableKeyboardNavigation": true  // Keyboard shortcuts
  }
}
```

## Code Style & Standards

- **Linting**: Biome.js (`biome.json`)
- **Type Checking**: TypeScript strict mode
- **No `any` types**: All types must be explicit
- **Null Handling**: Use `null` (not `undefined`) for missing data
- **Error Handling**: Use type guards with `instanceof Error`

## Common Patterns

### Alpine.js State Management

```javascript
x-data="{
  // Component state
  open: false,

  // Computed properties (getters)
  get filtered() {
    return this.items.filter(...)
  },

  // Persisted state
  layout: $persist('masonry').as('unique-key')
}"
```

### Type-Safe EXIF Extraction

```typescript
function extractExifData(tags: ExifReader.Tags): ExifData {
  return {
    camera: tags.Model?.description ?? null,
    lens: tags.LensModel?.description ?? null,
    // ... explicit null handling
  };
}
```

### Reading Configuration

```typescript
import siteConfig from '@/config/site.json';

const config = siteConfig.gallery;
if (config.enableZoom) {
  // Feature enabled
}
```

## Important Files

- `scripts/generate-album-data.ts` - Image processing and EXIF extraction
- `src/components/PhotoGallery.astro` - Main gallery component
- `src/config/site.json` - All feature flags and site settings
- `src/types/album.ts` - Core type definitions
- `src/data/albums.json` - Generated album data (DO NOT EDIT MANUALLY)

## Testing Workflow

While there are no automated tests, manual testing workflow:

1. Make changes
2. Run `yarn generate-albums` if modifying image processing
3. Run `yarn dev` and test at localhost:4321
4. Check `yarn astro check` for type errors
5. Run `yarn lint:fix` before committing
6. Test production build with `yarn build && yarn preview`

## Deployment Notes

- Generated files are in `dist/` directory
- `src/data/albums.json` must be committed (generated file but required)
- Ensure `public/thumbnails/` and `public/lightbox/` are gitignored
- Original photos in `public/albums/` can be committed or external
