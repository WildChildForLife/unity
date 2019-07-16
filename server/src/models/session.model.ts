import {Entity, model, property, hasMany} from '@loopback/repository';
import {Player, PlayerWithRelations} from "./player.model";
import {Rating, RatingWithRelations} from "./rating.model";

@model({settings: {strict: true}})
export class Session extends Entity {
  @property({
    id: true,
    generated: true,
    description: 'The unique identifier for a session',
  })
  id: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @hasMany(() => Player)
  players: Player[];

  @hasMany(() => Rating)
  ratings: Rating[];

  constructor(data?: Partial<Session>) {
    super(data);
  }

  getId() {
    return this.id;
  }
}

export interface SessionRelations {
  players?: PlayerWithRelations[];
  ratings?: RatingWithRelations[];
}

export type SessionWithRelations = Session & SessionRelations;
