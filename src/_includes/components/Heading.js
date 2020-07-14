const md = require("markdown-it")();

module.exports = function ({
  title = "",
  subtitle = "",
  dateTime = "",
  dateReadable = "",
  image = "",
  className = "",
} = {}) {
  const headingClass = className ? ` ${className}` : "";

  return /*html*/ `
    <div class="heading ${headingClass}">
      <div class="heading__content">
        ${image && /*html*/ `<div class="heading__image"><img src="${image}" alt=""></div>`}
        <div class="heading__text">
          <h1 class="heading__title">${title}</h1>
          ${
            subtitle &&
            /*html*/ `<p class="heading__subtitle">${md.renderInline(subtitle)}</p>`
          }
          ${
            dateTime &&
            /*html*/ `<time class="heading__datetime" datetime="${dateTime}">
            ${dateReadable}
          </time>`}
        </div>
      </div>
    </div>
  `;
};
