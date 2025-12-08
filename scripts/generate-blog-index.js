import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, "../public/blog");
const indexPath = path.join(blogDir, "index.json");

const titleCase = (rawTitle) =>
  rawTitle
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ")
    .trim();

const parsePostFilename = (filename) => {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})_(.+)\.md$/);
  if (!match) return null;

  const [, date, rawTitle] = match;
  return {
    slug: `${date}_${rawTitle}`,
    filename,
    date,
    title: titleCase(rawTitle),
  };
};

async function ensureBlogDir() {
  await fs.mkdir(blogDir, { recursive: true });
}

async function buildIndex() {
  await ensureBlogDir();
  const entries = await fs.readdir(blogDir);

  const posts = entries
    .filter((name) => name.endsWith(".md"))
    .map(parsePostFilename)
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date, "en-US"));

  await fs.writeFile(indexPath, JSON.stringify(posts, null, 2) + "\n");
  console.log(`Generated blog index with ${posts.length} entr${posts.length === 1 ? "y" : "ies"}.`);
}

buildIndex().catch((err) => {
  console.error("Failed to generate blog index:", err);
  process.exit(1);
});

