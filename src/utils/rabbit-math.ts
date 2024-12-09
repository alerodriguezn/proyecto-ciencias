export const generateRabbitPairs = (months: number): number[] => {
    const pairs: number[] = [1, 1];
    for (let i = 2; i < months; i++) {
      pairs[i] = pairs[i - 1] + pairs[i - 2];
    }
    return pairs;
  };
  
  export const isCorrectNextPair = (
    sequence: number[],
    answer: number
  ): boolean => {
    if (sequence.length < 2) return false;
    return answer === sequence[sequence.length - 1] + sequence[sequence.length - 2];
  };