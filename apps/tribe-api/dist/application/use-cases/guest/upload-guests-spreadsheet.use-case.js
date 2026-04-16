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
exports.UploadGuestsSpreadsheetUseCase = void 0;
const common_1 = require("@nestjs/common");
const guest_repository_interface_js_1 = require("../../../domain/repositories/guest.repository.interface.js");
const guest_status_enum_js_1 = require("../../../domain/enums/guest-status.enum.js");
const guest_response_dto_js_1 = require("../../dtos/guest/guest-response.dto.js");
const spreadsheet_parser_service_js_1 = require("../../services/spreadsheet-parser.service.js");
let UploadGuestsSpreadsheetUseCase = class UploadGuestsSpreadsheetUseCase {
    guestRepository;
    spreadsheetParser;
    constructor(guestRepository, spreadsheetParser) {
        this.guestRepository = guestRepository;
        this.spreadsheetParser = spreadsheetParser;
    }
    async execute(input) {
        const parsed = this.spreadsheetParser.parse(input.buffer);
        const { adults, children } = this.separateByType(parsed);
        const savedAdults = await this.saveAdults(adults, input.eventId);
        const responsibleMap = this.buildResponsibleMap(adults, savedAdults);
        const savedChildren = await this.saveChildren(children, input.eventId, responsibleMap);
        const allGuests = [...savedAdults, ...savedChildren];
        return {
            imported: allGuests.length,
            guests: allGuests.map(guest_response_dto_js_1.GuestResponseDto.fromDomain),
        };
    }
    separateByType(parsed) {
        return {
            adults: parsed.filter((g) => !g.isChild),
            children: parsed.filter((g) => g.isChild),
        };
    }
    async saveAdults(adults, eventId) {
        if (adults.length === 0)
            return [];
        const guestData = adults.map((g) => ({
            name: g.name,
            phone: g.phone,
            email: g.email,
            status: guest_status_enum_js_1.GuestStatus.NOT_CONFIRMED,
            attended: false,
            eventId,
            responsibleId: 0,
            isChild: false,
        }));
        return this.guestRepository.saveBulk(guestData);
    }
    buildResponsibleMap(parsedAdults, savedAdults) {
        const map = new Map();
        parsedAdults.forEach((parsed, i) => {
            const saved = savedAdults[i];
            if (saved) {
                map.set(parsed.name.toLowerCase(), saved.id);
            }
        });
        return map;
    }
    async saveChildren(children, eventId, responsibleMap) {
        if (children.length === 0)
            return [];
        const guestData = children.map((g) => {
            const responsibleId = g.responsibleName
                ? (responsibleMap.get(g.responsibleName.toLowerCase()) ?? 0)
                : 0;
            return {
                name: g.name,
                phone: g.phone,
                email: g.email,
                status: guest_status_enum_js_1.GuestStatus.NOT_CONFIRMED,
                attended: false,
                eventId,
                responsibleId,
                isChild: true,
            };
        });
        return this.guestRepository.saveBulk(guestData);
    }
};
exports.UploadGuestsSpreadsheetUseCase = UploadGuestsSpreadsheetUseCase;
exports.UploadGuestsSpreadsheetUseCase = UploadGuestsSpreadsheetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(guest_repository_interface_js_1.GUEST_REPOSITORY)),
    __metadata("design:paramtypes", [Object, spreadsheet_parser_service_js_1.SpreadsheetParserService])
], UploadGuestsSpreadsheetUseCase);
//# sourceMappingURL=upload-guests-spreadsheet.use-case.js.map