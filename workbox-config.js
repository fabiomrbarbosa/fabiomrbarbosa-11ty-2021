module.exports = {
  "cacheId": "fabiomrbarbosa-pwa",
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{ttf,woff2,svg,css,webmanifest}"
  ],
  "runtimeCaching": [
    {
      "urlPattern": "/^.*\.(webp|jpg|png|svg|html)$/",
      "handler": "StaleWhileRevalidate"
    },
  ],
  "swDest": "dist/sw.js"
};
