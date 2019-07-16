import {Credentials} from '../repositories/user.repository';
import * as isemail from 'isemail';
import {HttpErrors} from '@loopback/rest';
import {PlayerRepository, SessionRepository, RatingRepository} from "../repositories";

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

  // Validate Password Length
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}

export async function validateEmail(email: string) {
  if (!isemail.validate(email)) {
    throw new HttpErrors.UnprocessableEntity('Invalid email');
  }
}

export async function validatePlayer(playerId: number, playerRepository: PlayerRepository) {
  await playerRepository.findById(playerId).catch(async () => {
    throw await new HttpErrors.NotFound('The player ID ' + playerId + ' doesn\'t exist.');
  });
}

export async function validateSession(sessionId: number, sessionRepository: SessionRepository) {
  await sessionRepository.findById(sessionId).catch(async () => {
    throw await new HttpErrors.NotFound('The session ID ' + sessionId + ' doesn\'t exist.');
  });
}

export async function validatePlayersRatingSameSession(sessionId: number, playerId: number, ratingRepository: RatingRepository) {
  await ratingRepository.findOne({where: {sessionId: sessionId, playerId: playerId}, limit: 1}).then(async (res) => {
    if (res !== null) {
      throw await new HttpErrors.UnprocessableEntity('The session ID ' + sessionId + ' has already been rated by player ID ' + playerId);
    }
  });
}

