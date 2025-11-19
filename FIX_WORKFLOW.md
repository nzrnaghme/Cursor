# Fix GitHub Actions Deployment

## Current Issue
The "Deploy to GitHub Pages" workflow is failing with permission errors, but the automatic "pages build and deployment" is working.

## Solution Options

### Option 1: Use Manual Deploy (Easiest - Recommended)
Since the automatic Pages deployment is working, you can just use manual deploy:

```bash
npm run deploy
```

This will build and push to `gh-pages` branch, and GitHub Pages will automatically deploy it.

### Option 2: Fix GitHub Actions Workflow

#### Step 1: Create Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name it: "GitHub Pages Deploy"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)

#### Step 2: Add Token to Repository Secrets
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GH_PAGES_TOKEN`
4. Value: Paste your personal access token
5. Click **Add secret**

#### Step 3: Update Workflow
The workflow has been updated to use `personal_token` instead of `github_token`.

#### Step 4: Enable Workflow Permissions
1. Go to repository **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
3. Click **Save**

### Option 3: Disable GitHub Actions, Use Manual Only
If you prefer to deploy manually:

1. Delete or disable the workflow file
2. Always use: `npm run deploy`

## Recommended: Use Manual Deploy
Since automatic Pages deployment is working, the simplest solution is:

1. **Remove the GitHub Actions workflow** (or just ignore it)
2. **Use manual deploy** when you want to update:
   ```bash
   npm run deploy
   ```

The site will still update automatically from the `gh-pages` branch!

## Verify Deployment
After fixing:
1. Check **Actions** tab - workflow should succeed (or use manual deploy)
2. Check **Settings** → **Pages** - should show deployment status
3. Visit your site: https://melodynazar.com

