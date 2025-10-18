# Open Graph Image Requirements

## Image Specifications

To complete the SEO implementation, you need to create an Open Graph image for social media sharing.

### File Details
- **Filename**: `og-image.png`
- **Location**: `/public/og-image.png`
- **Dimensions**: 1200 x 630 pixels (Facebook/LinkedIn optimal)
- **Format**: PNG or JPG
- **File Size**: < 1MB (preferably < 500KB)

### Content Recommendations

The image should include:

1. **Your Name**: "Pratik K" in large, bold text
2. **Title/Tagline**: "AI & Machine Learning Engineer"
3. **Key Specializations**:
   - Algorithmic Trading
   - Computer Vision
   - Deep Learning
4. **Website URL**: "pk13055.com"
5. **Professional Photo**: Optional - your avatar
6. **Background**: Clean, professional gradient (purple/violet theme to match site)

### Design Tips

- Use high-contrast text for readability
- Match the purple/violet gradient theme from the site
- Ensure text is readable when scaled down (thumbnail view)
- Test how it looks on both dark and light backgrounds
- Keep important content in the "safe area" (center 1200x600)

### Tools for Creation

- **Online**: Canva, Figma, Adobe Express
- **Design Software**: Adobe Photoshop, Sketch, GIMP
- **Code-based**: HTML2Canvas + custom HTML/CSS template

### Alternative Approach

If you want to use your existing avatar.png temporarily:
1. Resize it to 1200x630
2. Add text overlay with your name and title
3. Use a simple background that matches the site theme

### Verification

After creating the image, test it using:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

The image is already referenced in:
- `/index.html` meta tags
- `/src/lib/seo.ts` configuration
- SEO component

Once created, simply place `og-image.png` in the `/public` directory.

