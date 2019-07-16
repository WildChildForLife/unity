import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './rating.datasource.json';

export class RatingDataSource extends juggler.DataSource {
  static dataSourceName = 'rating';

  constructor(
    @inject('datasources.config.rating', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
