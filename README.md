# Portfolio Website

A modern, visually stunning portfolio website inspired by [Lusion.co](https://lusion.co/), built with React, TypeScript, and cutting-edge animation libraries.

## Features

- **3D Graphics** - Interactive 3D elements using Three.js and React Three Fiber
- **Smooth Animations** - Framer Motion for fluid, scroll-triggered animations
- **Modern Design** - Dark theme with elegant typography and spacing
- **Interactive Elements** - Hover effects, parallax scrolling, and dynamic interactions
- **Responsive Design** - Fully responsive across all devices
- **TypeScript** - Fully type-safe codebase
- **Performance Optimized** - Optimized animations and lazy loading

## Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Advanced animations and gestures
- **Three.js** - 3D graphics and WebGL
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **React Intersection Observer** - Scroll-triggered animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx      # Animated navigation menu
│   ├── Home.tsx           # Hero section with 3D background
│   ├── Work.tsx           # Interactive project showcase
│   ├── About.tsx          # About section with animations
│   ├── Contact.tsx        # Contact form and info
│   └── Scene3D.tsx        # 3D scene component
├── App.tsx                # Main app component
├── main.tsx               # Entry point
├── App.css                # App styles
└── index.css              # Global styles
```

## Key Features Inspired by Lusion.co

### Animations
- **Scroll-triggered animations** - Elements animate as you scroll
- **Parallax effects** - Depth and dimension through layered scrolling
- **Smooth transitions** - Fluid page transitions and interactions
- **Hover effects** - Interactive feedback on all clickable elements

### 3D Graphics
- **Interactive 3D sphere** - Rotating 3D element in hero section
- **WebGL rendering** - Hardware-accelerated graphics
- **Dynamic lighting** - Realistic lighting effects

### Design Elements
- **Dark theme** - Modern black and white color scheme
- **Large typography** - Bold, impactful headings
- **Minimalist layout** - Clean, spacious design
- **Project cards** - Interactive project showcase with hover effects

## Customization

### Update Personal Information

1. **Home Section** (`src/components/Home.tsx`):
   - Update the main title and description
   - Modify the 3D scene if needed

2. **Work Section** (`src/components/Work.tsx`):
   - Update the `projects` array with your actual projects
   - Add project images, categories, and tags

3. **About Section** (`src/components/About.tsx`):
   - Update the about text with your information

4. **Contact Section** (`src/components/Contact.tsx`):
   - Update email addresses and location
   - Modify social links
   - Customize newsletter form

5. **Navigation** (`src/components/Navigation.tsx`):
   - Update social links
   - Change location text
   - Update copyright information

### Styling

- Modify colors in component CSS files
- Adjust animation timings in component files
- Customize 3D scene in `Scene3D.tsx`

### 3D Scene Customization

Edit `src/components/Scene3D.tsx` to:
- Change 3D object (sphere, cube, etc.)
- Adjust colors and materials
- Modify rotation speed
- Add more 3D elements

## Animation Libraries

### Framer Motion
Used for:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Smooth scrolling

### Three.js / React Three Fiber
Used for:
- 3D graphics in hero section
- Interactive 3D elements
- WebGL rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: 3D features require WebGL support. Older browsers may not display 3D elements.

## Performance Tips

1. **Optimize Images** - Use WebP format and appropriate sizes
2. **Lazy Loading** - Components load as needed
3. **Animation Performance** - Uses GPU-accelerated transforms
4. **Code Splitting** - Vite automatically code-splits

## License

This project is open source and available for personal use.

---

**Note**: Remember to replace all placeholder content with your actual information before deploying!

## Credits

Inspired by the beautiful design and animations of [Lusion.co](https://lusion.co/)
