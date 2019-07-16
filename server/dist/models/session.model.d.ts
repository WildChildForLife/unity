import { Entity } from '@loopback/repository';
import { Player, PlayerWithRelations } from "./player.model";
import { Rating, RatingWithRelations } from "./rating.model";
export declare class Session extends Entity {
    id: number;
    createdAt: string;
    players: Player[];
    ratings: Rating[];
    constructor(data?: Partial<Session>);
    getId(): number;
}
export interface SessionRelations {
    players?: PlayerWithRelations[];
    ratings?: RatingWithRelations[];
}
export declare type SessionWithRelations = Session & SessionRelations;
