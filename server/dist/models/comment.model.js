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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const player_model_1 = require("./player.model");
const session_model_1 = require("./session.model");
let Comment = class Comment extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        id: true,
        generated: true,
        description: 'The unique identifier for a comment',
    }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
    }),
    __metadata("design:type", String)
], Comment.prototype, "createdAt", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Comment.prototype, "feedback", void 0);
__decorate([
    repository_1.belongsTo(() => player_model_1.Player),
    __metadata("design:type", Number)
], Comment.prototype, "playerId", void 0);
__decorate([
    repository_1.belongsTo(() => session_model_1.Session),
    __metadata("design:type", Number)
], Comment.prototype, "sessionId", void 0);
Comment = __decorate([
    repository_1.model({ settings: { strict: true } }),
    __metadata("design:paramtypes", [Object])
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map