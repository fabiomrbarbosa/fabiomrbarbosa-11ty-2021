module.exports = function (
  content = "",
  {
    level = 2,
    title = "",
    linkText = "",
    linkTarget = "",
    className = "",
  } = {}
) {
  let hx = "h" + level;

  return /*html*/ `
  <div class="archivelist ${className}">
    <div class="archivelist__inner">
    ${
      title &&
      /*html*/ `
      <${hx} class="archivelist__title">${title}</${hx}>
    `
    }

    ${content}

    ${
      linkTarget &&
      /*html*/ `
      <div class="archivelist__footer">
        <a class="archivelist__link" href="${linkTarget}">
          ${linkText}
        </a>
      </div>
    `
    }
  </div>
</div>`;
};
