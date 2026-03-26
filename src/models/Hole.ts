export interface Hole {
    id: string;
    number: number;
    par: number;
    length: number;

    teeLatitude?: number;
    teeLongitude?: number;
    basketLatitude?: number;
    basketLongitude?: number;
}