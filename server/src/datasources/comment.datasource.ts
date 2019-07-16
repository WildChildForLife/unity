import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './comment.datasource.json';

export class CommentDataSource extends juggler.DataSource {
  static dataSourceName = 'comment';

  constructor(
    @inject('datasources.config.comment', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
