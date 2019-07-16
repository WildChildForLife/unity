import { Count, Filter, Where } from '@loopback/repository';
import { Session } from '../models';
import { SessionRepository } from '../repositories';
export declare class SessionController {
    sessionRepository: SessionRepository;
    constructor(sessionRepository: SessionRepository);
    create(session: Session): Promise<Session>;
    count(where?: Where<Session>): Promise<Count>;
    find(filter?: Filter<Session>): Promise<Session[]>;
    updateAll(session: Session, where?: Where<Session>): Promise<Count>;
    findById(id: number): Promise<Session>;
    updateById(id: number, session: Session): Promise<void>;
    replaceById(id: number, session: Session): Promise<void>;
    deleteById(id: number): Promise<void>;
}
