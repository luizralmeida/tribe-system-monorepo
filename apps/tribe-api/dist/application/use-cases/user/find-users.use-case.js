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
var FindUsersUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
const pagination_dto_js_1 = require("../../dtos/pagination.dto.js");
const user_response_dto_js_1 = require("../../dtos/user/user-response.dto.js");
const get_only_numbers_util_js_1 = require("../../utils/get-only-numbers.util.js");
let FindUsersUseCase = FindUsersUseCase_1 = class FindUsersUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    logger = new common_1.Logger(FindUsersUseCase_1.name);
    async execute(input) {
        this.logger.debug("[execute] Searching for users");
        const page = input.page ?? 1;
        const limit = input.limit ?? 20;
        const filter = this.extractFilter(input.search);
        const { data, total } = await this.userRepository.findAll({ page, limit, filter });
        this.logger.log(`[execute] Succeded with ${total} users`);
        return new pagination_dto_js_1.PaginatedResponseDto({
            data: data.map(user_response_dto_js_1.UserResponseDto.fromDomain),
            total,
            page,
            limit,
        });
    }
    extractFilter(search) {
        if (!search) {
            return {};
        }
        if (search.includes('@')) {
            return { email: search };
        }
        if ((0, get_only_numbers_util_js_1.getOnlyNumbers)(search)) {
            return { phone: search };
        }
        return { name: search };
    }
};
exports.FindUsersUseCase = FindUsersUseCase;
exports.FindUsersUseCase = FindUsersUseCase = FindUsersUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FindUsersUseCase);
//# sourceMappingURL=find-users.use-case.js.map