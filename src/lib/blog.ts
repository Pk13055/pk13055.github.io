export interface BlogIndexEntry {
  slug: string;
  title: string;
  date: string;
  filename: string;
}

export function formatBlogDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatBlogTitle(rawTitle: string) {
  return rawTitle
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ")
    .trim();
}

export function parseBlogSlug(slug: string) {
  const match = slug.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
  if (!match) return null;

  const [, date, rawTitle] = match;
  return {
    date,
    title: formatBlogTitle(rawTitle),
  };
}

