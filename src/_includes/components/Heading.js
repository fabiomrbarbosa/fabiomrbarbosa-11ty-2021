const imageComp = require("./Image");
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
  dateTime = "",
  dateReadable = "",
  className = "",
  imageSrc = "",
  imageAlt = ""
} = {}) {
  return /*html*/ `
  <div class="heading ${className} ">
    <div class="heading__inner">

      <h1 class="heading__title">${md.renderInline(title)}</h1>

      ${imageSrc &&
        imageComp({
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
        dateTime &&
        /*html*/ `<time class="heading__datetime" datetime="${dateTime}">
        ${dateReadable}
        </time>`
      }

    </div>
  </div>`;
};
