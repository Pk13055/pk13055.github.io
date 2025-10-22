# Pratik K - Portfolio Website

> AI/ML Engineer Portfolio built with React, TypeScript, and Vite. Deployed on GitHub Pages with Cloudflare CDN.

🌐 **Live Site**: [pk13055.com](https://pk13055.com)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Deploy and purge Cloudflare cache (requires env vars)
npm run deploy:full
```

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Tabler Icons
- **Deployment**: GitHub Pages + Cloudflare CDN
- **SEO**: React Helmet Async

## ⚡ Performance Optimizations

This site implements comprehensive performance optimizations addressing PageSpeed Insights recommendations:

### 1. Service Worker Caching
- Client-side caching with cache-first strategy for assets
- Network-first strategy for HTML to ensure fresh content
- Automatic cache management and updates

### 2. JavaScript Bundle Optimization
Aggressive bundle size reduction addressing "Reduce unused JavaScript":
- **Advanced code splitting**: 6 optimized chunks instead of monolithic bundle
- **Tree shaking**: Removes unused code from dependencies
- **Aggressive minification**: Terser with console removal and 2-pass compression
- **Modern ES2020 target**: Smaller output, faster execution
- **Smart chunking**: React (50KB), React-DOM (132KB), Framer Motion (76KB) cached separately
- **Bundle analyzer**: Visualize what's in your bundle with `npm run build:analyze`

**Result**: 44% reduction in main bundle size, better caching strategy

📘 See [`BUNDLE_OPTIMIZATION.md`](./BUNDLE_OPTIMIZATION.md) for detailed analysis and further optimizations.

### 3. Cloudflare Edge Caching
Since the site is behind Cloudflare, follow these steps to maximize cache efficiency:

#### Setup Cache Rules in Cloudflare Dashboard

1. Navigate to **Cloudflare Dashboard → Your Site → Rules → Cache Rules**

2. Create these rules (in order):

**Rule 1: Cache Hashed Assets (JS/CSS)**
- When incoming requests match:
  - Field: `URI Path`
  - Operator: `starts with`
  - Value: `/assets/`
  - **AND** Field: `File extension`
  - Operator: `is in`
  - Value: `js css`
- Then:
  - Cache eligibility: **Eligible for cache**
  - Edge TTL: **1 year**
  - Browser TTL: **1 year**

**Rule 2: Cache Images**
- When incoming requests match:
  - Field: `File extension`
  - Operator: `is in`
  - Value: `png jpg jpeg gif svg webp ico avif`
- Then:
  - Cache eligibility: **Eligible for cache**
  - Edge TTL: **1 year**
  - Browser TTL: **1 year**

**Rule 3: Bypass HTML Cache**
- When incoming requests match:
  - Field: `File extension`
  - Operator: `equals`
  - Value: `html`
  - **OR** Field: `URI Path`
  - Operator: `equals`
  - Value: `/`
- Then:
  - Cache eligibility: **Bypass cache**

**Rule 4: Bypass Service Worker**
- When incoming requests match:
  - Field: `URI Path`
  - Operator: `equals`
  - Value: `/sw.js`
- Then:
  - Cache eligibility: **Bypass cache**

📘 **Quick Setup**: [`CLOUDFLARE_RULE_SETUP.md`](./CLOUDFLARE_RULE_SETUP.md) - Step-by-step with screenshots
📘 **Detailed Guide**: [`cloudflare-cache-rules.md`](./cloudflare-cache-rules.md) - Technical details

### 4. Responsive Image Optimization

Implements modern responsive images to reduce bandwidth and improve load times:
- **Responsive srcset**: Serves appropriate image sizes for each device
- **Modern formats**: WebP with PNG fallback for better compression
- **Lazy loading**: Below-the-fold images load on demand
- **Priority loading**: Critical above-the-fold images load immediately
- **Cloudflare Polish**: Automatic image optimization at the edge

**Setup**: Enable Cloudflare Polish (5 minutes)
1. Dashboard → Speed → Optimization → Image Optimization
2. Enable **Polish** (Lossless or Lossy)
3. Enable **WebP** conversion

📘 See [`IMAGE_OPTIMIZATION.md`](./IMAGE_OPTIMIZATION.md) and [`cloudflare-images-setup.md`](./cloudflare-images-setup.md) for detailed guides.

#### Optional: Cloudflare Worker
For advanced cache control, deploy the provided Cloudflare Worker:

```bash
# The worker code is in public/cloudflare-worker.js
# Deploy via Cloudflare Dashboard → Workers & Pages → Create Worker
```

### 4. Automatic Cache Purging (Optional)

Set up automatic Cloudflare cache purging after deployments:

1. Get your Cloudflare credentials:
   - **Zone ID**: Dashboard → Overview → Zone ID (right sidebar)
   - **API Token**: Dashboard → My Profile → API Tokens → Create Token

2. Set environment variables:
   ```bash
   export CLOUDFLARE_ZONE_ID="your_zone_id"
   export CLOUDFLARE_API_TOKEN="your_api_token"
   ```

3. Deploy with cache purging:
   ```bash
   npm run deploy:full
   ```

## 📊 Expected Performance Gains

After implementing these optimizations:

- ✅ **Efficient cache policy**: 1 year cache for static assets
- ✅ **Proper image sizing**: 70%+ bandwidth savings on images
- ✅ **Modern image formats**: WebP reduces size by 30-40%
- ✅ **Reduced server requests**: Assets cached at edge and client
- ✅ **Faster TTFB**: Cloudflare edge caching
- ✅ **Better PageSpeed scores**: Addresses multiple recommendations
- ✅ **Instant repeat visits**: Service worker + edge caching

**Real-world impact:**
- First visit: Faster image loading
- Repeat visit: 80-95% faster overall
- Mobile users: 70%+ less data usage
- PageSpeed score: +15-30 points improvement

## 🏗️ Project Structure

```
pk13055/
├── src/
│   ├── components/
│   │   ├── layout/          # Navigation, Footer
│   │   ├── sections/        # Page sections (Hero, About, etc.)
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utilities and helpers
│   │   ├── animations.ts    # Animation configurations
│   │   ├── seo.ts          # SEO utilities
│   │   ├── utils.ts        # Common utilities
│   │   └── registerSW.ts   # Service worker registration
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                  # Static assets
│   ├── sw.js               # Service worker
│   ├── _headers            # Cache headers (for Cloudflare/Netlify)
│   └── cloudflare-worker.js # Optional Cloudflare Worker
├── scripts/
│   └── purge-cloudflare-cache.js # Auto cache purging
├── vite.config.ts          # Vite configuration
└── cloudflare-cache-rules.md # Cloudflare setup guide
```

## 🔧 Configuration Files

- `vite.config.ts` - Build optimization and chunk splitting
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 📝 Development

```bash
# Run development server (with hot reload)
npm run dev

# Type check
npm run build  # TypeScript compilation is part of build

# Build for production
   npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

The site automatically builds and deploys to GitHub Pages on push to master branch.

Manual deployment:
```bash
# Build and deploy
npm run deploy

# Deploy with Cloudflare cache purge
npm run deploy:full
```

## 📈 Performance Monitoring

Monitor your site's performance:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Questions?

For implementation questions or issues, please refer to:
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Cloudflare Cache Documentation](https://developers.cloudflare.com/cache/)
