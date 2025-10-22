// Optional: Cloudflare Worker for Advanced Cache Control
// Deploy this if you want more granular control over caching
// Go to Workers & Pages → Create Application → Create Worker

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Fetch the response from origin
  const response = await fetch(request);

  // Create a new response with modified headers
  const newResponse = new Response(response.body, response);

  // Service Worker - No cache
  if (path === "/sw.js") {
    newResponse.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    newResponse.headers.set("Pragma", "no-cache");
    newResponse.headers.set("Expires", "0");
    return newResponse;
  }

  // HTML files - No cache, always revalidate
  if (path.endsWith(".html") || path === "/" || path === "/index.html") {
    newResponse.headers.set(
      "Cache-Control",
      "public, max-age=0, must-revalidate"
    );
    return newResponse;
  }

  // Hashed assets (JS, CSS with hash in filename) - Cache for 1 year
  if (path.match(/\/assets\/.*-[a-zA-Z0-9]{8,}\.(js|css)$/)) {
    newResponse.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return newResponse;
  }

  // Images - Cache for 1 year
  if (path.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/)) {
    newResponse.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return newResponse;
  }

  // Fonts - Cache for 1 year
  if (path.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    newResponse.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return newResponse;
  }

  // Other static files - Cache for 1 week
  newResponse.headers.set("Cache-Control", "public, max-age=604800");

  // Add security headers while we're at it
  newResponse.headers.set("X-Content-Type-Options", "nosniff");
  newResponse.headers.set("X-Frame-Options", "SAMEORIGIN");
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return newResponse;
}
