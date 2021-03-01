const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttributes = require("markdown-it-attrs");
const markdownItExternalLinks = require("markdown-it-external-links");

module.exports = markdownIt({
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
