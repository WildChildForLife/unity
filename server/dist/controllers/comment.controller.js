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
let CommentController = class CommentController {
    constructor(commentRepository, playerRepository, sessionRepository) {
        this.commentRepository = commentRepository;
        this.playerRepository = playerRepository;
        this.sessionRepository = sessionRepository;
    }
    async create(comment) {
        await this.validateSchema(comment);
        return await this.commentRepository.create(comment);
    }
    async count(where) {
        return await this.commentRepository.count(where);
    }
    async find(filter) {
        return await this.commentRepository.find(filter);
    }
    async updateAll(comment, where) {
        await this.validateSchema(comment);
        return await this.commentRepository.updateAll(comment, where);
    }
    async findById(id) {
        return await this.commentRepository.findById(id);
    }
    async updateById(id, comment) {
        await this.validateSchema(comment);
        await this.commentRepository.updateById(id, comment);
    }
    async replaceById(id, comment) {
        await this.validateSchema(comment);
        await this.commentRepository.replaceById(id, comment);
    }
    async deleteById(id) {
        await this.commentRepository.deleteById(id);
    }
    async validateSchema(comment) {
        await this.validateComment(comment.feedback);
        await validator_1.validatePlayer(comment.playerId, this.playerRepository);
        await validator_1.validateSession(comment.sessionId, this.sessionRepository);
    }
    async validateComment(comment) {
        if (comment.length === 0) {
            throw await new rest_1.HttpErrors.UnprocessableEntity('Feedback can\'t be null.');
        }
    }
};
__decorate([
    rest_1.post('/comments', {
        responses: {
            '200': {
                description: 'Comment model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Comment } } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Comment]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    rest_1.get('/comments/count', {
        responses: {
            '200': {
                description: 'Comment model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Comment))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "count", null);
__decorate([
    rest_1.get('/comments', {
        responses: {
            '200': {
                description: 'Array of Comment model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Comment } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Comment))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "find", null);
__decorate([
    rest_1.patch('/comments', {
        responses: {
            '200': {
                description: 'Comment PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Comment, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Comment))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Comment, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/comments/{id}', {
        responses: {
            '200': {
                description: 'Comment model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Comment } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findById", null);
__decorate([
    rest_1.patch('/comments/{id}', {
        responses: {
            '204': {
                description: 'Comment PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Comment, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Comment]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateById", null);
__decorate([
    rest_1.put('/comments/{id}', {
        responses: {
            '204': {
                description: 'Comment PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Comment]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/comments/{id}', {
        responses: {
            '204': {
                description: 'Comment DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteById", null);
CommentController = __decorate([
    __param(0, repository_1.repository(repositories_1.CommentRepository)),
    __param(1, repository_1.repository(repositories_1.PlayerRepository)),
    __param(2, repository_1.repository(repositories_1.SessionRepository)),
    __metadata("design:paramtypes", [repositories_1.CommentRepository,
        repositories_1.PlayerRepository,
        repositories_1.SessionRepository])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map