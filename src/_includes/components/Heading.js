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
  image = "",
  imageAlt = ""
} = {}) {
  return /*html*/ `
  <div class="heading ${className} ">
    <div class="heading__inner">

      <h1 class="heading__title">${md.renderInline(title)}</h1>

      ${image &&
        imageComp({
          lazy: false,
          className: "heading__img",
          image: image, alt:
          imageAlt,
          size: "wide", })
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
