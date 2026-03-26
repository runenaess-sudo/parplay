// src/models/ScoreEntry.ts

export interface ScoreEntry {
    holeId: string;       // Referanse til hullet
    holeNumber: number;   // Hullnummer (1, 2, 3...)
    par: number;          // Par for hullet
    score: number;        // Faktisk score spilleren fikk
    difference: number;   // score - par (kan brukes direkte i UI)
}