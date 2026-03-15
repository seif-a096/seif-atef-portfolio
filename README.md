# Seif Atef Portfolio

A cinematic, interactive portfolio built with React, TypeScript, and GPU-accelerated visuals.

The site combines smooth section choreography, animated UI layers, a custom reveal lens hero, WebGL-driven skills visualization, project galleries, certifications, and social/contact surfaces in one cohesive experience.

## Live Deployment

[![Live on Vercel](https://img.shields.io/badge/Live%20Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://seif-atef-portfolio.vercel.app/)

## Live Site Preview

| Hero Base                                     | Hero Reveal                                       |
| --------------------------------------------- | ------------------------------------------------- |
| ![Portfolio hero base](./src/assets/base.png) | ![Portfolio hero reveal](./src/assets/reveal.png) |

### Hero Visual Pipeline

- The portrait visuals are based on a generated 3D character model workflow.
- Using a 3D pipeline makes lighting behavior more physically consistent, so shadows, highlights, and facial depth read naturally.
- The exported renders are then used as the base/reveal image pair inside the interactive hero lens.

## Tech Stack Icons

### Core

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-111827?style=for-the-badge&logo=framer&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### WebGL and 3D

![WebGL](https://img.shields.io/badge/WebGL-GPU%20Rendering-990000?style=for-the-badge&logo=webgl&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-111111?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-0B0E11?style=for-the-badge&logo=react&logoColor=white)
![Drei](https://img.shields.io/badge/Drei-R3F%20Helpers-141414?style=for-the-badge&logo=threedotjs&logoColor=white)

### Tooling and Deploy

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![TypeScript ESLint](https://img.shields.io/badge/typescript--eslint-4B32C3?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Core Experience

- Immersive hero with an interactive image reveal lens.
- Animated navigation and section transitions.
- Reusable section system with motion-based reveal wrappers.
- Lazy-loaded heavy sections for better initial load performance.
- 3D skills cloud powered by WebGL.
- Project gallery with reusable project cards.
- Certifications gallery and contact hub.
- Startup loader with explicit user choice for sound.
- Responsive behavior across desktop, tablet, and mobile breakpoints.

## Technologies and Packages

### Runtime Dependencies

| Package            | Role in this project                                          |
| ------------------ | ------------------------------------------------------------- |
| react              | UI rendering and component architecture.                      |
| react-dom          | DOM integration for React rendering.                          |
| framer-motion      | Motion orchestration, transitions, and animated interactions. |
| three              | Core 3D engine and rendering primitives.                      |
| @react-three/fiber | React renderer for Three.js scenes.                           |
| @react-three/drei  | Helper abstractions for React Three Fiber scenes.             |
| react-icons        | Icon system used across UI controls and badges.               |

### Development Dependencies

| Package                     | Role in this project                                 |
| --------------------------- | ---------------------------------------------------- |
| vite                        | Fast dev server and production bundling.             |
| @vitejs/plugin-react        | React integration and fast refresh support for Vite. |
| typescript                  | Static typing and compile-time checks.               |
| @types/react                | Type definitions for React.                          |
| @types/react-dom            | Type definitions for React DOM.                      |
| @types/node                 | Node.js type definitions for tooling/config files.   |
| @types/three                | Type definitions for Three.js.                       |
| eslint                      | Linting engine.                                      |
| @eslint/js                  | Base ESLint rule presets.                            |
| typescript-eslint           | TypeScript-aware linting rules and parser support.   |
| eslint-plugin-react-hooks   | Enforces safe and correct React Hooks usage.         |
| eslint-plugin-react-refresh | Lint support for React fast refresh constraints.     |
| globals                     | Shared global environment definitions for linting.   |

## Brief Architecture Notes

- Section composition is centralized in App-level orchestration, while visual blocks are extracted into focused components.
- Expensive visual pieces are lazy-loaded with suspense fallbacks to reduce first-paint cost.
- Styling uses a mix of shared global styles and CSS Modules in reusable UI components.
- Motion behavior is intentionally layered: macro section reveals, micro component transitions, and shader/3D visuals.

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── resume/
│   └── resume.tex
├── src/
│   ├── assets/
│   │   ├── about_me.jpg
│   │   ├── base.png
│   │   ├── contact_me.jpeg
│   │   ├── hero.png
│   │   ├── react.svg
│   │   ├── reveal.png
│   │   └── certs/
│   ├── components/
│   │   ├── AnimatedHobbyStickers.tsx
│   │   ├── CertificationsGallery.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingSkillsCloud.tsx
│   │   ├── HeroHud.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SectionBlock.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── ProjectsData.ts
│   │   ├── SkillsData.ts
│   │   └── CertificationsData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── BlobBackground.tsx
│   ├── CursorLens.tsx
│   ├── framer-shim.ts
│   ├── index.css
│   ├── loader.css
│   └── main.tsx
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Local Development

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (recommended)

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Author

### Seif Atef

[![Seif's GitHub Stats](https://github-readme-stats.vercel.app/api?username=seif-a096&show_icons=true&hide_border=true&rank_icon=github&include_all_commits=true)](https://github.com/seif-a096)

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Live%20Site-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://seif-atef-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-seif--a096-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seif-a096)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-seif--atef-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seif-atef/)
