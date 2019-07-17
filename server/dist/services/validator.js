"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isemail = require("isemail");
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    if (!isemail.validate(credentials.email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid email');
    }
    // Validate Password Length
    if (credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
async function validateEmail(email) {
    if (!isemail.validate(email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('Invalid email');
    }
}
exports.validateEmail = validateEmail;
async function validatePlayer(playerId, playerRepository) {
    await playerRepository.findById(playerId).catch(async () => {
        throw new rest_1.HttpErrors.NotFound('The player ID ' + playerId + ' doesn\'t exist.');
    });
}
exports.validatePlayer = validatePlayer;
async function validateSession(sessionId, sessionRepository) {
    await sessionRepository.findById(sessionId).catch(async () => {
        throw new rest_1.HttpErrors.NotFound('The session ID ' + sessionId + ' doesn\'t exist.');
    });
}
exports.validateSession = validateSession;
async function validatePlayersRatingSameSession(sessionId, playerId, ratingRepository) {
    await ratingRepository.findOne({ where: { sessionId: sessionId, playerId: playerId }, limit: 1 }).then(async (res) => {
        if (res !== null) {
            throw new rest_1.HttpErrors.UnprocessableEntity('The session ID ' + sessionId + ' has already been rated by player ID ' + playerId);
        }
    });
}
exports.validatePlayersRatingSameSession = validatePlayersRatingSameSession;
//# sourceMappingURL=validator.js.map