// Auto-generate social media images from Cloudinary
// replace( '%2C%20', '%252C%20' ) is used in order to properly escape commas

module.exports = function (title = "", description = "") {
  const cloudName = "https://res.cloudinary.com/fabiomrbarbosa/image/upload/";
  const imageConfig = ["w_1280", "h_669", "c_fill", "q_auto", "f_auto"].join(",");
  const titleConfig = [
    "/w_740",
    "c_fit",
    "co_rgb:fbfbfb",
    "g_south_west",
    "x_480",
    "y_254",
    "l_text:fonts:fmrb-title.ttf_64_letter_spacing_-2_line_spacing_-10:",
  ].join(",");
  const titleUrl = encodeURIComponent(title)
    .replace("%2C%20", "%252C%20")
    .replace("%3F", "%253F");
  const taglineConfig = [
    "/w_740",
    "c_fit",
    "co_rgb:fbfbfb",
    "g_north_west",
    "x_480",
    "y_445",
    "l_text:fonts:fmrb-tagline.ttf_48_letter_spacing_-1_line_spacing_-5:",
  ].join(",");
  const taglineUrl = encodeURIComponent(description)
    .replace("%2C%20", "%252C%20")
    .replace("%3F", "%253F");
  const imagePublicID = "/socialMediaCard";

  const cloudImage =
    cloudName +
    imageConfig +
    titleConfig +
    titleUrl +
    taglineConfig +
    taglineUrl +
    imagePublicID;

  return cloudImage;
};
