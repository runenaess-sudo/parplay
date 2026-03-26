import { Rating } from "./Rating";

export interface Player {
    id: string;

    // Navn og profil
    name: string;
    avatarUrl?: string;

    // Første rating spilleren starter med (fra PDGA/Metrix eller antatt)
    initialRating: number;

    // ParPlay Rating (PPR)
    parPlayRating: Rating;

    // Historikk
    roundsPlayed: number;
    createdAt: number;
}