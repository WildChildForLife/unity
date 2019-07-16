import { Count, Filter, Where } from '@loopback/repository';
import { Comment } from '../models';
import { CommentRepository, PlayerRepository, SessionRepository } from '../repositories';
export declare class CommentController {
    commentRepository: CommentRepository;
    playerRepository: PlayerRepository;
    sessionRepository: SessionRepository;
    constructor(commentRepository: CommentRepository, playerRepository: PlayerRepository, sessionRepository: SessionRepository);
    create(comment: Comment): Promise<Comment>;
    count(where?: Where<Comment>): Promise<Count>;
    find(filter?: Filter<Comment>): Promise<Comment[]>;
    updateAll(comment: Comment, where?: Where<Comment>): Promise<Count>;
    findById(id: number): Promise<Comment>;
    updateById(id: number, comment: Comment): Promise<void>;
    replaceById(id: number, comment: Comment): Promise<void>;
    deleteById(id: number): Promise<void>;
    validateSchema(comment: Comment): Promise<void>;
    validateComment(comment: string): Promise<void>;
}
