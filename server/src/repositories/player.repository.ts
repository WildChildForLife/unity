import {
  DefaultCrudRepository,
  BelongsToAccessor,
  Filter,
  Options,
  repository
} from '@loopback/repository';
import {Player, Session, PlayerRelations, PlayerWithRelations} from '../models';
import {PlayerDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionRepository} from "./session.repository";

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  public readonly session: BelongsToAccessor<
      Session,
      typeof Player.prototype.id
      >;

  constructor(
    @repository.getter('SessionRepository')
    protected SessionRepositoryGetter: Getter<SessionRepository>,
    @inject('datasources.player') dataSource: PlayerDataSource,
  ) {
    super(Player, dataSource);

    this.session = this.createBelongsToAccessorFor(
        'session',
        SessionRepositoryGetter,
    );
  }

  async find(
      filter?: Filter<Player>,
      options?: Options,
  ): Promise<PlayerWithRelations[]> {
    const include = filter && filter.include;
    filter = {...filter, include: undefined};

    const result = await super.find(filter, options);

    if (include && include.length && include[0].relation === 'session') {
      await Promise.all(
          result.map(async r => {
            r.session = await this.session(r.id);
          }),
      );
    }

    return result;
  }

  async findById(
      id: typeof Player.prototype.id,
      filter?: Filter<Player>,
      options?: Options,
  ): Promise<PlayerWithRelations> {
    const include = filter && filter.include;
    filter = {...filter, include: undefined};

    const result = await super.findById(id, filter, options);

    if (include && include.length && include[0].relation === 'session') {
      result.session = await this.session(result.id);
    }

    return result;
  }
}
