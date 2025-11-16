# Astro Photo Album

A modern, highly configurable photo album application built with Astro, Alpine.js, and Tailwind CSS.

## ✨ Features

- 📸 **Interactive Galleries** - Tag filtering with masonry, grid, and list layouts
- 🖼️ **Full-Featured Lightbox** - Zoom, pan, drag, EXIF metadata, and keyboard navigation
- 🔍 **Zoom & Pan** - Multi-level zoom (1x-3x) with smooth drag functionality
- 🎨 **Theme Switching** - Light/dark mode with auto-detection and persistence
- ⚡ **Lightweight** - Alpine.js powered (only 15kb), no heavy frameworks
- 🚀 **Optimized Images** - Three-tier system (thumbnail/lightbox/full-size) with lazy loading
- 📊 **EXIF Display** - Camera, lens, settings, and location metadata
- ⌨️ **Keyboard Shortcuts** - Arrow keys (navigate), +/- (zoom), Esc (close)
- ⚙️ **Fully Configurable** - JSON-based configuration for all features
- 📱 **Mobile Responsive** - Touch-friendly interface with responsive design

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start development server:**

   ```bash
   yarn dev
   ```

3. **Add your photos:**
   - Place images in `public/photos/[album-name]/`
   - Run `yarn build` to generate optimized images
   - Images are automatically organized into albums by folder

4. **Configure your site:**
   - Edit `src/config/site.json` to customize settings
   - See [CONFIG.md](./CONFIG.md) for all options

## 🧞 Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `yarn install` | Installs dependencies                       |
| `yarn dev`     | Starts local dev server at `localhost:4321` |
| `yarn build`   | Build production site to `./dist/`          |
| `yarn preview` | Preview your build locally                  |

## ⚙️ Configuration

All features can be enabled/disabled via `src/config/site.json`:

### Gallery Features

- **Layout modes** - Masonry, grid, or list view
- **Tag filtering** - Filter photos by tags
- **EXIF metadata** - Display camera and photo information
- **Download button** - Allow users to download full-size images
- **Zoom controls** - Enable multi-level zoom in lightbox
- **Keyboard navigation** - Arrow keys, zoom shortcuts, and Esc to close

### Site Settings

- **Theme** - Default theme (light/dark/auto) and theme switcher
- **Homepage** - Customizable title and subtitle
- **Footer** - Configurable footer with links and social media icons

See [CONFIG.md](./CONFIG.md) for detailed configuration documentation.

## 📚 Documentation

- **[CONFIG.md](./CONFIG.md)** - Complete configuration guide
- **[CONFIG_AUDIT.md](./CONFIG_AUDIT.md)** - Configuration implementation status
- **[ALPINE.md](./ALPINE.md)** - Alpine.js integration details

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Static site generator with server-side rendering
- **[Alpine.js](https://alpinejs.dev)** - Lightweight JavaScript framework (15kb)
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

## 📸 Image Optimization

The application automatically generates three versions of each image:

- **Thumbnails** (400px) - Fast gallery loading
- **Lightbox** (1920px) - High-quality viewing
- **Full-size** (original) - Download option

Images are lazy-loaded with intelligent prefetching based on scroll direction.

## ⌨️ Keyboard Shortcuts

When keyboard navigation is enabled:

- **← →** - Navigate between photos
- **+ -** - Zoom in/out (when zoom enabled)
- **Esc** - Close lightbox

Visual hints are displayed in the lightbox when keyboard navigation is active.

## 🎨 Customization

1. **Colors & Styling** - Edit Tailwind classes in components
2. **Configuration** - Modify `src/config/site.json`
3. **Footer Links** - Add custom links and social media accounts
4. **Theme** - Set default theme and enable/disable theme switcher

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
