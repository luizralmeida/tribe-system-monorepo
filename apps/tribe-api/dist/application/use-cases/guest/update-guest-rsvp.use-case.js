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
exports.UpdateGuestRSVPUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const guest_response_dto_js_1 = require("../../dtos/guest/guest-response.dto.js");
const QRCode = __importStar(require("qrcode"));
let UpdateGuestRSVPUseCase = class UpdateGuestRSVPUseCase {
    guestRepository;
    configService;
    constructor(guestRepository, configService) {
        this.guestRepository = guestRepository;
        this.configService = configService;
    }
    async execute(input) {
        const guest = await this.guestRepository.findById(input.id);
        if (!guest) {
            throw new common_1.NotFoundException('Guest not found');
        }
        const updated = await this.guestRepository.update(guest.id, {
            status: input.status,
        });
        let qrCode;
        if (input.status === guest_status_enum_js_1.GuestStatus.CONFIRMED) {
            qrCode = await this.generateQrCode(updated.id);
        }
        return {
            guest: guest_response_dto_js_1.GuestResponseDto.fromDomain(updated),
            qrCode,
        };
    }
    async generateQrCode(guestId) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
        const checkInUrl = `${frontendUrl}/admin/check-in/${guestId}`;
        return QRCode.toDataURL(checkInUrl);
    }
};
exports.UpdateGuestRSVPUseCase = UpdateGuestRSVPUseCase;
exports.UpdateGuestRSVPUseCase = UpdateGuestRSVPUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], UpdateGuestRSVPUseCase);
//# sourceMappingURL=update-guest-rsvp.use-case.js.map