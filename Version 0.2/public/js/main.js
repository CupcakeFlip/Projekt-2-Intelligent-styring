const tryAgainButton = document.getElementById("tryAgainButton");
const snapButton = document.getElementById("snapButton");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

const video = document.getElementById("video");
const canvas = document.getElementById("videoCanvas");
const resultCanvas = document.getElementById("resultCanvas");
const div = document.getElementById("divText");
const result = document.getElementById("header");

ctx = canvas.getContext("2d");

const ctxResult = resultCanvas.getContext("2d");

let counter = 0;
let allColorNames = [];

const camOrientation = ["blue", "red", "green", "orange", "yellow", "white"];
const upOrientation = ["yellow", "yellow", "yellow", "yellow", "blue", "green"];

// Get access to the camera and stream video to the video element
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    div.innerHTML = `Make sure that the ${camOrientation[counter]} is facing the camera, while the ${upOrientation[counter]} is facing up`;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      drawOnCanvas();
    };
  })
  .catch((err) => {
    console.error(err);
  });

function drawOnCanvas() {
  // Set the dimensions of the canvas to match the video
  canvas.width = 600;
  canvas.height = 600;

  // Draw the video stream on the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      ctx.fillStyle = "black";
      ctx.strokeRect(x * 200, y * 200, 200, 200); // Draws the big rectangles
      ctx.strokeRect(x * 200 + 75, y * 200 + 75, 50, 50); // Draws the small rectangles
    }
  }

  // Call this function again to update the canvas
  requestAnimationFrame(drawOnCanvas);
}

function takePhoto() {
  // Draw the snapshot of the video on a new canvas
  cube.style.display = "none";
  canvas.style.display = "none";
  resultCanvas.style.display = "inline";
  resultCanvas.width = 600;
  resultCanvas.height = 600;
  // Draw the snapshot canvas on the result canvas
  ctxResult.drawImage(video, 0, 0, resultCanvas.width, resultCanvas.height);

  analyseImage(ctxResult);
}

snapButton.addEventListener("click", takePhoto);

document.addEventListener("keydown", function (event) {
  // Check if the key pressed is the spacebar
  if (event.key === " " || event.key === "Spacebar") {
    // Prevent the default spacebar behavior (scrolling the page down)
    event.preventDefault();
    // Call the function
    takePhoto();
  }
});

tryAgainButton.addEventListener("click", function () {
  // goes back to photomode
  canvas.style.display = "inline";
  resultCanvas.style.display = "none";
  cube.style.display = "none";
  cubeState = [];
  cubeStateString = "";
  ctxResult.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
});

saveButton.addEventListener("click", function () {
  allColorNames.push(colorNames);
  console.log(allColorNames);

  counter++;
  div.innerHTML = `Make sure that the ${camOrientation[counter]} is facing the camera, while the ${upOrientation[counter]} is facing up`;
  result.innerHTML = `The colors have been saved. You have now saved ${counter} images`;
  if (counter === 6) {
    colorToSide(allColorNames);
    div.style.display = "none";
    // resets the counter and the array of colornames
    counter = 0;
    allColorNames = [];
    return;
  }
  canvas.style.display = "inline";
  resultCanvas.style.display = "none";
  cube.style.display = "none";
  ctxResult.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
});

resetButton.addEventListener("click", function () {
  counter = 0;
  allColorNames = [];
  result.innerHTML = "All Data has been reset.";
  canvas.style.display = "inline";
  resultCanvas.style.display = "none";
  cube.style.display = "none";
  cubeState = [];
  cubeStateString = "";
});

/**
 * Draws on the canvas, and captures where the pixelvalues are located,
 * it also writes the name of the color
 *
 * @param {string} color - RGB value for the pixel values
 * @param {number} x - x position
 * @param {number} y - y position
 * @param {*} ctx - gives the context of where to draw
 */
function displayColorNames(colorName, x, y, ctx) {
  ctx.fillStyle = colorName;
  ctx.fillRect(x * 200 + 75, y * 200 + 75, 50, 50); // fills the small rectangles
  ctx.fillStyle = "black";
  ctx.strokeRect(x * 200, y * 200, 200, 200); // draws the big rectangles
  ctx.strokeRect(x * 200 + 75, y * 200 + 75, 50, 50); // draws the small rectangles

  const textWidth = ctx.measureText(colorName).width;

  // Set the position of the rectangle
  const rectX = x * 200 + 75;
  const rectY = y * 200 + 125;
  const rectWidth = textWidth + 10;
  const rectHeight = 15;

  ctx.fillStyle = "white";
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight); // Draw the rectangle under the text

  ctx.fillStyle = "black";
  ctx.fillText(colorName, x * 200 + 80, y * 200 + 135);
}

/**
 * Snap Button
 * takes a picture
 * and starts to analyse the picture
 *
 * Save Button
 * if the analyse of the picture is correct, then push button
 * if not correct tap try again button
 *
 * Try again button
 * if the analyse of the picture is incorrect.
 * and there is a need to take another picture
 *
 * new cube button
 *        gotte replace each other
 * generate solution button
 *
 * restet button
 *
 * implementation of wich side to take next picture of
 * blue - yellow - white - red - green - orange
 *
 */
