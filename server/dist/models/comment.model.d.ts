import { Entity } from '@loopback/repository';
export declare class Comment extends Entity {
    id: number;
    createdAt: string;
    feedback: string;
    playerId: number;
    sessionId: number;
    constructor(data?: Partial<Comment>);
}
export interface CommentRelations {
}
export declare type CommentWithRelations = Comment & CommentRelations;
