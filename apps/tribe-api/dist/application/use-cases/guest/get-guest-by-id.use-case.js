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
var GetGuestByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGuestByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const event_repository_interface_js_1 = require("../../../domain/repositories/event.repository.interface.js");
const guest_event_response_dto_js_1 = require("../../dtos/guest/guest-event-response.dto.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const QRCode = __importStar(require("qrcode"));
const common_2 = require("@nestjs/common");
let GetGuestByIdUseCase = GetGuestByIdUseCase_1 = class GetGuestByIdUseCase {
    guestRepository;
    eventRepository;
    configService;
    constructor(guestRepository, eventRepository, configService) {
        this.guestRepository = guestRepository;
        this.eventRepository = eventRepository;
        this.configService = configService;
    }
    logger = new common_2.Logger(GetGuestByIdUseCase_1.name);
    async execute(input) {
        this.logger.debug("[execute] Getting Guest by Id");
        const { guest, event } = await this.validateAndReturnEntities(input.id);
        const companions = await this.guestRepository.findByCompanionId(guest.id);
        const companionsWithQr = await Promise.all(companions.map(async (c) => {
            if (c.status === guest_status_enum_js_1.GuestStatus.CONFIRMED) {
                c.qrCode = await this.generateQrCode(c.id);
            }
            return c;
        }));
        let qrCode;
        if (guest.status === guest_status_enum_js_1.GuestStatus.CONFIRMED) {
            qrCode = await this.generateQrCode(guest.id);
        }
        this.logger.log("[execute] Guest found", guest);
        return guest_event_response_dto_js_1.GuestEventResponseDto.fromDomainWithEvent(guest, event, companionsWithQr, qrCode);
    }
    async generateQrCode(guestId) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
        const checkInUrl = `${frontendUrl}/admin/check-in/${guestId}`;
        return QRCode.toDataURL(checkInUrl);
    }
    async validateAndReturnEntities(id) {
        const guest = await this.guestRepository.findById(id);
        if (!guest) {
            this.logger.error("[execute::validateAndReturnEntities] Guest not found", id);
            throw new common_1.NotFoundException('Guest not found');
        }
        const event = await this.eventRepository.findById(guest.eventId);
        if (!event) {
            this.logger.error("[execute::validateAndReturnEntities] Event not found", guest.eventId);
            throw new common_1.NotFoundException('Event not found');
        }
        return { guest, event };
    }
};
exports.GetGuestByIdUseCase = GetGuestByIdUseCase;
exports.GetGuestByIdUseCase = GetGuestByIdUseCase = GetGuestByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __param(1, (0, common_1.Inject)(event_repository_interface_js_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, config_1.ConfigService])
], GetGuestByIdUseCase);
//# sourceMappingURL=get-guest-by-id.use-case.js.map