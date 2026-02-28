/**
 * SEO Configuration and Structured Data Generators
 * Comprehensive SEO utilities for pk13055.com
 */

export interface SEOConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  author?: string;
  keywords?: string[];
}

// Site-wide configuration
export const SITE_CONFIG = {
  siteUrl: "https://pk13055.com",
  siteName: "Pratik K - AI & Machine Learning Engineer",
  siteTitle: "Pratik K | AI & Machine Learning Engineer | Portfolio",
  siteDescription:
    "AI/ML Engineer specializing in algorithmic trading, computer vision, document AI, and full-stack systems. 5+ years building intelligent systems. Healthcare AI, trading platforms, React, FastAPI. Open for opportunities.",
  author: "Pratik K",
  email: "pratik.k98@yahoo.com",
  github: "https://github.com/pk13055",
  linkedin: "https://linkedin.com/in/pk13055",
  image: "/og-image.png",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Algorithmic Trading",
    "Computer Vision",
    "Document AI",
    "Healthcare AI",
    "Deep Learning",
    "PyTorch",
    "TensorFlow",
    "Vertex AI",
    "FastAPI",
    "React",
    "AI Consultant",
    "Full-Stack",
    "Python Developer",
  ],
};

/**
 * Generate Person schema for professional profile
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pratik K",
    alternateName: "pk13055",
    url: SITE_CONFIG.siteUrl,
    image: `${SITE_CONFIG.siteUrl}/avatar.png`,
    email: SITE_CONFIG.email,
    jobTitle: "AI & Machine Learning Engineer",
    description:
      "AI/ML specialist with expertise in algorithmic trading, computer vision, document AI (Vertex AI), full-stack development (React, FastAPI), and deep learning systems",
    worksFor: [
      {
        "@type": "Organization",
        name: "Trilogy (ESW Capital Group)",
        url: "https://www.trilogy.com",
      },
      {
        "@type": "Organization",
        name: "Trade Wise Capital",
      },
      {
        "@type": "Organization",
        name: "Synalytica LLC",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IIIT Hyderabad",
      url: "https://www.iiit.ac.in",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Document AI",
      "Algorithmic Trading",
      "PyTorch",
      "TensorFlow",
      "Vertex AI",
      "React",
      "FastAPI",
      "Python",
      "C++",
      "Docker",
      "Cloud Computing",
    ],
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.siteDescription,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}#search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate ProfilePage schema
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: generatePersonSchema(),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.siteUrl,
        },
      ],
    },
  };
}

/**
 * Generate structured data for projects
 */
export function generateProjectSchema(project: {
  title: string;
  description: string;
  dateCreated: string;
  dateModified?: string;
  keywords: string[];
  client?: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    dateCreated: project.dateCreated,
    dateModified: project.dateModified || project.dateCreated,
    keywords: project.keywords.join(", "),
    programmingLanguage: project.technologies,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    ...(project.client && {
      sponsor: {
        "@type": "Organization",
        name: project.client,
      },
    }),
  };
}

/**
 * Generate structured data for work experience
 */
export function generateWorkExperienceSchema(experience: {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WorkExperience",
    jobTitle: experience.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: experience.company,
      ...(experience.location && { location: experience.location }),
    },
    startDate: experience.startDate,
    ...(experience.endDate && { endDate: experience.endDate }),
    description: experience.description.join(" "),
  };
}

/**
 * Generate ContactPoint schema
 */
export function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "Professional",
    email: SITE_CONFIG.email,
    availableLanguage: ["English"],
  };
}

/**
 * Generate combined structured data for the entire page
 */
export function generateCompleteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonSchema(),
      generateWebSiteSchema(),
      generateProfilePageSchema(),
      generateContactPointSchema(),
    ],
  };
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(config?: Partial<SEOConfig>) {
  const mergedConfig = { ...SITE_CONFIG, ...config };

  return {
    "og:type": mergedConfig.type || "website",
    "og:url": mergedConfig.url || SITE_CONFIG.siteUrl,
    "og:title": mergedConfig.title || SITE_CONFIG.siteTitle,
    "og:description": mergedConfig.description || SITE_CONFIG.siteDescription,
    "og:image":
      mergedConfig.image || `${SITE_CONFIG.siteUrl}${SITE_CONFIG.image}`,
    "og:site_name": SITE_CONFIG.siteName,
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(config?: Partial<SEOConfig>) {
  const mergedConfig = { ...SITE_CONFIG, ...config };

  return {
    "twitter:card": "summary_large_image",
    "twitter:url": mergedConfig.url || SITE_CONFIG.siteUrl,
    "twitter:title": mergedConfig.title || SITE_CONFIG.siteTitle,
    "twitter:description":
      mergedConfig.description || SITE_CONFIG.siteDescription,
    "twitter:image":
      mergedConfig.image || `${SITE_CONFIG.siteUrl}${SITE_CONFIG.image}`,
  };
}

/**
 * Helper to generate canonical URL
 */
export function getCanonicalUrl(path: string = "") {
  return `${SITE_CONFIG.siteUrl}${path}`;
}
