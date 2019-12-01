"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
let total = 0;
const fuelPerModule = (mass) => {
    return Math.floor(mass / 3) - 2;
};
const addToTotal = (moduleMass) => {
    const fuel = fuelPerModule(moduleMass);
    if (fuel > 0) {
        total += fuel;
        addToTotal(fuel);
    }
};
input_1.default.forEach(input => {
    addToTotal(input);
});
console.log({ total });
//# sourceMappingURL=index.js.map