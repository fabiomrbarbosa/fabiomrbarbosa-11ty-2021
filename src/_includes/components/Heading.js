const figureComp = require("./Figure");
const markdownIt = require("markdown-it");
const md = new markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
});

module.exports = function ({
  title = "",
  subtitle = "",
  lede = "",
  machineDate = "",
  readableDate = "",
  className = "",
  imageSrc = "",
  imageAlt = "",
  imageCaption = "",
  imageAttribution = ""
} = {}) {
  return /*html*/ `
  <div class="heading ${className}">
    <div class="heading__inner ${imageSrc == "" && `heading--no-picture`}">

      <h1 class="heading__title">${md.renderInline(title)}</h1>
      ${subtitle && /*html*/ `<h2 class="heading__subtitle">${md.renderInline(subtitle)}</h2>`}

      ${imageSrc &&
        figureComp({
          lazy: false,
          className: "heading__img",
          image: imageSrc,
          alt: imageAlt,
          caption: imageCaption,
          attribution: imageAttribution,
          size: "full", })
      }

      ${
        lede &&
        /*html*/ `<p class="heading__lede">${md.renderInline(lede)}</p>`
      }

      ${
        machineDate &&
        /*html*/ `<time class="heading__datetime" datetime="${machineDate}">
        ${readableDate}
        </time>`
      }

    </div>
  </div>`;
};
