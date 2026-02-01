export const createEmptyBoard = () =>
  Array.from({ length: 6 }, () => Array(7).fill(0));
