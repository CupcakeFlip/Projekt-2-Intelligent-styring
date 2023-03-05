let colorNames = [];
let h, s, v, colorName;

/**
 * Analyses the image on the canvas, to find the colors from the middle of the 9 squares. It takes the average of 5 pixels in each square, and returns that to an array.
 * 
 * @param {*} ctx 
 * @returns 
 */
function analyseImage(ctx) {
  // making sure to clear array every time function is called.
  colorNames = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      for (let n = 0; n < 5; n++) {
        // finds 5 pixel data and pushes them into an array.
        const pixelData = ctx.getImageData(
          x * 200 + 90 + n * 5,
          y * 200 + 90 + n * 5,
          1,
          1
        ).data;

        // Calculate the sum of each color, for each pixel
        totalRed += pixelData[0];
        totalGreen += pixelData[1];
        totalBlue += pixelData[2];
      }

      const numPix = 5;

      const red = Math.round(totalRed / numPix);
      const green = Math.round(totalGreen / numPix);
      const blue = Math.round(totalBlue / numPix);

      const [h, s, v] = rgbToHsv(red, green, blue);

      colorNames.push(getHSV_ColorName([h, s, v]));

      displayColorNames(colorName, x, y, ctx);
    }
  }
  return;
}

/**
 * Converts RGB values to HSV values
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @returns {Array} [h, s, v] - array of h, s and v
 */
function rgbToHsv(red, green, blue) {
  (red /= 255), (green /= 255), (blue /= 255);

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const diff = max - min;

  v = max;

  /*
  checks whether the maximum value of red, green and blue are 0, if true then sets s value to 0, which indicates that the color is grayscale. 
  If its false then it sets s value to diff/max.
  */
  s = max == 0 ? 0 : diff / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case red:
        h = (green - blue) / diff + (green < blue ? 6 : 0);
        break;
      case green:
        h = (blue - red) / diff + 2;
        break;
      case blue:
        h = (red - green) / diff + 4;
        break;
    }
    h /= 6;
  }
  h = Math.floor(h * 360);

  console.log(h, s, v);

  return [h, s, v];
}

/**
 * Gets the color name.
 *
 * ! Its important to note that too much light on the image can return the wrong colorname
 * @param {Array} hsv return from rgbToHSV
 * @returns {String} colorName
 */
function getHSV_ColorName([h, s, v]) {
  if (s < 0.25) {
    colorName = "white";
    return colorName;
  } else if (h < 7 || h > 300) {
    colorName = "red";
  } else if (h < 43) {
    colorName = "orange";
  } else if (h < 75) {
    colorName = "yellow";
  } else if (h < 165) {
    colorName = v == 1 ? "white" : "green";
  } else {
    colorName = v == 1 ? "white" : "blue";
  }

  return colorName;
}
