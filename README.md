# Womble Labs Demos

A collection of interactive 3D demos showcasing Gaussian Splat technology and Three.js implementations.

## Demos

### 🏠 LoD Compositor (`lod.html`)
Interactive Level of Detail (LoD) demonstration for Gaussian Splats
- **Purpose**: Gain intuition about chunk loading for Gaussian splats
- **Features**: Dynamic splat scaling compensations, memory usage visualization
- **Layout**: Individual chunks (1%, 9%, 90% memory) and composites
- **Controls**: WASD movement, Q/E for up/down, interactive GUI sliders

### 🌲 Thanos Splat (`forest.html`)
Epic Thanos-themed splat destruction experience
- **Objective**: Defeat all 3 infinity drop bears, then end the universe with one more snap
- **Features**: Raycasting, disintegration effects, cursor animations
- **Controls**: Point to select, click to delete, WASD movement
- **Special Effects**: Purple cursor flashing, snap animations

### 📊 Additional Files
- `index.html` - Main demo showcase
- `test.html` - Development testing
- `thanos_snap_demo.html` - Thanos snap demonstration

## Technology Stack

- **Three.js** - 3D graphics library
- **Spark.js** - Gaussian Splat rendering
- **lil-gui** - Interactive controls
- **Vanilla JavaScript** - No framework dependencies

## Local Development

1. Serve files with a local server (required for CORS):
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

2. Open `http://localhost:8000` in your browser

## Deployment

This project is optimized for static hosting on platforms like:
- Vercel
- Netlify  
- GitHub Pages
- Any static file server

## Assets

- **3D Models**: `.ply` Gaussian splat files in `/assets/`
- **Cursors**: Custom Thanos-themed cursors in `/assets/cursor/`
- **Textures**: Various image assets for effects

## Browser Compatibility

- Modern browsers with WebGL support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

---

Built with ❤️ by Womble Labs
