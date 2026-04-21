"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestEventResponseDto = void 0;
const guest_response_dto_js_1 = require("./guest-response.dto.js");
const event_response_dto_js_1 = require("../event/event-response.dto.js");
class GuestEventResponseDto extends guest_response_dto_js_1.GuestResponseDto {
    event;
    constructor(guest, event, companions) {
        super(guest, companions);
        this.event = event_response_dto_js_1.EventResponseDto.fromDomain(event);
    }
    static fromDomainWithEvent(guest, event, companions) {
        return new GuestEventResponseDto(guest, event, companions);
    }
}
exports.GuestEventResponseDto = GuestEventResponseDto;
//# sourceMappingURL=guest-event-response.dto.js.map