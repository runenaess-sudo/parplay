import { Layout } from "./Layout";

export interface Course {
    id: string;
    name: string;
    description?: string;

    latitude: number;
    longitude: number;

    userRating: number;
    userRatingCount: number;

    parPlayCourseRating: number;

    par: number;

    images: string[];

    layouts: Layout[];

    createdBy: string;
    createdAt: number;
}