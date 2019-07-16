import { Count, Filter, Where } from '@loopback/repository';
import { Player } from '../models';
import { PlayerRepository, SessionRepository } from '../repositories';
export declare class PlayerController {
    playerRepository: PlayerRepository;
    sessionRepository: SessionRepository;
    constructor(playerRepository: PlayerRepository, sessionRepository: SessionRepository);
    create(player: Player): Promise<Player>;
    count(where?: Where<Player>): Promise<Count>;
    find(filter?: Filter<Player>): Promise<Player[]>;
    updateAll(player: Player, where?: Where<Player>): Promise<Count>;
    findById(id: number): Promise<Player>;
    updateById(id: number, player: Player): Promise<void>;
    replaceById(id: number, player: Player): Promise<void>;
    deleteById(id: number): Promise<void>;
    validateSchema(player: Player): Promise<void>;
}
