/**
 * Image utility functions for responsive and optimized images
 */

/**
 * Cloudflare Image Resizing URL generator
 * 
 * Generates URLs for Cloudflare's image resizing service.
 * Enable in Cloudflare Dashboard → Images → Image Resizing
 * 
 * @param src - Original image path
 * @param width - Target width
 * @param options - Additional options
 * @returns Cloudflare image resizing URL
 * 
 * @example
 * getCloudflareImageUrl('/avatar.png', 256, { format: 'webp', quality: 85 })
 * // Returns: /cdn-cgi/image/width=256,format=webp,quality=85/avatar.png
 */
export function getCloudflareImageUrl(
  src: string,
  width: number,
  options: {
    format?: 'webp' | 'avif' | 'auto' | 'png' | 'jpeg';
    quality?: number; // 1-100
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    dpr?: 1 | 2 | 3; // Device pixel ratio
  } = {}
): string {
  const { format = 'auto', quality = 85, fit = 'scale-down', dpr = 1 } = options;

  const params = [
    `width=${width}`,
    `format=${format}`,
    `quality=${quality}`,
    `fit=${fit}`,
    ...(dpr > 1 ? [`dpr=${dpr}`] : []),
  ].join(',');

  return `/cdn-cgi/image/${params}${src}`;
}

/**
 * Generate srcset string for responsive images using Cloudflare
 * 
 * @param src - Original image path
 * @param sizes - Array of widths
 * @param format - Image format
 * @returns srcset string
 * 
 * @example
 * generateCloudflareeSrcSet('/avatar.png', [192, 256, 384])
 * // Returns: /cdn-cgi/image/width=192.../avatar.png 192w, ...
 */
export function generateCloudflareSrcSet(
  src: string,
  sizes: number[],
  format: 'webp' | 'auto' = 'auto'
): string {
  return sizes
    .map((width) => {
      const url = getCloudflareImageUrl(src, width, { format });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * 
 * @param breakpoints - Object mapping max-width to size
 * @returns sizes attribute string
 * 
 * @example
 * generateSizesAttribute({ 640: '192px', 1024: '224px', default: '256px' })
 * // Returns: (max-width: 640px) 192px, (max-width: 1024px) 224px, 256px
 */
export function generateSizesAttribute(breakpoints: {
  [key: number]: string;
  default: string;
}): string {
  const entries = Object.entries(breakpoints)
    .filter(([key]) => key !== 'default')
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}px) ${size}`);

  entries.push(breakpoints.default);
  return entries.join(', ');
}

/**
 * Check if WebP is supported
 * 
 * @returns Promise that resolves to true if WebP is supported
 */
export function isWebPSupported(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Calculate optimal image dimensions based on container size
 * 
 * @param containerWidth - Width of the container
 * @param dpr - Device pixel ratio
 * @returns Optimal image width
 */
export function calculateOptimalWidth(
  containerWidth: number,
  dpr: number = window.devicePixelRatio || 1
): number {
  // Round up to nearest standard size
  const standardSizes = [192, 256, 384, 512, 768, 1024, 1536, 2048];
  const targetWidth = containerWidth * dpr;

  return (
    standardSizes.find((size) => size >= targetWidth) ||
    standardSizes[standardSizes.length - 1]
  );
}

/**
 * Preload critical images for better performance
 * 
 * @param images - Array of image URLs to preload
 * @param options - Preload options
 */
export function preloadImages(
  images: Array<{ src: string; type?: string; sizes?: string; srcset?: string }>,
  options: { as?: string; fetchPriority?: 'high' | 'low' | 'auto' } = {}
) {
  const { as = 'image', fetchPriority = 'high' } = options;

  images.forEach(({ src, type, sizes, srcset }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;

    if (type) link.type = type;
    if (sizes) link.setAttribute('imagesizes', sizes);
    if (srcset) link.setAttribute('imagesrcset', srcset);
    if (fetchPriority) link.setAttribute('fetchpriority', fetchPriority);

    document.head.appendChild(link);
  });
}

