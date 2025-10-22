# Cloudflare Cache Rules - Step-by-Step Setup

## Quick Reference

This guide provides the exact steps to configure Cloudflare cache rules for your GitHub Pages site.

---

## Prerequisites

- Site deployed to GitHub Pages: `pk13055.github.io`
- Custom domain: `pk13055.com`
- Domain DNS managed by Cloudflare

---

## Step-by-Step Instructions

### 1. Access Cache Rules

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your site: **pk13055.com**
3. In the left sidebar, go to: **Rules** → **Cache Rules**
4. Click **Create rule**

---

### Rule 1: Cache Hashed Assets (JS/CSS)

**Purpose**: Cache JavaScript and CSS files in `/assets/` folder for 1 year

1. Click **Create rule**
2. **Rule name**: `Cache Hashed Assets`
3. **When incoming requests match**:

   Click **Add** → Select **Custom filter expression**

   **First condition:**
   - Field: `URI Path`
   - Operator: `starts with`
   - Value: `/assets/`

   Click **And** to add second condition

   **Second condition:**
   - Field: `File extension`
   - Operator: `is in`
   - Value: `js css` (type both, separated by space)

4. **Then**:
   - Click **Then** dropdown
   - Select **Eligible for cache**
   - **Edge cache TTL**: Select `1 year`
   - **Browser cache TTL**: Select `1 year`
   - Toggle **Cache status header** to ON

5. Click **Deploy**

✅ Rule 1 complete!

---

### Rule 2: Cache Images

**Purpose**: Cache all image files for 1 year

1. Click **Create rule**
2. **Rule name**: `Cache Images`
3. **When incoming requests match**:

   Click **Add** → Select **Custom filter expression**

   - Field: `File extension`
   - Operator: `is in`
   - Value: `png jpg jpeg gif svg webp ico avif` (all separated by spaces)

4. **Then**:
   - Select **Eligible for cache**
   - **Edge cache TTL**: `1 year`
   - **Browser cache TTL**: `1 year`

5. Click **Deploy**

✅ Rule 2 complete!

---

### Rule 3: Cache Fonts (Optional)

**Purpose**: Cache font files for 1 year

1. Click **Create rule**
2. **Rule name**: `Cache Fonts`
3. **When incoming requests match**:

   - Field: `File extension`
   - Operator: `is in`
   - Value: `woff woff2 ttf otf eot`

4. **Then**:
   - Select **Eligible for cache**
   - **Edge cache TTL**: `1 year`
   - **Browser cache TTL**: `1 year`

5. Click **Deploy**

✅ Rule 3 complete!

---

### Rule 4: Bypass HTML Cache

**Purpose**: Always serve fresh HTML (never cache)

1. Click **Create rule**
2. **Rule name**: `Bypass HTML Cache`
3. **When incoming requests match**:

   Click **Add** → Select **Custom filter expression**

   **First condition:**
   - Field: `File extension`
   - Operator: `equals`
   - Value: `html`

   Click **Or** (important: OR not AND)

   **Second condition:**
   - Field: `URI Path`
   - Operator: `equals`
   - Value: `/`

4. **Then**:
   - Select **Bypass cache**

5. Click **Deploy**

✅ Rule 4 complete!

---

### Rule 5: Bypass Service Worker

**Purpose**: Always serve fresh service worker file

1. Click **Create rule**
2. **Rule name**: `Bypass Service Worker`
3. **When incoming requests match**:

   - Field: `URI Path`
   - Operator: `equals`
   - Value: `/sw.js`

4. **Then**:
   - Select **Bypass cache**

5. Click **Deploy**

✅ Rule 5 complete!

---

## Verify Configuration

After creating all rules, you should see them listed in order:

```
1. Cache Hashed Assets
2. Cache Images
3. Cache Fonts (optional)
4. Bypass HTML Cache
5. Bypass Service Worker
```

---

## Test Your Configuration

### 1. Purge Cache

After setting up rules:

1. Go to **Caching** → **Configuration**
2. Click **Purge Everything**
3. Confirm

### 2. Test with curl

Wait 2-3 minutes after purging, then test:

```bash
# Test JS file (should be cached)
curl -I https://pk13055.com/assets/react-BQak3wUf.js

# Look for:
# cf-cache-status: HIT (after first request)
# cache-control: public, max-age=31536000

# Test HTML (should NOT be cached long-term)
curl -I https://pk13055.com/

# Look for:
# cf-cache-status: DYNAMIC or BYPASS

# Test image (should be cached)
curl -I https://pk13055.com/avatar.png

# Look for:
# cf-cache-status: HIT
# cache-control: public, max-age=31536000
```

### 3. Test in Browser

1. Open https://pk13055.com in **incognito mode**
2. Open DevTools (F12) → **Network** tab
3. Reload page
4. Click on any JS file in `/assets/`
5. Check **Headers** tab:
   - `cf-cache-status: HIT` (on second load)
   - `cache-control: public, max-age=31536000`

---

## Troubleshooting

### Issue: Rules not working

**Solution:**
1. Wait 5-10 minutes for Cloudflare to propagate changes
2. Purge cache again: **Caching** → **Purge Everything**
3. Test in incognito mode

### Issue: "Invalid wildcard" error

**Cause:** You used "matches wildcard" with regex syntax

**Solution:** Use the exact operators shown above:
- `starts with` for paths
- `is in` for lists
- `equals` for exact matches

### Issue: Assets not caching

**Check:**
1. Rule order (should be as listed above)
2. File extensions are space-separated
3. URI path starts with `/` (e.g., `/assets/` not `assets/`)

### Issue: Stale content after deploy

**Solution:**
```bash
# Purge cache after each deploy
npm run deploy:full

# Or manually purge in dashboard
```

---

## Common Mistakes to Avoid

❌ **DON'T** use "matches regex" for simple patterns
✅ **DO** use "starts with" or "is in"

❌ **DON'T** forget the leading `/` in paths
✅ **DO** use `/assets/` not `assets/`

❌ **DON'T** use commas between file extensions
✅ **DO** use spaces: `png jpg jpeg` not `png, jpg, jpeg`

❌ **DON'T** cache HTML files
✅ **DO** bypass cache for HTML

---

## Expected Results

After setup:

- **PageSpeed Insights**: "Serve static assets with efficient cache policy" ✅ Resolved
- **First visit**: Similar performance
- **Repeat visit**: 80-95% faster
- **Bandwidth**: 90%+ reduction for returning visitors

---

## Need Help?

- [Cloudflare Cache Rules Docs](https://developers.cloudflare.com/cache/how-to/cache-rules/)
- [Cloudflare Community](https://community.cloudflare.com/)
- Check `cloudflare-cache-rules.md` for more details

---

**Setup time**: ~10 minutes
**Maintenance**: Zero (automatic)
**Benefit**: Huge PageSpeed improvement! 🚀

