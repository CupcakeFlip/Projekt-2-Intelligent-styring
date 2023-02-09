const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("test");

image.addEventListener("load", (e) => {
  getColor(image);
});

function getColor(image) {
  var defaultRGB = { r: 0, g: 0, b: 0 },
    data,
    width,
    height,
    rgb = { r: 0, g: 0, b: 0 };

  if (!ctx) {
    console.error("Canvas not supported");
    return defaultRGB;
  }

  height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
  width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;

  ctx.drawImage(image, 0, 0);

  try {
    data = ctx.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  return rgb;
}
