# Fix: "API endpoint not found" Error on GitHub Pages

## The Problem

Your site is deployed on **GitHub Pages**, which only serves static files. The API endpoints in `/api` folder won't work because GitHub Pages doesn't support serverless functions.

## Solution Options

### ✅ Option 1: Deploy to Vercel (Recommended - Best Solution)

Vercel supports serverless functions, so your API endpoints will work perfectly.

#### Steps:

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your repository**:
   - Select: `nzrnaghme/Cursor` (or your repo name)
   - Vercel will auto-detect Vite settings

4. **Configure Environment Variable**:
   - Go to **Settings** → **Environment Variables**
   - Add: `GITHUB_TOKEN` with your GitHub Personal Access Token
   - Make sure to select all environments (Production, Preview, Development)

5. **Create GitHub Token** (if you don't have one):
   - Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token (classic)**
   - Name: "Portfolio API"
   - Select scope: ✅ `repo`
   - Click **Generate** and copy the token
   - Add it to Vercel as `GITHUB_TOKEN`

6. **Deploy**:
   - Click **Deploy**
   - Wait ~2 minutes
   - Your site will be live with working API endpoints!

7. **Add Custom Domain** (optional):
   - In Vercel: **Settings** → **Domains**
   - Add: `melodynazar.com`
   - Update DNS records at your domain registrar to point to Vercel

#### Benefits:
- ✅ API endpoints work immediately
- ✅ Automatic deployments on git push
- ✅ Free tier is generous
- ✅ Easy custom domain setup

---

### Option 2: Use Formspree for Email (Works on GitHub Pages)

If you want to keep GitHub Pages, use Formspree for email subscriptions (no backend needed).

#### Steps:

1. **Sign up at [formspree.io](https://formspree.io)** (free: 50 submissions/month)

2. **Create a new form**:
   - Click "New Form"
   - Name it "Newsletter"
   - Copy the Form ID (looks like: `xvgkqyzw`)

3. **Set Environment Variable**:
   - Create `.env` file in project root:
     ```
     VITE_FORMPREE_FORM_ID=your_form_id_here
     ```
   - Or update `src/services/formspreeService.ts` directly

4. **The code is already updated** to use Formspree as fallback!

5. **Test it**:
   - The email form will automatically try Formspree if GitHub API fails

#### Note:
- Visitor counter will still work (reads from GitHub README)
- Email will work via Formspree
- No serverless functions needed

---

### Option 3: Deploy API Separately to Vercel

Keep frontend on GitHub Pages, deploy API to Vercel separately.

#### Steps:

1. **Deploy API to Vercel**:
   - Create a new Vercel project
   - Only deploy the `/api` folder
   - Get the Vercel URL (e.g., `https://your-api.vercel.app`)

2. **Update Frontend**:
   - Set environment variable: `VITE_API_URL=https://your-api.vercel.app`
   - Or update `githubService.ts` to use the Vercel API URL

---

## Quick Test

After deploying to Vercel:

1. Visit your Vercel URL
2. Open browser console (F12)
3. Try subscribing to newsletter
4. Check Network tab - should see `/api/save-email` with status 200 ✅

## Current Status

✅ Code is updated to try Formspree as fallback
✅ Error handling improved
✅ Ready for Vercel deployment

**Recommended**: Deploy to Vercel (Option 1) for the best experience!

