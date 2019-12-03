import wirePaths from "./input";
// import wirePaths from "./testInput3";

const start = Date.now();

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

const inBetweenSteps = (
  pos1: GridPosition,
  pos2: GridPosition
): GridPosition[] => {
  if (pos1.x === pos2.x) {
    const nrOfSteps = pos2.y - pos1.y;
    const step = nrOfSteps < 0 ? -1 : 1;
    const steps: GridPosition[] = [];

    for (let i = 1; i <= Math.abs(nrOfSteps); i++) {
      steps.push({ x: pos2.x, y: pos1.y + step * i });
    }

    return steps;
  } else if (pos1.y === pos2.y) {
    const nrOfSteps = pos2.x - pos1.x;
    const step = nrOfSteps < 0 ? -1 : 1;
    const steps: GridPosition[] = [];

    for (let i = 1; i <= Math.abs(nrOfSteps); i++) {
      steps.push({ x: pos1.x + step * i, y: pos2.y });
    }
    return steps;
  } else {
    throw new Error();
  }
};

const wire1Positions: GridPosition[] = [{ x: 0, y: 0 }];
const wire2Positions: GridPosition[] = [{ x: 0, y: 0 }];

wirePaths.wire1.map(instr => {
  const previousPosition = wire1Positions[wire1Positions.length - 1];

  const positionAfterMove = makeMove(
    processInstruction(instr),
    previousPosition
  );

  const newSteps = inBetweenSteps(previousPosition, positionAfterMove);
  newSteps.forEach(step => {
    wire1Positions.push(step);
  });
});

wirePaths.wire2.map(instr => {
  const previousPosition = wire2Positions[wire2Positions.length - 1];
  const positionAfterMove = makeMove(
    processInstruction(instr),
    previousPosition
  );

  const newSteps = inBetweenSteps(previousPosition, positionAfterMove);
  newSteps.forEach(step => {
    wire2Positions.push(step);
  });
});

interface Intersection extends GridPosition {
  dist: number;
}
const intersections: Intersection[] = [];

wire2Positions.forEach(pos => {
  const intersec = wire1Positions.find(
    w1pos => w1pos.x === pos.x && w1pos.y === pos.y
  );
  if (intersec && intersec.x !== 0 && intersec.y !== 0) {
    intersections.push({
      ...intersec,
      dist: Math.abs(intersec.x) + Math.abs(intersec.y)
    });
  }
});

let leastSteps: number = 0;

intersections.forEach(intersec => {
  const nrStepsUntilIntersecW1 = wire1Positions.findIndex(
    pos => pos.x === intersec.x && pos.y === intersec.y
  );
  const nrStepsUntilIntersecW2 = wire2Positions.findIndex(
    pos => pos.x === intersec.x && pos.y === intersec.y
  );
  const combined = nrStepsUntilIntersecW1 + nrStepsUntilIntersecW2;
  // console.log({ combined, nrStepsUntilIntersecW1, nrStepsUntilIntersecW2 });
  if (leastSteps === 0 || combined < leastSteps) {
    leastSteps = combined;
  }
});

const closestIntersection = intersections.reduce((acc, val) => {
  if (val.dist < acc.dist) {
    return val;
  }
  return acc;
});

// console.log({ wire1Positions, wire2Positions });

console.log({ leastSteps });
console.log({ intersections });
console.log({ closestIntersection });

const end = Date.now();
const duration = end - start;
console.log({ programDuration: `${duration / 1000}sec` });
