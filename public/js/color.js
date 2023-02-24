let colorNames = [];
let h, s, v, colorName;

/**
 * Analyses the image on the canvas, to find the colors from the middle of the 9 squares. It takes the average of 5 pixels in each square, and returns that to an array.
 * @returns {Array}sumColorArray, that contains the 9 colors from the current image
 */
function analyseImage() {
  // making sure to clear array every time function is called.
  colorNames = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;
      /**
       * finds 5 pixel data and pushes them into an array.
       */
      for (let n = 0; n < 5; n++) {
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

      const numColors = 5;

      const red = Math.round(totalRed / numColors);
      const green = Math.round(totalGreen / numColors);
      const blue = Math.round(totalBlue / numColors);

      const [h, s, v] = rgbToHsv(red, green, blue);

      colorNames.push(getHSV_ColorName([h, s, v]));

      displayColorNames(colorName, x, y);

      // Display the color of 9 pixels in the resultDiv
      //resultDiv.innerHTML = `Colors: ${hsColors.join(", ")}`;
    }
  }
  return;
}

/**
 * converts RGB values to HSL values
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @returns h, s, l
 */
/*
function rgbToHsl(red, green, blue) {
  (red /= 255), (green /= 255), (blue /= 255);
  
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const diff = max - min;
  
  let h,
  s,
  l = (max + min) / 2;
  
  if (diff === 0) {
    h = 0;
  } else if (max === red) {
    h = ((green - blue) / diff) % 6;
  } else if (max === green) {
    h = (blue - red) / diff + 2;
  } else {
    h = (red - green) / diff + 4;
  }
  
  h = Math.round(h * 60);
  
  if (h < 0) {
    h += 360;
  }
  
  if (diff === 0) {
    s = 0;
  } else {
    s = diff / (1 - Math.abs(2 * l - 1));
  }
  
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  //console.log("hsl", h, s, l);
  return h, s, l;
}
*/

/**
 * converts RGB values to HSV values
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @returns {Array} [h, s, v] - array of h and s
 */
function rgbToHsv(red, green, blue) {
  (red /= 255), (green /= 255), (blue /= 255);

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const diff = max - min;

  v = max;

  /*checks whether the maximum value of red, green and blue are 0, if true then sets s value to 0, which indicates that the color is grayscale. 
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
  } else if (h < 15 || h > 300) {
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

/*
hue, saturation, lightness:
(H,S,V) = (hue, saturation, lightness)

Hvid = (0<H<360, S<0.15, L>0.65)
Red = (H<11, H>360, S>0.7, L>0.1)
Orange = (11<H<45, S>0.15, L>0.75)
Gul = (45<H<64,S>0.15, L>0.1)
Grøn = (64<H<165, S>0.15, L>0.1)
Blå = (165<H<300, S>0.15, L>0.1)
*/
