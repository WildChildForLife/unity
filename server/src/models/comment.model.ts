import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Player} from './player.model';
import {Session} from './session.model';

@model({settings: {strict: true}})
export class Comment extends Entity {
  @property({
    id: true,
    generated: true,
    description: 'The unique identifier for a comment',
  })
  id: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  feedback: string;

  @belongsTo(() => Player)
  playerId: number;

  @belongsTo(() => Session)
  sessionId: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
