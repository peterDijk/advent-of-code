const test = [
    14,
    1969,
    100756
];
const fuelPerModule = (mass) => {
    return Math.floor(mass / 3) - 2;
};
const addToTotal = (moduleMass) => {
    const fuel = fuelPerModule(moduleMass);
    if (fuel > 0) {
        total += fuel;
        addToTotal(fuel);
    }
    else {
        return;
    }
};
let total = 0;
test.forEach(input => {
    addToTotal(input);
});
console.log({ total });
//# sourceMappingURL=2_2.js.map