import { Hole } from "./Hole";

export interface Layout {
    id: string;
    name: string;

    par: number;
    totalLength: number;

    holes: Hole[];

    ratingSource: "udisc" | "manual" | "unknown";

    parPlayCourseRating: number;
}