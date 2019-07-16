import { Credentials } from '../repositories/user.repository';
import { PlayerRepository, SessionRepository, RatingRepository } from "../repositories";
export declare function validateCredentials(credentials: Credentials): void;
export declare function validateEmail(email: string): Promise<void>;
export declare function validatePlayer(playerId: number, playerRepository: PlayerRepository): Promise<void>;
export declare function validateSession(sessionId: number, sessionRepository: SessionRepository): Promise<void>;
export declare function validatePlayersRatingSameSession(sessionId: number, playerId: number, ratingRepository: RatingRepository): Promise<void>;
