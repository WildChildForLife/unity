import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Session, SessionWithRelations} from './session.model';

@model({settings: {strict: true}})
export class Player extends Entity {
  @property({
    id: true,
    generated: true,
    description: 'The unique identifier for a player',
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @belongsTo(() => Session)
  sessionId: number;

  getId() {
    return this.id;
  }


  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  session?: SessionWithRelations;
}

export type PlayerWithRelations = Player & PlayerRelations;
