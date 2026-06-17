# Nothing Phone 3 Scrollytelling Implementation Guide

## 🎯 Quick Start

### 1. Switch to Nothing Phone 3 Design

Edit `src/main.tsx`:
```typescript
const USE_NOTHING_DESIGN = true // Toggle between AQI and Nothing design
```

### 2. Add Frame Sequence

**Option A: Placeholder Frames (Testing)**
1. Open `public/sequence/generate-frames.html` in browser
2. Download all 89 frames
3. Move to `public/sequence/`

**Option B: Production Frames (Following Workflow)**
1. Generate images with Midjourney/Gemini
2. Create video with Google Flow (Veo 3)
3. Convert to WebP at ezgif.com/video-to-webp
4. Extract 89 frames as `frame_001.webp` to `frame_089.webp`
5. Place in `public/sequence/`

### 3. Run Application

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or the port Vite assigns)

## 📦 What Was Implemented

### Core Scrollytelling Components

1. **ScrollyCanvas.tsx** (`src/components/Scrolly/`)
   - HTML5 Canvas rendering
   - Preloads 89 WebP frames
   - Scroll-linked frame scrubbing
   - Object-fit: cover behavior
   - Responsive scaling
   - Loading indicator

2. **Overlay.tsx** (`src/components/Scrolly/`)
   - 6 parallax text phases
   - Framer Motion scroll animations
   - Alternating left/right layout
   - Fade in/out transitions
   - Progress indicators

3. **FeaturesGridNothing.tsx** (`src/components/Features/`)
   - Apple-style horizontal rows
   - Alternating image/text layout
   - 6 major features
   - GSAP ScrollTrigger animations
   - Stats display

4. **SpecsTable.tsx** (`src/components/Specs/`)
   - 8 specification categories
   - 2-column responsive grid
   - Technical details
   - Staggered animations

5. **PricingSection.tsx** (`src/components/Pricing/`)
   - 2 storage variants
   - Black background section
   - Order Now CTAs
   - Financing info

6. **FooterNothing.tsx** (`src/components/Footer/`)
   - Minimalist 2-row design
   - Product links
   - Credits to codelikeanss
   - Legal links

7. **NavNothing.tsx** (`src/components/Nav/`)
   - Fixed navigation
   - "Nothing." | "Phone (3)"
   - Scroll-responsive background

8. **AppNothing.tsx** (`src/`)
   - Main application
   - Lenis smooth scroll
   - GSAP ticker integration
   - Custom cursor
   - Component orchestration

## 🎨 Design System

### Colors
- **Canvas Background**: #000000 (black)
- **Content Background**: #FFFFFF (white)
- **Pricing Background**: #000000 (black)
- **Text on white**: #000000
- **Text on black**: #FFFFFF

### Typography
- **Display**: 80-120px, bold
- **Headings**: 48-72px, bold
- **Body**: 16-20px, regular
- **Labels**: 10-11px, uppercase, tracked

### Spacing
- Generous whitespace (Apple-level)
- Section padding: 96px vertical
- Max width: 1280px

## 🔧 Technical Details

### Animation Stack
- **Framer Motion**: Scroll-linked canvas + overlay
- **GSAP + ScrollTrigger**: Section animations
- **Lenis**: Smooth scrolling
- **HTML5 Canvas**: Frame rendering

### Performance
- All frames preloaded on mount
- Canvas updates via requestAnimationFrame
- Scroll progress mapped to frame index
- 60fps target

### Responsive
- Mobile-first design
- Canvas scales to viewport
- Stacked layouts on mobile
- Touch-friendly

## 📁 File Structure

```
src/
├── AppNothing.tsx                  # Main Nothing Phone 3 app
├── main.tsx                        # App switcher (USE_NOTHING_DESIGN)
├── components/
│   ├── Scrolly/
│   │   ├── ScrollyCanvas.tsx       # Canvas + frame scrubbing
│   │   └── Overlay.tsx             # Parallax text
│   ├── Features/
│   │   └── FeaturesGridNothing.tsx # Apple-style features
│   ├── Specs/
│   │   └── SpecsTable.tsx          # Tech specs
│   ├── Pricing/
│   │   └── PricingSection.tsx      # Pricing + CTA
│   ├── Footer/
│   │   └── FooterNothing.tsx       # Minimal footer
│   └── Nav/
│       └── NavNothing.tsx          # Minimal nav

public/
└── sequence/
    ├── README.md                   # Frame instructions
    ├── generate-frames.html        # Placeholder generator
    └── frame_001.webp ... frame_089.webp
```

## 🎬 Scrollytelling Flow

1. **Hero Canvas** (0-500vh)
   - Scroll scrubs through 89 frames
   - Phone explodes as user scrolls
   - Pure black background

2. **Text Overlays** (synchronized)
   - Phase 1 (0%): "Nothing Phone 3." (center)
   - Phase 2 (15%): "Glyph Interface." (left)
   - Phase 3 (28%): "Snapdragon 8s Gen 4." (right)
   - Phase 4 (42%): "Triple Camera System." (left)
   - Phase 5 (57%): "5000 mAh." (right)
   - Phase 6 (72%): "6.67" LTPO OLED." (left)

3. **Features** (after scroll)
   - 6 horizontal rows
   - Alternating image/text
   - White background

4. **Specs**
   - 8 categories
   - 2-column grid
   - White background

5. **Pricing**
   - Black background
   - 2 variants
   - Order CTAs

6. **Footer**
   - Minimalist
   - White background

## 🚀 Production Workflow

Following the codelikeanss workflow:

1. **Midjourney/Gemini**: Generate reference images
2. **Google Flow (Veo 3)**: Create 8s video (9:16)
3. **Ezgif**: Convert to 89 WebP frames
4. **Extract**: Rename frames `frame_001.webp` to `frame_089.webp`
5. **Deploy**: Place in `public/sequence/`
6. **Build**: `npm run build`

## 📊 Frame Requirements

- **Count**: Exactly 89 frames
- **Format**: WebP
- **Naming**: `frame_001.webp` to `frame_089.webp` (zero-padded)
- **Aspect**: 9:16 portrait recommended
- **Size**: Optimize for web (WebP compression)

## 🔍 Troubleshooting

### Frames not loading
- Check console for 404 errors
- Verify frame names match exactly
- Ensure frames are in `public/sequence/`
- Check frame count (should be 89)

### Canvas not rendering
- Check browser console for errors
- Verify WebP support
- Check Canvas API support
- Try clearing cache

### Scroll not smooth
- Verify Lenis is initialized
- Check GSAP ticker integration
- Test without extensions
- Check for console errors

## 🎓 Credits

- **Workflow**: codelikeanss - Nothing Phone 3 Scrollytelling Workflow
- **Design Inspiration**: Apple product pages, Nothing brand
- **Tech Stack**: Vite, React, Framer Motion, GSAP, Lenis
- **Implementation**: Following the Nothing Phone 3 workflow guide

## 📄 License

MIT License - Educational Project
