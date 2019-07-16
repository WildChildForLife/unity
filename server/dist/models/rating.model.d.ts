import { Entity } from '@loopback/repository';
export declare class Rating extends Entity {
    id: number;
    score: number;
    sessionId: number;
    playerId: number;
    constructor(data?: Partial<Rating>);
}
export interface RatingRelations {
}
export declare type RatingWithRelations = Rating & RatingRelations;
