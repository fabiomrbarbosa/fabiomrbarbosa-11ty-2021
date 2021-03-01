module.exports = function (eleventyConfig) {
  const { DateTime } = require("luxon");
  const { PurgeCSS } = require("purgecss");
  const lodash = require("lodash");
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  const pluginNavigation = require("@11ty/eleventy-navigation");
  const pluginEmbeds = require("eleventy-plugin-embed-everything");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItAttributes = require("markdown-it-attrs");
  const markdownItExternalLinks = require("markdown-it-external-links");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginEmbeds);

  const componentsDir = `./src/_includes/components`;
  const Image = require(`${componentsDir}/Image.js`);
  const CloudImage = require(`${componentsDir}/CloudImage.js`);
  const Heading = require(`${componentsDir}/Heading.js`);
  const InlineIcon = require(`${componentsDir}/InlineIcon.js`);
  const ArchiveList = require(`${componentsDir}/ArchiveList.js`);
  const ServicesList = require(`${componentsDir}/ServicesList.js`);

  const getTagList = require("./src/_utils/getTagList");

  eleventyConfig.addShortcode("Image", Image);
  eleventyConfig.addShortcode("CloudImage", CloudImage);
  eleventyConfig.addShortcode("Heading", Heading);
  eleventyConfig.addShortcode("InlineIcon", InlineIcon);
  eleventyConfig.addPairedShortcode("ArchiveList", ArchiveList);
  eleventyConfig.addPairedShortcode("ServicesList", ServicesList);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("includes", function (array, keyPath, value) {
    return array.filter((item) => {
      let data = item;
      for (const key of keyPath.split(".")) {
        data = data[key];
      }

      // If data doesn’t exist, abort
      if (!data) {
        return false;
      }

      // If data is a Date, reformat as ISO 8601
      if (data instanceof Date) {
        data = data.toISOString();
      }

      return data.includes(value) ? item : false;
    });
  });

  eleventyConfig.addFilter("excludes", function (array, keyPath, value) {
    return array.filter((item) => {
      let data = item;
      for (const key of keyPath.split(".")) {
        data = data[key];
      }

      // If data doesn’t exist, abort
      if (!data) {
        return false;
      }

      return data === value ? false : item;
    });
  });

  eleventyConfig.addFilter("fixedEncodeURIComponent", function (str) {
    return escape(
      encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return "%" + c.charCodeAt(0).toString(16);
      })
    );
  });

  eleventyConfig.addFilter("readableDate", (dateObj, locale) => {
    // .toLocaleString returns a natural language phrase instead of just translating the month names etc.
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!array || !array.length) {
      return;
    }

    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });


  eleventyConfig.addCollection("en", (collection) => {
    return collection.getAll().filter((page) => page.data.locale === "en");
  });

  eleventyConfig.addCollection("pt", (collection) => {
    return collection.getAll().filter((page) => page.data.locale === "pt");
  });

  eleventyConfig.addCollection("tags_en", (collection) => {
    let tagSet = new Set();
    collection
      .getAll()
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
      .getAll()
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

  /* Markdown Overrides */
  // This might be useful for filtering elements in MD
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
    })
    .use(markdownItAttributes)
    .use(markdownItExternalLinks, {
      internalDomains: ["fabiomrbarbosa.com", "localhost"],
      externalTarget: "_blank",
      externalRel: "noopener noreferrer",
    });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // allow markdown renderInline inside of nunjucks
  eleventyConfig.addFilter("mdInline", function (value) {
    return markdownLibrary.renderInline(value);
  });

  eleventyConfig.addTransform(
    "purge-and-inline-css",
    async (content, outputPath) => {
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
    }
  );

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
