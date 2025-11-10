# DNS Setup Guide for melodynazar.com

## Current Status
The error "DNS_PROBE_FINISHED_NXDOMAIN" means the DNS records for melodynazar.com are not configured yet.

## Step 1: Verify GitHub Pages is Working

First, check if your site is accessible via GitHub Pages:
- **Temporary URL**: `https://nzrnaghme.github.io/Cursor`

If this works, your deployment is successful! Now you just need to configure DNS.

## Step 2: Configure DNS at Your Domain Registrar

You need to add DNS records at wherever you purchased `melodynazar.com` (GoDaddy, Namecheap, Cloudflare, etc.)

### Option A: A Records (Recommended)

Add these 4 A records:

1. **Record 1:**
   - Type: `A`
   - Name: `@` (or leave blank, or use root domain)
   - Value: `185.199.108.153`
   - TTL: `3600` (or default)

2. **Record 2:**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `185.199.109.153`
   - TTL: `3600`

3. **Record 3:**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `185.199.110.153`
   - TTL: `3600`

4. **Record 4:**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `185.199.111.153`
   - TTL: `3600`

### Option B: CNAME Record (Alternative)

If your registrar supports CNAME for root domain:

- Type: `CNAME`
- Name: `@` (or root)
- Value: `nzrnaghme.github.io`
- TTL: `3600`

## Step 3: Enable GitHub Pages Custom Domain

1. Go to: https://github.com/nzrnaghme/Cursor/settings/pages
2. Under **Custom domain**, enter: `melodynazar.com`
3. Check **Enforce HTTPS**
4. Click **Save**

## Step 4: Wait for DNS Propagation

- **Minimum**: 5-10 minutes
- **Average**: 1-2 hours
- **Maximum**: 24-48 hours

You can check DNS propagation status at:
- https://dnschecker.org/#A/melodynazar.com
- https://www.whatsmydns.net/#A/melodynazar.com

## Step 5: Verify It's Working

Once DNS propagates, you should be able to access:
- `https://melodynazar.com`
- `https://www.melodynazar.com` (if you also set up www subdomain)

## Troubleshooting

### Still seeing DNS error after 24 hours?
1. Double-check DNS records are correct
2. Verify domain is not expired
3. Check if domain registrar has any restrictions
4. Try clearing browser cache
5. Try accessing from different network/device

### Site loads but shows GitHub 404?
- Make sure GitHub Pages is enabled
- Verify `gh-pages` branch exists
- Check GitHub Actions workflow completed successfully

### HTTPS not working?
- Wait for DNS to fully propagate
- Check "Enforce HTTPS" in GitHub Pages settings
- It may take additional time for SSL certificate to be issued

## Quick Checklist

- [ ] DNS A records added at domain registrar
- [ ] GitHub Pages enabled in repository settings
- [ ] Custom domain set to `melodynazar.com` in GitHub
- [ ] "Enforce HTTPS" checked
- [ ] Waited at least 10 minutes for DNS propagation
- [ ] Verified site works at `nzrnaghme.github.io/Cursor`

