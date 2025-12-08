import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconHome2, IconNews } from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogIndexEntry, formatBlogDate } from "@/lib/blog";

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let isMounted = true;
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/blog/index.json", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load blog index.");
        }
        const data: BlogIndexEntry[] = await response.json();
        if (isMounted) {
          const sortedPosts = [...data].sort((a, b) =>
            b.date.localeCompare(a.date, "en-US")
          );
          setPosts(sortedPosts);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load blog posts."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const isLight = theme === "light";

  return (
    <section
      className={`min-h-screen py-16 px-4 ${
        isLight
          ? "blog-light bg-white text-slate-900"
          : "bg-gradient-to-b from-background via-rose-900/20 to-background"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <IconNews className="h-5 w-5 text-rose-400" />
              Writing & updates
            </p>
            <h1 className="text-4xl font-bold mt-2">Blog</h1>
            <p className="text-muted-foreground mt-2">
              Notes, experiments, and longer-form write-ups.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Light</span>
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
              <span className="text-sm text-muted-foreground">Dark</span>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">
                <IconHome2 className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>

        {loading && (
          <p className="text-muted-foreground">Loading posts...</p>
        )}

        {error && <p className="text-destructive">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <Card className="h-full border-rose-900/40 bg-card/70 transition hover:-translate-y-1 hover:border-rose-400/60 hover:shadow-lg">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl leading-tight">
                      <span className="group-hover:text-rose-400 transition-colors">
                        {post.title}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatBlogDate(post.date)}
                      </span>
                      <span className="text-rose-400 group-hover:underline">
                        Read post →
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogListPage;

