# Alpine.js Integration

This project uses Alpine.js for client-side interactivity in the photo album.

## Overview

Alpine.js is a lightweight JavaScript framework that provides reactive and declarative behavior directly in your HTML markup. It's perfect for adding interactive features to the photo gallery without the overhead of larger frameworks.

## Setup

Alpine.js is automatically initialized in the main layout (`src/layouts/Layout.astro`) and is available globally throughout the application.

## Components

### PhotoGallery

A full-featured photo gallery component with filtering, lightbox, and navigation.

**Features:**

- Tag-based filtering
- Multiple layout modes (masonry, grid, list)
- Layout preference persisted to localStorage
- Theme support (light/dark/auto modes)
- Responsive design across all layouts
- Lightbox with keyboard navigation (arrow keys, ESC)
- Download full-size photos
- Optimized thumbnails for fast loading
- Intelligent lazy loading with IntersectionObserver
- Smart prefetching based on scroll direction
- Click outside to close
- Smooth transitions

**Usage:**

```astro
---
import PhotoGallery from '../components/PhotoGallery.astro';

const photos = [
  {
    id: '1',
    src: '/photos/image1.jpg',
    alt: 'Beautiful landscape',
    title: 'Mountain View',
    tags: ['nature', 'landscape']
  },
  // ... more photos
];
---

<PhotoGallery photos={photos} />
```

**Interactive Features:**

- **Layout Switching**: Toggle between masonry, grid, and list layouts
  - Masonry: Variable height columns for optimal space usage
  - Grid: Uniform square tiles in responsive grid
  - List: Horizontal cards with prominent metadata
  - Preference saved automatically to localStorage
- **Filtering**: Click tag buttons to filter photos
- **Lightbox**: Click any photo to open in lightbox
- **Navigation**:
  - Click arrow buttons OR
  - Press ← (left arrow) / → (right arrow) keys to navigate
- **Download**: Click download button (↓) to save full-size photo
- **Close**:
  - Click outside the lightbox OR
  - Click X button OR
  - Press ESC key

### ThemeSwitcher

A global theme selector for switching between light, dark, and auto modes.

**Features:**

- Three theme modes: Light, Dark, and Auto
- Theme preference persisted to localStorage
- Fixed position in top-right corner
- Responsive design (icons only on mobile, labels on desktop)
- Smooth theme transitions
- Auto mode respects system preferences

**Interactive Features:**

- **Theme Selection**: Click theme button to switch modes
- **Visual Feedback**: Active theme highlighted with gradient
- **Persistence**: Theme choice saved automatically
- **Global Application**: Theme applies to all pages instantly

### PhotoCard

A single photo card with like functionality and hover details.

**Features:**

- Persistent likes (saved to localStorage)
- Hover overlay with details
- Smooth transitions
- Like button with heart icon

**Usage:**

```astro
---
import PhotoCard from '../components/PhotoCard.astro';
---

<PhotoCard
  src="/photos/image.jpg"
  alt="Photo description"
  title="Photo Title"
  description="Additional details about the photo"
/>
```

**Interactive Features:**

- **Like**: Click heart icon to like/unlike (persists across sessions)
- **Hover**: Shows title and description on hover
- **Visual feedback**: Liked badge appears when photo is liked

## Alpine.js Directives Used

### Data Management

- `x-data`: Declares reactive component state
- `x-init`: Runs initialization code when component mounts

### Templating

- `x-for`: Loops over arrays to render lists
- `x-if`: Conditionally renders elements (add/remove from DOM)
- `x-show`: Conditionally shows/hides elements (CSS display)
- `x-text`: Sets element text content

### Events

- `@click`: Click event handler
- `@keyup.escape.window`: Global ESC key handler
- `@mouseenter` / `@mouseleave`: Mouse hover handlers
- `@click.stop`: Prevents event propagation

### Binding

- `:class`: Dynamically bind CSS classes
- `:src` / `:alt`: Dynamically bind attributes

### Transitions

- `x-transition:enter/leave`: CSS transition effects

### Magic Properties

- `$el`: References the current element
- `$persist()`: Persists data to localStorage

## State Management Patterns

### Component-Level State

```javascript
x-data="{
  open: false,
  selectedItem: null,

  toggle() {
    this.open = !this.open;
  }
}"
```

### Computed Properties

```javascript
x-data="{
  photos: [],
  selectedTag: 'all',

  get filteredPhotos() {
    return this.selectedTag === 'all'
      ? this.photos
      : this.photos.filter(p => p.tags.includes(this.selectedTag));
  }
}"
```

### Persistent State

```javascript
x-data="{
  liked: $persist(false).as('unique-key'),
  preferences: $persist({}).as('user-prefs'),
  layoutMode: $persist('masonry').as('photo-gallery-layout')
}"
```

**PhotoGallery Layout Persistence:**
The gallery automatically saves your preferred layout mode (masonry, grid, or list) to localStorage. Your choice persists across sessions and applies to all albums.

**Theme Persistence:**
The application automatically saves your preferred theme (light, dark, or auto) to localStorage. Your theme choice persists across sessions and applies globally to all pages. The theme switcher is accessible from the fixed top-right corner on all pages.

## Best Practices

1. **Keep state minimal**: Only store what needs to be reactive
2. **Use computed properties**: For derived values (getters)
3. **Leverage transitions**: For smooth UX
4. **Persist wisely**: Only persist user preferences, not all state
5. **Event modifiers**: Use `.stop`, `.prevent`, `.outside` for better control
6. **Keyboard accessibility**: Add keyboard handlers for interactive elements

## Performance Optimization

### Intelligent Lazy Loading

The PhotoGallery component implements advanced lazy loading with IntersectionObserver:

**How it works:**

1. **Placeholder Images**: Initially loads lightweight SVG placeholders (< 1KB each)
2. **Viewport Detection**: IntersectionObserver monitors when images are near viewport
3. **Smart Prefetching**: Loads images 200px before they enter viewport
4. **Scroll-Based Prediction**: Tracks scroll direction and prefetches upcoming images
5. **Aggressive Caching**: When scrolling stops, prefetches all nearby images (400px range)

**Prefetching Strategy:**

- Scrolling **down**: Prefetches 3 images ahead
- Scrolling **up**: Prefetches 2 images above
- **Stopped scrolling**: Prefetches all images within 400px of viewport
- **Lightbox navigation**: Preloads next/previous full-size images

**Performance Benefits:**

- Initial page load: Only loads visible images
- Reduced bandwidth: 142 photos × 15KB = ~2MB saved on initial load
- Smooth scrolling: Images ready before user reaches them
- Smart resource usage: Adapts to user behavior

### General Performance Tips

- Use `x-show` for frequently toggled elements (keeps in DOM)
- Use `x-if` for conditional rendering (adds/removes from DOM)
- Use `@click.stop` to prevent event bubbling when needed
- Thumbnails are 253x smaller than originals (15KB vs 3.8MB)

## Browser Support

Alpine.js supports all modern browsers. For the `$persist()` magic, localStorage must be available.

## Resources

- [Alpine.js Documentation](https://alpinejs.dev)
- [Alpine.js GitHub](https://github.com/alpinejs/alpine)
