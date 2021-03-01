const { readFileSync } = require("fs");
const path = require("path");

module.exports = function ({ file = "", location = "" } = {}) {
  let icon = readFileSync(path.resolve(__dirname, file)).toString();

  if (location) {
    icon = icon.replace(/LOCATION/g, location);
  }

  return icon;
};
