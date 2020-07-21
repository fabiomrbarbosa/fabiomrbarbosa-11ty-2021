const { readFileSync } = require("fs");
const path = require("path");

module.exports = function ( location = "" ) {
  const monogram = readFileSync(
    path.resolve(__dirname, "../../assets/images/logo_monogram.svg")
  ).toString();
  const rays = readFileSync(
    path.resolve(__dirname, "../../assets/images/logo_rays.svg")
  ).toString();

  const monogramPos = monogram.replace(
    /site__logo/g,
    "site-" + location + "__logo"
  );

  if (location == "header") {
    return monogramPos + rays;
  } else {
    return monogramPos;
  }
};
