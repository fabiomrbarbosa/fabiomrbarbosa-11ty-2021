const { html } = require("common-tags");

module.exports = function (
  content,
  { level = 2, title = "", linkText = "", linkTarget = "", className = "" } = {}
) {
  const feedClass = className ? ` ${className}` : "";
  const hx = "h" + Math.min(level, 6);

  return html`
    <div class="gridlist ${feedClass}">
      <div class="gridlist__inner">
        ${title && `<${hx} class="gridlist__title">${title}</${hx}>`} ${content}
        ${linkTarget &&
        `<a class="gridlist__link" href="${linkTarget}">${linkText}</a>`}
      </div>
    </div>
  `;
};
