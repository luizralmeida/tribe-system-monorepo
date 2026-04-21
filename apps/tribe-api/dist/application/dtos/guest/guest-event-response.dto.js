"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestEventResponseDto = void 0;
const guest_response_dto_js_1 = require("./guest-response.dto.js");
const event_response_dto_js_1 = require("../event/event-response.dto.js");
class GuestEventResponseDto extends guest_response_dto_js_1.GuestResponseDto {
    event;
    constructor(guest, event, companions, qrCode) {
        super(guest, companions, qrCode);
        this.event = event_response_dto_js_1.EventResponseDto.fromDomain(event);
    }
    static fromDomainWithEvent(guest, event, companions, qrCode) {
        return new GuestEventResponseDto(guest, event, companions, qrCode);
    }
}
exports.GuestEventResponseDto = GuestEventResponseDto;
//# sourceMappingURL=guest-event-response.dto.js.map