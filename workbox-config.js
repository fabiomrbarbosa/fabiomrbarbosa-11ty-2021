module.exports = {
  cacheId: "fabiomrbarbosa-pwa",
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,js,webmanifest}"
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
  swDest: "dist/sw.js"
};
