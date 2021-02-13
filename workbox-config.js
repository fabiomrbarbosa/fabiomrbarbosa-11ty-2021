module.exports = {
  cacheId: "fabiomrbarbosa-pwa",
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,js,woff2,webmanifest}"
  ],
  globIgnores: [
    //"**/blog/**/*",
    "**/tags/**/*"
  ],
  runtimeCaching: [
    {
      urlPattern: "/^.*\.(webp|jpg|png|svg|html|css|ttf|woff2)$/",
      handler: "StaleWhileRevalidate",
    },
  ],
  skipWaiting: true,
  swDest: "dist/sw.js"
};
