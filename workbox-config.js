module.exports = {
  "cacheId": "fabiomrbarbosa-pwa",
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{html,svg,css,webmanifest,ttf,woff2}"
  ],
  "globIgnores": [
    "**/blog/**/*",
    "**/tags/**/*",
    "**/node_modules/**/*",
    "sw.js",
    "workbox-*.js"
  ],
  "runtimeCaching": [
    {
      "urlPattern": "/^.*\.(webp|jpg|png|svg|html|css|ttf|woff2)$/",
      "handler": "StaleWhileRevalidate"
    },
  ],
  "swDest": "dist/sw.js"
};
