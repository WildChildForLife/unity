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
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let PlayerRepository = class PlayerRepository extends repository_1.DefaultCrudRepository {
    constructor(SessionRepositoryGetter, dataSource) {
        super(models_1.Player, dataSource);
        this.SessionRepositoryGetter = SessionRepositoryGetter;
        this.session = this.createBelongsToAccessorFor('session', SessionRepositoryGetter);
    }
    async find(filter, options) {
        const include = filter && filter.include;
        filter = Object.assign({}, filter, { include: undefined });
        const result = await super.find(filter, options);
        if (include && include.length && include[0].relation === 'session') {
            await Promise.all(result.map(async (r) => {
                r.session = await this.session(r.id);
            }));
        }
        return result;
    }
    async findById(id, filter, options) {
        const include = filter && filter.include;
        filter = Object.assign({}, filter, { include: undefined });
        const result = await super.findById(id, filter, options);
        if (include && include.length && include[0].relation === 'session') {
            result.session = await this.session(result.id);
        }
        return result;
    }
};
PlayerRepository = __decorate([
    __param(0, repository_1.repository.getter('SessionRepository')),
    __param(1, core_1.inject('datasources.player')),
    __metadata("design:paramtypes", [Function, datasources_1.PlayerDataSource])
], PlayerRepository);
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player.repository.js.map