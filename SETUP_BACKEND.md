# Backend Setup Guide for Email Subscription and Visitor Counter

This guide explains how to set up the backend services for email subscriptions and visitor counting.

## Option 1: Using Vercel (Recommended - Easiest)

### Step 1: Deploy API Functions to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy the API functions**:
   ```bash
   vercel
   ```
   
   Follow the prompts to link your project.

3. **Set up environment variable**:
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add: `GITHUB_TOKEN` with your GitHub Personal Access Token

4. **Update API endpoints in `src/services/githubService.ts`**:
   Replace `/api/` with your Vercel deployment URL:
   ```typescript
   const API_BASE = 'https://your-project.vercel.app'
   ```

### Step 2: Create GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name (e.g., "Portfolio API")
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Add it to Vercel environment variables as `GITHUB_TOKEN`

### Step 3: Enable GitHub Actions

The workflows are already set up in `.github/workflows/`. They will automatically:
- Save emails to `subscribers.txt`
- Update visitor count in `README.md`

## Option 2: Using Netlify Functions

1. **Deploy to Netlify**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

2. **Set environment variable**:
   - Go to Netlify dashboard → **Site settings** → **Environment variables**
   - Add: `GITHUB_TOKEN`

3. **Update API endpoints** in `src/services/githubService.ts` to use your Netlify URL.

## Option 3: Using GitHub Pages + GitHub Actions Only

If you don't want to use a serverless function, you can modify the approach:

1. **Use GitHub Actions webhook** (requires public repository)
2. **Use a service like Formspree** for email collection (free tier available)
3. **Use a simple counter service** like `visitor-badge` or similar

## Testing

After setup:

1. **Test email subscription**:
   - Fill out the newsletter form
   - Check `subscribers.txt` file in your repository
   - Emails should appear with timestamps

2. **Test visitor counter**:
   - Visit your website
   - Check `README.md` - the count should increment
   - The counter appears in the bottom-left corner

## Troubleshooting

### Emails not saving?
- Check GitHub Actions logs in the **Actions** tab
- Verify `GITHUB_TOKEN` is set correctly
- Ensure repository has write permissions

### Visitor count not updating?
- Check browser console for errors
- Verify API endpoints are correct
- Check GitHub Actions workflow runs successfully

### API returns 401/403?
- Your GitHub token might be expired or have wrong permissions
- Regenerate token with `repo` scope

## Alternative: Simple Email Service

If GitHub Actions is too complex, you can use:
- **Formspree** (free tier: 50 submissions/month)
- **EmailJS** (free tier: 200 emails/month)
- **SendGrid** (free tier: 100 emails/day)

Just update the `handleSubmit` function in `Contact.tsx` to use their API instead.

