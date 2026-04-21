"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestResponseDto = void 0;
class GuestResponseDto {
    id;
    name;
    phone;
    status;
    attended;
    eventId;
    email;
    responsibleId;
    isChild;
    companionCount;
    companions;
    age;
    createdAt;
    updatedAt;
    constructor(guest, companions) {
        this.id = guest.id;
        this.name = guest.name;
        this.phone = guest.phone;
        this.status = guest.status;
        this.attended = guest.attended;
        this.eventId = guest.eventId;
        this.email = guest.email;
        this.responsibleId = guest.responsibleId || null;
        this.isChild = guest.isChild;
        this.companionCount = companions?.length || 0;
        this.age = guest.age || null;
        this.createdAt = guest.createdAt;
        this.updatedAt = guest.updatedAt;
        this.companions = companions?.map((c) => new GuestResponseDto(c, [])) || [];
    }
    static fromDomain(guest) {
        return new GuestResponseDto(guest, []);
    }
}
exports.GuestResponseDto = GuestResponseDto;
//# sourceMappingURL=guest-response.dto.js.map