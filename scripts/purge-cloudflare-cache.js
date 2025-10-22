#!/usr/bin/env node

/**
 * Purge Cloudflare cache after deployment
 *
 * Usage:
 * 1. Set environment variables:
 *    export CLOUDFLARE_ZONE_ID="your_zone_id"
 *    export CLOUDFLARE_API_TOKEN="your_api_token"
 *
 * 2. Run: npm run cf:purge
 *
 * Or use npm run deploy:full to build, deploy, and purge in one command
 */

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ZONE_ID || !API_TOKEN) {
  console.log("⚠️  Cloudflare credentials not found.");
  console.log(
    "To enable automatic cache purging, set these environment variables:"
  );
  console.log("  CLOUDFLARE_ZONE_ID");
  console.log("  CLOUDFLARE_API_TOKEN");
  console.log("\nSkipping cache purge...");
  process.exit(0);
}

async function purgeCache() {
  console.log("🧹 Purging Cloudflare cache...");

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purge_everything: true,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("✅ Cloudflare cache purged successfully!");
      console.log("   Your latest changes will be live shortly.");
    } else {
      console.error("❌ Failed to purge cache:", data.errors);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error purging cache:", error.message);
    process.exit(1);
  }
}

purgeCache();
