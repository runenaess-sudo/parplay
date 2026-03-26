// src/utils/finishRound.ts

import { Player } from "../models/Player";
import { Round } from "../models/Round";
import { calculateTotals } from "./calcTotals";
import { calculatePersonalPar } from "./personalPar";
import { calculatePPR } from "./ppr";

export function finishRound(
  player: Player,
  round: Round,
  courseRating: number
) {
  const totals = calculateTotals(round.scores);

  const personalPar = calculatePersonalPar(
    player.parPlayRating.current,
    courseRating,
    totals.totalPar
  );

  const relativeToPersonalPar = totals.totalScore - personalPar;

  const ppr = calculatePPR(player, round, courseRating);

  return {
    ...round,
    totalScore: totals.totalScore,
    totalPar: totals.totalPar,
    relativeToPar: totals.relativeToPar,
    personalPar,
    relativeToPersonalPar,
    ratingChange: ppr.ratingChange,
    newRating: ppr.newRating,
    finishedAt: Date.now(),
  };
}
