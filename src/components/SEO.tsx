import {
  SITE_CONFIG,
  generateOpenGraphTags,
  generateTwitterCardTags,
  getCanonicalUrl,
  type SEOConfig,
} from "@/lib/seo";
import { Helmet } from "react-helmet-async";

interface SEOProps extends Partial<SEOConfig> {
  structuredData?: object | object[];
}

/**
 * SEO Component for managing meta tags and structured data
 * Uses react-helmet-async for dynamic head management
 */
export function SEO({
  title,
  description,
  url,
  image,
  type,
  keywords,
  structuredData,
}: SEOProps) {
  const pageTitle = title || SITE_CONFIG.siteTitle;
  const pageDescription = description || SITE_CONFIG.siteDescription;
  const pageUrl = url || SITE_CONFIG.siteUrl;
  const pageImage = image || `${SITE_CONFIG.siteUrl}${SITE_CONFIG.image}`;
  const pageKeywords = keywords || SITE_CONFIG.keywords;

  const ogTags = generateOpenGraphTags({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    image: pageImage,
    type,
  });

  const twitterTags = generateTwitterCardTags({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    image: pageImage,
  });

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(", ")} />
      <meta name="author" content={SITE_CONFIG.author} />

      {/* Canonical URL */}
      <link rel="canonical" href={getCanonicalUrl()} />

      {/* Open Graph / Facebook */}
      {Object.entries(ogTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}

      {/* Twitter */}
      {Object.entries(twitterTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : [structuredData]
          )}
        </script>
      )}

      {/* Additional SEO improvements */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}
