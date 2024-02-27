"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermutations = exports.solveGame24 = void 0;
// Helper function to solve the 24 game
const solveGame24 = (numbers) => {
    const permutations = (0, exports.generatePermutations)(numbers);
    for (const permutation of permutations) {
        const operators = ['+', '-', '*', '/'];
        for (const op1 of operators) {
            for (const op2 of operators) {
                for (const op3 of operators) {
                    const expression = `${permutation[0]}${op1}${permutation[1]}${op2}${permutation[2]}${op3}${permutation[3]}`;
                    if (eval(expression) === 24) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};
exports.solveGame24 = solveGame24;
// Helper function to generate permutations of an array
const generatePermutations = (arr) => {
    if (arr.length === 1) {
        return [arr];
    }
    const permutations = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const restPermutations = (0, exports.generatePermutations)(rest);
        for (const perm of restPermutations) {
            permutations.push([arr[i], ...perm]);
        }
    }
    return permutations;
};
exports.generatePermutations = generatePermutations;
//# sourceMappingURL=solveGame24.js.map