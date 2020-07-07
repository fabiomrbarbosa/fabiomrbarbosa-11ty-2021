module.exports = function (
  content,
  { level = 2, title = "", linkText = "", linkTarget = "", className = "" } = {}
) {
  const feedClass = className ? ` ${className}` : "";
  const hx = "h" + Math.min(level, 6);

  return /*html*/ `
    <div class="gridlist ${feedClass}">
      <div class="gridlist__inner">
        ${title && /*html*/ `<${hx} class="gridlist__title">${title}</${hx}>`}
        ${content}
        ${linkTarget &&
        /*html*/ `<div class="gridlist__footer">
          <a class="gridlist__link" href="${linkTarget}">${linkText}</a>
        </div>`}
      </div>
    </div>
  `;
};
