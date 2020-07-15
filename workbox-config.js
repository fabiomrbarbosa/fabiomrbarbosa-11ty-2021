module.exports = {
  "cacheId": "fabiomrbarbosa-pwa",
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{ttf,woff2,svg,html,xml,css,webmanifest}"
  ],
  "runtimeCaching": [
    {
      "urlPattern": "/^.*\.(webp|jpg|png|svg)$/",
      "handler": "StaleWhileRevalidate"
    },
  ],
  "swDest": "dist/sw.js"
};
