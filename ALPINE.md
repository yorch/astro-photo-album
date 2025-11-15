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
- Responsive grid layout
- Lightbox with keyboard navigation (arrow keys, ESC)
- Click outside to close
- Smooth transitions
- Lazy loading

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

- **Filtering**: Click tag buttons to filter photos
- **Lightbox**: Click any photo to open in lightbox
- **Navigation**: Use arrow buttons or keyboard arrows to navigate
- **Close**: Click outside, click X button, or press ESC

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
  preferences: $persist({}).as('user-prefs')
}"
```

## Best Practices

1. **Keep state minimal**: Only store what needs to be reactive
2. **Use computed properties**: For derived values (getters)
3. **Leverage transitions**: For smooth UX
4. **Persist wisely**: Only persist user preferences, not all state
5. **Event modifiers**: Use `.stop`, `.prevent`, `.outside` for better control
6. **Keyboard accessibility**: Add keyboard handlers for interactive elements

## Performance Tips

- Use `x-show` for frequently toggled elements (keeps in DOM)
- Use `x-if` for conditional rendering (adds/removes from DOM)
- Add `loading="lazy"` to images
- Use `@click.stop` to prevent event bubbling when needed

## Browser Support

Alpine.js supports all modern browsers. For the `$persist()` magic, localStorage must be available.

## Resources

- [Alpine.js Documentation](https://alpinejs.dev)
- [Alpine.js GitHub](https://github.com/alpinejs/alpine)
