//const solver = require("rubiks-cube-solver");

//const solver = rubiksCubeSolver.Solver;

//const solver1 = new rubiksCubeSolver.Solver;

/*
front face is green, 
up face is white, 
right face is red,
back face is blue, 
left face is orange, 
down face is yellow.

Go through all the faces in this order: 
front, right, up, down, left, back,
*/

/* let cubeState = [
  "flulfbddr", // front
  "rudrruddl", // right
  "dbbburrfb", // up
  "llffdrubf", // down
  "rludlubrf", // left
  "lubfbfudl", // back
].join(""); */

let cubeState = [];
let cases = "";
// It recreates the colors into the right side
function colorToSide(color) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      c = color[i][j];

      if (c == "white") {
        cubeState.push("u");
      } else if (c == "red") {
        cubeState.push("r");
      } else if (c == "orange") {
        cubeState.push("l");
      } else if (c == "yellow") {
        cubeState.push("d");
      } else if (c == "green") {
        cubeState.push("f");
      } else if (c == "blue") {
        cubeState.push("b");
      }
    }
  }

  const cubeStateString = cubeState.join("");

  const solver = new rubiksCubeSolver.Solver(cubeStateString);

  solver.solve();

  console.log(cubeStateString);
  const moves = solver.getMoves();
  console.log(moves);

  cubeMoves.innerHTML = `Moves: ${moves}`;

  cases = moves.replace(/prime/g, "'");

  cases = cases.replace(/U U/g, "U2");
  cases = cases.replace(/F F/g, "F2");
  cases = cases.replace(/R R/g, "R2");
  cases = cases.replace(/B B/g, "B2");
  cases = cases.replace(/L L/g, "L2");
  cases = cases.replace(/D D/g, "D2");


  console.log(cases);

  drawCube(cases);

  return cubeStateString;
}

function drawCube(cases) {
  canvas.style.display = "none";
  TTk.AlgorithmPuzzle(3)
    .size({ width: 1000, height: 600 })
    .case(cases)(cube);
}

//solver.solve();

/*
Uprime F U U Fprime Uprime F F D D B B D Fprime Uprime R U D D F D Fprime Dprime F D Fprime D D L D Lprime Dprime R D D Rprime D Bprime Dprime B D B Dprime Bprime Dprime Rprime D R D D Lprime Dprime L D D Lprime D L B Rprime Bprime Dprime B D R Dprime Bprime L2 F2 Lprime Bprime L F2 Lprime B Lprime D D
*/
