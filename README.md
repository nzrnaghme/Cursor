# Naghmeh (Melody) Nazar · Research Portfolio

Source for [melodynazar.com](https://melodynazar.com), a research and software-engineering portfolio focused on speech emotion recognition, affective computing, and responsible AI.

The site includes a thesis case study, manuscript and presentation status, selected projects, education, experience, research directions, contact links, and a downloadable research CV. Research plans and manuscripts are labeled separately from completed work and accepted publications.

## Run locally

Use Node.js 18 or later and npm:

```bash
npm ci
npm run dev
```

Vite prints the local development URL. To validate and preview the production build:

```bash
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` runs TypeScript checks and creates `dist/`. The tests cover reviewed content, local assets, navigation safeguards, and core text-color contrast. Browser checks should also include narrow screens, keyboard navigation, direct section links, and reduced-motion preferences.

## Project structure

- `src/data/content.ts`: identity, education, research, publications, projects, and experience
- `src/components/`: page sections, navigation, animations, and shared UI
- `src/index.css`: global styles, focus treatment, and anchor offsets
- `public/Naghmeh_Melody_Nazar_Research_CV.pdf`: downloadable research CV
- `public/images/`: portfolio images
- `index.html`: page metadata
- `.github/workflows/deploy.yml`: GitHub Pages build and deployment

The active app uses React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and tsParticles. See [CONTENT.md](CONTENT.md) for content-editing guidance and items that need owner verification before changing claims.

## Deployment

A push to `main` triggers the GitHub Pages workflow, which builds the site and publishes `dist/` to the `gh-pages` branch for `melodynazar.com`. Working branches and draft pull requests do not trigger that workflow. Review changes and validation results before merging to `main`.

## Legacy integrations

The repository also contains older newsletter and visitor-counter services and workflows. The current page does not render a subscription form or visitor counter. The legacy subscription workflow writes email addresses to repository files, commit messages, and logs; do not use it to collect personal data in a public repository. A private subscriber store and input-safe implementation would be needed before re-enabling this feature.
