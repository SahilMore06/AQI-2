# Frame Sequence Directory

This directory should contain 89 WebP frames for the scrollytelling animation.

## How to Generate Frames

### Option 1: Use the Frame Generator Tool (Placeholder Frames)

For testing purposes, you can generate placeholder frames:

1. Open `generate-frames.html` in your browser
2. The tool will automatically download 89 WebP frames
3. Move all downloaded frames to this directory

### Option 2: Follow the Nothing Phone 3 Workflow

For production-quality frames, follow the complete workflow:

1. **Generate reference images** using Midjourney or Gemini
   - Assembled Nothing Phone 3 back panel
   - Exploded parts view

2. **Create video in Google Flow** (Veo 3)
   - Upload assembled phone as Start Frame
   - Upload exploded view as End Frame
   - Set duration: 8s, aspect ratio: 9:16
   - Generate video

3. **Convert to WebP frames** using Ezgif
   - Go to ezgif.com/video-to-webp
   - Upload your MP4
   - Set frame rate to get ~89 frames
   - Download ZIP

4. **Extract and rename frames**
   - Unzip downloaded file
   - Rename frames as: `frame_001.webp` to `frame_089.webp`
   - Place all frames in this directory

## Frame Requirements

- **Count**: 89 frames
- **Format**: WebP
- **Naming**: `frame_001.webp` through `frame_089.webp` (3-digit padded)
- **Aspect Ratio**: 9:16 (portrait) recommended
- **Optimization**: WebP format provides good quality at smaller file size

## Verification

Once frames are in place, the ScrollyCanvas component will:
- Preload all frames on mount
- Display a loading indicator
- Scrub through frames based on scroll position
- Console log "✓ Loaded 89 frames" when ready
