import { Layout } from "../models/Layout";
import { ScoreEntry } from "../models/ScoreEntry";

export function createEmptyScorecard(layout: Layout): ScoreEntry[] {
    return layout.holes.map((hole) => ({
        holeId: hole.id,
        holeNumber: hole.number,
        par: hole.par,
        score: 0,
        difference: 0,
    }));
}