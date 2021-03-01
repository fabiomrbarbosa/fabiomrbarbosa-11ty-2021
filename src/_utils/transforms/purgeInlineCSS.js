const { PurgeCSS } = require("purgecss");

module.exports = async (content, outputPath) => {
  if (
    process.env.ELEVENTY_ENV !== "production" ||
    !outputPath.endsWith(".html")
  ) {
    return content;
  }

  const purgeCSSResults = await new PurgeCSS().purge({
    content: [{ raw: content }],
    css: ["src/_includes/styles/main.min.css"],
    keyframes: true,
  });

  return content.replace(
    "<!-- INLINE CSS-->",
    "<style>" + purgeCSSResults[0].css + "</style>"
  );
};
