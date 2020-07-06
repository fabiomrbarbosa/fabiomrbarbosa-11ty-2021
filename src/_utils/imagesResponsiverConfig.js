const site = require("../_data/metadata.json");
const imageSize = require("image-size");
const markdownIt = require("markdown-it");
const md = new markdownIt();

const runBeforeHook = (image) => {
  let siteUrl = site.url.replace(/\/$/, "");
  let srcPath = "./src";

  let imageSrc = image.getAttribute("src");
  let imageUrl = "";

  if (imageSrc.match(/^(https?:)?\/\//)) {
    // TODO: find a way to get a remote image's dimensions
    // TODO: some images are local but have an absolute URL
    imageUrl = imageSrc;
  } else {
    let imageDimensions;
    if (imageSrc[0] === "/") {
      // TODO: get "src/" from Eleventy config
      imageDimensions = imageSize("./src" + imageSrc);
      imageUrl = siteUrl + imageSrc;
    } else {
      // This is a relative URL
      imageDimensions = imageSize(srcPath + imageSrc);
      imageUrl = siteUrl + imageSrc;
    }
    image.setAttribute("width", imageDimensions.width);
    image.setAttribute("height", imageDimensions.height);
    image.setAttribute("src", imageUrl);
  }

  image.dataset.responsiver = image.className;
};

const runAfterHook = (image, document) => {
  let caption = image.getAttribute("title");
  if (caption !== null) {
    caption = md.render(caption.trim());
  }

  let imageParent = image.parentNode;
  if (imageParent.tagName.toLowerCase() === "p") {
    imageParent.replaceWith(...imageParent.childNodes);
  }

  const figure = document.createElement("figure");
  figure.classList.add(...image.classList);
  image.classList.remove(...image.classList);

  figure.appendChild(image.cloneNode(true));

  if (caption) {
    let figCaption = document.createElement("figcaption");
    figCaption.innerHTML = caption ? caption : "";
    figure.appendChild(figCaption);
  }

  image.replaceWith(figure);
};

module.exports = {
  default: {
    selector: ':not(picture) img[src]:not([srcset]):not([src$=".svg"])',
    resizedImageUrl: (src, width) =>
      `https://res.cloudinary.com/fabiomrbarbosa/image/fetch/q_auto,f_auto,w_${width}/${src}`,
    runBefore: runBeforeHook,
    runAfter: runAfterHook,
    fallbackWidth: 960,
    minWidth: 320,
    maxWidth: 1440,
    sizes: "(max-width: 90rem) 90vw, 90rem",
    attributes: {
      loading: "lazy",
    },
  },
  twothirds: {
    fallbackWidth: 480,
    minWidth: 320,
    maxWidth: 920,
    sizes: "(max-width: 56.25rem) 90vw, (max-width: 90rem) 66vw, 57.5rem",
    classes: ["twothirds"],
  },
  onethird: {
    fallbackWidth: 640,
    minWidth: 320,
    maxWidth: 820,
    sizes: "(max-width: 56.25rem) 90vw, (max-width: 90rem) 30vw, 27.75rem",
    classes: ["onethird"],
  },
};
