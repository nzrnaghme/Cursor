# Quick Fix for 405 Method Not Allowed Error

## The Problem

You're getting a **405 Method Not Allowed** error because:
- Your site is on **GitHub Pages** (static hosting)
- GitHub Pages doesn't support POST requests to `/api/*` routes
- The API endpoints need a serverless platform like Vercel

## Immediate Solutions

### ✅ Solution 1: Set Up Formspree (5 minutes - Works Now)

1. **Go to [formspree.io](https://formspree.io)** and sign up (free)

2. **Create a new form**:
   - Click "New Form"
   - Name: "Newsletter"
   - Copy the **Form ID** (looks like: `xvgkqyzw`)

3. **Add Form ID to your code**:
   
   **Option A: Environment Variable (Recommended)**
   - Create `.env` file in project root:
     ```
     VITE_FORMPREE_FORM_ID=your_form_id_here
     ```
   - Rebuild and redeploy

   **Option B: Direct in Code**
   - Edit `src/services/formspreeService.ts`
   - Replace `'YOUR_FORM_ID_HERE'` with your Form ID
   - Rebuild and redeploy

4. **Test it**:
   - The form will automatically use Formspree when GitHub API fails
   - You'll receive emails at the address you set in Formspree

### ✅ Solution 2: Deploy to Vercel (15 minutes - Best Long-term)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Import your repository**:
   - Click "Add New Project"
   - Select: `nzrnaghme/Cursor` (or your repo)
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Add Environment Variable**:
   - Go to **Settings** → **Environment Variables**
   - Add: `GITHUB_TOKEN` = your GitHub Personal Access Token
   - Select all environments
   - Click "Save"

4. **Create GitHub Token** (if needed):
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` scope
   - Copy and add to Vercel

5. **Redeploy**:
   - After adding the token, trigger a new deployment
   - Your API endpoints will work!

6. **Update Custom Domain** (optional):
   - In Vercel: Settings → Domains
   - Add: `melodynazar.com`
   - Update DNS at your domain registrar

## What I Just Fixed

✅ Updated error handling to catch 405 errors
✅ Improved Formspree fallback to trigger on any API failure
✅ Added better error messages

## Current Status

The code will now:
1. Try GitHub API first
2. If it fails (404, 405, or any error), automatically try Formspree
3. Show helpful error messages if Formspree isn't configured

## Next Steps

**Choose one:**
- **Quick fix**: Set up Formspree (Solution 1) - works in 5 minutes
- **Best solution**: Deploy to Vercel (Solution 2) - full API support

After setup, the email subscription will work! 🎉

