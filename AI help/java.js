const canvas = document.getElementById("canvas");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const saveButton = document.getElementById("saveButton");
//const resultDiv = document.getElementById("result");
const result2Div = document.getElementById("result2");

const ctx = canvas.getContext("2d");

const images = [];

/*for (let i = 1; i <= 17; i++) {
  images.push("picture/cube (" + i + ").jpg");
} */

for (let i = 1; i <= 6; i++) {
  images.push("testCube/testCube (" + i + ").jpg");
}

let currentImageIndex = 0;
let currentImage = new Image();
currentImage.src = images[currentImageIndex];

const targetWidth = 600;
const targetHeight = 600;
let sumColorArray = [];

currentImage.addEventListener("load", () => {
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  ctx.drawImage(currentImage, 0, 0, targetWidth, targetHeight);
  analyseImage();
});

nextButton.addEventListener("click", function () {
  // go to next image, or start over if at end of array
  currentImageIndex = (currentImageIndex + 1) % images.length;
  currentImage = new Image();
  currentImage.src = images[currentImageIndex];
  // redraw the canvas with the new image, and calls the function
  currentImage.onload = function () {
    ctx.drawImage(currentImage, 0, 0, targetWidth, targetHeight);
    analyseImage();
  };
});

backButton.addEventListener("click", function () {
  // go to the previous image, or start over if at start of array
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  currentImage = new Image();
  currentImage.src = images[currentImageIndex];
  // redraw the canvas with the new image and calls the function
  currentImage.onload = function () {
    ctx.drawImage(currentImage, 0, 0, targetWidth, targetHeight);
    analyseImage();
  };
});

saveButton.addEventListener("click", () => {});

/**
 * Draws on the canvas, and captures where the pixelvalues are located,
 * it also writes the name of the color
 * @param {string} color - RGB value for the pixel values
 * @param {number} sumColor - delete
 * @param {number} x - x position
 * @param {number} y - y position
 */
function displayColorNames(colorName, x, y) {
  ctx.fillStyle = colorName;
  ctx.fillRect(x * 200 + 75, y * 200 + 75, 50, 50);
  ctx.fillStyle = "black";
  ctx.strokeRect(x * 200, y * 200, 200, 200);
  ctx.strokeRect(x * 200 + 75, y * 200 + 75, 50, 50);

  const textWidth = ctx.measureText(colorName).width;

  // Set the position of the rectangle
  const rectX = x * 200 + 75;
  const rectY = y * 200 + 125;
  const rectWidth = textWidth + 10;
  const rectHeight = 15;

  ctx.fillStyle = "white";

  // Draw the rectangle
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  ctx.fillStyle = "black";

  ctx.fillText(colorName, x * 200 + 80, y * 200 + 135);
}
