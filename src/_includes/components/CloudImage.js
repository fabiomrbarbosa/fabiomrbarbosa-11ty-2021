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
    "/w_980",
    "c_fit",
    "co_rgb:cd3700",
    "g_north_west",
    "x_248",
    "y_75",
    "l_text:fonts:crimson-roman-webfont.ttf_86_letter_spacing_-4_line_spacing_-6:",
  ].join(",");
  let titleUrl = fixedEncodeURIComponent(title);
  let taglineConfig = [
    "/w_980",
    "c_fit",
    "co_rgb:111111",
    "g_north_west",
    "x_248",
    "y_290",
    "l_text:fonts:crimson-roman-webfont.ttf_56_letter_spacing_-3_line_spacing_0:",
  ].join(",");
  let taglineUrl = fixedEncodeURIComponent(description);
  let imagePublicID = "/socialMediaGraph";

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
