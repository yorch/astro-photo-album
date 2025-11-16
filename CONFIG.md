# Configuration Guide

Customize your photo album through `src/config/site.json`. All features can be enabled/disabled via configuration.

## Configuration Structure

```json
{
  "site": { ... },
  "homepage": { ... },
  "footer": { ... },
  "gallery": { ... },
  "theme": { ... }
}
```

## Site Settings

```json
"site": {
  "title": "Photo Album",
  "description": "A beautiful photo gallery built with Astro",
  "author": "Your Name"
}
```

- **title** - Page title shown in browser tabs and meta tags
- **description** - Meta description for SEO
- **author** - Author name in meta tags

## Homepage Settings

```json
"homepage": {
  "title": "Photo Albums",
  "subtitle": "Browse through our collections"
}
```

- **title** - Main heading on homepage
- **subtitle** - Subtitle text (album count is automatically appended)

## Footer Configuration

```json
"footer": {
  "enabled": true,
  "text": "© 2025 Your Name",
  "links": [
    { "text": "Contact", "url": "/contact" }
  ],
  "social": [
    { "platform": "github", "url": "https://github.com/username", "icon": "github" }
  ]
}
```

- **enabled** - Show/hide footer
- **text** - Copyright or footer text
- **links** - Array of navigation links
- **social** - Array of social media links

### Social Icons

Supported platforms: `github`, `instagram`, `twitter`, `linkedin`, `facebook`

Each social link requires:

- **platform** - Platform name (for aria-label)
- **url** - Full URL to profile
- **icon** - Icon identifier (must match supported platform)

## Gallery Settings

```json
"gallery": {
  "defaultLayout": "masonry",
  "enableTags": true,
  "enableExif": true,
  "enableDownload": true,
  "enableZoom": true,
  "enableKeyboardNavigation": true
}
```

- **defaultLayout** - Initial layout: `"masonry"`, `"grid"`, or `"list"`
- **enableTags** - Show/hide tag filtering
- **enableExif** - Display EXIF metadata in lightbox
- **enableDownload** - Show download button for full-size images
- **enableZoom** - Enable zoom controls (1x-3x zoom with pan/drag)
- **enableKeyboardNavigation** - Enable keyboard shortcuts:
  - **← →** Navigate photos
  - **+ -** Zoom in/out
  - **Esc** Close lightbox

## Theme Settings

```json
"theme": {
  "defaultTheme": "auto",
  "enableThemeSwitcher": true
}
```

- **defaultTheme** - Default theme: `"light"`, `"dark"`, or `"auto"`
- **enableThemeSwitcher** - Show/hide theme switcher button

## Complete Example

```json
{
  "site": {
    "title": "My Photography",
    "description": "Professional photography portfolio",
    "author": "Jane Photographer"
  },
  "homepage": {
    "title": "Jane's Photography",
    "subtitle": "Capturing moments across"
  },
  "footer": {
    "enabled": true,
    "text": "© 2025 Jane Photographer",
    "links": [
      { "text": "About", "url": "/about" },
      { "text": "Contact", "url": "/contact" }
    ],
    "social": [
      { "platform": "instagram", "url": "https://instagram.com/janephoto", "icon": "instagram" },
      { "platform": "github", "url": "https://github.com/janephoto", "icon": "github" }
    ]
  },
  "gallery": {
    "defaultLayout": "masonry",
    "enableTags": true,
    "enableExif": true,
    "enableDownload": false,
    "enableZoom": true,
    "enableKeyboardNavigation": true
  },
  "theme": {
    "defaultTheme": "dark",
    "enableThemeSwitcher": true
  }
}
```

## Disabling Features

Set any `enable*` option to `false`:

```json
{
  "footer": { "enabled": false },
  "gallery": {
    "enableTags": false,
    "enableExif": false,
    "enableDownload": false,
    "enableZoom": false,
    "enableKeyboardNavigation": false
  },
  "theme": { "enableThemeSwitcher": false }
}
```

## Notes

- Changes require rebuilding: `yarn build` or restart `yarn dev`
- Invalid JSON will cause build errors - validate before saving
- Internal URLs (footer links) are automatically prefixed with base URL from `astro.config.mjs`
- Keyboard shortcuts are visually displayed in lightbox when enabled
