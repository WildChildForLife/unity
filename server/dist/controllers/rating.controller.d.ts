import { Count, Filter, Where } from '@loopback/repository';
import { Rating } from '../models';
import { PlayerRepository, RatingRepository, SessionRepository } from '../repositories';
export declare class RatingController {
    ratingRepository: RatingRepository;
    playerRepository: PlayerRepository;
    sessionRepository: SessionRepository;
    constructor(ratingRepository: RatingRepository, playerRepository: PlayerRepository, sessionRepository: SessionRepository);
    create(rating: Rating): Promise<Rating>;
    count(where?: Where<Rating>): Promise<Count>;
    find(filter?: Filter<Rating>): Promise<Rating[]>;
    updateAll(rating: Rating, where?: Where<Rating>): Promise<Count>;
    findById(id: number): Promise<Rating>;
    updateById(id: number, rating: Rating): Promise<void>;
    replaceById(id: number, rating: Rating): Promise<void>;
    deleteById(id: number): Promise<void>;
    validateSchema(rating: Rating): Promise<void>;
    validateScore(score: number): Promise<void>;
}
