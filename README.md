# Mira Ellery — Architecture Portfolio

A React and Vite portfolio presented as an interactive architectural drawing board. The landing composition contains four illustrated section sheets; selecting one zooms into a continuous About → Projects → Skills → Contact presentation.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Structure

- `src/components/` — reusable board, drawing, transition and annotation components
- `src/sections/` — home and section presentation views
- `src/data/` — navigation, project, skill and section copy
- `src/styles/` — shared typography, design tokens and responsive styles

The supplied Statue of Liberty blueprint images in `src/assets/blueprints/` are visual references only and are never displayed. A custom SVG line drawing traces the monument from its pedestal outline through the figure and final details as GSAP ScrollTrigger maps progress across the four continuous chapters. Project cards use independent, original blueprint thumbnails for a house, a communal table and an orchard. Fictional profile, studio, school, project and location details live in `src/data/`.
