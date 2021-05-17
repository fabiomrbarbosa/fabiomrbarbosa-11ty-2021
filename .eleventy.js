module.exports = function (eleventyConfig) {

  const components = `./src/_includes/components`;
  const filters = `./src/_utils/filters`;
  const libraries = `./src/_utils/libraries`;
  const transforms = `./src/_utils/transforms`;

  const getTagList = require("./src/_utils/getTagList");

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("eleventy-plugin-embed-everything"));

  eleventyConfig.setLibrary("md", require(`${libraries}/markdown.js`));

  eleventyConfig.addShortcode("Figure", require(`${components}/Figure.js`));
  eleventyConfig.addShortcode("CloudImage", require(`${components}/CloudImage.js`));
  eleventyConfig.addShortcode("InlineIcon", require(`${components}/InlineIcon.js`));
  eleventyConfig.addPairedShortcode("ArchiveList", require(`${components}/ArchiveList.js`));
  eleventyConfig.addPairedShortcode("ServicesList", require(`${components}/ServicesList.js`));

  eleventyConfig.addFilter("includes", require(`${filters}/includes.js`));
  eleventyConfig.addFilter("excludes", require(`${filters}/excludes.js`));
  eleventyConfig.addFilter("fixedEncodeURIComponent", require(`${filters}/fixedEncodeURIComponent.js`));
  eleventyConfig.addFilter("head", require(`${filters}/head.js`));
  eleventyConfig.addFilter("machineDate", require(`${filters}/machineDate.js`));
  eleventyConfig.addFilter("readableDate", require(`${filters}/readableDate.js`));
  eleventyConfig.addFilter("mdInline", require(`${filters}/mdInline.js`));

  eleventyConfig.addTransform("purgeInlineCSS", require(`${transforms}/purgeInlineCSS.js`));


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

  eleventyConfig.addPassthroughCopy("./src/uploads");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
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
