// src/services/roundService.ts

import { Player } from "../models/Player";
import { Round } from "../models/Round";
import { ScoreEntry } from "../models/ScoreEntry";
import { calculateTotals } from "../utils/calcTotals";
import { calculatePersonalPar } from "../utils/personalPar";
import { calculatePPR } from "../utils/ppr";

export function finishRoundAndUpdatePlayer(
  player: Player,
  courseId: string,
  layoutId: string,
  courseRating: number,
  scores: ScoreEntry[]
) {
  const totals = calculateTotals(scores);

  // 1. Beregn personlig par
  const personalPar = calculatePersonalPar(
    player.parPlayRating.current,
    courseRating,
    totals.totalPar
  );

  const relativeToPersonalPar = totals.totalScore - personalPar;

  // 2. Beregn ratingendring
  const ppr = calculatePPR(
    player,
    {
      id: "",
      playerId: player.id,
      courseId,
      layoutId,
      scores,
      totalScore: totals.totalScore,
      totalPar: totals.totalPar,
      relativeToPar: totals.relativeToPar,
      personalPar,
      relativeToPersonalPar,
      ratingChange: 0,
      newRating: 0,
      startedAt: Date.now(),
      finishedAt: Date.now(),
    },
    courseRating
  );

  // 3. Lag ferdig Round-objekt
  const round: Round = {
    id: crypto.randomUUID(),
    playerId: player.id,
    courseId,
    layoutId,
    scores,
    totalScore: totals.totalScore,
    totalPar: totals.totalPar,
    relativeToPar: totals.relativeToPar,
    personalPar,
    relativeToPersonalPar,
    ratingChange: ppr.ratingChange,
    newRating: ppr.newRating,
    startedAt: Date.now(),
    finishedAt: Date.now(),
  };

  // 4. Oppdater spillerens rating
  const updatedPlayer: Player = {
    ...player,
    parPlayRating: {
      current: ppr.newRating,
      initial: player.parPlayRating.initial,
      lastChange: ppr.ratingChange,
      lastUpdated: Date.now(),
    },
    roundsPlayed: player.roundsPlayed + 1,
  };

  return { round, updatedPlayer };
}
