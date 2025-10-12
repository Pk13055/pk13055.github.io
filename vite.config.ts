import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // For user/org GitHub Pages site (pk13055.github.io)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
