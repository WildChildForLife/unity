import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Session} from './session.model';
import {Player} from './player.model';

@model({settings: {strict: true}})
export class Rating extends Entity {
  @property({
    id: true,
    generated: true,
    description: 'The unique identifier for a rating',
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  score: number;

  @belongsTo(() => Session)
  sessionId: number;

  @belongsTo(() => Player)
  playerId: number;

  constructor(data?: Partial<Rating>) {
    super(data);
  }
}

export interface RatingRelations {
  // describe navigational properties here
}

export type RatingWithRelations = Rating & RatingRelations;
