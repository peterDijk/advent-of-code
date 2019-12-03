// import wirePaths from "./input";
import wirePaths from "./testInput1";

enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN"
}

interface Action {
  direction: Direction;
  steps: number;
}

interface GridPosition {
  x: number;
  y: number;
}

const processInstruction = (ins: string): Action => {
  const direcStr = ins.slice(0, 1);
  const direction =
    direcStr === "U"
      ? Direction.UP
      : direcStr === "D"
      ? Direction.DOWN
      : direcStr === "L"
      ? Direction.LEFT
      : Direction.RIGHT;
  const steps = parseInt(ins.slice(1));

  return {
    direction,
    steps
  };
};

const makeMove = (
  { direction, steps }: Action,
  currentPos: GridPosition
): GridPosition => {
  switch (direction) {
    case Direction.UP:
      return {
        x: currentPos.x,
        y: currentPos.y + steps
      };
    case Direction.DOWN:
      return {
        x: currentPos.x,
        y: currentPos.y - steps
      };
    case Direction.LEFT:
      return {
        x: currentPos.x - steps,
        y: currentPos.y
      };
    case Direction.RIGHT:
    default:
      return {
        x: currentPos.x + steps,
        y: currentPos.y
      };
  }
};

const wire1Positions: GridPosition[] = [{ x: 0, y: 0 }];
const wire2Positions: GridPosition[] = [{ x: 0, y: 0 }];

wirePaths.wire1.forEach((instr: string) => {
  const positionAfterMove = makeMove(
    processInstruction(instr),
    wire1Positions[wire1Positions.length - 1]
  );
  wire1Positions.push(positionAfterMove);
});

wirePaths.wire2.forEach((instr: string) => {
  const positionAfterMove = makeMove(
    processInstruction(instr),
    wire2Positions[wire2Positions.length - 1]
  );
  wire2Positions.push(positionAfterMove);
  if (wire1Positions.includes(positionAfterMove)) {
    console.log("intersection!", positionAfterMove);
  }
});

console.log({ wire1Positions, wire2Positions });
