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
