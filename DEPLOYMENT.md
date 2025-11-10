# Deployment Guide for Portfolio Website

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website** (Easiest):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Or Deploy via CLI**:
   ```bash
   vercel
   ```

**Vercel automatically:**
- Detects Vite build settings
- Runs `npm run build`
- Deploys your site
- Provides HTTPS and custom domain support

---

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Or use Netlify Website**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your GitHub repo

---

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/' // Replace with your GitHub repo name
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Before Deploying

### 1. Build your project locally to test:
```bash
npm run build
npm run preview
```

### 2. Check that all assets are in the `public` folder:
- `/images/profile-photo.png`
- `/relaxing-piano.mp3`
- Any project images/videos

### 3. Make sure image paths use `/` not `./public/`:
- ✅ Correct: `src="/images/profile-photo.png"`
- ❌ Wrong: `src="./public/images/profile-photo.png"`

### 4. Commit and push your changes:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Recommended: Vercel Deployment Steps

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to vercel.com** and sign in with GitHub

3. **Click "Add New Project"**

4. **Select your repository**

5. **Configure**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Click "Deploy"**

7. **Your site will be live in ~2 minutes!**

---

## Custom Domain (Optional)

After deployment, you can add a custom domain:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management

---

## Troubleshooting

### Images not loading?
- Make sure images are in `public/` folder
- Use paths starting with `/` (e.g., `/images/photo.png`)
- Rebuild after adding new assets

### Build errors?
- Run `npm run build` locally first
- Check console for errors
- Make sure all dependencies are in `package.json`

### 404 errors on routes?
- For SPA routing, configure redirects:
  - Vercel: Add `vercel.json` with redirect rules
  - Netlify: Add `_redirects` file in `public/` folder

