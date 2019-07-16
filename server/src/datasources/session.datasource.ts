import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './session.datasource.json';

export class SessionDataSource extends juggler.DataSource {
  static dataSourceName = 'session';

  constructor(
    @inject('datasources.config.session', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
