const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginEmbeds = require("eleventy-plugin-embed-everything");
const pluginPWA = require("eleventy-plugin-pwa");
const plugini18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/dictionary.json');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const componentsDir = `./src/_includes/components`;
const InlineLogo = require(`${ componentsDir }/InlineLogo.js`);
const Heading = require(`${ componentsDir }/Heading.js`);
const GridList = require(`${ componentsDir }/GridList.js`);
const ServicesList = require(`${ componentsDir }/ServicesList.js`);

module.exports = function(eleventyConfig) {

  eleventyConfig.addShortcode('InlineLogo', InlineLogo);
  eleventyConfig.addShortcode('Heading', Heading);
  eleventyConfig.addPairedShortcode('GridList', GridList);
  eleventyConfig.addPairedShortcode('ServicesList', ServicesList);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginEmbeds);
  eleventyConfig.addPlugin(pluginPWA);
  eleventyConfig.addPlugin(plugini18n, {
    translations,
    fallbackLocales: {
      '*': 'en'
    }
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (dateObj, locale) => {
    // .toLocaleString returns a natural language phrase instead of just translating the month names etc.
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).setLocale(locale).toLocaleString(DateTime.DATE_FULL);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if ( !array || !array.length ) { return; }

    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/manifest.json");

  /* Markdown Overrides */
  // This might be useful for filtering elements in MD
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes"
    }
  };
};
