/**
 * Analyses the image on the canvas, to find the colors from the middle of the 9 squares. It takes the average of 5 pixels in each square, and returns that to an array.
 * @returns sumColorArray, that contains the 9 colors from the current image
 */
function analyseImage() {
  // making sure to clear array every time function is called.
  const colors = [];
  sumColorArray = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      let averageRed = [];
      let averageGreen = [];
      let averageBlue = [];

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

        averageRed.push(pixelData[0]);
        averageGreen.push(pixelData[1]);
        averageBlue.push(pixelData[2]);

        console.log(averageRed, averageBlue, averageGreen);
      }

      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;
      let sumColor = 0;

      /**
       * Calculate the sum of each color, for each pixel
       */
      for (let i = 0; i < 5; i++) {
        sumRed += averageRed[i];
        sumGreen += averageGreen[i];
        sumBlue += averageBlue[i];
      }

      const numColors = averageRed.length;

      /**
       * @Remove
       */
      sumColor +=
        Math.round(sumRed / numColors) +
        Math.round(sumGreen / numColors) +
        Math.round(sumBlue / numColors);

      sumColorArray.push(sumColor);
      console.log("sumColor", sumColor);

      const red = Math.round(sumRed / numColors);
      const green = Math.round(sumGreen / numColors);
      const blue = Math.round(sumBlue / numColors);

      const color = `rgb(${red} ,${green}, ${blue})`;

      console.log(sumRed, sumGreen, sumBlue, color, "x", x, "y", y);
      colors.push(color);

      displayColorValuesRGB(color, sumColor, x, y);

      rgbToHsl(red, green, blue);

      //getHSL_ColorName(h, s, l);

      /*
       todo: find what the average color is equal to, 
       so find the range for red, orange, green, blue, white and yellow
       find the span between for each color

       */

      // Display the color of 9 pixels in the resultDiv
      resultDiv.innerHTML = `Colors: ${colors.join(", ")}`;
    }
  }
  console.log("sumcolorArray", sumColorArray);
  return sumColorArray;
}

/**
 * converts RGB values to HSL values
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @returns h, s, l
 */
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
  console.log("hsl", h, s, l);
  return h, s, l;
}

/**
 * @param {*} h - hue
 * @param {*} s - saturation
 * @param {*} l - lightness
 * @returns {string}
 */
function getHSL_ColorName(h, s, l) {
  if (s < 0.15) {
    colorName = "white";
    return colorName;
  }else if (){
    
  }
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
