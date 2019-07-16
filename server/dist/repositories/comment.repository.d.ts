import { DefaultCrudRepository } from '@loopback/repository';
import { Comment, CommentRelations } from '../models';
import { CommentDataSource } from '../datasources';
export declare class CommentRepository extends DefaultCrudRepository<Comment, typeof Comment.prototype.id, CommentRelations> {
    constructor(dataSource: CommentDataSource);
}
