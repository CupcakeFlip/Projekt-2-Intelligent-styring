//const solver = require("rubiks-cube-solver");

//const solver = rubiksCubeSolver.Solver;

//const solver1 = new rubiksCubeSolver.Solver;

let cubeState = [
  "flulfbddr", // front
  "rudrruddl", // right
  "dbbburrfb", // up
  "llffdrubf", // down
  "rludlubrf", // left
  "lubfbfudl", // back
].join("");

const solver = new rubiksCubeSolver.Solver(cubeState);
solver.solve();
console.log(solver.getMoves());
