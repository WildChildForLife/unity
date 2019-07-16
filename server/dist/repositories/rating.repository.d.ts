import { DefaultCrudRepository } from '@loopback/repository';
import { Rating, RatingRelations } from '../models';
import { RatingDataSource } from '../datasources';
export declare class RatingRepository extends DefaultCrudRepository<Rating, typeof Rating.prototype.id, RatingRelations> {
    constructor(dataSource: RatingDataSource);
}
