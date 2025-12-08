import { copyFileSync, existsSync } from "fs";
import { join } from "path";

const distDir = join(process.cwd(), "dist");
const indexPath = join(distDir, "index.html");
const notFoundPath = join(distDir, "404.html");

if (!existsSync(indexPath)) {
  console.error("dist/index.html not found; run build first.");
  process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log("Created dist/404.html for SPA fallback on GitHub Pages.");
