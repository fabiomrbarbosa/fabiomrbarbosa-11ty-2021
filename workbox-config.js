module.exports = {
  "cacheId": "fabiomrbarbosa-pwa",
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{html,svg,webmanifest}"
  ],
  "globIgnores": [
    //"**/blog/**/*",
    "**/tags/**/*",
    "**/node_modules/**/*",
    "sw.js",
    "workbox-*.js"
  ],
  "runtimeCaching": [
    {
      "urlPattern": "/^.*\.(webp|jpg|png|svg|html|css|ttf|woff2)$/",
      "handler": "NetworkFirst"
    },
  ],
  "swDest": "dist/sw.js"
};
