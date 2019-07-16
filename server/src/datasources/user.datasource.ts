import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './user.datasource.json';

export class UserDataSource extends juggler.DataSource {
  static dataSourceName = 'user';

  constructor(
    @inject('datasources.config.user', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
