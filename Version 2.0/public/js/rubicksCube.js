//const solver = require("rubiks-cube-solver");

//const solver = rubiksCubeSolver.Solver;

//const solver1 = new rubiksCubeSolver.Solver;

/*
front face is blue, 
up face is yellow, 
right face is red,
back face is green, 
left face is orange, 
down face is white.

Go through all the faces in this order: 
front, right, up, down, left, back,
*/

/* let cubeState = [
  "flulfbddr", // front 0
  "rudrruddl", // right 1
  "dbbburrfb", // up 2
  "llffdrubf", // down 3
  "rludlubrf", // left 4
  "lubfbfudl", // back 5
].join(""); */

let cubeState = [];
let cases = "";
// It recreates the colors into the right side
function colorToSide(color) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      c = color[i][j];

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

  const cubeStateString = cubeState.join("");

  console.log(cubeStateString);

  const solver = new rubiksCubeSolver.Solver(cubeStateString);

  solver.solve();

  const moves = solver.getMoves();

  cases = moves.replace(/prime/g, "'");

  cases = cases.replace(/U U/g, "U2");
  cases = cases.replace(/F F/g, "F2");
  cases = cases.replace(/R R/g, "R2");
  cases = cases.replace(/B B/g, "B2");
  cases = cases.replace(/L L/g, "L2");
  cases = cases.replace(/D D/g, "D2");

  drawCube(cases);

  return cubeStateString;
}

function drawCube(cases) {
  canvas.style.display = "none";
  TTk.AlgorithmPuzzle(3)
    .size({ width: 1500, height: 500 })
    // Whether to show buttons on hover
    .hoverButtons(false)
    // Whether to show alg on hover
    .hoverAlg(false)
    .movePeriod(300)
    .case(cases)("#t1");
}

function gg() {
  const solver = new rubiksCubeSolver.Solver(
    "rlfuffrubluudrludfllfrubduduflrdbflrdbbrlrddbldbbbfufr"
  );

  solver.solve();

  const moves = solver.getMoves();
  console.log(moves);
/* 
  cases = moves.replace(/prime/g, "'");

  cases = cases.replace(/U' U'/g, "U2");
  cases = cases.replace(/F' F'/g, "F2");
  cases = cases.replace(/R' R'/g, "R2");
  cases = cases.replace(/B' B'/g, "B2");
  cases = cases.replace(/L' L'/g, "L2");
  cases = cases.replace(/D' D'/g, "D2");

  cases = cases.replace(/U' U/g, "");
  cases = cases.replace(/F' F/g, "");
  cases = cases.replace(/R' R/g, "");
  cases = cases.replace(/B' B/g, "");
  cases = cases.replace(/L' L/g, "");
  cases = cases.replace(/D' D/g, "");

  cases = cases.replace(/U U'/g, "");
  cases = cases.replace(/F F'/g, "");
  cases = cases.replace(/R R'/g, "");
  cases = cases.replace(/B B'/g, "");
  cases = cases.replace(/L L'/g, "");
  cases = cases.replace(/D D'/g, "");

  cases = cases.replace(/U U/g, "U2");
  cases = cases.replace(/F F/g, "F2");
  cases = cases.replace(/R R/g, "R2");
  cases = cases.replace(/B B/g, "B2");
  cases = cases.replace(/L L/g, "L2");
  cases = cases.replace(/D D/g, "D2"); */

cases = moves
  .replace(/prime/g, "'")
  .replace(/([UFBRDL])' \1'/g, `$12`)
  .replace(/([UFBRDL])' \1/g, "")
  .replace(/([UFBRDL]) \1'/g, "")
  .replace(/([UFBRDL]) \1/g, "$12")



  drawCube(cases);
}
gg();

/*
Uprime Uprime Lprime U U Fprime Uprime R U Uprime F U Bprime D F Dprime Fprime D D Rprime Dprime R D D R Dprime Rprime D Bprime Dprime B D B D Bprime D D Fprime Dprime F D Lprime Dprime L D Lprime Dprime L R F D Fprime Dprime Rprime L B Dprime Bprime Dprime B D Bprime Lprime B D Bprime Dprime Bprime L B Lprime Dprime

*/

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
*/
