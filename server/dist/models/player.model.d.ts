import { Entity } from '@loopback/repository';
import { SessionWithRelations } from './session.model';
export declare class Player extends Entity {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    sessionId: number;
    getId(): number;
    constructor(data?: Partial<Player>);
}
export interface PlayerRelations {
    session?: SessionWithRelations;
}
export declare type PlayerWithRelations = Player & PlayerRelations;
