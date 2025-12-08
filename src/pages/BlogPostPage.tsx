import {
  IconArrowLeft,
  IconHome2,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { parseBlogSlug } from "@/lib/blog";

const resolveMediaSrc = (src?: string) => {
  if (!src) return "";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }

  // Normalize relative media paths to live under /blog/media
  const cleaned = src.replace(/^\.?\/?/, "");
  return `/blog/media/${cleaned}`;
};

const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p
      className="text-lg leading-relaxed text-muted-foreground mb-4 text-justify"
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <a
      className="text-rose-400 underline hover:text-rose-300"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  ul: ({ node, ordered, ...props }) => (
    <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
  ),
  ol: ({ node, ordered, ...props }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-rose-400/60 pl-4 italic text-muted-foreground mb-4"
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  hr: ({ node, ...props }) => <hr className="my-6 border-muted" {...props} />,
  img: ({ node, src, alt, ...props }) => (
    <img
      src={resolveMediaSrc(src)}
      alt={alt ?? ""}
      className="my-6 w-full max-w-2xl mx-auto rounded-lg border border-rose-900/40 shadow-sm"
      loading="lazy"
      {...props}
    />
  ),
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const parsed = useMemo(() => (slug ? parseBlogSlug(slug) : null), [slug]);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/blog/${slug}.md`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load this post.");
        }
        const text = await response.text();
        if (isMounted) {
          setContent(text);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load this post."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const isLight = theme === "light";

  return (
    <section
      className={`min-h-screen py-12 px-4 sm:px-8 ${
        isLight
          ? "blog-light bg-white text-slate-900"
          : "bg-gradient-to-b from-background via-rose-900/15 to-background"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              <IconMoon className="h-4 w-4" />
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isLight}
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className={`relative inline-flex h-8 w-14 items-center rounded-full border transition ${
                isLight
                  ? "bg-rose-200 border-rose-300"
                  : "bg-rose-900 border-rose-700"
              }`}
            >
              <span className="sr-only">Toggle light mode</span>
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
                  isLight ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-muted-foreground">
              <IconSun className="h-4 w-4" />
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <IconArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <IconHome2 className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6 leading-relaxed text-foreground text-justify">
          {loading && <p className="text-muted-foreground">Loading post...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogPostPage;
