import { DefaultCrudRepository, BelongsToAccessor, Filter, Options } from '@loopback/repository';
import { Player, Session, PlayerRelations, PlayerWithRelations } from '../models';
import { PlayerDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { SessionRepository } from "./session.repository";
export declare class PlayerRepository extends DefaultCrudRepository<Player, typeof Player.prototype.id, PlayerRelations> {
    protected SessionRepositoryGetter: Getter<SessionRepository>;
    readonly session: BelongsToAccessor<Session, typeof Player.prototype.id>;
    constructor(SessionRepositoryGetter: Getter<SessionRepository>, dataSource: PlayerDataSource);
    find(filter?: Filter<Player>, options?: Options): Promise<PlayerWithRelations[]>;
    findById(id: typeof Player.prototype.id, filter?: Filter<Player>, options?: Options): Promise<PlayerWithRelations>;
}
