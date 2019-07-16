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
let SessionController = class SessionController {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async create(session) {
        return await this.sessionRepository.create(session);
    }
    async count(where) {
        return await this.sessionRepository.count(where);
    }
    async find(filter) {
        return await this.sessionRepository.find(filter);
    }
    async updateAll(session, where) {
        return await this.sessionRepository.updateAll(session, where);
    }
    async findById(id) {
        return await this.sessionRepository.findById(id);
    }
    async updateById(id, session) {
        await this.sessionRepository.updateById(id, session);
    }
    async replaceById(id, session) {
        await this.sessionRepository.replaceById(id, session);
    }
    async deleteById(id) {
        await this.sessionRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/sessions', {
        responses: {
            '200': {
                description: 'Session model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Session } } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Session]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "create", null);
__decorate([
    rest_1.get('/sessions/count', {
        responses: {
            '200': {
                description: 'Session model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Session))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "count", null);
__decorate([
    rest_1.get('/sessions', {
        responses: {
            '200': {
                description: 'Array of Session model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Session } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Session))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "find", null);
__decorate([
    rest_1.patch('/sessions', {
        responses: {
            '200': {
                description: 'Session PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Session))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Session, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/sessions/{id}', {
        responses: {
            '200': {
                description: 'Session model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Session } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "findById", null);
__decorate([
    rest_1.patch('/sessions/{id}', {
        responses: {
            '204': {
                description: 'Session PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Session]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "updateById", null);
__decorate([
    rest_1.put('/sessions/{id}', {
        responses: {
            '204': {
                description: 'Session PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Session]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/sessions/{id}', {
        responses: {
            '204': {
                description: 'Session DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "deleteById", null);
SessionController = __decorate([
    __param(0, repository_1.repository(repositories_1.SessionRepository)),
    __metadata("design:paramtypes", [repositories_1.SessionRepository])
], SessionController);
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map