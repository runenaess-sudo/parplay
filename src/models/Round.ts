import { ScoreEntry } from "./ScoreEntry";

// src/models/Round.ts


export interface Round {
    id: string;

    // Hvem som spilte
    playerId: string;

    // Hvilken bane og layout
    courseId: string;
    layoutId: string;

    // Scorekort
    scores: ScoreEntry[];

    // Oppsummering
    totalScore: number;        // Summen av alle score
    totalPar: number;          // Summen av par for layouten
    relativeToPar: number;     // totalScore - totalPar

    // Personlig par for denne runden
    personalPar: number;       // Beregnet ut fra PPR og bane-rating
    relativeToPersonalPar: number; // totalScore - personalPar

    // Ratingendring
    ratingChange: number;      // Hvor mye PPR endret seg
    newRating: number;         // Ny PPR etter runden

    // Metadata
    startedAt: number;
    finishedAt: number;
}