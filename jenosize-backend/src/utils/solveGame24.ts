// Helper function to solve the 24 game
export const solveGame24 = (numbers: number[]): boolean => {
  const permutations: number[][] = generatePermutations(numbers);
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

// Helper function to generate permutations of an array
export const generatePermutations = (arr: number[]): number[][] => {
  if (arr.length === 1) {
      return [arr];
  }
  const permutations: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const restPermutations = generatePermutations(rest);
      for (const perm of restPermutations) {
          permutations.push([arr[i], ...perm]);
      }
  }

  return permutations;
};
