# Deploy to GitHub Pages with Custom Domain (melodynazar.com)

## Step 1: Prepare Your Repository

1. **Make sure all changes are committed:**
   ```bash
   git add .
   git commit -m "Setup for GitHub Pages deployment"
   git push origin main
   ```

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository on GitHub.com
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

## Step 3: Set Up Custom Domain

### Using melodynazar.com

1. **In your domain registrar** (where you bought melodynazar.com):
   - Add these DNS records:
     - **Type**: `A`
     - **Name**: `@` (or root domain)
     - **Value**: `185.199.108.153`
     - **Value**: `185.199.109.153`
     - **Value**: `185.199.110.153`
     - **Value**: `185.199.111.153`
   
   - OR use CNAME:
     - **Type**: `CNAME`
     - **Name**: `@` (or `www`)
     - **Value**: `your-username.github.io`

2. **On GitHub**:
   - Go to repository **Settings** → **Pages**
   - In **Custom domain**, enter: `melodynazar.com`
   - Check **Enforce HTTPS** (after DNS propagates)

## Step 4: Deploy

### Method 1: Using GitHub Actions (Automatic - Recommended)

The workflow is already set up! Just push to main:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

GitHub Actions will automatically:
- Build your project
- Deploy to `gh-pages` branch
- Your site will be live at your custom domain

### Method 2: Manual Deploy

```bash
npm run deploy
```

This will:
- Build your project
- Deploy to `gh-pages` branch
- Your site will be available at your custom domain

## Step 5: Verify Deployment

1. Wait 5-10 minutes for DNS to propagate
2. Visit your custom domain: `https://melodynazar.com`
3. Check GitHub Pages settings show your custom domain

## Important Files Created

- ✅ `public/CNAME` - Contains your custom domain
- ✅ `public/.nojekyll` - Required for Vite builds on GitHub Pages
- ✅ `.github/workflows/deploy.yml` - Automatic deployment workflow
- ✅ `vite.config.ts` - Configured with base: '/'

## Troubleshooting

### Site not loading?
- Wait 10-20 minutes for DNS propagation
- Check DNS records are correct
- Verify CNAME file is in `public/` folder

### 404 errors?
- Make sure `base: '/'` in `vite.config.ts`
- Ensure `.nojekyll` file exists in `public/`
- Check GitHub Pages is using `gh-pages` branch

### HTTPS not working?
- Wait for DNS to fully propagate (can take up to 48 hours)
- Check "Enforce HTTPS" in GitHub Pages settings
- Clear browser cache

### Need to update domain?
1. Update `public/CNAME` file
2. Commit and push
3. Update DNS records at your registrar

## Next Steps

After deployment:
1. Your site will be live at your custom domain
2. Any push to `main` branch will auto-deploy
3. Check GitHub Actions tab to see deployment status

