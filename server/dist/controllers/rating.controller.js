"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const authentication_1 = require("@loopback/authentication");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const validator_1 = require("../services/validator");
let RatingController = class RatingController {
    constructor(ratingRepository, playerRepository, sessionRepository) {
        this.ratingRepository = ratingRepository;
        this.playerRepository = playerRepository;
        this.sessionRepository = sessionRepository;
    }
    async create(rating) {
        await this.validateSchema(rating);
        return await this.ratingRepository.create(rating);
    }
    async count(where) {
        return await this.ratingRepository.count(where);
    }
    async find(filter) {
        return await this.ratingRepository.find(filter);
    }
    async updateAll(rating, where) {
        await this.validateSchema(rating);
        return await this.ratingRepository.updateAll(rating, where);
    }
    async findById(id) {
        return await this.ratingRepository.findById(id);
    }
    async updateById(id, rating) {
        await this.ratingRepository.updateById(id, rating);
    }
    async replaceById(id, rating) {
        await this.validateSchema(rating);
        await this.ratingRepository.replaceById(id, rating);
    }
    async deleteById(id) {
        await this.ratingRepository.deleteById(id);
    }
    async validateSchema(rating) {
        await this.validateScore(rating.score);
        await validator_1.validatePlayer(rating.playerId, this.playerRepository);
        await validator_1.validateSession(rating.sessionId, this.sessionRepository);
        await validator_1.validatePlayersRatingSameSession(rating.sessionId, rating.playerId, this.ratingRepository);
    }
    async validateScore(score) {
        if (score < 1 || score > 5) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Rating session should be between 1 and 5.');
        }
    }
};
__decorate([
    rest_1.post('/ratings', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Rating } } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Rating]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "create", null);
__decorate([
    rest_1.get('/ratings/count', {
        responses: {
            '200': {
                description: 'Rating model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Rating))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "count", null);
__decorate([
    rest_1.get('/ratings', {
        responses: {
            '200': {
                description: 'Array of Rating model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Rating } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Rating))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "find", null);
__decorate([
    rest_1.patch('/ratings', {
        responses: {
            '200': {
                description: 'Rating PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rating, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Rating))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Rating, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/ratings/{id}', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Rating } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "findById", null);
__decorate([
    rest_1.patch('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rating, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Rating]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "updateById", null);
__decorate([
    rest_1.put('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Rating]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "deleteById", null);
RatingController = __decorate([
    __param(0, repository_1.repository(repositories_1.RatingRepository)),
    __param(1, repository_1.repository(repositories_1.PlayerRepository)),
    __param(2, repository_1.repository(repositories_1.SessionRepository)),
    __metadata("design:paramtypes", [repositories_1.RatingRepository,
        repositories_1.PlayerRepository,
        repositories_1.SessionRepository])
], RatingController);
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map