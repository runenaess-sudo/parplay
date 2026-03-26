import { Player } from "../models/Player";
import { Round } from "../models/Round";

// src/utils/ppr.ts


export function calculatePPR(
    player: Player,
    round: Round,
    courseRating: number
) {
    const currentRating = player.parPlayRating.current;

    // 1. Forventet score
    const expectedScore =
        round.totalPar - (currentRating - courseRating) / 10;

    // 2. Avvik
    const deviation = round.totalScore - expectedScore;

    // 3. K-faktor
    let K = 10;
    if (player.roundsPlayed < 10) K = 20;
    else if (player.roundsPlayed > 50) K = 5;

    // 4. Ratingendring
    const ratingChange = -(deviation * K);

    // 5. Ny rating
    const newRating = Math.round(currentRating + ratingChange);

    return {
        expectedScore,
        deviation,
        ratingChange,
        newRating,
    };
}