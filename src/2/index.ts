import puzzleInput from "./input";

const intcode = [...puzzleInput];
intcode[1] = 12;
intcode[2] = 2;

const add = (one: number, two: number) => {
  return one + two;
};
const multiply = (one: number, two: number) => {
  return one * two;
};

const Operation = {
  1: add,
  2: multiply,
  99: "stop"
};

let next = true;
let cursor = 0;
let cursorStep = 4;

while (next) {
  const opCode: 1 | 2 | 99 = intcode[cursor] as 1 | 2 | 99;
  const op = Operation[opCode];
  const value1Position = intcode[cursor + 1];
  const value2Position = intcode[cursor + 2];
  const storePosition = intcode[cursor + 3];

  const value1 = intcode[value1Position];
  const value2 = intcode[value2Position];

  console.group("op-block");
  console.log({
    cursor,
    opCode,
    op,
    value1Position,
    value2Position,
    storePosition,
    value1,
    value2
  });

  if (typeof op !== "function") {
    console.log("break!!");
    next = false;
    break;
  }

  const solution = op(value1, value2);
  console.log({ solution });
  intcode[storePosition] = solution;

  cursor += cursorStep;
  console.log("next cursor: ", cursor);
  console.groupEnd();
}

console.log({ end_solution: intcode[0] });
