# Quantum Physics Visualization

An interactive educational website exploring quantum mechanics through a real-time WebGL double-slit experiment simulation.

🌐 **Live Site:** quant.tannerwj.com

## Features

- **Interactive Double-Slit Simulation**: Real-time WebGL/Three.js simulation demonstrating wave-particle duality
  - Adjustable slit width and spacing
  - Multiple particle types (electron, photon, buckyball)
  - Toggle detector to observe wave function collapse
  - Physics-accurate interference patterns using Huygens-Fresnel principle

- **Educational Content**: Progressive depth articles covering:
  - The Double-Slit Experiment
  - Quantum Entanglement
  - Superposition & Schrödinger's Cat
  - Wave Function Collapse & Measurement
  - Bell's Theorem
  - Quantum Decoherence

- **Responsive Design**: Fully mobile-friendly with touch controls

## Tech Stack

- **Framework**: SvelteKit 2.0
- **3D Graphics**: Three.js
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Language**: TypeScript

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

The dev server includes:
- Hot module reloading
- Fast refresh for Svelte components
- TypeScript type checking

### Project Structure

```
src/
├── routes/              # SvelteKit pages
│   ├── +page.svelte    # Home with simulation
│   └── learn/          # Educational content pages
├── lib/
│   ├── components/     # Svelte components
│   │   ├── Simulation.svelte
│   │   ├── Controls.svelte
│   │   └── NavBar.svelte
│   └── simulation/     # WebGL simulation logic
│       ├── scene.ts
│       ├── physics.ts
│       ├── waves.ts
│       └── particles.ts
└── app.css             # Global styles
```

## Building for Production

```bash
# Build static site
npm run build

# Preview production build locally
npm run preview
```

The build outputs to `.svelte-kit/cloudflare/` with the Cloudflare Pages adapter.

## Deployment to Cloudflare Pages

### Option 1: Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Create a new project
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Node version**: 18 or higher
5. Deploy

### Option 2: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy .svelte-kit/cloudflare --project-name=quant
```

### Custom Domain

After deployment:
1. Go to your Pages project settings
2. Add custom domain: `quant.tannerwj.com`
3. Cloudflare will automatically configure DNS

## Physics Implementation

### Double-Slit Interference

The simulation uses the **Huygens-Fresnel principle** to model wave interference:

```
I(y) = I₀ · cos²(πd·y / λL)
```

where:
- `d` = slit separation
- `y` = position on detector screen
- `λ` = de Broglie wavelength (h/p)
- `L` = distance to screen

### Particle Behavior

Particles are sampled from the probability distribution |ψ|² using Monte Carlo methods. When the detector is ON, the wave function collapses and interference disappears.

### Wave Function

The total wave function with both slits open is a superposition:

```
ψ_total = ψ_slit1 + ψ_slit2
```

Probability density: `P(y) = |ψ_total|²`

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires WebGL support.

## Performance Notes

- Targets 60 FPS on modern hardware
- Particle count capped at 1000 to maintain performance
- Uses `requestAnimationFrame` for smooth animation
- Responsive canvas sizing for all screen sizes

## Contributing

Feel free to open issues or submit PRs for:
- Physics accuracy improvements
- Performance optimizations
- Educational content enhancements
- Bug fixes

## License

MIT License - feel free to use for educational purposes.

## Acknowledgments

- Physics calculations based on standard quantum mechanics textbooks
- Inspired by quantum physics education efforts worldwide
- Built with modern web technologies to make quantum mechanics accessible

---

**Note**: This is an educational visualization. While physics-accurate, it simplifies certain aspects for clarity and performance.
