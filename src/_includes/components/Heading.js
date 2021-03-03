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
  machineDate = "",
  readableDate = "",
  className = "",
  imageSrc = "",
  imageAlt = ""
} = {}) {
  return /*html*/ `
  <div class="heading ${className} ">
    <div class="heading__inner">

      <h1 class="heading__title">${md.renderInline(title)}</h1>

      ${imageSrc &&
        figureComp({
          lazy: false,
          className: "heading__img",
          image: imageSrc,
          alt: imageAlt,
          size: "full", })
      }

      ${
        subtitle &&
        /*html*/ `<p class="heading__subtitle">${md.renderInline(subtitle)}</p>`
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
