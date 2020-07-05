const site = require("../_data/metadata.json");
const imageSize = require("image-size");
const markdownIt = require("markdown-it");
const md = new markdownIt();

const runBeforeHook = (image, document) => {
  // TODO: get "dist/" from config
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
  let imageUrl =
    image.getAttribute("data-pristine") || image.getAttribute("src");

  let caption = image.getAttribute("title");
  if (caption !== null) {
    caption = md.render(caption.trim());
  }

  let zoom = [...image.classList].indexOf("zoom") !== -1;

  let imageParent = image.parentNode;
  if (imageParent.tagName.toLowerCase() === "p" ) {
    imageParent.replaceWith(...imageParent.childNodes);
  }

  const figure = document.createElement("figure");
  figure.classList.add(...image.classList);
  image.classList.remove(...image.classList);

  figure.appendChild(image.cloneNode(true));

  if (caption || zoom) {
    let figCaption = document.createElement("figcaption");
    figCaption.innerHTML =
      (caption ? caption : "") +
      (zoom
        ? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
        : "");
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
    fallbackWidth: 800,
    minWidth: 360,
    maxWidth: 1600,
    sizes: "(max-width: 67rem) 90vw, 60rem",
    attributes: {
      loading: "lazy",
    },
  },
  twothirds: {
    fallbackWidth: 600,
    minWidth: 240,
    maxWidth: 1120,
    sizes: "(max-width: 20rem) 45vw, (max-width: 67rem) 60vw, 40rem",
    classes: ["twothirds"],
  },
  onehalf: {
    fallbackWidth: 400,
    minWidth: 180,
    maxWidth: 800,
    sizes: "(max-width: 67rem) 45vw, 30rem",
    classes: ["onehalf"],
  },
  onethird: {
    fallbackWidth: 300,
    minWidth: 120,
    maxWidth: 560,
    sizes: "(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem",
    classes: ["onethird", "right"],
  },
  onefourth: {
    fallbackWidth: 200,
    minWidth: 100,
    maxWidth: 400,
    sizes:
      "(max-width: 20rem) 45vw, (max-width: 30rem) 30vw, (max-width: 67rem) 22.5vw, 15rem",
    classes: ["onefourth", "right"],
  },
};
