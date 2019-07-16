import {DefaultCrudRepository} from '@loopback/repository';
import {Rating, RatingRelations} from '../models';
import {RatingDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RatingRepository extends DefaultCrudRepository<
  Rating,
  typeof Rating.prototype.id,
  RatingRelations
> {
  constructor(
    @inject('datasources.rating') dataSource: RatingDataSource,
  ) {
    super(Rating, dataSource);
  }
}
