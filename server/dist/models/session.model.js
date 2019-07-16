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
const rating_model_1 = require("./rating.model");
let Session = class Session extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
    getId() {
        return this.id;
    }
};
__decorate([
    repository_1.property({
        id: true,
        generated: true,
        description: 'The unique identifier for a session',
    }),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
    }),
    __metadata("design:type", String)
], Session.prototype, "createdAt", void 0);
__decorate([
    repository_1.hasMany(() => player_model_1.Player),
    __metadata("design:type", Array)
], Session.prototype, "players", void 0);
__decorate([
    repository_1.hasMany(() => rating_model_1.Rating),
    __metadata("design:type", Array)
], Session.prototype, "ratings", void 0);
Session = __decorate([
    repository_1.model({ settings: { strict: true } }),
    __metadata("design:paramtypes", [Object])
], Session);
exports.Session = Session;
//# sourceMappingURL=session.model.js.map