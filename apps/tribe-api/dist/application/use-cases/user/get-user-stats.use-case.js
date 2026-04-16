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
var GetUserStatsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserStatsUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
const common_2 = require("@nestjs/common");
let GetUserStatsUseCase = GetUserStatsUseCase_1 = class GetUserStatsUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    logger = new common_2.Logger(GetUserStatsUseCase_1.name);
    async execute() {
        this.logger.debug("[execute] Searching for users stats");
        let stats;
        try {
            stats = await this.userRepository.getStats();
        }
        catch (error) {
            this.logger.error("[execute] Failed to search for users stats", error);
            throw error;
        }
        this.logger.log(`[execute] Succeded with ${stats.total} users stats`);
        return {
            total: stats.total,
            active: stats.active,
            withFutureEvents: stats.withFutureEvents,
            admin: stats.admin
        };
    }
};
exports.GetUserStatsUseCase = GetUserStatsUseCase;
exports.GetUserStatsUseCase = GetUserStatsUseCase = GetUserStatsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetUserStatsUseCase);
//# sourceMappingURL=get-user-stats.use-case.js.map