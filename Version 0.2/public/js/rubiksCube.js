/*
front face is blue, 
up face is yellow, 
right face is red,
back face is green, 
left face is orange, 
down face is white.

Go through all the faces in this order: 
front, right, up, down, left, back,
front right back left up down
0-0   1-1   2-5  3-4  4-2  5-3 

0-1-4-5-3-2
*/

/* let cubeState = [
  "flulfbddr", // front 0
  "rudrruddl", // right 1
  "dbbburrfb", // up 2
  "llffdrubf", // down 3
  "rludlubrf", // left 4
  "lubfbfudl", // back 5
].join(""); */

const order = [0, 1, 4, 5, 3, 2]; // so you can take pictures around the cube before having to take the top and bottom.

let cases = "";

/**
 * It recreates the colors into the right side
 *
 * @param {Array} color - an array with the colors stings
 * @returns
 */
function colorToSide(color) {
  /*color = [
    [
      "red",
      "orange",
      "blue",
      "yellow",
      "blue",
      "blue",
      "red",
      "yellow",
      "green",
    ],
    [
      "orange",
      "yellow",
      "yellow",
      "white",
      "red",
      "orange",
      "yellow",
      "white",
      "blue",
    ],
    [
      "orange",
      "white",
      "green",
      "green",
      "green",
      "blue",
      "yellow",
      "blue",
      "red",
    ],
    [
      "white",
      "green",
      "green",
      "red",
      "orange",
      "red",
      "white",
      "white",
      "green",
    ],
    [
      "orange",
      "orange",
      "blue",
      "red",
      "yellow",
      "green",
      "white",
      "yellow",
      "white",
    ],
    [
      "yellow",
      "blue",
      "orange",
      "red",
      "white",
      "green",
      "blue",
      "orange",
      "red",
    ],
  ];*/ // test case
  let cubeState = [];
  let cubeStateString = "";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      c = color[order[i]][j];

      if (c == "orange") {
        cubeState.push("l");
      } else if (c == "red") {
        cubeState.push("r");
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

  cubeStateString = cubeState.join("");

  console.log(cubeStateString);
  const solver = new rubiksCubeSolver.Solver(cubeStateString);
  //solver = new rubiksCubeSolver.Solver("rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr"); // Test case

  solver.solve();

  const moves = solver.getMoves();

  // making sure that the moves amount gets more compact, so they fill less
  cases = moves
    .replace(/prime/g, "'")
    .replace(/([UFBRDL])' \1'/g, `$12`)
    .replace(/([UFBRDL])' \1/g, "")
    .replace(/([UFBRDL]) \1'/g, "")
    .replace(/([UFBRDL]) \1/g, "$12");

  drawCube(cases);

  return;
}

function drawCube(cases) {
  // draws the cube
  resultCanvas.style.display = "none";
  let dCube = TTk.AlgorithmPuzzle(3)
    .size({ width: 1500, height: 500 })
    // Whether to show buttons on hover
    .hoverButtons(false)
    // Whether to show alg on hover
    .hoverAlg(false)
    .movePeriod(300)
    .case(cases);
  dCube("#ap1");
}

// Test cases
[
  ["red", "orange", "blue", "yellow", "blue", "blue", "red", "yellow", "green"],
  [
    "orange",
    "yellow",
    "yellow",
    "white",
    "red",
    "orange",
    "yellow",
    "white",
    "blue",
  ],
  [
    "orange",
    "white",
    "green",
    "green",
    "green",
    "blue",
    "yellow",
    "blue",
    "red",
  ],
  [
    "white",
    "green",
    "green",
    "red",
    "orange",
    "red",
    "white",
    "white",
    "green",
  ],
  [
    "orange",
    "orange",
    "blue",
    "red",
    "yellow",
    "green",
    "white",
    "yellow",
    "white",
  ],
  [
    "yellow",
    "blue",
    "orange",
    "red",
    "white",
    "green",
    "blue",
    "orange",
    "red",
  ],
];
("rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr");

//solver.solve();

/*
Uprime F U U Fprime Uprime F F D D B B D Fprime Uprime R U D D F D Fprime Dprime F D Fprime D D L D Lprime Dprime R D D Rprime D Bprime Dprime B D B Dprime Bprime Dprime Rprime D R D D Lprime Dprime L D D Lprime D L B Rprime Bprime Dprime B D R Dprime Bprime L2 F2 Lprime Bprime L F2 Lprime B Lprime D D
*/

/*
Front: BFRLFFRDR
Right: BBBRRFBBU
up: DBUDUUDDU
down: FLDRDDRBL
back: LRFUBLFLD
left: LRLULFFUU


DBUDUUDDUBBBRRFBBUBFRLFFRDRFLDRDDRBLLRLULFFUULRFUBLFLD

rlfu f frub
luud r ludf
llfr u bdud
uflr d bflr
dbbr l rddb
ldbb b fufr

rlfu f frub
luud r ludf
llfr u bdud
uflr d bflr
dbbr l rddb
ldbb b fufr
RLFUFFRUB
LUUDRLUDF
LLFRUBDUD
UFLRDBFLR
DBBRLRDDB
LDBBBFUFR

LLFRUBDUDLUUDRLUDFRLFUFFRUBUFLRDBFLRDBBRLRDDBLDBBBFUFR

bfrl f frdr bbbr r fbbu dbud u uddu fldr d drbl lrlu l ffuu lrfu b lfld
rlfu f frub luud r ludf llfr u bdud uflr d bflr dbbr l rddb ldbb b fufr

rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr
rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr
rlfuffrlbluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr
rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr
*/
