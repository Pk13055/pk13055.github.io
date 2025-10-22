#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script generates responsive image sizes for your assets.
 * It creates multiple sizes (192w, 256w, 384w, 512w) and formats (WebP, original).
 * 
 * Usage:
 *   node scripts/optimize-images.js
 * 
 * Prerequisites:
 *   Install Sharp (optional, recommended for best quality):
 *   npm install --save-dev sharp
 * 
 * Without Sharp:
 *   Use online tools or Cloudflare Images for automatic optimization
 */

console.log('📸 Image Optimization Guide\n');
console.log('To optimize your images for different screen sizes, you have 3 options:\n');

console.log('Option 1: Use Cloudflare Images (Recommended for your setup)');
console.log('─────────────────────────────────────────────────────────────');
console.log('Since you\'re using Cloudflare, enable Cloudflare Images:');
console.log('1. Go to Cloudflare Dashboard → Images → Polish');
console.log('2. Enable "Polish" (Lossless or Lossy)');
console.log('3. Enable "WebP" format');
console.log('4. Enable "Image Resizing" for responsive variants');
console.log('');
console.log('Cloudflare will automatically:');
console.log('  ✓ Convert images to WebP/AVIF');
console.log('  ✓ Resize images based on device');
console.log('  ✓ Optimize compression');
console.log('  ✓ Serve from edge (faster)');
console.log('');

console.log('Option 2: Manual Optimization (Quick)');
console.log('──────────────────────────────────────');
console.log('Use online tools to create optimized versions:');
console.log('');
console.log('For avatar.png, create these sizes:');
console.log('  • avatar-192w.png  (192x192) - Mobile');
console.log('  • avatar-256w.png  (256x256) - Tablet');
console.log('  • avatar-384w.png  (384x384) - Desktop (2x)');
console.log('  • avatar-192w.webp (192x192) - Mobile WebP');
console.log('  • avatar-256w.webp (256x256) - Tablet WebP');
console.log('  • avatar-384w.webp (384x384) - Desktop WebP');
console.log('');
console.log('Tools to use:');
console.log('  • Squoosh: https://squoosh.app/');
console.log('  • TinyPNG: https://tinypng.com/');
console.log('  • CloudConvert: https://cloudconvert.com/');
console.log('');

console.log('Option 3: Install Sharp for Automatic Optimization');
console.log('───────────────────────────────────────────────────');
console.log('Install Sharp and run this script:');
console.log('  npm install --save-dev sharp');
console.log('  node scripts/optimize-images.js');
console.log('');
console.log('This will automatically generate all required sizes and formats.');
console.log('');

// Try to use Sharp if available
try {
  const sharp = require('sharp');
  const fs = require('fs');
  const path = require('path');
  
  console.log('✓ Sharp detected! Running automatic optimization...\n');
  
  const inputImage = path.join(__dirname, '../public/avatar.png');
  const outputDir = path.join(__dirname, '../public');
  
  if (!fs.existsSync(inputImage)) {
    console.error('❌ Error: avatar.png not found in public/ directory');
    process.exit(1);
  }
  
  const sizes = [192, 256, 384];
  
  async function optimizeImage() {
    console.log(`Processing: ${inputImage}\n`);
    
    for (const size of sizes) {
      // PNG version
      const pngOutput = path.join(outputDir, `avatar-${size}w.png`);
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(pngOutput);
      
      const pngStats = fs.statSync(pngOutput);
      console.log(`✓ Created: avatar-${size}w.png (${(pngStats.size / 1024).toFixed(1)}KB)`);
      
      // WebP version
      const webpOutput = path.join(outputDir, `avatar-${size}w.webp`);
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(webpOutput);
      
      const webpStats = fs.statSync(webpOutput);
      console.log(`✓ Created: avatar-${size}w.webp (${(webpStats.size / 1024).toFixed(1)}KB)`);
    }
    
    console.log('\n✅ Image optimization complete!');
    console.log('All optimized images are in the public/ directory.');
  }
  
  optimizeImage().catch(err => {
    console.error('❌ Error during optimization:', err);
    process.exit(1);
  });
  
} catch (error) {
  console.log('ℹ️  Sharp not installed. Use one of the options above to optimize images.');
  console.log('');
  console.log('Recommendation: Use Cloudflare Polish (Option 1) - no build step needed!');
}

