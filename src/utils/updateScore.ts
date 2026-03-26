import { ScoreEntry } from "../models/ScoreEntry";

// src/utils/updateScore.ts


export function updateScore(
    scores: ScoreEntry[],
    holeNumber: number,
    newScore: number
): ScoreEntry[] {
    return scores.map((entry) => {
        if (entry.holeNumber === holeNumber) {
            return {
                ...entry,
                score: newScore,
                difference: newScore - entry.par,
            };
        }
        return entry;
    });
}