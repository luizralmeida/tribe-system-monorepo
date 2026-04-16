"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmGuestUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const guest_response_dto_js_1 = require("../../dtos/guest/guest-response.dto.js");
const QRCode = __importStar(require("qrcode"));
let ConfirmGuestUseCase = class ConfirmGuestUseCase {
    guestRepository;
    jwtService;
    constructor(guestRepository, jwtService) {
        this.guestRepository = guestRepository;
        this.jwtService = jwtService;
    }
    async execute(input) {
        const payload = this.jwtService.verify(input.token);
        const guest = await this.guestRepository.findById(payload.guestId);
        if (!guest) {
            throw new common_1.NotFoundException('Guest not found');
        }
        const updated = await this.guestRepository.update(guest.id, {
            status: guest_status_enum_js_1.GuestStatus.CONFIRMED,
        });
        const qrCode = await this.generateQrCode(updated.id);
        return {
            guest: guest_response_dto_js_1.GuestResponseDto.fromDomain(updated),
            qrCode,
        };
    }
    async generateQrCode(guestId) {
        const qrData = JSON.stringify({ guestId, type: 'event-entry' });
        return QRCode.toDataURL(qrData);
    }
};
exports.ConfirmGuestUseCase = ConfirmGuestUseCase;
exports.ConfirmGuestUseCase = ConfirmGuestUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], ConfirmGuestUseCase);
//# sourceMappingURL=confirm-guest.use-case.js.map