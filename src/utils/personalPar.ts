// src/utils/personalPar.ts

export function calculatePersonalPar(
  playerRating: number,
  courseRating: number,
  totalPar: number
) {
  return totalPar - (playerRating - courseRating) / 10;
}
