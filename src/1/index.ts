import puzzleInput from './input';

let total = 0;

const fuelPerModule = (mass: number) => {
  return Math.floor(mass / 3) - 2;
}

const addToTotal = (moduleMass: number) => {
  const fuel = fuelPerModule(moduleMass);
  
  if (fuel > 0) {
    total += fuel;
    addToTotal(fuel);
  } 
}

puzzleInput.forEach(input => {
  addToTotal(input);
});

console.log({ total });