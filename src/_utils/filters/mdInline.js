const md = require("../libraries/markdown");

module.exports = (value) => {
  return md.renderInline(value);
}
