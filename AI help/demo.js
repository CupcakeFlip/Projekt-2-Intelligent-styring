let color = [
  [
    "yellow",
    "blue",
    "blue",
    "orange",
    "green",
    "orange",
    "green",
    "green",
    "white",
  ],
  [
    "yellow",
    "orange",
    "orange",
    "yellow",
    "red",
    "green",
    "blue",
    "white",
    "green",
  ],
  [
    "green",
    "red",
    "blue",
    "white",
    "white",
    "blue",
    "green",
    "white",
    "orange",
  ],
  [
    "orange",
    "yellow",
    "red",
    "red",
    "yellow",
    "green",
    "yellow",
    "orange",
    "red",
  ],
  [
    "red",
    "red",
    "orange",
    "yellow",
    "orange",
    "white",
    "blue",
    "yellow",
    "white",
  ],
  ["white", "blue", "yellow", "red", "blue", "blue", "white", "green", "red"],
];

let cubeState = [];

function idk() {
  const orders = [0, 2, 3, 1, 4, 5];
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    for (let j = 0; j < 9; j++) {
      c = color[order][j];

      if (c == "red") {
        cubeState.push("r");
      } else if (c == "orange") {
        cubeState.push("l");
      } else if (c == "white") {
        cubeState.push("d");
      } else if (c == "yellow") {
        cubeState.push("u");
      } else if (c == "green") {
        cubeState.push("b");
      } else if (c == "blue") {
        cubeState.push("f");
      }
    }
  }
  console.log(cubeState);
}

idk();
