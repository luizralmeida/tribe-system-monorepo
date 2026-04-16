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
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
const hash_service_interface_js_1 = require("../../../domain/services/hash.service.interface.js");
const user_response_dto_js_1 = require("../../dtos/user/user-response.dto.js");
let UpdateUserUseCase = class UpdateUserUseCase {
    userRepository;
    hashService;
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async execute(input) {
        const existingUser = await this.userRepository.findById(input.id);
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with id ${input.id} not found`);
        }
        await this.validateUniqueness(input.id, input.data);
        const updateData = { ...input.data };
        if (updateData.password) {
            updateData.password = await this.hashService.hash(updateData.password);
        }
        const user = await this.userRepository.update(input.id, updateData);
        return user_response_dto_js_1.UserResponseDto.fromDomain(user);
    }
    async validateUniqueness(userId, data) {
        if (data.email) {
            const existing = await this.userRepository.findByEmail(data.email);
            if (existing && existing.id !== userId) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        if (data.phone) {
            const existing = await this.userRepository.findByPhone(data.phone);
            if (existing && existing.id !== userId) {
                throw new common_1.ConflictException('Phone already in use');
            }
        }
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(hash_service_interface_js_1.HASH_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.use-case.js.map