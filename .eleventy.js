module.exports = function (eleventyConfig) {

  const components = `./src/_includes/components`;
  const filters = `./src/_utils/filters`;
  const libraries = `./src/_utils/libraries`;

  const getTagList = require("./src/_utils/getTagList");

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("eleventy-plugin-embed-everything"));

  eleventyConfig.setLibrary("md", require(`${libraries}/markdown.js`));

  eleventyConfig.addShortcode("Image", require(`${components}/Image.js`));
  eleventyConfig.addShortcode("CloudImage", require(`${components}/CloudImage.js`));
  eleventyConfig.addShortcode("Heading", require(`${components}/Heading.js`));
  eleventyConfig.addShortcode("InlineIcon", require(`${components}/InlineIcon.js`));
  eleventyConfig.addPairedShortcode("ArchiveList", require(`${components}/ArchiveList.js`));
  eleventyConfig.addPairedShortcode("ServicesList", require(`${components}/ServicesList.js`));

  eleventyConfig.addFilter("includes", require(`${filters}/includes.js`));
  eleventyConfig.addFilter("excludes", require(`${filters}/excludes.js`));
  eleventyConfig.addFilter("fixedEncodeURIComponent", require(`${filters}/fixedEncodeURIComponent.js`));
  eleventyConfig.addFilter("head", require(`${filters}/head.js`));
  eleventyConfig.addFilter("htmlDateString", require(`${filters}/htmlDateString.js`));
  eleventyConfig.addFilter("readableDate", require(`${filters}/readableDate.js`));
  eleventyConfig.addFilter("mdInline", require(`${filters}/mdInline.js`));


  eleventyConfig.addCollection("en", (collection) => {
    return collection.getAllSorted().filter((page) => page.data.locale === "en");
  });

  eleventyConfig.addCollection("pt", (collection) => {
    return collection.getAllSorted().filter((page) => page.data.locale === "pt");
  });

  eleventyConfig.addCollection("tags_en", (collection) => {
    let tagSet = new Set();
    collection
      .getAllSorted()
      .filter((page) => page.data.locale === "en")
      .forEach(function (item) {
        if ("tags" in item.data) {
          let tags = item.data.tags;

          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addCollection("tags_pt", (collection) => {
    let tagSet = new Set();
    collection
      .getAllSorted()
      .filter((page) => page.data.locale === "pt")
      .forEach(function (item) {
        if ("tags" in item.data) {
          let tags = item.data.tags;

          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/**/manifest.webmanifest");

  eleventyConfig.addTransform("purgeInlineCSS", require('./src/_utils/transforms/purgeInlineCSS.js'));

  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional:
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes",
    },
  };
};
