// src/utils/calcTotals.ts

import { ScoreEntry } from "../models/ScoreEntry";

export function calculateTotals(scores: ScoreEntry[]) {
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const totalPar = scores.reduce((sum, s) => sum + s.par, 0);

  return {
    totalScore,
    totalPar,
    relativeToPar: totalScore - totalPar,
  };
}
