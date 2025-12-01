# Fix SSL Certificate Error (NET::ERR_CERT_COMMON_NAME_INVALID)

## The Problem
Your browser shows "Your connection is not private" because the SSL certificate doesn't match your domain `melodynazar.com`.

## Solution: Enable HTTPS in GitHub Pages

### Step 1: Go to GitHub Pages Settings

1. Open your repository: https://github.com/nzrnaghme/Cursor
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)

### Step 2: Configure Custom Domain

1. Under **Custom domain**, you should see: `melodynazar.com`
2. If it's not there, enter: `melodynazar.com`
3. Click **Save**

### Step 3: Enable HTTPS (IMPORTANT!)

1. After saving the custom domain, wait 1-2 minutes
2. You should see a checkbox: **"Enforce HTTPS"**
3. ✅ **Check this box** (this is the key fix!)
4. Click **Save** again

### Step 4: Wait for SSL Certificate

GitHub automatically provisions SSL certificates via Let's Encrypt, but it takes time:
- **Minimum**: 5-10 minutes
- **Average**: 1-2 hours  
- **Maximum**: 24-48 hours

### Step 5: Verify DNS is Correct

Make sure your DNS records at your domain registrar are correct:

**A Records** (4 records needed):
- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

Check DNS propagation: https://dnschecker.org/#A/melodynazar.com

## Troubleshooting

### If "Enforce HTTPS" is grayed out or unavailable:

1. **DNS not propagated yet**: Wait 10-20 minutes, then refresh the GitHub Pages settings page
2. **Domain not verified**: Make sure the CNAME file is in your `gh-pages` branch
3. **Certificate pending**: GitHub is still issuing the certificate - wait up to 24 hours

### If certificate still shows error after 24 hours:

1. **Remove and re-add the domain**:
   - In GitHub Pages settings, clear the custom domain field
   - Click Save
   - Wait 5 minutes
   - Re-enter `melodynazar.com`
   - Click Save
   - Check "Enforce HTTPS"

2. **Check DNS records**: Verify all 4 A records are correct

3. **Clear browser cache**: Sometimes browsers cache old certificate errors

### Temporary Workaround (Not Recommended)

Users can click "Advanced" → "Proceed to melodynazar.com (unsafe)" but this is not ideal. The proper fix is enabling HTTPS in GitHub Pages.

## Quick Checklist

- [ ] Custom domain set to `melodynazar.com` in GitHub Pages settings
- [ ] "Enforce HTTPS" checkbox is checked
- [ ] DNS A records are correct (4 records)
- [ ] Waited at least 10 minutes after enabling HTTPS
- [ ] Cleared browser cache
- [ ] Tried incognito/private mode

## Expected Result

Once the SSL certificate is properly issued:
- ✅ Site loads at `https://melodynazar.com` (with padlock icon)
- ✅ No security warnings
- ✅ Green padlock in browser address bar




