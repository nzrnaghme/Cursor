# How to Test Email Subscription and Visitor Counter

## Method 1: Test Locally (Quick Check)

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open Browser
- Go to `http://localhost:5173` (or the port shown in terminal)
- Open Developer Tools (F12 or Right-click → Inspect)

### Step 3: Test Visitor Counter
1. Look at the **bottom-left corner** of the page
2. You should see: `👁️ X visitors` (where X is a number)
3. **Check Console** (F12 → Console tab):
   - If you see errors, they'll show what's wrong
   - Look for messages like "Error counting visitor" or "Error getting visitor count"

### Step 4: Test Email Subscription
1. Scroll to the **Contact section** (or navigate to `/contact`)
2. Find the newsletter subscription form
3. Enter a test email (e.g., `test@example.com`)
4. Click **Subscribe**
5. **Check what happens**:
   - ✅ **Success**: Shows "Thank you for subscribing!" in green
   - ❌ **Error**: Shows error message in red
6. **Check Console** for detailed error messages

## Method 2: Test on Deployed Site

### If Deployed on Vercel:
1. Go to your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
2. Follow the same steps as Method 1
3. **Important**: Check if API endpoints work:
   - Open Developer Tools (F12)
   - Go to **Network** tab
   - Try subscribing to newsletter
   - Look for requests to `/api/save-email`
   - Check the response status:
     - ✅ **200**: Working!
     - ❌ **404**: API not deployed or wrong URL
     - ❌ **500**: Backend error (check GITHUB_TOKEN)

### If Deployed on GitHub Pages:
1. Go to your GitHub Pages URL (e.g., `https://nzrnaghme.github.io/Cursor`)
2. **Note**: API endpoints won't work on GitHub Pages (static hosting only)
3. Visitor counter should still work (reads from GitHub README)
4. Email subscription will show an error (needs Vercel/Netlify for API)

## Method 3: Check API Endpoints Directly

### Test Visitor Count API:
```bash
# Replace with your actual URL
curl https://your-site.vercel.app/api/visitor-count
```

**Expected Response:**
```json
{
  "success": true,
  "count": 123
}
```

### Test Email API (POST):
```bash
# Replace with your actual URL
curl -X POST https://your-site.vercel.app/api/save-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email saved successfully"
}
```

## Method 4: Check Browser Console

### Open Console:
1. Press **F12** or **Right-click → Inspect**
2. Go to **Console** tab
3. Look for:
   - ✅ **No errors**: Everything working
   - ❌ **Red errors**: Something is wrong

### Common Errors to Look For:

**"Failed to fetch" or "Network error"**
- API endpoint not accessible
- Check if deployed on Vercel
- Check if API routes are configured

**"API endpoint not found"**
- API functions not deployed
- Check Vercel Functions tab

**"GITHUB_TOKEN not set"**
- Environment variable missing
- Go to Vercel → Settings → Environment Variables

**"CORS error"**
- Should be fixed now, but if you see it, check API CORS headers

## Method 5: Check Vercel Dashboard (If Using Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Functions** tab
4. Check if you see:
   - `/api/save-email`
   - `/api/increment-visitor`
   - `/api/visitor-count`
5. Click on each function to see:
   - Invocation count
   - Error logs
   - Response times

## Method 6: Check GitHub Actions (For Email/Visitor Updates)

1. Go to your GitHub repository
2. Click **Actions** tab
3. Look for workflow runs:
   - `save-email` workflow (when email is submitted)
   - `increment-visitor` workflow (when visitor count updates)
4. Check if workflows are:
   - ✅ **Green checkmark**: Working!
   - ❌ **Red X**: Failed (check logs)

## Method 7: Verify Environment Variables (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Check if `GITHUB_TOKEN` exists:
   - ✅ **Present**: Good!
   - ❌ **Missing**: Add it (see FIX_API_FEATURES.md)

## Quick Checklist

- [ ] Visitor counter shows a number (not blank)
- [ ] Email form shows success message when submitted
- [ ] No errors in browser console
- [ ] API endpoints return 200 status (check Network tab)
- [ ] GITHUB_TOKEN is set in Vercel (if using Vercel)
- [ ] GitHub Actions workflows are enabled

## Troubleshooting

### Visitor Counter Shows 0:
- Check browser console for errors
- Verify GitHub README has: `👁️ Visitor Count: X`
- Check Network tab for API call status

### Email Subscription Fails:
- Check browser console for specific error
- Verify GITHUB_TOKEN is set in Vercel
- Check Vercel Functions tab for errors
- Verify GitHub Actions workflow is enabled

### API Returns 404:
- Make sure you're on Vercel (not GitHub Pages)
- Check that API files are in `/api` folder
- Verify `vercel.json` is configured correctly



