export const generateFibonacci = (n: number): number[] => {
    const sequence: number[] = [1, 1];
    for (let i = 2; i < n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  };
  
  export const isCorrectNextFibonacci = (
    sequence: number[],
    answer: number
  ): boolean => {
    if (sequence.length < 2) return false;
    return answer === sequence[sequence.length - 1] + sequence[sequence.length - 2];
  };