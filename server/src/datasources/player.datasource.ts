import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './player.datasource.json';

export class PlayerDataSource extends juggler.DataSource {
  static dataSourceName = 'player';

  constructor(
    @inject('datasources.config.player', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
