import { DefaultCrudRepository } from '@loopback/repository';
import { Session, SessionRelations } from '../models';
import { SessionDataSource } from '../datasources';
export declare class SessionRepository extends DefaultCrudRepository<Session, typeof Session.prototype.id, SessionRelations> {
    constructor(dataSource: SessionDataSource);
}
