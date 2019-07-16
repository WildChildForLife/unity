import {DefaultCrudRepository} from '@loopback/repository';
import {Session, SessionRelations} from '../models';
import {SessionDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {
  constructor(
    @inject('datasources.session') dataSource: SessionDataSource,
  ) {
    super(Session, dataSource);
  }
}
