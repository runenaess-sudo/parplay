// src/models/Rating.ts

export interface Rating {
    current: number;     // Current PPR rating
    initial: number;     // Initial rating when player started
    lastChange: number;  // Change after last round
    lastUpdated: number; // Timestamp in milliseconds
}