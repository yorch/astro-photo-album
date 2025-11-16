# Configuration Guide

This photo album application can be customized through the `src/config/site.json` configuration file.

## Configuration File Location

`src/config/site.json`

## Configuration Options

### Site Settings

```json
"site": {
  "title": "Photo Album",
  "description": "A beautiful photo gallery built with Astro",
  "author": "Your Name"
}
```

- **title**: Default page title shown in browser tabs
- **description**: Default meta description for SEO
- **author**: Site author name (used in meta tags)

### Homepage Settings

```json
"homepage": {
  "title": "Photo Albums",
  "subtitle": "Browse through our collections"
}
```

- **title**: Main heading displayed on the homepage
- **subtitle**: Subtitle text (album count will be automatically added after this text)

### Footer Configuration

```json
"footer": {
  "enabled": true,
  "text": "© 2025 Your Name. All rights reserved.",
  "links": [...],
  "social": [...]
}
```

- **enabled**: Show/hide the footer (`true` or `false`)
- **text**: Copyright or main footer text
- **links**: Array of footer navigation links
- **social**: Array of social media links

#### Footer Links

```json
"links": [
  {
    "text": "Privacy Policy",
    "url": "/privacy"
  }
]
```

- **text**: Link text to display
- **url**: Link destination (internal paths will be prefixed with base URL)

#### Social Links

```json
"social": [
  {
    "platform": "github",
    "url": "https://github.com/yourusername",
    "icon": "github"
  }
]
```

- **platform**: Platform name (for aria-label)
- **url**: Full URL to your social profile
- **icon**: Icon name (supported: `github`, `instagram`, `twitter`, `linkedin`, `facebook`)

### Gallery Settings

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

- **defaultLayout**: Default gallery layout (`"masonry"`, `"grid"`, or `"list"`)
- **enableTags**: Enable/disable tag filtering
- **enableExif**: Show/hide EXIF metadata in lightbox
- **enableDownload**: Enable/disable photo download button
- **enableZoom**: Enable/disable zoom functionality in lightbox
- **enableKeyboardNavigation**: Enable/disable keyboard shortcuts (Arrow keys for navigation, +/- for zoom, Esc to close)

### Theme Settings

```json
"theme": {
  "defaultTheme": "auto",
  "enableThemeSwitcher": true
}
```

- **defaultTheme**: Default theme on first visit (`"light"`, `"dark"`, or `"auto"`)
- **enableThemeSwitcher**: Show/hide theme switcher button

## Example Configuration

Here's a complete example configuration:

```json
{
  "site": {
    "title": "My Photography Portfolio",
    "description": "Professional photography portfolio featuring landscape and portrait work",
    "author": "Jane Photographer"
  },
  "homepage": {
    "title": "Jane's Photography",
    "subtitle": "Capturing moments across"
  },
  "footer": {
    "enabled": true,
    "text": "© 2025 Jane Photographer. All rights reserved.",
    "links": [
      {
        "text": "About",
        "url": "/about"
      },
      {
        "text": "Contact",
        "url": "/contact"
      },
      {
        "text": "Prints",
        "url": "/prints"
      }
    ],
    "social": [
      {
        "platform": "instagram",
        "url": "https://instagram.com/janephoto",
        "icon": "instagram"
      },
      {
        "platform": "github",
        "url": "https://github.com/janephoto",
        "icon": "github"
      }
    ]
  },
  "gallery": {
    "defaultLayout": "masonry",
    "enableDownload": false,
    "enableExif": true,
    "enableKeyboardNavigation": true,
    "enableTags": true,
    "enableZoom": true
  },
  "theme": {
    "defaultTheme": "dark",
    "enableThemeSwitcher": true
  }
}
```

## Disabling Features

To disable features, set the corresponding option to `false`:

- Disable footer: `"enabled": false` in footer section
- Disable theme switcher: `"enableThemeSwitcher": false`
- Disable downloads: `"enableDownload": false`
- Disable EXIF data: `"enableExif": false`
- Disable tags: `"enableTags": false`
- Disable zoom: `"enableZoom": false`
- Disable keyboard navigation: `"enableKeyboardNavigation": false`

## Notes

- Changes to `site.json` require rebuilding the site (`yarn build` or `yarn dev`)
- Invalid JSON will cause build errors - validate your JSON before saving
- Social icon must match one of the supported platforms
- Base URL from `astro.config.mjs` is automatically applied to internal links
