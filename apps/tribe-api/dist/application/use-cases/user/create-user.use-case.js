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
exports.CreateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_interface_js_1 = require("../../../domain/repositories/user.repository.interface.js");
const hash_service_interface_js_1 = require("../../../domain/services/hash.service.interface.js");
const user_response_dto_js_1 = require("../../dtos/user/user-response.dto.js");
const user_event_repository_interface_js_1 = require("../../../domain/repositories/user-event.repository.interface.js");
let CreateUserUseCase = class CreateUserUseCase {
    userRepository;
    hashService;
    userEventRepository;
    constructor(userRepository, hashService, userEventRepository) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.userEventRepository = userEventRepository;
    }
    async execute(input) {
        await this.validateUniqueness(input.email, input.phone);
        const hashedPassword = await this.hashService.hash(input.password);
        const user = await this.userRepository.save({
            ...input,
            active: input.active ?? true,
            password: hashedPassword,
        });
        if (input.eventIds?.length) {
            await Promise.all(input.eventIds.map((id) => this.userEventRepository.associate(user.id, id)));
        }
        return user_response_dto_js_1.UserResponseDto.fromDomain(user);
    }
    async validateUniqueness(email, phone) {
        const emailExists = await this.userRepository.existsByEmail(email);
        if (emailExists) {
            throw new common_1.ConflictException('Email already in use');
        }
        const phoneExists = await this.userRepository.existsByPhone(phone);
        if (phoneExists) {
            throw new common_1.ConflictException('Phone already in use');
        }
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_js_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(hash_service_interface_js_1.HASH_SERVICE)),
    __param(2, (0, common_1.Inject)(user_event_repository_interface_js_1.USER_EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateUserUseCase);
//# sourceMappingURL=create-user.use-case.js.map