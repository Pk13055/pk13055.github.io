import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean; // For above-the-fold images
}

/**
 * Responsive image component with modern optimization features:
 * - Lazy loading (unless priority is set)
 * - Modern image format support (WebP, AVIF)
 * - Responsive srcset for different screen sizes
 * - Proper aspect ratio preservation
 * - Loading placeholder
 */
export function ResponsiveImage({
  src,
  alt,
  className = "",
  width,
  height,
  sizes = "100vw",
  priority = false,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate srcset for different sizes if we have base dimensions
  const generateSrcSet = (baseSrc: string) => {
    // Remove extension
    const lastDot = baseSrc.lastIndexOf(".");
    const basePath = baseSrc.substring(0, lastDot);
    const ext = baseSrc.substring(lastDot);

    // For now, we'll use the original image at different sizes
    // In production, you'd generate these during build or use a CDN
    return {
      // Try WebP first (better compression)
      webpSrcSet: `${basePath}-192w.webp 192w, ${basePath}-256w.webp 256w, ${basePath}-384w.webp 384w, ${basePath}-512w.webp 512w`,
      webpFallback: `${basePath}.webp`,

      // Original format as fallback
      srcSet: `${basePath}-192w${ext} 192w, ${basePath}-256w${ext} 256w, ${basePath}-384w${ext} 384w, ${basePath}-512w${ext} 512w`,
      fallback: baseSrc,
    };
  };

  const sources = generateSrcSet(src);

  return (
    <picture className={`block ${className}`}>
      {/* Modern format: WebP */}
      <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sizes} />

      {/* Fallback to original format */}
      <img
        src={sources.fallback}
        srcSet={sources.srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        style={{
          // Prevent layout shift
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-purple-900/20 animate-pulse rounded-full"
          style={{
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
        />
      )}
    </picture>
  );
}

/**
 * Optimized Avatar Image Component
 * Specifically designed for profile pictures with:
 * - Circular display
 * - Responsive sizing
 * - Format optimization
 */
interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function AvatarImage({
  src,
  alt,
  className = "",
  priority = true,
}: AvatarImageProps) {
  // Use simple img tag for now - Cloudflare Polish will optimize automatically
  // To enable responsive images: create optimized versions or enable Cloudflare Image Resizing

  return (
    <img
      src={src}
      alt={alt}
      width="256"
      height="256"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={`rounded-full object-cover ${className}`}
      style={{
        // Prevent layout shift
        aspectRatio: "1 / 1",
      }}
    />
  );
}
