import puzzleInput from "./input";

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

const runProgram = (input: number[], noun: number, verb: number) => {
  const intcode = [...input];
  intcode[1] = noun;
  intcode[2] = verb;

  let cursor = 0;
  let cursorStep = 4;

  while (true) {
    const opCode: 1 | 2 | 99 = intcode[cursor] as 1 | 2 | 99;
    const op = Operation[opCode];
    if (typeof op !== "function") {
      break;
    }

    const value1Position = intcode[cursor + 1];
    const value2Position = intcode[cursor + 2];
    const storePosition = intcode[cursor + 3];

    const value1 = intcode[value1Position];
    const value2 = intcode[value2Position];

    const solution = op(value1, value2);
    intcode[storePosition] = solution;

    cursor += cursorStep;
  }
  return { solution: intcode[0], noun, verb };
};

const desiredResult = 19690720;

for (let n = 0; n < 100; n++) {
  for (let v = 0; v < 100; v++) {
    const programResult = runProgram(puzzleInput, n, v);
    if (programResult.solution === desiredResult) {
      console.log({ programResult, puzzleSolution: 100 * n + v });
    }
  }
}
