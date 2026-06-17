# Nothing Phone 3 - Scrollytelling Website Implementation

This implementation follows the **Nothing Phone 3 Scrollytelling Workflow** by codelikeanss, creating an Apple-level product marketing website with scroll-driven animations.

## 🎨 Design Philosophy

- **Apple-level minimalism**: Brutally minimal, typographically precise
- **Scroll-driven narrative**: 500vh canvas that scrubs through 89 WebP frames
- **Clean aesthetics**: White/black color scheme, generous whitespace
- **Zero clutter**: Only what's necessary on screen

## 🚀 Quick Start

### Switch to Nothing Phone 3 Design

The app is configured to show the Nothing Phone 3 design by default. To switch back to the original AQI design:

```typescript
// In src/main.tsx
const USE_NOTHING_DESIGN = false // Set to false for AQI design
```

### Run the Application

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── AppNothing.tsx                    # Main Nothing Phone 3 app
├── components/
│   ├── Nav/
│   │   └── NavNothing.tsx           # Minimal nav: "Nothing." | "Phone (3)"
│   ├── Scrolly/
│   │   ├── ScrollyCanvas.tsx        # HTML5 Canvas with frame scrubbing
│   │   └── Overlay.tsx              # Parallax text phases over canvas
│   ├── Features/
│   │   └── FeaturesGridNothing.tsx  # Apple-style horizontal rows
│   ├── Specs/
│   │   └── SpecsTable.tsx           # Technical specifications table
│   ├── Pricing/
│   │   └── PricingSection.tsx       # Price + Order Now CTA
│   └── Footer/
│       └── FooterNothing.tsx        # Minimal 2-row footer

public/
└── sequence/
    ├── README.md                    # Frame sequence instructions
    ├── generate-frames.html         # Placeholder frame generator
    └── frame_001.webp ... frame_089.webp
```

## 🎬 Scrollytelling Components

### 1. ScrollyCanvas.tsx

- **Purpose**: Main scroll-driven canvas animation
- **Tech**: HTML5 Canvas + Framer Motion useScroll
- **Height**: 500vh (5x viewport)
- **Features**:
  - Preloads all 89 WebP frames on mount
  - Maps scroll progress (0-1) to frame index (0-88)
  - Renders current frame with object-fit: cover behavior
  - Loading indicator while frames load
  - Responsive canvas scaling

### 2. Overlay.tsx

- **Purpose**: Text overlay with parallax effect
- **Tech**: Framer Motion useTransform
- **Phases**: 6 scroll phases alternating left/right
- **Content**:
  - 0%: Center - "Nothing Phone 3."
  - 15%: Left - "Glyph Interface."
  - 28%: Right - "Snapdragon 8s Gen 4."
  - 42%: Left - "Triple Camera System."
  - 57%: Right - "5000 mAh."
  - 72%: Left - "6.67" LTPO OLED."

### 3. FeaturesGridNothing.tsx

- **Purpose**: Apple-style feature showcase
- **Layout**: Horizontal alternating rows (image left/right)
- **Features**: 6 major features with stats
- **Animation**: GSAP ScrollTrigger fade-in with slide

### 4. SpecsTable.tsx

- **Purpose**: Complete technical specifications
- **Layout**: 2-column grid on desktop
- **Categories**: 8 spec categories (Display, Performance, Camera, etc.)
- **Animation**: Staggered fade-in per category

### 5. PricingSection.tsx

- **Purpose**: Pricing and purchase CTAs
- **Variants**: 256GB (₹39,999) and 512GB (₹44,999)
- **Background**: Black section with white cards
- **CTA**: "Order Now" pill buttons

## 🖼️ Frame Sequence Setup

### Option 1: Placeholder Frames (For Testing)

1. Open `public/sequence/generate-frames.html` in your browser
2. The tool will automatically download 89 WebP frames
3. Move all downloaded frames to `public/sequence/`

### Option 2: Production Workflow

Follow the complete workflow from the problem statement:

1. **Generate reference images** (Midjourney/Gemini)
   - Assembled Nothing Phone 3 back panel
   - Exploded parts view

2. **Create video** (Google Flow - Veo 3)
   - Upload assembled phone as Start Frame
   - Upload exploded view as End Frame
   - Set 8s duration, 9:16 aspect ratio

3. **Convert to WebP** (Ezgif)
   - Upload MP4 to ezgif.com/video-to-webp
   - Set frame rate to get ~89 frames
   - Download ZIP

4. **Extract and place**
   - Unzip frames
   - Rename as `frame_001.webp` through `frame_089.webp`
   - Place in `public/sequence/`

## 🎨 Design System

### Colors

- **Background (Canvas)**: `#000000` (Pure black)
- **Background (Content)**: `#FFFFFF` (Pure white)
- **Text (on white)**: `#000000`
- **Text (on black)**: `#FFFFFF`
- **Accent**: Minimal use, product-focused

### Typography

- **Display**: 80-120px, weight 700, tight leading
- **Headings**: 48-72px, weight 700
- **Body**: 16-20px, weight 400
- **Labels**: 10-11px, uppercase, letter-spacing 0.15em

### Spacing

- **Generous whitespace**: Large padding and margins
- **Section spacing**: 24rem (96px) vertical padding
- **Content max-width**: 1280px (7xl)

## 🔧 Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Animation**:
  - Framer Motion (scroll-linked animations)
  - GSAP + ScrollTrigger (section animations)
- **Styling**: Tailwind CSS 4.2
- **Smooth Scroll**: Lenis integration
- **Rendering**: HTML5 Canvas (NOT video tag)

## 📝 Key Features

### Scroll Performance

- **Lenis smooth scroll** synced with GSAP ticker
- **Frame scrubbing** based on scroll position
- **Parallax text** with independent scroll speed
- **60fps** target for all animations

### Responsive Design

- Mobile-first approach
- Canvas scales to viewport
- Text stacks vertically on mobile
- Touch-friendly interactions

### Custom Cursor

- Dot + ring system (inherited from original AQI design)
- Hover states for interactive elements
- Smooth lag animation

## 🚨 Important Notes

1. **Frame Requirements**:
   - Exactly 89 frames required
   - Format: WebP
   - Naming: `frame_001.webp` to `frame_089.webp` (3-digit padded)
   - Aspect ratio: 9:16 portrait recommended

2. **Performance**:
   - All frames preloaded on mount (may take a few seconds)
   - Loading indicator shown during preload
   - Canvas updates on scroll (requestAnimationFrame)

3. **Browser Support**:
   - Modern browsers with Canvas API support
   - WebP image support required
   - Smooth scrolling requires JavaScript enabled

## 🎯 Workflow Summary

This implementation faithfully follows the 6-step workflow:

1. ✅ Generate reference images (instructions provided)
2. ✅ Create video in Google Flow (instructions provided)
3. ✅ Convert to WebP in Ezgif (instructions provided)
4. ✅ Extract and rename frames (instructions provided)
5. ✅ Build with provided components (complete)
6. ✅ Preview with `npm run dev`

## 🔗 Credits

- **Workflow by**: [codelikeanss](https://github.com/codelikeanss)
- **Design inspiration**: Apple product pages, Nothing brand aesthetic
- **Implementation**: Following the Nothing Phone 3 Scrollytelling Workflow guide

## 📄 License

MIT License - Educational Project
