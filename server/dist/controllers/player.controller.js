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
let PlayerController = class PlayerController {
    constructor(playerRepository, sessionRepository) {
        this.playerRepository = playerRepository;
        this.sessionRepository = sessionRepository;
    }
    async create(player) {
        await this.validateSchema(player);
        return await this.playerRepository.create(player);
    }
    async count(where) {
        return await this.playerRepository.count(where);
    }
    async find(filter) {
        return await this.playerRepository.find(filter);
    }
    async updateAll(player, where) {
        await this.validateSchema(player);
        return await this.playerRepository.updateAll(player, where);
    }
    async findById(id) {
        return await this.playerRepository.findById(id);
    }
    async updateById(id, player) {
        await this.validateSchema(player);
        await this.playerRepository.updateById(id, player);
    }
    async replaceById(id, player) {
        await this.validateSchema(player);
        await this.playerRepository.replaceById(id, player);
    }
    async deleteById(id) {
        await this.playerRepository.deleteById(id);
    }
    async validateSchema(player) {
        await validator_1.validateEmail(player.email);
        await validator_1.validateSession(player.sessionId, this.sessionRepository);
    }
};
__decorate([
    rest_1.post('/players', {
        responses: {
            '200': {
                description: 'Player model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Player } } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "create", null);
__decorate([
    rest_1.get('/players/count', {
        responses: {
            '200': {
                description: 'Player model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Player))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "count", null);
__decorate([
    rest_1.get('/players', {
        responses: {
            '200': {
                description: 'Array of Player model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Player } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Player))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "find", null);
__decorate([
    rest_1.patch('/players', {
        responses: {
            '200': {
                description: 'Player PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Player, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Player))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Player, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/players/{id}', {
        responses: {
            '200': {
                description: 'Player model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Player } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "findById", null);
__decorate([
    rest_1.patch('/players/{id}', {
        responses: {
            '204': {
                description: 'Player PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Player, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "updateById", null);
__decorate([
    rest_1.put('/players/{id}', {
        responses: {
            '204': {
                description: 'Player PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/players/{id}', {
        responses: {
            '204': {
                description: 'Player DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "deleteById", null);
PlayerController = __decorate([
    __param(0, repository_1.repository(repositories_1.PlayerRepository)),
    __param(1, repository_1.repository(repositories_1.SessionRepository)),
    __metadata("design:paramtypes", [repositories_1.PlayerRepository,
        repositories_1.SessionRepository])
], PlayerController);
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map