import puzzleInput from './input';

const intcode = [...puzzleInput];
intcode[1]= 12;
intcode[2] = 2;

const add = (one: number, two: number) => {
  return one + two;
}
const multiply = (one: number, two: number) => {
  return one * two;
}

const Operation = {
  1: add,
  2: multiply,
  99: 'stop',
}

let next = true;
let cursor = 0;
let cursorStep = 4;

while (next) {
  const opCode: 1 | 2 | 99 = intcode[cursor] as 1 | 2 | 99;
  const op = Operation[opCode];
  const storePosition = cursor + 3;
  if (typeof op !== 'function') {
    next = false;
    break;
  }

  intcode[storePosition] = op(intcode[cursor + 1], intcode[cursor + 2]);

  cursor += cursorStep;
}

// console.log({intcode});