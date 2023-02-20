const canvas = document.getElementById("canvas");
//const fileInput = document.getElementById("fileInput");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const saveButton = document.getElementById("saveButton");
const resultDiv = document.getElementById("result");

const ctx = canvas.getContext("2d");

const images = [];

for (let i = 1; i <= 17; i++) {
  images.push("picture/cube (" + i + ").jpg");
}

/* const images = [
  "picture/rubiksCubeTest.jpg",
  "picture/blueTest.jpg",
  "picture/yellowTest.jpg",
  "picture/whiteTest.jpg",
]; */

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

saveButton.addEventListener("click", () => {
  // Create a new Blob object with the contents of the variable
  const filename = "output.txt";
  const blob = new Blob([sumColorArray], { type: "text/plain" });

  // Create a new anchor element to act as a link to the file
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);

  // Click the link to download the file
  link.click();
});

/**
 * Draws on the canvas, and captures where the pixelvalues are located, also writes the RGB values
 * @param {string} color - RGB value for the pixel values
 * @param {number} sumColor - delete
 * @param {number} x - x position
 * @param {number} y - y position
 */
function displayColorValuesRGB(color, sumColor, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x * 200 + 75, y * 200 + 75, 50, 50);
  ctx.fillStyle = "black";
  ctx.strokeRect(x * 200, y * 200, 200, 200);
  ctx.strokeRect(x * 200 + 75, y * 200 + 75, 50, 50);

  const textWidth = ctx.measureText(color).width;

  // Set the position of the rectangle
  const rectX = x * 200 + 70;
  const rectY = y * 200 + 125;
  const rectWidth = textWidth + 10;
  const rectHeight = 15;

  ctx.fillStyle = "white";

  // Draw the rectangle
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  ctx.fillStyle = "black";

  ctx.fillText(color, x * 200 + 75, y * 200 + 135);
  ctx.fillText(sumColor, x * 200 + 75, y * 200 + 155);
}
