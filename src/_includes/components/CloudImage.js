module.exports = function ({ title = "", description = "" } = {}) {
  function fixedEncodeURIComponent(str) {
    return escape(
      encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return "%" + c.charCodeAt(0).toString(16);
      })
    );
  }

  let cloudName = "https://res.cloudinary.com/fabiomrbarbosa/image/upload/";
  let imageConfig = ["w_1280", "h_669", "c_fill", "q_auto", "f_auto"].join(",");
  let titleConfig = [
    "/w_740",
    "c_fit",
    "co_rgb:fbfbfb",
    "g_south_west",
    "x_480",
    "y_254",
    "l_text:fonts:fmrb-title.ttf_86_letter_spacing_-2_line_spacing_-15:",
  ].join(",");
  let titleUrl = fixedEncodeURIComponent(title);
  let taglineConfig = [
    "/w_740",
    "c_fit",
    "co_rgb:fbfbfb",
    "g_north_west",
    "x_480",
    "y_445",
    "l_text:fonts:fmrb-tagline.ttf_56_letter_spacing_-1_line_spacing_-5:",
  ].join(",");
  let taglineUrl = fixedEncodeURIComponent(description);
  let imagePublicID = "/socialMediaCard";

  return (
    cloudName +
    imageConfig +
    titleConfig +
    titleUrl +
    taglineConfig +
    taglineUrl +
    imagePublicID
  );
};
