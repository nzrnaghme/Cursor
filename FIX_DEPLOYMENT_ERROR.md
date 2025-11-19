# Fix GitHub Pages Deployment Error

## Problem
The error shows: `Permission to nzrnaghme/Cursor.git denied to github-actions[bot]`

This happens because:
1. The repository name on GitHub might still be "Cursor" (even though remote URL was changed)
2. GitHub Actions needs write permissions enabled

## Solution

### Step 1: Check Repository Name on GitHub
1. Go to: https://github.com/nzrnaghme
2. Check if the repository is named:
   - ❌ `Cursor` (old name)
   - ✅ `FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-` (new name)

### Step 2: Rename Repository (if needed)
If the repository is still named "Cursor":
1. Go to repository **Settings** → **General**
2. Scroll down to **Repository name**
3. Rename to: `FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-`
4. Click **Rename**

### Step 3: Enable GitHub Actions Permissions
1. Go to repository **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
3. Check ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### Step 4: Verify Remote URL
Run this command to check:
```bash
git remote -v
```

Should show:
```
origin  https://github.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-.git
```

If it shows "Cursor", update it:
```bash
git remote set-url origin https://github.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-.git
```

### Step 5: Re-run the Workflow
1. Go to **Actions** tab on GitHub
2. Find the failed workflow
3. Click **Re-run all jobs**

## Alternative: Use Manual Deploy
If GitHub Actions still doesn't work, you can deploy manually:

```bash
npm run deploy
```

This uses `gh-pages` package directly and should work if you have push access.

## Verify Fix
After fixing, the workflow should:
- ✅ Build successfully
- ✅ Push to `gh-pages` branch
- ✅ Deploy to your custom domain

