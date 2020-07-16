const { readFileSync } = require("fs");
const path = require("path");
const md = require("markdown-it")();

module.exports = function ({
  title = "",
  subtitle = "",
  dateTime = "",
  dateReadable = "",
  image = "",
  className = "",
} = {}) {
  // Check if the linked image is in fact an SVG
  function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  const headingClass = className ? ` ${className}` : "";
  const imageExt = image ? getFileExtension(image) : '';
  const imagePath = imageExt ? path.resolve(__dirname, "../../", image) : '';
  const returnSVG = imageExt ? readFileSync(imagePath).toString() : '';

  return /*html*/ `
    <div class="heading ${headingClass}">
      <div class="heading__content">
        ${returnSVG && /*html*/ `<div class="heading__image">${returnSVG}</div>`}
        <div class="heading__text">
          <h1 class="heading__title">${title}</h1>
          ${
            subtitle &&
            /*html*/ `<p class="heading__subtitle">${md.renderInline(
              subtitle
            )}</p>`
          }
          ${
            dateTime &&
            /*html*/ `<time class="heading__datetime" datetime="${dateTime}">
            ${dateReadable}
          </time>`
          }
        </div>
      </div>
    </div>
  `;
};
