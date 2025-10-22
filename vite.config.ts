import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable automatic JSX runtime (smaller bundle)
      jsxRuntime: "automatic",
    }),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: "/", // For user/org GitHub Pages site (pk13055.github.io)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Generate source maps for easier debugging
    sourcemap: false,
    // Minification settings
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log, debugger, etc in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        pure_funcs: ["console.log", "console.info", "console.debug"],
        // Additional optimizations
        passes: 2,
      },
      mangle: {
        // Mangle property names for smaller output
        safari10: true,
      },
      format: {
        // Remove comments
        comments: false,
      },
    },
    // Optimize chunk size
    rollupOptions: {
      output: {
        // Manual chunking for better long-term caching
        manualChunks: (id) => {
          // Vendor chunk for npm dependencies
          if (id.includes("node_modules")) {
            // Keep React and React-DOM together to avoid bundling issues
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            // Separate large libraries
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            if (id.includes("@tabler/icons-react")) {
              return "icons";
            }
            // Everything else goes to vendor
            return "vendor";
          }
        },
        // Consistent naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
      // Tree shaking configuration
      treeshake: {
        moduleSideEffects: "no-external",
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // Target modern browsers for smaller output
    target: "es2020",
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
    exclude: [],
  },
});
